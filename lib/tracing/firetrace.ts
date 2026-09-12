import { AsyncLocalStorage } from "node:async_hooks";
// ESM-only: its exports map has just an "import" condition. Next and vitest
// load it, but a tsx script importing this module (or lib/retrieval) dies
// with ERR_PACKAGE_PATH_NOT_EXPORTED, since tsx runs this repo's .ts files
// as CommonJS. See finding 9 in docs/firetrace-feedback.md.
import {
  FireTrace,
  FireTraceApi,
  FireTraceError,
  type EndSpanOptions,
  type EndTraceOptions,
  type Span as SdkSpan,
  type SpanKind,
  type StartSpanOptions,
  type StartTraceOptions,
  type Trace as SdkTrace,
  type TraceStatus,
  type Usage,
} from "@firetrace/sdk";
import { after } from "next/server";

/**
 * FireTrace tracing for every LLM call the site makes, on @firetrace/sdk.
 * Ingestion API: POST {base}/api/v1/traces
 * Docs: https://tracing.art3m1s.me/docs/ingestion-api
 *
 * Traces carry the full conversation (questions, retrieved context, and
 * answers) so the corpus and the system prompt can be improved from real
 * usage. What that means for visitors is disclosed in the privacy section
 * of /terms. Two properties this module guarantees, because it sits in
 * the path of user-facing requests:
 *
 * 1. Off by default. Without FIRETRACE_API_KEY every entry point returns
 *    null and nothing is allocated, computed, or sent.
 * 2. Never throws, never blocks. Delivery is scheduled with next/server
 *    `after()` so it runs once the response is finished, with a
 *    per-attempt timeout and one retry. Failures are logged and swallowed:
 *    a tracing outage must not become a site outage.
 *
 * The SDK runs with `streaming: false`, so a trace is buffered in memory
 * and POSTed exactly once, complete, after `end()`. Streaming (open the
 * trace, append span batches, then end it) keeps a partial trace when a
 * process dies mid-run. It is not used here on purpose: a turn takes
 * seconds, not minutes, and has at most three spans, so streaming would
 * turn one request into at least two for little gain.
 *
 * What this module adds on top of the SDK: the off switch, the ambient
 * span that lets the query embedding nest under retrieval, a clock that
 * keeps timestamps in call order, the trace's cost as the sum of its
 * spans, branch and commit metadata, and the thumbs rating, recorded
 * against the trace it judges as a score (`recordFeedback`).
 */

const DEFAULT_BASE_URL = "https://tracing.art3m1s.me";
/** Score name for the chat widget's thumbs rating. */
const FEEDBACK_SCORE_NAME = "user-feedback";
/**
 * A turn's trace is delivered after its response finishes, so a fast
 * click can reach the scores endpoint before the trace exists. Retry a
 * 404 on this schedule, and only a 404.
 */
const SCORE_RETRY_DELAYS_MS = [300, 1_200, 4_000];
/**
 * Per attempt. Ingest gets SEND_RETRIES more on network errors, timeouts,
 * 429 and 5xx, so delivery holds the function at most about 8 s past the
 * response; 4 s gives a cold FireTrace start more room than 3 s did, so a
 * slow POST that lands is not sent twice. Scores get no SDK retry.
 */
const SEND_TIMEOUT_MS = 4_000;
const SEND_RETRIES = 1;

export type { SpanKind, TraceStatus };
export type TokenUsage = Usage;

interface Config {
  base: string;
  apiKey: string;
}

function config(): Config | null {
  const apiKey = process.env.FIRETRACE_API_KEY;
  if (!apiKey) return null;
  // Blank counts as unset, which also keeps the SDK from ever seeing an
  // empty endpoint (its constructor throws on one).
  const base = process.env.FIRETRACE_BASE_URL?.replace(/\/+$/, "") || DEFAULT_BASE_URL;
  return { base, apiKey };
}

/** True when a FIRETRACE_API_KEY is present and traces will be sent. */
export function isTracingEnabled(): boolean {
  return config() !== null;
}

/**
 * The clock a trace's SDK client reads: whole milliseconds since the epoch
 * from the monotonic clock. The SDK stamps each span as a wall-clock start
 * plus monotonic elapsed time, and with its own clocks the start is
 * truncated to the millisecond while the elapsed time is not: in a stress
 * run one span in five came out 1 ms after its trace. Here a start's wall()
 * and the now() the SDK takes right after it share one reading, so every
 * timestamp lands in call order. Frozen when the trace ends, so the payload
 * the SDK builds later, in after(), carries that moment.
 */
class TraceClock {
  private frozenAt: number | undefined;
  private startReading: number | undefined;

  wall = (): Date => {
    this.startReading = this.read();
    // Only the now() that immediately follows may reuse it.
    queueMicrotask(() => (this.startReading = undefined));
    return new Date(this.startReading);
  };

  now = (): number => {
    const reading = this.startReading ?? this.read();
    this.startReading = undefined;
    return reading;
  };

  freeze(): void {
    this.frozenAt = this.read();
  }

  private read(): number {
    return this.frozenAt ?? Math.floor(performance.timeOrigin + performance.now());
  }
}

/**
 * A client per trace, so each trace has its own clock. With streaming off
 * it holds no queue or connection, so there is nothing else to share.
 */
function client(cfg: Config, clock: TraceClock): FireTrace {
  return new FireTrace({
    endpoint: cfg.base,
    apiKey: cfg.apiKey,
    streaming: false,
    timeoutMs: SEND_TIMEOUT_MS,
    maxRetries: SEND_RETRIES,
    clock,
    onError: (error) => console.warn(`firetrace: ingest failed ${describe(error)}`),
  });
}

/** "400 invalid_trace: <server message> (requestId …)", or "timeout: ..." with no response. */
function describe(error: unknown): string {
  if (!(error instanceof FireTraceError)) return String(error);
  const prefix = error.status ? `${error.status} ${error.code}` : error.code;
  const requestId = error.requestId ? ` (requestId ${error.requestId})` : "";
  return `${prefix}: ${error.message.slice(0, 300)}${requestId}`;
}

/**
 * Branch and commit behind a trace, when the platform exposes them.
 *
 * The environment is deliberately NOT here. FireTrace stamps it from the
 * API key's own environment, so a deployment cannot claim to be an
 * environment whose key it does not hold. That means production, preview,
 * and local each need their own key; see the FireTrace block in
 * .env.example. Branch still earns its place, because the platform knows
 * it and FireTrace cannot: without it one preview looks like any other.
 *
 * Absent keys drop out of the JSON.
 */
function deploymentMetadata(): Record<string, unknown> {
  return {
    branch: process.env.VERCEL_GIT_COMMIT_REF,
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7),
  };
}

/** The shape of the trace ids the SDK generates, for validating ids sent back by a client. */
export const TRACE_ID_PATTERN = /^[0-9a-f]{32}$/;

export type SpanOptions = Omit<StartSpanOptions, "id" | "kind">;

/** `costUsd` rolls up into the trace total unless the trace sets its own. */
export type SpanEndOptions = Omit<EndSpanOptions, "error">;

/**
 * Ambient span, so a nested LLM call deep in a call stack can attach
 * itself without every intermediate function growing a trace parameter.
 * searchCorpus and semanticSearch keep their existing signatures, and
 * embedQuery reads the scope directly.
 */
const scope = new AsyncLocalStorage<Span>();

export class Span {
  private ended = false;

  constructor(
    private readonly trace: Trace,
    private readonly sdk: SdkSpan,
  ) {}

  get id(): string {
    return this.sdk.id;
  }

  /** Open a child span of this one. */
  child(name: string, kind: SpanKind, options?: SpanOptions): Span {
    return new Span(this.trace, this.sdk.startSpan(name, { ...options, kind }));
  }

  /** Run fn with this span as the ambient parent for nested LLM calls. */
  run<T>(fn: () => T): T {
    return scope.run(this, fn);
  }

  end(options: SpanEndOptions = {}): void {
    if (this.ended) return;
    this.ended = true;
    this.sdk.end({ ...options, status: options.status ?? "ok" });
    if (options.costUsd !== undefined) this.trace.addCost(options.costUsd);
  }
}

export type TraceOptions = Omit<StartTraceOptions, "id" | "status"> & { name: string };

/** `costUsd` overrides the sum of the spans' costs. */
export type TraceEndOptions = Omit<EndTraceOptions, "error" | "tags">;

export class Trace {
  private ended = false;
  private spanCostUsd = 0;
  private sawSpanCost = false;

  constructor(
    private readonly sdk: SdkTrace,
    private readonly clock: TraceClock,
  ) {}

  get id(): string {
    return this.sdk.id;
  }

  /**
   * @internal Called by Span.end. The trace's cost is the sum of its
   * spans, so a nested call the route never sees (the query embedding)
   * still shows up in the turn's total.
   */
  addCost(costUsd: number): void {
    this.spanCostUsd += costUsd;
    this.sawSpanCost = true;
  }

  /** Open a root-level span. */
  span(name: string, kind: SpanKind, options?: SpanOptions): Span {
    return new Span(this, this.sdk.startSpan(name, { ...options, kind }));
  }

  /**
   * Close the trace now and send it once the response is finished. The
   * clock freezes here, so the payload the SDK builds in after() carries
   * this moment as endedAt, and any span an early return left open closes
   * at the same instant: the API rejects a span without endedAt, and the
   * whole trace with it.
   */
  end(options: TraceEndOptions = {}): void {
    if (this.ended) return;
    this.ended = true;
    this.clock.freeze();
    const costUsd =
      options.costUsd ??
      (this.sawSpanCost ? Number(this.spanCostUsd.toFixed(10)) : undefined);
    schedule(() =>
      this.sdk
        .end({ ...options, status: options.status ?? "ok", costUsd })
        .catch((error) => console.warn(`firetrace: ingest failed ${describe(error)}`)),
    );
  }
}

/**
 * Open a trace, or return null when tracing is not configured. Callers use
 * optional chaining (trace?.end()) so the disabled path costs nothing.
 */
export function startTrace(options: TraceOptions): Trace | null {
  const cfg = config();
  if (!cfg) return null;
  const { name, metadata, ...rest } = options;
  const clock = new TraceClock();
  return new Trace(
    client(cfg, clock).startTrace(name, {
      ...rest,
      metadata: { ...deploymentMetadata(), ...metadata },
    }),
    clock,
  );
}

/**
 * Attach a span to whatever span is ambient, for LLM calls too deeply
 * nested to be handed a trace. Returns null when there is no active trace,
 * which is the normal case for callers outside a traced request.
 */
export function startChildSpan(
  name: string,
  kind: SpanKind,
  options?: SpanOptions,
): Span | null {
  return scope.getStore()?.child(name, kind, options) ?? null;
}

export type FeedbackRating = "up" | "down";

/**
 * Record a thumbs up or down on an answer, as a score on the trace it
 * judges (POST /api/v1/traces/{traceId}/scores).
 *
 * Numeric rather than categorical on purpose: 1 and 0 average directly
 * into a satisfaction rate, which a label cannot. Metadata would also
 * hold this, but FireTrace's own guidance is that metadata is unindexed
 * and ratings belong in scores, which are filterable and aggregatable.
 *
 * Scores append rather than replace, and the trace read path resolves the
 * newest score per name, so a reader who changes their mind lands on
 * their latest verdict with the earlier one kept as history.
 */
export function recordFeedback(options: {
  traceId: string;
  rating: FeedbackRating;
  comment?: string;
}): void {
  const cfg = config();
  if (!cfg) return;
  schedule(() => postScore(cfg, options));
}

/**
 * Hold the function open until delivery finishes: after() runs `send`
 * once the response is done and waits for it. Outside a request scope (a
 * background job, a test) after() throws, and a detached promise is the
 * best available fallback.
 */
function schedule(send: () => Promise<unknown>): void {
  try {
    after(send);
  } catch {
    void send();
  }
}

async function postScore(
  cfg: Config,
  options: { traceId: string; rating: FeedbackRating; comment?: string },
): Promise<void> {
  const api = new FireTraceApi({
    endpoint: cfg.base,
    apiKey: cfg.apiKey,
    timeoutMs: SEND_TIMEOUT_MS,
  });
  const score = {
    name: FEEDBACK_SCORE_NAME,
    dataType: "numeric" as const,
    value: options.rating === "up" ? 1 : 0,
    ...(options.comment ? { comment: options.comment } : {}),
  };

  for (let attempt = 0; ; attempt++) {
    try {
      await api.addScore(options.traceId, score);
      return;
    } catch (error) {
      // 404 means the rated trace has not landed yet, which is a race this
      // client creates by design (see SCORE_RETRY_DELAYS_MS). Nothing else
      // is worth retrying, and the SDK does not retry scores itself.
      const notYet = error instanceof FireTraceError && error.status === 404;
      if (notYet && attempt < SCORE_RETRY_DELAYS_MS.length) {
        await sleep(SCORE_RETRY_DELAYS_MS[attempt]);
        continue;
      }
      console.warn(`firetrace: score failed ${describe(error)}`);
      return;
    }
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

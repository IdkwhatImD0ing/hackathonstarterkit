import { AsyncLocalStorage } from "node:async_hooks";
import { randomBytes, randomUUID } from "node:crypto";
import { after } from "next/server";

/**
 * FireTrace tracing for every LLM call the site makes.
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
 *    `after()` so it runs once the response is finished, with a hard
 *    timeout. Failures are logged and swallowed: a tracing outage must
 *    not become a site outage.
 *
 * The API stores one immutable trace per request with all of its spans.
 * There is no streaming or batch endpoint, so a trace is buffered in
 * memory and POSTed exactly once, from `end()`. A thumbs rating arrives
 * after that POST and is recorded against the trace it judges, as a
 * score (`recordFeedback`).
 */

const DEFAULT_BASE_URL = "https://tracing.art3m1s.me";
const TRACES_PATH = "/api/v1/traces";
/** Score name for the chat widget's thumbs rating. */
const FEEDBACK_SCORE_NAME = "user-feedback";
/**
 * A turn's trace is delivered after its response finishes, so a fast
 * click can reach the scores endpoint before the trace exists. Retry a
 * 404 on this schedule, and only a 404.
 */
const SCORE_RETRY_DELAYS_MS = [300, 1_200, 4_000];
/** Ingestion caps, from the docs. Exceeding them rejects the whole trace. */
const MAX_SPANS = 200;
const MAX_NAME_CHARS = 500;
const SEND_TIMEOUT_MS = 3_000;

export type SpanKind =
  | "llm"
  | "agent"
  | "tool"
  | "chain"
  | "retriever"
  | "embedding"
  | "reranker"
  | "custom";

export type TraceStatus = "ok" | "error" | "unset";

export interface TokenUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

interface Config {
  base: string;
  apiKey: string;
}

function config(): Config | null {
  const apiKey = process.env.FIRETRACE_API_KEY;
  if (!apiKey) return null;
  const base = (process.env.FIRETRACE_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
  return { base, apiKey };
}

/** True when a FIRETRACE_API_KEY is present and traces will be sent. */
export function isTracingEnabled(): boolean {
  return config() !== null;
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

/** 32 lowercase hex characters, as the trace id format requires. */
function newTraceId(): string {
  return randomUUID().replace(/-/g, "");
}

/** 16 lowercase hex characters, as the span id format requires. */
function newSpanId(): string {
  return randomBytes(8).toString("hex");
}

/** The shape `newTraceId` produces, for validating ids sent back by a client. */
export const TRACE_ID_PATTERN = /^[0-9a-f]{32}$/;

function clampName(name: string): string {
  return name.length > MAX_NAME_CHARS ? name.slice(0, MAX_NAME_CHARS) : name;
}

/** Drop undefined keys so the payload stays within the size limits. */
function compact<T extends object>(value: T): T {
  for (const key of Object.keys(value) as (keyof T)[]) {
    if (value[key] === undefined) delete value[key];
  }
  return value;
}

interface SpanPayload {
  id: string;
  parentSpanId: string | null;
  name: string;
  kind: SpanKind;
  status: TraceStatus;
  startedAt: string;
  endedAt?: string;
  provider?: string;
  model?: string;
  input?: unknown;
  output?: unknown;
  attributes?: Record<string, unknown>;
  usage?: TokenUsage;
  costUsd?: number;
}

export interface SpanOptions {
  provider?: string;
  model?: string;
  input?: unknown;
  attributes?: Record<string, unknown>;
}

export interface SpanEndOptions {
  status?: TraceStatus;
  output?: unknown;
  usage?: TokenUsage;
  model?: string;
  provider?: string;
  attributes?: Record<string, unknown>;
  /** Rolls up into the trace total unless the trace sets its own. */
  costUsd?: number;
}

/**
 * Ambient span, so a nested LLM call deep in a call stack can attach
 * itself without every intermediate function growing a trace parameter.
 * searchCorpus and semanticSearch keep their existing signatures, and
 * embedQuery reads the scope directly.
 */
const scope = new AsyncLocalStorage<Span>();

export class Span {
  private readonly payload: SpanPayload;
  private ended = false;

  constructor(
    private readonly trace: Trace,
    name: string,
    kind: SpanKind,
    parentSpanId: string | null,
    options: SpanOptions = {},
  ) {
    this.payload = {
      id: newSpanId(),
      parentSpanId,
      name: clampName(name),
      kind,
      status: "unset",
      startedAt: new Date().toISOString(),
      provider: options.provider,
      model: options.model,
      input: options.input,
      attributes: options.attributes,
    };
    trace.addSpan(this.payload);
  }

  get id(): string {
    return this.payload.id;
  }

  /** Open a child span of this one. */
  child(name: string, kind: SpanKind, options?: SpanOptions): Span {
    return new Span(this.trace, name, kind, this.payload.id, options);
  }

  /** Run fn with this span as the ambient parent for nested LLM calls. */
  run<T>(fn: () => T): T {
    return scope.run(this, fn);
  }

  end(options: SpanEndOptions = {}): void {
    if (this.ended) return;
    this.ended = true;
    this.payload.endedAt = new Date().toISOString();
    this.payload.status = options.status ?? "ok";
    if (options.model) this.payload.model = options.model;
    if (options.provider) this.payload.provider = options.provider;
    if (options.usage) this.payload.usage = compact({ ...options.usage });
    if (options.attributes) {
      this.payload.attributes = { ...this.payload.attributes, ...options.attributes };
    }
    if (options.output !== undefined) this.payload.output = options.output;
    if (options.costUsd !== undefined) {
      this.payload.costUsd = options.costUsd;
      this.trace.addCost(options.costUsd);
    }
    compact(this.payload);
  }
}

export interface TraceOptions {
  name: string;
  provider?: string;
  model?: string;
  sessionId?: string;
  userId?: string;
  tags?: string[];
  input?: unknown;
  metadata?: Record<string, unknown>;
}

export interface TraceEndOptions {
  status?: TraceStatus;
  output?: unknown;
  usage?: TokenUsage;
  metadata?: Record<string, unknown>;
  /** Overrides the sum of the spans' costs. */
  costUsd?: number;
}

export class Trace {
  private readonly spans: SpanPayload[] = [];
  private readonly body: Record<string, unknown>;
  private ended = false;
  private spanCostUsd = 0;
  private sawSpanCost = false;

  constructor(
    private readonly cfg: Config,
    options: TraceOptions,
  ) {
    this.body = {
      id: newTraceId(),
      name: clampName(options.name),
      status: "unset" as TraceStatus,
      startedAt: new Date().toISOString(),
      provider: options.provider,
      model: options.model,
      sessionId: options.sessionId,
      userId: options.userId,
      tags: options.tags?.slice(0, 20),
      input: options.input,
      metadata: { ...deploymentMetadata(), ...options.metadata },
    };
  }

  get id(): string {
    return this.body.id as string;
  }

  /** @internal Called by the Span constructor. */
  addSpan(span: SpanPayload): void {
    if (this.spans.length >= MAX_SPANS) return;
    this.spans.push(span);
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
    return new Span(this, name, kind, null, options);
  }

  /** Close the trace and schedule the single POST that stores it. */
  end(options: TraceEndOptions = {}): void {
    if (this.ended) return;
    this.ended = true;
    this.body.endedAt = new Date().toISOString();
    this.body.status = options.status ?? "ok";
    if (options.usage) this.body.usage = compact({ ...options.usage });
    if (options.metadata) {
      this.body.metadata = { ...(this.body.metadata as object), ...options.metadata };
    }
    if (options.output !== undefined) this.body.output = options.output;
    if (options.costUsd !== undefined) {
      this.body.costUsd = options.costUsd;
    } else if (this.sawSpanCost) {
      this.body.costUsd = Number(this.spanCostUsd.toFixed(10));
    }
    // A span left open by an early return would be rejected for a missing
    // endedAt, taking the whole trace down with it.
    for (const span of this.spans) {
      if (!span.endedAt) {
        span.endedAt = this.body.endedAt as string;
        span.status = "unset";
      }
    }
    const payload = {
      schemaVersion: 1,
      trace: compact({ ...this.body, spans: this.spans }),
    };
    schedule(() => post(this.cfg, TRACES_PATH, payload));
  }
}

/**
 * Open a trace, or return null when tracing is not configured. Callers use
 * optional chaining (trace?.end()) so the disabled path costs nothing.
 */
export function startTrace(options: TraceOptions): Trace | null {
  const cfg = config();
  return cfg ? new Trace(cfg, options) : null;
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
 * Run delivery after the response is finished. Outside a request scope
 * (a background job, a test) after() throws, and a detached promise is
 * the best available fallback.
 */
function schedule(send: () => Promise<void>): void {
  try {
    after(send);
  } catch {
    void send();
  }
}

function send(cfg: Config, path: string, payload: unknown): Promise<Response> {
  return fetch(`${cfg.base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  });
}

async function post(cfg: Config, path: string, payload: unknown): Promise<void> {
  try {
    const response = await send(cfg, path, payload);
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(`firetrace: ingest returned ${response.status} ${detail.slice(0, 300)}`);
    }
  } catch (error) {
    console.warn("firetrace: ingest failed", error);
  }
}

async function postScore(
  cfg: Config,
  options: { traceId: string; rating: FeedbackRating; comment?: string },
): Promise<void> {
  const path = `${TRACES_PATH}/${options.traceId}/scores`;
  const payload = {
    name: FEEDBACK_SCORE_NAME,
    dataType: "numeric",
    value: options.rating === "up" ? 1 : 0,
    ...(options.comment ? { comment: options.comment } : {}),
  };

  for (let attempt = 0; ; attempt++) {
    try {
      const response = await send(cfg, path, payload);
      if (response.ok) return;
      // 404 means the rated trace has not landed yet, which is a race this
      // client creates by design: the trace ships after its response
      // finishes. Nothing else is worth retrying.
      if (response.status === 404 && attempt < SCORE_RETRY_DELAYS_MS.length) {
        await sleep(SCORE_RETRY_DELAYS_MS[attempt]);
        continue;
      }
      const detail = await response.text().catch(() => "");
      console.warn(`firetrace: score returned ${response.status} ${detail.slice(0, 300)}`);
      return;
    } catch (error) {
      console.warn("firetrace: score failed", error);
      return;
    }
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

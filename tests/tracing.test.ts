import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * FireTrace client semantics. The ingestion API is strict (id formats,
 * required endedAt, one immutable trace per request) and rejects a whole
 * trace over one bad field, so the payload shape is worth pinning down
 * here rather than discovering from a 400 in production.
 *
 * next/server is mocked to throw the way after() does outside a request
 * scope, which exercises the detached-promise fallback in schedule().
 */
vi.mock("next/server", () => ({
  after: () => {
    throw new Error("after() was called outside a request scope");
  },
}));

import {
  TRACE_ID_PATTERN,
  isTracingEnabled,
  recordFeedback,
  startTrace,
} from "@/lib/tracing/firetrace";
import { estimateCostUsd } from "@/lib/tracing/pricing";

const KEY = `ft_live_${"a".repeat(16)}_${"b".repeat(64)}`;
const SPAN_ID_PATTERN = /^[0-9a-f]{16}$/;

interface Sent {
  url: string;
  headers: Record<string, string>;
  /** A trace ingest (`{schemaVersion, trace}`) or a score post. */
  body: {
    schemaVersion: number;
    trace: Record<string, unknown>;
  };
}

let sent: Sent[];

/** Delivery is detached, so give the microtask queue a turn. */
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  sent = [];
  process.env.FIRETRACE_API_KEY = KEY;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      sent.push({
        url,
        headers: init.headers as Record<string, string>,
        body: JSON.parse(init.body as string),
      });
      return new Response(JSON.stringify({ ok: true }), { status: 201 });
    }),
  );
});

afterEach(() => {
  delete process.env.FIRETRACE_API_KEY;
  delete process.env.FIRETRACE_BASE_URL;
  vi.unstubAllGlobals();
});

describe("firetrace", () => {
  it("is inert without an API key", async () => {
    delete process.env.FIRETRACE_API_KEY;

    expect(isTracingEnabled()).toBe(false);
    expect(startTrace({ name: "chat" })).toBeNull();
    recordFeedback({ traceId: "0".repeat(32), rating: "up" });

    await flush();
    expect(sent).toHaveLength(0);
  });

  it("posts one trace with nested spans and ids in the documented formats", async () => {
    const trace = startTrace({
      name: "chat",
      provider: "openai",
      model: "gpt-5.6-luna",
      sessionId: "conversation-1",
    });
    expect(trace).not.toBeNull();

    const retrieval = trace!.span("retrieval", "retriever");
    const embedding = retrieval.child("openai.embeddings.create", "embedding");
    embedding.end({ usage: { inputTokens: 7, totalTokens: 7 } });
    retrieval.end({ attributes: { resultCount: 3 } });
    trace!.end({ usage: { inputTokens: 100, outputTokens: 20, totalTokens: 120 } });

    await flush();
    expect(sent).toHaveLength(1);

    const { url, headers, body } = sent[0];
    expect(url).toBe("https://tracing.art3m1s.me/api/v1/traces");
    expect(headers.Authorization).toBe(`Bearer ${KEY}`);
    expect(body.schemaVersion).toBe(1);

    const stored = body.trace;
    expect(stored.id).toMatch(TRACE_ID_PATTERN);
    expect(stored.name).toBe("chat");
    expect(stored.status).toBe("ok");
    expect(stored.sessionId).toBe("conversation-1");
    expect(stored.usage).toEqual({ inputTokens: 100, outputTokens: 20, totalTokens: 120 });
    expect(typeof stored.startedAt).toBe("string");
    expect(typeof stored.endedAt).toBe("string");

    const spans = stored.spans as Record<string, unknown>[];
    expect(spans).toHaveLength(2);
    const [retrievalSpan, embeddingSpan] = spans;
    expect(retrievalSpan.id).toMatch(SPAN_ID_PATTERN);
    expect(retrievalSpan.parentSpanId).toBeNull();
    expect(retrievalSpan.kind).toBe("retriever");
    expect(retrievalSpan.attributes).toEqual({ resultCount: 3 });
    // The embedding call nests under retrieval, not under the trace root.
    expect(embeddingSpan.parentSpanId).toBe(retrievalSpan.id);
    expect(embeddingSpan.kind).toBe("embedding");
    expect(embeddingSpan.usage).toEqual({ inputTokens: 7, totalTokens: 7 });
  });

  it("records the conversation itself, question and answer", async () => {
    const messages = [{ role: "user", content: "how do I pick a stack?" }];
    const trace = startTrace({ name: "chat", input: messages })!;
    const span = trace.span("openai.responses.create", "llm", { input: messages });
    span.end({ output: "Pick the one you already know." });
    trace.end({ output: "Pick the one you already know." });

    await flush();
    const stored = sent[0].body.trace;
    expect(stored.input).toEqual(messages);
    expect(stored.output).toBe("Pick the one you already know.");
    expect((stored.spans as Record<string, unknown>[])[0].output).toBe(
      "Pick the one you already know.",
    );
  });

  it("closes spans left open, which would otherwise reject the whole trace", async () => {
    const trace = startTrace({ name: "chat" })!;
    trace.span("openai.responses.create", "llm");
    trace.end({ status: "error" });

    await flush();
    const stored = sent[0].body.trace;
    const span = (stored.spans as Record<string, unknown>[])[0];
    expect(span.endedAt).toBe(stored.endedAt);
    expect(span.status).toBe("unset");
    expect(stored.status).toBe("error");
  });

  it("sends exactly one trace even when end() is called twice", async () => {
    const trace = startTrace({ name: "chat" })!;
    trace.end();
    trace.end();

    await flush();
    expect(sent).toHaveLength(1);
  });

  it("never sends an environment, because the key's environment decides it", async () => {
    // FireTrace stamps environment from the API key server-side and
    // rejects it in the body, so a deployment cannot claim an environment
    // whose key it does not hold. Sending one would be a 400.
    vi.stubEnv("VERCEL_ENV", "preview");

    startTrace({ name: "chat", tags: ["chat"] })!.end();

    await flush();
    const stored = sent[0].body.trace;
    expect("environment" in stored).toBe(false);
    expect(stored.tags).toEqual(["chat"]);
    expect(stored.metadata).not.toHaveProperty("environment");
    vi.unstubAllEnvs();
  });

  it("records branch and commit, which FireTrace cannot know", async () => {
    // Environment alone does not separate one preview from another.
    vi.stubEnv("VERCEL_GIT_COMMIT_REF", "claude/feedback-footer");
    vi.stubEnv("VERCEL_GIT_COMMIT_SHA", "abc1234def5678");

    startTrace({ name: "chat", metadata: { outcome: "completed" } })!.end();

    await flush();
    expect(sent[0].body.trace.metadata).toEqual({
      branch: "claude/feedback-footer",
      commit: "abc1234",
      outcome: "completed",
    });
    vi.unstubAllEnvs();
  });

  it("omits keys that were never set, keeping the payload small", async () => {
    const trace = startTrace({ name: "chat" })!;
    trace.end();

    await flush();
    const stored = sent[0].body.trace;
    expect("input" in stored).toBe(false);
    expect("output" in stored).toBe(false);
    expect("sessionId" in stored).toBe(false);
    expect("usage" in stored).toBe(false);
  });

  it("records a thumbs rating as a score on the trace it judges", async () => {
    const rated = "c".repeat(32);
    recordFeedback({ traceId: rated, rating: "down", comment: "cited the wrong page" });

    await flush();
    expect(sent).toHaveLength(1);
    // Scored on the rated trace's own resource, not as a second trace.
    expect(sent[0].url).toBe(`https://tracing.art3m1s.me/api/v1/traces/${rated}/scores`);
    expect(sent[0].headers.Authorization).toBe(`Bearer ${KEY}`);
    expect(sent[0].body).toEqual({
      name: "user-feedback",
      dataType: "numeric",
      value: 0,
      comment: "cited the wrong page",
    });
  });

  it("scores a thumbs up as 1, so the average is a satisfaction rate", async () => {
    recordFeedback({ traceId: "d".repeat(32), rating: "up" });

    await flush();
    expect(sent[0].body).toEqual({ name: "user-feedback", dataType: "numeric", value: 1 });
  });

  it("retries a score only while the rated trace has not landed yet", async () => {
    // The trace ships after its response finishes, so a fast click can
    // beat it to the API. First call 404s, second succeeds.
    let calls = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        calls += 1;
        return calls === 1
          ? new Response(JSON.stringify({ error: { code: "not_found" } }), { status: 404 })
          : new Response(JSON.stringify({ ok: true }), { status: 201 });
      }),
    );

    recordFeedback({ traceId: "e".repeat(32), rating: "up" });
    await vi.waitFor(() => expect(calls).toBe(2), { timeout: 5_000 });
  });

  it("does not retry a score rejected for any other reason", async () => {
    let calls = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        calls += 1;
        return new Response(JSON.stringify({ error: { code: "invalid_request" } }), {
          status: 400,
        });
      }),
    );
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    recordFeedback({ traceId: "e".repeat(32), rating: "up" });
    await flush();
    expect(calls).toBe(1);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("400"));
    warn.mockRestore();
  });

  it("totals the trace cost from its spans, including nested ones", async () => {
    const trace = startTrace({ name: "chat" })!;
    const retrieval = trace.span("retrieval", "retriever");
    const embedding = retrieval.child("openai.embeddings.create", "embedding");
    // 1000 embedding tokens at $0.02 / 1M = $0.00002.
    embedding.end({ costUsd: estimateCostUsd("text-embedding-3-small", { inputTokens: 1000 }) });
    retrieval.end();
    const llm = trace.span("openai.responses.create", "llm");
    // 1M uncached input at $0.20 plus 1M output at $1.20 = $1.40.
    llm.end({ costUsd: estimateCostUsd("gpt-5.6-luna", { inputTokens: 1e6, outputTokens: 1e6 }) });
    trace.end();

    await flush();
    const stored = sent[0].body.trace;
    const spans = stored.spans as Record<string, unknown>[];
    expect(spans[1].costUsd).toBe(0.00002);
    expect(spans[2].costUsd).toBe(1.4);
    // The embedding cost reaches the trace total even though the route
    // that opened the trace never saw that call.
    expect(stored.costUsd).toBe(1.40002);
  });

  it("omits costUsd entirely when no span priced itself", async () => {
    const trace = startTrace({ name: "chat" })!;
    trace.span("openai.responses.create", "llm").end({ usage: { inputTokens: 10 } });
    trace.end();

    await flush();
    expect("costUsd" in sent[0].body.trace).toBe(false);
  });

  it("honours FIRETRACE_BASE_URL and trims a trailing slash", async () => {
    process.env.FIRETRACE_BASE_URL = "http://localhost:4000/";
    startTrace({ name: "chat" })!.end();

    await flush();
    expect(sent[0].url).toBe("http://localhost:4000/api/v1/traces");
  });

  it("swallows ingest failures instead of breaking the request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("tracing host unreachable");
      }),
    );
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const trace = startTrace({ name: "chat" })!;
    expect(() => trace.end()).not.toThrow();

    await flush();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("swallows a rejected ingest response the same way", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ error: { code: "invalid_trace" } }), { status: 400 })),
    );
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    startTrace({ name: "chat" })!.end();

    await flush();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("400"));
    warn.mockRestore();
  });
});

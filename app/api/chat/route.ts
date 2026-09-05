import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp } from "@/lib/request-ip";
import { rateLimit } from "@/lib/rate-limit";
import { searchCorpus } from "@/lib/retrieval";
import {
  CHAT_MAX_ASSISTANT_CHARS,
  CHAT_MAX_HISTORY,
  CHAT_MAX_MESSAGE_CHARS,
  CHAT_MAX_OUTPUT_TOKENS,
  CHAT_MODEL,
  CHAT_MONTHLY_TOKEN_BUDGET,
  CHAT_RATE_LIMIT_MAX,
  CHAT_TEMPERATURE,
  isReasoningExempt,
  rejectReasoningModel,
} from "@/lib/chat/config";
import { reservationForInput, reserveTokens, settleTokens } from "@/lib/chat/spend";
import { SYSTEM_PROMPT, contextMessage } from "@/lib/chat/prompt";
import { startTrace } from "@/lib/tracing/firetrace";
import { estimateCostUsd } from "@/lib/tracing/pricing";

/**
 * Retrieval-grounded chat over the site's own content. Streams SSE:
 *   event: trace      -> JSON {id} of this turn's trace, for feedback
 *   event: citations  -> JSON array of {title, heading, url}
 *   data: {"delta"}   -> text chunks
 *   event: done       -> JSON usage summary (token counts only)
 * Non-200 responses are JSON with a `code` the UI maps to distinct copy:
 * disabled | rate_limited | budget | invalid | forbidden.
 *
 * Cost controls (non-negotiable): non-reasoning model guard, per-IP rate
 * limit keyed on cf-connecting-ip, input caps, concurrent-stream cap, and
 * a monthly token ceiling.
 *
 * Every turn is traced to FireTrace (lib/tracing/firetrace.ts): retrieval,
 * query embedding, and the model call, with the conversation as the
 * trace's input and output. The trace id is streamed to the client so a
 * thumbs up or down can be linked back to the answer it judges.
 */

// Loud startup guard: a denylisted model fails every request with the
// explanation, not quietly at the end of the billing month.
const MODEL_GUARD_ERROR = rejectReasoningModel(CHAT_MODEL);

const RequestSchema = z.object({
  messages: z
    .array(
      z.union([
        z.object({
          role: z.literal("user"),
          content: z.string().min(1).max(CHAT_MAX_MESSAGE_CHARS),
        }),
        z.object({
          role: z.literal("assistant"),
          content: z.string().min(1).max(CHAT_MAX_ASSISTANT_CHARS),
        }),
      ]),
    )
    .min(1)
    .max(CHAT_MAX_HISTORY),
  pageContext: z
    .string()
    .regex(/^\/[a-z0-9\-/]*$/)
    .optional(),
  // Client-minted per-conversation id, so the turns of one conversation
  // group together in tracing. Not an identity: it dies with the tab.
  sessionId: z.uuid().optional(),
});

/** Per-instance concurrent stream cap (belt to the rate limiter's braces). */
const activeStreams = new Map<string, number>();
const MAX_CONCURRENT_STREAMS = 2;

function jsonError(status: number, code: string, message: string, extra?: HeadersInit) {
  return NextResponse.json({ code, error: message }, { status, headers: extra });
}

export async function POST(request: NextRequest) {
  if (MODEL_GUARD_ERROR) {
    console.error(MODEL_GUARD_ERROR);
    return jsonError(500, "disabled", MODEL_GUARD_ERROR);
  }
  if (!process.env.OPENAI_API_KEY) {
    return jsonError(503, "disabled", "Chat is not configured on this deployment.");
  }

  // Same-origin check: browsers send Origin on fetch POSTs; a mismatched
  // host means another site is driving this endpoint from users' browsers.
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) {
        return jsonError(403, "forbidden", "Cross-origin requests are not allowed.");
      }
    } catch {
      return jsonError(403, "forbidden", "Invalid Origin.");
    }
  }

  const ip = getClientIp(request.headers);
  const limit = await rateLimit(`chat:${ip}`, CHAT_RATE_LIMIT_MAX);
  if (!limit.allowed) {
    return jsonError(429, "rate_limited", "Slow down a little; try again in a minute.", {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  // Acquire the concurrency slot synchronously at the check: check and
  // increment with no await between them, so parallel requests cannot all
  // pass a stale count. Release is idempotent (per-request flag) because
  // both the stream's finally and cancel() may call it, and every early
  // return below must call it too.
  const heldStreams = activeStreams.get(ip) ?? 0;
  if (heldStreams >= MAX_CONCURRENT_STREAMS) {
    return jsonError(429, "rate_limited", "One conversation at a time, hacker.");
  }
  activeStreams.set(ip, heldStreams + 1);
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    const current = (activeStreams.get(ip) ?? 1) - 1;
    if (current <= 0) activeStreams.delete(ip);
    else activeStreams.set(ip, current);
  };

  let body: z.infer<typeof RequestSchema>;
  try {
    body = RequestSchema.parse(await request.json());
  } catch {
    release();
    return jsonError(400, "invalid", "Invalid request shape.");
  }

  // Embed the question plus a condensed tail of the conversation so
  // follow-ups like "what about the demo?" retrieve correctly.
  const userTurns = body.messages.filter((m) => m.role === "user");
  const retrievalQuery = userTurns
    .slice(-3)
    .map((m) => m.content)
    .join("\n");

  const trace = startTrace({
    name: "chat",
    provider: "openai",
    model: CHAT_MODEL,
    sessionId: body.sessionId,
    tags: ["chat"],
    input: body.messages,
    metadata: {
      pageContext: body.pageContext ?? null,
      historyTurns: body.messages.length,
    },
  });

  // The embedding call inside searchCorpus attaches itself to this span
  // through the ambient scope; see lib/retrieval/semantic.ts.
  const retrievalSpan = trace?.span("retrieval", "retriever", {
    input: retrievalQuery,
    attributes: { limit: 8, pageContext: body.pageContext ?? null },
  });
  const runRetrieval = () => searchCorpus(retrievalQuery, 8, { pageContext: body.pageContext });
  const results = retrievalSpan ? await retrievalSpan.run(runRetrieval) : await runRetrieval();
  retrievalSpan?.end({
    output: results.map((r) => ({
      url: r.chunk.url,
      heading: r.chunk.heading,
      score: r.score,
    })),
    attributes: { resultCount: results.length },
  });

  const encoder = new TextEncoder();
  const send = (controller: ReadableStreamDefaultController, event: string | null, data: object) => {
    const prefix = event ? `event: ${event}\n` : "";
    controller.enqueue(encoder.encode(`${prefix}data: ${JSON.stringify(data)}\n\n`));
  };

  // Nothing relevant: answer honestly without spending model tokens.
  if (results.length === 0) {
    // No model stream is held open; the slot frees immediately.
    release();
    const fallback =
      "The playbook doesn't cover that one. Ask me about team formation, ideas, validation, execution, tech stacks, pitching, submission, or what to do after the hackathon.";
    // Worth tracing even though no model ran: a question the corpus cannot
    // answer is the most direct signal of what to write next.
    trace?.end({ output: fallback, metadata: { outcome: "no_content" } });
    const stream = new ReadableStream({
      start(controller) {
        if (trace) send(controller, "trace", { id: trace.id });
        send(controller, "citations", []);
        send(controller, null, { delta: fallback });
        send(controller, "done", { code: "no_content" });
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  }

  const citations = results.map((r) => ({
    title: r.chunk.pageTitle,
    heading: r.chunk.heading,
    url: r.chunk.url,
  }));
  // One citation chip per page, best chunk first.
  const uniqueCitations = citations.filter(
    (c, i) => citations.findIndex((o) => o.url === c.url) === i,
  );

  // Reserve worst-case tokens against the monthly budget BEFORE calling
  // OpenAI, atomically, so concurrent requests cannot collectively pass a
  // stale reading of the counter (reserve/settle semantics and the
  // tokenizer-based worst-case estimate both live in lib/chat/spend.ts).
  const reservedTokens = reservationForInput(
    [SYSTEM_PROMPT, contextMessage(results), ...body.messages.map((m) => m.content)],
    CHAT_MAX_OUTPUT_TOKENS,
  );

  const { result: reservation, key: spendKey } = await reserveTokens(
    reservedTokens,
    CHAT_MONTHLY_TOKEN_BUDGET,
  );
  // Both refusals below still close the trace. A turn that was refused
  // before it reached the model is exactly the kind of thing worth seeing
  // in tracing, and an unclosed trace is never sent at all.
  if (reservation === "over_budget") {
    release();
    trace?.end({ status: "error", metadata: { outcome: "over_budget" } });
    return jsonError(
      503,
      "budget",
      "Chat is taking a break for the rest of the month. The playbook itself is all still here.",
    );
  }
  if (reservation === "unavailable") {
    // Fail closed: cost controls are unreachable, so no spend happens.
    release();
    trace?.end({ status: "error", metadata: { outcome: "budget_unavailable" } });
    return jsonError(503, "api_error", "Chat is briefly unavailable. Try again shortly.");
  }

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI();

  const llmSpan = trace?.span("openai.responses.create", "llm", {
    provider: "openai",
    model: CHAT_MODEL,
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: contextMessage(results) },
      ...body.messages,
    ],
    attributes: {
      temperature: CHAT_TEMPERATURE,
      maxOutputTokens: CHAT_MAX_OUTPUT_TOKENS,
      stream: true,
    },
  });

  try {
    const completion = await client.responses.create({
      model: CHAT_MODEL,
      temperature: CHAT_TEMPERATURE,
      max_output_tokens: CHAT_MAX_OUTPUT_TOKENS,
      // The condition under which a reasoning-capable model is allowed at
      // all (lib/chat/config.ts): effort "none" bills zero reasoning
      // tokens. Non-exempt models reject the parameter, so it is only
      // sent when it applies.
      ...(isReasoningExempt(CHAT_MODEL) ? { reasoning: { effort: "none" as const } } : {}),
      stream: true,
      // No retention on OpenAI's side. The site's own tracing is the
      // record of a conversation (privacy section of /terms).
      store: false,
      // Stable prefix first so prompt caching hits it (see lib/chat/prompt.ts).
      instructions: SYSTEM_PROMPT,
      input: [
        { role: "user", content: contextMessage(results) },
        ...body.messages,
      ],
    });

    // Settlement bookkeeping: exactly one settle per reservation, against
    // the month key that took it (a stream can straddle the boundary).
    // When the stream ends without usage (crash, client disconnect,
    // missing terminal event), the full reservation stands, which errs
    // toward spending less.
    let settled = false;
    const settle = (actualTokens: number) => {
      if (settled) return;
      settled = true;
      void settleTokens(reservedTokens, actualTokens, spendKey);
    };

    type ResponseUsage = {
      input_tokens: number;
      output_tokens: number;
      total_tokens: number;
      input_tokens_details?: { cached_tokens?: number };
      output_tokens_details?: { reasoning_tokens?: number };
    };
    /** Answer text and final usage, replayed into the trace when it closes. */
    let answer = "";
    let finalUsage: ResponseUsage | undefined;

    const accountUsage = (usage: ResponseUsage, terminal: string) => {
      finalUsage = usage;
      const reasoningTokens = usage.output_tokens_details?.reasoning_tokens ?? 0;
      if (reasoningTokens > 0) {
        // The guard has been bypassed; surface it immediately.
        console.error(
          `chat: reasoning_tokens=${reasoningTokens} on model ${CHAT_MODEL}; ` +
            "a reasoning model is burning invisible output tokens. See lib/chat/config.ts.",
        );
      }
      // Server logs stay token-only; the conversation itself goes to
      // tracing, not to stdout.
      console.log(
        `chat: model=${CHAT_MODEL} terminal=${terminal} prompt=${usage.input_tokens} completion=${usage.output_tokens} reasoning=${reasoningTokens} cached=${usage.input_tokens_details?.cached_tokens ?? 0}`,
      );
      settle(usage.total_tokens);
      return reasoningTokens;
    };

    // Exactly one trace per turn, closed by whichever path ends the
    // stream: completion, failure, truncation, or a client disconnect.
    let traceClosed = false;
    const closeTrace = (status: "ok" | "error" | "unset", outcome: string) => {
      if (traceClosed) return;
      traceClosed = true;
      const usage = finalUsage
        ? {
            inputTokens: finalUsage.input_tokens,
            outputTokens: finalUsage.output_tokens,
            totalTokens: finalUsage.total_tokens,
          }
        : undefined;
      const cachedTokens = finalUsage?.input_tokens_details?.cached_tokens ?? 0;
      llmSpan?.end({
        status,
        output: answer,
        usage,
        costUsd: estimateCostUsd(CHAT_MODEL, { ...usage, cachedTokens }),
        attributes: {
          outcome,
          cachedTokens,
          reasoningTokens: finalUsage?.output_tokens_details?.reasoning_tokens ?? 0,
        },
      });
      // No costUsd here: the trace total is the sum of its spans, which
      // picks up the query embedding the route never sees.
      trace?.end({
        status,
        output: answer,
        usage,
        metadata: { outcome, citationCount: uniqueCitations.length },
      });
    };

    const stream = new ReadableStream({
      async start(controller) {
        // Exactly one terminal SSE event per response, so the client never
        // ends ambiguously.
        let terminalSent = false;
        const sendTerminal = (event: "done" | "error", data: object) => {
          if (terminalSent) return;
          terminalSent = true;
          send(controller, event, data);
        };
        // How this turn ended, recorded on the trace in the finally below.
        let outcome = "ended_without_usage";
        let traceStatus: "ok" | "error" | "unset" = "ok";
        try {
          if (trace) send(controller, "trace", { id: trace.id });
          send(controller, "citations", uniqueCitations);
          for await (const part of completion) {
            if (part.type === "response.output_text.delta" && part.delta) {
              answer += part.delta;
              send(controller, null, { delta: part.delta });
            } else if (part.type === "response.failed") {
              console.error("chat: response failed", part.response.error);
              if (part.response.usage) accountUsage(part.response.usage, "failed");
              outcome = "failed";
              traceStatus = "error";
              sendTerminal("error", { code: "api_error" });
            } else if (part.type === "response.incomplete") {
              // Terminates the stream too, e.g. when max_output_tokens is
              // hit; usage must still be accounted and the client must
              // still get a terminal event.
              const usage = part.response.usage;
              const reasoningTokens = usage ? accountUsage(usage, "incomplete") : 0;
              outcome = "incomplete";
              sendTerminal("done", {
                promptTokens: usage?.input_tokens ?? null,
                completionTokens: usage?.output_tokens ?? null,
                reasoningTokens,
                truncated: true,
              });
            } else if (part.type === "response.completed" && part.response.usage) {
              const usage = part.response.usage;
              const reasoningTokens = accountUsage(usage, "completed");
              outcome = "completed";
              // SSE field names are the route's public contract with the
              // widget; they keep their Chat Completions era names.
              sendTerminal("done", {
                promptTokens: usage.input_tokens,
                completionTokens: usage.output_tokens,
                reasoningTokens,
              });
            }
          }
          sendTerminal("done", { promptTokens: null, completionTokens: null, reasoningTokens: 0 });
        } catch (error) {
          console.error("chat: stream failed", error);
          outcome = "stream_failed";
          traceStatus = "error";
          sendTerminal("error", { code: "api_error" });
        } finally {
          closeTrace(traceStatus, outcome);
          release();
          controller.close();
        }
      },
      cancel() {
        // Client went away mid-stream; usage is unknown, reservation stands.
        closeTrace("unset", "client_disconnected");
        release();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  } catch (error) {
    release();
    // The API call never started streaming, so nothing was spent.
    void settleTokens(reservedTokens, 0, spendKey);
    llmSpan?.end({ status: "error", attributes: { outcome: "request_failed" } });
    trace?.end({ status: "error", metadata: { outcome: "request_failed" } });
    console.error("chat: completion failed", error);
    return jsonError(502, "api_error", "The model is unreachable right now. Try again shortly.");
  }
}

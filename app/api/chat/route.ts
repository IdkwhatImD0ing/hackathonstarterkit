import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp } from "@/lib/request-ip";
import { rateLimit } from "@/lib/rate-limit";
import { searchCorpus } from "@/lib/retrieval";
import {
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
import { addMonthlyTokens, getMonthlyTokens } from "@/lib/chat/spend";
import { SYSTEM_PROMPT, contextMessage } from "@/lib/chat/prompt";

/**
 * Retrieval-grounded chat over the site's own content. Streams SSE:
 *   event: citations  -> JSON array of {title, heading, url}
 *   data: {"delta"}   -> text chunks
 *   event: done       -> JSON usage summary (token counts only)
 * Non-200 responses are JSON with a `code` the UI maps to distinct copy:
 * disabled | rate_limited | budget | invalid | forbidden.
 *
 * Cost controls (non-negotiable): non-reasoning model guard, per-IP rate
 * limit keyed on cf-connecting-ip, input caps, concurrent-stream cap, and
 * a monthly token ceiling. Only token counts are logged, never content.
 */

// Loud startup guard: a denylisted model fails every request with the
// explanation, not quietly at the end of the billing month.
const MODEL_GUARD_ERROR = rejectReasoningModel(CHAT_MODEL);

const RequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(CHAT_MAX_MESSAGE_CHARS),
      }),
    )
    .min(1)
    .max(CHAT_MAX_HISTORY),
  pageContext: z
    .string()
    .regex(/^\/[a-z0-9\-/]*$/)
    .optional(),
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

  if ((await getMonthlyTokens()) >= CHAT_MONTHLY_TOKEN_BUDGET) {
    return jsonError(
      503,
      "budget",
      "Chat is taking a break for the rest of the month. The playbook itself is all still here.",
    );
  }

  if ((activeStreams.get(ip) ?? 0) >= MAX_CONCURRENT_STREAMS) {
    return jsonError(429, "rate_limited", "One conversation at a time, hacker.");
  }

  let body: z.infer<typeof RequestSchema>;
  try {
    body = RequestSchema.parse(await request.json());
  } catch {
    return jsonError(400, "invalid", "Invalid request shape.");
  }

  // Embed the question plus a condensed tail of the conversation so
  // follow-ups like "what about the demo?" retrieve correctly.
  const userTurns = body.messages.filter((m) => m.role === "user");
  const retrievalQuery = userTurns
    .slice(-3)
    .map((m) => m.content)
    .join("\n");

  const results = await searchCorpus(retrievalQuery, 8, { pageContext: body.pageContext });

  const encoder = new TextEncoder();
  const send = (controller: ReadableStreamDefaultController, event: string | null, data: object) => {
    const prefix = event ? `event: ${event}\n` : "";
    controller.enqueue(encoder.encode(`${prefix}data: ${JSON.stringify(data)}\n\n`));
  };

  // Nothing relevant: answer honestly without spending model tokens.
  if (results.length === 0) {
    const stream = new ReadableStream({
      start(controller) {
        send(controller, "citations", []);
        send(controller, null, {
          delta:
            "The playbook doesn't cover that one. Ask me about team formation, ideas, validation, execution, tech stacks, pitching, submission, or what to do after the hackathon.",
        });
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

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI();

  activeStreams.set(ip, (activeStreams.get(ip) ?? 0) + 1);
  const release = () => {
    const current = (activeStreams.get(ip) ?? 1) - 1;
    if (current <= 0) activeStreams.delete(ip);
    else activeStreams.set(ip, current);
  };

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
      // Visitor questions must not be persisted on OpenAI's side; this
      // route's contract is that only token counts outlive the request.
      store: false,
      // Stable prefix first so prompt caching hits it (see lib/chat/prompt.ts).
      instructions: SYSTEM_PROMPT,
      input: [
        { role: "user", content: contextMessage(results) },
        ...body.messages,
      ],
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          send(controller, "citations", uniqueCitations);
          for await (const part of completion) {
            if (part.type === "response.output_text.delta" && part.delta) {
              send(controller, null, { delta: part.delta });
            } else if (part.type === "response.failed") {
              console.error("chat: response failed", part.response.error);
              send(controller, "error", { code: "api_error" });
            } else if (part.type === "response.completed" && part.response.usage) {
              const usage = part.response.usage;
              const reasoningTokens =
                usage.output_tokens_details?.reasoning_tokens ?? 0;
              if (reasoningTokens > 0) {
                // The guard has been bypassed; surface it immediately.
                console.error(
                  `chat: reasoning_tokens=${reasoningTokens} on model ${CHAT_MODEL}; ` +
                    "a reasoning model is burning invisible output tokens. See lib/chat/config.ts.",
                );
              }
              // Token counts only; never message content.
              console.log(
                `chat: model=${CHAT_MODEL} prompt=${usage.input_tokens} completion=${usage.output_tokens} reasoning=${reasoningTokens} cached=${usage.input_tokens_details?.cached_tokens ?? 0}`,
              );
              await addMonthlyTokens(usage.total_tokens);
              // SSE field names are the route's public contract with the
              // widget; they keep their Chat Completions era names.
              send(controller, "done", {
                promptTokens: usage.input_tokens,
                completionTokens: usage.output_tokens,
                reasoningTokens,
              });
            }
          }
        } catch (error) {
          console.error("chat: stream failed", error);
          send(controller, "error", { code: "api_error" });
        } finally {
          release();
          controller.close();
        }
      },
      cancel() {
        release();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  } catch (error) {
    release();
    console.error("chat: completion failed", error);
    return jsonError(502, "api_error", "The model is unreachable right now. Try again shortly.");
  }
}

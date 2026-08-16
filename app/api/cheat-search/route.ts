import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp } from "@/lib/request-ip";
import { rateLimit } from "@/lib/rate-limit";
import { CHEAT_SECTIONS } from "@/lib/cheat-sheet";
import {
  CHAT_MODEL,
  CHAT_MONTHLY_TOKEN_BUDGET,
  isReasoningExempt,
  rejectReasoningModel,
} from "@/lib/chat/config";
import { reservationForInput, reserveTokens, settleTokens } from "@/lib/chat/spend";

/**
 * The cheat sheet's prompt finder: the reader describes their situation in a
 * sentence, the model picks the one prompt on the sheet built for that
 * moment. Output is constrained to the sheet's prompt ids via a structured
 * output schema, so the response is always a real card or an error, never
 * free text.
 *
 * Cost controls mirror /api/chat and share its monthly budget: same model
 * config (non-reasoning guard included), per-IP rate limit, input cap, and
 * reserve/settle accounting. Only token counts are logged, never queries.
 */

const MODEL_GUARD_ERROR = rejectReasoningModel(CHAT_MODEL);

const MAX_QUERY_CHARS = 300;
const MAX_OUTPUT_TOKENS = 150;
const RATE_LIMIT_MAX = Number(process.env.CHEAT_SEARCH_RATE_LIMIT_MAX ?? 30);

const RequestSchema = z.object({
  query: z.string().trim().min(3).max(MAX_QUERY_CHARS),
});

/** id -> catalog line, built once from the same data that renders the page. */
const PROMPT_IDS = CHEAT_SECTIONS.flatMap((s) => s.prompts.map((p) => p.id));

const CATALOG = CHEAT_SECTIONS.map(
  (section) =>
    `## ${section.title} (${section.timing})\n` +
    section.prompts
      .map((p) => `- id: ${p.id} | ${p.title} | use when: ${p.when}`)
      .join("\n"),
).join("\n\n");

const SYSTEM_PROMPT = `You match a hackathon builder's situation to ONE prompt from the catalog below. Each prompt is a paste-ready instruction for their AI coding agent.

Pick the single prompt whose "use when" best fits what they describe, preferring the most specific match over a general one, and the prompt for the moment they are IN over one for a moment they have not reached. If they describe a crisis (something broke, no time left), prefer the Panic or Unstick prompts. If nothing fits well, pick the closest match anyway; never refuse.

Reply with the prompt id and one short sentence (under 25 words) telling them why that card, written directly to them ("you", not "the user").

# Catalog

${CATALOG}`;

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    id: { type: "string", enum: PROMPT_IDS },
    reason: { type: "string" },
  },
  required: ["id", "reason"],
  additionalProperties: false,
} as const;

function jsonError(status: number, code: string, message: string, extra?: HeadersInit) {
  return NextResponse.json({ code, error: message }, { status, headers: extra });
}

export async function POST(request: NextRequest) {
  if (MODEL_GUARD_ERROR) {
    console.error(MODEL_GUARD_ERROR);
    return jsonError(500, "disabled", MODEL_GUARD_ERROR);
  }
  if (!process.env.OPENAI_API_KEY) {
    return jsonError(503, "disabled", "Search is not configured on this deployment.");
  }

  // Same-origin check, same rationale as /api/chat.
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
  const limit = await rateLimit(`cheat-search:${ip}`, RATE_LIMIT_MAX);
  if (!limit.allowed) {
    return jsonError(429, "rate_limited", "Slow down a little; try again in a minute.", {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  let body: z.infer<typeof RequestSchema>;
  try {
    body = RequestSchema.parse(await request.json());
  } catch {
    return jsonError(400, "invalid", "Invalid request shape.");
  }

  const reservedTokens = reservationForInput(
    [SYSTEM_PROMPT, body.query],
    MAX_OUTPUT_TOKENS,
  );
  const { result: reservation, key: spendKey } = await reserveTokens(
    reservedTokens,
    CHAT_MONTHLY_TOKEN_BUDGET,
  );
  if (reservation === "over_budget") {
    return jsonError(503, "budget", "Search is taking a break for the rest of the month.");
  }
  if (reservation === "unavailable") {
    return jsonError(503, "api_error", "Search is briefly unavailable. Try again shortly.");
  }

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI();

  try {
    const response = await client.responses.create({
      model: CHAT_MODEL,
      temperature: 0,
      max_output_tokens: MAX_OUTPUT_TOKENS,
      ...(isReasoningExempt(CHAT_MODEL) ? { reasoning: { effort: "none" as const } } : {}),
      store: false,
      instructions: SYSTEM_PROMPT,
      input: [{ role: "user", content: body.query }],
      text: {
        format: {
          type: "json_schema",
          name: "cheat_prompt_match",
          strict: true,
          schema: OUTPUT_SCHEMA,
        },
      },
    });

    const usage = response.usage;
    console.log(
      `cheat-search: model=${CHAT_MODEL} prompt=${usage?.input_tokens ?? "?"} completion=${usage?.output_tokens ?? "?"}`,
    );
    void settleTokens(reservedTokens, usage?.total_tokens ?? reservedTokens, spendKey);

    const parsed = JSON.parse(response.output_text) as { id: string; reason: string };
    // Belt to the schema's braces: never hand the client an unknown id.
    if (!PROMPT_IDS.includes(parsed.id)) {
      return jsonError(502, "api_error", "The model picked an unknown prompt.");
    }
    return NextResponse.json(
      { id: parsed.id, reason: parsed.reason },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    void settleTokens(reservedTokens, 0, spendKey);
    console.error("cheat-search: completion failed", error);
    return jsonError(502, "api_error", "The model is unreachable right now. Try again shortly.");
  }
}

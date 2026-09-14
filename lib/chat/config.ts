/**
 * Chat model configuration. THE model name lives here and nowhere else.
 *
 * Default: gpt-5.6-luna, pinned to reasoning_effort "none" in the chat
 * route so it bills zero hidden reasoning tokens.
 * Pricing (OpenAI's July 30, 2026 price cut, checked 2026-08-15):
 * $0.20 / 1M input, $0.02 / 1M cached input, $1.20 / 1M output.
 * That is 2x the input and 3x the output rate of gpt-4.1-nano
 * ($0.10 / $0.40), the previous default. The switch to Luna was an
 * explicit owner decision (2026-08-15), made with those numbers on the
 * table; if cost ever becomes the priority again, gpt-4.1-nano remains
 * the cheaper choice.
 *
 * HARD REQUIREMENT: this must be a model that bills no reasoning tokens,
 * either a non-reasoning model or a reasoning-capable model on the
 * REASONING_EXEMPT allowlist below with effort pinned to "none".
 * Reasoning models at default effort bill their invisible
 * chain-of-thought as output tokens at output prices; published
 * measurements show gpt-5-nano spending ~80% of billed output on
 * reasoning the user never sees. For a RAG chatbot that has already been
 * handed the answer in its context, paying a model to deliberate over
 * retrieved text is pure waste. The chat route asserts
 * reasoning_tokens === 0 on every response as the runtime backstop.
 */
export const DEFAULT_CHAT_MODEL = "gpt-5.6-luna";

/**
 * Reasoning-capable models allowed anyway, because the chat route pins
 * reasoning_effort to "none" for them. Adding a model here without
 * verifying that (a) it accepts effort "none" and (b) the usage log
 * shows reasoning=0 defeats the entire cost guard.
 */
const REASONING_EXEMPT_MODELS = new Set(["gpt-5.6-luna"]);

export function isReasoningExempt(model: string): boolean {
  return REASONING_EXEMPT_MODELS.has(model);
}

export const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL ?? DEFAULT_CHAT_MODEL;

/**
 * Guard against well-intentioned "upgrades" to reasoning models. Someone
 * will eventually try to move this to a newer nano tier and quietly
 * multiply the bill; make that impossible. Checked at module load of the
 * chat route; a denylisted model fails every request loudly.
 */
const REASONING_MODEL_PATTERNS = [
  /^o\d/i, //           o1, o3, o4-mini, ...
  /^gpt-5/i, //         every gpt-5.x tier bills hidden reasoning tokens
  /reasoning/i,
];

export function rejectReasoningModel(model: string): string | null {
  if (isReasoningExempt(model)) return null;
  for (const pattern of REASONING_MODEL_PATTERNS) {
    if (pattern.test(model)) {
      return (
        `OPENAI_CHAT_MODEL="${model}" is a reasoning model and is refused. ` +
        `Reasoning models bill hidden chain-of-thought as output tokens at ` +
        `4-8x input price, which multiplies the cost of a RAG chatbot for ` +
        `zero benefit (retrieval already did the reasoning). Use a ` +
        `non-reasoning model such as ${DEFAULT_CHAT_MODEL}. See lib/chat/config.ts.`
      );
    }
  }
  return null;
}

export const CHAT_MAX_OUTPUT_TOKENS = 600;
export const CHAT_TEMPERATURE = 0.2;

/** Input caps (abuse control). */
export const CHAT_MAX_MESSAGE_CHARS = 1500;
/**
 * Assistant history turns echo prior answers, whose length is bounded by
 * CHAT_MAX_OUTPUT_TOKENS (600 tokens ≈ 2-3k chars), not by the user cap;
 * capping them at CHAT_MAX_MESSAGE_CHARS rejected every follow-up after a
 * long answer. Every allowed char is reserved against the budget, so the
 * cap sits just above what the model can actually produce.
 */
// 6 chars/token = 3,600: 600-token windows of the site's own Markdown top out at 2,923 chars (4.9/token, o200k), ~23% headroom.
export const CHAT_MAX_ASSISTANT_CHARS = CHAT_MAX_OUTPUT_TOKENS * 6;
export const CHAT_MAX_HISTORY = 10;

/**
 * A numeric env var, or `fallback` when it is unset or blank. A malformed
 * value would otherwise remove the cap it sets: Number("20_000_000") is
 * NaN, and `total > NaN` is always false. So a bad value is logged loudly
 * and replaced by the documented default. Zero is only valid where it has
 * a documented meaning (a budget of 0 switches chat off).
 */
export function envNumber(
  name: string,
  fallback: number,
  { allowZero = false }: { allowZero?: boolean } = {},
): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const value = Number(raw);
  if (Number.isFinite(value) && (value > 0 || (allowZero && value === 0))) return value;
  console.error(
    `config: ${name}="${raw}" is not a valid ${allowZero ? "number >= 0" : "positive number"} ` +
      `(no underscores or commas); falling back to the default, ${fallback}.`,
  );
  return fallback;
}

export const CHAT_RATE_LIMIT_MAX = envNumber("CHAT_RATE_LIMIT_MAX", 20);

/** Monthly output+input token ceiling across all users; 0 disables chat. */
export const CHAT_MONTHLY_TOKEN_BUDGET = envNumber("CHAT_MONTHLY_TOKEN_BUDGET", 20_000_000, {
  allowZero: true,
});

/**
 * Daily ceiling (UTC day) under the monthly one, so one bad day cannot
 * empty the month. Default: 8.4M tokens, sized for about 2,000 chat turns
 * a day at the heavy end of real usage (~4.2K tokens per turn), which is
 * roughly $3/day at the lib/tracing/pricing.ts rates. It sits well above a
 * tenth of the default monthly budget on purpose, for launch traffic; a
 * full day at this cap spends about 40% of a 20M month. 0 disables chat.
 */
export const CHAT_DAILY_TOKEN_BUDGET = envNumber("CHAT_DAILY_TOKEN_BUDGET", 8_400_000, {
  allowZero: true,
});

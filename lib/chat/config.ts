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
export const CHAT_MAX_HISTORY = 10;

export const CHAT_RATE_LIMIT_MAX = Number(process.env.CHAT_RATE_LIMIT_MAX ?? 20);

/** Monthly output+input token ceiling across all users; 0 disables chat. */
export const CHAT_MONTHLY_TOKEN_BUDGET = Number(
  process.env.CHAT_MONTHLY_TOKEN_BUDGET ?? 20_000_000,
);

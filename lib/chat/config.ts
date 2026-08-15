/**
 * Chat model configuration. THE model name lives here and nowhere else.
 *
 * Default: gpt-4.1-nano.
 * Last known pricing: $0.10 / 1M input tokens, $0.40 / 1M output tokens.
 * The pricing page (https://platform.openai.com/docs/pricing) was not
 * reachable from the environment that authored this file on 2026-08-15;
 * verify the current rate there before trusting cost projections.
 *
 * HARD REQUIREMENT: this must be a NON-REASONING model. Reasoning models
 * (gpt-5.x tiers, o-series) bill their invisible chain-of-thought as
 * output tokens at output prices; published measurements show gpt-5-nano
 * spending ~80% of billed output on reasoning the user never sees, where
 * gpt-4.1-nano spends zero. For a RAG chatbot that has already been
 * handed the answer in its context, paying a model to deliberate over
 * retrieved text is pure waste. Reasoning models also lock temperature
 * to 1. If a cheaper non-reasoning model appears, propose it with
 * numbers; do not swap it in silently.
 */
export const DEFAULT_CHAT_MODEL = "gpt-4.1-nano";

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

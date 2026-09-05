/**
 * USD cost per model, so traces carry `costUsd` instead of leaving spend
 * to be reconstructed from token counts later.
 *
 * Rates are per 1M tokens and come from the numbers already recorded in
 * this repo, not from anywhere new: lib/chat/config.ts for the chat models
 * (OpenAI's July 30, 2026 price cut, checked 2026-08-15) and
 * scripts/build-index.mts for embeddings.
 *
 * Two deliberate choices:
 *
 * 1. A model that is not in the table gets NO costUsd rather than a
 *    guessed one. A missing number is obvious in a dashboard; a wrong one
 *    quietly poisons every total built on it.
 * 2. Cached input is billed at its own lower rate, so cached tokens are
 *    subtracted from the input count rather than charged twice. On this
 *    site's chat the system prompt is a stable cacheable prefix, so the
 *    difference is not rounding noise.
 *
 * These prices go stale. Verify against
 * https://platform.openai.com/docs/pricing when they matter.
 */

export interface ModelPrice {
  /** USD per 1M input tokens. */
  input: number;
  /** USD per 1M output tokens. */
  output: number;
  /** USD per 1M cached input tokens, when the model bills them lower. */
  cachedInput?: number;
}

export const MODEL_PRICES: Record<string, ModelPrice> = {
  "gpt-5.6-luna": { input: 0.2, cachedInput: 0.02, output: 1.2 },
  "gpt-4.1-nano": { input: 0.1, output: 0.4 },
  "text-embedding-3-small": { input: 0.02, output: 0 },
};

export interface CostInput {
  inputTokens?: number;
  outputTokens?: number;
  /** Subset of inputTokens that hit the prompt cache. */
  cachedTokens?: number;
}

/**
 * Cost of one call in USD, or undefined when the model's price is unknown.
 */
export function estimateCostUsd(
  model: string | undefined,
  usage: CostInput,
): number | undefined {
  if (!model) return undefined;
  const price = MODEL_PRICES[model];
  if (!price) return undefined;

  const cached = usage.cachedTokens ?? 0;
  const uncachedInput = Math.max((usage.inputTokens ?? 0) - cached, 0);
  const cost =
    (uncachedInput * price.input +
      cached * (price.cachedInput ?? price.input) +
      (usage.outputTokens ?? 0) * price.output) /
    1_000_000;

  // A single chat turn costs small fractions of a cent, so rounding to
  // cents would store zero for everything. Ten decimals keeps sums exact
  // at this volume without carrying float noise into the payload.
  return Number(cost.toFixed(10));
}

import { describe, expect, it } from "vitest";
import { MODEL_PRICES, estimateCostUsd } from "@/lib/tracing/pricing";
import { DEFAULT_CHAT_MODEL } from "@/lib/chat/config";

/**
 * Cost attached to traces. The point of these is that a wrong number is
 * worse than no number: a missing costUsd is visible in a dashboard,
 * while a guessed one silently poisons every total built on it.
 */
describe("estimateCostUsd", () => {
  it("prices the default chat model, so traces are not silently costless", () => {
    // The guard that matters: whatever lib/chat/config.ts ships as the
    // default must have a price, or every chat trace loses its cost.
    expect(MODEL_PRICES[DEFAULT_CHAT_MODEL]).toBeDefined();
  });

  it("charges input and output at their own rates", () => {
    // gpt-5.6-luna: $0.20 / 1M input, $1.20 / 1M output.
    expect(estimateCostUsd("gpt-5.6-luna", { inputTokens: 1e6 })).toBe(0.2);
    expect(estimateCostUsd("gpt-5.6-luna", { outputTokens: 1e6 })).toBe(1.2);
    expect(estimateCostUsd("gpt-5.6-luna", { inputTokens: 1e6, outputTokens: 1e6 })).toBe(1.4);
  });

  it("bills cached input at the cached rate instead of twice", () => {
    // Cached tokens are a SUBSET of inputTokens, so charging both rates on
    // the full count would overstate every cached turn. Half of 1M cached:
    // 500k at $0.20/1M plus 500k at $0.02/1M = $0.10 + $0.01.
    expect(
      estimateCostUsd("gpt-5.6-luna", { inputTokens: 1e6, cachedTokens: 5e5 }),
    ).toBe(0.11);
    // Fully cached input costs the cached rate alone.
    expect(
      estimateCostUsd("gpt-5.6-luna", { inputTokens: 1e6, cachedTokens: 1e6 }),
    ).toBe(0.02);
  });

  it("never goes negative when cached exceeds the reported input", () => {
    expect(
      estimateCostUsd("gpt-5.6-luna", { inputTokens: 100, cachedTokens: 500 }),
    ).toBe(estimateCostUsd("gpt-5.6-luna", { inputTokens: 0, cachedTokens: 500 }));
    expect(
      estimateCostUsd("gpt-5.6-luna", { inputTokens: 100, cachedTokens: 500 })!,
    ).toBeGreaterThanOrEqual(0);
  });

  it("prices embeddings, whose output is free", () => {
    expect(estimateCostUsd("text-embedding-3-small", { inputTokens: 1e6 })).toBe(0.02);
  });

  it("returns undefined rather than guessing an unknown model", () => {
    expect(estimateCostUsd("gpt-9-imaginary", { inputTokens: 1e6 })).toBeUndefined();
    expect(estimateCostUsd(undefined, { inputTokens: 1e6 })).toBeUndefined();
  });

  it("keeps precision on a realistic single turn", () => {
    // A real turn from this site: 2429 prompt, 343 completion, 0 cached.
    const cost = estimateCostUsd("gpt-5.6-luna", {
      inputTokens: 2429,
      outputTokens: 343,
    });
    expect(cost).toBeCloseTo((2429 * 0.2 + 343 * 1.2) / 1e6, 12);
    // Rounding to cents would have stored zero.
    expect(cost).toBeGreaterThan(0);
  });
});

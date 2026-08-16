import { describe, expect, it } from "vitest";
import { countTokens } from "gpt-tokenizer";
import { reservationForInput, reserveTokens, settleTokens } from "@/lib/chat/spend";
import { memoryLimit } from "@/lib/rate-limit";

/**
 * Memory-path semantics of the cost controls (the Redis paths mirror them
 * atomically via INCRBY/rollback and a Lua sliding window; those need a
 * live Redis and are exercised in production). Sequential state within
 * each test block is intentional: the counters are module-scoped.
 */

describe("reserveTokens / settleTokens (memory path)", () => {
  it("reserves, refuses over-budget, and frees capacity on settle", async () => {
    const budget = 1_000;

    expect(await reserveTokens(500, budget)).toBe("ok");
    // 500 reserved; another 600 would exceed the ceiling.
    expect(await reserveTokens(600, budget)).toBe("over_budget");

    // Actual usage was only 100 of the 500 reserved; 400 frees up.
    await settleTokens(500, 100);
    expect(await reserveTokens(600, budget)).toBe("ok");

    // Rejected reservations must not consume budget: currently at 700,
    // a 400 attempt is refused and the counter stays at 700.
    expect(await reserveTokens(400, budget)).toBe("over_budget");
    expect(await reserveTokens(300, budget)).toBe("ok");
  });
});

describe("reservationForInput", () => {
  // Adversarial-tokenization inputs where a chars-based estimate
  // underestimates badly: CJK (~1 token per char), emoji (multiple tokens
  // per char), and mixed symbols.
  const adversarial = [
    "日本語のテキストで質問しますがトークン数は文字数より多いです".repeat(8),
    "🚀🎉🔥💡🧠".repeat(40),
    "ハッカソンで優勝する方法を教えて 🏆 ¿cómo? Ω≈ç√∫˜µ".repeat(10),
  ];

  it("reserves at least the real tokenizer count of the input plus the output cap", () => {
    for (const text of adversarial) {
      const reserved = reservationForInput([text], 600);
      const actualInputTokens = countTokens(text);
      // actual usage = input + at most 600 output; reservation must cover it
      expect(reserved).toBeGreaterThanOrEqual(actualInputTokens + 600);
      // and the old chars/3 heuristic would NOT have covered it, proving
      // the regression this guards against
      expect(Math.ceil(text.length / 3) + 600).toBeLessThan(actualInputTokens + 600);
    }
  });

  it("covers multi-text inputs the way the route composes them", () => {
    const texts = ["system prompt text", adversarial[0], "user question 🚀"];
    const reserved = reservationForInput(texts, 600);
    const actual = texts.reduce((s, t) => s + countTokens(t), 0) + 600;
    expect(reserved).toBeGreaterThanOrEqual(actual);
  });
});

describe("memoryLimit sliding window", () => {
  it("rejects past the max without extending the window", () => {
    const key = `test:${Math.random()}`;
    for (let i = 0; i < 3; i++) {
      expect(memoryLimit(key, 3).allowed).toBe(true);
    }
    const rejected = memoryLimit(key, 3);
    expect(rejected.allowed).toBe(false);
    expect(rejected.retryAfterSeconds).toBeGreaterThan(0);
    // A rejected request must not count as a hit: raising the max by one
    // admits exactly one more request, proving only 3 hits were recorded.
    expect(memoryLimit(key, 4).allowed).toBe(true);
    expect(memoryLimit(key, 4).allowed).toBe(false);
  });
});

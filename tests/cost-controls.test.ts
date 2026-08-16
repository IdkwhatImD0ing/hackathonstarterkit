import { afterEach, describe, expect, it, vi } from "vitest";
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
  afterEach(() => {
    vi.useRealTimers();
  });

  it("reserves, refuses over-budget, and frees capacity on settle", async () => {
    const budget = 1_000;

    const first = await reserveTokens(500, budget);
    expect(first.result).toBe("ok");
    // 500 reserved; another 600 would exceed the ceiling.
    expect((await reserveTokens(600, budget)).result).toBe("over_budget");

    // Actual usage was only 100 of the 500 reserved; 400 frees up.
    await settleTokens(500, 100, first.key);
    expect((await reserveTokens(600, budget)).result).toBe("ok");

    // Rejected reservations must not consume budget: currently at 700,
    // a 400 attempt is refused and the counter stays at 700.
    expect((await reserveTokens(400, budget)).result).toBe("over_budget");
    expect((await reserveTokens(300, budget)).result).toBe("ok");
  });

  it("settles against the month that took the reservation, not the settle-time month", async () => {
    // Fake dates far from the real clock so these counters cannot collide
    // with the other tests' month keys.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2031-08-31T23:59:00Z"));
    const budget = 1_000;

    const reservation = await reserveTokens(800, budget);
    expect(reservation.result).toBe("ok");
    expect((await reserveTokens(300, budget)).result).toBe("over_budget");

    // The stream terminates after midnight UTC. Settlement must free the
    // August counter (the month that took the reservation); recomputing
    // the key here would instead push September's fresh counter negative,
    // silently raising its ceiling.
    vi.setSystemTime(new Date("2031-09-01T00:00:30Z"));
    await settleTokens(800, 100, reservation.key);

    // September starts from a clean counter, not a negative one.
    const september = await reserveTokens(budget, budget);
    expect(september.result).toBe("ok");
    await settleTokens(budget, 0, september.key);

    // And August really was settled down to 100: 300 fits now.
    vi.setSystemTime(new Date("2031-08-31T23:59:30Z"));
    expect((await reserveTokens(300, budget)).result).toBe("ok");
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
  const utf8Bytes = (text: string) => new TextEncoder().encode(text).length;

  // The invariant the reservation rests on: a byte-fallback BPE tokenizer
  // cannot emit more tokens than UTF-8 bytes, so covering the byte length
  // covers ANY such serving tokenizer, not just the one in this repo.
  it("reserves at least the UTF-8 byte length of the input plus the output cap", () => {
    for (const text of adversarial) {
      const reserved = reservationForInput([text], 600);
      expect(reserved).toBeGreaterThanOrEqual(utf8Bytes(text) + 600);
      // the old chars/3 heuristic sat far below the bound; regression proof
      expect(Math.ceil(text.length / 3) + 600).toBeLessThan(utf8Bytes(text) + 600);
    }
  });

  it("byte bound dominates a real tokenizer's count on the same input", () => {
    // Sanity that the bound is genuinely above an actual BPE tokenization,
    // not merely above itself (gpt-tokenizer here is a reference point, not
    // the definition of the bound).
    for (const text of [...adversarial, "plain english question about pitching"]) {
      expect(utf8Bytes(text)).toBeGreaterThanOrEqual(countTokens(text));
    }
  });

  it("covers multi-text inputs the way the route composes them", () => {
    const texts = ["system prompt text", adversarial[0], "user question 🚀"];
    const reserved = reservationForInput(texts, 600);
    const bound = texts.reduce((s, t) => s + utf8Bytes(t), 0) + 600;
    expect(reserved).toBeGreaterThanOrEqual(bound);
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

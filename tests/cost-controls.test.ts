import { describe, expect, it } from "vitest";
import { reserveTokens, settleTokens } from "@/lib/chat/spend";
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

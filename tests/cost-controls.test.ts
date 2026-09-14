import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { countTokens } from "gpt-tokenizer";
import { NextRequest } from "next/server";
import { reservationForInput, reserveTokens, settleTokens } from "@/lib/chat/spend";
import { envNumber } from "@/lib/chat/config";
import { memoryLimit } from "@/lib/rate-limit";
import { POST as chatPOST } from "@/app/api/chat/route";
import { POST as cheatSearchPOST } from "@/app/api/cheat-search/route";

/**
 * Memory-path semantics of the cost controls. The Redis paths run the same
 * checks as Lua scripts, which need a live Redis and are exercised in
 * production; their JS side (the commands sent, how replies and errors are
 * handled) is tested below with fetch faked. Sequential state within each
 * test block is intentional: the counters are module-scoped, so every test
 * that touches them pins its own date.
 *
 * The route tests at the bottom drive the real handlers with the model and
 * retrieval faked, so nothing calls a live API. settleTokens stays the real
 * function, wrapped so those tests can count settlements.
 */
const model = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock("openai", () => ({
  default: class {
    responses = { create: model.create };
  },
}));
vi.mock("@/lib/retrieval", () => ({
  searchCorpus: async () => [
    {
      chunk: {
        pageTitle: "Pitching",
        heading: "Demo first",
        url: "https://example.test/playbook/pitching",
        text: "Lead with the demo.",
      },
      score: 1,
    },
  ],
}));
vi.mock("@/lib/chat/spend", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/chat/spend")>();
  return { ...actual, settleTokens: vi.fn(actual.settleTokens) };
});

describe("reserveTokens / settleTokens (memory path)", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("reserves, refuses over-budget, and frees capacity on settle", async () => {
    vi.setSystemTime(new Date("2031-03-10T12:00:00Z"));
    const budgets = { monthly: 1_000, daily: 1_000 };

    const first = await reserveTokens(500, budgets);
    expect(first.result).toBe("ok");
    // 500 reserved; another 600 would exceed the ceiling.
    expect((await reserveTokens(600, budgets)).result).toBe("over_budget");

    // Actual usage was only 100 of the 500 reserved; 400 frees up.
    await settleTokens(500, 100, first.keys);
    expect((await reserveTokens(600, budgets)).result).toBe("ok");

    // Rejected reservations must not consume budget: currently at 700,
    // a 400 attempt is refused and the counter stays at 700.
    expect((await reserveTokens(400, budgets)).result).toBe("over_budget");
    expect((await reserveTokens(300, budgets)).result).toBe("ok");
  });

  it("settles against the month and day that took the reservation, not the settle-time ones", async () => {
    vi.setSystemTime(new Date("2031-08-31T23:59:00Z"));
    const budgets = { monthly: 1_000, daily: 1_000 };

    const reservation = await reserveTokens(800, budgets);
    expect(reservation.result).toBe("ok");
    expect((await reserveTokens(300, budgets)).result).toBe("over_budget");

    // The stream terminates after midnight UTC, on a new day in a new
    // month. Settlement must free the August 31 counters (the ones that
    // took the reservation); recomputing the keys here would instead push
    // September's fresh counters negative, silently raising their ceiling.
    vi.setSystemTime(new Date("2031-09-01T00:00:30Z"));
    await settleTokens(800, 100, reservation.keys);

    // September 1 starts from clean counters, not negative ones.
    const september = await reserveTokens(1_000, budgets);
    expect(september.result).toBe("ok");
    await settleTokens(1_000, 0, september.keys);

    // And August 31 really was settled down to 100: 300 fits now.
    vi.setSystemTime(new Date("2031-08-31T23:59:30Z"));
    expect((await reserveTokens(300, budgets)).result).toBe("ok");
  });

  it("refuses once the daily budget is spent, with monthly room left, until the UTC day rolls over", async () => {
    vi.setSystemTime(new Date("2032-03-10T12:00:00Z"));
    const budgets = { monthly: 10_000, daily: 1_000 };

    expect((await reserveTokens(800, budgets)).result).toBe("ok");
    expect(await reserveTokens(300, budgets)).toMatchObject({
      result: "over_budget",
      exceeded: "daily",
    });
    // One server-side line naming the budget and the counter it hit.
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(vi.mocked(console.error).mock.calls[0][0]).toMatch(
      /daily token budget reached.*counter 800 \+ reservation 300 > budget 1000/,
    );

    // The refusal consumed nothing: 200 still fits today.
    expect((await reserveTokens(200, budgets)).result).toBe("ok");

    // Still full at the last second of the UTC day; fresh one second later,
    // while the month keeps counting.
    vi.setSystemTime(new Date("2032-03-10T23:59:59Z"));
    expect((await reserveTokens(1, budgets)).exceeded).toBe("daily");
    vi.setSystemTime(new Date("2032-03-11T00:00:00Z"));
    expect((await reserveTokens(1_000, budgets)).result).toBe("ok");
  });

  it("names the monthly budget when that is the one exceeded", async () => {
    vi.setSystemTime(new Date("2032-04-10T12:00:00Z"));
    const budgets = { monthly: 1_000, daily: 5_000 };

    expect((await reserveTokens(900, budgets)).result).toBe("ok");
    expect((await reserveTokens(200, budgets)).exceeded).toBe("monthly");
    expect(vi.mocked(console.error).mock.calls[0][0]).toMatch(
      /monthly token budget reached.*counter 900 /,
    );
  });

  it("settles both counters down to actual usage", async () => {
    vi.setSystemTime(new Date("2032-07-15T12:00:00Z"));
    const reservation = await reserveTokens(900, { monthly: 1_000, daily: 1_000 });
    await settleTokens(900, 100, reservation.keys);

    // Each probe leaves one budget in play, and fits only if that counter
    // was settled from 900 down to 100.
    const monthProbe = await reserveTokens(900, { monthly: 1_000, daily: Infinity });
    expect(monthProbe.result).toBe("ok");
    await settleTokens(900, 0, monthProbe.keys);
    const dayProbe = await reserveTokens(900, { monthly: Infinity, daily: 1_000 });
    expect(dayProbe.result).toBe("ok");
  });
});

describe("reserveTokens / settleTokens (Redis path, fetch faked)", () => {
  const budgets = { monthly: 20_000_000, daily: 2_000_000 };

  beforeEach(() => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.test");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-token");
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2032-09-14T08:00:00Z"));
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const fakeRedis = (...replies: unknown[]) => {
    const fetchMock = vi.fn(async () => Response.json({ result: replies.shift() }));
    vi.stubGlobal("fetch", fetchMock);
    return () =>
      fetchMock.mock.calls.map((call) => JSON.parse((call as unknown as [string, RequestInit])[1].body as string));
  };

  it("reserves and settles both counters, keyed by UTC month and day, in one command each", async () => {
    const sent = fakeRedis(["ok", 0], 1);

    const reservation = await reserveTokens(500, budgets);
    expect(reservation).toMatchObject({
      result: "ok",
      keys: { month: "spend:tokens:2032-09", day: "spend:tokens:2032-09-14" },
    });
    await settleTokens(500, 120, reservation.keys);

    const [reserve, settle] = sent();
    expect(reserve.slice(0, 1)).toEqual(["EVAL"]);
    expect(reserve.slice(2, 8)).toEqual([
      "2",
      "spend:tokens:2032-09",
      "spend:tokens:2032-09-14",
      "500",
      "20000000",
      "2000000",
    ]);
    expect(settle.slice(2)).toEqual(["2", "spend:tokens:2032-09", "spend:tokens:2032-09-14", "-380"]);
  });

  it("refuses with the budget Redis reports and logs its counter", async () => {
    fakeRedis(["daily", 1_990_000]);

    expect(await reserveTokens(20_000, budgets)).toMatchObject({
      result: "over_budget",
      exceeded: "daily",
    });
    expect(vi.mocked(console.error).mock.calls[0][0]).toMatch(
      /daily token budget reached.*counter 1990000 \+ reservation 20000 > budget 2000000/,
    );
  });

  it("fails closed when Redis errors or is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("boom", { status: 500 })));
    expect((await reserveTokens(500, budgets)).result).toBe("unavailable");

    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new Error("ECONNRESET"))));
    expect((await reserveTokens(500, budgets)).result).toBe("unavailable");
  });
});

describe("envNumber", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("falls back loudly to the default on malformed values instead of dropping the cap", () => {
    const bad = ["20_000_000", "20,000,000", "abc", "Infinity", "-5"];
    for (const value of bad) {
      vi.stubEnv("TEST_TOKEN_BUDGET", value);
      expect(envNumber("TEST_TOKEN_BUDGET", 123, { allowZero: true })).toBe(123);
    }
    expect(console.error).toHaveBeenCalledTimes(bad.length);
    expect(vi.mocked(console.error).mock.calls[0][0]).toContain('TEST_TOKEN_BUDGET="20_000_000"');
  });

  it("accepts valid numbers, treats blank as unset, and allows 0 only where it means off", () => {
    vi.stubEnv("TEST_LIMIT", "2e7");
    expect(envNumber("TEST_LIMIT", 123)).toBe(20_000_000);
    vi.stubEnv("TEST_LIMIT", "  ");
    expect(envNumber("TEST_LIMIT", 123)).toBe(123);
    vi.stubEnv("TEST_LIMIT", "0");
    expect(envNumber("TEST_LIMIT", 123, { allowZero: true })).toBe(0);
    expect(console.error).not.toHaveBeenCalled();

    // A rate limit of 0 would refuse everyone: invalid, so the default.
    expect(envNumber("TEST_LIMIT", 123)).toBe(123);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it("keeps the documented caps when the budget env vars are malformed", async () => {
    vi.stubEnv("CHAT_MONTHLY_TOKEN_BUDGET", "20_000_000");
    vi.stubEnv("CHAT_DAILY_TOKEN_BUDGET", "");
    vi.resetModules();
    const config = await import("@/lib/chat/config");
    expect(config.CHAT_MONTHLY_TOKEN_BUDGET).toBe(20_000_000);
    // Unset daily falls back to its fixed default (~2,000 heavy turns).
    expect(config.CHAT_DAILY_TOKEN_BUDGET).toBe(8_400_000);
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

describe("route settlement (model and retrieval faked)", () => {
  const post = (path: string, body: unknown) =>
    new NextRequest(`http://localhost${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

  beforeEach(() => {
    vi.stubEnv("OPENAI_API_KEY", "test-key");
    vi.stubEnv("FIRETRACE_API_KEY", "");
    vi.mocked(settleTokens).mockClear();
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("/api/cheat-search settles once, with real usage, when a later step throws", async () => {
    // Before the fix, the catch settled a second time at 0, refunding the
    // reservation twice and lowering the shared counter.
    model.create.mockResolvedValueOnce({
      usage: { input_tokens: 900, output_tokens: 20, total_tokens: 920 },
      output_text: "not json",
    });

    const response = await cheatSearchPOST(post("/api/cheat-search", { query: "my demo just broke" }));
    expect(response.status).toBe(502);
    expect(settleTokens).toHaveBeenCalledTimes(1);
    expect(vi.mocked(settleTokens).mock.calls[0][1]).toBe(920);
  });

  it("/api/chat keeps draining after the client disconnects and settles to real usage", async () => {
    let resume!: () => void;
    const clientLeft = new Promise<void>((resolve) => (resume = resolve));
    let drainedToEnd = false;
    model.create.mockResolvedValueOnce(
      (async function* () {
        yield { type: "response.output_text.delta", delta: "Lead " };
        await clientLeft;
        yield { type: "response.output_text.delta", delta: "with the demo." };
        yield {
          type: "response.completed",
          response: { usage: { input_tokens: 700, output_tokens: 12, total_tokens: 712 } },
        };
        drainedToEnd = true;
      })(),
    );

    const response = await chatPOST(
      post("/api/chat", { messages: [{ role: "user", content: "How do I open a pitch?" }] }),
    );
    const reader = response.body!.getReader();
    await reader.read();
    await reader.cancel(); // the tab closes mid-answer
    resume();

    // Before the fix, the next write threw, the loop aborted the model
    // stream, and the full worst-case reservation stood.
    await vi.waitFor(() => expect(settleTokens).toHaveBeenCalledTimes(1));
    expect(vi.mocked(settleTokens).mock.calls[0][1]).toBe(712);
    expect(drainedToEnd).toBe(true);
  });
});

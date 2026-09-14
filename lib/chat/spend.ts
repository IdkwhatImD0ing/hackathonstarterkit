/**
 * Monthly and daily spend ceilings for /api/chat (and the cheat-sheet
 * search, which shares them), the most important cost control here: a
 * public chatbot with no ceiling is a bill waiting to happen. The daily
 * ceiling sits under the monthly one so one bad day cannot empty the month.
 *
 * The ceilings are enforced with reserve/settle semantics so concurrent
 * requests cannot collectively overshoot them: before calling OpenAI, a
 * request reserves its worst-case token count against both counters in one
 * atomic step; if either would exceed its budget, neither counter moves
 * and the request is refused. When the stream terminates, the reservation
 * is settled down to actual usage, against the same keys the reservation
 * was taken from: a stream can straddle a day or month boundary, and
 * settling into the new period would drive its fresh counter negative and
 * quietly extend its budget. If usage is unknown (crash, incomplete
 * stream), the full reservation stands, which errs toward spending less.
 *
 * Counters live in Redis (spend:tokens:YYYY-MM and spend:tokens:YYYY-MM-DD,
 * both UTC; lib/redis-rest.ts). When Redis is configured but unreachable,
 * reservation FAILS CLOSED: each serverless instance would otherwise see a
 * near-zero local counter and keep spending precisely during the outage.
 * The in-memory path is only for deployments where Redis was never
 * configured (local dev, previews), and is documented as not a real
 * ceiling there.
 *
 * These counters hold token counts only, never message content. The
 * conversation itself is recorded separately, in tracing.
 */

import { redisRest } from "../redis-rest";

export type ReserveResult = "ok" | "over_budget" | "unavailable";
export type BudgetPeriod = "monthly" | "daily";

export interface TokenBudgets {
  monthly: number;
  daily: number;
}

/**
 * The counters a reservation was taken against. Settlement MUST target
 * these keys, not the current ones: recomputing them at settle time lets a
 * boundary-straddling stream INCRBY a negative delta into the new period's
 * fresh counter, pushing it below zero and raising that period's effective
 * ceiling.
 */
export interface SpendKeys {
  month: string;
  day: string;
}

export interface SpendReservation {
  result: ReserveResult;
  /** The budget that refused the request, when result is "over_budget". */
  exceeded?: BudgetPeriod;
  keys: SpendKeys;
}

/** Structural overhead reserved per message (role markers, separators). */
const PER_MESSAGE_OVERHEAD_TOKENS = 16;
/** Fixed per-request overhead (request framing, instructions wrapper). */
const PER_REQUEST_OVERHEAD_TOKENS = 64;

const utf8 = new TextEncoder();

/**
 * Worst-case token reservation for a request, model-independent by
 * construction: a byte-fallback BPE tokenizer (every OpenAI tokenizer,
 * whose vocabulary contains all 256 single bytes) can never emit more
 * tokens than the input's UTF-8 byte length, so the sum of byte lengths
 * upper-bounds the serving model's input count regardless of which
 * tokenizer it uses. Add explicit per-message and per-request structural
 * overhead and the full output cap. This deliberately over-reserves
 * (roughly 4x for English prose); settlement returns the excess as soon
 * as the stream terminates, so the only cost is transient headroom
 * consumption near the ceiling, where being conservative is the point.
 */
export function reservationForInput(texts: string[], maxOutputTokens: number): number {
  const inputBytes = texts.reduce((sum, text) => sum + utf8.encode(text).length, 0);
  return (
    inputBytes +
    texts.length * PER_MESSAGE_OVERHEAD_TOKENS +
    PER_REQUEST_OVERHEAD_TOKENS +
    maxOutputTokens
  );
}

const memory = new Map<string, number>();

/**
 * Keys expire well past their period's end, long enough that a settle
 * landing after the boundary still finds them; the key name scopes the period.
 */
const MONTH_TTL_SECONDS = 60 * 60 * 24 * 45;
const DAY_TTL_SECONDS = 60 * 60 * 24 * 2;

/** Month and UTC-day keys from one clock reading, so they agree at midnight. */
function spendKeys(): SpendKeys {
  const now = new Date().toISOString();
  return { month: `spend:tokens:${now.slice(0, 7)}`, day: `spend:tokens:${now.slice(0, 10)}` };
}

/**
 * Check both budgets and take the reservation as one atomic step: both
 * counters grow or neither does, and nothing can land between the check
 * and the increment. Returns {"ok", 0} or {<budget that refused>, <its
 * counter before this request>}.
 */
const RESERVE_LUA = `
local amount = tonumber(ARGV[1])
local month = tonumber(redis.call('GET', KEYS[1]) or '0')
local day = tonumber(redis.call('GET', KEYS[2]) or '0')
if month + amount > tonumber(ARGV[2]) then return {'monthly', month} end
if day + amount > tonumber(ARGV[3]) then return {'daily', day} end
redis.call('INCRBY', KEYS[1], ARGV[1])
redis.call('EXPIRE', KEYS[1], ARGV[4])
redis.call('INCRBY', KEYS[2], ARGV[1])
redis.call('EXPIRE', KEYS[2], ARGV[5])
return {'ok', 0}
`.trim();

/**
 * Apply the settlement delta to every counter, floored at zero (INCRBY back
 * up keeps the key's TTL): a counter pushed below zero would quietly raise
 * its period's ceiling.
 */
const SETTLE_LUA = `
for _, key in ipairs(KEYS) do
  local total = redis.call('INCRBY', key, ARGV[1])
  if total < 0 then redis.call('INCRBY', key, -total) end
end
return 1
`.trim();

async function upstash(command: (string | number)[]): Promise<unknown> {
  const creds = redisRest()!;
  const response = await fetch(creds.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!response.ok) throw new Error(`Upstash ${response.status}`);
  return ((await response.json()) as { result: unknown }).result;
}

/**
 * Atomically reserve `maxTokens` against both the monthly and the daily
 * budget. Callers must later settleTokens() with actual usage and the
 * returned keys.
 */
export async function reserveTokens(
  maxTokens: number,
  budgets: TokenBudgets,
): Promise<SpendReservation> {
  const keys = spendKeys();
  // One error line per refusal: in the Vercel logs, this is the signal
  // that chat has gone dark, and which ceiling did it.
  const refuse = (exceeded: BudgetPeriod, counter: number): SpendReservation => {
    console.error(
      `spend: ${exceeded} token budget reached, refusing request ` +
        `(counter ${counter} + reservation ${maxTokens} > budget ${budgets[exceeded]})`,
    );
    return { result: "over_budget", exceeded, keys };
  };

  if (!redisRest()) {
    const month = memory.get(keys.month) ?? 0;
    const day = memory.get(keys.day) ?? 0;
    if (month + maxTokens > budgets.monthly) return refuse("monthly", month);
    if (day + maxTokens > budgets.daily) return refuse("daily", day);
    memory.set(keys.month, month + maxTokens);
    memory.set(keys.day, day + maxTokens);
    return { result: "ok", keys };
  }

  try {
    const [status, counter] = (await upstash([
      "EVAL",
      RESERVE_LUA,
      "2",
      keys.month,
      keys.day,
      String(maxTokens),
      String(budgets.monthly),
      String(budgets.daily),
      String(MONTH_TTL_SECONDS),
      String(DAY_TTL_SECONDS),
    ])) as [string, number];
    return status === "ok" ? { result: "ok", keys } : refuse(status as BudgetPeriod, Number(counter));
  } catch (error) {
    // Fail closed: with Redis configured but down, allowing the request
    // would let every instance spend against a counter it cannot see.
    console.error("spend: reservation unavailable, refusing request", error);
    return { result: "unavailable", keys };
  }
}

/**
 * Settle a reservation down to actual usage, on both counters, against the
 * keys the reservation was taken from (see SpendKeys). Settlement failures
 * are logged, not thrown: a response that already streamed must not error,
 * and an unsettled reservation only overcounts.
 */
export async function settleTokens(
  reservedMax: number,
  actualTokens: number,
  keys: SpendKeys,
): Promise<void> {
  const delta = actualTokens - reservedMax;
  if (delta === 0) return;

  if (!redisRest()) {
    for (const key of [keys.month, keys.day]) {
      memory.set(key, Math.max(0, (memory.get(key) ?? 0) + delta));
    }
    return;
  }
  try {
    await upstash(["EVAL", SETTLE_LUA, "2", keys.month, keys.day, String(delta)]);
  } catch (error) {
    console.error(`spend: settle failed (delta ${delta}), reservation stands`, error);
  }
}

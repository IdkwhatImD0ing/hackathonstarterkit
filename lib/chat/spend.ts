/**
 * Monthly spend ceiling for /api/chat, the most important cost control
 * here: a public chatbot with no ceiling is a bill waiting to happen.
 *
 * The ceiling is enforced with reserve/settle semantics so concurrent
 * requests cannot collectively overshoot it: before calling OpenAI, a
 * request atomically reserves its worst-case token count (INCRBY); if the
 * new total exceeds the budget the reservation is rolled back and the
 * request is refused. When the stream terminates, the reservation is
 * settled down to actual usage, against the same month key the
 * reservation was taken from: a stream can straddle a month boundary,
 * and settling into the new month would drive its fresh counter negative
 * and quietly extend its budget. If usage is unknown (crash, incomplete
 * stream), the full reservation stands, which errs toward spending less.
 *
 * Counters live in Redis (spend:tokens:YYYY-MM, lib/redis-rest.ts). When
 * Redis is configured but unreachable, reservation FAILS CLOSED: each
 * serverless instance would otherwise see a near-zero local counter and
 * keep spending precisely during the outage. The in-memory path is only
 * for deployments where Redis was never configured (local dev, previews),
 * and is documented as not a real ceiling there.
 *
 * These counters hold token counts only, never message content. The
 * conversation itself is recorded separately, in tracing.
 */

import { redisRest } from "../redis-rest";

export type ReserveResult = "ok" | "over_budget" | "unavailable";

export interface SpendReservation {
  result: ReserveResult;
  /**
   * The month counter the reservation was taken against. Settlement MUST
   * target this key, not the current month: recomputing the key at settle
   * time lets a boundary-straddling stream INCRBY a negative delta into
   * the new month's fresh counter, pushing it below zero and raising that
   * month's effective ceiling.
   */
  key: string;
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

function monthKey(): string {
  return `spend:tokens:${new Date().toISOString().slice(0, 7)}`;
}

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
 * Atomically reserve `maxTokens` against the monthly budget. Callers must
 * later settleTokens() with actual usage and the returned key.
 */
export async function reserveTokens(
  maxTokens: number,
  budget: number,
): Promise<SpendReservation> {
  const key = monthKey();

  if (!redisRest()) {
    const next = (memory.get(key) ?? 0) + maxTokens;
    if (next > budget) return { result: "over_budget", key };
    memory.set(key, next);
    return { result: "ok", key };
  }

  try {
    const total = Number(await upstash(["INCRBY", key, maxTokens]));
    // Expire well past the month's end (long enough that a settle landing
    // after the boundary still finds the key); the key name scopes the month.
    await upstash(["EXPIRE", key, 60 * 60 * 24 * 45, "NX"]).catch(() => {});
    if (total > budget) {
      await upstash(["DECRBY", key, maxTokens]);
      return { result: "over_budget", key };
    }
    return { result: "ok", key };
  } catch (error) {
    // Fail closed: with Redis configured but down, allowing the request
    // would let every instance spend against a counter it cannot see.
    console.error("spend: reservation unavailable, refusing request", error);
    return { result: "unavailable", key };
  }
}

/**
 * Settle a reservation down to actual usage, against the key the
 * reservation was taken from (see SpendReservation.key). Settlement
 * failures are logged, not thrown: a response that already streamed must
 * not error, and an unsettled reservation only overcounts.
 */
export async function settleTokens(
  reservedMax: number,
  actualTokens: number,
  key: string,
): Promise<void> {
  const delta = actualTokens - reservedMax;
  if (delta === 0) return;

  if (!redisRest()) {
    memory.set(key, Math.max(0, (memory.get(key) ?? 0) + delta));
    return;
  }
  try {
    await upstash(["INCRBY", key, delta]);
  } catch (error) {
    console.error(`spend: settle failed (delta ${delta}), reservation stands`, error);
  }
}

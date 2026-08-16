/**
 * Monthly spend ceiling for /api/chat, the most important cost control
 * here: a public chatbot with no ceiling is a bill waiting to happen.
 *
 * The ceiling is enforced with reserve/settle semantics so concurrent
 * requests cannot collectively overshoot it: before calling OpenAI, a
 * request atomically reserves its worst-case token count (INCRBY); if the
 * new total exceeds the budget the reservation is rolled back and the
 * request is refused. When the stream terminates, the reservation is
 * settled down to actual usage. If usage is unknown (crash, incomplete
 * stream), the full reservation stands, which errs toward spending less.
 *
 * Counters live in Redis (spend:tokens:YYYY-MM, lib/redis-rest.ts). When
 * Redis is configured but unreachable, reservation FAILS CLOSED: each
 * serverless instance would otherwise see a near-zero local counter and
 * keep spending precisely during the outage. The in-memory path is only
 * for deployments where Redis was never configured (local dev, previews),
 * and is documented as not a real ceiling there.
 *
 * Only token counts are stored. Never message content.
 */

import { countTokens } from "gpt-tokenizer";
import { redisRest } from "../redis-rest";

export type ReserveResult = "ok" | "over_budget" | "unavailable";

/**
 * Worst-case token reservation for a request: a real tokenizer count of
 * every input text (a chars-based heuristic underestimates CJK, emoji,
 * and adversarial Unicode by several-fold), a 1.25 factor covering drift
 * between gpt-tokenizer's encoding and the serving model's tokenizer,
 * per-message structural overhead, and the full output cap. Settlement
 * only ever subtracts from this; tests/cost-controls.test.ts holds a
 * regression proving non-ASCII input stays within the reservation.
 */
export function reservationForInput(texts: string[], maxOutputTokens: number): number {
  const inputTokens = texts.reduce((sum, text) => sum + countTokens(text), 0);
  return Math.ceil(inputTokens * 1.25) + texts.length * 8 + maxOutputTokens;
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
 * later settleTokens() with actual usage.
 */
export async function reserveTokens(
  maxTokens: number,
  budget: number,
): Promise<ReserveResult> {
  const key = monthKey();

  if (!redisRest()) {
    const next = (memory.get(key) ?? 0) + maxTokens;
    if (next > budget) return "over_budget";
    memory.set(key, next);
    return "ok";
  }

  try {
    const total = Number(await upstash(["INCRBY", key, maxTokens]));
    // Expire well past the month's end; the key name scopes the month.
    await upstash(["EXPIRE", key, 60 * 60 * 24 * 45, "NX"]).catch(() => {});
    if (total > budget) {
      await upstash(["DECRBY", key, maxTokens]);
      return "over_budget";
    }
    return "ok";
  } catch (error) {
    // Fail closed: with Redis configured but down, allowing the request
    // would let every instance spend against a counter it cannot see.
    console.error("spend: reservation unavailable, refusing request", error);
    return "unavailable";
  }
}

/**
 * Settle a reservation down to actual usage. `actualTokens` defaults to
 * the reservation when usage is unknown, which keeps the full reservation
 * counted (safe direction). Settlement failures are logged, not thrown: a
 * response that already streamed must not error, and an unsettled
 * reservation only overcounts.
 */
export async function settleTokens(reservedMax: number, actualTokens: number): Promise<void> {
  const key = monthKey();
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

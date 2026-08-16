/**
 * Monthly spend ceiling for /api/chat, the most important cost control
 * here: a public chatbot with no ceiling is a bill waiting to happen.
 *
 * Cumulative token counts per calendar month live in Upstash Redis
 * (spend:tokens:YYYY-MM) when configured; past the configured budget the
 * endpoint disables itself and returns friendly copy until the month
 * rolls over. In-memory fallback exists for dev and previews but resets
 * per instance, so it is NOT a real ceiling; production needs the KV
 * (documented in .env.example).
 *
 * Only token counts are stored. Never message content.
 */

import { redisRest } from "../redis-rest";

const memory = new Map<string, number>();

function monthKey(): string {
  return `spend:tokens:${new Date().toISOString().slice(0, 7)}`;
}

function upstashConfigured(): boolean {
  return redisRest() !== null;
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

export async function getMonthlyTokens(): Promise<number> {
  const key = monthKey();
  if (upstashConfigured()) {
    try {
      return Number((await upstash(["GET", key])) ?? 0);
    } catch {
      return memory.get(key) ?? 0;
    }
  }
  return memory.get(key) ?? 0;
}

export async function addMonthlyTokens(tokens: number): Promise<void> {
  const key = monthKey();
  memory.set(key, (memory.get(key) ?? 0) + tokens);
  if (upstashConfigured()) {
    try {
      await upstash(["INCRBY", key, tokens]);
      // Expire well past the month's end; the key name scopes the month.
      await upstash(["EXPIRE", key, 60 * 60 * 24 * 45, "NX"]);
    } catch {
      // Counted in memory above; a KV blip must not break responses.
    }
  }
}

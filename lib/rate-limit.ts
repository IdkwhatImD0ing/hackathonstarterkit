/**
 * Sliding-window rate limiter for the compute endpoints (/api/chat,
 * /api/mcp), keyed on the real client IP from lib/request-ip.ts.
 *
 * Uses Upstash Redis via REST when UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN are set, so the window holds across serverless
 * instances. Falls back to an in-memory window otherwise; documented
 * limitation: the in-memory window is per-instance, so bursts that land
 * on different instances each get their own budget. Good enough for
 * previews and local dev, not a substitute for KV in production.
 */

const WINDOW_MS = 10 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const memory = new Map<string, number[]>();

function memoryLimit(key: string, max: number): RateLimitResult {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const hits = (memory.get(key) ?? []).filter((t) => t > cutoff);

  if (hits.length >= max) {
    memory.set(key, hits);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((hits[0] + WINDOW_MS - now) / 1000),
    };
  }
  hits.push(now);
  memory.set(key, hits);
  // Bound the map so an IP-rotating scraper can't grow it without limit.
  if (memory.size > 10_000) {
    const oldest = memory.keys().next().value;
    if (oldest) memory.delete(oldest);
  }
  return { allowed: true, remaining: max - hits.length, retryAfterSeconds: 0 };
}

async function upstashLimit(key: string, max: number): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const redisKey = `rl:${key}`;

  // Atomic-enough pipeline: prune the window, count, add, expire.
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["ZREMRANGEBYSCORE", redisKey, "0", String(cutoff)],
      ["ZCARD", redisKey],
      ["ZADD", redisKey, String(now), `${now}:${Math.random().toString(36).slice(2)}`],
      ["PEXPIRE", redisKey, String(WINDOW_MS)],
    ]),
  });
  if (!response.ok) {
    // Redis being down must not take the endpoint with it.
    return memoryLimit(key, max);
  }
  const results = (await response.json()) as { result: unknown }[];
  const count = Number(results[1]?.result ?? 0);
  if (count >= max) {
    return { allowed: false, remaining: 0, retryAfterSeconds: 60 };
  }
  return { allowed: true, remaining: max - count - 1, retryAfterSeconds: 0 };
}

export async function rateLimit(key: string, max: number): Promise<RateLimitResult> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return upstashLimit(key, max);
  }
  return memoryLimit(key, max);
}

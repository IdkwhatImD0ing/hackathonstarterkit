/**
 * Sliding-window rate limiter for the compute endpoints (/api/chat,
 * /api/mcp), keyed on the real client IP from lib/request-ip.ts.
 *
 * With Redis configured (lib/redis-rest.ts), the whole check runs as one
 * Lua script, so it is atomic across serverless instances: prune expired
 * hits, count, and only add the hit when the request is allowed. Rejected
 * requests never extend the window. Falls back to an in-memory window
 * when Redis was never configured, or during a Redis outage; documented
 * limitation: the in-memory window is per-instance, so bursts that land
 * on different instances each get their own budget. (Availability
 * tradeoff on purpose: a Redis blip degrades rate-limit granularity but
 * does not take the endpoints down. The monthly budget in lib/chat/spend.ts
 * is the fail-closed control.)
 */

import { redisRest } from "./redis-rest";

const WINDOW_MS = 10 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const memory = new Map<string, number[]>();

export function memoryLimit(key: string, max: number): RateLimitResult {
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

/**
 * Atomic sliding window: prune, count, and conditionally add in one
 * script. Returns {allowed, count, retryAfterSeconds}; the hit is only
 * recorded on allow, and retry-after is computed from the oldest
 * surviving hit rather than a flat guess.
 */
const SLIDING_WINDOW_LUA = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local max = tonumber(ARGV[3])
local member = ARGV[4]
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
local count = redis.call('ZCARD', key)
if count >= max then
  local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
  local retry = math.ceil(window / 1000)
  if oldest[2] then
    retry = math.ceil((tonumber(oldest[2]) + window - now) / 1000)
    if retry < 1 then retry = 1 end
  end
  return {0, count, retry}
end
redis.call('ZADD', key, now, member)
redis.call('PEXPIRE', key, window)
return {1, count + 1, 0}
`.trim();

async function upstashLimit(
  key: string,
  max: number,
  creds: { url: string; token: string },
): Promise<RateLimitResult> {
  const now = Date.now();
  const member = `${now}:${Math.random().toString(36).slice(2)}`;

  const response = await fetch(creds.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      SLIDING_WINDOW_LUA,
      "1",
      `rl:${key}`,
      String(now),
      String(WINDOW_MS),
      String(max),
      member,
    ]),
  });
  if (!response.ok) throw new Error(`Upstash ${response.status}`);

  const [allowed, count, retry] = ((await response.json()) as { result: number[] }).result;
  if (allowed !== 1) {
    return { allowed: false, remaining: 0, retryAfterSeconds: Number(retry) || 60 };
  }
  return { allowed: true, remaining: Math.max(0, max - Number(count)), retryAfterSeconds: 0 };
}

export async function rateLimit(key: string, max: number): Promise<RateLimitResult> {
  const creds = redisRest();
  if (creds) {
    try {
      return await upstashLimit(key, max, creds);
    } catch {
      return memoryLimit(key, max);
    }
  }
  return memoryLimit(key, max);
}

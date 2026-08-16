/**
 * Resolve the Upstash-compatible Redis REST credentials. Two naming
 * schemes point at the same store: UPSTASH_REDIS_REST_* (Upstash's own
 * naming, documented in .env.example) and KV_REST_API_* (what the Vercel
 * Marketplace "Upstash for Redis" integration injects). Accepting both
 * lets the integration's managed, auto-rotating credentials work without
 * mirroring them into duplicate env vars that could go stale.
 */
export function redisRest(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

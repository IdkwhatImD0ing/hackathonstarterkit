/**
 * Resolve the real client IP for rate limiting, without trusting anything
 * a client can forge.
 *
 * Trust ladder:
 * 1. `cf-connecting-ip`, ONLY when the request provably came through
 *    Cloudflare: proxy.ts strips any inbound `x-origin-verified` header
 *    and re-adds it after validating the ORIGIN_SHARED_SECRET set by the
 *    Cloudflare Transform Rule (docs/cloudflare-config.md section 6).
 *    Without that authentication the header is caller-controlled and
 *    would let anyone rotate IPs past the limiter.
 * 2. `x-real-ip`, which the Vercel platform sets from the connection and
 *    clients cannot spoof. While the zone is grey-cloud this is the real
 *    visitor IP. Once the zone is proxied WITHOUT the origin secret, it
 *    degrades to Cloudflare's edge IP: coarse buckets, but never
 *    attacker-chosen. Configuring the secret restores per-visitor
 *    granularity.
 * 3. Leftmost `x-forwarded-for`, last resort outside Vercel (local dev).
 */
export function getClientIp(headers: Headers): string {
  if (headers.get("x-origin-verified") === "1") {
    const cfIp = headers.get("cf-connecting-ip");
    if (cfIp) return cfIp.trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

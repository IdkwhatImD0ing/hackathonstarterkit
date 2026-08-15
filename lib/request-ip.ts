/**
 * Resolve the real client IP behind the Cloudflare -> Vercel double proxy.
 *
 * Behind Cloudflare, `x-forwarded-for` and Vercel's request IP resolve to
 * Cloudflare's edge IP, not the visitor's. Cloudflare puts the visitor IP in
 * `cf-connecting-ip`, and since all legitimate traffic reaches the origin
 * through Cloudflare (see the origin lock in proxy.ts and
 * docs/cloudflare-config.md), that header is trustworthy here.
 */
export function getClientIp(headers: Headers): string {
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

import { NextRequest, NextResponse } from "next/server";
import { CANONICAL_HOST, SITE_URL } from "@/lib/site";

/**
 * Edge-adjacent request handling (Next.js 16 proxy convention, the successor
 * to middleware.ts). Kept to header inspection, redirects, and rewrites only:
 * anything that needs the retrieval index or Node APIs lives in route
 * handlers instead.
 *
 * Responsibilities:
 * 1. Origin lock (production): the Vercel deployment is reachable at its
 *    *.vercel.app hostname, which bypasses Cloudflare and everything
 *    configured there (AI crawler controls, WAF, rate limiting). Redirect
 *    any non-canonical host to the canonical one.
 * 2. Origin verification (production, opt-in): when ORIGIN_SHARED_SECRET is
 *    set, require the x-origin-verify header that a Cloudflare Transform
 *    Rule attaches (docs/cloudflare-config.md). Middleware host checks alone
 *    are bypassable if someone finds a deployment URL; the secret is not.
 * 3. Markdown content negotiation (Phase 2): requests preferring
 *    text/markdown are rewritten to the Markdown handler.
 */

const VERCEL_ENV = process.env.VERCEL_ENV;
const ORIGIN_SHARED_SECRET = process.env.ORIGIN_SHARED_SECRET;

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (VERCEL_ENV === "production") {
    // Host canonicalization. www is already 301'd by next.config.ts
    // redirects (which run before proxy), so this catches *.vercel.app and
    // any other alias pointed at the production deployment.
    if (host !== CANONICAL_HOST) {
      const url = new URL(request.nextUrl.pathname + request.nextUrl.search, SITE_URL);
      return NextResponse.redirect(url, 301);
    }

    // Origin verification. Only enforced once the Cloudflare Transform Rule
    // and the env var are both configured; see docs/cloudflare-config.md.
    if (
      ORIGIN_SHARED_SECRET &&
      request.headers.get("x-origin-verify") !== ORIGIN_SHARED_SECRET
    ) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next's static asset routes. Content negotiation and
  // the origin lock must both see real page requests.
  matcher: ["/((?!_next/static|_next/image).*)"],
};

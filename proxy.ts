import { NextRequest, NextResponse } from "next/server";
import { CANONICAL_HOST, MARKDOWN_EXCLUDED_PATHS, SITE_URL } from "@/lib/site";

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

/**
 * True for paths that can have a Markdown representation: real pages, not
 * API routes, feeds, or files. The Markdown handler 404s unknown pages, so
 * this only needs to be syntactic; it must not import the content registry
 * (which pulls blog data and node:fs into the proxy bundle).
 */
function isContentPath(pathname: string): boolean {
  if (pathname.startsWith("/api/")) return false;
  if (pathname.startsWith("/.well-known/")) return false;
  if (MARKDOWN_EXCLUDED_PATHS.includes(pathname)) return false;
  // Anything with a file extension (robots.txt, sitemap.xml, rss.xml, images).
  if (/\.[a-z0-9]+$/i.test(pathname)) return false;
  return true;
}

/**
 * Cloudflare's Accept normalization may reorder values and strip quality
 * values (docs/cloudflare-config.md section 2), so this is a substring
 * check rather than a q-value parse: browsers never send text/markdown, so
 * its presence alone signals an agent asking for Markdown.
 */
function prefersMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? "";
  return accept.toLowerCase().includes("text/markdown");
}

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

  const { pathname } = request.nextUrl;

  // /playbook/pitching.md -> the Markdown handler. /index.md is the homepage.
  if ((request.method === "GET" || request.method === "HEAD") && pathname.endsWith(".md") && !pathname.startsWith("/api/")) {
    const page = pathname === "/index.md" ? "" : pathname.slice(0, -3);
    if (!MARKDOWN_EXCLUDED_PATHS.includes(page)) {
      return NextResponse.rewrite(new URL(`/api/md${page}`, request.url));
    }
  }

  // Content negotiation: same URL, Accept: text/markdown. The marker header
  // tells the Markdown handler this response is the negotiated variant (it
  // must carry Vary: Accept), as opposed to the .md URL (a distinct,
  // Vary-free cacheable artifact).
  if ((request.method === "GET" || request.method === "HEAD") && isContentPath(pathname) && prefersMarkdown(request)) {
    const headers = new Headers(request.headers);
    headers.set("x-md-negotiated", "1");
    return NextResponse.rewrite(
      new URL(`/api/md${pathname === "/" ? "" : pathname}`, request.url),
      { request: { headers } },
    );
  }

  // RFC 8288 Link headers advertising the agent-facing entry points
  // (Phase 4). rel="canonical" (RFC 6596), rel="alternate", and
  // rel="api-catalog" (RFC 9727) are IANA-registered; "llms-txt",
  // "mcp-server-card", and "sitemap" are the extension relations the
  // Cloudflare readiness scanner looks for.
  const response = NextResponse.next();
  const links = [
    // "describedby" is the relation the llms.txt v2 spec recommends;
    // "llms-txt" is what the readiness scanner probes for. Emit both.
    `<${SITE_URL}/llms.txt>; rel="llms-txt"`,
    `<${SITE_URL}/llms.txt>; rel="describedby"`,
    `<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
    `<${SITE_URL}/.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
    `<${SITE_URL}/sitemap.xml>; rel="sitemap"`,
  ];
  if (isContentPath(pathname)) {
    const canonical = pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
    const mdUrl = pathname === "/" ? `${SITE_URL}/index.md` : `${SITE_URL}${pathname}.md`;
    links.push(
      `<${canonical}>; rel="canonical"`,
      `<${mdUrl}>; rel="alternate"; type="text/markdown"`,
    );
  }
  response.headers.set("Link", links.join(", "));
  return response;
}

export const config = {
  // Everything except Next's static asset routes. Content negotiation and
  // the origin lock must both see real page requests.
  matcher: ["/((?!_next/static|_next/image).*)"],
};

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The generated Markdown corpus lives outside public/ and would not be
  // traced into the serverless bundle on its own; without this the Markdown
  // handler 500s on cold start in production with file-not-found.
  outputFileTracingIncludes: {
    "/api/md/[[...path]]": ["./content/generated/**"],
    "/.well-known/agent-skills/[name]/SKILL.md": ["./content/generated/agent-skills/**"],
  },
  async redirects() {
    return [
      // Canonical host is the apex domain (see lib/site.ts). 301 anything
      // arriving as www. A matching Redirect Rule at the Cloudflare edge is
      // preferred (documented in docs/cloudflare-config.md); this is the
      // origin-level backstop so the redirect exists even when Cloudflare is
      // bypassed or misconfigured.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.thehackathonplaybook.dev" }],
        destination: "https://thehackathonplaybook.dev/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Preview deployments must never be indexed: their *.vercel.app URLs
    // bypass Cloudflare and would dilute the canonical domain if crawled.
    // (The generated robots.txt also serves disallow-all on previews.)
    const previewHeaders =
      process.env.VERCEL_ENV === "preview"
        ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
        : [];
    return [
      {
        source: "/(.*)",
        headers: [
          ...previewHeaders,
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

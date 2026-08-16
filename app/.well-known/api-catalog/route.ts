import { SITE_URL } from "@/lib/site";

/**
 * API catalog (RFC 9727), serialized as a linkset (RFC 9264,
 * application/linkset+json): one anchor per public API this site operates,
 * with service-desc pointing at the OpenAPI document, service-doc at the
 * human documentation, and status at the health endpoint.
 *
 * RFC 9727 itself was not retrievable from the environment that authored
 * this file; the linkset structure follows RFC 9264 and is flagged for
 * verification in docs/agent-readiness.md.
 */
export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: `${SITE_URL}/api/mcp`,
        "service-desc": [{ href: `${SITE_URL}/openapi.json`, type: "application/json" }],
        "service-doc": [{ href: `${SITE_URL}/ai`, type: "text/html" }],
        status: [{ href: `${SITE_URL}/api/health` }],
      },
      {
        anchor: `${SITE_URL}/api/chat`,
        "service-desc": [{ href: `${SITE_URL}/openapi.json`, type: "application/json" }],
        "service-doc": [{ href: `${SITE_URL}/ai`, type: "text/html" }],
        status: [{ href: `${SITE_URL}/api/health` }],
      },
    ],
  };

  return Response.json(linkset, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}

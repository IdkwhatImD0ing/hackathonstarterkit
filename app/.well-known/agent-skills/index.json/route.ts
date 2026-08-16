import index from "@/content/generated/agent-skills/index.json";

/**
 * Agent Skills discovery index, per the Agent Skills Discovery RFC v0.2.0
 * (github.com/cloudflare/agent-skills-discovery-rfc). Generated and
 * digest-stamped by scripts/build-agent-skills.mts; CI fails if stale.
 */
export function GET() {
  return Response.json(index, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}

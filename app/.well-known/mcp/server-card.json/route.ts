import { SITE_URL, SITE_NAME } from "@/lib/site";

/**
 * MCP Server Card (SEP-1649). Describes the read-only MCP server at
 * /api/mcp so agents can discover it without probing.
 *
 * Honesty note: SEP-1649's canonical schema (modelcontextprotocol PR
 * #2127) was not retrievable from the environment that authored this file,
 * so the shape below sticks to the fields the SEP is known to define
 * (serverInfo, transport endpoint, capabilities) without inventing more.
 * Verify against the merged SEP before treating the field set as final;
 * flagged in docs/agent-readiness.md.
 */
export function GET() {
  const card = {
    serverInfo: {
      name: "hackathon-playbook",
      title: `${SITE_NAME} MCP Server`,
      version: "1.0.0",
    },
    description:
      "Read-only access to The Hackathon Playbook: battle-tested hackathon strategy from 36+ wins. Search the corpus, fetch any page as Markdown, list topics, and pull per-phase checklists. No authentication required.",
    transport: {
      type: "streamable-http",
      url: `${SITE_URL}/api/mcp`,
    },
    capabilities: {
      tools: { listChanged: false },
    },
    documentation: `${SITE_URL}/ai`,
  };

  return Response.json(card, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}

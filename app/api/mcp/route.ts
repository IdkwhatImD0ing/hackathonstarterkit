import { NextRequest, NextResponse } from "next/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import { getClientIp } from "@/lib/request-ip";
import { rateLimit } from "@/lib/rate-limit";
import { searchCorpus } from "@/lib/retrieval";
import { loadManifest, loadPageMarkdown } from "@/lib/retrieval/corpus";

/**
 * Remote MCP server exposing the playbook as read-only tools over the
 * Streamable HTTP transport (official TypeScript SDK). Stateless: each
 * POST builds a fresh server + transport pair, which is the SDK's
 * recommended serverless pattern. No auth (see /auth.md); rate limited
 * per client IP.
 *
 * Local testing: docs/mcp.md (MCP Inspector against localhost).
 */

const RATE_LIMIT_MAX = Number(process.env.MCP_RATE_LIMIT_MAX ?? 60);

const CHECKLIST_PHASES = {
  ideation: "/playbook/ideation",
  building: "/playbook/execution",
  pitching: "/playbook/pitching",
  submitting: "/playbook/submission",
} as const;

function text(value: string) {
  return { content: [{ type: "text" as const, text: value }] };
}

/** Reduce a page to its actionable skeleton: headings and list items. */
function extractChecklist(markdown: string): string {
  const lines: string[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^(```|~~~)/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^#{1,6}\s/.test(line) || /^\s*(-|\d+\.)\s/.test(line)) {
      lines.push(line);
    }
  }
  return lines.join("\n");
}

function buildServer(): McpServer {
  const server = new McpServer({
    name: "hackathon-playbook",
    version: "1.0.0",
  });

  server.registerTool(
    "search_playbook",
    {
      title: "Search the Hackathon Playbook",
      description:
        "Semantic search over The Hackathon Playbook, a corpus of battle-tested hackathon strategy from 36+ wins: team formation, ideation, validation, execution, tech stack selection, pitching, submission, post-hackathon follow-up, and a non-coder track. Returns the most relevant sections with their page titles, headings, URLs, and full text. Use this first for any question about hackathon strategy; use get_page afterwards when you need a full page.",
      inputSchema: {
        query: z.string().min(2).max(500).describe("What to look for, in plain language, e.g. 'how to pick a tech stack in the first hour'"),
        limit: z.number().int().min(1).max(10).optional().describe("Maximum sections to return (default 5)"),
      },
    },
    async ({ query, limit }) => {
      const results = await searchCorpus(query, limit ?? 5);
      if (results.length === 0) {
        return text("No relevant sections found. Try list_topics to see what the playbook covers.");
      }
      return text(
        results
          .map(
            (r, i) =>
              `## ${i + 1}. ${r.chunk.pageTitle} — ${r.chunk.heading}\nURL: ${r.chunk.url}\nMarkdown: ${r.chunk.mdUrl}\n\n${r.chunk.text}`,
          )
          .join("\n\n---\n\n"),
      );
    },
  );

  server.registerTool(
    "get_page",
    {
      title: "Get a playbook page as Markdown",
      description:
        "Fetch the full, clean Markdown of one page of The Hackathon Playbook by its path (e.g. /playbook/pitching, /blog/how-to-win-hackathons, /non-coders/setup). Use list_topics to see every valid path with a one-line description.",
      inputSchema: {
        path: z
          .string()
          .regex(/^\/[a-z0-9\-/]*$/)
          .describe("The page path starting with /, e.g. /playbook/pitching"),
      },
    },
    async ({ path }) => {
      const markdown = loadPageMarkdown(path);
      if (!markdown) {
        return text(`No page at ${path}. Valid paths are listed by the list_topics tool.`);
      }
      return text(markdown);
    },
  );

  server.registerTool(
    "list_topics",
    {
      title: "List everything the playbook covers",
      description:
        "The content map of The Hackathon Playbook: every page path with its title and a one-line description, grouped by track (playbook phases, non-coder guides, AI skills, blog). Use it to orient before get_page, or when a search came back empty.",
      inputSchema: {},
    },
    async () => {
      const manifest = loadManifest();
      const byTrack = new Map<string, string[]>();
      for (const [path, entry] of Object.entries(manifest)) {
        const list = byTrack.get(entry.track) ?? [];
        list.push(`- ${path} — ${entry.title}: ${entry.description}`);
        byTrack.set(entry.track, list);
      }
      const sections = [...byTrack.entries()].map(
        ([track, lines]) => `## ${track}\n${lines.join("\n")}`,
      );
      return text(sections.join("\n\n"));
    },
  );

  server.registerTool(
    "get_checklist",
    {
      title: "Get the checklist for a hackathon phase",
      description:
        "A compact, actionable checklist for one phase of a hackathon, distilled from the full playbook page: 'ideation' (picking and validating an idea), 'building' (execution, stack, MVP scoping), 'pitching' (presenting to judges), or 'submitting' (README, demo video, Devpost). Ideal mid-hackathon when there is no time to read the full page; each item links back via the page URL in the header.",
      inputSchema: {
        phase: z.enum(["ideation", "building", "pitching", "submitting"]).describe("The hackathon phase you are in right now"),
      },
    },
    async ({ phase }) => {
      const path = CHECKLIST_PHASES[phase];
      const markdown = loadPageMarkdown(path);
      if (!markdown) return text(`Checklist source page ${path} is missing.`);
      const header = markdown.split("\n---\n")[0];
      return text(`${header}\n---\n\n${extractChecklist(markdown)}`);
    },
  );

  return server;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const limit = await rateLimit(`mcp:${ip}`, RATE_LIMIT_MAX);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: { code: -32000, message: "Rate limit exceeded. Retry later." },
        id: null,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const server = buildServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);
  const response = await transport.handleRequest(request);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

// Stateless server: no server-initiated streams, no sessions to delete.
export function GET() {
  return new NextResponse("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}

export function DELETE() {
  return new NextResponse("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}

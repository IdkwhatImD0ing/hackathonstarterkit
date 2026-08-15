"use client";

import { useEffect } from "react";

/**
 * WebMCP progressive enhancement: registers page tools with the browser's
 * model context API when one exists, and does nothing at all when it
 * doesn't. As of mid-2026 WebMCP has near-zero real-world deployment; this
 * ships because it is cheap, measured by readiness scanners, and harmless.
 *
 * The spec is a moving Community Group draft
 * (https://github.com/webmachinelearning/webmcp, fetched before writing
 * this). The current shape is document.modelContext.registerTool({name,
 * description, inputSchema, execute}); earlier Chrome builds shipped
 * navigator.modelContext.provideContext({tools}). Both are handled;
 * neither is assumed.
 */

interface WebMcpToolResult {
  content: { type: "text"; text: string }[];
}

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: object;
  execute: (args: Record<string, unknown>) => Promise<WebMcpToolResult>;
  // provideContext-era name for the handler; harmless extra for registerTool.
  handler?: (args: Record<string, unknown>) => Promise<WebMcpToolResult>;
}

interface ModelContext {
  registerTool?: (tool: WebMcpTool, options?: object) => Promise<void>;
  provideContext?: (context: { tools: WebMcpTool[] }) => Promise<void> | void;
}

async function callMcp(tool: string, args: object): Promise<WebMcpToolResult> {
  const response = await fetch("/api/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name: tool, arguments: args },
    }),
  });
  if (!response.ok) {
    return { content: [{ type: "text", text: `Request failed (${response.status}).` }] };
  }
  const data = await response.json();
  const content = data?.result?.content;
  return Array.isArray(content)
    ? { content }
    : { content: [{ type: "text", text: "No result." }] };
}

function buildTools(): WebMcpTool[] {
  const tools: WebMcpTool[] = [
    {
      name: "search_playbook",
      description:
        "Search The Hackathon Playbook (hackathon strategy from 36+ wins) and return the most relevant sections with titles and URLs.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "What to look for, in plain language" },
        },
        required: ["query"],
      },
      execute: (args) => callMcp("search_playbook", { query: String(args.query ?? ""), limit: 5 }),
    },
    {
      name: "get_checklist",
      description:
        "Get the actionable checklist for a hackathon phase: ideation, building, pitching, or submitting.",
      inputSchema: {
        type: "object",
        properties: {
          phase: {
            type: "string",
            enum: ["ideation", "building", "pitching", "submitting"],
            description: "The hackathon phase the user is in",
          },
        },
        required: ["phase"],
      },
      execute: (args) => callMcp("get_checklist", { phase: String(args.phase ?? "building") }),
    },
    {
      name: "open_guide",
      description:
        "Navigate this browser tab to a page of the playbook, e.g. /playbook/pitching. Use search_playbook first to find the right path.",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string", description: "Site-relative path starting with /" },
        },
        required: ["path"],
      },
      execute: async (args) => {
        const path = String(args.path ?? "");
        if (!/^\/[a-z0-9\-/]*$/.test(path)) {
          return { content: [{ type: "text", text: "Invalid path." }] };
        }
        window.location.assign(path);
        return { content: [{ type: "text", text: `Navigating to ${path}.` }] };
      },
    },
  ];
  // provideContext-era compatibility: same function under the older key.
  for (const tool of tools) tool.handler = tool.execute;
  return tools;
}

export function WebMcpTools() {
  useEffect(() => {
    const modelContext: ModelContext | undefined =
      (document as { modelContext?: ModelContext }).modelContext ??
      (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!modelContext) return;

    const controller = new AbortController();
    const tools = buildTools();
    (async () => {
      try {
        if (typeof modelContext.registerTool === "function") {
          for (const tool of tools) {
            await modelContext.registerTool(tool, { signal: controller.signal });
          }
        } else if (typeof modelContext.provideContext === "function") {
          await modelContext.provideContext({ tools });
        }
      } catch {
        // A rejected registration (permissions policy, draft drift) must
        // never surface to users; WebMCP is strictly optional.
      }
    })();
    return () => controller.abort();
  }, []);

  return null;
}

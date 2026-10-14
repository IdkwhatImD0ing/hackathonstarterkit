"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, ChevronDown, Copy, ExternalLink, Terminal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SITE_URL } from "@/lib/site";

const CLAUDE_COMMAND = `claude mcp add --transport http --scope user hackathon-playbook ${SITE_URL}/api/mcp`;
const SETUP_PROMPT = `Add The Hackathon Playbook as a remote MCP server named hackathon-playbook at ${SITE_URL}/api/mcp using Streamable HTTP. No authentication is required. If you cannot configure MCP connections directly, show me the setup steps for this client. Once connected, call list_topics to verify access.`;

export function AddToAgent({ cursorInstallUrl }: { cursorInstallUrl: string }) {
  const [feedback, setFeedback] = useState<{
    kind: "claude" | "prompt";
    copied: boolean;
  } | null>(null);

  const copy = async (kind: "claude" | "prompt") => {
    const text = kind === "claude" ? CLAUDE_COMMAND : SETUP_PROMPT;
    try {
      await navigator.clipboard.writeText(text);
      setFeedback({ kind, copied: true });
    } catch {
      setFeedback({ kind, copied: false });
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <DropdownMenu>
        <DropdownMenuTrigger className="glow-hover inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 font-display text-sm font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <Bot className="size-4" aria-hidden="true" />
          Add to your agent
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="min-w-60 border-primary/15 font-body">
          <DropdownMenuItem asChild>
            <a href={cursorInstallUrl}>
              <ExternalLink aria-hidden="true" />
              Add to Cursor
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => { void copy("claude"); }}>
            <Terminal aria-hidden="true" />
            <span>
              Add to Claude Code
              <span className="block text-xs text-muted-foreground">Copy terminal command</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => { void copy("prompt"); }}>
            <Copy aria-hidden="true" />
            Copy Prompt
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/ai">
              <Bot aria-hidden="true" />
              Connection details
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div role="status" className="mt-2 font-body text-xs text-muted-foreground">
        {feedback ? (
          <>
            <p>
              {feedback.copied
                ? feedback.kind === "claude"
                  ? "Command copied. Run it in your terminal to add the Playbook."
                  : "Prompt copied. Paste it into your AI agent."
                : "Could not copy automatically. Select and copy the text below."}
            </p>
            {feedback.kind === "claude" || !feedback.copied ? (
              <pre className="mt-2 rounded-lg border border-primary/15 bg-background/50 p-3 text-left font-code text-xs leading-relaxed whitespace-pre-wrap break-words text-foreground/85">
                {feedback.kind === "claude" ? CLAUDE_COMMAND : SETUP_PROMPT}
              </pre>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

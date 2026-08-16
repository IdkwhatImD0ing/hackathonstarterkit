"use client";

import { useState } from "react";
import { Bot, Check, ChevronDown, Copy, ExternalLink, FileText, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SITE_URL } from "@/lib/site";

/**
 * "Copy for AI" dropdown, shown near the title of every content page.
 * Everything it exposes is built on the .md routes from Phase 2; the
 * "Ask the Playbook" item opens the chat widget seeded with this page.
 */
export function CopyForAi({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const mdPath = path === "/" ? "/index.md" : `${path}.md`;
  const mdUrl = `${SITE_URL}${mdPath}`;
  const prompt = encodeURIComponent(
    `Read ${mdUrl} (the Markdown version of "${title}" from The Hackathon Playbook) and help me apply it to my hackathon.`,
  );

  const copyMarkdown = async () => {
    try {
      const response = await fetch(mdPath);
      if (!response.ok) throw new Error(String(response.status));
      await navigator.clipboard.writeText(await response.text());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard or fetch unavailable; the View item still works.
    }
  };

  const askPlaybook = () => {
    window.dispatchEvent(
      new CustomEvent("playbook-chat:open", { detail: { path } }),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Copy this page for AI tools"
        className="glow-hover inline-flex items-center gap-1.5 rounded-lg border border-volt/40 bg-volt/10 px-3.5 py-2 font-code text-xs font-medium text-foreground transition-colors hover:border-volt/60 hover:bg-volt/15 motion-reduce:transition-none"
      >
        <Bot className="size-3.5 text-volt" aria-hidden="true" />
        Copy for AI
        <ChevronDown className="size-3" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="glass border-primary/15 font-body">
        <DropdownMenuItem onSelect={(event) => { event.preventDefault(); copyMarkdown(); }}>
          {copied ? <Check className="text-success" /> : <Copy />}
          {copied ? "Copied!" : "Copy as Markdown"}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={mdPath}>
            <FileText />
            View as Markdown
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href={`https://chatgpt.com/?q=${prompt}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink />
            Open in ChatGPT
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://claude.ai/new?q=${prompt}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink />
            Open in Claude
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={askPlaybook}>
          <MessageCircle />
          Ask the Playbook
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

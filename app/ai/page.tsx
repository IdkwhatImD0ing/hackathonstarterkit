import type { Metadata } from "next";
import Link from "next/link";
import { Bot, FileText, MessageCircle, Search, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_URL } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

export const metadata: Metadata = {
  title: "AI & Agent Access — Markdown Routes, llms.txt, MCP Server",
  description:
    "How AI tools and agents can read The Hackathon Playbook: Markdown versions of every page, llms.txt, a public MCP server with search tools, and a grounded chatbot. No auth required.",
  alternates: {
    canonical: `${SITE_URL}/ai`,
  },
};

const FEATURES = [
  {
    icon: FileText,
    title: "Markdown everything",
    body: `Append .md to any page URL (like /playbook/pitching.md) or send Accept: text/markdown to get the clean Markdown version: no nav, no chrome, headings and code blocks intact, with an x-markdown-tokens header so agents can budget context. The full index lives at /llms.txt and the whole corpus at /llms-full.txt.`,
  },
  {
    icon: TerminalSquare,
    title: "MCP server",
    body: `A public, read-only MCP server at /api/mcp (Streamable HTTP). Tools: search_playbook, get_page, list_topics, and get_checklist for mid-hackathon use. Point Claude, ChatGPT, or any MCP client at it; the server card is at /.well-known/mcp/server-card.json.`,
  },
  {
    icon: Search,
    title: "Agent discovery",
    body: `robots.txt welcomes AI crawlers explicitly with Content Signals. Link headers on every page advertise llms.txt, the API catalog (/.well-known/api-catalog), and the Markdown alternates. Installable skills are published at /.well-known/agent-skills/index.json with sha256 digests. Auth policy (there is none needed) is stated at /auth.md.`,
  },
  {
    icon: MessageCircle,
    title: "Grounded chat",
    body: `The chat bubble on every page answers only from this site's content, with citations. It runs on a small non-reasoning model over a retrieval index built from the same Markdown the .md routes serve, so it can't cite text that isn't on the site.`,
  },
];

export default function AiPage() {
  return (
    <div className="relative min-h-screen">
      <BreadcrumbJsonLd path="/ai" />
      <main className="mx-auto max-w-4xl px-6 py-16 md:px-16 lg:py-24">
        <header className="stagger-children space-y-4">
          <div className="flex items-center gap-2 font-code text-xs text-volt">
            <Bot className="size-4" />
            FOR AI TOOLS &amp; AGENTS
          </div>
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
            This site is built to be read by machines too
          </h1>
          <p className="max-w-2xl font-body text-lg text-muted-foreground">
            The playbook exists to be found and cited. Whether you are a crawler, an agent, or a
            hacker piping pages into your AI editor at 3am, here is every door in.
          </p>
        </header>

        <div className="stagger-children mt-12 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="glass border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <feature.icon className="size-4 text-spark" aria-hidden="true" />
                  {feature.title}
                </CardTitle>
                <CardDescription className="font-body text-sm leading-relaxed">
                  {feature.body}
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>

        <section className="mt-12 space-y-3">
          <h2 className="font-display text-2xl font-bold">Quick reference</h2>
          <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-primary/5 p-4 font-code text-xs leading-relaxed">
{`# any page as Markdown
curl ${SITE_URL}/playbook/pitching.md

# content negotiation, same URL
curl -H "Accept: text/markdown" ${SITE_URL}/playbook/pitching

# the AI-readable site index
curl ${SITE_URL}/llms.txt

# MCP: list tools
curl -X POST ${SITE_URL}/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`}
          </pre>
          <p className="font-body text-sm text-muted-foreground">
            Everything is public and unauthenticated; compute endpoints are rate limited per IP.
            Details in <Link href="/auth.md" className="text-volt underline underline-offset-2">/auth.md</Link>.
          </p>
        </section>
      </main>
    </div>
  );
}

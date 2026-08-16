import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCog,
  FileText,
  Terminal,
  ArrowRight,
  Sparkles,
  Settings,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/copy-button";
import { LastUpdated } from "@/components/last-updated";
import { markdownAlternate, SITE_URL } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { CopyForAi } from "@/components/copy-for-ai";

export const metadata: Metadata = {
  title: "The System Prompt: CLAUDE.md & AGENTS.md for Non-Coders",
  description:
    "Skills teach your AI new tricks; the system prompt sets the rules it follows every session. Copy one command to download a non-coder CLAUDE.md and AGENTS.md straight into your project.",
  alternates: {
    canonical: `${SITE_URL}/non-coders/system-prompt`,
    types: markdownAlternate("/non-coders/system-prompt"),
  },
  openGraph: {
    title: "The System Prompt: CLAUDE.md & AGENTS.md for Non-Coders",
    description:
      "One copy-paste command downloads a non-coder CLAUDE.md and AGENTS.md into your project, so Cursor and Claude follow the same rules every session.",
    url: `${SITE_URL}/non-coders/system-prompt`,
  },
  twitter: {
    title: "Set Your AI's Rules Once: CLAUDE.md & AGENTS.md",
    description:
      "The system prompt is the file your AI reads every session. Here is the one command that sets it up for non-coders.",
  },
};

// Read the downloadable system-prompt files at build time so the on-page
// preview always matches exactly what the command downloads.
const SYSTEM_PROMPT_DIR = join(process.cwd(), "public", "system-prompt");
const CLAUDE_TXT = readFileSync(
  join(SYSTEM_PROMPT_DIR, "non-coder-claude.txt"),
  "utf8",
);
const AGENTS_TXT = readFileSync(
  join(SYSTEM_PROMPT_DIR, "non-coder-agents.txt"),
  "utf8",
);

const CLAUDE_URL = `${SITE_URL}/system-prompt/non-coder-claude.txt`;
const AGENTS_URL = `${SITE_URL}/system-prompt/non-coder-agents.txt`;

const SETUP_COMMAND = `Set up my project's system prompt. I am a non-coder, so handle the whole thing for me.

1. Fetch the rules from these two files (for example: curl ${CLAUDE_URL}):
   - ${CLAUDE_URL}  -> goes in CLAUDE.md
   - ${AGENTS_URL}  -> goes in AGENTS.md

2. Add them to the root of my project WITHOUT throwing away anything I already have:
   - If the file does not exist yet, create it from the fetched text.
   - If the file already exists, do NOT overwrite it. Weave the rules in: merge matching sections, keep everything project-specific I already wrote, and drop only exact duplicates. Show me a clear before/after of what changed.

3. Fill in the "About this project" section of CLAUDE.md yourself. Do a deep dive of my project first: read the README, the main folders, the package/config files, and the key source files. From that, write a short, accurate description of what this project is, who it is for, and the tech it uses. Do not ask me to fill in the blanks, draft it from what you actually find.

4. Show me the finished CLAUDE.md and AGENTS.md right here in the chat, and walk me through the "About this project" section line by line so I can confirm or correct it before we move on.

From now on, follow CLAUDE.md in every chat.`;

const accentStyles = {
  volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt", bgSubtle: "bg-volt/5" },
  spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark", bgSubtle: "bg-spark/5" },
  primary: { border: "border-primary/20", bg: "bg-primary/10", text: "text-primary", bgSubtle: "bg-primary/5" },
  success: { border: "border-success/20", bg: "bg-success/10", text: "text-success", bgSubtle: "bg-success/5" },
};

const FILES = [
  {
    name: "CLAUDE.md",
    purpose: "The actual rules. How to talk to you, the honesty rules, what you are building, and the guardrails.",
    reads: "Read by Claude Code",
    accent: "spark" as const,
    url: CLAUDE_URL,
    content: CLAUDE_TXT,
  },
  {
    name: "AGENTS.md",
    purpose: "A one-line pointer to CLAUDE.md, so other tools load the exact same rules.",
    reads: "Read by Cursor, Codex, and others",
    accent: "primary" as const,
    url: AGENTS_URL,
    content: AGENTS_TXT,
  },
];

export default function SystemPromptPage() {
  return (
    <div className="space-y-24">
      <BreadcrumbJsonLd path="/non-coders/system-prompt" />
      {/* ── HERO ── */}
      <header className="stagger-children space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge className="border-spark/30 bg-spark/10 text-spark font-code text-xs">
            THE SYSTEM PROMPT
          </Badge>
          <CopyForAi path="/non-coders/system-prompt" title="The System Prompt" />
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Your AI&apos;s
          <br />
          <span className="text-spark">Standing Orders</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          The rules your AI follows in every single chat live in two files: your{" "}
          <code className="font-code text-base text-spark">CLAUDE.md</code> and{" "}
          <code className="font-code text-base text-primary">AGENTS.md</code>.
          Write them once and every conversation gets better. Here is the one
          command that downloads both straight into your project.
        </p>
        <LastUpdated date="2026-06-19" />
      </header>

      <Separator className="bg-primary/20" />

      {/* ── WHAT IS A SYSTEM PROMPT ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            What Is a System Prompt?
          </h2>
          <Separator className="bg-primary/20" />
        </div>

        <div className="glass rounded-2xl border border-spark/10 p-8 md:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="font-body text-foreground/80">
              Think of it as the briefing you give a brand-new assistant on their
              first day. You tell them how you like to work, what the project is,
              and what they should never do without asking. A good assistant
              re-reads that briefing every morning so they never drift.
            </p>
            <p className="font-body text-foreground/80">
              That is exactly what a system prompt is. Your AI reads these files
              at the start of{" "}
              <span className="font-display font-semibold text-foreground">
                every conversation
              </span>
              , before you type a word. It is the standing instruction for how
              to behave with{" "}
              <span className="font-display font-semibold text-foreground">
                you
              </span>
              . You write it once, and every chat after that gets better.
            </p>
          </div>
        </div>
      </section>

      {/* ── TWO FILES ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Two Files, One Set of Rules
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Different AI tools look for different filenames. Rather than keep two
            copies in sync, you put the real rules in one file and make the other
            point to it. Update one, both tools follow.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
          {FILES.map((file) => {
            const a = accentStyles[file.accent];
            return (
              <Card key={file.name} className={`glow-hover ${a.border}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg ${a.bg}`}
                    >
                      <FileText className={`size-5 ${a.text}`} />
                    </div>
                    <Badge
                      className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
                    >
                      {file.reads}
                    </Badge>
                  </div>
                  <CardTitle className={`font-display text-xl ${a.text}`}>
                    {file.name}
                  </CardTitle>
                  <CardDescription className="font-body">
                    {file.purpose}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── THE ONE COMMAND ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            The One-Command Setup
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Copy this and paste it into Cursor (Ctrl+I) or Claude Code. The AI
            adds the rules to your project (merging with any CLAUDE.md you
            already have), reads your project to fill in the details, then shows
            you the result to review. You do not touch any settings.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="glass rounded-xl border border-spark/10 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-primary/10 px-5 py-3">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-spark/70" />
            <span className="size-3 rounded-full bg-success/70" />
            <span className="ml-3 flex items-center gap-2 font-code text-xs text-muted-foreground">
              <Terminal className="size-3.5" />
              paste this into your AI chat
            </span>
          </div>
          <div className="p-5 space-y-3">
            <pre className="overflow-x-auto break-words font-code text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap">
              {SETUP_COMMAND}
            </pre>
            <CopyButton text={SETUP_COMMAND} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="font-body text-sm text-muted-foreground">
            <span className="font-display font-semibold text-foreground">
              That&apos;s it.
            </span>{" "}
            The rules always come straight from this site, so you get the latest
            version. The AI reads your project to fill in the details and shows
            you everything to confirm before moving on.
          </p>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            What You Get
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            This is exactly what lands in your project. Prefer to paste it in by
            hand? Copy either file below, or open the raw text.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="stagger-children space-y-6">
          {FILES.map((file) => {
            const a = accentStyles[file.accent];
            return (
              <div
                key={file.name}
                className={`glass rounded-xl border ${a.border} overflow-hidden`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <FileCog className={`size-4 ${a.text}`} />
                    <code className={`font-code text-sm font-bold ${a.text}`}>
                      {file.name}
                    </code>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-code text-xs text-muted-foreground underline decoration-muted-foreground/30 transition-colors hover:text-volt hover:decoration-volt"
                  >
                    view raw text
                  </a>
                </div>
                <div className="space-y-3 p-5">
                  <pre className="overflow-x-auto break-words font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
                    {file.content}
                  </pre>
                  <CopyButton text={file.content} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WHY ONE FILE ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Why One File and a Pointer?
          </h2>
          <Separator className="bg-primary/20" />
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="max-w-3xl space-y-4">
            <p className="font-body text-foreground/80">
              If you keep the full rules in both files, they drift apart the
              moment you edit one and forget the other. Then Cursor and Claude
              give you different behavior and you cannot tell why.
            </p>
            <p className="font-body text-foreground/80">
              Keeping the rules in{" "}
              <code className="font-code text-spark">CLAUDE.md</code> and making{" "}
              <code className="font-code text-primary">AGENTS.md</code> a single
              line that points to it means there is{" "}
              <span className="font-display font-semibold text-foreground">
                one source of truth
              </span>
              . Change it once, every tool follows. One short file is also easier
              for the AI to actually pay attention to than a long one.
            </p>
          </div>
        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Next Steps
          </h2>
          <Separator className="bg-primary/20" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/non-coders/skills" className="group">
            <Card className="glow-hover h-full transition-all hover:border-volt/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Sparkles className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    NEXT
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl transition-colors group-hover:text-volt">
                  Add Skills &amp; Commands
                </CardTitle>
                <CardDescription className="font-body">
                  Now that the rules are set, install the skills that walk your AI
                  through scaffolding, building, and demoing your project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="flex items-center gap-1 font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                  Open Skills <ArrowRight className="size-3" />
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/non-coders/setup" className="group">
            <Card className="glow-hover h-full transition-all hover:border-volt/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Settings className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    BASICS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl transition-colors group-hover:text-volt">
                  Getting Started
                </CardTitle>
                <CardDescription className="font-body">
                  New to all of this? The shortcuts, the daily workflow, and the
                  other files that make up your project setup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="flex items-center gap-1 font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                  Open Getting Started <ArrowRight className="size-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}

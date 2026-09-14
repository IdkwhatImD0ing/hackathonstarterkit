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
import {
  AGENTS_MD_URL,
  CLAUDE_MD_URL,
  SYSTEM_PROMPT_SETUP_COMMAND,
} from "@/lib/prompts";

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

// Shared with /cheat-sheet, so both offer the identical setup command.
const CLAUDE_URL = CLAUDE_MD_URL;
const AGENTS_URL = AGENTS_MD_URL;
const SETUP_COMMAND = SYSTEM_PROMPT_SETUP_COMMAND;

const accentStyles = {
  volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt", bgSubtle: "bg-volt/5" },
  spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark", bgSubtle: "bg-spark/5" },
  primary: { border: "border-primary/20", bg: "bg-primary/10", text: "text-primary", bgSubtle: "bg-primary/5" },
  success: { border: "border-success/20", bg: "bg-success/10", text: "text-success", bgSubtle: "bg-success/5" },
};

const FILES = [
  {
    name: "CLAUDE.md",
    purpose: "The full rules: how to talk to you, the honesty rules, what you're building, and the guardrails.",
    reads: "Read by Claude Code",
    accent: "spark" as const,
    url: CLAUDE_URL,
    content: CLAUDE_TXT,
  },
  // [CONFIRM: "See @CLAUDE.md" is Claude Code's import syntax. It's unverified whether Cursor and Codex follow it and load CLAUDE.md. The downloaded file (public/system-prompt/non-coder-agents.txt) promises they "load the exact same rules"; that text is agent-facing and wasn't changed.]
  {
    name: "AGENTS.md",
    purpose: "A one-line pointer that tells other tools to read CLAUDE.md.",
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
          The rules your AI follows in every chat live in two files,{" "}
          <code className="font-code text-base text-spark">CLAUDE.md</code> and{" "}
          <code className="font-code text-base text-primary">AGENTS.md</code>.
          One command sets up both in your project.
        </p>
        <LastUpdated date="2026-09-14" />
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
              It&apos;s the briefing you&apos;d give a new assistant on their
              first day: how you like to work, what the project is, and what
              they should never do without asking.
            </p>
            <p className="font-body text-foreground/80">
              Your AI reads these files at the start of{" "}
              <span className="font-display font-semibold text-foreground">
                every conversation
              </span>
              , before you type a word, so you don&apos;t have to repeat your
              rules in each new chat.
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
          {/* [CONFIRM: this page conflicts with /non-coders/setup, which says your setup is .cursorrules + a full AGENTS.md + PRD.md. /domain-to-spec also writes its own AGENTS.md. Which setup should non-coders follow? Advice left unchanged until you decide.] */}
          <p className="max-w-3xl font-body text-muted-foreground">
            Claude Code looks for CLAUDE.md. Cursor, Codex, and other tools look
            for AGENTS.md. So the full rules go in CLAUDE.md, and AGENTS.md
            points to it.
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
            Paste this into Cursor&apos;s agent chat (Ctrl+I, or Cmd+I on a Mac)
            or into Claude Code. The AI adds both files without overwriting what
            you already have. Then it reads your project, drafts the &ldquo;About
            this project&rdquo; section, and checks it with you.
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
              Updates:
            </span>{" "}
            You get the rules as they are on this site when you run the
            command. To pick up a newer version later, run it again.
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
            Here&apos;s what the command adds, before the AI fills in the About
            section. You can also copy either file in by hand.
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
              first time you edit one and forget the other. Then Cursor and
              Claude behave differently and you can&apos;t tell why.
            </p>
            <p className="font-body text-foreground/80">
              With the rules only in{" "}
              <code className="font-code text-spark">CLAUDE.md</code>, there&apos;s{" "}
              <span className="font-display font-semibold text-foreground">
                one place to edit
              </span>
              . This site&apos;s own repo is set up the same way: its{" "}
              <code className="font-code text-primary">AGENTS.md</code> just
              points to <code className="font-code text-spark">CLAUDE.md</code>.
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
                  With the rules set, add skills that walk your AI through
                  planning, building, and demoing your project.
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
                  The Cursor shortcuts, the loop for building each feature, and
                  the other files in a project setup.
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

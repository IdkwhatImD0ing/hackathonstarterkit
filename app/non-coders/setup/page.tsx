import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Keyboard,
  RotateCcw,
  CheckCircle2,
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
  title: "Getting Started",
  description:
    "The 3 files, 4 shortcuts, and daily workflow you need to start building with Cursor.",
  alternates: {
    canonical: `${SITE_URL}/non-coders/setup`,
    types: markdownAlternate("/non-coders/setup"),
  },
};

// [CONFIRM: the audit flags .cursorrules as Cursor's legacy rules format (this repo itself uses .cursor/rules/). Cursor's own post (cursor.com/blog/agent-best-practices, Jan 2026) puts rules in .cursor/rules/, and Awesome Cursor Rules (github.com/PatrickJS/awesome-cursorrules, from the old hub's Sources list) now uses .mdc files there. Keep recommending .cursorrules?]
// [CONFIRM: the AGENTS.md template below pins "Next.js 15". Still the version you want readers to use?]
const THREE_FILES = [
  {
    name: ".cursorrules",
    purpose: "Tells the AI how to behave with you",
    accent: "volt" as const,
    content: `PROJECT TYPE
- Non-coder using Cursor + Claude Code to ship a working demo fast.
- Prioritize shippable UX over perfect architecture.

OPERATING PRINCIPLES
- Write smallest vertical slice first: input > processing > visible output.
- Ask for clarification when requirements are ambiguous.
- Prefer high-level libraries and hosted services.

PLANNING RULES
- Before coding: generate a 5-10 step plan with file list and test path.
- After coding: run project, capture logs, propose fixes if errors occur.
- Keep diffs small; commit every working increment.

CODING STYLE
- Clear, commented code for non-coders to read. Avoid cleverness.

GUARDRAILS
- Never introduce secrets into source. Use environment variables.
- If blocked >10 minutes, switch approach or scaffold a simpler path.`,
  },
  {
    name: "AGENTS.md",
    purpose: "Tells the AI about your project",
    accent: "spark" as const,
    content: `# AGENTS.md

## Overview
[One paragraph: what this project does and who it's for]

## Tech Stack
- Frontend: Next.js 15, React 19, TypeScript
- Styling: Tailwind CSS
- Database: [your choice, e.g., Supabase]

## Commands
- Dev server: pnpm dev
- Build: pnpm build
- Lint: pnpm lint

## Conventions
- Use functional components with hooks
- Server components by default
- kebab-case for files, PascalCase for components

## Safety Rules
- Ask before deleting files
- Ask before database writes
- Ask before deploying`,
  },
  {
    name: "PRD.md",
    purpose: "Your plan, in plain English",
    accent: "primary" as const,
    content: `# Product Requirements Document

## What Is This?
[One sentence: "An app that helps [who] do [what] by [how]"]

## Who Is It For?
[Describe the target user in 2-3 sentences]

## Core Features (MVP)
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

## What This Is NOT
- Not a [thing it could be confused with]
- V1 does not include [future feature]

## User Flow
1. User opens the app and sees [what]
2. User clicks [what] to [do what]
3. The system [responds how]

## Success Criteria
- [ ] User can [core action 1]
- [ ] User can [core action 2]`,
  },
];

// [CONFIRM: Ctrl+L for chat and Ctrl+I for agent mode may be out of date. Check them against the current Cursor version.]
const SHORTCUTS = [
  {
    keys: "Tab",
    action: "Accept AI suggestion",
    when: "While typing, accept what the AI offers",
    accent: "volt" as const,
  },
  {
    keys: "Ctrl+K",
    action: "Inline edit",
    when: "Select code, describe the change in English",
    accent: "spark" as const,
  },
  {
    keys: "Ctrl+L",
    action: "Chat with AI",
    when: "Ask questions, get explanations",
    accent: "primary" as const,
  },
  {
    keys: "Ctrl+I",
    action: "Agent mode",
    when: "Create and edit several files at once",
    accent: "success" as const,
  },
];

const accentStyles = {
  volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt", bgSubtle: "bg-volt/5" },
  spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark", bgSubtle: "bg-spark/5" },
  primary: { border: "border-primary/20", bg: "bg-primary/10", text: "text-primary", bgSubtle: "bg-primary/5" },
  success: { border: "border-success/20", bg: "bg-success/10", text: "text-success", bgSubtle: "bg-success/5" },
};

export default function SetupPage() {
  return (
    <div className="space-y-24">
      <BreadcrumbJsonLd path="/non-coders/setup" />
      <header className="stagger-children space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge className="border-spark/30 bg-spark/10 text-spark font-code text-xs">
            GETTING STARTED
          </Badge>
          <CopyForAi path="/non-coders/setup" title="Getting Started" />
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Getting Started
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          Set up three files, learn four shortcuts, then build each feature
          with the same five-step loop.
        </p>
        <LastUpdated date="2026-09-14" />
      </header>

      <Separator className="bg-primary/20" />

      {/* ── THE 3 FILES ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            The 3 Files
          </h2>
          {/* [CONFIRM: this page's setup (.cursorrules + a full AGENTS.md + PRD.md) conflicts with /non-coders/system-prompt, which puts the rules in CLAUDE.md and makes AGENTS.md a one-line pointer. /domain-to-spec also writes its own AGENTS.md. Which setup should non-coders follow? Advice left unchanged until you decide.] */}
          <p className="max-w-3xl font-body text-muted-foreground">
            Cursor reads .cursorrules and AGENTS.md on its own.{" "}
            <a
              href="https://agents.md/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground"
            >
              AGENTS.md
            </a>{" "}
            is an open format, so Codex and other AI coding tools read it too.
            PRD.md is your plan, and you paste it in as your first prompt. The{" "}
            <Link
              href="/non-coders/system-prompt"
              className="text-volt underline decoration-volt/30 hover:decoration-volt"
            >
              System Prompt
            </Link>{" "}
            page has a one-command setup, and{" "}
            <Link
              href="/non-coders/concepts"
              className="text-volt underline decoration-volt/30 hover:decoration-volt"
            >
              Concepts Explained
            </Link>{" "}
            defines words like commit.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
          {THREE_FILES.map((file) => {
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
                      FILE
                    </Badge>
                  </div>
                  <CardTitle className={`font-display text-xl ${a.text}`}>
                    {file.name}
                  </CardTitle>
                  <CardDescription className="font-body">
                    {file.purpose}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`rounded-lg border ${a.border} ${a.bgSubtle} p-3`}
                  >
                    <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
                      {file.content}
                    </pre>
                  </div>
                  <div className="mt-3">
                    <CopyButton text={file.content} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── THE 4 SHORTCUTS ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            The 4 Shortcuts
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            On a Mac, press Cmd wherever you see Ctrl.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHORTCUTS.map((shortcut) => {
            const a = accentStyles[shortcut.accent];
            return (
              <div
                key={shortcut.keys}
                className={`glow-hover rounded-xl border ${a.border} bg-card p-5 text-center transition-all`}
              >
                <div
                  className={`mx-auto mb-3 inline-flex items-center justify-center rounded-lg ${a.bg} px-4 py-2`}
                >
                  <Keyboard className={`mr-2 size-4 ${a.text}`} />
                  <span className={`font-code text-sm font-bold ${a.text}`}>
                    {shortcut.keys}
                  </span>
                </div>
                <p className="font-display text-sm font-semibold">
                  {shortcut.action}
                </p>
                <p className="mt-1 font-body text-xs text-muted-foreground">
                  {shortcut.when}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── THE DAILY WORKFLOW ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            The Daily Workflow
          </h2>
          <Separator className="bg-primary/20" />
        </div>

        {/* [NEEDS SPECIFIC: step 3 asks non-coders to review code they may not be able to read. What can a non-coder actually check in a diff? The owner should say; no method has been added.] */}
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Start a new chat",
              description: (
                <>
                  Open a fresh chat for each feature. Long conversations can
                  make the agent lose focus, according to Cursor&apos;s post{" "}
                  <a
                    href="https://cursor.com/blog/agent-best-practices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground"
                  >
                    &ldquo;Best practices for coding with agents&rdquo;
                  </a>{" "}
                  (Lee Robinson, 2026).
                </>
              ),
              accent: "volt" as const,
            },
            { step: 2, title: "Describe the change", description: "Say who uses it, what they do, what data it shows, and how it should look. \"Make it better\" gives the AI nothing to go on.", accent: "spark" as const },
            { step: 3, title: "Review the diff", description: "Look at the green (added) and red (removed) lines before you click Accept. The same post warns that AI-written code can look right and still be wrong.", accent: "primary" as const },
            { step: 4, title: "Test it", description: "Check your app in the browser. If something looks wrong, paste a screenshot into the chat.", accent: "success" as const },
            { step: 5, title: "Commit", description: "Once it works, tell the AI to commit with a short description. You can go back to that point if something breaks later.", accent: "volt" as const },
          ].map((item) => {
            const a = accentStyles[item.accent];
            return (
              <div
                key={item.step}
                className={`rounded-xl border ${a.border} bg-card p-5 transition-all`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${a.bg} font-display text-lg font-bold ${a.text}`}
                  >
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <p className={`font-display text-lg font-semibold ${a.text}`}>
                      {item.title}
                    </p>
                    <p className="font-body text-sm text-foreground/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-start gap-3">
            <RotateCcw className="mt-0.5 size-5 shrink-0 text-volt" />
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Then repeat.
              </span>{" "}
              Don&apos;t build the next feature on top of one you haven&apos;t
              tested.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHECKLIST ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Getting Started Checklist
          </h2>
          <Separator className="bg-primary/20" />
        </div>

        {/* [NEEDS SPECIFIC: where does "at least a week" come from? A hackathon where you or a teammate had to learn the tool during the event would carry this.] */}
        <Card className="glow-hover border-volt/20">
          <CardContent className="space-y-4 pt-6">
            {[
              { text: "Install Cursor from cursor.com and sign in", accent: "volt" },
              { text: "Create your project folder and add the 3 files above (.cursorrules, AGENTS.md, PRD.md)", accent: "spark" },
              { text: "Fill out PRD.md with what you're building, for whom, and why", accent: "primary" },
              { text: "Open Cursor Agent mode (Ctrl+I) and paste your PRD as the first prompt", accent: "success" },
              { text: "Practice the daily workflow for at least a week before your hackathon, so you're not learning Cursor at the event", accent: "volt" },
            ].map((item) => {
              const colorMap: Record<string, string> = {
                volt: "text-volt",
                spark: "text-spark",
                primary: "text-primary",
                success: "text-success",
              };
              return (
                <div
                  key={item.text}
                  className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:border-volt/20"
                >
                  <CheckCircle2
                    className={`mt-0.5 size-5 shrink-0 ${colorMap[item.accent]}`}
                  />
                  <p className="font-body text-sm text-foreground/80">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

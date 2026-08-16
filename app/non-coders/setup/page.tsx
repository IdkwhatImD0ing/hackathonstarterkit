import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Keyboard,
  RotateCcw,
  AlertTriangle,
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
    purpose: "Your plain-English blueprint",
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
    when: "Multi-file creation and editing",
    accent: "success" as const,
  },
];

const PITFALLS = [
  {
    text: "Accepting code without reading the diff",
    fix: "Always review the green/red changes before clicking Accept",
    accent: "volt",
  },
  {
    text: "Vague prompts like 'make it better'",
    fix: "Be specific about users, actions, data, and appearance",
    accent: "spark",
  },
  {
    text: "Building too many features at once",
    fix: "One feature per chat session, test before moving on",
    accent: "primary",
  },
  {
    text: "Skipping version control",
    fix: "Tell the AI to commit after every working change",
    accent: "success",
  },
  {
    text: "Learning the tool during the hackathon",
    fix: "Practice with Cursor for at least a week before the event",
    accent: "volt",
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
          The 3 files, 4 shortcuts, and daily workflow you need. Nothing else is
          required.
        </p>
        <LastUpdated date="2026-06-19" />
      </header>

      <Separator className="bg-primary/20" />

      {/* ── THE 3 FILES ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            The 3 Files That Matter
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Your entire configuration lives in three files. The AI reads these
            every time it helps you. For the deep dive on the system prompt files
            (and a one-command setup), see{" "}
            <Link
              href="/non-coders/system-prompt"
              className="text-volt underline decoration-volt/30 hover:decoration-volt"
            >
              The System Prompt
            </Link>
            . Don&apos;t know what a &ldquo;file&rdquo; means in this context?
            Check{" "}
            <Link
              href="/non-coders/concepts"
              className="text-volt underline decoration-volt/30 hover:decoration-volt"
            >
              Concepts Explained
            </Link>
            .
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
            Memorize these four keyboard shortcuts. They cover 95% of what you
            need.
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
          <p className="max-w-3xl font-body text-muted-foreground">
            Follow this loop every time you sit down to build.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="space-y-4">
          {[
            { step: 1, title: "Start a new chat", description: "Open a fresh chat in Cursor for each distinct feature. Long chats degrade AI quality.", accent: "volt" as const },
            { step: 2, title: "Describe the change", description: "Tell the AI what you want in plain language. Be specific about users, actions, and appearance.", accent: "spark" as const },
            { step: 3, title: "Review the diff", description: "Read the green (added) and red (removed) lines before accepting. Never accept blindly.", accent: "primary" as const },
            { step: 4, title: "Test locally", description: "Check your app in the browser. If something looks wrong, screenshot it and paste into chat.", accent: "success" as const },
            { step: 5, title: "Commit", description: "Tell the agent to commit with a descriptive message. This gives you save points to revert to.", accent: "volt" as const },
            { step: 6, title: "Repeat", description: "Move to the next feature. One feature per chat. Test before building on top.", accent: "spark" as const },
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
                The mindset:
              </span>{" "}
              You are not managing code. You are managing intent. Describe what
              you want, review what the AI produces, test it, save it, move on.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMMON PITFALLS ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Common Pitfalls
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            These mistakes cost non-coders the most time. Every one is avoidable.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <Card className="glow-hover border-volt/20">
          <CardContent className="space-y-4 pt-6">
            {PITFALLS.map((pitfall) => {
              const colorMap: Record<string, string> = {
                volt: "text-volt",
                spark: "text-spark",
                primary: "text-primary",
                success: "text-success",
              };
              return (
                <div
                  key={pitfall.text}
                  className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:border-volt/20"
                >
                  <AlertTriangle
                    className={`mt-0.5 size-5 shrink-0 ${colorMap[pitfall.accent]}`}
                  />
                  <div className="space-y-1">
                    <p className="font-body text-sm font-semibold text-foreground">
                      {pitfall.text}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      Fix: {pitfall.fix}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      {/* ── CHECKLIST ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Getting Started Checklist
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Follow these steps and you&apos;ll be building within the hour.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <Card className="glow-hover border-volt/20">
          <CardContent className="space-y-4 pt-6">
            {[
              { text: "Install Cursor from cursor.com and sign in", accent: "volt" },
              { text: "Create your project folder and add the 3 files above (.cursorrules, AGENTS.md, PRD.md)", accent: "spark" },
              { text: "Fill out PRD.md with what you're building, for whom, and why", accent: "primary" },
              { text: "Open Cursor Agent mode (Ctrl+I) and paste your PRD as the first prompt", accent: "success" },
              { text: "Follow the daily workflow: describe, review, test, commit, repeat", accent: "volt" },
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

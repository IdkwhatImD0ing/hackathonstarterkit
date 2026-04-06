import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Quote,
  FileText,
  Keyboard,
  RotateCcw,
  AlertTriangle,
  Terminal,
  Download,
  FolderOpen,
  ExternalLink,
  Stethoscope,
  Scale,
  Lightbulb,
  Gamepad2,
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
import { NON_CODER_SKILLS } from "@/lib/non-coder-skills";

export const metadata: Metadata = {
  title: "For Non-Coders",
  description:
    "Proven strategies and installable AI skills for professionals who build with Cursor and Claude Code. No coding experience required.",
  openGraph: {
    title: "For Non-Coders | Hackathon Starter Kit",
    description:
      "Proven strategies and installable AI skills for professionals who build with Cursor and Claude Code.",
  },
};

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="max-w-3xl font-body text-muted-foreground">{subtitle}</p>
      <Separator className="bg-primary/20" />
    </div>
  );
}

const WINNERS = [
  {
    name: "Mike Brown",
    profession: "Personal Injury Lawyer",
    icon: Scale,
    placement: "1st Place",
    hackathon: "Anthropic Hackathon",
    project: "CrossBeam",
    projectDesc: "ADU permit compliance assistant",
    buildTime: "6 days",
    quote:
      "A developer without legal expertise would build something that hallucinates plausible nonsense.",
    accent: "volt" as const,
    url: "https://hadleylab.org/blogs/2026-03-22-the-lawyer-who-won/",
  },
  {
    name: "Dr. Michal Nedoszytko",
    profession: "Interventional Cardiologist",
    icon: Stethoscope,
    placement: "3rd Place",
    hackathon: "Anthropic Hackathon",
    project: "PostVisit.AI",
    projectDesc: "Post-visit patient care platform",
    buildTime: "7 days",
    quote: "Programming is solved.",
    accent: "spark" as const,
    url: "https://techstory.in/cardiologist-builds-patient-care-app-in-7-days-places-third-at-anthropic-hackathon/",
  },
  {
    name: "Nina Kolari",
    profession: "Entrepreneur, 51",
    icon: Lightbulb,
    placement: "1st Place",
    hackathon: "Cursor Hackathon",
    project: "Aphasio",
    projectDesc: "Speech practice app for stroke patients",
    buildTime: "3 hours",
    quote:
      "Product sense beats coding skill. I solved a specific, painful problem.",
    accent: "primary" as const,
    url: "https://ninakolari.com/i-joined-a-3-hour-hackathon-and-build-an-iphone-app-here-are-my-biggest-takeaways/",
  },
  {
    name: "Rene Turcios",
    profession: "Former Yu-Gi-Oh! Pro",
    icon: Gamepad2,
    placement: "200+ Wins",
    hackathon: "Various Hackathons",
    project: "Multiple Projects",
    projectDesc: "Zero lines of code written, ever",
    buildTime: "Ongoing",
    quote: "Anyone can build anything they want.",
    accent: "success" as const,
    url: "https://sfstandard.com/2025/07/05/rene-turcios-hackathon-labubu-vibe-coding-chatgpt/",
  },
];

const THREE_FILES = [
  {
    name: ".cursorrules",
    purpose: "Tells the AI how to behave with you",
    accent: "volt" as const,
    icon: FileText,
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
    icon: FileText,
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
    icon: FileText,
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
  },
  {
    keys: "Ctrl+K",
    action: "Inline edit",
    when: "Select code, describe the change in English",
  },
  {
    keys: "Ctrl+L",
    action: "Chat with AI",
    when: "Ask questions, get explanations",
  },
  {
    keys: "Ctrl+I",
    action: "Agent mode",
    when: "Multi-file creation and editing",
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
    text: "No .cursorrules file in the project",
    fix: "Set up your rules once; they persist forever",
    accent: "primary",
  },
  {
    text: "Building too many features at once",
    fix: "One feature per chat session, test before moving on",
    accent: "success",
  },
  {
    text: "Skipping version control (git commits)",
    fix: "Commit at every working checkpoint so you can revert",
    accent: "volt",
  },
  {
    text: "Learning the tool during the hackathon",
    fix: "Practice with Cursor for at least a week before the event",
    accent: "spark",
  },
];

const accentStyles = {
  volt: {
    border: "border-volt/20",
    bg: "bg-volt/10",
    text: "text-volt",
    dot: "bg-volt",
    bgSubtle: "bg-volt/5",
  },
  spark: {
    border: "border-spark/20",
    bg: "bg-spark/10",
    text: "text-spark",
    dot: "bg-spark",
    bgSubtle: "bg-spark/5",
  },
  primary: {
    border: "border-primary/20",
    bg: "bg-primary/10",
    text: "text-primary",
    dot: "bg-primary",
    bgSubtle: "bg-primary/5",
  },
  success: {
    border: "border-success/20",
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    bgSubtle: "bg-success/5",
  },
};

export default function NonCodersPage() {
  return (
    <div className="space-y-24">
      {/* ============================================================
          HERO
          ============================================================ */}
      <header className="stagger-children space-y-6">
        <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
          FOR NON-CODERS
        </Badge>
        <h1 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
          Your Expertise
          <br />
          <span className="text-primary">Is the Code</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          Proven strategies and installable AI skills for doctors, lawyers, and
          professionals who build with Cursor and Claude Code. Zero programming
          experience required.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="rounded-xl border border-volt/15 bg-volt/5 px-4 py-2 text-center">
            <p className="font-display text-2xl font-bold text-volt">4</p>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              Winners Profiled
            </p>
          </div>
          <div className="rounded-xl border border-spark/15 bg-spark/5 px-4 py-2 text-center">
            <p className="font-display text-2xl font-bold text-spark">6</p>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              Installable Skills
            </p>
          </div>
          <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-2 text-center">
            <p className="font-display text-2xl font-bold text-primary">30+</p>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              Sources
            </p>
          </div>
        </div>
      </header>

      {/* ============================================================
          SECTION 1: THE PROOF
          ============================================================ */}
      <section className="space-y-8">
        <SectionHeading
          title="The Proof"
          subtitle="These are real professionals with zero coding backgrounds who beat thousands of developers at major hackathons."
        />

        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="font-body text-sm text-muted-foreground">
            <span className="font-display font-semibold text-foreground">
              Anthropic&apos;s &ldquo;Built with Opus 4.6&rdquo; Hackathon
              (Feb 2026):
            </span>{" "}
            13,000 applicants. 500 accepted. Only 1 of the 5 winners was a
            professional developer.
          </p>
        </div>

        <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
          {WINNERS.map((winner) => {
            const a = accentStyles[winner.accent];
            return (
              <a
                key={winner.name}
                href={winner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className={`glow-hover h-full ${a.border} transition-all hover:${a.border.replace('/20', '/40')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-10 items-center justify-center rounded-lg ${a.bg}`}
                      >
                        <winner.icon className={`size-5 ${a.text}`} />
                      </div>
                      <Badge
                        className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
                      >
                        {winner.placement}
                      </Badge>
                    </div>
                    <CardTitle className={`font-display text-xl ${a.text}`}>
                      {winner.name}
                    </CardTitle>
                    <CardDescription className="font-body">
                      {winner.profession} &middot; {winner.hackathon}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <p className="font-display text-sm font-semibold">
                        {winner.project}
                      </p>
                      <p className="font-body text-sm text-foreground/60">
                        {winner.projectDesc}
                      </p>
                      <Badge
                        variant="outline"
                        className={`${a.border} ${a.text} font-code text-xs`}
                      >
                        Built in {winner.buildTime}
                      </Badge>
                    </div>
                    <blockquote
                      className={`border-l-2 ${a.border} pl-4 font-body text-sm italic text-foreground/80`}
                    >
                      &ldquo;{winner.quote}&rdquo;
                    </blockquote>
                    <span className={`font-code text-xs ${a.text} opacity-60`}>
                      Read the full story →
                    </span>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
              <Trophy className="size-5 text-volt" />
            </div>
            <div className="space-y-1">
              <p className="font-display font-semibold">
                The Pattern Is Clear
              </p>
              <p className="font-body text-sm text-foreground/80">
                Every winner solved a problem from their own professional domain.
                The cardiologist built for his patients. The lawyer built for a
                friend&apos;s business. The entrepreneur built for her mother.
                Your years of professional experience are worth more than any CS
                degree in this context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: THE SETUP
          ============================================================ */}
      <section className="space-y-8">
        <SectionHeading
          title="The Setup"
          subtitle="Your entire non-coder configuration lives in three files. Everything else is optional."
        />

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
                      <file.icon className={`size-5 ${a.text}`} />
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

      {/* ============================================================
          SECTION 3: THE 4 SHORTCUTS
          ============================================================ */}
      <section className="space-y-8">
        <SectionHeading
          title="The 4 Shortcuts"
          subtitle="Memorize these four keyboard shortcuts. They cover 95% of what you need."
        />

        <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHORTCUTS.map((shortcut, i) => {
            const accents = ["volt", "spark", "primary", "success"] as const;
            const accent = accents[i % accents.length];
            const a = accentStyles[accent];
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

      {/* ============================================================
          SECTION 4: THE DAILY WORKFLOW
          ============================================================ */}
      <section className="space-y-8">
        <SectionHeading
          title="The Daily Workflow"
          subtitle="Follow this loop every time you sit down to build. It keeps you from getting lost."
        />

        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Start a new chat",
              description:
                "Open a fresh chat in Cursor for each distinct feature. Long chats degrade AI quality.",
              accent: "volt" as const,
            },
            {
              step: 2,
              title: "Describe the change",
              description:
                "Tell the AI what you want in plain language. Be specific about users, actions, and appearance.",
              accent: "spark" as const,
            },
            {
              step: 3,
              title: "Review the diff",
              description:
                "Read the green (added) and red (removed) lines before accepting. Never accept blindly.",
              accent: "primary" as const,
            },
            {
              step: 4,
              title: "Test locally",
              description:
                "Check your dev server at localhost:3000. If something looks wrong, screenshot it and paste into chat.",
              accent: "success" as const,
            },
            {
              step: 5,
              title: "Commit and push",
              description:
                "Tell the agent to commit with a descriptive message. This gives you save points to revert to.",
              accent: "volt" as const,
            },
            {
              step: 6,
              title: "Repeat",
              description:
                "Move to the next feature. One feature per chat. Test before building on top.",
              accent: "spark" as const,
            },
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
                    <p
                      className={`font-display text-lg font-semibold ${a.text}`}
                    >
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

      {/* ============================================================
          SECTION 5: COMMON PITFALLS
          ============================================================ */}
      <section className="space-y-8">
        <SectionHeading
          title="Common Pitfalls"
          subtitle="These mistakes cost non-coders the most time. Every one is avoidable."
        />

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

      {/* ============================================================
          SECTION 6: INSTALLABLE SKILLS
          ============================================================ */}
      <section className="space-y-8">
        <SectionHeading
          title="Skills You Can Install"
          subtitle="These are agent skills that teach your AI assistant how to work with non-coders. Install them into Cursor, Claude Code, or any tool that supports the Agent Skills Standard."
        />

        {/* How to install */}
        <div className="glass rounded-xl border border-primary/10 p-6">
          <div className="space-y-1 mb-6">
            <p className="font-code text-sm text-muted-foreground">
              <span className="text-volt">$</span> how-to-install
            </p>
            <p className="font-display text-lg font-bold">
              Three Ways to Install
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-volt/20 bg-volt/5 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-volt" />
                <p className="font-code text-xs font-bold text-volt">
                  ONE-LINER
                </p>
              </div>
              <div className="rounded bg-background/50 p-2">
                <code className="font-code text-xs text-foreground/80 break-all">
                  npx add-skill hackathonstarterkit
                </code>
              </div>
              <CopyButton text="npx add-skill hackathonstarterkit" />
            </div>

            <div className="rounded-lg border border-spark/20 bg-spark/5 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Download className="size-4 text-spark" />
                <p className="font-code text-xs font-bold text-spark">
                  CURSOR SETTINGS
                </p>
              </div>
              <p className="font-body text-xs text-foreground/70">
                Copy the raw SKILL.md URL from any skill page, then paste it
                into Cursor Settings &gt; Agent &gt; Custom Skills.
              </p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FolderOpen className="size-4 text-primary" />
                <p className="font-code text-xs font-bold text-primary">
                  MANUAL COPY
                </p>
              </div>
              <p className="font-body text-xs text-foreground/70">
                Clone the repo and copy the{" "}
                <code className="font-code text-[10px]">
                  .cursor/skills/non-coders/
                </code>{" "}
                folder into your project or{" "}
                <code className="font-code text-[10px]">
                  ~/.cursor/skills/
                </code>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {NON_CODER_SKILLS.map((skill) => {
            const a = accentStyles[skill.accent];
            return (
              <Link
                key={skill.slug}
                href={`/non-coders/skills/${skill.slug}`}
              >
                <Card
                  className={`glow-hover group h-full cursor-pointer transition-all hover:${a.border}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-10 items-center justify-center rounded-lg ${a.bg}`}
                      >
                        <skill.icon className={`size-5 ${a.text}`} />
                      </div>
                      <Badge
                        className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
                      >
                        {skill.categoryLabel.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle
                      className={`font-display text-xl transition-colors group-hover:${a.text}`}
                    >
                      {skill.title}
                    </CardTitle>
                    <CardDescription className="font-body">
                      {skill.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span
                      className={`font-code text-xs ${a.text} opacity-0 transition-opacity group-hover:opacity-100`}
                    >
                      View skill &amp; install →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          GOLDEN RULE QUOTE
          ============================================================ */}
      <section>
        <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <Quote className="mx-auto size-10 text-spark/40" />
            <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
              &ldquo;There&apos;s always been a tech barrier between domain
              expertise and coding. But now,{" "}
              <span className="animate-shimmer">
                if anyone has enough expertise, they can create advanced
                solutions. Programming is solved.
              </span>
              &rdquo;
            </blockquote>
            <p className="font-body text-sm text-muted-foreground">
              &mdash;{" "}
              <a
                href="https://nypost.com/2026/02/27/business/anthropic-hackathon-proves-vibe-coding-is-here-to-stay/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground"
              >
                Dr. Michal Nedoszytko, cardiologist, 3rd place at Anthropic
                hackathon (New York Post, Feb 2026)
              </a>
            </p>
            <Separator className="mx-auto max-w-xs bg-primary/20" />
            <div className="space-y-4 text-left">
              <p className="font-body text-foreground/80">
                <span className="font-display font-semibold text-foreground">
                  You don&apos;t need to become a programmer.
                </span>{" "}
                You need to be an expert in the problem. The cardiologist
                didn&apos;t learn JavaScript. The lawyer didn&apos;t study
                computer science. They described what they needed, and AI built
                it.
              </p>
              <p className="font-body text-foreground/80">
                Your domain expertise is the moat. Install the skills above,
                follow the workflow, and start building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SOURCES
          ============================================================ */}
      <section className="space-y-8">
        <SectionHeading
          title="Sources"
          subtitle="This guide is built on research from 30+ articles, blog posts, GitHub repos, and hackathon post-mortems."
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            {
              title: "Hadley Lab: The Lawyer Who Won",
              url: "https://hadleylab.org/blogs/2026-03-22-the-lawyer-who-won/",
            },
            {
              title: "TechStory: Cardiologist Builds App in 7 Days",
              url: "https://techstory.in/cardiologist-builds-patient-care-app-in-7-days-places-third-at-anthropic-hackathon/",
            },
            {
              title: "Nina Kolari: Hackathon Takeaways",
              url: "https://ninakolari.com/i-joined-a-3-hour-hackathon-and-build-an-iphone-app-here-are-my-biggest-takeaways/",
            },
            {
              title: "SF Standard: 200+ Hackathon Wins",
              url: "https://sfstandard.com/2025/07/05/rene-turcios-hackathon-labubu-vibe-coding-chatgpt/",
            },
            {
              title: "Cursor Blog: Agent Best Practices",
              url: "https://cursor.com/blog/agent-best-practices",
            },
            {
              title: "AGENTS.md Official Site",
              url: "https://agents.md/",
            },
            {
              title: "Awesome Cursor Rules (38k+ stars)",
              url: "https://github.com/PatrickJS/awesome-cursorrules",
            },
            {
              title: "Vibe Coding Lite: Systematic Approach",
              url: "https://vibecodinglite.dev/quickstart.html",
            },
            {
              title: "The Claude Code Setup That Won a Hackathon",
              url: "https://jpcaparas.medium.com/the-claude-code-setup-that-won-a-hackathon-a75a161cd41c",
            },
            {
              title: "Seoul Economic Daily: Builder Era Dawns",
              url: "https://en.sedaily.com/news/2026/02/25/lawyers-doctors-sweep-ai-hackathon-as-builder-era-dawns",
            },
          ].map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-lg border border-border bg-surface p-3 transition-all hover:border-volt/20"
            >
              <ExternalLink className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-volt" />
              <span className="font-body text-sm text-foreground/80 transition-colors group-hover:text-volt">
                {source.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ============================================================
          CHECKLIST
          ============================================================ */}
      <section className="space-y-8">
        <SectionHeading
          title="Getting Started Checklist"
          subtitle="Follow these steps and you'll be building within the hour."
        />

        <Card className="glow-hover border-volt/20">
          <CardContent className="space-y-4 pt-6">
            {[
              {
                text: "Install Cursor from cursor.com and sign in",
                accent: "volt",
              },
              {
                text: "Create your project folder and add the 3 files (.cursorrules, AGENTS.md, PRD.md)",
                accent: "spark",
              },
              {
                text: "Install the non-coder-mode skill using the command above",
                accent: "primary",
              },
              {
                text: "Fill out PRD.md with what you're building, for whom, and why",
                accent: "success",
              },
              {
                text: "Open Cursor Agent mode (Ctrl+I) and paste your PRD as the first prompt",
                accent: "volt",
              },
              {
                text: "Follow the daily workflow: describe, review, test, commit, repeat",
                accent: "spark",
              },
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

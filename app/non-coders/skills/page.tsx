import type { Metadata } from "next";
import Link from "next/link";
import { SlashSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/copy-button";
import { SKILLS_INSTALL_PROMPT } from "@/lib/prompts";
import {
  NON_CODER_SKILLS,
  STANDALONE_COMMANDS,
  RECOMMENDED_ORDER,
  SHORTCUT_SKILLS,
  getSkillBySlug,
} from "@/lib/non-coder-skills";
import type { SkillCategory } from "@/lib/non-coder-skills";
import { LastUpdated } from "@/components/last-updated";
import { markdownAlternate, SITE_URL } from "@/lib/site";
import { shareMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { CopyForAi } from "@/components/copy-for-ai";

export const metadata: Metadata = {
  title: "Skills & Commands",
  description:
    "Installable AI skills and slash commands that teach your AI assistant how to work with non-coders.",
  alternates: {
    canonical: `${SITE_URL}/non-coders/skills`,
    types: markdownAlternate("/non-coders/skills"),
  },
  ...shareMetadata({
    path: "/non-coders/skills",
    title: "Installable AI Skills for Non-Coders",
    description:
      "Installable AI skills and slash commands that teach your AI assistant how to work with non-coders.",
  }),
};

const accentStyles = {
  volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt", bgSubtle: "bg-volt/5" },
  spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark", bgSubtle: "bg-spark/5" },
  primary: { border: "border-primary/20", bg: "bg-primary/10", text: "text-primary", bgSubtle: "bg-primary/5" },
  success: { border: "border-success/20", bg: "bg-success/10", text: "text-success", bgSubtle: "bg-success/5" },
};

// Shared with /cheat-sheet, so both offer the identical install prompt.
const INSTALL_PROMPT = SKILLS_INSTALL_PROMPT;

// When in a hackathon build each category runs. Shown above the first
// run-order step of each category. Grounded in the pipeline order in
// CLAUDE.md and each skill's own "use this when" description.
const STAGE_WHEN: Record<SkillCategory, string> = {
  foundation: "Before you write any code",
  building: "While you build",
  fixing: "When you hit an error",
  shipping: "Before judging",
};

// Skills that stand in for run-order steps (quickstart, v0-prompt-crafter),
// so every skill appears exactly once on the page.
const OFF_ORDER_SKILLS = NON_CODER_SKILLS.filter(
  (s) => !RECOMMENDED_ORDER.includes(s.slug)
);

// The command in bold, then whatever the reader types after it.
function CommandUsage({
  name,
  usage,
  textClass,
}: {
  name: string;
  usage: string;
  textClass: string;
}) {
  const args = usage.slice(name.length).trim();
  return (
    <code className="font-code text-sm">
      <span className={`font-bold ${textClass}`}>{name}</span>
      {args && <span className="text-muted-foreground"> {args}</span>}
    </code>
  );
}

export default function SkillsPage() {
  return (
    <div className="space-y-24">
      <BreadcrumbJsonLd path="/non-coders/skills" />
      <header className="stagger-children space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
            SKILLS & COMMANDS
          </Badge>
          <CopyForAi path="/non-coders/skills" title="Skills & Commands" />
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Teach Your AI
          <br />
          <span className="text-volt">How to Help You</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          Skills are instruction files you add to your AI assistant. These
          teach it to work with someone who doesn&apos;t code, in an order that
          takes a new project from idea to submission.
        </p>
        <LastUpdated date="2026-09-14" />
      </header>

      <Separator className="bg-primary/20" />

      {/* ── HOW TO INSTALL ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            How to Install
          </h2>
          {/* [CONFIRM: Ctrl+I / Cmd+I still opens Cursor's agent chat in the current Cursor version.] */}
          <p className="max-w-3xl font-body text-muted-foreground">
            Paste this prompt into Cursor&apos;s agent chat (Ctrl+I, or Cmd+I on
            a Mac) or into Claude Code. The AI runs the install command in the
            terminal, then lists the skills it added.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="glass rounded-xl border border-volt/10 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-primary/10 px-5 py-3">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-spark/70" />
            <span className="size-3 rounded-full bg-success/70" />
            <span className="ml-3 font-code text-xs text-muted-foreground">
              paste this into your AI chat
            </span>
          </div>
          <div className="p-5 space-y-3">
            <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap">
              {INSTALL_PROMPT}
            </pre>
            <CopyButton text={INSTALL_PROMPT} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="font-body text-sm text-muted-foreground">
            <span className="font-display font-semibold text-foreground">
              Installing one skill:
            </span>{" "}
            open its page from the list below. Each page has a command that
            installs just that skill.
          </p>
        </div>
      </section>

      {/* ── RECOMMENDED ORDER ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Recommended Run Order
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            For a new project, run them in this order. /non-coder-mode goes
            first so the AI talks to you in plain English from the start.
            Steps 3 and 4 won&apos;t run without the two files /domain-to-spec
            writes.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <ol className="space-y-3">
          {RECOMMENDED_ORDER.map((slug, i) => {
            const skill = getSkillBySlug(slug);
            if (!skill) return null;
            const a = accentStyles[skill.accent];
            const prev = i > 0 ? getSkillBySlug(RECOMMENDED_ORDER[i - 1]) : undefined;
            const startsStage = prev?.category !== skill.category;
            return (
              <li key={slug} className="space-y-3">
                {startsStage && (
                  <div
                    className={`flex flex-wrap items-center gap-2 ${i > 0 ? "pt-5" : ""}`}
                  >
                    <Badge
                      className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
                    >
                      {skill.categoryLabel.toUpperCase()}
                    </Badge>
                    <span className="font-display text-sm font-semibold">
                      {STAGE_WHEN[skill.category]}
                    </span>
                  </div>
                )}
                <Link
                  href={`/non-coders/skills/${slug}`}
                  className={`group flex items-start gap-4 rounded-lg border ${a.border} ${a.bgSubtle} p-4 transition-colors hover:bg-surface`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${a.bg} font-code text-sm font-bold ${a.text}`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 space-y-1">
                    <CommandUsage
                      name={skill.command.name}
                      usage={skill.command.usage}
                      textClass={a.text}
                    />
                    <p className="font-body text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                  <span className="self-center font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                    Open →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── OTHER COMMANDS ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Other Commands
          </h2>
          <Separator className="bg-primary/20" />
        </div>

        {/* [CONFIRM: skills/ also has devpost-writer, portfolio-builder, ship-it, and youtube-writer, which the install prompt pulls in but this page doesn't list. List them here, or leave them off on purpose?] */}

        <div className="space-y-3">
          {OFF_ORDER_SKILLS.map((skill) => {
            const a = accentStyles[skill.accent];
            return (
              <Link
                key={skill.slug}
                href={`/non-coders/skills/${skill.slug}`}
                className={`group flex items-start gap-4 rounded-lg border ${a.border} ${a.bgSubtle} p-4 transition-colors hover:bg-surface`}
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${a.bg}`}
                >
                  <skill.icon className={`size-5 ${a.text}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <CommandUsage
                      name={skill.command.name}
                      usage={skill.command.usage}
                      textClass={a.text}
                    />
                    <Badge
                      className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
                    >
                      {SHORTCUT_SKILLS.includes(skill.slug)
                        ? "SHORTCUT"
                        : "ALTERNATIVE"}
                    </Badge>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
                <span className="self-center font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                  Open →
                </span>
              </Link>
            );
          })}

          {STANDALONE_COMMANDS.map((cmd) => (
            <div
              key={cmd.name}
              className="flex items-start gap-4 rounded-lg border border-spark/20 bg-spark/5 p-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-spark/10">
                <SlashSquare className="size-5 text-spark" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <CommandUsage
                    name={cmd.name}
                    usage={cmd.usage}
                    textClass="text-spark"
                  />
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    COMMAND
                  </Badge>
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  {cmd.hint}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

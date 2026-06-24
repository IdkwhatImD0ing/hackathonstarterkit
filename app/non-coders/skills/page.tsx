import type { Metadata } from "next";
import Link from "next/link";
import { SlashSquare } from "lucide-react";
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
import {
  NON_CODER_SKILLS,
  ALL_COMMANDS,
  RECOMMENDED_ORDER,
  SHORTCUT_SKILLS,
  getSkillBySlug,
} from "@/lib/non-coder-skills";
import { LastUpdated } from "@/components/last-updated";

export const metadata: Metadata = {
  title: "Skills & Commands",
  description:
    "Installable AI skills and slash commands that teach your AI assistant how to work with non-coders.",
};

const accentStyles = {
  volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt", bgSubtle: "bg-volt/5" },
  spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark", bgSubtle: "bg-spark/5" },
  primary: { border: "border-primary/20", bg: "bg-primary/10", text: "text-primary", bgSubtle: "bg-primary/5" },
  success: { border: "border-success/20", bg: "bg-success/10", text: "text-success", bgSubtle: "bg-success/5" },
};

const INSTALL_PROMPT = `Install the non-coder skills from this GitHub repo: https://github.com/IdkwhatImD0ing/hackathonstarterkit

Run this command in the terminal:
npx skills add IdkwhatImD0ing/hackathonstarterkit

Then confirm the installation when prompted. After it finishes, tell me which skills were installed.`;

export default function SkillsPage() {
  return (
    <div className="space-y-24">
      <header className="stagger-children space-y-4">
        <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
          SKILLS & COMMANDS
        </Badge>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Teach Your AI
          <br />
          <span className="text-volt">How to Help You</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          These are installable skills that teach your AI assistant how to work
          with someone who has no coding experience. Install them once, and
          every conversation gets better.
        </p>
        <LastUpdated date="2026-04-17" />
      </header>

      <Separator className="bg-primary/20" />

      {/* ── HOW TO INSTALL ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            How to Install
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Copy this prompt and paste it into Cursor (Ctrl+I) or Claude Code.
            The AI installs everything for you.
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
              That&apos;s it.
            </span>{" "}
            The AI handles the rest. You don&apos;t need to touch any settings
            or navigate any folders.
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
            These skills are pipelined. Each one has preconditions and produces
            artifacts the next one reads. Run them in this order for a new
            project.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <ol className="space-y-3">
          {RECOMMENDED_ORDER.map((slug, i) => {
            const skill = getSkillBySlug(slug);
            if (!skill) return null;
            const a = accentStyles[skill.accent];
            return (
              <li key={slug}>
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
                    <div className="flex flex-wrap items-center gap-2">
                      <code className={`font-code text-sm font-bold ${a.text}`}>
                        {skill.command.name}
                      </code>
                      <Badge
                        className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
                      >
                        {skill.categoryLabel.toUpperCase()}
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
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── SHORTCUTS ── */}
      {SHORTCUT_SKILLS.length > 0 && (
        <section className="space-y-8">
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Shortcuts
            </h2>
            <p className="max-w-3xl font-body text-muted-foreground">
              These skills bundle multiple steps from the pipeline above into a
              single command. Use them when you want to go faster and do not
              need to pause between steps.
            </p>
            <Separator className="bg-primary/20" />
          </div>

          <div className="space-y-3">
            {SHORTCUT_SKILLS.map((slug) => {
              const skill = getSkillBySlug(slug);
              if (!skill) return null;
              const a = accentStyles[skill.accent];
              return (
                <Link
                  key={slug}
                  href={`/non-coders/skills/${slug}`}
                  className={`group flex items-start gap-4 rounded-lg border ${a.border} ${a.bgSubtle} p-4 transition-colors hover:bg-surface`}
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${a.bg}`}
                  >
                    <skill.icon className={`size-5 ${a.text}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <code className={`font-code text-sm font-bold ${a.text}`}>
                        {skill.command.name}
                      </code>
                      <Badge
                        className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
                      >
                        SHORTCUT
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
          </div>
        </section>
      )}

      {/* ── SLASH COMMANDS ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Slash Commands
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            After installing, type these directly in Cursor or Claude Code chat.
            Each one triggers a specific workflow.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="glass rounded-xl border border-spark/10 p-6">
          <div className="flex items-center gap-2 mb-6">
            <SlashSquare className="size-4 text-spark" />
            <p className="font-display text-lg font-bold">Quick Reference</p>
          </div>

          <div className="space-y-2">
            {ALL_COMMANDS.map((cmd) => (
              <div
                key={cmd.name}
                className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <code className="shrink-0 font-code text-sm font-bold text-volt">
                  {cmd.name}
                </code>
                <span className="font-body text-sm text-muted-foreground">
                  {cmd.hint}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS GRID ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            All Skills
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Click any skill to see the full details and install instructions.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {NON_CODER_SKILLS.map((skill) => {
            const a = accentStyles[skill.accent];
            return (
              <Link
                key={skill.slug}
                href={`/non-coders/skills/${skill.slug}`}
              >
                <Card
                  className={`glow-hover group h-full cursor-pointer transition-all hover:border-volt/30`}
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
                    <CardTitle className="font-display text-xl transition-colors group-hover:text-volt">
                      {skill.title}
                    </CardTitle>
                    <CardDescription className="font-body">
                      {skill.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div
                      className={`rounded-lg border ${a.border} ${a.bgSubtle} px-3 py-2`}
                    >
                      <code className={`font-code text-xs ${a.text}`}>
                        {skill.command.usage}
                      </code>
                    </div>
                    <span className="font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                      View skill details →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

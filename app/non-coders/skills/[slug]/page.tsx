import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Terminal, Download, FolderOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/copy-button";
import { NON_CODER_SKILLS, getSkillBySlug } from "@/lib/non-coder-skills";

const accentStyles = {
  volt: {
    border: "border-volt/20",
    bg: "bg-volt/10",
    text: "text-volt",
    bgSubtle: "bg-volt/5",
    dot: "bg-volt",
  },
  spark: {
    border: "border-spark/20",
    bg: "bg-spark/10",
    text: "text-spark",
    bgSubtle: "bg-spark/5",
    dot: "bg-spark",
  },
  primary: {
    border: "border-primary/20",
    bg: "bg-primary/10",
    text: "text-primary",
    bgSubtle: "bg-primary/5",
    dot: "bg-primary",
  },
  success: {
    border: "border-success/20",
    bg: "bg-success/10",
    text: "text-success",
    bgSubtle: "bg-success/5",
    dot: "bg-success",
  },
};

export function generateStaticParams() {
  return NON_CODER_SKILLS.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return { title: "Skill Not Found" };
  return {
    title: skill.title,
    description: skill.description,
    openGraph: {
      title: `${skill.title} | For Non-Coders`,
      description: skill.description,
    },
  };
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) notFound();

  const a = accentStyles[skill.accent];
  const rawUrl = `https://raw.githubusercontent.com/IdkwhatImD0ing/hackathonstarterkit/main/.cursor/skills/non-coders/${skill.slug}/SKILL.md`;

  const lines = skill.content.split("\n");
  const bodyStartIndex = lines.findIndex(
    (line, i) => i > 0 && line.startsWith("---")
  );
  const bodyLines =
    bodyStartIndex >= 0 ? lines.slice(bodyStartIndex + 1) : lines;
  const bodyContent = bodyLines.join("\n").trim();

  return (
    <div className="space-y-12">
      {/* Back link */}
      <Link
        href="/non-coders"
        className="inline-flex items-center gap-2 font-code text-sm text-muted-foreground transition-colors hover:text-volt"
      >
        <ArrowLeft className="size-4" />
        Back to Guide
      </Link>

      {/* Header */}
      <header className="stagger-children space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-12 items-center justify-center rounded-xl ${a.bg}`}
          >
            <skill.icon className={`size-6 ${a.text}`} />
          </div>
          <Badge className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}>
            {skill.categoryLabel.toUpperCase()}
          </Badge>
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          {skill.title}
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          {skill.description}
        </p>
      </header>

      <Separator className="bg-primary/20" />

      {/* Install section */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold">Install This Skill</h2>

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
                npx add-skill hackathonstarterkit --skill {skill.slug}
              </code>
            </div>
            <CopyButton
              text={`npx add-skill hackathonstarterkit --skill ${skill.slug}`}
            />
          </div>

          <div className="rounded-lg border border-spark/20 bg-spark/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Download className="size-4 text-spark" />
              <p className="font-code text-xs font-bold text-spark">
                RAW URL
              </p>
            </div>
            <div className="rounded bg-background/50 p-2">
              <code className="font-code text-[10px] text-foreground/80 break-all">
                {rawUrl}
              </code>
            </div>
            <CopyButton text={rawUrl} />
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <FolderOpen className="size-4 text-primary" />
              <p className="font-code text-xs font-bold text-primary">
                MANUAL
              </p>
            </div>
            <p className="font-body text-xs text-foreground/70">
              Copy the{" "}
              <code className="font-code text-[10px]">
                .cursor/skills/non-coders/{skill.slug}/
              </code>{" "}
              folder into your project or{" "}
              <code className="font-code text-[10px]">
                ~/.cursor/skills/
              </code>
              .
            </p>
          </div>
        </div>
      </section>

      <Separator className="bg-primary/20" />

      {/* Skill content rendered */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold">Skill Content</h2>

        <Card className={`${a.border}`}>
          <CardHeader>
            <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
              <span className="size-3 rounded-full bg-destructive/70" />
              <span className="size-3 rounded-full bg-spark/70" />
              <span className="size-3 rounded-full bg-success/70" />
              <span className="ml-3 font-code text-xs text-muted-foreground">
                {skill.slug}/SKILL.md
              </span>
            </div>
            <CardTitle className={`font-display text-xl ${a.text}`}>
              {skill.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bodyContent.split("\n\n").map((paragraph, i) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith("# ")) {
                  return (
                    <h3
                      key={i}
                      className="font-display text-2xl font-bold tracking-tight"
                    >
                      {trimmed.replace("# ", "")}
                    </h3>
                  );
                }
                if (trimmed.startsWith("## ")) {
                  return (
                    <h4
                      key={i}
                      className={`font-display text-lg font-bold ${a.text}`}
                    >
                      {trimmed.replace("## ", "")}
                    </h4>
                  );
                }
                if (trimmed.startsWith("### ")) {
                  return (
                    <h5
                      key={i}
                      className="font-display text-base font-semibold"
                    >
                      {trimmed.replace("### ", "")}
                    </h5>
                  );
                }
                if (trimmed.startsWith("```")) {
                  const codeContent = trimmed
                    .replace(/^```\w*\n?/, "")
                    .replace(/\n?```$/, "");
                  return (
                    <div
                      key={i}
                      className={`rounded-lg border ${a.border} ${a.bgSubtle} p-3`}
                    >
                      <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
                        {codeContent}
                      </pre>
                    </div>
                  );
                }
                if (
                  trimmed.startsWith("- ") ||
                  trimmed.startsWith("* ")
                ) {
                  const items = trimmed.split("\n").filter((l) => l.trim());
                  return (
                    <ul key={i} className="space-y-2">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 font-body text-sm text-foreground/80"
                        >
                          <span
                            className={`mt-1.5 size-1.5 shrink-0 rounded-full ${a.dot}`}
                          />
                          {item.replace(/^[-*]\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (/^\d+\.\s/.test(trimmed)) {
                  const items = trimmed.split("\n").filter((l) => l.trim());
                  return (
                    <ol key={i} className="space-y-2">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 font-body text-sm text-foreground/80"
                        >
                          <span
                            className={`flex size-6 shrink-0 items-center justify-center rounded-full ${a.bg} font-code text-xs ${a.text}`}
                          >
                            {j + 1}
                          </span>
                          {item.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "")}
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (trimmed.startsWith("|")) {
                  const rows = trimmed
                    .split("\n")
                    .filter((r) => r.trim() && !r.includes("---"));
                  return (
                    <div key={i} className="overflow-x-auto">
                      <table className="w-full font-body text-sm">
                        <tbody>
                          {rows.map((row, j) => {
                            const cells = row
                              .split("|")
                              .filter((c) => c.trim());
                            return (
                              <tr
                                key={j}
                                className={
                                  j === 0
                                    ? "border-b border-primary/10"
                                    : ""
                                }
                              >
                                {cells.map((cell, k) => {
                                  const Tag = j === 0 ? "th" : "td";
                                  return (
                                    <Tag
                                      key={k}
                                      className={`px-3 py-2 text-left ${j === 0 ? `font-display font-semibold ${a.text}` : "text-foreground/70"}`}
                                    >
                                      {cell.trim()}
                                    </Tag>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                if (trimmed.startsWith("> ")) {
                  return (
                    <blockquote
                      key={i}
                      className={`border-l-2 ${a.border} pl-4 font-body text-sm italic text-foreground/80`}
                    >
                      {trimmed.replace(/^>\s*/gm, "")}
                    </blockquote>
                  );
                }
                return (
                  <p
                    key={i}
                    className="font-body text-sm leading-relaxed text-foreground/80"
                  >
                    {trimmed}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Raw SKILL.md */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold">
          Raw SKILL.md
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          Copy the full contents below and save as{" "}
          <code className="font-code text-xs">SKILL.md</code> in a folder named{" "}
          <code className="font-code text-xs">{skill.slug}/</code>.
        </p>
        <div className="relative">
          <div className="absolute right-3 top-3 z-10">
            <CopyButton text={skill.content} />
          </div>
          <div
            className={`rounded-xl border ${a.border} ${a.bgSubtle} p-4 pt-12`}
          >
            <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/60 whitespace-pre-wrap">
              {skill.content}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

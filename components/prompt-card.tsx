import Link from "next/link";
import { ArrowUpRight, CircleAlert, CornerDownRight } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { findPrompt, type CheatAccent, type CheatPrompt } from "@/lib/cheat-sheet";

const ACCENTS: Record<CheatAccent, { text: string; border: string; bg: string }> = {
  volt: { text: "text-volt", border: "border-volt/15", bg: "bg-volt/10" },
  spark: { text: "text-spark", border: "border-spark/15", bg: "bg-spark/10" },
  primary: { text: "text-primary", border: "border-primary/15", bg: "bg-primary/10" },
  success: { text: "text-success", border: "border-success/15", bg: "bg-success/10" },
};

/**
 * One paste-ready prompt: what it is, when to fire it, the text itself, and a
 * copy button. Built for someone standing at a table with 4 hours left, so the
 * trigger line and the copy button are the two things you cannot miss.
 *
 * Prompts that assume an artifact (a spec, a deploy, a demo script) list the
 * prompt that produces it. `onJump` wires those to the browser's cursor; on a
 * card rendered outside the browser they fall back to plain text.
 */
export function PromptCard({
  prompt,
  accent,
  onJump,
}: {
  prompt: CheatPrompt;
  accent: CheatAccent;
  onJump?: (id: string) => void;
}) {
  const a = ACCENTS[accent];
  const prerequisites = (prompt.needs ?? [])
    .map((id) => findPrompt(id))
    .filter((found) => found !== undefined);

  return (
    <article
      id={prompt.id}
      className={`glass scroll-mt-28 overflow-hidden rounded-xl border ${a.border}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 md:p-5">
        <div className="min-w-0 space-y-1">
          <h3 className="font-display text-lg font-bold tracking-tight">
            {prompt.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            <span
              className={`font-code text-[10px] uppercase tracking-widest ${a.text}`}
            >
              Use when{" "}
            </span>
            {prompt.when}
          </p>
        </div>
        <CopyButton text={prompt.prompt} />
      </div>

      {prerequisites.length > 0 ? (
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border/60 px-4 py-2.5 font-body text-xs text-muted-foreground md:px-5">
          <CornerDownRight className="size-3.5 shrink-0" />
          <span>Run first:</span>
          {prerequisites.map((found) => (
            <button
              key={found.prompt.id}
              type="button"
              onClick={() => onJump?.(found.prompt.id)}
              className={`rounded-md bg-foreground/[0.06] px-2 py-0.5 font-code ${a.text} transition-opacity hover:opacity-70`}
            >
              {found.prompt.title}
            </button>
          ))}
        </p>
      ) : null}

      <pre className="overflow-x-auto border-t border-border/60 bg-background/40 p-4 font-code text-[13px] leading-relaxed whitespace-pre-wrap text-foreground/90 md:p-5">
        {prompt.prompt}
      </pre>

      {prompt.note ? (
        <p className="flex items-start gap-2 border-t border-border/60 px-4 py-3 font-body text-xs text-muted-foreground md:px-5">
          <CircleAlert className={`mt-0.5 size-3.5 shrink-0 ${a.text}`} />
          {prompt.note}
        </p>
      ) : null}

      {prompt.source ? (
        <Link
          href={prompt.source.href}
          className="flex items-center gap-1.5 border-t border-border/60 px-4 py-3 font-code text-xs text-muted-foreground transition-colors hover:text-foreground md:px-5"
        >
          <ArrowUpRight className={`size-3.5 ${a.text}`} />
          Where this comes from: {prompt.source.label}
        </Link>
      ) : null}
    </article>
  );
}

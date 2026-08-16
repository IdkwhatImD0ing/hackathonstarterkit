import Link from "next/link";
import {
  ArrowUpRight,
  CircleAlert,
  CornerDownRight,
  Terminal,
} from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { findPrompt, type CheatAccent, type CheatPrompt } from "@/lib/cheat-sheet";

const ACCENTS: Record<CheatAccent, { text: string; border: string; chip: string }> = {
  volt: {
    text: "text-volt",
    border: "border-volt/20",
    chip: "border-volt/20 text-volt",
  },
  spark: {
    text: "text-spark",
    border: "border-spark/20",
    chip: "border-spark/20 text-spark",
  },
  primary: {
    text: "text-primary",
    border: "border-primary/20",
    chip: "border-primary/20 text-primary",
  },
  success: {
    text: "text-success",
    border: "border-success/20",
    chip: "border-success/20 text-success",
  },
};

/**
 * One paste-ready prompt: what it is, when to fire it, the text itself, and a
 * copy button. Built for someone standing at a table with 4 hours left, so the
 * trigger line and the copy button are the two things you cannot miss.
 *
 * The prompt text sits in a capped, internally scrolling well so the card
 * keeps a steady height while cycling; the full text always renders in the
 * DOM.
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
      className={`scroll-mt-28 overflow-hidden rounded-xl border ${a.border} bg-card/60`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 md:p-5">
        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
            {prompt.title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
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
              className={`rounded-md border bg-foreground/[0.03] px-2 py-0.5 font-code text-[11px] transition-colors hover:bg-foreground/[0.08] ${a.chip}`}
            >
              {found.prompt.title}
            </button>
          ))}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-background/50 px-4 py-2 md:px-5">
        <span className="flex items-center gap-1.5 font-code text-[10px] uppercase tracking-widest text-muted-foreground/70">
          <Terminal className={`size-3 ${a.text}`} />
          Paste as-is
        </span>
        <span className="hidden truncate font-code text-[10px] text-muted-foreground/40 sm:block">
          #{prompt.id}
        </span>
      </div>
      <pre className="max-h-[30rem] overflow-auto border-t border-border/40 bg-background/30 p-4 font-code text-[13px] leading-relaxed whitespace-pre-wrap text-foreground/90 md:p-5">
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

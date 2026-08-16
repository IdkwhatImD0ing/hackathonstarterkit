import { CircleAlert } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import type { CheatAccent, CheatPrompt } from "@/lib/cheat-sheet";

const ACCENTS: Record<CheatAccent, { text: string; border: string; bg: string }> = {
  volt: { text: "text-volt", border: "border-volt/15", bg: "bg-volt/10" },
  spark: { text: "text-spark", border: "border-spark/15", bg: "bg-spark/10" },
  primary: { text: "text-primary", border: "border-primary/15", bg: "bg-primary/10" },
  success: { text: "text-success", border: "border-success/15", bg: "bg-success/10" },
};

/**
 * Highlights [BRACKETED PLACEHOLDERS] so a reader can see what they have to
 * fill in before pasting. Split, not replaced: the copied text stays byte-for
 * byte identical to the source prompt.
 */
function withPlaceholders(prompt: string, accent: string) {
  return prompt.split(/(\[[^\]\n]+\])/g).map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span
        key={i}
        className={`rounded-sm bg-foreground/[0.06] px-1 font-semibold ${accent}`}
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * One paste-ready prompt: what it is, when to fire it, the text itself, and
 * a copy button. Built for someone standing at a table with 4 hours left, so
 * the trigger line and the copy button are the two things you can't miss.
 */
export function PromptCard({
  prompt,
  accent,
}: {
  prompt: CheatPrompt;
  accent: CheatAccent;
}) {
  const a = ACCENTS[accent];

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

      <pre className="overflow-x-auto border-t border-border/60 bg-background/40 p-4 font-code text-[13px] leading-relaxed whitespace-pre-wrap text-foreground/90 md:p-5">
        {withPlaceholders(prompt.prompt, a.text)}
      </pre>

      {prompt.note ? (
        <p className="flex items-start gap-2 border-t border-border/60 px-4 py-3 font-body text-xs text-muted-foreground md:px-5">
          <CircleAlert className={`mt-0.5 size-3.5 shrink-0 ${a.text}`} />
          {prompt.note}
        </p>
      ) : null}
    </article>
  );
}

import { Zap } from "lucide-react";

/**
 * A compact, scannable one-line summary for the top of a long section.
 * Gives skimmers the single most important point before the detail.
 * Uses the spark accent as a consistent "read this if nothing else" signal.
 */
export function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-spark/20 bg-spark/5 p-4">
      <Zap className="mt-0.5 size-4 shrink-0 text-spark" />
      <p className="font-body text-sm text-foreground/90">
        <span className="font-display text-xs font-semibold uppercase tracking-widest text-spark">
          TL;DR{" "}
        </span>
        {children}
      </p>
    </div>
  );
}

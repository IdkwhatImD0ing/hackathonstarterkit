"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

type Accent = "volt" | "spark" | "primary" | "success";

const ACCENTS: Record<Accent, { text: string; border: string; bg: string }> = {
  volt: { text: "text-volt", border: "border-volt/20", bg: "bg-volt/10" },
  spark: { text: "text-spark", border: "border-spark/20", bg: "bg-spark/10" },
  primary: {
    text: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/10",
  },
  success: {
    text: "text-success",
    border: "border-success/20",
    bg: "bg-success/10",
  },
};

/**
 * A collapsible dropdown. Body content always renders in the DOM (toggled with
 * `hidden`) so it stays in the prerendered HTML for SEO, then reveals on click.
 */
export function Disclosure({
  title,
  subtitle,
  badge,
  accent = "spark",
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  accent?: Accent;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const a = ACCENTS[accent];

  return (
    <div className={`overflow-hidden rounded-xl border ${a.border} bg-card`}>
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="glow-hover flex w-full items-center justify-between gap-4 p-5 text-left transition-all md:p-6"
        >
          <span className="space-y-1">
            {badge ? (
              <span
                className={`block font-code text-xs uppercase tracking-widest ${a.text}`}
              >
                {badge}
              </span>
            ) : null}
            <span className="block font-display text-xl font-bold tracking-tight md:text-2xl">
              {title}
            </span>
            {subtitle ? (
              <span className="block font-body text-sm text-muted-foreground">
                {subtitle}
              </span>
            ) : null}
          </span>
          <span
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.bg}`}
          >
            <ChevronDown
              className={`size-5 ${a.text} transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        className={`space-y-8 border-t border-border p-5 md:p-6 ${
          open ? "" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

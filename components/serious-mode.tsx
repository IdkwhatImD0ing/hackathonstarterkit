"use client";

import { useId, useState } from "react";
import { ChevronDown, Coffee, Trophy } from "lucide-react";

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

/**
 * A progressive-disclosure gate. Asks how serious the reader is about
 * hackathons; only those chasing repeat wins need the squad-building system.
 * Children always render (toggled with `hidden`) to stay SEO-visible.
 */
export function SeriousModeGate({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<null | "casual" | "serious">(null);

  const choiceBase =
    "glow-hover flex items-center justify-center gap-2 rounded-lg border px-5 py-3 font-display text-sm font-semibold transition-all";

  return (
    <div className="space-y-6">
      <div className="animate-glow-pulse glass rounded-2xl border border-spark/10 p-6 md:p-8">
        <div className="mx-auto max-w-2xl space-y-5 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            How serious are you about hackathons?
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Most people do one or two for fun, and everything above is all you
            need. The squad-building system below is for people chasing repeat
            wins.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => setMode("casual")}
              className={`${choiceBase} ${
                mode === "casual"
                  ? "border-success/40 bg-success/10 text-success"
                  : "border-border text-foreground/80 hover:border-success/30"
              }`}
            >
              <Coffee className="size-4" />
              Just doing one or two
            </button>
            <button
              type="button"
              onClick={() => setMode("serious")}
              className={`${choiceBase} ${
                mode === "serious"
                  ? "border-spark/40 bg-spark/10 text-spark"
                  : "border-border text-foreground/80 hover:border-spark/30"
              }`}
            >
              <Trophy className="size-4" />
              I want to win, repeatedly
            </button>
          </div>
        </div>
      </div>

      {mode === "casual" ? (
        <div className="rounded-lg border border-border bg-surface p-4 text-center">
          <p className="font-body text-sm text-muted-foreground">
            Perfect, you&apos;re set: find a few complementary people and ship.{" "}
            <button
              type="button"
              onClick={() => setMode("serious")}
              className="font-semibold text-spark underline decoration-spark/40 underline-offset-2 hover:decoration-spark"
            >
              Curious anyway? Show the competitive system
            </button>
          </p>
        </div>
      ) : null}

      <div className={`space-y-6 ${mode === "serious" ? "" : "hidden"}`}>
        {children}
      </div>
    </div>
  );
}

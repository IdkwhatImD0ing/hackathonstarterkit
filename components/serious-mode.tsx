"use client";

import { useState } from "react";
import { Coffee, Trophy } from "lucide-react";

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

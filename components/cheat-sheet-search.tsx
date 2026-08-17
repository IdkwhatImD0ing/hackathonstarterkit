"use client";

import { useState } from "react";
import { CornerDownLeft, LoaderCircle, Sparkles } from "lucide-react";
import { findPrompt } from "@/lib/cheat-sheet";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; id: string; reason: string }
  | { status: "error"; message: string };

/**
 * The prompt finder: describe the situation in a sentence, an agent picks the
 * one card on the sheet built for it. On a match it sets the location hash to
 * the prompt id, which the cheat sheet browser's hashchange listener treats as
 * a deep link and centers that card on screen.
 */
export function CheatSheetSearch() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>({ status: "idle" });

  const search = async () => {
    const trimmed = query.trim();
    if (trimmed.length < 3 || state.status === "loading") return;
    setState({ status: "loading" });
    try {
      const response = await fetch("/api/cheat-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Search is unavailable right now.");
      }
      const { id, reason } = (await response.json()) as {
        id: string;
        reason: string;
      };
      const found = findPrompt(id);
      if (!found) throw new Error("Search is unavailable right now.");
      setState({ status: "done", id, reason });
      window.location.hash = id;
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Search is unavailable right now.",
      });
    }
  };

  const match = state.status === "done" ? findPrompt(state.id) : undefined;

  return (
    <section
      aria-label="Prompt finder"
      className="glass rounded-2xl border border-volt/15 p-4 md:p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="size-4 text-volt" />
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-volt">
          What&apos;s going on right now?
        </h2>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          search();
        }}
        className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-1.5 focus-within:border-volt/40"
      >
        <span aria-hidden className="font-code text-sm text-volt">
          $
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          maxLength={300}
          placeholder="describe your situation: our API just died an hour before judging"
          aria-label="Describe your situation"
          className="min-w-0 flex-1 bg-transparent py-1.5 font-code text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state.status === "loading" || query.trim().length < 3}
          aria-label="Find the right prompt"
          className="glow-hover flex shrink-0 items-center gap-1.5 rounded-md border border-volt/25 bg-volt/10 px-3 py-1.5 font-code text-xs text-volt transition-colors hover:bg-volt/20 disabled:pointer-events-none disabled:opacity-40"
        >
          {state.status === "loading" ? (
            <LoaderCircle className="size-3.5 animate-spin" />
          ) : (
            <CornerDownLeft className="size-3.5" />
          )}
          Find
        </button>
      </form>

      <p className="mt-2.5 min-h-5 font-body text-xs md:text-sm" aria-live="polite">
        {state.status === "idle" ? (
          <span className="text-muted-foreground/60">
            One sentence about where you are stuck, and this jumps you to the
            prompt built for it.
          </span>
        ) : null}
        {state.status === "loading" ? (
          <span className="font-code text-muted-foreground">
            matching your situation…
          </span>
        ) : null}
        {state.status === "done" && match ? (
          <span className="text-muted-foreground">
            <span className="font-code text-volt">
              → {match.section.label} / {match.prompt.title}.
            </span>{" "}
            {state.reason}
          </span>
        ) : null}
        {state.status === "error" ? (
          <span className="text-muted-foreground">
            {state.message} The phase tabs below cover the same ground.
          </span>
        ) : null}
      </p>
    </section>
  );
}

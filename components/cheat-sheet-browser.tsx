"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PromptCard } from "@/components/prompt-card";
import { CHEAT_SECTIONS, type CheatAccent } from "@/lib/cheat-sheet";

const ACCENTS: Record<
  CheatAccent,
  { text: string; border: string; bg: string; tab: string; dot: string }
> = {
  volt: {
    text: "text-volt",
    border: "border-volt/25",
    bg: "bg-volt/10",
    tab: "border-volt/40 bg-volt/15 text-volt",
    dot: "bg-volt",
  },
  spark: {
    text: "text-spark",
    border: "border-spark/25",
    bg: "bg-spark/10",
    tab: "border-spark/40 bg-spark/15 text-spark",
    dot: "bg-spark",
  },
  primary: {
    text: "text-primary",
    border: "border-primary/25",
    bg: "bg-primary/10",
    tab: "border-primary/40 bg-primary/15 text-primary",
    dot: "bg-primary",
  },
  success: {
    text: "text-success",
    border: "border-success/25",
    bg: "bg-success/10",
    tab: "border-success/40 bg-success/15 text-success",
    dot: "bg-success",
  },
};

/**
 * Flat running order of every prompt on the sheet, so the card can cycle
 * straight from the last prompt of one phase into the first of the next.
 */
const FLAT = CHEAT_SECTIONS.flatMap((section, sectionIndex) =>
  section.prompts.map((prompt, promptIndex) => ({
    section,
    sectionIndex,
    prompt,
    promptIndex,
  })),
);

/** First prompt of each section, for the tab bar. */
const SECTION_STARTS = CHEAT_SECTIONS.map((section) =>
  FLAT.findIndex((entry) => entry.section.slug === section.slug),
);

/**
 * Tabs plus one prompt at a time, instead of a page you scroll for a minute
 * to find the prompt you need.
 *
 * Every prompt stays in the DOM and is hidden with the `hidden` class rather
 * than conditionally rendered, matching docs/page-content-conventions.md: the
 * whole sheet is in the prerendered HTML for search engines, while a reader
 * sees one card.
 */
export function CheatSheetBrowser() {
  const [cursor, setCursor] = useState(0);
  const active = FLAT[cursor];

  const jumpTo = useCallback((id: string) => {
    const target = FLAT.findIndex((entry) => entry.prompt.id === id);
    if (target !== -1) setCursor(target);
  }, []);

  // Deep links: /cheat-sheet#ship opens that phase, #readme opens that prompt.
  useEffect(() => {
    const select = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const byPrompt = FLAT.findIndex((entry) => entry.prompt.id === hash);
      if (byPrompt !== -1) {
        setCursor(byPrompt);
        return;
      }
      const bySection = FLAT.findIndex((entry) => entry.section.slug === hash);
      if (bySection !== -1) setCursor(bySection);
    };
    select();
    window.addEventListener("hashchange", select);
    return () => window.removeEventListener("hashchange", select);
  }, []);

  const accent = ACCENTS[active.section.accent];

  return (
    <div className="space-y-4">
      {/* Phase tabs */}
      <div
        role="tablist"
        aria-label="Hackathon phases"
        className="glass flex gap-1.5 overflow-x-auto rounded-xl border border-primary/15 p-2"
      >
        {CHEAT_SECTIONS.map((section, i) => {
          const a = ACCENTS[section.accent];
          const isActive = section.slug === active.section.slug;
          return (
            <button
              key={section.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${section.slug}`}
              onClick={() => setCursor(SECTION_STARTS[i])}
              className={`whitespace-nowrap rounded-lg border px-3 py-1.5 font-code text-xs transition-colors ${
                isActive
                  ? a.tab
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </div>

      {/* One panel per phase; only the active one is shown, all stay in the HTML */}
      {CHEAT_SECTIONS.map((section) => {
        const a = ACCENTS[section.accent];
        const isActive = section.slug === active.section.slug;
        const Icon = section.icon;
        return (
          <section
            key={section.slug}
            id={section.slug}
            role="tabpanel"
            aria-label={section.title}
            className={`scroll-mt-24 space-y-4 ${isActive ? "" : "hidden"}`}
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`flex size-9 items-center justify-center rounded-lg ${a.bg}`}
                >
                  <Icon className={`size-4 ${a.text}`} />
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-code text-[10px] ${a.border} ${a.text}`}
                >
                  {section.timing}
                </span>
              </div>
              <p className="max-w-2xl font-body text-sm text-muted-foreground">
                {section.subtitle}
              </p>
            </div>

            {/* Prompt index for this phase */}
            <div className="flex gap-1.5 overflow-x-auto">
              {section.prompts.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => jumpTo(prompt.id)}
                  aria-current={prompt.id === active.prompt.id}
                  className={`whitespace-nowrap rounded-lg border px-2.5 py-1 font-code text-[11px] transition-colors ${
                    prompt.id === active.prompt.id
                      ? `${a.border} ${a.bg} ${a.text}`
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {prompt.title}
                </button>
              ))}
            </div>

            {section.prompts.map((prompt) => (
              <div
                key={prompt.id}
                className={prompt.id === active.prompt.id ? "" : "hidden"}
              >
                <PromptCard
                  prompt={prompt}
                  accent={section.accent}
                  onJump={jumpTo}
                />
              </div>
            ))}
          </section>
        );
      })}

      {/* Cycle through every prompt in running order, across phases */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCursor((c) => Math.max(0, c - 1))}
          disabled={cursor === 0}
          className="glow-hover inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 font-code text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-3.5" />
          Previous
        </button>

        <span className="font-code text-xs text-muted-foreground">
          <span className={accent.text}>{active.promptIndex + 1}</span> of{" "}
          {active.section.prompts.length} in {active.section.label}
          <span className="text-muted-foreground/40">
            {" "}
            ({cursor + 1}/{FLAT.length})
          </span>
        </span>

        <button
          type="button"
          onClick={() => setCursor((c) => Math.min(FLAT.length - 1, c + 1))}
          disabled={cursor === FLAT.length - 1}
          className="glow-hover inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 font-code text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          Next
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

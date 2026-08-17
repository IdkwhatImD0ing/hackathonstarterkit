"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PromptCard } from "@/components/prompt-card";
import { CHEAT_SECTIONS, type CheatAccent } from "@/lib/cheat-sheet";

const ACCENTS: Record<
  CheatAccent,
  {
    text: string;
    tabBar: string;
    iconChip: string;
    chip: string;
    dot: string;
  }
> = {
  volt: {
    text: "text-volt",
    tabBar: "bg-volt shadow-[0_0_10px_var(--volt)]",
    iconChip: "border-volt/25 bg-volt/10",
    chip: "bg-volt/10 text-volt",
    dot: "bg-volt shadow-[0_0_6px_var(--volt)]",
  },
  spark: {
    text: "text-spark",
    tabBar: "bg-spark shadow-[0_0_10px_var(--spark)]",
    iconChip: "border-spark/25 bg-spark/10",
    chip: "bg-spark/10 text-spark",
    dot: "bg-spark shadow-[0_0_6px_var(--spark)]",
  },
  primary: {
    text: "text-primary",
    tabBar: "bg-primary shadow-[0_0_10px_var(--primary)]",
    iconChip: "border-primary/25 bg-primary/10",
    chip: "bg-primary/10 text-primary",
    dot: "bg-primary shadow-[0_0_6px_var(--primary)]",
  },
  success: {
    text: "text-success",
    tabBar: "bg-success shadow-[0_0_10px_var(--success)]",
    iconChip: "border-success/25 bg-success/10",
    chip: "bg-success/10 text-success",
    dot: "bg-success shadow-[0_0_6px_var(--success)]",
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
 * The whole sheet as one console: a terminal-style title bar, a numbered phase
 * rail, one prompt card, and a transport bar, all inside a single glass frame.
 *
 * Every prompt stays in the DOM and is hidden with the `hidden` class rather
 * than conditionally rendered, matching docs/page-content-conventions.md: the
 * whole sheet is in the prerendered HTML for search engines, while a reader
 * sees one card.
 */
export function CheatSheetBrowser() {
  const [cursor, setCursor] = useState(0);
  const tablistRef = useRef<HTMLDivElement>(null);
  const shouldCenterRef = useRef(false);
  const active = FLAT[cursor];

  /** Every jump (tab, chip, prev/next, deep link) recenters the prompt card. */
  const navigate = useCallback((index: number) => {
    shouldCenterRef.current = true;
    setCursor(index);
  }, []);

  const jumpTo = useCallback(
    (id: string) => {
      const target = FLAT.findIndex((entry) => entry.prompt.id === id);
      if (target !== -1) navigate(target);
    },
    [navigate],
  );

  // Deep links: /cheat-sheet#ship opens that phase, #readme opens that prompt.
  useEffect(() => {
    const select = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const byPrompt = FLAT.findIndex((entry) => entry.prompt.id === hash);
      if (byPrompt !== -1) {
        navigate(byPrompt);
        return;
      }
      const bySection = FLAT.findIndex((entry) => entry.section.slug === hash);
      if (bySection !== -1) navigate(bySection);
    };
    select();
    window.addEventListener("hashchange", select);
    return () => window.removeEventListener("hashchange", select);
  }, [navigate]);

  // Card heights vary, so after a jump the prompt text can land below the
  // fold. Scroll the freshly shown card to the middle of the viewport (or its
  // top, when the card is taller than the screen).
  useEffect(() => {
    if (!shouldCenterRef.current) return;
    shouldCenterRef.current = false;
    const card = document.getElementById(active.prompt.id);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    window.scrollTo({
      top: Math.max(
        0,
        rect.height < window.innerHeight
          ? top - (window.innerHeight - rect.height) / 2
          : top - 112,
      ),
      behavior: "smooth",
    });
  }, [active.prompt.id]);

  // Keep the active phase tab in view when the rail scrolls (mobile). Scrolls
  // only the rail itself, never the page.
  useEffect(() => {
    const rail = tablistRef.current;
    const tab = rail?.querySelector<HTMLButtonElement>(
      `#phase-tab-${active.section.slug}`,
    );
    if (!rail || !tab) return;
    const railRect = rail.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    rail.scrollTo({
      left:
        rail.scrollLeft +
        (tabRect.left - railRect.left) -
        (railRect.width - tabRect.width) / 2,
      behavior: "smooth",
    });
  }, [active.section.slug]);

  const accent = ACCENTS[active.section.accent];

  return (
    <div className="glass glow overflow-hidden rounded-2xl border border-primary/15">
      {/* Console title bar */}
      <div className="flex items-center gap-2 border-b border-primary/10 bg-background/40 px-4 py-2.5">
        <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-destructive/60" />
        <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-spark/60" />
        <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-success/60" />
        <span className="ml-2 min-w-0 truncate font-code text-xs text-muted-foreground">
          ~/cheat-sheet/
          <span className={accent.text}>{active.section.slug}</span>
        </span>
        <span className="ml-auto shrink-0 font-code text-[10px] uppercase tracking-widest text-muted-foreground/60">
          prompt{" "}
          <span className={accent.text}>
            {String(cursor + 1).padStart(2, "0")}
          </span>
          /{FLAT.length}
        </span>
      </div>

      {/* Phase rail: 8 numbered tabs in event order */}
      <div className="border-b border-primary/10">
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Hackathon phases"
          className="scrollbar-none flex overflow-x-auto max-md:[mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%_-_1.25rem),transparent)]"
        >
          {CHEAT_SECTIONS.map((section, i) => {
            const a = ACCENTS[section.accent];
            const isActive = section.slug === active.section.slug;
            const Icon = section.icon;
            return (
              <button
                key={section.slug}
                id={`phase-tab-${section.slug}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={section.slug}
                onClick={() => navigate(SECTION_STARTS[i])}
                className={`group relative flex min-w-[5.5rem] flex-1 flex-col items-center gap-1 whitespace-nowrap px-3 pb-3 pt-2.5 transition-colors ${
                  isActive ? "" : "hover:bg-foreground/[0.03]"
                }`}
              >
                <span
                  className={`flex items-center gap-1.5 font-code text-[10px] transition-colors ${
                    isActive
                      ? a.text
                      : "text-muted-foreground/50 group-hover:text-muted-foreground"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                  <Icon className="size-3" />
                </span>
                <span
                  className={`font-code text-[11px] uppercase tracking-wider transition-colors md:text-xs ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {section.label}
                </span>
                <span
                  aria-hidden
                  className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full transition-opacity ${
                    isActive ? `${a.tabBar} opacity-100` : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* One panel per phase; only the active one is shown, all stay in the HTML */}
      {CHEAT_SECTIONS.map((section, sectionIndex) => {
        const a = ACCENTS[section.accent];
        const isActive = section.slug === active.section.slug;
        const Icon = section.icon;
        return (
          <section
            key={section.slug}
            id={section.slug}
            role="tabpanel"
            aria-label={section.title}
            className={`scroll-mt-24 space-y-5 p-4 md:p-6 ${isActive ? "" : "hidden"}`}
          >
            <div className="space-y-2">
              <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground/60">
                <span className={a.text}>
                  Phase {String(sectionIndex + 1).padStart(2, "0")}
                </span>
                {" · "}
                {section.timing}
              </p>
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${a.iconChip}`}
                >
                  <Icon className={`size-5 ${a.text}`} />
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {section.title}
                </h2>
              </div>
              <p className="max-w-2xl font-body text-sm text-muted-foreground md:text-base">
                {section.subtitle}
              </p>
            </div>

            {/* Prompt index for this phase: a numbered tracklist, subordinate
                to the phase rail above it */}
            <div className="space-y-1.5">
              <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground/50">
                Prompts in this phase
              </p>
              <div className="scrollbar-none flex gap-1 overflow-x-auto max-md:[mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%_-_1.25rem),transparent)] md:flex-wrap md:overflow-visible">
                {section.prompts.map((prompt, promptIndex) => {
                  const isCurrent = prompt.id === active.prompt.id;
                  return (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => jumpTo(prompt.id)}
                      aria-current={isCurrent}
                      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 font-code text-[11px] transition-colors md:text-xs ${
                        isCurrent
                          ? a.chip
                          : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
                      }`}
                    >
                      <span
                        className={
                          isCurrent ? "opacity-60" : "text-muted-foreground/50"
                        }
                      >
                        {String(promptIndex + 1).padStart(2, "0")}
                      </span>
                      {prompt.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {section.prompts.map((prompt) => (
              <div
                key={prompt.id}
                className={
                  prompt.id === active.prompt.id ? "animate-card-in" : "hidden"
                }
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

      {/* Transport bar: cycle through every prompt in running order */}
      <div className="flex items-center justify-between gap-3 border-t border-primary/10 bg-background/40 px-3 py-3 md:px-4">
        <button
          type="button"
          onClick={() => navigate(Math.max(0, cursor - 1))}
          disabled={cursor === 0}
          aria-label="Previous prompt"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 py-2 font-code text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex min-w-0 flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            {active.section.prompts.map((prompt, i) => (
              <span
                key={prompt.id}
                aria-hidden
                className={`size-1.5 rounded-full transition-all ${
                  i === active.promptIndex
                    ? accent.dot
                    : "bg-muted-foreground/25"
                }`}
              />
            ))}
          </div>
          <span className="truncate font-code text-[10px] uppercase tracking-widest text-muted-foreground">
            {active.section.label} {active.promptIndex + 1}/
            {active.section.prompts.length}
            <span className="text-muted-foreground/50">
              {" "}
              · {cursor + 1}/{FLAT.length}
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate(Math.min(FLAT.length - 1, cursor + 1))}
          disabled={cursor === FLAT.length - 1}
          aria-label="Next prompt"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 py-2 font-code text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

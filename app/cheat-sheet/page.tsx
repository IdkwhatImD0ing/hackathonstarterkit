import type { Metadata } from "next";
import Link from "next/link";
import { Home, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { LastUpdated } from "@/components/last-updated";
import { CheatSheetBrowser } from "@/components/cheat-sheet-browser";
import { CheatSheetSearch } from "@/components/cheat-sheet-search";
import { CHEAT_PROMPT_COUNT, CHEAT_SHEET_UPDATED } from "@/lib/cheat-sheet";
import { cheatSheetHowToJsonLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hackathon Cheat Sheet — Copy-Paste AI Prompts for Every Phase",
  description:
    "Copy-paste AI prompts for every phase of a hackathon: setup, scoping, building, debugging, shipping, and pitching. Each one asks you for what it needs, so just paste and go.",
  alternates: {
    canonical: `${SITE_URL}/cheat-sheet`,
  },
  openGraph: {
    title: "Hackathon Cheat Sheet — Copy-Paste AI Prompts",
    description:
      "Paste-ready prompts for your AI agent at every phase of a hackathon: setup, scoping, building, debugging, shipping, and pitching.",
    url: `${SITE_URL}/cheat-sheet`,
  },
  twitter: {
    title: "Hackathon Cheat Sheet — Copy-Paste AI Prompts",
    description:
      "Paste-ready prompts for your AI agent at every phase of a hackathon. Copy one, send it, answer its questions, get back to building.",
  },
};

const HOW_TO_USE = [
  {
    step: "01",
    text: "Copy and send. Nothing to fill in first: each prompt interviews you for what it needs, so answer its questions in the chat instead of editing the text.",
  },
  {
    step: "02",
    text: "Start with the context primer in Set Up. Later prompts reuse those answers, so your agent stops asking about your deadline and stack.",
  },
  {
    step: "03",
    text: "Mind the \"run first\" line. A prompt that needs a spec or a deploy links to the prompt that produces it, and tells your agent to send you back if it is missing.",
  },
];

export default function CheatSheetPage() {
  return (
    <div className="relative min-h-screen">
      <div className="noise pointer-events-none fixed inset-0 z-50" />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 md:px-6 md:py-16">
        <JsonLd data={cheatSheetHowToJsonLd()} />
        <BreadcrumbJsonLd path="/cheat-sheet" />

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
          >
            <Home className="size-3" />
            Home
          </Link>
          <span className="font-code text-xs text-muted-foreground/40">/</span>
          <span className="font-code text-xs text-foreground">Cheat Sheet</span>
        </nav>

        {/* ============================================================
            HERO
            ============================================================ */}
        <header className="stagger-children space-y-4">
          <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
            DURING THE HACKATHON
          </Badge>
          <h1 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            Hackathon
            <br />
            <span className="text-volt">Cheat Sheet</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">
              {CHEAT_PROMPT_COUNT} paste-ready prompts
            </span>{" "}
            for the agent you are already building with. No theory, no blanks to
            fill in. Pick the phase you are in, copy the prompt, and answer the
            questions it asks you.
          </p>
          <p className="font-code text-xs text-muted-foreground">
            <span className="text-volt">$</span> pick a phase → copy → paste →
            answer its questions
          </p>
          <LastUpdated date={CHEAT_SHEET_UPDATED} />
        </header>

        {/* ============================================================
            PROMPT FINDER — describe the moment, jump to the card
            ============================================================ */}
        <CheatSheetSearch />

        {/* ============================================================
            HOW TO USE
            ============================================================ */}
        <section className="glass rounded-2xl border border-spark/15 p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="size-4 text-spark" />
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-spark">
              How to use this page
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {HOW_TO_USE.map((rule) => (
              <div key={rule.step} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-spark/25 bg-spark/10 font-code text-[10px] text-spark">
                  {rule.step}
                </span>
                <p className="font-body text-sm leading-relaxed text-foreground/85 md:text-base">
                  {rule.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            THE SHEET — tabs by phase, one prompt at a time
            ============================================================ */}
        <CheatSheetBrowser />

        {/* ============================================================
            WHERE THE REASONING LIVES
            ============================================================ */}
        <section className="glass rounded-2xl border border-primary/15 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
            Why any of these prompts say what they say
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-muted-foreground md:text-base">
            This page is the short version, written for someone with hours left
            on the clock. The reasoning behind it, the research, and the parts
            that are about people rather than code all live in the playbook. The
            prompts that run a skill come from the skills library.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/playbook"
              className="glow-hover inline-flex items-center gap-2 rounded-lg bg-volt px-5 py-2.5 font-display text-sm font-semibold text-volt-foreground transition-all hover:bg-volt/90"
            >
              Open the Playbook
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/non-coders/skills"
              className="glow-hover inline-flex items-center gap-2 rounded-lg border border-spark/30 bg-spark/10 px-5 py-2.5 font-display text-sm font-semibold text-spark transition-all hover:bg-spark/20"
            >
              Browse the skills
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

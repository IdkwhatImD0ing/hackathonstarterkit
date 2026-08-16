import type { Metadata } from "next";
import Link from "next/link";
import { Home, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { LastUpdated } from "@/components/last-updated";
import { PromptCard } from "@/components/prompt-card";
import {
  CHEAT_PROMPT_COUNT,
  CHEAT_SECTIONS,
  CHEAT_SHEET_UPDATED,
} from "@/lib/cheat-sheet";
import { cheatSheetHowToJsonLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hackathon Cheat Sheet — Copy-Paste AI Prompts for Every Phase",
  description:
    "Copy-paste AI prompts for every phase of a hackathon: setup, scoping, building, debugging, shipping, and pitching. Built for use during the event, not before.",
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
      "Paste-ready prompts for your AI agent at every phase of a hackathon. Grab one, fill the brackets, get back to building.",
  },
};

// Full class names, never interpolated fragments: Tailwind only generates
// utilities it can find as literal strings in the source.
const ACCENTS = {
  volt: {
    text: "text-volt",
    border: "border-volt/25",
    bg: "bg-volt/10",
    hover: "hover:bg-volt/10 hover:text-volt",
  },
  spark: {
    text: "text-spark",
    border: "border-spark/25",
    bg: "bg-spark/10",
    hover: "hover:bg-spark/10 hover:text-spark",
  },
  primary: {
    text: "text-primary",
    border: "border-primary/25",
    bg: "bg-primary/10",
    hover: "hover:bg-primary/10 hover:text-primary",
  },
  success: {
    text: "text-success",
    border: "border-success/25",
    bg: "bg-success/10",
    hover: "hover:bg-success/10 hover:text-success",
  },
};

const HOW_TO_USE = [
  {
    step: "01",
    text: "Paste the context primer once per chat. Every prompt below assumes your agent already knows your deadline, stack, and judging criteria.",
  },
  {
    step: "02",
    text: "Fill every bracket before you send. A prompt with [HOURS] still in it gets you generic advice.",
  },
  {
    step: "03",
    text: "Answer the agent's questions instead of re-pasting. These prompts are written to make it stop and ask when a decision is yours.",
  },
];

export default function CheatSheetPage() {
  return (
    <div className="relative min-h-screen">
      <div className="noise pointer-events-none fixed inset-0 z-50" />

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-6 md:py-16">
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
            for the agent you are already building with. No theory, no reading.
            Find the moment you are in, copy the prompt, fill the brackets, get
            back to work.
          </p>
          <LastUpdated date={CHEAT_SHEET_UPDATED} />
        </header>

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
              <div key={rule.step} className="space-y-1.5">
                <span className="font-code text-xs text-muted-foreground/60">
                  {rule.step}
                </span>
                <p className="font-body text-sm text-foreground/85">{rule.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            JUMP NAV — sticky, so the section list follows you down
            ============================================================ */}
        <nav
          aria-label="Cheat sheet sections"
          className="glass sticky top-4 z-40 rounded-xl border border-primary/15 p-2"
        >
          <ul className="flex gap-1.5 overflow-x-auto">
            {CHEAT_SECTIONS.map((section) => {
              const a = ACCENTS[section.accent];
              return (
                <li key={section.slug}>
                  <a
                    href={`#${section.slug}`}
                    className={`block whitespace-nowrap rounded-lg px-3 py-1.5 font-code text-xs text-muted-foreground transition-colors ${a.hover}`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ============================================================
            SECTIONS
            ============================================================ */}
        {CHEAT_SECTIONS.map((section) => {
          const a = ACCENTS[section.accent];
          const Icon = section.icon;
          return (
            <section
              key={section.slug}
              id={section.slug}
              className="scroll-mt-24 space-y-5"
            >
              <div className="space-y-3 border-t border-border pt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`flex size-9 items-center justify-center rounded-lg ${a.bg}`}
                  >
                    <Icon className={`size-4 ${a.text}`} />
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {section.title}
                  </h2>
                  <Badge
                    variant="outline"
                    className={`${a.border} ${a.text} font-code text-[10px]`}
                  >
                    {section.timing}
                  </Badge>
                </div>
                <p className="max-w-2xl font-body text-sm text-muted-foreground">
                  {section.subtitle}
                </p>
              </div>

              <div className="space-y-4">
                {section.prompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    accent={section.accent}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* ============================================================
            WHERE THE REASONING LIVES
            ============================================================ */}
        <section className="glass rounded-2xl border border-primary/15 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
            Why any of these prompts say what they say
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-muted-foreground">
            This page is the short version, written for someone with hours left
            on the clock. The reasoning behind it, the research, and the parts
            that are about people rather than code all live in the playbook.
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
              href="/non-coders"
              className="glow-hover inline-flex items-center gap-2 rounded-lg border border-spark/30 bg-spark/10 px-5 py-2.5 font-display text-sm font-semibold text-spark transition-all hover:bg-spark/20"
            >
              First hackathon without code
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

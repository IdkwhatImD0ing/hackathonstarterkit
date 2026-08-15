import type { Metadata } from "next";
import Link from "next/link";
import { Quote, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NON_CODER_SECTIONS } from "@/lib/non-coder-sections";
import { LastUpdated } from "@/components/last-updated";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hackathons for Non-Coders — Win Without Coding Experience",
  description:
    "Non-coders are winning hackathons with AI tools. Proven strategies, installable AI skills, and step-by-step guides for doctors, lawyers, and professionals who build with Cursor and Claude Code.",
  alternates: {
    canonical: `${SITE_URL}/non-coders`,
  },
  openGraph: {
    title: "Hackathons for Non-Coders — Win Without Coding Experience",
    description:
      "Proven strategies and installable AI skills for professionals who build with Cursor and Claude Code. No coding experience required.",
  },
  twitter: {
    title: "Non-Coders Are Winning Hackathons — Here's How",
    description:
      "Doctors, lawyers, and professionals are beating developers at hackathons using AI tools. Learn the strategies.",
  },
};

const accentStyles = {
  volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt" },
  spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark" },
  primary: {
    border: "border-primary/20",
    bg: "bg-primary/10",
    text: "text-primary",
  },
  success: {
    border: "border-success/20",
    bg: "bg-success/10",
    text: "text-success",
  },
};

export default function NonCodersPage() {
  return (
    <div className="space-y-24">
      {/* ============================================================
          HERO
          ============================================================ */}
      <header className="stagger-children space-y-6">
        <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
          FOR NON-CODERS
        </Badge>
        <h1 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
          Your Expertise
          <br />
          <span className="text-primary">Is the Code</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          Proven strategies and installable AI skills for doctors, lawyers, and
          professionals who build with Cursor and Claude Code. Zero programming
          experience required.
        </p>
        <LastUpdated date="2026-04-15" />
        <div className="flex flex-wrap gap-4">
          <div className="rounded-xl border border-volt/15 bg-volt/5 px-4 py-2 text-center">
            <p className="font-display text-2xl font-bold text-volt">4</p>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              Winners Profiled
            </p>
          </div>
          <div className="rounded-xl border border-spark/15 bg-spark/5 px-4 py-2 text-center">
            <p className="font-display text-2xl font-bold text-spark">6</p>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              Installable Skills
            </p>
          </div>
          <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-2 text-center">
            <p className="font-display text-2xl font-bold text-primary">30+</p>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              Sources
            </p>
          </div>
        </div>
      </header>

      {/* ============================================================
          QUOTE
          ============================================================ */}
      <section>
        <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <Quote className="mx-auto size-10 text-spark/40" />
            <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
              &ldquo;There&apos;s always been a tech barrier between domain
              expertise and coding. But now,{" "}
              <span className="animate-shimmer">
                if anyone has enough expertise, they can create advanced
                solutions. Programming is solved.
              </span>
              &rdquo;
            </blockquote>
            <p className="font-body text-sm text-muted-foreground">
              &mdash;{" "}
              <a
                href="https://nypost.com/2026/02/27/business/anthropic-hackathon-proves-vibe-coding-is-here-to-stay/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground"
              >
                Dr. Michal Nedoszytko, cardiologist, 3rd place at Anthropic
                hackathon (New York Post, Feb 2026)
              </a>
            </p>
            <Separator className="mx-auto max-w-xs bg-primary/20" />
            <p className="font-body text-foreground/80">
              <span className="font-display font-semibold text-foreground">
                You don&apos;t need to become a programmer.
              </span>{" "}
              You need to be an expert in the problem. The cardiologist
              didn&apos;t learn JavaScript. The lawyer didn&apos;t study
              computer science. They described what they needed, and AI built it.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION GRID
          ============================================================ */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Choose Your Starting Point
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Each section is self-contained. Start wherever makes sense for you.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="stagger-children grid grid-cols-1 gap-4 md:grid-cols-3">
          {NON_CODER_SECTIONS.map((section, i) => {
            const a = accentStyles[section.accent];
            const isLast = i === NON_CODER_SECTIONS.length - 1;
            const isOdd = NON_CODER_SECTIONS.length % 3 !== 0;
            return (
              <Link
                key={section.slug}
                href={`/non-coders/${section.slug}`}
                className={
                  isLast && isOdd ? "md:col-span-3 lg:col-span-1" : ""
                }
              >
                <Card className="glow-hover group h-full cursor-pointer transition-all hover:border-volt/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </Badge>
                      <section.icon
                        className={`size-5 text-muted-foreground transition-colors group-hover:${a.text}`}
                      />
                    </div>
                    <CardTitle className="font-display text-xl transition-colors group-hover:text-volt">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="font-body">
                      {section.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                      Enter section →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SOURCES
          ============================================================ */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Sources
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            This guide is built on research from 30+ articles, blog posts,
            GitHub repos, and hackathon post-mortems.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            {
              title: "NY Post: Vibe Coding Is Here to Stay",
              url: "https://nypost.com/2026/02/27/business/anthropic-hackathon-proves-vibe-coding-is-here-to-stay/",
            },
            {
              title: "Hadley Lab: The Lawyer Who Won",
              url: "https://hadleylab.org/blogs/2026-03-22-the-lawyer-who-won/",
            },
            {
              title: "TechStory: Cardiologist Builds App in 7 Days",
              url: "https://techstory.in/cardiologist-builds-patient-care-app-in-7-days-places-third-at-anthropic-hackathon/",
            },
            {
              title: "Nina Kolari: Hackathon Takeaways",
              url: "https://ninakolari.com/i-joined-a-3-hour-hackathon-and-build-an-iphone-app-here-are-my-biggest-takeaways/",
            },
            {
              title: "SF Standard: 200+ Hackathon Wins",
              url: "https://sfstandard.com/2025/07/05/rene-turcios-hackathon-labubu-vibe-coding-chatgpt/",
            },
            {
              title: "Cursor Blog: Agent Best Practices",
              url: "https://cursor.com/blog/agent-best-practices",
            },
            {
              title: "AGENTS.md Official Site",
              url: "https://agents.md/",
            },
            {
              title: "Awesome Cursor Rules (38k+ stars)",
              url: "https://github.com/PatrickJS/awesome-cursorrules",
            },
            {
              title: "Vibe Coding Lite: Systematic Approach",
              url: "https://vibecodinglite.dev/quickstart.html",
            },
            {
              title: "Seoul Economic Daily: Builder Era Dawns",
              url: "https://en.sedaily.com/news/2026/02/25/lawyers-doctors-sweep-ai-hackathon-as-builder-era-dawns",
            },
          ].map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-lg border border-border bg-surface p-3 transition-all hover:border-volt/20"
            >
              <ExternalLink className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-volt" />
              <span className="font-body text-sm text-foreground/80 transition-colors group-hover:text-volt">
                {source.title}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

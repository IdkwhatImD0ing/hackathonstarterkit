import type { Metadata } from "next";
import {
  Megaphone,
  Share2,
  Quote,
  ArrowRight,
  Linkedin,
  Github,
  Globe,
  PenLine,
  Sparkles,
  Brain,
  Clock,
  Heart,
  Link,
  MessageSquare,
  Mail,
  CalendarCheck,
  Rocket,
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
import { KeyTakeaway } from "@/components/key-takeaway";
import { Disclosure } from "@/components/disclosure";
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";
import { YOUTUBE_AGENT_PROMPT as SHARED_YOUTUBE_AGENT_PROMPT } from "@/lib/prompts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/copy-button";
import NextLink from "next/link";
import { markdownAlternate, SITE_URL } from "@/lib/site";
import { shareMetadata } from "@/lib/metadata";

const section = PLAYBOOK_SECTIONS[6];

const SHIP_IT_ALL_PROMPT = `Install the Ship It skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ship-it

Use the ship-it skill to create all four of my post-hackathon deliverables in one pass: the portfolio site, the GitHub README, the Devpost submission, and the YouTube demo description. It should install the four sub-skills it needs (portfolio-builder, readme-writer, devpost-writer, youtube-writer), read the repo first, then interview me ONCE for everything all four need (the demo video and its beats, the live URL and Devpost, any awards, the event details, the team, and the challenges and what's next). Then generate the four so they tell one consistent story, pausing after each so I can redirect. Do not invent awards, stats, timestamps, or challenges. Note: the portfolio step uses Anthropic's frontend-design plugin, so if it's not already installed, tell me to run "/plugin marketplace add anthropics/claude-plugins-official" and "/plugin install frontend-design@claude-plugins-official" before that step.`;

const PORTFOLIO_AGENT_PROMPT = `First install Anthropic's frontend-design plugin in Claude Code so the site gets a unique design, not a template:

/plugin marketplace add anthropics/claude-plugins-official
/plugin install frontend-design@claude-plugins-official

Then install the Portfolio Builder skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill portfolio-builder

Use the portfolio-builder skill to build a recruiter-facing portfolio website for this project. Read the repo first, then ask me for the demo video, the live URL and Devpost, any awards, the event details, and the team info. If the project is not a web app (hardware, an ML model, a CLI), showcase it with photos, diagrams, and the demo video. Do not invent awards, stats, or prizes.`;

// Shared with /cheat-sheet, so both offer the identical prompt.
const YOUTUBE_AGENT_PROMPT = SHARED_YOUTUBE_AGENT_PROMPT;

export const metadata: Metadata = {
  title: "Post-Hackathon — Turn Hackathon Projects into Career Opportunities",
  description:
    "Share your hackathon work, follow up with sponsors and contacts, and turn weekend projects into career-changing portfolio pieces, startups, and open-source contributions.",
  alternates: {
    canonical: `${SITE_URL}/playbook/post-hackathon`,
    types: markdownAlternate("/playbook/post-hackathon"),
  },
  ...shareMetadata({
    path: "/playbook/post-hackathon",
    title: "Post-Hackathon: Turn Projects into Career Opportunities",
    description:
      "Follow up with contacts and turn weekend hackathon projects into career-changing portfolio pieces. From the 36-win playbook.",
  }),
};

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="max-w-3xl font-body text-muted-foreground">{subtitle}</p>
      <Separator className="bg-primary/20" />
    </div>
  );
}

export default function PostHackathonPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            MAKE IT PUBLIC
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Make It Public"
            subtitle="Most teams close their laptops after judging and never open the project again. Nobody can hire you off a project they never saw."
          />

          <KeyTakeaway>
            Post your demo and message the people you met within 48 hours.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            You don&apos;t need followers for this. My first internship came
            from one LinkedIn post that one interviewer happened to read.
          </p>

          <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                <Sparkles className="size-5 text-volt" />
              </div>
              <div className="space-y-2">
                <p className="font-display font-semibold">
                  The First Internship Story
                </p>
                <p className="font-body text-sm text-foreground/80">
                  I started doing hackathons to land an internship. At LA Hacks
                  2023 I spent the hackathon learning vector databases for a
                  RAG-style chat app, and we didn&apos;t win. I posted about it
                  on LinkedIn anyway, and the post caught an interviewer&apos;s
                  eye. They were building the exact same thing, so the
                  interview turned into two people geeking out over one
                  problem. A week later I had my first internship offer. That
                  vector database knowledge also landed me a full-time job.
                </p>
                <p className="font-body text-sm text-foreground/80">
                  That was within my first four hackathons. After that I got
                  two expedited interviews, one direct offer, and hundreds of
                  recruiting DMs, because companies had already seen what I
                  built.
                </p>
                {/* [CONFIRM: The old "proof" box also said this came "without job searching after that." Add it back only if it's true.] */}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            LUCK SURFACE AREA — SHARE YOUR WORK
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Luck Surface Area — Share Your Work"
            subtitle="You can't control your luck, but you can give it more chances. Build things, then make sure people know about them."
          />

          <KeyTakeaway>
            Post every project somewhere people in your field will actually
            see it.
          </KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                  <Target className="size-5 text-volt" />
                </div>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  LUCK = DOING x TELLING
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-volt">
                Jason Roberts&apos; Luck Surface Area
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;The amount of serendipity that will occur in your life,
                your Luck Surface Area, is directly proportional to the degree
                to which you do something you&apos;re passionate about combined
                with the total number of people to whom this is effectively
                communicated.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-volt/60">
                — Jason Roberts, serial entrepreneur and TechZing podcast
                co-host, &ldquo;How to Increase Your Luck Surface Area&rdquo;,
                Codus Operandi, 2010 (L = D x T)
              </p>

              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Where to Share
                </p>
                <div className="stagger-children grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { icon: Linkedin, label: "LinkedIn post", accent: "volt" as const },
                    { icon: Globe, label: "Twitter/X thread", accent: "spark" as const },
                    { icon: PenLine, label: "Blog post", accent: "primary" as const },
                    { icon: Megaphone, label: "Devpost portfolio", accent: "success" as const },
                    { icon: Github, label: "GitHub pin", accent: "volt" as const },
                    { icon: Share2, label: "Portfolio site", accent: "spark" as const },
                  ].map((item) => {
                    const colors = {
                      volt: { bg: "bg-volt/10", text: "text-volt", border: "border-volt/20" },
                      spark: { bg: "bg-spark/10", text: "text-spark", border: "border-spark/20" },
                      primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
                      success: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
                    };
                    const c = colors[item.accent];
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2 rounded-lg border ${c.border} ${c.bg} px-3 py-2`}
                      >
                        <item.icon className={`size-3.5 ${c.text}`} />
                        <span className={`font-code text-xs ${c.text}`}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ============================================================
            THE 48-HOUR FOLLOW-UP
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The 48-Hour Follow-Up"
            subtitle="Judges and sponsors meet a lot of teams in one weekend. Message them while they can still picture your demo."
          />

          <KeyTakeaway>
            Message everyone you had a real conversation with within 48 hours.
          </KeyTakeaway>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  WHO
                </Badge>
                <CardTitle className="font-display text-2xl text-volt">
                  Who to Follow Up With
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Anyone you had a real conversation with, not just winners or
                  VIPs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Judges
                      </span>{" "}
                      who asked good questions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Sponsor reps
                      </span>{" "}
                      who liked your tech
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Teammates
                      </span>{" "}
                      you&apos;d hack with again
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Participants
                      </span>{" "}
                      you bonded with over shared struggles
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Desktop connector */}
            <div className="hidden items-center md:flex">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-px bg-gradient-to-b from-volt to-spark" />
                <Mail className="size-6 text-spark" />
                <div className="h-16 w-px bg-gradient-to-b from-spark to-spark/0" />
                <p className="font-code text-xs text-muted-foreground [writing-mode:vertical-lr]">
                  send now
                </p>
              </div>
            </div>

            {/* Mobile connector */}
            <div className="flex items-center justify-center py-2 md:hidden">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-volt to-spark" />
                <Mail className="size-5 text-spark" />
                <p className="font-code text-xs text-muted-foreground">
                  send now
                </p>
              </div>
            </div>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  HOW
                </Badge>
                <CardTitle className="font-display text-2xl text-spark">
                  How to Follow Up
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Short and specific. Skip the generic &ldquo;let&apos;s stay in
                  touch.&rdquo;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Personalize:
                      </span>{" "}
                      reference the exact conversation you had
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Add value:
                      </span>{" "}
                      send the project link, demo, or a useful resource
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        One clear ask:
                      </span>{" "}
                      coffee chat, feedback, or collaboration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Keep it short:
                      </span>{" "}
                      3-5 sentences max
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Link className="size-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-display text-sm font-semibold">
                  Mark Granovetter, Sociologist — Strength of Weak Ties
                </p>
                <p className="font-body text-sm text-foreground/70">
                  Granovetter found that casual contacts, people you don&apos;t
                  see every day, beat close friends for finding jobs, because
                  they connect you to circles outside your own. Judges,
                  sponsors, and the team at the next table are casual contacts.
                </p>
                <p className="font-code text-xs text-muted-foreground">
                  — Mark Granovetter, &ldquo;The Strength of Weak Ties&rdquo;,
                  American Journal of Sociology 78(6), 1973; built on his
                  Harvard doctoral research and published while he was at
                  Johns Hopkins
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TURN IT INTO A LONG-TERM PROJECT
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Turn It Into a Long-Term Project"
            subtitle="You leave every hackathon with a working prototype. Keep building on it instead of starting your next side project from nothing."
          />

          <KeyTakeaway>
            Win or lose, if the project has legs, keep building it instead of
            starting over.
          </KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Sparkles className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    IF YOU WON
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  You Have a Proven Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    A win means judges already believed in it.
                  </span>{" "}
                  You also have a working prototype. Spend the next 6 months
                  making it good, then put it at the top of your resume.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Dispatch AI started as our UC Berkeley AI Hackathon 2024
                    project and won the Grand Prize. We kept building it, and
                    it&apos;s now a company I co-founded.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <TrendingUp className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    IF YOU DIDN&apos;T WIN
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  You Still Have a Prototype
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Losing doesn&apos;t make it a bad project.
                  </span>{" "}
                  At CruzHacks 2023 I built SlugLoop, a real-time tracking app
                  for the buses at Santa Cruz, and lost to a calculator app.
                  Very annoying, but I didn&apos;t let that discourage me.
                  SlugLoop went on to place Top 10 Global in Google&apos;s
                  Developer Student Challenge, the only US team in three years.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    LA Hacks 2023 was a loss too, and it&apos;s the hackathon
                    that got me my first internship.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            THE POST-HACKATHON TIMELINE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Post-Hackathon Playbook"
            subtitle="Do the first three steps for every project. Do the fourth only for the ones with legs."
          />

          <KeyTakeaway>
            Follow up on day 1, post by day 3, clean up and open-source in week
            1, and keep building only if the project has legs.
          </KeyTakeaway>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Day 1 — Within 24 Hours",
                description:
                  "Message the judges, sponsors, and people you talked to. Pin the GitHub repo. If you placed, update your LinkedIn headline.",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Day 2-3 — Share Publicly",
                description:
                  "Post on LinkedIn with the demo video and tag your teammates, the sponsors, and the organizers. Write about what you built and learned, and what you'd do next.",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Week 1 — Clean and Open-Source",
                description:
                  "Polish the README with badges, screenshots, and install steps, then add the project to your portfolio. Before you make the repo public, delete API keys and .env files from it. If a key was ever committed, rotate it, because it's still in the git history.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Month 1-6 — Keep Building",
                description:
                  "If the project has legs, set a monthly milestone and treat it like a real product: add features and find real users.",
                accent: "success" as const,
              },
            ].map((item) => {
              const colors = {
                volt: {
                  bg: "bg-volt/10",
                  text: "text-volt",
                  border: "border-volt/20",
                },
                spark: {
                  bg: "bg-spark/10",
                  text: "text-spark",
                  border: "border-spark/20",
                },
                primary: {
                  bg: "bg-primary/10",
                  text: "text-primary",
                  border: "border-primary/20",
                },
                success: {
                  bg: "bg-success/10",
                  text: "text-success",
                  border: "border-success/20",
                },
              };
              const c = colors[item.accent];
              return (
                <div
                  key={item.step}
                  className={`rounded-xl border ${c.border} bg-card p-5 transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${c.bg} font-display text-lg font-bold ${c.text}`}
                    >
                      {item.step}
                    </span>
                    <div className="space-y-2">
                      <p
                        className={`font-display text-lg font-semibold ${c.text}`}
                      >
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-foreground/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            THE SHIP-IT TOOLKIT — AGENT SHORTCUTS
            ============================================================ */}
        <section id="the-ship-it-toolkit" className="space-y-8 scroll-mt-20">
          <SectionHeading
            title="The Ship-It Toolkit"
            subtitle="Run all four deliverables with one prompt, or grab a single skill. The portfolio site and YouTube description live here; the GitHub README and Devpost skills moved to the submission page."
          />

          <KeyTakeaway>
            One prompt writes all four deliverables with the same story in
            each: the portfolio site, README, Devpost, and YouTube description.
          </KeyTakeaway>

          {/* 0 — Do all four at once */}
          <Card className="glow-hover border-primary/30 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="size-5 text-primary" />
                </div>
                <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                  SHIP IT SKILL — RUN ALL FOUR
                </Badge>
              </div>
              <CardTitle className="font-display text-xl text-primary">
                Do All Four at Once
              </CardTitle>
              <CardDescription className="font-body text-base">
                One skill that runs the other four. It interviews you once, then
                generates the portfolio site, README, Devpost, and YouTube
                description in order, so they share one tagline and one set of
                stats. Best if you want everything done in one sitting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="float-right ml-3 mb-2">
                  <CopyButton text={SHIP_IT_ALL_PROMPT} />
                </div>
                <pre className="whitespace-pre-wrap break-words font-code text-xs leading-relaxed text-foreground/80">{SHIP_IT_ALL_PROMPT}</pre>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Separator className="flex-1 bg-border" />
            <span className="font-code text-xs uppercase tracking-widest text-muted-foreground">
              Or run them one at a time
            </span>
            <Separator className="flex-1 bg-border" />
          </div>

          <div className="space-y-5">
            {/* 1 — Portfolio */}
            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    PORTFOLIO BUILDER SKILL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  1. Build Your Portfolio Site
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Installs Anthropic&apos;s frontend-design skill so the site
                  doesn&apos;t look like a template, then builds a one-page case
                  study: hero, problem, architecture, demo, results, team, and
                  honest limits. It works for non-web projects too, and it
                  won&apos;t invent awards or stats.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="float-right ml-3 mb-2">
                    <CopyButton text={PORTFOLIO_AGENT_PROMPT} />
                  </div>
                  <pre className="whitespace-pre-wrap break-words font-code text-xs leading-relaxed text-foreground/80">{PORTFOLIO_AGENT_PROMPT}</pre>
                </div>
              </CardContent>
            </Card>

            {/* 2 — YouTube */}
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <PenLine className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    YOUTUBE WRITER SKILL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  2. Write Your YouTube Description
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Writes the demo video&apos;s title, description, tags, and
                  chapter timestamps so recruiters can find it. It reads your
                  repo, asks for the video&apos;s beats, and never fakes a
                  timestamp or award.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-volt/20 bg-volt/5 p-4">
                  <div className="float-right ml-3 mb-2">
                    <CopyButton text={YOUTUBE_AGENT_PROMPT} />
                  </div>
                  <pre className="whitespace-pre-wrap break-words font-code text-xs leading-relaxed text-foreground/80">{YOUTUBE_AGENT_PROMPT}</pre>
                </div>
              </CardContent>
            </Card>

            <NextLink href="/playbook/submission#generate-it-with-a-skill" className="group block">
              <Card className="glow-hover border-success/20">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div className="space-y-1">
                    <p className="font-display font-semibold">Need your GitHub README or Devpost?</p>
                    <p className="font-body text-sm text-muted-foreground">Those two skills moved to the submission playbook page, next to the README and Devpost how-tos.</p>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-success transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </NextLink>
          </div>
        </section>

        {/* ============================================================
            GOLDEN RULE — KLEON QUOTE
            ============================================================ */}
        <section className="space-y-8">
          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;It&apos;s not enough to be good.
                <br />
                <span className="animate-shimmer">
                  In order to be found, you have to be findable.
                </span>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                — Austin Kleon, author of Show Your Work! (2014)
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <p className="font-body text-foreground/80">
                You can&apos;t tell ahead of time which post or follow-up will
                matter, so do all of them.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            POST-HACKATHON CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Post-Hackathon Checklist"
            subtitle="The same steps as the timeline, as a list to check off."
          />

          <KeyTakeaway>
            Everything but the last item fits in the week after the event.
          </KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Follow up: personal messages to judges, sponsors, and contacts within 48 hours",
                  accent: "volt",
                },
                {
                  text: "Post on LinkedIn with the demo video, and tag your teammates, the sponsors, and the organizers",
                  accent: "spark",
                },
                {
                  text: "Pin the GitHub repo to your profile and clean up the README",
                  accent: "primary",
                },
                {
                  text: "Delete API keys and .env files from the repo, rotate any key that was ever committed, then open-source it",
                  accent: "success",
                },
                {
                  text: "If it has legs, set a monthly milestone and keep building",
                  accent: "volt",
                },
              ].map((item) => {
                const colorMap: Record<string, string> = {
                  volt: "text-volt",
                  spark: "text-spark",
                  primary: "text-primary",
                  success: "text-success",
                };
                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:border-volt/20"
                  >
                    <CheckCircle2
                      className={`mt-0.5 size-5 shrink-0 ${colorMap[item.accent]}`}
                    />
                    <p className="font-body text-sm text-foreground/80">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE BACKGROUND (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <Disclosure
            title="Why This Works: The Background"
            subtitle="Optional reading: the writers and founders behind the advice on this page."
            badge="Optional: the background"
            accent="primary"
          >
            <KeyTakeaway>
              Optional. The steps above work without reading any of this.
            </KeyTakeaway>

            <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
              <Card className="glow-hover border-volt/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                      <PenLine className="size-5 text-volt" />
                    </div>
                    <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                      AUSTIN KLEON
                    </Badge>
                  </div>
                  <CardTitle className="font-display text-xl text-volt">
                    Show Your Work
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                    &ldquo;It sounds a little extreme, but in this day and age,
                    if your work isn&apos;t online, it doesn&apos;t
                    exist.&rdquo;
                  </blockquote>
                  <p className="font-body text-sm text-foreground/60">
                    Kleon builds on a line from Clay Shirky, who teaches at NYU:
                    &ldquo;The real gap is between doing nothing and doing
                    something.&rdquo; You don&apos;t need a finished
                    masterpiece to post. Share what you made and what you
                    learned.
                  </p>
                  <p className="font-code text-xs text-volt/60">
                    — Austin Kleon, author, Show Your Work!, 2014; Shirky line
                    from Cognitive Surplus, 2010
                  </p>
                </CardContent>
              </Card>

              <Card className="glow-hover border-spark/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                      <Rocket className="size-5 text-spark" />
                    </div>
                    <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                      STEVE JOBS
                    </Badge>
                  </div>
                  <CardTitle className="font-display text-xl text-spark">
                    Real Artists Ship
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                    &ldquo;Real artists ship.&rdquo;
                  </blockquote>
                  <p className="font-code text-xs text-spark/60">
                    — Steve Jobs, Apple co-founder, Macintosh team retreat,
                    January 1983, as recounted by Andy Hertzfeld on
                    folklore.org; later popularized by Seth Godin
                  </p>
                </CardContent>
              </Card>

              <Card className="glow-hover border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="size-5 text-primary" />
                    </div>
                    <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                      PATRICK MCKENZIE
                    </Badge>
                  </div>
                  <CardTitle className="font-display text-xl text-primary">
                    Bingo Card Creator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-body text-sm text-foreground/80">
                    McKenzie built Bingo Card Creator on nights and weekends
                    and ran it alongside a day job until he went full-time on
                    his software business in 2010. A hackathon project can be
                    that kind of side project.
                  </p>
                  <p className="font-code text-xs text-primary/60">
                    — Patrick McKenzie (patio11), software entrepreneur and
                    writer; story documented on kalzumeus.com
                  </p>
                </CardContent>
              </Card>

              <Card className="glow-hover border-success/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                      <Heart className="size-5 text-success" />
                    </div>
                    <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                      JEFF BEZOS
                    </Badge>
                  </div>
                  <CardTitle className="font-display text-xl text-success">
                    Regret Minimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <blockquote className="border-l-2 border-success/30 pl-4 font-body text-sm italic text-foreground/80">
                    &ldquo;I knew that if I failed I wouldn&apos;t regret that,
                    but I knew the one thing I might regret is not ever having
                    tried.&rdquo;
                  </blockquote>
                  <p className="font-code text-xs text-success/60">
                    — Jeff Bezos, founder of Amazon, Academy of Achievement
                    interview, 2001
                  </p>
                </CardContent>
              </Card>
            </div>
          </Disclosure>
        </section>
      </div>
    </SectionTemplate>
  );
}

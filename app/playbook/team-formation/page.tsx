import type { Metadata } from "next";
import Link from "next/link";
import {
  Palette,
  Mic,
  Code,
  Crosshair,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Trophy,
  MessageCircle,
  Users,
  Building2,
  Globe,
  Calendar,
  Share2,
  Quote,
  Beaker,
  Compass,
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
import { PersonaQuiz } from "@/components/persona-quiz";
import { KeyTakeaway } from "@/components/key-takeaway";
import { SeriousModeGate } from "@/components/serious-mode";
import { Disclosure } from "@/components/disclosure";
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { markdownAlternate, SITE_URL } from "@/lib/site";

const section = PLAYBOOK_SECTIONS[0];

export const metadata: Metadata = {
  title: "Hackathon Team Formation — How to Build a Winning Hackathon Team",
  description:
    "Learn how to form the perfect hackathon team. Find the right people, define roles, balance skills, and create a team dynamic that wins prizes. Proven strategies from 36+ hackathon victories.",
  alternates: {
    canonical: `${SITE_URL}/playbook/team-formation`,
    types: markdownAlternate("/playbook/team-formation"),
  },
  openGraph: {
    title: "How to Build a Winning Hackathon Team",
    description:
      "Find the right people, define roles, and create a winning hackathon team dynamic. From the 36-win playbook.",
  },
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

export default function TeamFormationPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            PERSONA QUIZ
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Find Your Persona"
            subtitle="Eight questions to find the role you fall into by default."
          />
          <KeyTakeaway>
            Know your default role so you can recruit teammates who cover the
            other three.
          </KeyTakeaway>
          <PersonaQuiz />
        </section>

        {/* ============================================================
            THE FOUR PERSONAS
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Four Personas"
            subtitle="A hackathon team has four jobs. One person can take more than one, so you don't need a big team."
          />

          <KeyTakeaway>
            Before you commit to a team, put a name next to each role. If one
            is blank, recruit for it or make it someone&apos;s second job.
          </KeyTakeaway>

          {/* [NEEDS SPECIFIC: a team of yours that was missing one of these roles, and what it cost you. Which hackathon?] */}

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* The Designer */}
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Palette className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    THE DESIGNER
                  </Badge>
                </div>
                <CardTitle className="font-display text-2xl text-volt">
                  The Designer
                </CardTitle>
                <CardDescription className="font-body text-base">
                  <span className="font-semibold text-foreground">
                    Makes the project look finished
                  </span>{" "}
                  before you say a word. A polished UI stands out next to
                  terminal demos, and it makes your 4AM code look intentional.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Strengths
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Carries online judging
                        </span>
                        , where your screenshots are the project
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Simplifies
                        </span>{" "}
                        complex features so they&apos;re easy to follow
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Polishing past the point where &quot;good enough&quot;
                    would ship.
                  </p>
                </div>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Spot them: they open Figma before VS Code.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* The Pitcher */}
            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Mic className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    THE PITCHER
                  </Badge>
                </div>
                <CardTitle className="font-display text-2xl text-spark">
                  The Pitcher
                </CardTitle>
                <CardDescription className="font-body text-base">
                  <span className="font-semibold text-foreground">
                    Explains why the project matters.
                  </span>{" "}
                  They decide when to lead with the problem, when to show the
                  demo, and how to answer &quot;so what?&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="font-body text-sm text-foreground/80">
                  On Dispatch AI, my teammate Spike O&apos;Carroll delivered
                  our whole 4:34 pitch video. It opens on understaffed 911 call
                  centers and saves the live call to our AI dispatcher for the
                  last 77 seconds.{" "}
                  <Link
                    href="/playbook/pitching"
                    className="underline decoration-spark/30 hover:decoration-spark"
                  >
                    See the breakdown
                  </Link>
                  .
                </p>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Strengths
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Fits the story
                        </span>{" "}
                        into whatever slot the event gives, sometimes 90
                        seconds before questions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Takes
                        </span>{" "}
                        the hard judge questions in Q&amp;A. When I judged LA
                        Hacks, each team had five minutes, and 3.5 of them were
                        questions.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Promising features you haven&apos;t built, or prepping the
                    pitch instead of helping build.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* The Architect */}
            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Code className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    THE ARCHITECT
                  </Badge>
                </div>
                <CardTitle className="font-display text-2xl text-primary">
                  The Architect
                </CardTitle>
                <CardDescription className="font-body text-base">
                  <span className="font-semibold text-foreground">
                    Asks &quot;how will this integrate?&quot; before &quot;how
                    will this look?&quot;
                  </span>{" "}
                  While others go deep on features, the Architect wires the API
                  to the frontend and the model to the UI.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Strengths
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Prevents
                        </span>{" "}
                        integration failure. If the frontend and backend never
                        connect, there&apos;s no demo.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Cuts scope
                        </span>{" "}
                        so the project fits the time you have
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Building for scale when you need to build for demo.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* The Strategist */}
            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Crosshair className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    THE STRATEGIST
                  </Badge>
                </div>
                <CardTitle className="font-display text-2xl text-success">
                  The Strategist
                </CardTitle>
                <CardDescription className="font-body text-base">
                  <span className="font-semibold text-foreground">
                    Says &quot;no&quot; to feature creep at 3AM.
                  </span>{" "}
                  When someone wants to add something, they&apos;re the one
                  asking &quot;What gets cut if we add this?&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Strengths
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Runs short check-ins
                        </span>{" "}
                        and time-boxes debates, so everyone stays on one plan
                        and timeline
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Owns
                        </span>{" "}
                        logistics and the submission so the builders can keep
                        building
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Over-planning and rigidity. Too much process slows a
                    48-hour sprint.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                <Beaker className="size-5 text-volt" />
              </div>
              <div className="space-y-2">
                <p className="font-display font-semibold">
                  <a href="https://www.belbin.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Meredith Belbin</a> — management researcher, Henley Management College
                </p>
                <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Nobody is perfect, but a team can be.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Belbin identified eight team roles at Henley and found that
                  teams covering different roles beat equally talented teams
                  with overlapping strengths. The personas map loosely onto
                  his roles: the Pitcher to his{" "}
                  <span className="font-semibold text-foreground">
                    Resource Investigator
                  </span>
                  , the Architect to the{" "}
                  <span className="font-semibold text-foreground">
                    Monitor Evaluator
                  </span>
                  , and the Strategist to the{" "}
                  <span className="font-semibold text-foreground">
                    Co-ordinator
                  </span>
                  . The Designer fits least, since his{" "}
                  <span className="font-semibold text-foreground">Plant</span>{" "}
                  is an idea generator rather than a visual designer.
                </p>
                <p className="font-code text-xs text-volt/60">
                  — Belbin&apos;s often-quoted maxim; team roles from{" "}
                  <a href="https://www.belbin.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Management Teams: Why They Succeed or Fail, 1981</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHERE TO FIND TEAMMATES
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Where to Find Teammates"
            subtitle="Six places to look. Use more than one."
          />

          <KeyTakeaway>
            Hack with someone once at a low-stakes event before you team up
            for one you want to win.
          </KeyTakeaway>

          {/* [NEEDS SPECIFIC: where did you find your own teammates, and which of these channels actually worked for you?] */}

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Hackathon Discords",
                description:
                  "Join the event's team-matching channel early. Post which role you cover and which ones you need.",
                accent: "volt" as const,
              },
              {
                icon: Users,
                title: "Hackathon Communities",
                description:
                  "WeCracked (4K+ members), MLH groups, and local clubs. I co-founded WeCracked, so I'm biased.",
                accent: "spark" as const,
              },
              {
                icon: Building2,
                title: "University Clubs",
                description:
                  "CS clubs, ACM chapters, and hackathon orgs, where people already build things outside class.",
                accent: "primary" as const,
              },
              {
                icon: Globe,
                title: "Devpost Scouting",
                description:
                  "Browse past winners and message the people whose projects impressed you.",
                accent: "volt" as const,
              },
              {
                icon: Calendar,
                title: "Fun Hackathons",
                description:
                  "Build something with someone once and you'll see how they handle a deadline.",
                accent: "success" as const,
              },
              {
                icon: Share2,
                title: "Social Media",
                description:
                  "LinkedIn groups, Twitter/X tech communities, and hackathon subreddits.",
                accent: "spark" as const,
              },
            ].map((item) => {
              const accentMap = {
                volt: {
                  bg: "bg-volt/10",
                  text: "text-volt",
                  border: "border-volt/20",
                  dot: "bg-volt",
                },
                spark: {
                  bg: "bg-spark/10",
                  text: "text-spark",
                  border: "border-spark/20",
                  dot: "bg-spark",
                },
                primary: {
                  bg: "bg-primary/10",
                  text: "text-primary",
                  border: "border-primary/20",
                  dot: "bg-primary",
                },
                success: {
                  bg: "bg-success/10",
                  text: "text-success",
                  border: "border-success/20",
                  dot: "bg-success",
                },
              };
              const a = accentMap[item.accent];
              return (
                <div
                  key={item.title}
                  className={`glow-hover rounded-xl border ${a.border} bg-card p-5 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.bg}`}
                    >
                      <item.icon className={`size-4 ${a.text}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
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
            THE GOLDEN RULE
            ============================================================ */}
        <section className="space-y-8">
          <KeyTakeaway>
            Pick attitude over raw skill. In 24-48 hours, a brilliant teammate
            who causes friction costs more than they add.
          </KeyTakeaway>

          {/* [NEEDS SPECIFIC: a hackathon where a teammate's attitude, good or bad, decided how the weekend went.] */}

          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;Hire character.
                <br />
                <span className="animate-shimmer">Train skill.</span>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                —{" "}
                <a href="https://en.wikipedia.org/wiki/Peter_Schutz" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Peter Schutz, CEO of Porsche AG from 1981 to 1987</a>,
                his often-quoted hiring maxim
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Look for teammates who
                </p>
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Speak up
                      </span>{" "}
                      when stuck instead of going silent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Pivot
                      </span>{" "}
                      when the plan isn&apos;t working
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Back the team
                      </span>{" "}
                      decision even if it wasn&apos;t their first choice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Stay calm
                      </span>{" "}
                      when the build breaks late at night
                    </span>
                  </li>
                </ul>

                <Separator className="bg-primary/20" />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                      <Beaker className="size-4 text-volt" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-sm font-semibold">
                        Google Project Aristotle
                      </p>
                      <p className="font-body text-sm text-foreground/60">
                        Across 180+ teams over two years, Google found that how
                        members interacted mattered more than who was on the
                        team.{" "}
                        <span className="font-semibold text-foreground">
                          Psychological safety was the #1 predictor of
                          performance
                        </span>
                        , ahead of dependability, structure, meaning, and
                        impact. It means people can admit a mistake or ask a
                        question without being embarrassed or punished.
                      </p>
                      <p className="font-code text-xs text-volt/60">
                        —{" "}
                        <a href="https://rework.withgoogle.com/guides/understanding-team-effectiveness/" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Google re:Work, 2015</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            GOING PRO: RANKING SYSTEM + CATEGORIES (gated, collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <SeriousModeGate>
            {/* THE RANKING SYSTEM */}
            {/* [CONFIRM: this subtitle used to say "The method behind $100K+ in prizes." Did you use the JV/varsity system for those wins? If so, say it here in first person.] */}
            <Disclosure
              title="The Ranking System"
              subtitle="A sports-style system for building your squad over several hackathons."
              badge="For serious competitors"
              accent="spark"
            >
              <KeyTakeaway>
                Train newer teammates on a JV list, then bring only proven
                varsity teammates to the events you most want to win.
              </KeyTakeaway>

              {/* [NEEDS SPECIFIC: someone on your own squad who went from JV to varsity, and roughly how many hackathons it took. No names needed.] */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
                {/* JV Card */}
                <Card className="glow-hover border-volt/20">
                  <CardHeader>
                    <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                      TIER 1
                    </Badge>
                    <CardTitle className="font-display text-2xl text-volt">
                      JV Teammates
                    </CardTitle>
                    <CardDescription className="font-body text-base">
                      <span className="font-semibold text-foreground">
                        Your development squad.
                      </span>{" "}
                      People you&apos;re still training and learning to work
                      with.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 font-body text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Proven attitude
                          </span>{" "}
                          and work ethic
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Still developing
                          </span>{" "}
                          time management, prototyping, and pitching
                        </span>
                      </li>
                    </ul>
                    <div className="rounded-lg bg-volt/5 p-3 text-center">
                      <p className="font-display text-2xl font-bold text-volt">
                        1-3
                      </p>
                      <p className="font-code text-xs text-volt/70">
                        hackathons to join
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Progression Arrow */}
                <div className="hidden items-center md:flex">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-16 w-px bg-gradient-to-b from-volt to-spark" />
                    <ArrowRight className="size-6 text-spark" />
                    <div className="h-16 w-px bg-gradient-to-b from-spark to-spark/0" />
                    <p className="font-code text-xs text-muted-foreground [writing-mode:vertical-lr]">
                      2-8 hackathons
                    </p>
                  </div>
                </div>

                {/* Mobile arrow */}
                <div className="flex items-center justify-center py-2 md:hidden">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-volt to-spark" />
                    <ArrowRight className="size-5 text-spark" />
                    <p className="font-code text-xs text-muted-foreground">
                      2-8 hackathons
                    </p>
                  </div>
                </div>

                {/* Varsity Card */}
                <Card className="glow-hover border-spark/20">
                  <CardHeader>
                    <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                      TIER 2
                    </Badge>
                    <CardTitle className="font-display text-2xl text-spark">
                      Varsity Teammates
                    </CardTitle>
                    <CardDescription className="font-body text-base">
                      <span className="font-semibold text-foreground">
                        Your championship squad.
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 font-body text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Deep trust
                          </span>
                          , and shortcuts for communication and code review
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Self-directed
                          </span>
                          : each person owns their role, no micromanagement
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Shared toolkit
                          </span>
                          : templates, favorite APIs, deployment pipeline
                        </span>
                      </li>
                    </ul>
                    <div className="rounded-lg bg-spark/5 p-3 text-center">
                      <p className="font-display text-2xl font-bold text-spark">
                        3-8+
                      </p>
                      <p className="font-code text-xs text-spark/70">
                        hackathons to earn varsity
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="font-body text-sm text-muted-foreground">
                  <span className="font-display font-semibold text-foreground">
                    What earns a varsity spot is how well you work together
                    under time pressure.
                  </span>{" "}
                  A varsity teammate may be a worse coder than a JV one.
                  Psychologist Bruce Tuckman described four stages a group
                  goes through before it works at full strength: forming,
                  storming, norming, and performing. With a new JV teammate
                  you&apos;re in the first two. You&apos;re still learning how
                  each of you works and how you&apos;ll communicate, so expect
                  disagreements about scope and stack. Better to work through
                  those at a training hackathon than at one you want to win.
                </p>
                <p className="mt-2 font-code text-xs text-muted-foreground/60">
                  — Bruce Tuckman, psychologist, U.S. Naval Medical Research
                  Institute,{" "}
                  <a href="https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Developmental Sequence in Small Groups, Psychological Bulletin, 1965</a>
                </p>
              </div>
            </Disclosure>

            {/* HACKATHON CATEGORIES */}
            <Disclosure
              title="Hackathon Categories"
              subtitle="Three tiers of events, each with a different team."
              badge="For serious competitors"
              accent="primary"
            >
              <KeyTakeaway>
                Use fun events to scout, training events to build your JV, and
                competitive events for varsity-only wins.
              </KeyTakeaway>

              <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
                {/* Fun Hackathons */}
                <Card className="glow-hover border-success/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                        <Sparkles className="size-5 text-success" />
                      </div>
                      <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                        FUN
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-xl text-success">
                      Fun Hackathons
                    </CardTitle>
                    <CardDescription className="font-body">
                      <span className="font-semibold text-foreground">
                        Low stakes.
                      </span>{" "}
                      You&apos;re there to scout more than to win.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="size-3.5 text-success/60" />
                        <span className="font-code text-xs text-muted-foreground">
                          TEAM WITH
                        </span>
                      </div>
                      <p className="font-body text-sm text-foreground/80">
                        People you meet or match with at the event, and friends
                        trying hackathons
                      </p>
                    </div>
                    <div className="rounded-lg bg-success/5 p-3 text-center">
                      <p className="font-display text-lg font-bold text-success">
                        1 event
                      </p>
                      <p className="font-code text-xs text-success/70">
                        to earn JV consideration
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Training Hackathons */}
                <Card className="glow-hover border-volt/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                        <GraduationCap className="size-5 text-volt" />
                      </div>
                      <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                        TRAINING
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-xl text-volt">
                      Training Hackathons
                    </CardTitle>
                    <CardDescription className="font-body">
                      <span className="font-semibold text-foreground">
                        Practice runs.
                      </span>{" "}
                      Go through the full workflow together: ideation,
                      architecture, execution, pitching.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="size-3.5 text-volt/60" />
                        <span className="font-code text-xs text-muted-foreground">
                          TEAM WITH
                        </span>
                      </div>
                      <p className="font-body text-sm text-foreground/80">
                        JV teammates only
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Pro Tip
                      </p>
                      <p className="font-body text-sm text-foreground/80">
                        Run it like a competitive event. Set internal
                        deadlines and rehearse the full pitch before you
                        submit.
                      </p>
                    </div>
                    <div className="rounded-lg bg-volt/5 p-3 text-center">
                      <p className="font-display text-lg font-bold text-volt">
                        2-8+ events
                      </p>
                      <p className="font-code text-xs text-volt/70">
                        to train a team to varsity
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Competitive Hackathons */}
                <Card className="glow-hover border-spark/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                        <Trophy className="size-5 text-spark" />
                      </div>
                      <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                        COMPETITIVE
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-xl text-spark">
                      Competitive Hackathons
                    </CardTitle>
                    <CardDescription className="font-body">
                      <span className="font-semibold text-foreground">
                        The events you most want to win.
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="size-3.5 text-spark/60" />
                        <span className="font-code text-xs text-muted-foreground">
                          TEAM WITH
                        </span>
                      </div>
                      <p className="font-body text-sm text-foreground/80">
                        Varsity only
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Pro Tip
                      </p>
                      <p className="font-body text-sm text-foreground/80">
                        Pre-plan the stack, ready your boilerplates, and assign
                        roles before kickoff, so you make fewer decisions during
                        the event.
                      </p>
                    </div>
                    <div className="rounded-lg bg-spark/5 p-3 text-center">
                      <p className="animate-shimmer font-display text-lg font-bold">
                        Win mode
                      </p>
                      <p className="font-code text-xs text-spark/70">
                        going for first place
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="animate-glow-pulse glass rounded-xl border border-primary/10 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Compass className="size-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-display font-semibold">
                      <a href="https://en.wikipedia.org/wiki/J._Richard_Hackman" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">J. Richard Hackman</a> — Leading Teams
                    </p>
                    <p className="border-l-2 border-primary/30 pl-4 font-body text-sm text-foreground/80">
                      Hackman&apos;s Harvard research names a compelling
                      direction, a purpose that is clear, challenging, and
                      consequential, as one of five conditions for team
                      effectiveness.
                    </p>
                    <p className="font-body text-sm text-foreground/60">
                      For your team, that means agreeing before each event on
                      whether you&apos;re there to{" "}
                      <span className="font-semibold text-foreground">
                        train
                      </span>{" "}
                      or to{" "}
                      <span className="font-semibold text-foreground">
                        win
                      </span>
                      .
                    </p>
                    <p className="font-code text-xs text-primary/60">
                      —{" "}
                      <a href="https://en.wikipedia.org/wiki/J._Richard_Hackman" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Leading Teams: Setting the Stage for Great Performances,
                      2002</a>
                    </p>
                  </div>
                </div>
              </div>
            </Disclosure>
          </SeriousModeGate>
        </section>
      </div>
    </SectionTemplate>
  );
}

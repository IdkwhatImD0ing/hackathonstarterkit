import type { Metadata } from "next";
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
  BookOpen,
  Brain,
  Compass,
  FlaskConical,
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
import { SITE_URL } from "@/lib/site";

const section = PLAYBOOK_SECTIONS[0];

export const metadata: Metadata = {
  title: "Hackathon Team Formation — How to Build a Winning Hackathon Team",
  description:
    "Learn how to form the perfect hackathon team. Find the right people, define roles, balance skills, and create a team dynamic that wins prizes. Proven strategies from 36+ hackathon victories.",
  alternates: {
    canonical: `${SITE_URL}/playbook/team-formation`,
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
            subtitle="Which role do you gravitate toward? Take the 8-question quiz."
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
            subtitle="Every winning team needs four roles. You don't need a big team, just the right mix. One person can cover several roles."
          />

          <KeyTakeaway>
            Cover four roles (Designer, Pitcher, Architect, Strategist), not four
            headcount. Composition beats size.
          </KeyTakeaway>

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
                    A polished UI signals quality instantly
                  </span>{" "}
                  in a sea of terminal demos. The Designer makes your 4AM code
                  look intentional. First impressions decide hackathons.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Traits
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "High Openness",
                      "Empathetic",
                      "Detail-Obsessed",
                      "Visual Thinker",
                      "Creative Problem Solver",
                    ].map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-volt/30 text-volt font-code text-xs"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Strengths
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Buys credibility
                        </span>{" "}
                        before you say a word; judges form opinions in seconds
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Owns online judging
                        </span>
                        : your project IS your screenshots
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Simplifies
                        </span>{" "}
                        complex features into something approachable
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Over-polishing under pressure when &quot;good enough&quot;
                    ships.
                  </p>
                </div>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Like a cinematographer: they define how the world sees the
                    project. Spot them: they open Figma before VS Code.
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
                    Can&apos;t explain it in 60 seconds? You lose.
                  </span>{" "}
                  The Pitcher translates engineering into impact: when to lead
                  with the problem, when to show the demo, how to answer
                  &quot;so what?&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Traits
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Confident",
                      "Charismatic",
                      "Composed Under Pressure",
                      "Adaptable",
                      "High Energy",
                    ].map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-spark/30 text-spark font-code text-xs"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Strengths
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Maximizes
                        </span>{" "}
                        the 2-5 minute demo window; every second counts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Handles
                        </span>{" "}
                        tough judge Q&amp;A without breaking a sweat
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Separates
                        </span>{" "}
                        &quot;cool project&quot; from &quot;first place&quot;
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Over-promising unbuilt features, or prioritizing pitch prep
                    over helping build.
                  </p>
                </div>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Like a trial lawyer: they make the case and handle
                    cross-examination. Spot them: they naturally command a room.
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
                    Sees the whole board.
                  </span>{" "}
                  While others go deep on features, the Architect makes
                  everything connect (API to frontend, ML model to UI, auth to
                  database). They&apos;re the technical glue.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Traits
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Systems Thinker",
                      "Pragmatic",
                      "Integration-Focused",
                      "Big-Picture",
                      "Analytical",
                    ].map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-primary/30 text-primary font-code text-xs"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
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
                        integration failure, the #1 killer of hackathon projects
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Cuts scope
                        </span>{" "}
                        ruthlessly to keep the project feasible
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Connects
                        </span>{" "}
                        frontend and backend; unconnected = no demo
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
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Like a city planner: they design how everything connects.
                    Spot them: they ask &quot;how will this integrate?&quot;
                    before &quot;how will this look?&quot;
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
                  Runs the check-ins, makes the hard calls on what to cut. Their
                  decisiveness separates a working demo from an unfinished mess.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Traits
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Decisive",
                      "Scope-Disciplined",
                      "Organized",
                      "Communicative",
                      "Pragmatic",
                    ].map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-success/30 text-success font-code text-xs"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Strengths
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Aligns
                        </span>{" "}
                        the team on path and timeline via lightweight check-ins
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Surfaces
                        </span>{" "}
                        trade-offs: &quot;What gets cut if we add this?&quot;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                      <span>
                        <span className="font-semibold text-foreground">
                          Buffers
                        </span>{" "}
                        builders by owning logistics, submissions, and scope
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Over-planning and rigidity; too much process slows a
                    48-hour sprint.
                  </p>
                </div>
                <div className="rounded-lg border border-success/10 bg-success/5 p-3">
                  <p className="font-code text-xs text-success/80">
                    Like a film producer: they own the schedule, scope, and ship
                    date. Spot them: they time-box debates and ask &quot;is this
                    in scope?&quot;
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
                  <a href="https://www.belbin.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Meredith Belbin</a> — Team Role Theory
                </p>
                <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Nobody is perfect, but a team can be. A team is not a
                  bunch of people with job titles, but a congregation of
                  individuals, each of whom has a role which is understood by
                  other members.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Belbin&apos;s Cambridge research found nine team roles, and
                  teams with complementary coverage beat equally talented teams
                  with overlapping strengths. Our four personas map directly:
                  the Designer is Belbin&apos;s{" "}
                  <span className="font-semibold text-foreground">Plant</span>{" "}
                  (creative thinker), the Pitcher is the{" "}
                  <span className="font-semibold text-foreground">
                    Resource Investigator
                  </span>{" "}
                  (external communicator), the Architect is the{" "}
                  <span className="font-semibold text-foreground">
                    Monitor Evaluator
                  </span>{" "}
                  (analytical judge), and the Strategist is the{" "}
                  <span className="font-semibold text-foreground">
                    Co-ordinator
                  </span>{" "}
                  (team leader).
                </p>
                <p className="font-code text-xs text-volt/60">
                  —{" "}
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
            subtitle="The best teammates rarely come from a single search. Here's where to look."
          />

          <KeyTakeaway>
            Source teammates from many channels, but the strongest signal is
            hacking alongside someone at a fun event.
          </KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Hackathon Discords",
                description:
                  "Jump into team-matching channels early; the best teammates get claimed fast.",
                accent: "volt" as const,
              },
              {
                icon: Users,
                title: "Hackathon Communities",
                description:
                  "Tap WeCracked (4K+ members), MLH groups, and local clubs for a steady pipeline.",
                accent: "spark" as const,
              },
              {
                icon: Building2,
                title: "University Clubs",
                description:
                  "CS clubs, ACM chapters, and hackathon orgs are goldmines; the building culture already exists.",
                accent: "primary" as const,
              },
              {
                icon: Globe,
                title: "Devpost Scouting",
                description:
                  "Browse past winners and reach out to people whose projects impress you. Most are happy to connect.",
                accent: "volt" as const,
              },
              {
                icon: Calendar,
                title: "Fun Hackathons",
                description:
                  'Hacking alongside someone is your best pipeline. One "fun" event can reveal a future varsity teammate.',
                accent: "success" as const,
              },
              {
                icon: Share2,
                title: "Social Media",
                description:
                  "LinkedIn groups, Twitter/X tech communities, and hackathon subreddits are underrated sources.",
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

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Remember:
              </span>{" "}
              Attitude and communication are the foundation of any winning team.
              You can teach skills, but the willingness to learn, adapt, and
              support each other under pressure separates good teams from
              winning ones.
            </p>
          </div>
        </section>

        {/* ============================================================
            THE GOLDEN RULE
            ============================================================ */}
        <section className="space-y-8">
          <KeyTakeaway>
            Pick attitude over raw skill: a toxic genius costs more than they
            add under 24-48 hour pressure.
          </KeyTakeaway>
          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;Hire for attitude,
                <br />
                <span className="animate-shimmer">train for skill.</span>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                —{" "}
                <a href="https://en.wikipedia.org/wiki/Peter_W._Schutz" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Peter Schutz, former CEO of Porsche</a>
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    A toxic genius is still toxic.
                  </span>{" "}
                  However skilled, if they create friction, slow communication,
                  or sour the environment, they&apos;re a net loss. Under 24-48
                  hour pressure, chemistry beats individual brilliance.
                </p>
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  The right attitude means
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
                        Stay positive
                      </span>{" "}
                      at 3AM when everything is breaking
                    </span>
                  </li>
                </ul>

                <Separator className="bg-primary/20" />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/10">
                      <Brain className="size-4 text-success" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-sm font-semibold">
                        Amy Edmondson — Harvard Business School
                      </p>
                      <blockquote className="border-l-2 border-success/30 pl-4 font-body text-sm italic text-foreground/80">
                        &ldquo;Psychological safety is a belief that one will not
                        be punished or humiliated for speaking up with ideas,
                        questions, concerns, or mistakes.&rdquo;
                      </blockquote>
                      <p className="font-body text-sm text-foreground/60">
                        Edmondson&apos;s research confirms teams where members
                        feel safe to take risks outperform those ruled by fear
                        or ego, even when the &ldquo;fearful&rdquo; team has more
                        raw talent.
                      </p>
                      <p className="font-code text-xs text-success/60">
                        —{" "}
                        <a href="https://fearlessorganization.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-success/30 hover:decoration-success">The Fearless Organization, 2018</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                      <Beaker className="size-4 text-volt" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-sm font-semibold">
                        Google Project Aristotle
                      </p>
                      <p className="font-body text-sm text-foreground/60">
                        Across 180+ teams over two years, Google found{" "}
                        <span className="font-semibold text-foreground">
                          psychological safety was the #1 predictor of
                          performance
                        </span>
                        , ahead of dependability, structure, meaning, or impact.
                        How members interact matters more than who is on the
                        team.
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
            <Disclosure
              title="The Ranking System"
              subtitle="A sports-inspired system for building your hackathon squad. The method behind $100K+ in prizes."
              badge="For serious competitors"
              accent="spark"
            >
              <KeyTakeaway>
                Train rookies on a JV list, then promote proven teammates to
                varsity for high-stakes wins.
              </KeyTakeaway>

              <p className="font-body text-foreground/80">
                Like a sports team, you train rookies through the season before
                the championship game. Hackathons work the same way.
              </p>

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
                      High-potential teammates you&apos;re actively training and
                      building chemistry with.
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
                          and work ethic over 1-3 hackathons
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
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Building chemistry
                          </span>{" "}
                          with you at training hackathons
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                        <span>
                          <span className="font-semibold text-foreground">
                            One good hackathon
                          </span>{" "}
                          usually earns a JV spot
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
                      </span>{" "}
                      Battle-tested over many hackathons, with deep trust and
                      communication shortcuts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 font-body text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Deep trust
                          </span>{" "}
                          and rhythm from 3-8+ hackathons together
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
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Reserved
                          </span>{" "}
                          for high-stakes competitions where winning is the goal
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
                    The key factor isn&apos;t skill level
                  </span>{" "}
                  but how well you work together under time pressure. A varsity
                  teammate may be a worse coder than a JV one, yet communicate
                  better, pivot faster, and never go silent at 3AM. This mirrors
                  what psychologist Anders Ericsson calls{" "}
                  <span className="font-semibold text-foreground">
                    deliberate practice
                  </span>
                  : improvement needs repeated, structured effort with feedback,
                  not just showing up.
                </p>
                <p className="mt-2 font-code text-xs text-muted-foreground/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Peak:_Secrets_from_the_New_Science_of_Expertise" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Anders Ericsson, Peak: Secrets from the New Science of
                  Expertise, 2016</a>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Card className="glow-hover border-volt/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                        <BookOpen className="size-5 text-volt" />
                      </div>
                      <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                        BRUCE TUCKMAN
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-xl text-volt">
                      Tuckman&apos;s Group Development
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                      &ldquo;Groups move through forming, storming, norming, and
                      performing — each stage must be navigated before a team can
                      reach peak effectiveness.&rdquo;
                    </blockquote>
                    <p className="font-body text-sm text-foreground/60">
                      Tuckman&apos;s 1965 model maps onto JV/Varsity. JV
                      teammates are{" "}
                      <span className="font-semibold text-foreground">
                        forming and storming
                      </span>
                      : learning styles, navigating disagreements, building
                      trust. Varsity teammates have reached{" "}
                      <span className="font-semibold text-foreground">
                        norming and performing
                      </span>
                      : shared norms, fluid execution, zero coordination
                      overhead.
                    </p>
                    <p className="font-code text-xs text-volt/60">
                      —{" "}
                      <a href="https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Developmental Sequence in Small Groups, 1965</a>
                    </p>
                  </CardContent>
                </Card>

                <Card className="glow-hover border-spark/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                        <FlaskConical className="size-5 text-spark" />
                      </div>
                      <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                        MAPPED TO HACKATHONS
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-xl text-spark">
                      The Progression Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                        <p className="font-display text-sm font-semibold text-volt">
                          Forming → JV List
                        </p>
                        <p className="font-body text-xs text-foreground/60">
                          First hackathon together: learning how each person
                          works and setting communication expectations.
                        </p>
                      </div>
                      <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                        <p className="font-display text-sm font-semibold text-volt">
                          Storming → Training Hackathons
                        </p>
                        <p className="font-body text-xs text-foreground/60">
                          Disagreements over scope, stack, and approach surface.
                          This friction is necessary; working through it builds
                          trust.
                        </p>
                      </div>
                      <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                        <p className="font-display text-sm font-semibold text-spark">
                          Norming → Late JV / Early Varsity
                        </p>
                        <p className="font-body text-xs text-foreground/60">
                          Shared norms emerge. You know who handles what. Code
                          reviews and communication shortcuts develop naturally.
                        </p>
                      </div>
                      <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                        <p className="font-display text-sm font-semibold text-spark">
                          Performing → Varsity
                        </p>
                        <p className="font-body text-xs text-foreground/60">
                          Peak effectiveness. The team executes as a unit: shared
                          toolkits, minimal overhead, maximum output.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Disclosure>

            {/* HACKATHON CATEGORIES */}
            <Disclosure
              title="Hackathon Categories"
              subtitle="Not every hackathon is a championship game. Sort events to maximize team development and wins."
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
                        Low stakes, high discovery.
                      </span>{" "}
                      Team up with people you meet or match with. Less about
                      winning, more about scouting.
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
                        New people, team-matching channels, friends trying
                        hackathons
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Pro Tip
                      </p>
                      <p className="font-body text-sm text-foreground/80">
                        Treat every fun hackathon as a scouting event. Whoever
                        vibes well here might become your next JV member.
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
                        JV list only.
                      </span>{" "}
                      Develop technical and soft skills together. Practice the
                      full workflow: ideation, architecture, execution,
                      pitching.
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
                        JV teammates only; the point is chemistry and shared
                        muscle memory
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Pro Tip
                      </p>
                      <p className="font-body text-sm text-foreground/80">
                        Simulate competition conditions: set internal deadlines,
                        practice the pitch early, do a full dress rehearsal
                        before submission.
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
                        Varsity only. One goal: first place.
                      </span>{" "}
                      Backed by extensive training, shared tools, and
                      battle-tested teamwork.
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
                        Varsity only: pre-planned roles, shared templates, proven
                        tools and APIs
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Pro Tip
                      </p>
                      <p className="font-body text-sm text-foreground/80">
                        Pre-plan the stack, ready your boilerplates, and assign
                        roles before kickoff. Minimize decisions during the
                        event.
                      </p>
                    </div>
                    <div className="rounded-lg bg-spark/5 p-3 text-center">
                      <p className="animate-shimmer font-display text-lg font-bold">
                        Win mode
                      </p>
                      <p className="font-code text-xs text-spark/70">
                        first place or bust
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
                    <blockquote className="border-l-2 border-primary/30 pl-4 font-body text-sm italic text-foreground/80">
                      &ldquo;The single most important condition for team
                      effectiveness is having a compelling direction — a purpose
                      that is clear, challenging, and consequential.&rdquo;
                    </blockquote>
                    <p className="font-body text-sm text-foreground/60">
                      Hackman&apos;s Harvard research explains the three
                      categories. Fun hackathons have{" "}
                      <span className="font-semibold text-foreground">
                        no shared direction
                      </span>{" "}
                      (you&apos;re still exploring). Training hackathons have{" "}
                      <span className="font-semibold text-foreground">
                        a learning direction
                      </span>{" "}
                      (the purpose is growth). Competitive hackathons have{" "}
                      <span className="font-semibold text-foreground">
                        a winning direction
                      </span>{" "}
                      that is clear, challenging, and consequential. Sharper
                      direction, better performance.
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

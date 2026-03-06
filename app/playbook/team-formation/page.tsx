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
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
import { PersonaQuiz } from "@/components/persona-quiz";
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

const section = PLAYBOOK_SECTIONS[0];

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
            THE FOUR PERSONAS
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Four Personas"
            subtitle="Every winning hackathon team needs four key roles. You don't need a big team — you need the right composition. One person can fill multiple roles."
          />

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
                  In a sea of terminal-output demos, a polished UI instantly
                  signals quality. The Designer turns your 4AM code into
                  something that looks intentional — and in hackathons, first
                  impressions are everything.
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
                      Judges form opinions in seconds — a beautiful interface
                      buys credibility before you say a word
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      In online judging, your project IS your screenshots
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      Makes complex features feel simple and approachable
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Perfectionism under time pressure — may spend too long
                    polishing when &quot;good enough&quot; ships.
                  </p>
                </div>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Like a cinematographer — they define how the world sees the
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
                  Your project could cure cancer, but if you can&apos;t explain
                  it in 60 seconds, you lose. The Pitcher translates engineering
                  into impact — they know when to lead with the problem, when to
                  show the demo, and how to handle the &quot;so what?&quot;
                  question.
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
                      Most demos get 2-5 minutes — the Pitcher makes every
                      second count
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      Handles tough judge Q&amp;A without breaking a sweat
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      The difference between &quot;cool project&quot; and
                      &quot;first place&quot;
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    May over-promise features that aren&apos;t built yet, or
                    focus on pitch prep at the expense of helping build.
                  </p>
                </div>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Like a trial lawyer — they make the case and handle
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
                  The Architect sees the whole board. While others go deep on
                  features, they ensure everything connects — API to frontend, ML
                  model to UI, auth to database. They&apos;re the technical glue
                  that holds the project together.
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
                      The #1 killer of hackathon projects is integration failure
                      — they prevent it
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Keeps the project feasible by cutting scope ruthlessly
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Beautiful frontend + powerful backend that don&apos;t
                      connect = no demo. They fix that.
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Over-engineering for a 48-hour sprint — building for scale
                    when you need to build for demo.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Like a city planner — they design how everything connects.
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
                  The one who says &quot;no&quot; to feature creep at 3AM, runs
                  the check-ins that keep everyone aligned, and makes the hard
                  calls on what to cut. Under extreme time pressure, their
                  decisiveness is what separates a working demo from an
                  unfinished mess.
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
                      Keeps the team on a clear path and timeline with
                      lightweight check-ins
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                      Makes feature trade-offs explicit: &quot;What gets cut if
                      we add this?&quot;
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                      Acts as a buffer so builders can focus — handles logistics,
                      submissions, and scope
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Watch Out For
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    Over-planning and rigidity — too much process in a 48-hour
                    sprint slows everyone down.
                  </p>
                </div>
                <div className="rounded-lg border border-success/10 bg-success/5 p-3">
                  <p className="font-code text-xs text-success/80">
                    Like a film producer — they own the schedule, scope, and ship
                    date. Spot them: they time-box debates and ask &quot;is this
                    in scope?&quot;
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            PERSONA QUIZ
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Find Your Persona"
            subtitle="Which role do you naturally gravitate toward? Take this 8-question quiz to find out."
          />
          <PersonaQuiz />
        </section>

        {/* ============================================================
            THE RANKING SYSTEM
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Ranking System"
            subtitle="A sports-inspired system for building and developing your hackathon squad. This is the method behind $100K+ in prizes."
          />

          <p className="font-body text-foreground/80">
            Think of it like a sports team. You don&apos;t put rookies in the
            championship game — you train them through the season first. The
            same applies to hackathons.
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
                  Your development squad. Teammates showing strong potential who
                  you&apos;re actively training and building chemistry with.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Hacked with 1-3 times, showed strong attitude and work ethic
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Still developing hackathon skills — time management, rapid
                    prototyping, pitching
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    You team with them at training hackathons to build chemistry
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Usually takes just one good hackathon to earn a JV spot
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
                  Your championship squad. Battle-tested through multiple
                  hackathons, deep trust, and communication shortcuts built over
                  time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Proven through 3-8+ hackathons together — deep trust and
                    rhythm
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Each person knows their role and executes without
                    micromanagement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Shared toolkit — pre-built templates, favorite APIs,
                    deployment pipeline
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Reserved for high-stakes competitions where winning is the
                    only goal
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
              — it&apos;s how well you work together under extreme time pressure.
              A varsity teammate might be a worse programmer than a JV one, but
              they communicate better, pivot faster, and never go silent at 3AM
              when everything breaks.
            </p>
          </div>
        </section>

        {/* ============================================================
            HACKATHON CATEGORIES
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Hackathon Categories"
            subtitle="Not every hackathon is a championship game. Categorize your events to maximize team development and winning potential."
          />

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
                  Low stakes, high discovery. Team up with people you meet at the
                  event or through team-matching. Less about winning, more about
                  enjoyment and scouting.
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
                    New people, team-matching channels, friends who want to try
                    hackathons
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Pro Tip
                  </p>
                  <p className="font-body text-sm text-foreground/80">
                    Treat every fun hackathon as a scouting event. The person who
                    vibes well here might become your next JV member. Low
                    expectations, high potential.
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
                  Exclusively with your JV list. Focus on developing technical
                  and soft skills together. Practice your full workflow —
                  ideation, architecture, execution, pitching.
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
                    JV teammates only — the whole point is building chemistry and
                    shared muscle memory
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Pro Tip
                  </p>
                  <p className="font-body text-sm text-foreground/80">
                    Simulate competition conditions. Set internal deadlines,
                    practice your pitch early, and do a full dress rehearsal
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
                  Varsity team only. Sole purpose: winning first place. Benefit
                  from extensive training, shared tools, and battle-tested
                  teamwork.
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
                    Varsity only — pre-planned roles, shared templates, rapid
                    deployment of proven tools and APIs
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Pro Tip
                  </p>
                  <p className="font-body text-sm text-foreground/80">
                    Pre-plan your tech stack, have boilerplates ready, and assign
                    roles before the hackathon starts. Minimize decision-making
                    during the event.
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
        </section>

        {/* ============================================================
            THE GOLDEN RULE
            ============================================================ */}
        <section className="space-y-8">
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
                — Peter Schutz, former CEO of Porsche
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    A toxic genius is still toxic.
                  </span>{" "}
                  No matter how skilled someone is, if they create friction, slow
                  down communication, or make the team environment negative,
                  they&apos;re a net loss. Under 24-48 hour pressure, team
                  chemistry matters more than individual brilliance.
                </p>
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  The right attitude means
                </p>
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    They communicate when stuck instead of going silent
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    They&apos;re willing to pivot when the plan isn&apos;t
                    working
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    They support the team&apos;s decision even if it wasn&apos;t
                    their first choice
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    They stay positive at 3AM when everything is breaking
                  </li>
                </ul>
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
            subtitle="The best teammates rarely come from a single Google search. Here's where to look and how to evaluate."
          />

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Hackathon Discords",
                description:
                  "Most hackathons have team-matching channels. Jump in early — the best teammates get claimed fast.",
                accent: "volt" as const,
              },
              {
                icon: Users,
                title: "Hackathon Communities",
                description:
                  "Join communities like WeCracked (4K+ members), MLH groups, and local hackathon clubs for a steady pipeline.",
                accent: "spark" as const,
              },
              {
                icon: Building2,
                title: "University Clubs",
                description:
                  "CS clubs, ACM chapters, and hackathon orgs are goldmines. The culture of building already exists there.",
                accent: "primary" as const,
              },
              {
                icon: Globe,
                title: "Devpost Scouting",
                description:
                  "Browse winners of past hackathons. Reach out to people whose projects impress you — most are happy to connect.",
                accent: "volt" as const,
              },
              {
                icon: Calendar,
                title: "Fun Hackathons",
                description:
                  'Your best recruitment pipeline is hacking alongside someone. One "fun" hackathon can reveal a future varsity teammate.',
                accent: "success" as const,
              },
              {
                icon: Share2,
                title: "Social Media",
                description:
                  "LinkedIn hackathon groups, Twitter/X tech communities, and hackathon-specific subreddits are underrated sources.",
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
              The right attitude and strong communication skills are the
              foundation of any successful hackathon team. Skills can be taught
              — but the willingness to learn, adapt, and support each other
              under pressure? That&apos;s what separates good teams from
              winning ones.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

import type { Metadata } from "next";
import {
  Blocks,
  FlaskConical,
  Puzzle,
  Shield,
  Combine,
  Quote,
  ArrowRight,
  Lightbulb,
  Rocket,
  Footprints,
  Crosshair,
  Calendar,
  Code,
  Wrench,
  DoorOpen,
  DoorClosed,
  Timer,
  AlertTriangle,
  CheckCircle2,
  Microscope,
  Route,
  Layers,
  Sparkles,
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
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

const section = PLAYBOOK_SECTIONS[2];

export const metadata: Metadata = {
  title: section.title,
  description: section.subtitle,
  openGraph: { title: section.title, description: section.subtitle },
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

export default function ValidationPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            THE LEGO METHOD
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Lego Method"
            subtitle="Don't try to validate the whole idea at once. Build small, tested building blocks — like Legos — and snap them together into a winning project."
          />

          <p className="font-body text-foreground/80">
            The biggest mistake teams make is trying to build the entire project
            in one shot, then discovering at hour 18 that a critical API
            doesn&apos;t work the way they assumed. The fix is simple:{" "}
            <span className="font-display font-semibold text-foreground">
              validate one piece at a time, in isolation.
            </span>{" "}
            Make each block solid. Then combine them — and the project assembles
            itself.
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Microscope className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    ISOLATE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Test One Thing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  Test one integration, one API, one flow at a time. Can you get
                  a streaming response from OpenAI? Can you trigger a phone call
                  through Twilio with a Python script? Can you make a
                  text-to-speech model output audio in a browser?
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Each question gets its own isolated experiment. No
                    dependencies, no distractions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Shield className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    SOLIDIFY
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Make It Bulletproof
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  Once a block works, make it reliable. Handle the failure
                  modes. Understand the rate limits. Know the latency. A block
                  you&apos;ve battle-tested in a side project is a block you can
                  trust at 3AM during the hackathon.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    A solid block never breaks during the demo. That&apos;s the
                    whole point.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Combine className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    COMPOSE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Snap Together
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  When each block is proven, combining them is straightforward.
                  OpenAI streaming + Twilio voice + a React frontend = a voice
                  AI agent. The architecture emerges from the blocks you already
                  trust.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Composition is fast when every piece already works. The
                    project assembles itself.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Think of it like actual Legos:
              </span>{" "}
              you don&apos;t mold custom plastic at build time. You pick
              pre-made blocks off the shelf and connect them. The more blocks
              you&apos;ve tested beforehand, the faster you build during the
              event.
            </p>
          </div>
        </section>

        {/* ============================================================
            PRE-HACKATHON VALIDATION
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Pre-Hackathon Validation"
            subtitle="Critical: validation happens BEFORE the hackathon, not during it. Your side projects are your lab. Use them to build a library of proven blocks."
          />

          <p className="font-body text-foreground/80">
            The hackathon itself is for{" "}
            <span className="font-display font-semibold text-foreground">
              combining and creating
            </span>
            , not for discovering that an API doesn&apos;t work. Every hour
            spent debugging a basic integration at the event is an hour stolen
            from building the thing that wins.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  BEFORE THE HACKATHON
                </Badge>
                <CardTitle className="font-display text-2xl text-volt">
                  Build Your Lego Library
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Side projects, hobby work, and personal experiments are your
                  testing ground.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    OpenAI streaming responses — test latency, token limits,
                    error handling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Twilio voice calls — triggering, receiving, and processing
                    audio
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Supabase real-time subscriptions and auth flows
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    File uploads, WebSocket connections, deployment pipelines
                  </li>
                </ul>
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-volt">
                    Weeks before
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    validate tools during side projects
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Desktop connector */}
            <div className="hidden items-center md:flex">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-px bg-gradient-to-b from-volt to-spark" />
                <ArrowRight className="size-6 text-spark" />
                <div className="h-16 w-px bg-gradient-to-b from-spark to-spark/0" />
                <p className="font-code text-xs text-muted-foreground [writing-mode:vertical-lr]">
                  then combine
                </p>
              </div>
            </div>

            {/* Mobile connector */}
            <div className="flex items-center justify-center py-2 md:hidden">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-volt to-spark" />
                <ArrowRight className="size-5 text-spark" />
                <p className="font-code text-xs text-muted-foreground">
                  then combine
                </p>
              </div>
            </div>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  DURING THE HACKATHON
                </Badge>
                <CardTitle className="font-display text-2xl text-spark">
                  Combine and Create
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Snap pre-validated blocks together. Only validate what&apos;s
                  genuinely new and risky.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Combine proven blocks into the new idea — focus on the novel
                    integration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Spike only the one NEW risky piece — the part that&apos;s
                    never been tested
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Skip re-validating proven tools — trust the blocks you
                    already built
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Spend the saved hours on polish, pitch, and demo prep
                  </li>
                </ul>
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-spark">
                    Day of
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    validate only the new and risky
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Pro tip:
              </span>{" "}
              Research hackathon sponsors and their APIs before the event. Build
              small experiments with their tools during side projects. When the
              hackathon starts, you already know what works, what breaks, and
              where the free credits run out.
            </p>
          </div>
        </section>

        {/* ============================================================
            SPIKE SOLUTIONS
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Spike Solutions — Test the Riskiest Piece First"
            subtitle="From Kent Beck's Extreme Programming: a small, throwaway experiment to test a risky technical assumption before committing to a full implementation."
          />

          <Card className="glow-hover border-volt/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                  <FlaskConical className="size-5 text-volt" />
                </div>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  SPIKE SOLUTION
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-volt">
                30-60 Minutes That Save Your Hackathon
              </CardTitle>
              <CardDescription className="font-body text-base">
                Identify the riskiest technical assumption in your idea and run a
                focused spike on it before writing a single line of real code.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;A spike solution is a very simple program to explore
                potential solutions. It focuses only on the problem under
                examination while ignoring all other concerns. Most spikes are
                not good enough to keep, so expect to throw away the
                code.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-volt/60">
                — Kent Beck, Extreme Programming
              </p>

              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  The Rule
                </p>
                <p className="font-body text-sm text-foreground/80">
                  Every hackathon idea has one piece that could kill it. Find
                  that piece and test it first. If the spike fails, pivot the
                  idea before investing more time. If it works, you&apos;ve just
                  de-risked the entire project.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Example Spikes
                </p>
                <div className="stagger-children grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    {
                      question:
                        "Can GPT-4 actually triage 911 calls accurately?",
                      time: "45 min",
                      accent: "volt" as const,
                    },
                    {
                      question:
                        "Can Twilio handle real-time audio streaming to an LLM?",
                      time: "30 min",
                      accent: "spark" as const,
                    },
                    {
                      question:
                        "Can we run inference fast enough for a live demo?",
                      time: "60 min",
                      accent: "primary" as const,
                    },
                  ].map((spike) => {
                    const colors = {
                      volt: {
                        border: "border-volt/20",
                        bg: "bg-volt/5",
                        text: "text-volt",
                      },
                      spark: {
                        border: "border-spark/20",
                        bg: "bg-spark/5",
                        text: "text-spark",
                      },
                      primary: {
                        border: "border-primary/20",
                        bg: "bg-primary/5",
                        text: "text-primary",
                      },
                    };
                    const c = colors[spike.accent];
                    return (
                      <div
                        key={spike.question}
                        className={`rounded-lg border ${c.border} ${c.bg} p-3`}
                      >
                        <p className="font-body text-xs text-foreground/80">
                          {spike.question}
                        </p>
                        <p className={`mt-2 font-code text-xs ${c.text}`}>
                          ~ {spike.time} spike
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="animate-glow-pulse glass rounded-xl border border-primary/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Lightbulb className="size-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold">
                  Richard Feynman — Nobel Laureate in Physics
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;What I cannot create, I do not understand.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  If you can&apos;t build the smallest version of the riskiest
                  piece, you don&apos;t fully understand the problem. The spike
                  is how you earn that understanding — fast.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE SCIENCE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Why This Works — The Science of Rapid Validation"
            subtitle="The Lego method isn't just intuition — it's backed by decades of engineering and design research on how to validate fast and build with confidence."
          />

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Rocket className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    ERIC RIES
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Build-Measure-Learn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;The goal of the MVP is to begin the process of
                  learning, not end it.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Each Lego block is a mini MVP cycle. Build the smallest
                  testable version, measure whether it works, learn from the
                  result. Repeat for the next block. By the time you combine
                  them, you&apos;ve already learned what matters.
                </p>
                <p className="font-code text-xs text-volt/60">
                  — The Lean Startup, 2011
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Wrench className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    IDEO
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Prototype Over Meetings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;If a picture is worth a thousand words, a prototype is
                  worth a thousand meetings.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  IDEO&apos;s design philosophy: stop debating whether something
                  will work and just build it. A 30-minute prototype answers
                  more questions than a 2-hour whiteboard session. Build,
                  don&apos;t debate.
                </p>
                <p className="font-code text-xs text-spark/60">
                  — David Kelley, IDEO founder
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Footprints className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    ALISTAIR COCKBURN
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Walking Skeleton
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-primary/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;A tiny implementation that performs a small end-to-end
                  function, linking together the main architectural
                  components.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Before adding features, get one path working from UI to logic
                  to data. The skeleton proves your architecture works. Once
                  it&apos;s walking, flesh it out — but never start with the
                  flesh.
                </p>
                <p className="font-code text-xs text-primary/60">
                  — Alistair Cockburn, Agile Manifesto co-author
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Crosshair className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    THOMAS &amp; HUNT
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  Tracer Bullet Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-success/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Tracer bullets show what you&apos;re hitting. This may
                  not always be the target. You then adjust your aim until
                  they&apos;re on target. That&apos;s the point.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Like tracer rounds that show where shots land, tracer code
                  implements one narrow path through all layers. It gives you
                  real feedback on whether your architecture works — before you
                  commit to building everything.
                </p>
                <p className="font-code text-xs text-success/60">
                  — The Pragmatic Programmer, 1999
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            THE VALIDATION LADDER
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Validation Ladder"
            subtitle="A four-step progression from 'can we technically do it?' to 'can a judge use it and understand it?' Each step builds on the last."
          />

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Proof of Concept",
                question: "Can we technically do it?",
                description:
                  "Internal experiment, 1-2 hours, one person. Test the hardest integration — the piece most likely to kill the idea. Throwaway code is fine. You're testing feasibility, not building product.",
                time: "1-2 hours",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Walking Skeleton",
                question: "Can we connect all the pieces?",
                description:
                  "The tiniest end-to-end path through UI, logic, and data. User clicks a button, backend processes something, result shows on screen. It doesn't need to be pretty — it needs to be connected.",
                time: "2-4 hours",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Prototype",
                question: "Does the flow feel right?",
                description:
                  "Clickable, interactive, shows the user journey. Test it with a teammate — can they use it without explanation? If they're confused, the flow needs work before you add more features.",
                time: "4-8 hours",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Demo-Ready MVP",
                question: "Can a judge use it and understand it?",
                description:
                  "Working product with a polished happy path. The core flow is smooth, the UI is clean on the main screens, and the demo tells a story. Edge cases don't matter — the golden path does.",
                time: "By submission",
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
                      <div className="flex flex-wrap items-center gap-3">
                        <p
                          className={`font-display text-lg font-semibold ${c.text}`}
                        >
                          {item.title}
                        </p>
                        <Badge
                          variant="outline"
                          className={`${c.border} ${c.text} font-code text-xs`}
                        >
                          {item.time}
                        </Badge>
                      </div>
                      <p className="font-display text-sm font-semibold text-foreground/90">
                        {item.question}
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

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                You don&apos;t have to climb every rung at the hackathon.
              </span>{" "}
              If your Lego library is strong, you might start at step 2 or 3 on
              day one. Pre-validation compresses the ladder — that&apos;s the
              whole advantage.
            </p>
          </div>
        </section>

        {/* ============================================================
            TWO-WAY DOOR DECISIONS
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Two-Way Door Decisions"
            subtitle="Most hackathon decisions are reversible. Make them fast. Save your deliberation for the few choices you can't undo."
          />

          <Card className="glow-hover border-spark/20">
            <CardContent className="space-y-4 pt-6">
              <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;Most decisions are two-way doors. If you make the wrong
                decision, you come back in and pick another door. But some
                decisions are one-way doors — you go in that door, you&apos;re
                not coming back.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-spark/60">
                — Jeff Bezos, founder of Amazon
              </p>
            </CardContent>
          </Card>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <DoorOpen className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    TWO-WAY DOORS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Decide Fast, Swap Later
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Tech stack choice — can always swap a library
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Feature scope — add or cut as you go
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    UI layout — iterate quickly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    API choice — test one, swap if it fails
                  </li>
                </ul>
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="font-display text-lg font-bold text-volt">
                    &lt; 5 min
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    decide and move on
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <DoorClosed className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    ONE-WAY DOORS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Deliberate Carefully
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    The core idea — pivoting mid-hackathon costs hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Team composition — roles set the trajectory
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    The problem you&apos;re solving — shapes everything
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Which prize track to target — determines constraints
                  </li>
                </ul>
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-lg font-bold text-spark">
                    Take your time
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    these decisions are hard to undo
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Timer className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    THE RULE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  80/20 Decision Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  Spend 80% of your decision-making energy on one-way doors.
                  Make two-way doors in under 5 minutes. The teams that lose
                  aren&apos;t the ones who pick the wrong framework — they&apos;re
                  the ones who spent 2 hours debating which framework to use.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Reid Hoffman: &ldquo;If you aren&apos;t embarrassed by the
                    first version of your product, you shipped too late.&rdquo;
                    Perfect decisions aren&apos;t the goal — fast, reversible
                    decisions are.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            GOLDEN RULE — FEYNMAN QUOTE
            ============================================================ */}
        <section className="space-y-8">
          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;What I cannot create,
                <br />
                <span className="animate-shimmer">
                  I do not understand.
                </span>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                — Richard Feynman, Nobel Laureate in Physics
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    In hackathons, validation IS creation.
                  </span>{" "}
                  Build the smallest possible version of each piece. If you
                  can&apos;t make it work in isolation, it won&apos;t work in the
                  full project. Don&apos;t assume — prove it with code.
                </p>
                <p className="font-body text-foreground/80">
                  Your Lego library is your competitive advantage. Every block
                  you&apos;ve already tested during a side project is hours
                  saved during the event. While other teams are debugging their
                  first API call at hour 4, you&apos;re composing proven blocks
                  into something that already works.
                </p>
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    The team with the most pre-validated blocks wins — because
                    they spend the hackathon creating, not discovering.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            VALIDATION CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Validation Checklist"
            subtitle="A step-by-step summary for de-risking your hackathon project. Follow this before and during every event."
          />

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Build a \"Lego library\" of tested blocks during side projects before the hackathon",
                  accent: "volt",
                },
                {
                  text: "Identify the riskiest technical assumption in your idea — spike it first, in 30-60 minutes",
                  accent: "spark",
                },
                {
                  text: "Get a walking skeleton working in the first 2 hours — one path, end to end, UI to data",
                  accent: "primary",
                },
                {
                  text: "Validate each block in isolation before combining — never test two unknowns at once",
                  accent: "success",
                },
                {
                  text: "Make two-way door decisions in under 5 minutes — save deliberation for one-way doors",
                  accent: "volt",
                },
                {
                  text: "If the spike fails, pivot the idea immediately — don't sink more time into a broken assumption",
                  accent: "spark",
                },
                {
                  text: "\"What I cannot create, I do not understand\" — if you can't build the smallest version, rethink the approach",
                  accent: "primary",
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

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Remember:
              </span>{" "}
              The goal of validation isn&apos;t to prove your idea is perfect —
              it&apos;s to find out what&apos;s broken before you&apos;re 18
              hours deep with no backup plan. Test early, test in isolation, and
              trust the blocks you&apos;ve already proven.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

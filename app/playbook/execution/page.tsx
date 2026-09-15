import type { Metadata } from "next";
import {
  Zap,
  Target,
  Timer,
  Bot,
  Code,
  Paintbrush,
  MessageSquare,
  Quote,
  ArrowRight,
  Scissors,
  GitBranch,
  Server,
  Layout,
  Boxes,
  Radio,
  CheckCircle2,
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
import { KeyTakeaway } from "@/components/key-takeaway";
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
import { TimelineSimulator } from "./timeline-simulator";
import { markdownAlternate, SITE_URL } from "@/lib/site";
import { shareMetadata } from "@/lib/metadata";

const section = PLAYBOOK_SECTIONS[3];

export const metadata: Metadata = {
  title: "Hackathon Execution — Best Tech Stack, Time Management & MVP Strategy",
  description:
    "Master hackathon execution: choose the best tech stack, manage your time effectively, build an MVP that impresses judges, and coordinate your team. Includes timeline simulator.",
  alternates: {
    canonical: `${SITE_URL}/playbook/execution`,
    types: markdownAlternate("/playbook/execution"),
  },
  ...shareMetadata({
    path: "/playbook/execution",
    title: "Hackathon Execution: Best Tech Stack & MVP Strategy",
    description:
      "Time management, tech stack selection, MVP strategy, and team coordination for hackathons. From the 36-win playbook.",
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

export default function ExecutionPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            INTERACTIVE: TIMELINE SIMULATOR
            ============================================================ */}
        <section className="space-y-8">
          <div className="space-y-1">
            <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
              INTERACTIVE
            </Badge>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Plan Your 24 Hours
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              Split 24 hours across the six phases, then check your plan. The
              feedback assumes you&apos;re competing to win.
            </p>
          </div>
          <KeyTakeaway>To compete for the win, pick your idea before the event and, if the rules allow, prep the demo after submitting.</KeyTakeaway>
          <TimelineSimulator />
        </section>

        {/* ============================================================
            THE HACKATHON TIMELINE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Hackathon Timeline"
            subtitle="A 24-hour plan for when everything happens at the event. For 36 or 48 hours, scale the hours and keep the order."
          />

          <KeyTakeaway>Have the core flow working by hour 4 and add no new features after hour 16.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            This is the safe default for a team starting cold. The planner at
            the top of the page rewards a more aggressive version: settle the
            idea before the event starts, then do demo prep and rehearsal in
            the gap between the code deadline and judging, so every hackathon
            hour goes to building. Use that version when your event has that
            gap.
          </p>

          {/* [NEEDS SPECIFIC: how did the 24 hours actually go at one of your wins (Dispatch AI, TalkTuahBank, AdaptED)? One real schedule would ground this timeline.] */}
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Ideation and Architecture",
                time: "Hour 0-2",
                description:
                  "Finalize the idea, assign roles, and sketch the architecture. Set up the repo from a boilerplate and deploy it so 'hello world' is live in the first hour. If you're competing to win, pick the idea before the event; if you're there to learn and meet people, picking it here is fine.",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Core Pipeline",
                time: "Hour 2-4",
                description:
                  "Get the flow working end to end, however ugly. Hardcode values and skip error handling; nothing else starts until this works.",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Build Sprint",
                time: "Hour 4-16",
                description:
                  "Feature work in timeboxed 2-3 hour blocks, with a 'Can we demo right now?' check after each one. Cut any feature that runs long, and sleep in shifts.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Integration and Polish",
                time: "Hour 16-20",
                description:
                  "Connect the pieces and fix only the bugs that would break the demo. Polish the screens judges will see. No new features: if something isn't working by hour 16, cut it.",
                accent: "success" as const,
              },
              {
                step: 5,
                title: "Demo Prep",
                time: "Hour 20-22",
                description:
                  "Record the demo video, build the deck, and prep Q&A appendix slides. If your event has a gap between submission and judging, do this step in the gap instead and spend hours 20-22 polishing what already works. Check the rules first: many events need the video link at submission.",
                accent: "volt" as const,
              },
              {
                step: 6,
                title: "Rehearse and Submit",
                time: "Hour 22-24",
                description:
                  "Practice the pitch at least 3 times and time it. Submit everything early (Devpost, video, repo), then leave the code alone and rest before judging.",
                accent: "spark" as const,
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
            THE SPEED MINDSET
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Speed Mindset"
            subtitle="How long to spend on a feature, and how to tell if it belongs at all."
          />

          <KeyTakeaway>Give every feature a time limit, and skip anything that doesn&apos;t make the demo better.</KeyTakeaway>

          {/* [NEEDS SPECIFIC: where does the 2-hour rule come from? A hackathon where a feature ran long, and whether you cut it.] */}
          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Zap className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    SPEED
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Timebox Every Feature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Once the core flow works,</span>{" "}
                  add features one at a time, each with a time limit you set
                  before you start it.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    If a feature takes more than 2 hours, question whether it
                    belongs in the demo at all.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    FOCUS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Build for the Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Build a proof of concept.</span>{" "}
                  Before you add anything, ask:
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    &ldquo;Does this make the demo better?&rdquo; If not, skip
                    it, including edge cases that won&apos;t come up in the
                    demo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            SCOPE HAMMERING
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Scope Hammering"
            subtitle="The deadline is fixed, so cut features until what's left fits."
          />

          <KeyTakeaway>Build one core flow and one demo moment; hardcode a user and skip signup, admin panels, and edge-case handling.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            <a href="https://basecamp.com/shapeup" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Ryan Singer&apos;s Shape Up methodology</a> (Basecamp, 2019) defines{" "}
            <span className="font-display font-semibold text-foreground">
              scope hammering
            </span>{" "}
            as &ldquo;forcefully questioning a design, implementation, or use
            case to cut scope and finish inside the fixed time box.&rdquo; At a
            hackathon, that means sorting every feature into one of two piles.
          </p>

          {/* [NEEDS SPECIFIC: what did you actually cut, and at which hackathon?] */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  BUILD THIS
                </Badge>
                <CardTitle className="font-display text-2xl text-volt">
                  The Vital 20%
                </CardTitle>
                <CardDescription className="font-body text-base">
                  The part of the project the demo depends on.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">One core flow</span> that works end to end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">One demo moment</span> that shows the idea</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Polished UI</span> on the screens you&apos;ll demo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Desktop connector */}
            <div className="hidden items-center md:flex">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-px bg-gradient-to-b from-volt to-spark" />
                <Scissors className="size-6 text-spark" />
                <div className="h-16 w-px bg-gradient-to-b from-spark to-spark/0" />
                <p className="font-code text-xs text-muted-foreground [writing-mode:vertical-lr]">
                  cut here
                </p>
              </div>
            </div>

            {/* Mobile connector */}
            <div className="flex items-center justify-center py-2 md:hidden">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-volt to-spark" />
                <Scissors className="size-5 text-spark" />
                <p className="font-code text-xs text-muted-foreground">
                  cut here
                </p>
              </div>
            </div>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  CUT THIS
                </Badge>
                <CardTitle className="font-display text-2xl text-spark">
                  The Comfortable 80%
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Features that feel important, but the demo doesn&apos;t need
                  them.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Auth and login</span>: hardcode a user, skip signup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Admin panels</span>, settings, profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Edge cases</span>, error handling, validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Migrations</span>, multiple user types, permissions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            THE AI-POWERED WORKFLOW
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The AI-Powered Workflow"
            subtitle="What each tool below is good for during the build."
          />

          <KeyTakeaway>Let AI write the boilerplate and standard UI, then spend your own hours editing it and building the core logic.</KeyTakeaway>

          {/* [NEEDS SPECIFIC: which of these tools did you actually use, and on which win?] */}
          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Code className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    CODE EDITOR
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Cursor
                </CardTitle>
                <CardDescription className="font-body">
                  A VS Code fork that indexes your whole codebase, so its
                  suggestions fit your project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Inline edits</span> with Cmd+K (Ctrl+K on Windows) to refine code in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Multi-line predictions</span> as you type</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Paintbrush className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    GENERATIVE UI
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Vercel v0
                </CardTitle>
                <CardDescription className="font-body">
                  Turns a text prompt into React components built on shadcn/ui
                  and Tailwind CSS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">npm-installable</span> output that drops straight into a Next.js project</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    AI CHAT
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Claude Artifacts
                </CardTitle>
                <CardDescription className="font-body">
                  Chat-based code generation with a live preview in the same
                  tab.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span><span className="font-semibold text-foreground">Debugging</span> a teammate&apos;s code mid-hackathon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span><span className="font-semibold text-foreground">Full history</span> so you can retrace your steps</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            THE LEVERAGE TOOLKIT
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Leverage Toolkit"
            subtitle="Six habits that save setup and coordination time."
          />

          <KeyTakeaway>Keep main working and deployed from hour one, so you always have a live version to demo.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Boxes,
                title: "Boilerplate Repos",
                description: (
                  <>
                    Pre-built starters (Next.js, Flask, Express) save you the
                    setup. If you&apos;re competing to win, bring a stack you
                    already know. If you&apos;re there to learn, new tech is
                    fair game.
                  </>
                ),
                accent: "volt" as const,
              },
              {
                icon: Layout,
                title: "Component Libraries",
                description:
                  "Use shadcn/ui, Radix, or Material UI instead of building your own buttons and dialogs.",
                accent: "spark" as const,
              },
              {
                icon: Server,
                title: "Deployment Pipeline",
                description:
                  "One-click deploy on Vercel or Netlify. Set it up in hour one so you can always demo from a live URL instead of localhost.",
                accent: "primary" as const,
              },
              {
                icon: Radio,
                title: "API-First Approach",
                description:
                  "Use managed services (Supabase, Firebase, Auth0) for the database and storage, and for auth if the demo needs it at all.",
                accent: "success" as const,
              },
              {
                icon: GitBranch,
                title: "Version Control Discipline",
                description:
                  "Commit often and branch per feature. Keep main working so there's always something to demo.",
                accent: "volt" as const,
              },
              {
                icon: MessageSquare,
                title: "Communication Shortcuts",
                description:
                  "A shared Figma, one Slack or Discord channel, and a standup every 2-3 hours.",
                accent: "spark" as const,
              },
            ].map((item) => {
              const accentMap = {
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
            WHY THIS WORKS — THE SCIENCE (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <Disclosure
            title="Why This Works: The Science of Constrained Execution"
            subtitle="Optional theory: the sources behind the advice on this page."
            badge="Optional: the science"
            accent="primary"
          >
            <KeyTakeaway>Work stretches to fill the time you give it, and a few features carry most of a demo.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Timer className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    PARKINSON&apos;S LAW
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Timeboxing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Work expands so as to fill the time available for its
                  completion.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  <span className="font-semibold text-foreground">The fix is timeboxing.</span>{" "}
                  Marc Zao-Sanders lays it out in a 2018{" "}
                  <a href="https://hbr.org/2018/12/how-timeboxing-works-and-why-it-will-make-you-more-productive" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Harvard Business Review</a>{" "}
                  piece: give each task a fixed block and stop when time is up,
                  done or not.
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Parkinson%27s_law" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Cyril Northcote Parkinson, 1955</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    PARETO PRINCIPLE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  The 80/20 Rule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-primary/30 pl-4 font-body text-sm italic text-foreground/80">
                  Roughly 80% of consequences come from 20% of causes.
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  <span className="font-semibold text-foreground">Applied to a demo:</span>{" "}
                  a few features carry most of the impact. That&apos;s where
                  the Vital 20% and Comfortable 80% in Scope Hammering get
                  their names, though the real split won&apos;t be exact.
                </p>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Pareto_principle" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">The Pareto principle: observed by economist Vilfredo Pareto (1906), named and popularized by quality-management pioneer Joseph Juran</a>
                </p>
              </CardContent>
            </Card>
          </div>
          </Disclosure>
        </section>

        {/* ============================================================
            GOLDEN RULE — EXECUTION QUOTE
            ============================================================ */}
        <section className="space-y-8">
          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;Make it work.
                <br />
                Make it right.
                <br />
                <span className="animate-shimmer">Make it fast.</span>&rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                —{" "}
                <a href="https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Software proverb popularized by Kent Beck, creator of Extreme Programming; in print since Johnson and Kernighan, Byte, August 1983</a>
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              {/* [NEEDS SPECIFIC: "Winners don't have the cleanest code" was cut as unsourced. If you've seen this judging LA Hacks 2026 or on your own wins, tell that story here.] */}
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  At a hackathon, &ldquo;make it work&rdquo; is the{" "}
                  <span className="font-display font-semibold text-foreground">
                    Core Pipeline
                  </span>{" "}
                  step on the timeline. After that, clean up only the code the
                  demo touches, and speed something up only if it&apos;s slow
                  in the demo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            EXECUTION CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Execution Checklist"
            subtitle="This page in seven lines, to keep open during the event."
          />

          <KeyTakeaway>Deploy in hour one, and every 2-3 hours check that you could demo right now.</KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Set up the repo and boilerplate and deploy in hour one",
                  accent: "volt",
                },
                {
                  text: "Get the flow working end to end before adding features",
                  accent: "spark",
                },
                {
                  text: "Timebox every task. Past 2 hours, cut scope or switch approach",
                  accent: "primary",
                },
                {
                  text: "Let AI write the boilerplate; spend your own time on the core logic",
                  accent: "success",
                },
                {
                  text: "Checkpoint every 2-3 hours: \"Can we demo right now?\" If not, fix that first",
                  accent: "volt",
                },
                {
                  text: "No new features after hour 16. Save hours 20-24 for the demo and rehearsal, unless you can do those after submitting",
                  accent: "spark",
                },
                {
                  text: "Submit everything early, then leave the code alone",
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
        </section>
      </div>
    </SectionTemplate>
  );
}

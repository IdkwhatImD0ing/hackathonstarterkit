import type { Metadata } from "next";
import {
  Zap,
  Wrench,
  Target,
  Timer,
  Bot,
  Code,
  Paintbrush,
  MessageSquare,
  Rocket,
  Quote,
  ArrowRight,
  Scissors,
  Hammer,
  GitBranch,
  Server,
  Layout,
  Boxes,
  Radio,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Sparkles,
  Package,
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

const section = PLAYBOOK_SECTIONS[3];

export const metadata: Metadata = {
  title: "Hackathon Execution — Best Tech Stack, Time Management & MVP Strategy",
  description:
    "Master hackathon execution: choose the best tech stack, manage your time effectively, build an MVP that impresses judges, and coordinate your team. Includes timeline simulator.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://thehackathonplaybook.dev"}/playbook/execution`,
  },
  openGraph: {
    title: "Hackathon Execution: Best Tech Stack & MVP Strategy",
    description:
      "Time management, tech stack selection, MVP strategy, and team coordination for hackathons. From the 36-win playbook.",
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
              Allocate hours across each phase and get real-time feedback. Feel
              the tradeoffs of a fixed time budget.
            </p>
          </div>
          <KeyTakeaway>Drag hours between phases to see why every minute added to one phase steals from another.</KeyTakeaway>
          <TimelineSimulator />
        </section>

        {/* ============================================================
            THE SPEED MINDSET
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Speed Mindset"
            subtitle="Hackathons are time-limited. Anything that can be sped up, should be. The edge comes from eliminating what slows you down, not from working harder."
          />

          <KeyTakeaway>Win by subtracting: cut everything that doesn&apos;t make the demo better.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            The big shift: engineers are moving from{" "}
            <span className="font-display font-semibold text-volt">
              code creation
            </span>{" "}
            to{" "}
            <span className="font-display font-semibold text-spark">
              code curation
            </span>
            . You guide AI tools instead of writing everything yourself. At most
            hackathons, AI generates the boilerplate; you modify and optimize it
            to fit your project.
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
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
                  Do Less, Do It Faster
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Cut, skip, ship the core flow first.</span>{" "}
                  Every minute that doesn&apos;t improve the demo is wasted.
                  Speed comes from subtraction.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    If a feature takes more than 2 hours, question whether it
                    belongs in the demo at all.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Wrench className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    LEVERAGE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Let Tools Do the Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Tools are force multipliers.</span>{" "}
                  AI editors, generative UI, managed services, and templates
                  generate boilerplate. Save human effort for vision, design,
                  and core logic.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    The fastest-shipping engineer isn&apos;t the fastest
                    typist, but the best curator of tools.
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
                  <span className="font-semibold text-foreground">Build a proof of concept, not a product.</span>{" "}
                  It tells a story in 3 minutes. Every decision passes one test:
                  &ldquo;Does this make the demo better?&rdquo;
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Polish the happy path. Ignore the edge cases. Judges will
                    never see them.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                <Timer className="size-5 text-volt" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold">
                  Parkinson&apos;s Law
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;Work expands so as to fill the time available for its
                  completion.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Parkinson%27s_law" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Cyril Northcote Parkinson, 1955</a>. Tighter deadlines sharpen
                  output. Timebox to create urgency inside the hackathon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE AI-POWERED WORKFLOW
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The AI-Powered Workflow"
            subtitle="AI generates the boilerplate; you modify and optimize it to fit the project. Three tools do the heavy lifting."
          />

          <KeyTakeaway>Let AI write the first draft, then curate it: Cursor, v0, and Claude Artifacts save tens of hours per event.</KeyTakeaway>

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
                  A VS Code fork that uses your whole codebase as a knowledge
                  base.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Context-aware generation</span> that beats Copilot by indexing the whole project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Inline edits</span> with Command+K to refine, not regenerate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Multi-line predictions</span> that read your intent</span>
                  </li>
                </ul>
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="animate-shimmer font-display text-lg font-bold">
                    Edit, don&apos;t create
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    from code creation to code curation
                  </p>
                </div>
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
                  Generative UI that outputs React powered by shadcn/ui and
                  Tailwind CSS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Full React components</span> from a natural-language prompt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">npm-installable</span> output you drop straight into your project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Next.js, shadcn, Tailwind</span> already, so zero translation</span>
                  </li>
                </ul>
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-lg font-bold text-spark">
                    Instant UI
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    describe it, install it, ship it
                  </p>
                </div>
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
                  Chat-based code generation with live previews and interaction
                  history.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span><span className="font-semibold text-foreground">Live previews</span> in one tab that show results instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span><span className="font-semibold text-foreground">Fast debugging</span> of teammates&apos; code mid-hackathon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span><span className="font-semibold text-foreground">Full history</span> so you can retrace your steps</span>
                  </li>
                </ul>
                <div className="rounded-lg bg-primary/5 p-3 text-center">
                  <p className="font-display text-lg font-bold text-primary">
                    Tens of hours
                  </p>
                  <p className="font-code text-xs text-primary/70">
                    saved at each hackathon
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-volt/20 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                  <Cpu className="size-4 text-volt" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold">
                    Andrej Karpathy
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    &ldquo;The hottest new programming language is
                    English.&rdquo;
                  </p>
                  <p className="font-code text-xs text-muted-foreground">
                    <a href="https://twitter.com/karpathy/status/1617979122625712128" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Former Tesla AI lead, OpenAI founding member</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-spark/20 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-spark/10">
                  <Sparkles className="size-4 text-spark" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold">
                    Thomas Dohmke
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    &ldquo;AI coding is here to stay. It&apos;s a new way for
                    developers to express their creativity.&rdquo;
                  </p>
                  <p className="font-code text-xs text-muted-foreground">
                    <a href="https://github.blog/news-insights/product-news/github-copilot-x-the-ai-powered-developer-experience/" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">CEO of GitHub</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE SCIENCE (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <Disclosure
            title="Why This Works: The Science of Constrained Execution"
            subtitle="Optional theory: the principles behind moving fast, refined by decades of engineering and entrepreneurship research."
            badge="Optional: the science"
            accent="primary"
          >
            <KeyTakeaway>Ship a working flow first, cut the 80% that won&apos;t sway judges, and polish only what they&apos;ll see.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Code className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    KENT BECK
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Make It Work, Make It Right, Make It Fast
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Make it work, make it right, make it fast.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  <span className="font-semibold text-foreground">Order matters.</span>{" "}
                  Get the flow working end-to-end, however ugly. Refactor only
                  what the demo needs. Most teams never pass step one in 24
                  hours, and that&apos;s fine.
                </p>
                <p className="font-code text-xs text-volt/60">
                  —{" "}
                  <a href="https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Kent Beck, creator of XP and TDD</a>
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
                    REID HOFFMAN
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Ship Embarrassingly Early
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;If you aren&apos;t embarrassed by the first version of
                  your product, you shipped too late.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  <span className="font-semibold text-foreground">Ship to learn, not to cut corners.</span>{" "}
                  Move fast, test assumptions. A too-polished demo usually means
                  too long building and too little refining the story.
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://www.linkedin.com/pulse/arent-embarrassed-first-version-your-product-you-reid-hoffman/" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Reid Hoffman, co-founder of LinkedIn</a>
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
                  &ldquo;80% of consequences come from 20% of causes.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  <span className="font-semibold text-foreground">80% of demo impact comes from 20% of features.</span>{" "}
                  One sharp &ldquo;pointy feature&rdquo; that solves one problem
                  well beats a broad platform with ten half-built ones.
                </p>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Pareto_principle" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Vilfredo Pareto, 1906 / Joseph Juran</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Scissors className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    ELON MUSK
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  The 5-Step Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Adapted from SpaceX engineering. Apply in order:
                </p>
                <ol className="space-y-2 font-body text-sm text-foreground/80">
                  {[
                    {
                      step: "Make requirements less dumb",
                      desc: "Question everything, especially from 'smart' people",
                    },
                    {
                      step: "Delete the part or process",
                      desc: "If you're not adding things back, you're not cutting enough",
                    },
                    {
                      step: "Simplify or optimize",
                      desc: "Only after deleting, since you shouldn't optimize what shouldn't exist",
                    },
                    {
                      step: "Accelerate cycle time",
                      desc: "Speed up only after simplification",
                    },
                    {
                      step: "Automate",
                      desc: "Automate last, and never automate a broken process",
                    },
                  ].map((item, i) => (
                    <li key={item.step} className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success/10 font-code text-xs text-success">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-display font-semibold text-foreground">
                          {item.step}
                        </span>
                        <span className="text-foreground/60">
                          {": "}
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="font-code text-xs text-success/60">
                  —{" "}
                  <a href="https://www.youtube.com/watch?v=t705r8ICkRw" target="_blank" rel="noopener noreferrer" className="underline decoration-success/30 hover:decoration-success">Elon Musk, SpaceX Starbase</a>
                </p>
              </CardContent>
            </Card>
          </div>
          </Disclosure>
        </section>

        {/* ============================================================
            SCOPE HAMMERING
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Scope Hammering"
            subtitle="Fixed time, variable scope. You cut features until what's left fits. This discipline separates shipping teams from unfinished messes."
          />

          <KeyTakeaway>Time is non-negotiable, so scope is what you cut: build the vital 20%, kill the comfortable 80%.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            <a href="https://basecamp.com/shapeup" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Ryan Singer&apos;s Shape Up methodology</a> from Basecamp defines{" "}
            <span className="font-display font-semibold text-foreground">
              scope hammering
            </span>{" "}
            as &ldquo;forcefully questioning a design, implementation, or use
            case to cut scope and finish inside the fixed time box.&rdquo; Time
            is the one thing you can&apos;t negotiate. Scope is what you cut.
          </p>

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
                  The features that make judges say &ldquo;wow.&rdquo; Everything
                  else is noise.
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
                    <span><span className="font-semibold text-foreground">One killer demo moment</span> that shows the vision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Polished happy-path UI</span>, because first impressions matter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">The 20%</span> that carries 80% of the impact</span>
                  </li>
                </ul>
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-volt">
                    Ship this
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    the core that tells the story
                  </p>
                </div>
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
                  Features that feel important but won&apos;t change the
                  judge&apos;s decision. Kill them.
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
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-spark">
                    Kill this
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    it won&apos;t change the outcome
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-success/20 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/10">
                  <Package className="size-4 text-success" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold">
                    <a href="https://en.wikipedia.org/wiki/Sheryl_Sandberg" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Sheryl Sandberg</a> / Facebook
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    &ldquo;Done is better than perfect.&rdquo;
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-primary/20 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Hammer className="size-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold">
                    Jason Fried / <a href="https://basecamp.com/gettingreal" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Getting Real</a>
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    &ldquo;Build less. Underdo your competition. Fewer features,
                    fewer options, fewer meetings, fewer promises.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE HACKATHON TIMELINE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Hackathon Timeline"
            subtitle="A battle-tested breakdown of how to allocate 24 hours. Adapt the ratios for 36- or 48-hour events, but keep the structure."
          />

          <KeyTakeaway>Get a working flow by hour 4, stop building by hour 16, and spend the last 4 hours on demo and pitch.</KeyTakeaway>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Ideation and Architecture",
                time: "Hour 0-2",
                description:
                  "Finalize the idea, assign roles, and sketch the architecture. Set up the repo with a boilerplate and deploy to staging so you can demo 'hello world' within the first hour.",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Core Pipeline",
                time: "Hour 2-4",
                description:
                  "Get the end-to-end flow working. Ugly is fine: hardcode values, skip error handling, duct-tape it together. Prove the concept before investing more time.",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Build Sprint",
                time: "Hour 4-16",
                description:
                  "Heads-down feature work in timeboxed 2-3 hour blocks. After each block, ask 'Can we demo right now?' Cut any feature that runs long. Sleep in shifts; exhaustion kills productivity faster than lost hours.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Integration and Polish",
                time: "Hour 16-20",
                description:
                  "Connect the pieces. Fix critical bugs only and polish the happy-path UI judges will see. No new features. If it's not working by hour 16, it won't.",
                accent: "success" as const,
              },
              {
                step: 5,
                title: "Demo Prep",
                time: "Hour 20-22",
                description:
                  "Record the demo video, build the deck, and prep Q&A appendix slides. This is the highest-ROI activity of the hackathon: a polished pitch with a working demo beats a perfect codebase with a bad presentation. Tight on build hours? The demo video can usually slide into the post-submission buffer before judging; see the submission playbook for the timing trick.",
                accent: "volt" as const,
              },
              {
                step: 6,
                title: "Rehearse and Submit",
                time: "Hour 22-24",
                description:
                  "Practice the pitch 3+ times and time it. Submit every deliverable early (Devpost, video, repo) and make no changes after. Use the rest to rest and prep mentally for judging.",
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-volt" />
                <p className="font-body text-sm text-muted-foreground">
                  <span className="font-display font-semibold text-foreground">
                    Timeboxing
                  </span>{" "}
                  ranks among the most effective productivity techniques, per <a href="https://hbr.org/2018/12/how-timeboxing-works-and-why-it-will-make-you-more-productive" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Harvard Business Review</a>. Assign fixed blocks and stop
                  when time is up, done or not.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-spark" />
                <p className="font-body text-sm text-muted-foreground">
                  <a href="https://en.wikipedia.org/wiki/Brooks%27s_law" target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-foreground underline decoration-foreground/30 hover:decoration-foreground">
                    Brooks&apos;s Law
                  </a>{" "}
                  says &ldquo;adding manpower to a late software project makes it
                  later.&rdquo; When you&apos;re behind, cut features instead of
                  adding scope or people.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE LEVERAGE TOOLKIT
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Leverage Toolkit"
            subtitle="Tools and techniques that multiply output without multiplying hours. Save human effort for what only humans can do."
          />

          <KeyTakeaway>The fastest code is code you didn&apos;t write: lean on starters, libraries, managed services, and one-click deploys.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Boxes,
                title: "Boilerplate Repos",
                description:
                  "Pre-built starters (Next.js, Flask, Express) skip the first 2 hours of setup. Have your go-to stack ready before the event.",
                accent: "volt" as const,
              },
              {
                icon: Layout,
                title: "Component Libraries",
                description:
                  "Use shadcn/ui, Radix, or Material UI instead of building primitives. Import, customize, ship. The fastest code is code you didn't write.",
                accent: "spark" as const,
              },
              {
                icon: Server,
                title: "Deployment Pipeline",
                description:
                  "One-click deploy on Vercel or Netlify. Set up CI in hour one so you can always demo a live URL. Never demo from localhost.",
                accent: "primary" as const,
              },
              {
                icon: Radio,
                title: "API-First Approach",
                description:
                  "Use managed services (Supabase, Firebase, Auth0) instead of building infrastructure. Let them handle auth, storage, and databases.",
                accent: "success" as const,
              },
              {
                icon: GitBranch,
                title: "Version Control Discipline",
                description:
                  "Commit often, branch per feature, never break main. A broken main at hour 20 is hackathon-ending.",
                accent: "volt" as const,
              },
              {
                icon: MessageSquare,
                title: "Communication Shortcuts",
                description:
                  "Shared Figma, standups every 2-3 hours, one Slack/Discord channel. Over-communication beats under-communication at 3AM.",
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

          <div className="animate-glow-pulse glass rounded-xl border border-spark/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-spark/10">
                <Sparkles className="size-5 text-spark" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold">
                  <a href="https://www.navalmanack.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Naval Ravikant</a> — AngelList Co-founder
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;Code and media are permissionless leverage. They&apos;re
                  the leverage behind the newly rich. You can create software
                  and media that works for you while you sleep.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Use leverage (templates, AI, APIs, no-code) and reserve human
                  effort for vision, design, and high-impact decisions.
                </p>
              </div>
            </div>
          </div>
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
                <a href="https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Kent Beck, creator of Extreme Programming</a>
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    In a 24-48 hour sprint, most teams never get past &ldquo;make
                    it work.&rdquo; That&apos;s fine.
                  </span>{" "}
                  A working demo with a clear story beats a half-finished
                  masterpiece. Winners don&apos;t have the cleanest code; they
                  shipped something that works and told a compelling story.
                </p>
                <p className="font-body text-foreground/80">
                  The engineer&apos;s role is shifting. You&apos;re measured by
                  the experience you deliver, not lines of code. Use every tool,
                  template, and AI assistant. Curate, don&apos;t create from
                  scratch. Ship, then polish.
                </p>
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    The fastest path to first place is the shortest path to a
                    working demo.
                  </span>
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
            subtitle="A step-by-step summary for shipping under extreme time pressure. Follow this and you'll never be the team scrambling at the last minute."
          />

          <KeyTakeaway>Deploy early, ship a working flow first, timebox everything, and stop building 4 hours before submission.</KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Set up repo, boilerplate, and deploy pipeline in hour one. Never demo from localhost",
                  accent: "volt",
                },
                {
                  text: "Get the end-to-end flow working before adding features. Ugly is fine; broken is not",
                  accent: "spark",
                },
                {
                  text: "Timebox every task. Past 2 hours, cut scope or switch approach",
                  accent: "primary",
                },
                {
                  text: "Use AI for boilerplate. Save human effort for core logic, design, and integration",
                  accent: "success",
                },
                {
                  text: "Checkpoint every 2-3 hours: \"Can we demo right now?\" If not, fix that first",
                  accent: "volt",
                },
                {
                  text: "Stop building 4 hours out. Polish UI, record the demo video, and rehearse the pitch",
                  accent: "spark",
                },
                {
                  text: "\"Done is better than perfect.\" Ship what works, cut what doesn't, sell the vision",
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
              The goal isn&apos;t the best software, it&apos;s the best demo.
              Build less, leverage more, and always be ready to show what
              you&apos;ve got.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

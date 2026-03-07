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

const section = PLAYBOOK_SECTIONS[3];

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

export default function ExecutionPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            THE SPEED MINDSET
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Speed Mindset"
            subtitle="Hackathons are time-limited events. Anything that can be sped up, should be sped up. The winning edge isn't working harder  -  it's eliminating everything that slows you down."
          />

          <p className="font-body text-foreground/80">
            Here&apos;s the big shift: software engineers are transitioning from{" "}
            <span className="font-display font-semibold text-volt">
              code creation
            </span>{" "}
            to{" "}
            <span className="font-display font-semibold text-spark">
              code curation
            </span>
            . We&apos;re no longer just writing code  -  we&apos;re guiding AI
            tools to build it smarter and faster. At most hackathons, AI
            generates the boilerplate. From there, you modify and optimize it to
            fit your project.
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
                  Every minute spent on something that doesn&apos;t improve the
                  demo is a minute wasted. Cut features, skip polish, and get the
                  core flow working first. Speed comes from subtraction, not
                  addition.
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
                  AI code editors, generative UI tools, managed services, and
                  pre-built templates are your force multipliers. Use them to
                  generate boilerplate, then focus human effort on what only
                  humans can do: vision, design, and core logic.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    The engineer who ships fastest isn&apos;t the fastest typist
                     -  they&apos;re the best curator of tools.
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
                  You&apos;re not building a production app. You&apos;re
                  building a working proof of concept that tells a story in 3
                  minutes. Every decision should pass one test: &ldquo;Does this
                  make the demo better?&rdquo;
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
                   -  Cyril Northcote Parkinson, 1955. The tighter the deadline,
                  the more focused the output. Use timeboxing to create
                  artificial urgency within the hackathon itself.
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
            subtitle="I don't write all my code at hackathons. AI generates the boilerplate. I modify and optimize it to fit the project. Here are the three tools that have massively boosted the workflow."
          />

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
                  A fork of VS Code that uses your entire codebase as a
                  knowledge base.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Context-aware code generation  -  far better than GitHub
                    Copilot because it indexes the whole project
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Inline edits with Command+K  -  editing your code rather than
                    generating from scratch
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Multi-line cursor predictions that understand your intent
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
                  A generative UI system that outputs React code powered by
                  shadcn/ui and Tailwind CSS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Generates full React components from natural language
                    descriptions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Outputs npm-installable components you can drop directly into
                    your project
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Already uses Next.js, shadcn, and Tailwind  -  zero
                    translation needed
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
                    Live code previews in an easy-to-navigate tab  -  see results
                    instantly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    A game changer for debugging and understanding
                    teammates&apos; code mid-hackathon
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    Full interaction history so you can retrace your steps
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
                    Former Tesla AI lead, OpenAI founding member
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
                    CEO of GitHub
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHY THIS WORKS  -  THE SCIENCE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Why This Works  -  The Science of Constrained Execution"
            subtitle="The best hackathon teams don't just move fast  -  they follow principles refined by decades of engineering and entrepreneurship research."
          />

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
                  The creator of Extreme Programming laid out the order that
                  matters. First get the flow working end-to-end  -  even if
                  it&apos;s ugly. Then refactor only what&apos;s needed for the
                  demo. In 24 hours, most teams never get past step one  -  and
                  that&apos;s fine.
                </p>
                <p className="font-code text-xs text-volt/60">
                   -  Kent Beck, creator of XP and TDD
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
                  The LinkedIn co-founder didn&apos;t mean &ldquo;cut corners
                  recklessly.&rdquo; He meant: ship quickly so you can test
                  assumptions and learn. If your hackathon demo feels polished,
                  you likely spent too long building and not enough time
                  refining the story.
                </p>
                <p className="font-code text-xs text-spark/60">
                   -  Reid Hoffman, co-founder of LinkedIn
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
                  Vilfredo Pareto&apos;s observation applies perfectly to
                  hackathons: 80% of your demo&apos;s impact comes from 20% of
                  its features. One sharp &ldquo;pointy feature&rdquo; that
                  solves one problem very well beats a broad platform with ten
                  half-built features.
                </p>
                <p className="font-code text-xs text-primary/60">
                   -  Vilfredo Pareto, 1906 / Joseph Juran
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
                  From SpaceX engineering  -  applied in order:
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
                      desc: "Only after deleting  -  don't optimize what shouldn't exist",
                    },
                    {
                      step: "Accelerate cycle time",
                      desc: "Speed up only after simplification",
                    },
                    {
                      step: "Automate",
                      desc: "Automate last  -  never automate a broken process",
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
                          {" "}
                           -  {item.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="font-code text-xs text-success/60">
                   -  Elon Musk, SpaceX Starbase
                </p>
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
            subtitle="Fixed time, variable scope. You don't extend the hackathon  -  you cut features until what's left fits. This is the discipline that separates shipping teams from unfinished messes."
          />

          <p className="font-body text-foreground/80">
            Ryan Singer&apos;s Shape Up methodology from Basecamp defines{" "}
            <span className="font-display font-semibold text-foreground">
              scope hammering
            </span>{" "}
            as &ldquo;forcefully questioning a design, implementation, or use
            case to cut scope and finish inside the fixed time box.&rdquo; In a
            hackathon, time is the one thing you can&apos;t negotiate. Scope is
            what you cut.
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
                    One core user flow  -  end to end, fully working
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    One killer demo moment that shows the vision
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Polished UI on the happy path  -  first impressions matter
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    The 20% of features that carry 80% of the impact
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
                    Auth and login flows  -  hardcode a user, skip the signup
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Admin panels, settings pages, user profiles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Edge cases, error handling, input validation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Database migrations, multiple user types, permissions
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
                    Sheryl Sandberg / Facebook
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
                    Jason Fried / Getting Real
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

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Ideation and Architecture",
                time: "Hour 0-2",
                description:
                  "Finalize the idea, assign roles, sketch the architecture on a whiteboard, and set up the repo with a boilerplate. Deploy to staging immediately  -  you should be able to demo 'hello world' within the first hour.",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Core Pipeline",
                time: "Hour 2-4",
                description:
                  "Get the end-to-end flow working. Ugly is fine. Hardcode values, skip error handling, wire everything together with duct tape. The goal: prove the concept works before investing more time.",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Build Sprint",
                time: "Hour 4-16",
                description:
                  "Heads-down feature work in timeboxed 2-3 hour blocks. Checkpoint after each block: 'Can we demo right now?' If a feature is taking too long, cut it. Sleep in shifts if you can  -  exhaustion kills productivity faster than lost hours.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Integration and Polish",
                time: "Hour 16-20",
                description:
                  "Connect all the pieces. Fix critical bugs only. Polish the happy path UI  -  this is what judges will see. Don't start new features. If it's not working by hour 16, it's not going to work.",
                accent: "success" as const,
              },
              {
                step: 5,
                title: "Demo Prep",
                time: "Hour 20-22",
                description:
                  "Record the demo video. Build the pitch deck. Prep appendix slides for Q&A. This is not optional  -  it's the highest-ROI activity of the entire hackathon. A polished pitch with a working demo beats a perfect codebase with a bad presentation.",
                accent: "volt" as const,
              },
              {
                step: 6,
                title: "Rehearse and Submit",
                time: "Hour 22-24",
                description:
                  "Practice the pitch 3+ times. Time it. Submit all deliverables early  -  Devpost, video, repo. Don't make changes after submission. Use remaining time to rest and prepare mentally for judging.",
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
                   -  Harvard Business Review ranks it among the most effective
                  productivity techniques. Assign fixed time blocks and stop when
                  time is up, regardless of completion.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-spark" />
                <p className="font-body text-sm text-muted-foreground">
                  <span className="font-display font-semibold text-foreground">
                    Brooks&apos;s Law
                  </span>{" "}
                   -  &ldquo;Adding manpower to a late software project makes it
                  later.&rdquo; When you&apos;re behind, resist adding scope or
                  people. Cut features instead.
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
            subtitle="Tools and techniques that multiply your output without multiplying your hours. Focus human effort on what only humans can do."
          />

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Boxes,
                title: "Boilerplate Repos",
                description:
                  "Pre-built starters (Next.js, Flask, Express) so you skip the first 2 hours of setup. Have your go-to stack ready before the hackathon starts.",
                accent: "volt" as const,
              },
              {
                icon: Layout,
                title: "Component Libraries",
                description:
                  "shadcn/ui, Radix, Material UI  -  don't build UI primitives from scratch. Import, customize, ship. The fastest code is code you didn't write.",
                accent: "spark" as const,
              },
              {
                icon: Server,
                title: "Deployment Pipeline",
                description:
                  "Vercel or Netlify one-click deploy. Set up CI in the first hour so you can always demo a live URL. Never rely on localhost for judging.",
                accent: "primary" as const,
              },
              {
                icon: Radio,
                title: "API-First Approach",
                description:
                  "Use managed services  -  Supabase, Firebase, Auth0  -  instead of building infrastructure. Let someone else handle auth, storage, and databases.",
                accent: "success" as const,
              },
              {
                icon: GitBranch,
                title: "Version Control Discipline",
                description:
                  "Commit often, branch per feature, never break main. A broken main branch at hour 20 is a hackathon-ending disaster.",
                accent: "volt" as const,
              },
              {
                icon: MessageSquare,
                title: "Communication Shortcuts",
                description:
                  "Shared Figma for design, quick standups every 2-3 hours, one Slack/Discord channel. Over-communication beats under-communication at 3AM.",
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
                  Naval Ravikant  -  AngelList Co-founder
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;Code and media are permissionless leverage. They&apos;re
                  the leverage behind the newly rich. You can create software
                  and media that works for you while you sleep.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Use leverage: templates, AI, APIs, no-code where it fits.
                  Focus human effort on what only humans can do  -  vision,
                  design, and high-impact decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            GOLDEN RULE  -  EXECUTION QUOTE
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
                 -  Kent Beck, creator of Extreme Programming
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    In a 24-48 hour sprint, most teams never get past &ldquo;make
                    it work&rdquo;  -  and that&apos;s perfectly fine.
                  </span>{" "}
                  A working demo that tells a clear story beats a half-finished
                  masterpiece every time. The teams that win aren&apos;t the ones
                  with the cleanest code  -  they&apos;re the ones who shipped
                  something that works and told a compelling story about it.
                </p>
                <p className="font-body text-foreground/80">
                  The role of a hackathon engineer is evolving. You&apos;re no
                  longer measured by lines of code written  -  you&apos;re measured
                  by the quality of the experience you deliver. Use every tool,
                  template, and AI assistant at your disposal. Curate, don&apos;t
                  create from scratch. Ship, then polish.
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

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Set up repo, boilerplate, and deploy pipeline in the first hour  -  never demo from localhost",
                  accent: "volt",
                },
                {
                  text: "Get end-to-end flow working before adding any features  -  ugly is fine, broken is not",
                  accent: "spark",
                },
                {
                  text: "Timebox every task  -  if it takes more than 2 hours, cut scope or switch approach",
                  accent: "primary",
                },
                {
                  text: "Use AI tools for boilerplate  -  focus human effort on core logic, design, and integration",
                  accent: "success",
                },
                {
                  text: "Checkpoint every 2-3 hours: \"Can we demo right now?\" If not, fix that before building more",
                  accent: "volt",
                },
                {
                  text: "Stop building 4 hours before submission  -  polish UI, record demo video, rehearse pitch",
                  accent: "spark",
                },
                {
                  text: "\"Done is better than perfect\"  -  ship what works, cut what doesn't, tell the story of what it could become",
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
              The goal isn&apos;t to build the best software  -  it&apos;s to
              deliver the best demo. Every minute should serve that outcome.
              Build less, leverage more, and always be ready to show what
              you&apos;ve got.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

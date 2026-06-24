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
  Globe,
  Search,
  Trophy,
  Database,
  Server,
  Package,
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
import { KeyTakeaway } from "@/components/key-takeaway";
import { GoBagAssembler } from "./go-bag-assembler";
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
  title: "Hackathon Validation — How to Validate Your Hackathon Idea Fast",
  description:
    "Validate your hackathon idea against real constraints, available APIs, and judging criteria before you start building. Includes a go-bag assembler for essential tools and templates.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://thehackathonplaybook.dev"}/playbook/validation`,
  },
  openGraph: {
    title: "How to Validate Your Hackathon Idea Fast",
    description:
      "Quick validation techniques for hackathon ideas against time constraints and judging criteria. From the 36-win playbook.",
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
            subtitle="Don't try to validate the whole idea at once. Build small, tested building blocks, just like Legos, and snap them together into a winning project."
          />

          <KeyTakeaway>
            Validate one piece at a time in isolation. Solid blocks snap together into a winning project.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            The biggest mistake teams make:{" "}
            <span className="font-display font-semibold text-foreground">
              building the entire project in one shot,
            </span>{" "}
            then discovering at hour 18 that a critical API doesn&apos;t work as
            assumed. The fix:{" "}
            <span className="font-display font-semibold text-foreground">
              validate one piece at a time, in isolation.
            </span>{" "}
            Make each block solid, and the project assembles itself.
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
                  <span className="font-semibold text-foreground">
                    One integration, one API, one flow at a time.
                  </span>{" "}
                  Can you stream a response from OpenAI? Trigger a Twilio call
                  from Python? Output text-to-speech audio in a browser?
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
                  <span className="font-semibold text-foreground">
                    Once a block works, make it reliable.
                  </span>{" "}
                  Handle the failure modes. Know the rate limits and latency. A
                  block battle-tested in a side project is one you can trust at
                  3AM.
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
                  <span className="font-semibold text-foreground">
                    Proven blocks combine fast.
                  </span>{" "}
                  OpenAI streaming + Twilio voice + a React frontend = a voice
                  AI agent. The architecture emerges from blocks you already
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
              you don&apos;t mold custom plastic at build time. You snap pre-made
              blocks together. The more blocks you test beforehand, the faster
              you build at the event.
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

          <KeyTakeaway>
            Validate tools weeks ahead in side projects. The event is for combining, not discovering broken APIs.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            The hackathon is for{" "}
            <span className="font-display font-semibold text-foreground">
              combining and creating
            </span>
            , not discovering that an API doesn&apos;t work. Every hour debugging
            a basic integration is an hour stolen from building the thing that
            wins.
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
                  Side projects and experiments are your testing ground.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        OpenAI streaming:
                      </span>{" "}
                      latency, token limits, error handling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Twilio voice:
                      </span>{" "}
                      triggering, receiving, processing audio
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Supabase:
                      </span>{" "}
                      real-time subscriptions and auth flows
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Infra:
                      </span>{" "}
                      file uploads, WebSockets, deployment pipelines
                    </span>
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
                    <span>
                      <span className="font-semibold text-foreground">
                        Combine proven blocks
                      </span>{" "}
                      and focus on the novel integration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Spike only the one NEW risky piece,
                      </span>{" "}
                      never tested before
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Skip re-validating proven tools;
                      </span>{" "}
                      trust your library
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Spend saved hours
                      </span>{" "}
                      on polish, pitch, and demo prep
                    </span>
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
              Research sponsor APIs before the event and build small experiments
              with their tools. By kickoff, you already know what works, what
              breaks, and where the free credits run out.
            </p>
          </div>
        </section>

        {/* ============================================================
            SPONSOR RECON
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Sponsor Recon"
            subtitle="Before the hackathon, research every sponsor. Visit their docs, sign up for their APIs, and run a quick validation. The teams that win sponsor prizes are the ones who showed up already knowing the tech."
          />

          <KeyTakeaway>
            Sponsor lists drop weeks early. Read the docs and validate each API before kickoff, not at 2AM.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            Sponsor lists publish weeks before the event. That&apos;s your
            window.{" "}
            <span className="font-display font-semibold text-foreground">
              Every sponsor is a prize category, free credits, and tech you
              might build on.
            </span>{" "}
            Teams that walk in cold, reading docs for the first time, are already
            behind.
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Globe className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    STEP 1
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Read the Docs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Sign up and run the quickstart.
                  </span>{" "}
                  Can you get a &ldquo;hello world&rdquo; running in 30 minutes?
                  If not, that&apos;s a red flag to learn before the event, not
                  during it.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    If the docs are bad or the API requires manual approval, plan
                    around it.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <AlertTriangle className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    STEP 2
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Check for Gotchas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Hunt the project-killers:
                  </span>{" "}
                  rate limits, approval waits, missing SDKs, deprecated
                  endpoints, pricing tiers that cap out mid-demo. Find them in
                  advance.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Run the API end-to-end in a throwaway project. Trust working
                    code, not marketing pages.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle2 className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    STEP 3
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Validate the Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Build a tiny proof-of-concept.
                  </span>{" "}
                  If it works, you have a validated Lego block for hackathon day.
                  If it fails, you dodged building on a broken foundation.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    A 30-minute test now saves 3 hours of debugging at the event.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Bonus:
              </span>{" "}
              Some judges are sponsor employees scoring how deeply you used their
              platform. Showing up already fluent in their API signals
              you&apos;re serious.
            </p>
          </div>
        </section>

        {/* ============================================================
            PICK YOUR STACK
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Pick Your Stack"
            subtitle="Lock in your tech stack before the hackathon. Your default should be tools you've used before. Only swap components when a sponsor makes it worth it."
          />

          <KeyTakeaway>
            Default to the stack you build fastest with. Only swap a component when a sponsor prize justifies it.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            The best stack isn&apos;t the most cutting-edge.{" "}
            <span className="font-display font-semibold text-foreground">
              It&apos;s the one you build fastest with.
            </span>{" "}
            Keep a battle-tested default and deviate only for a strategic reason
            (like a sponsor prize).
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Code className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    FRONTEND
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Next.js
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    App Router, React 19, TypeScript.
                  </span>{" "}
                  Server components for speed, client for interactivity. Pair
                  with shadcn/ui and Tailwind for a polished UI in minutes.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Swap when: The hackathon requires a specific framework, or
                    you&apos;re building a mobile app (use React Native or
                    Flutter).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Server className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    BACKEND
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  FastAPI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Async Python, auto OpenAPI docs,
                  </span>{" "}
                  first-class with every AI/ML library. Most AI sponsor SDKs ship
                  Python-first, so your backend should too.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Swap when: You need real-time WebSockets at scale (use Node),
                    or the project is frontend-only (use Next.js API routes).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Database className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    DATA
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Supabase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Postgres, auth, storage, real-time
                  </span>{" "}
                  in one service. The free tier covers any hackathon. Set up auth
                  in 10 minutes instead of building it from scratch.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Swap when: MongoDB is a sponsor (use MongoDB Atlas), or you
                    need a vector DB for RAG (add Pinecone or pgvector).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                The swap rule:
              </span>{" "}
              Replace a default component only if (1) you&apos;re targeting a
              sponsor prize for that tech, or (2) the project genuinely requires
              it. Never swap for trendiness. The hackathon is not the time to
              learn a new database.
            </p>
          </div>
        </section>

        {/* ============================================================
            TARGET YOUR PRIZE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Target Your Prize"
            subtitle="Before the hackathon starts, study the prize categories and pick 1-2 to aim for. This decision shapes your idea, your tech stack, and your pitch."
          />

          <KeyTakeaway>
            Pick your target prize first, then reverse-engineer the project from its description. Read it like a rubric.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            Most teams build something cool, then pick a prize at the end.
            That&apos;s backwards.{" "}
            <span className="font-display font-semibold text-foreground">
              Winning teams pick the target prize first and reverse-engineer from
              there.
            </span>{" "}
            The prize description tells you exactly what judges want. Read it like
            a rubric.
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Trophy className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    SPONSOR PRIZES
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Less Competition, More Focused
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Fewer teams submit
                  </span>{" "}
                  because sponsor prizes require specific-API research and
                  integration. If you&apos;ve already validated the tech (see
                  Sponsor Recon), you have a real edge.
                </p>
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Read the prize
                      </span>{" "}
                      like a scoring rubric
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Make the tech central
                      </span>{" "}
                      to your demo, not a side feature
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Name the sponsor
                      </span>{" "}
                      in your pitch
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Crosshair className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    BEST OVERALL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Highest Stakes, Widest Pool
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    The hardest prize to win:
                  </span>{" "}
                  every team competes for it. To win, be impressive across the
                  board: technical depth, polished UI, strong pitch, compelling
                  problem.
                </p>
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Optimize for wow factor
                      </span>{" "}
                      in the demo
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Airtight pitch:
                      </span>{" "}
                      every judge sees it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Polish matters more
                      </span>{" "}
                      than in sponsor categories
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Pro strategy:
              </span>{" "}
              Make one sponsor prize your primary and &ldquo;Best Overall&rdquo;
              your stretch. Build for the sponsor category, then polish enough to
              compete overall. Doubles your chances without splitting effort.
            </p>
          </div>
        </section>

        {/* ============================================================
            THE GO BAG
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Go Bag"
            subtitle="A curated set of pre-built, pre-validated components you bring to every hackathon. These are the Lego blocks you've already tested, ready to snap in on day one."
          />

          <KeyTakeaway>
            Bring a go bag of battle-tested scaffolds and configs so you start day one on the common infrastructure.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            Experienced teams don&apos;t start from scratch.{" "}
            <span className="font-display font-semibold text-foreground">
              They bring a go bag of reusable scaffolds, configs, and components
            </span>{" "}
            already battle-tested in side projects. It&apos;s not pre-built
            features; it&apos;s the infrastructure every project needs, already
            solved.
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Shield className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    AUTH
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Supabase Auth
                      </span>{" "}
                      with Google/GitHub OAuth pre-configured
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Protected-route middleware
                      </span>{" "}
                      to drop into any Next.js app
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Polished login/signup pages
                      </span>
                    </span>
                  </li>
                </ul>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Auth is the #1 time sink at hackathons. Never build it from
                    scratch.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Layers className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    UI
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Interface Components
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        shadcn/ui layout:
                      </span>{" "}
                      navbar, sidebar, dashboard ready to go
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Dark mode, responsive breakpoints,
                      </span>{" "}
                      consistent palette
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Loading states, error boundaries,
                      </span>{" "}
                      toasts
                    </span>
                  </li>
                </ul>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    A polished UI in the first hour makes the whole project feel
                    real.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    AI
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Agent Scaffolds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      <span className="font-semibold text-foreground">
                        OpenAI Agents SDK scaffold
                      </span>{" "}
                      with tool-calling and streaming wired up
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Prompt templates:
                      </span>{" "}
                      summarization, extraction, classification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      <span className="font-semibold text-foreground">
                        RAG pipeline:
                      </span>{" "}
                      chunking, embeddings, vector search
                    </span>
                  </li>
                </ul>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Most hackathon projects now involve AI. Have the plumbing
                    ready.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Wrench className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    INFRA
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  Deployment &amp; Config
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Vercel config
                      </span>{" "}
                      with environment variables templated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Docker Compose
                      </span>{" "}
                      for local dev with hot reload
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    <span>
                      <span className="font-semibold text-foreground">
                        .env.example
                      </span>{" "}
                      with every API key slot you use
                    </span>
                  </li>
                </ul>
                <div className="rounded-lg border border-success/10 bg-success/5 p-3">
                  <p className="font-code text-xs text-success/80">
                    Deploy in the first hour. A live URL makes everything feel
                    real to judges.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Build your go bag during side projects, not the night before.
              </span>{" "}
              Every component should be something you&apos;ve used in a real
              project. Untested means it&apos;s not a Lego block, it&apos;s an
              unknown. Keep it in a private repo and update it after every
              hackathon.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold tracking-tight">
                Assemble Your Go Bag
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Pick one tool per category to build your personal hackathon
                loadout. Click a tool, then click its slot. Or drag and drop.
              </p>
            </div>
            <GoBagAssembler />
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

          <KeyTakeaway>
            Spike the one assumption that could kill your idea before writing real code. 30-60 minutes de-risks the project.
          </KeyTakeaway>

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
                Identify the riskiest technical assumption and spike it before
                writing a single line of real code.
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
                —{" "}
                <a href="https://en.wikipedia.org/wiki/Extreme_programming" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Kent Beck, Extreme Programming</a>
              </p>

              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  The Rule
                </p>
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Every idea has one piece that could kill it.
                  </span>{" "}
                  Find it and test it first. If the spike fails, pivot before
                  investing more time. If it works, the whole project is
                  de-risked.
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
                  <a href="https://en.wikiquote.org/wiki/Richard_Feynman" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Richard Feynman</a> — Nobel Laureate in Physics
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;What I cannot create, I do not understand.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Can&apos;t build the smallest version of the riskiest piece?
                  You don&apos;t fully understand the problem yet. The spike earns
                  that understanding fast.
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
            subtitle="The Lego method goes beyond intuition. It's backed by decades of engineering and design research on how to validate fast and build with confidence."
          />

          <KeyTakeaway>
            Decades of engineering research back the Lego method: build small, test end-to-end, and learn before you commit.
          </KeyTakeaway>

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
                  Each Lego block is a mini MVP cycle: build the smallest
                  testable version, measure, learn, repeat. By the time you
                  combine them, you&apos;ve learned what matters.
                </p>
                <p className="font-code text-xs text-volt/60">
                  —{" "}
                  <a href="http://theleanstartup.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">The Lean Startup, 2011</a>
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
                  IDEO&apos;s philosophy: stop debating whether something works
                  and build it. A 30-minute prototype answers more than a 2-hour
                  whiteboard session.
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://www.ideo.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">David Kelley, IDEO founder</a>
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
                  to data. The skeleton proves your architecture. Once it walks,
                  flesh it out. Never start with the flesh.
                </p>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://wiki.c2.com/?WalkingSkeleton" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Alistair Cockburn, Agile Manifesto co-author</a>
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
                  Like tracer rounds showing where shots land, tracer code runs
                  one narrow path through all layers. Real feedback on your
                  architecture before you commit to building everything.
                </p>
                <p className="font-code text-xs text-success/60">
                  —{" "}
                  <a href="https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/" target="_blank" rel="noopener noreferrer" className="underline decoration-success/30 hover:decoration-success">The Pragmatic Programmer, 1999</a>
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

          <KeyTakeaway>
            Climb four rungs: proof of concept, walking skeleton, prototype, demo-ready MVP. A strong Lego library lets you start higher.
          </KeyTakeaway>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Proof of Concept",
                question: "Can we technically do it?",
                description:
                  "One person, 1-2 hours. Test the hardest integration, the piece most likely to kill the idea. Throwaway code is fine. You're testing feasibility, not building product.",
                time: "1-2 hours",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Walking Skeleton",
                question: "Can we connect all the pieces?",
                description:
                  "The tiniest end-to-end path through UI, logic, and data. Click a button, backend processes, result shows on screen. Not pretty, but connected.",
                time: "2-4 hours",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Prototype",
                question: "Does the flow feel right?",
                description:
                  "Clickable and interactive, showing the user journey. Test it with a teammate: can they use it without explanation? If they're confused, fix the flow before adding features.",
                time: "4-8 hours",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Demo-Ready MVP",
                question: "Can a judge use it and understand it?",
                description:
                  "A polished happy path. The core flow is smooth, the main screens are clean, and the demo tells a story. Edge cases don't matter. The golden path does.",
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
              A strong Lego library lets you start at step 2 or 3 on day one.
              Pre-validation compresses the ladder, and that&apos;s the whole
              advantage.
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

          <KeyTakeaway>
            Decide reversible (two-way door) choices in under 5 minutes. Spend your deliberation on the few you can&apos;t undo.
          </KeyTakeaway>

          <Card className="glow-hover border-spark/20">
            <CardContent className="space-y-4 pt-6">
              <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;Most decisions are two-way doors. If you make the wrong
                decision, you come back in and pick another door. But some
                decisions are one-way doors — you go in that door, you&apos;re
                not coming back.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-spark/60">
                —{" "}
                <a href="https://en.wikipedia.org/wiki/Jeff_Bezos" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Jeff Bezos, founder of Amazon</a>
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
                    <span>
                      <span className="font-semibold text-foreground">
                        Tech stack:
                      </span>{" "}
                      swap a library anytime
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Feature scope:
                      </span>{" "}
                      add or cut as you go
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        UI layout:
                      </span>{" "}
                      iterate quickly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        API choice:
                      </span>{" "}
                      test one, swap if it fails
                    </span>
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
                    <span>
                      <span className="font-semibold text-foreground">
                        Core idea:
                      </span>{" "}
                      pivoting mid-event costs hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Team composition:
                      </span>{" "}
                      roles set the trajectory
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        The problem you solve:
                      </span>{" "}
                      it shapes everything
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Prize track:
                      </span>{" "}
                      it determines your constraints
                    </span>
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
                  <span className="font-semibold text-foreground">
                    Spend 80% of your decision energy on one-way doors.
                  </span>{" "}
                  Make two-way doors in under 5 minutes. Losing teams don&apos;t
                  pick the wrong framework; they spend 2 hours debating which one
                  to use.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Reid Hoffman: &ldquo;If you aren&apos;t embarrassed by the
                    first version of your product, you shipped too late.&rdquo;
                    Perfect decisions aren&apos;t the goal. Fast, reversible
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
                —{" "}
                <a href="https://en.wikiquote.org/wiki/Richard_Feynman" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Richard Feynman, Nobel Laureate in Physics</a>
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    In hackathons, validation IS creation.
                  </span>{" "}
                  Build the smallest version of each piece. If it won&apos;t work
                  in isolation, it won&apos;t work in the full project.
                  Don&apos;t assume. Prove it with code.
                </p>
                <p className="font-body text-foreground/80">
                  Your Lego library is your competitive advantage. Every
                  pre-tested block is hours saved. While other teams debug their
                  first API call at hour 4, you&apos;re composing proven blocks
                  into something that already works.
                </p>
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    The team with the most pre-validated blocks wins because
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

          <KeyTakeaway>
            Run this list before and during every event: test early, test in isolation, and trust only proven blocks.
          </KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Build a \"Lego library\" of tested blocks during side projects",
                  accent: "volt",
                },
                {
                  text: "Research every sponsor's API and docs, and run one validation test per sponsor",
                  accent: "spark",
                },
                {
                  text: "Lock in a default stack (Next.js + FastAPI + Supabase); swap only for a sponsor prize",
                  accent: "primary",
                },
                {
                  text: "Pick your target prize and reverse-engineer the judging criteria from its description",
                  accent: "success",
                },
                {
                  text: "Pack your go bag: pre-validated auth, UI, agent scaffolds, and deployment configs",
                  accent: "volt",
                },
                {
                  text: "Spike the riskiest technical assumption first, in 30-60 minutes",
                  accent: "spark",
                },
                {
                  text: "Get a walking skeleton working in the first 2 hours, one path from UI to data",
                  accent: "primary",
                },
                {
                  text: "Validate each block in isolation before combining; never test two unknowns at once",
                  accent: "success",
                },
                {
                  text: "Make two-way door decisions in under 5 minutes; save deliberation for one-way doors",
                  accent: "volt",
                },
                {
                  text: "If the spike fails, pivot immediately instead of sinking time into a broken assumption",
                  accent: "spark",
                },
                {
                  text: "\"What I cannot create, I do not understand.\" Can't build the smallest version? Rethink the approach",
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
              Validation isn&apos;t about proving your idea is perfect. It finds
              what&apos;s broken before you&apos;re 18 hours deep with no backup
              plan. Test early, test in isolation, trust only proven blocks.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

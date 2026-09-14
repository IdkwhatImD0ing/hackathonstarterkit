import type { Metadata } from "next";
import {
  Blocks,
  FlaskConical,
  Puzzle,
  Shield,
  Combine,
  ArrowRight,
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
import { Disclosure } from "@/components/disclosure";
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
import { markdownAlternate, SITE_URL } from "@/lib/site";

const section = PLAYBOOK_SECTIONS[2];

export const metadata: Metadata = {
  title: "Hackathon Validation — How to Validate Your Hackathon Idea Fast",
  description:
    "Validate your hackathon idea against real constraints, available APIs, and judging criteria before you start building. Includes a go-bag assembler for essential tools and templates.",
  alternates: {
    canonical: `${SITE_URL}/playbook/validation`,
    types: markdownAlternate("/playbook/validation"),
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
            subtitle="Build the project out of small blocks you've each tested, the way you'd build with Legos."
          />

          <KeyTakeaway>
            Test one integration at a time, on its own, before you connect anything.
          </KeyTakeaway>

          {/* [NEEDS SPECIFIC: a time an untested API broke late in one of your hackathons (the first draft said "hour 18"). Did this happen to you or a team you saw? Which hackathon?] */}
          <p className="font-body text-foreground/80">
            Wire untested pieces together and, when something breaks, you
            can&apos;t tell which piece it was. Every block you test also goes
            into{" "}
            <span className="font-display font-semibold text-foreground">
              your Lego library,
            </span>{" "}
            so at the next hackathon it&apos;s already working.
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
                    Give each integration its own small test.
                  </span>{" "}
                  Stream a response from OpenAI. Trigger a Twilio call from
                  Python. Play text-to-speech audio in a browser.
                </p>
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
                    Once a block works, find out how it fails.
                  </span>{" "}
                  Learn its rate limits and latency, and handle the errors it
                  throws. Then it&apos;s less likely to break during the demo.
                </p>
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
                    OpenAI streaming + Twilio voice + a React frontend = a voice
                    AI agent.
                  </span>{" "}
                  When each piece already works, connecting them is the fast
                  part.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            PRE-HACKATHON VALIDATION
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Pre-Hackathon Validation"
            subtitle="What to test in side projects before a hackathon, and what's left for the weekend itself."
          />

          <KeyTakeaway>
            If you&apos;re going for a prize, test your tools in side projects in the weeks before the event.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            At the event you want to spend your hours{" "}
            <span className="font-display font-semibold text-foreground">
              combining pieces you&apos;ve already tested.
            </span>{" "}
            If you&apos;re going to learn or have fun, you can skip the prep and
            still get a lot out of the weekend: brainstorm with people you meet,
            build something on the spot, and find teammates there.
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
                  Blocks worth testing in side projects:
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
                  Your time goes to the part that&apos;s new.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Combine blocks you&apos;ve tested,
                      </span>{" "}
                      and spike only the piece you haven&apos;t (see Spike
                      Solutions below)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Spend the saved hours
                      </span>{" "}
                      on the demo and the pitch
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            SPONSOR RECON
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Sponsor Recon"
            subtitle="Sponsor lists usually go up before the event. Use that window."
          />

          <KeyTakeaway>
            If you want a sponsor prize, get that sponsor&apos;s API working before kickoff.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            <span className="font-display font-semibold text-foreground">
              Each sponsor can mean a prize category and free credits.
            </span>{" "}
            Some judges are sponsor employees scoring how deeply you used their
            platform, and they can tell when you already know it well.
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
                  You should have a &ldquo;hello world&rdquo; running within 30
                  minutes.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    If it takes longer, or the API requires manual approval,
                    plan around it.
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
                    Look for what could stop you:
                  </span>{" "}
                  rate limits, missing SDKs, deprecated endpoints, and free
                  tiers or credits that run out mid-demo. The marketing page
                  won&apos;t list them, so you find them by calling the API.
                </p>
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
                    Build a tiny proof of concept
                  </span>{" "}
                  that calls the API end to end. If it works, it goes in your
                  library for hackathon day. If it fails, you know before the
                  event starts.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            PICK YOUR STACK
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Pick Your Stack"
            subtitle="Lock in your stack before the hackathon, using tools you've already built with."
          />

          <KeyTakeaway>
            Default to the stack you build fastest with. Swap a piece only for a sponsor prize or a real project need.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            <span className="font-display font-semibold text-foreground">
              My default is Next.js, FastAPI, and Supabase.
            </span>{" "}
            If your team is faster in something else, use that instead. Just
            don&apos;t swap in a tool because it&apos;s new and trendy.
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
                  Server components for speed, client components for
                  interactivity. Add shadcn/ui and Tailwind and the UI looks
                  finished in minutes.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Swap when: the hackathon requires a specific framework, or
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
                  and direct access to Python&apos;s AI and ML libraries.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Swap when: the project is frontend-only (use Next.js API
                    routes), or you want one language across the stack (use
                    Node). FastAPI supports WebSockets, so real-time alone
                    isn&apos;t a reason to switch.
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
                  in one service. The free tier is usually enough for a weekend,
                  and auth takes about 10 minutes to set up.
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
                Learning a new tool at the event:
              </span>{" "}
              If you&apos;re trying to win, a hackathon is a bad place to learn
              a new database. If you&apos;re there to learn, it can pay off in
              other ways.
            </p>
          </div>
        </section>

        {/* ============================================================
            TARGET YOUR PRIZE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Target Your Prize"
            subtitle="If you're competing, pick 1-2 prizes before the event. That choice shapes what you build and how you pitch it."
          />

          <KeyTakeaway>
            Pick your target prize before your idea, then work backward from its description.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            If you build something cool and look for a prize at the end,
            you&apos;re fitting the project to a category it wasn&apos;t built
            for. The prize description is{" "}
            <span className="font-display font-semibold text-foreground">
              the closest thing you&apos;ll get to the judges&apos; rubric
            </span>
            , so read it like one.
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
                {/* [CONFIRM: "fewer teams submit" to sponsor prizes is unsourced. Is that what you've seen? If so, a sponsor win of yours (e.g. AdaptED, 1st Place Google at LA Hacks 2024) could show it.] */}
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Fewer teams go for them,
                  </span>{" "}
                  because they need a specific sponsor&apos;s API. If
                  you&apos;ve already got that API working (see Sponsor Recon),
                  you start ahead.
                </p>
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Make the sponsor&apos;s tech central
                      </span>{" "}
                      to your demo
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
                    The hardest prize to win,
                  </span>{" "}
                  because every team is in the running. You need technical
                  depth, a polished UI, a strong pitch, and a compelling
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
                </ul>
                {/* [NEEDS SPECIFIC: did you target the Intel prize on purpose at Berkeley? If so, say so in a sentence. If not, this example only shows that both can be won.] */}
                <p className="font-body text-sm text-foreground/80">
                  One project can take both kinds of prize. Dispatch AI won the
                  Grand Prize at the UC Berkeley AI Hackathon 2024 and Best Use
                  of Intel AI.
                </p>
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
              compete overall.
            </p>
          </div>
        </section>

        {/* ============================================================
            THE GO BAG
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Go Bag"
            subtitle="The scaffolds and configs you've already tested, kept in one place and brought to every hackathon."
          />

          <KeyTakeaway>
            Keep auth, UI, AI scaffolds, and deploy config in a private repo so you don&apos;t rebuild them at the event.
          </KeyTakeaway>

          {/* [NEEDS SPECIFIC: what's actually in your own go bag, and which hackathon made you start one?] */}
          <p className="font-body text-foreground/80">
            Fill it from your side projects, and{" "}
            <span className="font-display font-semibold text-foreground">
              only with things you&apos;ve used in a real project.
            </span>{" "}
            Add to it after each hackathon. It only covers setup; you still
            build the features at the event.
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
                    Don&apos;t build auth from scratch at a hackathon. It takes
                    hours, and Supabase Auth takes about 10 minutes.
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
                    Deploy in the first hour. A live URL makes the project feel
                    real to judges.
                  </p>
                </div>
              </CardContent>
            </Card>
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
            subtitle="From Kent Beck's Extreme Programming Explained (1999): a small, throwaway experiment to test a risky technical assumption before committing to a full implementation."
          />

          <KeyTakeaway>
            Before writing real code, spend 30-60 minutes testing the one assumption most likely to kill the idea.
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
                What a Spike Looks Like
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;A spike solution is a very simple program to explore
                potential solutions. &hellip; Most spikes are not good enough
                to keep, so expect to throw it away.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-volt/60">
                —{" "}
                <a href="http://www.extremeprogramming.org/rules/spike.html" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Don Wells, Extreme Programming: A Gentle Introduction, extremeprogramming.org</a>
              </p>

              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  The Rule
                </p>
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    If the spike fails, change the plan
                  </span>{" "}
                  before you sink more time into it. If it works, the biggest
                  risk is gone.
                </p>
              </div>

              {/* [NEEDS SPECIFIC: were the first two spikes (GPT-4 triaging 911 calls, Twilio audio to an LLM) from Dispatch AI? If so, tell it in first person with the hackathon.] */}
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
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE SCIENCE (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <Disclosure
            title="Why This Works: The Science of Rapid Validation"
            subtitle="Optional: the engineering and design ideas this page borrows from."
            badge="Optional: the science"
            accent="primary"
          >
            <KeyTakeaway>
              IDEO in design and Alistair Cockburn in software both find out whether something works by building a tiny version of it early.
            </KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  My rule of thumb: a 30-minute prototype answers more than a
                  2-hour whiteboard session.
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://ixdf.org/literature/article/design-thinking-get-started-with-prototyping" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">A saying at IDEO, quoted by the Interaction Design Foundation, Design Thinking: Get Started with Prototyping</a>
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
                  &ldquo;A Walking Skeleton is a tiny implementation of the
                  system that performs a small end-to-end function. It need not
                  use the final architecture, but it should link together the
                  main architectural components.&rdquo;
                </blockquote>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://wiki.c2.com/?WalkingSkeleton" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Alistair Cockburn, Agile Manifesto co-author, Crystal Clear, 2004</a>
                </p>
                <p className="font-body text-sm text-foreground/60">
                  Step 2 of the Validation Ladder below is built on this.
                </p>
              </CardContent>
            </Card>
          </div>
          </Disclosure>
        </section>

        {/* ============================================================
            THE VALIDATION LADDER
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Validation Ladder"
            subtitle="Four stages, from 'can we technically do it?' to 'can a judge use it and understand it?'"
          />

          <KeyTakeaway>
            With tested blocks from side projects, you can start day one at step 2 or 3.
          </KeyTakeaway>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Proof of Concept",
                question: "Can we technically do it?",
                description:
                  "One person runs the spikes from Spike Solutions above. Throwaway code is fine.",
                time: "1-2 hours",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Walking Skeleton",
                question: "Can we connect all the pieces?",
                description:
                  "The smallest end-to-end path: click a button, the backend processes it, the result shows on screen. It doesn't have to look good.",
                time: "2-4 hours",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Prototype",
                question: "Does the flow feel right?",
                description:
                  "Clickable, with the whole user journey. Hand it to a teammate without explaining anything. If they get confused, fix the flow before adding features.",
                time: "4-8 hours",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Demo-Ready MVP",
                question: "Can a judge use it and understand it?",
                description:
                  "Polish only the path you'll demo, until the core flow runs smoothly and the main screens look clean. Edge cases can wait.",
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
        </section>

        {/* ============================================================
            TWO-WAY DOOR DECISIONS
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Two-Way Door Decisions"
            subtitle="Sort each decision by whether you can undo it. Most of what you decide at a hackathon, you can."
          />

          <KeyTakeaway>
            Decide reversible (two-way door) choices in under 5 minutes. Spend your deliberation on the few you can&apos;t undo.
          </KeyTakeaway>

          <Card className="glow-hover border-spark/20">
            <CardContent className="space-y-4 pt-6">
              <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;Some decisions are consequential and irreversible or
                nearly irreversible &ndash; one-way doors &ndash; and these
                decisions must be made methodically, carefully, slowly, with
                great deliberation and consultation. &hellip; But most decisions
                aren&apos;t like that &ndash; they are changeable, reversible
                &ndash; they&apos;re two-way doors.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-spark/60">
                —{" "}
                <a href="https://www.aboutamazon.com/about-us/shareholder-letters" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Jeff Bezos, founder of Amazon, 2015 Letter to Shareholders</a>
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
                      roles are hard to change once you start
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        The problem you solve:
                      </span>{" "}
                      everything else depends on it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Prize track:
                      </span>{" "}
                      it sets your constraints
                    </span>
                  </li>
                </ul>
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
                {/* [NEEDS SPECIFIC: the 2-hour framework debate. Have you watched a team do this? Which hackathon?] */}
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Spend 80% of your decision energy on one-way doors.
                  </span>{" "}
                  A slightly wrong framework costs you less than 2 hours spent
                  debating which one to use.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            VALIDATION CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Validation Checklist"
            subtitle="The whole page, as one list."
          />

          <KeyTakeaway>
            If you&apos;re competing, do the first five in the weeks before the event and the rest once it starts.
          </KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Build a library of tested blocks during side projects",
                  accent: "volt",
                },
                {
                  text: "Read each sponsor's docs and run one test per sponsor API",
                  accent: "spark",
                },
                {
                  text: "Lock in a default stack (Next.js + FastAPI + Supabase); swap only for a sponsor prize or a real need",
                  accent: "primary",
                },
                {
                  text: "Pick your target prize and read its description like a rubric",
                  accent: "success",
                },
                {
                  text: "Pack your go bag: the auth, UI, agent scaffolds, and deploy config you've already tested",
                  accent: "volt",
                },
                {
                  text: "Spike the riskiest technical assumption first, in 30-60 minutes. If it fails, change the plan",
                  accent: "spark",
                },
                {
                  text: "Get a walking skeleton working in the first 2-4 hours, one path from UI to data",
                  accent: "primary",
                },
                {
                  text: "Test each new block by itself before you connect it to another",
                  accent: "success",
                },
                {
                  text: "Make two-way door decisions in under 5 minutes; save deliberation for one-way doors",
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
      </div>
    </SectionTemplate>
  );
}

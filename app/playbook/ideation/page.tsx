import type { Metadata } from "next";
import {
  Beaker,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Plus,
  ArrowRight,
  Equal,
  Trophy,
  Lightbulb,
  Brain,
  Compass,
  Quote,
  Gamepad2,
  BookOpen,
  Shuffle,
  Dices,
  Atom,
  ListChecks,
  Cpu,
  Globe,
  Sparkles,
  CheckCircle2,
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

const section = PLAYBOOK_SECTIONS[1];

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

function CombinationRow({
  elementA,
  elementB,
  result,
  accent,
}: {
  elementA: string;
  elementB: string;
  result: string;
  accent: "volt" | "spark" | "primary" | "success";
}) {
  const colors = {
    volt: { bg: "bg-volt/10", text: "text-volt", border: "border-volt/20" },
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
  const c = colors[accent];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        variant="outline"
        className={`${c.border} ${c.text} font-code text-xs`}
      >
        {elementA}
      </Badge>
      <Plus className="size-4 text-muted-foreground" />
      <Badge
        variant="outline"
        className={`${c.border} ${c.text} font-code text-xs`}
      >
        {elementB}
      </Badge>
      <Equal className="size-4 text-muted-foreground" />
      <Badge className={`${c.bg} ${c.text} font-code text-xs`}>{result}</Badge>
    </div>
  );
}

export default function IdeationPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            THE LITTLE ALCHEMY METHOD
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Little Alchemy Method"
            subtitle="The ideation methodology behind $100K+ in hackathon prizes. Inspired by the game Little Alchemy, you start with basic elements, combine them, and discover winning ideas."
          />

          <p className="font-body text-foreground/80">
            In Little Alchemy, you start with four basic elements like fire,
            water, earth, and air, then combine them to create new items like
            steam, lava, or life. You keep mixing your discoveries to unlock hundreds of
            different things, from windmills to the internet.
          </p>

          <p className="font-body text-foreground/80">
            Hackathon ideation works the same way. Instead of natural elements,
            your building blocks are{" "}
            <span className="font-display font-semibold text-volt">
              technologies
            </span>{" "}
            and{" "}
            <span className="font-display font-semibold text-spark">
              industries
            </span>
            . Combine them, and winning ideas emerge.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  TECH ELEMENTS
                </Badge>
                <CardTitle className="font-display text-2xl text-volt">
                  Your Building Blocks
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Single technologies made by various companies or from research
                  papers. Things that{" "}
                  <span className="font-semibold">do</span> something.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Flame, label: "OpenAI 4o (LLM)" },
                    { icon: Droplets, label: "Google Veo 3 (Text to Video)" },
                    { icon: Mountain, label: "Twilio API (Phone Calls)" },
                    { icon: Wind, label: "SunoAI (Text to Music)" },
                  ].map((el) => (
                    <div
                      key={el.label}
                      className="flex items-center gap-2 rounded-lg border border-volt/20 bg-volt/5 px-3 py-2"
                    >
                      <el.icon className="size-3.5 text-volt" />
                      <span className="font-code text-xs text-volt">
                        {el.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Desktop connector */}
            <div className="hidden items-center md:flex">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-px bg-gradient-to-b from-volt to-spark" />
                <Plus className="size-6 text-spark" />
                <div className="h-16 w-px bg-gradient-to-b from-spark to-spark/0" />
                <p className="font-code text-xs text-muted-foreground [writing-mode:vertical-lr]">
                  combine
                </p>
              </div>
            </div>

            {/* Mobile connector */}
            <div className="flex items-center justify-center py-2 md:hidden">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-volt to-spark" />
                <Plus className="size-5 text-spark" />
                <p className="font-code text-xs text-muted-foreground">
                  combine
                </p>
              </div>
            </div>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  INDUSTRIES
                </Badge>
                <CardTitle className="font-display text-2xl text-spark">
                  Your Problem Spaces
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Industries, domains, and user groups. Things that{" "}
                  <span className="font-semibold">need</span> something.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {[
                    "Sports",
                    "Health",
                    "Education",
                    "Defense",
                    "Finance",
                    "Entertainment",
                  ].map((industry) => (
                    <div
                      key={industry}
                      className="flex items-center gap-2 rounded-lg border border-spark/20 bg-spark/5 px-3 py-2"
                    >
                      <Globe className="size-3.5 text-spark" />
                      <span className="font-code text-xs text-spark">
                        {industry}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                The method is simple:
              </span>{" "}
              Start with 20-30 different elements and just try randomly combining
              things together. Most combinations won&apos;t work, but the magic
              is in the volume, because the ones that do are often brilliant.
            </p>
          </div>
        </section>

        {/* ============================================================
            COMBINATIONS IN ACTION
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Combinations in Action"
            subtitle="Here's exactly how the Little Alchemy method produced ideas that won major hackathons. Each winning project started as a simple combination."
          />

          <Card className="glow-hover border-volt/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                  <Trophy className="size-5 text-volt" />
                </div>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  CASE STUDY
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-volt">
                DispatchAI — UC Berkeley AI Hackathon Grand Prize
              </CardTitle>
              <CardDescription className="font-body text-base">
                How two simple combinations led to a first-place finish.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Step 1
                  </p>
                  <CombinationRow
                    elementA="LLMs"
                    elementB="Twilio API"
                    result="LLM answering phone calls"
                    accent="volt"
                  />
                </div>
                <div className="flex justify-start pl-4">
                  <ArrowRight className="size-4 text-volt/40" />
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Step 2
                  </p>
                  <CombinationRow
                    elementA="LLM answering phone calls"
                    elementB="Defense"
                    result="AI 911 Dispatcher — DispatchAI"
                    accent="spark"
                  />
                </div>
              </div>
              <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                <p className="font-code text-xs text-volt/80">
                  Seems simple right? That&apos;s the point. The best hackathon
                  ideas aren&apos;t complex. They&apos;re clear combinations
                  that nobody else thought to make.
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="font-body text-foreground/80">
            Now watch what happens when you swap out a single component. The same
            base combination spawns entirely different ideas:
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  SWAP: INDUSTRY
                </Badge>
                <CardTitle className="font-display text-xl text-spark">
                  Mental Health AI Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CombinationRow
                  elementA="LLM answering phone calls"
                  elementB="Health"
                  result="Mental Health AI Agent"
                  accent="spark"
                />
                <p className="font-body text-sm text-foreground/60">
                  Same tech combination, different industry. One swap turns a 911
                  dispatcher into a mental health support line.
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                  SWAP: TECH
                </Badge>
                <CardTitle className="font-display text-xl text-primary">
                  AI Ad Commercial Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CombinationRow
                  elementA="LLMs"
                  elementB="Google Veo 3"
                  result="Iterative AI Ad Creator"
                  accent="primary"
                />
                <p className="font-body text-sm text-foreground/60">
                  Swap out the industry for another tech element. LLM directs
                  video generation for rapid ad prototyping.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                name: "AdaptED",
                event: "LA Hacks",
                prize: "Best Use of Google",
                accent: "volt" as const,
              },
              {
                name: "DispatchAI",
                event: "UC Berkeley AI Hackathon",
                prize: "Grand Prize",
                accent: "spark" as const,
              },
              {
                name: "TalkTuahBank",
                event: "HackUTD",
                prize: "1st Overall + Goldman Sachs",
                accent: "primary" as const,
              },
            ].map((project) => {
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
              };
              const c = colors[project.accent];
              return (
                <div
                  key={project.name}
                  className={`glow-hover rounded-xl border ${c.border} bg-card p-5 text-center transition-all`}
                >
                  <Trophy className={`mx-auto size-6 ${c.text}`} />
                  <p className={`mt-2 font-display text-lg font-bold ${c.text}`}>
                    {project.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {project.event}
                  </p>
                  <p className={`mt-1 font-code text-xs ${c.text}`}>
                    {project.prize}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                All three projects
              </span>{" "}
              were born from the same method of listing elements, combining
              them, and letting unexpected connections emerge. It works because
              it forces you to think across boundaries instead of within them.
            </p>
          </div>
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE SCIENCE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Why This Works — The Science of Combinatorial Creativity"
            subtitle="The Little Alchemy method isn't just a personal hack. It's backed by decades of research from the world's best thinkers on creativity and innovation."
          />

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Lightbulb className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    STEVE JOBS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Connecting Things
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Creativity is just connecting things. When you ask
                  creative people how they did something, they feel a little
                  guilty because they didn&apos;t really do it, they just saw
                  something. It seemed obvious to them after a while.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Jobs argued that broader experiences give you more
                  &ldquo;dots&rdquo; to connect. The more diverse your element
                  list, the more unexpected and powerful your combinations
                  become.
                </p>
                <p className="font-code text-xs text-volt/60">
                  —{" "}
                  <a href="https://www.wired.com/1996/02/jobs-2/" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Wired interview, 1996</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Beaker className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    ARTHUR KOESTLER
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Bisociation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;The creative act is the perceiving of a situation or
                  idea in two self-consistent but habitually incompatible frames
                  of reference.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Koestler coined &ldquo;bisociation&rdquo; to describe
                  creativity as the collision of two independent mental
                  frameworks. That&apos;s exactly what happens when you cross
                  &ldquo;LLMs&rdquo; with &ldquo;Defense.&rdquo;
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/The_Act_of_Creation" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">The Act of Creation, 1964</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Compass className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    STEVEN JOHNSON
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  The Adjacent Possible
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-primary/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Good ideas are not conjured out of thin air; they are
                  built out of a collection of existing parts&hellip; the
                  adjacent possible.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Innovation lives at the edge of what&apos;s currently feasible.
                  The best hackathon ideas use tools that{" "}
                  <span className="font-semibold text-foreground">
                    just became possible
                  </span>
                  , like a new API, a freshly released model, or a just-opened
                  dataset.
                </p>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Where_Good_Ideas_Come_From" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Where Good Ideas Come From, 2010</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Brain className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    PAUL GRAHAM
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  Notice, Don&apos;t Invent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-success/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Live in the future, then build what&apos;s missing. The
                  verb you want to be using with respect to startup ideas is not
                  &lsquo;think up&rsquo; but &lsquo;notice.&rsquo;&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  The Y Combinator co-founder argues the best ideas come from
                  your own experience. What frustrates you? What gap do you see
                  that others miss? Combine that personal insight with your
                  elements.
                </p>
                <p className="font-code text-xs text-success/60">
                  —{" "}
                  <a href="https://paulgraham.com/startupideas.html" target="_blank" rel="noopener noreferrer" className="underline decoration-success/30 hover:decoration-success">How to Get Startup Ideas, 2012</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            BUILDING YOUR ELEMENT LIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Building Your Element List"
            subtitle="Before you can combine, you need inventory. Here's how to assemble 20-30 high-quality elements before the hackathon even starts."
          />

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Cpu className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    TECH
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Tech Elements
                </CardTitle>
                <CardDescription className="font-body">
                  APIs, AI models, hardware, protocols, and research papers.
                  Things that <span className="font-semibold">do</span>{" "}
                  something.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    LLMs (GPT-4o, Claude, Gemini, Llama)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Speech APIs (Twilio, Deepgram, ElevenLabs)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Vision models (YOLO, SAM, GPT-4V)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Generative media (Veo, Suno, Midjourney)
                  </li>
                </ul>
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-volt">
                    10-15
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    tech elements minimum
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Globe className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    DOMAIN
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Domain Elements
                </CardTitle>
                <CardDescription className="font-body">
                  Industries, user groups, and problem spaces. Things that{" "}
                  <span className="font-semibold">need</span> something.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Healthcare, mental health, eldercare
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Education, tutoring, accessibility
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Finance, banking, insurance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Defense, emergency services, public safety
                  </li>
                </ul>
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-spark">
                    5-10
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    industries minimum
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Sparkles className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    WILD CARD
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  Wild Card Elements
                </CardTitle>
                <CardDescription className="font-body">
                  Unusual constraints, trending topics, and sponsor challenges
                  that add unique angles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    Sponsor APIs and required tech (free credits = advantage)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    Trending topics (what&apos;s viral this week?)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    Personal pain points and hobbies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    Weird constraints (&ldquo;What if it had to be
                    voice-only?&rdquo;)
                  </li>
                </ul>
                <div className="rounded-lg bg-success/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-success">
                    5+
                  </p>
                  <p className="font-code text-xs text-success/70">
                    wild cards for spice
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
              <div className="space-y-1">
                <p className="font-display font-semibold">
                  <a href="https://en.wikipedia.org/wiki/Linus_Pauling" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Linus Pauling</a> — Two-Time Nobel Laureate
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;The best way to have a good idea is to have a lot of
                  ideas. You aren&apos;t going to have good ideas unless you have
                  lots of ideas and some principle of selection.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Don&apos;t filter while building your list. The goal at this
                  stage is volume, not quality. You&apos;ll prune later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE WANDERING MIND — DIFFUSE THINKING
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Wandering Mind"
            subtitle="The best hackathon ideas don't come from staring at a blank screen. They come when you let your brain wander, and there's hard science behind why."
          />

          <Card className="glow-hover border-spark/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                  <Gamepad2 className="size-5 text-spark" />
                </div>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  SECRET WEAPON
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-spark">
                TFT Helps Me Win Hackathons
              </CardTitle>
              <CardDescription className="font-body text-base">
                Yes, Teamfight Tactics by Riot Games. Here&apos;s why
                it&apos;s a legitimate ideation tool.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Rapid Context Switching
                </p>
                <p className="font-body text-sm text-foreground/80">
                  TFT forces you to switch gears constantly. One second
                  you&apos;re focusing on your board, the next you&apos;re
                  back to your idea list. This rapid mental shifting is what
                  sparks the unexpected connections that lead to the best
                  hackathon ideas.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Built-in Downtime
                </p>
                <p className="font-body text-sm text-foreground/80">
                  Unlike Valorant or League, TFT gives you long pauses between
                  rounds that are perfect for jotting down quick ideas. Ever tried
                  thinking up a startup idea while mid-clutch in Valorant?
                  Doesn&apos;t work.
                </p>
              </div>
              <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                <p className="font-code text-xs text-spark/80">
                  You don&apos;t have to play TFT. The principle is: pair
                  ideation with any activity that keeps your hands busy and your
                  brain free, like cooking, cleaning, gymming, or walking. Let your
                  brain wander, and the best ideas will come to you.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Brain className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    BARBARA OAKLEY
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Focused vs. Diffuse Thinking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Professor Barbara Oakley&apos;s research on learning reveals
                  two distinct thinking modes:
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                    <p className="font-display text-sm font-semibold text-primary">
                      Focused Mode
                    </p>
                    <p className="font-body text-xs text-foreground/60">
                      Concentrated, sequential thinking. Good for executing on
                      known problems. This is you at the whiteboard trying to
                      force ideas.
                    </p>
                  </div>
                  <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                    <p className="font-display text-sm font-semibold text-volt">
                      Diffuse Mode
                    </p>
                    <p className="font-body text-xs text-foreground/60">
                      Relaxed, broad, associative thinking. Supports novel
                      connections. This is you walking to the coffee shop when
                      the idea suddenly hits.
                    </p>
                  </div>
                </div>
                <blockquote className="border-l-2 border-primary/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Sometimes backing off can be the best thing you can do
                  when learning something new.&rdquo;
                </blockquote>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://www.coursera.org/learn/learning-how-to-learn" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Learning How to Learn</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <BookOpen className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    JAMES WEBB YOUNG
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  The Five-Step Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  In 1939, advertising pioneer James Webb Young formalized a
                  repeatable process for idea generation that still holds today:
                </p>
                <ol className="space-y-2 font-body text-sm text-foreground/80">
                  {[
                    {
                      step: "Gather",
                      desc: "Collect raw material, both specific knowledge of the problem and general knowledge from other fields",
                    },
                    {
                      step: "Digest",
                      desc: "Actively work the material, examine from different angles, try combinations",
                    },
                    {
                      step: "Incubate",
                      desc: "Set the problem aside. Let the subconscious work while you do other things",
                    },
                    {
                      step: "Eureka",
                      desc: "The idea appears, usually when you're not forcing it",
                    },
                    {
                      step: "Verify",
                      desc: "Shape and test the idea in reality, refine with feedback",
                    },
                  ].map((item, i) => (
                    <li key={item.step} className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-volt/10 font-code text-xs text-volt">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-display font-semibold text-foreground">
                          {item.step}
                        </span>
                        <span className="text-foreground/60">
                          {" "}
                          — {item.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Step 3 is the one most people skip, but it happens to be
                    the most important. Building your element list is gathering. Playing
                    TFT is incubation.
                  </p>
                </div>
                <p className="font-code text-xs text-volt/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/A_Technique_for_Producing_Ideas" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">A Technique for Producing Ideas, 1939</a>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Sitting at a desk staring at a blank doc is the worst way to
                think of ideas.
              </span>{" "}
              Schedule real breaks during ideation. Walk, cook, play a game,
              hit the gym. Your subconscious keeps working even when your
              conscious mind steps away. In fact, it&apos;s often better at
              finding the non-obvious connections.
            </p>
          </div>
        </section>

        {/* ============================================================
            THE IDEATION TOOLKIT
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Ideation Toolkit"
            subtitle="Three additional frameworks to break through creative blocks. Use these when random combining stalls or you want to push ideas further."
          />

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Shuffle className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    SCAMPER
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  SCAMPER Method
                </CardTitle>
                <CardDescription className="font-body">
                  <a href="https://en.wikipedia.org/wiki/S.C.A.M.P.E.R" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Bob Eberle&apos;s</a> structured checklist for expanding any idea
                  in seven directions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[
                    { letter: "S", word: "Substitute", desc: "Replace a component" },
                    { letter: "C", word: "Combine", desc: "Merge two features" },
                    { letter: "A", word: "Adapt", desc: "Reuse in new context" },
                    { letter: "M", word: "Modify", desc: "Change scale or shape" },
                    { letter: "P", word: "Put to another use", desc: "New application" },
                    { letter: "E", word: "Eliminate", desc: "Remove complexity" },
                    { letter: "R", word: "Reverse", desc: "Flip the perspective" },
                  ].map((item) => (
                    <div
                      key={item.letter}
                      className="flex items-center gap-3"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded bg-volt/10 font-code text-xs font-bold text-volt">
                        {item.letter}
                      </span>
                      <div>
                        <span className="font-display text-sm font-semibold">
                          {item.word}
                        </span>
                        <span className="font-body text-xs text-muted-foreground">
                          {" "}
                          — {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Run each letter on your top idea. &ldquo;What if we
                    Substituted the API? Combined with another app? Eliminated
                    the most complex step?&rdquo;
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Dices className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    LATERAL THINKING
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Random Input
                </CardTitle>
                <CardDescription className="font-body">
                  <a href="https://en.wikipedia.org/wiki/Lateral_thinking" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Edward de Bono&apos;s</a> technique for provoking new connections
                  through randomness.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-spark/10 font-code text-xs text-spark">
                      1
                    </span>
                    Pick a random noun by opening a dictionary, using a
                    generator, or pointing at something in the room
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-spark/10 font-code text-xs text-spark">
                      2
                    </span>
                    Force-connect that word to your problem space. How is your
                    idea like a &ldquo;lighthouse&rdquo;?
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-spark/10 font-code text-xs text-spark">
                      3
                    </span>
                    Follow the unexpected associations, because the weirder the
                    connection, the more original the idea
                  </li>
                </ol>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    When your team is stuck in a loop of similar ideas, random
                    input is the fastest way to break out. De Bono argued the
                    real risk isn&apos;t being too random, but not being random
                    enough.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Atom className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    MIT MEDIA LAB
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Antidisciplinary Thinking
                </CardTitle>
                <CardDescription className="font-body">
                  <a href="https://joi.ito.com/weblog/2014/10/02/antidisciplinar.html" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Joi Ito&apos;s</a> framework for finding innovation in the white
                  space between fields.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Unlike interdisciplinary work (different fields collaborating),
                  antidisciplinary thinking creates something that doesn&apos;t
                  fit any existing category. It&apos;s the white space between
                  the dots on a map of knowledge.
                </p>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Ask Yourself
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Which field would never normally work on this problem?
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Does this idea feel uncategorizable? Good. Pursue it.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      What would happen if a musician designed this? A chef? A
                      game designer?
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    The best hackathon projects often feel weird at first.
                    &ldquo;An AI 911 dispatcher?&rdquo; sounded strange until it
                    won grand prize. Lean into the weirdness.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            GOLDEN RULE — CREATIVITY QUOTE
            ============================================================ */}
        <section className="space-y-8">
          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;Creativity is just connecting things.
                <br />
                <span className="animate-shimmer">
                  The broader one&apos;s understanding of the human experience,
                  the better design we will have.
                </span>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                —{" "}
                <a href="https://www.wired.com/1996/02/jobs-2/" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Steve Jobs, co-founder of Apple</a>
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    In hackathons, the best ideas don&apos;t come from staring
                    at a blank screen.
                  </span>{" "}
                  They come from having a broad inventory of
                  &ldquo;elements&rdquo; like technologies you&apos;ve explored,
                  industries you understand, and problems you&apos;ve felt, along
                  with the courage to combine them in ways nobody else would.
                </p>
                <p className="font-body text-foreground/80">
                  The Little Alchemy method works because it mirrors how
                  creativity actually functions: not as a bolt of inspiration
                  from nowhere, but as the systematic collision of ideas from
                  different worlds. Every element you add to your list is another
                  dot. Every combination is an attempt to connect them.
                </p>
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    The more dots you collect, the more connections become
                    possible.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            IDEATION CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Ideation Checklist"
            subtitle="A step-by-step summary you can follow before and during your next hackathon. Print it, screenshot it, or just remember the flow."
          />

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Build your element list with at least 20-30 tech + domain + wild cards",
                  accent: "volt",
                },
                {
                  text: "Start combining randomly without filtering or judging. Just mix.",
                  accent: "spark",
                },
                {
                  text: "Step away and let diffuse thinking work by walking, playing, cooking, or hitting the gym",
                  accent: "primary",
                },
                {
                  text: "Generate volume first and aim for 15-20 unique combinations",
                  accent: "success",
                },
                {
                  text: "Apply SCAMPER to your top 3 ideas and push them in all 7 directions",
                  accent: "volt",
                },
                {
                  text: "Pick the idea at the edge of the adjacent possible, asking yourself what just became feasible",
                  accent: "spark",
                },
                {
                  text: "Validate with your team by asking if it excites everyone and whether you can build it in 24-48 hours",
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
              The goal of ideation isn&apos;t to find{" "}
              <span className="italic">the</span> perfect idea on the first
              try. It&apos;s to generate enough raw material that one great idea
              rises to the surface. Trust the process, trust the volume, and
              trust your subconscious.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

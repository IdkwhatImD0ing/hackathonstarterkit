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
  Brain,
  Compass,
  Quote,
  Gamepad2,
  Shuffle,
  Dices,
  Atom,
  ListChecks,
  Cpu,
  Globe,
  Sparkles,
  CheckCircle2,
  Github,
  ExternalLink,
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
import { AlchemyGame } from "./alchemy-game";
import { markdownAlternate, SITE_URL } from "@/lib/site";

const section = PLAYBOOK_SECTIONS[1];

export const metadata: Metadata = {
  title: "Hackathon Ideation — How to Come Up With Winning Hackathon Ideas",
  description:
    "Brainstorm, evaluate, and select hackathon project ideas that judges love and you can actually build. Frameworks for generating innovative ideas under time pressure.",
  alternates: {
    canonical: `${SITE_URL}/playbook/ideation`,
    types: markdownAlternate("/playbook/ideation"),
  },
  openGraph: {
    title: "How to Come Up With Winning Hackathon Ideas",
    description:
      "Frameworks for brainstorming and selecting hackathon ideas that impress judges. From the 36-win playbook.",
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

function ProjectLinks({
  devpost,
  github,
  demo,
  align = "start",
}: {
  devpost?: string;
  github?: string;
  demo?: string;
  align?: "start" | "center";
}) {
  const links = [
    demo ? { href: demo, label: "Live demo", Icon: Globe } : null,
    github ? { href: github, label: "GitHub", Icon: Github } : null,
    devpost ? { href: devpost, label: "Devpost", Icon: ExternalLink } : null,
  ].filter(
    (l): l is { href: string; label: string; Icon: typeof Globe } => l !== null,
  );
  return (
    <div
      className={`flex flex-wrap gap-2 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 font-code text-xs text-muted-foreground transition-colors hover:border-volt/30 hover:text-foreground"
        >
          <Icon className="size-3.5" />
          {label}
        </a>
      ))}
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
          {/* [CONFIRM: the old subtitle called this "the ideation methodology behind $100K+ in hackathon prizes," which credits every prize to one method. Scoped down for now. Put it back only if every win came from it.] */}
          <SectionHeading
            title="The Little Alchemy Method"
            subtitle="Start with basic elements and keep combining them until one result is worth building."
          />

          <KeyTakeaway>Pair technologies with industries, many times over, and keep the few pairings that land.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            In the game Little Alchemy you combine fire, water, earth, and air
            into steam, lava, and life, then keep combining the results into
            hundreds of other things.
          </p>

          <p className="font-body text-foreground/80">
            Hackathon ideas work the same way, with{" "}
            <span className="font-display font-semibold text-volt">
              technologies
            </span>{" "}
            and{" "}
            <span className="font-display font-semibold text-spark">
              industries
            </span>{" "}
            as the elements.
          </p>

          {/* [CONFIRM: model names on this page (OpenAI 4o, GPT-4o, GPT-4V) may be dated. Update them or keep?] */}
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
                  <span className="font-semibold text-foreground">Tools that do something.</span>{" "}
                  Single technologies from companies or research papers.
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
                  <span className="font-semibold text-foreground">Spaces that need something.</span>{" "}
                  Industries, domains, and user groups.
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

          {/* [NEEDS SPECIFIC: a pairing from one of your hackathons that flopped, so "most pairings flop" has a story behind it.] */}
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                The method:
              </span>{" "}
              list 20-30 elements and combine them at random. Most pairings
              flop, which is why you need a lot of them.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-1">
              <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                INTERACTIVE
              </Badge>
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Try It Yourself
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Drag elements into the workspace and drop one onto another.
              </p>
            </div>
            <AlchemyGame />
          </div>
        </section>

        {/* ============================================================
            COMBINATIONS IN ACTION
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Combinations in Action"
            subtitle="How the method produced DispatchAI, our Grand Prize winner at the UC Berkeley AI Hackathon."
          />

          <KeyTakeaway>Once you have one combination, swap a single element to get a new idea out of it.</KeyTakeaway>

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
                It started as two combinations.
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
              <ProjectLinks
                devpost="https://devpost.com/software/dispatch-ai"
                github="https://github.com/IdkwhatImD0ing/DispatchAI"
                demo="https://dispatchai.art3m1s.me/"
              />
            </CardContent>
          </Card>

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
                  <span className="font-semibold text-foreground">Same tech, different industry.</span>{" "}
                  The 911 dispatcher becomes a mental health support line.
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
                  <span className="font-semibold text-foreground">Swap the industry for another technology.</span>{" "}
                  An LLM directs video generation to prototype ads fast.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* [CONFIRM: TalkTuahBank is labeled "1st Overall + Goldman Sachs" here, but the home page says "1st Place Grand Prize" at HackUTD 2024. Which wording do you want?] */}
          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                name: "AdaptED",
                event: "LA Hacks",
                prize: "Best Use of Google",
                accent: "volt" as const,
                devpost: "https://devpost.com/software/teachme-3p7bw1",
                github: "https://github.com/IdkwhatImD0ing/TeachMe",
                demo: "https://adapted.art3m1s.me/",
              },
              {
                name: "DispatchAI",
                event: "UC Berkeley AI Hackathon",
                prize: "Grand Prize",
                accent: "spark" as const,
                devpost: "https://devpost.com/software/dispatch-ai",
                github: "https://github.com/IdkwhatImD0ing/DispatchAI",
                demo: "https://dispatchai.art3m1s.me/",
              },
              {
                name: "TalkTuahBank",
                event: "HackUTD",
                prize: "1st Overall + Goldman Sachs",
                accent: "primary" as const,
                devpost: "https://devpost.com/software/talktuahbank",
                github: "https://github.com/aurelisajuan/TalkTuahBank",
                demo: "https://talktuah.art3m1s.me/",
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
                  <div className="mt-3">
                    <ProjectLinks
                      devpost={project.devpost}
                      github={project.github}
                      demo={project.demo}
                      align="center"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* [NEEDS SPECIFIC: the AdaptED and TalkTuahBank combinations. Only DispatchAI's is shown, so "all three" rests on your word for now.] */}
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                All three projects
              </span>{" "}
              came from the same method.
            </p>
          </div>
        </section>

        {/* ============================================================
            GO DEEPER — OPTIONAL FRAMEWORKS (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Go Deeper"
            subtitle="Optional background and prep."
          />

          <Disclosure
            title="Why This Works: The Science of Combinatorial Creativity"
            subtitle="The research and essays behind the method."
            badge="The science"
            accent="primary"
          >
            <KeyTakeaway>Make sure your list has tools that just became possible and problems you&apos;ve had yourself.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  built out of a collection of existing parts, the composition of
                  which expands (and, occasionally, contracts) over time.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Johnson calls that expanding edge the &ldquo;adjacent
                  possible,&rdquo; a term he borrowed from biologist Stuart
                  Kauffman. Every new API, model, or dataset expands it.
                </p>
                <p className="font-code text-xs text-primary/60">
                  — Steven Johnson, science writer,{" "}
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
                  &ldquo;Live in the future, then build what&apos;s missing.
                  &hellip; The verb you want to be using with respect to startup
                  ideas is not &lsquo;think up&rsquo; but
                  &lsquo;notice.&rsquo;&rdquo;
                </blockquote>
                <p className="font-code text-xs text-success/60">
                  — Paul Graham, Y Combinator co-founder,{" "}
                  <a href="https://paulgraham.com/startupideas.html" target="_blank" rel="noopener noreferrer" className="underline decoration-success/30 hover:decoration-success">How to Get Startup Ideas, 2012</a>
                </p>
              </CardContent>
            </Card>
          </div>
          </Disclosure>

          <Disclosure
            title="Building Your Element List"
            subtitle="What goes on the list, and how many of each."
            badge="Preparation"
            accent="volt"
          >
            <KeyTakeaway>If you&apos;re competing to win, build this list before the event starts.</KeyTakeaway>

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
                  APIs, AI models, hardware, protocols, research papers.
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
                  Industries, user groups, and problem spaces.
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
                    Education and accessibility
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Finance and insurance
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
                  <span className="font-semibold text-foreground">Things that add an angle.</span>{" "}
                  Unusual constraints, trends, and sponsor challenges.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    Sponsor APIs (free credits = an edge)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    Trending topics (what&apos;s viral now?)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    Personal pain points and hobbies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                    Weird constraints (&ldquo;What if it were
                    voice-only?&rdquo;)
                  </li>
                </ul>
                <div className="rounded-lg bg-success/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-success">
                    5+
                  </p>
                  <p className="font-code text-xs text-success/70">
                    wild cards
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
                  <a href="https://en.wikipedia.org/wiki/Linus_Pauling" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Linus Pauling</a> — Two-Time Nobel Laureate (Chemistry 1954, Peace 1962)
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;The best way to have a good idea is to have a lot of
                  ideas.&rdquo;
                </blockquote>
                <p className="font-code text-xs text-foreground/50">
                  — Quoted in Fortune, April 1960
                </p>
                <p className="font-body text-sm text-foreground/60">
                  On PBS&apos;s NOVA in 1977 he added the other half: you also
                  need &ldquo;some sort of principle of selection.&rdquo;
                </p>
              </div>
            </div>
          </div>
          </Disclosure>

          <Disclosure
            title="The Wandering Mind"
            subtitle="Why stepping away from the list helps."
            badge="Mindset"
            accent="spark"
          >
            <KeyTakeaway>After you combine, go do something else and write down whatever comes to mind.</KeyTakeaway>

          {/* [CONFIRM: TFT as your ideation habit, and the Valorant/League comparison. It reads like you, so it stays as written. Keep?] */}
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
                Yes, Teamfight Tactics by Riot Games.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Rapid Context Switching
                </p>
                <p className="font-body text-sm text-foreground/80">
                  TFT keeps you switching between the board and your idea
                  list, and that back-and-forth is where unexpected pairings
                  show up.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Built-in Downtime
                </p>
                <p className="font-body text-sm text-foreground/80">
                  Unlike Valorant or League, TFT has long pauses between rounds,
                  perfect for jotting down ideas. Try brainstorming mid-clutch in
                  Valorant: it doesn&apos;t work.
                </p>
              </div>
              <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                <p className="font-code text-xs text-spark/80">
                  You don&apos;t have to play TFT. Cooking, cleaning, the gym,
                  or a walk work too. Put the break on your schedule.
                </p>
              </div>
            </CardContent>
          </Card>

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
                Barbara Oakley, professor of engineering at Oakland University,
                popularized two thinking modes in A Mind for Numbers (2014) and
                in the Coursera course{" "}
                <a href="https://www.coursera.org/learn/learning-how-to-learn" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Learning How to Learn</a>{" "}
                (2014), which she teaches with neuroscientist Terrence
                Sejnowski:
              </p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-display text-sm font-semibold text-primary">
                    Focused Mode
                  </p>
                  <p className="font-body text-xs text-foreground/60">
                    Concentrated work on a known problem, like forcing ideas
                    at a whiteboard.
                  </p>
                </div>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-display text-sm font-semibold text-volt">
                    Diffuse Mode
                  </p>
                  <p className="font-body text-xs text-foreground/60">
                    Relaxed and associative. It&apos;s why the idea hits on
                    the walk to get coffee, or between TFT rounds.
                  </p>
                </div>
              </div>
              <blockquote className="border-l-2 border-primary/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;Sometimes we need to lose concentration so we can think
                more clearly.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-primary/60">
                — Barbara Oakley and Terrence Sejnowski with Alistair
                McConville,{" "}
                <a href="https://www.penguinrandomhouse.com/books/563935/learning-how-to-learn-by-barbara-oakley-phd-and-terrence-sejnowski-phd-with-alistair-mcconville/" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Learning How to Learn</a>, 2018
              </p>
            </CardContent>
          </Card>
          </Disclosure>
        </section>

        {/* ============================================================
            THE IDEATION TOOLKIT
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Ideation Toolkit"
            subtitle="For when random combining stops turning up new ideas."
          />

          <KeyTakeaway>Run SCAMPER on your top ideas, or pick a random noun and force a connection to your problem.</KeyTakeaway>

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
                  Education author Bob Eberle&apos;s{" "}
                  <a href="https://archive.org/details/scampergamesfori0000eber" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Scamper: Games for Imagination Development</a>{" "}
                  (1971) turned Alex Osborn&apos;s brainstorming questions into a
                  checklist that expands any idea in seven directions.
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
                          {": "}
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Try each letter on your top ideas. Could you substitute the
                    API? Could you drop the most complex step?
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
                  Maltese physician and author Edward de Bono, who coined{" "}
                  <a href="https://en.wikipedia.org/wiki/Lateral_thinking" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">lateral thinking</a>, devised this technique for provoking new
                  connections with randomness, set out in Serious Creativity
                  (1992).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-spark/10 font-code text-xs text-spark">
                      1
                    </span>
                    Pick a random noun: open a dictionary, use a generator, or
                    point at something in the room
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-spark/10 font-code text-xs text-spark">
                      2
                    </span>
                    Force-connect it to your problem. How is your idea like a
                    &ldquo;lighthouse&rdquo;?
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-spark/10 font-code text-xs text-spark">
                      3
                    </span>
                    Follow the links that come up, even the weird ones
                  </li>
                </ol>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Let the word be random. If you pick one that already
                    relates to your problem, you&apos;ll get the same ideas
                    back.
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
                  Joi Ito, then director of the MIT Media Lab, on finding
                  innovation in the white space between fields, from his 2014
                  essay{" "}
                  <a href="https://joi.ito.com/weblog/2014/10/02/antidisciplinar.html" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Antidisciplinary</a>.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Interdisciplinary work has existing fields collaborate.
                  Antidisciplinary work fits none of them, so don&apos;t drop
                  an idea just because you can&apos;t say which field it
                  belongs to. &ldquo;An AI 911 dispatcher?&rdquo; sounded
                  strange until DispatchAI won the Grand Prize.
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
                      What would a musician, a chef, or a game designer do with
                      it?
                    </li>
                  </ul>
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
                &ldquo;Creativity is just connecting things. &hellip;
                <br />
                <span className="animate-shimmer">
                  The broader one&apos;s understanding of the human experience,
                  the better design we will have.
                </span>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                — Steve Jobs, co-founder of Apple,{" "}
                <a href="https://www.wired.com/1996/02/jobs-2/" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Wired interview, 1996</a>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            IDEATION CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Ideation Checklist"
            subtitle="If you're competing to win, finish this before the event. If you're there to learn, you can run it at the event with the people you meet."
          />

          <KeyTakeaway>Combine 20-30 elements into 15-20 candidates, then pick one your team can ship in the time you have.</KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Build a list of 20-30+ tech, domain, and wild card elements",
                  accent: "volt",
                },
                {
                  text: "Combine at random without filtering. Aim for 15-20 combinations before you judge any",
                  accent: "spark",
                },
                {
                  text: "Take a break and jot down what comes to you",
                  accent: "primary",
                },
                {
                  text: "Run SCAMPER on your top 3 ideas, all 7 letters",
                  accent: "success",
                },
                {
                  text: "Favor ideas that use something that just became possible",
                  accent: "volt",
                },
                {
                  text: "Validate with your team: does it excite everyone, and can you ship it in 24-48 hours?",
                  accent: "spark",
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

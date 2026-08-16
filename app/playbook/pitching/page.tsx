import type { Metadata } from "next";
import {
  Mic,
  BookOpen,
  Quote,
  Trophy,
  Video,
  Eye,
  Target,
  Layers,
  ArrowRight,
  Brain,
  Heart,
  Scale,
  Lightbulb,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  FileQuestion,
  Monitor,
  Camera,
  Presentation,
  CheckCircle2,
  Star,
  Swords,
  CircleDot,
  ExternalLink,
  Play,
  Zap,
  Globe,
  Building2,
  Compass,
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
import { markdownAlternate, SITE_URL } from "@/lib/site";

const section = PLAYBOOK_SECTIONS[4];

export const metadata: Metadata = {
  title: "Hackathon Pitching — How to Pitch at a Hackathon and Win",
  description:
    "Craft a hackathon pitch that wins judges over in the first 30 seconds. Learn pitch structure, demo techniques, storytelling frameworks, and how to handle Q&A from judges.",
  alternates: {
    canonical: `${SITE_URL}/playbook/pitching`,
    types: markdownAlternate("/playbook/pitching"),
  },
  openGraph: {
    title: "How to Pitch at a Hackathon and Win",
    description:
      "Pitch structure, demo techniques, and storytelling frameworks that win hackathon prizes. From the 36-win playbook.",
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

export default function PitchingPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            STORYTELLING IS THE SECRET WEAPON
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Storytelling is the Secret Weapon"
            subtitle="The most valuable skill at hackathons isn't coding. It's storytelling. 36+ hackathon wins and $100K+ in prizes later, the secret weapon has always been narrative."
          />

          <KeyTakeaway>You&apos;re not selling 24 hours of code. You&apos;re selling the dream of what it could become.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            <span className="font-semibold text-foreground">The real edge was never technical.</span> A
            stack of wins looks like a lot of code. It was always the ability to
            craft a compelling narrative.{" "}
            <span className="font-display font-semibold text-foreground">
              You sell the dream of what it could become, not what you shipped.
            </span>
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Mic className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    THE PITCH
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Sell the Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Pitch potential, not a finished product.</span>{" "}
                  The backend can be duct tape and hope. If your story of how it
                  changes the world is irresistible, judges lean in.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Focus on the problem, not just the solution. Judges buy
                    visions, not feature lists.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Users className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    TAILORED
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Read Your Judges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Judges aren&apos;t a monolith.</span>{" "}
                  One project, pitched three ways to three judges: tech for the
                  engineer, market for the VC, UX for the designer. First place.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Show genuine passion. Enthusiasm is contagious. Pivot your
                    story to judges&apos; reactions in real time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    BEYOND
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Career Multiplier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Storytelling transfers everywhere:</span>{" "}
                  startup pitches, product management, technical interviews. One
                  job came from telling the story of a project that won nothing.
                  The story mattered more than the result.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Use analogies to make complex tech relatable. If a judge
                    can&apos;t explain your project to the next judge, you lose.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            WHY STORYTELLING WORKS — THE SCIENCE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Why Storytelling Works — The Science of Persuasion"
            subtitle="The best pitchers don't just wing it. They use frameworks refined over thousands of years of human rhetoric and modern communication research."
          />

          <KeyTakeaway>Winning pitches layer four proven frameworks: Sinek&apos;s why, Duarte&apos;s tension, Aristotle&apos;s appeals, and the Heaths&apos; stickiness.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Lightbulb className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    SIMON SINEK
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Start With Why
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;People don&apos;t buy what you do, they buy why you do
                  it.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Most teams pitch outside-in: &ldquo;We built an app
                  that&hellip;&rdquo; Winners pitch inside-out: start with{" "}
                  <span className="font-semibold text-foreground">why</span> you
                  care, then how, then what. The Golden Circle turns passive
                  listeners into invested supporters.
                </p>
                <p className="font-code text-xs text-volt/60">
                  — Simon Sinek, author and TEDx speaker,{" "}
                  <a href="https://simonsinek.com/books/start-with-why/" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Start With Why, 2009</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Layers className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    NANCY DUARTE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  What Is vs. What Could Be
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;You are not the hero who will save the audience; the
                  audience is your hero.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Duarte&apos;s Sparkline alternates between current reality
                  (&ldquo;what is&rdquo;) and desired future (&ldquo;what could
                  be&rdquo;). The tension builds, then resolves with your
                  solution. Oscillate between both, never camp on one.
                </p>
                <p className="font-code text-xs text-spark/60">
                  — Nancy Duarte, CEO of Duarte, Inc.,{" "}
                  <a href="https://www.duarte.com/resonate/" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Resonate, 2010</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Scale className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    ARISTOTLE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Ethos, Pathos, Logos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  2,400 years old, still the foundation of every winning pitch:
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                    <p className="font-display text-sm font-semibold text-primary">
                      Ethos: Credibility
                    </p>
                    <p className="font-body text-xs text-foreground/60">
                      Quick team intro, domain experience, why you&apos;re the
                      right people to solve this.
                    </p>
                  </div>
                  <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                    <p className="font-display text-sm font-semibold text-spark">
                      Pathos: Emotion
                    </p>
                    <p className="font-body text-xs text-foreground/60">
                      A real story, a user who suffers, a vision that
                      matters. &ldquo;Imagine a world where&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                    <p className="font-display text-sm font-semibold text-volt">
                      Logos: Logic
                    </p>
                    <p className="font-body text-xs text-foreground/60">
                      Architecture, metrics, validation, tech decisions: proof
                      your vision is achievable.
                    </p>
                  </div>
                </div>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Rhetoric_(Aristotle)" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Rhetoric, 4th century BCE</a>
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
                    HEATH BROTHERS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  Made to Stick — SUCCESs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Six principles from Chip and Dan Heath that make ideas stick,
                  exactly what you need when judges recall your project hours
                  later in deliberation:
                </p>
                <div className="space-y-2">
                  {[
                    {
                      letter: "S",
                      word: "Simple",
                      desc: "One core message, one sentence",
                    },
                    {
                      letter: "U",
                      word: "Unexpected",
                      desc: "Surprise them by violating expectations",
                    },
                    {
                      letter: "C",
                      word: "Concrete",
                      desc: "Specific, sensory language",
                    },
                    {
                      letter: "C",
                      word: "Credible",
                      desc: "Proof through demos, not claims",
                    },
                    {
                      letter: "E",
                      word: "Emotional",
                      desc: "Appeal to identity and values",
                    },
                    {
                      letter: "S",
                      word: "Stories",
                      desc: "Show how change happens",
                    },
                  ].map((item, i) => (
                    <div key={`${item.word}-${i}`} className="flex items-center gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded bg-success/10 font-code text-xs font-bold text-success">
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
                <p className="font-code text-xs text-success/60">
                  —{" "}
                  <a href="https://heathbrothers.com/made-to-stick/" target="_blank" rel="noopener noreferrer" className="underline decoration-success/30 hover:decoration-success">Made to Stick, 2007</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            ANATOMY OF A WINNING PITCH
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Anatomy of a Winning Pitch"
            subtitle="A battle-tested pitch structure that works whether you have 2 minutes or 10. Based on Andy Raskin's strategic narrative framework from 'The Greatest Sales Deck I've Ever Seen' (Medium, 2016), adapted for hackathons."
          />

          <KeyTakeaway>Open with a shift, show the stakes, then spend most of your time on a working live demo.</KeyTakeaway>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Name the Big Shift",
                time: "~20 seconds",
                description:
                  "Don't open with your product or team. Name the change in the world that creates stakes. Assert a problem and judges resist. Describe a shift and they open up.",
                example:
                  '"Every year, 240 million 911 calls are placed in the US, yet dispatcher shortages mean some go unanswered."',
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Show the Stakes",
                time: "~20 seconds",
                description:
                  "Paint two futures: the losing path if nothing changes versus what becomes possible. Lean into loss aversion. People fear losing more than they want gaining.",
                example:
                  '"Lives are lost to hold music. But what if every call was answered instantly, by an AI that never sleeps?"',
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Live Demo — The Main Event",
                time: "~60-70% of total time",
                description:
                  "This is what judges care about most. Show it working: let them see it, feel it, believe it. A working demo beats a thousand slides. Judges remember what they saw, not what they heard.",
                example:
                  "Call the Twilio number live. Let judges hear the AI dispatcher triage a simulated emergency in real time.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "The Magic — How It Works",
                time: "~20 seconds",
                description:
                  "Brief technical overview. You're the guide, not the hero. Your product is the \"magic gift\" that gets users to the promised land. Tech is the enabler, not the star.",
                example:
                  '"Under the hood: GPT-4 for triage, Twilio for telephony, and a custom priority queue that routes by severity."',
                accent: "success" as const,
              },
              {
                step: 5,
                title: "Vision and Close",
                time: "~15 seconds",
                description:
                  "End with where this goes. Skip the feature roadmap. Offer a glimpse of the future your project enables. Leave judges with a feeling, not a feature list.",
                example:
                  '"Imagine a world where no 911 call goes unanswered. We built the first step."',
                accent: "volt" as const,
              },
            ].map((item) => {
              const colors = {
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
                      <div className={`rounded-lg border ${c.border} ${c.bg} p-3`}>
                        <p className="font-code text-xs text-foreground/70">
                          {item.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                <Swords className="size-5 text-volt" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold">
                  <a href="https://medium.com/the-mission/the-greatest-sales-deck-ive-ever-seen-4f4ef3391ba0" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Andy Raskin</a> — Strategic Narrative Expert, &ldquo;The Greatest Sales Deck I&apos;ve Ever Seen,&rdquo; Medium, 2016
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;Your prospect is Luke, and you&apos;re Obi Wan,
                  furnishing a lightsaber to help him defeat the Empire.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Raskin&apos;s fourth element is to introduce features as magic
                  gifts for overcoming obstacles to the promised land. Judges are
                  the heroes. Your project is the lightsaber. Frame it that way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WINNING PITCHES DISSECTED
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Winning Pitches Dissected"
            subtitle="Theory is great, but seeing real pitches broken down is better. Here are three hackathon-winning pitches analyzed against the frameworks above, with timestamps, exact quotes, and AI-powered structural analysis."
          />

          <KeyTakeaway>Three real winners, transcribed and analyzed: all opened with a number, demoed live, and aligned with sponsors.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            <span className="font-semibold text-foreground">These are real pitches that won real prizes.</span>{" "}
            Two were transcribed from their presentation videos and the third
            reconstructed from its Devpost writeup, then analyzed with GPT-5 in
            March 2026 to surface structural phases, techniques, and the moments
            that won judges over.
          </p>

          {/* --- CASE STUDY 1: DispatchAI --- */}
          <Card className="glow-hover overflow-hidden border-volt/20">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                  <Trophy className="size-5 text-volt" />
                </div>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  CASE STUDY 1
                </Badge>
                <Badge
                  variant="outline"
                  className="border-volt/20 text-volt font-code text-xs"
                >
                  $64K IN PRIZES
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-volt">
                DispatchAI — UC Berkeley AI Hackathon 2024
              </CardTitle>
              <CardDescription className="font-body text-base">
                Grand Prize ($25K SkyDeck investment) + AI For Good ($25K) +
                Best Use of Intel AI (1st, roughly $14K in hardware). The
                largest AI hackathon in the US.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-hidden rounded-lg border border-volt/10">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/hdpdgxrilQM"
                    title="DispatchAI Pitch Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pitch Structure Breakdown (4 min 34 sec)
                </p>
                <p className="font-body text-xs text-foreground/60">
                  Quotes below are transcribed from the team&apos;s pitch video
                  (DispatchAI, UC Berkeley AI Hackathon 2024, recorded June
                  2024), narrated throughout by team member Spike O&apos;Carroll.
                  Spoken audio is lightly cleaned for repeated words.
                </p>
                <div className="space-y-2">
                  {[
                    {
                      phase: "Big Shift",
                      time: "0:00 – 0:39",
                      pct: 14,
                      quote:
                        "In the United States, over 80% of 911 call centers are critically understaffed.",
                      technique: "Statistic-led opener + local example (Oakland)",
                    },
                    {
                      phase: "Stakes",
                      time: "0:39 – 1:03",
                      pct: 9,
                      quote:
                        "This could be literally the difference between life and death.",
                      technique: "Loss aversion, moral clarity",
                    },
                    {
                      phase: "How It Works",
                      time: "1:03 – 2:55",
                      pct: 41,
                      quote:
                        "The voice AI will step into calls when all human agents are busy.",
                      technique:
                        "Concrete mechanism walkthrough with human-centered safety framing",
                    },
                    {
                      phase: "Vision",
                      time: "2:55 – 3:17",
                      pct: 8,
                      quote:
                        "Our mission is to make requesting emergency services more effective and efficient.",
                      technique: "Mission statement tying product to social impact",
                    },
                    {
                      phase: "Live Demo",
                      time: "3:17 – 4:34",
                      pct: 28,
                      quote:
                        "I have my phone here with me, and I will call our agents.",
                      technique:
                        "Live phone call to AI dispatcher with real-time UI",
                    },
                  ].map((item) => (
                    <div
                      key={item.phase}
                      className="rounded-lg border border-volt/10 bg-card p-4"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="bg-volt/10 text-volt font-code text-xs">
                          {item.phase}
                        </Badge>
                        <span className="font-code text-xs text-muted-foreground">
                          {item.time}
                        </span>
                        <span className="font-code text-xs text-volt/60">
                          {item.pct}% of pitch
                        </span>
                      </div>
                      <blockquote className="mt-2 border-l-2 border-volt/30 pl-3 font-body text-sm italic text-foreground/80">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <p className="mt-1 font-code text-xs text-foreground/50">
                        Technique: {item.technique}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Frameworks Identified
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Sinek Start With Why",
                    "Duarte Sparkline",
                    "Aristotle Appeals",
                    "Heath SUCCESs",
                    "Raskin Strategic Narrative",
                  ].map((fw) => (
                    <Badge
                      key={fw}
                      variant="outline"
                      className="border-volt/20 text-volt font-code text-xs"
                    >
                      {fw}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Strongest Moment
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 size-4 shrink-0 text-volt" />
                    <div className="space-y-1">
                      <p className="font-code text-xs text-volt/60">
                        Spike O&apos;Carroll, DispatchAI pitch video, UC Berkeley
                        AI Hackathon 2024 @ 3:43 – 3:50
                      </p>
                      <blockquote className="font-body text-sm italic text-foreground/80">
                        &ldquo;See, you can see that our call updates in real
                        time on the dashboard, and our transcription is on the
                        right.&rdquo;
                      </blockquote>
                      <p className="font-body text-xs text-foreground/60">
                        The demo makes it tangible. Real-time transcription plus
                        a live dashboard turns abstract claims into observable
                        behavior. A small glitch and quick recovery even boosted
                        authenticity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                <p className="font-code text-xs text-volt/80">
                  <span className="font-semibold">Why it won:</span>{" "}
                  A quantifiable problem (80%+ understaffed centers) met concrete
                  execution (voice AI, live triage dashboard, fine-tuning on real
                  911 data) and a clear human-in-the-loop safety posture. Tightly
                  aligned with AI For Good, Best Use of Intel AI, and investment
                  readiness.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://devpost.com/software/dispatch-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-code text-xs text-volt/60 underline decoration-volt/30 hover:decoration-volt"
                >
                  <ExternalLink className="size-3" />
                  View on Devpost
                </a>
                <a
                  href="https://www.youtube.com/watch?v=hdpdgxrilQM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-code text-xs text-volt/60 underline decoration-volt/30 hover:decoration-volt"
                >
                  <Play className="size-3" />
                  Watch pitch
                </a>
              </div>
            </CardContent>
          </Card>

          {/* --- CASE STUDY 2: TalkTuahBank --- */}
          <Card className="glow-hover overflow-hidden border-spark/20">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                  <Trophy className="size-5 text-spark" />
                </div>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  CASE STUDY 2
                </Badge>
                <Badge
                  variant="outline"
                  className="border-spark/20 text-spark font-code text-xs"
                >
                  1ST OVERALL
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-spark">
                TalkTuahBank — HackUTD 2024
              </CardTitle>
              <CardDescription className="font-body text-base">
                1st Overall + Goldman Sachs Challenge Winner. The largest
                24-hour hackathon in the US.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-hidden rounded-lg border border-spark/10">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/YsH_z1azXSA"
                    title="TalkTuahBank Pitch Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pitch Structure Breakdown (2 min 11 sec)
                </p>
                <p className="font-body text-xs text-foreground/60">
                  Quotes below are transcribed from the TalkTuahBank team&apos;s
                  demo video (HackUTD 2024, November 2024). The Big Shift and
                  Stakes lines are the team&apos;s narrator; the Live Demo, How
                  It Works, and Vision lines are spoken by the product&apos;s AI
                  agent during the recorded call. Spoken audio is lightly cleaned
                  for repeated words.
                </p>
                <div className="space-y-2">
                  {[
                    {
                      phase: "Big Shift",
                      time: "0:00 – 0:05",
                      pct: 4,
                      quote:
                        "Did you know that over 1.7 billion adults worldwide don't have access to traditional banking services?",
                      technique:
                        "Statistic hook to establish global scale and urgency",
                    },
                    {
                      phase: "Stakes",
                      time: "0:05 – 0:14",
                      pct: 7,
                      quote:
                        "It's an AI-powered telephonic banking service that brings financial management to anyone with a phone, no internet, or smartphone needed.",
                      technique:
                        "Low-barrier access framing to maximize perceived impact",
                    },
                    {
                      phase: "Live Demo",
                      time: "0:14 – 1:10",
                      pct: 42,
                      quote:
                        "Hey, I can help with things like checking your account balance, transferring funds, and even getting you started on a loan application.",
                      technique:
                        "Show-don't-tell role-play demo with concrete details",
                    },
                    {
                      phase: "How It Works",
                      time: "1:10 – 1:49",
                      pct: 30,
                      quote:
                        "Awesome, you've successfully transferred $200 to account ACC 456.",
                      technique:
                        "Tangible proof point: completed real transaction",
                    },
                    {
                      phase: "Vision",
                      time: "1:49 – 2:11",
                      pct: 17,
                      quote:
                        "If there's anything else you need, feel free to let me know.",
                      technique:
                        "Always-on service vision, normalizing conversational banking",
                    },
                  ].map((item) => (
                    <div
                      key={item.phase}
                      className="rounded-lg border border-spark/10 bg-card p-4"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="bg-spark/10 text-spark font-code text-xs">
                          {item.phase}
                        </Badge>
                        <span className="font-code text-xs text-muted-foreground">
                          {item.time}
                        </span>
                        <span className="font-code text-xs text-spark/60">
                          {item.pct}% of pitch
                        </span>
                      </div>
                      <blockquote className="mt-2 border-l-2 border-spark/30 pl-3 font-body text-sm italic text-foreground/80">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <p className="mt-1 font-code text-xs text-foreground/50">
                        Technique: {item.technique}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Frameworks Identified
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Sinek Start With Why",
                    "Duarte Sparkline",
                    "Aristotle Appeals",
                    "Heath SUCCESs",
                    "Raskin Strategic Narrative",
                  ].map((fw) => (
                    <Badge
                      key={fw}
                      variant="outline"
                      className="border-spark/20 text-spark font-code text-xs"
                    >
                      {fw}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Strongest Moment
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 size-4 shrink-0 text-spark" />
                    <div className="space-y-1">
                      <p className="font-code text-xs text-spark/60">
                        TalkTuahBank AI agent, demo video, HackUTD 2024 @ 1:20
                      </p>
                      <blockquote className="font-body text-sm italic text-foreground/80">
                        &ldquo;Awesome, you&apos;ve successfully transferred
                        $200 to account ACC 456.&rdquo;
                      </blockquote>
                      <p className="font-body text-xs text-foreground/60">
                        One line converts the concept into a verifiable outcome:
                        money moved. It turns abstract &ldquo;voice
                        banking&rdquo; claims into a believable, tangible result.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                <p className="font-code text-xs text-spark/80">
                  <span className="font-semibold">Why it won:</span> A
                  high-impact problem (1.7B unbanked) met a low-cost channel
                  (phone calls) and a working demo that executes real financial
                  operations. Credible details (account IDs, dollar amounts, a
                  &ldquo;loan for college&rdquo; micro-story) proved feasibility
                  and matched Goldman Sachs&apos; financial inclusion brief.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://devpost.com/software/talktuahbank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-code text-xs text-spark/60 underline decoration-spark/30 hover:decoration-spark"
                >
                  <ExternalLink className="size-3" />
                  View on Devpost
                </a>
                <a
                  href="https://www.youtube.com/watch?v=YsH_z1azXSA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-code text-xs text-spark/60 underline decoration-spark/30 hover:decoration-spark"
                >
                  <Play className="size-3" />
                  Watch pitch
                </a>
              </div>
            </CardContent>
          </Card>

          {/* --- CASE STUDY 3: AdaptEd --- */}
          <Card className="glow-hover overflow-hidden border-primary/20">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Trophy className="size-5 text-primary" />
                </div>
                <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                  CASE STUDY 3
                </Badge>
                <Badge
                  variant="outline"
                  className="border-primary/20 text-primary font-code text-xs"
                >
                  1ST AMONG 142 PROJECTS
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-primary">
                AdaptEd — LA Hacks 2024
              </CardTitle>
              <CardDescription className="font-body text-base">
                Google Company Challenge Winner. First place among 142 projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pitch Structure (Reconstructed from Devpost)
                </p>
                <p className="font-body text-xs text-foreground/60">
                  These lines come from the AdaptEd team&apos;s own Devpost
                  writeup (LA Hacks 2024), not from a recorded pitch. Lines in
                  quotation marks are verbatim; the rest are condensed
                  summaries of longer passages. The statistics are the
                  team&apos;s own claims and carry no citation on Devpost.
                </p>
                <div className="space-y-2">
                  {[
                    {
                      phase: "Big Shift",
                      verbatim: true,
                      quote:
                        "Instead of students adapting to the system, our AI lecturer adapts to students.",
                      technique:
                        "Contrarian, single-line reframe that reverses expectations",
                    },
                    {
                      phase: "Stakes",
                      verbatim: false,
                      quote:
                        "50% of 16M US university students are falling behind. Less than 3% have access to quality tutoring.",
                      technique:
                        "Quantified pain + inequity framing with both percentage and population",
                    },
                    {
                      phase: "Live Demo",
                      verbatim: false,
                      quote:
                        "Responsive AI conversation, dynamic slide and whiteboard content, emotion detection.",
                      technique:
                        "Show-don't-tell micro-scenario mapping features to outcomes",
                    },
                    {
                      phase: "How It Works",
                      verbatim: false,
                      quote:
                        "Gemini 1.5 Pro for multi-source aggregation, Fetch.ai agents, Intel Developer Cloud for fine-tuning, Hume for emotion detection.",
                      technique:
                        "Technical transparency: each component assigned a clear role",
                    },
                    {
                      phase: "Vision",
                      verbatim: true,
                      quote:
                        "AdaptEd: interactive and personalized lectures through conversational voice AI.",
                      technique:
                        "Concise product vision paired with scale implication",
                    },
                  ].map((item) => (
                    <div
                      key={item.phase}
                      className="rounded-lg border border-primary/10 bg-card p-4"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="bg-primary/10 text-primary font-code text-xs">
                          {item.phase}
                        </Badge>
                      </div>
                      <blockquote className="mt-2 border-l-2 border-primary/30 pl-3 font-body text-sm italic text-foreground/80">
                        {item.verbatim ? (
                          <>&ldquo;{item.quote}&rdquo;</>
                        ) : (
                          item.quote
                        )}
                      </blockquote>
                      <p className="mt-1 font-code text-xs text-foreground/50">
                        Technique: {item.technique}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Frameworks Identified
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Sinek Start With Why",
                    "Duarte Sparkline",
                    "Aristotle Appeals",
                    "Heath SUCCESs",
                    "Raskin Strategic Narrative",
                  ].map((fw) => (
                    <Badge
                      key={fw}
                      variant="outline"
                      className="border-primary/20 text-primary font-code text-xs"
                    >
                      {fw}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Strongest Moment
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div className="space-y-1">
                      <p className="font-code text-xs text-primary/60">
                        AdaptEd team, Devpost writeup, LA Hacks 2024
                        (reconstructed, not a recorded pitch line)
                      </p>
                      <blockquote className="font-body text-sm italic text-foreground/80">
                        &ldquo;Instead of students adapting to the system, our
                        AI lecturer adapts to students.&rdquo;
                      </blockquote>
                      <p className="font-body text-xs text-foreground/60">
                        A crisp, counterintuitive reframe that signals
                        differentiation and mission at once. It gives judges a
                        single mental image to hold, the memorable positioning
                        that wins short-form competitions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                <p className="font-code text-xs text-primary/80">
                  <span className="font-semibold">Why it won:</span> An urgent,
                  measurable problem (large population, inequitable tutoring
                  access) met a productized solution and explicit sponsor
                  alignment (heavy Gemini use). It opened with a human story for
                  empathy, quantified scale for impact, demoed a believable
                  workflow, and listed exact integrations to prove execution.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://devpost.com/software/teachme-3p7bw1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-code text-xs text-primary/60 underline decoration-primary/30 hover:decoration-primary"
                >
                  <ExternalLink className="size-3" />
                  View on Devpost
                </a>
              </div>
            </CardContent>
          </Card>

          {/* --- PATTERNS ACROSS WINNERS --- */}
          <div className="space-y-6">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Patterns Across Winners
            </p>

            <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Lead With a Number",
                  description:
                    'All three pitches opened with a concrete statistic or quantified problem: "80% understaffed," "1.7 billion unbanked," "50% falling behind." Numbers create immediate scale and urgency.',
                  accent: "volt" as const,
                },
                {
                  icon: Monitor,
                  title: "Demo is the Main Event",
                  description:
                    "DispatchAI allocated 28% and TalkTuahBank allocated 44% of total pitch time to live demo. Judges remember what they saw, not what they heard.",
                  accent: "spark" as const,
                },
                {
                  icon: Users,
                  title: "Align With Sponsors",
                  description:
                    "Each winning project explicitly used sponsor technology and called it out: Intel Dev Cloud, Goldman Sachs financial inclusion, Google Gemini. Sponsor alignment is a multiplier.",
                  accent: "primary" as const,
                },
                {
                  icon: Heart,
                  title: "Emotional Stakes",
                  description:
                    '"Life and death" (DispatchAI), "1.7B excluded" (TalkTuahBank), "students falling behind" (AdaptEd). Every winning pitch converted data into human cost.',
                  accent: "spark" as const,
                },
                {
                  icon: Lightbulb,
                  title: "One-Line Reframe",
                  description:
                    'Each pitch had a single sentence that encapsulated the entire vision: "world\'s first AI 911 operator," "talk to your own personalized bank," "AI lecturer adapts to students."',
                  accent: "volt" as const,
                },
                {
                  icon: Layers,
                  title: "All 5 Frameworks Present",
                  description:
                    "All five persuasion frameworks (Sinek, Duarte, Aristotle, Heath, Raskin) are visible in each of these three pitches. Winning pitches don't use one framework; they layer all of them.",
                  accent: "primary" as const,
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
                };
                const c = colors[item.accent];
                return (
                  <div
                    key={item.title}
                    className={`glow-hover rounded-xl border ${c.border} bg-card p-5 transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${c.bg}`}
                      >
                        <item.icon className={`size-4 ${c.text}`} />
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
                  The pattern is clear:
                </span>{" "}
                Winning pitches follow a formula. Open with a quantified problem,
                reframe with a one-liner, spend most of the time on a working
                demo, align with sponsor priorities, and close with a vision
                that makes judges feel something. The frameworks above aren&apos;t
                theory. They are what winners use.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            KNOW YOUR JUDGES
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Know Your Judges"
            subtitle="Not all prizes are judged the same way. Track prizes and sponsor prizes reward completely different things. Understanding who's evaluating you and what they care about is the difference between a good pitch and a winning one."
          />

          <KeyTakeaway>Track prizes reward impact and vision; sponsor prizes reward creative, deep use of their tech. Pitch each differently.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            <span className="font-display font-semibold text-foreground">
              The same pitch wins one prize and loses another.
            </span>{" "}
            That&apos;s not bad luck. It&apos;s a failure to read the room. Every
            category has a different audience with different values. Identify
            what each cares about and adjust.
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Globe className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    TRACK PRIZES
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Sell the Vision, Tug the Heartstrings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Track prizes (&ldquo;Best AI for Good,&rdquo; &ldquo;Best
                  Sustainability Hack&rdquo;) are judged on{" "}
                  <span className="font-display font-semibold text-foreground">
                    impact, vision, and societal benefit.
                  </span>{" "}
                  Judges are often academics, nonprofit leaders, or organizers
                  who care about the &ldquo;why&rdquo; over the &ldquo;how.&rdquo;
                </p>

                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    What Track Judges Want to Hear
                  </p>
                  <ul className="space-y-2 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span><span className="font-semibold text-foreground">Bigger picture:</span> who this benefits (society, underserved communities, children, the environment)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span><span className="font-semibold text-foreground">Human stories</span> that make judges feel the problem, not just understand it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span><span className="font-semibold text-foreground">Scale vision:</span> the world where your project reaches millions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span><span className="font-semibold text-foreground">Equity by design:</span> sustainability and accessibility, not afterthoughts</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Lead with pathos. Make them care before you explain how it
                    works. Technical depth supports the story, it isn&apos;t the
                    headline.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Building2 className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    SPONSOR PRIZES
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Showcase Their Software, Think Like a Stockholder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Sponsor prizes are judged by{" "}
                  <span className="font-display font-semibold text-foreground">
                    company employees
                  </span>{" "}
                  thinking about their product. They want creative, deep usage
                  of their platform, something they can point to internally:
                  &ldquo;look what someone built with our tech.&rdquo;
                </p>

                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    What Sponsor Judges Want to See
                  </p>
                  <ul className="space-y-2 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span><span className="font-semibold text-foreground">Unexpected usage:</span> their tech in a way they hadn&apos;t considered, not a &ldquo;hello world&rdquo; integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span><span className="font-semibold text-foreground">New market:</span> a use case that shows a novel monetization path for their product</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span><span className="font-semibold text-foreground">Center stage:</span> their platform as the centerpiece of your demo, not a footnote</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span><span className="font-semibold text-foreground">Real depth:</span> proof you read the docs and pushed past the quickstart</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Think like a stockholder. The question in their head is
                    &ldquo;does this project show our software can do something
                    valuable?&rdquo; Make the answer obvious.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glow-hover border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Compass className="size-5 text-primary" />
                </div>
                <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                  REAL-TIME ADAPTATION
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-primary">
                Read the Room
              </CardTitle>
              <CardDescription className="font-body text-base">
                The best pitchers don&apos;t deliver the same pitch every time.
                They adapt in real time based on who&apos;s sitting in front of
                them.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="font-body text-sm text-foreground/80">
                If the format allows, ask one question up front: &ldquo;Are you
                all in the engineering field?&rdquo; Their answer tells you how
                to weight your pitch.
              </p>

              <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-volt/20 bg-volt/5 p-4">
                  <div className="flex items-center gap-2">
                    <Brain className="size-4 text-volt" />
                    <p className="font-display text-sm font-semibold text-volt">
                      Engineers
                    </p>
                  </div>
                  <ul className="mt-3 space-y-2 font-body text-xs text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-volt" />
                      Lead with architecture and system design
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-volt" />
                      Highlight novel algorithms or clever technical tradeoffs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-volt" />
                      Talk scalability, latency, and edge cases
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-volt" />
                      Show the code if they want to see it
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-spark/20 bg-spark/5 p-4">
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 text-spark" />
                    <p className="font-display text-sm font-semibold text-spark">
                      Non-Technical
                    </p>
                  </div>
                  <ul className="mt-3 space-y-2 font-body text-xs text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-spark" />
                      Lead with the human problem and who it helps
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-spark" />
                      Emphasize UX, market opportunity, and user stories
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-spark" />
                      Use analogies to make the tech feel intuitive
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-spark" />
                      Focus on what it does, not how it works
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2">
                    <Scale className="size-4 text-primary" />
                    <p className="font-display text-sm font-semibold text-primary">
                      Unknown / Mixed
                    </p>
                  </div>
                  <ul className="mt-3 space-y-2 font-body text-xs text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                      Lead with impact and vision (universally resonant)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                      Let the demo speak for itself
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                      Pivot to technical depth only if follow-up questions go
                      that direction
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                      Have both versions rehearsed so you can switch mid-pitch
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                <p className="font-code text-xs text-primary/80">
                  This is rehearsed, not improvised. Practice two versions: one
                  leading with technical depth, one with impact. Switch based on
                  who you&apos;re talking to.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                The meta-skill:
              </span>{" "}
              Winning teams prepare a pitch that bends. The core story stays the
              same; the emphasis shifts to the audience. A 30-second tweak in
              framing separates &ldquo;interesting project&rdquo; from first
              place.
            </p>
          </div>
        </section>

        {/* ============================================================
            THE DEMO VIDEO
            ============================================================ */}
        <section id="the-demo-video" className="space-y-8 scroll-mt-20">
          <SectionHeading
            title="The Demo Video"
            subtitle="A polished demo video can be the difference between walking away empty-handed and pocketing serious cash. It's the secret weapon most teams neglect."
          />

          <KeyTakeaway>A demo video puts your project on stage and follows judges into deliberation when you can&apos;t.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Monitor className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    SHOW & TELL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Your Show-and-Tell
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">A video puts your project on stage.</span>{" "}
                  Code hidden behind a repo or README rarely stands out. Judges
                  see it, feel it, and remember it.
                </p>
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="font-display text-lg font-bold text-volt">
                    Visual proof
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    beats any description
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Eye className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    DELIBERATION
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Follows the Judges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">A video follows judges into deliberation.</span>{" "}
                  Live presentations get rushed and forgotten. Judges forget
                  projects more than you&apos;d expect; your video is the visual
                  reminder.
                </p>
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-lg font-bold text-spark">
                    Persists
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    after you leave the room
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Camera className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    TOOLS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Recording Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  On Mac, I reach for{" "}
                  <a
                    href="https://screenstudio.lemonsqueezy.com?aff=LpD9R"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline decoration-primary/30 hover:decoration-primary"
                  >
                    Screen Studio
                  </a>
                  . CanVid covers the same ground on Windows. Both handle
                  auto-zoom, instant editing, effects, and selfie overlays,
                  saving hours when every hackathon hour matters.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    <span className="font-semibold">My pick:</span> Screen
                    Studio. Auto-zoom and cursor smoothing alone make a 60 second
                    demo look like a product launch. Worth a look on Mac.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Key Features
                  </p>
                  <ul className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Automatic zoom on cursor movements
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Built-in webcam overlay for personality
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Effects baked in seconds, not hours
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-1">
            <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">REAL EXAMPLES</Badge>
            <h3 className="font-display text-2xl font-bold tracking-tight">A demo video that turned work into an outcome</h3>
            <p className="font-body text-sm text-muted-foreground">Notice how it gets the product on screen fast, narrates what the viewer is seeing, and lets the actual interaction do the convincing.</p>
          </div>

          <div className="md:max-w-2xl">
            {/* Demo video: SoundSearch — solo first-place project at AIATL that led to an internship offer */}
            <Card className="glow-hover overflow-hidden border-spark/20">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Sparkles className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    DEMO VIDEO
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-spark/20 text-spark font-code text-xs"
                  >
                    SOLO 1ST PLACE + INTERNSHIP OFFER
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  SoundSearch — AIATL Hackathon
                </CardTitle>
                <CardDescription className="font-body text-sm">
                  A solo first-place accessibility tool that guides users
                  through complex websites via real-time voice over a phone
                  call. Built with NLX.ai and AWS, demoed on Google Flights.
                  The recording reached a recruiter and turned into an
                  internship offer.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-hidden rounded-lg border border-spark/10">
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/RgH-i9SYj-o?start=22"
                      title="SoundSearch demo video, solo 1st place at AIATL, that led to an internship offer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="size-full"
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    <span className="font-semibold">Why it works:</span> The
                    embed skips the problem-framing intro, so the product is on
                    screen in the first beat. No setup to sit through: the
                    recruiter hears the voice assistant walk Google Flights end
                    to end and gets it instantly. The video became the portfolio
                    piece, not the repo.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://youtu.be/RgH-i9SYj-o?t=22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-code text-xs text-spark/60 underline decoration-spark/30 hover:decoration-spark"
                  >
                    <Play className="size-3" />
                    Watch on YouTube
                  </a>
                  <a
                    href="https://devpost.com/software/maybe-zc19va"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-code text-xs text-spark/60 underline decoration-spark/30 hover:decoration-spark"
                  >
                    <ExternalLink className="size-3" />
                    View on Devpost
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- RECORDER I USE: SCREEN STUDIO --- */}
          <div className="glass overflow-hidden rounded-2xl border border-volt/15 bg-volt/[0.03] p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-volt/10">
                <Camera className="size-7 text-volt" />
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-volt/30 text-volt font-code text-xs"
                  >
                    <Star className="mr-1 size-3" />
                    My pick
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-volt/20 text-volt/80 font-code text-xs"
                  >
                    macOS
                  </Badge>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  Screen Studio
                </h3>
                <p className="font-body text-sm text-foreground/80">
                  The screen recorder I use for every hackathon demo. Auto-zoom
                  and cursor smoothing make a 60-second demo look like a product
                  launch, with basically no editing time. Worth a look if
                  you&apos;re on Mac.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Automatic cursor zoom",
                    "Smooth cursor glide",
                    "Webcam overlay",
                    "1-click export presets",
                  ].map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-1.5 font-code text-xs text-volt/80"
                    >
                      <CheckCircle2 className="size-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="https://screenstudio.lemonsqueezy.com?aff=LpD9R"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-volt/40 px-5 py-2.5 font-display text-sm font-semibold text-volt transition-all hover:border-volt hover:bg-volt/10 md:self-center"
              >
                Check it out
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                The hack:
              </span>{" "}
              Never underestimate a good show-and-tell. Code makes your project
              great, but a compelling demo video and pitch seal the deal.
              Don&apos;t let weak presentation overshadow your work.
            </p>
          </div>
        </section>

        {/* ============================================================
            THE APPENDIX STRATEGY
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Appendix Strategy"
            subtitle="Assume your pitch will be incomplete. Design it that way on purpose. This counterintuitive technique is what separates good pitchers from great ones."
          />

          <KeyTakeaway>Put 90% in the main pitch; pre-build appendix slides to win the Q&amp;A where projects are actually decided.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            <span className="font-semibold text-foreground">Be selective.</span>{" "}
            Pitches are short and judges are tired. You can&apos;t explain
            everything in 3 minutes and still keep the room.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  MAIN PITCH
                </Badge>
                <CardTitle className="font-display text-2xl text-volt">
                  The 90% Slides
                </CardTitle>
                <CardDescription className="font-body text-base">
                  The essentials ~90% of judges care about: problem, solution,
                  demo, and impact.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Problem:</span> why this matters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Solution:</span> what you built</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Live demo:</span> the main event</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Impact:</span> what could be</span>
                  </li>
                </ul>
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-volt">
                    60-70%
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    of your time on the live demo
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
                  Q&A triggers
                </p>
              </div>
            </div>

            {/* Mobile connector */}
            <div className="flex items-center justify-center py-2 md:hidden">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-volt to-spark" />
                <ArrowRight className="size-5 text-spark" />
                <p className="font-code text-xs text-muted-foreground">
                  Q&A triggers
                </p>
              </div>
            </div>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  APPENDIX
                </Badge>
                <CardTitle className="font-display text-2xl text-spark">
                  The 20% Slides
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Pre-built answers you don&apos;t show unless asked, ready for
                  the questions judges are likely to raise.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Architecture:</span> how it actually works</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Tradeoffs:</span> what you chose and why</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">Edge cases:</span> what breaks at scale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">What&apos;s next:</span> roadmap beyond the hackathon</span>
                  </li>
                </ul>
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-spark">
                    Instant
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    navigate to the right slide when asked
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Why This Works
            </p>
            <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Sparkles,
                  title: "Shows Extra Preparation",
                  description:
                    "Pull up a prepared slide for a follow-up and judges notice. It signals you thought deeper than the pitch.",
                  accent: "volt" as const,
                },
                {
                  icon: Clock,
                  title: "Keeps the Pitch Short",
                  description:
                    "A shorter main pitch frees more time for the live demo. Judges would rather see it work than hear you describe it.",
                  accent: "spark" as const,
                },
                {
                  icon: MessageSquare,
                  title: "Wins the Q&A",
                  description:
                    "Real evaluation happens in the follow-up questions. The last 1-2 minutes reveal whether you understand what you built.",
                  accent: "primary" as const,
                },
                {
                  icon: Target,
                  title: "Looks Like Confidence",
                  description:
                    "It looks like confidence. It's really just preparation while sleep-deprived. Navigate to the slide, answer, move on.",
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
                    key={item.title}
                    className={`glow-hover rounded-xl border ${c.border} bg-card p-5 transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${c.bg}`}
                      >
                        <item.icon className={`size-4 ${c.text}`} />
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
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                The failure pattern:
              </span>{" "}
              Strong projects lose in Q&A every hackathon. A fair question. A
              pause. &ldquo;Good question.&rdquo; Time&apos;s up. Prep answers,
              not just a pitch. The conversation after is where winners are
              decided.
            </p>
          </div>
        </section>

        {/* ============================================================
            PITCHING UNDER PRESSURE (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <Disclosure
            title="Pitching Under Pressure"
            subtitle="Optional: what pitching on no sleep teaches you, and why it makes you better."
            badge="Optional: mindset"
            accent="spark"
          >
            <KeyTakeaway>Pitching on no sleep strips the polish: be vulnerable, talk with judges not at them, and rehearse until it&apos;s muscle memory.</KeyTakeaway>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Heart className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    BRENÉ BROWN
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  The Power of Vulnerability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;In order for connection to happen, we have to allow
                  ourselves to be seen, really seen.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Later in the same talk, Brown describes what the people she
                  calls wholehearted had in common: &ldquo;these folks had, very
                  simply, the courage to be imperfect.&rdquo; No sleep strips
                  away the polish. You explain what you built honestly, flaws
                  included. You stop trying to impress and start trying to
                  communicate. That makes you more convincing.
                </p>
                <p className="font-body text-sm text-foreground/60">
                  Share a real setback: &ldquo;We thought X, then talked to
                  users and learned Y.&rdquo; Admitting what you didn&apos;t know
                  makes you more human and credible.
                </p>
                <p className="font-code text-xs text-spark/60">
                  — Brené Brown, research professor, University of Houston
                  Graduate College of Social Work,{" "}
                  <a href="https://www.ted.com/talks/brene_brown_the_power_of_vulnerability" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">The Power of Vulnerability, TEDxHouston 2010</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Presentation className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    DALE CARNEGIE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Talk With, Not At
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;Speakers who talk about what life has taught them never
                  fail to keep the attention of their listeners.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Carnegie&apos;s principle: speak{" "}
                  <span className="font-semibold text-foreground">with</span>{" "}
                  judges, not at them. The most powerful moments come from genuine
                  stories: the 3AM breakthrough, the pivot that saved the
                  project, the user interview that changed everything.
                </p>
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    The Carnegie Structure
                  </p>
                  <ol className="space-y-1.5 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-volt/10 font-code text-xs text-volt">
                        1
                      </span>
                      Tell them what you&apos;re going to say
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-volt/10 font-code text-xs text-volt">
                        2
                      </span>
                      Say it
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-volt/10 font-code text-xs text-volt">
                        3
                      </span>
                      Tell them what you said
                    </li>
                  </ol>
                </div>
                <p className="font-code text-xs text-volt/60">
                  — Dale Carnegie, American writer and lecturer,{" "}
                  <a href="https://www.simonandschuster.com/books/The-Quick-and-Easy-Way-to-Effective-Speaking/Dorothy-Carnegie/Dale-Carnegie-Books/9780671724009" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">The Quick and Easy Way to Effective Speaking, 1962</a>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: CircleDot,
                title: "Practice = Code",
                description:
                  "Rehearse your pitch as much as you code. Most teams rehearse once. Winners rehearse until it's muscle memory.",
                accent: "volt" as const,
              },
              {
                icon: FileQuestion,
                title: "Prep for Q&A",
                description:
                  "Anticipate every question: architecture, tradeoffs, edge cases, cost, scale, what's next. Have an appendix slide for each.",
                accent: "spark" as const,
              },
              {
                icon: Video,
                title: "Record Yourself",
                description:
                  "Watch yourself pitch. You'll catch filler words, pacing, and missed beats you'd never notice live.",
                accent: "primary" as const,
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
              };
              const c = colors[item.accent];
              return (
                <div
                  key={item.title}
                  className={`glow-hover rounded-xl border ${c.border} bg-card p-5 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${c.bg}`}
                    >
                      <item.icon className={`size-4 ${c.text}`} />
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
          </Disclosure>
        </section>

        {/* ============================================================
            GOLDEN RULE — STORYTELLING QUOTE
            ============================================================ */}
        <section className="space-y-8">
          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;Your purpose is to make your audience see what you saw,
                hear what you heard,{" "}
                <span className="animate-shimmer">
                  feel what you felt.
                </span>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                — Dale Carnegie, American writer and lecturer,{" "}
                <a href="https://www.simonandschuster.com/books/The-Quick-and-Easy-Way-to-Effective-Speaking/Dorothy-Carnegie/Dale-Carnegie-Books/9780671724009" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">The Quick and Easy Way to Effective Speaking, 1962</a>
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    Winning isn&apos;t about cramming more tech into the pitch.
                  </span>{" "}
                  It&apos;s about being ready for the conversation after. Winning
                  teams aren&apos;t always the most technical. They make judges
                  feel something, believe the vision, and think &ldquo;that team
                  gets it.&rdquo;
                </p>
                <p className="font-body text-foreground/80">
                  Practice your pitch as much as your code. Use analogies to make
                  tech relatable. Show passion; enthusiasm is contagious. Above
                  all, pivot to judges&apos; reactions. The best pitchers
                  don&apos;t recite. They converse.
                </p>
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    In hackathons and in life, it&apos;s not just about what you
                    build. It&apos;s about the story you tell.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            PITCHING CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Pitching Checklist"
            subtitle="A step-by-step summary for crafting your next hackathon pitch. Follow this before every demo day."
          />

          <KeyTakeaway>Lead with why, build around the 90%, match the prize, spend 60-70% on the demo, and prep the Q&amp;A.</KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Start with WHY: lead with the problem and why it matters to you, not what you built",
                  accent: "volt",
                },
                {
                  text: "Build the main pitch around the 90%: problem, solution, live demo, impact",
                  accent: "spark",
                },
                {
                  text: "Identify the prize type (track or sponsor) and adjust your emphasis to match",
                  accent: "primary",
                },
                {
                  text: "Track prizes: lead with impact and the bigger picture. Sponsor prizes: make their tech the hero",
                  accent: "success",
                },
                {
                  text: "Ask judges their background, then adapt live: technical depth for engineers, vision for everyone else",
                  accent: "volt",
                },
                {
                  text: "Prep appendix slides: architecture, tradeoffs, edge cases, roadmap, cost at scale",
                  accent: "spark",
                },
                {
                  text: "Spend 60-70% of pitch time on the live demo so judges see it working",
                  accent: "primary",
                },
                {
                  text: "Record a demo video. It follows judges into deliberation when you can't",
                  accent: "success",
                },
                {
                  text: "Practice Q&A: anticipate each question, prep an answer, know which slide to open",
                  accent: "volt",
                },
                {
                  text: "Rehearse two versions (technical depth and impact) so you can switch mid-pitch",
                  accent: "spark",
                },
                {
                  text: "End with the vision. Leave judges with a feeling, not a feature list",
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
              The pitch isn&apos;t a summary of what you built. It&apos;s a
              performance that makes judges believe what you could build. Master
              storytelling and you win hackathons, hearts, minds, and maybe your
              dream job.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

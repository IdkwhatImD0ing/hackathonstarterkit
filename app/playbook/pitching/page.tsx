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

const section = PLAYBOOK_SECTIONS[4];

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

          <p className="font-body text-foreground/80">
            When people see a stack of hackathon wins they think &ldquo;Wow,
            that&apos;s a lot of code!&rdquo; What they don&apos;t see is that
            the real edge was never technical. It was always the ability to
            craft a compelling narrative.{" "}
            <span className="font-display font-semibold text-foreground">
              You&apos;re not selling what you built in 24 hours. You&apos;re
              selling the dream of what it could become.
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
                  A hackathon isn&apos;t about showcasing a finished product.
                  It&apos;s about pitching potential. The backend can be held
                  together with duct tape and hope, but if your story of how it
                  could change the world is irresistible, judges will lean in.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Focus on the problem you&apos;re solving, not just your
                    solution. Judges buy into visions, not feature lists.
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
                  Judges aren&apos;t a monolith. At a recent hackathon, the same
                  project was pitched three different ways to three different
                  judges, each time tailored to their expertise: the tech for
                  the engineer, the market for the VC, and the UX for the
                  designer. First place.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Show genuine passion because enthusiasm is contagious. Be
                    ready to pivot your story based on judges&apos; reactions in
                    real time.
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
                  The storytelling skill transfers everywhere, from startup
                  pitches to product management to technical interviews. One job was landed by
                  telling the story of a hackathon project that didn&apos;t even
                  win anything. The story mattered more than the result.
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
                  that&hellip;&rdquo; Winning teams pitch inside-out: start with{" "}
                  <span className="font-semibold text-foreground">why</span> you
                  care, then how you solve it, then what you built. The Golden
                  Circle moves judges from passive listeners to invested
                  supporters.
                </p>
                <p className="font-code text-xs text-volt/60">
                  —{" "}
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
                  &ldquo;Make the audience the hero of the presentation, not
                  yourself.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Duarte&apos;s Sparkline method alternates between the current
                  reality (&ldquo;what is&rdquo;) and the desired future
                  (&ldquo;what could be&rdquo;). This tension builds throughout
                  the pitch and resolves with your solution. Avoid spending the
                  whole time on either the problem or the future. Instead,
                  oscillate between both.
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
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
                      Ethos — Credibility
                    </p>
                    <p className="font-body text-xs text-foreground/60">
                      Quick team intro, relevant domain experience, why
                      you&apos;re the right people to solve this.
                    </p>
                  </div>
                  <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                    <p className="font-display text-sm font-semibold text-spark">
                      Pathos — Emotion
                    </p>
                    <p className="font-body text-xs text-foreground/60">
                      A real story, a user who suffers, a vision that
                      matters. &ldquo;Imagine a world where&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                    <p className="font-display text-sm font-semibold text-volt">
                      Logos — Logic
                    </p>
                    <p className="font-body text-xs text-foreground/60">
                      Architecture, metrics, validation, tech decisions. The
                      proof that your vision is achievable.
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
                  Six principles from Chip and Dan Heath that make ideas
                  unforgettable, which is exactly what you need when judges are
                  trying to remember your project hours later during
                  deliberation:
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
                          {" "}
                          — {item.desc}
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
            subtitle="A battle-tested pitch structure that works whether you have 2 minutes or 10. Based on Andy Raskin's strategic narrative framework and adapted for hackathons."
          />

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Name the Big Shift",
                time: "~20 seconds",
                description:
                  "Don't open with your product or team. Name the change in the world that creates stakes and urgency. When you assert a problem, judges can resist. When you describe a shift, they open up.",
                example:
                  '"Every year, 240 million 911 calls are placed in the US, yet dispatcher shortages mean some go unanswered."',
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Show the Stakes",
                time: "~20 seconds",
                description:
                  "Paint two futures: what happens if nothing changes (the losing path) versus what becomes possible (the winning path). Lean into loss aversion, since people fear losing more than they desire gaining.",
                example:
                  '"Lives are lost to hold music. But what if every call was answered instantly, by an AI that never sleeps?"',
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Live Demo — The Main Event",
                time: "~60-70% of total time",
                description:
                  "This is what judges care about most. Show it working. Let them see it, feel it, believe it. A working demo beats a thousand slides. Judges remember what they saw, not what they heard.",
                example:
                  "Call the Twilio number live. Let judges hear the AI dispatcher triage a simulated emergency in real time.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "The Magic — How It Works",
                time: "~20 seconds",
                description:
                  "Brief technical overview. You're the guide, not the hero, and your product is the \"magic gift\" that gets users to the promised land. Position your tech as the enabler, not the star.",
                example:
                  '"Under the hood: GPT-4 for triage, Twilio for telephony, and a custom priority queue that routes by severity."',
                accent: "success" as const,
              },
              {
                step: 5,
                title: "Vision and Close",
                time: "~15 seconds",
                description:
                  "End with where this goes. Instead of a feature roadmap, offer a glimpse of the future your project enables. Leave judges with a feeling, not a feature list.",
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
                  <a href="https://medium.com/the-mission/the-greatest-sales-deck-ive-ever-seen-4f4ef3391ba0" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/30 hover:decoration-foreground">Andy Raskin</a> — Strategic Narrative Expert
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;Your prospect is Luke, and you&apos;re Obi-Wan,
                  furnishing a lightsaber to help them defeat the Empire.
                  Position your product as the magic gift that gets the hero to
                  the promised land.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Judges are the heroes. Your project is the lightsaber. Frame it
                  that way.
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

          <p className="font-body text-foreground/80">
            Each pitch below was transcribed from its actual presentation video
            and analyzed using GPT-5 to identify structural phases, storytelling
            techniques, and the specific moments that won judges over. These
            aren&apos;t hypothetical examples; they are real pitches that won
            real prizes at major hackathons.
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
                  $62K+ IN PRIZES
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-volt">
                DispatchAI — UC Berkeley AI Hackathon
              </CardTitle>
              <CardDescription className="font-body text-base">
                Grand Prize ($25K SkyDeck investment) + AI For Good + Best Use
                of Intel AI. The largest AI hackathon in the US.
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
                  Pitch Structure Breakdown (4 min 32 sec)
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
                      time: "3:17 – 4:32",
                      pct: 28,
                      quote:
                        "Our call updates in real time on the dashboard, and our transcription is on the right.",
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
                        @ 3:43 – 3:50
                      </p>
                      <blockquote className="font-body text-sm italic text-foreground/80">
                        &ldquo;See, you can see that our call updates in real
                        time on the dashboard, and our transcription is on the
                        right.&rdquo;
                      </blockquote>
                      <p className="font-body text-xs text-foreground/60">
                        The demo makes the product tangible: real-time
                        transcription + dashboard visualization turns abstract
                        claims into observable behavior. The small glitch and
                        quick recovery actually increased perceived authenticity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                <p className="font-code text-xs text-volt/80">
                  <span className="font-semibold">Why it won:</span>{" "}
                  High-impact, quantifiable problem (80%+ understaffed centers)
                  combined with concrete technical execution (voice AI, live
                  triage dashboard, emotion-aware handling, fine-tuning on real
                  911 data) and a clear human-in-the-loop safety posture.
                  Aligned tightly with AI For Good, Best Use of Intel AI, and
                  investment readiness.
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
                  Pitch Structure Breakdown (2 min 6 sec)
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
                      pct: 44,
                      quote:
                        "Hey, I can help with things like checking your account balance, transferring funds, and even getting you started on a loan application.",
                      technique:
                        "Show-don't-tell role-play demo with concrete details",
                    },
                    {
                      phase: "How It Works",
                      time: "1:10 – 1:49",
                      pct: 31,
                      quote:
                        "Awesome, you've successfully transferred $200 to account A, capital C, 4, 5, 6.",
                      technique:
                        "Tangible proof point: completed real transaction",
                    },
                    {
                      phase: "Vision",
                      time: "1:49 – 2:06",
                      pct: 14,
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
                        @ 1:15
                      </p>
                      <blockquote className="font-body text-sm italic text-foreground/80">
                        &ldquo;Awesome, you&apos;ve successfully transferred
                        $200 to account A, capital C, 4, 5, 6.&rdquo;
                      </blockquote>
                      <p className="font-body text-xs text-foreground/60">
                        This single line converts the concept into a verifiable
                        outcome: money moved. It turns abstract claims about
                        &ldquo;voice banking&rdquo; into an immediately
                        believable, tangible result.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                <p className="font-code text-xs text-spark/80">
                  <span className="font-semibold">Why it won:</span> Combined
                  high-impact problem selection (1.7B unbanked) with an
                  accessible, low-cost channel (phone calls) and a working,
                  concrete demo that executes real financial operations.
                  Specific, credible details (account IDs, dollar amounts, a
                  &ldquo;loan for college&rdquo; micro-story) proved feasibility
                  while aligning perfectly with Goldman Sachs&apos; financial
                  inclusion brief.
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
                <div className="space-y-2">
                  {[
                    {
                      phase: "Big Shift",
                      quote:
                        "Instead of students adapting to the system, our AI lecturer adapts to students.",
                      technique:
                        "Contrarian, single-line reframe that reverses expectations",
                    },
                    {
                      phase: "Stakes",
                      quote:
                        "50% of 16M US university students are falling behind. Less than 3% have access to quality tutoring.",
                      technique:
                        "Quantified pain + inequity framing with both percentage and population",
                    },
                    {
                      phase: "Live Demo",
                      quote:
                        "Responsive AI conversation, dynamic slide and whiteboard content, emotion detection.",
                      technique:
                        "Show-don't-tell micro-scenario mapping features to outcomes",
                    },
                    {
                      phase: "How It Works",
                      quote:
                        "Gemini 1.5 Pro for multi-source aggregation, Fetch.ai agents, Intel Developer Cloud for fine-tuning, Hume for emotion detection.",
                      technique:
                        "Technical transparency: each component assigned a clear role",
                    },
                    {
                      phase: "Vision",
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
                      <blockquote className="font-body text-sm italic text-foreground/80">
                        &ldquo;Instead of students adapting to the system, our
                        AI lecturer adapts to students.&rdquo;
                      </blockquote>
                      <p className="font-body text-xs text-foreground/60">
                        A crisp, counterintuitive reframe that immediately
                        communicates differentiation and mission. It converts
                        abstract ed-tech claims into a single mental image that
                        judges can hold onto, which is exactly the kind of
                        memorable positioning that wins short-form competitions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                <p className="font-code text-xs text-primary/80">
                  <span className="font-semibold">Why it won:</span> Combined
                  an urgent, measurable problem (large population + inequitable
                  access to tutoring) with a plausible, productized technical
                  solution and explicit sponsor alignment (heavy use of
                  Gemini). Opened with a human story to generate empathy,
                  quantified scale to show impact, demonstrated a believable
                  prototype workflow, and listed exact tech integrations to
                  prove execution capability.
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
                    "GPT-5 identified all five persuasion frameworks (Sinek, Duarte, Aristotle, Heath, Raskin) in each pitch. Winning pitches don't use one framework; they layer all of them.",
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
                Winning pitches aren&apos;t random. They follow a consistent
                formula: open with a quantified problem, reframe with a
                one-liner, spend most of the time on a working demo, align with
                sponsor priorities, and close with a vision that makes judges
                feel something. The frameworks taught earlier on this page
                aren&apos;t academic theory; they are exactly what winners use.
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

          <p className="font-body text-foreground/80">
            The same project, pitched the same way, will win one prize and lose
            another. That&apos;s not bad luck.{" "}
            <span className="font-display font-semibold text-foreground">
              It&apos;s a failure to read the room.
            </span>{" "}
            Every prize category has a different audience with different values.
            Learn to identify what each audience cares about, and adjust your
            pitch accordingly.
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
                  Track prizes (like &ldquo;Best AI for Good,&rdquo;
                  &ldquo;Best Sustainability Hack,&rdquo; or &ldquo;Best
                  Education Project&rdquo;) are judged on{" "}
                  <span className="font-display font-semibold text-foreground">
                    impact, vision, and societal benefit.
                  </span>{" "}
                  The judges are often academics, nonprofit leaders, or
                  organizers who care about the &ldquo;why&rdquo; more than the
                  &ldquo;how.&rdquo;
                </p>

                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    What Track Judges Want to Hear
                  </p>
                  <ul className="space-y-2 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      The bigger picture: how does this benefit society,
                      underserved communities, children, the environment?
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      Real human stories that make judges feel the problem, not
                      just understand it
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      The &ldquo;what if this scaled?&rdquo; vision: paint the
                      world where your project reaches millions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      Sustainability, accessibility, and equity as design
                      principles, not afterthoughts
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Lead with pathos. Make them care before you explain how it
                    works. The technical depth is a supporting argument, not the
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
                  who are thinking about their product. They want to see creative,
                  deep usage of their platform, something they can point to
                  internally and say &ldquo;look what someone built with our
                  tech.&rdquo;
                </p>

                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    What Sponsor Judges Want to See
                  </p>
                  <ul className="space-y-2 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      Their tech used in a unique way they hadn&apos;t
                      considered, not just a basic &ldquo;hello world&rdquo;
                      integration
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      A use case that demonstrates a novel monetization path or
                      market for their product
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      Their platform as the centerpiece of your demo, not a
                      footnote at the end
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      Evidence that you actually read the docs, understood the
                      API, and pushed it beyond the quickstart
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
                If the format allows, ask the judges a simple question at the
                start: &ldquo;Are you all in the engineering field?&rdquo; Their
                answer tells you everything about how to weight your pitch.
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
                  This is a rehearsed skill, not improvisation. Practice your
                  pitch two ways: one version that leads with technical depth,
                  and one that leads with impact. Switch between them based on
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
              Winning teams don&apos;t just prepare one pitch. They prepare a
              pitch that can bend. The core story stays the same, but the
              emphasis shifts based on the audience. A 30-second adjustment in
              framing can be the difference between &ldquo;interesting
              project&rdquo; and first place.
            </p>
          </div>
        </section>

        {/* ============================================================
            THE DEMO VIDEO
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Demo Video"
            subtitle="A polished demo video can be the difference between walking away empty-handed and pocketing serious cash. It's the secret weapon most teams neglect."
          />

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
                  Code hidden behind a GitHub repo or plain README rarely stands
                  out. A demo video puts your project on stage. Judges see it,
                  feel it, and most importantly, remember it.
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
                  Your presentation is often rushed or forgotten in busy
                  hackathons. A demo video follows judges into deliberation.
                  Judges forget projects more often than you&apos;d expect, and
                  when they do, your video serves as a visual reminder.
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
                  Screen Studio (Mac) or CanVid (Windows) handle auto-zoom,
                  instant editing, effects, and selfie overlays. During
                  hackathons, where every second matters, these tools save hours
                  of manual editing.
                </p>
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

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                The hack:
              </span>{" "}
              Never underestimate the power of a good show-and-tell. Code makes
              your project great, but a compelling demo video and pitch seal the
              deal. Don&apos;t let poor presentation overshadow your hard work.
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

          <p className="font-body text-foreground/80">
            Hackathon pitches are short. Judges are tired. There&apos;s no world
            where you explain everything in 3 minutes and still keep the room.
            So be selective.
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
                  Put the stuff ~90% of judges care about in the main pitch.
                  Just the essentials: problem, solution, demo, and impact.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Problem statement — why this matters
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Solution overview — what you built
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Live demo — the main event
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Impact and vision — what could be
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
                  Slides you don&apos;t plan to show unless asked. Pre-built
                  answers to the questions judges are likely to ask.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Architecture diagram — how it actually works
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Tradeoffs — what you chose and why
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Edge cases — what breaks at scale
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    What&apos;s next — roadmap beyond the hackathon
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
                    "When you pull up a clearly prepared slide for a follow-up question, judges notice. It signals you thought deeper than the pitch.",
                  accent: "volt" as const,
                },
                {
                  icon: Clock,
                  title: "Keeps the Pitch Short",
                  description:
                    "A shorter main pitch means more time for the live demo. Judges care more about seeing it work than hearing you describe it.",
                  accent: "spark" as const,
                },
                {
                  icon: MessageSquare,
                  title: "Wins the Q&A",
                  description:
                    "The real evaluation happens in follow-up questions. That last 1-2 minutes is where judges figure out if you actually understand what you built.",
                  accent: "primary" as const,
                },
                {
                  icon: Target,
                  title: "Looks Like Confidence",
                  description:
                    "It looks like confidence. But it's really just preparation while extremely sleep-deprived. Navigate to the right slide, answer clearly, move on.",
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
              pause. &ldquo;Good question.&rdquo; Time&apos;s up. When you prep
              a pitch, prep answers. The conversation after the pitch is where
              winners are decided.
            </p>
          </div>
        </section>

        {/* ============================================================
            PITCHING UNDER PRESSURE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Pitching Under Pressure"
            subtitle="Hackathons broke the overpreparing-for-presentations habit. Here's what pitching on no sleep actually teaches you, and why it ultimately makes you better."
          />

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
                  ourselves to be seen, really seen. The courage to be
                  imperfect.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Pitching on no sleep strips away the polish. You show up
                  half-delirious, click through your slides, and explain what you
                  built honestly, flaws included. It forces you to be honest and concise.
                  You stop trying to impress and start trying to communicate.
                  And that makes you more convincing.
                </p>
                <p className="font-body text-sm text-foreground/60">
                  Share a real setback or learning: &ldquo;We initially thought
                  X, then we talked to users and learned Y.&rdquo; Admitting
                  what you didn&apos;t know makes you more human and credible.
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://www.ted.com/talks/brene_brown_the_power_of_vulnerability" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">The Power of Vulnerability, TED 2010</a>
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
                  Carnegie&apos;s timeless principle: speak{" "}
                  <span className="font-semibold text-foreground">with</span>{" "}
                  judges, not at them. Draw from real experiences. The most
                  powerful pitch moments come from genuine stories like the 3AM
                  breakthrough, the pivot that saved the project, or the user
                  interview that changed everything.
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
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/How_to_Win_Friends_and_Influence_People" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">How to Win Friends and Influence People</a>
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
                  "Practice your pitch as much as you code. Most teams rehearse once. Winning teams rehearse until the pitch is muscle memory.",
                accent: "volt" as const,
              },
              {
                icon: FileQuestion,
                title: "Prep for Q&A",
                description:
                  "Anticipate every question. Architecture, tradeoffs, edge cases, cost, scale, what's next. Have appendix slides ready for each.",
                accent: "spark" as const,
              },
              {
                icon: Video,
                title: "Record Yourself",
                description:
                  "Watch yourself pitch. You'll catch filler words, pacing issues, and missed beats you'd never notice in the moment.",
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
                —{" "}
                <a href="https://en.wikipedia.org/wiki/How_to_Win_Friends_and_Influence_People" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/30 hover:decoration-muted-foreground">Dale Carnegie, pioneer of public speaking</a>
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    Winning hackathons isn&apos;t about cramming more tech into
                    the pitch.
                  </span>{" "}
                  It&apos;s about being ready for the conversation after. The
                  teams that win aren&apos;t always the most technical. They&apos;re
                  the ones who make judges feel something, believe in the
                  vision, and walk away thinking &ldquo;that team gets
                  it.&rdquo;
                </p>
                <p className="font-body text-foreground/80">
                  Practice your pitch as much as you practice your code. Use
                  analogies to make complex tech relatable. Show passion because
                  enthusiasm is contagious. And above all, be ready to pivot your
                  story based on judges&apos; reactions. The best pitchers
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

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Start with WHY by leading with the problem and why it matters to you, not what you built",
                  accent: "volt",
                },
                {
                  text: "Build your main pitch around the 90%, covering problem, solution, live demo, and impact",
                  accent: "spark",
                },
                {
                  text: "Identify whether your target prize is a track or sponsor category, and adjust pitch emphasis accordingly",
                  accent: "primary",
                },
                {
                  text: "For track prizes, lead with societal impact, heartstrings, and the bigger picture; for sponsor prizes, make their tech the hero of your demo",
                  accent: "success",
                },
                {
                  text: "Ask judges about their background at the start and adapt in real time: technical depth for engineers, vision and impact for everyone else",
                  accent: "volt",
                },
                {
                  text: "Prep appendix slides covering architecture, tradeoffs, edge cases, roadmap, and cost at scale",
                  accent: "spark",
                },
                {
                  text: "Allocate 60-70% of pitch time to the live demo so judges can see it working instead of just hearing about it",
                  accent: "primary",
                },
                {
                  text: "Record a demo video because it follows judges into deliberation when you can't",
                  accent: "success",
                },
                {
                  text: "Practice Q&A by anticipating every question, preparing an answer, and knowing which slide to navigate to",
                  accent: "volt",
                },
                {
                  text: "Rehearse two versions of your pitch: one that leads with technical depth and one that leads with impact, so you can switch mid-presentation",
                  accent: "spark",
                },
                {
                  text: "End with the vision and leave judges with a feeling, not a feature list",
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
              performance that makes judges believe in what you could build. Master
              storytelling and you&apos;ll not only win hackathons but also hearts,
              minds, and maybe even your dream job.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

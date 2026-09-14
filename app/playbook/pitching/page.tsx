import type { Metadata } from "next";
import Link from "next/link";
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
import { shareMetadata } from "@/lib/metadata";
import { AffiliateLink, AffiliateDisclosure } from "@/components/affiliate-link";

const section = PLAYBOOK_SECTIONS[4];

export const metadata: Metadata = {
  title: "Hackathon Pitching — How to Pitch at a Hackathon and Win",
  description:
    "Craft a hackathon pitch that wins judges over in the first 30 seconds. Learn pitch structure, demo techniques, storytelling frameworks, and how to handle Q&A from judges.",
  alternates: {
    canonical: `${SITE_URL}/playbook/pitching`,
    types: markdownAlternate("/playbook/pitching"),
  },
  ...shareMetadata({
    path: "/playbook/pitching",
    title: "How to Pitch at a Hackathon and Win",
    description:
      "Pitch structure, demo techniques, and storytelling frameworks that win hackathon prizes. From the 36-win playbook.",
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

export default function PitchingPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            PITCH WHAT IT COULD BECOME
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Pitch What It Could Become"
            subtitle="My 36+ wins and $100K+ in prizes look like a lot of code. What usually set those projects apart was the story."
          />

          <KeyTakeaway>Spend your pitch on the problem and what the project could become, not on the feature list.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  <span className="font-semibold text-foreground">Pitch the potential.</span>{" "}
                  The backend can be duct tape and hope. If the story of what
                  it could do is convincing, and you sound like you care about
                  it, judges lean in.
                </p>
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
                  It Carries Over
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* [CONFIRM: this card used to say "One job came from telling the story of a project that won nothing." I've told it as the LA Hacks 2023 internship. Same story?] */}
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">The story can matter more than the result.</span>{" "}
                  At LA Hacks 2023 we didn&apos;t win, but I posted about the
                  project on LinkedIn and it caught an interviewer who was
                  building the exact same thing. A week later I had{" "}
                  <Link
                    href="/playbook/post-hackathon"
                    className="underline decoration-primary/30 hover:decoration-primary"
                  >
                    my first internship offer
                  </Link>
                  . Telling a project&apos;s story well also carries over to
                  startup pitches, product work, and technical interviews.
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
            subtitle="Five parts, adapted for hackathons from Andy Raskin's strategic narrative framework in 'The Greatest Sales Deck I've Ever Seen' (Medium, 2016). The sample lines use a 911-dispatch idea."
          />

          <KeyTakeaway>Open with a change in the world, show what&apos;s at stake, then show the product working live.</KeyTakeaway>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Name the Big Shift",
                time: "~20 seconds",
                description:
                  "Skip the product and team intro. Name a change in the world that raises the stakes. People argue with a problem you assert, but they're open to a shift that's already happening.",
                example:
                  '"Every year, 240 million 911 calls are placed in the US, yet dispatcher shortages mean some go unanswered." (240 million is the National Emergency Number Association\'s estimate.)',
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Show the Stakes",
                time: "~20 seconds",
                description:
                  "Paint two futures: what's lost if nothing changes, and what becomes possible.",
                example:
                  '"Lives are lost to hold music. But what if every call was answered instantly, by an AI that never sleeps?"',
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Live Demo",
                time: "28% or more of total time",
                description:
                  "Show the main flow working, live. The labeled demo took 28% of our Dispatch AI pitch and 42% of TalkTuahBank's, and TalkTuahBank kept the product working on screen after that too.",
                example:
                  "Call the Twilio number live. Let judges hear the AI dispatcher triage a simulated emergency in real time.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "The Magic — How It Works",
                time: "~20 seconds",
                description:
                  "Keep it short. Show what the tech does for the user, and save the architecture for Q&A.",
                example:
                  '"Under the hood: GPT-4 for triage, Twilio for telephony, and a custom priority queue that routes by severity."',
                accent: "success" as const,
              },
              {
                step: 5,
                title: "Vision and Close",
                time: "~15 seconds",
                description:
                  "End with where this could go. Skip the feature roadmap.",
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
                  His fourth element introduces features as magic gifts that
                  get the hero past obstacles. In a hackathon pitch, the judges
                  are Luke and your project is the lightsaber.
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
            title="Three of Our Winning Pitches, Dissected"
            subtitle="Dispatch AI and TalkTuahBank are transcribed from the pitch videos, and AdaptEd is rebuilt from its Devpost writeup. The phase labels and technique notes come from a GPT-5 analysis run in March 2026."
          />

          <KeyTakeaway>All three put a number on the problem early and tied the project to a sponsor&apos;s challenge.</KeyTakeaway>

          {/* --- CASE STUDY 1: Dispatch AI --- */}
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
                Dispatch AI — UC Berkeley AI Hackathon 2024
              </CardTitle>
              <CardDescription className="font-body text-base">
                Grand Prize ($25K SkyDeck investment) + AI For Good ($25K) +
                Best Use of Intel AI (1st, roughly $14K in hardware).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-hidden rounded-lg border border-volt/10">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/hdpdgxrilQM"
                    title="Dispatch AI Pitch Video"
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
                  Transcribed from our pitch video, recorded June 2024. My
                  teammate Spike O&apos;Carroll delivered the whole pitch.
                  Repeated words are cleaned up.
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
                        "Walks through how it works, with humans kept in the loop",
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
                  Strongest Moment
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 size-4 shrink-0 text-volt" />
                    <div className="space-y-1">
                      <p className="font-code text-xs text-volt/60">
                        Spike O&apos;Carroll, Dispatch AI pitch video, UC
                        Berkeley AI Hackathon 2024 @ 3:43 – 3:50
                      </p>
                      <blockquote className="font-body text-sm italic text-foreground/80">
                        &ldquo;See, you can see that our call updates in real
                        time on the dashboard, and our transcription is on the
                        right.&rdquo;
                      </blockquote>
                      <p className="font-body text-xs text-foreground/60">
                        The call lands on the dashboard while the transcript
                        fills in, so the claim happens in front of the judges.
                        A small glitch and a quick recovery made it more
                        believable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                <p className="font-code text-xs text-volt/80">
                  <span className="font-semibold">Why it won:</span>{" "}
                  A sourced number (the understaffing figure comes from the
                  2023 NENA and Carbyne survey), a working build (voice AI, a
                  live triage dashboard, a model fine-tuned on real 911 data),
                  and a human kept in the loop for safety. It fit AI For Good,
                  Best Use of Intel AI, and investment readiness at once.
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
                1st Overall + Goldman Sachs Challenge Winner.
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
                  Transcribed from our demo video, November 2024. The first
                  two lines are our narrator; the rest are the product&apos;s
                  AI agent during the recorded call. Repeated words are
                  cleaned up.
                </p>
                {/* [CONFIRM: three phase labels don't fit their quotes. "Stakes" (0:05-0:14) is the product description, and "How It Works" (1:10-1:49) and "Vision" (1:49-2:11) are the AI agent mid-call. Rewatch and relabel. If 1:10-2:11 is all demo, the 42% demo share used elsewhere on this page goes up too.] */}
                <div className="space-y-2">
                  {[
                    {
                      phase: "Big Shift",
                      time: "0:00 – 0:05",
                      pct: 4,
                      quote:
                        "Did you know that over 1.7 billion adults worldwide don't have access to traditional banking services?",
                      technique:
                        "A statistic that shows the scale",
                    },
                    {
                      phase: "Stakes",
                      time: "0:05 – 0:14",
                      pct: 7,
                      quote:
                        "It's an AI-powered telephonic banking service that brings financial management to anyone with a phone, no internet, or smartphone needed.",
                      technique:
                        "Stresses how little you need to use it",
                    },
                    {
                      phase: "Live Demo",
                      time: "0:14 – 1:10",
                      pct: 42,
                      quote:
                        "Hey, I can help with things like checking your account balance, transferring funds, and even getting you started on a loan application.",
                      technique:
                        "Role-play demo with concrete details",
                    },
                    {
                      phase: "How It Works",
                      time: "1:10 – 1:49",
                      pct: 30,
                      quote:
                        "Awesome, you've successfully transferred $200 to account ACC 456.",
                      technique:
                        "A completed transfer as proof",
                    },
                    {
                      phase: "Vision",
                      time: "1:49 – 2:11",
                      pct: 17,
                      quote:
                        "If there's anything else you need, feel free to let me know.",
                      technique:
                        "Banking by phone, available any time",
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
                        Money moves on camera. That one line turns &ldquo;voice
                        banking&rdquo; from a claim into something judges
                        watched happen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                <p className="font-code text-xs text-spark/80">
                  <span className="font-semibold">Why it won:</span> It works
                  over a plain phone call, so it reaches people with no
                  internet or smartphone. Specific details (account IDs, dollar amounts, a &ldquo;loan
                  for college&rdquo; story) made the demo believable and
                  matched Goldman Sachs&apos; financial inclusion brief.
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
                  From our Devpost writeup, not a recorded pitch. Lines in
                  quotation marks are verbatim; the rest are condensed. The
                  statistics are our own claims and have no citation on
                  Devpost.
                </p>
                <div className="space-y-2">
                  {[
                    {
                      phase: "Big Shift",
                      verbatim: true,
                      quote:
                        "Instead of students adapting to the system, our AI lecturer adapts to students.",
                      technique:
                        "A one-line reframe",
                    },
                    {
                      phase: "Stakes",
                      verbatim: false,
                      quote:
                        "50% of 16M US university students are falling behind. Less than 3% have access to quality tutoring.",
                      technique:
                        "Two numbers: how many fall behind, and how few get tutoring",
                    },
                    {
                      phase: "Live Demo",
                      verbatim: false,
                      quote:
                        "Responsive AI conversation, dynamic slide and whiteboard content, emotion detection.",
                      technique:
                        "Features described by what the student gets",
                    },
                    {
                      phase: "How It Works",
                      verbatim: false,
                      quote:
                        "Gemini 1.5 Pro for multi-source aggregation, Fetch.ai agents, Intel Developer Cloud for fine-tuning, Hume for emotion detection.",
                      technique:
                        "Each tool gets one clear job",
                    },
                    {
                      phase: "Vision",
                      verbatim: true,
                      quote:
                        "AdaptEd: interactive and personalized lectures through conversational voice AI.",
                      technique:
                        "A one-line product vision",
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
                        One sentence that flips the usual setup and gives
                        judges a single picture to remember.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* [CONFIRM: the old "Why it won" said AdaptEd "opened with a human story for empathy," but the breakdown above opens with the reframe line. Which is right? I dropped the human-story line until you say.] */}
              <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                <p className="font-code text-xs text-primary/80">
                  <span className="font-semibold">Why it won:</span> Heavy
                  use of Gemini for the Google challenge, a believable
                  workflow, and a list of exact integrations that showed it
                  was really built.
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
            <div className="space-y-1">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Patterns Across Winners
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Three pitches is a small sample, so treat these as a starting
                point.
              </p>
            </div>

            <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Target,
                  title: "Lead With a Number",
                  description:
                    'All three put a number on the problem early: "80% understaffed," "1.7 billion unbanked," "50% falling behind." Then they said what it costs people, like "the difference between life and death."',
                  accent: "volt" as const,
                },
                {
                  icon: Monitor,
                  title: "Show It Working",
                  description:
                    "Dispatch AI made a live phone call to its AI agent. TalkTuahBank moved $200 on camera.",
                  accent: "spark" as const,
                },
                {
                  icon: Users,
                  title: "Align With Sponsors",
                  description:
                    "Each one used a sponsor's tech or brief and said so: Intel Dev Cloud, Goldman Sachs' financial inclusion challenge, Google Gemini.",
                  accent: "primary" as const,
                },
                {
                  icon: Lightbulb,
                  title: "One-Line Reframe",
                  description:
                    'Each had one sentence that held the whole idea: "world\'s first AI 911 operator," "talk to your own personalized bank," "AI lecturer adapts to students."',
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
        </section>

        {/* ============================================================
            KNOW YOUR JUDGES
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Know Your Judges"
            subtitle="Track prizes and sponsor prizes are judged by different people, and they want different things."
          />

          <KeyTakeaway>For a track prize, lead with who it helps. For a sponsor prize, put their tech at the center of the demo.</KeyTakeaway>

          {/* [NEEDS SPECIFIC: which hackathon taught you to pitch track and sponsor prizes differently? Dispatch AI won AI For Good and Best Use of Intel AI at Berkeley. If you pitched those judges differently, that's the story.] */}
          <p className="font-body text-foreground/80">
            <span className="font-display font-semibold text-foreground">
              The same pitch can win one prize and miss another.
            </span>{" "}
            Find out who&apos;s judging each prize you&apos;re going for, and
            adjust.
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
                  Lead With Who It Helps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Track prizes (&ldquo;Best AI for Good,&rdquo; &ldquo;Best
                  Sustainability Hack&rdquo;) are judged on{" "}
                  <span className="font-display font-semibold text-foreground">
                    impact, vision, and societal benefit.
                  </span>{" "}
                  The judges are often academics, nonprofit leaders, or
                  organizers who care more about why than how. Make them care
                  before you explain how it works.
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
                      <span><span className="font-semibold text-foreground">Human stories</span> that make judges feel the problem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span><span className="font-semibold text-foreground">Scale:</span> what changes if your project reaches millions of people</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                      <span><span className="font-semibold text-foreground">Equity by design:</span> accessibility and sustainability built in from the start</span>
                    </li>
                  </ul>
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
                  Think Like Their Stockholder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Sponsor prizes are judged by{" "}
                  <span className="font-display font-semibold text-foreground">
                    company employees
                  </span>{" "}
                  thinking about their product. They want a creative, deep use
                  of their platform they can point to internally. The question
                  in their head is &ldquo;does this project show our software
                  can do something valuable?&rdquo;
                </p>

                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    What Sponsor Judges Want to See
                  </p>
                  <ul className="space-y-2 font-body text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span><span className="font-semibold text-foreground">Unexpected usage:</span> their tech used in a way they hadn&apos;t considered, well past a &ldquo;hello world&rdquo; integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span><span className="font-semibold text-foreground">New market:</span> a use case that could make them money</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span><span className="font-semibold text-foreground">Center stage:</span> their platform at the center of your demo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                      <span><span className="font-semibold text-foreground">Real depth:</span> proof you read the docs and went past the quickstart</span>
                    </li>
                  </ul>
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
                Adjust the pitch to whoever&apos;s sitting in front of you,
                while you&apos;re giving it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* [CONFIRM: whose project was pitched three ways to three judges, and at which hackathon? If it was yours, tell it in first person and name the event.] */}
              <p className="font-body text-sm text-foreground/80">
                One project was pitched three ways to three judges: tech for
                the engineer, market for the VC, UX for the designer. It took
                first place.
              </p>
              <p className="font-body text-sm text-foreground/80">
                If the format allows, ask one question up front: &ldquo;Are you
                all in the engineering field?&rdquo; Their answer tells you how
                to weight your pitch. When I{" "}
                <Link
                  href="/blog/hackathon-pitch-mistakes-la-hacks"
                  className="underline decoration-primary/30 hover:decoration-primary"
                >
                  judged LA Hacks
                </Link>
                , a couple of teams spent around 30 seconds explaining what
                OpenAI Agents or ElevenLabs Agents are. The same kind of
                question fixes that: &ldquo;Are you familiar with ElevenLabs
                Agents?&rdquo; If they are, skip the definition.
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
                      Point out clever algorithms or tradeoffs
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
                      Give them an analogy they can repeat to the other judges
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-spark" />
                      Show what it does and skip how it works
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
                      Lead with impact and vision
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                      Let the demo do the explaining
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                      Go technical only if their questions do
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                <p className="font-code text-xs text-primary/80">
                  Rehearse both versions before judging, one that leads with
                  technical depth and one that leads with impact, so you can
                  switch mid-pitch.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ============================================================
            THE APPENDIX STRATEGY
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Appendix Strategy"
            subtitle="Leave things out of the main pitch on purpose, and have a slide ready for each one a judge might ask about."
          />

          <KeyTakeaway>Keep the main pitch short and build a backup slide for each question you expect in Q&amp;A.</KeyTakeaway>

          <p className="font-body text-foreground/80">
            <span className="font-semibold text-foreground">Pitches are short and judges are tired.</span>{" "}
            {/* [CONFIRM: which year you judged LA Hacks. The home page lists LA Hacks 2026; add the year here if that's the one.] */}
            At LA Hacks I had five minutes per team: about 1.5 for the pitch
            and demo, then 3.5 for questions. Some teams spent all five
            pitching. Check how your event splits the time and plan where
            you&apos;ll stop.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  MAIN PITCH
                </Badge>
                <CardTitle className="font-display text-2xl text-volt">
                  The Essentials
                </CardTitle>
                <CardDescription className="font-body text-base">
                  What every judge sees.
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
                    <span><span className="font-semibold text-foreground">Live demo:</span> the main flow, working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span><span className="font-semibold text-foreground">Impact:</span> what could be</span>
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
                  The Backup Slides
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Opened only when a judge asks.
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
                    <span><span className="font-semibold text-foreground">Cost:</span> what it takes to run at scale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span><span className="font-semibold text-foreground">What&apos;s next:</span> roadmap beyond the hackathon</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Why It Helps
            </p>
            <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: "Keeps the Pitch Short",
                  description:
                    "Everything you move to the appendix frees time for the demo and for questions.",
                  accent: "spark" as const,
                },
                {
                  icon: MessageSquare,
                  title: "Wins the Q&A",
                  description:
                    "Q&A is where judges fill in the rubric categories your pitch skipped and find out whether you understand what you built. A category that never comes up may get a low score, or a zero.",
                  accent: "primary" as const,
                },
                {
                  icon: Target,
                  title: "Looks Like Confidence",
                  description:
                    "Pulling up a slide for a follow-up shows you thought past the pitch. It's really just preparation, done while sleep-deprived.",
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
        </section>

        {/* ============================================================
            THE DEMO VIDEO
            ============================================================ */}
        <section id="the-demo-video" className="space-y-8 scroll-mt-20">
          <SectionHeading
            title="The Demo Video"
            subtitle="Live demos fail, and judges forget projects more than you'd expect."
          />

          <KeyTakeaway>Record a demo video. It&apos;s your backup when the live demo dies, and judges can rewatch it in deliberation.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Monitor className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    BACKUP
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  When the Demo Dies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  The Wi-Fi at LA Hacks was spotty, and some teams couldn&apos;t
                  run their demo at all. Without a backup video, I had no clear
                  way to see what those projects did.
                </p>
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
                  <span className="font-semibold text-foreground">Judges revisit submissions during deliberation.</span>{" "}
                  A live pitch gets rushed and forgotten, and code sitting in a
                  repo rarely stands out. The video is still there.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-1">
            <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">EXAMPLE</Badge>
            <h3 className="font-display text-2xl font-bold tracking-tight">A demo video worth copying</h3>
            <p className="font-body text-sm text-muted-foreground">The product is on screen right away, and the narration tells you what you&apos;re looking at.</p>
          </div>

          <div className="md:max-w-2xl">
            {/* [CONFIRM: is SoundSearch yours (solo 1st at AIATL)? If so, tell it in first person. Also confirm the recording reached a recruiter and led to an internship offer.] */}
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
                  through complex websites with real-time voice over a phone
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
                    embed starts at 0:22, after the problem intro, so the voice
                    assistant is already walking through Google Flights in the
                    first beat.
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
                  and cursor smoothing make a 60-second demo look polished,
                  with basically no editing time. Worth a look if you&apos;re
                  on Mac. On Windows, CanVid covers the same ground.
                </p>
                <AffiliateDisclosure />
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
              {/* The card's <AffiliateDisclosure /> above labels this button. */}
              <AffiliateLink
                href="https://screenstudio.lemonsqueezy.com?aff=LpD9R"
                label={false}
                className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-volt/40 px-5 py-2.5 font-display text-sm font-semibold text-volt transition-all hover:border-volt hover:bg-volt/10 md:self-center"
              >
                Check it out
                <ExternalLink className="size-3.5" />
              </AffiliateLink>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE SCIENCE (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <Disclosure
            title="Why This Works: The Science of Persuasion"
            subtitle="Optional: four frameworks from rhetoric and communication research that the structure above draws on."
            badge="Optional: the science"
            accent="primary"
          >
            <KeyTakeaway>Start with why the problem matters to you, then keep switching between how things are and how they could be.</KeyTakeaway>

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
                    Pitching outside-in sounds like &ldquo;We built an app
                    that&hellip;&rdquo; Sinek&apos;s Golden Circle runs the
                    other way: start with{" "}
                    <span className="font-semibold text-foreground">why</span>{" "}
                    you care, then how, then what.
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
                    Her Sparkline swings between what is and what could be,
                    then resolves the tension with your solution.
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
                    Three appeals, about 2,400 years old:
                  </p>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                      <p className="font-display text-sm font-semibold text-primary">
                        Ethos: Credibility
                      </p>
                      <p className="font-body text-xs text-foreground/60">
                        Your domain experience, and why your team is the right
                        one to solve this.
                      </p>
                    </div>
                    <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                      <p className="font-display text-sm font-semibold text-spark">
                        Pathos: Emotion
                      </p>
                      <p className="font-body text-xs text-foreground/60">
                        A real user who suffers. &ldquo;Imagine a world
                        where&hellip;&rdquo;
                      </p>
                    </div>
                    <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                      <p className="font-display text-sm font-semibold text-volt">
                        Logos: Logic
                      </p>
                      <p className="font-body text-xs text-foreground/60">
                        Architecture, metrics, validation, and tech decisions
                        that prove it can work.
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
                    Chip and Dan Heath&apos;s six principles for ideas judges
                    still remember hours later in deliberation:
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
          </Disclosure>
        </section>

        {/* ============================================================
            PITCHING UNDER PRESSURE (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <Disclosure
            title="Pitching Under Pressure"
            subtitle="Optional: what changes when you pitch on no sleep."
            badge="Optional: mindset"
            accent="spark"
          >
            <KeyTakeaway>Rehearse until the pitch is muscle memory, and be upfront about what&apos;s still rough.</KeyTakeaway>

          {/* [NEEDS SPECIFIC: a pitch where you admitted a flaw or setback on stage, or told a real story from the weekend, and how the judges took it. The two cards below have only generic examples.] */}
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
                  Later in the talk, Brown says the people she calls
                  wholehearted had &ldquo;the courage to be imperfect.&rdquo;
                  No sleep strips the polish anyway, so explain what you built
                  honestly, flaws included, and aim to be understood instead of
                  impressive. Share a real setback: &ldquo;We
                  thought X, then talked to users and learned Y.&rdquo;
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
                  Speak{" "}
                  <span className="font-semibold text-foreground">with</span>{" "}
                  judges, not at them. A real moment from your weekend holds
                  attention better than a feature list.
                </p>
                {/* [CONFIRM: the "tell them what you're going to say" structure is credited to Carnegie's 1962 book, but that's unverified and the saying has several attributions. Find the page, or drop the Carnegie credit.] */}
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
                  <p className="font-body text-sm text-foreground/60">
                    In a 1.5-minute slot, keep the first and last steps to one
                    sentence each.
                  </p>
                </div>
                <p className="font-code text-xs text-volt/60">
                  — Dale Carnegie, American writer and lecturer,{" "}
                  <a href="https://www.simonandschuster.com/books/The-Quick-and-Easy-Way-to-Effective-Speaking/Dorothy-Carnegie/Dale-Carnegie-Books/9780671724009" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">The Quick and Easy Way to Effective Speaking, 1962</a>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                icon: CircleDot,
                title: "Practice = Code",
                description:
                  "Rehearse your pitch as much as you code, until it's muscle memory.",
                accent: "volt" as const,
              },
              {
                icon: Video,
                title: "Record Yourself",
                description:
                  "Record a practice run and watch it. You'll catch filler words, pacing, and missed beats you won't notice live.",
                accent: "primary" as const,
              },
            ].map((item) => {
              const colors = {
                volt: {
                  bg: "bg-volt/10",
                  text: "text-volt",
                  border: "border-volt/20",
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
            </div>
          </div>
        </section>

        {/* ============================================================
            PITCHING CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Pitching Checklist"
            subtitle="Run through this before judging starts."
          />

          <KeyTakeaway>Find out how your slot splits between pitch and Q&amp;A, and rehearse a pitch that stops in time for questions.</KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Open with the problem and why it matters to you",
                  accent: "volt",
                },
                {
                  text: "Main pitch: problem, what you built, a live demo of the main flow, where it could go",
                  accent: "spark",
                },
                {
                  text: "Match the prize: impact for a track prize, their tech at the center for a sponsor prize",
                  accent: "primary",
                },
                {
                  text: "Rehearse a technical and an impact version, then ask judges their background",
                  accent: "success",
                },
                {
                  text: "Build appendix slides for likely questions (architecture, tradeoffs, edge cases, roadmap, cost) and know where each one is",
                  accent: "volt",
                },
                {
                  text: "Check how the slot splits between pitch and Q&A, and plan where you'll stop",
                  accent: "spark",
                },
                {
                  text: "Record a backup demo video",
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

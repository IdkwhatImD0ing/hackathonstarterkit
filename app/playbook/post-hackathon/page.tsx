import type { Metadata } from "next";
import {
  Megaphone,
  Share2,
  Users,
  Hammer,
  Quote,
  ArrowRight,
  Linkedin,
  Github,
  Globe,
  PenLine,
  TreePine,
  Sparkles,
  Brain,
  Clock,
  Heart,
  Link,
  MessageSquare,
  Mail,
  CalendarCheck,
  Rocket,
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
import { KeyTakeaway } from "@/components/key-takeaway";
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
import { CopyButton } from "@/components/copy-button";
import NextLink from "next/link";

const section = PLAYBOOK_SECTIONS[6];

const SHIP_IT_ALL_PROMPT = `Install the Ship It skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ship-it

Use the ship-it skill to create all four of my post-hackathon deliverables in one pass: the portfolio site, the GitHub README, the Devpost submission, and the YouTube demo description. It should install the four sub-skills it needs (portfolio-builder, readme-writer, devpost-writer, youtube-writer), read the repo first, then interview me ONCE for everything all four need (the demo video and its beats, the live URL and Devpost, any awards, the event details, the team, and the challenges and what's next). Then generate the four so they tell one consistent story, pausing after each so I can redirect. Do not invent awards, stats, timestamps, or challenges. Note: the portfolio step uses Anthropic's frontend-design plugin, so if it's not already installed, tell me to run "/plugin marketplace add anthropics/claude-plugins-official" and "/plugin install frontend-design@claude-plugins-official" before that step.`;

const PORTFOLIO_AGENT_PROMPT = `First install Anthropic's frontend-design plugin in Claude Code so the site gets a unique design, not a template:

/plugin marketplace add anthropics/claude-plugins-official
/plugin install frontend-design@claude-plugins-official

Then install the Portfolio Builder skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill portfolio-builder

Use the portfolio-builder skill to build a recruiter-facing portfolio website for this project. Read the repo first, then ask me for the demo video, the live URL and Devpost, any awards, the event details, and the team info. If the project is not a web app (hardware, an ML model, a CLI), showcase it with photos, diagrams, and the demo video. Do not invent awards, stats, or prizes.`;

const YOUTUBE_AGENT_PROMPT = `Install the YouTube Writer skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill youtube-writer

Use the youtube-writer skill to write the title, description, tags, and chapter timestamps for our demo video. Read the repo first, then ask me for the video length and its beats (so the chapters are real), plus the Devpost and GitHub links and any awards. Front-load the hook in the first two lines of the description. Do not invent awards or timestamps.`;

export const metadata: Metadata = {
  title: "Post-Hackathon — Turn Hackathon Projects into Career Opportunities",
  description:
    "Share your hackathon work, follow up with sponsors and contacts, and turn weekend projects into career-changing portfolio pieces, startups, and open-source contributions.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://thehackathonplaybook.dev"}/playbook/post-hackathon`,
  },
  openGraph: {
    title: "Post-Hackathon: Turn Projects into Career Opportunities",
    description:
      "Follow up with contacts and turn weekend hackathon projects into career-changing portfolio pieces. From the 36-win playbook.",
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

export default function PostHackathonPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            THE TREE FALLS IN A FOREST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Tree Falls in a Forest"
            subtitle="Most teams pack up and move on after the hackathon. The ones who win careers (not just prizes) know the real work starts when the event ends."
          />

          <KeyTakeaway>
            The real work starts when the event ends: share, follow up, and keep
            building. It only takes one person seeing it.
          </KeyTakeaway>

          <p className="font-body text-foreground/80">
            No followers? Doesn&apos;t matter.{" "}
            <span className="font-display font-semibold text-foreground">
              It only takes one.
            </span>{" "}
            One person seeing your LinkedIn post. One recruiter clicking your
            Devpost. One conversation that changes your trajectory.
          </p>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Share2 className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    SHARE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Post Your Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Make it public.
                  </span>{" "}
                  Post on LinkedIn, share the demo, pin the repo. You never know
                  who&apos;s watching: a recruiter, a founder, a future
                  co-founder. A private repo helps no one.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Within the first 4 hackathons, a LinkedIn post about a
                    project led to an interview, which led to a first
                    internship.
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
                    FOLLOW UP
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Nurture Connections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    Follow up within 48 hours.
                  </span>{" "}
                  Judges, sponsors, and fellow hackers are warm now. In a week,
                  they&apos;re strangers again. A short message referencing your
                  conversation goes further than you think.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Companies aren&apos;t just watching the winners. They&apos;re
                    scouting for grit, teamwork, and innovative thinking.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Hammer className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    BUILD
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Keep Going
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    You&apos;re already half done.
                  </span>{" "}
                  Most people never start long-term projects because step one
                  feels insurmountable. You already started at the hackathon.
                  Spend the next 6 months making it outstanding.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    A proven hackathon project is the easiest starting point for
                    a portfolio centerpiece or a real product.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-glow-pulse glass rounded-xl border border-primary/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <TreePine className="size-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold">
                  The Visibility Principle
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;If a tree falls in a forest and no one is around to
                  hear it, does it make a sound?&rdquo;
                </blockquote>
                <p className="font-code text-xs text-primary/60">
                  — Traditional philosophical thought experiment; earliest known
                  printing in The Chautauquan, June 1883 (often misattributed to
                  George Berkeley, who never posed it)
                </p>
                <p className="font-body text-sm text-foreground/60">
                  If a project is made but no one knows, was it made? A private
                  repo helps no one, least of all you.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                <Sparkles className="size-5 text-volt" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold">
                  The First Internship Story
                </p>
                <p className="font-body text-sm text-foreground/80">
                  At LA Hacks, a LinkedIn post about a RAG-style chat app caught
                  an interviewer&apos;s eye. They were building the exact same
                  thing. The interview became two people geeking out over one
                  problem. A week later: first internship offer.
                </p>
                <p className="font-body text-sm italic text-foreground/60">
                  &ldquo;We didn&apos;t win. But that weekend quietly rerouted
                  my trajectory.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            LUCK SURFACE AREA — SHARE YOUR WORK
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Luck Surface Area — Share Your Work"
            subtitle="Luck isn't random. It's a function of what you do and how many people know about it. The more you build AND share, the more opportunities find you."
          />

          <KeyTakeaway>
            Luck = doing times telling. Share your work widely and opportunities
            start finding you.
          </KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                  <Target className="size-5 text-volt" />
                </div>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  LUCK = DOING x TELLING
                </Badge>
              </div>
              <CardTitle className="font-display text-2xl text-volt">
                Jason Roberts&apos; Luck Surface Area
              </CardTitle>
              <CardDescription className="font-body text-base">
                The more you do AND the more people who know about it, the more
                &ldquo;lucky&rdquo; opportunities find you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;The amount of serendipity that will occur in your life,
                your Luck Surface Area, is directly proportional to the degree
                to which you do something you&apos;re passionate about combined
                with the total number of people to whom this is effectively
                communicated.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-volt/60">
                — Jason Roberts, serial entrepreneur and TechZing podcast
                co-host, &ldquo;How to Increase Your Luck Surface Area&rdquo;,
                Codus Operandi, 2010 (L = D x T)
              </p>

              <div className="space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Where to Share
                </p>
                <div className="stagger-children grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { icon: Linkedin, label: "LinkedIn post", accent: "volt" as const },
                    { icon: Globe, label: "Twitter/X thread", accent: "spark" as const },
                    { icon: PenLine, label: "Blog post", accent: "primary" as const },
                    { icon: Megaphone, label: "Devpost portfolio", accent: "success" as const },
                    { icon: Github, label: "GitHub pin", accent: "volt" as const },
                    { icon: Share2, label: "Portfolio site", accent: "spark" as const },
                  ].map((item) => {
                    const colors = {
                      volt: { bg: "bg-volt/10", text: "text-volt", border: "border-volt/20" },
                      spark: { bg: "bg-spark/10", text: "text-spark", border: "border-spark/20" },
                      primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
                      success: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
                    };
                    const c = colors[item.accent];
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2 rounded-lg border ${c.border} ${c.bg} px-3 py-2`}
                      >
                        <item.icon className={`size-3.5 ${c.text}`} />
                        <span className={`font-code text-xs ${c.text}`}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                The proof:
              </span>{" "}
              Within the first 4 hackathons, sharing publicly led to an
              interview and a first internship. Without job searching after that:
              2 expedited interviews, 1 direct offer, and hundreds of recruiting
              DMs. All from visibility, not LeetCode.{" "}
              <span className="font-display font-semibold text-foreground">
                You don&apos;t do hackathons to win. You do them to network.
              </span>
            </p>
          </div>
        </section>

        {/* ============================================================
            THE 48-HOUR FOLLOW-UP
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The 48-Hour Follow-Up"
            subtitle="Hackathon contacts are warm right now. In a week, they're strangers. Follow up within 24-48 hours, before the connection goes cold."
          />

          <KeyTakeaway>
            Message everyone you had a real conversation with inside 48 hours,
            while the connection is still warm.
          </KeyTakeaway>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  WHO
                </Badge>
                <CardTitle className="font-display text-2xl text-volt">
                  Who to Follow Up With
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Anyone you had a real conversation with, not just winners or
                  VIPs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Judges
                      </span>{" "}
                      who asked good questions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Sponsor reps
                      </span>{" "}
                      who liked your tech
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Teammates
                      </span>{" "}
                      you&apos;d hack with again
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Participants
                      </span>{" "}
                      you bonded with over shared struggles
                    </span>
                  </li>
                </ul>
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-volt">
                    48 hours
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    follow-up window before it goes cold
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Desktop connector */}
            <div className="hidden items-center md:flex">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-px bg-gradient-to-b from-volt to-spark" />
                <Mail className="size-6 text-spark" />
                <div className="h-16 w-px bg-gradient-to-b from-spark to-spark/0" />
                <p className="font-code text-xs text-muted-foreground [writing-mode:vertical-lr]">
                  send now
                </p>
              </div>
            </div>

            {/* Mobile connector */}
            <div className="flex items-center justify-center py-2 md:hidden">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-volt to-spark" />
                <Mail className="size-5 text-spark" />
                <p className="font-code text-xs text-muted-foreground">
                  send now
                </p>
              </div>
            </div>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  HOW
                </Badge>
                <CardTitle className="font-display text-2xl text-spark">
                  How to Follow Up
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Short, personal, and valuable. No generic &ldquo;let&apos;s
                  stay in touch.&rdquo;
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Personalize:
                      </span>{" "}
                      reference the exact conversation you had
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Add value:
                      </span>{" "}
                      send the project link, demo, or a useful resource
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        One clear ask:
                      </span>{" "}
                      coffee chat, feedback, or collaboration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Keep it short:
                      </span>{" "}
                      3-5 sentences max
                    </span>
                  </li>
                </ul>
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-spark">
                    3-5 lines
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    short, personal, one clear ask
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-primary/20 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Link className="size-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold">
                    Mark Granovetter, Sociologist — Strength of Weak Ties
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    Casual contacts beat close friends for finding jobs. Judges,
                    sponsors, and fellow hackers are weak ties, and weak ties
                    open doors.
                  </p>
                  <p className="font-code text-xs text-muted-foreground">
                    &ldquo;The Strength of Weak Ties&rdquo;, American Journal of
                    Sociology, 1973; one of the most cited sociology papers ever
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-success/20 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/10">
                  <Users className="size-4 text-success" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold">
                    Porter Gale — Former VP of Marketing, Virgin America
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    Your network is your net worth. Your connections reach far
                    past the people you actually know, and the best ones form
                    over shared struggles, like debugging at 3AM.
                  </p>
                  <p className="font-code text-xs text-muted-foreground">
                    Your Network Is Your Net Worth, Atria Books, 2013
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TURN IT INTO A LONG-TERM PROJECT
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Turn It Into a Long-Term Project"
            subtitle="You already have half the work done. Most people can't start long-term projects because it feels insurmountable. But you already started at the hackathon."
          />

          <KeyTakeaway>
            Win or lose, you leave with a working prototype, a team, and
            momentum: keep building instead of starting from zero.
          </KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Sparkles className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    IF YOU WON
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  You Have a Proven Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    A win is validation.
                  </span>{" "}
                  Judges believed in it, it beat the field, and you have a
                  working prototype. Spend 6 months making it outstanding, then
                  make it your resume centerpiece.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Why start from scratch when you already have something that
                    works? Polish it, extend it, ship it.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <TrendingUp className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    IF YOU DIDN&apos;T WIN
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  You Still Have Momentum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">
                    A loss is rocket fuel.
                  </span>{" "}
                  You still have a prototype, a team, and momentum, more than
                  most side projects get. One hackathon spent learning vector
                  databases won nothing, but that knowledge landed an internship
                  and a full-time job.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Losing hackathons is better than winning them; the
                    &ldquo;losses&rdquo; are where the real growth happens.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-volt/20 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                  <Rocket className="size-4 text-volt" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold">
                    Steve Jobs — Apple Co-founder
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    &ldquo;Real artists ship.&rdquo; Don&apos;t let it die in a
                    private repo. Each iteration you ship makes it more
                    impressive and more useful.
                  </p>
                  <p className="font-code text-xs text-muted-foreground">
                    Macintosh team retreat, January 1983, as recounted by Andy
                    Hertzfeld on folklore.org; later popularized by Seth Godin
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-spark/20 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-spark/10">
                  <TrendingUp className="size-4 text-spark" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm font-semibold">
                    Patrick McKenzie (patio11) — Software Entrepreneur and
                    Writer
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    Side projects compound into career-changing portfolios. His
                    Bingo Card Creator, built on nights and weekends, became a
                    full career pivot. Hackathon projects have the same
                    potential.
                  </p>
                  <p className="font-code text-xs text-muted-foreground">
                    He ran Bingo Card Creator alongside a day job until he went
                    full-time on his software business in 2010; story documented
                    on kalzumeus.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE SCIENCE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Why This Works — The Science"
            subtitle="Post-hackathon actions aren't just 'nice to have.' They're backed by research on how careers, networks, and opportunities actually work."
          />

          <KeyTakeaway>
            Four researchers agree: visible work and weak ties, not raw talent,
            drive the opportunities that change careers.
          </KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <PenLine className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    AUSTIN KLEON
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Show Your Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-volt/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;It sounds a little extreme, but in this day and age, if
                  your work isn&apos;t online, it doesn&apos;t exist.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Kleon builds the case on a line he borrows from Clay Shirky,
                  who teaches at NYU: &ldquo;The real gap is between doing
                  nothing and doing something.&rdquo; You don&apos;t have to be
                  a genius, just share what you make. Sharing is generosity, not
                  self-promotion, and it attracts people who care about the same
                  things.
                </p>
                <p className="font-code text-xs text-volt/60">
                  — Austin Kleon, author, Show Your Work!, 2014; Shirky line
                  from Cognitive Surplus, 2010
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Target className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    JASON ROBERTS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Luck Surface Area
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;The amount of serendipity that will occur in your life,
                  your Luck Surface Area, is directly proportional to the degree
                  to which you do something you&apos;re passionate about
                  combined with the total number of people to whom this is
                  effectively communicated.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  L = D x T. Do more (build, iterate, contribute) and tell more
                  (post, share, demo). One project shared with 1,000 people beats
                  10 projects nobody sees.
                </p>
                <p className="font-code text-xs text-spark/60">
                  — Jason Roberts, serial entrepreneur and TechZing podcast
                  co-host, &ldquo;How to Increase Your Luck Surface Area&rdquo;,
                  Codus Operandi, 2010
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Link className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    GRANOVETTER
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Strength of Weak Ties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  Sociologist Mark Granovetter&apos;s landmark 1973 study, built
                  on his Harvard doctoral research and published while he was at
                  Johns Hopkins, found casual contacts (people you don&apos;t
                  see every day) beat close friends for finding jobs. They link
                  you to networks outside your own circle.
                </p>
                <p className="font-body text-sm text-foreground/60">
                  Judges, sponsors, and fellow hackers are weak ties. Cultivate
                  them. They open doors your close friends can&apos;t.
                </p>
                <p className="font-code text-xs text-primary/60">
                  — Mark Granovetter, &ldquo;The Strength of Weak Ties&rdquo;,
                  American Journal of Sociology 78(6), 1973
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Heart className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    JEFF BEZOS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  Regret Minimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-success/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;I knew that if I failed I wouldn&apos;t regret that,
                  but I knew the one thing I might regret is not ever having
                  tried.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Picture yourself at 80. You won&apos;t regret sharing the
                  project or sending the follow-up. You&apos;ll regret staying
                  silent. The downside of sharing is zero; the upside is
                  unknowable.
                </p>
                <p className="font-code text-xs text-success/60">
                  — Jeff Bezos, founder of Amazon, Academy of Achievement
                  interview, 2001
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            THE POST-HACKATHON TIMELINE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Post-Hackathon Playbook"
            subtitle="A step-by-step timeline for maximizing the value of every hackathon. Follow this and your projects will keep working for you long after the event ends."
          />

          <KeyTakeaway>
            Follow up day 1, post publicly by day 3, clean up and open-source in
            week 1, then keep building for months.
          </KeyTakeaway>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Day 1 — Within 24 Hours",
                description:
                  "Message judges, sponsors, and contacts. Pin the GitHub repo. Update your LinkedIn headline if you placed. Connections are warmest now, so don't let them cool.",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Day 2-3 — Share Publicly",
                description:
                  "Publish a LinkedIn post and share the demo video. Tag teammates, sponsors, and the org. Tell the story: what you built, learned, and what's next. This is the post that gets seen.",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Week 1 — Clean and Open-Source",
                description:
                  "Polish the README with badges, screenshots, and install steps. Open-source it, add it to your portfolio, and write a short post on what you learned.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Month 1-6 — Keep Building",
                description:
                  "If it has legs, set a monthly milestone and treat it like a real product. The hackathon gave you the MVP. Add features, get users, iterate. This is how weekend builds become portfolio centerpieces.",
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
                      <p
                        className={`font-display text-lg font-semibold ${c.text}`}
                      >
                        {item.title}
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
            THE SHIP-IT TOOLKIT — AGENT SHORTCUTS
            ============================================================ */}
        <section id="the-ship-it-toolkit" className="space-y-8 scroll-mt-20">
          <SectionHeading
            title="The Ship-It Toolkit"
            subtitle="Run all four deliverables with one prompt, or grab a single skill. The portfolio site and YouTube description live here; the GitHub README and Devpost skills moved to the submission page."
          />

          <KeyTakeaway>
            One copy-paste prompt ships all four: the portfolio site, README,
            Devpost, and YouTube description, generated to tell one consistent
            story.
          </KeyTakeaway>

          {/* 0 — Do all four at once */}
          <Card className="glow-hover border-primary/30 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="size-5 text-primary" />
                </div>
                <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                  SHIP IT SKILL — RUN ALL FOUR
                </Badge>
              </div>
              <CardTitle className="font-display text-xl text-primary">
                Do All Four at Once
              </CardTitle>
              <CardDescription className="font-body text-base">
                One skill that runs the other four. It interviews you a single
                time, then generates the portfolio site, README, Devpost, and
                YouTube description in order, so they share one tagline, one set
                of stats, and one story. Best if you want everything done in a
                single sitting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="float-right ml-3 mb-2">
                  <CopyButton text={SHIP_IT_ALL_PROMPT} />
                </div>
                <pre className="whitespace-pre-wrap break-words font-code text-xs leading-relaxed text-foreground/80">{SHIP_IT_ALL_PROMPT}</pre>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Separator className="flex-1 bg-border" />
            <span className="font-code text-xs uppercase tracking-widest text-muted-foreground">
              Or run them one at a time
            </span>
            <Separator className="flex-1 bg-border" />
          </div>

          <div className="space-y-5">
            {/* 1 — Portfolio */}
            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    PORTFOLIO BUILDER SKILL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  1. Build Your Portfolio Site
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Installs Anthropic&apos;s frontend-design skill for a
                  one-of-a-kind look, then builds a one-page case study (hero,
                  problem, architecture, demo, results, team, honest limits).
                  Works even for non-web projects, and never invents awards or
                  stats.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="float-right ml-3 mb-2">
                    <CopyButton text={PORTFOLIO_AGENT_PROMPT} />
                  </div>
                  <pre className="whitespace-pre-wrap break-words font-code text-xs leading-relaxed text-foreground/80">{PORTFOLIO_AGENT_PROMPT}</pre>
                </div>
              </CardContent>
            </Card>

            {/* 2 — YouTube */}
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <PenLine className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    YOUTUBE WRITER SKILL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  2. Write Your YouTube Description
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Writes the demo video&apos;s title, description, tags, and
                  chapter timestamps so recruiters can find it. Reads your repo,
                  asks for the video beats, and never fakes a timestamp or award.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-volt/20 bg-volt/5 p-4">
                  <div className="float-right ml-3 mb-2">
                    <CopyButton text={YOUTUBE_AGENT_PROMPT} />
                  </div>
                  <pre className="whitespace-pre-wrap break-words font-code text-xs leading-relaxed text-foreground/80">{YOUTUBE_AGENT_PROMPT}</pre>
                </div>
              </CardContent>
            </Card>

            <NextLink href="/playbook/submission#generate-it-with-a-skill" className="group block">
              <Card className="glow-hover border-success/20">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div className="space-y-1">
                    <p className="font-display font-semibold">Need your GitHub README or Devpost?</p>
                    <p className="font-body text-sm text-muted-foreground">Those two skills moved to the submission playbook page, next to the README and Devpost how-tos.</p>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-success transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </NextLink>
          </div>
        </section>

        {/* ============================================================
            GOLDEN RULE — KLEON QUOTE
            ============================================================ */}
        <section className="space-y-8">
          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;It&apos;s not enough to be good.
                <br />
                <span className="animate-shimmer">
                  In order to be found, you have to be findable.
                </span>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                — Austin Kleon, author of Show Your Work! (2014)
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    The hackathon is the beginning, not the end.
                  </span>{" "}
                  Every project you share, every follow-up you send, every
                  iteration you ship expands your luck surface area. One LinkedIn
                  viewer might change your trajectory.
                </p>
                <p className="font-body text-foreground/80">
                  You never know who&apos;s watching, or which conversation
                  matters: the interviewer building the same thing, the recruiter
                  who found your Devpost, the founder who saw your demo.
                </p>
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    You never know. And that&apos;s the whole point.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            POST-HACKATHON CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Post-Hackathon Checklist"
            subtitle="A step-by-step summary for maximizing the value of every hackathon. The event is over. Now the real work begins."
          />

          <KeyTakeaway>
            Work this list while the event is fresh: follow up, post, clean up,
            open-source, and keep building.
          </KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Follow up: personalized messages to judges, sponsors, and contacts within 48 hours",
                  accent: "volt",
                },
                {
                  text: "Post on LinkedIn: tag teammates, sponsors, and the hackathon org",
                  accent: "spark",
                },
                {
                  text: "Pin the GitHub repo to your profile and clean up the README",
                  accent: "primary",
                },
                {
                  text: "Share the demo video: it's the highest-signal content you can post",
                  accent: "success",
                },
                {
                  text: "Open-source it if possible; it becomes a living portfolio piece",
                  accent: "volt",
                },
                {
                  text: "Keep building: set monthly milestones (you already have the MVP)",
                  accent: "spark",
                },
                {
                  text: "Make it findable: \"if your work isn't online, it doesn't exist\" (Austin Kleon, Show Your Work!, 2014)",
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
              The hackathon gave you the project, the connections, and the
              momentum. What you do next separates people who attend hackathons
              from people whose hackathons change their careers. Share it, follow
              up, keep building. It only takes one.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

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

const section = PLAYBOOK_SECTIONS[6];

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
            subtitle="Most teams pack up and move on after the hackathon. The ones who win careers — not just prizes — know the real work starts when the event ends."
          />

          <p className="font-body text-foreground/80">
            You may think that because you have no followers or no one&apos;s
            looking at your page, no one will ever see this project. But you
            never know.{" "}
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
                  Post it on LinkedIn. Share the demo video. Pin the GitHub repo.
                  You never know who&apos;s watching — a recruiter, a founder, a
                  future co-founder. The project that sits in a private repo
                  helps no one, least of all you.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Within the first 4 hackathons, a LinkedIn post about a
                    project led to an interview — which led to a first
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
                  Judges, sponsors, and fellow hackers are warm contacts right
                  now. In a week, they&apos;re strangers again. Follow up within
                  48 hours while the connection is fresh — a short message
                  referencing your conversation goes further than you think.
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
                  You already have half the work done. Most people don&apos;t
                  have long-term projects because getting started feels
                  insurmountable. But you already started — at the hackathon.
                  Why not spend the next 6 months making it outstanding?
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
                  If a Tree Falls in a Forest&hellip;
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;If a tree falls in a forest and no one is around to
                  hear it, does it make a sound?&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  If a project is made but no one knows about it, was the
                  project actually made? The project sitting in a private repo
                  helps no one — least of all you.
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
                  After the third in-person hackathon at LA Hacks, a LinkedIn
                  post about a RAG-style chat app caught an interviewer&apos;s
                  eye. Turns out, the interviewer was working on the exact same
                  thing. The interview stopped being a pitch and became two
                  people geeking out over the same problem. A week later: first
                  internship offer.
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
                &ldquo;Luck surface area is directly proportional to the degree
                to which you do something you&apos;re passionate about combined
                with the total number of people to whom this is effectively
                communicated.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-volt/60">
                — Jason Roberts, Luck Surface Area (L = D x T)
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
              Within the first 4 hackathons, sharing projects publicly led to an
              interview and a first internship. After that, even without
              actively job searching, 2 expedited interviews + 1 direct offer
              arrived — plus countless hundreds of recruiting DMs on LinkedIn.
              All from visibility, not LeetCode.{" "}
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
            subtitle="Hackathon contacts are warm right now. In a week, they're strangers. Research shows: follow up within 24-48 hours or the window closes."
          />

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
                  Anyone you had a real conversation with — not just winners or
                  VIPs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Judges who asked good questions about your project
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Sponsor reps who showed interest in your tech
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Teammates you want to hack with again
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Other participants you connected with over shared struggles
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
                    Personalize — reference the specific conversation you had
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Add value — share the project link, demo video, or a
                    resource they&apos;d find useful
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    One clear ask — coffee chat, feedback on the project, or
                    future collaboration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Keep it short — 3-5 sentences max
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
                    Mark Granovetter — Strength of Weak Ties
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    Casual contacts are more valuable than close friends for
                    finding jobs. Hackathon judges, sponsors, and fellow hackers
                    are weak ties — and weak ties open doors.
                  </p>
                  <p className="font-code text-xs text-muted-foreground">
                    Stanford, 1973 — one of the most cited sociology papers ever
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
                    Reid Hoffman — LinkedIn Co-founder
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    &ldquo;Your network is your net worth.&rdquo; Your 170
                    connections can reach millions of people. The best
                    connections often happen over shared struggles — like
                    debugging at 3AM.
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
            subtitle="You already have half the work done. Most people can't start long-term projects because it feels insurmountable. But you already started — at the hackathon."
          />

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
                  A winning hackathon project is already validated — judges
                  believed in it, it beat the competition, and you have a
                  working prototype. Spend the next 6 months making it
                  outstanding. Put it on your resume as the centerpiece project
                  for future internships or jobs.
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
                  You have a working prototype, a team, and momentum.
                  That&apos;s more than most side projects ever get. The
                  knowledge you gained — even from a &ldquo;loss&rdquo; — is
                  rocket fuel. One hackathon spent learning vector databases
                  didn&apos;t win anything, but that knowledge landed an
                  internship and a full-time job.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Losing hackathons is better than winning them — the
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
                    Seth Godin / Steve Jobs
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    &ldquo;Real artists ship.&rdquo; Don&apos;t let the project
                    die in a private repo. Keep shipping iterations — each one
                    makes the project more impressive and more useful.
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
                    Patrick McKenzie (patio11)
                  </p>
                  <p className="font-body text-sm italic text-foreground/70">
                    Side projects compound over time into career-changing
                    portfolios. A Bingo Card Creator built on nights and weekends
                    turned into a full career pivot. Hackathon projects have
                    the same potential.
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
                  &ldquo;The real gap is between doing nothing and doing
                  something. In this day and age, if your work isn&apos;t
                  online, it doesn&apos;t exist.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Kleon&apos;s principle: you don&apos;t have to be a genius —
                  you just have to share what you&apos;re doing. The act of
                  sharing is generosity, not self-promotion. Make something,
                  talk about it, and you&apos;ll attract people who care about
                  the same things.
                </p>
                <p className="font-code text-xs text-volt/60">
                  — Show Your Work, 2014
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
                  &ldquo;Luck surface area is directly proportional to the
                  degree to which you do something you&apos;re passionate about
                  combined with the total number of people to whom this is
                  effectively communicated.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  L = D x T. Do more (build, iterate, contribute) and tell more
                  (post, share, demo). Both dimensions grow your luck surface
                  area. Sharing one project to 1,000 people beats building 10
                  projects that nobody sees.
                </p>
                <p className="font-code text-xs text-spark/60">
                  — Jason Roberts, TechZing podcast
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
                  Mark Granovetter&apos;s landmark 1973 Stanford study found
                  that casual contacts — people you don&apos;t see every day —
                  are more valuable than close friends for finding jobs and
                  opportunities. They connect you to networks outside your own
                  circle.
                </p>
                <p className="font-body text-sm text-foreground/60">
                  Hackathon judges, sponsors, and fellow hackers are weak ties.
                  Cultivate them — they open doors that your close friends
                  can&apos;t.
                </p>
                <p className="font-code text-xs text-primary/60">
                  — American Journal of Sociology, 1973
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
                  Project yourself forward to age 80. Will you regret sharing
                  that project publicly? Will you regret sending that follow-up
                  email? No. You&apos;ll regret staying silent. The downside of
                  sharing is zero. The upside is unknowable.
                </p>
                <p className="font-code text-xs text-success/60">
                  — Jeff Bezos, founder of Amazon
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

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Day 1 — Within 24 Hours",
                description:
                  "Send follow-up messages to judges, sponsors, and contacts you met. Pin the GitHub repo to your profile. Update your LinkedIn headline if you won a prize. The connections are warmest right now — don't let them cool off.",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "Day 2-3 — Share Publicly",
                description:
                  "Write and publish a LinkedIn post about the project. Share the demo video. Tag teammates, sponsors, and the hackathon org. Tell the story of what you built, what you learned, and what's next. This is the post that gets seen.",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "Week 1 — Clean and Open-Source",
                description:
                  "Clean up the GitHub README with proper badges, screenshots, and install instructions. Open-source the project if possible. Add it to your portfolio site. Write a short blog post or Twitter thread about what you learned.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Month 1-6 — Keep Building",
                description:
                  "If the project has legs, keep going. Set a monthly milestone. Treat it like a real product — the hackathon gave you the MVP. Add features, get users, iterate based on feedback. This is how weekend projects become portfolio centerpieces.",
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
                — Austin Kleon, Show Your Work
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    The hackathon is the beginning, not the end.
                  </span>{" "}
                  Every project you share, every follow-up you send, every
                  iteration you ship expands your luck surface area. The person
                  who sees your LinkedIn post might be the one who changes your
                  trajectory.
                </p>
                <p className="font-body text-foreground/80">
                  You never know who&apos;s watching. You never know which
                  conversation will be the one that matters. The interviewer who
                  happened to be working on the same thing. The recruiter who
                  stumbled across your Devpost. The founder who saw your demo
                  video.
                </p>
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    You never know — and that&apos;s the whole point.
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
            subtitle="A step-by-step summary for maximizing the value of every hackathon. The event is over — now the real work begins."
          />

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Send personalized follow-ups to judges, sponsors, and contacts within 48 hours",
                  accent: "volt",
                },
                {
                  text: "Write a LinkedIn post about the project — tag teammates, sponsors, and the hackathon org",
                  accent: "spark",
                },
                {
                  text: "Pin the GitHub repo to your profile and clean up the README",
                  accent: "primary",
                },
                {
                  text: "Share the demo video on social media — it's the highest-signal content you can post",
                  accent: "success",
                },
                {
                  text: "Open-source the project if possible — it becomes a living portfolio piece",
                  accent: "volt",
                },
                {
                  text: "If the project has potential, set monthly milestones and keep building — you already have the MVP",
                  accent: "spark",
                },
                {
                  text: "\"If your work isn't online, it doesn't exist\" — make sure everything is findable",
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
              momentum. What you do with them after is what separates people
              who attend hackathons from people whose hackathons change their
              careers. Share it, follow up, keep building. It only takes one.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}

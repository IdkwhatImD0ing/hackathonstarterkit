import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Live preview of the Hackathon Starter Kit design system: colors, typography, components, and patterns.",
  openGraph: {
    title: "Design System",
    description:
      "Live preview of the Hackathon Starter Kit design system: colors, typography, components, and patterns.",
  },
};
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <Separator className="bg-primary/20" />
      {children}
    </section>
  );
}

function ColorSwatch({
  name,
  className,
  textClass = "text-foreground",
}: {
  name: string;
  className: string;
  textClass?: string;
}) {
  return (
    <div className="space-y-2">
      <div
        className={`h-20 w-full rounded-lg border border-border ${className}`}
      />
      <p className={`font-code text-xs ${textClass}`}>{name}</p>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Noise + scanline overlays */}
      <div className="noise pointer-events-none fixed inset-0 z-50" />

      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 lg:py-24">
        {/* ============ HERO ============ */}
        <header className="stagger-children mb-24 space-y-6">
          <Badge className="bg-spark text-spark-foreground hover:bg-spark/90 font-code text-xs">
            36+ WINS
          </Badge>
          <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl lg:text-8xl">
            Hackathon
            <br />
            <span className="text-primary">Starter Kit</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-muted-foreground md:text-xl">
            The ultimate playbook for winning hackathons: guides, templates,
            and battle-tested strategies from{" "}
            <span className="animate-shimmer font-semibold">
              36+ hackathon victories
            </span>{" "}
            and $100K+ in prizes.
          </p>
          <div className="flex gap-3 pt-2">
            <Button size="lg" className="glow-hover font-display">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glow-hover font-display"
            >
              View Guides
            </Button>
          </div>
        </header>

        <div className="space-y-20">
          {/* ============ COLOR PALETTE ============ */}
          <Section title="Color Palette">
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Core Surfaces
                </h3>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                  <ColorSwatch name="background" className="bg-background" />
                  <ColorSwatch name="foreground" className="bg-foreground" />
                  <ColorSwatch name="card" className="bg-card" />
                  <ColorSwatch name="surface" className="bg-surface" />
                  <ColorSwatch name="muted" className="bg-muted" />
                  <ColorSwatch name="accent" className="bg-accent" />
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Brand & Actions
                </h3>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                  <ColorSwatch name="primary" className="bg-primary" />
                  <ColorSwatch name="secondary" className="bg-secondary" />
                  <ColorSwatch name="volt" className="bg-volt" />
                  <ColorSwatch name="spark" className="bg-spark" />
                  <ColorSwatch name="success" className="bg-success" />
                  <ColorSwatch name="destructive" className="bg-destructive" />
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Borders & Utility
                </h3>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                  <ColorSwatch name="border" className="bg-border" />
                  <ColorSwatch name="input" className="bg-input" />
                  <ColorSwatch name="ring" className="bg-ring" />
                  <ColorSwatch name="glow" className="bg-glow" />
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Charts
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  <ColorSwatch name="chart-1" className="bg-chart-1" />
                  <ColorSwatch name="chart-2" className="bg-chart-2" />
                  <ColorSwatch name="chart-3" className="bg-chart-3" />
                  <ColorSwatch name="chart-4" className="bg-chart-4" />
                  <ColorSwatch name="chart-5" className="bg-chart-5" />
                </div>
              </div>
            </div>
          </Section>

          {/* ============ TYPOGRAPHY ============ */}
          <Section title="Typography">
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Display — JetBrains Mono
                </h3>
                <div className="space-y-3">
                  <p className="font-display text-7xl font-extrabold tracking-tighter">
                    display-xl
                  </p>
                  <p className="font-display text-5xl font-bold tracking-tight">
                    display-lg
                  </p>
                  <p className="font-display text-3xl font-bold">heading-lg</p>
                  <p className="font-display text-2xl font-semibold">
                    heading-md
                  </p>
                  <p className="font-display text-lg font-semibold">
                    heading-sm
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Body — Outfit
                </h3>
                <div className="space-y-3">
                  <p className="font-body text-lg">
                    body-lg — The quick brown fox jumps over the lazy dog.
                    Hackathons are 24-48 hour sprints of pure creation.
                  </p>
                  <p className="font-body text-base">
                    body — The quick brown fox jumps over the lazy dog. Ship
                    fast, break things, iterate. That&apos;s the hackathon way.
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    body-sm — The quick brown fox jumps over the lazy dog. 36
                    wins. 50+ hackathons. $100K+ in prizes.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Code — Fira Code
                </h3>
                <div className="rounded-lg border border-border bg-surface p-4">
                  <pre className="font-code text-sm leading-relaxed text-foreground">
                    <code>{`const hackathon = {
  name: "HackUTD 2024",
  result: "🏆 First Place",
  prize: "$5,000",
  team: ["Bill", "Kevin", "Spike", "Jasmine"],
  hoursSlept: 2,
};`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Section>

          {/* ============ BUTTONS ============ */}
          <Section title="Buttons">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button className="glow-hover font-display">Primary</Button>
                <Button variant="secondary" className="font-display">
                  Secondary
                </Button>
                <Button variant="outline" className="glow-hover font-display">
                  Outline
                </Button>
                <Button variant="ghost" className="font-display">
                  Ghost
                </Button>
                <Button variant="destructive" className="font-display">
                  Destructive
                </Button>
                <Button variant="link" className="font-display">
                  Link
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" className="glow-hover font-display">
                  Small
                </Button>
                <Button size="default" className="glow-hover font-display">
                  Default
                </Button>
                <Button size="lg" className="glow-hover font-display">
                  Large
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-volt text-volt-foreground hover:bg-volt/90 glow-hover font-display">
                  Volt CTA
                </Button>
                <Button className="bg-spark text-spark-foreground hover:bg-spark/90 glow-hover font-display">
                  Spark Action
                </Button>
                <Button className="bg-success text-success-foreground hover:bg-success/90 font-display">
                  Success
                </Button>
              </div>
            </div>
          </Section>

          {/* ============ BADGES ============ */}
          <Section title="Badges">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-volt text-volt-foreground hover:bg-volt/90">
                Volt
              </Badge>
              <Badge className="bg-spark text-spark-foreground hover:bg-spark/90">
                Spark
              </Badge>
              <Badge className="bg-success text-success-foreground hover:bg-success/90">
                Success
              </Badge>
              <Badge className="animate-shimmer border-0 font-display text-sm font-bold">
                🏆 36+ Wins
              </Badge>
            </div>
          </Section>

          {/* ============ CARDS ============ */}
          <Section title="Cards">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="glow-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-spark text-spark-foreground text-xs">
                      🏆 1st Place
                    </Badge>
                    <span className="font-code text-xs text-muted-foreground">
                      Nov 2024
                    </span>
                  </div>
                  <CardTitle className="font-display text-xl">
                    TalkTuahBank
                  </CardTitle>
                  <CardDescription>
                    Voice-based banking via phone calls. No internet needed.
                    Multi-language support with OpenAI Swarm.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      Retell AI
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      Next.js
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      Twilio
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glow-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-spark text-spark-foreground text-xs">
                      🏆 Grand Prize
                    </Badge>
                    <span className="font-code text-xs text-muted-foreground">
                      Jun 2024
                    </span>
                  </div>
                  <CardTitle className="font-display text-xl">
                    Dispatch AI
                  </CardTitle>
                  <CardDescription>
                    AI-powered 911 system addressing 82% understaffed call
                    centers. $60K+ won. $50K SkyDeck funding.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      Mistral LLM
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      Hume AI
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      Intel Cloud
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glow-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-spark text-spark-foreground text-xs">
                      🏆 Google 1st
                    </Badge>
                    <span className="font-code text-xs text-muted-foreground">
                      Apr 2024
                    </span>
                  </div>
                  <CardTitle className="font-display text-xl">
                    AdaptED
                  </CardTitle>
                  <CardDescription>
                    AI lecturer adapting in real-time with emotion detection and
                    conversational voice AI. LA Hacks winner.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      Gemma
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      Fetch.AI
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-volt/30 text-volt font-code text-xs"
                    >
                      WebRTC
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* ============ INPUTS ============ */}
          <Section title="Inputs">
            <div className="max-w-md space-y-4">
              <div className="space-y-2">
                <label className="font-display text-sm font-medium">
                  Project Name
                </label>
                <Input placeholder="e.g. Dispatch AI" className="font-body" />
              </div>
              <div className="space-y-2">
                <label className="font-display text-sm font-medium">
                  Description
                </label>
                <Textarea
                  placeholder="Describe your hackathon project..."
                  className="font-body"
                />
              </div>
            </div>
          </Section>

          {/* ============ EFFECTS ============ */}
          <Section title="Effects & Animations">
            <div className="space-y-10">
              {/* Glow */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Glow Pulse
                </h3>
                <div className="animate-glow-pulse inline-block rounded-xl border border-primary/20 bg-card px-8 py-6">
                  <p className="font-display text-2xl font-bold">
                    Pulsing Glow
                  </p>
                </div>
              </div>

              {/* Shimmer */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Trophy Shimmer
                </h3>
                <p className="animate-shimmer font-display text-5xl font-extrabold">
                  36+ Hackathon Wins
                </p>
              </div>

              {/* Stagger */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Staggered Reveal
                </h3>
                <div className="stagger-children flex gap-3">
                  {["Ship", "Fast", "Win", "Big", "Repeat"].map((word) => (
                    <div
                      key={word}
                      className="rounded-lg border border-primary/20 bg-card px-4 py-3"
                    >
                      <span className="font-display text-sm font-semibold">
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glass */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Glass Morphism
                </h3>
                <div className="relative h-40 overflow-hidden rounded-xl border border-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-volt/20 to-spark/20" />
                  <div className="glass absolute inset-x-4 bottom-4 rounded-lg p-4">
                    <p className="font-display text-sm font-semibold">
                      Frosted glass navigation bar
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      backdrop-filter: blur(16px)
                    </p>
                  </div>
                </div>
              </div>

              {/* Float */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Float Animation
                </h3>
                <div className="flex gap-6">
                  <div className="animate-float rounded-xl border border-primary/20 bg-card p-4">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <div
                    className="animate-float rounded-xl border border-volt/20 bg-card p-4"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <span className="text-3xl">⚡</span>
                  </div>
                  <div
                    className="animate-float rounded-xl border border-spark/20 bg-card p-4"
                    style={{ animationDelay: "1s" }}
                  >
                    <span className="text-3xl">🚀</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ============ STATS ============ */}
          <Section title="Stats Callout">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: "36+", label: "Hackathons Won", accent: "text-spark" },
                { value: "50+", label: "Hackathons Attended", accent: "text-volt" },
                { value: "$100K+", label: "In Prizes", accent: "text-primary" },
                { value: "4K+", label: "Community Members", accent: "text-success" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glow-hover rounded-xl border border-border bg-card p-6 text-center"
                >
                  <p
                    className={`font-display text-4xl font-extrabold tracking-tight ${stat.accent}`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 font-body text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* ============ FONT SPECIMEN ============ */}
          <Section title="Font Specimen">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3 rounded-xl border border-border bg-card p-6">
                <Badge variant="outline" className="font-code text-xs">
                  --font-display
                </Badge>
                <p className="font-display text-3xl font-bold">
                  JetBrains Mono
                </p>
                <p className="font-display text-sm text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  0123456789 !@#$%^&*()
                </p>
              </div>

              <div className="space-y-3 rounded-xl border border-border bg-card p-6">
                <Badge variant="outline" className="font-code text-xs">
                  --font-body
                </Badge>
                <p className="font-body text-3xl font-bold">Outfit</p>
                <p className="font-body text-sm text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  0123456789 !@#$%^&*()
                </p>
              </div>

              <div className="space-y-3 rounded-xl border border-border bg-card p-6">
                <Badge variant="outline" className="font-code text-xs">
                  --font-code
                </Badge>
                <p className="font-code text-3xl font-bold">Fira Code</p>
                <p className="font-code text-sm text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  {`0123456789 => !== === ->`}
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* ============ FOOTER ============ */}
        <footer className="mt-24 border-t border-border pt-8 text-center">
          <p className="font-code text-xs text-muted-foreground">
            Hackathon Starter Kit — Design System v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Plug, KeyRound, FileText, Mic, Database, ArrowRight, Zap, ExternalLink } from "lucide-react";
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

export const metadata: Metadata = {
  title: "Using APIs",
  description:
    "How to add any service to your app with just an API key and a docs link. The copy-paste pattern for non-coders.",
};

const GENERIC_PROMPT = `I want to use [SERVICE NAME] in my project.

Here is my API key: [paste your key here]
Here are the docs: [paste the docs URL here]

Build [describe what you want] using this service.
Store the API key in an environment variable, not in the code.`;

const ELEVENLABS_PROMPT = `I want to use ElevenLabs in my project to create a voice agent that can have conversations.

Here is my API key: sk-abc123...
Here are the docs: https://elevenlabs.io/docs/api-reference

Build a conversational voice agent that:
- Lets the user click a button to start talking
- Sends their speech to ElevenLabs for processing
- Plays the AI response back as audio

Store the API key in an environment variable called ELEVENLABS_API_KEY.`;

const SUPABASE_PROMPT = `I want to use Supabase as my database.

Here is my project URL: https://abc123.supabase.co
Here is my anon key: eyJhbGci...
Here are the docs: https://supabase.com/docs/reference/javascript/introduction

Create a simple database setup that:
- Has a "posts" table with title, content, and created_at columns
- Shows all posts on the main page
- Has a form to create a new post

Store the Supabase URL and key in environment variables.`;

export default function ApisPage() {
  return (
    <div className="space-y-24">
      <header className="stagger-children space-y-4">
        <Badge className="border-success/30 bg-success/10 text-success font-code text-xs">
          USING APIS
        </Badge>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Add Any Service
          <br />
          <span className="text-success">With One Prompt</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          Want to add voice AI, a database, payments, or text messaging to your
          app? You don&apos;t need to understand how they work. You just need
          two things: a key and a docs link.
        </p>
      </header>

      <Separator className="bg-primary/20" />

      {/* ── WHAT IS AN API ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            What Is an API?
          </h2>
          <Separator className="bg-primary/20" />
        </div>

        <div className="glass rounded-xl border border-success/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-success/10">
              <Plug className="size-6 text-success" />
            </div>
            <div className="space-y-3">
              <p className="font-body text-foreground/80">
                An API is like a{" "}
                <span className="font-display font-semibold text-foreground">
                  restaurant menu
                </span>
                . You (your app) look at the menu (the documentation), place an
                order (send a request), and the kitchen (the service) prepares
                your food (the response). You never go into the kitchen
                yourself.
              </p>
              <p className="font-body text-foreground/80">
                Companies like ElevenLabs, Supabase, Twilio, and Stripe all
                offer APIs. They let your app use their services (voice AI,
                databases, phone calls, payments) without you building those
                things from scratch.
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Not sure what an API key or environment variable is? Check{" "}
                <Link
                  href="/non-coders/concepts"
                  className="text-volt underline decoration-volt/30 hover:decoration-volt"
                >
                  Concepts Explained
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PATTERN ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            The Pattern
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            This works for almost any service. Three steps, every time.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Sign up and copy your API key",
              description:
                "Go to the service's website (e.g., elevenlabs.io), create a free account, and find your API key in the dashboard or settings. Copy it.",
              accent: "volt" as const,
              icon: KeyRound,
            },
            {
              step: 2,
              title: "Find the docs link",
              description:
                "Every service has a documentation page (usually at docs.servicename.com or servicename.com/docs). Copy the URL. This is the \"menu\" your AI reads to understand how the service works.",
              accent: "spark" as const,
              icon: FileText,
            },
            {
              step: 3,
              title: "Paste this prompt into your AI chat",
              description:
                "Give the AI your key, the docs link, and describe what you want. The AI reads the docs, writes the code, and stores your key safely. You don't touch any of it.",
              accent: "success" as const,
              icon: ArrowRight,
            },
          ].map((item) => {
            const accentMap = {
              volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt" },
              spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark" },
              success: { border: "border-success/20", bg: "bg-success/10", text: "text-success" },
            };
            const a = accentMap[item.accent];
            return (
              <div
                key={item.step}
                className={`rounded-xl border ${a.border} bg-card p-5 transition-all`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${a.bg} font-display text-lg font-bold ${a.text}`}
                  >
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <p className={`font-display text-lg font-semibold ${a.text}`}>
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

      {/* ── THE PROMPT TEMPLATE ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            The Prompt Template
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Copy this, fill in the blanks, and paste it into Cursor (Ctrl+I).
            Works for any service.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="glass rounded-xl border border-volt/10 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-primary/10 px-5 py-3">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-spark/70" />
            <span className="size-3 rounded-full bg-success/70" />
            <span className="ml-3 font-code text-xs text-muted-foreground">
              universal API prompt
            </span>
          </div>
          <div className="p-5 space-y-3">
            <pre className="overflow-x-auto font-code text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
              {GENERIC_PROMPT}
            </pre>
            <CopyButton text={GENERIC_PROMPT} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="font-body text-sm text-muted-foreground">
            <span className="font-display font-semibold text-foreground">
              That&apos;s the whole pattern.
            </span>{" "}
            The AI reads the docs, figures out how to use the service, writes
            the code, and stores your key safely. You describe what you want in
            plain English.
          </p>
        </div>
      </section>

      {/* ── EXAMPLE: ELEVENLABS ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Example: ElevenLabs Voice Agent
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Here&apos;s what the prompt looks like when filled in for a real
            service. This adds a conversational voice AI to your app.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <Card className="glow-hover border-volt/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                <Mic className="size-5 text-volt" />
              </div>
              <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                VOICE AI
              </Badge>
            </div>
            <CardTitle className="font-display text-xl text-volt">
              <a
                href="https://try.elevenlabs.io/thehackathonplaybook"
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-volt/80"
              >
                ElevenLabs
                <ExternalLink className="size-4" />
              </a>
            </CardTitle>
            <CardDescription className="font-body">
              Adds voice conversations to your app. Users click a button, speak,
              and hear an AI response.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                What you paste into Cursor
              </p>
              <div className="rounded-lg border border-volt/20 bg-volt/5 p-4">
                <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
                  {ELEVENLABS_PROMPT}
                </pre>
              </div>
              <CopyButton text={ELEVENLABS_PROMPT} />
            </div>
            <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
              <p className="font-code text-xs text-volt/80">
                Replace the fake API key with your real one from
                elevenlabs.io/app/settings/api-keys
              </p>
            </div>
            <a
              href="https://try.elevenlabs.io/thehackathonplaybook"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group glow-hover relative flex flex-col gap-4 overflow-hidden rounded-xl border border-volt/30 bg-gradient-to-br from-volt/10 via-volt/5 to-transparent p-5 transition-all hover:border-volt/60 sm:flex-row sm:items-center"
            >
              <div className="flex-1 space-y-1.5">
                <span className="font-code text-[10px] uppercase tracking-wider text-volt">
                  ElevenLabs
                </span>
                <p className="font-display text-base font-bold text-foreground transition-colors group-hover:text-volt">
                  Get the Voice AI Stack the Pros Use
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Free tier covers a hackathon. Sign up, grab your API key, and
                  paste the prompt above into Cursor.
                </p>
              </div>
              <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-volt px-4 py-2.5 font-display text-sm font-bold text-volt-foreground shadow-lg shadow-volt/20 transition-all group-hover:shadow-xl group-hover:shadow-volt/30 sm:shrink-0">
                Try ElevenLabs Free
                <ExternalLink className="size-3.5" />
              </span>
            </a>
          </CardContent>
        </Card>
      </section>

      {/* ── MCP TIP: ELEVENLABS ── */}
      <div className="rounded-xl border border-volt/10 bg-card p-5">
        <div className="flex items-start gap-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-volt/10">
            <Zap className="size-4 text-volt" />
          </div>
          <div className="space-y-2">
            <p className="font-display text-sm font-semibold">
              Power User Tip: ElevenLabs MCP
            </p>
            <p className="font-body text-sm text-foreground/60">
              For even deeper integration, ElevenLabs offers an MCP server that
              gives your AI direct access to their API without you pasting docs
              each time. Paste this into your AI chat:
            </p>
            <div className="rounded-lg border border-volt/20 bg-volt/5 p-3">
              <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">{`Search for and install the ElevenLabs MCP server so you can use their voice AI tools directly. Add it to my project's MCP configuration.`}</pre>
            </div>
            <CopyButton
              text="Search for and install the ElevenLabs MCP server so you can use their voice AI tools directly. Add it to my project's MCP configuration."
            />
            <p className="font-body text-xs text-muted-foreground">
              An MCP (Model Context Protocol) server lets the AI talk to a
              service directly, without you copying docs or keys into every
              prompt. Think of it as giving the AI a permanent phone line to
              that service.
            </p>
          </div>
        </div>
      </div>

      {/* ── EXAMPLE: SUPABASE ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Example: Supabase Database
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Same pattern, different service. This adds a database so your app
            can save and display data.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <Card className="glow-hover border-spark/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                <Database className="size-5 text-spark" />
              </div>
              <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                DATABASE
              </Badge>
            </div>
            <CardTitle className="font-display text-xl text-spark">
              Supabase
            </CardTitle>
            <CardDescription className="font-body">
              Adds a database to your app. Store data, display lists, create
              forms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                What you paste into Cursor
              </p>
              <div className="rounded-lg border border-spark/20 bg-spark/5 p-4">
                <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
                  {SUPABASE_PROMPT}
                </pre>
              </div>
              <CopyButton text={SUPABASE_PROMPT} />
            </div>
            <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
              <p className="font-code text-xs text-spark/80">
                Get your URL and anon key from supabase.com/dashboard &gt;
                Settings &gt; API
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── MCP TIP: SUPABASE ── */}
      <div className="rounded-xl border border-spark/10 bg-card p-5">
        <div className="flex items-start gap-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-spark/10">
            <Zap className="size-4 text-spark" />
          </div>
          <div className="space-y-2">
            <p className="font-display text-sm font-semibold">
              Power User Tip: Supabase MCP
            </p>
            <p className="font-body text-sm text-foreground/60">
              Supabase also has an MCP server. Once installed, the AI can
              create tables, run queries, and manage your database directly
              without you pasting credentials into every prompt.
            </p>
            <div className="rounded-lg border border-spark/20 bg-spark/5 p-3">
              <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">{`Search for and install the Supabase MCP server so you can manage my database directly. Add it to my project's MCP configuration.`}</pre>
            </div>
            <CopyButton
              text="Search for and install the Supabase MCP server so you can manage my database directly. Add it to my project's MCP configuration."
            />
          </div>
        </div>
      </div>

      {/* ── WHAT IS AN MCP ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            What Is an MCP?
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            For power users who want the AI to remember how to use a service
            permanently.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="glass rounded-xl border border-primary/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="size-6 text-primary" />
            </div>
            <div className="space-y-3">
              <p className="font-body text-foreground/80">
                <span className="font-display font-semibold text-foreground">
                  MCP stands for Model Context Protocol.
                </span>{" "}
                It&apos;s a way to give your AI a permanent connection to a
                service. Instead of pasting your API key and docs link every
                time, you install an MCP server once and the AI can use that
                service whenever it needs to.
              </p>
              <p className="font-body text-foreground/80">
                Think of the difference like this: the API prompt pattern is
                like giving someone a recipe card each time you want them to
                cook. An MCP is like hiring a chef who already knows the
                recipe.
              </p>
              <p className="font-body text-foreground/80">
                You don&apos;t need MCPs to get started. The API key + docs
                pattern works perfectly. But as you get comfortable, MCPs make
                repeated tasks faster. Many popular services (Supabase, GitHub,
                ElevenLabs, Stripe, Figma) offer MCP servers.
              </p>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  To find and install any MCP
                </p>
                <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">{`Search for an MCP server for [SERVICE NAME] and install it. Add it to my project's MCP configuration so you can use it in future conversations.`}</pre>
                <CopyButton
                  text={`Search for an MCP server for [SERVICE NAME] and install it. Add it to my project's MCP configuration so you can use it in future conversations.`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY TAKEAWAY ── */}
      <section>
        <div className="animate-glow-pulse glass rounded-xl border border-success/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
              <Plug className="size-5 text-success" />
            </div>
            <div className="space-y-2">
              <p className="font-display font-semibold">
                The Key Insight
              </p>
              <p className="font-body text-sm text-foreground/80">
                You don&apos;t need to understand how an API works. You need to
                give the AI three things: your key, the docs link, and a
                description of what you want. The AI reads the documentation
                (which is written for programmers) and translates it into
                working code. You just describe the outcome in plain English.
              </p>
              <p className="font-body text-sm text-foreground/80">
                This pattern works for voice AI (ElevenLabs), databases
                (Supabase), payments (Stripe), text messaging (Twilio), image
                generation (Replicate), email (Resend), and hundreds of other
                services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

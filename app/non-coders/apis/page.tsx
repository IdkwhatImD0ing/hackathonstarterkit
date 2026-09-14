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
import { LastUpdated } from "@/components/last-updated";
import { markdownAlternate, SITE_URL } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { CopyForAi } from "@/components/copy-for-ai";

export const metadata: Metadata = {
  title: "Using APIs",
  description:
    "How to add any service to your app with just an API key and a docs link. The copy-paste pattern for non-coders.",
  alternates: {
    canonical: `${SITE_URL}/non-coders/apis`,
    types: markdownAlternate("/non-coders/apis"),
  },
};

const GENERIC_PROMPT = `I want to use [SERVICE NAME] in my project.

Here are the docs: [paste the docs URL here]

Build [describe what you want] using this service.
I'll put the API key in .env.local myself, so don't ask me to paste it here. Create .env.local with a placeholder for the key, check that .gitignore covers it, and tell me which line to fill in. Keep secret keys in server-side code, never in code that runs in the browser.`;

const ELEVENLABS_PROMPT = `I want to use ElevenLabs in my project to create a voice agent that can have conversations.

Here are the docs: https://elevenlabs.io/docs/api-reference

Build a conversational voice agent that:
- Lets the user click a button to start talking
- Sends their speech to ElevenLabs for processing
- Plays the AI response back as audio

I'll put my API key in .env.local myself as ELEVENLABS_API_KEY, so don't ask me to paste it here. Create .env.local with a placeholder, check that .gitignore covers it, and only use the key in server-side code so it never reaches the browser.`;

const SUPABASE_PROMPT = `I want to use Supabase as my database.

Here are the docs: https://supabase.com/docs/reference/javascript/introduction

Create a simple database setup that:
- Has a "posts" table with title, content, and created_at columns
- Shows all posts on the main page
- Has a form to create a new post

I'll put my Supabase project URL and anon key in .env.local myself, so don't ask me to paste them here. Create .env.local with placeholders and check that .gitignore covers it.
Turn on Row Level Security for the posts table, and only allow what this app needs: reading posts and adding new ones.`;

const ELEVENLABS_MCP_PROMPT = `Install the official ElevenLabs MCP server (github.com/elevenlabs/elevenlabs-mcp) so you can use their voice AI tools directly. Add it to my project's MCP configuration. If it needs my API key, tell me which file to put it in so I can add it myself, and make sure that file stays out of GitHub.`;

const SUPABASE_MCP_PROMPT = `Install the official Supabase MCP server, the one linked from Supabase's own docs, so you can manage my database directly. Add it to my project's MCP configuration. If it needs a key or token, tell me which file to put it in so I can add it myself, and make sure that file stays out of GitHub.`;

const GENERIC_MCP_PROMPT = `Find the official MCP server for [SERVICE NAME], the one linked from its own docs, and install it. If there isn't an official one, ask me before installing anything. Add it to my project's MCP configuration so you can use it in future conversations. If it needs a key or token, tell me which file to put it in so I can add it myself, and make sure that file stays out of GitHub.`;

export default function ApisPage() {
  return (
    <div className="space-y-24">
      <BreadcrumbJsonLd path="/non-coders/apis" />
      <header className="stagger-children space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge className="border-success/30 bg-success/10 text-success font-code text-xs">
            USING APIS
          </Badge>
          <CopyForAi path="/non-coders/apis" title="Using APIs" />
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Add Any Service
          <br />
          <span className="text-success">With One Prompt</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          You can add voice AI, a database, payments, or text messaging to your
          app without knowing how any of them work. You need an API key, the
          service&apos;s docs link, and a sentence about what you want.
        </p>
        <LastUpdated date="2026-09-14" />
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
                An API is how your app uses another company&apos;s service.
                ElevenLabs, Supabase, Twilio, and Stripe all offer one, so your
                app can use their voice AI, databases, phone calls, and payments
                without you building any of that from scratch.
              </p>
              <p className="font-body text-sm text-muted-foreground">
                For the longer explanation, plus what an API key and an
                environment variable are, see{" "}
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
            This works for almost any service.
          </p>
          <Separator className="bg-primary/20" />
        </div>

        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Sign up and find your API key",
              description:
                "Create a free account on the service's website (for example, elevenlabs.io) and find your API key in the dashboard or settings.",
              accent: "volt" as const,
              icon: KeyRound,
            },
            {
              step: 2,
              title: "Find the docs link",
              description:
                "Copy the URL of the service's documentation, usually at docs.servicename.com or servicename.com/docs. The AI reads it to learn how the service works.",
              accent: "spark" as const,
              icon: FileText,
            },
            {
              step: 3,
              title: "Paste the prompt, then add your key",
              description:
                "Paste the prompt below into your AI chat. The AI writes the code and creates a file called .env.local with a blank spot for your key, which you fill in yourself. Never paste a key into the chat: the AI can copy it straight into your code, and the chat history keeps it.",
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
            Fill in the brackets and paste it into Cursor (Ctrl+I, or Cmd+I on
            Mac).
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
              Why the prompt says &ldquo;server-side&rdquo;:
            </span>{" "}
            .env.local keeps the key out of your code, but it can&apos;t stop
            the app from sending the key to the browser, where anyone using your
            app can read it. Server-side code runs on your server instead of in
            your users&apos; browsers, so the key stays hidden.
          </p>
        </div>
      </section>

      {/* ── EXAMPLE: ELEVENLABS ── */}
      {/* [NEEDS SPECIFIC: a hackathon where you, or a non-coder you worked with or judged, wired in a service this way. One line would ground this page.] */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Example: ElevenLabs Voice Agent
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Here&apos;s the template filled in for a real service.
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
              Adds voice conversations to your app.
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
                Get your key from elevenlabs.io/app/settings/api-keys and paste
                it into .env.local once the AI has created the file.
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
                  Try the Example on ElevenLabs
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  There&apos;s a free tier if you want to check it out. See how
                  much usage it includes before you count on it for a live demo.
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

      {/* ── EXAMPLE: SUPABASE ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Example: Supabase Database
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Same pattern, different service.
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
              Adds a database so your app can save data and show it.
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
            <div className="rounded-lg border border-spark/10 bg-spark/5 p-3 space-y-2">
              {/* [CONFIRM: is this dashboard path still current? Newer Supabase projects may label the anon key as the "publishable" key.] */}
              <p className="font-code text-xs text-spark/80">
                Get your URL and anon key from supabase.com/dashboard &gt;
                Settings &gt; API
              </p>
              <p className="font-body text-xs text-foreground/70">
                The anon key is meant to be public, so apps usually send it to
                the browser. Row Level Security limits what anyone holding it
                can do to your data, so keep that line in the prompt.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── WHAT IS AN MCP ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            What Is an MCP?
          </h2>
          <p className="max-w-3xl font-body text-muted-foreground">
            Optional. The pattern above is all you need to start.
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
                An MCP server gives your AI a standing connection to one
                service. Install it once and the AI can keep using that service
                without a docs link each time. The Supabase one, for example,
                lets the AI create tables and run queries on your database
                itself. Supabase, GitHub, ElevenLabs, Stripe, and Figma all
                offer one.
              </p>
              <p className="font-body text-foreground/80">
                Install the official server, the one the service links from its
                own docs. Anyone can publish an MCP server, and whichever one you
                install gets your key and access to your account, so a fake one
                could misuse both.
              </p>
              {/* [CONFIRM: the ElevenLabs repo URL below comes from lib/blog/posts/build-with-elevenlabs-and-cursor.ts. OK to use it here? No official Supabase MCP link exists on this site, so that prompt points the AI to Supabase's docs instead. Link the official servers if you want.] */}
              <div className="rounded-lg border border-volt/20 bg-volt/5 p-3 space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  ElevenLabs
                </p>
                <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
                  {ELEVENLABS_MCP_PROMPT}
                </pre>
                <CopyButton text={ELEVENLABS_MCP_PROMPT} />
              </div>
              <div className="rounded-lg border border-spark/20 bg-spark/5 p-3 space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Supabase
                </p>
                <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
                  {SUPABASE_MCP_PROMPT}
                </pre>
                <CopyButton text={SUPABASE_MCP_PROMPT} />
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-2">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Any other service
                </p>
                <pre className="overflow-x-auto font-code text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
                  {GENERIC_MCP_PROMPT}
                </pre>
                <CopyButton text={GENERIC_MCP_PROMPT} />
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
                Same Prompt, Other Services
              </p>
              <p className="font-body text-sm text-foreground/80">
                The template works the same way for payments (Stripe), text
                messages (Twilio), image generation (Replicate), email (Resend),
                and most other services that publish API docs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

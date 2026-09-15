import type { Metadata } from "next";
import {
  FolderGit2,
  Save,
  UtensilsCrossed,
  KeyRound,
  Globe,
  Server,
  TerminalSquare,
  Monitor,
  Lock,
  Package,
  GitBranch,
  FileCode,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LastUpdated } from "@/components/last-updated";
import { markdownAlternate, SITE_URL } from "@/lib/site";
import { shareMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { CopyForAi } from "@/components/copy-for-ai";

export const metadata: Metadata = {
  title: "Concepts Explained",
  description:
    "GitHub, APIs, deploying, and other tech jargon explained in plain English for non-coders.",
  alternates: {
    canonical: `${SITE_URL}/non-coders/concepts`,
    types: markdownAlternate("/non-coders/concepts"),
  },
  ...shareMetadata({
    path: "/non-coders/concepts",
    title: "Tech Jargon in Plain English, for Non-Coders",
    description:
      "GitHub, APIs, deploying, and other tech jargon explained in plain English for non-coders.",
  }),
};

const CONCEPTS = [
  {
    term: "GitHub / Repository",
    icon: FolderGit2,
    oneLiner: "Your project's folder, plus a saved snapshot of every version. Each snapshot is called a commit.",
    analogy:
      "If something breaks, your AI can take the project back to any earlier commit. That history only lives on your computer until it's pushed (uploaded) to GitHub, the website that keeps a copy online.",
    accent: "volt" as const,
  },
  {
    term: "Git Commit",
    icon: Save,
    oneLiner: "A checkpoint of your whole project, with a note about what changed.",
    analogy:
      "It's the tidy version of naming files draft_v2_final_FINAL.docx. Saving a file doesn't make a commit, though. Once a feature works, tell your AI \"commit this with a descriptive message.\" The note it writes, like \"added login page,\" is how you find that version later.",
    accent: "spark" as const,
  },
  {
    term: "Branch",
    icon: GitBranch,
    oneLiner: "A separate copy of your project where you can experiment safely.",
    analogy:
      "Say you want to try a new home page design without losing the one that works. Your AI makes the changes on a branch. If you like them, it merges them back into the main version. If not, it deletes the branch and the original is untouched.",
    accent: "primary" as const,
  },
  {
    term: "API",
    icon: UtensilsCrossed,
    oneLiner: "A menu that lets your app order services from other companies.",
    analogy:
      "Your app sends a request, like \"read this sentence out loud,\" and the other company's server sends back a response, like an audio file. The API's documentation lists the requests you can make. That's how your app can send texts (Twilio), generate speech (ElevenLabs), or store data (Supabase) without you building any of it.",
    accent: "success" as const,
  },
  {
    term: "API Key",
    icon: KeyRound,
    oneLiner: "A code that proves your app is allowed to use a service.",
    analogy:
      "Services like ElevenLabs give you one when you sign up: a long string of letters and numbers. Your app sends it with every request so the service knows it's you. Anyone who has your key can use the service as you, so keep it private unless the service says it's meant to be public.",
    accent: "volt" as const,
  },
  {
    term: "Environment Variable",
    icon: Lock,
    oneLiner: "A setting, like an API key, that's kept outside your code.",
    // [NEEDS SPECIFIC: have you seen a team leak a key, or had one break a demo, at a hackathon? One line would ground this card.]
    analogy:
      "Your AI puts these settings in a file called .env.local so keys stay out of your code files. Never commit that file. The file keeps a key out of your code, but your app can still send that key to visitors' browsers. So tell your AI to use secret keys (like an ElevenLabs key) only in server code, the part of your app that runs on a server instead of in the visitor's browser. Supabase's anon key is an exception: it's meant to be public, but only once Row Level Security is turned on for your tables. The Supabase prompt on the APIs page turns it on.",
    accent: "spark" as const,
  },
  {
    term: "localhost:3000",
    icon: Monitor,
    oneLiner: "Your app running on your own computer, visible only to you.",
    analogy:
      "Type it into your browser while your AI has the app running. It's where you test each feature before you commit it.",
    accent: "primary" as const,
  },
  {
    term: "Deploy",
    icon: Globe,
    oneLiner: "Publishing your app so anyone with the link can use it.",
    analogy:
      "Deploying puts your app on the internet at a real URL, like myapp.vercel.app. At a hackathon, do it in the first hour so you can always demo from a live URL instead of localhost. Tell your AI: \"deploy this to Vercel.\"",
    accent: "success" as const,
  },
  {
    term: "Vercel",
    icon: Server,
    oneLiner: "The service that hosts your app on the internet.",
    analogy:
      "It puts your project on a server and gives it a public URL, free for small projects. Connect it to your GitHub repository once, and it publishes a new version every time new commits are pushed there.",
    accent: "volt" as const,
  },
  {
    term: "Terminal / Command Line",
    icon: TerminalSquare,
    oneLiner: "A text-based way to give instructions to your computer.",
    analogy:
      "It's the black window with blinking text. Your AI types and runs most commands in it for you. If you've added this guide's system prompt, it asks before anything hard to undo, like deleting files or deploying.",
    accent: "spark" as const,
  },
  {
    term: "npm / pnpm",
    icon: Package,
    oneLiner: "An app store for code libraries.",
    analogy:
      "When your app needs something common, like a date picker or a chart, your AI installs a library someone else already built. That's what the \"npm install\" lines in the terminal are doing. npm and pnpm are two tools for the same job.",
    accent: "primary" as const,
  },
  {
    term: "TypeScript / JavaScript",
    icon: FileCode,
    oneLiner: "The programming language your app's pages are written in.",
    analogy:
      "TypeScript is JavaScript with extra checks for mistakes. This guide's skills write your app's pages in TypeScript and any backend (the part users don't see) in Python. You don't need to learn either one.",
    accent: "success" as const,
  },
];

const accentStyles = {
  volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt" },
  spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark" },
  primary: { border: "border-primary/20", bg: "bg-primary/10", text: "text-primary" },
  success: { border: "border-success/20", bg: "bg-success/10", text: "text-success" },
};

export default function ConceptsPage() {
  return (
    <div className="space-y-12">
      <BreadcrumbJsonLd path="/non-coders/concepts" />
      <header className="stagger-children space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge className="border-primary/30 bg-primary/10 text-primary font-code text-xs">
            CONCEPTS EXPLAINED
          </Badge>
          <CopyForAi path="/non-coders/concepts" title="Concepts Explained" />
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Tech Jargon,
          <br />
          <span className="text-primary">In Plain English</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          The words you&apos;ll run into while building with AI, explained
          without code.
        </p>
        <LastUpdated date="2026-09-14" />
      </header>

      <Separator className="bg-primary/20" />

      <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
        {CONCEPTS.map((concept) => {
          const a = accentStyles[concept.accent];
          return (
            <div
              key={concept.term}
              className={`glow-hover rounded-xl border ${a.border} bg-card p-6 transition-all`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${a.bg}`}
                >
                  <concept.icon className={`size-6 ${a.text}`} />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className={`font-display text-lg font-bold ${a.text}`}>
                      {concept.term}
                    </h3>
                    <p className="font-body text-sm font-semibold text-foreground/80">
                      {concept.oneLiner}
                    </p>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-foreground/60">
                    {concept.analogy}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* [CONFIRM: /explain comes from .agents/commands/explain.md, not skills/. It's unverified that the skills install prompt installs it.] */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="font-body text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">
            Don&apos;t memorize these.
          </span>{" "}
          Come back when you hit a word you don&apos;t recognize, or type{" "}
          <code className="font-code text-xs text-volt">/explain</code> in your
          AI chat followed by whatever confuses you.
        </p>
      </div>
    </div>
  );
}

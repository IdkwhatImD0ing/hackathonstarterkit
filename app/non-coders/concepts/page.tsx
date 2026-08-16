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
};

const CONCEPTS = [
  {
    term: "GitHub / Repository",
    icon: FolderGit2,
    oneLiner: "A shared folder for your project that remembers every change.",
    analogy:
      "Think of it like a Google Drive folder, but with a built-in time machine. Every time you save (\"commit\"), it takes a snapshot. You can go back to any snapshot if something breaks. Your AI assistant uses this to keep your work safe.",
    accent: "volt" as const,
  },
  {
    term: "Git Commit",
    icon: Save,
    oneLiner: "Pressing \"Save\" with a note about what you changed.",
    analogy:
      "When you edit a Word document, you might save versions like \"draft_v2_final_FINAL.docx\". A commit is the same idea, but organized. Each save has a short description like \"added login page\" so you can find it later. Tell your AI: \"commit this with a descriptive message.\"",
    accent: "spark" as const,
  },
  {
    term: "API",
    icon: UtensilsCrossed,
    oneLiner: "A menu that lets your app order services from other companies.",
    analogy:
      "Imagine a restaurant. You (your app) look at the menu (the API documentation), place an order (send a request), and the kitchen (the server) prepares your food (the response). You never go into the kitchen yourself. APIs let your app use services like sending texts (Twilio), generating speech (ElevenLabs), or storing data (Supabase) without building those things from scratch.",
    accent: "primary" as const,
  },
  {
    term: "API Key",
    icon: KeyRound,
    oneLiner: "Your membership card that proves you're allowed to use a service.",
    analogy:
      "When you sign up for a service like ElevenLabs, they give you a long string of letters and numbers. This is your API key. It's like a membership card: you show it every time your app talks to their service, and they know it's you. Never share it publicly (that's like leaving your credit card on a park bench).",
    accent: "success" as const,
  },
  {
    term: "Deploy",
    icon: Globe,
    oneLiner: "Publishing your app so anyone with the link can use it.",
    analogy:
      "Right now your app only runs on your computer. Deploying is like publishing a Google Doc with \"anyone with the link can view.\" After deploying, your app gets a real URL (like myapp.vercel.app) that anyone in the world can visit. Tell your AI: \"deploy this to Vercel.\"",
    accent: "volt" as const,
  },
  {
    term: "Vercel",
    icon: Server,
    oneLiner: "The service that hosts your app on the internet.",
    analogy:
      "If your app is a document, Vercel is the printer and distributor. It takes your project, puts it on a fast server, and gives it a public URL. It's free for small projects. Think of it like Squarespace, but for apps instead of websites. You connect it to your GitHub, and it automatically publishes every time you save.",
    accent: "spark" as const,
  },
  {
    term: "Terminal / Command Line",
    icon: TerminalSquare,
    oneLiner: "A text-based way to give instructions to your computer.",
    analogy:
      "Instead of clicking buttons, you type commands. It looks intimidating (a black screen with blinking text), but here's the good news: your AI assistant types the commands for you. When it says \"run this in the terminal,\" just let it do its thing. You rarely need to type terminal commands yourself.",
    accent: "primary" as const,
  },
  {
    term: "localhost:3000",
    icon: Monitor,
    oneLiner: "Your app running on your own computer, visible only to you.",
    analogy:
      "When you're building, your app runs locally (on your machine) at an address like localhost:3000. Open your browser and go to that address to see it. Nobody else can see it yet. It's your private preview. Once you deploy, it gets a real public URL.",
    accent: "success" as const,
  },
  {
    term: "Environment Variable",
    icon: Lock,
    oneLiner: "A secret value stored safely outside your code.",
    analogy:
      "Your API keys need to be kept secret. An environment variable is like a locked drawer in your desk: the key is inside, your app knows where to find it, but nobody looking at your code can see it. Your AI will create a file called .env.local to store these. Never share this file.",
    accent: "volt" as const,
  },
  {
    term: "npm / pnpm",
    icon: Package,
    oneLiner: "An app store for code libraries.",
    analogy:
      "When your app needs a feature (like a date picker or a chart), instead of building it from scratch, you install a pre-made library. npm and pnpm are the stores where these libraries live. Your AI runs commands like \"npm install\" to add them. You don't need to browse the store yourself.",
    accent: "spark" as const,
  },
  {
    term: "Branch",
    icon: GitBranch,
    oneLiner: "A separate copy of your project where you can experiment safely.",
    analogy:
      "Imagine you're writing a report and want to try a completely different introduction without losing the original. A branch is a parallel copy. You make changes on the branch, and if you like them, you merge them back. If not, you delete the branch and the original is untouched.",
    accent: "primary" as const,
  },
  {
    term: "TypeScript / JavaScript",
    icon: FileCode,
    oneLiner: "The programming language your app is written in.",
    analogy:
      "TypeScript is the language the AI writes your app in. You don't need to learn it. Think of it like the language a contractor uses to write building plans: you describe what you want the house to look like, and they translate it into technical blueprints. The AI is your contractor.",
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
          Every technical term you&apos;ll encounter while building with AI,
          explained using analogies from everyday life. No code. No jargon in
          the explanations.
        </p>
        <LastUpdated date="2026-04-06" />
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

      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="font-body text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">
            Don&apos;t memorize these.
          </span>{" "}
          Bookmark this page and come back when you hit a term you don&apos;t
          recognize. The AI will also explain things if you ask it: just type{" "}
          <code className="font-code text-xs text-volt">/explain</code>{" "}
          followed by whatever confuses you.
        </p>
      </div>
    </div>
  );
}

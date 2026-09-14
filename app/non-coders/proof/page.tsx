import type { Metadata } from "next";
import {
  Trophy,
  Stethoscope,
  Scale,
  Lightbulb,
  Gamepad2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LastUpdated } from "@/components/last-updated";
import { markdownAlternate, SITE_URL } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { CopyForAi } from "@/components/copy-for-ai";

export const metadata: Metadata = {
  title: "The Proof",
  description:
    "Real professionals with zero coding backgrounds who beat thousands of developers at major hackathons.",
  alternates: {
    canonical: `${SITE_URL}/non-coders/proof`,
    types: markdownAlternate("/non-coders/proof"),
  },
};

type Winner = {
  name: string;
  profession: string;
  icon: LucideIcon;
  placement: string;
  hackathon: string;
  project?: string;
  projectDesc: string;
  buildTime?: string;
  quote: string;
  source: string;
  accent: "volt" | "spark" | "primary" | "success";
  url: string;
};

const ANTHROPIC_WINNERS: Winner[] = [
  {
    name: "Mike Brown",
    profession: "Personal Injury Lawyer",
    icon: Scale,
    placement: "1st Place",
    hackathon: "Anthropic Hackathon",
    project: "CrossBeam",
    projectDesc:
      "Reads permit plans for California ADUs (small second homes) and returns an action plan",
    buildTime: "Built in 6 days",
    quote:
      "It's crazy to me that I ended up winning this contest, and I didn't write a single line of code. I didn't even read a line of code.",
    source:
      "Anthropic, “Meet the winners of our Built with Opus 4.6 Claude Code hackathon,” 2026",
    accent: "volt" as const,
    url: "https://claude.com/blog/meet-the-winners-of-our-built-with-opus-4-6-claude-code-hackathon",
  },
  {
    name: "Dr. Michal Nedoszytko",
    profession: "Interventional Cardiologist",
    icon: Stethoscope,
    placement: "3rd Place",
    hackathon: "Anthropic Hackathon",
    project: "PostVisit.AI",
    projectDesc: "Post-visit patient care platform",
    buildTime: "Built in 7 days",
    quote:
      "Currently, you don't have to know programming to create solutions, or at least prototypes of solutions, for something that you can use personally.",
    source: "The Convergence, ReachMD, 2026",
    accent: "spark" as const,
    url: "https://reachmd.com/programs/the-convergence/Michal-Nedoszytko-PostVisit-ai/54781/",
  },
];

const OTHER_WINNERS: Winner[] = [
  {
    name: "Nina Kolari",
    profession: "Entrepreneur, 51",
    icon: Lightbulb,
    // [CONFIRM: "1st Place" at the Cursor hackathon. Nothing on this page sources the placement. lib/blog/posts/non-coders-winning-hackathons.ts says she "won against 27 other teams", citing her write-up.]
    placement: "1st Place",
    hackathon: "Cursor Hackathon, Chiang Mai",
    project: "Aphasio",
    projectDesc: "iPhone speech practice app for stroke patients",
    buildTime: "Built in 3 hours",
    quote:
      "Product sense beats coding skill. […] I built something simple that solved a specific, painful problem. The judges responded to clarity.",
    source: "ninakolari.com, December 9, 2025",
    accent: "primary" as const,
    url: "https://ninakolari.com/i-joined-a-3-hour-hackathon-and-build-an-iphone-app-here-are-my-biggest-takeaways/",
  },
  {
    name: "Rene Turcios",
    profession: "Former Yu-Gi-Oh! Pro",
    icon: Gamepad2,
    // [CONFIRM: "200+ Hackathons". The hub's old Sources list titled the same SF Standard piece "200+ Hackathon Wins". Which is right?]
    placement: "200+ Hackathons",
    hackathon: "Competing since 2023",
    // [CONFIRM: this line comes from lib/blog/posts/non-coders-winning-hackathons.ts, which cites the SF Standard piece. It replaced "Zero lines of code written, ever", an absolute. Does the piece support either?]
    projectDesc:
      "A self-described vibe coder who doesn't know how to code.",
    quote: "Anyone can build anything they want.",
    source: "The San Francisco Standard, July 5, 2025",
    accent: "success" as const,
    url: "https://sfstandard.com/2025/07/05/rene-turcios-hackathon-labubu-vibe-coding-chatgpt/",
  },
];

const accentStyles = {
  volt: { border: "border-volt/20", bg: "bg-volt/10", text: "text-volt" },
  spark: { border: "border-spark/20", bg: "bg-spark/10", text: "text-spark" },
  primary: { border: "border-primary/20", bg: "bg-primary/10", text: "text-primary" },
  success: { border: "border-success/20", bg: "bg-success/10", text: "text-success" },
};

function WinnerCard({ winner }: { winner: Winner }) {
  const a = accentStyles[winner.accent];
  return (
    <a
      href={winner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className={`glow-hover h-full ${a.border}`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 items-center justify-center rounded-lg ${a.bg}`}
            >
              <winner.icon className={`size-5 ${a.text}`} />
            </div>
            <Badge
              className={`${a.border} ${a.bg} ${a.text} font-code text-xs`}
            >
              {winner.placement}
            </Badge>
          </div>
          <CardTitle className={`font-display text-xl ${a.text}`}>
            {winner.name}
          </CardTitle>
          <CardDescription className="font-body">
            {winner.profession} &middot; {winner.hackathon}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            {winner.project && (
              <p className="font-display text-sm font-semibold">
                {winner.project}
              </p>
            )}
            <p className="font-body text-sm text-foreground/60">
              {winner.projectDesc}
            </p>
            {winner.buildTime && (
              <Badge
                variant="outline"
                className={`${a.border} ${a.text} font-code text-xs`}
              >
                {winner.buildTime}
              </Badge>
            )}
          </div>
          <blockquote
            className={`border-l-2 ${a.border} pl-4 font-body text-sm italic text-foreground/80`}
          >
            &ldquo;{winner.quote}&rdquo;
          </blockquote>
          <p className="font-code text-xs text-foreground/50">
            {winner.name}, {winner.profession}. {winner.source}
          </p>
          <span className={`font-code text-xs ${a.text} opacity-60`}>
            Read the full story →
          </span>
        </CardContent>
      </Card>
    </a>
  );
}

export default function ProofPage() {
  return (
    <div className="space-y-12">
      <BreadcrumbJsonLd path="/non-coders/proof" />
      <header className="stagger-children space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
            THE PROOF
          </Badge>
          <CopyForAi path="/non-coders/proof" title="The Proof" />
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Non-Coders Are Winning
        </h1>
        {/* [CONFIRM: the metadata description (off-limits here) still says "zero coding backgrounds who beat thousands of developers". The Anthropic event accepted 500, and Nedoszytko had 20 years of building software.] */}
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          Four people from outside software who built hackathon projects with
          AI. The cardiologist is a partial exception: he&apos;d spent 20 years
          building healthcare software alongside his practice, according to
          Anthropic.
        </p>
        <LastUpdated date="2026-09-14" />
      </header>

      <Separator className="bg-primary/20" />

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Anthropic&apos;s Built with Opus 4.6 Hackathon
        </h2>
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="font-body text-sm text-muted-foreground">
            13,000 people applied for the February 2026 event and 500 got in.
            One of the five winners was a professional developer.
          </p>
          {/* [NEEDS SOURCE: the 13,000 applicant count is credited to Cerebral Valley, but no Cerebral Valley link exists anywhere on the site. Add the URL or cut the number.] */}
          <p className="mt-2 font-code text-xs text-foreground/50">
            Applicant count via Cerebral Valley, the hackathon&apos;s co-host;
            selection and winner details from Anthropic,{" "}
            <a
              href="https://claude.com/blog/meet-the-winners-of-our-built-with-opus-4-6-claude-code-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/30 hover:decoration-foreground"
            >
              &ldquo;Meet the winners of our Built with Opus 4.6 Claude Code
              hackathon&rdquo;
            </a>
            , 2026
          </p>
        </div>
        <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
          {ANTHROPIC_WINNERS.map((winner) => (
            <WinnerCard key={winner.name} winner={winner} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Other Hackathons
        </h2>
        <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
          {OTHER_WINNERS.map((winner) => (
            <WinnerCard key={winner.name} winner={winner} />
          ))}
        </div>
      </section>

      <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
            <Trophy className="size-5 text-volt" />
          </div>
          <div className="space-y-1">
            <p className="font-display font-semibold">
              Where Their Ideas Came From
            </p>
            {/* [CONFIRM: "the lawyer for a friend's business." None of the quotes or sources on this page say this.] */}
            {/* [NEEDS SPECIFIC: every story here is third-party. Have you seen a non-coder win, or judged one at LA Hacks 2026? One line from you would fit after this paragraph.] */}
            <p className="font-body text-sm text-foreground/80">
              Three of the four built for a problem they knew firsthand: the
              cardiologist for his patients, the lawyer for a friend&apos;s
              business, and the entrepreneur for her mother, who had a stroke
              and developed aphasia. If you&apos;re coming from another field,
              start from a problem like that.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

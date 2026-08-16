import type { Metadata } from "next";
import {
  Trophy,
  Stethoscope,
  Scale,
  Lightbulb,
  Gamepad2,
} from "lucide-react";
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

export const metadata: Metadata = {
  title: "The Proof",
  description:
    "Real professionals with zero coding backgrounds who beat thousands of developers at major hackathons.",
};

const WINNERS = [
  {
    name: "Mike Brown",
    profession: "Personal Injury Lawyer",
    icon: Scale,
    placement: "1st Place",
    hackathon: "Anthropic Hackathon",
    project: "CrossBeam",
    projectDesc: "ADU permit compliance assistant",
    buildTime: "6 days",
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
    buildTime: "7 days",
    quote:
      "Currently, you don't have to know programming to create solutions, or at least prototypes of solutions, for something that you can use personally.",
    source: "The Convergence, ReachMD, 2026",
    accent: "spark" as const,
    url: "https://reachmd.com/programs/the-convergence/Michal-Nedoszytko-PostVisit-ai/54781/",
  },
  {
    name: "Nina Kolari",
    profession: "Entrepreneur, 51",
    icon: Lightbulb,
    placement: "1st Place",
    hackathon: "Cursor Hackathon",
    project: "Aphasio",
    projectDesc: "Speech practice app for stroke patients",
    buildTime: "3 hours",
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
    placement: "200+ Hackathons",
    hackathon: "Various Hackathons",
    project: "Multiple Projects",
    projectDesc: "Zero lines of code written, ever",
    buildTime: "Ongoing",
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

export default function ProofPage() {
  return (
    <div className="space-y-12">
      <header className="stagger-children space-y-4">
        <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
          THE PROOF
        </Badge>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Non-Coders Are Winning
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          These are real professionals with zero coding backgrounds who beat
          thousands of developers at major hackathons.
        </p>
        <LastUpdated date="2026-04-06" />
      </header>

      <Separator className="bg-primary/20" />

      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="font-body text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">
            Anthropic&apos;s &ldquo;Built with Opus 4.6&rdquo; Hackathon
            (Feb 2026):
          </span>{" "}
          13,000 applicants. 500 accepted. Only 1 of the 5 winners was a
          professional developer.
        </p>
        <p className="mt-2 font-code text-xs text-foreground/50">
          Source: Anthropic,{" "}
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
        {WINNERS.map((winner) => {
          const a = accentStyles[winner.accent];
          return (
            <a
              key={winner.name}
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
                    <p className="font-display text-sm font-semibold">
                      {winner.project}
                    </p>
                    <p className="font-body text-sm text-foreground/60">
                      {winner.projectDesc}
                    </p>
                    <Badge
                      variant="outline"
                      className={`${a.border} ${a.text} font-code text-xs`}
                    >
                      Built in {winner.buildTime}
                    </Badge>
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
        })}
      </div>

      <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
            <Trophy className="size-5 text-volt" />
          </div>
          <div className="space-y-1">
            <p className="font-display font-semibold">The Pattern Is Clear</p>
            <p className="font-body text-sm text-foreground/80">
              Every winner solved a problem they knew firsthand. The cardiologist
              built for his patients. The lawyer built for a friend&apos;s
              business. The entrepreneur built for her mother, who had a stroke
              and developed aphasia. Your years of lived and professional
              experience are worth more than any CS degree in this context.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

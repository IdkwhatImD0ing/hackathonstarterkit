import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, ExternalLink, Github, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  description:
    "The ultimate hackathon playbook with guides, templates, and strategies from 36+ hackathon wins.",
  openGraph: {
    title: "Hackathon Starter Kit",
    description:
      "The ultimate hackathon playbook with guides, templates, and strategies from 36+ hackathon wins.",
  },
  twitter: {
    title: "Hackathon Starter Kit",
    description:
      "The ultimate hackathon playbook with guides, templates, and strategies from 36+ hackathon wins.",
  },
};

const NOTABLE_WINS = [
  {
    hackathon: "HackUTD 2024",
    prize: "1st Place Grand Prize",
    project: "TalkTuahBank",
    accent: "volt" as const,
    url: "https://devpost.com/software/talktuahbank",
  },
  {
    hackathon: "UC Berkeley AI",
    prize: "Grand Prize ($60K+)",
    project: "Dispatch AI",
    accent: "spark" as const,
    url: "https://devpost.com/software/dispatch-ai",
  },
  {
    hackathon: "LA Hacks 2024",
    prize: "1st Place Google",
    project: "AdaptED",
    accent: "primary" as const,
    url: "https://devpost.com/software/teachme-3p7bw1",
  },
  {
    hackathon: "Google DSC",
    prize: "Top 10 Global",
    project: "SlugLoop",
    accent: "volt" as const,
    url: "https://www.universityofcalifornia.edu/news/uc-santa-cruz-students-behind-bus-tracking-app-selected-only-us-team-google-solution",
  },
  {
    hackathon: "VTHacks 12",
    prize: "Best Startup Award",
    project: "Linguify",
    accent: "spark" as const,
    url: "https://devpost.com/software/linguify-katunw",
  },
];

const CREDENTIALS = [
  {
    text: "1st place at HackUTD, UC Berkeley AI Hackathon, LA Hacks",
    highlight: "1,000+ person events",
    color: "text-volt",
  },
  {
    text: "Google Developer Student Challenge",
    highlight: "Top 10 Global (only US team in 3 years)",
    color: "text-spark",
  },
  {
    text: "Co-founder of WeCracked",
    highlight: "4,000+ member hackathon community",
    color: "text-volt",
  },
  {
    text: "Applied AI Engineer at Scale AI",
    highlight: "Enterprise & Post-Training Research",
    color: "text-spark",
  },
  {
    text: "Co-founder of Dispatch AI",
    highlight: "$1M valuation, Berkeley SkyDeck funded",
    color: "text-volt",
  },
  {
    text: "USC MS in Computer Science (AI)",
    highlight: "UCSC undergrad",
    color: "text-spark",
  },
];

const LINKS = [
  {
    label: "Portfolio",
    href: "https://v2.art3m1s.me/",
    icon: ExternalLink,
  },
  {
    label: "GitHub",
    href: "https://github.com/IdkwhatImD0ing",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bill-zhang1/",
    icon: Linkedin,
  },
  {
    label: "Devpost",
    href: "https://devpost.com/IdkwhatImD0ing",
    icon: ExternalLink,
  },
];

const accentMap = {
  volt: {
    border: "border-volt/20",
    bg: "bg-volt/10",
    text: "text-volt",
    dot: "bg-volt",
  },
  spark: {
    border: "border-spark/20",
    bg: "bg-spark/10",
    text: "text-spark",
    dot: "bg-spark",
  },
  primary: {
    border: "border-primary/20",
    bg: "bg-primary/10",
    text: "text-primary",
    dot: "bg-primary",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Hackathon <span className="text-primary">Starter Kit</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Guides, templates, and strategies from 36+ hackathon wins.
          </p>
          <div>
            <Link
              href="/playbook"
              className="inline-block rounded-lg bg-volt px-6 py-3 font-display text-sm font-semibold text-volt-foreground glow-hover transition-all hover:bg-volt/90"
            >
              Open Playbook →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT THE AUTHOR — Terminal whoami card
          ============================================================ */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="glass glow rounded-2xl overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 border-b border-primary/10 px-5 py-3">
              <span className="size-3 rounded-full bg-destructive/70" />
              <span className="size-3 rounded-full bg-spark/70" />
              <span className="size-3 rounded-full bg-success/70" />
              <span className="ml-3 font-code text-xs text-muted-foreground">
                bill@hackathons ~ % whoami
              </span>
            </div>

            <div className="space-y-8 p-6 md:p-8">
              {/* Author intro line */}
              <div className="space-y-1">
                <p className="font-code text-sm text-muted-foreground">
                  <span className="text-volt">$</span> cat ./about.txt
                </p>
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  Bill Zhang{" "}
                  <a
                    href="https://github.com/IdkwhatImD0ing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-code text-base font-normal text-muted-foreground transition-colors hover:text-volt"
                  >
                    @IdkwhatImD0ing
                  </a>
                </h2>
                <p className="font-body text-muted-foreground">
                  One of the most decorated hackathon competitors in the US
                  college scene.
                </p>
              </div>

              {/* ── Stats readout ── */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-volt/15 bg-volt/5 p-4 text-center">
                  <p className="font-display text-3xl font-bold text-volt md:text-4xl">
                    36+
                  </p>
                  <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
                    Wins
                  </p>
                </div>
                <div className="rounded-xl border border-spark/15 bg-spark/5 p-4 text-center">
                  <p className="animate-shimmer font-display text-3xl font-bold md:text-4xl">
                    $100K+
                  </p>
                  <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
                    Prizes
                  </p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-primary/5 p-4 text-center">
                  <p className="font-display text-3xl font-bold text-primary md:text-4xl">
                    50+
                  </p>
                  <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
                    Hackathons
                  </p>
                </div>
              </div>

              {/* ── Credentials ── */}
              <div className="space-y-3">
                <p className="font-code text-sm text-muted-foreground">
                  <span className="text-volt">$</span> ls ./credentials
                </p>
                <div className="stagger-children space-y-2">
                  {CREDENTIALS.map((cred) => (
                    <div
                      key={cred.text}
                      className="flex items-start gap-2.5 font-body text-sm"
                    >
                      <span
                        className={`mt-0.5 shrink-0 font-code font-bold ${cred.color}`}
                      >
                        &gt;
                      </span>
                      <p className="text-foreground/85">
                        {cred.text}{" "}
                        <span className={`font-semibold ${cred.color}`}>
                          — {cred.highlight}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Notable wins shelf ── */}
              <div className="space-y-3">
                <p className="font-code text-sm text-muted-foreground">
                  <span className="text-spark">$</span> ls ./trophy-case
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {NOTABLE_WINS.map((win) => {
                    const a = accentMap[win.accent];
                    return (
                      <a
                        key={win.hackathon}
                        href={win.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`glow-hover rounded-xl border ${a.border} ${a.bg} p-4 space-y-2 block`}
                      >
                        <div className="flex items-center gap-2">
                          <Trophy className={`size-4 ${a.text}`} />
                          <p className={`font-display text-sm font-bold ${a.text}`}>
                            {win.hackathon}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${a.border} ${a.text} font-code text-[10px]`}
                        >
                          {win.prize}
                        </Badge>
                        <p className="font-code text-xs text-muted-foreground">
                          {win.project}
                        </p>
                      </a>
                    );
                  })}
                  <a
                    href="https://devpost.com/IdkwhatImD0ing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glow-hover flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/25 bg-primary/5 p-4 transition-colors hover:border-volt/40 hover:bg-volt/5"
                  >
                    <span className="font-display text-2xl font-bold text-primary transition-colors group-hover:text-volt">
                      +31
                    </span>
                    <span className="font-code text-xs text-muted-foreground transition-colors group-hover:text-volt">
                      more wins
                    </span>
                    <span className="flex items-center gap-1 font-code text-[10px] text-muted-foreground/60 transition-colors group-hover:text-volt/80">
                      View on Devpost
                      <ExternalLink className="size-2.5" />
                    </span>
                  </a>
                </div>
              </div>

              {/* ── Links ── */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary/10 pt-5">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
                  >
                    <link.icon className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

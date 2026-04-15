import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, ExternalLink, Github, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://hackathonstarterkit.com";

export const metadata: Metadata = {
  title:
    "Hackathon Starter Kit — How to Win Hackathons | Complete Guide from 36+ Wins",
  description:
    "Learn how to win hackathons with the ultimate playbook from 36+ victories and $100K+ in prizes. Battle-tested guides on team formation, ideation, the best tech stack, pitching, and submission strategies.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Hackathon Starter Kit — How to Win Hackathons",
    description:
      "The ultimate hackathon playbook with battle-tested guides, templates, and strategies from 36+ wins and $100K+ in prizes.",
    url: BASE_URL,
  },
  twitter: {
    title: "Hackathon Starter Kit — How to Win Hackathons",
    description:
      "Battle-tested strategies from 36+ hackathon victories. Learn team formation, ideation, best tech stack, pitching, and more.",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you win a hackathon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Winning a hackathon requires a strategic approach across 7 phases: (1) Build a balanced team with complementary skills, (2) Ideate around judge criteria and sponsor challenges, (3) Validate your idea against time constraints, (4) Execute an MVP-first strategy with clear task delegation, (5) Craft a pitch that hooks judges in 30 seconds, (6) Submit polished deliverables with a great README and demo video, (7) Follow up post-hackathon to maximize career impact. This playbook distills strategies from 36+ hackathon wins and $100K+ in prizes.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best tech stack for hackathons?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best hackathon tech stack prioritizes speed of development over perfection. Top choices include: Next.js or Vite + React for frontend, Python (Flask/FastAPI) or Node.js for backend, Firebase or Supabase for instant database and auth, Vercel or Railway for one-click deployment, and AI APIs like OpenAI, Anthropic Claude, or Google Gemini for quick AI features. The key is using tools your team already knows rather than learning something new during the hackathon.",
      },
    },
    {
      "@type": "Question",
      name: "How do you prepare for a hackathon as a beginner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beginner hackathon preparation includes: (1) Form or join a team with diverse skills early, (2) Set up your development environment beforehand (IDE, Git, deployment tools), (3) Research past winning projects on Devpost for inspiration, (4) Prepare a go-bag of reusable templates and boilerplates, (5) Study the sponsor challenges and judging criteria before the event, (6) Practice your pitching skills, and (7) Focus on a working demo over a feature-complete product.",
      },
    },
    {
      "@type": "Question",
      name: "Can non-coders win hackathons?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, non-coders are increasingly winning hackathons. At the 2026 Anthropic hackathon, a personal injury lawyer won 1st place and a cardiologist placed 3rd, both using AI coding tools like Cursor and Claude Code. Domain expertise (in law, medicine, finance, etc.) combined with AI-assisted development can produce more innovative solutions than pure technical skill alone.",
      },
    },
    {
      "@type": "Question",
      name: "How do you pitch at a hackathon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An effective hackathon pitch follows this structure: (1) Open with the problem and hook judges in the first 30 seconds, (2) Show your solution with a live demo, not slides, (3) Highlight the technical innovation and what makes it unique, (4) Show traction or validation if possible, (5) End with impact and next steps. Keep it under 3 minutes. Practice beforehand and prepare for common judge questions about scalability, business model, and technical challenges.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Win a Hackathon: 7-Phase System",
  description:
    "A battle-tested 7-phase system for winning hackathons, distilled from 36+ victories and $100K+ in prizes.",
  totalTime: "PT24H",
  step: [
    {
      "@type": "HowToStep",
      name: "Team Formation",
      text: "Find the right people, define roles, and create a winning team dynamic with complementary skills.",
      url: `${BASE_URL}/playbook/team-formation`,
    },
    {
      "@type": "HowToStep",
      name: "Ideation",
      text: "Brainstorm, evaluate, and select ideas that judges love and you can actually build in the time available.",
      url: `${BASE_URL}/playbook/ideation`,
    },
    {
      "@type": "HowToStep",
      name: "Validation",
      text: "Validate your idea quickly against real constraints, available APIs, and judging criteria.",
      url: `${BASE_URL}/playbook/validation`,
    },
    {
      "@type": "HowToStep",
      name: "Execution",
      text: "Manage time effectively, select the right tech stack, build an MVP, and coordinate your team.",
      url: `${BASE_URL}/playbook/execution`,
    },
    {
      "@type": "HowToStep",
      name: "Pitching",
      text: "Craft a pitch that wins judges over in the first 30 seconds with a compelling demo.",
      url: `${BASE_URL}/playbook/pitching`,
    },
    {
      "@type": "HowToStep",
      name: "Submission",
      text: "Write READMEs, record demo videos, and submit deliverables that make judges remember you.",
      url: `${BASE_URL}/playbook/submission`,
    },
    {
      "@type": "HowToStep",
      name: "Post-Hackathon",
      text: "Share your work, follow up with contacts, and turn weekend projects into career-changing portfolio pieces.",
      url: `${BASE_URL}/playbook/post-hackathon`,
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
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
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/playbook"
              className="inline-block rounded-lg bg-volt px-6 py-3 font-display text-sm font-semibold text-volt-foreground glow-hover transition-all hover:bg-volt/90"
            >
              Open Playbook →
            </Link>
            <Link
              href="/non-coders"
              className="inline-block rounded-lg border border-spark/30 bg-spark/10 px-6 py-3 font-display text-sm font-semibold text-spark glow-hover transition-all hover:bg-spark/20"
            >
              For Non-Coders →
            </Link>
            <Link
              href="/blog"
              className="inline-block rounded-lg border border-primary/30 bg-primary/10 px-6 py-3 font-display text-sm font-semibold text-primary glow-hover transition-all hover:bg-primary/20"
            >
              Read the Blog →
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

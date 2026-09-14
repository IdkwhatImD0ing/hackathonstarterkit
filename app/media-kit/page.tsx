import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Download,
  Palette,
  Trophy,
  Users,
  BookOpen,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { shareMetadata } from "@/lib/metadata";

const CONTACT_EMAIL = "billzhangsc@gmail.com";
const HEADSHOT_URL = "/brand/bill-zhang-headshot.jpg";

export const metadata: Metadata = {
  // The layout template appends " | The Hackathon Playbook".
  title: "Media Kit — Press, Partnerships & Brand Assets",
  description:
    "Media kit for The Hackathon Playbook: founder bio and headshot, stats (36+ wins, $100K+ in prizes), logos, brand colors, fonts, and a press contact.",
  alternates: {
    canonical: `${SITE_URL}/media-kit`,
  },
  ...shareMetadata({
    path: "/media-kit",
    title: "Media Kit — The Hackathon Playbook",
    description:
      "Press, partnerships, and brand assets for The Hackathon Playbook. 36+ hackathon wins, $100K+ in prizes.",
  }),
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bill Zhang",
  url: "https://v2.art3m1s.me/",
  image: `${SITE_URL}${HEADSHOT_URL}`,
  jobTitle: "Software Engineer 2",
  worksFor: {
    "@type": "Organization",
    name: "Pinterest",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Southern California" },
    { "@type": "CollegeOrUniversity", name: "UC Santa Cruz" },
  ],
  sameAs: [
    "https://github.com/IdkwhatImD0ing",
    "https://www.linkedin.com/in/bill-zhang1/",
    "https://devpost.com/IdkwhatImD0ing",
  ],
  description:
    "One of the most decorated hackathon competitors in the US college scene, with 36+ wins and $100K+ in prizes.",
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `${SITE_NAME} Media Kit`,
  url: `${SITE_URL}/media-kit`,
  description: `Press, partnerships, and brand assets for ${SITE_NAME}.`,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    founder: { "@type": "Person", name: "Bill Zhang" },
  },
};

const STATS = [
  { value: "36+", label: "Hackathon Wins", accent: "volt" as const },
  { value: "$100K+", label: "In Prizes", accent: "spark" as const },
  { value: "50+", label: "Hackathons", accent: "primary" as const },
  { value: "4,000+", label: "WeCracked Members", accent: "volt" as const },
];

const accentMap = {
  volt: {
    border: "border-volt/20",
    bg: "bg-volt/5",
    text: "text-volt",
  },
  spark: {
    border: "border-spark/20",
    bg: "bg-spark/5",
    text: "text-spark",
  },
  primary: {
    border: "border-primary/20",
    bg: "bg-primary/5",
    text: "text-primary",
  },
};

const CREDENTIALS = [
  {
    text: "1st place at HackUTD 2024, UC Berkeley AI Hackathon 2024, LA Hacks 2024",
    highlight: "1,000+ person events, plus 33 other hackathon wins",
    color: "text-volt",
  },
  {
    text: "Google Developer Student Challenge",
    highlight: "Top 10 Global (only US team in 3 years)",
    color: "text-spark",
  },
  {
    text: "Hackathon judge at LA Hacks 2026",
    highlight: "returning for the LA Hacks AI Hackathon",
    color: "text-volt",
  },
  {
    text: "Co-founder of WeCracked",
    highlight: "4,000+ member hackathon community",
    color: "text-spark",
  },
  {
    text: "Software Engineer 2 at Pinterest",
    highlight: "ex-Applied AI Engineer at Scale AI",
    color: "text-volt",
  },
  {
    text: "Co-founder of Dispatch AI",
    highlight: "$1M valuation, Berkeley SkyDeck funded",
    color: "text-spark",
  },
  {
    text: "USC MS in Computer Science (AI)",
    highlight: "UCSC undergrad",
    color: "text-volt",
  },
];

// Hex values are the sRGB conversions of the dark-theme tokens in
// app/globals.css; keep them in sync if those tokens change.
const BRAND_COLORS = [
  {
    name: "Volt",
    token: "volt",
    role: "Primary accent",
    swatchClass: "bg-volt",
    hex: "#00D4D5",
    value: "oklch(0.78 0.15 195)",
  },
  {
    name: "Spark",
    token: "spark",
    role: "Secondary accent",
    swatchClass: "bg-spark",
    hex: "#E6AD00",
    value: "oklch(0.78 0.16 85)",
  },
  {
    name: "Primary",
    token: "primary",
    role: "Core brand",
    swatchClass: "bg-primary",
    hex: "#6A45F0",
    value: "oklch(0.54 0.24 285)",
  },
  {
    name: "Background",
    token: "background",
    role: "Site background",
    swatchClass: "bg-background border border-primary/20",
    hex: "#060613",
    value: "oklch(0.13 0.03 285)",
  },
];

const FONTS = [
  {
    label: "Display",
    name: "JetBrains Mono",
    className: "font-display",
    usage: "Headlines, H1/H2",
  },
  {
    label: "Body",
    name: "Outfit",
    className: "font-body",
    usage: "Paragraphs, long-form",
  },
  {
    label: "Code",
    name: "Fira Code",
    className: "font-code",
    usage: "Terminal UI, stats labels",
  },
];

const BRAND_FILES = [
  { label: "Logo", detail: "PNG, 800×800", href: "/brand/logo.png" },
  { label: "Logo", detail: "SVG, scalable", href: "/brand/logo.svg" },
  {
    label: "Share card",
    detail: "PNG, 1200×630",
    href: "/brand/share-card.png",
  },
  { label: "Founder headshot", detail: "JPG, 2160×2880", href: HEADSHOT_URL },
];

const SECTIONS = [
  {
    href: "/playbook",
    title: "The Playbook",
    description:
      "7-phase system for winning hackathons: team formation, ideation, validation, execution, pitching, submission, and post-hackathon.",
    icon: BookOpen,
    accent: "volt" as const,
  },
  {
    href: "/non-coders",
    title: "For Non-Coders",
    description:
      "How domain experts (lawyers, doctors, founders) win hackathons with AI coding tools, with no programming experience.",
    icon: Users,
    accent: "spark" as const,
  },
  {
    href: "/blog",
    title: "The Blog",
    description:
      "Deep-dive articles on hackathon strategy, tech stacks, pitching, and case studies from real wins.",
    icon: Zap,
    accent: "primary" as const,
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

const BOILERPLATE = `The Hackathon Playbook is the most comprehensive guide to winning hackathons, built by Bill Zhang, a competitor with 36+ hackathon wins and $100K+ in prizes. The site combines a 7-phase playbook, a path for non-coders using AI tools, and a blog with battle-tested strategies from real victories at HackUTD, UC Berkeley AI, LA Hacks, and Google DSC.`;

export default function MediaKitPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-12">
      <JsonLd data={aboutPageJsonLd} />
      <JsonLd data={personJsonLd} />

      <nav className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
        >
          <Home className="size-3" />
          Home
        </Link>
        <span className="font-code text-xs text-muted-foreground/40">/</span>
        <span className="font-code text-xs text-foreground">Media Kit</span>
      </nav>

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-volt/20 bg-volt/5 px-3 py-1 font-code text-[10px] uppercase tracking-widest text-volt">
          <Trophy className="size-3" />
          Press & Partnerships
        </div>
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Media <span className="text-volt">Kit</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          Everything you need to feature, partner with, or affiliate with The
          Hackathon Playbook. Stats, a founder headshot, brand assets, and a
          direct line to the founder.
        </p>
      </header>

      {/* ============================================================
          AT A GLANCE — stats
          ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-code text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-volt">$</span> cat ./at-a-glance.txt
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((stat) => {
            const a = accentMap[stat.accent];
            return (
              <div
                key={stat.label}
                className={`rounded-xl border ${a.border} ${a.bg} p-4 text-center`}
              >
                <p
                  className={`font-display text-3xl font-bold md:text-4xl ${a.text}`}
                >
                  {stat.value}
                </p>
                <p className="mt-1 font-code text-[10px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          ABOUT
          ============================================================ */}
      <section className="glass glow rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 border-b border-primary/10 px-5 py-3">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-spark/70" />
          <span className="size-3 rounded-full bg-success/70" />
          <span className="ml-3 font-code text-xs text-muted-foreground">
            bill@hackathons ~ % cat ./media-kit.txt
          </span>
        </div>
        <div className="space-y-10 p-6 md:p-10">
          {/* About */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold">About</h2>
            <p className="font-body text-foreground/85 leading-relaxed">
              The Hackathon Playbook (
              <span className="font-code text-volt">
                thehackathonplaybook.dev
              </span>
              ) is an educational platform built by Bill Zhang that distills 36+
              hackathon wins and $100K+ in prizes into a repeatable playbook.
              The site is aimed at student hackers, non-coder founders using AI
              tools, and hackathon sponsors looking to understand what wins.
            </p>
          </div>

          {/* Founder */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold">
              Founder: Bill Zhang
            </h2>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="w-40 shrink-0 space-y-2 sm:w-48">
                <Image
                  src="/brand/bill-zhang-headshot-720.jpg"
                  alt="Bill Zhang, founder of The Hackathon Playbook, in Joshua Tree National Park"
                  width={720}
                  height={960}
                  sizes="(min-width: 640px) 192px, 160px"
                  className="rounded-xl border border-primary/15"
                />
                <a
                  href={HEADSHOT_URL}
                  download
                  className="inline-flex items-center gap-1.5 font-code text-xs text-volt hover:underline"
                >
                  <Download className="size-3.5" />
                  Full-size photo
                </a>
              </div>
              <p className="font-body text-foreground/85 leading-relaxed">
                Bill Zhang (
                <a
                  href="https://github.com/IdkwhatImD0ing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-code text-volt hover:underline"
                >
                  @IdkwhatImD0ing
                </a>
                ) is one of the most decorated hackathon competitors in the US
                college scene. He is a Software Engineer 2 at Pinterest,
                previously an Applied AI Engineer at Scale AI (Enterprise &
                Post-Training Research), co-founder of WeCracked (a 4,000+ member
                hackathon community), and co-founder of Dispatch AI (Berkeley
                SkyDeck funded, $1M valuation).
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-code text-xs uppercase tracking-widest text-muted-foreground">
                Credentials
              </p>
              <div className="space-y-2">
                {CREDENTIALS.map((c) => (
                  <div
                    key={c.text}
                    className="flex items-start gap-2.5 font-body text-sm"
                  >
                    <span
                      className={`mt-0.5 shrink-0 font-code font-bold ${c.color}`}
                    >
                      &gt;
                    </span>
                    <p className="text-foreground/85">
                      {c.text}{" "}
                      <span className={`font-semibold ${c.color}`}>
                        — {c.highlight}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Boilerplate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-bold">
                Copy-Paste Boilerplate
              </h2>
              <Badge
                variant="outline"
                className="border-spark/30 text-spark font-code text-[10px]"
              >
                ~50 words
              </Badge>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Ready-to-use description for articles, directories, and partner
              pages.
            </p>
            <blockquote className="rounded-xl border border-primary/15 bg-primary/5 p-5 font-body text-sm italic leading-relaxed text-foreground/90">
              {BOILERPLATE}
            </blockquote>
          </div>

          {/* Audience */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold">Audience</h2>
            <ul className="space-y-1.5 font-body text-sm text-foreground/85">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                <span>
                  <strong>Student hackers</strong> at college and university
                  hackathons looking for a competitive edge.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                <span>
                  <strong>Non-coder founders and domain experts</strong> (lawyers,
                  doctors, designers) shipping real projects with AI tools.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <strong>Hackathon sponsors and organizers</strong> researching
                  what resonates with top competitors.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                <span>
                  <strong>Early-career engineers and AI builders</strong> using
                  hackathons as a career-launch strategy.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTENT CATEGORIES
          ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-code text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-spark">$</span> ls ./content
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SECTIONS.map((s) => {
            const a = accentMap[s.accent];
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`glow-hover block rounded-xl border ${a.border} ${a.bg} p-5 space-y-3`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`size-4 ${a.text}`} />
                  <p className={`font-display text-sm font-bold ${a.text}`}>
                    {s.title}
                  </p>
                </div>
                <p className="font-body text-sm text-foreground/80">
                  {s.description}
                </p>
                <p className="font-code text-[10px] text-muted-foreground">
                  {SITE_URL}
                  {s.href}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          BRAND ASSETS
          ============================================================ */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 font-code text-xs uppercase tracking-widest text-muted-foreground">
          <Palette className="size-3.5 text-primary" />
          <span>brand assets</span>
        </div>

        <h2 className="font-display text-2xl font-bold">Brand Assets</h2>

        {/* Downloads */}
        <div className="space-y-3">
          <div className="divide-y divide-primary/10 rounded-xl border border-primary/15 bg-card/40">
            {BRAND_FILES.map((f) => (
              <div
                key={f.href}
                className="flex items-center justify-between gap-4 p-5"
              >
                {/* min-w-0 + break-all: the URL is one unbreakable word and
                    pushed the button off-screen on phones. */}
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold">
                    {f.label}{" "}
                    <span className="font-code text-xs font-normal text-muted-foreground">
                      {f.detail}
                    </span>
                  </p>
                  <p className="break-all font-code text-xs text-muted-foreground">
                    {SITE_URL}
                    {f.href}
                  </p>
                </div>
                <a
                  href={f.href}
                  download
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-volt/30 bg-volt/10 px-3 py-1.5 font-code text-xs text-volt transition-colors hover:bg-volt/20"
                >
                  <Download className="size-3.5" />
                  Download
                </a>
              </div>
            ))}
          </div>
          <p className="font-body text-sm text-muted-foreground">
            These files, the founder photo, and the boilerplate above may be
            used in editorial coverage of {SITE_NAME}.
          </p>
        </div>

        {/* Colors */}
        <div className="space-y-3">
          <p className="font-display text-sm font-bold">Colors</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {BRAND_COLORS.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-primary/15 bg-card/40 p-4 space-y-2"
              >
                <div className={`h-12 rounded-md ${c.swatchClass}`} />
                <div>
                  <p className="font-display text-sm font-bold">{c.name}</p>
                  <p className="font-code text-[10px] text-muted-foreground">
                    {c.role}
                  </p>
                  <p className="mt-1 font-code text-xs text-foreground">
                    {c.hex}
                  </p>
                  <p className="font-code text-[10px] text-foreground/70 break-all">
                    {c.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-sm text-muted-foreground">
            The logo itself uses{" "}
            <span className="font-code text-foreground">#A855F7</span> and{" "}
            <span className="font-code text-foreground">#D4FF00</span> on{" "}
            <span className="font-code text-foreground">#0A0A0F</span>.
          </p>
        </div>

        {/* Fonts */}
        <div className="space-y-3">
          <p className="font-display text-sm font-bold">Typography</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {FONTS.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-primary/15 bg-card/40 p-4 space-y-2"
              >
                <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </p>
                <p className={`${f.className} text-xl text-foreground`}>
                  {f.name}
                </p>
                <p className="font-code text-[10px] text-muted-foreground">
                  {f.usage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT
          ============================================================ */}
      <section className="glass rounded-2xl p-6 md:p-8 space-y-5">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold">
            Press & Partnerships
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            For interviews, features, affiliate programs, or sponsorships,
            reach out directly.
          </p>
        </div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 rounded-lg bg-volt px-5 py-3 font-display text-sm font-semibold text-volt-foreground glow-hover transition-all hover:bg-volt/90"
        >
          <Mail className="size-4" />
          {CONTACT_EMAIL}
        </a>

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
      </section>
    </div>
  );
}

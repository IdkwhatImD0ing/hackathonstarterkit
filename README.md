# Hackathon Starter Kit

The ultimate hackathon playbook with guides, templates, and battle-tested strategies from **36+ hackathon victories** and **$100K+ in prizes**.

## About the Author

**Bill Zhang** ([@IdkwhatImD0ing](https://github.com/IdkwhatImD0ing)), one of the most decorated hackathon competitors in the US college scene.

- **36+ hackathon wins** across 50+ hackathons attended
- **$100K+ in total prizes** won
- **First place at 1,000+ person events**: HackUTD (largest 24hr hackathon in the US), UC Berkeley AI Hackathon (largest AI hackathon in the US), LA Hacks
- **Google Developer Student Challenge** Top 10 Global Finalist (only US team in top 10 in three years)
- **Co-founder of [WeCracked](https://wecracked.com/)**, a 4,000+ member hackathon community with sponsor backing
- **Applied AI Engineer at [Scale AI](https://scale.com/)** (Enterprise, Post-Training Research Agentics)
- **USC** MS in Computer Science (AI), **UCSC** undergrad
- **Co-founder of Dispatch AI**, an AI-powered 911 system valued at $1M and funded by Berkeley SkyDeck

### Notable Hackathon Wins

| Hackathon | Prize | Project | Year |
|---|---|---|---|
| HackUTD 2024 | 1st Place Grand Prize + Goldman Sachs | TalkTuahBank | 2024 |
| UC Berkeley AI Hackathon | Grand Prize + AI for Good + Intel 1st ($60K+) | Dispatch AI | 2024 |
| LA Hacks 2024 | 1st Place Google Challenge | AdaptED | 2024 |
| VTHacks 12 | Best Startup Award | Linguify | 2024 |
| Google Developer Student Challenge | Top 10 Global (2,000+ teams) | SlugLoop | 2023 |

### Links

- Portfolio: [v2.art3m1s.me](https://v2.art3m1s.me/)
- GitHub: [github.com/IdkwhatImD0ing](https://github.com/IdkwhatImD0ing)
- LinkedIn: [linkedin.com/in/bill-zhang1](https://www.linkedin.com/in/bill-zhang1/)
- Devpost: [devpost.com/IdkwhatImD0ing](https://devpost.com/IdkwhatImD0ing)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (new-york style, CSS variables)
- **Analytics**: [Vercel Analytics](https://vercel.com/docs/analytics) (Web Vitals) + [PostHog](https://posthog.com/) (product analytics, blog engagement tracking)
- **Fonts**: JetBrains Mono (display), Outfit (body), Fira Code (code) via `next/font/google`

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in your PostHog API key (optional)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
app/
  layout.tsx              # Root layout (fonts, dark mode, metadata, JSON-LD)
  globals.css             # Full design system (colors, animations, effects)
  page.tsx                # Home page with FAQ + HowTo schema
  sitemap.ts              # Dynamic XML sitemap for search engines
  robots.ts               # robots.txt configuration
  playbook/               # 7-phase hackathon playbook
  non-coders/             # Non-coder guides and AI skills
  blog/                   # SEO blog with keyword-targeted articles
    [slug]/page.tsx       # Individual blog posts with Article schema
components/
  ui/                     # shadcn/ui components (auto-themed)
  blog-blocks.tsx         # Rich blog content blocks (callouts, stats, checklists, etc.)
  blog-analytics.tsx      # Blog engagement tracking (scroll depth, reading time)
  posthog-provider.tsx    # PostHog SPA page view tracker
  json-ld.tsx             # JSON-LD structured data component
lib/
  fonts.ts                # Font configuration (JetBrains Mono, Outfit, Fira Code)
  blog.ts                 # Blog post data, content blocks, and type definitions
  playbook.ts             # Playbook section definitions
  non-coder-sections.ts   # Non-coder section definitions
  non-coder-skills.ts     # Installable AI skill definitions
  utils.ts                # shadcn utility (cn function)
.agents/
  skills/
    blog-writer/          # Agent skill for writing new blog posts with rich blocks
    bugfix-doctor/        # Systematic bug-fixing workflow
    demo-prep/            # Live demo script generator
    domain-to-spec/       # Domain expertise to technical spec
    feature-builder/      # New feature implementation guide
    non-coder-mode/       # Non-coder guardrails
    scaffold-app/         # New project scaffolding
    v0-prompt-crafter/    # PRD to Vercel v0 prompt generator
```

## Analytics

The site uses a two-layer analytics approach. See [`docs/analytics-setup.md`](./docs/analytics-setup.md) for details.

- **Vercel Analytics**: Zero-config Web Vitals monitoring (LCP, CLS, FID per route)
- **PostHog** (free tier, 1M events/month): Custom event tracking, blog engagement metrics (scroll depth, reading time, completion rate), session recordings, funnels

PostHog is optional; the site works without it. Set `NEXT_PUBLIC_POSTHOG_KEY` in `.env.local` to enable it.

## SEO

The site includes comprehensive search engine optimization:

- **Dynamic sitemap** (`/sitemap.xml`) covering all routes
- **robots.txt** allowing full crawling
- **JSON-LD structured data** (WebSite, Organization, FAQPage, HowTo, Article, BreadcrumbList schemas)
- **Keyword-optimized metadata** on every page targeting queries like "how to win hackathons," "best tech stack for hackathons," "hackathon tips for beginners"
- **Open Graph and Twitter Card** metadata for social sharing
- **Canonical URLs** preventing duplicate content issues
- **Blog section** with 5 keyword-targeted articles using rich content blocks (callouts, stats, step lists, checklists, code snippets, quotes, pro/con tables, link cards)
- **Security headers** (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)

## Design System

See [PLAN.md](./PLAN.md) for the full design system specification including color palette, typography, animations, and component patterns.

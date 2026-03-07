# Hackathon Starter Kit

The ultimate hackathon playbook, guides, templates, and battle-tested strategies from **36+ hackathon victories** and **$100K+ in prizes**.

## About the Author

**Bill Zhang** ([@IdkwhatImD0ing](https://github.com/IdkwhatImD0ing)), one of the most decorated hackathon competitors in the US college scene.

- **36+ hackathon wins** across 50+ hackathons attended
- **$100K+ in total prizes** won
- **First place at 1,000+ person events**: HackUTD (largest 24hr hackathon in the US), UC Berkeley AI Hackathon (largest AI hackathon in the US), LA Hacks
- **Google Developer Student Challenge** Top 10 Global Finalist (only US team in top 10 in three years)
- **Co-founder of [WeCracked](https://wecracked.com/)**, a 4,000+ member hackathon community with sponsor backing
- **Applied AI Engineer at [Scale AI](https://scale.com/)** (Enterprise, Post-Training Research Agentics)
- **USC** MS in Computer Science (AI), **UCSC** undergrad
- **Co-founder of Dispatch AI**, AI-powered 911 system, valued at $1M, funded by Berkeley SkyDeck

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
- **Fonts**: JetBrains Mono (display), Outfit (body), Fira Code (code) via `next/font/google`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. Visit [http://localhost:3000/design-system](http://localhost:3000/design-system) to see the full design system preview.

## Project Structure

```
app/
  layout.tsx          # Root layout (fonts, dark mode, metadata)
  globals.css         # Full design system (colors, animations, effects)
  page.tsx            # Home page
  design-system/
    page.tsx          # Live design system preview
components/
  ui/                 # shadcn/ui components (auto-themed)
lib/
  fonts.ts            # Font configuration (JetBrains Mono, Outfit, Fira Code)
  utils.ts            # shadcn utility (cn function)
```

## Design System

See [PLAN.md](./PLAN.md) for the full design system specification including color palette, typography, animations, and component patterns.

Preview it live at `/design-system` when running the dev server.

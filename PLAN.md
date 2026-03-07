# Hackathon Starter Kit  -  Design System & Project Plan

## Vision

A website for hackathon people, built by someone who has won 36+ hackathons. The Hackathon Starter Kit provides guides for every aspect of a hackathon  -  from ideation and team formation to pitching and post-hackathon follow-up. It is backed by real experience: 50+ hackathons attended, $100K+ in prizes, first place at some of the biggest hackathons in the US (HackUTD, UC Berkeley AI Hackathon, LA Hacks  -  all 1,000+ participants).

## About the Author

**Bill Zhang**  -  Prompt Engineer at Scale AI. USC MS CS (AI). UCSC undergrad.

- 36+ hackathon wins, 50+ hackathons attended, $100K+ in prizes
- First place at HackUTD 2024 (largest 24hr hackathon in the US, 1,037 participants)
- Grand Prize at UC Berkeley AI Hackathon 2024 ($60K+, 930 participants, 293 teams)
- First Place Google Challenge at LA Hacks 2024 (706 participants, 142 teams)
- Top 10 Global Finalist at Google Developer Student Challenge 2023 (2,000+ teams, only US team in top 10)
- Co-founder of WeCracked  -  4,000+ member hackathon community
- Co-founder of Dispatch AI  -  AI-powered 911 system, $1M valuation, Berkeley SkyDeck funded ($50K)
- Intel OneAPI Ambassador
- Notable projects: TalkTuahBank, Dispatch AI, AdaptED, SlugLoop, Tidbits, Linguify, DoggoAI, MirAI, SplatNFT

### Profiles

- Portfolio: https://v2.art3m1s.me/
- GitHub: https://github.com/IdkwhatImD0ing/
- LinkedIn: https://www.linkedin.com/in/bill-zhang1/
- Devpost: https://devpost.com/IdkwhatImD0ing

---

## Aesthetic Direction: "Neon Terminal"

A fusion of **hacker-terminal energy** and **premium dark-mode polish**. Late-night coding sessions, glowing screens in dark rooms, the adrenaline of a 36-hour sprint  -  elevated with editorial-quality typography and deliberate spatial design. Not generic "dark mode with purple"  -  this is opinionated, high-contrast, and kinetic.

The personal color theme is **dark purple**.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 + shadcn/ui (new-york style, CSS variables in oklch format)
- **Fonts**: JetBrains Mono, Outfit, Fira Code via `next/font/google`

---

## Color Palette

All colors use oklch format for shadcn/ui v4 compatibility. The site defaults to dark mode.

### Dark Mode (Primary Theme)

**Core Surfaces:**
- `--background`: `oklch(0.13 0.03 285)`  -  near-black with purple undertone ("the void")
- `--foreground`: `oklch(0.97 0.008 285)`  -  near-white with violet tint
- `--card` / `--popover`: `oklch(0.17 0.04 285)`  -  elevated surface
- `--muted` / `--secondary`: `oklch(0.22 0.05 285)`  -  recessed surface
- `--accent`: `oklch(0.25 0.06 285)`  -  hover/active surfaces

**Primary (Signature Purple):**
- `--primary`: `oklch(0.54 0.24 285)`  -  the core purple, all primary actions
- `--primary-foreground`: `oklch(0.97 0.008 285)`  -  white text on purple

**Borders & Inputs:**
- `--border`: `oklch(0.54 0.24 285 / 15%)`  -  subtle purple-tinted
- `--input`: `oklch(0.54 0.24 285 / 20%)`  -  slightly more visible
- `--ring`: `oklch(0.54 0.24 285)`  -  focus ring = primary purple

**Destructive:**
- `--destructive`: `oklch(0.65 0.2 25)`  -  red for errors/danger

**Custom Hackathon Tokens (beyond shadcn defaults):**
- `--volt`: `oklch(0.78 0.15 195)`  -  cyan accent for CTAs, links, tech tags
- `--spark`: `oklch(0.78 0.16 85)`  -  amber accent for trophies, wins, badges
- `--success`: `oklch(0.72 0.19 155)`  -  green for success states
- `--surface`: `oklch(0.17 0.04 285)`  -  alias for card bg in custom components
- `--glow`: `oklch(0.54 0.24 285 / 25%)`  -  purple at 25% opacity for box-shadow effects

**Charts:**
- `--chart-1`: purple, `--chart-2`: cyan, `--chart-3`: amber, `--chart-4`: green, `--chart-5`: light purple

### Light Mode (Fallback)

Same hue family (285) but inverted lightness values. Primary stays purple. Site defaults to dark via `<html class="dark">`.

---

## Typography

Three-font system loaded via `next/font/google`, registered as CSS variables and Tailwind utilities.

### Font Stack

- **Display / Headings**: **JetBrains Mono** (`--font-display`, `font-display`)  -  monospace with personality, reinforces the hacker/builder identity. Used for hero text, section headers, stat callouts.
- **Body / UI**: **Outfit** (`--font-body`, `font-body`)  -  geometric sans-serif, clean with character. Excellent readability at small sizes, modern without being bland.
- **Code / Technical**: **Fira Code** (`--font-code`, `font-code`)  -  for inline code, terminal-style UI, technical content. Supports ligatures.

### Type Scale

- **display-xl**: 4.5rem / 800 / JetBrains Mono  -  hero headline
- **display-lg**: 3rem / 700 / JetBrains Mono  -  page titles
- **heading-lg**: 2rem / 700 / JetBrains Mono  -  section heads
- **heading-md**: 1.5rem / 600 / JetBrains Mono  -  subsections
- **heading-sm**: 1.125rem / 600 / Outfit  -  card titles
- **body-lg**: 1.125rem / 400 / Outfit  -  lead paragraphs
- **body**: 1rem / 400 / Outfit  -  default body
- **body-sm**: 0.875rem / 400 / Outfit  -  captions, metadata
- **code**: 0.875rem / 400 / Fira Code  -  code blocks

---

## Spacing & Layout

- **Base unit**: 4px grid (0.25rem)
- **Radius**: `--radius: 0.625rem` (shadcn default, all components use `radius-sm` through `radius-4xl`)
- **Max content width**: 1200px (6xl)
- **Section padding**: 6rem vertical, 1.5rem horizontal (mobile), 4rem horizontal (desktop)
- **Card padding**: 1.5rem–2rem
- **Layout style**: Asymmetric grids, overlapping elements, diagonal section dividers  -  not a boring centered stack

---

## Signature Visual Effects

Custom CSS animations and utility classes defined in `globals.css`:

1. **Purple glow halos** (`.glow`, `.glow-hover`)  -  `box-shadow` with primary purple at varying opacities. Hover state lifts element 2px and intensifies glow.
2. **Glow pulse** (`.animate-glow-pulse`)  -  Breathing box-shadow animation for hero elements.
3. **Scanline overlay** (`.scanlines`)  -  Faint `repeating-linear-gradient` on `::after` for CRT/terminal texture.
4. **Noise grain** (`.noise`)  -  SVG `feTurbulence` filter on `::before` at 3% opacity for tactile depth.
5. **Staggered reveal** (`.stagger-children`)  -  Children fade-in + translate-up with 80ms cascading delay.
6. **Trophy shimmer** (`.animate-shimmer`)  -  Gold/amber gradient that scrolls across text for the "36+ wins" callout.
7. **Float animation** (`.animate-float`)  -  Subtle vertical bob for decorative elements.
8. **Glass morphism** (`.glass`)  -  `backdrop-filter: blur(16px)` with semi-transparent purple background.
9. **Typing cursor** (`blink-caret` keyframe)  -  For terminal-style typing animations.
10. **Rotating gradient border** (`border-rotate` keyframe)  -  For featured card borders.

---

## shadcn/ui Integration

All shadcn components automatically inherit the hackathon theme through CSS variable overrides. No per-component customization needed.

### How It Works

1. shadcn/ui components reference semantic tokens like `bg-primary`, `text-muted-foreground`, `border-border`
2. These map to CSS variables (`--primary`, `--muted-foreground`, `--border`) defined in `globals.css`
3. We override those variables with our dark purple palette in oklch format
4. Result: every Button, Card, Dialog, Badge, Input, etc. is automatically themed

### Custom Component Patterns

- **Buttons**: Standard shadcn variants work out of the box. Add `.glow-hover` for the signature lift+glow effect. Custom `bg-volt` and `bg-spark` classes for accent CTAs.
- **Cards**: `bg-card` = dark surface. Add `.glow-hover` for interactive cards. Tech tag badges use `border-volt/30 text-volt`.
- **Badges**: Default variants work. Custom: `bg-volt text-volt-foreground` (cyan tech tags), `bg-spark text-spark-foreground` (amber wins), `.animate-shimmer` (gold trophy shimmer).
- **Navigation**: `.glass` class for frosted glass effect with `backdrop-blur`.
- **Code blocks**: `bg-surface` background, `font-code` for Fira Code, terminal-style top bar.
- **Stats callout**: Large `font-display` numbers with accent colors (`text-spark`, `text-volt`, `text-primary`, `text-success`).

### Installed Components

- `button`, `card`, `badge`, `input`, `textarea`, `separator`
- Add more with: `npx shadcn@latest add [component]`

### Config

`components.json` is set to:
- Style: `new-york`
- CSS Variables: `true`
- Base Color: `neutral`
- Icon Library: `lucide`

---

## File Structure

```
app/
  layout.tsx              # Root layout  -  fonts, dark mode, metadata
  globals.css             # Full design system  -  colors, animations, effects
  page.tsx                # Home page
  design-system/
    page.tsx              # Live design system preview page
components/
  ui/                     # shadcn/ui components (auto-themed via CSS vars)
    button.tsx
    card.tsx
    badge.tsx
    input.tsx
    textarea.tsx
    separator.tsx
lib/
  fonts.ts                # next/font/google config (JetBrains Mono, Outfit, Fira Code)
  utils.ts                # shadcn cn() utility
components.json           # shadcn/ui configuration
```

---

## Future Plans

This is the foundation. The site will expand to include:

- **Hackathon Guides**: Ideation, team formation, tech stack selection, time management, pitching, judging criteria, post-hackathon follow-up
- **Templates**: Project scaffolds, pitch deck templates, README templates
- **Resource Library**: API lists, free tier services, design assets
- **Win Showcase**: Portfolio of 36+ winning projects with breakdowns
- **Community**: Integration with WeCracked, hackathon calendar, team matching

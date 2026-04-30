---
name: v0-prompt-crafter
description: "Turn a PRD or product description into a production-grade Vercel v0 prompt. Researches industry conventions, picks a bold aesthetic direction, selects fancy UI libraries (shadcn/ui, Aceternity UI, Magic UI, Motion), and assembles a specific, high-signal prompt using v0's product-surface + context-of-use + constraints framework. Use when the user wants to generate a website or app UI with Vercel v0."
---

# v0 Prompt Crafter

The user has a product idea, PRD, or rough description and wants a **Vercel v0** prompt that produces a distinctive, production-grade UI on the first try. This skill takes that description, does industry and aesthetic research, chooses fancy UI libraries, and assembles a single copy-paste prompt that v0 can execute without asking clarifying questions.

Vercel v0 is Vercel's AI text-to-UI product. It defaults to Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, and `shadcn/ui` components. Prompts are plain English; better prompts give 30-40% faster generations, cleaner code, and fewer follow-up iterations.

## Core Principle

Garbage in, garbage out. v0's defaults are generic (Inter, purple gradients, centered hero, "clean modern design"). To get an UNFORGETTABLE interface, the prompt must commit to a specific aesthetic direction and specify components, layout, motion, typography, and color down to hex codes and font names. Aim for the floor of a good result to be "memorable," not "acceptable."

## Step 1: Parse the PRD

Extract these seven facts from the user's input. If any are missing, propose 2-3 concrete options and ask the user to pick. Never invent facts silently.

1. **Product name** and a one-line elevator pitch.
2. **What it does**: core features, data shown, actions taken.
3. **Who uses it**: role, technical comfort, domain.
4. **When and where they use it**: desktop during work, mobile while commuting, tablet in-field, etc.
5. **What decision or outcome** the UI drives (the moment of value).
6. **Industry / vertical**: finance, healthtech, legaltech, dev tools, consumer social, creator economy, e-commerce, SaaS admin, AI agents, etc.
7. **Scope**: single landing page, marketing site, full app with dashboard, single component, or artifact (poster/card).

If the user gave a full PRD, map it into this shape before moving on. If they gave a one-liner, propose 2-3 interpretations and confirm before researching.

## Step 2: Industry + Aesthetic Research

Before picking a design direction, study what leading products in the vertical look like in 2026. Do this research internally (from training data) or via web search if the user's industry is unfamiliar.

For each target vertical, identify:

- **Visual vocabulary of leaders**: e.g., Linear (dark, neutral, precise, micro-shadows), Stripe (gradient clouds, sans-serif, generous whitespace), Arc Browser (rounded, saturated, friendly), Vercel (monochrome, tight grid, Geist font), Notion (warm, approachable, soft cards), Anthropic (warm taupe, serif display, editorial), Apple (glass, depth, deep blacks), Bloomberg Terminal (dense, monospace, cyan/amber on black), Figma (vibrant, playful), Perplexity (dark navy, teal accent, academic), Airbnb (warm coral, soft corners), Shopify (green-forward, merchant-friendly).
- **Color conventions** that signal trust in that vertical. Finance leans dark navy + green/red semantic colors. Healthtech leans clinical white with a warm accent. Dev tools lean monochrome + one vivid accent. Creator products lean saturated gradients. Enterprise leans restrained neutrals with brand accent.
- **Typographic conventions**. Editorial sites pair a serif display with a grotesque body. Dev tools use monospace display. Consumer products use warm humanist sans. Luxury uses high-contrast serifs or bespoke wordmarks.
- **Layout conventions**. Dashboards use card grids and sidebars. Landing pages use hero + social proof + feature trio + CTA. Docs use three-pane layouts. Marketing pages lean on full-bleed cinematic hero, sticky nav, generous vertical rhythm.

Output a one-paragraph **Industry Read** summarizing what top products in the vertical look like and what users expect visually.

## Step 3: Commit to a Bold Aesthetic Direction

**CRITICAL**: Do not default to "clean modern minimalist." That is the generic AI aesthetic v0 produces without a strong prompt. Pick a direction with a clear conceptual center and execute it with precision.

Choose ONE primary direction. Examples, not a closed list:

- **Brutalist / editorial** (heavy type, hairline borders, oversized numerals, magazine grid)
- **Retro-futuristic terminal** (CRT glow, monospace, scanlines, phosphor green or amber)
- **Soft luxury** (cream backgrounds, high-contrast serif, wide letterspacing, velvet shadows)
- **Neo-brutalist / memphis** (block colors, thick borders, hard drop shadows, geometric shapes)
- **Glassmorphic depth** (layered translucency, aurora blobs, subtle noise, deep blacks)
- **Organic / biomorphic** (warm earth palette, blob shapes, hand-drawn SVG accents)
- **Industrial / technical** (grid lines, monospace labels, dense data, tiny all-caps, rule-of-thirds)
- **Playful toy-like** (saturated colors, rounded blobs, oversized emoji, bouncy motion)
- **Minimal Swiss / grid** (Helvetica-adjacent, 12-column grid, razor alignment, black on white)
- **Ink / editorial print** (serif, generous leading, drop caps, rule lines, muted palette)

Write a 2-3 sentence **Aesthetic Statement** that names the direction, the feeling, and the single unforgettable detail. Example: "Retro terminal meets editorial finance. Dense data feels authored, not spreadsheet-y. The signature detail is a live ticker rendered in amber phosphor with a subtle CRT bloom."

Then lock in concrete tokens:

- **Color palette**: 1 background, 1 surface, 1 foreground, 1-2 accents. Provide hex codes. Prefer dominant-color + sharp-accent over evenly distributed palettes. Decide light vs dark (vary across generations, do not default to dark).
- **Typography**: pick a display font and a body font from [Google Fonts](https://fonts.google.com/) or the Vercel font stack. Avoid Inter, Roboto, Arial, Space Grotesk (overused). Good 2026 picks include: Fraunces, Instrument Serif, PP Editorial New, Söhne (via fallback), Geist, Geist Mono, JetBrains Mono, IBM Plex Mono/Serif, Bricolage Grotesque, Manrope, Outfit, Unbounded, Clash Display, Satoshi, Author, Redaction, Migra, Archivo, DM Serif Display.
- **Radius + density**: sharp (0-2px) for editorial/brutalist, medium (8-12px) for SaaS, pill (999px) for playful. Decide the global spacing unit (4, 6, or 8 px).
- **Motion language**: still, subtle, or dramatic. Name the signature motion (e.g., "staggered reveal on load, spring-eased hover lifts, one scroll-triggered hero parallax").
- **Backgrounds & texture**: gradient mesh, noise overlay, grid lines, scan lines, paper grain, aurora blob, dot pattern. Pick one or two, not all.

## Step 4: Pick the Component Library Stack

v0 defaults to `shadcn/ui`. Layer in fancier libraries via the shadcn CLI 3.0 namespaced registries so v0 can pull in pre-built visual components.

Decide which registries to include in the prompt based on scope:

- **`shadcn/ui`** (always): forms, dialogs, selects, tables, accordions, command palettes. Accessible Radix primitives. Default for app chrome.
- **`@aceternity`** (landing pages, hero sections): spotlight, aurora background, 3D card, bento grid, infinite moving cards, tracing beam, sparkles, background beams, lamp, meteors, wavy background, vortex, world map, macbook scroll, animated tooltip. Uses Motion + Tailwind, some use three.js. Install via `npx shadcn@latest add @aceternity/[component]`.
- **`@magicui`** (marketing + micro-interactions): animated beam, animated list, number ticker, orbiting circles, retro grid, neon gradient card, shimmer button, dock, marquee, terminal, ripple, globe, animated grid pattern, border beam, bento grid. Install via `npx shadcn@latest add @magicui/[component]`.
- **`motion/react`** (the Motion library, formerly Framer Motion): for custom page-load staggers, scroll-triggered reveals, spring-eased hover, layout animations. Import as `import { motion } from "motion/react"`.
- **`lucide-react`**: default icon set. Free, consistent, already installed in v0.
- **`react-three-fiber` + `@react-three/drei`**: for 3D hero scenes when the aesthetic calls for it. Use sparingly.
- **`recharts`** or **`tremor`**: for dashboards with real charts. Prefer `recharts` for custom styling, `tremor` for fast prebuilt blocks.
- **`cmdk`**: command palettes (already used by shadcn Command).

Match library intensity to aesthetic intensity. Minimalist Swiss should NOT import Aceternity spotlights. Maximalist retro-futuristic SHOULD layer Aceternity + Magic UI + a custom canvas shader.

## Step 5: Assemble the v0 Prompt

Use Vercel's official three-input framework (product surface + context of use + constraints & taste) and extend it with the aesthetic tokens from Steps 3 and 4.

### The template

```markdown
Build [product surface: every section, component, data field, and action].

Used by [who],
in [what moment, device, environment],
to [what decision or outcome they reach].

Aesthetic direction: [named direction from Step 3].
The feeling is [2-3 adjectives]. The signature detail is [the one unforgettable thing].

Visual system:
- Theme: [light | dark], based on [#bg hex] background, [#surface hex] surface, [#fg hex] foreground.
- Accents: [#accent1 hex] primary accent, [#accent2 hex] secondary accent. Use accents sparingly on key actions and data highlights; never evenly distributed.
- Typography: [Display Font] for headings ([weight], [tracking]), [Body Font] for body, [Mono Font] for code or numerics. Import via next/font/google.
- Radius: [0px | 4px | 12px | 9999px] globally.
- Spacing: [4 | 6 | 8]px base unit, generous vertical rhythm.
- Density: [dense data-forward | balanced | generous whitespace].
- Backgrounds & texture: [gradient mesh | noise overlay | grid lines | scanlines | aurora blob | paper grain | none]. Apply on [hero only | globally | per section].

Components & libraries:
- Use shadcn/ui for forms, dialogs, selects, tables, tooltips, and command palette.
- Pull [named components] from the Aceternity registry (@aceternity/[name]).
- Pull [named components] from the Magic UI registry (@magicui/[name]).
- Use motion/react for [named animations: e.g., staggered section reveals, spring hover lifts].
- Icons from lucide-react.
[- Charts from recharts, if applicable.]
[- 3D scene via react-three-fiber + drei, if applicable.]

Layout (top to bottom):
1. [Section 1: name, purpose, key elements, any data, any CTA]
2. [Section 2: ...]
...
N. [Section N: ...]

Motion:
- One orchestrated page-load stagger across hero elements (120ms delay between items).
- [Scroll-triggered reveal on feature sections via motion/react useInView.]
- [Hover states: spring-eased scale 1.02 + shadow lift on cards.]
- Avoid decorative motion that slows time-to-content.

Responsive: [mobile-first | desktop-first]. Breakpoints: sm 640, md 768, lg 1024, xl 1280.
Accessibility: semantic HTML, aria-labels on icon-only buttons, visible focus rings in [#accent1], passes WCAG AA contrast against the chosen palette.

What to AVOID:
- Generic AI aesthetics: Inter font, Space Grotesk, purple-on-white gradients, centered hero with a single button, lorem ipsum, emoji-only feature icons.
- Evenly distributed accent colors.
- Decorative motion on every element.
- Non-functional placeholder buttons.
```

### Expansion rules

- **Product surface**: be exhaustive. List every section, every data field, every CTA. "Dashboard with metrics" is bad. "Dashboard showing: top 5 performers (name, revenue, delta vs last week), team quota progress bar (current / target), 6-month revenue trend line chart, pipeline by stage (Leads → Qualified → Demo → Closed), recent activity feed with timestamps" is good.
- **Context of use**: include the real physical context. "Sales managers on desktop monitors during morning standups, glancing for 90 seconds to spot underperformers." Context controls information hierarchy.
- **Constraints**: every hex code, every font name, every radius value, every spacing unit. If you can point to a hex code, do not describe the color in words.
- **Layout**: number the sections top to bottom. For each, list purpose + 2-5 concrete elements.
- **Avoid list**: always include. v0's defaults need explicit negatives to not fall back to them.

### Length guidance

- Single component: 80-150 words.
- Landing page: 250-450 words.
- Full app with multiple screens: 500-900 words. If it grows past 900, split into one prompt per screen and chain them.

## Step 6: Deliver the Output

Return exactly the following to the user, in this order:

1. **Industry Read** (1 paragraph): what leading products in the vertical look like in 2026 and what users expect visually.
2. **Aesthetic Statement** (2-3 sentences): the chosen direction, the feeling, the signature detail.
3. **Design Tokens** (bullet list): palette with hex codes, typography with exact font names, radius, spacing, density, background texture, motion language.
4. **Library Stack** (bullet list): shadcn/ui plus any Aceternity, Magic UI, Motion, recharts, r3f components being used, each with a one-line purpose.
5. **The v0 Prompt** (single fenced code block): the complete, copy-paste-ready prompt following the template in Step 5. This is the main deliverable.
6. **How to Use It** (3 bullets): paste the prompt into v0.dev, confirm registries are enabled in `components.json`, then iterate with Design Mode for visual tweaks and follow-up prompts for logic.
7. **Follow-up Prompts** (3-5 short prompts): prepared one-line iterations the user can paste into v0 after the first generation. Examples: "Add an empty state with an illustration for the activity feed." "Swap the hero background from aurora to a 3D r3f torus with auto-rotate." "Tighten the metric card grid to 3 columns on desktop."

## Rules

- NEVER produce a vague prompt. If the user's input lacks a fact needed for Step 1, ask before generating.
- NEVER default to purple-on-white, Inter, Space Grotesk, or centered-single-CTA hero.
- NEVER recommend Aceternity 3D effects in a minimalist Swiss aesthetic, or brutalist blocks in a luxury aesthetic. Keep library choices coherent with the aesthetic statement.
- NEVER claim the generated v0 output will be perfect. Always include 3-5 follow-up prompts for iteration.
- Vary direction across generations. If a previous skill run chose dark + serif editorial, bias the next run toward light + geometric, or retro-terminal, or playful pastel, unless the user insists otherwise. No two generations should converge on the same look.
- When the product is for a regulated industry (finance, health, legal), mention the trust cues expected (semantic red/green, restrained palette, dense data, clear disclosure) and keep the aesthetic disciplined even if bold.
- Every color claim must be a hex code. Every font claim must be a real font name on Google Fonts or a known commercial family.
- The v0 Prompt block must be self-contained: a developer with no context could paste it into v0 and get something close to the intended design.

## Example: Mini Run

**User input**: "A landing page for a hackathon community app called WeCracked. 4,000+ members, sponsor-backed, helps hackers find teammates, track wins, and see upcoming hackathons."

### Industry Read
Developer-community and hackathon-adjacent products in 2026 (Devpost, Major League Hacking, Replit Bounties, Linear's changelog style) lean into high-contrast dark themes, monospace accents for technical credibility, and a single saturated accent color. Visual leaders in the space pair dense data (leaderboards, streaks) with playful motion (confetti, animated beams) to signal community energy without feeling corporate.

### Aesthetic Statement
Retro-terminal meets competitive leaderboard. The feeling is fast, earned, slightly arcade. The signature detail is a live "cracked count" ticker in amber monospace that increments with a subtle flicker, like a CRT refresh.

### Design Tokens
- Theme: dark. Background `#0A0A0B`, surface `#121214`, foreground `#F5F5F4`.
- Accents: amber `#F5B742` (primary, on key numbers and CTAs), electric green `#6BE675` (success / wins).
- Typography: **Unbounded** 700 for display headings, **Geist** 400 for body, **Geist Mono** 500 for stats and tickers. All via `next/font/google`.
- Radius: 4px globally. Sharp.
- Spacing: 8px base. Generous vertical rhythm between sections (128px).
- Density: data-forward; leaderboard and stats are the hero.
- Background: subtle dot grid pattern across body, amber radial glow behind hero headline only.
- Motion: one orchestrated page-load stagger (160ms) across hero, spring-eased hover lifts on member cards, an `@magicui/number-ticker` on the cracked count, one `@aceternity/meteors` effect in the hero.

### Library Stack
- `shadcn/ui`: Button, Card, Badge, Separator, Tabs (for upcoming hackathons filter).
- `@aceternity/meteors`: hero background accent.
- `@aceternity/infinite-moving-cards`: scrolling member testimonials.
- `@magicui/number-ticker`: live cracked count (4,218) that increments.
- `@magicui/marquee`: sponsor logo strip.
- `motion/react`: hero stagger, scroll-triggered reveals on the "Recent Wins" section.
- `lucide-react`: Trophy, Users, Calendar, Zap icons.

### The v0 Prompt
```
Build a landing page for WeCracked, a 4,000+ member hackathon community.

Product surface (top to bottom):
1. Sticky nav: logo wordmark "WeCracked" left, links Community / Hackathons / Wins / Sponsors center, "Join Discord" CTA right.
2. Hero: oversized headline "Built by hackers. Won by hackers.", subhead "4,000+ members. 36+ wins. $100K+ in prizes.", live number ticker showing 4,218 cracked hackers (use @magicui/number-ticker), two CTAs: primary amber "Join the community", ghost "See recent wins". Background: @aceternity/meteors with an amber radial glow behind the headline.
3. Sponsor strip: @magicui/marquee scrolling logos of Goldman Sachs, Anthropic, Vercel, Scale AI, Intel.
4. Feature trio: three cards side-by-side on desktop, stacked on mobile. Each card: icon (Trophy / Users / Calendar), heading, 2-sentence body. Cards: "Find teammates that actually ship", "Track your wins and streaks", "See every hackathon worth attending".
5. Recent Wins leaderboard: dense table, 8 rows. Columns: Rank, Team, Hackathon, Prize, Date. Use monospace for Prize and Date. Animate each row in with motion/react useInView, 40ms stagger.
6. Testimonials: @aceternity/infinite-moving-cards, 6 cards with handle, avatar, quote, hackathon won.
7. Final CTA: full-bleed section, large headline "Your first win is closer than you think.", amber button "Join Discord".
8. Footer: 4 columns (Product, Community, Resources, Legal), small wordmark, year.

Used by undergrad and early-career hackers (18-24, technical) browsing on desktop after class or on mobile between hackathons, deciding whether this community is worth joining in under 30 seconds.

Aesthetic direction: retro-terminal meets competitive leaderboard. The feeling is fast, earned, slightly arcade. The signature detail is the live cracked-count ticker in amber monospace with a subtle flicker.

Visual system:
- Theme: dark. Background #0A0A0B, surface #121214, foreground #F5F5F4.
- Accents: amber #F5B742 primary (on key numbers, CTAs, leaderboard top rank), electric green #6BE675 for success states and prize callouts. Accents on <10% of pixels.
- Typography: Unbounded 700 for display headings, Geist 400 for body, Geist Mono 500 for stats, tickers, and leaderboard numerics. Import via next/font/google.
- Radius: 4px globally. Sharp corners on cards and buttons.
- Spacing: 8px base unit; 128px vertical rhythm between sections; 24px inside cards.
- Density: data-forward; the leaderboard is the hero of the middle of the page.
- Backgrounds: subtle 1px dot grid at 8% opacity across the body. Amber radial glow (600px, 30% opacity, gaussian blur) behind the hero headline only.

Components & libraries:
- shadcn/ui: Button, Card, Badge, Separator, Tabs.
- @aceternity/meteors in hero background.
- @aceternity/infinite-moving-cards in testimonials section.
- @magicui/number-ticker for the 4,218 cracked count.
- @magicui/marquee for the sponsor logo strip.
- motion/react for the hero page-load stagger (160ms between items) and the leaderboard row reveal on scroll.
- lucide-react for icons: Trophy, Users, Calendar, Zap, ArrowRight.

Motion:
- Page-load: hero headline, subhead, ticker, CTAs stagger in over 800ms with spring easing.
- Hover: cards lift y:-4px, shadow intensifies with amber 10% glow, 200ms spring.
- Scroll: leaderboard rows fade + translate-up 12px as they enter viewport, 40ms stagger.
- No motion on text body or footer.

Responsive: mobile-first. Nav collapses to hamburger under md. Leaderboard becomes stacked cards under md. Feature trio stacks under md.

Accessibility: semantic <header>, <main>, <section>, <footer>. aria-labels on icon-only buttons. Focus rings in amber #F5B742. WCAG AA contrast against #0A0A0B verified.

What to AVOID:
- Inter, Roboto, Space Grotesk.
- Purple or blue gradients.
- Centered single-CTA hero with no data.
- Evenly distributed accent colors.
- Emoji-only feature icons.
- Lorem ipsum; use the real copy above.
- Decorative motion on body text.
```

### How to Use It
- Paste into v0.dev as a single prompt.
- Before generating, open `components.json` in your v0 project and add the `@aceternity` and `@magicui` registries under `registries`.
- Iterate using Design Mode for spacing and color tweaks, and the follow-up prompts below for structural changes.

### Follow-up Prompts
1. "Swap @aceternity/meteors for @aceternity/sparkles in the hero and reduce density by half."
2. "Add a winners spotlight section before the testimonials: large card with a featured team, project name, prize, and a short quote."
3. "Tighten the leaderboard to 5 rows on mobile with a 'View full leaderboard' link."
4. "Change the sponsor strip from @magicui/marquee to a static 5-column grid with grayscale logos that color on hover."
5. "Add a Discord join CTA bar that sticks to the bottom of the viewport on mobile only."

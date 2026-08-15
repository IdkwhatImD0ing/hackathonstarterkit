# v0 Prompt Crafter

> Turn a PRD or product description into a production-grade Vercel v0 prompt. Researches the industry, commits to a bold aesthetic, picks fancy UI libraries (shadcn, Aceternity, Magic UI, Motion), and assembles a copy-paste prompt.

Canonical: https://thehackathonplaybook.dev/non-coders/skills/v0-prompt-crafter

---

Turn a PRD or product description into a production-grade Vercel v0 prompt. Researches the industry, commits to a bold aesthetic, picks fancy UI libraries (shadcn, Aceternity, Magic UI, Motion), and assembles a copy-paste prompt.

Category: Building

Usage: `/v0-prompt-crafter [paste your PRD or one-line product description]` (Turns a PRD into a production-grade Vercel v0 prompt)

Produce a copy-paste-ready prompt for Vercel v0 that is specific enough to generate a memorable interface. The deliverable is the prompt, not application code.

## Parse The Product

Extract these facts from the user input or PRD:

1. Product name and one-line pitch
2. Core features, data fields, and user actions
3. Target user and their technical comfort
4. Context of use, such as device, environment, urgency, and attention span
5. Decision or outcome the UI helps the user reach
6. Industry or vertical
7. Scope: component, landing page, marketing site, dashboard, full app, or multi-screen flow

If facts are missing, propose two or three concrete options and ask the user to choose. Do not silently invent product facts.

Missing facts matter most when they affect trust, privacy, conversion, or layout. For health, finance, legal, education, and AI products, explicitly resolve or label assumptions about privacy posture, regulated context, primary differentiator, and the most important user action before writing the final prompt.

## Read The Industry

Give a one-paragraph industry read before choosing a style. Mention the visual expectations of comparable products, such as density, trust cues, typography, color conventions, and layout patterns.

Use current docs or web research when the task depends on up-to-date v0, shadcn, Magic UI, Aceternity, or Motion details.

## Choose A Strong Direction

Avoid generic "clean modern" prompts. Pick one coherent aesthetic and commit to it.

Possible directions:

- Brutalist editorial
- Retro terminal
- Soft luxury
- Neo-brutalist memphis
- Glassmorphic depth
- Organic biomorphic
- Industrial technical
- Playful toy-like
- Minimal Swiss grid
- Ink editorial print

Write an aesthetic statement with:

- Name of the direction
- Feeling in two or three adjectives
- One signature visual detail

Then lock the design tokens:

- Theme: light or dark
- Background, surface, foreground, and one or two accents as hex values
- Display, body, and mono fonts by exact name
- Radius, spacing unit, density, texture, and motion language

Colors must be hex values. Fonts must be real fonts or known platform fonts.

## Choose Libraries

Use library choices that support the aesthetic rather than adding effects for novelty.

- `shadcn/ui`: app chrome, forms, cards, dialogs, tables, tabs, command palettes
- `@magicui`: marquee, number ticker, animated grid, border beam, terminal, shimmer, orbiting circles
- `@aceternity`: spotlight, aurora, bento grid, infinite moving cards, tracing beam, meteors, sparkles
- `motion/react`: custom page-load, hover, scroll, and layout animations
- `lucide-react`: icons
- `recharts` or `tremor`: dashboards and charts
- `react-three-fiber` plus `@react-three/drei`: only when 3D is central to the concept

Minimal Swiss should not use heavy animated backgrounds. Retro-terminal or playful community pages can justify stronger effects.

## Build The Prompt

The v0 prompt must include:

1. Product surface: every section, component, data field, and action
2. Context of use: who, where, and what decision they need to make
3. Aesthetic direction and signature detail
4. Visual system with concrete tokens
5. Component and library stack
6. Layout from top to bottom or screen by screen
7. Motion rules
8. Responsive behavior
9. Accessibility requirements
10. What to avoid

If the user asked for speed and essential facts are missing, include an **Assumptions To Confirm** line before the prompt and make the assumptions visible inside the prompt. Do not bury them in the explanation.

Length guidance:

- Single component: 80-150 words
- Landing page: 250-450 words
- Full app: 500-900 words, or split into one prompt per screen

## Output Format

Return exactly:

1. **Industry Read**: one paragraph
2. **Aesthetic Statement**: two or three sentences
3. **Design Tokens**: bullets with hex colors, fonts, radius, spacing, density, texture, motion
4. **Library Stack**: bullets with purpose for each library/component
5. **The v0 Prompt**: one fenced code block that is self-contained
6. **How To Use It**: three short bullets
7. **Follow-Up Prompts**: three to five one-line iteration prompts

## Quality Bar

- The prompt should be self-contained enough that a developer can paste it into v0 with no extra context.
- Never default to Inter, purple gradients, centered hero with one CTA, lorem ipsum, or emoji-only feature icons.
- Use real copy whenever the user provided it.
- For regulated industries, keep the design disciplined and include trust cues.
- Do not claim v0 will produce a perfect result. Give useful follow-up prompts.

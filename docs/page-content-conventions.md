# Playbook Page Content & UX Conventions

How playbook phase pages (`app/playbook/<slug>/page.tsx`) present content: scannability, progressive disclosure, and the shared components that enforce both. Complements `docs/seo-implementation.md` (SEO mechanics) and the two always-on rules in `CLAUDE.md` (no em dashes, full quote attribution).

Apply these when adding or editing any playbook page. `team-formation`, `ideation`, `validation`, and `execution` are the reference implementations.

## Why (research basis)

Grounded in Nielsen Norman Group + plain-language research on how people read the web:

- **79% of users scan, ~16% read word-by-word** (Jakob Nielsen, NN/g, 1997). Readers absorb only ~20-28% of a page's words per visit (Nielsen, NN/g, 2008).
- **Cutting word count ~in half was the single biggest usability lever** (+58%); scannable formatting +47%; objective (de-marketese) tone +27% (Morkes & Nielsen, NN/g, 1997).
- **Front-load the point** (inverted pyramid / BLUF) so a reader who stops early still gets it (Schade, NN/g, 2018).
- Eyes follow a **layer-cake / F-pattern**, landing on headings, bold keywords, and the first 1-2 words of each line (Pernice, NN/g, 2017).

## Scannability rubric (the writing rules)

When writing or trimming body copy:

- **Front-load** every card description, paragraph, and bullet. Lead with the information-carrying words.
- **Tighten ~40%.** Cut filler, hedging, and marketese ("truly", "world-class", "incredibly"). One idea per paragraph; sentences under ~20 words; mostly active voice.
- **Bullets over run-ons.** Convert multi-clause sentences into short, parallel, **bold-lead** fragments using the existing pattern: `<span className="font-semibold text-foreground">term</span>`.
- **Bold ~3-5 key terms per section** so the eye lands on what matters.
- **One `<KeyTakeaway>` per major section**, placed at the top, summarizing the single most important point in one sentence.

## Shared components

| Component | File | Use |
|---|---|---|
| `<KeyTakeaway>` | `components/key-takeaway.tsx` | One-line "TL;DR" strip (spark accent) at the top of each major `<section>`. Pass a single sentence. |
| `<Disclosure>` | `components/disclosure.tsx` | Collapsible dropdown for secondary content. Props: `title`, `subtitle`, `badge`, `accent` (`volt`/`spark`/`primary`/`success`), `defaultOpen`. Renders the title as an `<h3>` with `aria-expanded`/`aria-controls`. |
| `<SeriousModeGate>` | `components/serious-mode.tsx` | Progressive-disclosure gate ("how serious are you?") that reveals advanced, opt-in content. Used on `team-formation` to gate the ranking system + hackathon categories. |

### CRITICAL: collapsed content must stay in the prerendered HTML (SEO)

`<Disclosure>` and `<SeriousModeGate>` render their bodies with the `hidden` class (CSS `display:none`), **not** with conditional rendering (`{open && ...}`). This keeps all collapsed content in the static prerendered HTML, so search engines still index it while readers get progressive disclosure. **Never refactor these to conditionally render children**, and never wrap collapsible content in a way that removes it from the initial server render.

## Content hierarchy (the editorial judgment)

The owner's voice and practical advice come first; outside theory is optional depth.

- **Keep visible:** the owner's personal, actionable advice (e.g. on `validation`: Sponsor Recon, Pick Your Stack, Target Your Prize, the Go Bag; on `execution`: Speed Mindset, Scope Hammering, the Timeline). Also keep short summary/checklist sections and decorative pull-quotes.
- **Collapse into `<Disclosure>`:** pure-theory "Why This Works / The Science of X" sections built around external experts, and advanced systems only some readers need. Label these with a `badge` like `"Optional: the science"`.
- **When unsure whether a section is "advice" or "theory," ask the owner** rather than guessing; some sections mix both.

## Interactive-first ordering

Put interactive elements near the **top** of the page so readers engage before they read. The detailed explanation can follow later.

- `team-formation`: the persona quiz opens the page.
- `ideation`: the Little Alchemy game sits in the opening section.
- `execution`: the "Plan Your 24 Hours" timeline simulator opens the page; the detailed timeline breakdown follows.

## Invariants to preserve when editing

- **Design system:** accent colors `volt`/`spark`/`primary`/`success`; `glass`, `glow-hover`, `stagger-children`, `animate-glow-pulse`; the `SectionTemplate` wrapper and local `SectionHeading`.
- **Every quote keeps full attribution** (name + credential + work + year) and its citation link. Never drop a citation when trimming.
- **No em dashes** in body text (titles, headings, and the `— Author, Work, Year` attribution lines are exempt).
- **Do not touch** `export const metadata`, `<JsonLd>`, or other SEO when restructuring.
- External links use `target="_blank" rel="noopener noreferrer"`. Only link URLs you have verified resolve; never invent project/demo/repo links.

## Verification (before commit)

1. `pnpm run build` passes (the project's gate; there is no test suite).
2. **Collapsed content still appears in the prerendered HTML.** Grep the built file to prove the `hidden`-not-conditional rule held and SEO is intact:
   ```bash
   # after pnpm run build
   grep -c "Why This Works" .next/server/app/playbook/<slug>.html
   ```
3. No new lint errors on changed files: `pnpm exec eslint app/playbook/<slug>/page.tsx`. Pre-existing warnings/errors in untouched files are left alone (surgical-changes rule).

## Page status

| Page | Scannable + KeyTakeaways | Progressive disclosure | Interactive-first |
|---|---|---|---|
| team-formation | yes | ranking system + categories gated by `<SeriousModeGate>` | quiz at top |
| ideation | yes | "Go Deeper" group (Why This Works, Building Your Element List, The Wandering Mind) | alchemy game in opening section |
| validation | yes | "Why This Works" science collapsed | (none) |
| execution | yes | "Why This Works" science collapsed | timeline simulator moved to top |
| pitching | scannable only | not yet applied | not yet applied |
| submission | scannable only | not yet applied | not yet applied |
| post-hackathon | scannable only | not yet applied | not yet applied |

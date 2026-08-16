---
name: readme-writer
description: "Write a winner-grade README for a hackathon project: a centered hero with shields.io badges, a clickable demo-video poster, awards and stats tables, a Mermaid architecture diagram, a tech-stack table, a repo map, team cards, and an honest build-context note, then set the repo's About metadata (description, website, and topics) to match. Use this skill whenever the user wants a README, GitHub landing page, project writeup, repo polish, or repo description and tags for a hackathon submission or portfolio piece."
---

# README Writer

Write the README a recruiter or judge sees first. For a hackathon project the README is a landing page, not API docs: it leads with proof (demo, awards, the result), stays scannable, and is honest about what a weekend build is and is not. Aim for the bar set by repos like DispatcherAI, TalkTuahBank, and AdaptEd: a centered hero, real badges, a clickable demo poster, and tables instead of walls of text.

## What "great" means here

- **Proof before prose.** The demo video, the placement, and the headline stats appear before any paragraph of explanation.
- **Scannable.** Tables, feature cards, and collapsible sections beat long lists. A reader should grasp the project in fifteen seconds of scrolling.
- **Honest about scope.** A short "build context" note about what was cut for a 24-to-36 hour build earns more credibility than pretending it is production software.
- **Recruiter-optimized.** Team cards link out to GitHub and LinkedIn. The live link and Devpost are one click from the top.
- **True.** Every award, statistic, prize figure, and rank is real and sourced. Never invent one to fill a section. If a fact is unknown, omit that block.

## Gather the facts

Detect first, ask second. Read what the repo already tells you before interviewing the user.

Auto-detect from the repo:

- `AGENTS.md` and `PRD.md` at the root for project name, summary, problem, features, and stack.
- `package.json` (name, dependencies) and folders like `client/`, `server/`, `app/` for the real stack and layout.
- Existing `.github/assets/`, `public/`, or `assets/` for logos, headshots, and hero images.
- `LICENSE` for the license badge, and the git remote for the `owner/repo` used in raw asset URLs.

Then ask only for what the repo cannot reveal:

- Project name and a one-line tagline that names the stakes, not the tech ("Voice banking for the 1.7 billion adults without a bank account").
- The problem, with one real statistic and its source. No invented numbers.
- Three to five headline features (the "what it does" cards).
- Demo video: the YouTube URL or ID, used for the clickable poster.
- Live deployment URL and Devpost URL, if any.
- Awards and placement, with the exact sponsor track names. Only real ones.
- Event facts: name, dates, venue, hacker count, team or submission count, prize pool.
- Team: names, roles, GitHub handles, LinkedIn URLs, and headshot paths.
- Any open-source artifacts to surface (model, dataset, design doc, Figma).

If something is unknown after asking, leave a clearly marked `<!-- TODO -->` placeholder rather than a broken link or a guessed fact.

## The skeleton

Use this section order. Most items are optional: include one only when the facts exist, and skip what would be thin. The three exemplars each drop or reorder pieces (AdaptEd has no top stats strip; TalkTuahBank folds the numbers into the hero), so treat this as a menu, not a mandatory checklist.

1. **Hero** (centered): a logo, theme-aware art, or a clickable product screenshot linking to the live site; `# Name`; a one-line tagline that names the stakes; a short context sentence.
2. **Badge rows**: primary CTAs (Live, Demo, Devpost, GitHub), then awards, then a repo-vitals row (stars, forks, license), then stack chips. A centered text jump-nav row (see the design language) can stand in for or sit beside the CTA badges.
3. **Table of contents** (optional, for longer READMEs): an anchor-linked list of the sections below.
4. **Demo poster**: a clickable YouTube thumbnail with a one-line caption.
5. **Stats strip** (optional): a table of build time, prize total, rank, team size, event scale. Alternatives the exemplars use: fold the numbers into the hero sentence, or move them to a bottom "spec sheet" table instead of a top strip.
6. **TL;DR or The Problem**: What, Why, How fast, Result. Frame the problem with one sourced stat; an optional blockquote of the core thesis with a `<sub>` attribution reads well here.
7. **Awards** table (optional): Award and Sponsor or Track.
8. **Live links & artifacts** table (optional): deployment, Devpost, demo, open-source model or dataset, design docs.
9. **What it does**: feature cards in a two or three column table, each with an emoji heading.
10. **Architecture**: a Mermaid flowchart plus a short prose walk-through; long call flows go in `<details>` (use `<details open>` on the primary diagram when there are several).
11. **Tech stack**: a table by layer (telephony, inference, frontend, hosting) or grouped lists.
12. **Routes / page map** (optional): a Route and Purpose table when the live site is itself part of the story.
13. **Repository layout**: a fenced tree with inline comments, usually inside `<details>`.
14. **Quick start**: run commands, split into deployable frontend versus original backend when relevant, in `<details>`.
15. **Team** cards: headshot, name, role, GitHub and LinkedIn links.
16. **Event spec sheet** (optional): event, dates, venue, hackers, prize pool, what you won.
17. **Build context & tradeoffs** (optional but recommended): honest notes on hackathon scope, plus a "what is in this repo vs. what ran in production" note if the repo was rebuilt afterward. For a rebuilt project, a two-column "What changed" table (Original build versus This repo) makes the diff concrete.
18. **Acknowledgements and License** (optional): thanks to sponsors, the license.
19. **Footnotes & sources** (optional): a `<details>` citing every stat, the Devpost and demo links, and any branding or license notes. This is how you make the "every stat is sourced" rule visible to a reader.
20. **Footer** (centered): "Built in N hours at Event," the live and repo links, and an optional `↑ back to top` link.

## The design language

This is what separates a winner README from a default one. Use these recipes.

**Badges (shields.io).** Two weights, used consistently:

- CTAs and awards: `style=for-the-badge` with a dark `labelColor=0A0B0D` so they read as a row.
  `https://img.shields.io/badge/Live-yourapp.com-7BFFB2?style=for-the-badge&labelColor=0A0B0D`
- Stack chips: `style=flat-square` with the tool's logo and brand color.
  `https://img.shields.io/badge/Next.js-000?style=flat-square&logo=nextdotjs&logoColor=white`

Awards can take either weight: bold `for-the-badge` badges in the CTA row (DispatcherAI, AdaptEd), or a secondary row of `flat-square` chips (TalkTuahBank). Pick by how dense the hero already is.

Wrap each badge in a link to the relevant page. Find the right `logo` slug on simpleicons.org and use the brand hex. A representative set:

| Tool | logo slug | hex |
| :-- | :-- | :-- |
| Next.js | `nextdotjs` | `000000` |
| React | `react` | `61DAFB` (light: set a dark `labelColor` and `logoColor`) |
| TypeScript | `typescript` | `3178C6` |
| Tailwind CSS | `tailwindcss` | `06B6D4` |
| FastAPI | `fastapi` | `009688` |
| Python | `python` | `3776AB` |
| PostgreSQL | `postgresql` | `336791` |
| MongoDB | `mongodb` | `13AA52` |
| Vercel | `vercel` | `000000` |
| OpenAI | `openai` | `412991` |
| YouTube (demo) | `youtube` | `FF0000` |

Repo-vitals badges come from the GitHub endpoints and make a good live row in the hero; pass `&color=` and `&label=` to match the palette:

- `https://img.shields.io/github/stars/<owner>/<repo>?style=flat-square&color=F2C744&label=Stars`
- `https://img.shields.io/github/license/<owner>/<repo>?style=flat-square&color=64A8F0`

**Hero jump-nav (optional).** Instead of or beside the CTA badges, a centered `<p>` of bolded links reads as a nav bar. Mix external links (suffix an `↗`) with in-page anchors, separated by `&nbsp;·&nbsp;`:

```html
<p>
  <a href="YT_URL"><strong>Demo reel&nbsp;↗</strong></a>
  &nbsp;·&nbsp;
  <a href="#architecture">Architecture</a>
  &nbsp;·&nbsp;
  <a href="#run-it">Run it</a>
</p>
```

**Demo poster.** Do not embed a raw link. Use YouTube's auto-generated thumbnail as a clickable poster:

```html
<a href="https://www.youtube.com/watch?v=VIDEO_ID">
  <img src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" width="780" alt="Watch the demo" />
</a>
```

If `maxresdefault.jpg` is missing for that video, fall back to `hqdefault.jpg`, or ship a custom poster in `.github/assets/`.

**Layout.** GitHub Markdown has no grid, so use HTML `<table>` for anything multi-column: feature cards, the team row, the stats strip. Center the hero and footer with `<div align="center">`. Use `valign="top"` so columns align.

**Collapsibles.** Push long content out of the main scroll with `<details><summary><b>...</b></summary>`: the repo tree, local setup, a step-by-step call flow, a footnotes-and-sources list. When several sit together (for example multiple architecture diagrams), mark the primary one `<details open>` so it stays visible.

**Callouts.** Use GitHub alerts sparingly for the one thing that matters: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`. A common, high-value one is a "what is in this repo vs. production" note.

**Architecture diagram.** A Mermaid `flowchart` with short node labels and `classDef` color coding to group subsystems. Keep it readable at a glance; move the detailed sequence into a `<details>` list below it.

**Section rhythm (optional).** A consistent leading glyph on every H2 gives the README an identity: an emoji per section (DispatcherAI) or one repeated bar like `▌` (AdaptEd). Choose once, then apply it throughout.

**Anchor links.** GitHub builds a heading's anchor by lowercasing it, dropping punctuation and HTML entities, and turning spaces into hyphens (so `## The Problem` becomes `#the-problem`). Use that to wire the table of contents and the jump-nav.

**Typography.** Reach for HTML entities for fine control: `&nbsp;` to keep words together, `&#8209;` for a non-breaking hyphen (`2&#8209;minute`), `&ndash;` for ranges (`Nov&nbsp;16&ndash;17`), `&middot;` or `·` as a separator, `&rarr;` or `↗` for "go" links, `&hellip;` for elisions, and `&mdash;` for an aside (a comma, parentheses, or a colon often reads just as cleanly). Render routes, keystrokes, and UI chips as keycaps with `<kbd>`, and use `<sub>` or `<sup>` for captions.

**Team cards.** The base card is a headshot, name, role, and GitHub plus LinkedIn links in a `<table>` cell. Variations worth borrowing from the exemplars: a one-line contribution blurb per person, a `⭐` marker on the author, the GitHub link as a badge image rather than text, rounded headshots via an inline `border-radius` style, and a `github.com/<handle>.png?size=120` avatar when no headshot file exists.

**Dark and light hero (optional).** Serve theme-aware art with `<picture>` and `prefers-color-scheme` sources.

## Write it

Produce the full `README.md`, not an outline. Match the voice of the exemplars: confident, concrete, and brief. Favor a benefit-first tagline over a feature list. In the problem section, state the stakes and one sourced number, then pivot to the build.

Start the hero from this shape and fill it with real facts:

```html
<div align="center">

<img src=".github/assets/logo.svg" width="84" alt="Name mark" />

# Project Name

### One-line tagline that names the stakes.

<a href="LIVE_URL"><img alt="Live" src="https://img.shields.io/badge/Live-yourapp.com-7BFFB2?style=for-the-badge&labelColor=0A0B0D" /></a>
<a href="YT_URL"><img alt="Demo" src="https://img.shields.io/badge/Demo-3_min_video-FF0000?style=for-the-badge&labelColor=0A0B0D&logo=youtube&logoColor=white" /></a>
<a href="DEVPOST_URL"><img alt="Devpost" src="https://img.shields.io/badge/Devpost-Submission-003E54?style=for-the-badge&logo=devpost&logoColor=white" /></a>

</div>
```

Keep the README a landing page. If setup runs long, collapse it. If the architecture has ten steps, show the diagram and hide the prose in `<details>`.

## Asset handling

- Reference images by repo-relative path (`./.github/assets/hero.png`) or raw URL (`https://raw.githubusercontent.com/<owner>/<repo>/main/...`). Be consistent.
- Store new art in `.github/assets/`. If a needed image does not exist, insert a labeled `<!-- TODO: add .github/assets/hero.png -->` placeholder instead of a link that 404s.
- Team headshots can fall back to GitHub avatars: `https://github.com/<handle>.png?size=120`.
- If the repo has its own asset or OG-image generation (for example an `opengraph-image.tsx`), offer to reuse it rather than inventing a new pipeline.

## Set the repository metadata (About)

The README is the page; the repo's "About" box is the search-and-preview layer that decides whether anyone opens the page at all. It shows under the repo name, in GitHub search results, and on the social card when the link is shared. After writing the README, set it from the same facts so the three stay consistent.

Set three fields:

- **Description**: one sentence, the tagline or a tightened version of it. Lead with what it does, not the stack, and keep it under about 120 characters so it does not truncate.
- **Website**: the live deployment URL, or the demo video link if there is no live site.
- **Topics (tags)**: five to twelve lowercase, hyphenated tags pulled from the real stack and domain, plus `hackathon` and the event or sponsor tech where relevant (for example `nextjs`, `fastapi`, `openai`, `voice-ai`, `hackathon`). GitHub allows up to twenty, each lowercase and at most fifty characters. Pick the ones a recruiter or judge would actually search, not every dependency.

Apply them with the GitHub CLI from inside the repo, since the agent can run it directly:

```bash
gh repo edit \
  --description "One line on what it does, under ~120 characters" \
  --homepage "https://yourapp.com" \
  --add-topic nextjs,fastapi,openai,voice-ai,hackathon
```

`--add-topic` merges with any existing topics rather than replacing them; run `gh repo edit --help` to confirm the flags for the installed version. If `gh` is missing or not authenticated, do not guess credentials: fall back to the "About" gear on the repo's GitHub page and hand the user the exact description and topic list to paste. Never invent a description or a tag that misrepresents the project.

## Verify

Before finishing, check:

- Exactly one `# H1`.
- Every link resolves and every badge URL is well-formed.
- The YouTube ID in the poster matches the demo link.
- Every referenced image exists in the repo or is marked TODO.
- The Mermaid block parses (balanced brackets, valid node ids).
- The repo description, website, and topics are set and match the README, with no invented claims.
- No fabricated awards, stats, prize figures, or team details.

Preview in a Markdown renderer. Note that GitHub-only features (alerts, Mermaid, `<picture>` theming) render on GitHub but not in every previewer, so confirm on the repo when possible.

## Final output

Return:

1. **README.md**: written to the repo root (after showing a diff if one already exists).
2. **Repo metadata**: the description, website, and topics applied via `gh`, or the exact values to paste if `gh` was unavailable.
3. **Asset checklist**: which images exist and which are TODO.
4. **Facts used vs. omitted**: what was included and which sections were skipped for lack of real facts.
5. **Next steps**: for example, run `demo-prep` for the matching demo script, capture a custom poster, or pin the repo.

## Boundaries

- Never invent awards, statistics, prize amounts, ranks, or team information. Omit over guess.
- Do not overwrite an existing README without showing the change and getting a go-ahead.
- Set the repo's About metadata (description, website, topics) from the same facts, and never invent a description or tag that misrepresents the project.
- Keep it a landing page, not exhaustive documentation. Deep setup and long flows belong in `<details>`.
- Match the repo's real stack and structure. The README describes what exists, not an aspirational version.

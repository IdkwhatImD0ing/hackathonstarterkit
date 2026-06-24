# CLAUDE.md

Project guidance for Claude Code, and the single source of truth: `AGENTS.md` points here so other tools load the same rules.

<!-- Maintainers: keep this under ~200 lines and ruthlessly pruned. If a line would not change Claude's behavior, cut it. See CLAUDE-CODE-GUIDELINES.md for the full maintenance discipline. These HTML comments are stripped before the file enters Claude's context, so they cost no tokens. -->

## Working principles

**Think before coding.** State assumptions out loud. If a request is ambiguous, ask or present the interpretations instead of silently picking one. Suggest a simpler approach when you see one, and push back when warranted.

**Simplicity first.** Write the minimum code that solves the stated problem. No speculative features, no unrequested flexibility, no error handling for impossible cases. If it is bloated, rewrite it smaller. Test: would a senior engineer call this overcomplicated?

**Surgical changes.** Edit only what the request requires. Preserve existing style and formatting. Do not refactor working code. Only remove imports, variables, or functions that *your* change orphaned. Flag pre-existing dead code rather than deleting it. Core test: every changed line traces directly to the request.

**Goal-driven execution.** Define verifiable success criteria before starting. Turn vague tasks into testable outcomes. For multi-step work, outline the plan with verification checkpoints. "Make it work" is not a success criterion.

## Honesty rules (read every turn)

- Before claiming a function, class, type, or import exists, verify it: read the file or grep for it. Never fabricate symbols.
- If you cannot verify something, say "I haven't verified this" explicitly, and do not write code that depends on the unverified claim.
- Do not add a library that is not already referenced in this project without asking first.
- Do not claim a test or build passed unless you actually ran the command this session.
- Never invent error messages, API responses, or stack traces. If you did not see it, say so.
- When you genuinely do not know, "I don't know" or "I need to check first" is the correct answer, always better than a confident guess.
- Invoke the `fact-checker` subagent before commits and before user-facing summaries (see `.claude/agents/fact-checker.md`).

## Verification protocol

Before writing or editing code that uses a symbol, do one of:
1. Read the file where it is defined and confirm the signature.
2. `grep -r "symbolName" .` (or Glob) to find it.
3. Check `package.json` for the dependency.

If you skip verification, prefix the code with `// UNVERIFIED: I have not confirmed this symbol exists`. Prefer plan-then-execute mode for any task touching more than one file.

## Project context

- **What this is:** "The Hackathon Playbook", a content-heavy, SEO-first marketing/education site deployed at `thehackathonplaybook.dev`. The repo also ships a pipeline of agent skills under `.agents/skills/` that scaffold new hackathon projects, separate from the site's own code.
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (new-york style, CSS variables) over radix-ui, lucide-react. Analytics: Vercel Analytics + PostHog. Fonts via `next/font/google` in `lib/fonts.ts`.

## Commands

```bash
pnpm install
pnpm run dev      # next dev (localhost:3000)
pnpm run build    # verify substantive page changes before committing
pnpm run lint     # eslint
```

- **Package manager is `pnpm`** (canonical). Both `package-lock.json` and `pnpm-lock.yaml` exist; use pnpm.
- There is **no test suite**. `pnpm run build` is the verification gate for content/page changes.

## Always-on rules ("the two rules + research")

Enforced by `.cursor/rules/`; they apply to Claude too. Violations produce wrong-but-plausible content.

1. **No em dashes** (— or `--`) in explanatory/body text. Use commas, parens, colons, or split sentences. Em dashes are fine in titles, headings, attributions, and citations.
2. **Every quote needs full attribution**: person's name + credential/title + source work and year where applicable.
3. **Research expectation:** ground playbook content in named experts, papers, books, or concrete URLs rather than generic advice. Weave research and quotes through the narrative (mirroring team-formation and ideation); never collect them in a separate "research" block.
4. **Every new page/route follows the SEO checklist** in `docs/seo-implementation.md`: export `metadata` (keyword-rich title, 150-160 char description, `alternates.canonical` from `NEXT_PUBLIC_BASE_URL`, `openGraph`, `twitter`); add `<JsonLd>` (`components/json-ld.tsx`) for content/guide/FAQ pages; one `<h1>`, semantic headings, internal links.
5. **Playbook pages follow the content & UX conventions** in `docs/page-content-conventions.md`: scannable copy (front-loaded, bold-lead bullets, one `<KeyTakeaway>` per section); progressive disclosure via `<Disclosure>`/`<SeriousModeGate>` for secondary or theory content, with collapsed bodies rendered using `hidden` (never conditional) so they stay in the prerendered HTML for SEO; interactives near the top; keep the owner's practical advice visible and tuck pure-theory "Why This Works" research behind a dropdown.

## Architecture

Content is **data-driven**: page data lives in `lib/` as typed TypeScript, and route templates render it. To add content you usually edit a data file, not a page.

- **Playbook**: fixed 7-phase order in `lib/playbook.ts` (`PLAYBOOK_SECTIONS`): team-formation, ideation, validation, execution, pitching, submission, post-hackathon. Each phase renders at `app/playbook/<slug>/page.tsx`. team-formation and ideation are the canonical design references (`SectionTemplate` wrapper, local `SectionHeading`, accent colors `volt`/`spark`/`primary`/`success`, glass panels for quotes, `stagger-children`/`glow-hover` animations).
- **Non-coders**: sections in `lib/non-coder-sections.ts`, installable AI skill definitions in `lib/non-coder-skills.ts`; rendered under `app/non-coders/`.
- **Blog**: **one file per post** in `lib/blog/posts/<slug>.ts`, registered in the `BLOG_POSTS` array in `lib/blog.ts`. Shared types (`BlogPost`, the `ContentBlock` union) live in `lib/blog/types.ts`. `app/blog/[slug]/page.tsx` handles rendering, metadata, and JSON-LD automatically. `ContentBlock` is a rich union (paragraph, callout, stat-row, image, video, step-list, quote, pro-con, code-snippet, checklist, link-card, cta-button) rendered by `components/blog-blocks.tsx`. Prefer the `blocks` array over plain paragraphs; mix 3-5 block types per article. When editing an existing post, set its `updatedDate` field. **Before any substantial rewrite or new post, read `docs/blog-engagement-research.md` (the evidence on what makes readers finish) and apply `docs/blog-engagement-checklist.md`.**
- **Sitemap** (`app/sitemap.ts`) auto-pulls slugs from `lib/playbook.ts`, `lib/non-coder-sections.ts`, `lib/non-coder-skills.ts`, and `lib/blog.ts`. Data-driven routes appear automatically; **standalone routes (e.g. `app/terms`, `app/media-kit`) must be added to `app/sitemap.ts` manually.**
- **Design system**: fully in `app/globals.css` (colors, animations, effects); full spec in `PLAN.md`. `components/ui/` is shadcn-managed and auto-themed.
- **Analytics**: Vercel Analytics (Web Vitals) + PostHog (events, blog engagement via `components/blog-analytics.tsx`, SPA pageviews via `components/posthog-provider.tsx`). PostHog is optional, gated on `NEXT_PUBLIC_POSTHOG_KEY`. See `docs/analytics-setup.md`.
- **API routes**: `app/api/newsletter/` (Beehiiv signup; needs `BEEHIIV_PUBLICATION_ID` + `BEEHIIV_API_KEY`). Canonical URLs build from `NEXT_PUBLIC_BASE_URL`. Security headers are in `next.config.ts`.

## Conventions (learned preferences)

- Affiliate or "preferred tool" mentions read soft and casual ("check it out", "my preferred"), never salesy or feature-listy.
- Embed rich media (demo videos, recordings) on one canonical page only; cross-link from sibling pages instead of duplicating the embed.
- When the user pastes raw LinkedIn-style copy (bold unicode, emoji bullets), normalize the formatting and integrate it into the site's components rather than pasting verbatim.
- Personal proof to surface (frame to fit the page): started hackathons looking for an internship, got an interview within the first 4 hackathons, then 2 expedited interviews and 1 direct offer; 60+ hackathons and over $100K in winnings. Owner's GitHub handle is `@IdkwhatImD0ing`.
- Plan-driven workflow: multi-step tasks are scoped through plan files in `~/.cursor/plans/<name>.plan.md`. Mark to-dos `in_progress` one at a time; never edit the plan file itself.

## Guardrails

- Never commit secrets, `.env` files, or credentials.
- Do not commit or push unless asked.

## Agent skills (`.agents/skills/`)

A scaffolding pipeline for building *new* hackathon projects (not this site). Intended order: `non-coder-mode` (load once, stays active) → `domain-to-spec` (writes `AGENTS.md` + `PRD.md` to a target repo root; scaffolds refuse to run without these) → `scaffold-frontend` (`clients/`) → `scaffold-backend` (`server/`, optional Supabase, skipped if PRD says no backend) → `feature-builder` → `bugfix-doctor` → `demo-prep`. `quickstart` chains steps 2-4 with a confirmation gate. `v0-prompt-crafter` is an alternative to `scaffold-frontend`. `blog-writer` is standalone, for publishing write-ups to this site.

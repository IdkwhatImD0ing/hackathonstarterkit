# Agent Skills Pipeline

This document describes the agent skills in the top-level `skills/` directory, their dependencies, and the canonical order to run them for a new project. The directory is deliberately not `.agents/skills/` or `.claude/skills/`: agent CLIs auto-load those (`.agents/skills/` by Cursor, Codex, and Amp; `.claude/skills/` by Claude Code), and these skills are meant to run against *your* project repo, not to activate automatically in sessions working on this one. (`.agents/skills/` remains as the gitignored install target for third-party skills added via the skills CLI.)

## Overview

Skills are markdown files (`SKILL.md`) that any AGENTS.md-compatible AI coding tool can read as a standard operating procedure. Each skill has a front matter block (`name`, `description`) followed by the prompt body.

The skills in this repo are intentionally **pipelined**: each one has clear preconditions and produces artifacts that the next skill consumes.

```
non-coder-mode (always on)
        |
        v
domain-to-spec   ───→  writes AGENTS.md + PRD.md at repo root
        |
        v
scaffold-frontend  ───→  clients/ (Next.js, reads PRD.md)
        |
        v
scaffold-backend   ───→  server/  (FastAPI, optional Supabase)
                          (skipped if PRD.md says Backend Needed? = No)
        |
        v
feature-builder  ───→  implements one feature at a time
        |
        v
bugfix-doctor    ───→  invoked on demand when something breaks
        |
        v
demo-prep        ───→  produces a 3-act demo script for judging day
```

The `quickstart` skill is a **shortcut**, not a step in the pipeline. It
chains `domain-to-spec -> scaffold-frontend -> scaffold-backend` in one
invocation with a user confirmation gate between the PRD and the scaffolds.
Use `quickstart` when you want to go faster; use the manual order when you
want to pause between steps or only run a subset.

`v0-prompt-crafter` is an **alternative path** to `scaffold-frontend`: instead of scaffolding a Next.js app locally, it reads the PRD and produces a single copy-paste prompt for [Vercel v0](https://v0.dev) to generate a production-grade UI. Use one or the other, not both for the same product surface.

`blog-writer` is separate from the hackathon pipeline. It is used to publish write-ups to this site's blog, and is marked `metadata.internal: true` so the skills CLI does not install it during normal repo installs.

## Skill-by-Skill Contract

### `non-coder-mode` (Foundation)

- **When**: Start of every session. Stays active.
- **Reads**: Nothing.
- **Writes**: Nothing.
- **Behavior**: Sets communication style, safety rails, and output format for every other skill in the session.

### `domain-to-spec` (Foundation)

- **When**: First skill to invoke for a new project.
- **Reads**: User's answers about profession, outcome, constraints, and whether persistence/auth/APIs are needed.
- **Writes**: `AGENTS.md` and `PRD.md` at the repo root.
- **Key PRD sections populated**:
  - `## Pages / Screens` — drives `scaffold-frontend`.
  - `## Data Model` — drives type and model generation in both scaffolds.
  - `## Backend Needed?` — gate for `scaffold-backend`.
  - `## Backend Routes` — drives FastAPI route generation.

### `quickstart` (Foundation)

- **When**: User wants a full stack in one go.
- **Reads**: Repo state (checks for existing `AGENTS.md`, `PRD.md`, `clients/`, `server/`).
- **Writes**: Everything the sub-skills write.
- **Behavior**: Runs `domain-to-spec`, pauses for PRD review, runs `scaffold-frontend`, then conditionally runs `scaffold-backend`. Fails fast if any sub-skill fails.

### `scaffold-frontend` (Building)

- **Preconditions**: `AGENTS.md` AND `PRD.md` exist at the repo root.
- **Reads**: `PRD.md > Pages / Screens`, `User Flow`, `Core Features (MVP)`, `Data Model`, `Backend Needed?`.
- **Writes**: `clients/` as a Next.js + TypeScript + Tailwind app with one page per PRD row, types from the Data Model, and an API client if a backend is needed.
- **Fail-fast**: If `AGENTS.md` or `PRD.md` is missing, the skill refuses to run and tells the user to invoke `domain-to-spec` first.

### `scaffold-backend` (Building)

- **Preconditions**: `AGENTS.md` AND `PRD.md` exist, AND `PRD.md > Backend Needed?` starts with `Yes`.
- **Reads**: `PRD.md > Backend Routes`, `Data Model`, `Domain Constraints`.
- **Writes**: `server/` as a FastAPI app with Pydantic models, one route file per PRD entity, optional Supabase integration, a `requirements.txt`, `.env.example`, and a health check route.
- **Fail-fast**:
  - If `AGENTS.md` or `PRD.md` is missing: direct user to `domain-to-spec`.
  - If `Backend Needed? = No`: direct user to `feature-builder`.

### `v0-prompt-crafter` (Building, alternative to `scaffold-frontend`)

- **When**: User wants to generate a UI via [Vercel v0](https://v0.dev) instead of scaffolding a Next.js app locally.
- **Reads**: A PRD or one-line product description. Researches the target industry's visual vocabulary and picks a bold aesthetic direction.
- **Writes**: A single copy-paste prompt for v0.dev plus industry research, aesthetic statement, design tokens, and a library stack recommendation. Does not write any files to the repo.

### `feature-builder` (Building)

- **When**: After scaffolds exist and user wants to implement a feature.
- **Reads**: User's feature description, `PRD.md > Core Features (MVP)` as context.
- **Writes**: Whatever the feature requires, scoped to `clients/` and/or `server/`.

### `bugfix-doctor` (Fixing)

- **When**: Something broke.
- **Reads**: Error message, user's reproduction steps.
- **Writes**: The minimum change across <= 3 files.

### `demo-prep` (Shipping)

- **When**: Before presenting.
- **Reads**: User's answers about the app, the slot length, and the format.
- **Writes**: A 3-act script, a click path, a backup plan, and Q&A prep. Does not modify code.

### `blog-writer` (Shipping, site-internal)

- **When**: Writing a new post for this site's blog.
- **Reads**: User's topic, `lib/blog.ts > BLOG_POSTS` to avoid overlap.
- **Writes**: A new entry in `lib/blog.ts`.
- **Install visibility**: Hidden from normal `npx skills add IdkwhatImD0ing/hackathonstarterkit` installs with `metadata.internal: true`. It can still be listed or installed by setting `INSTALL_INTERNAL_SKILLS=1`.

## Repo Layout After Running the Pipeline

```
<repo-root>/
  AGENTS.md                # written by domain-to-spec
  PRD.md                   # written by domain-to-spec
  clients/                 # written by scaffold-frontend
    app/
    types/
    lib/api.ts             # only if Backend Needed? = Yes
    .env.local.example
  server/                  # written by scaffold-backend (optional)
    app/
      main.py
      models.py
      routes/
      db.py
      config.py
    tests/
    requirements.txt
    .env.example
```

## Where the Site Renders These Skills

- `lib/non-coder-skills.ts` loads every `SKILL.md` from `skills/<slug>/SKILL.md` at build time using `readFileSync`. The SKILL.md is the single source of truth; the TypeScript file only holds display metadata (title, description, icon, command).
- `app/non-coders/skills/page.tsx` renders the grid of skills.
- `app/non-coders/skills/[slug]/page.tsx` renders the full SKILL.md body with a copy button.
- `app/sitemap.ts` picks up one URL per skill automatically from `NON_CODER_SKILLS`.

## Adding a New Skill

1. Create `skills/<slug>/SKILL.md` with a front matter block and prompt body.
2. Add a new entry to `SKILL_META` in `lib/non-coder-skills.ts` with the display metadata (title, description, category, icon, slash command).
3. If the skill is repo-internal and should not install through `npx skills add <repo>`, add `metadata.internal: true` to its front matter.
4. If the new skill is part of the pipeline, add its slug to `RECOMMENDED_ORDER` in `lib/non-coder-skills.ts` at the correct position. If it is a shortcut that wraps multiple pipeline steps, add it to `SHORTCUT_SKILLS` instead.
5. Update this file (`docs/agent-skills.md`) with the skill's contract.
6. Update the "Agent Skills Pipeline" section in `README.md`.

## Canonical Run Order (copy-paste for users)

```
1. /non-coder-mode           ← always first, keep active
2. /domain-to-spec           ← writes AGENTS.md + PRD.md
3. /scaffold-frontend        ← reads PRD.md, creates clients/
4. /scaffold-backend         ← reads PRD.md, creates server/ if backend is needed
5. /feature-builder          ← repeat per feature
6. /bugfix-doctor            ← when things break
7. /demo-prep                ← before presenting
```

Shortcut:

```
/quickstart                  ← replaces steps 2-4 with one command
```

# Agent Skills Pipeline

This document describes the agent skills in `.agents/skills/`, their dependencies, and the canonical order to run them for a new project.

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
quickstart        ───→  chains the two scaffolds below
        |
        +─────→ scaffold-frontend  ───→  clients/ (Next.js, reads PRD.md)
        |
        +─────→ scaffold-backend   ───→  server/  (FastAPI, optional Supabase)
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

`blog-writer` is separate from the hackathon pipeline. It is used to publish write-ups to this site's blog.

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

- `lib/non-coder-skills.ts` loads every `SKILL.md` from `.agents/skills/<slug>/SKILL.md` at build time using `readFileSync`. The SKILL.md is the single source of truth; the TypeScript file only holds display metadata (title, description, icon, command).
- `app/non-coders/skills/page.tsx` renders the grid of skills.
- `app/non-coders/skills/[slug]/page.tsx` renders the full SKILL.md body with a copy button.
- `app/sitemap.ts` picks up one URL per skill automatically from `NON_CODER_SKILLS`.

## Adding a New Skill

1. Create `.agents/skills/<slug>/SKILL.md` with a front matter block and prompt body.
2. Add a new entry to `SKILL_META` in `lib/non-coder-skills.ts` with the display metadata (title, description, category, icon, slash command).
3. Whitelist the new directory in `.gitignore` under the `# agent skills` section.
4. If the new skill should be part of the pipeline, add its slug to `RECOMMENDED_ORDER` in `lib/non-coder-skills.ts` at the correct position.
5. Update this file (`docs/agent-skills.md`) with the skill's contract.
6. Update the "Agent Skills Pipeline" section in `README.md`.

## Canonical Run Order (copy-paste for users)

```
1. /non-coder-mode           ← always first, keep active
2. /domain-to-spec           ← writes AGENTS.md + PRD.md
3. /quickstart               ← OR run steps 4-5 manually
4. /scaffold-frontend        ← if running manually
5. /scaffold-backend         ← if running manually and backend is needed
6. /feature-builder          ← repeat per feature
7. /bugfix-doctor            ← when things break
8. /demo-prep                ← before presenting
```

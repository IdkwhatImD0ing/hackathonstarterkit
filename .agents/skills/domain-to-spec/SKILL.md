---
name: domain-to-spec
description: "Turns domain expertise into a technical specification AND writes AGENTS.md + PRD.md to the repo root. Run this FIRST, before any other scaffold skill. Takes your profession and desired outcome, lists constraints, identifies error-prone steps, proposes the simplest buildable flow, and commits the result as AGENTS.md and PRD.md so every other skill can read it. Use at the very start of a new project."
---

# Domain to Spec

This is the **first skill** you should run when starting a new project. It captures the user's domain expertise, translates it into a buildable specification, and writes two files to the repo root that every other skill depends on:

- `AGENTS.md`: the "README for agents" with setup commands, tech stack, file structure, and guardrails.
- `PRD.md`: the Product Requirements Document with the user flow, pages, and success criteria.

Every other scaffold skill (`scaffold-frontend`, `scaffold-backend`) reads these two files and refuses to run if they are missing. So this skill is a prerequisite for the rest of the stack.

## Step 1: Extract Domain Knowledge

Ask the user:

> "I'm a {profession} building a tool to {outcome}."

Then ask follow-up questions:
- What are the regulations or constraints in your field that this tool must respect?
- What are the 3 most error-prone or time-consuming steps in the current process?
- Who will use this tool? (you, your patients/clients, your staff, the public)
- What does success look like? (one sentence)
- Does the tool need to store data, authenticate users, or call external APIs? (helps decide if a backend is needed)

## Step 2: Map the Domain to Software

For each domain concept the user describes, translate it:

| Domain Concept | Software Equivalent |
|---|---|
| Form or checklist | Input form with validation |
| Decision tree | Conditional logic / wizard flow |
| Reference document | Searchable knowledge base |
| Approval process | Status workflow with roles |
| Report or summary | Generated output / PDF export |
| Compliance check | Rule engine with pass/fail |

## Step 3: Propose the Simplest Flow

Design the minimum viable product:
- One input (what the user provides)
- One process (what the app does with it)
- One output (what the user gets back)

Present it as:

```
INPUT: [what the user enters or uploads]
  |
PROCESS: [what happens behind the scenes]
  |
OUTPUT: [what the user sees or downloads]
```

## Step 4: Decide if a Backend is Needed

Based on the answers, decide:
- **Frontend-only** is enough when: the app is a calculator, a static guide, a form that emails the user, or a client-side tool with no persistence.
- **Backend is required** when: the app stores data between sessions, authenticates users, processes files server-side, calls paid APIs with secret keys, or integrates with a database.

Write the decision into `PRD.md` under a new section called `## Backend Needed?` with either `Yes (reason: ...)` or `No (reason: ...)`. The `scaffold-backend` skill reads this section to decide whether to run.

## Step 5: Write `AGENTS.md` to the Repo Root

Create `AGENTS.md` at the repository root (not inside `clients/` or `server/`). Fill in the placeholders based on the user's answers. This is the template:

```markdown
# AGENTS.md

## Project Overview
[One paragraph: what this project does and who it is for.]

## Repo Layout
- `clients/` — Frontend (Next.js). Created by the `scaffold-frontend` skill.
- `server/` — Backend (FastAPI, optional). Created by the `scaffold-backend` skill.
- `AGENTS.md` — This file. Shared instructions for every agent working in the repo.
- `PRD.md` — Product Requirements Document. The source of truth for what to build.

## Setup Commands
### Frontend (`clients/`)
- Install: `cd clients && pnpm install`
- Dev: `cd clients && pnpm dev`
- Build: `cd clients && pnpm build`
- Lint: `cd clients && pnpm lint`

### Backend (`server/`), if present
- Create venv: `cd server && python -m venv .venv && source .venv/bin/activate`
- Install: `cd server && pip install -r requirements.txt`
- Dev: `cd server && uvicorn app.main:app --reload`
- Tests: `cd server && pytest`

## Tech Stack
- Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- Backend: FastAPI, Python 3.11+ (only if `Backend Needed? = Yes` in PRD.md)
- Database: [Supabase / None] (per PRD.md)
- Auth: [Supabase Auth / None] (per PRD.md)
- Deployment: Vercel (frontend), Fly.io or Railway (backend)

## Code Style
- TypeScript strict mode in `clients/`
- Python type hints everywhere in `server/`
- Functional React components with hooks, no class components
- Server components by default in Next.js; add `"use client"` only when needed
- kebab-case for file names, PascalCase for components
- Descriptive variable names, no single letters, no abbreviations
- Validate all user input with Zod (frontend) and Pydantic (backend)

## Testing Instructions
- Frontend: `cd clients && pnpm lint && pnpm test`
- Backend: `cd server && pytest`
- Fix any test or type errors before committing.

## Security Considerations
- Never hardcode secrets. Use `.env.local` in `clients/` and `.env` in `server/`.
- Never commit either env file. They are in `.gitignore`.
- Ask before database writes, destructive operations, or deploys.
- Propose a plan before large refactors.

## PR Instructions
- Title format: `[feature/fix/chore] Short description`
- Run lint and tests before committing.
- Keep diffs small and focused on a single change.
- Include a manual test path in the PR description.

## Domain Constraints
[List any regulations, compliance requirements, or professional rules that the app must respect. Leave empty if none.]
```

Tell the user: "I wrote `AGENTS.md` to the repo root. Every AI coding tool (Cursor, Claude Code, Codex, Jules, Windsurf, Copilot, etc.) reads this file automatically. You do not need to paste it into a chat."

## Step 6: Write `PRD.md` to the Repo Root

Create `PRD.md` at the repository root. This is the plain-English blueprint that the scaffold skills read. Use this template and fill every section based on the user's answers:

```markdown
# Product Requirements Document

## What Is This?
[One sentence: "An app that helps {who} do {what} by {how}"]

## Target User
[2-3 sentences describing the user's role, the context they use this in, and what frustrates them about the current process.]

## Core Flow
INPUT: [what the user provides]
PROCESS: [what the system does]
OUTPUT: [what the user gets back]

## Core Features (MVP)
1. [Feature 1: one sentence]
2. [Feature 2: one sentence]
3. [Feature 3: one sentence]

## Pages / Screens
| Page | Purpose | Key Elements |
|------|---------|-------------|
| Landing | First impression, explains value | Heading, subtitle, CTA button |
| [Core Feature page] | Where the main action happens | [Inputs, outputs] |
| [Optional supporting page] | [Purpose] | [Elements] |

## User Flow
1. User opens the app and sees [what]
2. User clicks [what] to [do what]
3. The system [responds how]
4. User can then [next action]

## Data Model
[List every entity the app stores, in plain English. Example: "A Submission has a patient name, a date, a list of medications, and a status of pending/approved/rejected." Leave empty if the app is stateless.]

## Backend Needed?
[Yes or No, with a one-sentence reason. Populated in Step 4 above.]

### Backend Routes (fill only if Yes)
List each API route the backend needs, in this format:
- `POST /submissions` — create a new submission from the form
- `GET /submissions` — list the current user's submissions
- `GET /submissions/{id}` — fetch one submission
- `POST /submissions/{id}/approve` — mark a submission as approved

The `scaffold-backend` skill reads this section and generates one FastAPI route per entry.

## Domain Constraints
[Regulations, compliance requirements, industry standards, or professional rules the app must respect. Copy from Step 1.]

## Success Criteria
- [ ] User can [core action 1]
- [ ] User can [core action 2]
- [ ] App handles [edge case] gracefully
- [ ] App is deployed and accessible via a public URL

## What This Is NOT
- Not a [thing it could be confused with]
- Does not handle [out-of-scope functionality]

## Out of Scope (Save for Later)
- [Feature to add in V2]
- [Integration to add later]

## Risk Areas
1. [Most likely failure]
2. [Second most likely failure]
3. [Third most likely failure]
```

## Step 7: Confirm With the User

After writing both files, return exactly:

1. **Files Created**:
   - `AGENTS.md` at repo root
   - `PRD.md` at repo root
2. **One-Sentence Summary** of the tool
3. **Backend Needed?** Yes or No, with reason
4. **Next Step**: "Run the `scaffold-frontend` skill. If `Backend Needed? = Yes`, also run `scaffold-backend` after. Or run the `quickstart` skill to chain everything automatically."

## Rules

- Never skip writing `AGENTS.md` or `PRD.md`. Every other skill depends on them.
- Always ask the user to confirm the `Backend Needed?` decision before writing `PRD.md`.
- If the user has already run this skill and the files exist, ask before overwriting. Offer to append to `## Out of Scope` or update specific sections instead.
- Never scaffold code in this skill. Only write `AGENTS.md` and `PRD.md`. The scaffold skills do the code.

## Inspiration

This skill is modeled after two hackathon-winning approaches:

- **CrossBeam** (1st place, Anthropic hackathon): A lawyer encoded California ADU permit regulations into a compliance checker. The key insight: 28 reference documents became validation rules.
- **PostVisit.AI** (3rd place, Anthropic hackathon): A cardiologist built a platform that processes visit transcripts into patient-friendly summaries. The key insight: clinical expertise became structured output templates.

Both winners succeeded because they understood the problem domain better than any developer could. Your domain expertise is the most valuable input.

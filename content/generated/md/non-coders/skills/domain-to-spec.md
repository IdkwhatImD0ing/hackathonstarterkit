# Domain to Spec

> Run this FIRST. Captures your domain expertise and writes AGENTS.md and PRD.md to the repo root. Every other scaffold skill reads these files.

Canonical: https://thehackathonplaybook.dev/non-coders/skills/domain-to-spec

---

Run this FIRST. Captures your domain expertise and writes AGENTS.md and PRD.md to the repo root. Every other scaffold skill reads these files.

Category: Foundation

Usage: `/domain-to-spec [your profession] [what you want to build]` (Writes AGENTS.md and PRD.md from your domain expertise)

This is the first skill for a new project. It converts the user's domain knowledge into two repo-root files:

- `AGENTS.md`: shared instructions for future coding agents
- `PRD.md`: the product blueprint consumed by scaffold skills

Do not scaffold application code in this skill.

## Preflight

Check whether `AGENTS.md` or `PRD.md` already exist. If either exists, stop and ask whether to update specific sections, append new scope, or cancel. Never overwrite these files silently.

## Interview The Domain Expert

Extract the sentence:

```text
I am a {profession or role} building a tool to {outcome}.
```

Ask only for missing essentials:

- Who will use the tool?
- What is the painful or error-prone workflow today?
- What rules, regulations, or professional constraints matter?
- What information does the user provide?
- What output should the tool produce?
- Does the tool need accounts, stored data, file processing, paid APIs, email, or secrets?
- What would make the MVP a success?

Mirror the user's domain language back to them before translating it into software.

## Translate Domain Concepts

Map domain ideas into software primitives:

| Domain Concept | Software Equivalent |
| --- | --- |
| Form or checklist | Validated input form |
| Decision tree | Wizard or conditional logic |
| Reference document | Searchable knowledge base |
| Approval process | Status workflow and roles |
| Report or summary | Generated page, PDF, or export |
| Compliance check | Rule engine with pass/fail results |

Use this translation to avoid vague specs. Every feature should connect to an input, process, output, or domain constraint.

## Define The Simplest Flow

Propose the MVP as:

```text
INPUT: what the user provides
PROCESS: what the app does
OUTPUT: what the user sees, saves, or sends
```

Keep the first version narrow enough to build. Put tempting extras in `Out of Scope`.

## Decide Backend Needed

Recommend **No backend** when the app is a static guide, calculator, one-off form, or client-side tool with no persistence or secrets.

Recommend **Yes backend** when the app stores data between sessions, authenticates users, processes files server-side, calls paid APIs with secret keys, sends email, or integrates with a database.

Ask the user to confirm the backend decision before writing `PRD.md`.

## Write `AGENTS.md`

Create `AGENTS.md` at the repo root. Include:

- Project overview
- Repo layout for `client/`, optional `server/`, `AGENTS.md`, and `PRD.md`
- Setup commands for frontend and backend
- Tech stack
- Code style
- Testing instructions
- Security considerations
- PR instructions
- Domain constraints

Use conservative defaults unless the user specified otherwise:

- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Backend: FastAPI only if backend is needed
- Validation: Zod for frontend forms, Pydantic for backend models
- Secrets: environment variables, never hardcoded

## Write `PRD.md`

Create `PRD.md` at the repo root with these sections:

```markdown
# Product Requirements Document

## What Is This?
## Target User
## Core Flow
## Core Features (MVP)
## Pages / Screens
## User Flow
## Data Model
## Backend Needed?
### Backend Routes
## Domain Constraints
## Success Criteria
## What This Is NOT
## Out of Scope (Save for Later)
## Risk Areas
```

`Pages / Screens` should be a table with `Page`, `Purpose`, and `Key Elements`. `Backend Routes` should list method, path, and purpose only when backend is needed.

## Final Response

Return:

1. **Files Created**: `AGENTS.md` and `PRD.md`
2. **One-Sentence Summary**: what the tool does
3. **Backend Needed?** confirmed decision and reason
4. **Next Step**: run `scaffold-frontend`, and run `scaffold-backend` afterward only if the PRD says backend is needed

## Quality Bar

- The PRD should be understandable to a non-coder and specific enough for a scaffold skill.
- Use the user's real domain words where possible.
- Separate MVP from later ideas.
- Do not invent regulations, data fields, or routes without grounding them in user answers.

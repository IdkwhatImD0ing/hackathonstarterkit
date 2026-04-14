---
name: scaffold-app
description: "Creates a new application from scratch with one working route and one visible page. Solves the blank canvas problem for non-coders. Use when starting a brand new project and the user does not know where to begin."
---

# Scaffold App

The user wants to start a new project from scratch. They have no coding experience and are staring at an empty folder. Get them to a working, visible application as fast as possible.

## Step 1: Understand the Goal

Ask the user:
- What are you building? (one sentence is fine)
- Who is it for?
- Do you have a preference for how it looks? (dark mode, light mode, specific colors)

If they are unsure about technology choices, recommend:
- **Next.js + TypeScript + Tailwind CSS** for web apps
- **React Native / Expo** for mobile apps
- **FastAPI + Python** for backend-only APIs

## Step 2: Scaffold

Generate the project with these commands (adapt to the chosen stack):

```bash
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir
cd my-app
```

Then immediately create:
1. A landing page with a heading, subtitle, and one call-to-action button
2. A second page linked from the landing page (the core feature page, even if empty)
3. A clean layout with navigation between the two pages

## Step 3: Generate AGENTS.md

AGENTS.md is a "README for agents": a dedicated, predictable place to provide context and instructions that help AI coding agents work on the project. It works across Cursor, Claude Code, OpenAI Codex, Google Jules, Aider, Windsurf, GitHub Copilot, and many more tools (see [agents.md](https://agents.md/) for the full list).

Create an `AGENTS.md` file at the project root with these sections, filled in based on the user's project:

```markdown
# AGENTS.md

## Project Overview
[One paragraph: what this project does and who it's for]

## Setup Commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build for production: `pnpm build`
- Run linter: `pnpm lint`
- Run tests: `pnpm test`

## Tech Stack
- Framework: [e.g., Next.js 15 with App Router]
- Language: [e.g., TypeScript]
- Styling: [e.g., Tailwind CSS v4]
- Database: [e.g., Supabase, or "None yet"]
- Auth: [e.g., NextAuth.js, or "None yet"]
- Deployment: [e.g., Vercel]

## File Structure
- `app/` — Pages and layouts (App Router)
- `components/` — Reusable UI components
- `lib/` — Utility functions and shared logic
- `types/` — TypeScript type definitions
- `public/` — Static assets (images, fonts)

## Code Style
- TypeScript strict mode
- Functional components with hooks; no class components
- Server components by default; add "use client" only when needed
- kebab-case for file names, PascalCase for component names
- Validate all user input with Zod
- Use descriptive variable names (no abbreviations)

## Testing Instructions
- Run `pnpm test` to execute the full test suite
- Add or update tests for any code you change
- Fix any test or type errors until the suite is green
- After moving files or changing imports, run `pnpm lint`

## Security Considerations
- Never hardcode secrets or API keys; use `.env.local` and environment variables
- Never commit `.env.local` to version control
- Ask before database writes or destructive operations
- Ask before deploying to production
- Propose plans before large refactors

## PR Instructions
- Title format: `[feature/fix/chore] Short description`
- Always run `pnpm lint` and `pnpm test` before committing
- Keep diffs small and focused on a single change
- Include a manual test path in the PR description
```

### Why AGENTS.md matters

- README.md is for humans (quick starts, project descriptions). AGENTS.md complements it with the extra context coding agents need: build steps, test commands, and conventions that might clutter a README.
- It gives every AI tool a clear, predictable place for instructions.
- One AGENTS.md works across many agents, so the user is not locked into a single tool.

### Nested AGENTS.md for larger projects

If the project grows into a monorepo or has distinct subprojects, place an additional AGENTS.md inside each package directory. Agents automatically read the nearest file in the directory tree, so the closest one takes precedence.

## Step 4: Generate PRD.md

Create a `PRD.md` (Product Requirements Document) at the project root. This is the user's plain-English blueprint. The AI references it as the source of truth for what to build.

```markdown
# Product Requirements Document

## What Is This?
[One sentence: "An app that helps [who] do [what] by [how]"]

## Who Is It For?
[Describe the target user in 2-3 sentences. Include their role, the context
they use this in, and what frustrates them about the current process.]

## Core Features (MVP)
1. [Feature 1: one sentence description]
2. [Feature 2: one sentence description]
3. [Feature 3: one sentence description]

## What This Is NOT
- Not a [thing it could be confused with]
- Does not handle [out-of-scope functionality]
- V1 does not include [future feature]

## User Flow
1. User opens the app and sees [what]
2. User clicks [what] to [do what]
3. The system [responds how]
4. User can then [next action]

## Pages / Screens
| Page | Purpose | Key Elements |
|------|---------|-------------|
| Landing | First impression, explains value | Heading, subtitle, CTA button |
| [Core Feature] | Where the main action happens | [Describe inputs/outputs] |
| [Optional] | Supporting page | [Describe purpose] |

## Success Criteria
- [ ] User can [core action 1]
- [ ] User can [core action 2]
- [ ] App handles [edge case] gracefully
- [ ] App is deployed and accessible via a public URL

## Domain Constraints
[List any regulations, compliance requirements, industry standards,
or professional rules that the app must respect. Leave blank if none.]

## Out of Scope (Save for Later)
- [Feature to add in V2]
- [Integration to add later]
- [Nice-to-have that is not essential for demo]
```

Tell the user: "Fill this out before we start building. Even one sentence per section is enough. This becomes the source of truth for everything we build."

## Step 5: Add Remaining Config Files

Add these files to the project root:
- `.cursorrules` with the non-coder guardrails (from the non-coder-mode skill)
- `.cursor/rules/beginner-mode.mdc` for communication style
- `.cursor/rules/safety.mdc` for deletion/deployment safety rules
- `.gitignore` that excludes `.env.local`, `node_modules`, `.next`, etc.

## Step 6: Run and Verify

- Start the dev server: `npm run dev`
- Open the browser at `localhost:3000`
- Walk the user through what they see
- Confirm both pages load and navigation works

## Output

Return exactly:
1. **Commands**: Every terminal command to run (copy-paste ready)
2. **Files Created**: List of every file with a one-line description
3. **What You See**: Description of what the app looks like in the browser
4. **AGENTS.md**: Confirm it was created and explain that it works across all major AI coding tools
5. **PRD.md**: Remind the user to fill it out before building features
6. **Next Steps**: 2-3 suggested features to build first

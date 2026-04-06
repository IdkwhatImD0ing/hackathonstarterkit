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

## Step 3: Configure for Non-Coders

Add these files to the project root:
- `.cursorrules` with the non-coder guardrails (from the non-coder-mode skill)
- `AGENTS.md` with the project overview, tech stack, and commands
- `PRD.md` as a template for the user to fill out

## Step 4: Run and Verify

- Start the dev server: `npm run dev`
- Open the browser at `localhost:3000`
- Walk the user through what they see
- Confirm both pages load and navigation works

## Output

Return exactly:
1. **Commands**: Every terminal command to run (copy-paste ready)
2. **Files Created**: List of every file with a one-line description
3. **What You See**: Description of what the app looks like in the browser
4. **Next Steps**: 2-3 suggested features to build first

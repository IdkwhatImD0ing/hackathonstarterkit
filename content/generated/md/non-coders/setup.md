# Getting Started

> What to set up before your first prompt, and the five-step loop you'll repeat for every feature.

Canonical: https://thehackathonplaybook.dev/non-coders/setup

---

## The 3 Files

Cursor reads .cursorrules and AGENTS.md on its own. [AGENTS.md](https://agents.md/) is an open format, so Codex and other AI coding tools read it too. PRD.md is your plan, and you paste it in as your first prompt. The [System Prompt](https://thehackathonplaybook.dev/non-coders/system-prompt) page has a one-command setup, and [Concepts Explained](https://thehackathonplaybook.dev/non-coders/concepts) defines words like commit.

#### .cursorrules

Tells the AI how to behave with you

```
PROJECT TYPE
- Non-coder using Cursor + Claude Code to ship a working demo fast.
- Prioritize shippable UX over perfect architecture.

OPERATING PRINCIPLES
- Write smallest vertical slice first: input > processing > visible output.
- Ask for clarification when requirements are ambiguous.
- Prefer high-level libraries and hosted services.

PLANNING RULES
- Before coding: generate a 5-10 step plan with file list and test path.
- After coding: run project, capture logs, propose fixes if errors occur.
- Keep diffs small; commit every working increment.

CODING STYLE
- Clear, commented code for non-coders to read. Avoid cleverness.

GUARDRAILS
- Never introduce secrets into source. Use environment variables.
- If blocked >10 minutes, switch approach or scaffold a simpler path.
```

#### AGENTS.md

Tells the AI about your project

```
# AGENTS.md

## Overview
[One paragraph: what this project does and who it's for]

## Tech Stack
- Frontend: Next.js 15, React 19, TypeScript
- Styling: Tailwind CSS
- Database: [your choice, e.g., Supabase]

## Commands
- Dev server: pnpm dev
- Build: pnpm build
- Lint: pnpm lint

## Conventions
- Use functional components with hooks
- Server components by default
- kebab-case for files, PascalCase for components

## Safety Rules
- Ask before deleting files
- Ask before database writes
- Ask before deploying
```

#### PRD.md

Your plan, in plain English

```
# Product Requirements Document

## What Is This?
[One sentence: "An app that helps [who] do [what] by [how]"]

## Who Is It For?
[Describe the target user in 2-3 sentences]

## Core Features (MVP)
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

## What This Is NOT
- Not a [thing it could be confused with]
- V1 does not include [future feature]

## User Flow
1. User opens the app and sees [what]
2. User clicks [what] to [do what]
3. The system [responds how]

## Success Criteria
- [ ] User can [core action 1]
- [ ] User can [core action 2]
```

## The 4 Shortcuts

On a Mac, press Cmd wherever you see Ctrl.

Tab

Accept AI suggestion

While typing, accept what the AI offers

Ctrl+K

Inline edit

Select code, describe the change in English

Ctrl+L

Chat with AI

Ask questions, get explanations

Ctrl+I

Agent mode

Create and edit several files at once

## The Daily Workflow

Start a new chat

Open a fresh chat for each feature. Long conversations can make the agent lose focus, according to Cursor's post [“Best practices for coding with agents”](https://cursor.com/blog/agent-best-practices) (Lee Robinson, 2026).

Describe the change

Say who uses it, what they do, what data it shows, and how it should look. "Make it better" gives the AI nothing to go on.

Review the diff

Look at the green (added) and red (removed) lines before you click Accept. The same post warns that AI-written code can look right and still be wrong.

Test it

Check your app in the browser. If something looks wrong, paste a screenshot into the chat.

Commit

Once it works, tell the AI to commit with a short description. You can go back to that point if something breaks later.

Then repeat. Don't build the next feature on top of one you haven't tested.

## Getting Started Checklist

Install Cursor from cursor.com and sign in

Create your project folder and add the 3 files above (.cursorrules, AGENTS.md, PRD.md)

Fill out PRD.md with what you're building, for whom, and why

Open Cursor Agent mode (Ctrl+I) and paste your PRD as the first prompt

Practice the daily workflow for at least a week before your hackathon, so you're not learning Cursor at the event

# Getting Started

> The 3 files, 4 shortcuts, and daily workflow you need to start building.

Canonical: https://thehackathonplaybook.dev/non-coders/setup

---

## The 3 Files That Matter

Your entire configuration lives in three files. The AI reads these every time it helps you. For the deep dive on the system prompt files (and a one-command setup), see [The System Prompt](https://thehackathonplaybook.dev/non-coders/system-prompt). Don't know what a “file” means in this context? Check [Concepts Explained](https://thehackathonplaybook.dev/non-coders/concepts).

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

Your plain-English blueprint

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

Memorize these four keyboard shortcuts. They cover 95% of what you need.

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

Multi-file creation and editing

## The Daily Workflow

Follow this loop every time you sit down to build.

Start a new chat

Open a fresh chat in Cursor for each distinct feature. Long chats degrade AI quality.

Describe the change

Tell the AI what you want in plain language. Be specific about users, actions, and appearance.

Review the diff

Read the green (added) and red (removed) lines before accepting. Never accept blindly.

Test locally

Check your app in the browser. If something looks wrong, screenshot it and paste into chat.

Commit

Tell the agent to commit with a descriptive message. This gives you save points to revert to.

Repeat

Move to the next feature. One feature per chat. Test before building on top.

The mindset: You are not managing code. You are managing intent. Describe what you want, review what the AI produces, test it, save it, move on.

## Common Pitfalls

These mistakes cost non-coders the most time. Every one is avoidable.

Accepting code without reading the diff

Fix: Always review the green/red changes before clicking Accept

Vague prompts like 'make it better'

Fix: Be specific about users, actions, data, and appearance

Building too many features at once

Fix: One feature per chat session, test before moving on

Skipping version control

Fix: Tell the AI to commit after every working change

Learning the tool during the hackathon

Fix: Practice with Cursor for at least a week before the event

## Getting Started Checklist

Follow these steps and you'll be building within the hour.

Install Cursor from cursor.com and sign in

Create your project folder and add the 3 files above (.cursorrules, AGENTS.md, PRD.md)

Fill out PRD.md with what you're building, for whom, and why

Open Cursor Agent mode (Ctrl+I) and paste your PRD as the first prompt

Follow the daily workflow: describe, review, test, commit, repeat

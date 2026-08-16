# Skills & Commands

> Installable AI skills and slash commands that teach your AI to work with non-coders.

Canonical: https://thehackathonplaybook.dev/non-coders/skills

---

## How to Install

Copy this prompt and paste it into Cursor (Ctrl+I) or Claude Code. The AI installs everything for you.

paste this into your AI chat

```
Install the non-coder skills from this GitHub repo: https://github.com/IdkwhatImD0ing/hackathonstarterkit

Run this command in the terminal:
npx skills add IdkwhatImD0ing/hackathonstarterkit

Then confirm the installation when prompted. After it finishes, tell me which skills were installed.
```

That's it. The AI handles the rest. You don't need to touch any settings or navigate any folders.

## Recommended Run Order

These skills are pipelined. Each one has preconditions and produces artifacts the next one reads. Run them in this order for a new project.

1.  [`/non-coder-mode`

    Core guardrails for non-coders. Tells the AI to explain everything in plain English, break tasks into small steps, and never assume coding knowledge.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/non-coder-mode)
2.  [`/domain-to-spec`

    Run this FIRST. Captures your domain expertise and writes AGENTS.md and PRD.md to the repo root. Every other scaffold skill reads these files.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/domain-to-spec)
3.  [`/scaffold-frontend`

    PRD-driven Next.js scaffold into clients/. Reads AGENTS.md and PRD.md, generates pages, layout, types, and an API client. Refuses to run without both files.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/scaffold-frontend)
4.  [`/scaffold-backend`

    PRD-driven FastAPI scaffold into server/ with optional Supabase. One stub route per entry in PRD.md > Backend Routes. Skips automatically if Backend Needed? = No.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/scaffold-backend)
5.  [`/feature-builder`

    Structured workflow for implementing a new feature. Returns a plan, files list, commands, test steps, and rollback plan.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/feature-builder)
6.  [`/bugfix-doctor`

    Systematic bug-fixing workflow. Walks through reproduce, isolate, fix, test, and verify. Explains all errors in plain English.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/bugfix-doctor)
7.  [`/demo-prep`

    Produces a step-by-step live demo script for hackathon presentations. Covers the problem, walkthrough, and outcome with a backup plan.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/demo-prep)
8.  [`/readme-writer`

    Turns your finished project into a winner-grade GitHub README: a centered hero, badges, a clickable demo video, an architecture diagram, and team cards, then sets the repo's About description, website, and topics so recruiters and judges can find it.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/readme-writer)

## Shortcuts

These skills bundle multiple steps from the pipeline above into a single command. Use them when you want to go faster and do not need to pause between steps.

[`/quickstart`

One-shot project bootstrapper. Chains domain-to-spec, scaffold-frontend, and scaffold-backend (if needed) with user confirmation between steps.

Open →](https://thehackathonplaybook.dev/non-coders/skills/quickstart)

## Slash Commands

After installing, type these directly in Cursor or Claude Code chat. Each one triggers a specific workflow.

Quick Reference

`/non-coder-mode`Activates non-coder guardrails for the session

`/domain-to-spec`Writes AGENTS.md and PRD.md from your domain expertise

`/quickstart`Runs the full scaffold pipeline end-to-end

`/scaffold-frontend`Creates clients/ from PRD.md (requires domain-to-spec first)

`/scaffold-backend`Creates server/ from PRD.md (runs only if backend is needed)

`/v0-prompt-crafter`Turns a PRD into a production-grade Vercel v0 prompt

`/feature-builder`Structured feature implementation workflow

`/bugfix-doctor`Systematic bug-fixing with plain English explanations

`/demo-prep`Generates a timed demo script with backup plan

`/readme-writer`Writes a polished GitHub README for your hackathon project

`/explain`Explains code or errors in plain English for non-coders

## All Skills

Click any skill to see the full details and install instructions.

[#### Non-Coder Mode

Core guardrails for non-coders. Tells the AI to explain everything in plain English, break tasks into small steps, and never assume coding knowledge.

`/non-coder-mode`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/non-coder-mode)[#### Domain to Spec

Run this FIRST. Captures your domain expertise and writes AGENTS.md and PRD.md to the repo root. Every other scaffold skill reads these files.

`/domain-to-spec [your profession] [what you want to build]`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/domain-to-spec)[#### Quickstart

One-shot project bootstrapper. Chains domain-to-spec, scaffold-frontend, and scaffold-backend (if needed) with user confirmation between steps.

`/quickstart`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/quickstart)[#### Scaffold Frontend

PRD-driven Next.js scaffold into clients/. Reads AGENTS.md and PRD.md, generates pages, layout, types, and an API client. Refuses to run without both files.

`/scaffold-frontend`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/scaffold-frontend)[#### Scaffold Backend

PRD-driven FastAPI scaffold into server/ with optional Supabase. One stub route per entry in PRD.md > Backend Routes. Skips automatically if Backend Needed? = No.

`/scaffold-backend`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/scaffold-backend)[#### v0 Prompt Crafter

Turn a PRD or product description into a production-grade Vercel v0 prompt. Researches the industry, commits to a bold aesthetic, picks fancy UI libraries (shadcn, Aceternity, Magic UI, Motion), and assembles a copy-paste prompt.

`/v0-prompt-crafter [paste your PRD or one-line product description]`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/v0-prompt-crafter)[#### Feature Builder

Structured workflow for implementing a new feature. Returns a plan, files list, commands, test steps, and rollback plan.

`/feature-builder [describe the feature you want]`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/feature-builder)[#### Bugfix Doctor

Systematic bug-fixing workflow. Walks through reproduce, isolate, fix, test, and verify. Explains all errors in plain English.

`/bugfix-doctor [paste the error or describe the symptom]`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/bugfix-doctor)[#### Demo Prep

Produces a step-by-step live demo script for hackathon presentations. Covers the problem, walkthrough, and outcome with a backup plan.

`/demo-prep [app name or description]`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/demo-prep)[#### GitHub Writer

Turns your finished project into a winner-grade GitHub README: a centered hero, badges, a clickable demo video, an architecture diagram, and team cards, then sets the repo's About description, website, and topics so recruiters and judges can find it.

`/readme-writer [your project name or repo]`

View skill details →](https://thehackathonplaybook.dev/non-coders/skills/readme-writer)

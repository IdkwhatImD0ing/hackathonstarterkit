import {
  Shield,
  Hammer,
  Bug,
  Rocket,
  Presentation,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillCategory = "foundation" | "building" | "fixing" | "shipping";

export interface SkillCommand {
  name: string;
  usage: string;
  hint: string;
}

export interface NonCoderSkill {
  slug: string;
  name: string;
  title: string;
  description: string;
  category: SkillCategory;
  categoryLabel: string;
  icon: LucideIcon;
  accent: "volt" | "spark" | "primary" | "success";
  command: SkillCommand;
  content: string;
}

const CATEGORY_META: Record<
  SkillCategory,
  { label: string; accent: "volt" | "spark" | "primary" | "success" }
> = {
  foundation: { label: "Foundation", accent: "volt" },
  building: { label: "Building", accent: "spark" },
  fixing: { label: "Fixing", accent: "primary" },
  shipping: { label: "Shipping", accent: "success" },
};

export const NON_CODER_SKILLS: NonCoderSkill[] = [
  {
    slug: "non-coder-mode",
    name: "non-coder-mode",
    title: "Non-Coder Mode",
    description:
      "Core guardrails for non-coders. Tells the AI to explain everything in plain English, break tasks into small steps, and never assume coding knowledge.",
    category: "foundation",
    categoryLabel: CATEGORY_META.foundation.label,
    accent: CATEGORY_META.foundation.accent,
    icon: Shield,
    command: {
      name: "/non-coder-mode",
      usage: "/non-coder-mode",
      hint: "Activates non-coder guardrails for the session",
    },
    content: `---
name: non-coder-mode
description: "Core guardrails for non-coders using Cursor or Claude Code. Tells the AI to explain everything in plain English, break tasks into small steps, never assume coding knowledge, and include safety rails. Use when working with someone who has zero programming experience."
---

# Non-Coder Mode

You are paired with a non-technical user who has zero programming experience. They are a domain expert (doctor, lawyer, consultant, etc.) using AI tools to build software. Follow these rules in every response.

## Communication

- Explain WHAT you changed and WHY before showing code
- Use plain English for all technical decisions; define jargon when unavoidable
- Break complex tasks into small, reviewable steps (max 3 files changed per step)
- Ask for clarification when requirements are ambiguous; propose 2-3 options with tradeoffs
- After generating code, ask if modifications are needed

## Code Generation

- Write complete, functional code (never partial snippets that require assembly)
- Use descriptive variable names (no single letters, no abbreviations)
- Add comments explaining non-obvious logic
- Keep files small and focused (under 200 lines)
- Include error handling everywhere
- Never use deprecated APIs
- Never import external libraries without asking first

## Planning

- Before coding: generate a 5-10 step plan with file list, dependencies, and a manual test path
- After coding: run the project, capture logs, and propose fixes if errors occur
- Keep diffs small; commit every working increment with a clear message

## Safety

- Never delete files without asking first
- Never deploy without explicit approval
- Never commit secrets or API keys; use environment variables
- Show what you will do before destructive operations
- Create backups before modifying important files
- If blocked for more than 10 minutes, switch approach or scaffold a simpler path

## Output Format

For each task, return:
1. **Plan**: What you will do and why
2. **Files**: Which files will change or be created
3. **Commands**: What to run (copy-paste ready)
4. **Test**: How to verify it works (manual steps)
5. **Risks**: What could go wrong and next steps`,
  },
  {
    slug: "feature-builder",
    name: "feature-builder",
    title: "Feature Builder",
    description:
      "Structured workflow for implementing a new feature. Returns a plan, files list, commands, test steps, and rollback plan.",
    category: "building",
    categoryLabel: CATEGORY_META.building.label,
    accent: CATEGORY_META.building.accent,
    icon: Hammer,
    command: {
      name: "/feature-builder",
      usage: "/feature-builder [describe the feature you want]",
      hint: "Structured feature implementation workflow",
    },
    content: `---
name: feature-builder
description: "Structured workflow for implementing a new feature when you have no coding experience. Returns a plan, files list, commands, manual test steps, and rollback plan. Use when the user wants to add a feature to their project."
---

# Feature Builder

The user wants to implement a new feature. They have no coding background. Guide them through a structured, safe process.

## Step 1: Understand the Feature

Ask the user to describe:
- What the feature should do (in their own words)
- Who will use it
- What it should look like (screenshots, sketches, or descriptions are all fine)

If the description is vague, propose 2-3 concrete interpretations and ask which one is closest.

## Step 2: Create the Plan

Generate a plan with exactly these sections:

1. **Goal**: One sentence describing the feature
2. **Steps**: 5-10 numbered steps, each with a single goal
3. **Files**: List every file that will be created or changed
4. **Dependencies**: Any new libraries needed (ask before installing)
5. **Commands**: Copy-paste terminal commands to run
6. **Manual Test**: Step-by-step instructions to verify the feature works
7. **Rollback Plan**: How to undo the changes if something breaks

## Step 3: Implement

- Build the smallest vertical slice first: input > minimal processing > visible output
- Implement one step at a time; confirm each step works before moving to the next
- Use the simplest libraries and hosted services available
- Target a visible, working demo in under 60 minutes

## Step 4: Verify

After implementation:
- Run the project and capture any errors
- Walk the user through the manual test steps
- If errors occur, explain them in plain English and propose fixes
- Ask: "Does this match what you had in mind?"

## Constraints

- Never add features the user did not ask for
- Never make changes outside the scope of this feature
- Keep changes minimal, testable, and reversible
- Prefer high-level libraries over low-level implementations`,
  },
  {
    slug: "bugfix-doctor",
    name: "bugfix-doctor",
    title: "Bugfix Doctor",
    description:
      "Systematic bug-fixing workflow. Walks through reproduce, isolate, fix, test, and verify. Explains all errors in plain English.",
    category: "fixing",
    categoryLabel: CATEGORY_META.fixing.label,
    accent: CATEGORY_META.fixing.accent,
    icon: Bug,
    command: {
      name: "/bugfix-doctor",
      usage: "/bugfix-doctor [paste the error or describe the symptom]",
      hint: "Systematic bug-fixing with plain English explanations",
    },
    content: `---
name: bugfix-doctor
description: "Systematic bug-fixing workflow for non-coders. Walks through reproduce, isolate, fix, test, and verify. Explains all errors in plain English. Use when something is broken and the user does not understand why."
---

# Bugfix Doctor

Something is broken and the user does not understand why. Walk them through a systematic fix using plain English at every step.

## Step 1: Reproduce

Ask the user:
- What did you expect to happen?
- What actually happened?
- Can you show me the error? (screenshot, error message, or description)

If they provide an error message, translate it into plain English before doing anything else.

## Step 2: Isolate

- Identify the most likely root cause
- Explain the cause in one sentence without jargon
- If multiple causes are possible, list them ranked by likelihood
- Show the user exactly which file and which section contains the problem

## Step 3: Fix

- Apply the smallest possible change that fixes the issue
- Never refactor unrelated code during a bugfix
- Never change more than 3 files for a single bug
- Explain what you changed and why in plain English

## Step 4: Test

- Run the project and verify the fix
- Walk the user through the same steps that triggered the bug
- Confirm the bug is gone
- Check that nothing else broke (run existing tests if available)

## Step 5: Report

Return exactly these sections:

1. **Symptom**: What the user saw (their words)
2. **Cause**: What went wrong (plain English)
3. **Fix**: What was changed (file names and a one-line summary per file)
4. **Verification**: How to confirm it works
5. **Prevention**: One suggestion to avoid this type of bug in the future

## Rules

- Always explain errors in plain English first, before showing code
- Never blame the user for the bug
- If the fix is uncertain, say so and propose a safe experiment
- If you cannot find the cause, say so honestly and suggest next steps`,
  },
  {
    slug: "scaffold-app",
    name: "scaffold-app",
    title: "Scaffold App",
    description:
      "Creates a new application from scratch with one working route and one visible page. Solves the blank canvas problem.",
    category: "building",
    categoryLabel: CATEGORY_META.building.label,
    accent: CATEGORY_META.building.accent,
    icon: Rocket,
    command: {
      name: "/scaffold-app",
      usage: "/scaffold-app [describe what you want to build]",
      hint: "Creates a new app from scratch with one working page",
    },
    content: `---
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

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir
cd my-app
\`\`\`

Then immediately create:
1. A landing page with a heading, subtitle, and one call-to-action button
2. A second page linked from the landing page (the core feature page, even if empty)
3. A clean layout with navigation between the two pages

## Step 3: Generate AGENTS.md

AGENTS.md is a "README for agents": a dedicated, predictable place to provide context and instructions that help AI coding agents work on the project. It works across Cursor, Claude Code, OpenAI Codex, Google Jules, Aider, Windsurf, GitHub Copilot, and many more tools (see agents.md for the full list).

Create an \`AGENTS.md\` file at the project root with these sections, filled in based on the user's project:

\`\`\`markdown
# AGENTS.md

## Project Overview
[One paragraph: what this project does and who it's for]

## Setup Commands
- Install deps: \\\`pnpm install\\\`
- Start dev server: \\\`pnpm dev\\\`
- Build for production: \\\`pnpm build\\\`
- Run linter: \\\`pnpm lint\\\`
- Run tests: \\\`pnpm test\\\`

## Tech Stack
- Framework: [e.g., Next.js 15 with App Router]
- Language: [e.g., TypeScript]
- Styling: [e.g., Tailwind CSS v4]
- Database: [e.g., Supabase, or "None yet"]
- Auth: [e.g., NextAuth.js, or "None yet"]
- Deployment: [e.g., Vercel]

## File Structure
- \\\`app/\\\` — Pages and layouts (App Router)
- \\\`components/\\\` — Reusable UI components
- \\\`lib/\\\` — Utility functions and shared logic
- \\\`types/\\\` — TypeScript type definitions
- \\\`public/\\\` — Static assets (images, fonts)

## Code Style
- TypeScript strict mode
- Functional components with hooks; no class components
- Server components by default; add "use client" only when needed
- kebab-case for file names, PascalCase for component names
- Validate all user input with Zod
- Use descriptive variable names (no abbreviations)

## Testing Instructions
- Run \\\`pnpm test\\\` to execute the full test suite
- Add or update tests for any code you change
- Fix any test or type errors until the suite is green
- After moving files or changing imports, run \\\`pnpm lint\\\`

## Security Considerations
- Never hardcode secrets or API keys; use \\\`.env.local\\\` and environment variables
- Never commit \\\`.env.local\\\` to version control
- Ask before database writes or destructive operations
- Ask before deploying to production
- Propose plans before large refactors

## PR Instructions
- Title format: \\\`[feature/fix/chore] Short description\\\`
- Always run \\\`pnpm lint\\\` and \\\`pnpm test\\\` before committing
- Keep diffs small and focused on a single change
- Include a manual test path in the PR description
\`\`\`

### Why AGENTS.md matters

- README.md is for humans. AGENTS.md complements it with the extra context coding agents need: build steps, test commands, and conventions.
- One AGENTS.md works across many agents, so the user is not locked into a single tool.

### Nested AGENTS.md for larger projects

If the project grows into a monorepo, place an additional AGENTS.md inside each package. Agents read the nearest file in the directory tree, so the closest one takes precedence.

## Step 4: Generate PRD.md

Create a \`PRD.md\` (Product Requirements Document) at the project root. This is the user's plain-English blueprint. The AI references it as the source of truth for what to build.

\`\`\`markdown
# Product Requirements Document

## What Is This?
[One sentence: "An app that helps [who] do [what] by [how]"]

## Who Is It For?
[Describe the target user in 2-3 sentences.]

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

## Success Criteria
- [ ] User can [core action 1]
- [ ] User can [core action 2]
- [ ] App handles [edge case] gracefully
- [ ] App is deployed and accessible via a public URL

## Domain Constraints
[List any regulations, compliance requirements, or professional rules.]

## Out of Scope (Save for Later)
- [Feature to add in V2]
- [Integration to add later]
\`\`\`

Tell the user: "Fill this out before we start building. Even one sentence per section is enough."

## Step 5: Add Remaining Config Files

Add these files to the project root:
- \`.cursorrules\` with the non-coder guardrails (from the non-coder-mode skill)
- \`.cursor/rules/beginner-mode.mdc\` for communication style
- \`.cursor/rules/safety.mdc\` for deletion/deployment safety rules
- \`.gitignore\` that excludes \`.env.local\`, \`node_modules\`, \`.next\`, etc.

## Step 6: Run and Verify

- Start the dev server: \`npm run dev\`
- Open the browser at \`localhost:3000\`
- Walk the user through what they see
- Confirm both pages load and navigation works

## Output

Return exactly:
1. **Commands**: Every terminal command to run (copy-paste ready)
2. **Files Created**: List of every file with a one-line description
3. **What You See**: Description of what the app looks like in the browser
4. **AGENTS.md**: Confirm it was created and explain that it works across all major AI coding tools
5. **PRD.md**: Remind the user to fill it out before building features
6. **Next Steps**: 2-3 suggested features to build first`,
  },
  {
    slug: "demo-prep",
    name: "demo-prep",
    title: "Demo Prep",
    description:
      "Produces a step-by-step live demo script for hackathon presentations. Covers the problem, walkthrough, and outcome with a backup plan.",
    category: "shipping",
    categoryLabel: CATEGORY_META.shipping.label,
    accent: CATEGORY_META.shipping.accent,
    icon: Presentation,
    command: {
      name: "/demo-prep",
      usage: "/demo-prep [app name or description]",
      hint: "Generates a timed demo script with backup plan",
    },
    content: `---
name: demo-prep
description: "Produces a step-by-step live demo script for hackathon presentations. Covers the problem, the app walkthrough, and the outcome. Includes a backup plan. Use before presenting at a hackathon or demo day."
---

# Demo Prep

The user is about to present their project at a hackathon or demo day. Help them create a polished, timed demo script that tells a compelling story.

## Step 1: Gather Context

Ask the user:
- What does your app do? (one sentence)
- Who is it for?
- What is the single most impressive thing it does?
- How long is your presentation slot? (default: 3 minutes)
- Will you do a live demo, recorded video, or slides?

## Step 2: Write the Demo Script

Structure the script in three acts:

### Act 1: The Problem (30 seconds)
- One sentence describing the pain point
- One concrete example or statistic that makes it real
- "What if there was a better way?"

### Act 2: The Solution (90 seconds)
- Show the app running (live or recorded)
- Walk through the core user flow step by step
- Highlight the "wow moment" (the single most impressive feature)
- Keep clicks to a minimum; narrate what is happening

### Act 3: The Impact (30 seconds)
- What changes because this exists?
- One metric, testimonial, or future vision
- Clear closing statement

## Step 3: Prepare the Backup Plan

- Record a screen capture of the full demo flow (in case live demo fails)
- Prepare 2-3 screenshots of key screens as fallback slides
- Test the app on the presentation machine/network before going on stage
- Have the live URL ready as a backup to localhost

## Step 4: Rehearse Checklist

- [ ] Timed the full presentation (fits within the slot)
- [ ] Practiced at least 3 times out loud
- [ ] Tested the app on the demo machine
- [ ] Backup video/screenshots are ready
- [ ] Opening line is memorized (no fumbling the start)
- [ ] Closing line is memorized (end strong)

## Output

Return:
1. **Script**: The full narrated demo script with timestamps
2. **Click Path**: Exact sequence of actions to perform during the demo
3. **Backup Plan**: What to do if the live demo breaks
4. **Q&A Prep**: 3-5 likely questions judges will ask, with suggested answers`,
  },
  {
    slug: "domain-to-spec",
    name: "domain-to-spec",
    title: "Domain to Spec",
    description:
      "Turns domain expertise into a technical specification. Takes your profession and desired outcome, lists constraints, and proposes the simplest buildable flow.",
    category: "building",
    categoryLabel: CATEGORY_META.building.label,
    accent: CATEGORY_META.building.accent,
    icon: Compass,
    command: {
      name: "/domain-to-spec",
      usage: "/domain-to-spec [your profession] [what you want to build]",
      hint: "Translates domain expertise into a buildable spec",
    },
    content: `---
name: domain-to-spec
description: "Turns domain expertise into a technical specification. Takes your profession and desired outcome, lists constraints, identifies error-prone steps, and proposes the simplest buildable flow. Modeled after hackathon-winning approaches from lawyers and doctors. Use when a domain expert wants to build something from their field."
---

# Domain to Spec

The user is a domain expert (doctor, lawyer, teacher, consultant, etc.) who wants to build a tool for their professional field. They understand the problem deeply but have no coding experience. Your job is to translate their expertise into a buildable specification.

## Step 1: Extract Domain Knowledge

Ask the user:

> "I'm a {profession} building a tool to {outcome}."

Then ask follow-up questions:
- What are the regulations or constraints in your field that this tool must respect?
- What are the 3 most error-prone or time-consuming steps in the current process?
- Who will use this tool? (you, your patients/clients, your staff, the public)
- What does success look like? (one sentence)

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

\`\`\`
INPUT: [what the user enters or uploads]
  |
PROCESS: [what happens behind the scenes]
  |
OUTPUT: [what the user sees or downloads]
\`\`\`

## Step 4: Generate the Spec

Return exactly:
1. **One-Sentence Summary**: What this tool does
2. **Target User**: Who uses it and when
3. **Domain Constraints**: Rules, regulations, or standards it must follow
4. **Core Flow**: The input > process > output pipeline
5. **Data Model**: What information the app stores (in plain English)
6. **Risk Areas**: The 3 things most likely to go wrong
7. **MVP Scope**: What to build first (fits in one week)
8. **Out of Scope**: What to save for later

## Inspiration

This skill is modeled after two hackathon-winning approaches:

- **CrossBeam** (1st place, Anthropic hackathon): A lawyer encoded California ADU permit regulations into a tool that checks compliance and suggests corrections. The key insight: 28 reference documents became validation rules.

- **PostVisit.AI** (3rd place, Anthropic hackathon): A cardiologist built a platform that processes visit transcripts into patient-friendly summaries, medication checklists, and follow-up schedules. The key insight: clinical expertise became structured output templates.

Both winners succeeded because they understood the problem domain better than any developer could. Your domain expertise is the most valuable input.`,
  },
];

export const STANDALONE_COMMANDS: SkillCommand[] = [
  {
    name: "/explain",
    usage: "/explain [paste code, an error, or describe what you want to understand]",
    hint: "Explains code or errors in plain English for non-coders",
  },
];

export const ALL_COMMANDS: SkillCommand[] = [
  ...NON_CODER_SKILLS.map((s) => s.command),
  ...STANDALONE_COMMANDS,
];

export function getSkillBySlug(slug: string): NonCoderSkill | undefined {
  return NON_CODER_SKILLS.find((s) => s.slug === slug);
}

export function getSkillsByCategory(
  category: SkillCategory
): NonCoderSkill[] {
  return NON_CODER_SKILLS.filter((s) => s.category === category);
}

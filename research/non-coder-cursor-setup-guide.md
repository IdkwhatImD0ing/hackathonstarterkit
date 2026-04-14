# The Non-Coder's Guide to Winning Hackathons with Cursor & Claude

> Proven strategies, configurations, and systematic skills for professionals (doctors, lawyers, etc.) with zero coding experience.

---

## Table of Contents

1. [The Proof: Non-Coders Are Winning](#1-the-proof-non-coders-are-winning)
2. [The Mindset Shift](#2-the-mindset-shift)
3. [Cursor Setup (Step by Step)](#3-cursor-setup-step-by-step)
4. [The Three Files That Matter](#4-the-three-files-that-matter)
5. [System Prompts & Rules (Copy-Paste Ready)](#5-system-prompts--rules-copy-paste-ready)
6. [The Workflow (Before, During, After)](#6-the-workflow-before-during-after)
7. [Prompting Strategies](#7-prompting-strategies)
8. [Common Pitfalls](#8-common-pitfalls)
9. [Recommended MCP Servers](#9-recommended-mcp-servers)
10. [Hackathon-Specific Playbook](#10-hackathon-specific-playbook)
11. [Sources](#11-sources)

---

## 1. The Proof: Non-Coders Are Winning

These aren't hypotheticals. These are real people with zero traditional coding backgrounds who beat thousands of developers.

### Anthropic's "Built with Opus 4.6" Hackathon (Feb 2026)
- **13,000 applicants. 500 accepted. Only 1 of the 5 winners was a professional developer.**

| Place | Person | Day Job | Project | Build Time |
|-------|--------|---------|---------|------------|
| **1st** | Mike Brown | Personal Injury Lawyer | CrossBeam (ADU permit assistant) | 6 days |
| **3rd** | Dr. Michal Nedoszytko | Interventional Cardiologist | PostVisit.AI (post-visit care platform) | 7 days |
| Keep Thinking Prize | Kyeyune Kazibwe | Ugandan Road Technician | TARA (dashcam-to-road-appraisal pipeline) | 7 days |
| Creativity Award | Asep Bagja | Electronic Musician | AI music accompaniment controller | 7 days |

**Mike Brown (1st place)** built CrossBeam because his friend builds backyard cottages and spent months fighting permit rejections. California ADU permits have a 90%+ first-submission rejection rate. His app includes 28 reference files covering the HCD ADU Handbook and California Government Code, a corrections interpreter, and a three-mode city research system. A developer without his legal expertise would "build something that hallucinates plausible nonsense."

**Dr. Nedoszytko (3rd place)** coded during hospital breaks, airport lounges, and on a flight from Brussels to San Francisco. He wrote zero Python, zero JavaScript. Everything was built through Claude Code with the Opus 4.6 extended context window. His stack: PHP 8.4, Laravel 12, Vue 3, TypeScript 5.9. 349 commits in 7 days. His quote: *"Programming is solved."*

### Nina Kolari: 51-Year-Old Entrepreneur Wins Cursor Hackathon
- **Event:** 3-hour Cursor hackathon in Chiang Mai, Thailand (27 teams)
- **Background:** 51-year-old entrepreneur, no CS degree. Learned iOS dev the previous year using AI tools.
- **Project:** Aphasio, a speech practice app for people with aphasia (built for her mother who had a stroke)
- **Result:** Won first place, solo, beating all 27 teams (most had 2-4 members)
- **Her key insight:** "Product sense beats coding skill. Half the teams had better engineers, but they solved vague problems. I solved a specific, painful one."

### Rene Turcios: 200+ Hackathons Won Without Writing Code
- Former professional Yu-Gi-Oh! player. No coding knowledge whatsoever.
- Won his first hackathon by prompting ChatGPT in plain English to build a lo-fi music converter.
- Companies now hire him to complete projects in hours that would take dev teams weeks.
- His quote: *"Anyone can build anything they want."*

### OpenPlay Music Hackathon (2025)
- 2nd place (Samplify) was built by two MLC staff members using vibe coding. Neither was a software developer.
- Quote from the organizer: *"The fact that two winners weren't software developers proved that domain expertise and creative problem-solving often matter more than pure technical skills."*

---

## 2. The Mindset Shift

You are not learning to code. You are learning to **manage intent**.

The workflow is:
1. **Shape** what you're building (plain English)
2. **Rules** for how it should behave (configuration files)
3. **Stack** choices (let the AI recommend, you approve)
4. **Execute** one feature at a time (AI writes, you review)

Think of yourself as the **architect approving blueprints**, not the bricklayer. Your domain expertise (medicine, law, business) is the hard-to-acquire skill. The code is the easy part now.

---

## 3. Cursor Setup (Step by Step)

### Installation (5 minutes, zero terminal commands)
1. Download from [cursor.com](https://cursor.com)
2. Sign in with Google, GitHub, or email
3. Choose a theme and font size (16-18px recommended)
4. Enable AI features when prompted
5. Select Claude as your default model

### Must-Enable Settings

| Setting | Where | Why |
|---------|-------|-----|
| Codebase Indexing | Cursor Settings > Features | AI understands your entire project |
| Agent Mode | Cursor Settings > Features > Agent | Enables autonomous multi-step work |
| Larger font size (16-18px) | Settings > Editor > Font Size | Reduces eye strain |
| Auto-save | Settings > Files > Auto Save | Prevents losing work |
| Word wrap | Settings > Editor > Word Wrap: "on" | See full lines without scrolling |
| Minimap off | Settings > Editor > Minimap: disabled | Less visual noise |

### The Four Shortcuts You Need to Memorize

| Shortcut | What It Does | When to Use |
|----------|-------------|-------------|
| **Tab** | Accept AI suggestion | While typing, accept what it offers |
| **Ctrl+K** | Inline edit | Select code, describe the change in English |
| **Ctrl+L** | Chat with AI | Ask questions, get explanations |
| **Ctrl+I** | Composer/Agent mode | Multi-file creation and editing |

### Recommended Extensions

| Extension | What It Does | Why It Helps Non-Coders |
|-----------|-------------|------------------------|
| **Prettier** | Auto-formats code on save | Never worry about code style or syntax rules |
| **Error Lens** | Shows errors inline, right where they occur | See problems immediately instead of hunting through terminal output |
| **Better Comments** | Color-codes comments by type (TODO, alert, query) | Leave structured notes for yourself and the AI directly in code |
| **Thunder Client** | Test API endpoints without code | Verify the backend works with a visual interface, no terminal needed |
| **DotENV** | Syntax highlighting for `.env` files | Prevents mistakes in secret key configuration |
| **GitHub Pull Requests** | Manage PRs inside the editor | Review AI's changes without switching to the browser |
| **Auto Rename Tag** | Keeps HTML tags in sync | One less thing to manually track |

---

## 4. The Three Files That Matter

Your entire "non-coder configuration" lives in three files. Everything else is optional.

### File 1: `.cursor/rules/beginner-mode.mdc`
This tells the AI how to behave with you. It's your permanent personality setting for the project.

### File 2: `AGENTS.md` (or `CLAUDE.md`)
This tells the AI about your project: what it is, what tech it uses, what commands to run. Works across Cursor, Claude Code, and other AI tools.

### File 3: `PRD.md` (Product Requirements Document)
This is your blueprint. Write it in plain English before any code gets generated. The AI references it as the source of truth.

**That's it.** Three files. Everything below gives you the exact contents to put in them.

---

## 5. System Prompts & Rules (Copy-Paste Ready)

### `.cursorrules` (Root-Level, Proven Non-Coder Template)

This is the battle-tested template synthesized from hackathon winners and community best practices. Place it at the root of your project.

```markdown
---
PROJECT TYPE
- Non-coder using Cursor + Claude Code to ship a working demo fast.
- Prioritize shippable UX over perfect architecture. Just make it work end-to-end.

OPERATING PRINCIPLES
- Write smallest vertical slice first: input > minimal processing > visible output.
- Always create/extend tests and a demo script.
- Ask for clarification when requirements are ambiguous; propose 2-3 options with tradeoffs.
- Prefer high-level libraries and hosted services.

PLANNING RULES
- Before coding: generate a 5-10 step plan with file list, dependencies, and a manual test path.
- After coding: run project, capture logs, and propose fixes if errors occur.
- Keep diffs small; commit every working increment with clear message.

CODING STYLE
- Clear, commented code for non-coders to read. Avoid cleverness.
- Write README quickstart: install, run, test, demo steps.

GUARDRAILS
- Never introduce secrets into source. Use environment variables.
- If blocked >10 minutes, switch approach or scaffold a simpler path.

CHECKLISTS
- New feature: plan > scaffold > run > test > iterate > commit.
- Bugfix: reproduce > isolate > minimal fix > test > commit.

OUTPUT FORMAT
- For each task, return: Plan, Files to change/create, Commands to run, Manual test steps, Risks/Next steps.
---
```

### `.cursor/rules/beginner-mode.mdc` (Communication Style)

```markdown
---
description: Non-coder guardrails and communication style
alwaysApply: true
---

## Who I Am
I am not a programmer. I am a professional building a tool for my domain.
Always explain technical decisions in plain language.
Never assume I know programming terminology.

## How to Behave
- Explain WHAT you changed and WHY before showing code
- Break complex tasks into small, reviewable steps
- Ask for clarification if my request is ambiguous
- Never add features I didn't ask for
- Never import external libraries without asking first
- When something fails, explain the error in plain English
- After generating code, ask if I need modifications
- Proactively complete tasks rather than requiring multiple prompts

## Code Generation Rules
- Write complete, functional code (never partial snippets)
- Use descriptive variable names (no single letters)
- Keep files small and focused
- Include error handling everywhere
- Never use deprecated APIs
- Never skip validation

## Safety
- Never delete files without asking first
- Never deploy without explicit approval
- Never commit secrets or API keys
- Show me what you'll do before destructive operations
- Create backups before modifying important files
```

### `.cursor/rules/general.mdc`

```markdown
---
description: Project tech stack and conventions
alwaysApply: true
---

## Tech Stack
- Framework: Next.js 15 with App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Database: [your choice, e.g., Supabase]
- Deployment: Vercel

## Commands
- Dev server: `pnpm dev` (runs on localhost:3000)
- Build: `pnpm build`
- Lint: `pnpm lint`

## File Conventions
- Pages: `app/` directory (App Router)
- Components: `components/` directory
- Utilities: `lib/` directory
- Types: `types/` directory

## Code Style
- Use functional components with hooks, no class components
- Use server components by default, add "use client" only when needed
- kebab-case for file names, PascalCase for component names
- Use Zod for all input validation
```

### `.cursor/rules/safety.mdc`

```markdown
---
description: Critical safety rules to prevent disasters
alwaysApply: true
---

- Always ask for confirmation before writing to the database
- Never deploy to production without explicit approval
- Do not delete any files without explicit confirmation
- Never make large refactors without proposing a plan first
- Never run commands that modify infrastructure without asking
- Propose plans first, wait for approval before editing
- Work in vertical slices (one complete feature at a time)
- Keep changes minimal, testable, and reversible
```

### Global User Rules (Cursor Settings > General > Rules for AI)

Paste this into your global Cursor settings so it applies to ALL projects:

```
You are an experienced developer paired with a non-technical user.
Always explain what you're doing in plain language before writing code.
Ask for clarification if requirements are unclear.
Only implement what was explicitly requested.
Keep changes minimal and focused.
When errors occur, explain them in simple terms.
Proactively complete tasks rather than requiring multiple prompts.
Follow existing project patterns exactly.
Never use jargon without defining it first.
```

### `AGENTS.md` Template

AGENTS.md is a "README for agents": a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project. Think of it as the complement to README.md, which is for humans. AGENTS.md contains the extra, sometimes detailed context coding agents need: build steps, tests, and conventions that might clutter a README or aren't relevant to human contributors.

One AGENTS.md works across many AI coding tools: Cursor, Claude Code, OpenAI Codex, Google Jules, Aider, Windsurf, GitHub Copilot, and many more (see [agents.md](https://agents.md/) for the full ecosystem). Over 60,000 open-source projects already use it.

```markdown
# AGENTS.md

## Project Overview
[One paragraph describing what this project does and who it's for]

## Setup Commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build for production: `pnpm build`
- Run linter: `pnpm lint`
- Run tests: `pnpm test`

## Tech Stack
- Framework: Next.js 15 with App Router
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS v4
- Database: [your choice, e.g., Supabase]
- Auth: [your choice, e.g., NextAuth.js]
- Deployment: Vercel

## File Structure
- `app/` — Pages and layouts (Next.js App Router)
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
- Use functional patterns where possible

## Testing Instructions
- Run `pnpm test` to execute the full test suite
- Add or update tests for any code you change
- Fix any test or type errors until the suite is green
- After moving files or changing imports, run `pnpm lint`
- To focus on one test: `pnpm vitest run -t "test name"`

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

## Safety Rules
- Ask before deleting files
- Ask before database writes
- Ask before deploying
- Propose plans before large changes
- Keep changes minimal and reversible
```

**Large monorepo?** Place an additional AGENTS.md inside each package directory. Agents automatically read the nearest file in the directory tree, so the closest one takes precedence and every subproject can ship tailored instructions.

### `PRD.md` Template (Fill This Out Before Coding)

The PRD is your plain-English blueprint. Fill it out before any code gets generated. The AI references it as the source of truth for what to build. Even one sentence per section is enough to get started.

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

### Reusable Skill Templates (Save in `skills/` folder)

These are prompt templates for common development tasks. Save each as a markdown file and reference them when you need that type of work done.

**`skills/feature_request.md`**
```markdown
Goal: Implement {feature}.
Return: Plan (5-10 steps), Files list, Commands, Manual test, Rollback plan.
Constraints: Use simplest libs, avoid breaking changes, visible demo in <60 minutes.
Context: Repo layout is {summary}. Use environment vars for secrets.
```

**`skills/bugfix_refresh.md`**
```markdown
Goal: Fix bug: {symptom}.
Steps: 1) Reproduce 2) Identify likely root cause 3) Minimal diff fix 4) Add/adjust test 5) Manual verify.
Return: Repro steps, Suspected cause, Diff, Test changes, Commands, Logs, Next checks.
```

**`skills/scaffold_app.md`**
```markdown
Goal: Scaffold a {stack} app with one working route and one visible page.
Return: Commands to create project, Files created, Sample code, Run/test steps.
```

**`skills/integration_spec.md`**
```markdown
Goal: Integrate API {service}.
Provide auth flow, minimal SDK usage, error handling, .env template, and test call.
```

**`skills/demo_script.md`**
```markdown
Goal: Produce a step-by-step live demo script (2-4 minutes) showing the problem,
the app, and the outcome, with backup plan.
```

---

## 6. The Workflow (Before, During, After)

### Before You Write Any Code

1. **Fill out PRD.md** in plain English. Describe what you're building, for whom, and what it does.
2. **Set up your three files** (beginner-mode.mdc, general.mdc, AGENTS.md) using the templates above.
3. **Start in Plan Mode** (Shift+Tab in Composer). Paste your PRD and ask: "Based on this PRD, create an implementation plan. Break it into small steps. Each step should have a single goal and a way to verify it works."
4. **Review the plan.** If anything is unclear, ask questions. Don't approve until you understand every step.

### During Development

1. **One feature per chat session.** Start a new chat for each distinct feature. Long chats degrade AI quality.
2. **Use Agent Mode** (Ctrl+I). It automatically finds relevant files, makes changes, and runs commands.
3. **Verify after every change.** Check your dev server at localhost:3000. If something looks wrong, screenshot it and paste it into the chat.
4. **Debug with full error messages.** When something breaks, paste the COMPLETE error message. Don't summarize.
5. **Commit at every working checkpoint.** Tell the agent: "Commit these changes with a descriptive message." This gives you save points to revert to.

### After Each Feature

1. **Test the feature end-to-end.** Click through every path a user would take.
2. **Ask the AI to review.** Prompt: "Review the code you just wrote. Are there any bugs, security issues, or edge cases we missed?"
3. **Update your PRD.** Check off completed features. Note any changes from the original plan.

---

## 7. Prompting Strategies

### The Formula

> **What you want** + **specific behavior** + **constraints**

### Examples

| Bad Prompt | Good Prompt |
|---|---|
| "Make a dashboard" | "Build a dashboard showing monthly revenue as a bar chart, active projects listed by client name, and pending invoices sorted by due date. Use the existing Tailwind theme." |
| "Fix this bug" | "I'm getting this error: [paste full error]. It happens when I click the submit button on the contact form. Fix it without changing the form layout." |
| "Add authentication" | "Add email/password authentication using NextAuth.js v5. Include a sign-up page, a login page, and a protected dashboard that redirects to login if not authenticated." |
| "Make the button better" | "Change the button color to blue (#0ea5e9), increase padding to 12px 24px, round the corners to 8px, and add a subtle shadow on hover." |

### Session Kickoff Prompt (Paste at the Start of Every Session)

```
You are a senior, safety-conscious coding partner helping a subject-matter expert
with no coding background ship a working demo rapidly using Cursor IDE and Claude Code.
Follow the repository's .cursorrules and AGENTS.md strictly. Always:
1) Create a concise plan with files and commands before coding
2) Implement the smallest vertical slice end-to-end
3) Run or simulate the app; capture errors; propose concrete fixes
4) Provide copy-paste commands and manual test steps
5) Keep diffs small and production-safe; manage secrets via env vars only
If requirements are ambiguous, list 2-3 viable options with tradeoffs and recommend one.
```

### Reconstructed Winner Prompt Patterns

These templates are modeled after the strategies used by hackathon winners like Mike Brown (CrossBeam) and Dr. Nedoszytko (PostVisit.AI).

**Domain-to-Spec Prompt (General, works for any profession):**
```
I'm a {profession} building a tool to {outcome}. List regulations/constraints,
the 3 most error-prone steps, and propose the simplest end-to-end flow I can
demo this week. Return files, commands, data model, and a manual script.
```

**Bureaucracy Unroller (for regulatory/legal/compliance tools, like CrossBeam):**
```
Parse agency checklist; map each item to documents, forms, and acceptance criteria.
Build a stepper UI and a diff-based "correction explainer" from reviewer notes.
```

**Transcript-to-Guidance (for clinical/medical tools, like PostVisit.AI):**
```
Input: visit transcript + EHR fields.
Output: patient summary at 8th-grade reading level, medication checklist,
red-flag guidance, and follow-up schedule. Include disclaimers.
```

**Evidence-Grounded Validator (for any domain with source documents):**
```
Given these source statutes/docs/snippets, generate validation rules and examples.
Output: JSON schema + test cases + failure messages in plain English.
```

### Power Prompts for Non-Coders

**Starting a new project:**
```
I want to create a [type of app]. Help me set up the project.
We're going to use Next.js with TypeScript and Tailwind CSS.

Here are the features I want:
- [Feature 1]
- [Feature 2]
- [Feature 3]

Start by creating the project structure and a basic layout.
Don't add any features yet, just the skeleton.
```

**Debugging with screenshots:**
1. Take a screenshot of the broken UI
2. Attach it to the Cursor chat
3. Say: "This page looks wrong. [Describe what's wrong]. Fix it to match [what it should look like]."

**Before any major change:**
```
Read the entire codebase first and confirm alignment.
Then tell me:
1. What you are about to build
2. What is in scope
3. What is out of scope
4. The safest path to implement this

Do not generate code until I approve the plan.
```

**After every feature:**
```
Review the code you just wrote. Check for:
1. Bugs or logic errors
2. Security vulnerabilities
3. Missing error handling
4. Edge cases we didn't consider
5. Anything that could break other features

List any issues you find.
```

---

## 8. Common Pitfalls

These are the mistakes that cost non-coders the most time. Every one of them is avoidable.

| Pitfall | Why It Hurts | How to Avoid |
|---|---|---|
| **Accepting code without reading the diff** | Hidden bugs, deleted features, security holes | Always review the green/red diff before clicking Accept |
| **Vague prompts** | AI fills in gaps with generic defaults | Be specific about users, actions, data, and appearance |
| **No `.cursorrules` file** | AI reinvents conventions every session | Set up your rules once, they persist forever |
| **Monolithic prompts** | 500-word prompts cause AI to simplify and drop features | One feature at a time, one chat per feature |
| **Context drift** | After 20-30 messages, AI contradicts earlier decisions | Start fresh chats for each major feature |
| **Skipping version control** | No way to revert when changes break things | Commit at every working checkpoint |
| **Letting AI decide architecture** | Incoherent structure that's impossible to maintain | You define the shape; AI fills in details |
| **Not testing before building on top** | Bugs compound exponentially | Test each feature before starting the next one |
| **Watching the agent delete code and not stopping it** | Losing working features | If you see large deletions, click Stop immediately |
| **Too many MCP servers enabled** | Wastes context window tokens, confuses the AI | Start with 1-2 servers, add more only as needed |
| **Learning the tool during the hackathon** | Wasted hours on setup instead of building | Practice with Cursor for at least a week before the event |
| **Building for a hypothetical user** | Judges can tell when you don't understand the problem | Solve YOUR problem, from YOUR domain expertise |

---

## 9. Recommended MCP Servers

Start with Context7 only. Add others as you need them.

| Server | What It Does | When to Add It |
|--------|-------------|----------------|
| **Context7** | Fetches up-to-date library docs so the AI doesn't hallucinate API syntax | Day 1 (essential) |
| **GitHub** | Read PRs, check issues, manage repos | When collaborating with others |
| **Supabase** | Query Postgres directly, explore database schemas | When you add a database |
| **Figma** | Pull design specs and component layouts | When implementing designs |
| **Vercel** | Deploy, manage environment variables, view logs | When deploying |

### Context7 Setup (Your First MCP)

Add to your Cursor MCP config (`~/.cursor/mcp.json` or via Cursor Settings > MCP):

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

Then add "use context7" to your prompts when asking about library APIs, or set it in your cursor rules to always use it.

**Critical:** Cursor requires a full restart (not just window reload) for new MCP servers to take effect.

**Rule of thumb from hackathon winner Affaan Mustafa:** Have 20-30 MCPs in your config, but keep under 10 enabled at any time and under 80 tools active. Your 200k context window might shrink to 70k with too many tools enabled.

---

## 10. Hackathon-Specific Playbook

### Pre-Hackathon (1-2 Weeks Before)

- [ ] Install Cursor and get comfortable with the four shortcuts
- [ ] Set up your `.cursor/rules/` files using the templates in this guide
- [ ] Build one small practice project (a personal landing page or simple tool)
- [ ] Set up your GitHub account and learn to commit through Cursor
- [ ] Set up Vercel for one-click deployment from GitHub
- [ ] Identify 2-3 problems from your professional domain that software could solve

### Hackathon Day: Hour-by-Hour

**Hour 0-1: Planning (NO CODE)**
1. Pick the problem you understand most deeply from your domain
2. Fill out the PRD.md template
3. Set up your project with the starter files
4. Use Plan Mode to create an implementation plan
5. Get the skeleton scaffolded (layout, navigation, pages with placeholder content)

**Hour 1-3: Core Feature**
6. Build the single most important feature (the one that makes judges say "wow")
7. Test it thoroughly
8. Commit and deploy to Vercel (so you have a live URL early)

**Hour 3-5: Supporting Features**
9. Add 1-2 supporting features that make the core feature more useful
10. Test each one before moving to the next
11. Commit and deploy after each feature

**Hour 5-6: Polish**
12. Fix any visual issues (screenshots into chat work great here)
13. Add a landing/hero section that explains what the app does
14. Test the entire flow end-to-end one more time
15. Final deploy

**Last 30 Minutes: Demo Prep**
16. Write 3 sentences explaining: What is it? Who is it for? Why does it matter?
17. Prepare a 60-second walkthrough of the core feature
18. Have the live URL ready

### The Winning Formula (From Every Non-Coder Winner)

1. **Solve YOUR problem.** Every winner built something from their own professional domain. The cardiologist built for his patients. The lawyer built for her friend's business. The entrepreneur built for her mother. Judges can instantly tell the difference between "I understand this problem deeply" and "I googled a problem to solve."

2. **Domain expertise is the moat.** A developer without medical knowledge will build something that "hallucinates plausible nonsense" (Mike Brown's words). Your years of professional experience are worth more than any CS degree in this context.

3. **Ship fast, decide faster.** Nina Kolari won solo against 27 teams because she made decisions instantly while teams debated. Speed of decision-making trumps team size.

4. **Master the tool before the event.** Every winner had practiced extensively. Don't learn Cursor during the hackathon.

5. **Working backend beats pretty UI.** The most common failure mode for vibe-coded hackathon projects is an impressive UI with no real functionality underneath. Judges test your app. Make sure it actually works.

### Complete Starter Kit File Structure

This is the recommended drop-in structure for any new hackathon project. Clone it, fill in the templates, and start building.

```
your-hackathon-project/
├── .cursorrules              # AI behavior rules (proven non-coder template above)
├── AGENTS.md                 # Project context for AI (cross-tool compatible)
├── CLAUDE.md                 # Claude Code specific overrides (if using Claude Code CLI)
├── PRD.md                    # Your plain-English blueprint (fill out FIRST)
├── .cursor/
│   └── rules/
│       ├── beginner-mode.mdc # Communication style guardrails
│       ├── general.mdc       # Tech stack and conventions
│       └── safety.mdc        # Deletion/deployment safety rules
├── .mcp.json                 # MCP server configuration (start with 1-2 servers)
├── skills/
│   ├── feature_request.md    # Prompt template for new features
│   ├── bugfix_refresh.md     # Prompt template for fixing bugs
│   ├── scaffold_app.md       # Prompt template for scaffolding
│   ├── integration_spec.md   # Prompt template for API integrations
│   └── demo_script.md        # Prompt template for demo preparation
├── app/                      # Your application code (AI generates this)
├── tests/                    # Test files (AI generates this)
├── public/                   # Static assets (images, fonts)
├── .env.local                # Secrets (NEVER commit this)
├── .gitignore                # Excludes .env.local, node_modules, etc.
└── README.md                 # Quickstart: install, run, test, demo
```

### Starter Stack Commands (Copy-Paste)

**Web + API (Fast Path, Next.js):**
```bash
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir
cd my-app && npm install
```

**Web + API (Alternative, React + FastAPI):**
```bash
# Frontend
npm create vite@latest web -- --template react-ts
cd web && npm i axios zod && npm i -D vitest @testing-library/react

# Backend
cd .. && python -m venv .venv && source .venv/bin/activate
pip install fastapi uvicorn python-dotenv
```

**Database (Hosted, Beginner-Safe):**
Sign up for Supabase (free tier). Store access keys in `.env.local`. Never commit them.

---

## 11. Sources

### Hackathon Winners
- [Hadley Lab: The Lawyer Who Won](https://hadleylab.org/blogs/2026-03-22-the-lawyer-who-won/)
- [Seoul Economic Daily: Lawyers, Doctors Sweep AI Hackathon](https://en.sedaily.com/news/2026/02/25/lawyers-doctors-sweep-ai-hackathon-as-builder-era-dawns)
- [TechStory: Cardiologist Builds Patient Care App in 7 Days](https://techstory.in/cardiologist-builds-patient-care-app-in-7-days-places-third-at-anthropic-hackathon/)
- [Medium/TechX: The Day a Doctor Out-Coded 13k Developers](https://medium.com/techx-official/the-day-a-doctor-out-coded-13k-developers-at-anthropics-ai-hackathon-0d3c83e6163c)
- [Nina Kolari: I Joined a 3-Hour Hackathon](https://ninakolari.com/i-joined-a-3-hour-hackathon-and-build-an-iphone-app-here-are-my-biggest-takeaways/)
- [SF Standard: Rene Turcios Won 200+ Hackathons](https://sfstandard.com/2025/07/05/rene-turcios-hackathon-labubu-vibe-coding-chatgpt/)
- [Music Ally: Vibe Coding at OpenPlay Hackathon](https://musically.com/2025/06/13/vibe-coding-made-a-big-impact-at-openplays-first-hackathon/)
- [GitHub: CrossBeam](https://github.com/mikeOnBreeze/cc-crossbeam)
- [GitHub: PostVisit.AI](https://github.com/mnedoszytko/postvisit)

### Cursor Setup & Configuration
- [Cursor Blog: Agent Best Practices](https://cursor.com/blog/agent-best-practices)
- [The AI-Enabled Coder: Cursor Beginner's Guide](https://theaienabledcoder.com/ai-tools/cursor-beginners-guide/)
- [Momen: Beginner Tips for Non-Technical Users](https://momen.app/blogs/beginner-tips-cursor-for-non-techinical-users-getting-started/)
- [VibeCodex: Cursor Rules Templates](https://vibecodex.dev/guides/cursor-rules-templates)
- [SkillsPlayground: Cursor Rules Guide](https://skillsplayground.com/guides/cursor-rules/)
- [Awesome Cursor Rules (38k+ stars)](https://github.com/PatrickJS/awesome-cursorrules)
- [Cursor Agent Factory](https://github.com/gitwalter/cursor-agent-factory)
- [AI Project Starter](https://github.com/aussiegingersnap/ai-project-start)

### System Prompts & Rules
- [Moritz Kremb's Beginner .cursorrules](https://gist.github.com/karlhorky/fad6fabfcce2aab65c038e365d6ea6fd)
- [VibeMeta: 2026 Vibe Coding Cheat Sheet](https://vibemeta.app/blog/the-2026-vibe-coding-cheat-sheet)
- [CursorPractice: System Prompts](https://cursorpractice.com/en/cursor-tutorials/prompts/system-prompts)
- [Antigravity Lab: AGENTS.md Guide](https://antigravitylab.net/en/articles/tips/agents-md-guide)
- [CAIO: Claude Code for Non-Coders](https://www.thecaio.ai/blog/claude-code-for-non-coders)

### Vibe Coding Methodology
- [Andrej Karpathy: Vibe Coding](https://karpathy.ai/vibe-coding)
- [Vibe Coding Lite: Systematic Approach](https://vibecodinglite.dev/quickstart.html)
- [Argil.io: Practical Guide to Vibe Coding (600+ hours)](https://www.argil.io/playbooks/vibe-coding/practical-guide-to-vibe-coding)
- [Aditya Bawankule: Cursor for Non-Technical Founders](https://adityabawankule.io/guides/cursor-for-non-technical-founders)

### Hackathon Configuration
- [Affaan Mustafa: The Claude Code Setup That Won a Hackathon](https://jpcaparas.medium.com/the-claude-code-setup-that-won-a-hackathon-a75a161cd41c)
- [GitHub: Everything Claude Code (configs)](https://github.com/affaan-m/everything-claude-code)

### MCP Servers
- [BrainGrid: Cursor MCP Guide](https://www.braingrid.ai/blog/cursor-mcp)
- [NxCode: Cursor MCP Servers Complete Guide 2026](https://www.nxcode.io/resources/news/cursor-mcp-servers-complete-guide-2026)
- [Builder.io: Claude Code MCP Servers Guide](https://www.builder.io/blog/claude-code-mcp-servers)
- [Awesome MCP Servers (wong2)](https://github.com/wong2/awesome-mcp-servers)

### AGENTS.md & Project Structure
- [AGENTS.md Official Site](https://agents.md/)
- [How I Write My AGENTS.md Files (YouTube)](https://www.youtube.com/watch?v=6w88NVf2_lY)
- [Reddit: 2000+ Lines of Cursor Tips](https://www.reddit.com/r/cursor/comments/1patsy2/i_compiled_2000_lines_of_cursor_tips_cursorrules/)
- [Getting Better Results from Cursor AI with Simple Rules (Medium)](https://medium.com/@aashari/getting-better-results-from-cursor-ai-with-simple-rules-cbc87346ad88)

### Deep Research
- Full structured research data available at: `research/non-coder-hackathon-setup.json` (generated via Parallel deep research)

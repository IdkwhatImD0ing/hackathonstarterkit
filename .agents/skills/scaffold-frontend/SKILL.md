---
name: scaffold-frontend
description: "PRD-driven frontend scaffold. Reads AGENTS.md and PRD.md from the repo root and creates a Next.js + TypeScript + Tailwind app inside clients/ with pages, navigation, and placeholder components that match the PRD. Refuses to run if AGENTS.md and PRD.md do not exist. Run this AFTER domain-to-spec."
---

# Scaffold Frontend

This skill creates the frontend for the user's project inside a `clients/` directory at the repo root. The app is driven by the existing `PRD.md` and `AGENTS.md`. Every page, every navigation link, and every data type is derived from those two files.

## Preflight: PRD and AGENTS Must Exist

Before doing anything else, check that both files exist at the repo root:

```bash
test -f AGENTS.md && test -f PRD.md && echo OK || echo MISSING
```

If either file is missing, STOP and respond exactly:

> This skill cannot run yet. `AGENTS.md` and `PRD.md` must exist at the repo root before scaffolding the frontend. Run the `domain-to-spec` skill first, or run the `quickstart` skill to chain everything automatically.

Do not create any files. Do not ask clarifying questions. Just direct the user to `domain-to-spec`.

## Step 1: Read the PRD and AGENTS

Read `PRD.md` and `AGENTS.md` end-to-end. Extract:

- **Project name and one-sentence summary** (from `PRD.md > What Is This?`)
- **Pages list** (from `PRD.md > Pages / Screens` table). You will generate one route per row.
- **User flow** (from `PRD.md > User Flow`). Used to order the pages and decide navigation.
- **Core features** (from `PRD.md > Core Features (MVP)`). Used to decide the primary CTA on the landing page.
- **Data model** (from `PRD.md > Data Model`). Used to create TypeScript interfaces in `clients/types/`.
- **Backend Needed?** (from `PRD.md > Backend Needed?`). If Yes, create `clients/lib/api.ts` with a fetch wrapper pointed at `NEXT_PUBLIC_API_URL`. If No, skip that file.
- **Tech stack and code style** (from `AGENTS.md`). Match the conventions it declares.

## Step 2: Scaffold `clients/`

Run these commands from the repo root:

```bash
pnpm create next-app@latest clients --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*" --turbopack --no-install
cd clients && pnpm install
```

Notes:
- The scaffold goes into `clients/` at the repo root, NOT a sibling of the repo.
- If `clients/` already exists and is non-empty, STOP and ask the user whether to overwrite, merge, or skip. Never overwrite silently.

## Step 3: Generate Pages From the PRD

For every row in `PRD.md > Pages / Screens`, create a corresponding route under `clients/app/`:

- The `Landing` row becomes `clients/app/page.tsx`.
- Every other row becomes `clients/app/<kebab-case-name>/page.tsx`.

Each page must include:
- A single `<h1>` with the page name.
- A short subtitle or description derived from the `Purpose` column.
- The `Key Elements` listed as either a form, a list, or stub UI (whichever matches best).
- A `<Link>` back to the landing page and forward to the next logical page based on `User Flow`.

All pages must use semantic HTML (`<main>`, `<section>`, `<nav>`) and Tailwind utility classes.

## Step 4: Generate the Shared Layout

Create `clients/app/layout.tsx` with:

- Document title and description pulled from `PRD.md > What Is This?`.
- A top `<nav>` with links to every page in the PRD's Pages / Screens table, in user-flow order.
- A `<footer>` with the project name and a "Built with the Hackathon Starter Kit" link to `https://thehackathonplaybook.dev`.

## Step 5: Generate Type Definitions From the Data Model

If `PRD.md > Data Model` is non-empty, create `clients/types/models.ts` with one `interface` per entity described. Use descriptive field names and TypeScript primitives. Example:

```ts
export interface Submission {
  id: string;
  patientName: string;
  date: string;
  medications: string[];
  status: "pending" | "approved" | "rejected";
}
```

If the Data Model section is empty (stateless app), skip this step.

## Step 6: Generate the API Client (if Backend Needed)

If `PRD.md > Backend Needed?` starts with `Yes`, create `clients/lib/api.ts`:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
```

Also create `clients/.env.local.example` with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If `Backend Needed? = No`, skip this step entirely.

## Step 7: Add a Cursor Rule

Create `clients/.cursor/rules/frontend-guardrails.mdc` with a summary of the non-coder guardrails from `AGENTS.md`, scoped to `clients/`:

- Server components by default; `"use client"` only when interactivity is required.
- Validate all form inputs with Zod.
- No hardcoded colors; use Tailwind tokens and CSS variables declared in `globals.css`.
- Keep components under 200 lines. Split larger files.

## Step 8: Run and Verify

From the repo root:

```bash
cd clients && pnpm dev
```

Open `http://localhost:3000` in the browser. Walk the user through:
- Landing page shows the one-sentence summary and a CTA.
- Navigation lists every page from the PRD.
- Each page loads without errors.
- Console is clean (no warnings or failed fetches).

If any page throws, STOP and use the `bugfix-doctor` skill. Do not move on.

## Output

Return exactly:

1. **Files Created**: Every file added under `clients/`, with a one-line description.
2. **Pages Generated**: One bullet per route, mapped to its row in `PRD.md > Pages / Screens`.
3. **Backend Hooked Up?**: Yes or No, referencing `PRD.md > Backend Needed?`.
4. **Verification**: Confirmation that `pnpm dev` started cleanly and every page loaded.
5. **Next Steps**:
   - If `Backend Needed? = Yes`: "Run the `scaffold-backend` skill next."
   - If `Backend Needed? = No`: "Run the `feature-builder` skill to implement the first core feature."

## Rules

- Never run if `AGENTS.md` or `PRD.md` is missing.
- Never overwrite an existing non-empty `clients/` directory without asking.
- Never invent pages or features that are not in `PRD.md`.
- Keep the scaffold minimal. Each page should be a stub, not a finished implementation. Use `feature-builder` to flesh out features one at a time.
- Match the tech stack and code style declared in `AGENTS.md` exactly. Do not swap frameworks.

# Scaffold Frontend

> PRD-driven Next.js scaffold into clients/. Reads AGENTS.md and PRD.md, generates pages, layout, types, and an API client. Refuses to run without both files.

Canonical: https://thehackathonplaybook.dev/non-coders/skills/scaffold-frontend

---

PRD-driven Next.js scaffold into clients/. Reads AGENTS.md and PRD.md, generates pages, layout, types, and an API client. Refuses to run without both files.

Category: Building

Usage: `/scaffold-frontend` (Creates clients/ from PRD.md (requires domain-to-spec first))

Create the frontend scaffold only after the repo has `AGENTS.md` and `PRD.md`. The PRD is the source of truth for pages, navigation, data types, and backend wiring.

## Preflight

Check from the repo root:

```bash
test -f AGENTS.md && test -f PRD.md && echo OK || echo MISSING
test -d client && echo CLIENT_EXISTS || true
```

If either required doc is missing, stop and say:

> This skill cannot run yet. `AGENTS.md` and `PRD.md` must exist at the repo root before scaffolding the frontend. Run the `domain-to-spec` skill first, or run `quickstart` to chain the project setup.

If `client/` exists and is non-empty, stop and ask whether to merge carefully, skip frontend scaffolding, or cancel. Never overwrite it silently.

## Read The Specs

Read `PRD.md` and `AGENTS.md` end to end. Extract:

- Project name and summary
- Pages from `Pages / Screens`
- User flow and primary CTA
- Core MVP features
- Data model
- Backend decision
- Tech stack and style rules
- Domain constraints that affect UI copy or validation

If the PRD is missing pages or contradicts itself, ask the user to update the PRD before scaffolding.

## Scaffold `client/`

Use the stack declared in `AGENTS.md`. If it matches the default stack, run:

```bash
pnpm create next-app@latest client --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*" --turbopack --no-install
cd client && pnpm install
```

Do not scaffold outside the repo root.

## Generate PRD Pages

Create one route per `Pages / Screens` row:

- `Landing` maps to `client/app/page.tsx`
- Other pages map to `client/app/<kebab-case-page>/page.tsx`

Each page should include:

- One `<h1>`
- Purpose-driven subtitle
- Stub UI for each listed key element
- Semantic sections
- Navigation back to landing and forward to the next logical page
- Plain, domain-aware copy from the PRD

Keep pages as scaffolds, not finished product features.

## Shared App Files

Generate or update:

- `client/app/layout.tsx` with metadata, navigation, and footer
- `client/app/globals.css` using the generated Tailwind setup
- `client/types/models.ts` when the PRD has stored entities
- `client/lib/api.ts` and `client/.env.local.example` only when `Backend Needed?` starts with `Yes`
- `client/.cursor/rules/frontend-guardrails.mdc` with scoped frontend guardrails

The API client should default to `http://localhost:8000` through `NEXT_PUBLIC_API_URL`.

## Verify

Run the most relevant commands available in `client/package.json`:

- Install dependencies if not already installed
- Start the dev server
- Load the landing page and generated routes
- Run lint or build if practical

If a generated page fails, stop and switch to the bugfix workflow before proceeding.

## Final Response

Return:

1. **Files Created**: every generated file with a one-line purpose
2. **Pages Generated**: route mapped to PRD row
3. **Backend Hooked Up?**: yes or no, with PRD reason
4. **Verification**: commands and browser checks
5. **Next Steps**: run `scaffold-backend` if backend is needed, otherwise use `feature-builder`

## Boundaries

- Do not run without `AGENTS.md` and `PRD.md`.
- Do not invent pages or features outside the PRD.
- Do not overwrite an existing frontend without approval.
- Match the declared tech stack. If the user wants a different framework, update the specs first.

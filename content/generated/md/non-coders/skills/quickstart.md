# Quickstart

> One-shot project bootstrapper. Chains domain-to-spec, scaffold-frontend, and scaffold-backend (if needed) with user confirmation between steps.

Canonical: https://thehackathonplaybook.dev/non-coders/skills/quickstart

---

One-shot project bootstrapper. Chains domain-to-spec, scaffold-frontend, and scaffold-backend (if needed) with user confirmation between steps.

Category: Foundation

Usage: `/quickstart` (Runs the full scaffold pipeline end-to-end)

Run the foundational project setup in the right order. This skill coordinates other skills; it should not skip their safety checks.

## Pipeline

```text
domain-to-spec -> scaffold-frontend -> scaffold-backend, only if PRD says Yes
```

## Preflight

Check for existing project artifacts:

```bash
test -f AGENTS.md && echo AGENTS_EXISTS || true
test -f PRD.md && echo PRD_EXISTS || true
test -d client && echo CLIENT_EXISTS || true
test -d server && echo SERVER_EXISTS || true
```

If any exist, stop and show what was found. Ask whether to skip existing steps, update the existing specs, or cancel. Do not overwrite silently.

Treat overwrite as an exceptional recovery path, not a normal quickstart option. If the user asks to start fresh, explain exactly which files or folders would be replaced and ask for explicit confirmation before any destructive action.

## Step 1: Run `domain-to-spec`

Use the `domain-to-spec` workflow end to end. Capture the user's domain, MVP flow, backend decision, pages, routes, constraints, and success criteria.

Verify:

```bash
test -f AGENTS.md && test -f PRD.md && echo STEP_1_OK || echo STEP_1_FAILED
```

If this fails, stop. The scaffold skills need the docs.

## Step 2: Confirm The PRD

Before scaffolding, show the user:

- `Pages / Screens`
- `Backend Needed?`
- `Backend Routes`, if any
- `Core Features (MVP)`

Ask the user to confirm or provide corrections. Update `PRD.md` if they correct it, then show the sections again. Only continue after confirmation.

If `PRD.md` already existed before quickstart began, treat this as a review step, not a rewrite step. Preserve existing decisions unless the user explicitly changes them.

## Step 3: Run `scaffold-frontend`

Use the `scaffold-frontend` workflow. It should create `client/`, generate PRD pages, add navigation, add types, and create an API client only if the PRD needs a backend.

Verify:

```bash
test -d client/app && test -f client/package.json && echo STEP_3_OK || echo STEP_3_FAILED
```

If this fails, stop and switch to the bugfix workflow.

## Step 4: Decide Backend Step

Read `PRD.md > Backend Needed?`.

- If it starts with `No`, skip backend and explain why.
- If it starts with `Yes`, continue to backend scaffolding.

## Step 5: Run `scaffold-backend`

Use the `scaffold-backend` workflow. Ask about Supabase only if persistence is needed and not already decided.

Verify:

```bash
test -f server/app/main.py && test -f server/requirements.txt && echo STEP_5_OK || echo STEP_5_FAILED
```

If this fails, stop and switch to the bugfix workflow.

## Step 6: Connect And Verify

If backend exists:

- Ensure the frontend has `NEXT_PUBLIC_API_URL=http://localhost:8000` in the appropriate example or local env file.
- Start backend and frontend in separate terminals.
- Verify the landing page loads and the API health endpoint responds.

If frontend-only, verify the frontend dev server and generated routes.

## Final Response

Return:

1. **Pipeline Result**: status for spec, frontend, and backend
2. **Files and Folders Created**: `AGENTS.md`, `PRD.md`, `client/`, and optional `server/`
3. **Live Endpoints**: frontend URL, backend URL, and API docs if present
4. **Verification**: commands and checks completed
5. **Next Skills**: `feature-builder`, `bugfix-doctor`, or `demo-prep`

## Boundaries

- Do not skip `domain-to-spec`.
- Do not scaffold from an unconfirmed PRD.
- Do not cascade after a failed step.
- Do not invent pages, routes, or features outside the PRD.
- Leave dev servers running only when the user wants to inspect the app immediately.

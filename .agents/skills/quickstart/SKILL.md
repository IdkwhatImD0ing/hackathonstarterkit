---
name: quickstart
description: "One-shot project bootstrapper. Runs domain-to-spec, scaffold-frontend, and (if needed) scaffold-backend sequentially, with user confirmation between steps. Produces AGENTS.md, PRD.md, a Next.js app in clients/, and optionally a FastAPI app in server/. Use when starting a brand new project and the user wants the full stack in one go."
---

# Quickstart

The user is staring at an empty repo and wants to go from zero to a running full-stack scaffold in one command. This skill chains the three foundational skills in the right order so the user does not have to remember them.

The pipeline is:

```
  domain-to-spec   →   scaffold-frontend   →   scaffold-backend (optional)
  (writes PRD)        (reads PRD, builds       (reads PRD, builds
                       clients/)                server/ if needed)
```

## Preflight

Before starting, check the repo state:

```bash
test -f AGENTS.md && echo "AGENTS_EXISTS"
test -f PRD.md && echo "PRD_EXISTS"
test -d clients && echo "CLIENTS_EXISTS"
test -d server && echo "SERVER_EXISTS"
```

If any of `AGENTS.md`, `PRD.md`, `clients/`, or `server/` already exist, STOP and show the user what was found. Ask:

> "I found existing files from a previous run. Do you want to (a) skip steps whose output already exists, (b) overwrite everything and start fresh, or (c) cancel?"

Respect the answer. Never overwrite silently.

## Step 1: Run `domain-to-spec`

Invoke the `domain-to-spec` skill end-to-end. Do not summarize it. Do not skip any of its questions. The user must complete the full Q&A so the PRD is properly filled in.

When `domain-to-spec` finishes, both `AGENTS.md` and `PRD.md` should exist at the repo root. Verify:

```bash
test -f AGENTS.md && test -f PRD.md && echo "STEP_1_OK" || echo "STEP_1_FAILED"
```

If the check fails, STOP. Do not proceed to Step 2. Ask the user to retry `domain-to-spec` or investigate why the files were not created.

## Step 2: Pause for User Review

Before running any scaffolds, show the user:

- The `## Pages / Screens` table from `PRD.md`.
- The `## Backend Needed?` line from `PRD.md`.
- The `## Backend Routes` section from `PRD.md` (if backend is needed).

Ask:

> "Review these sections. Are the pages, backend decision, and routes correct? Reply 'yes' to continue, or paste corrections and I will update `PRD.md` before scaffolding."

If the user pastes corrections, update `PRD.md` in place, then re-show the sections and ask again. Only proceed when the user confirms.

## Step 3: Run `scaffold-frontend`

Invoke the `scaffold-frontend` skill end-to-end. It will:
- Preflight that `AGENTS.md` and `PRD.md` exist (they will, from Step 1).
- Run `pnpm create next-app` into `clients/`.
- Generate pages, layout, types, and (if backend is needed) an API client.
- Start `pnpm dev` and verify the landing page renders.

When the skill finishes, verify:

```bash
test -d clients/app && test -f clients/package.json && echo "STEP_3_OK" || echo "STEP_3_FAILED"
```

If the check fails, STOP and hand off to `bugfix-doctor`. Do not proceed to Step 4.

## Step 4: Decide on Backend

Read `PRD.md > Backend Needed?`:

- If it starts with **No**, skip to Step 6. Tell the user: "No backend needed per `PRD.md`. Skipping `scaffold-backend`."
- If it starts with **Yes**, proceed to Step 5.

## Step 5: Run `scaffold-backend`

Invoke the `scaffold-backend` skill end-to-end. It will:
- Preflight `AGENTS.md`, `PRD.md`, and `Backend Needed? = Yes`.
- Ask about Supabase integration.
- Scaffold `server/` with FastAPI, Pydantic models, and one route file per PRD entity.
- Run `pytest` and verify `GET /health`.

When the skill finishes, verify:

```bash
test -f server/app/main.py && test -f server/requirements.txt && echo "STEP_5_OK" || echo "STEP_5_FAILED"
```

If the check fails, STOP and hand off to `bugfix-doctor`.

## Step 6: Connect Frontend and Backend (if backend exists)

If `server/` was scaffolded:

1. Ensure `clients/.env.local` contains `NEXT_PUBLIC_API_URL=http://localhost:8000` (create or append).
2. Start both dev servers (in separate terminals):
   ```bash
   cd server && source .venv/bin/activate && uvicorn app.main:app --reload
   cd clients && pnpm dev
   ```
3. Verify the frontend can reach the backend by loading the landing page in the browser and checking the network tab.

If frontend-only, just confirm `pnpm dev` is still running on `http://localhost:3000`.

## Step 7: Summary and Handoff

Return exactly:

1. **Pipeline Result**:
   - `domain-to-spec`: OK / Failed
   - `scaffold-frontend`: OK / Failed
   - `scaffold-backend`: OK / Skipped / Failed
2. **Files and Folders Created**:
   - `AGENTS.md` (repo root)
   - `PRD.md` (repo root)
   - `clients/` with X pages
   - `server/` with X routes (if applicable)
3. **Live Endpoints**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000` (if applicable)
   - API Docs: `http://localhost:8000/docs` (if applicable)
4. **Next Skills to Run**:
   - `feature-builder`: implement the first MVP feature.
   - `bugfix-doctor`: if anything breaks.
   - `demo-prep`: once the MVP is done and you are preparing to present.

## Rules

- Never skip Step 1. The PRD drives every other step.
- Never run `scaffold-frontend` or `scaffold-backend` without the preflight check passing.
- Pause for user confirmation between Step 2 and Step 3. It is much easier to edit `PRD.md` once than to rescaffold twice.
- If any sub-skill fails, STOP the whole pipeline. Do not cascade broken state downstream.
- Never invent features, pages, or routes beyond what the user confirmed in the PRD.
- Always leave the dev servers running at the end so the user can see their app immediately.

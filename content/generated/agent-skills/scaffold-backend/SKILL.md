---
name: scaffold-backend
description: "Create a PRD-driven FastAPI backend in `server/` from repo-root `AGENTS.md` and `PRD.md`. Use this skill after frontend scaffolding only when `PRD.md` says `Backend Needed?` is Yes, especially for API routes, Pydantic models, health checks, optional Supabase wiring, and type-safe placeholder data."
---

# Scaffold Backend

Generate a minimal, working backend from the confirmed PRD. The backend should be callable immediately by the frontend, even if persistence is temporary.

## Preflight

Check from the repo root:

```bash
test -f AGENTS.md && test -f PRD.md || { echo MISSING_DOCS; exit 1; }
test -d server && echo SERVER_EXISTS || true
```

Read `PRD.md > Backend Needed?`.

Stop without creating files if:

- `AGENTS.md` or `PRD.md` is missing
- `Backend Needed?` is missing, empty, or starts with `No`
- `server/` already exists and is non-empty
- `Backend Routes` is empty even though backend is needed

In each stop case, explain the specific missing prerequisite and the safest next step.

## Read The Specs

Extract:

- Backend routes, each as method, path, and purpose
- Data model entities and fields
- Auth, storage, file processing, email, and paid API requirements
- Domain constraints that affect validation
- Python version and backend conventions from `AGENTS.md`

If the PRD implies a database, ask whether to wire Supabase now, defer it, or use an in-memory placeholder. Do not silently choose paid or external services.

Before generating files, make a route inventory table with `Method`, `Path`, `Purpose`, `Route Module`, and `Handler`. This table is the contract for the scaffold. If two PRD bullets map to the same handler or an entity has no route module, resolve that before writing files.

## Create `server/`

Generate:

```text
server/
  app/
    __init__.py
    main.py
    config.py
    db.py
    models.py
    routes/
      __init__.py
      health.py
      <entity>.py
  tests/
    __init__.py
    test_health.py
  .env.example
  .gitignore
  requirements.txt
  README.md
```

Include:

- FastAPI app with CORS for `http://localhost:3000`
- `GET /health`
- One route module per entity or route group in `Backend Routes`
- Pydantic `Base`, `Create`, and response models for each entity
- Type-safe placeholder data with UUIDs
- Supabase client only if the user chose it

Avoid `NotImplementedError` stubs. The frontend should be able to call routes and receive realistic dummy responses.

## Dependencies

Include:

```text
fastapi>=0.115
uvicorn[standard]>=0.32
pydantic>=2.9
pydantic-settings>=2.6
python-dotenv>=1.0
pytest>=8.3
httpx>=0.27
```

Add `supabase>=2.9` only if Supabase is selected.

## Route Generation Rules

For each PRD route:

- Match the HTTP method and path exactly.
- Use descriptive function names.
- Return typed models or lists of typed models.
- Raise `HTTPException(status_code=404)` for missing IDs.
- Keep route behavior simple and predictable.
- Add comments only where the placeholder store needs future replacement.

`GET /health` is allowed as a scaffold health check, but it does not count as satisfying a PRD route. In the final response, separate health routes from product routes so the user can see exactly what came from the PRD.

## Verify

From `server/`:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pytest
uvicorn app.main:app --reload
```

Confirm:

- Tests pass
- `GET /health` returns `{"status": "ok"}`
- Generated routes appear in `/docs`
- No secrets are hardcoded

If verification fails, switch to the bugfix workflow and fix the generated scaffold before reporting success.

## Final Response

Return:

1. **Files Created**: every file under `server/`
2. **Routes Generated**: each PRD route and generated handler
3. **Health Check**: `GET /health` status, listed separately from PRD product routes
4. **Persistence**: Supabase or in-memory placeholder, with reason
5. **Verification**: commands and outcomes
6. **Next Steps**: update frontend API URL and connect the first feature

## Boundaries

- Do not run without the required docs.
- Do not create a backend when the PRD says no backend.
- Do not overwrite existing backend files without approval.
- Do not invent routes outside the PRD.
- Do not hardcode secrets.

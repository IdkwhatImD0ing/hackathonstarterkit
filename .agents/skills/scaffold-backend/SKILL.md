---
name: scaffold-backend
description: "PRD-driven backend scaffold. Reads AGENTS.md and PRD.md from the repo root and creates a FastAPI app inside server/ with optional Supabase integration and one stub route per entry listed under PRD.md > Backend Routes. Refuses to run if AGENTS.md and PRD.md do not exist, or if PRD.md says Backend Needed? = No. Run AFTER scaffold-frontend."
---

# Scaffold Backend

This skill creates the backend for the user's project inside a `server/` directory at the repo root. Like `scaffold-frontend`, it is driven entirely by `PRD.md` and `AGENTS.md`. Every route, every Pydantic model, and the decision to include Supabase are all derived from the PRD.

## Preflight: PRD, AGENTS, and Backend Needed

Before doing anything else, check three conditions:

1. `AGENTS.md` exists at the repo root.
2. `PRD.md` exists at the repo root.
3. `PRD.md > Backend Needed?` starts with `Yes`.

```bash
test -f AGENTS.md && test -f PRD.md || { echo "MISSING_DOCS"; exit 1; }
grep -A1 "^## Backend Needed?" PRD.md | tail -n1
```

### Fail-fast responses

- If `AGENTS.md` or `PRD.md` is missing, STOP and respond exactly:

  > This skill cannot run yet. `AGENTS.md` and `PRD.md` must exist at the repo root. Run the `domain-to-spec` skill first, or run the `quickstart` skill to chain everything automatically.

- If `Backend Needed?` is `No` (or empty), STOP and respond exactly:

  > This project does not need a backend according to `PRD.md > Backend Needed?`. If that is wrong, rerun the `domain-to-spec` skill to update the PRD. Otherwise, run the `feature-builder` skill to build out frontend features.

Do not create any files in either fail case.

## Step 1: Read the PRD and AGENTS

Extract from `PRD.md`:

- **Routes list** (from `PRD.md > Backend Routes`). Each bullet becomes a FastAPI route.
- **Data model** (from `PRD.md > Data Model`). Each entity becomes a Pydantic model.
- **Domain constraints** (from `PRD.md > Domain Constraints`). Used to decide what validation rules to add.
- **Auth requirement**. Check if `PRD.md > Core Features (MVP)` or `PRD.md > User Flow` mention login, accounts, or user-specific data. If yes, Supabase Auth is needed.

Extract from `AGENTS.md`:

- The Python version and FastAPI conventions.
- Whether Supabase is listed under `## Tech Stack > Database`.

## Step 2: Ask About Supabase

Prompt the user:

> "Your PRD implies this app needs a database. I recommend Supabase because it is free, hosted, and integrates auth, Postgres, and storage in one service. Should I wire it up now? (yes / no / later)"

- If **yes**: include Supabase integration in Step 4.
- If **no**: scaffold FastAPI only; use an in-memory Python dict as a placeholder store, with a clear TODO comment to swap it out later.
- If **later**: same as **no**.

## Step 3: Scaffold `server/`

Create the following structure at the repo root:

```
server/
  app/
    __init__.py
    main.py                # FastAPI app entry point
    config.py              # Environment variable loader
    db.py                  # Supabase client or in-memory store
    models.py              # Pydantic models (from PRD Data Model)
    routes/
      __init__.py
      health.py            # GET /health
      <entity>.py          # One file per entity in the PRD (e.g. submissions.py)
  tests/
    __init__.py
    test_health.py
  .env.example
  .gitignore
  requirements.txt
  README.md
```

## Step 4: Generate `requirements.txt`

Always include:

```
fastapi>=0.115
uvicorn[standard]>=0.32
pydantic>=2.9
pydantic-settings>=2.6
python-dotenv>=1.0
pytest>=8.3
httpx>=0.27
```

If Supabase was chosen, also include:

```
supabase>=2.9
```

## Step 5: Generate `main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import health
# Import one route module per entity in PRD > Backend Routes
# Example: from app.routes import submissions

app = FastAPI(title="{project name from PRD}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
# app.include_router(submissions.router, prefix="/submissions", tags=["submissions"])
```

Replace `{project name from PRD}` with the one-sentence summary's subject. Uncomment and add one `include_router` call per entity found in `PRD.md > Backend Routes`.

## Step 6: Generate Pydantic Models From the Data Model

For each entity in `PRD.md > Data Model`, create a class in `app/models.py`:

```python
from datetime import datetime
from typing import Literal
from pydantic import BaseModel, Field

class SubmissionBase(BaseModel):
    patient_name: str = Field(..., min_length=1)
    date: datetime
    medications: list[str]

class SubmissionCreate(SubmissionBase):
    pass

class Submission(SubmissionBase):
    id: str
    status: Literal["pending", "approved", "rejected"] = "pending"
```

Always generate a `Base`, a `Create`, and a full model per entity. This pattern gives you clean request/response separation.

## Step 7: Generate Route Stubs From `PRD.md > Backend Routes`

For each bullet under `PRD.md > Backend Routes`, generate a FastAPI route. Example input:

```
- POST /submissions — create a new submission from the form
- GET /submissions — list the current user's submissions
- GET /submissions/{id} — fetch one submission
- POST /submissions/{id}/approve — mark a submission as approved
```

Generated `app/routes/submissions.py`:

```python
from fastapi import APIRouter, HTTPException
from uuid import uuid4

from app.models import Submission, SubmissionCreate
from app.db import store

router = APIRouter()

@router.post("", response_model=Submission)
def create_submission(payload: SubmissionCreate) -> Submission:
    submission = Submission(id=str(uuid4()), **payload.model_dump())
    store.setdefault("submissions", {})[submission.id] = submission
    return submission

@router.get("", response_model=list[Submission])
def list_submissions() -> list[Submission]:
    return list(store.get("submissions", {}).values())

@router.get("/{submission_id}", response_model=Submission)
def get_submission(submission_id: str) -> Submission:
    submission = store.get("submissions", {}).get(submission_id)
    if submission is None:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission

@router.post("/{submission_id}/approve", response_model=Submission)
def approve_submission(submission_id: str) -> Submission:
    submission = store.get("submissions", {}).get(submission_id)
    if submission is None:
        raise HTTPException(status_code=404, detail="Submission not found")
    submission = submission.model_copy(update={"status": "approved"})
    store["submissions"][submission_id] = submission
    return submission
```

Every route should return dummy but type-safe data so the frontend has something to consume immediately.

## Step 8: Generate `db.py`

### If Supabase was chosen

```python
from supabase import create_client, Client
from app.config import settings

supabase: Client = create_client(settings.supabase_url, settings.supabase_key)
```

Add to `.env.example`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-or-service-key
```

Add a short section to `server/README.md` explaining how to create a Supabase project, copy the URL and anon key, and paste them into `.env`.

### If Supabase was declined

```python
# Temporary in-memory store. Swap for Supabase/Postgres before production.
store: dict[str, dict] = {}
```

## Step 9: Generate `config.py` and `.env.example`

`app/config.py`:

```python
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_url: str = ""
    supabase_key: str = ""

settings = Settings()
```

`.env.example`:

```
# Copy this file to .env and fill in your values
SUPABASE_URL=
SUPABASE_KEY=
```

## Step 10: Generate `tests/test_health.py`

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
```

And `app/routes/health.py`:

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
```

## Step 11: Generate `server/.gitignore`

```
.venv/
__pycache__/
*.pyc
.env
.pytest_cache/
.coverage
```

## Step 12: Generate `server/README.md`

A short README with:
- One-sentence project summary (from PRD).
- Setup: create venv, `pip install -r requirements.txt`, copy `.env.example` to `.env`.
- Run dev: `uvicorn app.main:app --reload`.
- Tests: `pytest`.
- If Supabase is wired up: a "Setting up Supabase" section with 4-5 bullet steps.

## Step 13: Verify

From the repo root:

```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload &
sleep 2
curl http://localhost:8000/health
pytest
```

Confirm:
- `GET /health` returns `{"status": "ok"}`.
- Every generated route appears in `http://localhost:8000/docs` (FastAPI auto-docs).
- `pytest` passes.

If anything fails, STOP and invoke the `bugfix-doctor` skill.

## Output

Return exactly:

1. **Files Created**: Every file under `server/`, with a one-line description.
2. **Routes Generated**: One bullet per route, mapped to its entry in `PRD.md > Backend Routes`.
3. **Supabase Wired Up?**: Yes or No (with the reason the user gave).
4. **Verification**: Confirmation that `/health` responded, auto-docs listed every route, and tests passed.
5. **Next Steps**:
   - "Update `clients/.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000`."
   - "Run both servers together: `cd server && uvicorn app.main:app --reload` in one terminal, `cd clients && pnpm dev` in another."
   - "Use the `feature-builder` skill to connect the first frontend page to the first backend route."

## Rules

- Never run without `AGENTS.md` and `PRD.md` at the repo root.
- Never run if `PRD.md > Backend Needed?` is not `Yes`.
- Never overwrite an existing non-empty `server/` directory without asking.
- Never invent routes that are not in `PRD.md > Backend Routes`. If the list is empty, ask the user to update the PRD first.
- Every route must return type-safe dummy data. No `NotImplementedError` stubs. The frontend should be able to call the backend end-to-end immediately after scaffolding.
- Never hardcode secrets. Use `app/config.py` + `.env` for every external key.

# Prompt: environment separation in FireTrace

Paste everything below the divider into an agent working on the **FireTrace
repo**. It is self-contained: problem, verified evidence, the contract to
build, migration, and acceptance criteria.

Context for you, not the agent: this repo currently works around the gap with
a tag (`env:production` / `env:preview` / `env:local`, from `VERCEL_ENV`) set
in [`lib/tracing/firetrace.ts`](../lib/tracing/firetrace.ts). Once keys carry
an environment, that workaround comes out. See finding 6 in
[firetrace-feedback.md](./firetrace-feedback.md).

---

## Task

Give FireTrace a first-class **environment** concept, carried by the **API
key** and stamped server-side at ingestion, so production, preview, and local
traces never mix in the same numbers.

Also fix a related correctness bug in the query layer (part 6 below). Do not
skip it: shipping an `environment` filter while unknown filters are silently
ignored would actively mislead people.

## The problem

Every deployed app has at least three environments. Today FireTrace has no
way to tell them apart, so a developer hammering a local build silently
corrupts the exact numbers people open a tracing tool to see: error rate, p95
latency, and cost. There is no way to answer "what did production do last
night" without that answer being polluted.

Verified against the live API:

| Attempt | Result |
| --- | --- |
| `environment` as a trace field on ingest | `400 invalid_trace: Unrecognized key: "environment"` |
| `GET /api/v1/traces?environment=production` | `200`, and **unfiltered** |
| `GET /api/v1/traces?env=production` | `200`, and **unfiltered** |
| `tags: ["env:preview"]` then `?tag=env:preview` | works, which is the current workaround |

Tags do work, but every user has to independently invent the convention, the
dashboard cannot know to group by it, and nothing stops a preview deployment
from tagging itself `env:production`.

## Design: the key carries the environment

Put `environment` on the **API key**, not in the request body. The server
stamps each ingested trace with the environment of the key that sent it.

This is the right call for three reasons:

1. **It cannot be spoofed.** A preview deployment physically cannot write
   into production's numbers, because it does not hold production's key.
   A client-supplied field gives you no such guarantee, and the whole value
   of the separation is that you can trust it.
2. **Existing integrations need no code change.** Users already scope secrets
   per environment (Vercel, Netlify, Fly, and Docker all do this). They set a
   different `FIRETRACE_API_KEY` value per environment scope and separation
   happens for free. No SDK change, no new field to remember.
3. **It composes with key rotation and revocation.** Revoking a leaked
   preview key does not touch production.

## What to build

### 1. Environment on the API key

Add an `environment` attribute to API keys.

- Type: a slug, `[a-z0-9][a-z0-9_-]{0,31}`, lowercase.
- Suggest `production`, `preview`, `development` in the UI as one-click
  presets, but allow any slug, because people have `staging`, `qa`, `local`.
- **Nullable, and null for every existing key.** Do not silently backfill
  existing keys to `production`: a user running one key across all
  environments (which is what the reference integration does today) would get
  their local traffic relabelled as production, which is worse than having no
  label. Null renders as "unassigned".
- Surface it in key creation and key editing, and in `GET /api/v1/key`, which
  today returns `keyId`, `projectId`, `scopes`, `expiresAt`, `lastUsedAt`.
  Add `environment` there so an integrator can verify their wiring.

### 2. Environment stamped on the trace at ingest

- On `POST /api/v1/traces`, stamp the trace with the authenticating key's
  environment. Server-side, not from the body.
- Store it on the trace document as `environment` (nullable).
- Keep rejecting `environment` in the request body, as it does now, so nobody
  builds on a value that would be ignored. If you later want single-key
  multi-environment support, do it as an explicit opt-in flag on the key
  (`allowEnvironmentOverride`, default false) rather than trusting the body
  by default. Treat that as optional and out of scope for a first cut.
- Scores inherit the environment of the trace they attach to. Do not store it
  separately on the score; derive it, so the two can never disagree.

### 3. Filtering and the read path

- `GET /api/v1/traces?environment=production`. Also accept
  `?environment=unassigned` (or an explicit null form) so historical traces
  remain reachable.
- Return `environment` on every trace in both `GET /api/v1/traces` and
  `GET /api/v1/traces/{id}`.
- `GET /api/v1/scores` should accept the same filter, resolved through the
  parent trace.
- The filter must compose with the existing `slowest` and `costliest` sorts.
  Note the current restriction where those sorts reject `sessionId`,
  `userId`, `from`, and `to`: decide deliberately which side `environment`
  falls on, and document it. Ideally it composes, because "costliest
  production traces" is the single most useful query this unlocks.

### 4. Aggregates must respect the selection

This is the part that actually delivers the value, and it is easy to
overlook. Anywhere you compute a number over many traces, it must honour the
environment filter: cost totals, token totals, latency percentiles, error
rate, trace counts, and the project storage/usage figures if those are shown
per environment.

An environment selector that filters the trace list but not the summary
cards is worse than no selector at all, because the two disagree on the same
screen and the user cannot tell which one lied.

### 5. Dashboard

- A global environment selector in the top-level chrome, not a per-view
  filter. Persist the selection across navigation and reloads.
- Default it to `production` once the project has at least one key assigned
  to `production`, otherwise "all".
- Show the active environment somewhere always-visible. Someone debugging a
  production incident must never wonder which environment they are looking
  at.
- On the key management screen, show each key's environment plainly, since
  that is now the thing that determines where data lands.

### 6. Fix: unknown query parameters are silently ignored

Verified: `GET /api/v1/traces?environment=production` currently returns `200`
with a complete, unfiltered list. So does `?env=production`. A caller who
assumes the filter applied reads production numbers that quietly include
preview and local traffic, with nothing anywhere indicating a problem.

This is inconsistent with the ingest path, which is strict and rejects
unknown keys with a precise message (`trace: Unrecognized key:
"environment"`). That strictness is the best thing about this API. Make the
query layer match:

- Reject unknown query parameters with `400 invalid_request`, naming the
  offending parameter, in the existing error envelope with a `requestId`.
- Reject unknown *values* for enumerated params the same way.

Ship this in the same change as the environment filter. If it lands after,
there is a window where `?env=` looks like it works and returns wrong data.

## Migration and backward compatibility

- Existing keys: `environment = null`. No backfill.
- Existing traces: `environment = null`, rendered as "unassigned". They stay
  fully readable and are included when no filter is given.
- Omitting `?environment` keeps returning every environment, so existing API
  consumers do not break. Only the dashboard changes its default.
- Provide a way to assign history after the fact, even a crude one: "set
  environment to X for all traces ingested by key K", or a date-bounded
  variant. Someone adopting this will have weeks of unassigned traces they
  can classify by which key sent them, and that mapping is knowable.
- If a key's environment is changed later, only traces ingested after the
  change get the new value. Do not rewrite history, and say so in the docs.

## Edge cases to get right

- A key with no environment ingesting a trace: store null, do not guess.
- Filtering by an environment that no key has ever used: `200` with an empty
  list, not `404`.
- Two keys sharing one environment (a key rotation in progress): fine and
  expected, do not enforce uniqueness.
- Deleting a key must not delete or orphan its traces. The environment is
  copied onto the trace at ingest, not looked up through the key at read
  time. Make sure the implementation actually does that rather than joining.
- Case: normalize `Production` to `production` on input, as you already do
  for hex ids.

## Acceptance criteria

- [ ] A key can be created and edited with an environment; `GET /api/v1/key`
      reports it.
- [ ] A trace ingested with that key comes back with that `environment`,
      without the client sending anything.
- [ ] `environment` in the ingest body is still rejected with `400`.
- [ ] `GET /api/v1/traces?environment=production` returns only production
      traces; `?environment=unassigned` returns pre-migration traces.
- [ ] Every summary number on the dashboard changes when the environment
      selector changes.
- [ ] `GET /api/v1/traces?env=production` and any other unknown parameter now
      return `400 invalid_request` naming the parameter.
- [ ] Existing keys and traces are `null`/unassigned, not silently labelled
      production.
- [ ] Deleting a key leaves its traces intact with their environment.
- [ ] Scores are filterable by environment through their parent trace.
- [ ] Docs cover: environment on keys, the ingest stamping rule, the filter,
      the unassigned state, and the "changing a key does not rewrite history"
      rule.

## The integration waiting on this

A public RAG chatbot on Vercel, tracing one trace per chat turn with nested
retrieval, embedding, and model spans, plus thumbs ratings as scores.

It currently sets a tag from `VERCEL_ENV` (`env:production`, `env:preview`,
`env:local`) and duplicates it into `metadata.environment`, alongside
`metadata.branch` and `metadata.commit`. That tag is a workaround for exactly
this gap and gets deleted once keys carry the environment.

Worth knowing for the migration story: that project currently has **one key
shared across all three Vercel environments**, which is the common starting
point. Adopting this means minting three keys and setting a different value
per environment scope. Make that path obvious in the docs, because it is the
step everyone will have to take, and a single "create a key for each
environment" prompt on the key screen would carry most of the weight.

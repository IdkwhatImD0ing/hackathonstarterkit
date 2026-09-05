# Prompt: add post-hoc scores to FireTrace

> **SHIPPED, September 4, 2026. This prompt has been fulfilled and is kept
> only as a record of the reasoning.** FireTrace now has
> `POST /api/v1/traces/{traceId}/scores`, a `GET` counterpart, a
> cross-trace `GET /api/v1/scores`, and `PATCH /api/v1/traces/{traceId}`
> for metadata. This repo uses scores; see `recordFeedback` in
> [`lib/tracing/firetrace.ts`](../lib/tracing/firetrace.ts) and finding 1 of
> [firetrace-feedback.md](./firetrace-feedback.md). The shipped design
> differs from this spec in two ways, both improvements: scores append with
> a latest-per-name rollup instead of upserting, and `dataType` is an
> explicit required field. Safe to delete.

Paste everything below the line into an agent working on the FireTrace
codebase. It is written to be self-contained: it states the problem, the
evidence, the exact contract to build, and how to verify it.

Context for you, not for the agent: the client side of this already exists in
this repo at [`lib/tracing/firetrace.ts`](../lib/tracing/firetrace.ts)
(`recordFeedback`) and [`app/api/chat/feedback/route.ts`](../app/api/chat/feedback/route.ts).
Once the endpoint below ships, `recordFeedback` becomes a single POST to it
and the linked-trace workaround gets deleted. See finding 1 in
[firetrace-feedback.md](./firetrace-feedback.md).

---

## Task

Add a **scores** resource to the FireTrace ingestion API so that evaluations
which arrive *after* a trace has been stored can be attached to it.

## The problem this solves

FireTrace traces are immutable and write-once. That is a good invariant and
this change must not break it. But a whole class of signal only exists after
the trace is closed:

- A user clicks thumbs up or down on an answer, seconds or minutes later.
- A human reviewer marks an answer wrong during a triage session.
- An automated eval or LLM judge scores a batch of traces overnight.
- A downstream business outcome resolves ("did this conversation convert").

Today there is no way to record any of these against the trace they refer to.
I verified this against the live API, not just the docs:

| Attempt | Result |
| --- | --- |
| `POST /api/v1/traces` with an existing id and different content | `409 trace_id_conflict`, "Traces are immutable; use a new trace id." |
| `PATCH /api/v1/traces/{id}` | `405 Method Not Allowed` |
| `POST /api/v1/traces/{id}/scores` | `404` |
| `POST /api/v1/traces/{id}/feedback` | `404` |
| `POST /api/v1/scores` | `404` |
| `PUT /api/v1/traces/{id}/metadata` | `404` |

The only workaround available to an integrator is to write a second,
zero-duration trace that points back at the first through a `metadata` field.
That is what my integration currently does, and it is bad: satisfaction rate
becomes a client-side join, the fake traces pollute trace counts and latency
averages, the link is an unenforced convention, and it burns trace quota on
records that are not LLM calls.

## What to build

A score is an append-only annotation on a trace. It never modifies the trace
document, so immutability is preserved.

### Primary endpoint

```
POST /api/v1/traces/{traceId}/scores
Authorization: Bearer ft_live_<keyId>_<secret>
Content-Type: application/json
```

Request body:

```jsonc
{
  "name": "user-feedback",    // required, 1-64 chars. The score's dimension.
  "value": 1,                 // required, finite number.
  "label": "thumbs-up",       // optional, 1-64 chars. Display form of value.
  "comment": "cited the wrong page",  // optional, free text, cap it (2 KiB is plenty).
  "source": "user",           // optional enum: user | human-review | eval | api. Default "api".
  "spanId": "a1b2c3d4e5f60718",  // optional, 16 hex. Scores one span, not the whole trace.
  "id": "b7f...",             // optional, client-supplied idempotency key.
  "metadata": { }             // optional JSON object.
}
```

Success response, `201`:

```json
{
  "ok": true,
  "scoreId": "…",
  "traceId": "…",
  "duplicate": false,
  "requestId": "…"
}
```

### Rules

1. **Do not mutate the trace.** Store scores in their own collection keyed by
   `traceId`. The trace document stays byte-identical to what was ingested.
2. **The trace must exist.** If `traceId` is unknown to this project, return
   `404` with a `score_trace_not_found` code. Do not silently accept orphans.
   Do not let a key from project A score a trace in project B.
3. **`spanId`, when given, must exist in that trace.** Otherwise `400`,
   matching how the ingestion endpoint already rejects a dangling
   `parentSpanId`.
4. **Many scores per trace is normal and correct.** A trace can carry a user
   thumbs rating, a reviewer verdict, and three eval scores at once. Do not
   enforce one score per trace.
5. **`(traceId, name, source)` should upsert, not duplicate.** A user who
   clicks thumbs up and then thumbs down should end with one
   `user-feedback` score whose value is the later one, not two contradictory
   rows. Keep the earlier value in history if that is cheap; the read path
   should expose the current one.
6. **Idempotency, consistent with the ingestion endpoint.** If `id` is
   supplied and already exists with identical content, return `200` with
   `"duplicate": true`. With conflicting content, return `409`.
7. **Reuse the existing auth, quota, and error envelope.** Same
   `{"error": {"code", "message", "requestId"}}` shape and the same style of
   specific, field-level messages. The precision of the current error
   messages is the single best thing about this API; do not regress it here.

### Read path

- `GET /api/v1/traces/{traceId}` already works and returns the trace with a
  computed `durationMs`, though it is undocumented. Extend it to include a
  `scores` array.
- Add `GET /api/v1/traces/{traceId}/scores`.
- Whatever list or query endpoint backs the trace list in the UI should
  support filtering and sorting by a named score, because the entire point is
  to answer "show me every trace a user marked bad, newest first".

### UI, if it is in scope for you

- Show scores on the trace detail view, with `comment` visible.
- On the trace list, a column or badge per score name.
- Aggregate over a time range: average value and count per score name. For a
  thumbs score stored as 1 and 0, the average is the satisfaction rate
  directly, which is why numeric `value` is required rather than a bare
  enum.

## Migration and compatibility

- Purely additive. No existing endpoint changes shape.
- Adding `scores` to the `GET /api/v1/traces/{id}` response is additive too,
  but confirm no client is doing strict schema validation on that response
  first.
- Existing integrations that emitted the linked-trace workaround will have
  historical `*-feedback` traces with `metadata.feedbackFor` pointing at a
  trace id. A one-off backfill that converts those into real scores and
  deletes the fake traces would be a good follow-up, but do it separately
  from shipping the endpoint.

## Alternative, if scores are too much scope right now

`PATCH /api/v1/traces/{traceId}` accepting only `{ "metadata": { ... } }` and
doing a shallow merge into the trace's existing metadata. It is much less
work and it unblocks the same use case.

Be aware of what it costs: it breaks the write-once guarantee that the docs
currently state plainly, it gives you no history and no aggregation, two
raters race and one silently wins, and metadata becomes a junk drawer holding
both ingest-time facts and after-the-fact judgements with nothing
distinguishing them. Prefer scores. Only reach for this if the goal is to
unblock integrators this week.

## Acceptance criteria

- [ ] Posting a score to an existing trace returns `201` and does not alter
      the stored trace. Verify by reading the trace before and after and
      comparing.
- [ ] Posting to an unknown trace id returns `404`, and to a trace in another
      project also returns `404`.
- [ ] Posting with a `spanId` not present in the trace returns `400` naming
      the bad id.
- [ ] Two scores with different `name` values coexist on one trace.
- [ ] Re-posting the same `(traceId, name, source)` with a new value updates
      rather than duplicating.
- [ ] Re-posting an identical body with the same `id` returns `200` with
      `"duplicate": true`.
- [ ] `GET /api/v1/traces/{id}` includes the scores.
- [ ] Errors use the existing envelope with a `requestId`.
- [ ] The ingestion API reference documents the new endpoint, and documents
      `GET /api/v1/traces/{id}`, which is currently live but unlisted.

## The integration that is waiting on this

A public RAG chatbot traces one turn per request as a trace with three spans
(retrieval, a nested query embedding, and the model call). Readers rate
answers with thumbs up or down in the chat widget. The moment this endpoint
exists, the client collapses to:

```ts
await fetch(`${base}/api/v1/traces/${traceId}/scores`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
  body: JSON.stringify({
    name: "user-feedback",
    value: rating === "up" ? 1 : 0,
    label: rating === "up" ? "thumbs-up" : "thumbs-down",
    source: "user",
  }),
});
```

and a whole workaround gets deleted.

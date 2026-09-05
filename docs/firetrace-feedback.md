# FireTrace integration feedback

Notes from wiring [tracing.art3m1s.me](https://tracing.art3m1s.me) into this
site. The integration covers `/api/chat` (streaming, retrieval-grounded
chat), `/api/cheat-search` (structured output), the query embedding inside
retrieval, and thumbs up/down on chat answers.

Everything marked **verified** was probed against the live API with this
project's key.

- **September 3, 2026:** first integration.
- **September 4, 2026:** re-checked after the scores, metadata patch, and
  read endpoints shipped. Finding 1 below is resolved, findings 2 to 4 stand,
  and one new finding (5, the ingest/score race) came out of adopting scores.

## What worked well

- **The schema is the right shape.** A trace with nested spans, per-span
  `kind`, `usage`, and free-form `attributes` mapped onto a RAG chat turn
  (retrieval, then embedding under it, then the model call) with no
  contortions. Nothing had to be flattened or faked.
- **Errors are excellent.** Every rejection came back with a specific field
  path and a `requestId`. `trace.spans.0.endedAt: Invalid input: expected
  string, received undefined` is the difference between a five-second fix and
  an afternoon. Keep this.
- **Idempotency works as documented.** Verified: the same body twice returned
  `201` then `200` with `"duplicate": true` and the same `traceId`. This makes
  a naive retry safe, which matters for fire-and-forget delivery.
- **Validation is strict in the right places.** Verified: a span whose
  `parentSpanId` points at a span not present in the payload is rejected
  rather than silently orphaned.
- **Scores landed well** (see finding 1). The append-plus-rollup design in
  particular is better than the upsert I asked for.

## 1. RESOLVED: post-hoc feedback

This was the one requirement I could not implement, and it is now fixed. For
the record, what was blocked: a thumbs rating always arrives *after* the
answer has streamed and the trace has been stored, and there was no way to
attach it. Verified at the time: `PATCH /api/v1/traces/{id}` returned `405`,
every scores or feedback path returned `404`, and re-posting the id with new
content returned `409`. The only workaround was a second, zero-duration trace
pointing back through `metadata`, which polluted trace counts and latency
stats and made satisfaction rate a client-side join.

Both `POST /api/v1/traces/{traceId}/scores` and
`PATCH /api/v1/traces/{traceId}` now exist. This integration uses **scores**,
following your own guidance that "metadata is unindexed; use scores for
ratings, verdicts, and eval results instead". A thumbs rating is:

```json
{ "name": "user-feedback", "dataType": "numeric", "value": 1 }
```

Numeric rather than categorical so the average is a satisfaction rate
directly. Verified end to end: a real thumbs-down from the chat widget
produced `trace.scores["user-feedback"].value === 0` on the rated trace,
alongside its cost, usage and spans.

Three things you got right that are worth keeping:

- **Append plus a latest-per-name rollup.** I asked for upsert. Append is
  better: `trace.scores` resolves the newest score per name for the common
  read, while the `scores` array keeps the full history, so a reader who
  changes their mind is recorded honestly instead of overwritten. Verified:
  scoring `user-feedback` twice left both in history with the rollup showing
  the later value.
- **`404 not_found` for a trace in another project.** Scores cannot be
  sprayed across project boundaries.
- **`GET /api/v1/scores`** with a `name` filter. Cross-trace aggregation
  without walking traces is exactly what this needs.

One small friction: **`dataType` is required and is inferable.** `typeof
value` already distinguishes number, string and boolean. Making it optional,
inferred from `value`, with the explicit field kept as an override, would
remove a required field from every call site for no loss.

## 2. Immutable plus no update means streaming traces are all or nothing

Still open. A streaming chat response cannot be reported until the stream
ends, because a trace can only be written once, complete. The consequence is
that the traces you most want are the ones you are least likely to get: if
the function crashes, times out, or is frozen mid-stream, nothing is ever
sent and the incident is invisible.

I mitigated it by closing the trace in a `finally` and on the stream's
`cancel()`, so a client disconnect still produces a trace with status
`unset`. That covers disconnects but not a hard crash.

**Suggestion:** an optional two-phase mode. `POST /api/v1/traces` with a
`"partial": true` flag to open a trace, then a single completing write that
supersedes it. Or accept a trace explicitly marked incomplete, so a
tail-latency watchdog can flush what it has. Either would also allow live
"in flight" views, which is usually the first thing people ask a tracing UI
for.

## 3. `costUsd` is the client's problem, and clients are bad at it

Still open, and now stated as a design position: the docs say `costUsd` is
"supplied by the caller; FireTrace has no price tables."

This integration sends cost, from a hand-maintained table in
[`lib/tracing/pricing.ts`](../lib/tracing/pricing.ts), and writing that table
is exactly the argument against leaving it to callers:

- The rates had to be copied out of a code comment in `lib/chat/config.ts`
  that says it was "checked 2026-08-15", and out of `scripts/build-index.mts`,
  which openly admits its embedding price may be stale.
- Cached input bills at a different rate than uncached input, and cached
  tokens are a *subset* of the input count, so the naive calculation
  overcharges every cached turn. Every one of your users has to work that out
  independently.
- The number is frozen at write time. When a provider changes prices, or when
  I typo a rate, every historical trace is permanently wrong and nobody can
  fix it, because the trace is immutable. Note that this is now a real
  asymmetry: metadata and scores are mutable after the fact, but the one
  field most likely to be wrong is not.

**Suggestion:** keep a price table keyed on `provider` + `model` and derive
cost from `usage` at read time, treating a client-supplied `costUsd` as an
override for models you do not know. Deriving at read time means a corrected
price fixes history retroactively, and a client that sends only token counts
still gets accurate cost. Given you already sort by `costliest`, the accuracy
of this field is load-bearing for a feature you shipped.

Two smaller notes:

- Consider deriving trace-level cost as the sum of span costs. I do that
  rollup client-side so a nested call the route never sees (the query
  embedding, three frames down) still lands in the turn's total.
- A single turn here costs about $0.0009. Anywhere cost is stored or
  displayed rounded to cents, everything reads as `$0.00`.

## 4. No batching makes serverless tracing chattier than it needs to be

Still open. One trace per request means one extra outbound TLS request in the
tail of every user request. Verified latencies: 1892 ms on a cold connection,
then 819, 509, 261, 333, and 244 ms once warm.

Fine for one trace per request, which is what this site does. It gets
expensive for an agent loop wanting a trace per tool call.

**Suggestion:** accept an array of complete traces at the same endpoint,
still immutable, still one shot each, with a per-trace result array so
partial failures are legible. The 2 MiB body limit already bounds it.

## 5. NEW: scoring races trace ingestion, and the client has to paper over it

Adopting scores surfaced a race that is inherent to how the two endpoints
compose.

A trace is delivered *after* its response finishes (via `after()` in Next.js,
so tracing adds no latency to the answer). The trace id, however, reaches the
browser at the *start* of the stream, because that is the only way the client
can rate the answer it is about to read. So there is a window, roughly the
duration of the response plus the ingest round trip, in which the client
holds a valid trace id for a trace the API has never heard of. Scoring in
that window returns `404 not_found`, which is indistinguishable from scoring
a genuinely bogus id.

I handle it with a bounded retry on `404` only, at 300 ms, 1.2 s and 4 s. It
works, but every client that scores from a browser will hit this and most
will not think to retry. They will just silently lose ratings, and losing
them disproportionately on *slow* responses, which are the ones most likely
to be rated badly. That is a quiet bias in the data.

**Suggestions, cheapest first:**

- Document the race in the scores section, with the retry advice.
- Distinguish the cases: return a different code for "no such trace, and
  nothing has ever been ingested under that id in this project" versus "not
  yet". You cannot fully distinguish them, but a `404 trace_not_yet_ingested`
  hint when the id is well-formed and recent would let clients retry with
  confidence.
- Best: accept the score and hold it briefly, attaching it when the trace
  arrives, expiring it if it never does. Since scores already live in their
  own collection keyed by `traceId`, a score row that lands before its trace
  may not even be a problem for storage, only for the existence check.

## 6. NEW: no environment concept, and unknown filters are silently ignored

There is no way to tell a production trace from a preview or local one.
Verified:

| Attempt | Result |
| --- | --- |
| `environment` as a trace field | `400 invalid_trace: Unrecognized key: "environment"` |
| `GET /api/v1/traces?environment=production` | `200`, **unfiltered** |
| `GET /api/v1/traces?env=production` | `200`, **unfiltered** |
| `tags: ["env:preview"]` then `?tag=env:preview` | works |

Two separate points here.

**The missing concept.** Every deployed app has at least production, preview,
and local, and mixing them silently corrupts exactly the numbers people open
a tracing tool for: error rate, p95 latency, and cost. A developer hammering
a local build can bury a production regression. Tags carry it fine, and that
is what this integration does now (`env:production`, `env:preview`,
`env:local`, from `VERCEL_ENV`), but every user has to independently invent
the convention, and the dashboard cannot know to group by it. A first-class
optional `environment` string on the trace, filterable and shown as a
selector, is a small addition with a large payoff. The alternative you
already support, one project per environment, means juggling three API keys
and losing the ability to compare across them.

A full specification for this, written to be handed to an agent working on
the FireTrace repo, is in
[firetrace-environments-prompt.md](./firetrace-environments-prompt.md). It
puts the environment on the API key so it is stamped server-side and cannot
be spoofed, and covers migration, the dashboard, and the query-layer fix
below.

**The silent filter is the more serious bug.** `?environment=production`
returned `200` and a full, unfiltered list. A caller who assumes it worked
reads production numbers that silently include preview and local traffic,
and nothing anywhere indicates a problem. This is inconsistent with the
ingest path, which is strict and rejects unknown keys with a precise message.
Please make the query layer match: reject unknown query parameters with
`400 invalid_request` naming the parameter. Wrong data that looks right is
worse than an error, and the strictness on ingest is what makes this API
pleasant to build against in the first place.

## 7. Documentation gaps, mostly closed

The reference is much better than it was. These are the questions I had to
resolve by probing on September 3 that the docs now answer: whether `spans`
is required, whether `endedAt` is required on a span, whether `parentSpanId`
must resolve within the payload, whether span ids must be unique, and whether
uppercase hex ids are accepted. All documented now.

Still open:

| Question | Status |
| --- | --- |
| How long are traces retained? | Not documented anywhere I could find. This is usually the first question before pointing production traffic at a hosted service. |
| Is there a request rate limit, separate from `quota_exhausted`? | Not documented. |
| Are tags deduplicated or case-sensitive? | Not documented, and tags are a main filtering axis. |

Two shape notes on the read path that are worth a sentence each:

- **Spans come back at the top level, not nested under `trace`.** The write
  payload nests them as `trace.spans`, so the natural assumption is that the
  read shape mirrors it. It does not: the response is
  `{ trace, spans, scores }` and `trace.spans` is `undefined`. That
  asymmetry cost me a confused minute of believing spans had been dropped.
- **`bodyHash` is exposed on read** and explains exactly how duplicate
  detection works. Worth mentioning in the idempotency section, since it lets
  a client verify a duplicate itself.

## 8. Smaller things

- **Server-side redaction would be valuable.** Anything tracing a public chat
  stores whatever visitors type, which sooner or later includes an API key
  someone pasted. An opt-in scrubber for obvious secret shapes and email
  addresses, applied at ingest, would be a strong feature and a reason to
  prefer FireTrace over self-hosting.
- **`status` defaults to `unset` and is "not derived from spans".** Sensible,
  but most integrations only set it on failure, so dashboards will fill with
  `unset`. Consider defaulting to `ok` when `endedAt` is present and
  `errorCount` is zero.
- **An `Idempotency-Key` header would beat body-hash idempotency.** Body
  matching only helps a byte-identical retry. A client that regenerates a
  timestamp on retry, which is easy to do by accident, gets `409` instead of
  a clean duplicate.
- **`schemaVersion` is a good call.** Keep it required.

## How this repo uses the API, for reference

One trace per user-facing LLM interaction:

```
trace "chat"                            (provider openai, model, sessionId)
│                                       tags: env:production | env:preview | env:local
├── span "retrieval"                    kind: retriever
│   └── span "openai.embeddings.create" kind: embedding
└── span "openai.responses.create"      kind: llm
    score "user-feedback"               numeric 1 or 0, posted later

trace "cheat-search"
└── span "openai.responses.create"      kind: llm
```

Every trace is tagged with its deployment environment, and carries
`metadata.branch` and `metadata.commit` when the platform exposes them, so
one preview can be told from another. Filter with
`GET /api/v1/traces?tag=env:production`. See finding 6.

A real rated turn, read back from the API:

```
trace  chat            5314 ms  2017 in / 287 out   costUsd 0.00074796
  retrieval            1432 ms                      (retriever)
    embeddings.create  1252 ms  8 in                costUsd 0.00000016
  responses.create     3738 ms  2017 in / 287 out   costUsd 0.00074780
  scores: user-feedback = 0                         (thumbs down)
```

`sessionId` is a random per-tab id so the turns of one conversation group
together. Delivery goes through `after()` from `next/server`, so the POST
happens once the response is finished and never adds latency to the answer.
Failures are logged and swallowed. Trace cost is the sum of its spans,
computed client-side, per finding 3.

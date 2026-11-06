# Agent readiness: what was built, why, and what was skipped

This documents the agent-readiness work (Cloudflare readiness scan baseline: 20/100) and the design decisions behind it. Companion docs: `docs/cloudflare-config.md` (dashboard settings the repo cannot express), `docs/dns-aid-setup.md` (manual DNS records), `docs/mcp.md` (the MCP server). Human-facing overview: the `/ai` page.

## The one-paragraph architecture

Every content page has a canonical Markdown representation, generated at build time from the same sources that render the site (blog posts from their typed data, skills from their SKILL.md sources, JSX pages via Turndown over the prerendered HTML) and committed under `content/generated/`. Everything agent-facing is derived from that one corpus: the `.md` routes and `Accept: text/markdown` negotiation, `llms.txt` and `llms-full.txt`, the agent-skills artifacts and their digests, the MCP server's tools, and the chatbot's retrieval index. One extractor, many consumers; nothing is hand-maintained, and CI freshness gates (`--check` modes) fail if any committed artifact drifts from its source.

## What was implemented

| Area | Where | Notes |
| --- | --- | --- |
| Canonical host | `lib/site.ts`, `next.config.ts`, proxy | Apex is canonical; www 301s; single `SITE_URL` everywhere |
| Origin lock | `proxy.ts` + Transform Rule | `*.vercel.app` bypass closed; optional shared secret |
| Markdown for agents | `proxy.ts`, `app/api/md/`, `scripts/build-markdown.mts` | `.md` URLs cacheable; negotiated variant no-store + `Vary: Accept`; `x-markdown-tokens` |
| Bot policy | `app/robots.txt/route.ts` | 15 AI crawlers listed and allowed, Content Signals `search=yes, ai-input=yes, ai-train=yes` |
| Link headers | `proxy.ts` | llms-txt, describedby, api-catalog, mcp-server-card, sitemap, canonical, markdown alternate |
| llms.txt | `scripts/build-llms.mts` → `public/` | v2 format; full corpus ~61k tokens, auto-splits past 200k |
| JSON-LD | `lib/structured-data.ts`, `scripts/validate-jsonld.mts` | HowTo only where steps are real (/playbook); TechArticle + breadcrumbs elsewhere; validated in CI |
| Discovery docs | `app/.well-known/*`, `app/auth.md` | MCP server card, agent-skills index (sha256 digests), api-catalog linkset, truthful no-auth statement |
| MCP server | `app/api/mcp`, `docs/mcp.md` | 4 read-only tools, Streamable HTTP, stateless, rate limited |
| WebMCP | `components/web-mcp.tsx` | Feature-detected, both draft shapes, no-op elsewhere |
| Chatbot | `scripts/build-index.mts`, `app/api/chat`, `components/chat/` | Incremental index, grounded answers, citations, hard cost rails |
| Copy for AI | `components/copy-for-ai.tsx` | On every content page next to the title |
| DNS discovery | `docs/dns-aid-setup.md` | Manual records for `_index._agents` and `_mcp._agents`; both live, DNSSEC delegation still unsigned |

## Design decisions worth remembering

- **Markdown negotiation vs. two CDNs.** Next.js owns the `Vary` header on prerendered HTML and drops `Accept` from it (verified empirically; both middleware- and config-set values are replaced). So the negotiated response is `no-store` and the `.md` URL is the cacheable artifact, with a REQUIRED Cloudflare bypass-on-Accept Cache Rule closing the remaining gap of edge-cached HTML being served to agents. Full reasoning and the rule: `docs/cloudflare-config.md` section 2.
- **Committed generated content.** `content/generated/`, `public/llms*.txt`, and `index/` are committed on purpose: CI build caches are ephemeral, committing makes builds hermetic, PRs show exactly which chunks re-embed, and the corpus is small. If `index/` outgrows ~50MB, move it to blob storage.
- **In-app conversion, not Cloudflare's edge Markdown.** The in-app pipeline converts from source (better output than edge HTML conversion) and the chatbot index reuses the same extractor. Cloudflare's Markdown-for-agents feature must stay OFF or output would be double-converted (`docs/cloudflare-config.md` section 5).
- **Lexical fallback tier.** Retrieval works with no OpenAI key and no committed index (weighted term overlap over the corpus). The semantic tier activates when `index/` exists and a query embedding can be produced, and refuses stale indexes (version mismatch or <80% corpus coverage) rather than degrading silently.
- **The chat model is guarded.** `gpt-5.6-luna` by default, allowlisted with reasoning effort pinned to "none"; every other gpt-5.x tier and the o-series are refused at startup with an explanation, because reasoning models at default effort bill invisible chain-of-thought as output tokens. `reasoning_tokens` is asserted zero on every response. Rationale and numbers: `lib/chat/config.ts`.
- **The budget is reservation-based and fails closed.** Before each OpenAI call, `/api/chat` atomically reserves its worst-case tokens against the monthly counter (single INCRBY, rolled back if over budget) and settles down to actual usage when the stream terminates, so concurrent requests cannot collectively overshoot the ceiling and unknown outcomes keep their full reservation. Settlement targets the month key the reservation was taken from, so a stream that straddles a month boundary cannot push the new month's counter negative and quietly extend its budget. With Redis configured but unreachable, requests are refused rather than falling back to per-instance counters. The Redis rate limiter runs as one Lua script (prune, count, conditional add), so rejected requests never extend the window.
- **Client IP is a trust ladder, not a header read.** `cf-connecting-ip` is only trusted when proxy.ts has validated the Cloudflare Transform Rule secret (it strips and re-adds an internal marker header); otherwise the platform-set `x-real-ip` is used, which clients cannot forge. Details in `lib/request-ip.ts`.

## Deliberately skipped, and why

- **OAuth / OIDC discovery** (`openid-configuration`, `oauth-authorization-server`): meaningful only with a protected API. Everything here is public; publishing empty metadata would make the site less legible to agents, not more. `/auth.md` says this in prose.
- **OAuth Protected Resource**: same reasoning; the MCP server is intentionally public.
- **Web Bot Auth** (`http-message-signatures-directory`): that directory is for bot *operators* to publish crawler signing keys. This site operates no crawler; publishing one would be meaningless.
- **A2A agent card** (`agent-card.json`) and the `_a2a._agents` DNS record: the chatbot speaks REST and MCP, not the A2A protocol. A card advertising an A2A transport that does not exist is false advertising. If a real A2A endpoint ships someday, add both then.
- **Commerce checks** (x402, MPP, UCP, ACP): no commerce on this site; the scanner marks them informational.

With these skipped on principle, the realistic score ceiling is roughly 75-85, not 100. A perfect score would require asserting things about this site that are not true.

## Open verification items

These could not be verified from the authoring environment (network egress was restricted to a small allowlist) and should be checked once:

1. **MCP server card schema** (SEP-1649 / modelcontextprotocol PR #2127): the card uses the fields the SEP is known to define (serverInfo, transport, capabilities) but the canonical schema was unreachable. Compare `app/.well-known/mcp/server-card.json/route.ts` against the merged SEP.
2. **RFC 9727 api-catalog**: the linkset structure follows RFC 9264; verify field naming against RFC 9727 itself.
3. ~~**DNS-AID draft parameters**~~ **Resolved 2026-08-16.** Checked against `draft-mozleywilliams-dnsop-dnsaid-02`: the `_index._agents` naming is correct, HTTPS records are accepted in place of the draft's SVCB, and the draft's richer parameters (`cap`, `well-known`, …) are unregistered and cannot be published interoperably yet. The records are live; DNSSEC validation is the open half, and it is a registrar action. See `docs/dns-aid-setup.md`.
4. **Model pricing**: `lib/chat/config.ts` and `scripts/build-index.mts` embed last-known prices with "unverified" comments; check https://platform.openai.com/docs/pricing.
5. **Production headers**: run `pnpm smoke` against the production domain after deploy; some behaviors (Link header survival, negotiation at the edge, HEAD requests through the full stack) can only be proven there.

## Operational notes

- First-time setup: `pnpm gen` (build + regenerate all artifacts), then `pnpm gen:index` with `OPENAI_API_KEY` set, commit `index/`. Until then the chatbot and MCP search run on the lexical tier.
- After content edits: `pnpm gen` and commit what changed. CI fails on stale artifacts, so forgetting is loud, not silent.
- The index build's run report is the incrementality signal: a one-post edit re-embedding hundreds of chunks means hashes are being dirtied upstream; investigate before merging.

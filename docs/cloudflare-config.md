# Cloudflare configuration for agent readiness

Everything in this document lives in the Cloudflare (or Vercel) dashboard, not in the repo. It is invisible to code review, so treat this file as the source of truth for what the dashboards are supposed to look like. Every setting has a verification command; run them against the production domain, never against the `*.vercel.app` URL, because several of these behaviors only exist at the Cloudflare edge.

Zone: `thehackathonplaybook.dev` (nameservers `addilyn.ns.cloudflare.com`, Vercel origin).

Dashboard click paths below are as of August 2026. Cloudflare moves things around; if a path is stale, use the dashboard search box with the setting name.

## 0. Preconditions found by live probing (2026-08-15), do these first

1. **The zone is currently DNS-only (grey cloud): no `cf-ray` on production responses.** Every Cloudflare feature in this document (Cache Rules, AI Crawl Control, Bot Fight Mode, Transform Rules, Redirect Rules) is inert until the `A`/`CNAME` records for the apex and `www` are switched to Proxied (orange cloud) under **DNS > Records**. Two consequences while grey-cloud: the September 15 AI Crawl Control deadline in section 3 does not affect traffic yet (it starts mattering the moment you proxy), and Markdown negotiation caching is governed by Vercel alone, which respects the origin's `Vary`/`no-store` headers correctly, so negotiation is safe today. The bypass Cache Rule in section 2 becomes REQUIRED the moment you flip to orange.
2. **Redirect-loop landmine: flip Vercel's primary domain before or at deploy. (Resolved 2026-08-15: the primary domain is now the apex, and `www` 308-redirects to it, verified live.)** Production previously 307-redirected apex to `www` because the Vercel project's primary domain was `www.thehackathonplaybook.dev`. This repo makes the apex canonical and 301s `www` to apex. Deployed together those two redirects would have looped. Fix in **Vercel > Project > Settings > Domains**: set `thehackathonplaybook.dev` as the primary domain and configure `www.thehackathonplaybook.dev` to redirect to it. Verify after deploy:

```bash
curl -sI https://thehackathonplaybook.dev/ | grep -iE "^(HTTP|location)"
# expect: HTTP 200, no location header (and no redirect chain)
curl -sIL --max-redirs 3 https://www.thehackathonplaybook.dev/ | grep -iE "^(HTTP|location)"
# expect: exactly one 301/308 to the apex, then 200
```

3. **Applied 2026-08-15 via the Cloudflare API** (zone deliberately stays grey-cloud for now):
   - Section 1's `www to apex` Redirect Rule and section 2's `bypass cache for markdown negotiation` Cache Rule are created and enabled. Both are inert while the zone is DNS-only; they become live protection the moment the apex or `www` records are proxied.
   - Section 3: the zone is opted out of the September 15 default blocking (`ai_bots_migration_opt_out: true`), AI Labyrinth (`crawler_protection`) is disabled, Bot Fight Mode is off, and `ai_bots_protection`, `content_bots_protection`, and the Search/Agent/Training category policies are all non-blocking.
   - Section 4: managed robots.txt confirmed off (`is_robots_txt_managed: false`).
   - Section 6 (origin lock): deliberately skipped while grey-cloud.
   - `docs/dns-aid-setup.md`: both `_agents` HTTPS records are live (verified against 1.1.1.1), and DNSSEC is enabled and pending registry propagation (the domain is on Cloudflare Registrar, so the DS record is submitted automatically).

## 1. Canonical host redirect (Phase 1)

The canonical host is the apex, `thehackathonplaybook.dev`. The repo ships an origin-level 301 for `www` in `next.config.ts`, and Vercel's domain-level redirect (section 0) covers the platform layer; the edge-level rule below is preferred once the zone is proxied so the redirect happens before the request crosses to Vercel.

Configure: **Rules > Redirect Rules > Create rule**

- Name: `www to apex`
- When: Hostname equals `www.thehackathonplaybook.dev`
- Then: Dynamic redirect, status `301`, expression:
  `concat("https://thehackathonplaybook.dev", http.request.uri.path)`
- Preserve query string: on

Verify:

```bash
curl -sI https://www.thehackathonplaybook.dev/playbook | grep -iE "^(HTTP|location)"
# expect: HTTP/2 301 and location: https://thehackathonplaybook.dev/playbook

curl -sI https://thehackathonplaybook.dev/ | grep -iE "^HTTP"
# expect: HTTP/2 200
```

## 2. Vary and the Markdown negotiation cache (Phase 1.5A, most important)

By default Cloudflare keys its cache on the URL and ignores `Vary` (except `Accept-Encoding`). Without the rule below, the first `Accept: text/markdown` request for `/playbook/pitching` would poison the edge cache and serve raw Markdown to every human after it, or the reverse. It will look fine in curl against Vercel and break only behind the edge.

The chosen strategy (the user-facing spec called these options 3 plus 2), which the origin code implements:

1. `.md` URLs are the primary, fully cacheable artifact (distinct URL, distinct cache key, no `Vary` involved). Agents are pointed at these via `Link` headers, `llms.txt`, and the `<link rel="alternate">` tags. Origin sends them with `public, max-age=300, s-maxage=3600, stale-while-revalidate=86400` and no `Vary`.
2. `Accept: text/markdown` negotiation at the canonical URL works, and that negotiated response is served `Cache-Control: no-store` with `Vary: Accept`, so no cache layer can ever store Markdown against the HTML URL's key.
3. One gap remains, and closing it is what the Cache Rule below is for: Next.js owns the `Vary` header on prerendered HTML pages and does not include `Accept` in it (verified against next start; the framework replaces config- and middleware-set `Vary` values with its RSC vary list). So a cached HTML response at the edge carries no signal that the URL negotiates, and without the rule Cloudflare would serve that cached HTML to an agent sending `Accept: text/markdown`, never consulting the origin.

Configure (REQUIRED, not optional): **Caching > Cache Rules > Create rule**

- Name: `bypass cache for markdown negotiation`
- When (custom filter expression):
  `any(http.request.headers["accept"][*] contains "text/markdown")`
- Then: **Bypass cache**.

Available on all plans. Agent traffic negotiating via `Accept` is a small fraction of requests, and the origin is Vercel's CDN (itself cached), so the cost is negligible; humans and `.md` fetches keep full edge caching.

Optional upgrade instead of (not in addition to) the bypass rule: Cloudflare Cache Rules also support varying the cache on `Accept` with a **Normalize** action, per [Cloudflare's Vary documentation](https://developers.cloudflare.com/cache/concepts/vary/) (verified August 2026: available on all plans). That would make negotiated responses edge-cacheable per normalized Accept value. It only helps if the origin later emits `Vary: Accept` on HTML, which Next.js currently prevents; revisit if that changes. Note the normalization is lossy (lowercases, sorts by quality value, strips parameters and q-values, and may forward the normalized header to the origin), which is why the negotiation logic in `proxy.ts` uses a substring match on `text/markdown` rather than parsing quality values.

Verify (this is also automated in `scripts/smoke.mts`, run it against production after deploy):

```bash
# same URL, two Accept headers, must differ
curl -s -H "Accept: text/html" https://thehackathonplaybook.dev/playbook/pitching -o /dev/null -w "%{content_type}\n"
# expect: text/html; charset=utf-8
curl -s -H "Accept: text/markdown" https://thehackathonplaybook.dev/playbook/pitching -o /dev/null -w "%{content_type}\n"
# expect: text/markdown; charset=utf-8

# repeat each twice and read both cache layers; neither may serve the wrong body
curl -sI -H "Accept: text/markdown" https://thehackathonplaybook.dev/playbook/pitching | grep -iE "cf-cache-status|x-vercel-cache|content-type"
```

## 3. AI Crawl Control (Phase 1.5B, external deadline)

Cloudflare enforces AI crawler policy at the network layer, by category (Search, Agent, Training), above `robots.txt`. If Cloudflare is challenging `ClaudeBot` at the edge, the permissive `robots.txt` from this PR is decorative.

Cloudflare has announced that AI training and agent crawlers will be **blocked by default for new domains starting September 15, 2026**, with an opt-out available in Security settings before that date. Reporting says existing zones keep their current defaults, but that guidance is ambiguous. **Verify this zone's state before September 15, 2026.** This is the only item in this PR with an external deadline.

Check: **AI Crawl Control** (top-level product in the dashboard sidebar; formerly under Security > Bots)

1. Review the per-category and per-crawler settings. For this site every category should be **Allowed**: the entire point of the playbook is being found and cited by AI systems. Specifically confirm `GPTBot`, `ClaudeBot`, `Claude-SearchBot`, `OAI-SearchBot`, `PerplexityBot`, and `Bingbot` are not blocked or challenged.
2. If the dashboard shows a pending default change or an opt-out banner for the September 15 policy, opt this zone out of default blocking.
3. The multi-purpose crawler trap: if you ever block the Training category, crawlers that bundle training and search in one user agent (Googlebot, Applebot, Bingbot) can get caught, which would cost ordinary Google search traffic. Before saving any block, confirm Googlebot is listed as unaffected.

Verify (watch for 403s or challenge interstitials):

```bash
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +claudebot@anthropic.com" https://thehackathonplaybook.dev/
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot" https://thehackathonplaybook.dev/
# expect: 200 for both (note: a passing curl does not prove verified-bot traffic passes,
# but a 403 here proves something is blocking)
```

Also check **Security > Settings** (or Security > Bots on older dashboards) for **Bot Fight Mode / Super Bot Fight Mode**. These challenge crawlers with JavaScript challenges they cannot solve. If enabled, either disable them or add skip rules (Security > WAF > Custom rules, action Skip) for verified bot traffic (`cf.client.bot` or the Verified Bots list).

## 4. Managed robots.txt must be OFF (Phase 3 dependency)

Cloudflare's managed `robots.txt` feature overwrites the file served from the origin and instructs AI crawlers to stay away, the opposite of this site's policy. This PR generates `robots.txt` from the repo (`app/robots.txt/route.ts`); two systems writing it is worse than either alone.

Check: **AI Crawl Control > Manage AI crawlers with robots.txt** (formerly Security > Bots > block AI bots via robots.txt). Turn it off.

Detection signal if you are unsure whether it is on: the managed file begins with a content-signals preamble stating that accessing the website constitutes agreement to the signals.

Verify:

```bash
curl -s https://thehackathonplaybook.dev/robots.txt | head -20
# expect: the repo-generated file (starts with "# The Hackathon Playbook"),
# NOT a preamble about "content signals" agreement
```

## 5. Cloudflare Markdown conversion must be OFF (Phase 2 dependency)

Cloudflare can convert HTML to Markdown for agents at the edge. This site does its own conversion from source (better output, and the chatbot index reuses the same extractor). Both enabled would double-convert and mangle the output.

Check: AI Crawl Control / AI Audit area for a "Markdown for agents" or content transformation toggle. Leave it off.

Verify: the negotiation check in section 2 must return the origin's Markdown (it starts with a `# Title` header block followed by `Canonical:` and `Last updated:` lines; Cloudflare's converter would not produce that exact header).

## 6. Origin lock (Phase 1.5D)

The Vercel deployment is reachable at `*.vercel.app`, bypassing Cloudflare, its crawler controls, and the rate limiting in front of `/api/chat`. Two layers close this:

1. Already in the repo: `proxy.ts` 301-redirects any production request whose `Host` is not the canonical domain, and, when `ORIGIN_SHARED_SECRET` is set, 403s requests missing the matching `x-origin-verify` header.
2. Configure the header at the edge: **Rules > Transform Rules > Modify Request Header > Create rule**
   - Name: `origin verify`
   - When: Hostname equals `thehackathonplaybook.dev`
   - Then: Set static header `x-origin-verify` to a long random value.
   - Set the same value as the `ORIGIN_SHARED_SECRET` environment variable in Vercel (Production environment only), then redeploy.

Order matters: create the Transform Rule and the Vercel env var in the same sitting. If the env var is set while the Transform Rule is missing, all production traffic 403s.

Optionally also enable Vercel deployment protection for preview URLs (Vercel dashboard > Project > Settings > Deployment Protection).

Verify:

```bash
# through Cloudflare: fine
curl -s -o /dev/null -w "%{http_code}\n" https://thehackathonplaybook.dev/
# expect: 200

# direct to Vercel: redirected away (or 403 once ORIGIN_SHARED_SECRET is set)
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://<project>.vercel.app/
# expect: 301 https://thehackathonplaybook.dev/ (or 403)
```

## 7. Cache TTLs and purge (Phase 1.5E)

Two cache layers sit in series. `s-maxage` is consumed by Vercel's CDN; Cloudflare acts on `Cache-Control` as well. The origin sets these deliberately per route class:

| Route class | Cache-Control | Rationale |
| --- | --- | --- |
| HTML pages | Vercel-managed (static prerender) | Vercel serves and revalidates its own static output; Cloudflare respects the origin headers. |
| `.md` routes | `public, max-age=300, s-maxage=3600, stale-while-revalidate=86400` | Cacheable artifact, but must not outlive a deploy by long. |
| `llms.txt`, `llms-full.txt` | `public, max-age=300, s-maxage=3600` | Same. |
| `.well-known/*` | `public, max-age=300, s-maxage=3600` | A stale MCP server card should die within an hour. |
| `/api/chat`, `/api/mcp` | `no-store` | Never cached. |

When debugging, read `x-vercel-cache` and `cf-cache-status` together; a stale response can come from either layer and each looks fine while the other lies.

Purge on deploy (optional, TTLs above are the primary control): after a production deploy, purge the agent-facing documents so a stale server card cannot linger:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"files":["https://thehackathonplaybook.dev/llms.txt","https://thehackathonplaybook.dev/llms-full.txt","https://thehackathonplaybook.dev/.well-known/mcp/server-card.json","https://thehackathonplaybook.dev/.well-known/agent-skills/index.json","https://thehackathonplaybook.dev/.well-known/api-catalog","https://thehackathonplaybook.dev/robots.txt"]}'
```

This can be wired as a Vercel deploy hook later; with one-hour edge TTLs it is a nice-to-have, not a requirement.

## 8. Vercel-side checks

- **Fluid Compute**: Project > Settings > Functions. Enable if not already on; it reduces cold starts for `/api/chat` and `/api/mcp`, which lazy-load the embedding index into module scope.
- **Runtime**: `/api/chat`, `/api/mcp`, and the `.md` handler are Node.js runtime route handlers (they load the index and generated content from the function bundle). `proxy.ts` does header inspection and rewrites only. Do not move the API routes to Edge.
- **Env vars**: see `.env.example`. `ORIGIN_SHARED_SECRET` is Production-only by design.

## 9. DNS records for agent discovery

See `docs/dns-aid-setup.md` for the `_agents` SVCB records and the DNSSEC toggle. They are listed separately because they are copy-paste DNS records rather than settings to audit.

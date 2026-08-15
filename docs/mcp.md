# The Playbook MCP server

A remote, read-only MCP server at `/api/mcp` (Streamable HTTP transport, official TypeScript SDK, stateless mode). It exposes the site's content as tools so someone in Claude, ChatGPT, or any MCP client can pull hackathon strategy mid-hackathon without leaving their tooling. No authentication (see `/auth.md`); rate limited per client IP (default 60 requests per 10 minutes, `MCP_RATE_LIMIT_MAX` to change).

Discovery: `/.well-known/mcp/server-card.json`, plus the `Link: rel="mcp-server-card"` header on every page.

## Tools

| Tool | Arguments | What it returns |
| --- | --- | --- |
| `search_playbook` | `query`, `limit?` | The most relevant corpus sections with page title, heading, URL, and full text. |
| `get_page` | `path` | The full clean Markdown of one page (same bytes as the page's `.md` URL). |
| `list_topics` | none | Every page path with title and description, grouped by track. |
| `get_checklist` | `phase`: ideation, building, pitching, submitting | The phase's page reduced to headings and list items, for mid-hackathon use. |

Retrieval is shared with the chatbot (one corpus, one chunker, two consumers). When the committed embedding index exists and `OPENAI_API_KEY` is set, `search_playbook` is semantic; otherwise it falls back to lexical scoring, so the server works with no key and no index.

## Connecting a client

Claude (custom connector) or any Streamable HTTP client: point it at

```
https://thehackathonplaybook.dev/api/mcp
```

## Local testing with MCP Inspector

```bash
pnpm build && pnpm start          # serve on localhost:3000
npx @modelcontextprotocol/inspector
```

In the Inspector UI choose transport "Streamable HTTP", URL `http://localhost:3000/api/mcp`, connect, and exercise the tools. Quick smoke without the UI:

```bash
curl -s -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Implementation notes

- Stateless: every POST builds a fresh `McpServer` + `WebStandardStreamableHTTPServerTransport` pair (`sessionIdGenerator: undefined`, JSON responses). No session state exists, so `GET`/`DELETE` return 405.
- The corpus loads lazily into module scope from `content/generated/` and stays warm across invocations; `outputFileTracingIncludes` in `next.config.ts` bundles those files into the function.
- Node.js runtime (route handler), never Edge: it reads the corpus from the filesystem.

import { SITE_URL } from "@/lib/site";

/**
 * /auth.md, following the agent-addressed style of the workos/auth.md
 * reference (fetched before writing this). This site's version is short
 * because the truth is short: everything here is public. A fake OAuth
 * block would make the site less legible to agents, not more.
 */
const AUTH_MD = `# auth.md

You are an agent. Everything on this site is public and requires no
authentication. There is nothing to register for, no token to obtain, and
no claim ceremony to perform.

## What you can use, unauthenticated

- Any content page as Markdown: append \`.md\` to its URL, or send
  \`Accept: text/markdown\`. Index of everything: ${SITE_URL}/llms.txt
- The MCP server at ${SITE_URL}/api/mcp (Streamable HTTP, read-only
  tools: search_playbook, get_page, list_topics, get_checklist).
  Server card: ${SITE_URL}/.well-known/mcp/server-card.json
- The grounded chat API at ${SITE_URL}/api/chat (POST, JSON).

## How to identify yourself

Optional, but appreciated: send a User-Agent that names your product and
includes a contact URL, per common crawler convention.

## Rate limits

The content routes are cached and effectively unmetered. The compute
endpoints (\`/api/chat\`, \`/api/mcp\`) are rate limited per client IP;
expect roughly 20 requests per 10 minutes and an HTTP 429 with a
Retry-After header past that. There is no way to raise the limit with
credentials, because there are no credentials.

## What does not exist here

No OAuth discovery documents are published
(\`/.well-known/openid-configuration\`, \`/.well-known/oauth-authorization-server\`,
\`/.well-known/oauth-protected-resource\`): there is no protected API for
them to describe, and publishing empty metadata would be misleading.
`;

export function GET() {
  return new Response(AUTH_MD, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}

import { beforeAll, describe, expect, it } from "vitest";

/**
 * Integration tests against a running server. Gated on
 * INTEGRATION_BASE_URL (CI builds, starts `next start`, then sets it);
 * skipped otherwise so `pnpm test` works without a server.
 */
const BASE = process.env.INTEGRATION_BASE_URL;

describe.skipIf(!BASE)("integration", () => {
  beforeAll(async () => {
    for (let attempt = 0; attempt < 20; attempt++) {
      try {
        const response = await fetch(`${BASE}/api/health`);
        if (response.ok) return;
      } catch {
        // server still starting
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new Error(`Server at ${BASE} never became healthy`);
  }, 30_000);

  it(".md routes return markdown with token counts", async () => {
    const response = await fetch(`${BASE}/playbook/pitching.md`);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(Number(response.headers.get("x-markdown-tokens"))).toBeGreaterThan(100);
    const body = await response.text();
    expect(body.startsWith("# Pitching")).toBe(true);
  });

  it("Accept negotiation returns markdown with Vary and no-store at the same URL", async () => {
    const markdown = await fetch(`${BASE}/playbook/pitching`, {
      headers: { Accept: "text/markdown" },
    });
    expect(markdown.headers.get("content-type")).toContain("text/markdown");
    expect(markdown.headers.get("vary")).toContain("Accept");
    expect(markdown.headers.get("cache-control")).toContain("no-store");

    const html = await fetch(`${BASE}/playbook/pitching`);
    expect(html.headers.get("content-type")).toContain("text/html");
  });

  it("excluded pages have no markdown representation", async () => {
    const response = await fetch(`${BASE}/terms.md`);
    expect(response.status).toBe(404);
  });

  it("robots.txt carries Content Signals and AI bot groups", async () => {
    const body = await (await fetch(`${BASE}/robots.txt`)).text();
    expect(body).toContain("Content-signal: search=yes, ai-input=yes, ai-train=yes");
    expect(body).toContain("User-Agent: GPTBot");
    expect(body).toContain("User-Agent: ClaudeBot");
    expect(body).toContain("Sitemap:");
  });

  it("llms.txt and llms-full.txt serve as plain text", async () => {
    for (const path of ["/llms.txt", "/llms-full.txt"]) {
      const response = await fetch(`${BASE}${path}`);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/plain");
    }
  });

  it("discovery Link headers appear on pages", async () => {
    const response = await fetch(`${BASE}/playbook/pitching`);
    const link = response.headers.get("link") ?? "";
    expect(link).toContain('rel="llms-txt"');
    expect(link).toContain('rel="mcp-server-card"');
    expect(link).toContain('rel="canonical"');
    expect(link).toContain('type="text/markdown"');
  });

  it("every .well-known document returns valid JSON of the right shape", async () => {
    const serverCard = await (await fetch(`${BASE}/.well-known/mcp/server-card.json`)).json();
    expect(serverCard.serverInfo.name).toBe("hackathon-playbook");
    expect(serverCard.transport.type).toBe("streamable-http");

    const skills = await (await fetch(`${BASE}/.well-known/agent-skills/index.json`)).json();
    expect(skills.$schema).toContain("agentskills.io");
    expect(skills.skills.length).toBeGreaterThanOrEqual(10);

    const catalog = await fetch(`${BASE}/.well-known/api-catalog`);
    expect(catalog.headers.get("content-type")).toContain("application/linkset+json");
    expect(Array.isArray((await catalog.json()).linkset)).toBe(true);
  });

  it("skill artifacts serve and are non-empty", async () => {
    const response = await fetch(`${BASE}/.well-known/agent-skills/non-coder-mode/SKILL.md`);
    expect(response.status).toBe(200);
    expect((await response.text()).length).toBeGreaterThan(200);
  });

  it("auth.md is served, not rewritten to a page markdown 404", async () => {
    const response = await fetch(`${BASE}/auth.md`);
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("no\nauthentication");
  });

  it("MCP answers tools/list and a tool call", async () => {
    const call = (body: object) =>
      fetch(`${BASE}/api/mcp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        body: JSON.stringify(body),
      }).then((r) => r.json());

    const list = await call({ jsonrpc: "2.0", id: 1, method: "tools/list" });
    const names = list.result.tools.map((t: { name: string }) => t.name);
    expect(names).toEqual(
      expect.arrayContaining(["search_playbook", "get_page", "list_topics", "get_checklist"]),
    );

    const search = await call({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: { name: "search_playbook", arguments: { query: "pitch structure", limit: 3 } },
    });
    expect(search.result.content[0].text).toContain("URL:");
  });

  it("chat rejects invalid shapes and cross-origin requests", async () => {
    const post = (body: string, headers: Record<string, string> = {}) =>
      fetch(`${BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body,
      });

    const hasKey = Boolean(process.env.OPENAI_API_KEY);
    const invalid = await post(JSON.stringify({ nope: 1 }));
    // Without a key the route reports disabled before validation.
    expect(invalid.status).toBe(hasKey ? 400 : 503);

    if (hasKey) {
      const crossOrigin = await post(
        JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
        { Origin: "https://evil.example" },
      );
      expect(crossOrigin.status).toBe(403);

      const offCorpus = await post(
        JSON.stringify({ messages: [{ role: "user", content: "zzqxqq wvwvwv qqqqz" }] }),
      );
      expect(offCorpus.status).toBe(200);
      expect(await offCorpus.text()).toContain("doesn't cover");
    }
  });
});

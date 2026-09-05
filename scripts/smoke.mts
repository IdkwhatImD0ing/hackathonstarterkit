/**
 * Post-deploy smoke test. Run against PRODUCTION, not localhost, because
 * several behaviors only exist behind the Cloudflare edge:
 *
 *   pnpm smoke                                  # defaults to production
 *   pnpm smoke -- http://localhost:3000         # or any base URL
 *
 * Checks every .md URL from the live sitemap, the negotiation split, the
 * discovery documents, the DNS-AID records and their DNSSEC validation, and
 * reads both cache layers' headers on the way.
 * Exits non-zero on any failure.
 */
const base = (process.argv[2] ?? "https://thehackathonplaybook.dev").replace(/\/$/, "");

let failures = 0;
const fail = (message: string) => {
  failures++;
  console.error(`  FAIL ${message}`);
};
const ok = (message: string) => console.log(`  ok   ${message}`);

async function checkMarkdownUrls() {
  console.log("Markdown routes (from live sitemap):");
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) return fail("sitemap.xml contained no URLs");

  const excluded = ["/terms", "/media-kit", "/ai"];
  for (const url of urls) {
    const path = new URL(url).pathname;
    if (excluded.includes(path)) continue;
    const mdUrl = `${base}${path === "/" ? "/index.md" : `${path}.md`}`;
    const response = await fetch(mdUrl);
    const type = response.headers.get("content-type") ?? "";
    if (response.status !== 200 || !type.includes("text/markdown")) {
      fail(`${mdUrl} -> ${response.status} ${type}`);
    } else {
      ok(mdUrl);
    }
  }
}

async function checkNegotiation() {
  console.log("Content negotiation (same URL, two Accept headers):");
  const url = `${base}/playbook/pitching`;
  const asMarkdown = await fetch(url, { headers: { Accept: "text/markdown" } });
  const asHtml = await fetch(url, { headers: { Accept: "text/html" } });
  const markdownType = asMarkdown.headers.get("content-type") ?? "";
  const htmlType = asHtml.headers.get("content-type") ?? "";
  if (!markdownType.includes("text/markdown")) {
    fail(`Accept: text/markdown got ${markdownType}. If HTML, check the Cloudflare bypass Cache Rule (docs/cloudflare-config.md §2).`);
  } else ok(`markdown variant served (cf-cache-status=${asMarkdown.headers.get("cf-cache-status")}, x-vercel-cache=${asMarkdown.headers.get("x-vercel-cache")})`);
  if (!htmlType.includes("text/html")) {
    fail(`Accept: text/html got ${htmlType}: the edge cache is serving Markdown to humans!`);
  } else ok("html variant served");
}

async function checkDocuments() {
  console.log("Discovery documents:");
  const documents: [string, string][] = [
    ["/robots.txt", "Content-signal:"],
    ["/llms.txt", "# The Hackathon Playbook"],
    ["/llms-full.txt", "# "],
    ["/auth.md", "no"],
    ["/openapi.json", "openapi"],
    ["/.well-known/mcp/server-card.json", "hackathon-playbook"],
    ["/.well-known/agent-skills/index.json", "agentskills.io"],
    ["/.well-known/api-catalog", "linkset"],
    ["/api/health", "ok"],
  ];
  for (const [path, needle] of documents) {
    const response = await fetch(`${base}${path}`);
    const text = await response.text();
    if (response.status !== 200 || !text.includes(needle)) {
      fail(`${path} -> ${response.status}, expected to contain ${JSON.stringify(needle)}`);
    } else ok(path);
  }
}

type DohAnswer = { AD?: boolean; Answer?: { data: string }[] };

async function doh(name: string, type: string): Promise<DohAnswer> {
  const response = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
    { headers: { accept: "application/dns-json" } },
  );
  return (await response.json()) as DohAnswer;
}

async function checkDnsAid() {
  const zone = new URL(base).hostname;
  // DNS records belong to the real zone; skip for localhost and preview hosts.
  if (zone === "localhost" || zone.endsWith(".vercel.app")) return;

  console.log("DNS-AID discovery records (docs/dns-aid-setup.md):");
  for (const label of ["_index", "_mcp"]) {
    const name = `${label}._agents.${zone}`;
    const record = (await doh(name, "HTTPS")).Answer?.[0]?.data;
    if (!record) fail(`${name} -> no HTTPS record`);
    else ok(`${name} -> ${record}`);
  }

  // Readiness scanners resolve these over DoH and require authenticated data,
  // so an unvalidated answer fails the check even when the records are perfect.
  if ((await doh(zone, "SOA")).AD) {
    ok(`${zone} DNSSEC validates (AD=1)`);
  } else if ((await doh(zone, "DS")).Answer?.length) {
    fail(`${zone} has a DS record but answers are not authenticated (AD=0): the DS likely no longer matches the zone's KSK`);
  } else {
    fail(`${zone} answers are not authenticated (AD=0) and the registry has no DS record: the chain of trust stops at the parent. See docs/dns-aid-setup.md.`);
  }
}

async function checkChatCold() {
  console.log("Chat cold start (catches missing outputFileTracingIncludes):");
  const response = await fetch(`${base}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "ping" }] }),
  });
  // 200 (stream) and 503 (not configured) are both healthy; 500 means the
  // function bundle is missing files and died on cold start.
  if (response.status === 500) fail(`/api/chat -> 500: ${(await response.text()).slice(0, 200)}`);
  else ok(`/api/chat -> ${response.status}`);
}

await checkMarkdownUrls();
await checkNegotiation();
await checkDocuments();
await checkDnsAid();
await checkChatCold();

if (failures > 0) {
  console.error(`\n${failures} failure(s) against ${base}`);
  process.exit(1);
}
console.log(`\nAll smoke checks passed against ${base}`);

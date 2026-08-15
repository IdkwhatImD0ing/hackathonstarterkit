import { SITE_URL } from "@/lib/site";

/**
 * Generated robots.txt with explicit AI crawler policy and Content Signals.
 *
 * Everything here is a preference expressed to cooperative crawlers.
 * Enforcement happens at the Cloudflare layer (AI Crawl Control), which
 * sits above this file; keep the two in agreement per
 * docs/cloudflare-config.md sections 3 and 4. Cloudflare's managed
 * robots.txt must stay OFF or it will prepend contradictory directives.
 *
 * This site's policy is maximum reach: it is a public knowledge base whose
 * entire purpose is being found and cited, by AI systems included. Every
 * bot below is allowed on purpose. Each group is listed separately so a
 * future policy change is a one-line flip per bot, not a rewrite.
 */

/** AI crawlers, each with what it actually does. Not interchangeable. */
const AI_BOTS: { agent: string; comment: string }[] = [
  { agent: "GPTBot", comment: "OpenAI: model training" },
  { agent: "ChatGPT-User", comment: "OpenAI: live browsing on behalf of ChatGPT users" },
  { agent: "OAI-SearchBot", comment: "OpenAI: ChatGPT Search indexing" },
  { agent: "ClaudeBot", comment: "Anthropic: model training" },
  { agent: "Claude-User", comment: "Anthropic: live browsing on behalf of Claude users" },
  { agent: "Claude-SearchBot", comment: "Anthropic: Claude search indexing" },
  { agent: "PerplexityBot", comment: "Perplexity: answer engine indexing" },
  { agent: "Google-Extended", comment: "Google: Gemini training opt-in (separate from Search)" },
  { agent: "Applebot-Extended", comment: "Apple: Apple Intelligence training opt-in" },
  { agent: "CCBot", comment: "Common Crawl: open corpus that feeds many models" },
  { agent: "Meta-ExternalAgent", comment: "Meta: AI training" },
  { agent: "Bytespider", comment: "ByteDance: AI training" },
  { agent: "Amazonbot", comment: "Amazon: Alexa and Rufus answers" },
  { agent: "Bingbot", comment: "Microsoft: Bing search and Copilot answers" },
  { agent: "DuckAssistBot", comment: "DuckDuckGo: DuckAssist answers" },
];

function buildRobots(): string {
  // Preview deployments must never be crawled (they would dilute the
  // canonical domain); X-Robots-Tag noindex is also set in next.config.ts.
  if (process.env.VERCEL_ENV === "preview") {
    return ["User-Agent: *", "Disallow: /", ""].join("\n");
  }

  const lines: string[] = [
    "# The Hackathon Playbook",
    "# Battle-tested hackathon strategy from 36+ wins. Everything here is",
    "# public and intended to be read, indexed, and cited by humans and AI.",
    "#",
    `# AI-readable index of this site: ${SITE_URL}/llms.txt`,
    `# Markdown version of any page: append .md (e.g. ${SITE_URL}/playbook/pitching.md)`,
    "",
    "# Content Signals (https://contentsignals.org/) are expressed",
    "# preferences, not enforced controls:",
    "#   search:   building a search index and providing search results",
    "#   ai-input: content used as input to AI models (RAG, grounding, answers)",
    "#   ai-train: training or fine-tuning AI models",
    "# All three are deliberately 'yes': discovery is the point of this site.",
    "",
    "User-Agent: *",
    "Content-signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "",
  ];

  for (const bot of AI_BOTS) {
    lines.push(
      `# ${bot.comment}`,
      `User-Agent: ${bot.agent}`,
      "Allow: /",
      "",
    );
  }

  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`, "");
  return lines.join("\n");
}

export function GET() {
  return new Response(buildRobots(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}

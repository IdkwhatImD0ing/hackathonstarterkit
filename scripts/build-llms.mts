/**
 * Generate /llms.txt and /llms-full.txt into public/, per the llms.txt v2
 * spec (https://github.com/AnswerDotAI/llms-txt): H1, blockquote summary,
 * freeform context, then H2-delimited link lists pointing at the .md
 * representations. "Optional" is the spec-reserved section for links an
 * agent can drop under context pressure.
 *
 * Reads the generated Markdown corpus, so run scripts/build-markdown.mts
 * first. Committed output; CI runs --check.
 *
 * Usage:  pnpm gen:llms  |  pnpm gen:llms --check
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { countTokens } from "gpt-tokenizer";
import { getContentPages, markdownFileKey, markdownUrlPath, type ContentPage } from "../lib/content-pages";
import { SITE_URL } from "../lib/site";

const ROOT = process.cwd();
const MD_DIR = join(ROOT, "content", "generated", "md");
const PUBLIC_DIR = join(ROOT, "public");

/** Threshold above which llms-full.txt splits into per-track files. */
const FULL_SPLIT_TOKENS = 200_000;

function link(page: ContentPage): string {
  return `- [${page.title}](${SITE_URL}${markdownUrlPath(page.path)}): ${page.description}`;
}

function buildLlmsTxt(pages: ContentPage[]): string {
  const playbook = pages.filter((p) => p.track === "playbook" && p.path !== "/playbook");
  const nonCoders = pages.filter((p) => p.track === "non-coders" && p.path !== "/non-coders");
  const skills = pages.filter((p) => p.track === "skills");
  const blog = pages.filter((p) => p.track === "blog" && p.path !== "/blog");
  const indexes = pages.filter((p) =>
    ["/", "/playbook", "/non-coders", "/blog"].includes(p.path),
  );

  return [
    "# The Hackathon Playbook",
    "",
    "> Battle-tested hackathon strategy from 36+ wins and $100K+ in prizes, by Bill Zhang.",
    "> Covers team formation, ideation, validation, execution, pitching, submission, and",
    "> what to do after the hackathon, plus a dedicated track for non-coders building with AI.",
    "",
    "The playbook is a 7-phase system, ordered the way a hackathon actually unfolds; read",
    "the phases in sequence for the full method, or jump to the phase you are in right now.",
    "The non-coder track shows domain experts how to win with AI tools instead of code, and",
    "ships installable AI skills (slash commands) for Cursor and Claude Code. The blog holds",
    "long-form write-ups of specific strategies. Every page on this site has a Markdown",
    `version at the same URL with .md appended, and llms-full.txt contains the whole corpus.`,
    `A read-only MCP server exposing search over this content lives at ${SITE_URL}/api/mcp`,
    `(see ${SITE_URL}/.well-known/mcp/server-card.json).`,
    "",
    "## Playbook",
    "",
    ...playbook.map(link),
    "",
    "## For Non-Coders",
    "",
    ...nonCoders.map(link),
    "",
    "## AI Skills",
    "",
    ...skills.map(link),
    "",
    "## Blog",
    "",
    ...blog.map(link),
    "",
    "## Optional",
    "",
    ...indexes.map(link),
    `- [Full corpus](${SITE_URL}/llms-full.txt): every page of this site as one Markdown file`,
    "",
  ].join("\n");
}

function pageMarkdown(page: ContentPage): string {
  const file = join(MD_DIR, `${markdownFileKey(page.path)}.md`);
  return readFileSync(file, "utf8").trim();
}

function main() {
  const check = process.argv.includes("--check");
  const pages = getContentPages();

  const outputs = new Map<string, string>();
  outputs.set("llms.txt", buildLlmsTxt(pages));

  const fullDocs = pages.map(pageMarkdown);
  const full = fullDocs.join("\n\n---\n\n") + "\n";
  const fullTokens = countTokens(full);

  if (fullTokens > FULL_SPLIT_TOKENS) {
    // Split topically and keep llms-full.txt as a pointer file.
    const tracks: [string, (p: ContentPage) => boolean][] = [
      ["llms-playbook.txt", (p) => p.track === "playbook" || p.track === "home"],
      ["llms-non-coders.txt", (p) => p.track === "non-coders" || p.track === "skills"],
      ["llms-blog.txt", (p) => p.track === "blog"],
    ];
    const pointerLines = [
      "# The Hackathon Playbook: full corpus, split by topic",
      "",
      `> The full corpus exceeds ${FULL_SPLIT_TOKENS.toLocaleString()} tokens, so it is split:`,
      "",
    ];
    for (const [file, match] of tracks) {
      const docs = pages.filter(match).map(pageMarkdown);
      outputs.set(file, docs.join("\n\n---\n\n") + "\n");
      pointerLines.push(`- [${file}](${SITE_URL}/${file})`);
    }
    outputs.set("llms-full.txt", pointerLines.join("\n") + "\n");
  } else {
    outputs.set("llms-full.txt", full);
  }

  if (check) {
    const stale: string[] = [];
    for (const [file, content] of outputs) {
      const path = join(PUBLIC_DIR, file);
      if (!existsSync(path) || readFileSync(path, "utf8") !== content) stale.push(file);
    }
    if (stale.length > 0) {
      console.error(`Stale llms files: ${stale.join(", ")}`);
      console.error("Run `pnpm gen:llms` and commit the result.");
      process.exit(1);
    }
    console.log("llms.txt and llms-full.txt are fresh.");
    return;
  }

  for (const [file, content] of outputs) {
    writeFileSync(join(PUBLIC_DIR, file), content);
  }
  console.log(
    `Wrote ${outputs.size} file(s): llms.txt (${countTokens(outputs.get("llms.txt")!).toLocaleString()} tokens), llms-full.txt corpus ${fullTokens.toLocaleString()} tokens${fullTokens > FULL_SPLIT_TOKENS ? " (split by track)" : ""}.`,
  );
}

main();

/**
 * Generate the Markdown representation of every content page into
 * content/generated/, straight from the same sources that render the site:
 *
 * - blog posts: from the typed data in lib/blog/posts
 * - skills: from the SKILL.md sources in skills/
 * - JSX pages (playbook, non-coders, homepage, indexes): converted from the
 *   prerendered HTML in .next/server/app, so run `next build` first
 *
 * The output is committed. CI runs `--check` after a build and fails if the
 * committed files drift from what the sources produce.
 *
 * Usage:
 *   pnpm gen:md            regenerate content/generated/
 *   pnpm gen:md --check    verify committed output is fresh (no writes)
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { countTokens } from "gpt-tokenizer";
import {
  getContentPages,
  markdownFileKey,
  type ContentPage,
} from "../lib/content-pages";
import { getBlogBySlug } from "../lib/blog";
import { getSkillBySlug } from "../lib/non-coder-skills";
import { renderBlogPostMarkdown } from "../lib/markdown/render-blog";
import { renderSkillMarkdown } from "../lib/markdown/render-skill";
import { htmlPageToMarkdown, markdownDocument } from "../lib/markdown/html-to-md";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "content", "generated");
const HTML_DIR = join(ROOT, ".next", "server", "app");

interface ManifestEntry {
  file: string;
  tokens: number;
  title: string;
  description: string;
  track: string;
  updated?: string;
}

function renderBody(page: ContentPage): string {
  switch (page.source) {
    case "blog": {
      const post = getBlogBySlug(page.slug!);
      if (!post) throw new Error(`No blog post for slug ${page.slug}`);
      return renderBlogPostMarkdown(post);
    }
    case "skill": {
      const skill = getSkillBySlug(page.slug!);
      if (!skill) throw new Error(`No skill for slug ${page.slug}`);
      return renderSkillMarkdown(skill);
    }
    case "jsx": {
      const htmlPath = join(HTML_DIR, `${markdownFileKey(page.path)}.html`);
      if (!existsSync(htmlPath)) {
        throw new Error(
          `Missing prerendered HTML for ${page.path} at ${htmlPath}. Run \`pnpm build\` first.`,
        );
      }
      return htmlPageToMarkdown(readFileSync(htmlPath, "utf8"));
    }
  }
}

function generate(): { files: Map<string, string>; manifest: Record<string, ManifestEntry> } {
  const files = new Map<string, string>();
  const manifest: Record<string, ManifestEntry> = {};

  for (const page of getContentPages()) {
    const body = renderBody(page);
    const doc = markdownDocument({
      title: page.title,
      path: page.path,
      description: page.description,
      updated: page.updated,
      body,
    });
    const file = `md/${markdownFileKey(page.path)}.md`;
    files.set(file, doc);
    manifest[page.path] = {
      file,
      tokens: countTokens(doc),
      title: page.title,
      description: page.description,
      track: page.track,
      ...(page.updated ? { updated: page.updated } : {}),
    };
  }

  return { files, manifest };
}

function main() {
  const check = process.argv.includes("--check");
  const { files, manifest } = generate();
  const manifestJson = JSON.stringify(manifest, null, 2) + "\n";

  if (check) {
    const stale: string[] = [];
    for (const [file, content] of files) {
      const full = join(OUT_DIR, file);
      if (!existsSync(full) || readFileSync(full, "utf8") !== content) stale.push(file);
    }
    const manifestPath = join(OUT_DIR, "md-manifest.json");
    if (!existsSync(manifestPath) || readFileSync(manifestPath, "utf8") !== manifestJson) {
      stale.push("md-manifest.json");
    }
    if (stale.length > 0) {
      console.error(`Stale generated Markdown (${stale.length} file(s)):`);
      for (const f of stale) console.error(`  content/generated/${f}`);
      console.error("Run `pnpm build && pnpm gen:md` and commit the result.");
      process.exit(1);
    }
    console.log(`Markdown corpus fresh: ${files.size} pages.`);
    return;
  }

  rmSync(join(OUT_DIR, "md"), { recursive: true, force: true });
  const totalTokens = Object.values(manifest).reduce((sum, e) => sum + e.tokens, 0);
  for (const [file, content] of files) {
    const full = join(OUT_DIR, file);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
  }
  writeFileSync(join(OUT_DIR, "md-manifest.json"), manifestJson);
  console.log(
    `Generated ${files.size} Markdown pages (${totalTokens.toLocaleString()} tokens) into content/generated/`,
  );
}

main();

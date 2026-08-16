import { readFileSync } from "node:fs";
import { join } from "node:path";
import { chunkPage, stripDocumentHeader, type Chunk } from "./chunker";
import { SITE_URL } from "../site";

/**
 * The retrieval corpus: every content page's Markdown, chunked. Loaded
 * once into module scope so it stays warm across serverless invocations,
 * and shared by the MCP server and the chat endpoint (one index, two
 * consumers). Reads the same committed files the .md routes serve, so the
 * chatbot can never cite text that is not on the site.
 */

export interface CorpusChunk extends Chunk {
  pageTitle: string;
  track: string;
  url: string;
  mdUrl: string;
}

interface ManifestEntry {
  file: string;
  tokens: number;
  title: string;
  description: string;
  track: string;
  updated?: string;
}

const GENERATED_DIR = join(process.cwd(), "content", "generated");

let corpusCache: CorpusChunk[] | null = null;
let manifestCache: Record<string, ManifestEntry> | null = null;

export function loadManifest(): Record<string, ManifestEntry> {
  manifestCache ??= JSON.parse(
    readFileSync(join(GENERATED_DIR, "md-manifest.json"), "utf8"),
  ) as Record<string, ManifestEntry>;
  return manifestCache;
}

export function loadPageMarkdown(pagePath: string): string | null {
  const entry = loadManifest()[pagePath];
  if (!entry) return null;
  return readFileSync(join(GENERATED_DIR, entry.file), "utf8");
}

export function loadCorpus(): CorpusChunk[] {
  if (corpusCache) return corpusCache;
  const chunks: CorpusChunk[] = [];
  for (const [pagePath, entry] of Object.entries(loadManifest())) {
    const doc = readFileSync(join(GENERATED_DIR, entry.file), "utf8");
    const body = stripDocumentHeader(doc);
    for (const chunk of chunkPage(pagePath, entry.title, body)) {
      chunks.push({
        ...chunk,
        pageTitle: entry.title,
        track: entry.track,
        url: `${SITE_URL}${pagePath === "/" ? "/" : pagePath}`,
        mdUrl: `${SITE_URL}${pagePath === "/" ? "/index.md" : `${pagePath}.md`}`,
      });
    }
  }
  corpusCache = chunks;
  return chunks;
}

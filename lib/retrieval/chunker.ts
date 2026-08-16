import { createHash } from "node:crypto";
import { countTokens } from "gpt-tokenizer";

/**
 * Heading-anchored chunking over the generated Markdown corpus.
 *
 * The design constraint is incrementality (see scripts/build-index.mts):
 * chunk identity must survive edits elsewhere in the document. Chunks are
 * anchored to the heading tree, never to sliding windows, so an edit
 * inside one section dirties only that section's chunks. Oversized
 * sections split on paragraph boundaries, never inside a fenced code
 * block.
 *
 * Two distinct fields per chunk, and the distinction is the whole design:
 * - id: stable across edits (`${pagePath}#${headingSlugPath}#${ordinal}`)
 * - contentHash: sha256 of the normalized text; changes when text changes
 *
 * CHUNKER_VERSION must be bumped whenever the logic here changes; a mixed
 * index built by two chunker versions retrieves subtly badly and nothing
 * errors, so the index build detects the mismatch and rebuilds from
 * scratch.
 */
export const CHUNKER_VERSION = 2;
export const NORMALIZER_VERSION = 1;

/** Above this, a section splits into multiple chunks. */
const MAX_CHUNK_TOKENS = 800;

export interface Chunk {
  id: string;
  pagePath: string;
  headingSlugPath: string;
  ordinal: number;
  /** The section heading trail, human readable ("Pitching > The Demo"). */
  heading: string;
  text: string;
  tokens: number;
  contentHash: string;
}

/**
 * Normalization applied before hashing: line endings to \n, trailing
 * whitespace stripped, outer whitespace trimmed. Nothing volatile (build
 * timestamps, generated dates) exists in the corpus body; the document
 * header (canonical URL + last-updated line) is excluded from chunking
 * entirely by chunkPage below, and scripts/build-index.mts asserts that
 * unchanged content produces unchanged hashes across runs.
 */
export function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
    .trim();
}

export function contentHash(normalizedText: string): string {
  return createHash("sha256").update(normalizedText, "utf8").digest("hex");
}

function slugify(heading: string): string {
  return (
    heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

interface Section {
  slugPath: string;
  heading: string;
  lines: string[];
}

/**
 * Split a Markdown body into heading-delimited sections. Content before
 * the first heading becomes the "intro" section. H2 starts a new top
 * section; H3+ nests under the current H2 (slugPath "h2-slug/h3-slug").
 * Headings inside fenced code blocks are text, not structure.
 */
function splitSections(body: string, pageTitle: string): Section[] {
  const sections: Section[] = [];
  // Two headings can slugify identically (repeated titles, or the "section"
  // fallback for symbol-only headings). Without deduplication their chunks
  // share an id, and the embedding index joins vectors by id, so one
  // section silently shadows the other in retrieval.
  const used = new Map<string, number>();
  const unique = (slug: string): string => {
    const n = (used.get(slug) ?? 0) + 1;
    used.set(slug, n);
    return n === 1 ? slug : `${slug}-${n}`;
  };
  let current: Section = { slugPath: unique("intro"), heading: pageTitle, lines: [] };
  let h2Slug = "";
  let h2Heading = "";
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^(```|~~~)/.test(line.trim())) inFence = !inFence;
    const match = !inFence && line.match(/^(#{2,6})\s+(.*)$/);
    if (match) {
      sections.push(current);
      const level = match[1].length;
      const heading = match[2].trim();
      if (level === 2 || !h2Slug) {
        h2Slug = unique(slugify(heading));
        h2Heading = heading;
        current = { slugPath: h2Slug, heading, lines: [line] };
      } else {
        current = {
          slugPath: unique(`${h2Slug}/${slugify(heading)}`),
          heading: `${h2Heading} > ${heading}`,
          lines: [line],
        };
      }
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);
  return sections.filter((s) => normalizeText(s.lines.join("\n")).length > 0);
}

/** Split an oversized section on paragraph boundaries, keeping fences whole. */
function splitByParagraphs(text: string): string[] {
  const paragraphs: string[] = [];
  let buffer: string[] = [];
  let inFence = false;
  for (const line of text.split("\n")) {
    if (/^(```|~~~)/.test(line.trim())) inFence = !inFence;
    if (line.trim() === "" && !inFence) {
      if (buffer.length) paragraphs.push(buffer.join("\n"));
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length) paragraphs.push(buffer.join("\n"));

  const parts: string[] = [];
  let part: string[] = [];
  let partTokens = 0;
  for (const paragraph of paragraphs) {
    const tokens = countTokens(paragraph);
    if (partTokens + tokens > MAX_CHUNK_TOKENS && part.length > 0) {
      parts.push(part.join("\n\n"));
      part = [];
      partTokens = 0;
    }
    part.push(paragraph);
    partTokens += tokens;
  }
  if (part.length) parts.push(part.join("\n\n"));
  return parts;
}

/**
 * Chunk one page's Markdown document. `body` must be the content after the
 * document header separator (no canonical/last-updated lines).
 */
export function chunkPage(pagePath: string, pageTitle: string, body: string): Chunk[] {
  const chunks: Chunk[] = [];
  for (const section of splitSections(body, pageTitle)) {
    const sectionText = normalizeText(section.lines.join("\n"));
    const pieces =
      countTokens(sectionText) > MAX_CHUNK_TOKENS
        ? splitByParagraphs(sectionText)
        : [sectionText];
    pieces.forEach((piece, ordinal) => {
      const text = normalizeText(piece);
      if (!text) return;
      chunks.push({
        id: `${pagePath}#${section.slugPath}#${ordinal}`,
        pagePath,
        headingSlugPath: section.slugPath,
        ordinal,
        heading: section.heading,
        text,
        tokens: countTokens(text),
        contentHash: contentHash(text),
      });
    });
  }
  return chunks;
}

/** Strip the generated document header, returning only the chunkable body. */
export function stripDocumentHeader(doc: string): string {
  const separator = doc.indexOf("\n---\n");
  return separator === -1 ? doc : doc.slice(separator + 5);
}

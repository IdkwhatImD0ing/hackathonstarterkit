import { loadCorpus, type CorpusChunk } from "./corpus";

/**
 * Retrieval over the corpus, shared by /api/mcp and /api/chat.
 *
 * Two tiers:
 * - Semantic (cosine over the committed embedding index), used when the
 *   index exists and OPENAI_API_KEY is set to embed the query. Wired up
 *   by lib/retrieval/semantic.ts.
 * - Lexical fallback (weighted term overlap), always available: no API
 *   key, no index, no cold-start download. This keeps the MCP server
 *   fully functional even before the first embedding run.
 */

export interface SearchResult {
  chunk: CorpusChunk;
  score: number;
}

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "do", "for", "from",
  "how", "i", "in", "is", "it", "my", "of", "on", "or", "the", "this",
  "to", "what", "when", "with", "you", "your",
]);

function terms(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
    .map((t) => (t.length > 4 && t.endsWith("s") ? t.slice(0, -1) : t));
}

export function lexicalSearch(query: string, limit: number): SearchResult[] {
  const queryTerms = [...new Set(terms(query))];
  if (queryTerms.length === 0) return [];

  const results: SearchResult[] = [];
  for (const chunk of loadCorpus()) {
    const haystack = chunk.text.toLowerCase();
    const headingTerms = new Set(terms(`${chunk.pageTitle} ${chunk.heading}`));
    let score = 0;
    for (const term of queryTerms) {
      const occurrences = haystack.split(term).length - 1;
      if (occurrences > 0) score += 1 + Math.min(occurrences, 5) * 0.2;
      if (headingTerms.has(term)) score += 2;
    }
    if (score > 0) {
      // Normalize so short queries don't favor long chunks unduly.
      results.push({ chunk, score: score / queryTerms.length });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

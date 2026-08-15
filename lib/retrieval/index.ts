import { lexicalSearch, type SearchResult } from "./search";

/**
 * The one retrieval entry point both consumers (/api/mcp and /api/chat)
 * call. Uses the semantic index when it exists and a query embedding can
 * be produced; falls back to lexical scoring otherwise, so retrieval
 * works before the first embedding run and when OPENAI_API_KEY is absent.
 *
 * The semantic tier is added by the chatbot phase (lib/retrieval/semantic.ts).
 */
export async function searchCorpus(query: string, limit: number): Promise<SearchResult[]> {
  return lexicalSearch(query, limit);
}

export type { SearchResult } from "./search";

import { lexicalSearch, type SearchResult } from "./search";
import { semanticSearch } from "./semantic";

/**
 * The one retrieval entry point both consumers (/api/mcp and /api/chat)
 * call. Semantic (committed embedding index + query embedding) when
 * available; lexical fallback otherwise, so retrieval works before the
 * first embedding run and when OPENAI_API_KEY is absent. Semantic errors
 * degrade to lexical rather than failing the request.
 */
export async function searchCorpus(
  query: string,
  limit: number,
  options?: { pageContext?: string },
): Promise<SearchResult[]> {
  try {
    const semantic = await semanticSearch(query, limit, options?.pageContext);
    if (semantic !== null) return semantic;
  } catch (error) {
    console.warn("Semantic search failed; falling back to lexical.", error);
  }
  return lexicalSearch(query, limit);
}

export type { SearchResult } from "./search";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { startChildSpan } from "@/lib/tracing/firetrace";
import { estimateCostUsd } from "@/lib/tracing/pricing";
import { CHUNKER_VERSION, NORMALIZER_VERSION } from "./chunker";
import { loadCorpus, type CorpusChunk } from "./corpus";
import type { SearchResult } from "./search";

/**
 * Semantic retrieval over the committed embedding index
 * (index/manifest.json + index/embeddings.bin, built by
 * scripts/build-index.mts).
 *
 * Chunk text is not stored in the index; ids are re-derived at runtime by
 * running the same chunker over the same committed Markdown, then joined
 * to their vectors by id. If the index was built by a different chunker
 * or model version, or covers too little of the current corpus, semantic
 * search reports itself unavailable and retrieval falls back to lexical.
 */

const INDEX_DIR = join(process.cwd(), "index");

/** Results below this cosine similarity are noise, not answers. */
const RELEVANCE_FLOOR = 0.25;
/** Additive boost for chunks from the page the user is currently reading. */
const PAGE_CONTEXT_BOOST = 0.1;

interface IndexManifest {
  embeddingModel: string;
  embeddingDims: number;
  chunkerVersion: number;
  normalizerVersion: number;
  chunks: Record<string, { contentHash: string }>;
}

interface SemanticIndex {
  model: string;
  dims: number;
  entries: { chunk: CorpusChunk; vector: Float32Array }[];
}

let indexCache: SemanticIndex | null | undefined;

export function loadSemanticIndex(): SemanticIndex | null {
  if (indexCache !== undefined) return indexCache;
  indexCache = null;

  const manifestPath = join(INDEX_DIR, "manifest.json");
  const binPath = join(INDEX_DIR, "embeddings.bin");
  if (!existsSync(manifestPath) || !existsSync(binPath)) return indexCache;

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as IndexManifest;
    if (
      manifest.chunkerVersion !== CHUNKER_VERSION ||
      manifest.normalizerVersion !== NORMALIZER_VERSION
    ) {
      console.warn(
        "Semantic index version mismatch with current chunker; using lexical retrieval. Rebuild with `pnpm gen:index`.",
      );
      return indexCache;
    }

    const raw = readFileSync(binPath);
    const all = new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
    const ids = Object.keys(manifest.chunks);
    const byId = new Map<string, Float32Array>();
    ids.forEach((id, i) => {
      byId.set(id, all.slice(i * manifest.embeddingDims, (i + 1) * manifest.embeddingDims));
    });

    const corpus = loadCorpus();
    const entries: SemanticIndex["entries"] = [];
    for (const chunk of corpus) {
      const vector = byId.get(chunk.id);
      if (vector) entries.push({ chunk, vector });
    }

    // A stale index silently degrades retrieval; below 80% coverage of the
    // live corpus it is worse than lexical, so refuse it.
    if (entries.length / corpus.length < 0.8) {
      console.warn(
        `Semantic index covers ${entries.length}/${corpus.length} chunks; using lexical retrieval. Rebuild with \`pnpm gen:index\`.`,
      );
      return indexCache;
    }

    indexCache = { model: manifest.embeddingModel, dims: manifest.embeddingDims, entries };
  } catch (error) {
    console.warn("Failed to load semantic index; using lexical retrieval.", error);
  }
  return indexCache;
}

export async function embedQuery(query: string, model: string, dims: number): Promise<Float32Array> {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI();
  // Nests under the caller's retrieval span when one is open (the chat
  // route opens one). A no-op for callers outside a traced request.
  const span = startChildSpan("openai.embeddings.create", "embedding", {
    provider: "openai",
    model,
    input: query,
    attributes: { dimensions: dims },
  });
  try {
    const response = await client.embeddings.create({ model, input: query, dimensions: dims });
    span?.end({
      usage: {
        inputTokens: response.usage?.prompt_tokens,
        totalTokens: response.usage?.total_tokens,
      },
      costUsd: estimateCostUsd(model, { inputTokens: response.usage?.prompt_tokens }),
    });
    return Float32Array.from(response.data[0].embedding);
  } catch (error) {
    span?.end({ status: "error" });
    throw error;
  }
}

/** OpenAI embeddings are unit-normalized, so dot product = cosine. */
function dot(a: Float32Array, b: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

export async function semanticSearch(
  query: string,
  limit: number,
  pageContext?: string,
): Promise<SearchResult[] | null> {
  if (!process.env.OPENAI_API_KEY) return null;
  const index = loadSemanticIndex();
  if (!index) return null;

  const queryVector = await embedQuery(query, index.model, index.dims);
  const results: SearchResult[] = [];
  for (const { chunk, vector } of index.entries) {
    let score = dot(queryVector, vector);
    if (pageContext && chunk.pagePath === pageContext) score += PAGE_CONTEXT_BOOST;
    if (score >= RELEVANCE_FLOOR) results.push({ chunk, score });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

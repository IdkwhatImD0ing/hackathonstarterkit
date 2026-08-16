/**
 * Incremental embedding index builder.
 *
 * The invariant this script exists to protect: a build where nothing
 * changed makes ZERO embedding API calls, and a build where one post
 * changed re-embeds only the chunks in that post that actually changed.
 * The run summary printed at the end is the primary signal that
 * incrementality is working; a full re-embed after a one-line edit means
 * something upstream is dirtying hashes and must be investigated, not
 * merged.
 *
 * How it stays incremental:
 * - Chunks are heading-anchored (lib/retrieval/chunker.ts), so an edit
 *   dirties only its own section.
 * - Chunk identity (id) is separate from chunk content (contentHash).
 * - Embeddings are cached globally by `${model}:${contentHash}`, so a
 *   section moved between pages, or boilerplate repeated across pages,
 *   re-uses its vector for free.
 * - A page-level sourceHash check skips unchanged pages before any
 *   chunking or hashing happens (two-level diff).
 * - The cache IS the committed index (index/manifest.json +
 *   index/embeddings.bin, packed Float32Array in manifest chunk order),
 *   so it survives CI's ephemeral build caches and makes builds hermetic.
 *
 * Full rebuilds happen automatically, with the reason logged, when
 * embeddingModel, chunkerVersion, or normalizerVersion differ from the
 * committed manifest. A mixed index built by two chunker versions fails
 * retrieval silently, which is why this is not left to a manual flag.
 *
 * Flags:
 *   --force     full rebuild (ignore the committed index)
 *   --dry-run   report the diff, call no APIs, exit 1 if anything is stale
 *   --watch     re-index when the generated Markdown changes (dev)
 *
 * Requires OPENAI_API_KEY only when something actually needs embedding.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync, watch } from "node:fs";
import { join } from "node:path";
import {
  CHUNKER_VERSION,
  NORMALIZER_VERSION,
  chunkPage,
  stripDocumentHeader,
  type Chunk,
} from "../lib/retrieval/chunker";

const ROOT = process.cwd();
const MD_DIR = join(ROOT, "content", "generated");
const INDEX_DIR = join(ROOT, "index");
const MANIFEST_PATH = join(INDEX_DIR, "manifest.json");
const EMBEDDINGS_PATH = join(INDEX_DIR, "embeddings.bin");

const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";
const EMBEDDING_DIMS = 1536;
// text-embedding-3-small pricing as last known (USD per 1M tokens). The
// pricing page was unreachable from the authoring environment; verify at
// https://platform.openai.com/docs/pricing before trusting cost output.
const PRICE_PER_MTOKEN = 0.02;

const BATCH_SIZE = 100;
const BATCH_TOKEN_LIMIT = 250_000;
const MAX_RETRIES = 5;

interface ManifestChunk {
  contentHash: string;
  tokens: number;
  pageTitle: string;
  sectionHeading: string;
  url: string;
  mdUrl: string;
  track: string;
}

interface IndexManifest {
  embeddingModel: string;
  embeddingDims: number;
  chunkerVersion: number;
  normalizerVersion: number;
  generatedAt: string;
  pages: Record<string, { sourceHash: string; chunkIds: string[] }>;
  chunks: Record<string, ManifestChunk>;
}

interface MdManifestEntry {
  file: string;
  title: string;
  description: string;
  track: string;
}

function sha256(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

function loadPrevious(force: boolean): { manifest: IndexManifest | null; vectors: Map<string, Float32Array> } {
  if (force || !existsSync(MANIFEST_PATH) || !existsSync(EMBEDDINGS_PATH)) {
    if (force) console.log("Full rebuild: --force.");
    return { manifest: null, vectors: new Map() };
  }
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as IndexManifest;

  const reasons: string[] = [];
  if (manifest.embeddingModel !== EMBEDDING_MODEL)
    reasons.push(`embeddingModel ${manifest.embeddingModel} -> ${EMBEDDING_MODEL}`);
  if (manifest.chunkerVersion !== CHUNKER_VERSION)
    reasons.push(`chunkerVersion ${manifest.chunkerVersion} -> ${CHUNKER_VERSION}`);
  if (manifest.normalizerVersion !== NORMALIZER_VERSION)
    reasons.push(`normalizerVersion ${manifest.normalizerVersion} -> ${NORMALIZER_VERSION}`);
  if (reasons.length > 0) {
    console.log(`Full rebuild forced by version change: ${reasons.join(", ")}.`);
    return { manifest: null, vectors: new Map() };
  }

  // Global content-addressed vector cache from the previous index.
  const raw = readFileSync(EMBEDDINGS_PATH);
  const all = new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
  const vectors = new Map<string, Float32Array>();
  const ids = Object.keys(manifest.chunks);
  ids.forEach((id, i) => {
    const chunk = manifest.chunks[id];
    const key = `${manifest.embeddingModel}:${chunk.contentHash}`;
    if (!vectors.has(key)) {
      vectors.set(key, all.slice(i * manifest.embeddingDims, (i + 1) * manifest.embeddingDims));
    }
  });
  return { manifest, vectors };
}

async function embedBatch(inputs: string[]): Promise<Float32Array[]> {
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI();
  for (let attempt = 0; ; attempt++) {
    try {
      const response = await client.embeddings.create({
        model: EMBEDDING_MODEL,
        input: inputs,
        dimensions: EMBEDDING_DIMS,
      });
      return response.data
        .sort((a, b) => a.index - b.index)
        .map((d) => Float32Array.from(d.embedding));
    } catch (error) {
      const status = (error as { status?: number }).status;
      const retryable = status === 429 || (status !== undefined && status >= 500);
      if (!retryable || attempt >= MAX_RETRIES) throw error;
      const delay = 2 ** attempt * 1000 + Math.random() * 500;
      console.warn(`Embedding batch failed (${status}), retrying in ${Math.round(delay)}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

function persist(
  manifest: IndexManifest,
  vectors: Map<string, Float32Array>,
  opts: { partial?: boolean } = {},
) {
  mkdirSync(INDEX_DIR, { recursive: true });
  let toWrite = manifest;
  if (opts.partial) {
    // Mid-build checkpoint: later batches' vectors do not exist yet, so
    // write only the chunks that have them, and only pages whose chunks
    // all survived. A resumed run re-chunks the incomplete pages and
    // reuses these cached vectors; the final persist is strict.
    const chunks = Object.fromEntries(
      Object.entries(manifest.chunks).filter(([, chunk]) =>
        vectors.has(`${manifest.embeddingModel}:${chunk.contentHash}`),
      ),
    );
    const pages = Object.fromEntries(
      Object.entries(manifest.pages).filter(([, page]) =>
        page.chunkIds.every((id) => id in chunks),
      ),
    );
    toWrite = { ...manifest, pages, chunks };
  }
  const ids = Object.keys(toWrite.chunks);
  const out = new Float32Array(ids.length * toWrite.embeddingDims);
  ids.forEach((id, i) => {
    const key = `${toWrite.embeddingModel}:${toWrite.chunks[id].contentHash}`;
    const vector = vectors.get(key);
    if (!vector) throw new Error(`Missing vector for ${id} (${key})`);
    out.set(vector, i * toWrite.embeddingDims);
  });
  writeFileSync(MANIFEST_PATH, JSON.stringify(toWrite, null, 2) + "\n");
  writeFileSync(EMBEDDINGS_PATH, Buffer.from(out.buffer));
}

async function buildOnce(options: { force: boolean; dryRun: boolean }): Promise<number> {
  const start = Date.now();
  const mdManifest = JSON.parse(
    readFileSync(join(MD_DIR, "md-manifest.json"), "utf8"),
  ) as Record<string, MdManifestEntry>;

  const { manifest: prev, vectors } = loadPrevious(options.force);

  const next: IndexManifest = {
    embeddingModel: EMBEDDING_MODEL,
    embeddingDims: EMBEDDING_DIMS,
    chunkerVersion: CHUNKER_VERSION,
    normalizerVersion: NORMALIZER_VERSION,
    generatedAt: prev?.generatedAt ?? "",
    pages: {},
    chunks: {},
  };

  const stats = {
    pages: { scanned: 0, unchanged: 0, changed: 0, added: 0, removed: 0 },
    chunks: { total: 0, cached: 0, embedded: 0, pruned: 0 },
    tokensEmbedded: 0,
  };
  const toEmbed: { key: string; chunk: Chunk }[] = [];

  for (const [pagePath, entry] of Object.entries(mdManifest)) {
    stats.pages.scanned++;
    const doc = readFileSync(join(MD_DIR, entry.file), "utf8");
    const sourceHash = sha256(doc);
    const prevPage = prev?.pages[pagePath];

    // Two-level diff: pages whose source is untouched are carried over
    // wholesale, with no chunking, hashing, or tokenizing.
    if (prevPage && prevPage.sourceHash === sourceHash) {
      stats.pages.unchanged++;
      next.pages[pagePath] = prevPage;
      for (const id of prevPage.chunkIds) {
        next.chunks[id] = prev!.chunks[id];
        stats.chunks.total++;
        stats.chunks.cached++;
      }
      continue;
    }
    if (prevPage) stats.pages.changed++;
    else stats.pages.added++;

    const body = stripDocumentHeader(doc);
    const chunks = chunkPage(pagePath, entry.title, body);
    next.pages[pagePath] = { sourceHash, chunkIds: chunks.map((c) => c.id) };

    for (const chunk of chunks) {
      stats.chunks.total++;
      const key = `${EMBEDDING_MODEL}:${chunk.contentHash}`;
      next.chunks[chunk.id] = {
        contentHash: chunk.contentHash,
        tokens: chunk.tokens,
        pageTitle: entry.title,
        sectionHeading: chunk.heading,
        url: pagePath === "/" ? "/" : pagePath,
        mdUrl: pagePath === "/" ? "/index.md" : `${pagePath}.md`,
        track: entry.track,
      };
      if (vectors.has(key)) {
        stats.chunks.cached++;
      } else {
        toEmbed.push({ key, chunk });
        stats.tokensEmbedded += chunk.tokens;
      }
    }
  }

  if (prev) {
    for (const pagePath of Object.keys(prev.pages)) {
      if (!mdManifest[pagePath]) stats.pages.removed++;
    }
    stats.chunks.pruned = Object.keys(prev.chunks).filter((id) => !next.chunks[id]).length;
  }
  stats.chunks.embedded = toEmbed.length;

  const cost = (stats.tokensEmbedded / 1_000_000) * PRICE_PER_MTOKEN;
  const summary = [
    `Pages:  ${stats.pages.scanned} scanned · ${stats.pages.unchanged} unchanged · ${stats.pages.changed} changed · ${stats.pages.added} added · ${stats.pages.removed} removed`,
    `Chunks: ${stats.chunks.total} total · ${stats.chunks.cached} cached · ${stats.chunks.embedded} to embed · ${stats.chunks.pruned} pruned`,
    `Tokens: ${stats.tokensEmbedded.toLocaleString()} to embed`,
    `Cost:   ~$${cost.toFixed(6)} (price unverified, see PRICE_PER_MTOKEN comment)`,
  ];

  if (options.dryRun) {
    console.log(summary.join("\n"));
    console.log(`Time:   ${((Date.now() - start) / 1000).toFixed(1)}s (dry run, no API calls)`);
    if (toEmbed.length > 0 || stats.chunks.pruned > 0 || !prev) {
      console.error("Index is stale relative to content. Run `pnpm gen:index` and commit.");
      return 1;
    }
    console.log("Index is fresh.");
    return 0;
  }

  if (toEmbed.length > 0 && !process.env.OPENAI_API_KEY) {
    console.error(summary.join("\n"));
    console.error(
      `\n${toEmbed.length} chunk(s) need embedding but OPENAI_API_KEY is not set. ` +
        "Set it and re-run `pnpm gen:index`.",
    );
    return 1;
  }

  // Batch by count and token budget; persist after every successful batch
  // so a failure partway through resumes instead of restarting.
  let batch: { key: string; chunk: Chunk }[] = [];
  let batchTokens = 0;
  const flush = async () => {
    if (batch.length === 0) return;
    const embedded = await embedBatch(batch.map((b) => b.chunk.text));
    batch.forEach((item, i) => vectors.set(item.key, embedded[i]));
    next.generatedAt = new Date().toISOString();
    persist(next, vectors, { partial: true });
    console.log(`  embedded batch of ${batch.length} (${batchTokens.toLocaleString()} tokens)`);
    batch = [];
    batchTokens = 0;
  };
  for (const item of toEmbed) {
    if (batch.length >= BATCH_SIZE || batchTokens + item.chunk.tokens > BATCH_TOKEN_LIMIT) {
      await flush();
    }
    batch.push(item);
    batchTokens += item.chunk.tokens;
  }
  await flush();

  if (toEmbed.length === 0 && prev) {
    // Nothing changed: leave generatedAt (and the files, if identical) alone.
    next.generatedAt = prev.generatedAt;
  }
  if (!next.generatedAt) next.generatedAt = new Date().toISOString();
  persist(next, vectors);

  console.log(summary.join("\n").replace("to embed", "re-embedded"));
  console.log(`Time:   ${((Date.now() - start) / 1000).toFixed(1)}s`);
  return 0;
}

async function main() {
  const force = process.argv.includes("--force");
  const dryRun = process.argv.includes("--dry-run");
  const watchMode = process.argv.includes("--watch");

  const code = await buildOnce({ force, dryRun });
  if (watchMode) {
    console.log("Watching content/generated/md for changes...");
    let running = false;
    watch(join(MD_DIR, "md"), { recursive: true }, async () => {
      if (running) return;
      running = true;
      try {
        await buildOnce({ force: false, dryRun: false });
      } finally {
        running = false;
      }
    });
    return;
  }
  process.exit(code);
}

main();

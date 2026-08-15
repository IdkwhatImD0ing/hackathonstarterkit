import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

/**
 * Serves the Markdown representation of content pages. Reached two ways,
 * both rewritten here by proxy.ts:
 *
 *   /playbook/pitching.md            (the cacheable artifact)
 *   /playbook/pitching + Accept: text/markdown   (content negotiation)
 *
 * Bodies and token counts are generated at build time by
 * scripts/build-markdown.mts and committed under content/generated/.
 */

interface ManifestEntry {
  file: string;
  tokens: number;
  title: string;
}

const GENERATED_DIR = join(process.cwd(), "content", "generated");

let manifestPromise: Promise<Record<string, ManifestEntry>> | null = null;

function loadManifest(): Promise<Record<string, ManifestEntry>> {
  manifestPromise ??= readFile(join(GENERATED_DIR, "md-manifest.json"), "utf8").then(
    (raw) => JSON.parse(raw) as Record<string, ManifestEntry>,
  );
  return manifestPromise;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path: segments } = await context.params;
  const pagePath = segments && segments.length > 0 ? `/${segments.join("/")}` : "/";

  const manifest = await loadManifest();
  const entry = manifest[pagePath];
  if (!entry) {
    return new NextResponse("No Markdown representation for this path.\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const body = await readFile(join(GENERATED_DIR, entry.file), "utf8");
  const canonical = `${SITE_URL}${pagePath === "/" ? "/" : pagePath}`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(entry.tokens),
      // Correct HTTP even though Cloudflare needs a Cache Rule to act on it;
      // other intermediaries do respect it (see docs/cloudflare-config.md).
      Vary: "Accept",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}

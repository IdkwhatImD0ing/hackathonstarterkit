/**
 * Single source of truth for the site's canonical origin.
 *
 * Every URL-generating code path (metadata, sitemap, robots, OG tags,
 * JSON-LD, llms.txt, .well-known documents) must import from here.
 * Do not hardcode the hostname anywhere else.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://thehackathonplaybook.dev";

/** Hostname of the canonical origin, e.g. "thehackathonplaybook.dev". */
export const CANONICAL_HOST = new URL(SITE_URL).host;

export const SITE_NAME = "Hackathon Playbook";

/** Resolve a path like "/playbook/pitching" to an absolute canonical URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Pages that never get a Markdown representation (the noMarkdown escape
 * hatch; this codebase has no frontmatter, so it is a list). Lives here
 * rather than lib/content-pages.ts because proxy.ts needs it and must stay
 * free of Node-only imports.
 */
export const MARKDOWN_EXCLUDED_PATHS: readonly string[] = [
  "/terms",
  "/media-kit",
  // Meta page about the agent features; not in the content registry, so it
  // has no generated .md and must not be advertised or negotiated.
  "/ai",
];

/**
 * The alternates.types entry advertising a page's Markdown representation,
 * for use in each content page's metadata export:
 * `alternates: { canonical, types: markdownAlternate("/playbook/pitching") }`
 */
export function markdownAlternate(path: string) {
  const mdPath = path === "/" ? "/index.md" : `${path}.md`;
  return {
    "text/markdown": [{ url: `${SITE_URL}${mdPath}`, title: "Markdown" }],
  };
}

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

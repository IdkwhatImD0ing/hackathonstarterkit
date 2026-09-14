import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./site";

/** The brand card every page shares with (public/brand/share-card.png). */
export const SHARE_IMAGE = {
  url: "/brand/share-card.png",
  width: 1200,
  height: 630,
  alt: "The Hackathon Playbook: win hackathons with strategies from 36+ wins",
};

interface ShareOptions {
  /** Site-relative path of the page, e.g. "/playbook/pitching". */
  path: string;
  title: string;
  description: string;
  /** X card copy, when it should differ from the Open Graph copy. */
  twitter?: { title?: string; description?: string };
  /** Set for blog posts; renders og:type "article" with its dates. */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
}

/**
 * Complete Open Graph and X tags for one page.
 *
 * Next.js replaces the layout's `openGraph` and `twitter` objects when a
 * page sets its own; it does not merge them. A page that set only a title
 * silently lost the share image, og:url, og:type, and site name, so every
 * page builds its share tags here instead of by hand.
 */
export function shareMetadata({
  path,
  title,
  description,
  twitter,
  article,
}: ShareOptions): Pick<Metadata, "openGraph" | "twitter"> {
  const url = path === "/" ? SITE_URL : absoluteUrl(path);
  const shared = {
    siteName: SITE_NAME,
    locale: "en_US",
    url,
    title,
    description,
    images: [SHARE_IMAGE],
  };

  return {
    openGraph: article
      ? { ...shared, type: "article", ...article }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: twitter?.title ?? title,
      description: twitter?.description ?? description,
      images: [SHARE_IMAGE.url],
    },
  };
}

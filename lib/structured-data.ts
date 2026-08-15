import { SITE_URL, SITE_NAME } from "./site";
import { getContentPage } from "./content-pages";
import { PLAYBOOK_SECTIONS } from "./playbook";

/**
 * JSON-LD builders, generated from the same data that renders the pages.
 * Never hand-write schema objects in page files; add a builder here so the
 * markup can only describe what is actually on the page.
 */

const SEGMENT_LABELS: Record<string, string> = {
  playbook: "Playbook",
  "non-coders": "For Non-Coders",
  skills: "Skills",
  blog: "Blog",
};

/** BreadcrumbList for any registered content path, e.g. "/playbook/pitching". */
export function breadcrumbJsonLd(path: string) {
  const items = [{ name: "Home", item: `${SITE_URL}/` }];
  const segments = path.split("/").filter(Boolean);
  let current = "";
  for (const segment of segments) {
    current += `/${segment}`;
    const page = getContentPage(current);
    items.push({
      name: page?.title ?? SEGMENT_LABELS[segment] ?? segment,
      item: `${SITE_URL}${current}`,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/**
 * HowTo for the playbook index: the 7-phase system genuinely is a numbered
 * sequence of steps, each with its own page. Individual phase pages do not
 * get HowTo markup; their internal structure is prose, not enumerable
 * steps, and marking it up would be SEO decoration.
 */
export function playbookHowToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Win a Hackathon: The 7-Phase Playbook",
    description:
      "A battle-tested 7-phase system for winning hackathons, from team formation through post-hackathon follow-up. Distilled from 36+ victories.",
    step: PLAYBOOK_SECTIONS.map((section) => ({
      "@type": "HowToStep",
      position: section.step,
      name: section.title,
      text: section.subtitle,
      url: `${SITE_URL}/playbook/${section.slug}`,
    })),
  };
}

/** TechArticle properties shared by playbook guide pages. */
export function guideArticleJsonLd(options: {
  path: string;
  title: string;
  description: string;
  updated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: options.title,
    description: options.description,
    ...(options.updated
      ? { dateModified: options.updated }
      : {}),
    url: `${SITE_URL}${options.path}`,
    author: {
      "@type": "Person",
      name: "Bill Zhang",
      url: "https://v2.art3m1s.me/",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${options.path}`,
    },
  };
}

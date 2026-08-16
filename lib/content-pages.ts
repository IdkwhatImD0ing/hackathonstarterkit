import { PLAYBOOK_SECTIONS } from "./playbook";
import { NON_CODER_SECTIONS } from "./non-coder-sections";
import { NON_CODER_SKILLS } from "./non-coder-skills";
import { BLOG_POSTS } from "./blog";

/**
 * The registry of every content page on the site, in reading order.
 *
 * This is the single list that drives the Markdown pipeline, llms.txt, the
 * agent-skills index, and the chatbot's retrieval corpus. It is derived from
 * the same data files that drive the routes themselves, so adding a blog post
 * or playbook phase automatically adds it everywhere. Never hand-maintain a
 * second list of pages.
 */
export interface ContentPage {
  /** Route path, e.g. "/playbook/pitching". "/" is the homepage. */
  path: string;
  title: string;
  description: string;
  /** ISO date of the last substantive update, when known. */
  updated?: string;
  track: "home" | "playbook" | "non-coders" | "skills" | "blog";
  /**
   * Which Markdown generator handles this page:
   * - "blog": rendered from the BlogPost data in lib/blog/posts
   * - "skill": rendered from the SKILL.md source in skills/
   * - "jsx": converted from the prerendered HTML (hardcoded JSX pages)
   */
  source: "jsx" | "blog" | "skill";
  slug?: string;
}

export { MARKDOWN_EXCLUDED_PATHS } from "./site";

const STATIC_PAGES: ContentPage[] = [
  {
    path: "/",
    title: "The Hackathon Playbook",
    description:
      "Battle-tested hackathon strategy from 36+ wins and $100K+ in prizes, by Bill Zhang. Team formation, ideation, execution, pitching, and submission.",
    track: "home",
    source: "jsx",
  },
  {
    path: "/playbook",
    title: "The 7-Phase Playbook",
    description:
      "A battle-tested 7-phase system for winning hackathons: team formation, ideation, validation, execution, pitching, submission, and post-hackathon strategy.",
    track: "playbook",
    source: "jsx",
  },
  {
    path: "/non-coders",
    title: "Hackathons for Non-Coders",
    description:
      "How non-coders win hackathons with AI tools: the proof it works, the setup, the concepts, and the installable AI skills.",
    track: "non-coders",
    source: "jsx",
  },
  {
    path: "/blog",
    title: "Blog",
    description:
      "Hackathon strategy write-ups: how to win, pick a stack, pitch, and turn weekend projects into career wins.",
    track: "blog",
    source: "jsx",
  },
];

export function getContentPages(): ContentPage[] {
  return [
    ...STATIC_PAGES.filter((p) => p.path === "/"),

    STATIC_PAGES.find((p) => p.path === "/playbook")!,
    ...PLAYBOOK_SECTIONS.map(
      (s): ContentPage => ({
        path: `/playbook/${s.slug}`,
        title: s.title,
        description: s.subtitle,
        updated: s.updated,
        track: "playbook",
        source: "jsx",
        slug: s.slug,
      }),
    ),

    STATIC_PAGES.find((p) => p.path === "/non-coders")!,
    ...NON_CODER_SECTIONS.map(
      (s): ContentPage => ({
        path: `/non-coders/${s.slug}`,
        title: s.title,
        description: s.subtitle,
        track: "non-coders",
        source: "jsx",
        slug: s.slug,
      }),
    ),
    ...NON_CODER_SKILLS.map(
      (s): ContentPage => ({
        path: `/non-coders/skills/${s.slug}`,
        title: s.title,
        description: s.description,
        track: "skills",
        source: "skill",
        slug: s.slug,
      }),
    ),

    STATIC_PAGES.find((p) => p.path === "/blog")!,
    ...BLOG_POSTS.map(
      (p): ContentPage => ({
        path: `/blog/${p.slug}`,
        title: p.title,
        description: p.description,
        updated: p.updatedDate ?? p.date,
        track: "blog",
        source: "blog",
        slug: p.slug,
      }),
    ),
  ];
}

export function getContentPage(path: string): ContentPage | undefined {
  return getContentPages().find((p) => p.path === path);
}

/** The key used for a page's generated Markdown file and manifest entry. */
export function markdownFileKey(path: string): string {
  return path === "/" ? "index" : path.replace(/^\//, "");
}

/** The public .md URL path for a content page ("/playbook/pitching.md"). */
export function markdownUrlPath(path: string): string {
  return path === "/" ? "/index.md" : `${path}.md`;
}

import type { MetadataRoute } from "next";
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";
import { NON_CODER_SECTIONS } from "@/lib/non-coder-sections";
import { NON_CODER_SKILLS } from "@/lib/non-coder-skills";
import { BLOG_POSTS } from "@/lib/blog";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://thehackathonplaybook.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    // Playbook index + all phases (driven by lib/playbook.ts)
    {
      url: `${BASE_URL}/playbook`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...PLAYBOOK_SECTIONS.map((section) => ({
      url: `${BASE_URL}/playbook/${section.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Non-coders index + sub-pages (driven by lib/non-coder-sections.ts)
    {
      url: `${BASE_URL}/non-coders`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...NON_CODER_SECTIONS.map((section) => ({
      url: `${BASE_URL}/non-coders/${section.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Skill detail pages (driven by lib/non-coder-skills.ts)
    ...NON_CODER_SKILLS.map((skill) => ({
      url: `${BASE_URL}/non-coders/skills/${skill.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // Blog index + all posts (driven by lib/blog.ts)
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Standalone routes (legal, press)
    {
      url: `${BASE_URL}/media-kit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

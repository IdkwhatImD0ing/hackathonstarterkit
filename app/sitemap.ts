import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://hackathonstarterkit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const playbook = [
    "team-formation",
    "ideation",
    "validation",
    "execution",
    "pitching",
    "submission",
    "post-hackathon",
  ];

  const nonCoderPages = ["proof", "setup", "concepts", "apis", "skills"];

  const skillSlugs = [
    "non-coder-mode",
    "feature-builder",
    "bugfix-doctor",
    "scaffold-app",
    "demo-prep",
    "domain-to-spec",
  ];

  const blogSlugs = [
    "how-to-win-hackathons",
    "best-tech-stack-for-hackathons",
    "hackathon-tips-for-beginners",
    "hackathon-pitch-guide",
    "non-coders-winning-hackathons",
  ];

  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/playbook`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...playbook.map((slug) => ({
      url: `${BASE_URL}/playbook/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${BASE_URL}/non-coders`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...nonCoderPages.map((slug) => ({
      url: `${BASE_URL}/non-coders/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...skillSlugs.map((slug) => ({
      url: `${BASE_URL}/non-coders/skills/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

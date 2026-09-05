import { describe, expect, it } from "vitest";
import { renderBlogPostMarkdown } from "@/lib/markdown/render-blog";
import { formatPostDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog/types";

describe("formatPostDate", () => {
  /**
   * Post dates are authored as plain YYYY-MM-DD, which Date parses as UTC
   * midnight. Formatting without pinning the zone renders the day before
   * anywhere behind UTC, which showed readers the wrong date and made the
   * generated corpus depend on the machine that built it: CI (UTC) and a
   * Pacific laptop disagreed, and `gen:md --check` failed.
   */
  it("renders the authored day regardless of the machine's time zone", () => {
    expect(formatPostDate("2026-06-24")).toBe("Jun 24, 2026");
    expect(formatPostDate("2026-06-24", "long")).toBe("June 24, 2026");
    // Midnight UTC on the 1st is the previous month anywhere behind UTC.
    expect(formatPostDate("2026-01-01")).toBe("Jan 1, 2026");
  });
});

const post: BlogPost = {
  slug: "test",
  title: "Test Post",
  description: "d",
  date: "2026-01-01",
  readingTime: "1 min read",
  keywords: [],
  content: [
    {
      heading: "Section One",
      paragraphs: ["A plain paragraph."],
      blocks: [
        { type: "code-snippet", language: "typescript", code: "const a = 1;", filename: "a.ts" },
        { type: "checklist", title: "Ship it", items: ["one", "two"] },
        { type: "cta-button", title: "Buy", label: "Go", href: "/x" },
        { type: "quote", text: "Quoted words", attribution: "Bill Zhang, 2026" },
        { type: "image", src: "/blog/pic.png", alt: "A picture" },
      ],
    },
  ],
};

describe("renderBlogPostMarkdown", () => {
  const md = renderBlogPostMarkdown(post);

  it("renders headings and paragraphs", () => {
    expect(md).toContain("## Section One");
    expect(md).toContain("A plain paragraph.");
  });

  it("keeps code language annotations and filenames", () => {
    expect(md).toContain("`a.ts`:");
    expect(md).toContain("```typescript\nconst a = 1;\n```");
  });

  it("renders checklists as task lists", () => {
    expect(md).toContain("- [ ] one");
  });

  it("strips CTA buttons entirely", () => {
    expect(md).not.toContain("Buy");
    expect(md).not.toContain("Go");
  });

  it("attributes quotes and absolutizes image sources", () => {
    expect(md).toContain("> Quoted words");
    expect(md).toContain("Bill Zhang, 2026");
    expect(md).toContain("![A picture](https://thehackathonplaybook.dev/blog/pic.png)");
  });
});

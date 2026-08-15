import type { BlogPost, ContentBlock } from "../blog/types";
import { absoluteUrl } from "../site";

/**
 * Render a blog post's typed content blocks to clean Markdown, straight from
 * the source data in lib/blog/posts. This is the same corpus the chatbot
 * indexes, so the two can never diverge from what the page shows.
 *
 * Paragraph text in posts already uses inline Markdown (**bold**, links), so
 * it passes through untouched. CTA buttons are stripped: they are calls to
 * action, not content.
 */

function renderBlock(block: ContentBlock): string | null {
  switch (block.type) {
    case "paragraph":
      return block.text;

    case "callout": {
      const label = block.title ?? calloutLabel(block.variant);
      return `> **${label}:** ${block.text}`;
    }

    case "stat-row": {
      const header = `| ${block.stats.map((s) => s.label).join(" | ")} |`;
      const divider = `| ${block.stats.map(() => "---").join(" | ")} |`;
      const values = `| ${block.stats.map((s) => s.value).join(" | ")} |`;
      return [header, divider, values].join("\n");
    }

    case "image": {
      const img = `![${block.alt}](${absoluteUrl(block.src)})`;
      return block.caption ? `${img}\n\n*${block.caption}*` : img;
    }

    case "video": {
      const line = `Video: [${block.title}](${absoluteUrl(block.src)})`;
      return block.caption ? `${line}\n\n*${block.caption}*` : line;
    }

    case "step-list":
      return block.steps
        .map((s, i) => `${i + 1}. **${s.title}** ${s.description}`)
        .join("\n");

    case "quote": {
      const quote = `> ${block.text.replace(/\n/g, "\n> ")}`;
      return block.attribution ? `${quote}\n>\n> ${block.attribution}` : quote;
    }

    case "pro-con": {
      const pros = block.pros.map((p) => `- ${p}`).join("\n");
      const cons = block.cons.map((c) => `- ${c}`).join("\n");
      return `**Do:**\n\n${pros}\n\n**Don't:**\n\n${cons}`;
    }

    case "code-snippet": {
      const heading = block.filename ? `\`${block.filename}\`:\n\n` : "";
      return `${heading}\`\`\`${block.language}\n${block.code}\n\`\`\``;
    }

    case "checklist": {
      const items = block.items.map((i) => `- [ ] ${i}`).join("\n");
      return block.title ? `**${block.title}**\n\n${items}` : items;
    }

    case "link-card":
      return `[${block.title}](${absoluteUrl(block.href)}): ${block.description}`;

    case "cta-button":
      return null;
  }
}

function calloutLabel(variant: "tip" | "warning" | "info" | "success"): string {
  switch (variant) {
    case "tip":
      return "Tip";
    case "warning":
      return "Warning";
    case "info":
      return "Note";
    case "success":
      return "Win";
  }
}

export function renderBlogPostMarkdown(post: BlogPost): string {
  const parts: string[] = [];

  for (const section of post.content) {
    parts.push(`## ${section.heading}`);
    for (const paragraph of section.paragraphs) {
      parts.push(paragraph);
    }
    for (const block of section.blocks ?? []) {
      const rendered = renderBlock(block);
      if (rendered) parts.push(rendered);
    }
  }

  return parts.join("\n\n");
}

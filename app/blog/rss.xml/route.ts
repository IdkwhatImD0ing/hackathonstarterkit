import { BLOG_POSTS } from "@/lib/blog";
import type { BlogPost, ContentBlock } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

const FEED_URL = `${SITE_URL}/blog/rss.xml`;

export const revalidate = 3600;

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return character;
    }
  });
}

function escapeCdata(value: string) {
  return value.replaceAll("]]>", "]]]]><![CDATA[>");
}

function renderBlockHtml(block: ContentBlock) {
  switch (block.type) {
    case "paragraph":
      return `<p>${escapeXml(block.text)}</p>`;
    case "callout":
      return `<aside><strong>${escapeXml(block.title ?? block.variant)}</strong><p>${escapeXml(block.text)}</p></aside>`;
    case "stat-row":
      return `<ul>${block.stats
        .map(
          (stat) =>
            `<li><strong>${escapeXml(stat.value)}</strong> ${escapeXml(stat.label)}</li>`,
        )
        .join("")}</ul>`;
    case "step-list":
      return `<ol>${block.steps
        .map(
          (step) =>
            `<li><strong>${escapeXml(step.title)}</strong><p>${escapeXml(step.description)}</p></li>`,
        )
        .join("")}</ol>`;
    case "quote":
      return `<blockquote><p>${escapeXml(block.text)}</p>${
        block.attribution ? `<cite>${escapeXml(block.attribution)}</cite>` : ""
      }</blockquote>`;
    case "pro-con":
      return `<h3>Do</h3><ul>${block.pros
        .map((pro) => `<li>${escapeXml(pro)}</li>`)
        .join("")}</ul><h3>Do not</h3><ul>${block.cons
        .map((con) => `<li>${escapeXml(con)}</li>`)
        .join("")}</ul>`;
    case "code-snippet":
      return `<pre><code>${escapeXml(block.code)}</code></pre>`;
    case "checklist":
      return `${block.title ? `<h3>${escapeXml(block.title)}</h3>` : ""}<ul>${block.items
        .map((item) => `<li>${escapeXml(item)}</li>`)
        .join("")}</ul>`;
    case "link-card":
      return `<p><a href="${escapeXml(new URL(block.href, SITE_URL).toString())}">${escapeXml(block.title)}</a>: ${escapeXml(block.description)}</p>`;
    case "cta-button":
      return `<p><a href="${escapeXml(new URL(block.href, SITE_URL).toString())}">${escapeXml(block.label)}</a>${block.description ? `: ${escapeXml(block.description)}` : ""}</p>`;
  }
}

function renderPostContent(post: BlogPost) {
  return post.content
    .map((section) => {
      const body = section.blocks
        ? section.blocks.map(renderBlockHtml).join("")
        : section.paragraphs
            .map((paragraph) => `<p>${escapeXml(paragraph)}</p>`)
            .join("");

      return `<h2>${escapeXml(section.heading)}</h2>${body}`;
    })
    .join("");
}

function renderRssItem(post: BlogPost) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>Bill Zhang</dc:creator>
      ${post.keywords.map((keyword) => `<category>${escapeXml(keyword)}</category>`).join("")}
      <content:encoded><![CDATA[${escapeCdata(renderPostContent(post))}]]></content:encoded>
    </item>`;
}

export function GET() {
  const postsByDateDesc = [...BLOG_POSTS].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  const lastBuildDate = postsByDateDesc[0]?.date
    ? new Date(postsByDateDesc[0].date).toUTCString()
    : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Hackathon Playbook Blog</title>
    <link>${escapeXml(`${SITE_URL}/blog`)}</link>
    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml" />
    <description>Expert hackathon guides, strategies, and tips from 36+ victories.</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    ${postsByDateDesc.map(renderRssItem).join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

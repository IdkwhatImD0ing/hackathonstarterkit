import TurndownService from "turndown";
import { SITE_URL, absoluteUrl } from "../site";

/**
 * Convert a prerendered page's HTML to clean Markdown. Used only for the
 * pages whose content is hardcoded JSX (playbook, non-coders sections,
 * homepage, index pages); blog posts and skills render from source data.
 *
 * The rules here strip chrome (nav, forms, buttons, icons) and preserve the
 * things agents actually need: heading hierarchy, lists, tables, and
 * preformatted blocks. Links and images are absolutized against the
 * canonical origin.
 */

function isChromeNode(node: HTMLElement): boolean {
  const slot = node.getAttribute?.("data-slot") ?? "";
  // Buttons are CTAs; badges are decorative labels ("PHASE 5 OF 7").
  if (slot === "button" || slot === "badge") return true;
  if (node.getAttribute?.("aria-hidden") === "true") return true;
  const cls = typeof node.className === "string" ? node.className : "";
  // The animated terminal-style caret blocks and decorative overlays.
  if (/\banimate-pulse\b/.test(cls) && node.textContent?.trim() === "") return true;
  // Single-letter icon avatars (the circled S-U-C-C-E-S markers and similar).
  if (
    /\bjustify-center\b/.test(cls) &&
    /\bshrink-0\b/.test(cls) &&
    (node.textContent?.trim().length ?? 0) <= 2
  ) {
    return true;
  }
  // Terminal-style chrome: fake prompts and shell lines on the homepage.
  if (/\bfont-code\b/.test(cls)) {
    const text = node.textContent?.trim() ?? "";
    if (/^\$ /.test(text) || /~ %$/.test(text)) return true;
  }
  return false;
}

export function createTurndown(): TurndownService {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
  });

  td.remove(["script", "style", "noscript", "form", "button", "iframe"]);

  // Chrome and decoration: navigation, icons, hidden decorative elements.
  td.addRule("strip-chrome", {
    filter: (node) =>
      node.nodeName === "NAV" ||
      node.nodeName === "SVG" ||
      node.nodeName === "svg" ||
      isChromeNode(node as HTMLElement),
    replacement: () => "",
  });

  // The document header owns the H1; demote any in-body H1 to H2 so the
  // heading hierarchy stays valid (only the homepage hits this).
  td.addRule("demote-h1", {
    filter: "h1",
    replacement: (content) => `\n\n## ${content.trim()}\n\n`,
  });

  // Card titles carry real structure on the JSX pages; keep it as headings.
  td.addRule("card-titles", {
    filter: (node) =>
      (node as HTMLElement).getAttribute?.("data-slot") === "card-title",
    replacement: (content) => {
      const text = content.trim();
      return text ? `\n\n#### ${text}\n\n` : "";
    },
  });

  // Absolutize links; drop pure-anchor fragments' styling.
  td.addRule("absolute-links", {
    filter: (node) => node.nodeName === "A" && !!(node as HTMLElement).getAttribute("href"),
    replacement: (content, node) => {
      const href = (node as HTMLElement).getAttribute("href") ?? "";
      const text = content.trim();
      if (!text) return "";
      if (href.startsWith("#")) return text;
      return `[${text}](${absoluteUrl(href)})`;
    },
  });

  // Absolutize images and keep real alt text.
  td.addRule("absolute-images", {
    filter: "img",
    replacement: (_content, node) => {
      const el = node as HTMLElement;
      const src = el.getAttribute("src") ?? "";
      if (!src || src.startsWith("data:")) return "";
      const alt = el.getAttribute("alt") ?? "";
      // next/image wraps srcs as /_next/image?url=<encoded>; unwrap them.
      const match = src.match(/\/_next\/image\?url=([^&]+)/);
      const realSrc = match ? decodeURIComponent(match[1]) : src;
      return `![${alt}](${absoluteUrl(realSrc)})`;
    },
  });

  // Preformatted blocks: the JSX pages use bare <pre> for prompts and
  // templates (no language classes), so emit plain fences. A <code
  // class="language-x"> child, if one ever appears, keeps its language.
  td.addRule("fenced-pre", {
    filter: "pre",
    replacement: (_content, node) => {
      const el = node as HTMLElement;
      const code = el.querySelector?.("code");
      const langMatch = (code?.getAttribute("class") ?? "").match(/language-([\w-]+)/);
      const lang = langMatch ? langMatch[1] : "";
      const text = (el.textContent ?? "").replace(/\n$/, "");
      return `\n\n\`\`\`${lang}\n${text}\n\`\`\`\n\n`;
    },
  });

  return td;
}

/**
 * Slice the single <main> element out of a full prerendered document.
 * The homepage and blog index render without a <main>, so fall back to
 * <body> (never the full document: that would leak <title> and metadata).
 */
export function extractMain(html: string): string {
  for (const tag of ["main", "body"]) {
    const start = html.search(new RegExp(`<${tag}[^>]*>`));
    if (start === -1) continue;
    const openEnd = html.indexOf(">", start) + 1;
    const end = html.lastIndexOf(`</${tag}>`);
    return end === -1 ? html.slice(openEnd) : html.slice(openEnd, end);
  }
  return html;
}

export function htmlPageToMarkdown(html: string): string {
  const td = createTurndown();
  let main = extractMain(html);
  // Drop the page's own <header> block: the document header already carries
  // the title, subtitle, and last-updated line, so keeping it would emit a
  // duplicate H1 at the top of every page.
  main = main.replace(/<header[^>]*>[\s\S]*?<\/header>/, "");
  const md = td.turndown(main);
  return tidyMarkdown(md);
}

/** Collapse the artifacts of stripped chrome: 3+ blank lines, stray escapes. */
export function tidyMarkdown(md: string): string {
  return md
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^[ \t]+$/gm, "")
    .trim();
}

/**
 * The header block every generated document starts with: title, canonical
 * URL, and last-modified date when known. No raw frontmatter dumps.
 */
export function markdownDocument(options: {
  title: string;
  path: string;
  description?: string;
  updated?: string;
  body: string;
}): string {
  const lines = [`# ${options.title}`, ""];
  if (options.description) {
    lines.push(`> ${options.description}`, "");
  }
  lines.push(`Canonical: ${SITE_URL}${options.path === "/" ? "/" : options.path}`);
  if (options.updated) {
    lines.push(`Last updated: ${options.updated}`);
  }
  lines.push("", "---", "", options.body.trim(), "");
  return lines.join("\n");
}

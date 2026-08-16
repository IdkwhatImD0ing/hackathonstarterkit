/**
 * Structural validation of the JSON-LD emitted into the built HTML.
 * Runs after `next build`; CI fails on any violation. This is not a full
 * schema.org validator (that needs the live vocabulary); it enforces the
 * invariants that break rich results when violated: parseable JSON, known
 * types, and the required fields per type used on this site.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { getContentPages, markdownFileKey } from "../lib/content-pages";

const HTML_DIR = join(process.cwd(), ".next", "server", "app");

const KNOWN_TYPES = new Set([
  "WebSite",
  "Organization",
  "Person",
  "BreadcrumbList",
  "Article",
  "TechArticle",
  "HowTo",
  "FAQPage",
  "WebPage",
  "CollectionPage",
]);

type Json = Record<string, unknown>;

function* extractJsonLd(html: string): Generator<string> {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) yield m[1];
}

function validateObject(obj: Json, page: string, errors: string[]) {
  const type = obj["@type"];
  if (typeof type !== "string" || !KNOWN_TYPES.has(type)) {
    errors.push(`${page}: unknown @type ${JSON.stringify(type)}`);
    return;
  }
  const need = (field: string) => {
    if (obj[field] === undefined || obj[field] === "") {
      errors.push(`${page}: ${type} missing required field "${field}"`);
    }
  };

  switch (type) {
    case "BreadcrumbList": {
      const items = obj.itemListElement;
      if (!Array.isArray(items) || items.length === 0) {
        errors.push(`${page}: BreadcrumbList has no itemListElement`);
        break;
      }
      items.forEach((item: Json, i: number) => {
        if (item.position !== i + 1)
          errors.push(`${page}: breadcrumb position ${item.position} at index ${i}`);
        if (!item.name || !item.item)
          errors.push(`${page}: breadcrumb item ${i} missing name/item`);
      });
      break;
    }
    case "Article":
    case "TechArticle":
      need("headline");
      need("author");
      need("mainEntityOfPage");
      break;
    case "HowTo": {
      need("name");
      const steps = obj.step;
      if (!Array.isArray(steps) || steps.length === 0) {
        errors.push(`${page}: HowTo has no steps`);
        break;
      }
      steps.forEach((s: Json, i: number) => {
        if (!s.name || !s.url) errors.push(`${page}: HowToStep ${i} missing name/url`);
      });
      break;
    }
    case "WebSite":
    case "Organization":
      need("name");
      need("url");
      break;
  }
}

function main() {
  const errors: string[] = [];
  let blocks = 0;

  for (const page of getContentPages()) {
    const file = join(HTML_DIR, `${markdownFileKey(page.path)}.html`);
    if (!existsSync(file)) {
      errors.push(`${page.path}: no built HTML at ${file} (run pnpm build first)`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    for (const raw of extractJsonLd(html)) {
      blocks++;
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        errors.push(`${page.path}: unparseable JSON-LD block`);
        continue;
      }
      const objects = Array.isArray(parsed) ? parsed : [parsed];
      for (const obj of objects) {
        const record = obj as Json;
        if (record["@context"] !== "https://schema.org") {
          errors.push(`${page.path}: @context is ${JSON.stringify(record["@context"])}`);
        }
        validateObject(record, page.path, errors);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`JSON-LD validation failed (${errors.length} error(s)):`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log(`JSON-LD valid: ${blocks} blocks across ${getContentPages().length} pages.`);
}

main();

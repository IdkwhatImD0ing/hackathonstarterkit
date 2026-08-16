#!/usr/bin/env node
/**
 * Quote source verifier.
 *
 * Extracts every quote on the site and assigns each one an evidence tier by
 * searching for the exact string as published. The rule this encodes:
 *
 *   RED     the exact string returns nothing. You are paraphrasing, so the
 *           quotation marks are wrong. Unquote it or use the real wording.
 *   SUSPECT the words exist, but not alongside the person you credit. This is
 *           what a misattribution looks like: real quote, wrong speaker.
 *   YELLOW  the words exist and match the person, but only on quote
 *           aggregator sites. Attribute the person, do not invent a work/year.
 *   GREEN   found on a primary or reputable source. Cite work and year.
 *
 * Zero dependencies. Node 18+ (built-in fetch).
 *
 *   node scripts/verify-quotes.mjs              # extract + structural checks
 *   SERPER_API_KEY=... node scripts/verify-quotes.mjs --search
 *
 * Search backends (set one): SERPER_API_KEY, BRAVE_API_KEY,
 * or GOOGLE_CSE_KEY + GOOGLE_CSE_CX. Book checks additionally use
 * GOOGLE_BOOKS_API_KEY if set (the keyless tier is heavily rate limited).
 *
 * Note on sandboxes: inside Claude Code's remote environment the agent proxy
 * answers 403 to CONNECT for google.com, bing.com, duckduckgo.com and
 * youtube.com, so --search (and a headless browser pointed at a search engine)
 * cannot work there. Run this locally, or verify through a search tool that
 * fetches server-side. Extraction and the structural checks work anywhere.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const DO_SEARCH = process.argv.includes("--search");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7);

/* ------------------------------------------------------------------ domains */

// Quote aggregators: they rank first, carry no sourcing, and are where
// misattributions breed. Presence here is never confirmation of a speaker.
const AGGREGATORS = [
  "quotefancy.com", "azquotes.com", "brainyquote.com", "quotesgram.com",
  "wisefamousquotes.com", "picturequotes.com", "everydaypower.com",
  "quoteambition.com", "wiseoldsayings.com", "libquotes.com", "quotepark.com",
  "inspiringquotes.us", "successories.com", "keepinspiring.me",
  "quotecatalog.com", "wonderfulquote.com", "quotemaster.org",
  "goodreads.com/quotes", "quotessquare.com", "quoteslyfe.com",
];

// Primary sources, archives, academic publishers, book publishers, and press
// with editorial standards. One hit here is enough to call a quote sourced.
const CREDIBLE = [
  "archive.org", "doi.org", "jstor.org", "pubmed.ncbi.nlm.nih.gov", "nih.gov",
  "springer.com", "sciencedirect.com", "sagepub.com", "apa.org", "psycnet.apa.org",
  "wikisource.org", "wikiquote.org", "gutenberg.org", "semanticscholar.org",
  "arxiv.org", "acm.org", "ieee.org", "researchgate.net", "scholar.google.com",
  "simonandschuster.com", "penguinrandomhouse.com", "harpercollins.com",
  "hachettebookgroup.com", "macmillan.com", "wiley.com", "oreilly.com",
  "mitpress.mit.edu", "basicbooks.com", "hbr.org", "press.princeton.edu",
  "nytimes.com", "wsj.com", "washingtonpost.com", "theatlantic.com",
  "newyorker.com", "wired.com", "ft.com", "economist.com", "bbc.co.uk",
  "theguardian.com", "npr.org", "reuters.com", "apnews.com", "ted.com",
  "fastcompany.com", "inc.com", "cnbc.com", "time.com", "forbes.com",
];

const CREDIBLE_SUFFIX = [".edu", ".gov", ".ac.uk"];

const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
const isAggregator = (u) => AGGREGATORS.some((d) => (host(u) + new URL(u, "https://x").pathname).includes(d));
const isCredible = (u) => {
  const h = host(u);
  if (!h) return false;
  return CREDIBLE.some((d) => h === d || h.endsWith("." + d)) || CREDIBLE_SUFFIX.some((s) => h.endsWith(s));
};

/* ---------------------------------------------------------------- extraction */

const ENTITIES = {
  "&ldquo;": "\u201C", "&rdquo;": "\u201D", "&lsquo;": "\u2018", "&rsquo;": "\u2019",
  "&apos;": "'", "&quot;": '"', "&amp;": "&", "&mdash;": "\u2014", "&ndash;": "\u2013",
  "&nbsp;": " ", "&hellip;": "\u2026", "&lt;": "<", "&gt;": ">",
};

function cleanText(raw) {
  let s = raw;
  s = s.replace(/\{"\s*"\}|\{'\s*'\}/g, " ");        // {" "} spacers
  s = s.replace(/\{\/\*[\s\S]*?\*\/\}/g, " ");        // JSX comments
  s = s.replace(/<[^>]+>/g, " ");                     // tags
  s = s.replace(/\{[^{}]*\}/g, " ");                  // leftover JSX expressions
  for (const [k, v] of Object.entries(ENTITIES)) s = s.split(k).join(v);
  s = s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
  return s.replace(/\s+/g, " ").trim();
}

// Strip surrounding quotation marks so we search the sentence, not the punctuation.
const unwrap = (s) => s.replace(/^["'\u201C\u2018\s]+/, "").replace(/["'\u201D\u2019\s.,]+$/, "").trim();

function lineOf(src, index) {
  return src.slice(0, index).split("\n").length;
}

/** Blog posts store quotes as data, so these extract exactly. */
function fromBlog(src, file) {
  const out = [];
  const re = /\{\s*type:\s*["']quote["']\s*,\s*text:\s*(["'])((?:\\.|(?!\1)[^\\])*)\1\s*(?:,\s*attribution:\s*(["'])((?:\\.|(?!\3)[^\\])*)\3)?/g;
  let m;
  while ((m = re.exec(src))) {
    const text = m[2].replace(/\\(["'\\])/g, "$1");
    const attribution = (m[4] || "").replace(/\\(["'\\])/g, "$1");
    out.push({ file, line: lineOf(src, m.index), text: unwrap(text), attribution, kind: "blog-quote-block" });
  }
  return out;
}

/** Playbook pages use <blockquote>; attribution is prose that follows it. */
function fromBlockquotes(src, file) {
  const out = [];
  const re = /<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/g;
  let m;
  while ((m = re.exec(src))) {
    const text = unwrap(cleanText(m[1]));
    if (text.length < 15) continue;
    // Attribution is usually the next dash-led line within a few hundred chars.
    const after = cleanText(src.slice(m.index + m[0].length, m.index + m[0].length + 700));
    const dash = after.match(/[\u2014\u2013-]\s*([^\u2014\u2013]{4,180})/);
    out.push({
      file, line: lineOf(src, m.index), text,
      attribution: dash ? dash[1].trim() : "",
      kind: "blockquote",
    });
  }
  return out;
}

async function walk(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next" || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (/\.(tsx|ts)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

async function extractAll() {
  const files = [...(await walk(join(ROOT, "app"))), ...(await walk(join(ROOT, "lib")))];
  const quotes = [];
  for (const abs of files) {
    const rel = relative(ROOT, abs);
    const src = await readFile(abs, "utf8");
    if (rel.includes("lib/blog/posts/")) quotes.push(...fromBlog(src, rel));
    if (rel.endsWith(".tsx")) quotes.push(...fromBlockquotes(src, rel));
  }
  // Same quote can appear on several pages; verify once, report every location.
  const byKey = new Map();
  for (const q of quotes) {
    const key = q.text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!key) continue;
    if (byKey.has(key)) byKey.get(key).locations.push(`${q.file}:${q.line}`);
    else byKey.set(key, { ...q, locations: [`${q.file}:${q.line}`] });
  }
  return [...byKey.values()];
}

/** The person's name is the leading part of an attribution line. */
function personOf(attribution) {
  if (!attribution) return "";
  const first = attribution.split(/[,;(]/)[0].trim();
  if (!first || first.length > 60) return "";
  if (!/^[A-Z]/.test(first)) return "";
  if (/^(a |an |the |source|via|from|adapted|paraphrase)/i.test(first)) return "";
  return first;
}

/* -------------------------------------------------------------------- search */

function backend() {
  if (process.env.SERPER_API_KEY) return "serper";
  if (process.env.BRAVE_API_KEY) return "brave";
  if (process.env.GOOGLE_CSE_KEY && process.env.GOOGLE_CSE_CX) return "cse";
  return null;
}

async function search(query) {
  const b = backend();
  if (b === "serper") {
    const r = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: { "X-API-KEY": process.env.SERPER_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ q: query, num: 10 }),
    });
    if (!r.ok) throw new Error(`serper ${r.status}`);
    return ((await r.json()).organic || []).map((o) => o.link).filter(Boolean);
  }
  if (b === "brave") {
    const u = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=10`;
    const r = await fetch(u, { headers: { "X-Subscription-Token": process.env.BRAVE_API_KEY, Accept: "application/json" } });
    if (!r.ok) throw new Error(`brave ${r.status}`);
    return (((await r.json()).web || {}).results || []).map((o) => o.url).filter(Boolean);
  }
  if (b === "cse") {
    const u = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_CSE_KEY}&cx=${process.env.GOOGLE_CSE_CX}&q=${encodeURIComponent(query)}`;
    const r = await fetch(u);
    if (!r.ok) throw new Error(`cse ${r.status}`);
    return ((await r.json()).items || []).map((o) => o.link).filter(Boolean);
  }
  throw new Error("no search backend configured");
}

/** Does the exact phrase appear in a book, and in which one? */
async function booksCheck(phrase) {
  const key = process.env.GOOGLE_BOOKS_API_KEY;
  const u = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`"${phrase}"`)}${key ? `&key=${key}` : ""}`;
  try {
    const r = await fetch(u);
    if (!r.ok) return { ok: false, reason: `books ${r.status}` };
    const items = (await r.json()).items || [];
    return { ok: true, titles: items.slice(0, 5).map((i) => i.volumeInfo?.title).filter(Boolean) };
  } catch (e) {
    return { ok: false, reason: String(e.message || e) };
  }
}

const searchUrl = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

/* --------------------------------------------------------------------- tiers */

async function classify(q) {
  const person = personOf(q.attribution);
  const exact = `"${q.text}"`;
  const withPerson = person ? `"${q.text}" ${person}` : exact;

  if (!DO_SEARCH) {
    return { tier: "UNCHECKED", person, searchUrls: { exact: searchUrl(exact), withPerson: searchUrl(withPerson) } };
  }

  const hits = await search(exact);
  if (hits.length === 0) {
    return { tier: "RED", person, reason: "exact string returns no results, so this is a paraphrase, not a quote", hits: [] };
  }

  const personHits = person ? await search(withPerson) : hits;
  if (person && personHits.length === 0) {
    return {
      tier: "SUSPECT", person, hits: hits.slice(0, 5),
      reason: `the words exist but no result ties them to ${person}; check who actually said this`,
    };
  }

  const credible = personHits.filter(isCredible);
  const aggregator = personHits.filter(isAggregator);
  if (credible.length > 0) {
    return { tier: "GREEN", person, reason: "found on a primary or reputable source", hits: credible.slice(0, 5) };
  }
  if (aggregator.length > 0 && aggregator.length === personHits.length) {
    return {
      tier: "YELLOW", person, hits: aggregator.slice(0, 5),
      reason: "only quote-aggregator hits, so attribute the person but do not assert a work or year",
    };
  }
  return { tier: "YELLOW", person, hits: personHits.slice(0, 5), reason: "no primary or reputable source among results" };
}

/* -------------------------------------------------------------------- report */

const ICON = { GREEN: "\u2713", YELLOW: "!", SUSPECT: "?", RED: "\u2717", UNCHECKED: "\u00b7" };

async function main() {
  let quotes = await extractAll();
  if (ONLY) quotes = quotes.filter((q) => q.file.includes(ONLY));

  console.log(`Found ${quotes.length} quotes across the site.\n`);

  const results = [];
  for (const q of quotes) {
    let verdict;
    try {
      verdict = await classify(q);
    } catch (e) {
      verdict = { tier: "ERROR", reason: String(e.message || e) };
    }
    // Structural check runs regardless of whether search is available.
    const missing = [];
    if (!q.attribution) missing.push("attribution");
    else {
      if (!personOf(q.attribution)) missing.push("person");
      if (!/\b(1[89]|20)\d{2}\b/.test(q.attribution)) missing.push("year");
    }
    const row = { ...q, ...verdict, missingFields: missing };
    results.push(row);

    const where = q.locations[0] + (q.locations.length > 1 ? ` (+${q.locations.length - 1})` : "");
    console.log(`${ICON[verdict.tier] || "?"} [${verdict.tier}] ${q.text.slice(0, 72)}${q.text.length > 72 ? "\u2026" : ""}`);
    console.log(`   ${where}${verdict.person ? ` | ${verdict.person}` : ""}${missing.length ? ` | missing: ${missing.join(", ")}` : ""}`);
    if (verdict.reason) console.log(`   ${verdict.reason}`);
    if (verdict.searchUrls) console.log(`   check: ${verdict.searchUrls.withPerson}`);
    console.log();
  }

  const tally = results.reduce((a, r) => ((a[r.tier] = (a[r.tier] || 0) + 1), a), {});
  console.log("---");
  console.log(Object.entries(tally).map(([k, v]) => `${k}: ${v}`).join("  "));

  const incomplete = results.filter((r) => r.missingFields.length);
  if (incomplete.length) console.log(`${incomplete.length} quotes missing attribution fields.`);

  await writeFile(join(ROOT, "quote-report.json"), JSON.stringify(results, null, 2));
  console.log("Wrote quote-report.json");

  if (!DO_SEARCH) {
    console.log("\nRun with --search and a search API key to assign evidence tiers.");
    return;
  }
  const bad = results.filter((r) => r.tier === "RED" || r.tier === "SUSPECT");
  if (bad.length) {
    console.log(`\n${bad.length} quotes need attention (RED = paraphrase in quote marks, SUSPECT = possible misattribution).`);
    process.exitCode = 1;
  }
}

main().catch((e) => { console.error(e); process.exitCode = 1; });

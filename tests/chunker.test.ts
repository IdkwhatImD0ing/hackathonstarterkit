import { describe, expect, it } from "vitest";
import { chunkPage, contentHash, normalizeText, stripDocumentHeader } from "@/lib/retrieval/chunker";

describe("chunkPage", () => {
  it("anchors chunks to headings with stable ids", () => {
    const body = `intro paragraph

## First Section

first content

## Second Section

second content`;
    const chunks = chunkPage("/playbook/pitching", "Pitching", body);
    expect(chunks.map((c) => c.id)).toEqual([
      "/playbook/pitching#intro#0",
      "/playbook/pitching#first-section#0",
      "/playbook/pitching#second-section#0",
    ]);
  });

  it("an edit in one section leaves other chunks' ids and hashes untouched", () => {
    const before = `## Alpha\n\ncontent a\n\n## Beta\n\ncontent b`;
    const after = `## Alpha\n\ncontent a\n\n## Beta\n\ncontent b, now edited`;
    const chunksBefore = chunkPage("/p", "P", before);
    const chunksAfter = chunkPage("/p", "P", after);
    expect(chunksAfter[0].id).toBe(chunksBefore[0].id);
    expect(chunksAfter[0].contentHash).toBe(chunksBefore[0].contentHash);
    expect(chunksAfter[1].id).toBe(chunksBefore[1].id);
    expect(chunksAfter[1].contentHash).not.toBe(chunksBefore[1].contentHash);
  });

  it("never splits a fenced code block", () => {
    const bigParagraph = "words ".repeat(300);
    const code = "```js\n" + "const x = 1;\n".repeat(200) + "```";
    const body = `## Big Section\n\n${bigParagraph}\n\n${code}\n\n${bigParagraph}`;
    const chunks = chunkPage("/p", "P", body);
    expect(chunks.length).toBeGreaterThan(1);
    const withFence = chunks.filter((c) => c.text.includes("```"));
    for (const chunk of withFence) {
      // fences come in pairs when unsplit
      expect((chunk.text.match(/```/g) ?? []).length % 2).toBe(0);
    }
  });

  it("treats headings inside code fences as text, not structure", () => {
    const body = "## Real\n\n```md\n## Not a heading\n```\n";
    const chunks = chunkPage("/p", "P", body);
    expect(chunks).toHaveLength(1);
    expect(chunks[0].text).toContain("## Not a heading");
  });

  it("normalizes line endings and trailing whitespace before hashing", () => {
    expect(contentHash(normalizeText("a  \r\nb\t\n"))).toBe(contentHash(normalizeText("a\nb")));
  });
});

describe("stripDocumentHeader", () => {
  it("removes the title/canonical header so volatile-looking lines never reach chunks", () => {
    const doc = "# Title\n\nCanonical: https://x\nLast updated: 2026-01-01\n\n---\n\n## Body\n\ntext\n";
    expect(stripDocumentHeader(doc)).not.toContain("Canonical:");
    expect(stripDocumentHeader(doc)).toContain("## Body");
  });
});

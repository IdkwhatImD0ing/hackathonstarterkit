import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getContentPages, markdownFileKey } from "@/lib/content-pages";

const ROOT = process.cwd();

/**
 * Consistency checks over the committed generated artifacts. The
 * generation scripts have their own --check freshness gates; these tests
 * assert the internal invariants of whatever is committed.
 */

describe("agent-skills index", () => {
  const index = JSON.parse(
    readFileSync(join(ROOT, "content/generated/agent-skills/index.json"), "utf8"),
  ) as { $schema: string; skills: { name: string; type: string; url: string; digest: string }[] };

  it("declares the v0.2.0 schema and well-formed skills", () => {
    expect(index.$schema).toBe("https://schemas.agentskills.io/discovery/0.2.0/schema.json");
    expect(index.skills.length).toBeGreaterThanOrEqual(10);
    for (const skill of index.skills) {
      expect(skill.name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(skill.type).toBe("skill-md");
      expect(skill.url).toBe(`/.well-known/agent-skills/${skill.name}/SKILL.md`);
      expect(skill.digest).toMatch(/^sha256:[0-9a-f]{64}$/);
    }
  });

  it("digests match the committed artifact bytes exactly", () => {
    for (const skill of index.skills) {
      const artifact = readFileSync(
        join(ROOT, "content/generated/agent-skills", skill.name, "SKILL.md"),
        "utf8",
      );
      const digest = `sha256:${createHash("sha256").update(artifact, "utf8").digest("hex")}`;
      expect(digest, `digest mismatch for ${skill.name}`).toBe(skill.digest);
    }
  });
});

describe("llms.txt", () => {
  const llms = readFileSync(join(ROOT, "public/llms.txt"), "utf8");

  it("follows the spec structure: H1, blockquote, H2 sections, Optional", () => {
    const lines = llms.split("\n");
    expect(lines[0]).toMatch(/^# /);
    expect(lines[2]).toMatch(/^> /);
    expect(llms).toContain("\n## Playbook\n");
    expect(llms).toContain("\n## Optional\n");
  });

  it("links every content page's .md representation", () => {
    for (const page of getContentPages()) {
      const mdUrl =
        page.path === "/"
          ? "https://thehackathonplaybook.dev/index.md"
          : `https://thehackathonplaybook.dev${page.path}.md`;
      expect(llms, `missing ${mdUrl}`).toContain(`(${mdUrl})`);
    }
  });
});

describe("markdown corpus manifest", () => {
  const manifest = JSON.parse(
    readFileSync(join(ROOT, "content/generated/md-manifest.json"), "utf8"),
  ) as Record<string, { file: string; tokens: number }>;

  it("covers every registered content page with real token counts", () => {
    for (const page of getContentPages()) {
      const entry = manifest[page.path];
      expect(entry, `no manifest entry for ${page.path}`).toBeDefined();
      expect(entry.file).toBe(`md/${markdownFileKey(page.path)}.md`);
      expect(entry.tokens).toBeGreaterThan(50);
      // and the file actually exists
      readFileSync(join(ROOT, "content/generated", entry.file), "utf8");
    }
  });
});

describe("openapi.json", () => {
  it("parses and describes the public endpoints", () => {
    const spec = JSON.parse(readFileSync(join(ROOT, "public/openapi.json"), "utf8"));
    expect(spec.openapi).toMatch(/^3\./);
    expect(Object.keys(spec.paths)).toEqual(
      expect.arrayContaining(["/api/chat", "/api/mcp", "/api/health"]),
    );
  });
});

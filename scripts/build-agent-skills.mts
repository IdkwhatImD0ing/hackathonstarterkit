/**
 * Generate the Agent Skills discovery artifacts into
 * content/generated/agent-skills/, per the Agent Skills Discovery RFC
 * v0.2.0 (github.com/cloudflare/agent-skills-discovery-rfc, fetched and
 * followed for exact field names):
 *
 * - index.json: $schema + skills[] with name/type/description/url/digest,
 *   digest being sha256:{hex} of the exact artifact bytes.
 * - One SKILL.md artifact per skill. The ten installable non-coder skills
 *   are copied verbatim from skills/ (already valid SKILL.md files
 *   with frontmatter). Four more are derived from playbook content: the
 *   artifact is YAML frontmatter plus the same Markdown the page serves,
 *   so the skill can never drift from the site.
 *
 * Digests are computed here at build time from the artifact bytes being
 * published; CI runs --check so a stale digest cannot ship.
 *
 * Usage:  pnpm gen:skills  |  pnpm gen:skills --check
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { NON_CODER_SKILLS } from "../lib/non-coder-skills";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "content", "generated", "agent-skills");
const MD_DIR = join(ROOT, "content", "generated", "md");

const SCHEMA = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

/** Playbook-derived skills: name -> source page + agent-facing description. */
const DERIVED_SKILLS: {
  name: string;
  sourceFile: string;
  description: string;
}[] = [
  {
    name: "hackathon-idea-validation",
    sourceFile: "playbook/validation.md",
    description:
      "Validate a hackathon idea quickly against real constraints and judging criteria before building. Use when deciding whether a hackathon project idea is worth pursuing.",
  },
  {
    name: "hackathon-pitch-prep",
    sourceFile: "playbook/pitching.md",
    description:
      "Prepare a winning hackathon pitch: narrative structure, demo choreography, judge psychology, and Q&A handling. Use when preparing to present a hackathon project.",
  },
  {
    name: "hackathon-stack-selection",
    sourceFile: "blog/best-tech-stack-for-hackathons.md",
    description:
      "Choose a hackathon tech stack optimized for shipping in 24-48 hours. Use when picking frameworks, hosting, and AI tooling at the start of a hackathon.",
  },
  {
    name: "hackathon-submission-checklist",
    sourceFile: "playbook/submission.md",
    description:
      "Ship a complete hackathon submission: README, demo video, Devpost write-up, and deliverables judges remember. Use when finalizing a hackathon submission.",
  },
];

function sha256(content: string): string {
  return `sha256:${createHash("sha256").update(content, "utf8").digest("hex")}`;
}

function derivedArtifact(skill: (typeof DERIVED_SKILLS)[number]): string {
  const source = readFileSync(join(MD_DIR, skill.sourceFile), "utf8");
  // Drop the document header (title/canonical lines) up to the first "---"
  // separator; the frontmatter replaces it.
  const body = source.split("\n---\n").slice(1).join("\n---\n").trim();
  return [
    "---",
    `name: ${skill.name}`,
    `description: "${skill.description}"`,
    "---",
    "",
    body,
    "",
  ].join("\n");
}

function generate(): Map<string, string> {
  const files = new Map<string, string>();
  const entries: object[] = [];

  for (const skill of NON_CODER_SKILLS) {
    const artifact = skill.content;
    files.set(`${skill.slug}/SKILL.md`, artifact);
    entries.push({
      name: skill.slug,
      type: "skill-md",
      description: skill.description,
      url: `/.well-known/agent-skills/${skill.slug}/SKILL.md`,
      digest: sha256(artifact),
    });
  }

  for (const skill of DERIVED_SKILLS) {
    const artifact = derivedArtifact(skill);
    files.set(`${skill.name}/SKILL.md`, artifact);
    entries.push({
      name: skill.name,
      type: "skill-md",
      description: skill.description,
      url: `/.well-known/agent-skills/${skill.name}/SKILL.md`,
      digest: sha256(artifact),
    });
  }

  files.set("index.json", JSON.stringify({ $schema: SCHEMA, skills: entries }, null, 2) + "\n");
  return files;
}

function main() {
  const check = process.argv.includes("--check");
  const files = generate();

  if (check) {
    const stale: string[] = [];
    for (const [file, content] of files) {
      const full = join(OUT_DIR, file);
      if (!existsSync(full) || readFileSync(full, "utf8") !== content) stale.push(file);
    }
    if (stale.length > 0) {
      console.error(`Stale agent-skills artifacts: ${stale.join(", ")}`);
      console.error("Run `pnpm gen:skills` and commit the result.");
      process.exit(1);
    }
    console.log(`Agent skills index fresh: ${files.size - 1} skills.`);
    return;
  }

  rmSync(OUT_DIR, { recursive: true, force: true });
  for (const [file, content] of files) {
    const full = join(OUT_DIR, file);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
  }
  console.log(`Wrote ${files.size - 1} skill artifacts + index.json to content/generated/agent-skills/`);
}

main();

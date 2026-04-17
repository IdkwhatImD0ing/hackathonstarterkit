import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  Shield,
  Hammer,
  Bug,
  Presentation,
  Compass,
  MonitorSmartphone,
  Server,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillCategory = "foundation" | "building" | "fixing" | "shipping";

export interface SkillCommand {
  name: string;
  usage: string;
  hint: string;
}

export interface NonCoderSkill {
  slug: string;
  name: string;
  title: string;
  description: string;
  category: SkillCategory;
  categoryLabel: string;
  icon: LucideIcon;
  accent: "volt" | "spark" | "primary" | "success";
  command: SkillCommand;
  content: string;
}

const CATEGORY_META: Record<
  SkillCategory,
  { label: string; accent: "volt" | "spark" | "primary" | "success" }
> = {
  foundation: { label: "Foundation", accent: "volt" },
  building: { label: "Building", accent: "spark" },
  fixing: { label: "Fixing", accent: "primary" },
  shipping: { label: "Shipping", accent: "success" },
};

const SKILLS_DIR = join(process.cwd(), ".agents", "skills");

function loadSkillContent(slug: string): string {
  return readFileSync(join(SKILLS_DIR, slug, "SKILL.md"), "utf8");
}

interface SkillMeta {
  slug: string;
  title: string;
  description: string;
  category: SkillCategory;
  icon: LucideIcon;
  command: SkillCommand;
}

const SKILL_META: SkillMeta[] = [
  {
    slug: "non-coder-mode",
    title: "Non-Coder Mode",
    description:
      "Core guardrails for non-coders. Tells the AI to explain everything in plain English, break tasks into small steps, and never assume coding knowledge.",
    category: "foundation",
    icon: Shield,
    command: {
      name: "/non-coder-mode",
      usage: "/non-coder-mode",
      hint: "Activates non-coder guardrails for the session",
    },
  },
  {
    slug: "domain-to-spec",
    title: "Domain to Spec",
    description:
      "Run this FIRST. Captures your domain expertise and writes AGENTS.md and PRD.md to the repo root. Every other scaffold skill reads these files.",
    category: "foundation",
    icon: Compass,
    command: {
      name: "/domain-to-spec",
      usage: "/domain-to-spec [your profession] [what you want to build]",
      hint: "Writes AGENTS.md and PRD.md from your domain expertise",
    },
  },
  {
    slug: "quickstart",
    title: "Quickstart",
    description:
      "One-shot project bootstrapper. Chains domain-to-spec, scaffold-frontend, and scaffold-backend (if needed) with user confirmation between steps.",
    category: "foundation",
    icon: Zap,
    command: {
      name: "/quickstart",
      usage: "/quickstart",
      hint: "Runs the full scaffold pipeline end-to-end",
    },
  },
  {
    slug: "scaffold-frontend",
    title: "Scaffold Frontend",
    description:
      "PRD-driven Next.js scaffold into clients/. Reads AGENTS.md and PRD.md, generates pages, layout, types, and an API client. Refuses to run without both files.",
    category: "building",
    icon: MonitorSmartphone,
    command: {
      name: "/scaffold-frontend",
      usage: "/scaffold-frontend",
      hint: "Creates clients/ from PRD.md (requires domain-to-spec first)",
    },
  },
  {
    slug: "scaffold-backend",
    title: "Scaffold Backend",
    description:
      "PRD-driven FastAPI scaffold into server/ with optional Supabase. One stub route per entry in PRD.md > Backend Routes. Skips automatically if Backend Needed? = No.",
    category: "building",
    icon: Server,
    command: {
      name: "/scaffold-backend",
      usage: "/scaffold-backend",
      hint: "Creates server/ from PRD.md (runs only if backend is needed)",
    },
  },
  {
    slug: "feature-builder",
    title: "Feature Builder",
    description:
      "Structured workflow for implementing a new feature. Returns a plan, files list, commands, test steps, and rollback plan.",
    category: "building",
    icon: Hammer,
    command: {
      name: "/feature-builder",
      usage: "/feature-builder [describe the feature you want]",
      hint: "Structured feature implementation workflow",
    },
  },
  {
    slug: "bugfix-doctor",
    title: "Bugfix Doctor",
    description:
      "Systematic bug-fixing workflow. Walks through reproduce, isolate, fix, test, and verify. Explains all errors in plain English.",
    category: "fixing",
    icon: Bug,
    command: {
      name: "/bugfix-doctor",
      usage: "/bugfix-doctor [paste the error or describe the symptom]",
      hint: "Systematic bug-fixing with plain English explanations",
    },
  },
  {
    slug: "demo-prep",
    title: "Demo Prep",
    description:
      "Produces a step-by-step live demo script for hackathon presentations. Covers the problem, walkthrough, and outcome with a backup plan.",
    category: "shipping",
    icon: Presentation,
    command: {
      name: "/demo-prep",
      usage: "/demo-prep [app name or description]",
      hint: "Generates a timed demo script with backup plan",
    },
  },
];

export const NON_CODER_SKILLS: NonCoderSkill[] = SKILL_META.map((meta) => ({
  slug: meta.slug,
  name: meta.slug,
  title: meta.title,
  description: meta.description,
  category: meta.category,
  categoryLabel: CATEGORY_META[meta.category].label,
  accent: CATEGORY_META[meta.category].accent,
  icon: meta.icon,
  command: meta.command,
  content: loadSkillContent(meta.slug),
}));

export const STANDALONE_COMMANDS: SkillCommand[] = [
  {
    name: "/explain",
    usage: "/explain [paste code, an error, or describe what you want to understand]",
    hint: "Explains code or errors in plain English for non-coders",
  },
];

export const ALL_COMMANDS: SkillCommand[] = [
  ...NON_CODER_SKILLS.map((s) => s.command),
  ...STANDALONE_COMMANDS,
];

export function getSkillBySlug(slug: string): NonCoderSkill | undefined {
  return NON_CODER_SKILLS.find((s) => s.slug === slug);
}

export function getSkillsByCategory(
  category: SkillCategory
): NonCoderSkill[] {
  return NON_CODER_SKILLS.filter((s) => s.category === category);
}

/**
 * Recommended order to run the skills for a fresh project.
 * Used on the skills index page to teach users the pipeline.
 *
 * Note: `quickstart` is intentionally NOT in this list. It is a shortcut
 * that chains `domain-to-spec -> scaffold-frontend -> scaffold-backend`
 * in one invocation, not a step in the pipeline. It is surfaced separately
 * on the skills page as an alternative to running steps 2-4 manually.
 */
export const RECOMMENDED_ORDER: string[] = [
  "non-coder-mode",
  "domain-to-spec",
  "scaffold-frontend",
  "scaffold-backend",
  "feature-builder",
  "bugfix-doctor",
  "demo-prep",
];

/**
 * Skills that act as shortcuts over the RECOMMENDED_ORDER pipeline.
 * Shown in their own section on the skills page.
 */
export const SHORTCUT_SKILLS: string[] = ["quickstart"];

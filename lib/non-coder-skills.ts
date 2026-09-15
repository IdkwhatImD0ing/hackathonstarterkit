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
  Sparkles,
  Github,
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
  /** When in a hackathon build this category's skills run. */
  categoryWhen: string;
  icon: LucideIcon;
  accent: "volt" | "spark" | "primary" | "success";
  command: SkillCommand;
  content: string;
}

const CATEGORY_META: Record<
  SkillCategory,
  { label: string; when: string; accent: "volt" | "spark" | "primary" | "success" }
> = {
  foundation: { label: "Foundation", when: "Before you write any code", accent: "volt" },
  building: { label: "Building", when: "While you build", accent: "spark" },
  fixing: { label: "Fixing", when: "When you hit an error", accent: "primary" },
  shipping: { label: "Shipping", when: "Before judging", accent: "success" },
};

const SKILLS_DIR = join(process.cwd(), "skills");

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
      "The AI works in small steps and explains each in plain English. It asks before anything risky, like deleting files, and stays on for the rest of the session.",
    category: "foundation",
    icon: Shield,
    command: {
      name: "/non-coder-mode",
      usage: "/non-coder-mode",
      hint: "Plain-English mode for the session",
    },
  },
  {
    slug: "domain-to-spec",
    title: "Domain to Spec",
    description:
      "Interviews you about your field and your idea, then writes AGENTS.md (rules for the AI) and PRD.md (the plan for your app).",
    category: "foundation",
    icon: Compass,
    command: {
      name: "/domain-to-spec",
      usage: "/domain-to-spec [your profession] [what you want to build]",
      hint: "Writes AGENTS.md and PRD.md",
    },
  },
  {
    slug: "quickstart",
    title: "Quickstart",
    description:
      "Runs /domain-to-spec, /scaffold-frontend, and /scaffold-backend (if needed) in one go, pausing once so you can approve the plan.",
    category: "foundation",
    icon: Zap,
    command: {
      name: "/quickstart",
      usage: "/quickstart",
      hint: "Runs the setup steps in one go",
    },
  },
  {
    slug: "scaffold-frontend",
    title: "Scaffold Frontend",
    description:
      "Turns PRD.md into the first version of your app's frontend in a client/ folder: Next.js pages, navigation, types, and an optional client for your backend.",
    category: "building",
    icon: MonitorSmartphone,
    command: {
      name: "/scaffold-frontend",
      usage: "/scaffold-frontend",
      hint: "Builds your pages in client/",
    },
  },
  {
    slug: "scaffold-backend",
    title: "Scaffold Backend",
    description:
      "Builds a FastAPI backend in a server/ folder, with sample data for each route PRD.md lists and optional Supabase. Skips itself if PRD.md says no backend.",
    category: "building",
    icon: Server,
    command: {
      name: "/scaffold-backend",
      usage: "/scaffold-backend",
      hint: "Builds the backend in server/",
    },
  },
  {
    slug: "v0-prompt-crafter",
    title: "v0 Prompt Crafter",
    description:
      "An alternative to /scaffold-frontend. It turns PRD.md or a one-line idea into a paste-ready Vercel v0 prompt, with a visual style researched for your industry.",
    category: "building",
    icon: Sparkles,
    command: {
      name: "/v0-prompt-crafter",
      usage: "/v0-prompt-crafter [paste your PRD or one-line product description]",
      hint: "Writes a Vercel v0 design prompt",
    },
  },
  {
    slug: "feature-builder",
    title: "Feature Builder",
    description:
      "Run it once for each feature. It shows you the plan first: the files and commands it will use, how to test the result, and how to undo it.",
    category: "building",
    icon: Hammer,
    command: {
      name: "/feature-builder",
      usage: "/feature-builder [describe the feature you want]",
      hint: "Adds one feature, with an undo plan",
    },
  },
  {
    slug: "bugfix-doctor",
    title: "Bugfix Doctor",
    description:
      "Translates the error into plain English, then finds what caused it. It makes the smallest fix it can and checks that the fix worked.",
    category: "fixing",
    icon: Bug,
    command: {
      name: "/bugfix-doctor",
      usage: "/bugfix-doctor [paste the error or describe the symptom]",
      hint: "Explains and fixes an error",
    },
  },
  {
    slug: "demo-prep",
    title: "Demo Prep",
    description:
      "A timed demo script from problem to result, with a backup plan if the app breaks and the questions judges will likely ask.",
    category: "shipping",
    icon: Presentation,
    command: {
      name: "/demo-prep",
      usage: "/demo-prep [app name or description]",
      hint: "A timed demo script with a backup plan",
    },
  },
  {
    slug: "readme-writer",
    title: "README Writer",
    description:
      "Writes your README (your repo's front page) with badges, a demo video, a how-it-works diagram, and team cards. It also fills in the repo's description, website, and topics so judges and recruiters can find it.",
    category: "shipping",
    icon: Github,
    command: {
      name: "/readme-writer",
      usage: "/readme-writer [your project name or repo]",
      hint: "Writes your GitHub README",
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
  categoryWhen: CATEGORY_META[meta.category].when,
  accent: CATEGORY_META[meta.category].accent,
  icon: meta.icon,
  command: meta.command,
  content: loadSkillContent(meta.slug),
}));

export const STANDALONE_COMMANDS: SkillCommand[] = [
  // [CONFIRM: /explain lives in .agents/commands/explain.md, not skills/. Does the install prompt (npx skills add) actually install it? If not, readers who follow this page won't have it.]
  {
    name: "/explain",
    usage: "/explain [paste code, an error, or describe what you want to understand]",
    hint: "Use it whenever something on screen doesn't make sense. The AI explains it in plain English and defines every technical term it uses.",
  },
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
 *
 * `v0-prompt-crafter` is also NOT in this list because it is an alternative
 * path to `scaffold-frontend` (generate a UI via Vercel v0 instead of
 * scaffolding locally) rather than a pipeline step. Skills left out of this
 * list appear in the skills page's "Other Commands" section instead.
 */
export const RECOMMENDED_ORDER: string[] = [
  "non-coder-mode",
  "domain-to-spec",
  "scaffold-frontend",
  "scaffold-backend",
  "feature-builder",
  "bugfix-doctor",
  "demo-prep",
  "readme-writer",
];

/**
 * Skills that act as shortcuts over the RECOMMENDED_ORDER pipeline.
 * Shown with a SHORTCUT badge in the skills page's "Other Commands" section.
 */
export const SHORTCUT_SKILLS: string[] = ["quickstart"];

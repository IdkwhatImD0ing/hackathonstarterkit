import { Trophy, Settings, BookOpen, Plug, Sparkles, FileCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NonCoderSection {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: "volt" | "spark" | "primary" | "success";
}

export const NON_CODER_SECTIONS: NonCoderSection[] = [
  {
    slug: "proof",
    title: "The Proof",
    subtitle:
      "The lawyer who won Anthropic's 500-person hackathon, and three others who build with AI.",
    icon: Trophy,
    accent: "volt",
  },
  {
    slug: "setup",
    title: "Getting Started",
    subtitle:
      "What to set up before your first prompt, and the five-step loop you'll repeat for every feature.",
    icon: Settings,
    accent: "spark",
  },
  {
    slug: "concepts",
    title: "Concepts Explained",
    subtitle:
      "GitHub, APIs, deploying, and other jargon explained in plain English.",
    icon: BookOpen,
    accent: "primary",
  },
  {
    slug: "apis",
    title: "Using APIs",
    subtitle:
      "How to add a service to your app, with worked examples for ElevenLabs voice and a Supabase database.",
    icon: Plug,
    accent: "success",
  },
  {
    slug: "system-prompt",
    title: "The System Prompt",
    subtitle:
      "The CLAUDE.md and AGENTS.md files that set the rules your AI follows every session. One command sets up both.",
    icon: FileCog,
    accent: "spark",
  },
  {
    slug: "skills",
    title: "Skills & Commands",
    subtitle:
      "Slash commands for each stage of a hackathon build, from planning your app to writing its README.",
    icon: Sparkles,
    accent: "volt",
  },
];

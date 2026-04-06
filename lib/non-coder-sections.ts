import { Trophy, Settings, BookOpen, Plug, Sparkles } from "lucide-react";
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
      "Real professionals who beat thousands of developers at major hackathons.",
    icon: Trophy,
    accent: "volt",
  },
  {
    slug: "setup",
    title: "Getting Started",
    subtitle:
      "The 3 files, 4 shortcuts, and daily workflow you need to start building.",
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
      "How to add any service to your app with just a key and a docs link.",
    icon: Plug,
    accent: "success",
  },
  {
    slug: "skills",
    title: "Skills & Commands",
    subtitle:
      "Installable AI skills and slash commands that teach your AI to work with non-coders.",
    icon: Sparkles,
    accent: "volt",
  },
];

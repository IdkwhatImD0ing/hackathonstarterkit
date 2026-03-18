import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Layers,
  Sparkles,
  Database,
  Rocket,
  Radio,
  KeyRound,
  UserCheck,
  Lock,
  ShieldCheck,
  Fingerprint,
  Paintbrush,
  Component,
  Palette,
  LayoutGrid,
  Blocks,
  Brain,
  Bot,
  Link,
  Cpu,
  Wand2,
  Server,
  Flame,
  HardDrive,
  CircleDot,
  Zap,
  Globe,
  Cloud,
  ArrowUpRight,
  Triangle,
  Phone,
  Plug,
  Wifi,
  MessageSquare,
  Activity,
} from "lucide-react";

export type SlotId =
  | "auth"
  | "ui"
  | "ai"
  | "database"
  | "deployment"
  | "realtime";

export type AccentColor = "volt" | "spark" | "primary" | "success";

export interface GoBagSlot {
  id: SlotId;
  label: string;
  accent: AccentColor;
  icon: LucideIcon;
  description: string;
}

export interface GoBagTool {
  id: string;
  name: string;
  slotId: SlotId;
  icon: LucideIcon;
  description: string;
}

export const ACCENT_STYLES: Record<
  AccentColor,
  {
    bg: string;
    text: string;
    border: string;
    glow: string;
    borderSolid: string;
    bgFill: string;
  }
> = {
  volt: {
    bg: "bg-volt/10",
    text: "text-volt",
    border: "border-volt/20",
    borderSolid: "border-volt/50",
    glow: "shadow-[0_0_24px_oklch(0.78_0.15_195/30%)]",
    bgFill: "bg-volt/15",
  },
  spark: {
    bg: "bg-spark/10",
    text: "text-spark",
    border: "border-spark/20",
    borderSolid: "border-spark/50",
    glow: "shadow-[0_0_24px_oklch(0.78_0.16_85/30%)]",
    bgFill: "bg-spark/15",
  },
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    borderSolid: "border-primary/50",
    glow: "shadow-[0_0_24px_oklch(0.54_0.24_285/30%)]",
    bgFill: "bg-primary/15",
  },
  success: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
    borderSolid: "border-success/50",
    glow: "shadow-[0_0_24px_oklch(0.72_0.19_155/30%)]",
    bgFill: "bg-success/15",
  },
};

export const SLOTS: GoBagSlot[] = [
  {
    id: "auth",
    label: "Auth",
    accent: "volt",
    icon: Shield,
    description: "Authentication & identity",
  },
  {
    id: "ui",
    label: "UI Framework",
    accent: "spark",
    icon: Layers,
    description: "Component library & styling",
  },
  {
    id: "ai",
    label: "AI / ML",
    accent: "primary",
    icon: Sparkles,
    description: "Intelligence layer",
  },
  {
    id: "database",
    label: "Database",
    accent: "success",
    icon: Database,
    description: "Data persistence & queries",
  },
  {
    id: "deployment",
    label: "Deployment",
    accent: "volt",
    icon: Rocket,
    description: "Hosting & CI/CD",
  },
  {
    id: "realtime",
    label: "Realtime / Comms",
    accent: "spark",
    icon: Radio,
    description: "Live data & messaging",
  },
];

export const TOOLS: GoBagTool[] = [
  // Auth
  {
    id: "supabase-auth",
    name: "Supabase Auth",
    slotId: "auth",
    icon: KeyRound,
    description: "OAuth + email, built into Supabase",
  },
  {
    id: "clerk",
    name: "Clerk",
    slotId: "auth",
    icon: UserCheck,
    description: "Drop-in auth with prebuilt UI",
  },
  {
    id: "nextauth",
    name: "NextAuth.js",
    slotId: "auth",
    icon: Lock,
    description: "Flexible auth for Next.js",
  },
  {
    id: "firebase-auth",
    name: "Firebase Auth",
    slotId: "auth",
    icon: ShieldCheck,
    description: "Google-backed identity platform",
  },
  {
    id: "auth0",
    name: "Auth0",
    slotId: "auth",
    icon: Fingerprint,
    description: "Enterprise-grade identity",
  },

  // UI
  {
    id: "shadcn",
    name: "shadcn/ui",
    slotId: "ui",
    icon: Component,
    description: "Copy-paste Radix + Tailwind",
  },
  {
    id: "chakra",
    name: "Chakra UI",
    slotId: "ui",
    icon: Palette,
    description: "Accessible component library",
  },
  {
    id: "mui",
    name: "Material UI",
    slotId: "ui",
    icon: LayoutGrid,
    description: "Google's design system for React",
  },
  {
    id: "antd",
    name: "Ant Design",
    slotId: "ui",
    icon: Blocks,
    description: "Enterprise UI components",
  },
  {
    id: "mantine",
    name: "Mantine",
    slotId: "ui",
    icon: Paintbrush,
    description: "Full-featured React library",
  },

  // AI/ML
  {
    id: "openai",
    name: "OpenAI SDK",
    slotId: "ai",
    icon: Brain,
    description: "GPT-4o, Whisper, DALL-E",
  },
  {
    id: "anthropic",
    name: "Anthropic SDK",
    slotId: "ai",
    icon: Bot,
    description: "Claude models via API",
  },
  {
    id: "langchain",
    name: "LangChain",
    slotId: "ai",
    icon: Link,
    description: "LLM orchestration framework",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    slotId: "ai",
    icon: Cpu,
    description: "Open-source model hub",
  },
  {
    id: "vercel-ai",
    name: "Vercel AI SDK",
    slotId: "ai",
    icon: Wand2,
    description: "Streaming AI for Next.js",
  },

  // Database
  {
    id: "supabase-db",
    name: "Supabase",
    slotId: "database",
    icon: Server,
    description: "Postgres + realtime + auth",
  },
  {
    id: "firebase-db",
    name: "Firebase",
    slotId: "database",
    icon: Flame,
    description: "NoSQL with realtime sync",
  },
  {
    id: "mongodb",
    name: "MongoDB Atlas",
    slotId: "database",
    icon: HardDrive,
    description: "Document DB in the cloud",
  },
  {
    id: "planetscale",
    name: "PlanetScale",
    slotId: "database",
    icon: CircleDot,
    description: "Serverless MySQL branching",
  },
  {
    id: "neon",
    name: "Neon",
    slotId: "database",
    icon: Zap,
    description: "Serverless Postgres",
  },

  // Deployment
  {
    id: "vercel",
    name: "Vercel",
    slotId: "deployment",
    icon: Triangle,
    description: "Zero-config Next.js hosting",
  },
  {
    id: "railway",
    name: "Railway",
    slotId: "deployment",
    icon: ArrowUpRight,
    description: "Deploy anything, fast",
  },
  {
    id: "flyio",
    name: "Fly.io",
    slotId: "deployment",
    icon: Globe,
    description: "Edge compute, global deploys",
  },
  {
    id: "render",
    name: "Render",
    slotId: "deployment",
    icon: Cloud,
    description: "Simple cloud hosting",
  },
  {
    id: "netlify",
    name: "Netlify",
    slotId: "deployment",
    icon: Globe,
    description: "JAMstack & static sites",
  },

  // Realtime / Comms
  {
    id: "twilio",
    name: "Twilio",
    slotId: "realtime",
    icon: Phone,
    description: "Voice, SMS, video APIs",
  },
  {
    id: "websockets",
    name: "WebSockets",
    slotId: "realtime",
    icon: Plug,
    description: "Native browser bidirectional",
  },
  {
    id: "pusher",
    name: "Pusher",
    slotId: "realtime",
    icon: Wifi,
    description: "Managed realtime channels",
  },
  {
    id: "ably",
    name: "Ably",
    slotId: "realtime",
    icon: Activity,
    description: "Pub/sub at scale",
  },
  {
    id: "stream",
    name: "Stream",
    slotId: "realtime",
    icon: MessageSquare,
    description: "Chat & activity feeds",
  },
];

export const SLOT_COUNT = SLOTS.length;
export const STORAGE_KEY = "go-bag-loadout";

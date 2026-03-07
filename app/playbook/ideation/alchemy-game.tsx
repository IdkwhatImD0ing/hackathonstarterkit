"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Phone,
  Video,
  Music,
  Eye,
  Link,
  Heart,
  GraduationCap,
  Shield,
  DollarSign,
  Gamepad2,
  Dumbbell,
  PhoneCall,
  Clapperboard,
  Headphones,
  ScanEye,
  FileCode2,
  Activity,
  Siren,
  HeartHandshake,
  Landmark,
  BookOpenCheck,
  Megaphone,
  Disc3,
  Microscope,
  PiggyBank,
  Trophy,
  Sparkles,
  RotateCcw,
  GripVertical,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data types
// ---------------------------------------------------------------------------

type ElementCategory = "tech" | "industry" | "intermediate" | "final";

interface AlchemyElement {
  id: string;
  name: string;
  icon: LucideIcon;
  category: ElementCategory;
  description?: string;
}

interface Recipe {
  a: string;
  b: string;
  result: string;
}

// ---------------------------------------------------------------------------
// Element definitions
// ---------------------------------------------------------------------------

const ELEMENTS: Record<string, AlchemyElement> = {
  llm: { id: "llm", name: "LLMs", icon: Brain, category: "tech", description: "GPT-4o, Claude, Gemini" },
  twilio: { id: "twilio", name: "Twilio API", icon: Phone, category: "tech", description: "Phone calls & SMS" },
  veo: { id: "veo", name: "Google Veo 3", icon: Video, category: "tech", description: "Text to video" },
  suno: { id: "suno", name: "SunoAI", icon: Music, category: "tech", description: "Text to music" },
  vision: { id: "vision", name: "Vision AI", icon: Eye, category: "tech", description: "YOLO, SAM, GPT-4V" },
  blockchain: { id: "blockchain", name: "Blockchain", icon: Link, category: "tech", description: "Smart contracts & web3" },

  health: { id: "health", name: "Health", icon: Heart, category: "industry", description: "Healthcare & wellness" },
  education: { id: "education", name: "Education", icon: GraduationCap, category: "industry", description: "Learning & tutoring" },
  defense: { id: "defense", name: "Defense", icon: Shield, category: "industry", description: "Emergency & public safety" },
  finance: { id: "finance", name: "Finance", icon: DollarSign, category: "industry", description: "Banking & fintech" },
  entertainment: { id: "entertainment", name: "Entertainment", icon: Gamepad2, category: "industry", description: "Media & content" },
  sports: { id: "sports", name: "Sports", icon: Dumbbell, category: "industry", description: "Athletics & fitness" },

  phone_agent: { id: "phone_agent", name: "AI Phone Agent", icon: PhoneCall, category: "intermediate", description: "LLM that answers calls" },
  video_gen: { id: "video_gen", name: "AI Video Generator", icon: Clapperboard, category: "intermediate", description: "LLM-directed video creation" },
  music_prod: { id: "music_prod", name: "AI Music Producer", icon: Headphones, category: "intermediate", description: "LLM-directed music generation" },
  image_analyzer: { id: "image_analyzer", name: "AI Image Analyzer", icon: ScanEye, category: "intermediate", description: "LLM + computer vision" },
  smart_contract: { id: "smart_contract", name: "Smart Contract AI", icon: FileCode2, category: "intermediate", description: "LLM writes & audits contracts" },
  sports_analytics: { id: "sports_analytics", name: "Sports Analytics Engine", icon: Activity, category: "intermediate", description: "Vision AI tracks athletes" },

  dispatch_ai: { id: "dispatch_ai", name: "DispatchAI", icon: Siren, category: "final", description: "AI 911 dispatcher" },
  mental_health: { id: "mental_health", name: "Mental Health Agent", icon: HeartHandshake, category: "final", description: "AI therapy support line" },
  talktuahbank: { id: "talktuahbank", name: "TalkTuahBank", icon: Landmark, category: "final", description: "AI banking over phone" },
  tutor_hotline: { id: "tutor_hotline", name: "AI Tutor Hotline", icon: BookOpenCheck, category: "final", description: "Call in to learn anything" },
  ad_creator: { id: "ad_creator", name: "AI Ad Creator", icon: Megaphone, category: "final", description: "Iterative video ad generation" },
  dj_platform: { id: "dj_platform", name: "AI DJ Platform", icon: Disc3, category: "final", description: "AI-powered music remixing" },
  medical_imaging: { id: "medical_imaging", name: "Medical Imaging AI", icon: Microscope, category: "final", description: "AI diagnostic scans" },
  defi_advisor: { id: "defi_advisor", name: "DeFi Advisor", icon: PiggyBank, category: "final", description: "AI-powered DeFi guidance" },
  sports_coach: { id: "sports_coach", name: "AI Sports Coach", icon: Trophy, category: "final", description: "Analytics-driven coaching" },
};

// ---------------------------------------------------------------------------
// Recipes (order-independent: a+b and b+a both work)
// ---------------------------------------------------------------------------

const RECIPES: Recipe[] = [
  { a: "llm", b: "twilio", result: "phone_agent" },
  { a: "llm", b: "veo", result: "video_gen" },
  { a: "llm", b: "suno", result: "music_prod" },
  { a: "llm", b: "vision", result: "image_analyzer" },
  { a: "llm", b: "blockchain", result: "smart_contract" },
  { a: "vision", b: "sports", result: "sports_analytics" },
  { a: "phone_agent", b: "defense", result: "dispatch_ai" },
  { a: "phone_agent", b: "health", result: "mental_health" },
  { a: "phone_agent", b: "finance", result: "talktuahbank" },
  { a: "phone_agent", b: "education", result: "tutor_hotline" },
  { a: "video_gen", b: "entertainment", result: "ad_creator" },
  { a: "music_prod", b: "entertainment", result: "dj_platform" },
  { a: "image_analyzer", b: "health", result: "medical_imaging" },
  { a: "smart_contract", b: "finance", result: "defi_advisor" },
  { a: "sports_analytics", b: "education", result: "sports_coach" },
];

const BASE_IDS = Object.values(ELEMENTS)
  .filter((e) => e.category === "tech" || e.category === "industry")
  .map((e) => e.id);

const TOTAL_DISCOVERIES = RECIPES.length;
const STORAGE_KEY = "alchemy-discoveries";

function findRecipe(a: string, b: string): string | null {
  const m = RECIPES.find(
    (r) => (r.a === a && r.b === b) || (r.a === b && r.b === a),
  );
  return m?.result ?? null;
}

const CATEGORY_STYLE: Record<
  ElementCategory,
  { bg: string; text: string; border: string; glow: string }
> = {
  tech: {
    bg: "bg-volt/10",
    text: "text-volt",
    border: "border-volt/30",
    glow: "shadow-[0_0_20px_oklch(0.78_0.15_195/30%)]",
  },
  industry: {
    bg: "bg-spark/10",
    text: "text-spark",
    border: "border-spark/30",
    glow: "shadow-[0_0_20px_oklch(0.78_0.16_85/30%)]",
  },
  intermediate: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
    glow: "shadow-[0_0_20px_oklch(0.54_0.24_285/30%)]",
  },
  final: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/30",
    glow: "shadow-[0_0_20px_oklch(0.72_0.19_155/30%)]",
  },
};

// ---------------------------------------------------------------------------
// Workspace item state
// ---------------------------------------------------------------------------

interface WorkspaceItem {
  uid: string;
  elementId: string;
  x: number;
  y: number;
}

let uidCounter = 0;
function nextUid() {
  return `ws-${++uidCounter}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AlchemyGame() {
  // ---- persisted discoveries ----
  const [discovered, setDiscovered] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set(BASE_IDS);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        return new Set([...BASE_IDS, ...parsed]);
      }
    } catch {
      /* ignore */
    }
    return new Set(BASE_IDS);
  });

  const [workspace, setWorkspace] = useState<WorkspaceItem[]>([]);
  const [dragging, setDragging] = useState<{
    uid: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [newDiscovery, setNewDiscovery] = useState<string | null>(null);
  const [failFlash, setFailFlash] = useState<[string, string] | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Refs for reading latest state inside document-level event listeners
  const workspaceRef = useRef(workspace);
  workspaceRef.current = workspace;
  const discoveredRef = useRef(discovered);
  discoveredRef.current = discovered;
  const draggingRef = useRef(dragging);
  draggingRef.current = dragging;

  const discoveryCount = [...discovered].filter(
    (id) => !BASE_IDS.includes(id),
  ).length;

  // ---- persist to localStorage ----
  useEffect(() => {
    const toStore = [...discovered].filter((id) => !BASE_IDS.includes(id));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      /* ignore */
    }
  }, [discovered]);

  // ---- document-level move/up while dragging ----
  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      const d = draggingRef.current;
      if (!canvas || !d) return;
      const rect = canvas.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(rect.width - 100, e.clientX - rect.left - d.offsetX),
      );
      const y = Math.max(
        0,
        Math.min(rect.height - 40, e.clientY - rect.top - d.offsetY),
      );
      setWorkspace((prev) =>
        prev.map((it) => (it.uid === d.uid ? { ...it, x, y } : it)),
      );
    };

    const onUp = () => {
      const d = draggingRef.current;
      if (!d) {
        setDragging(null);
        return;
      }
      const ws = workspaceRef.current;
      const draggedItem = ws.find((w) => w.uid === d.uid);
      if (!draggedItem) {
        setDragging(null);
        return;
      }

      const COMBINE_DIST = 70;
      for (const other of ws) {
        if (other.uid === d.uid) continue;
        const dx = draggedItem.x - other.x;
        const dy = draggedItem.y - other.y;
        if (Math.sqrt(dx * dx + dy * dy) < COMBINE_DIST) {
          const result = findRecipe(draggedItem.elementId, other.elementId);
          if (result && ELEMENTS[result]) {
            setWorkspace((prev) =>
              prev
                .filter((w) => w.uid !== d.uid && w.uid !== other.uid)
                .concat({
                  uid: nextUid(),
                  elementId: result,
                  x: (draggedItem.x + other.x) / 2,
                  y: (draggedItem.y + other.y) / 2,
                }),
            );
            setDiscovered((prev) => new Set([...prev, result]));
            if (!discoveredRef.current.has(result)) {
              setNewDiscovery(result);
              setTimeout(() => setNewDiscovery(null), 2200);
            }
          } else {
            setFailFlash([d.uid, other.uid]);
            setTimeout(() => setFailFlash(null), 400);
            setWorkspace((prev) =>
              prev.map((w) =>
                w.uid === d.uid ? { ...w, x: w.x + 60, y: w.y - 30 } : w,
              ),
            );
          }
          break;
        }
      }
      setDragging(null);
    };

    document.addEventListener("pointermove", onMove, { passive: false });
    document.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  // ---- reset ----
  const handleReset = useCallback(() => {
    setDiscovered(new Set(BASE_IDS));
    setWorkspace([]);
    setNewDiscovery(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  // ---- drag from shelf into workspace ----
  const handleShelfPointerDown = useCallback(
    (elementId: string, e: ReactPointerEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const uid = nextUid();
      const rawX = e.clientX - rect.left - 50;
      const rawY = e.clientY - rect.top - 20;
      const x = Math.max(0, Math.min(rect.width - 100, rawX));
      const y = Math.max(0, Math.min(rect.height - 40, rawY));
      setWorkspace((prev) => [...prev, { uid, elementId, x, y }]);
      setDragging({ uid, offsetX: 50, offsetY: 20 });
    },
    [],
  );

  // ---- drag within workspace ----
  const handleWSPointerDown = useCallback(
    (uid: string, e: ReactPointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      setDragging({
        uid,
        offsetX: e.clientX - r.left,
        offsetY: e.clientY - r.top,
      });
    },
    [],
  );

  // ---- remove from workspace ----
  const handleDoubleClick = useCallback((uid: string) => {
    setWorkspace((prev) => prev.filter((w) => w.uid !== uid));
  }, []);

  // ---- grouped shelf ----
  const shelfGroups: {
    label: string;
    category: ElementCategory;
    items: AlchemyElement[];
  }[] = [
    {
      label: "TECH",
      category: "tech",
      items: Object.values(ELEMENTS).filter(
        (e) => e.category === "tech" && discovered.has(e.id),
      ),
    },
    {
      label: "INDUSTRIES",
      category: "industry",
      items: Object.values(ELEMENTS).filter(
        (e) => e.category === "industry" && discovered.has(e.id),
      ),
    },
    {
      label: "COMBOS",
      category: "intermediate",
      items: Object.values(ELEMENTS).filter(
        (e) => e.category === "intermediate" && discovered.has(e.id),
      ),
    },
    {
      label: "PROJECTS",
      category: "final",
      items: Object.values(ELEMENTS).filter(
        (e) => e.category === "final" && discovered.has(e.id),
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* ---- Header: progress + reset ---- */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
            <Sparkles className="size-5 text-volt" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold">
              {discoveryCount} / {TOTAL_DISCOVERIES}
              <span className="ml-1 font-body text-xs font-normal text-muted-foreground">
                discovered
              </span>
            </p>
            <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-volt to-success transition-all duration-500"
                style={{
                  width: `${(discoveryCount / TOTAL_DISCOVERIES) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-code text-xs text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive"
        >
          <RotateCcw className="size-3" />
          Reset
        </button>
      </div>

      {/* ---- Discovery banner ---- */}
      {newDiscovery && ELEMENTS[newDiscovery] && (
        <div className="animate-fade-in-up rounded-lg border border-success/30 bg-success/10 p-3 text-center">
          <p className="font-display text-sm font-bold text-success">
            New Discovery!
          </p>
          <p className="font-code text-xs text-success/80">
            {ELEMENTS[newDiscovery].name}
            {ELEMENTS[newDiscovery].description
              ? ` \u2014 ${ELEMENTS[newDiscovery].description}`
              : ""}
          </p>
        </div>
      )}

      {discoveryCount === TOTAL_DISCOVERIES && (
        <div className="animate-glow-pulse rounded-lg border border-success/30 bg-success/10 p-4 text-center">
          <Trophy className="mx-auto size-8 text-success" />
          <p className="mt-2 font-display text-lg font-bold text-success">
            All Discoveries Complete!
          </p>
          <p className="font-code text-xs text-success/70">
            You found every combination. Now go build one at a hackathon.
          </p>
        </div>
      )}

      {/* ---- Element shelf ---- */}
      <div className="space-y-3 rounded-xl border border-border bg-surface/50 p-4">
        <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
          Drag elements into the workspace below to combine them
        </p>
        {shelfGroups.map((group) => {
          if (group.items.length === 0) return null;
          const s = CATEGORY_STYLE[group.category];
          return (
            <div key={group.label}>
              <p
                className={`mb-1.5 font-code text-[10px] font-semibold uppercase tracking-widest ${s.text}`}
              >
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((el) => {
                  const Icon = el.icon;
                  return (
                    <div
                      key={el.id}
                      onPointerDown={(e) =>
                        handleShelfPointerDown(el.id, e)
                      }
                      className={`flex cursor-grab touch-none select-none items-center gap-1.5 rounded-lg border ${s.border} ${s.bg} px-2.5 py-1.5 transition-all hover:scale-105 active:scale-95 active:cursor-grabbing ${
                        newDiscovery === el.id ? s.glow : ""
                      }`}
                      title={el.description}
                    >
                      <Icon className={`size-3.5 ${s.text}`} />
                      <span className={`font-code text-[11px] ${s.text}`}>
                        {el.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- Workspace canvas ---- */}
      <div
        ref={canvasRef}
        className="relative h-[340px] touch-none select-none overflow-hidden rounded-xl border border-border bg-background/50 md:h-[400px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.54 0.24 285 / 6%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {workspace.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
            <GripVertical className="size-8" />
            <p className="font-code text-xs">
              Drag elements here, then drop them on each other
            </p>
          </div>
        )}

        {workspace.map((item) => {
          const el = ELEMENTS[item.elementId];
          if (!el) return null;
          const s = CATEGORY_STYLE[el.category];
          const Icon = el.icon;
          const shaking =
            failFlash &&
            (failFlash[0] === item.uid || failFlash[1] === item.uid);
          return (
            <div
              key={item.uid}
              onPointerDown={(e) => handleWSPointerDown(item.uid, e)}
              onDoubleClick={() => handleDoubleClick(item.uid)}
              className={`absolute flex cursor-grab items-center gap-1.5 rounded-lg border ${s.border} ${s.bg} px-3 py-2 active:cursor-grabbing ${s.glow} ${
                dragging?.uid === item.uid ? "z-50 scale-110" : "z-10"
              } ${shaking ? "animate-[shake_0.3s_ease-in-out]" : ""}`}
              style={{
                left: item.x,
                top: item.y,
                transition:
                  dragging?.uid === item.uid
                    ? "none"
                    : "box-shadow 0.2s, left 0.15s, top 0.15s",
              }}
            >
              <Icon className={`size-4 ${s.text}`} />
              <span
                className={`whitespace-nowrap font-code text-xs ${s.text}`}
              >
                {el.name}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-center font-code text-[10px] text-muted-foreground/50">
        Double-click a workspace element to remove it
      </p>
    </div>
  );
}

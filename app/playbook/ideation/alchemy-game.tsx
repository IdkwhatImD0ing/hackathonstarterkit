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
  Radio,
  Podcast,
  MonitorPlay,
  ShieldAlert,
  Film,
  Scissors,
  Fingerprint,
  Coins,
  BadgeCheck,
  Mic,
  Mic2,
  FileHeart,
  Presentation,
  Target,
  TrendingUp,
  Play,
  HeartPulse,
  AudioLines,
  Volume2,
  BarChart3,
  Speaker,
  ClipboardCheck,
  Radar,
  ScanLine,
  SmilePlus,
  Flag,
  Database,
  ShieldCheck,
  Package,
  Ticket,
  Crown,
  Stethoscope,
  Footprints,
  Dices,
  Wand2,
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

  // new intermediates (tech + tech)
  live_stream: { id: "live_stream", name: "Live Streaming AI", icon: Radio, category: "intermediate", description: "AI-enhanced live video" },
  podcast_studio: { id: "podcast_studio", name: "AI Podcast Studio", icon: Podcast, category: "intermediate", description: "Record calls, auto-produce podcasts" },
  video_call_ai: { id: "video_call_ai", name: "Video Call AI", icon: MonitorPlay, category: "intermediate", description: "Smart video calls with vision" },
  verified_caller: { id: "verified_caller", name: "Verified Caller", icon: ShieldAlert, category: "intermediate", description: "Blockchain-verified caller ID" },
  music_video: { id: "music_video", name: "AI Music Video Maker", icon: Film, category: "intermediate", description: "Generate video + original music" },
  video_editor: { id: "video_editor", name: "AI Video Editor", icon: Scissors, category: "intermediate", description: "Smart editing with scene analysis" },
  content_provenance: { id: "content_provenance", name: "Content Provenance AI", icon: Fingerprint, category: "intermediate", description: "Prove video authenticity" },
  film_scorer: { id: "film_scorer", name: "AI Film Scorer", icon: Clapperboard, category: "intermediate", description: "Auto-compose matching soundtracks" },
  music_royalties: { id: "music_royalties", name: "AI Music Royalties", icon: Coins, category: "intermediate", description: "Generate music + split royalties" },
  nft_auth: { id: "nft_auth", name: "NFT Authenticator", icon: BadgeCheck, category: "intermediate", description: "Scan items, verify on-chain" },

  // new finals (phone_agent gaps)
  celebrity_voice: { id: "celebrity_voice", name: "Celebrity Voice Chat", icon: Mic, category: "final", description: "AI celebrity impersonation calls" },
  sports_commentator: { id: "sports_commentator", name: "AI Sports Commentator", icon: Mic2, category: "final", description: "Real-time AI play-by-play" },

  // new finals (video_gen gaps)
  health_explainer: { id: "health_explainer", name: "AI Health Explainer", icon: FileHeart, category: "final", description: "Auto-generate medical explainers" },
  lecture_creator: { id: "lecture_creator", name: "AI Lecture Creator", icon: Presentation, category: "final", description: "Notes to video lectures" },
  tactical_sim: { id: "tactical_sim", name: "Tactical Simulator", icon: Target, category: "final", description: "AI training scenarios" },
  market_report: { id: "market_report", name: "AI Market Analyst", icon: TrendingUp, category: "final", description: "Video portfolio reports" },
  highlight_reel: { id: "highlight_reel", name: "AI Highlights Reel", icon: Play, category: "final", description: "Auto-generate highlight montages" },

  // new finals (music_prod gaps)
  music_therapy: { id: "music_therapy", name: "Music Therapy AI", icon: HeartPulse, category: "final", description: "Personalized therapeutic music" },
  music_teacher: { id: "music_teacher", name: "AI Music Teacher", icon: AudioLines, category: "final", description: "Learn through generated exercises" },
  morale_booster: { id: "morale_booster", name: "Morale Booster AI", icon: Volume2, category: "final", description: "Motivational anthems on demand" },
  market_mood: { id: "market_mood", name: "Market Mood Music", icon: BarChart3, category: "final", description: "Stock market as a symphony" },
  stadium_dj: { id: "stadium_dj", name: "AI Stadium DJ", icon: Speaker, category: "final", description: "Game-aware crowd music" },

  // new finals (image_analyzer gaps)
  grading_ai: { id: "grading_ai", name: "AI Grading Assistant", icon: ClipboardCheck, category: "final", description: "Scan and grade handwritten work" },
  search_rescue: { id: "search_rescue", name: "Search & Rescue Vision", icon: Radar, category: "final", description: "Spot survivors in drone footage" },
  fraud_detector: { id: "fraud_detector", name: "AI Fraud Detector", icon: ScanLine, category: "final", description: "Detect document forgery" },
  meme_generator: { id: "meme_generator", name: "AI Meme Generator", icon: SmilePlus, category: "final", description: "Analyze images, generate memes" },
  ai_referee: { id: "ai_referee", name: "AI Referee", icon: Flag, category: "final", description: "Computer vision judges plays" },

  // new finals (smart_contract gaps)
  medical_records: { id: "medical_records", name: "Medical Records Chain", icon: Database, category: "final", description: "Blockchain-secured health data" },
  credential_verify: { id: "credential_verify", name: "Credential Verifier", icon: ShieldCheck, category: "final", description: "Verify degrees on-chain" },
  supply_chain: { id: "supply_chain", name: "Supply Chain Tracker", icon: Package, category: "final", description: "Blockchain defense logistics" },
  ticket_nft: { id: "ticket_nft", name: "Ticket NFT Platform", icon: Ticket, category: "final", description: "Anti-scalping blockchain tickets" },
  fantasy_chain: { id: "fantasy_chain", name: "Fantasy League Chain", icon: Crown, category: "final", description: "Decentralized fantasy sports" },

  // new finals (sports_analytics gaps)
  injury_predictor: { id: "injury_predictor", name: "Injury Predictor", icon: Stethoscope, category: "final", description: "Predict injury risk from movement" },
  tactical_movement: { id: "tactical_movement", name: "Tactical Movement AI", icon: Footprints, category: "final", description: "Analyze squad formations" },
  betting_ai: { id: "betting_ai", name: "Sports Betting AI", icon: Dices, category: "final", description: "AI-powered sports predictions" },
  fantasy_ai: { id: "fantasy_ai", name: "Fantasy Sports AI", icon: Wand2, category: "final", description: "AI manages your fantasy team" },
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

  // new tech + tech → intermediate
  { a: "twilio", b: "veo", result: "live_stream" },
  { a: "twilio", b: "suno", result: "podcast_studio" },
  { a: "twilio", b: "vision", result: "video_call_ai" },
  { a: "twilio", b: "blockchain", result: "verified_caller" },
  { a: "veo", b: "suno", result: "music_video" },
  { a: "veo", b: "vision", result: "video_editor" },
  { a: "veo", b: "blockchain", result: "content_provenance" },
  { a: "suno", b: "vision", result: "film_scorer" },
  { a: "suno", b: "blockchain", result: "music_royalties" },
  { a: "vision", b: "blockchain", result: "nft_auth" },

  // new intermediate + industry → final (phone_agent)
  { a: "phone_agent", b: "entertainment", result: "celebrity_voice" },
  { a: "phone_agent", b: "sports", result: "sports_commentator" },

  // new intermediate + industry → final (video_gen)
  { a: "video_gen", b: "health", result: "health_explainer" },
  { a: "video_gen", b: "education", result: "lecture_creator" },
  { a: "video_gen", b: "defense", result: "tactical_sim" },
  { a: "video_gen", b: "finance", result: "market_report" },
  { a: "video_gen", b: "sports", result: "highlight_reel" },

  // new intermediate + industry → final (music_prod)
  { a: "music_prod", b: "health", result: "music_therapy" },
  { a: "music_prod", b: "education", result: "music_teacher" },
  { a: "music_prod", b: "defense", result: "morale_booster" },
  { a: "music_prod", b: "finance", result: "market_mood" },
  { a: "music_prod", b: "sports", result: "stadium_dj" },

  // new intermediate + industry → final (image_analyzer)
  { a: "image_analyzer", b: "education", result: "grading_ai" },
  { a: "image_analyzer", b: "defense", result: "search_rescue" },
  { a: "image_analyzer", b: "finance", result: "fraud_detector" },
  { a: "image_analyzer", b: "entertainment", result: "meme_generator" },
  { a: "image_analyzer", b: "sports", result: "ai_referee" },

  // new intermediate + industry → final (smart_contract)
  { a: "smart_contract", b: "health", result: "medical_records" },
  { a: "smart_contract", b: "education", result: "credential_verify" },
  { a: "smart_contract", b: "defense", result: "supply_chain" },
  { a: "smart_contract", b: "entertainment", result: "ticket_nft" },
  { a: "smart_contract", b: "sports", result: "fantasy_chain" },

  // new intermediate + industry → final (sports_analytics)
  { a: "sports_analytics", b: "health", result: "injury_predictor" },
  { a: "sports_analytics", b: "defense", result: "tactical_movement" },
  { a: "sports_analytics", b: "finance", result: "betting_ai" },
  { a: "sports_analytics", b: "entertainment", result: "fantasy_ai" },

  // shortcut recipes (tech + industry → existing elements)
  { a: "veo", b: "entertainment", result: "video_gen" },
  { a: "suno", b: "entertainment", result: "music_prod" },
  { a: "blockchain", b: "finance", result: "smart_contract" },
  { a: "vision", b: "defense", result: "search_rescue" },
  { a: "twilio", b: "defense", result: "dispatch_ai" },
  { a: "veo", b: "sports", result: "highlight_reel" },
  { a: "suno", b: "health", result: "music_therapy" },
  { a: "blockchain", b: "entertainment", result: "ticket_nft" },
  { a: "blockchain", b: "sports", result: "fantasy_chain" },
  { a: "twilio", b: "health", result: "mental_health" },

  // alternate paths (intermediate + intermediate)
  { a: "phone_agent", b: "video_gen", result: "live_stream" },
  { a: "image_analyzer", b: "smart_contract", result: "nft_auth" },
  { a: "phone_agent", b: "smart_contract", result: "verified_caller" },
  { a: "video_gen", b: "music_prod", result: "music_video" },
  { a: "image_analyzer", b: "sports_analytics", result: "ai_referee" },
];

const BASE_IDS = Object.values(ELEMENTS)
  .filter((e) => e.category === "tech" || e.category === "industry")
  .map((e) => e.id);

const TOTAL_DISCOVERIES = Object.values(ELEMENTS).filter(
  (e) => e.category !== "tech" && e.category !== "industry",
).length;
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

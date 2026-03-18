"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Trophy,
  RotateCcw,
  Copy,
  Check,
  X,
  ImageDown,
  Swords,
  CircleDot,
} from "lucide-react";
import {
  SLOTS,
  TOOLS,
  ACCENT_STYLES,
  SLOT_COUNT,
  STORAGE_KEY,
  type SlotId,
  type GoBagTool,
  type AccentColor,
} from "@/lib/go-bag-data";

type Assignments = Partial<Record<SlotId, string>>;

function getToolById(id: string): GoBagTool | undefined {
  return TOOLS.find((t) => t.id === id);
}

function loadAssignments(): Assignments {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && "assignments" in parsed) {
        return (parsed as { assignments: Assignments }).assignments;
      }
      return parsed as Assignments;
    }
  } catch {
    /* ignore */
  }
  return {};
}

const EXPORT_COLORS: Record<AccentColor, { text: string; bg: string; border: string }> = {
  volt: { text: "#22f5e8", bg: "rgba(34,245,232,0.14)", border: "rgba(34,245,232,0.45)" },
  spark: { text: "#ffd54f", bg: "rgba(255,213,79,0.14)", border: "rgba(255,213,79,0.45)" },
  primary: { text: "#b388ff", bg: "rgba(179,136,255,0.14)", border: "rgba(179,136,255,0.45)" },
  success: { text: "#69f0ae", bg: "rgba(105,240,174,0.14)", border: "rgba(105,240,174,0.45)" },
};

// ---------------------------------------------------------------------------
// Canvas-based image export (no html-to-image dependency)
// ---------------------------------------------------------------------------

function drawShareCard(assignments: Assignments): string {
  const W = 2400;
  const H = 1260;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const s = 2;

  const filledCount = Object.values(assignments).filter(Boolean).length;
  const leftSlots = [SLOTS[0], SLOTS[1], SLOTS[4]];
  const rightSlots = [SLOTS[2], SLOTS[3], SLOTS[5]];

  // Background
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#1a0e2e");
  grad.addColorStop(0.5, "#0f0a1a");
  grad.addColorStop(1, "#0d1117");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Dot grid
  ctx.fillStyle = "rgba(155,109,255,0.05)";
  for (let dx = 0; dx < W; dx += 40) {
    for (let dy = 0; dy < H; dy += 40) {
      ctx.beginPath();
      ctx.arc(dx, dy, 1.2 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- Helper: draw a slot card ---
  function drawSlot(
    x: number,
    y: number,
    w: number,
    h: number,
    slot: (typeof SLOTS)[number],
  ) {
    const colors = EXPORT_COLORS[slot.accent];
    const toolId = assignments[slot.id];
    const tool = toolId ? getToolById(toolId) : null;
    const r = 14 * s;

    // Glow behind filled cards
    if (tool) {
      ctx.save();
      ctx.shadowColor = colors.border;
      ctx.shadowBlur = 24 * s;
      ctx.fillStyle = colors.bg;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
      ctx.restore();
    }

    // Card bg
    ctx.fillStyle = tool ? colors.bg : "rgba(255,255,255,0.02)";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();

    // Border
    ctx.strokeStyle = tool ? colors.border : "rgba(155,109,255,0.08)";
    ctx.lineWidth = 2 * s;
    if (!tool) ctx.setLineDash([6 * s, 5 * s]);
    else ctx.setLineDash([]);
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.stroke();
    ctx.setLineDash([]);

    // Category icon circle
    const iconR = 18 * s;
    const iconX = x + 18 * s + iconR;
    const iconY = y + h / 2;
    ctx.fillStyle = tool ? colors.bg : "rgba(255,255,255,0.03)";
    ctx.beginPath();
    ctx.arc(iconX, iconY, iconR, 0, Math.PI * 2);
    ctx.fill();

    // Category initial inside circle
    ctx.font = `bold ${14 * s}px monospace`;
    ctx.fillStyle = tool ? colors.text : "rgba(240,238,245,0.15)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(slot.label.charAt(0).toUpperCase(), iconX, iconY + 1 * s);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    // Text content
    const textX = x + 18 * s + iconR * 2 + 14 * s;

    // Category label
    ctx.font = `600 ${9 * s}px monospace`;
    ctx.fillStyle = tool ? colors.text : "rgba(240,238,245,0.25)";
    ctx.fillText(slot.label.toUpperCase(), textX, y + 28 * s);

    // Tool name or empty
    if (tool) {
      ctx.font = `600 ${14 * s}px monospace`;
      ctx.fillStyle = "#f0eef5";
      ctx.fillText(tool.name, textX, y + 50 * s);

      ctx.font = `${10 * s}px monospace`;
      ctx.fillStyle = "rgba(240,238,245,0.35)";
      ctx.fillText(tool.description, textX, y + 68 * s);
    } else {
      ctx.font = `${11 * s}px monospace`;
      ctx.fillStyle = "rgba(240,238,245,0.12)";
      ctx.fillText("Empty", textX, y + 46 * s);
    }
  }

  // --- Layout constants ---
  const pad = 40 * s;
  const slotW = 370 * s;
  const slotH = 82 * s;
  const slotGap = 14 * s;
  const centerW = 220 * s;
  const totalSlotsH = slotH * 3 + slotGap * 2;

  // Vertical centering
  const headerH = 70 * s;
  const footerH = 40 * s;
  const contentH = H - headerH - footerH - pad * 2;
  const slotsTopY = headerH + pad + (contentH - totalSlotsH) / 2;

  // Horizontal: left slots | gap | center card | gap | right slots
  const innerGap = 20 * s;
  const totalW = slotW + innerGap + centerW + innerGap + slotW;
  const startX = (W - totalW) / 2;

  // --- Header ---
  ctx.font = `bold ${24 * s}px monospace`;
  ctx.fillStyle = "#f0eef5";
  ctx.textAlign = "center";
  ctx.fillText("MY HACKATHON GO BAG", W / 2, pad + 30 * s);
  ctx.textAlign = "left";

  ctx.font = `${11 * s}px monospace`;
  ctx.fillStyle = "rgba(240,238,245,0.35)";
  ctx.textAlign = "center";
  ctx.fillText("Pre-validated tools I bring to every hackathon", W / 2, pad + 52 * s);
  ctx.textAlign = "left";

  // --- Left column ---
  leftSlots.forEach((slot, i) => {
    const x = startX;
    const y = slotsTopY + i * (slotH + slotGap);
    drawSlot(x, y, slotW, slotH, slot);
  });

  // --- Center character card ---
  const centerX = startX + slotW + innerGap;
  const centerY = slotsTopY;
  const centerH = totalSlotsH;
  const cR = 16 * s;

  // Card bg
  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.strokeStyle = "rgba(155,109,255,0.12)";
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.roundRect(centerX, centerY, centerW, centerH, cR);
  ctx.fill();
  ctx.stroke();

  // Swords icon (drawn as text)
  const cMidX = centerX + centerW / 2;
  ctx.font = `bold ${32 * s}px monospace`;
  ctx.fillStyle = filledCount === SLOT_COUNT ? "#4ade80" : "rgba(155,109,255,0.5)";
  ctx.textAlign = "center";
  ctx.fillText("⚔", cMidX, centerY + 60 * s);

  // LOADOUT title
  ctx.font = `bold ${14 * s}px monospace`;
  ctx.fillStyle = "#f0eef5";
  ctx.fillText("LOADOUT", cMidX, centerY + 90 * s);

  // Progress ring
  const ringY = centerY + 140 * s;
  const ringR = 32 * s;
  const ringW = 5 * s;

  // Background ring
  ctx.strokeStyle = "rgba(155,109,255,0.12)";
  ctx.lineWidth = ringW;
  ctx.beginPath();
  ctx.arc(cMidX, ringY, ringR, 0, Math.PI * 2);
  ctx.stroke();

  // Progress arc
  const progress = filledCount / SLOT_COUNT;
  if (progress > 0) {
    ctx.strokeStyle = filledCount === SLOT_COUNT ? "#4ade80" : "#9b6dff";
    ctx.lineWidth = ringW;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cMidX, ringY, ringR, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.stroke();
    ctx.lineCap = "butt";
  }

  // Percentage text inside ring
  ctx.font = `bold ${13 * s}px monospace`;
  ctx.fillStyle = "#f0eef5";
  ctx.textBaseline = "middle";
  ctx.fillText(`${Math.round(progress * 100)}%`, cMidX, ringY);
  ctx.textBaseline = "alphabetic";

  // Equipped count
  ctx.font = `${10 * s}px monospace`;
  ctx.fillStyle = "rgba(240,238,245,0.35)";
  ctx.fillText(`${filledCount} / ${SLOT_COUNT} equipped`, cMidX, ringY + ringR + 20 * s);

  ctx.textAlign = "left";

  // --- Right column ---
  rightSlots.forEach((slot, i) => {
    const x = startX + slotW + innerGap + centerW + innerGap;
    const y = slotsTopY + i * (slotH + slotGap);
    drawSlot(x, y, slotW, slotH, slot);
  });

  // --- Footer ---
  ctx.font = `${10 * s}px monospace`;
  ctx.fillStyle = "rgba(240,238,245,0.25)";
  ctx.fillText("thehackathonplaybook.dev", pad, H - pad);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(155,109,255,0.35)";
  ctx.fillText("Hackathon Playbook", W - pad, H - pad);
  ctx.textAlign = "left";

  return canvas.toDataURL("image/png");
}

// ---------------------------------------------------------------------------
// Equipment Slot
// ---------------------------------------------------------------------------

function EquipmentSlot({
  slotId,
  tool,
  onClear,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragOver,
  justEquipped,
}: {
  slotId: SlotId;
  tool: GoBagTool | undefined;
  onClear: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  isDragOver: boolean;
  justEquipped: boolean;
}) {
  const slot = SLOTS.find((s) => s.id === slotId)!;
  const s = ACCENT_STYLES[slot.accent];
  const SlotIcon = slot.icon;
  const filled = !!tool;

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`group relative flex items-center gap-3 rounded-xl border-2 px-3 py-3 transition-all duration-300 ${
        justEquipped ? "animate-[scale-bounce_0.3s_ease-out]" : ""
      } ${
        filled
          ? `${s.borderSolid} ${s.bgFill} ${s.glow}`
          : isDragOver
            ? `${s.borderSolid} ${s.bg} scale-[1.02]`
            : `border-dashed border-border/30 bg-card/20 hover:border-border/50`
      }`}
    >
      {/* Category icon */}
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
          filled ? s.bg : "bg-muted/30"
        }`}
      >
        <SlotIcon
          className={`size-4 ${filled ? s.text : "text-muted-foreground/40"}`}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`font-code text-[10px] font-semibold uppercase tracking-widest ${
            filled ? s.text : "text-muted-foreground/50"
          }`}
        >
          {slot.label}
        </p>
        {filled && tool ? (
          <div className="flex items-center gap-1.5">
            {(() => {
              const ToolIcon = tool.icon;
              return <ToolIcon className={`size-3 ${s.text} opacity-70`} />;
            })()}
            <p className="truncate font-code text-xs text-foreground/80">
              {tool.name}
            </p>
          </div>
        ) : (
          <p className="font-body text-xs text-muted-foreground/30">
            Click a tool below to equip
          </p>
        )}
      </div>

      {/* Clear button or empty indicator */}
      {filled ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground/40 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        >
          <X className="size-3" />
        </button>
      ) : (
        <CircleDot className="size-3 shrink-0 animate-pulse text-muted-foreground/20" />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tool Chip
// ---------------------------------------------------------------------------

function ToolChip({
  tool,
  isAssigned,
  onClick,
}: {
  tool: GoBagTool;
  isAssigned: boolean;
  onClick: () => void;
}) {
  const slot = SLOTS.find((s) => s.id === tool.slotId);
  const accent = slot?.accent ?? "primary";
  const s = ACCENT_STYLES[accent];
  const Icon = tool.icon;

  return (
    <div
      draggable={!isAssigned}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", tool.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={isAssigned ? undefined : onClick}
      className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 transition-all ${
        isAssigned
          ? "cursor-default border-border/10 bg-muted/10 opacity-30"
          : `${s.border} ${s.bg} cursor-pointer hover:scale-105 hover:${s.borderSolid} active:scale-95`
      }`}
      title={tool.description}
    >
      <Icon
        className={`size-3.5 ${isAssigned ? "text-muted-foreground/30" : s.text}`}
      />
      <span
        className={`whitespace-nowrap font-code text-[11px] ${isAssigned ? "text-muted-foreground/30" : s.text}`}
      >
        {tool.name}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function GoBagAssembler() {
  const [assignments, setAssignments] = useState<Assignments>({});
  const [hydrated, setHydrated] = useState(false);
  const [dragOverSlot, setDragOverSlot] = useState<SlotId | null>(null);
  const [justEquipped, setJustEquipped] = useState<SlotId | null>(null);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Load from localStorage after hydration to avoid SSR mismatch
  useEffect(() => {
    const loaded = loadAssignments();
    if (Object.keys(loaded).length > 0) setAssignments(loaded);
    setHydrated(true);
  }, []);

  const filledCount = Object.values(assignments).filter(Boolean).length;
  const isComplete = filledCount === SLOT_COUNT;

  const assignedToolIds = useMemo(
    () => new Set(Object.values(assignments).filter((v): v is string => !!v)),
    [assignments],
  );

  // Persist to localStorage (skip the initial empty write before hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
    } catch {
      /* ignore */
    }
  }, [assignments, hydrated]);

  const equipTool = useCallback(
    (toolId: string) => {
      const tool = getToolById(toolId);
      if (!tool || assignedToolIds.has(toolId)) return;
      setAssignments((prev) => ({ ...prev, [tool.slotId]: toolId }));
      setJustEquipped(tool.slotId);
      setTimeout(() => setJustEquipped(null), 500);
    },
    [assignedToolIds],
  );

  const clearSlot = useCallback((slotId: SlotId) => {
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  }, []);

  const handleDrop = useCallback(
    (slotId: SlotId, e: React.DragEvent) => {
      e.preventDefault();
      setDragOverSlot(null);
      const toolId = e.dataTransfer.getData("text/plain");
      const tool = toolId ? getToolById(toolId) : null;
      if (tool && tool.slotId === slotId) {
        equipTool(toolId);
      }
    },
    [equipTool],
  );

  const handleReset = useCallback(() => {
    setAssignments({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const handleCopy = useCallback(async () => {
    const lines = ["My Hackathon Go Bag", "═".repeat(28)];
    for (const slot of SLOTS) {
      const toolId = assignments[slot.id];
      const tool = toolId ? getToolById(toolId) : null;
      lines.push(
        `${slot.label.padEnd(18)} ${tool ? `→ ${tool.name}` : "  (empty)"}`,
      );
    }
    lines.push("", "thehackathonplaybook.dev");
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [assignments]);

  const handleExportImage = useCallback(() => {
    setExporting(true);
    try {
      const dataUrl = drawShareCard(assignments);
      const link = document.createElement("a");
      link.download = "my-hackathon-go-bag.png";
      link.href = dataUrl;
      link.click();
    } catch {
      /* ignore */
    } finally {
      setExporting(false);
    }
  }, [assignments]);

  // Group tools by slot for the inventory
  const toolGroups = SLOTS.map((slot) => ({
    slot,
    tools: TOOLS.filter((t) => t.slotId === slot.id),
  }));

  // Split slots into left column and right column for RPG layout
  const leftSlots = [SLOTS[0], SLOTS[1], SLOTS[4]]; // Auth, UI, Deployment
  const rightSlots = [SLOTS[2], SLOTS[3], SLOTS[5]]; // AI, Database, Realtime

  return (
    <div className="space-y-5">
      {/* RPG Equipment Layout */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.54 0.24 285 / 5%) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundColor: "oklch(0.13 0.03 285 / 80%)",
        }}
      >
        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:p-6">
          {/* Left column: 3 slots */}
          <div className="flex flex-col gap-3 md:order-1">
            {leftSlots.map((slot) => (
              <EquipmentSlot
                key={slot.id}
                slotId={slot.id}
                tool={
                  assignments[slot.id]
                    ? getToolById(assignments[slot.id]!)
                    : undefined
                }
                onClear={() => clearSlot(slot.id)}
                isDragOver={dragOverSlot === slot.id}
                justEquipped={justEquipped === slot.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  const toolId = e.dataTransfer.types.includes("text/plain")
                    ? "pending"
                    : null;
                  if (toolId) setDragOverSlot(slot.id);
                }}
                onDragLeave={() => setDragOverSlot(null)}
                onDrop={(e) => handleDrop(slot.id, e)}
              />
            ))}
          </div>

          {/* Center: Character Card */}
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border/30 bg-card/30 px-6 py-5 md:order-2 md:w-52">
            {/* Avatar area */}
            <div className="relative">
              <div
                className={`flex size-16 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                  isComplete
                    ? "animate-glow-pulse border-success/50 bg-success/10"
                    : "border-primary/30 bg-primary/5"
                }`}
              >
                <Swords
                  className={`size-7 ${isComplete ? "text-success" : "text-primary/60"}`}
                />
              </div>
              {isComplete && (
                <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-success">
                  <Check className="size-3 text-success-foreground" />
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="font-display text-sm font-bold tracking-tight">
                LOADOUT
              </p>
              <p className="font-code text-[10px] text-muted-foreground">
                {filledCount} / {SLOT_COUNT} equipped
              </p>
            </div>

            {/* Progress ring */}
            <div className="relative flex size-14 items-center justify-center">
              <svg viewBox="0 0 36 36" className="size-14 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="oklch(0.22 0.05 285)"
                  strokeWidth="2.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke={isComplete ? "oklch(0.72 0.19 155)" : "oklch(0.54 0.24 285)"}
                  strokeWidth="2.5"
                  strokeDasharray={`${(filledCount / SLOT_COUNT) * 97.4} 97.4`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute font-display text-xs font-bold">
                {Math.round((filledCount / SLOT_COUNT) * 100)}%
              </span>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-2">
              {filledCount > 0 && (
                <>
                  <button
                    onClick={handleExportImage}
                    disabled={exporting}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-volt/30 bg-volt/5 px-3 py-1.5 font-code text-[10px] text-volt transition-colors hover:bg-volt/10 disabled:opacity-50"
                  >
                    <ImageDown className="size-3" />
                    {exporting ? "..." : "Share"}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-code text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="size-3 text-success" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </>
              )}
              <button
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-code text-[10px] text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive"
              >
                <RotateCcw className="size-3" />
                Reset
              </button>
            </div>
          </div>

          {/* Right column: 3 slots */}
          <div className="flex flex-col gap-3 md:order-3">
            {rightSlots.map((slot) => (
              <EquipmentSlot
                key={slot.id}
                slotId={slot.id}
                tool={
                  assignments[slot.id]
                    ? getToolById(assignments[slot.id]!)
                    : undefined
                }
                onClear={() => clearSlot(slot.id)}
                isDragOver={dragOverSlot === slot.id}
                justEquipped={justEquipped === slot.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  const toolId = e.dataTransfer.types.includes("text/plain")
                    ? "pending"
                    : null;
                  if (toolId) setDragOverSlot(slot.id);
                }}
                onDragLeave={() => setDragOverSlot(null)}
                onDrop={(e) => handleDrop(slot.id, e)}
              />
            ))}
          </div>
        </div>

        {/* Loadout Complete overlay */}
        {isComplete && (
          <div className="animate-fade-in-up border-t border-success/20 bg-success/5 px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="size-4 text-success" />
              <p className="font-display text-sm font-bold text-success">
                Loadout Complete
              </p>
            </div>
            <p className="mt-0.5 font-code text-[10px] text-success/60">
              Your go bag is packed. Share it or keep it in a private repo.
            </p>
          </div>
        )}
      </div>

      {/* Tool Inventory */}
      <div className="space-y-3 rounded-xl border border-border bg-surface/50 p-4">
        <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
          Inventory — click to equip, or drag onto a slot
        </p>
        {toolGroups.map(({ slot, tools }) => {
          const st = ACCENT_STYLES[slot.accent];
          return (
            <div key={slot.id}>
              <p
                className={`mb-1.5 font-code text-[10px] font-semibold uppercase tracking-widest ${st.text}`}
              >
                {slot.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <ToolChip
                    key={tool.id}
                    tool={tool}
                    isAssigned={assignedToolIds.has(tool.id)}
                    onClick={() => equipTool(tool.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

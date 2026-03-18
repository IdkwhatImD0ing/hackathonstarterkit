"use client";

import { useState, useCallback, useMemo } from "react";
import {
  RotateCcw,
  Lightbulb,
  Rocket,
  Hammer,
  Sparkles,
  Mic,
  Send,
  AlertTriangle,
  Moon,
  Minus,
  Plus,
  Trophy,
  Zap,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Phase data
// ---------------------------------------------------------------------------

type PhaseId =
  | "ideation"
  | "core"
  | "build"
  | "polish"
  | "demo"
  | "submit";

interface Phase {
  id: PhaseId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  defaultHours: number;
  minHours: number;
  maxHours: number;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  barColor: string;
  description: string;
}

const PHASES: Phase[] = [
  {
    id: "ideation",
    label: "Ideation & Architecture",
    shortLabel: "Ideation",
    icon: Lightbulb,
    defaultHours: 0,
    minHours: 0,
    maxHours: 6,
    color: "volt",
    bgClass: "bg-volt/10",
    textClass: "text-volt",
    borderClass: "border-volt/30",
    barColor: "oklch(0.78 0.15 195)",
    description: "Finalize idea, assign roles, sketch architecture, deploy boilerplate.",
  },
  {
    id: "core",
    label: "Core Pipeline",
    shortLabel: "Core",
    icon: Rocket,
    defaultHours: 0,
    minHours: 0,
    maxHours: 6,
    color: "spark",
    bgClass: "bg-spark/10",
    textClass: "text-spark",
    borderClass: "border-spark/30",
    barColor: "oklch(0.78 0.16 85)",
    description: "End-to-end flow working. Ugly is fine. Prove the concept.",
  },
  {
    id: "build",
    label: "Build Sprint",
    shortLabel: "Build",
    icon: Hammer,
    defaultHours: 0,
    minHours: 0,
    maxHours: 20,
    color: "primary",
    bgClass: "bg-primary/10",
    textClass: "text-primary",
    borderClass: "border-primary/30",
    barColor: "oklch(0.54 0.24 285)",
    description: "Heads-down feature work in timeboxed blocks. Cut what takes too long.",
  },
  {
    id: "polish",
    label: "Integration & Polish",
    shortLabel: "Polish",
    icon: Sparkles,
    defaultHours: 0,
    minHours: 0,
    maxHours: 8,
    color: "success",
    bgClass: "bg-success/10",
    textClass: "text-success",
    borderClass: "border-success/30",
    barColor: "oklch(0.72 0.19 155)",
    description: "Connect pieces, fix critical bugs, polish the happy path UI.",
  },
  {
    id: "demo",
    label: "Demo Prep",
    shortLabel: "Demo",
    icon: Mic,
    defaultHours: 0,
    minHours: 0,
    maxHours: 6,
    color: "rose",
    bgClass: "bg-pink-500/10",
    textClass: "text-pink-400",
    borderClass: "border-pink-500/30",
    barColor: "oklch(0.65 0.2 350)",
    description: "Record demo video, build pitch deck, prep Q&A slides.",
  },
  {
    id: "submit",
    label: "Rehearse & Submit",
    shortLabel: "Submit",
    icon: Send,
    defaultHours: 0,
    minHours: 0,
    maxHours: 4,
    color: "amber",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/30",
    barColor: "oklch(0.75 0.16 55)",
    description: "Practice pitch 3+ times, submit all deliverables early.",
  },
];

const TOTAL_HOURS = 24;

const DEFAULT_HOURS: Record<PhaseId, number> = Object.fromEntries(
  PHASES.map((p) => [p.id, p.defaultHours]),
) as Record<PhaseId, number>;

// ---------------------------------------------------------------------------
// Feedback engine
// ---------------------------------------------------------------------------

interface Feedback {
  type: "danger" | "warning" | "tip" | "success";
  icon: LucideIcon;
  message: string;
}

function generateFeedback(hours: Record<PhaseId, number>): Feedback[] {
  const total = Object.values(hours).reduce((a, b) => a + b, 0);
  const results: Feedback[] = [];

  if (total > TOTAL_HOURS) {
    results.push({
      type: "danger",
      icon: AlertTriangle,
      message: `You've allocated ${total}h but only have 24h. Cut ${total - TOTAL_HOURS}h of scope or you won't finish.`,
    });
  }

  if (hours.demo > 0) {
    results.push({
      type: "warning",
      icon: Mic,
      message: `You're burning ${hours.demo}h of build time on demo prep. The optimal answer is 0: submit your code first, then prep your pitch and record your demo in the gap between submission and judging. Don't waste build hours on something you can do after code freeze.`,
    });
  }

  if (hours.submit > 0) {
    results.push({
      type: "warning",
      icon: Send,
      message: `You're spending ${hours.submit}h on rehearsal during the build window. The optimal answer is 0: submit early, then use the time between submission and demos to rehearse your pitch. Every hour here is an hour stolen from building.`,
    });
  }

  if (hours.ideation > 0) {
    results.push({
      type: "warning",
      icon: Lightbulb,
      message: `You're spending ${hours.ideation}h on ideation during the hackathon. The optimal answer is 0: finalize your idea, assign roles, and sketch architecture async before the event starts. When the clock starts, you should already know what you're building.`,
    });
  }

  if (hours.ideation === 0 && hours.demo === 0 && hours.submit === 0 && total > 0) {
    results.push({
      type: "success",
      icon: Trophy,
      message:
        "Smart. Ideation happens before the hackathon, demo prep and pitch rehearsal happen after code freeze. Every hackathon hour goes to building.",
    });
  }

  if (hours.core < 2 && hours.core > 0) {
    results.push({
      type: "tip",
      icon: Rocket,
      message:
        "Consider at least 2h for the core pipeline. Proving the concept works end-to-end before investing more time saves you from hour-18 disasters.",
    });
  }

  if (hours.build > 16) {
    results.push({
      type: "warning",
      icon: Moon,
      message: `${hours.build}h of building with no breaks? Exhaustion kills productivity faster than lost hours. Sleep in shifts.`,
    });
  }

  if (hours.polish < 2 && hours.polish > 0) {
    results.push({
      type: "tip",
      icon: Sparkles,
      message:
        "Less than 2h for polish means judges will see rough edges. First impressions are everything.",
    });
  }

  const buildPhaseHours = hours.core + hours.build + hours.polish;
  if (total <= TOTAL_HOURS && total > 0 && hours.ideation === 0 && hours.demo === 0 && hours.submit === 0 && buildPhaseHours >= 8) {
    results.push({
      type: "success",
      icon: Zap,
      message:
        "Solid allocation. Ideation was done before the event, all hackathon hours go to building, and demo/pitch prep happens after submission. Maximum output.",
    });
  }

  if (total < TOTAL_HOURS && total > 0) {
    const slack = TOTAL_HOURS - total;
    results.push({
      type: "tip",
      icon: Moon,
      message: `${slack}h unallocated. Use it for sleep, breaks, or buffer. Planned rest beats accidental burnout.`,
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// Phase Row
// ---------------------------------------------------------------------------

function PhaseRow({
  phase,
  hours,
  onChange,
  barPercent,
}: {
  phase: Phase;
  hours: number;
  onChange: (delta: number) => void;
  barPercent: number;
}) {
  const Icon = phase.icon;

  return (
    <div className="group space-y-2">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${phase.bgClass}`}
        >
          <Icon className={`size-4 ${phase.textClass}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className={`font-display text-sm font-semibold ${phase.textClass}`}>
              <span className="hidden sm:inline">{phase.label}</span>
              <span className="sm:hidden">{phase.shortLabel}</span>
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onChange(-1)}
                disabled={hours <= phase.minHours}
                className="flex size-6 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground disabled:opacity-20 disabled:hover:border-border/50 disabled:hover:text-muted-foreground"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-10 text-center font-code text-sm font-bold tabular-nums">
                {hours}h
              </span>
              <button
                onClick={() => onChange(1)}
                disabled={hours >= phase.maxHours}
                className="flex size-6 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground disabled:opacity-20 disabled:hover:border-border/50 disabled:hover:text-muted-foreground"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bar */}
      <div className="ml-11 h-3 overflow-hidden rounded-full bg-border/20">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${barPercent}%`,
            background: `linear-gradient(90deg, ${phase.barColor}, ${phase.barColor}cc)`,
            boxShadow: `0 0 12px ${phase.barColor}40`,
          }}
        />
      </div>

      <p className="ml-11 font-body text-xs text-muted-foreground/60">
        {phase.description}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Visual timeline bar
// ---------------------------------------------------------------------------

function TimelineBar({ hours }: { hours: Record<PhaseId, number> }) {
  const total = Object.values(hours).reduce((a, b) => a + b, 0);
  const overBudget = total > TOTAL_HOURS;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
          24-Hour Timeline
        </p>
        <p
          className={`font-code text-xs font-bold tabular-nums ${
            overBudget ? "text-destructive" : total === TOTAL_HOURS ? "text-success" : "text-muted-foreground"
          }`}
        >
          {total}h / {TOTAL_HOURS}h
        </p>
      </div>

      <div className="relative h-10 overflow-hidden rounded-xl border border-border/30 bg-border/10">
        <div className="flex h-full">
          {PHASES.map((phase) => {
            const pct = (hours[phase.id] / Math.max(total, TOTAL_HOURS)) * 100;
            return (
              <div
                key={phase.id}
                className="relative h-full overflow-hidden transition-all duration-500 ease-out first:rounded-l-[10px] last:rounded-r-[10px]"
                style={{
                  width: `${pct}%`,
                  background: phase.barColor,
                  opacity: overBudget ? 0.6 : 0.85,
                }}
                title={`${phase.label}: ${hours[phase.id]}h`}
              >
                {pct > 6 && (
                  <span className="absolute inset-0 flex items-center justify-center font-code text-[10px] font-bold text-background/80">
                    {hours[phase.id]}h
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {overBudget && (
          <div
            className="absolute top-0 h-full w-px bg-destructive"
            style={{ left: `${(TOTAL_HOURS / total) * 100}%` }}
          >
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2">
              <div className="size-1.5 rounded-full bg-destructive" />
            </div>
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2">
              <div className="size-1.5 rounded-full bg-destructive" />
            </div>
          </div>
        )}
      </div>

      {/* Hour markers */}
      <div className="flex justify-between px-0.5">
        {[0, 4, 8, 12, 16, 20, 24].map((h) => (
          <span
            key={h}
            className="font-code text-[9px] tabular-nums text-muted-foreground/40"
          >
            {h}h
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feedback panel
// ---------------------------------------------------------------------------

function FeedbackPanel({ feedback }: { feedback: Feedback[] }) {
  if (feedback.length === 0) return null;

  const typeStyles = {
    danger: {
      border: "border-destructive/30",
      bg: "bg-destructive/5",
      icon: "text-destructive",
      text: "text-destructive/80",
    },
    warning: {
      border: "border-spark/20",
      bg: "bg-spark/5",
      icon: "text-spark",
      text: "text-spark/80",
    },
    tip: {
      border: "border-primary/20",
      bg: "bg-primary/5",
      icon: "text-primary",
      text: "text-primary/80",
    },
    success: {
      border: "border-success/20",
      bg: "bg-success/5",
      icon: "text-success",
      text: "text-success/80",
    },
  };

  return (
    <div className="space-y-2">
      <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
        Coach Feedback
      </p>
      {feedback.map((fb, i) => {
        const s = typeStyles[fb.type];
        const FbIcon = fb.icon;
        return (
          <div
            key={i}
            className={`flex items-start gap-2.5 rounded-lg border ${s.border} ${s.bg} p-3 transition-all`}
          >
            <FbIcon className={`mt-0.5 size-4 shrink-0 ${s.icon}`} />
            <p className={`font-code text-xs ${s.text}`}>{fb.message}</p>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function TimelineSimulator() {
  const [hours, setHours] = useState<Record<PhaseId, number>>(DEFAULT_HOURS);
  const [submitted, setSubmitted] = useState(false);

  const total = useMemo(
    () => Object.values(hours).reduce((a, b) => a + b, 0),
    [hours],
  );

  const feedback = useMemo(() => generateFeedback(hours), [hours]);

  const handleChange = useCallback((phaseId: PhaseId, delta: number) => {
    setHours((prev) => {
      const phase = PHASES.find((p) => p.id === phaseId)!;
      const next = Math.max(phase.minHours, Math.min(phase.maxHours, prev[phaseId] + delta));
      return { ...prev, [phaseId]: next };
    });
    setSubmitted(false);
  }, []);

  const handleReset = useCallback(() => {
    setHours(DEFAULT_HOURS);
    setSubmitted(false);
  }, []);

  const isDefault = useMemo(
    () => PHASES.every((p) => hours[p.id] === p.defaultHours),
    [hours],
  );

  const overBudget = total > TOTAL_HOURS;

  return (
    <div className="space-y-5">
      {/* Main panel */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.54 0.24 285 / 4%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundColor: "oklch(0.13 0.03 285 / 80%)",
        }}
      >
        <div className="space-y-6 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-volt/10">
                <Zap className="size-4 text-volt" />
              </div>
              <div>
                <p className="font-display text-sm font-bold tracking-tight">
                  Time Allocator
                </p>
                <p className="font-code text-[10px] text-muted-foreground">
                  Distribute 24 hours across phases
                </p>
              </div>
            </div>
            {!isDefault && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-code text-[10px] text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive"
              >
                <RotateCcw className="size-3" />
                Reset
              </button>
            )}
          </div>

          {/* Visual timeline */}
          <TimelineBar hours={hours} />

          {/* Phase controls */}
          <div className="space-y-5">
            {PHASES.map((phase) => (
              <PhaseRow
                key={phase.id}
                phase={phase}
                hours={hours[phase.id]}
                onChange={(delta) => handleChange(phase.id, delta)}
                barPercent={(hours[phase.id] / phase.maxHours) * 100}
              />
            ))}
          </div>

          {/* Budget indicator */}
          <div
            className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
              overBudget
                ? "border-destructive/30 bg-destructive/5"
                : total === TOTAL_HOURS
                  ? "border-success/30 bg-success/5"
                  : "border-border/30 bg-card/20"
            }`}
          >
            <div className="flex items-center gap-2">
              {overBudget ? (
                <AlertTriangle className="size-4 text-destructive" />
              ) : total === TOTAL_HOURS ? (
                <Trophy className="size-4 text-success" />
              ) : (
                <Moon className="size-4 text-muted-foreground" />
              )}
              <p
                className={`font-display text-sm font-semibold ${
                  overBudget
                    ? "text-destructive"
                    : total === TOTAL_HOURS
                      ? "text-success"
                      : "text-muted-foreground"
                }`}
              >
                {overBudget
                  ? `${total - TOTAL_HOURS}h over budget`
                  : total === TOTAL_HOURS
                    ? "Perfectly allocated"
                    : `${TOTAL_HOURS - total}h unallocated`}
              </p>
            </div>
            <p
              className={`font-code text-lg font-bold tabular-nums ${
                overBudget
                  ? "text-destructive"
                  : total === TOTAL_HOURS
                    ? "text-success"
                    : "text-foreground"
              }`}
            >
              {total}
              <span className="text-xs text-muted-foreground">/{TOTAL_HOURS}h</span>
            </p>
          </div>

          {/* Check My Plan button */}
          {!submitted && (
            <button
              onClick={() => setSubmitted(true)}
              disabled={total === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-volt px-4 py-3 font-display text-sm font-semibold text-volt-foreground transition-all hover:bg-volt/90 active:scale-[0.98] disabled:opacity-30 disabled:hover:bg-volt"
            >
              <CheckCircle2 className="size-4" />
              Check My Plan
            </button>
          )}
        </div>
      </div>

      {/* Feedback (only after submit) */}
      {submitted && <FeedbackPanel feedback={feedback} />}
    </div>
  );
}

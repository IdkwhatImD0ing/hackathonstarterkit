"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  Check,
  ArrowRight,
  Copy,
  CheckCheck,
  Quote,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import type { ContentBlock } from "@/lib/blog";
import { cn } from "@/lib/utils";

const CALLOUT_CONFIG = {
  tip: {
    icon: Lightbulb,
    border: "border-spark/30",
    bg: "bg-spark/5",
    iconColor: "text-spark",
    titleColor: "text-spark",
    label: "Pro Tip",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-destructive/30",
    bg: "bg-destructive/5",
    iconColor: "text-destructive",
    titleColor: "text-destructive",
    label: "Watch Out",
  },
  info: {
    icon: Info,
    border: "border-primary/30",
    bg: "bg-primary/5",
    iconColor: "text-primary",
    titleColor: "text-primary",
    label: "Note",
  },
  success: {
    icon: CheckCircle2,
    border: "border-success/30",
    bg: "bg-success/5",
    iconColor: "text-success",
    titleColor: "text-success",
    label: "Key Takeaway",
  },
} as const;

function BlogCallout({
  variant,
  title,
  text,
}: Extract<ContentBlock, { type: "callout" }>) {
  const config = CALLOUT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-5",
        config.border,
        config.bg,
      )}
    >
      <div className="flex gap-3.5">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            config.bg,
          )}
        >
          <Icon className={cn("size-4", config.iconColor)} />
        </div>
        <div className="space-y-1.5 pt-0.5">
          <p className={cn("font-display text-sm font-bold", config.titleColor)}>
            {title ?? config.label}
          </p>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function BlogStatRow({
  stats,
}: Extract<ContentBlock, { type: "stat-row" }>) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass group relative overflow-hidden rounded-xl border border-primary/10 p-4 text-center transition-all hover:border-volt/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <p className="relative font-display text-2xl font-extrabold tracking-tight text-volt sm:text-3xl">
            {stat.value}
          </p>
          <p className="relative mt-1 font-code text-[10px] uppercase tracking-wider text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function BlogStepList({
  steps,
}: Extract<ContentBlock, { type: "step-list" }>) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={step.title} className="group relative flex gap-4 pb-6 last:pb-0">
          {i < steps.length - 1 && (
            <div className="absolute left-[15px] top-9 h-[calc(100%-24px)] w-px bg-gradient-to-b from-primary/30 to-transparent" />
          )}
          <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-display text-xs font-bold text-primary transition-colors group-hover:border-volt/50 group-hover:bg-volt/10 group-hover:text-volt">
            {i + 1}
          </div>
          <div className="space-y-1 pt-0.5">
            <p className="font-display text-sm font-bold text-foreground">
              {step.title}
            </p>
            <p className="font-body text-sm leading-relaxed text-foreground/70">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlogQuote({
  text,
  attribution,
}: Extract<ContentBlock, { type: "quote" }>) {
  return (
    <blockquote className="relative overflow-hidden rounded-xl border border-primary/15 bg-primary/5 p-6">
      <Quote className="absolute -right-2 -top-2 size-16 text-primary/10" />
      <div className="relative space-y-3">
        <p className="font-body text-base italic leading-relaxed text-foreground/90">
          &ldquo;{text}&rdquo;
        </p>
        {attribution && (
          <footer className="font-code text-xs text-muted-foreground">
            &mdash; {attribution}
          </footer>
        )}
      </div>
    </blockquote>
  );
}

function BlogProCon({
  pros,
  cons,
}: Extract<ContentBlock, { type: "pro-con" }>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-success/20 bg-success/5 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <ThumbsUp className="size-4 text-success" />
          <p className="font-display text-sm font-bold text-success">Do This</p>
        </div>
        <ul className="space-y-2">
          {pros.map((pro) => (
            <li key={pro} className="flex gap-2 text-sm">
              <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
              <span className="font-body text-foreground/80">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <ThumbsDown className="size-4 text-destructive" />
          <p className="font-display text-sm font-bold text-destructive">Avoid This</p>
        </div>
        <ul className="space-y-2">
          {cons.map((con) => (
            <li key={con} className="flex gap-2 text-sm">
              <span className="mt-0.5 shrink-0 font-body text-destructive">✕</span>
              <span className="font-body text-foreground/80">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BlogCodeSnippet({
  language,
  code,
  filename,
}: Extract<ContentBlock, { type: "code-snippet" }>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-primary/15 bg-[oklch(0.11_0.02_285)]">
      <div className="flex items-center justify-between border-b border-primary/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/50" />
            <span className="size-2.5 rounded-full bg-spark/50" />
            <span className="size-2.5 rounded-full bg-success/50" />
          </div>
          {filename && (
            <span className="font-code text-[10px] text-muted-foreground">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-code text-[10px] uppercase tracking-wider text-muted-foreground/60">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md px-2 py-1 font-code text-[10px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            {copied ? (
              <>
                <CheckCheck className="size-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-code text-sm leading-relaxed text-foreground/90">
          {code}
        </code>
      </pre>
    </div>
  );
}

function BlogChecklist({
  title,
  items,
}: Extract<ContentBlock, { type: "checklist" }>) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-primary/15 bg-card/50 p-5 space-y-3">
      {title && (
        <p className="font-display text-sm font-bold text-foreground">
          {title}
        </p>
      )}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-start gap-3 rounded-lg p-1.5 text-left transition-colors hover:bg-primary/5"
            >
              <span
                className={cn(
                  "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-all",
                  checked.has(i)
                    ? "border-volt bg-volt text-volt-foreground"
                    : "border-muted-foreground/30",
                )}
              >
                {checked.has(i) && <Check className="size-2.5" />}
              </span>
              <span
                className={cn(
                  "font-body text-sm transition-all",
                  checked.has(i) ? "text-muted-foreground line-through" : "text-foreground/80",
                )}
              >
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 pt-1">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full rounded-full bg-volt transition-all duration-500"
            style={{ width: `${items.length > 0 ? (checked.size / items.length) * 100 : 0}%` }}
          />
        </div>
        <span className="font-code text-[10px] text-muted-foreground">
          {checked.size}/{items.length}
        </span>
      </div>
    </div>
  );
}

function BlogLinkCard({
  title,
  description,
  href,
  tag,
}: Extract<ContentBlock, { type: "link-card" }>) {
  return (
    <Link
      href={href}
      className="group glow-hover flex items-center gap-4 rounded-xl border border-primary/15 bg-card/50 p-4 transition-all hover:border-volt/30"
    >
      <div className="flex-1 space-y-1">
        {tag && (
          <span className="font-code text-[10px] uppercase tracking-wider text-volt">
            {tag}
          </span>
        )}
        <p className="font-display text-sm font-bold text-foreground transition-colors group-hover:text-volt">
          {title}
        </p>
        <p className="font-body text-xs text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-volt" />
    </Link>
  );
}

export function BlogBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-body text-foreground/85 leading-relaxed">
          {block.text}
        </p>
      );
    case "callout":
      return <BlogCallout {...block} />;
    case "stat-row":
      return <BlogStatRow {...block} />;
    case "step-list":
      return <BlogStepList {...block} />;
    case "quote":
      return <BlogQuote {...block} />;
    case "pro-con":
      return <BlogProCon {...block} />;
    case "code-snippet":
      return <BlogCodeSnippet {...block} />;
    case "checklist":
      return <BlogChecklist {...block} />;
    case "link-card":
      return <BlogLinkCard {...block} />;
    default:
      return null;
  }
}

"use client";

import { useState, useCallback } from "react";
import { Palette, Mic, Code, Crosshair, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  type Persona,
  QUIZ_QUESTIONS,
  PERSONA_RESULTS,
  calculateResult,
} from "@/lib/persona-quiz-data";

const PERSONA_ICONS: Record<Persona, typeof Palette> = {
  designer: Palette,
  pitcher: Mic,
  architect: Code,
  strategist: Crosshair,
};

const PERSONA_ACCENTS: Record<
  Persona,
  { text: string; bg: string; border: string; bar: string }
> = {
  designer: {
    text: "text-volt",
    bg: "bg-volt/10",
    border: "border-volt/20",
    bar: "bg-volt",
  },
  pitcher: {
    text: "text-spark",
    bg: "bg-spark/10",
    border: "border-spark/20",
    bar: "bg-spark",
  },
  architect: {
    text: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    bar: "bg-primary",
  },
  strategist: {
    text: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    bar: "bg-success",
  },
};

type QuizState = "intro" | "question" | "result";

export function PersonaQuiz() {
  const [state, setState] = useState<QuizState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Persona[]>([]);
  const [animating, setAnimating] = useState(false);

  const handleStart = useCallback(() => {
    setState("question");
    setCurrentQ(0);
    setAnswers([]);
  }, []);

  const handleAnswer = useCallback(
    (persona: Persona) => {
      if (animating) return;
      setAnimating(true);

      const next = [...answers, persona];
      setAnswers(next);

      setTimeout(() => {
        if (next.length >= QUIZ_QUESTIONS.length) {
          setState("result");
        } else {
          setCurrentQ((q) => q + 1);
        }
        setAnimating(false);
      }, 300);
    },
    [answers, animating]
  );

  const handleRetake = useCallback(() => {
    setState("intro");
    setCurrentQ(0);
    setAnswers([]);
  }, []);

  return (
    <div className="glass rounded-2xl border border-primary/10 p-6 md:p-10">
      {state === "intro" && <IntroView onStart={handleStart} />}
      {state === "question" && (
        <QuestionView
          question={QUIZ_QUESTIONS[currentQ]}
          index={currentQ}
          total={QUIZ_QUESTIONS.length}
          onAnswer={handleAnswer}
          animating={animating}
        />
      )}
      {state === "result" && (
        <ResultView answers={answers} onRetake={handleRetake} />
      )}
    </div>
  );
}

function IntroView({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-fade-in-up mx-auto max-w-2xl space-y-6 text-center">
      <div className="flex justify-center gap-3">
        {(["designer", "pitcher", "architect", "strategist"] as Persona[]).map(
          (p, i) => {
            const Icon = PERSONA_ICONS[p];
            const a = PERSONA_ACCENTS[p];
            return (
              <div
                key={p}
                className={`animate-float flex size-12 items-center justify-center rounded-xl ${a.bg} ${a.border} border`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <Icon className={`size-5 ${a.text}`} />
              </div>
            );
          }
        )}
      </div>
      <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
        What&apos;s Your Hackathon Persona?
      </h3>
      <p className="font-body text-muted-foreground">
        8 scenario-based questions. No wrong answers. Discover which role you
        naturally gravitate toward in hackathon teams.
      </p>
      <Button
        size="lg"
        onClick={onStart}
        className="glow-hover font-display"
      >
        Start the Quiz
      </Button>
    </div>
  );
}

function QuestionView({
  question,
  index,
  total,
  onAnswer,
  animating,
}: {
  question: (typeof QUIZ_QUESTIONS)[number];
  index: number;
  total: number;
  onAnswer: (persona: Persona) => void;
  animating: boolean;
}) {
  return (
    <div
      key={question.id}
      className={`space-y-8 transition-opacity duration-300 ${animating ? "opacity-0" : "animate-fade-in-up opacity-100"}`}
    >
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-code text-xs text-muted-foreground">
            QUESTION {index + 1} OF {total}
          </span>
          <span className="font-code text-xs text-volt">
            {Math.round(((index + 1) / total) * 100)}%
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-volt transition-all duration-500"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Scenario */}
      <h4 className="font-display text-xl font-bold tracking-tight md:text-2xl">
        {question.scenario}
      </h4>

      {/* Options */}
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((opt) => (
          <button
            key={opt.persona}
            onClick={() => onAnswer(opt.persona)}
            disabled={animating}
            className="glow-hover group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-volt/40 disabled:pointer-events-none"
          >
            <p className="font-body text-sm text-foreground/90 transition-colors group-hover:text-foreground">
              {opt.text}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultView({
  answers,
  onRetake,
}: {
  answers: Persona[];
  onRetake: () => void;
}) {
  const { primary, secondary, scores } = calculateResult(answers);
  const result = PERSONA_RESULTS[primary];
  const accent = PERSONA_ACCENTS[primary];
  const Icon = PERSONA_ICONS[primary];
  const maxScore = QUIZ_QUESTIONS.length;
  const bestMatchResult = PERSONA_RESULTS[result.bestMatch as Persona];
  const BestMatchIcon = PERSONA_ICONS[result.bestMatch as Persona];
  const bestMatchAccent = PERSONA_ACCENTS[result.bestMatch as Persona];

  return (
    <div className="animate-fade-in-up space-y-8">
      {/* Result header */}
      <div className="text-center space-y-4">
        <div
          className={`animate-glow-pulse mx-auto flex size-20 items-center justify-center rounded-2xl ${accent.bg} ${accent.border} border`}
        >
          <Icon className={`size-10 ${accent.text}`} />
        </div>
        <Badge className={`${accent.bg} ${accent.text} ${accent.border} font-code text-xs`}>
          YOUR PERSONA
        </Badge>
        <h3 className={`font-display text-3xl font-bold tracking-tight md:text-4xl ${accent.text}`}>
          {result.name}
        </h3>
        <p className="animate-shimmer font-display text-lg font-semibold">
          {result.tagline}
        </p>
      </div>

      <Separator className="bg-primary/20" />

      {/* Description */}
      <p className="mx-auto max-w-2xl text-center font-body text-foreground/80">
        {result.description}
      </p>

      {/* Strengths */}
      <div className="space-y-3">
        <p className="text-center font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Your Strengths
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {result.strengths.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className={`${accent.border.replace("border-", "border-").replace("/20", "/30")} ${accent.text} font-code text-xs`}
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>

      {/* Weakness */}
      <div className="mx-auto max-w-lg rounded-lg border border-border bg-surface p-4 text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Watch Out For
        </p>
        <p className="mt-1 font-body text-sm text-foreground/70">
          {result.weakness}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="space-y-3">
        <p className="text-center font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Score Breakdown
        </p>
        <div className="mx-auto max-w-md space-y-2">
          {(
            Object.entries(scores) as [Persona, number][]
          )
            .sort((a, b) => b[1] - a[1])
            .map(([persona, score]) => {
              const pa = PERSONA_ACCENTS[persona];
              const PIcon = PERSONA_ICONS[persona];
              return (
                <div key={persona} className="flex items-center gap-3">
                  <PIcon className={`size-4 shrink-0 ${pa.text}`} />
                  <span className="w-24 shrink-0 font-code text-xs text-muted-foreground">
                    {PERSONA_RESULTS[persona].name.replace("The ", "")}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${pa.bar} transition-all duration-700`}
                      style={{ width: `${(score / maxScore) * 100}%` }}
                    />
                  </div>
                  <span className={`w-6 text-right font-code text-xs ${pa.text}`}>
                    {score}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Best match + secondary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 space-y-2">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Best Teammate Match
          </p>
          <div className="flex items-center gap-3">
            <div className={`flex size-9 items-center justify-center rounded-lg ${bestMatchAccent.bg}`}>
              <BestMatchIcon className={`size-4 ${bestMatchAccent.text}`} />
            </div>
            <div>
              <p className={`font-display text-sm font-semibold ${bestMatchAccent.text}`}>
                {bestMatchResult.name}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Complements your strengths
              </p>
            </div>
          </div>
        </div>

        {secondary && (
          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Secondary Persona
            </p>
            <div className="flex items-center gap-3">
              {(() => {
                const sa = PERSONA_ACCENTS[secondary];
                const SIcon = PERSONA_ICONS[secondary];
                return (
                  <>
                    <div className={`flex size-9 items-center justify-center rounded-lg ${sa.bg}`}>
                      <SIcon className={`size-4 ${sa.text}`} />
                    </div>
                    <div>
                      <p className={`font-display text-sm font-semibold ${sa.text}`}>
                        {PERSONA_RESULTS[secondary].name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        Your backup mode
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Analogy */}
      <div className="mx-auto max-w-lg text-center">
        <p className="font-code text-xs text-muted-foreground">
          {result.analogy}
        </p>
      </div>

      {/* Retake */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={onRetake}
          className="glow-hover gap-2 font-display"
        >
          <RotateCcw className="size-4" />
          Retake Quiz
        </Button>
      </div>
    </div>
  );
}

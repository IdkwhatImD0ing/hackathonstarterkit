"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Beaker, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type AlchemyRecipe = {
  event: string;
  project: string;
  base: [string, string];
  mid: string;
  final: string;
  note: string;
};

type Props = {
  recipes: AlchemyRecipe[];
};

function isSamePair(a: string, b: string, x: string, y: string) {
  return (a === x && b === y) || (a === y && b === x);
}

export function AlchemyMiniGame({ recipes }: Props) {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [slotA, setSlotA] = useState<string | null>(null);
  const [slotB, setSlotB] = useState<string | null>(null);
  const [inventory, setInventory] = useState<string[]>([]);
  const [message, setMessage] = useState("Drag two components into the cauldron to combine.");
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const challenge = recipes[challengeIndex];

  const catalyst = useMemo(
    () => `${challenge.event} context`,
    [challenge.event],
  );

  const challengeInventory = useMemo(
    () => [challenge.base[0], challenge.base[1], catalyst],
    [challenge.base, catalyst],
  );

  const availableItems = useMemo(() => {
    const merged = [...challengeInventory, ...inventory];
    return Array.from(new Set(merged));
  }, [challengeInventory, inventory]);

  const resetChallenge = () => {
    setSlotA(null);
    setSlotB(null);
    setInventory([]);
    setMessage("Drag two components into the cauldron to combine.");
  };

  const nextChallenge = () => {
    const next = (challengeIndex + 1) % recipes.length;
    setChallengeIndex(next);
    setSlotA(null);
    setSlotB(null);
    setInventory([]);
    setMessage("New challenge loaded. Build the mid component, then the final product.");
  };

  const combine = () => {
    if (!slotA || !slotB) {
      setMessage("Drop two components first.");
      return;
    }

    if (isSamePair(slotA, slotB, challenge.base[0], challenge.base[1])) {
      setInventory((prev) => (prev.includes(challenge.mid) ? prev : [...prev, challenge.mid]));
      setMessage(`Great! You discovered the mid component: ${challenge.mid}.`);
      setSlotA(null);
      setSlotB(null);
      return;
    }

    if (isSamePair(slotA, slotB, challenge.mid, catalyst)) {
      setInventory((prev) => (prev.includes(challenge.final) ? prev : [...prev, challenge.final]));
      setCompleted((prev) => new Set(prev).add(challenge.project));
      setMessage(`🏆 Final product unlocked: ${challenge.final}.`);
      setSlotA(null);
      setSlotB(null);
      return;
    }

    setMessage("That combo doesn't synthesize anything for this challenge. Try another pair.");
    setSlotA(null);
    setSlotB(null);
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">MINI GAME</Badge>
            <Badge variant="outline" className="font-code text-xs">
              {completed.size}/{recipes.length} completed
            </Badge>
          </div>
          <CardTitle className="font-display text-2xl">{challenge.project}</CardTitle>
          <CardDescription className="font-body">
            {challenge.event} challenge: build the mid component first, then fuse it into the final project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {availableItems.map((item) => (
              <button
                key={item}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", item)}
                className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 text-left font-code text-xs text-primary"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-code text-xs text-muted-foreground">{message}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={resetChallenge}>
              <RotateCcw className="mr-1 size-3.5" /> Reset challenge
            </Button>
            <Button size="sm" onClick={nextChallenge}>
              Next project <ArrowRight className="ml-1 size-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-spark/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-xl text-spark">
            <Beaker className="size-5" /> Combination Cauldron
          </CardTitle>
          <CardDescription className="font-body text-sm">
            Drag components into both slots, then synthesize.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[{ label: "Slot A", value: slotA, setter: setSlotA }, { label: "Slot B", value: slotB, setter: setSlotB }].map(
              (slot) => (
                <div
                  key={slot.label}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    slot.setter(e.dataTransfer.getData("text/plain"));
                  }}
                  className="min-h-24 rounded-lg border border-dashed border-spark/30 bg-spark/5 p-3"
                >
                  <p className="font-code text-[11px] uppercase tracking-wide text-spark/80">{slot.label}</p>
                  <p className="mt-3 font-body text-sm text-foreground/80">{slot.value ?? "Drop a component"}</p>
                </div>
              ),
            )}
          </div>

          <Button className="w-full" onClick={combine}>
            <Sparkles className="mr-2 size-4" /> Synthesize
          </Button>

          <div className="rounded-lg border border-success/20 bg-success/5 p-3">
            <p className="font-code text-xs text-success/80">Recipe target:</p>
            <p className="mt-1 font-body text-sm text-foreground/80">
              {challenge.base[0]} + {challenge.base[1]} → {challenge.mid}
            </p>
            <p className="font-body text-sm text-foreground/80">
              {challenge.mid} + {catalyst} → {challenge.final}
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground">{challenge.note}</p>
          </div>

          {completed.has(challenge.project) ? (
            <div className="flex items-center gap-2 rounded-lg border border-volt/20 bg-volt/5 p-3">
              <Trophy className="size-4 text-volt" />
              <p className="font-code text-xs text-volt">Challenge cleared! Move to the next project.</p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

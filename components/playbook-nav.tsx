"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";
import { Button } from "@/components/ui/button";

export function PlaybookNav() {
  const pathname = usePathname();

  const currentIndex = PLAYBOOK_SECTIONS.findIndex(
    (s) => pathname === `/playbook/${s.slug}`
  );

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? PLAYBOOK_SECTIONS[currentIndex - 1] : null;
  const next =
    currentIndex < PLAYBOOK_SECTIONS.length - 1
      ? PLAYBOOK_SECTIONS[currentIndex + 1]
      : null;

  return (
    <div className="flex items-center justify-between border-t border-border pt-12">
      {prev ? (
        <Button asChild variant="outline" className="glow-hover gap-2">
          <Link href={`/playbook/${prev.slug}`}>
            <ArrowLeft className="size-4" />
            <span className="font-code text-xs">{prev.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {next ? (
        <Button asChild className="glow-hover gap-2">
          <Link href={`/playbook/${next.slug}`}>
            <span className="font-code text-xs">{next.title}</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      ) : (
        <Button
          asChild
          className="glow-hover gap-2 bg-spark text-spark-foreground hover:bg-spark/90"
        >
          <Link href="/playbook">
            <LayoutGrid className="size-4" />
            <span className="font-code text-xs">Back to Overview</span>
          </Link>
        </Button>
      )}
    </div>
  );
}

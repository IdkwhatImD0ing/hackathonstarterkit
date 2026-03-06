"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";
import { cn } from "@/lib/utils";

export function PlaybookStepper() {
  const pathname = usePathname();

  const currentIndex = PLAYBOOK_SECTIONS.findIndex(
    (s) => pathname === `/playbook/${s.slug}`
  );

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      {PLAYBOOK_SECTIONS.map((section, i) => {
        const isActive = i === currentIndex;
        const isCompleted = currentIndex > -1 && i < currentIndex;

        return (
          <div key={section.slug} className="flex flex-1 items-center gap-1 sm:gap-2">
            <Link
              href={`/playbook/${section.slug}`}
              className="group flex items-center gap-1.5 sm:gap-2"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full font-code text-xs font-bold transition-all",
                  isActive && "bg-volt text-volt-foreground scale-110 shadow-[0_0_20px_oklch(0.78_0.15_195/30%)]",
                  isCompleted && "bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground"
                )}
              >
                {section.step}
              </span>
              <span
                className={cn(
                  "hidden font-code text-xs transition-colors lg:inline",
                  isActive && "text-volt",
                  isCompleted && "text-foreground",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}
              >
                {section.title}
              </span>
            </Link>
            {i < PLAYBOOK_SECTIONS.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 transition-colors",
                  isCompleted ? "bg-primary/50" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

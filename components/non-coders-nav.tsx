"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { NON_CODER_SECTIONS } from "@/lib/non-coder-sections";
import { cn } from "@/lib/utils";

export function NonCodersNav() {
  const pathname = usePathname();
  const isHub = pathname === "/non-coders";
  const isSkillDetail = /^\/non-coders\/skills\/[^/]+$/.test(pathname);

  const currentIndex = NON_CODER_SECTIONS.findIndex(
    (s) => pathname === `/non-coders/${s.slug}` || pathname.startsWith(`/non-coders/${s.slug}/`)
  );

  return (
    <div className="space-y-0">
      <nav className="glass sticky top-0 z-40 border-b border-primary/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-16">
          {isHub ? (
            <Link
              href="/"
              className="flex items-center gap-2 font-code text-sm text-muted-foreground transition-colors hover:text-volt"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          ) : (
            <Link
              href={isSkillDetail ? "/non-coders/skills" : "/non-coders"}
              className="flex items-center gap-2 font-code text-sm text-muted-foreground transition-colors hover:text-volt"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">
                {isSkillDetail ? "Skills" : "Guide"}
              </span>
            </Link>
          )}
          <span className="font-display text-sm font-bold tracking-tight">
            For <span className="text-volt">Non-Coders</span>
          </span>
          {isHub ? (
            <div className="w-16" />
          ) : (
            <Link
              href="/"
              className="font-code text-sm text-muted-foreground transition-colors hover:text-volt"
            >
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}
        </div>
      </nav>

      {!isHub && !isSkillDetail && (
        <div className="mx-auto max-w-6xl px-6 pt-6 md:px-16">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2">
            {NON_CODER_SECTIONS.map((section, i) => {
              const isActive = i === currentIndex;

              return (
                <div
                  key={section.slug}
                  className="flex shrink-0 items-center gap-1 sm:gap-2"
                >
                  <Link
                    href={`/non-coders/${section.slug}`}
                    className="group flex items-center gap-1.5 sm:gap-2"
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full font-code text-xs font-bold transition-all",
                        isActive &&
                          "bg-volt text-volt-foreground scale-110 shadow-[0_0_20px_oklch(0.78_0.15_195/30%)]",
                        !isActive && "bg-muted text-muted-foreground"
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "hidden font-code text-xs transition-colors lg:inline",
                        isActive && "text-volt",
                        !isActive && "text-muted-foreground"
                      )}
                    >
                      {section.title}
                    </span>
                  </Link>
                  {i < NON_CODER_SECTIONS.length - 1 && (
                    <div className="h-px w-4 bg-border sm:w-8" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}

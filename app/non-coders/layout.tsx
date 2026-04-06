import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NonCodersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="noise pointer-events-none fixed inset-0 z-50" />

      <nav className="glass sticky top-0 z-40 border-b border-primary/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-code text-sm text-muted-foreground transition-colors hover:text-volt"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="font-display text-sm font-bold tracking-tight">
            For <span className="text-volt">Non-Coders</span>
          </span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-16 md:px-16 lg:py-24">
        {children}
      </main>
    </div>
  );
}

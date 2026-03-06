import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="font-display text-4xl font-bold">
          Hackathon <span className="text-primary">Starter Kit</span>
        </h1>
        <p className="font-body text-muted-foreground">
          The design system is ready.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/playbook"
            className="inline-block rounded-lg bg-volt px-6 py-3 font-display text-sm font-semibold text-volt-foreground glow-hover transition-all hover:bg-volt/90"
          >
            Open Playbook →
          </Link>
          <Link
            href="/design-system"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground glow-hover transition-all"
          >
            View Design System →
          </Link>
        </div>
      </div>
    </div>
  );
}

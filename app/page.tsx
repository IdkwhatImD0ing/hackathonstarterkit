import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="font-display text-4xl font-bold">
          Hackathon <span className="text-primary">Starter Kit</span>
        </h1>
        <p className="font-body text-muted-foreground">
          The design system is ready.
        </p>
        <Link
          href="/design-system"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground glow-hover transition-all"
        >
          View Design System →
        </Link>
      </div>
    </div>
  );
}

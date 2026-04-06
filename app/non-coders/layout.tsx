import { NonCodersNav } from "@/components/non-coders-nav";

export default function NonCodersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="noise pointer-events-none fixed inset-0 z-50" />
      <NonCodersNav />
      <main className="mx-auto max-w-6xl px-6 py-16 md:px-16 lg:py-24">
        {children}
      </main>
    </div>
  );
}

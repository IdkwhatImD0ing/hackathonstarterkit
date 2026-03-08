import type { Metadata } from "next";
import Link from "next/link";
import { Users, Lightbulb, ShieldCheck, Zap, Mic, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "The Playbook",
  description:
    "A battle-tested 6-phase system for winning hackathons, distilled from 36+ victories and $100K+ in prizes.",
  openGraph: {
    title: "The Playbook",
    description:
      "A battle-tested 6-phase system for winning hackathons, distilled from 36+ victories and $100K+ in prizes.",
  },
};
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SECTION_ICONS = [Users, Lightbulb, ShieldCheck, Zap, Mic, FileText];

export default function PlaybookPage() {
  return (
    <div className="space-y-16">
      <header className="stagger-children space-y-6">
        <h1 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
          The
          <br />
          <span className="inline-flex items-baseline gap-3 md:gap-4">
            <span className="text-primary">Playbook</span>
            <Badge className="translate-y-[-0.15em] border-volt/30 bg-volt/10 text-volt font-code text-[10px] leading-normal md:text-xs">
              6-PHASE SYSTEM
            </Badge>
          </span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          A battle-tested system for winning hackathons, distilled from{" "}
          <span className="animate-shimmer font-semibold">36+ victories</span>{" "}
          and $100K+ in prizes.
        </p>
      </header>

      <div className="relative h-12">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-volt/10 to-transparent"
          style={{
            clipPath: "polygon(0 0, 100% 30%, 100% 70%, 0 100%)",
          }}
        />
      </div>

      <div className="stagger-children grid grid-cols-1 gap-4 md:grid-cols-3">
        {PLAYBOOK_SECTIONS.map((section, i) => {
          const Icon = SECTION_ICONS[i];
          return (
            <Link
              key={section.slug}
              href={`/playbook/${section.slug}`}
              className="md:col-span-1"
            >
              <Card className="glow-hover group h-full cursor-pointer transition-all hover:border-volt/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                      {String(section.step).padStart(2, "0")}
                    </Badge>
                    <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-volt" />
                  </div>
                  <CardTitle className="font-display text-xl transition-colors group-hover:text-volt">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="font-body">
                    {section.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                    Enter section →
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

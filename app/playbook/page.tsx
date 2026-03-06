import Link from "next/link";
import { Users, Lightbulb, ShieldCheck, Zap, Mic } from "lucide-react";
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SECTION_ICONS = [Users, Lightbulb, ShieldCheck, Zap, Mic];

export default function PlaybookPage() {
  return (
    <div className="space-y-16">
      <header className="stagger-children space-y-6">
        <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
          5-PHASE SYSTEM
        </Badge>
        <h1 className="inline-block font-display text-5xl font-extrabold tracking-tighter md:text-7xl">
          The
          <br />
          <span className="text-primary">Playbook</span>
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
          const spanTwo = i === 0 || i === 3;

          return (
            <Link
              key={section.slug}
              href={`/playbook/${section.slug}`}
              className={spanTwo ? "md:col-span-2" : "md:col-span-1"}
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

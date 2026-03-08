import { Badge } from "@/components/ui/badge";

interface SectionTemplateProps {
  step: number;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function SectionTemplate({
  step,
  title,
  subtitle,
  children,
}: SectionTemplateProps) {
  return (
    <div className="space-y-12">
      <header className="stagger-children space-y-4">
        <Badge className="border-spark/30 bg-spark/10 text-spark font-code text-xs">
          PHASE {step} OF 7
        </Badge>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          {title}
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          {subtitle}
        </p>
      </header>

      {children || (
        <div className="glass rounded-xl border border-primary/10 p-8">
          <div className="flex items-center gap-2">
            <span className="font-code text-sm text-muted-foreground">
              $ loading content
            </span>
            <span className="inline-block h-4 w-2 animate-pulse bg-volt" />
          </div>
          <p className="mt-4 font-body text-sm text-muted-foreground/60">
            This section is being written. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}

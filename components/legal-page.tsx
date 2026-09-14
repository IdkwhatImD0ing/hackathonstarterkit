import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { Home, Mail, Scale, FileText } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { CONTACT_EMAIL } from "@/lib/site";

export type LegalSection = {
  id: string;
  title: string;
  /** A string is a paragraph, a string[] a bulleted list, an element as-is. */
  paragraphs: (string | string[] | ReactElement)[];
};

/**
 * Shared layout for /terms and /privacy, so a fix to one legal page's
 * structure or styling reaches the other.
 */
export function LegalPage({
  breadcrumb,
  heading,
  intro,
  file,
  lastUpdated,
  jsonLd,
  sections,
}: {
  /** Label for the current page in the breadcrumb, e.g. "Terms". */
  breadcrumb: string;
  heading: ReactNode;
  intro: string;
  /** Name shown in the terminal title bar, e.g. "terms.txt". */
  file: string;
  lastUpdated: string;
  jsonLd: Record<string, unknown>;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-10">
      <JsonLd data={jsonLd} />

      <nav className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
        >
          <Home className="size-3" />
          Home
        </Link>
        <span className="font-code text-xs text-muted-foreground/40">/</span>
        <span className="font-code text-xs text-foreground">{breadcrumb}</span>
      </nav>

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-code text-[10px] uppercase tracking-widest text-primary">
          <Scale className="size-3" />
          Legal
        </div>
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {heading}
        </h1>
        <p className="font-body text-muted-foreground">{intro}</p>
        <p className="font-code text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </header>

      <section className="glass glow rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 border-b border-primary/10 px-5 py-3">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-spark/70" />
          <span className="size-3 rounded-full bg-success/70" />
          <span className="ml-3 font-code text-xs text-muted-foreground">
            {`bill@hackathons ~ % cat ./${file}`}
          </span>
        </div>

        <div className="space-y-10 p-6 md:p-10">
          <nav aria-label="Table of contents" className="space-y-3">
            <p className="font-code text-sm text-muted-foreground">
              <span className="text-volt">$</span> ls ./sections
            </p>
            <ol className="grid grid-cols-1 gap-x-6 gap-y-1.5 font-code text-xs text-muted-foreground sm:grid-cols-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="transition-colors hover:text-volt"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 space-y-3"
              >
                <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((p, i) => {
                  if (Array.isArray(p)) {
                    return (
                      <ul
                        key={i}
                        className="ml-1 space-y-1.5 font-body text-sm text-foreground/85 md:text-base"
                      >
                        {p.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="font-body text-sm leading-relaxed text-foreground/85 md:text-base"
                    >
                      {p}
                    </p>
                  );
                })}
              </section>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 font-code text-xs text-muted-foreground">
              <FileText className="size-3.5 text-primary" />
              Effective as of {lastUpdated}
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
            >
              <Mail className="size-3.5" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

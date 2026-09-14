import Link from "next/link";
import { Mail } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/media-kit", label: "Media Kit" },
  { href: "/ai", label: "For AI Agents" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-8 md:px-16">
        <p className="font-code text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-1 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="mailto:feedback@thehackathonplaybook.dev"
          className="group flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
        >
          <Mail className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          Got feedback? feedback@thehackathonplaybook.dev
        </a>
      </div>
    </footer>
  );
}

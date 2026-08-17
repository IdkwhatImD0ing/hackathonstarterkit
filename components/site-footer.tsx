import { Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-8 md:px-16">
        <p className="font-code text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Hackathon Playbook
        </p>
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

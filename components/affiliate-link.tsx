import type { ReactNode } from "react";

/**
 * An affiliate link that always carries rel="sponsored" and a visible
 * "(affiliate link)" label: the disclosure the Terms promise under the
 * FTC endorsement guides. Use this for every affiliate URL instead of a
 * bare <a>. Pass label={false} only for a card or button that renders
 * <AffiliateDisclosure /> inside itself.
 */
export function AffiliateLink({
  href,
  className,
  label = true,
  children,
}: {
  href: string;
  className?: string;
  label?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={className}
      >
        {children}
      </a>
      {label ? (
        <>
          {" "}
          <span className="font-code text-xs font-normal text-muted-foreground">
            (affiliate link)
          </span>
        </>
      ) : null}
    </>
  );
}

/** The disclosure line for affiliate cards and call-to-action buttons. */
export function AffiliateDisclosure() {
  return (
    <p className="font-code text-xs text-muted-foreground">
      Affiliate link: I may earn a commission.
    </p>
  );
}

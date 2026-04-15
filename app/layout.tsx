import type { Metadata } from "next";
import { fontDisplay, fontBody, fontCode } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://thehackathonplaybook.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "Hackathon Starter Kit — How to Win Hackathons | Guides, Templates & Strategies",
    template: "%s | Hackathon Starter Kit",
  },
  description:
    "Learn how to win hackathons with battle-tested strategies from 36+ victories and $100K+ in prizes. Guides on team formation, ideation, pitching, the best tech stack for hackathons, and tips for beginners.",
  keywords: [
    "how to win hackathons",
    "hackathon tips",
    "hackathon strategies",
    "best tech stack for hackathons",
    "hackathon guide",
    "hackathon for beginners",
    "hackathon playbook",
    "hackathon starter kit",
    "win hackathon prizes",
    "hackathon pitch tips",
    "hackathon team formation",
    "hackathon ideation",
    "hackathon project ideas",
    "hackathon submission guide",
    "non-coders hackathon",
    "vibe coding hackathon",
    "AI hackathon tips",
    "hackathon MVP strategy",
    "hackathon preparation",
    "best technology for hackathons",
  ],
  authors: [{ name: "Bill Zhang", url: "https://v2.art3m1s.me/" }],
  creator: "Bill Zhang",
  publisher: "Hackathon Starter Kit",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "Hackathon Starter Kit",
    locale: "en_US",
    url: BASE_URL,
    title:
      "Hackathon Starter Kit — How to Win Hackathons | Guides & Strategies",
    description:
      "Learn how to win hackathons with battle-tested strategies from 36+ victories and $100K+ in prizes. The ultimate playbook for hackathon success.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackathon Starter Kit — How to Win Hackathons",
    description:
      "Battle-tested strategies from 36+ hackathon wins. Guides on team formation, ideation, pitching, best tech stack, and tips for beginners.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hackathon Starter Kit",
  url: BASE_URL,
  description:
    "Learn how to win hackathons with battle-tested strategies from 36+ victories and $100K+ in prizes.",
  author: {
    "@type": "Person",
    name: "Bill Zhang",
    url: "https://v2.art3m1s.me/",
    sameAs: [
      "https://github.com/IdkwhatImD0ing",
      "https://www.linkedin.com/in/bill-zhang1/",
      "https://devpost.com/IdkwhatImD0ing",
    ],
    jobTitle: "Applied AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Scale AI",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hackathon Starter Kit",
  url: BASE_URL,
  logo: `${BASE_URL}/icon`,
  description:
    "The ultimate hackathon resource with guides, templates, and strategies from 36+ wins.",
  founder: {
    "@type": "Person",
    name: "Bill Zhang",
  },
  sameAs: [
    "https://github.com/IdkwhatImD0ing",
    "https://www.linkedin.com/in/bill-zhang1/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontCode.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

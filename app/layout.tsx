import type { Metadata } from "next";
import { fontDisplay, fontBody, fontCode } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { PostHogPageViewTracker } from "@/components/posthog-provider";
import { WebMcpTools } from "@/components/web-mcp";
import { ChatWidget } from "@/components/chat/chat-widget";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { shareMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "The Hackathon Playbook — How to Win Hackathons | Guides, Templates & Strategies",
    template: `%s | ${SITE_NAME}`,
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
    "the hackathon playbook",
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
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  ...shareMetadata({
    path: "/",
    title:
      "The Hackathon Playbook — How to Win Hackathons | Guides & Strategies",
    description:
      "Learn how to win hackathons with battle-tested strategies from 36+ victories and $100K+ in prizes. The ultimate playbook for hackathon success.",
    twitter: {
      title: "The Hackathon Playbook — How to Win Hackathons",
      description:
        "Battle-tested strategies from 36+ hackathon wins. Guides on team formation, ideation, pitching, best tech stack, and tips for beginners.",
    },
  }),
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
  name: SITE_NAME,
  url: SITE_URL,
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
    jobTitle: "Software Engineer 2",
    worksFor: {
      "@type": "Organization",
      name: "Pinterest",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.png`,
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
        <SiteFooter />
        <PostHogPageViewTracker />
        <Analytics />
        <WebMcpTools />
        <ChatWidget />
      </body>
    </html>
  );
}

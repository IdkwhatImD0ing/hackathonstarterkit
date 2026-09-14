import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";
import { shareMetadata } from "@/lib/metadata";

const LAST_UPDATED = "September 14, 2026";

const DESCRIPTION =
  "Terms of Service for The Hackathon Playbook: site rules, open AI and crawler access, affiliate disclosures, intellectual property, and AI chat data handling.";

export const metadata: Metadata = {
  // The layout template appends " | The Hackathon Playbook".
  title: "Terms of Service",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  ...shareMetadata({
    path: "/terms",
    title: `Terms of Service — ${SITE_NAME}`,
    description: DESCRIPTION,
  }),
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  url: `${SITE_URL}/terms`,
  description: DESCRIPTION,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  dateModified: "2026-09-14",
};

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing or using The Hackathon Playbook (the website located at thehackathonplaybook.dev, together with any subdomains, hereafter the \"Site\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree with any part of these Terms, you should stop using the Site.",
      "These Terms form a binding agreement between you and Bill Zhang, the operator of the Site (\"we\", \"us\", or \"our\").",
    ],
  },
  {
    id: "about",
    title: "2. About the Site",
    paragraphs: [
      "The Hackathon Playbook publishes educational content about hackathons, including strategy guides, templates, blog posts, and curated resources. The content is informational only. It is not legal, financial, career, or professional advice, and it is not a guarantee of any specific outcome at a hackathon or elsewhere.",
      "Your use of anything you read here is at your own discretion and risk.",
    ],
  },
  {
    id: "ip",
    title: "3. Intellectual Property",
    paragraphs: [
      "All content on the Site, including text, graphics, logos, icons, images, audio, video, code snippets, page layouts, and the compilation of all of the above, is the property of Bill Zhang or licensors and is protected by copyright, trademark, and other intellectual property laws.",
      "We grant you a limited, personal, non-exclusive, non-transferable, revocable license to access and view the content for your own personal, non-commercial use. You may also share short quotes or excerpts with proper attribution and a link back to the Site.",
      "Automated access and AI use are welcome. You may crawl the Site with automated tools, have AI tools and agents read it (including through our Markdown pages, llms.txt, and MCP server), and use the content to train, fine-tune, or ground AI models. This permission is in addition to the personal license above. It applies as long as you follow our robots.txt file and the content signals published in it, stay within the rate limits on our API and MCP endpoints, and do not degrade the Site for other visitors.",
      "Apart from the AI use described above, you may not reproduce, republish, sell, license, or redistribute significant portions of the content, or create derivative works from it, without prior written permission. Passing the content off as your own is never allowed.",
      <>
        Press and publications may use the logo, share card, founder photo,
        and boilerplate from our{" "}
        <Link href="/media-kit" className="text-volt underline underline-offset-2">
          Media Kit
        </Link>{" "}
        in editorial coverage of the Site.
      </>,
    ],
  },
  {
    id: "conduct",
    title: "4. User Conduct",
    paragraphs: [
      "When using the Site, you agree not to:",
      [
        "Attack or overload the Site, including with automated traffic that ignores robots.txt, exceeds our rate limits, or slows the Site down for other visitors.",
        "Attempt to gain unauthorized access to the Site, its servers, or related infrastructure.",
        "Introduce malware, viruses, or any code intended to interfere with the Site.",
        "Use the Site to violate any applicable law or the rights of any third party.",
        "Repackage, resell, or redistribute the content as your own product or service.",
      ],
    ],
  },
  {
    id: "affiliate",
    title: "5. Affiliate Disclosure",
    paragraphs: [
      "The Site contains affiliate links and may participate in affiliate or referral programs. This means that if you click on certain links and complete a qualifying action (for example, signing up for a service or making a purchase), we may earn a commission at no additional cost to you.",
      "We only link to tools, services, and products we believe are useful to hackathon builders. Affiliate compensation does not influence our editorial opinions, and we always disclose material relationships in line with the U.S. Federal Trade Commission's endorsement guidelines.",
      "You are never required to use an affiliate link. You are free to visit any product or service directly.",
    ],
  },
  {
    id: "third-party",
    title: "6. Third-Party Links and Tools",
    paragraphs: [
      "The Site links to third-party websites, tools, and services that we do not own or control (for example, Devpost, GitHub, LinkedIn, Google, OpenAI, Anthropic, and various hackathon and sponsor sites). We are not responsible for the availability, accuracy, content, privacy practices, or policies of any third-party resource.",
      "Accessing a third-party resource is at your own risk, and your use of it is governed by that third party's own terms and privacy policy.",
    ],
  },
  {
    id: "disclaimer",
    title: "7. No Warranties",
    paragraphs: [
      "The Site and its content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or accuracy.",
      "We do not guarantee that you will win a hackathon, earn prize money, receive job offers, get into any program, or achieve any other specific outcome as a result of using the Site. Results depend on many factors outside of our control.",
      "We do not warrant that the Site will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected.",
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, in no event will Bill Zhang, The Hackathon Playbook, or any affiliated parties be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, data, goodwill, or other intangible losses, arising out of or in connection with your use of (or inability to use) the Site, even if we have been advised of the possibility of such damages.",
      "To the extent any liability cannot be excluded, our total cumulative liability to you for any and all claims relating to the Site is limited to one hundred U.S. dollars (USD $100).",
    ],
  },
  {
    id: "indemnification",
    title: "9. Indemnification",
    paragraphs: [
      "You agree to defend, indemnify, and hold harmless Bill Zhang and any affiliated parties from and against any claims, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use or misuse of the Site, (b) your violation of these Terms, or (c) your violation of any law or the rights of any third party.",
    ],
  },
  {
    id: "changes",
    title: "10. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. When we do, we will revise the \"Last updated\" date at the top of this page. For material changes, we may also provide additional notice (for example, a banner on the Site).",
      "Your continued use of the Site after changes are posted constitutes acceptance of the revised Terms. If you do not agree to the revised Terms, you should stop using the Site.",
    ],
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the State of California, USA, without regard to its conflict-of-laws principles. Any dispute arising from or relating to these Terms or the Site will be resolved exclusively in the state or federal courts located in California, and you consent to the personal jurisdiction and venue of those courts.",
    ],
  },
  {
    id: "ai-data",
    title: "12. AI Chat and Search Data",
    paragraphs: [
      "The Site offers an AI assistant (\"Ask the Playbook\") and an AI prompt finder on the cheat sheet. Both send what you type to OpenAI, which generates the response. We instruct OpenAI not to store those requests on their side.",
      "We do record them. When you use either feature, we store the messages you send, the answer the model returns, which pages of the Site were retrieved as context, the model used, token counts, timings, and whether the request succeeded. That record is kept in FireTrace, the tracing service we use, and is used to find weak answers, close gaps in the content, and improve the assistant.",
      "Each conversation carries a random identifier created in your browser tab and discarded when that tab closes, so the turns of one conversation can be read together. It is not tied to your name, your email, or any account, and we do not try to identify you from it.",
      "If you rate an answer with the thumbs up or thumbs down button, we record that rating against the answer it refers to.",
      "Because conversations are stored, please do not paste passwords, API keys, personal information, or anything confidential into the chat. It is a public educational assistant, not a private channel.",
      "We do not sell this data and we do not share it with advertisers. To have a conversation deleted, email the address below.",
      <>
        Our{" "}
        <Link href="/privacy" className="text-volt underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        covers everything else the Site collects and which services receive it.
      </>,
    ],
  },
  {
    id: "contact",
    title: "13. Contact",
    paragraphs: [
      `For questions about these Terms, reach out at ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      breadcrumb="Terms"
      heading={
        <>
          Terms of <span className="text-primary">Service</span>
        </>
      }
      intro="The rules for using The Hackathon Playbook. Plain English, no surprises."
      file="terms.txt"
      lastUpdated={LAST_UPDATED}
      jsonLd={webPageJsonLd}
      sections={SECTIONS}
    />
  );
}

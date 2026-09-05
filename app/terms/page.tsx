import type { Metadata } from "next";
import Link from "next/link";
import { Home, Mail, Scale, FileText } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const CONTACT_EMAIL = "billzhangsc@gmail.com";
const LAST_UPDATED = "September 3, 2026";

export const metadata: Metadata = {
  title: "Terms of Service — Hackathon Playbook",
  description:
    "Terms of Service for Hackathon Playbook. Review the rules for using the site, affiliate link disclosures, intellectual property, AI chat data handling, disclaimers, and California governing law.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service — Hackathon Playbook",
    description:
      "Terms of Service for Hackathon Playbook, including affiliate disclosures, intellectual property, and usage rules.",
    url: `${SITE_URL}/terms`,
  },
  twitter: {
    title: "Terms of Service — Hackathon Playbook",
    description:
      "The rules for using Hackathon Playbook, plus affiliate disclosures and disclaimers.",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  url: `${SITE_URL}/terms`,
  description:
    "Terms of Service for Hackathon Playbook, including affiliate disclosures, intellectual property rules, and California governing law.",
  isPartOf: {
    "@type": "WebSite",
    name: "Hackathon Playbook",
    url: SITE_URL,
  },
  dateModified: "2026-09-03",
};

type Section = {
  id: string;
  title: string;
  paragraphs: (string | string[])[];
};

const SECTIONS: Section[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing or using Hackathon Playbook (the website located at thehackathonplaybook.dev, together with any subdomains, hereafter the \"Site\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree with any part of these Terms, you should stop using the Site.",
      "These Terms form a binding agreement between you and Bill Zhang, the operator of the Site (\"we\", \"us\", or \"our\").",
    ],
  },
  {
    id: "about",
    title: "2. About the Site",
    paragraphs: [
      "Hackathon Playbook publishes educational content about hackathons, including strategy guides, templates, blog posts, and curated resources. The content is informational only. It is not legal, financial, career, or professional advice, and it is not a guarantee of any specific outcome at a hackathon or elsewhere.",
      "Your use of anything you read here is at your own discretion and risk.",
    ],
  },
  {
    id: "ip",
    title: "3. Intellectual Property",
    paragraphs: [
      "All content on the Site, including text, graphics, logos, icons, images, audio, video, code snippets, page layouts, and the compilation of all of the above, is the property of Bill Zhang or licensors and is protected by copyright, trademark, and other intellectual property laws.",
      "We grant you a limited, personal, non-exclusive, non-transferable, revocable license to access and view the content for your own personal, non-commercial use. You may also share short quotes or excerpts with proper attribution and a link back to the Site.",
      "You may not reproduce, republish, sell, license, or redistribute significant portions of the content, create derivative works from it, or use it to train machine learning models, without prior written permission.",
    ],
  },
  {
    id: "conduct",
    title: "4. User Conduct",
    paragraphs: [
      "When using the Site, you agree not to:",
      [
        "Scrape, crawl, or bulk-download the Site using automated tools, except for compliant search-engine indexing.",
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
      "To the maximum extent permitted by law, in no event will Bill Zhang, Hackathon Playbook, or any affiliated parties be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, data, goodwill, or other intangible losses, arising out of or in connection with your use of (or inability to use) the Site, even if we have been advised of the possibility of such damages.",
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
      "We do record them. When you use either feature, we store the messages you send, the answer the model returns, which pages of the Site were retrieved as context, the model used, token counts, timings, and whether the request succeeded. That record is kept in our own tracing system and is used to find weak answers, close gaps in the content, and improve the assistant.",
      "Each conversation carries a random identifier created in your browser tab and discarded when that tab closes, so the turns of one conversation can be read together. It is not tied to your name, your email, or any account, and we do not try to identify you from it.",
      "If you rate an answer with the thumbs up or thumbs down button, we record that rating against the answer it refers to.",
      "Because conversations are stored, please do not paste passwords, API keys, personal information, or anything confidential into the chat. It is a public educational assistant, not a private channel.",
      "We do not sell this data and we do not share it with advertisers. To have a conversation deleted, email the address below.",
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
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-10">
      <JsonLd data={webPageJsonLd} />

      <nav className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
        >
          <Home className="size-3" />
          Home
        </Link>
        <span className="font-code text-xs text-muted-foreground/40">/</span>
        <span className="font-code text-xs text-foreground">Terms</span>
      </nav>

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-code text-[10px] uppercase tracking-widest text-primary">
          <Scale className="size-3" />
          Legal
        </div>
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Terms of <span className="text-primary">Service</span>
        </h1>
        <p className="font-body text-muted-foreground">
          The rules for using Hackathon Playbook. Plain English, no surprises.
        </p>
        <p className="font-code text-xs text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <section className="glass glow rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 border-b border-primary/10 px-5 py-3">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-spark/70" />
          <span className="size-3 rounded-full bg-success/70" />
          <span className="ml-3 font-code text-xs text-muted-foreground">
            bill@hackathons ~ % cat ./terms.txt
          </span>
        </div>

        <div className="space-y-10 p-6 md:p-10">
          <nav aria-label="Table of contents" className="space-y-3">
            <p className="font-code text-sm text-muted-foreground">
              <span className="text-volt">$</span> ls ./sections
            </p>
            <ol className="grid grid-cols-1 gap-x-6 gap-y-1.5 font-code text-xs text-muted-foreground sm:grid-cols-2">
              {SECTIONS.map((s) => (
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
            {SECTIONS.map((section) => (
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
              Effective as of {LAST_UPDATED}
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

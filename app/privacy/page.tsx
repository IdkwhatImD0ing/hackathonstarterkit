import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";
import { shareMetadata } from "@/lib/metadata";

const LAST_UPDATED = "September 14, 2026";

const DESCRIPTION =
  "Privacy Policy for The Hackathon Playbook: what the site collects through analytics, the newsletter, and AI chat, which services receive it, and your choices.";

export const metadata: Metadata = {
  // The layout template appends " | The Hackathon Playbook".
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  ...shareMetadata({
    path: "/privacy",
    title: `Privacy Policy — ${SITE_NAME}`,
    description: DESCRIPTION,
  }),
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: `${SITE_URL}/privacy`,
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
    id: "who-we-are",
    title: "1. Who We Are",
    paragraphs: [
      "The Hackathon Playbook (the website at thehackathonplaybook.dev, the \"Site\") is run by Bill Zhang (\"we\", \"us\", or \"our\"). This policy explains what the Site collects, why, which services receive it, and what choices you have.",
      "The short version:",
      [
        "There are no accounts or logins, and we add no ad trackers of our own.",
        "We use analytics to see which pages people read and how far they get.",
        "If you subscribe to the newsletter, we get your email address.",
        "If you use the AI chat or the prompt finder, we keep what you type so we can improve the answers. Please don't paste anything private.",
        "We do not sell your data, and we do not share it with advertisers.",
      ],
      <>
        This policy works alongside our{" "}
        <Link href="/terms" className="text-volt underline underline-offset-2">
          Terms of Service
        </Link>
        . For any question or request about your data, email {CONTACT_EMAIL}.
      </>,
    ],
  },
  {
    id: "analytics",
    title: "2. Analytics",
    paragraphs: [
      "We use two analytics tools to learn how the Site is used, so we can fix what is confusing and write more of what is useful.",
      "Vercel Web Analytics counts page views, so we can see which pages are popular.",
      "PostHog records how people use the Site. It captures:",
      [
        "Each page you view, and when you leave it.",
        "Clicks on links and buttons, and form submissions. These click records leave out what you type into text fields.",
        "On blog posts, how far you scroll, which sections you reach, and how long you spend reading.",
        "Standard details PostHog adds to every event: the page address, the site that sent you here, and your browser, operating system, device type, and screen size.",
      ],
      "PostHog gives your browser a random ID so it can tell repeat visits apart. We never give PostHog your name or email address, and we do not build a profile of who you are. PostHog also receives your IP address as part of each request, as any web service does.",
      "PostHog also records session replays, which are playbacks of how a page was scrolled and clicked, including the text shown on the page and the page's technical console messages. They help us find the spots where readers get stuck. Anything you type into a form field is masked in replays, and the AI chat window is left out of them entirely.",
    ],
  },
  {
    id: "newsletter",
    title: "3. Newsletter",
    paragraphs: [
      "If you subscribe, the form sends us your email address and the address of the page you signed up on. We pass both to Beehiiv, the service that sends the newsletter, with a tag noting the signup came from the Site.",
      "Beehiiv then emails you a confirmation link. You are only subscribed once you click it.",
      "To stop spam signups, the form also counts attempts from each IP address and each email address over one hour. Those counts stay in our server's memory and are never sent to Beehiiv.",
      "You can unsubscribe at any time with the link in any newsletter email.",
    ],
  },
  {
    id: "ai-chat",
    title: "4. AI Chat and Prompt Finder",
    paragraphs: [
      "The Site has an AI assistant (\"Ask the Playbook\") and, on the cheat sheet, an AI prompt finder. Here is what happens when you use them.",
      "What you send: for the chat, the recent conversation (up to the last 10 messages). For the prompt finder, the one sentence you type. If you open the chat from a page's Ask the Playbook option, it also sends that page's address so the answer can focus on it.",
      "OpenAI writes the answers. It receives your messages, the parts of the Site that match your question, and our instructions to the model. We send these requests with OpenAI's response storage turned off. To find the matching parts of the Site, your last few chat questions may also be sent to OpenAI's embeddings service. OpenAI's own API data policies apply to everything it receives.",
      "We keep a record of each request in FireTrace, the tracing service we use to review AI answers. A record holds your messages, the answer, which pages of the Site were used as sources, the model, token counts, estimated cost, timings, and whether the request succeeded. For the chat, it also holds the page you opened it from (if any) and a random conversation ID. It does not include your IP address, and it is not linked to your name, email, or any account.",
      "We use these records to find weak answers, fill gaps in the content, and improve the assistant.",
      "The conversation ID is created in your browser tab and groups the turns of one conversation together. It is not tied to your name, email, or any account. Closing the tab or clicking Clear conversation discards it, and your next conversation gets a new one.",
      "If you rate an answer with the thumbs up or thumbs down button, we add that rating to the answer's record in FireTrace.",
      "Your conversation is also saved in your browser tab so it survives moving between pages. It is deleted when you close the tab or click Clear conversation.",
      "Because conversations are stored, please do not paste passwords, API keys, personal information, or anything confidential into the chat.",
    ],
  },
  {
    id: "agents",
    title: "5. AI Agents and the MCP Server",
    paragraphs: [
      "AI tools can search the Site through our public MCP server (a standard way for AI agents to use outside tools). If your browser has built-in agent support, the Site offers it some of the same tools. When an agent searches, the search text may be sent to OpenAI's embeddings service to find matching sections.",
      "We do not store those searches, and they are not sent to FireTrace. Agents that use the chat directly are handled the same way as the AI chat above.",
    ],
  },
  {
    id: "rate-limiting",
    title: "6. Rate Limiting and Security",
    paragraphs: [
      "To keep the AI features and the MCP server from being abused, we count requests from each IP address over a rolling 10-minute window. The chat, answer ratings, the prompt finder, and the MCP server each have their own limit.",
      "Those counts are stored in Upstash, a hosted Redis database, under a key that contains your IP address. Each key deletes itself 10 minutes after your last counted request. If Upstash cannot be reached, the count is kept in our server's memory instead, which is cleared when the server restarts.",
      "Upstash also holds running totals of AI tokens used across the whole Site each day and each month. Those totals contain no personal data.",
      "The newsletter form keeps its own anti-spam counts, described in the Newsletter section above.",
    ],
  },
  {
    id: "hosting",
    title: "7. Hosting and Server Logs",
    paragraphs: [
      "The Site is hosted on Vercel. Like any web host, Vercel receives your IP address, your browser details, and the address of each page you request, because that is how pages get delivered. Vercel keeps its own logs to run and secure its platform.",
      "Our own server code adds only operational messages to those logs, such as token counts for AI requests and error details when something fails. It does not log your chat messages.",
    ],
  },
  {
    id: "services",
    title: "8. Services That Receive Data",
    paragraphs: [
      "These services receive data from the Site. Each one has its own privacy policy.",
      [
        "Vercel: hosts the Site and runs Vercel Web Analytics. Receives every request you make, including your IP address.",
        "PostHog (US cloud): product analytics and session replays. Receives the events and replays described in the Analytics section, your browser's random ID, and your IP address.",
        "Beehiiv: sends the newsletter. Receives your email address and the page you signed up on, only if you subscribe.",
        "OpenAI: writes the AI chat and prompt finder answers and matches searches to Site content. Receives what you type into those features, the Site content used to answer, and search text from the MCP server.",
        "FireTrace (tracing.art3m1s.me): stores the AI request records and ratings described in the AI Chat section. Records are sent from our servers, not your browser, and do not include your IP address.",
        "Upstash: stores the short-lived rate-limit counts keyed by IP address, and the Site's daily and monthly token totals.",
        "YouTube (Google): some pages embed YouTube videos. When one loads, your browser connects to YouTube, which may set cookies and collect data under Google's privacy policy.",
      ],
      "Links to other sites, including affiliate links, take you to services with their own privacy policies.",
    ],
  },
  {
    id: "cookies",
    title: "9. Cookies and Browser Storage",
    paragraphs: [
      "We do not set advertising cookies. Here is what the Site stores in your browser:",
      [
        "PostHog: a cookie named ph_<project>_posthog, plus matching browser storage entries, holding your random analytics ID and session details. The cookie lasts up to one year.",
        "AI chat: two session storage entries, playbook-chat (your conversation) and playbook-chat-session (the conversation ID). Both are deleted when you close the tab.",
        "Interactive tools: the idea-combining game on the Ideation page and the Assemble Your Go Bag tool on the Validation page save your progress in local storage so it is still there next time. Our code never sends that data anywhere.",
        "YouTube: when an embedded video loads, YouTube may set its own cookies.",
      ],
    ],
  },
  {
    id: "retention",
    title: "10. How Long We Keep Data",
    paragraphs: [
      [
        "Rate-limit counts in Upstash: deleted automatically 10 minutes after your last counted request.",
        "Newsletter anti-spam counts: reset after one hour, and held only in server memory.",
        "Chat history in your browser: until you close the tab or clear the conversation.",
        "PostHog cookie: up to one year.",
        "PostHog analytics events: kept as long as they help us improve the Site.",
        "AI request records in FireTrace: kept as long as they help us improve the assistant, and deleted on request.",
        "Newsletter email address: kept while you are subscribed, and deleted on request.",
        "Vercel's platform logs: kept by Vercel under its own retention rules.",
      ],
      "Anything else is kept only as long as needed to run the Site, and deleted on request.",
    ],
  },
  {
    id: "choices",
    title: "11. Your Choices and Rights",
    paragraphs: [
      [
        "Block analytics: use a tracker blocker or your browser's privacy settings, or clear the PostHog cookie. The Site works without analytics.",
        "Unsubscribe from the newsletter with the link in any newsletter email.",
        "Skip the AI chat: the rest of the Site works without it. Clear conversation deletes the copy stored in your browser.",
        "Limit YouTube: block third-party cookies in your browser.",
        "Ask us: email us to see, correct, or delete data we hold about you, including a chat conversation or your newsletter subscription. For a chat conversation, tell us roughly when you asked and what you asked so we can find it.",
      ],
      "We do not currently respond to Do Not Track or Global Privacy Control browser signals.",
    ],
  },
  {
    id: "children",
    title: "12. Children",
    paragraphs: [
      "The Site is not directed at children under 13, and we do not knowingly collect personal information from them. If you think a child under 13 has given us personal information, for example by subscribing to the newsletter, email us and we will delete it.",
    ],
  },
  {
    id: "changes",
    title: "13. Changes to This Policy",
    paragraphs: [
      "We may update this policy as the Site changes. When we do, we will revise the \"Last updated\" date at the top of this page. For significant changes, we may also post a notice on the Site.",
    ],
  },
  {
    id: "contact",
    title: "14. Contact",
    paragraphs: [
      `For questions or requests about this policy or your data, email ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      breadcrumb="Privacy"
      heading={
        <>
          Privacy <span className="text-primary">Policy</span>
        </>
      }
      intro="What The Hackathon Playbook collects, why, and where it goes. Plain English, no surprises."
      file="privacy.txt"
      lastUpdated={LAST_UPDATED}
      jsonLd={webPageJsonLd}
      sections={SECTIONS}
    />
  );
}

import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-pitch-guide",
  title:
    "Hackathon Pitch Guide: How to Present Your Project and Win Prizes",
  description:
    "Master the art of hackathon pitching. Learn pitch structure, storytelling techniques, demo best practices, and how to handle judge Q&A. Includes templates from 36+ winning presentations.",
  date: "2026-04-10",
  readingTime: "8 min read",
  keywords: [
    "hackathon pitch guide",
    "how to pitch at a hackathon",
    "hackathon presentation tips",
    "hackathon demo tips",
    "hackathon pitch template",
  ],
  content: [
    {
      heading: "Why the Pitch Matters More Than the Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "At most hackathons, judges spend 3-5 minutes with each team. That's 3-5 minutes to understand what you built, why it matters, and how it works. A great project with a weak pitch will lose to a good project with a great pitch every single time." },
        { type: "stat-row", stats: [
          { value: "3-5 min", label: "Per Team" },
          { value: "50+", label: "Projects Judged" },
          { value: "30 sec", label: "To Hook Them" },
          { value: "36+", label: "Tested Pitches" },
        ]},
        { type: "callout", variant: "info", text: "I've seen teams with technically inferior projects win because their pitch was captivating. The pitch is your project's marketing; it determines whether judges remember you when they're deliberating." },
      ],
    },
    {
      heading: "The 30-Second Hook",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "You have about 30 seconds before a judge decides whether they're interested. Open with the problem, not the solution. Make the judge feel the pain point." },
        { type: "quote", text: "Every year, 240 million 911 calls are made in the US, and dispatchers have to manually prioritize them while people are dying on the line.", attribution: "Example hook from a winning pitch" },
        { type: "pro-con", pros: [
          "Lead with a startling statistic",
          "Open with a personal story",
          "Describe the problem vividly",
          "Make the judge feel the pain point",
        ], cons: [
          "Opening with your team name",
          "Starting with your tech stack",
          "A long backstory before the point",
          "Jumping straight to the solution",
        ]},
      ],
    },
    {
      heading: "The Demo: Show, Don't Tell",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Always do a live demo when possible. Slides are for backup only. Walk through your product as if you're a user encountering it for the first time. Show the most impressive feature first, not last." },
        { type: "callout", variant: "warning", text: "Pre-load your demo with realistic data, not 'test123' and 'lorem ipsum'. If your app shows a dashboard, populate it with realistic numbers. If it processes text, use a real example. Small details like this make your project feel polished and real." },
      ],
    },
    {
      heading: "Pitch Structure That Wins",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "This structure has been tested across 36+ winning pitches. Total time: about 3 minutes." },
        { type: "step-list", steps: [
          { title: "Problem (30 seconds)", description: "Hook the judges with the pain point. Use a statistic, story, or vivid description." },
          { title: "Solution Demo (90 seconds)", description: "Show the product live. Walk through it as a user. Lead with the most impressive feature." },
          { title: "How It Works (30 seconds)", description: "High-level architecture only. 'We use Claude's API to analyze medical records in real-time.'" },
          { title: "Impact / What's Next (30 seconds)", description: "Why this matters. Who it helps. What you'd build with more time." },
        ]},
        { type: "callout", variant: "tip", text: "For the 'How It Works' section, keep it high-level. Say 'We use Claude's API to analyze medical records in real-time' rather than 'We built a Python FastAPI server that calls the Anthropic SDK with a custom prompt template.' Judges care about the what, not the implementation details." },
      ],
    },
    {
      heading: "Handling Judge Q&A",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Prepare answers for these common questions that judges ask at almost every hackathon:" },
        { type: "checklist", title: "Prepare Answers For", items: [
          "How does it scale?",
          "What's the business model?",
          "What were the technical challenges?",
          "How is this different from existing solutions?",
          "What would you build next with more time?",
        ]},
        { type: "quote", text: "In a production version, we would add X, but for this demo we focused on Y because it best demonstrates our core value.", attribution: "The perfect response to 'what's missing?'" },
        { type: "paragraph", text: "Be honest about limitations. Judges respect teams that acknowledge what isn't perfect rather than trying to oversell." },
      ],
    },
    {
      heading: "Presentation Tips and Common Mistakes",
      paragraphs: [],
      blocks: [
        { type: "pro-con", pros: [
          "Make eye contact with judges",
          "Speak clearly at a measured pace",
          "One person talks, another demos",
          "Focus entirely on what works",
        ], cons: [
          "Looking at your screen while talking",
          "Rushing through nervousness",
          "Switching speakers mid-pitch",
          "Apologizing for what you didn't finish",
        ]},
        { type: "callout", variant: "success", title: "Remember", text: "Never mention bugs or 'we ran out of time.' The judges don't know your original plan, so they can only judge what you show them. Focus on what's impressive." },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "The full 7-phase system covering everything from team formation to post-hackathon strategy.", href: "/blog/how-to-win-hackathons", tag: "Full Guide" },
      ],
    },
  ],
};

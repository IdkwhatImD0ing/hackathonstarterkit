import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-pitch-guide",
  title:
    "Hackathon Pitch Guide: How to Present Your Project and Win Prizes",
  description:
    "Master the hackathon pitch with a 3-minute structure from 36+ winning presentations: the hook, the demo, judge Q&A, and the mistakes that cost prizes.",
  date: "2026-04-10",
  updatedDate: "2026-06-24",
  readingTime: "3 min read",
  keywords: [
    "hackathon pitch guide",
    "how to pitch at a hackathon",
    "hackathon pitch template",
    "hackathon presentation tips",
    "hackathon demo tips",
  ],
  content: [
    {
      heading: "The 3-Minute Pitch Structure That Wins",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Steal this structure. It's been tested across **36+ winning pitches**, it runs about three minutes, and you can drop your project into it tonight." },
        { type: "step-list", steps: [
          { title: "Problem (30 seconds)", description: "Hook the judges with the pain point. Use a startling statistic, a personal story, or a vivid description. Make them feel it." },
          { title: "Solution demo (90 seconds)", description: "Show the product live. Walk through it as a user would. Lead with your most impressive feature, not the login screen." },
          { title: "How it works (30 seconds)", description: "High level only. 'We use Claude's API to analyze medical records in real time.' Stop there." },
          { title: "Impact and what's next (30 seconds)", description: "Why this matters, who it helps, what you'd build with more time." },
        ]},
        { type: "callout", variant: "info", text: "I've watched technically inferior projects win because the pitch was captivating. The pitch is your project's marketing. It decides whether judges remember you when they deliberate. The rest of this guide makes each section land." },
      ],
    },
    {
      heading: "Why the Pitch Beats the Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Judges spend three to five minutes with each team. That's the entire window to land what you built, why it matters, and how it works." },
        { type: "paragraph", text: "A great project with a weak pitch loses to a good project with a great pitch. Every time." },
        { type: "stat-row", stats: [
          { value: "3-5 min", label: "Per team" },
          { value: "50+", label: "Projects judged" },
          { value: "30 sec", label: "To hook them" },
          { value: "36+", label: "Tested pitches" },
        ]},
      ],
    },
    {
      heading: "Open With the Problem, Not the Solution",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "You get about **30 seconds** before a judge decides whether to care. Spend them on the pain, not your tech stack." },
        { type: "paragraph", text: "One winning opener I watched ran: **240 million 911 calls** are made in the US every year, and dispatchers prioritize them by hand while people are dying on the line. No team name, no tech stack, just the stakes." },
        { type: "pro-con", pros: [
          "Lead with a startling statistic",
          "Open with a personal story",
          "Describe the problem vividly",
          "Make the judge feel the pain",
        ], cons: [
          "Opening with your team name",
          "Starting with your tech stack",
          "A long backstory before the point",
          "Jumping straight to the solution",
        ]},
      ],
    },
    {
      heading: "Demo Live, and Always Record a Backup",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Demo live whenever you can. Slides are backup only. Get the **product on screen within 30 seconds**, walk through it like a first-time user, and show your best feature first." },
        { type: "callout", variant: "warning", text: "Pre-load realistic data, never 'test123' or 'lorem ipsum'. Populate the dashboard with believable numbers. Process a real example. These small details make the project feel polished and real." },
        { type: "paragraph", text: "Here's the catch: the Wi-Fi will fail, the API will rate-limit, the laptop will sleep. A pre-recorded video keeps the demo running when the live environment dies. Better still, it follows the judges into deliberation when you can't." },
        { type: "video", src: "https://www.youtube.com/embed/YsH_z1azXSA", title: "TalkTuahBank demo video, 1st Overall at HackUTD 2024", caption: "The product is on screen within 30 seconds and a real money transfer runs on camera. That's what a backup video should do.", credit: "Demo video by the TalkTuahBank team." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the recorder I use for hackathon demos",
          description: "Auto-zoom, cursor smoothing, and a webcam overlay are baked in. A 60-second demo looks like a product launch with almost no editing. Worth a look if you're on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "link-card", title: "More demo video examples", description: "Two real demo videos that turned hackathon work into outcomes, plus the recording stack behind them.", href: "/playbook/pitching", tag: "Playbook" },
      ],
    },
    {
      heading: "Win the Q&A by Naming Your Limits",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Judges ask the same handful of questions at nearly every hackathon. Prep the answers." },
        { type: "checklist", title: "Prepare answers for", items: [
          "How does it scale?",
          "What's the business model?",
          "What were the technical challenges?",
          "How is this different from existing solutions?",
          "What would you build next with more time?",
        ]},
        { type: "callout", variant: "tip", text: "The counterintuitive move: be honest about what's missing. When asked, say something like 'In a production version we'd add X, but for this demo we focused on Y because it best shows our core value.' Judges respect teams that name limits instead of overselling." },
      ],
    },
    {
      heading: "The Mistakes That Quietly Cost Prizes",
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
        { type: "callout", variant: "success", title: "Never say it", text: "Never mention bugs or 'we ran out of time.' Judges don't know your original plan, so they can only judge what you show them. Spend every second on what's impressive." },
        { type: "paragraph", text: "Run your structure end to end out loud at least once before you step up. The team that rehearsed always sounds calmer than the team that wrote better code." },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "The full 7-phase system, from team formation to post-hackathon strategy.", href: "/blog/how-to-win-hackathons", tag: "Full Guide" },
      ],
    },
  ],
};

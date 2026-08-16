import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "how-to-win-hackathons",
  title: "How to Win Hackathons: A Complete Guide from 36+ Victories",
  description:
    "How to win hackathons, from 36+ wins and $100K+ in prizes. The 7-phase system covering team, ideation, validation, execution, pitching, and submission.",
  date: "2026-04-01",
  updatedDate: "2026-06-24",
  readingTime: "5 min read",
  keywords: [
    "how to win hackathons",
    "hackathon winning strategies",
    "hackathon tips and tricks",
    "hackathon guide",
    "win hackathon prizes",
  ],
  content: [
    {
      heading: "Most Teams Lose on Strategy, Not Skill",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Winning a hackathon is a learnable skill. After 50+ hackathons and 36+ wins, I can tell you the teams that lose rarely lose on talent. They lose on **strategy**: too-ambitious ideas, skipped validation, features nobody sees in the demo, and a weak pitch." },
        { type: "stat-row", stats: [
          { value: "50+", label: "Hackathons" },
          { value: "36+", label: "Wins" },
          { value: "$100K+", label: "In Prizes" },
          { value: "7", label: "Phase System" },
        ]},
        { type: "paragraph", text: "Below is the exact 7-phase system that produced those results, from picking a team to following up after the awards. One phase quietly decides more wins than any other. I'll flag it when we get there." },
        { type: "callout", variant: "info", title: "This Isn't About Talent", text: "The teams that win most consistently aren't the most technically skilled. They're the most strategically disciplined. Every phase below compounds with the others." },
      ],
    },
    {
      heading: "Phase 1: Build a Team With Complementary Skills",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The ideal hackathon team is **3-4 people with different strengths**. Avoid a team where everyone codes the same things. The strongest teams at HackUTD, LA Hacks, and TreeHacks always cover a mix of abilities." },
        { type: "checklist", title: "Ideal Team Composition", items: [
          "Frontend developer who can build polished UIs fast",
          "Backend or full-stack developer for APIs and data",
          "Designer or UX-focused member for user experience",
          "Someone who excels at pitching and storytelling",
        ]},
        { type: "callout", variant: "tip", text: "Solo? Arrive early and network during team formation. Introduce yourself by what you're good at, not your major or job title." },
      ],
    },
    {
      heading: "Phase 2: Ideate Around the Judges, Not Yourself",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The biggest ideation mistake is building what excites **you** instead of what impresses **judges**. Read the judging criteria and sponsor challenges before you brainstorm, then build something that maps directly to them." },
        { type: "pro-con", pros: [
          "Study judging criteria before brainstorming",
          "Build around sponsor APIs and challenges",
          "Solve a real, relatable problem",
          "Use constraint-based ideation",
        ], cons: [
          "Building what excites only your team",
          "Ignoring sponsor challenges entirely",
          "Picking ideas that can't demo well",
          "Starting with a solution instead of a problem",
        ]},
        { type: "paragraph", text: "Try **constraint-based ideation**: list the available APIs, sponsor tools, and time you have, then brainstorm ideas that use at least 2-3 of them. The best projects solve a real problem with the exact tools sponsors want adopted." },
      ],
    },
    {
      heading: "Phase 3: Validate Before You Build (The One That Decides Wins)",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Here's the phase most teams skip and most winners don't. Spend the first **1-2 hours validating, not coding**. Confirm the APIs work, the scope fits the clock, and a similar project hasn't already won here." },
        { type: "step-list", steps: [
          { title: "Test Your APIs", description: "Make a quick call to every external service you plan to use. Confirm rate limits, auth, and data format." },
          { title: "Scope the MVP", description: "List the minimum features needed for a compelling demo. Cut everything else ruthlessly." },
          { title: "Check for Prior Art", description: "Search Devpost for this hackathon's past winners. Avoid ideas that already won." },
          { title: "Draw the Architecture", description: "Sketch how the components connect, then divide tasks among the team." },
        ]},
        { type: "callout", variant: "success", text: "This phase saves hours of wasted effort and is the single biggest differentiator between winning and losing teams." },
      ],
    },
    {
      heading: "Phase 4: Execute With an MVP Mindset",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Build the minimum viable **demo**, not the minimum viable product. Focus on the 2-3 features that make judges say 'wow' during your pitch. Everything else is noise." },
        { type: "callout", variant: "warning", text: "A hackathon is not the time to learn a new framework. Use stacks your team already knows. Speed of execution beats technical novelty every time." },
        { type: "paragraph", text: "**Next.js, React, Python with FastAPI, and Firebase or Supabase** stay popular because they ship fast with polished results." },
        { type: "link-card", title: "Best Tech Stack for Hackathons in 2026", description: "A complete breakdown of the tools and frameworks winning teams actually use.", href: "/blog/best-tech-stack-for-hackathons", tag: "Related Guide" },
      ],
    },
    {
      heading: "Phase 5: Win the Pitch in the First 30 Seconds",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Judges see 50+ demos in a day. You have about **30 seconds** before they tune out. Lead with the problem, show a live demo immediately (not slides), and end with impact." },
        { type: "paragraph", text: "The only pitch structure you need: **here's the problem, here's how we solve it, here's why it matters**. Practice it at least 3 times, time it, and cut anything that isn't essential." },
        { type: "link-card", title: "Hackathon Pitch Guide: Full Deep Dive", description: "Master pitch structure, storytelling, demo best practices, and judge Q&A handling.", href: "/blog/hackathon-pitch-guide", tag: "Related Guide" },
      ],
    },
    {
      heading: "Phase 6: Submit Like a Pro",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Your Devpost submission and README matter as much as your code. Judges often read them **before** they see your demo. Lead with what the project does, not how you built it." },
        { type: "checklist", title: "Submission Checklist", items: [
          "Compelling project description (problem-first, not tech-first)",
          "60-90 second demo video with screen recording and voiceover",
          "Screenshots showing key features",
          "Architecture diagram in README",
          "List of technologies and APIs used",
          "Team member roles and contributions",
        ]},
        { type: "callout", variant: "tip", text: "A polished submission often decides whether judges even visit your table. It can be the difference between winning and not being considered." },
        { type: "paragraph", text: "Here's what a winning demo actually looks like. **TalkTuahBank took 1st Overall at HackUTD 2024**, the largest 24-hour hackathon in the US. The product is on screen inside the first 30 seconds, and a real money transfer runs on camera." },
        { type: "video", src: "https://www.youtube.com/embed/YsH_z1azXSA", title: "TalkTuahBank demo video, 1st Overall at HackUTD 2024", caption: "A 2-minute demo that wins: open with the problem, show the product working end to end, end with the impact.", credit: "Demo video by the TalkTuahBank team." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the screen recorder I use for hackathon demos",
          description: "Auto-zoom, cursor smoothing, webcam overlay, and export presets that just work. Basically no editing time. Worth a look if you are on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "link-card", title: "Hackathon Submission Playbook", description: "Demo video examples, README templates, and the recording stack used by 36+ winning teams.", href: "/playbook/submission", tag: "Full Playbook" },
      ],
    },
    {
      heading: "Phase 7: The Win Is in the Follow-Up",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The hackathon doesn't end when prizes are announced. The best outcomes happen in the next 48 hours. **Dispatch AI won the Grand Prize at the UC Berkeley AI Hackathon 2024**, worth about $64K across prizes: a $25K Berkeley SkyDeck Fund investment with a Golden Ticket to SkyDeck Pad-13, $25K for AI For Good, and roughly $14K of hardware for first place in Best Use of Intel AI (devpost.com/software/dispatch-ai)." },
        { type: "step-list", steps: [
          { title: "Follow Up Fast", description: "Email sponsors and mentors within 48 hours, while they still remember you." },
          { title: "Polish & Publish", description: "Clean up your code, write a proper README, and push to GitHub." },
          { title: "Share Your Story", description: "Write a blog post or tweet thread about your experience and learnings." },
          { title: "Keep Building", description: "The best projects become startups, open-source tools, or portfolio centerpieces." },
        ]},
        { type: "callout", variant: "success", title: "Your Next Move", text: "Pick one phase you usually skip (for most people it's validation) and commit to it at your next event. That single change moves more teams onto the podium than any new framework." },
        { type: "link-card", title: "The Post-Hackathon Playbook", description: "Turn one weekend project into funding, a portfolio piece, or your next startup.", href: "/playbook/post-hackathon", tag: "Full Playbook" },
      ],
    },
  ],
};

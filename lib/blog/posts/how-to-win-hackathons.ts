import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "how-to-win-hackathons",
  title: "How to Win Hackathons: A Complete Guide from 36+ Victories",
  description:
    "Battle-tested strategies from 36+ hackathon wins and $100K+ in prizes. Learn the 7-phase system for hackathon success covering team formation, ideation, execution, pitching, and more.",
  date: "2026-04-01",
  readingTime: "12 min read",
  keywords: [
    "how to win hackathons",
    "hackathon winning strategies",
    "hackathon tips and tricks",
    "hackathon guide",
    "win hackathon prizes",
  ],
  content: [
    {
      heading: "Why Most Hackathon Teams Lose",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "After competing in over 50 hackathons and winning 36+ times, I've noticed a clear pattern: most teams lose not because of technical skill, but because of strategic mistakes. They pick ideas that are too ambitious, skip validation, spend too long on features nobody sees, or deliver a weak pitch." },
        { type: "stat-row", stats: [
          { value: "50+", label: "Hackathons" },
          { value: "36+", label: "Wins" },
          { value: "$100K+", label: "In Prizes" },
          { value: "7", label: "Phase System" },
        ]},
        { type: "paragraph", text: "Winning hackathons is a learnable skill. It requires a systematic approach that balances creativity with pragmatism, and technical execution with storytelling. This guide breaks down the exact system that has produced those results." },
        { type: "callout", variant: "info", title: "This Isn't About Talent", text: "The teams that win most consistently aren't the most technically skilled. They're the most strategically disciplined. Every section below is a force multiplier that compounds with the others." },
      ],
    },
    {
      heading: "Phase 1: Build the Right Team",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The ideal hackathon team has 3-4 members with complementary skills. Avoid teams where everyone has the same skillset. The strongest teams at major hackathons like HackUTD, LA Hacks, and TreeHacks always have diverse abilities." },
        { type: "checklist", title: "Ideal Team Composition", items: [
          "Frontend developer who can build polished UIs quickly",
          "Backend or full-stack developer for APIs and data",
          "Designer or UX-focused member for user experience",
          "Someone who excels at pitching and storytelling",
        ]},
        { type: "callout", variant: "tip", text: "If you're attending solo, arrive early and network during team formation sessions. Introduce yourself by what you're good at, not just your major or job title." },
      ],
    },
    {
      heading: "Phase 2: Ideate Around the Judges",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The biggest mistake in hackathon ideation is building what excites you rather than what impresses judges. Study the judging criteria and sponsor challenges before brainstorming. Build something that clearly maps to what they're looking for." },
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
        { type: "paragraph", text: "Use constraint-based ideation: list the available APIs, sponsor tools, and time constraints, then brainstorm ideas that leverage at least 2-3 of these. The best hackathon projects solve a real problem using the specific tools sponsors want to see adopted." },
      ],
    },
    {
      heading: "Phase 3: Validate Before You Build",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Spend the first 1-2 hours validating your idea, not coding. Check that the APIs you need actually work, that your scope fits the timeline, and that similar projects haven't already won at this hackathon." },
        { type: "step-list", steps: [
          { title: "Test Your APIs", description: "Make a quick API call to every external service you plan to use. Confirm rate limits, auth, and data format." },
          { title: "Scope the MVP", description: "List the minimum features needed for a compelling demo. Cut everything else ruthlessly." },
          { title: "Check for Prior Art", description: "Search Devpost for the hackathon's past winners. Avoid ideas that have already won." },
          { title: "Draw the Architecture", description: "Sketch a simple diagram of how components connect. Divide tasks among team members." },
        ]},
        { type: "callout", variant: "success", text: "This validation phase saves hours of wasted effort later and is the single biggest differentiator between winning and losing teams." },
      ],
    },
    {
      heading: "Phase 4: Execute with an MVP Mindset",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Build the minimum viable demo, not the minimum viable product. Focus on the 2-3 features that will make judges say 'wow' during your pitch. Everything else is noise." },
        { type: "callout", variant: "warning", text: "Hackathons are not the time to learn a new framework. Use proven tech stacks that your team already knows. Speed of execution always beats technical novelty." },
        { type: "paragraph", text: "Next.js, React, Python with FastAPI, and Firebase/Supabase are popular choices because they enable rapid development with polished results." },
        { type: "link-card", title: "Best Tech Stack for Hackathons in 2026", description: "A complete breakdown of the tools and frameworks winning teams actually use.", href: "/blog/best-tech-stack-for-hackathons", tag: "Related Guide" },
      ],
    },
    {
      heading: "Phase 5: Craft a Pitch That Wins in 30 Seconds",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Judges see 50+ demos in a day. You have about 30 seconds to hook them before they mentally move on. Lead with the problem, show the solution immediately with a live demo (not slides), and end with impact." },
        { type: "quote", text: "Here's the problem, here's how we solve it, and here's why it matters.", attribution: "The only pitch structure you need" },
        { type: "paragraph", text: "Practice your pitch at least 3 times before presenting. Time it. Cut anything that isn't essential." },
        { type: "link-card", title: "Hackathon Pitch Guide: Full Deep Dive", description: "Master pitch structure, storytelling, demo best practices, and judge Q&A handling.", href: "/blog/hackathon-pitch-guide", tag: "Related Guide" },
      ],
    },
    {
      heading: "Phase 6: Submit Like a Pro",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Your Devpost submission and README are just as important as your code. Judges often review submissions before seeing demos. Write a compelling project description that leads with what the project does, not how it was built." },
        { type: "checklist", title: "Submission Checklist", items: [
          "Compelling project description (problem-first, not tech-first)",
          "2-3 minute demo video with screen recording and voiceover",
          "Screenshots showing key features",
          "Architecture diagram in README",
          "List of technologies and APIs used",
          "Team member roles and contributions",
        ]},
        { type: "callout", variant: "tip", text: "These materials often determine whether judges visit your table. A polished Devpost submission can be the difference between winning and not even being considered." },
      ],
    },
    {
      heading: "Phase 7: The Post-Hackathon Edge",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The hackathon doesn't end when prizes are announced. Follow up with sponsors and mentors within 48 hours. Polish your project and add it to your portfolio. Write a blog post or tweet thread about your experience." },
        { type: "quote", text: "Dispatch AI, which won the UC Berkeley AI Hackathon Grand Prize ($60K+), went on to receive Berkeley SkyDeck funding and reach a $1M valuation.", attribution: "Real hackathon success story" },
        { type: "step-list", steps: [
          { title: "Follow Up Fast", description: "Email sponsors and mentors within 48 hours while they still remember you." },
          { title: "Polish & Publish", description: "Clean up your code, write a proper README, and push to GitHub." },
          { title: "Share Your Story", description: "Write a blog post or tweet thread about your experience and learnings." },
          { title: "Keep Building", description: "The best hackathon projects become startups, open-source tools, or portfolio centerpieces." },
        ]},
      ],
    },
  ],
};

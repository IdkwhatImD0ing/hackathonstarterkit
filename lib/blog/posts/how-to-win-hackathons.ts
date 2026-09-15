import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "how-to-win-hackathons",
  title: "How to Win Hackathons: A Complete Guide from 36+ Victories",
  description:
    "How to win hackathons, in the seven phases I learned across 50+ events and 36+ wins: from picking your team to following up with people after judging ends.",
  date: "2026-04-01",
  updatedDate: "2026-09-14",
  readingTime: "4 min read",
  keywords: [
    "how to win hackathons",
    "hackathon winning strategies",
    "hackathon tips and tricks",
    "hackathon guide",
    "win hackathon prizes",
  ],
  content: [
    {
      heading: "What Losing Teams Get Wrong",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Winning a hackathon is a learnable skill. After 50+ hackathons and 36+ wins, the teams I've seen lose usually made one of four mistakes: an idea too big for the clock, no validation, features that never show up in the demo, or a weak pitch." },
        { type: "stat-row", stats: [
          { value: "50+", label: "Hackathons" },
          { value: "36+", label: "Wins" },
          { value: "$100K+", label: "In Prizes" },
          { value: "7", label: "Phase System" },
        ]},
      ],
    },
    {
      heading: "Phase 1: Build a Team With Complementary Skills",
      paragraphs: [],
      blocks: [
        // [NEEDS SPECIFIC: how the TalkTuahBank or Dispatch AI team split the work. It would replace the cut claim about "the strongest teams at HackUTD, LA Hacks, and TreeHacks."]
        { type: "paragraph", text: "Aim for **3-4 people** who between them cover these four roles." },
        { type: "checklist", title: "Ideal Team Composition", items: [
          "Frontend developer who builds polished UIs fast",
          "Backend or full-stack developer for APIs and data",
          "Designer or UX-focused member",
          "Someone who's good at pitching and storytelling",
        ]},
        { type: "callout", variant: "tip", text: "Solo? Arrive early for team formation. Introduce yourself by what you're good at, not your major or job title." },
      ],
    },
    {
      heading: "Phase 2: Ideate Around the Judging Criteria",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Read the judging criteria and sponsor challenges before you brainstorm, and pick a real problem you can show working in a demo. If you're going for the win, pick it before the event starts so the first hours go to validation." },
        { type: "paragraph", text: "Try **constraint-based ideation**: list the APIs, sponsor tools, and time you have, then brainstorm ideas that use at least 2-3 of them. Dispatch AI came from two combinations in a row. An LLM plus the Twilio API gave us an AI that answers phone calls, and pointing that at public safety made it an AI 911 dispatcher." },
      ],
    },
    {
      heading: "Phase 3: Validate Before You Build",
      paragraphs: [],
      blocks: [
        // [NEEDS SPECIFIC: a hackathon where testing an API in the first hours saved you, or where skipping it cost you.]
        { type: "paragraph", text: "Before anyone writes feature code, spend **1-2 hours** on these four checks." },
        { type: "step-list", steps: [
          { title: "Test Your APIs", description: "Call every external service you plan to use. Check rate limits, auth, and data format." },
          { title: "Scope the MVP", description: "List the minimum features the demo needs. Cut the rest." },
          { title: "Check for Prior Art", description: "Search Devpost for this hackathon's past winners, and skip ideas that already won." },
          { title: "Draw the Architecture", description: "Sketch how the pieces connect, then split the tasks." },
        ]},
      ],
    },
    {
      heading: "Phase 4: Execute With an MVP Mindset",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Build the minimum viable **demo** first: the 2-3 features you'll show judges in the pitch. My default stack for that is **Next.js, Python with FastAPI, and Supabase or Firebase**." },
        { type: "callout", variant: "warning", text: "If you're going for the win, use a stack your team already knows, and save new frameworks for a hackathon where learning is the goal." },
        { type: "link-card", title: "Best Tech Stack for Hackathons in 2026", description: "My default stack, and when to swap parts of it.", href: "/blog/best-tech-stack-for-hackathons", tag: "Related Guide" },
      ],
    },
    {
      heading: "Phase 5: Pitch Short and Leave Time for Questions",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "When I judged at LA Hacks, each team got five minutes, about 1.5 to pitch and 3.5 for questions, and some teams pitched for all five. Questions are where a judge fills in the rubric categories your pitch missed. Slot lengths vary, so ask about yours." },
        { type: "paragraph", text: "Open with the problem, then show **the product live** instead of on slides. Before you walk up, time at least one full run out loud and mark where you'll stop to leave room for questions." },
        { type: "link-card", title: "Hackathon Pitch Guide: Full Deep Dive", description: "Pitch structure, the live demo, and judge Q&A.", href: "/blog/hackathon-pitch-guide", tag: "Related Guide" },
      ],
    },
    {
      heading: "Phase 6: Polish the Devpost and Demo Video",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Judges revisit submissions during deliberation, after you've left the table, so the Devpost has to explain the project without you." },
        { type: "checklist", title: "Submission Checklist", items: [
          "A project description that starts with the problem",
          "60-90 second demo video with screen recording and voiceover",
          "Screenshots showing key features",
          "Architecture diagram in README",
          "List of technologies and APIs used",
          "Team member roles and contributions",
        ]},
        { type: "paragraph", text: "Here's our TalkTuahBank demo from **HackUTD 2024, where we took 1st Overall**. It runs about two minutes, a bit over that target. Watch how early the product shows up and the $200 transfer that happens live on camera." },
        { type: "video", src: "https://www.youtube.com/embed/YsH_z1azXSA", title: "TalkTuahBank demo video, 1st Overall at HackUTD 2024", credit: "Demo video by the TalkTuahBank team." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the screen recorder I use for hackathon demos",
          description: "Auto-zoom, cursor smoothing, webcam overlay, and export presets that just work. Basically no editing time. Worth a look if you're on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "link-card", title: "Hackathon Submission Playbook", description: "Demo video examples, README templates, and the recording setup I use.", href: "/playbook/submission", tag: "Full Playbook" },
      ],
    },
    {
      heading: "Phase 7: Follow Up Within 48 Hours",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Email the sponsors and mentors you met within 48 hours, while they still remember you. Push the code to GitHub with a real README, and post about what you built. That post is how I got my first internship: a LinkedIn post about our LA Hacks 2023 project, which didn't win." },
        { type: "paragraph", text: "Some projects keep going after the weekend. We won the **Grand Prize at the UC Berkeley AI Hackathon 2024** with Dispatch AI, worth about $64K across prizes: a $25K Berkeley SkyDeck Fund investment with a Golden Ticket to SkyDeck Pad-13, $25K for AI For Good, and roughly $14K of hardware for first place in Best Use of Intel AI (devpost.com/software/dispatch-ai). We kept building it, and it's now a company I co-founded." },
        { type: "link-card", title: "The Post-Hackathon Playbook", description: "What to post, who to message, and when.", href: "/playbook/post-hackathon", tag: "Full Playbook" },
      ],
    },
  ],
};

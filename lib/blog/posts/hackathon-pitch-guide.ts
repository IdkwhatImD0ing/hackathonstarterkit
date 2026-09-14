import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-pitch-guide",
  title:
    "Hackathon Pitch Guide: How to Present Your Project and Win Prizes",
  description:
    "A hackathon pitch guide with one 3-minute structure: problem, live demo, how it works, and impact. Plus Q&A prep, and how to cut it down for a shorter slot.",
  date: "2026-04-10",
  updatedDate: "2026-09-14",
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
      heading: "A 3-Minute Pitch Structure",
      paragraphs: [],
      blocks: [
        // [CONFIRM: did your 36+ winning pitches use this problem, demo, how, impact structure? "It's been tested across 36+ winning pitches" was softened to "the structure I use."]
        // [NEEDS SPECIFIC: which hackathon, and what did the winning pitch do that the stronger project's didn't?]
        { type: "paragraph", text: "I've watched technically weaker projects win because their pitch was better. This is the structure I use. It runs about three minutes, and you can drop your project into it tonight." },
        { type: "step-list", steps: [
          { title: "Problem (30 seconds)", description: "State the pain point before you say anything about your product." },
          { title: "Solution demo (90 seconds)", description: "Show the product live and walk through it as a user would. Lead with your most impressive feature, not the login screen." },
          { title: "How it works (30 seconds)", description: "High level only. 'We use Claude's API to analyze medical records in real time.' Stop there." },
          { title: "Impact and what's next (30 seconds)", description: "Who it helps, and what you'd build with more time." },
        ]},
      ],
    },
    {
      heading: "Fit the Structure to Your Slot",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "When I judged at LA Hacks, each team had five minutes, and about 3.5 of those were for questions, which is where a judge fills in the rubric. Some teams pitched for all five. Formats vary, so ask how long your slot is and how much of it is Q&A, then shorten each part to fit." },
        { type: "link-card", title: "9 Hackathon Pitch Mistakes I Saw at LA Hacks", description: "What I saw from the judging table.", href: "/blog/hackathon-pitch-mistakes-la-hacks", tag: "Related" },
      ],
    },
    {
      heading: "Open With the Problem",
      paragraphs: [],
      blocks: [
        // [CONFIRM: whose pitch was this? The Dispatch AI transcript on app/playbook/pitching/page.tsx opens with "over 80% of 911 call centers are critically understaffed," not 240 million calls. If it was yours, say "our".]
        { type: "paragraph", text: "A winning team I watched opened with this: **240 million 911 calls** are made in the US every year, and dispatchers prioritize them by hand while people are dying on the line. (That number is the National Emergency Number Association's estimate: nena.org/page/911statistics.)" },
        { type: "pro-con", pros: [
          "Lead with one statistic that shows the scale",
          "Open with a personal story",
          "Describe the problem so the judge can picture it",
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
        { type: "paragraph", text: "Demo live whenever you can. Slides are backup only." },
        { type: "callout", variant: "warning", text: "Pre-load realistic data: believable numbers in the dashboard and a real example to process. Never 'test123' or 'lorem ipsum'." },
        { type: "paragraph", text: "The Wi-Fi at LA Hacks was spotty while I was judging, and some teams couldn't run their demo at all. Without a backup video, I couldn't see what those projects did. A recording also stays on your Devpost for deliberation." },
        { type: "paragraph", text: "Here's our TalkTuahBank demo from HackUTD 2024, where we took 1st Overall. The problem gets one statistic and five seconds, and the product is running by 0:14. At 1:20, a $200 transfer goes through on camera." },
        { type: "video", src: "https://www.youtube.com/embed/YsH_z1azXSA", title: "TalkTuahBank demo video, 1st Overall at HackUTD 2024", credit: "Demo video by the TalkTuahBank team." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the recorder I use for hackathon demos",
          description: "Auto-zoom, cursor smoothing, and a webcam overlay are baked in, so a 60-second demo needs almost no editing. Worth a look if you're on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "link-card", title: "More demo video examples", description: "The TalkTuahBank and SoundSearch demos, broken down.", href: "/playbook/pitching", tag: "Playbook" },
      ],
    },
    {
      heading: "Win the Q&A by Naming Your Limits",
      paragraphs: [],
      blocks: [
        { type: "checklist", title: "Prepare answers for", items: [
          "How does it scale?",
          "What's the business model?",
          "What were the technical challenges?",
          "How is this different from existing solutions?",
          "What would you build next with more time?",
        ]},
        { type: "callout", variant: "tip", text: "When a judge asks what's missing, answer honestly instead of overselling. Something like: 'In a production version we'd add X, but for this demo we focused on Y because it best shows our core value.'" },
      ],
    },
    {
      heading: "Delivery: One Speaker, No Apologies",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Have one person talk while another drives the demo, and don't switch speakers mid-pitch. Look at the judges instead of your screen, and keep a measured pace even when you're nervous. Run the whole thing out loud with a timer at least once before you walk up." },
        { type: "callout", variant: "success", title: "Don't apologize in the pitch", text: "Don't bring up bugs or say 'we ran out of time.' Judges don't know your original plan, so they can only judge what you show them." },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "All seven phases, from team formation to follow-up.", href: "/blog/how-to-win-hackathons", tag: "Full Guide" },
      ],
    },
  ],
};

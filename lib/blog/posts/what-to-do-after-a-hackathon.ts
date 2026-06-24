import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "what-to-do-after-a-hackathon",
  title: "What to Do After a Hackathon: The 5-Asset Visibility Worksheet",
  description:
    "What to do after a hackathon, win or lose: a worksheet for the 5 assets (GitHub README, Devpost, portfolio, demo video, LinkedIn) and the links that get you hired.",
  date: "2026-06-24",
  readingTime: "6 min read",
  keywords: [
    "what to do after a hackathon",
    "share hackathon project",
    "hackathon project portfolio",
    "hackathon devpost readme",
    "promote hackathon project",
    "post hackathon checklist",
  ],
  content: [
    {
      heading: "You Shipped the Project. Now Ship the Proof.",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The hackathon is over. The most important work is not." },
        { type: "paragraph", text: "Win or lose, your project only changes your career if people can **find it**. That means five public assets, all pointing at each other. Most teams ship one (a private GitHub repo nobody links to) and wonder why nothing happened. The trophy fades in a week. The link web works for you for years." },
        { type: "stat-row", stats: [
          { value: "5", label: "Assets to ship" },
          { value: "1", label: "Link web" },
          { value: "48 hrs", label: "Best time to post" },
          { value: "0", label: "Lines of code recruiters read" },
        ]},
        { type: "callout", variant: "info", title: "Win or Lose, This Is the Same", text: "You don't do hackathons to win. You do them to get seen. **It only takes one person** clicking through: one recruiter, one founder, one future teammate." },
      ],
    },
    {
      heading: "The Link Web Is the Whole Point",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Here is the rule that matters more than any single asset: **every asset links to every other asset.** A recruiter who lands on any one of them can reach all the rest in one click. There are no dead ends." },
        { type: "code-snippet", language: "text", filename: "link-web.txt", code: `Devpost    ──►  GitHub · YouTube · Live site
GitHub     ──►  Devpost · Live site · YouTube · Press
YouTube    ──►  Devpost · GitHub · Live site
Portfolio  ──►  GitHub · Devpost · YouTube
LinkedIn   ──►  Devpost · GitHub · YouTube` },
        { type: "paragraph", text: "Here is the mistake almost everyone makes: they post a GitHub link with no outbound links, or a LinkedIn post with no demo. Each asset becomes a dead end. **A reader who can't get to the next thing leaves.**" },
        { type: "callout", variant: "tip", title: "Every Asset Is a Front Door", text: "You don't control where someone enters. A recruiter might land on your YouTube, a dev on your GitHub, a founder on your Devpost. Wherever they start, the links should pull them through the whole story." },
      ],
    },
    {
      heading: "A Real Example: Dispatch AI",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Dispatch AI won the UC Berkeley AI Hackathon Grand Prize. Open any one of its links and you can reach the other three without searching." },
        { type: "code-snippet", language: "text", filename: "dispatch-ai.txt", code: `Devpost    devpost.com/software/dispatch-ai
Live site  dispatchai.art3m1s.me
GitHub     github.com/IdkwhatImD0ing/DispatchAI
YouTube    youtu.be/hdpdgxrilQM

   every page above links to the other three` },
        { type: "cta-button",
          tag: "Live example",
          title: "See the link web on the Dispatch AI Devpost",
          description: "The demo video is embedded at the top, the live site and GitHub are one click away, and the README loops you right back. That is the whole pattern in one page.",
          label: "Open the Devpost",
          href: "https://devpost.com/software/dispatch-ai",
        },
      ],
    },
    {
      heading: "Why Recruiters Never Read Your Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Why bother with all this? Because of who is actually looking. The recruiter who screens your resume and the person who DMs you on LinkedIn are usually **not going to read your source code.** But they will watch a 90-second demo. They will skim a Devpost. They will click a live site." },
        { type: "paragraph", text: "That is the edge. On a resume screen where you and another candidate look identical, **a demo they can watch breaks the tie.** A project they can experience beats a project they have to imagine." },
        { type: "callout", variant: "success", title: "And the New Reader Is an LLM", text: "Recruiters and applicant systems run on AI now. A text-rich GitHub README, a written Devpost, a captioned video, and a portfolio page are exactly what a model scrapes and summarizes. **Five linked, text-heavy sources make you the candidate the AI can actually describe.**" },
        { type: "quote", text: "It's not enough to be good. In order to be found, you have to be findable.", attribution: "Austin Kleon, Show Your Work!, 2014" },
        { type: "callout", variant: "tip", text: "The proof: within the first four hackathons, a single LinkedIn post about a project led to an interview, then a first internship. Not from winning. From being findable." },
      ],
    },
    {
      heading: "Worksheet 1: Your GitHub README",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Your README is the hub. Other developers read it, semi-technical recruiters skim it, and LLMs ingest it. **Lead with what the project does, not how you built it.**" },
        { type: "checklist", title: "Your README must have", items: [
          "One-line pitch and a hero screenshot or GIF at the very top",
          "The demo video embedded or linked near the top",
          "A link to the live, deployed site",
          "A link to the Devpost submission",
          "Links to any press, prize pages, or news coverage",
          "Tech stack and an architecture diagram",
          "Setup and run steps that actually work",
          "Team members with their profile links",
        ]},
      ],
    },
    {
      heading: "Worksheet 2: Your Devpost",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Devpost is where judges and recruiters browse projects side by side. **A thin Devpost gets forgotten during deliberation.** Make yours impossible to skim past." },
        { type: "checklist", title: "Your Devpost must have", items: [
          "A problem-first description, not a feature list",
          "The demo video embedded at the top",
          "A link to the live site",
          "A link to the GitHub repo",
          "Screenshots of the core user flow",
          "Built-with tags for every tool and sponsor API",
        ]},
        { type: "link-card", title: "Hackathon Submission Playbook", description: "README templates, Devpost structure, and the demo recording stack used by winning teams.", href: "/playbook/submission", tag: "Full Playbook" },
      ],
    },
    {
      heading: "Worksheet 3: Your Portfolio Site",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "A one-page case study is the asset recruiters open first, because it needs zero technical effort to understand. **Show the decisions, not just the screenshots:** why you built it this way is what separates you from a tutorial follower." },
        { type: "checklist", title: "Your portfolio page must have", items: [
          "A hero: what it does in one sentence, plus a live demo",
          "The problem and who actually has it",
          "Your architecture and the key technical decisions you made",
          "The tech stack",
          "Results: prizes, metrics, or honest limits",
          "Buttons to GitHub, Devpost, and the demo video",
          "Your name and a way to reach you",
        ]},
      ],
    },
    {
      heading: "Worksheet 4: Your Demo Video and Its Description",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The demo video is your highest-signal asset, so do not settle for the rushed pitch recording. **Record a clean version after you submit,** when the pressure is off. Then make the description carry links back to everything else." },
        { type: "checklist", title: "Your video and description must have", items: [
          "The product on screen within the first 30 seconds",
          "A title with the project name and what it does",
          "A hook in the first two lines of the description",
          "Links to Devpost, GitHub, and the live site in the description",
          "Chapter timestamps so reviewers can jump to the core flow",
        ]},
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the screen recorder I use for demo videos",
          description: "Auto-zoom, cursor smoothing, and a webcam overlay baked in. A 60-second demo looks like a product launch with almost no editing. Worth a look if you are on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
      ],
    },
    {
      heading: "Worksheet 5: Your LinkedIn Post",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "LinkedIn is the amplifier, the asset that pushes the other four in front of people. **This is the one that gets seen,** so it has to carry the links out." },
        { type: "checklist", title: "Your LinkedIn post must have", items: [
          "The story: what you built, what you learned, what is next",
          "Tags for teammates, sponsors, and the hackathon org",
          "A link to the Devpost",
          "A link to the GitHub",
          "The demo video, uploaded natively or linked",
          "One clear line on what you are looking for",
        ]},
      ],
    },
    {
      heading: "The Final Link-Back Check",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Before you close the laptop, walk the web one more time. Open each asset and confirm it reaches the others. **A broken or missing link is a door that locks behind your reader.**" },
        { type: "checklist", title: "Confirm the mesh", items: [
          "Devpost points to GitHub, YouTube, and the live site",
          "GitHub README points to Devpost, the live site, the video, and any press",
          "YouTube description points to Devpost and GitHub",
          "Portfolio points to GitHub, Devpost, and the video",
          "LinkedIn points to Devpost, GitHub, and the video",
          "Every link opens and lands where it should",
        ]},
        { type: "paragraph", text: "Do not want to write five assets by hand? The **Ship-It toolkit** interviews you once and generates the portfolio site, README, Devpost, and YouTube description so they tell one consistent story, then you add the LinkedIn post on top." },
        { type: "link-card", title: "The Post-Hackathon Playbook and Ship-It Toolkit", description: "The follow-up timeline, the networking science, and the copy-paste prompts that generate all five assets.", href: "/playbook/post-hackathon", tag: "Full Playbook" },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "The 7-phase system that produces the projects worth promoting, from team formation to follow-up.", href: "/blog/how-to-win-hackathons", tag: "Related Guide" },
      ],
    },
  ],
};

import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "what-to-do-after-a-hackathon",
  title: "What to Do After a Hackathon: Ship 5 Assets That Get You Hired",
  description:
    "What to do after a hackathon, win or lose: the 5 linked assets that get you hired, and the AI skills that build your README, Devpost, portfolio, and demo copy.",
  date: "2026-06-24",
  readingTime: "5 min read",
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
        { type: "paragraph", text: "Win or lose, your project only changes your career if people can **find it**. That means five public assets, each one linking to the other four. Most teams ship one (a private GitHub repo nobody links to) and wonder why nothing happened. The trophy fades in a week. A project anyone can click through works for you for years." },
        { type: "stat-row", stats: [
          { value: "5", label: "Assets to ship" },
          { value: "1", label: "Click to the rest" },
          { value: "48 hrs", label: "Best time to post" },
          { value: "0", label: "Lines of code recruiters read" },
        ]},
        { type: "callout", variant: "info", title: "Win or Lose, This Is the Same", text: "You don't do hackathons to win. You do them to get seen. **It only takes one person** clicking through: one recruiter, one founder, one future teammate." },
      ],
    },
    {
      heading: "Every Asset Links to Every Other One",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Here is the rule that matters more than any single asset: **each one links to all the others.** A recruiter who lands on any of them can reach the rest in one click. There are no dead ends. Map it out and it looks like this:" },
        { type: "code-snippet", language: "text", filename: "cross-links.txt", code: `Devpost    ──►  GitHub · YouTube · Live site
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
          title: "See the cross-links on the Dispatch AI Devpost",
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
        { type: "callout", variant: "info", title: "And the New Reader Is an LLM", text: "Recruiters and applicant systems run on AI now. A text-rich GitHub README, a written Devpost, a captioned video, and a portfolio page are exactly what a model scrapes and summarizes. **Five linked, text-heavy sources make you the candidate the AI can actually describe.**" },
        { type: "quote", text: "It's not enough to be good. In order to be found, you have to be findable.", attribution: "Austin Kleon, Show Your Work!, 2014" },
        { type: "callout", variant: "success", title: "How I Got My First Internship", text: "This one is personal. I started doing hackathons to land an internship, and within my first four, **one LinkedIn post about a project got me the interview that became my first offer.** We didn't even win that hackathon. I would never have gotten that internship otherwise. Not from winning. From being findable." },
      ],
    },
    {
      heading: "Stop Writing These by Hand",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Now the part most guides get wrong: they hand you five templates and wish you luck. **It is 2026. You should not be hand-writing a README or a Devpost at 4am after your demo.** Four of these five assets are mechanical, and AI generates them faster and more consistently than you will on no sleep." },
        { type: "paragraph", text: "So I built skills that do it. The **ship-it skill** interviews you once, then generates the portfolio site, README, Devpost, and YouTube description in order, so all four share one tagline, one set of stats, and one story. Run it from your coding agent:" },
        { type: "code-snippet", language: "bash", filename: "ship-it", code: `# Install the skill
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ship-it

# Then tell your agent:
# "Use the ship-it skill to create all four of my
#  post-hackathon deliverables from this repo."` },
        { type: "paragraph", text: "Only need one of them? Each asset has its own skill. Install whichever you want and point your agent at it:" },
        { type: "code-snippet", language: "bash", filename: "one-at-a-time", code: `npx skills add IdkwhatImD0ing/hackathonstarterkit --skill portfolio-builder
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill readme-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill devpost-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill youtube-writer` },
        { type: "callout", variant: "info", title: "One-Time Setup for the Portfolio", text: "The portfolio builder uses Anthropic's frontend-design plugin so your site gets a custom look, not a template. The post-hackathon playbook has the exact prompts for every skill, plus the one extra plugin install the portfolio step needs." },
        { type: "link-card", title: "The Post-Hackathon Playbook and Ship-It Toolkit", description: "The follow-up timeline, the networking science, and the copy-paste prompts that run every skill above.", href: "/playbook/post-hackathon", tag: "Full Playbook" },
      ],
    },
    {
      heading: "What You Still Do Yourself",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Two things stay human. AI cannot record your demo, and it should not write your LinkedIn post for you." },
        { type: "paragraph", text: "**Record a clean demo after you submit,** when the pressure is off, and get the product on screen in the first 30 seconds. Then youtube-writer handles the title, description, timestamps, and the links back to everything else." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the screen recorder I use for demo videos",
          description: "Auto-zoom, cursor smoothing, and a webcam overlay baked in. A 60-second demo looks like a product launch with almost no editing. Worth a look if you are on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "paragraph", text: "The **LinkedIn post is the amplifier,** the one asset that pushes the other four in front of people, and it lands best in your own voice. Tell the story (what you built, what you learned, what is next), tag your team and the organizers, and carry the three links out: Devpost, GitHub, and the demo. End with one clear line on what you are looking for." },
      ],
    },
    {
      heading: "Whichever Way, the Rule Is the Same",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "However you generate them, one rule holds: **every asset links to every other.** Run ship-it, record the demo, post on LinkedIn, and you go from a finished repo to a project recruiters can actually find, all in an afternoon." },
        { type: "paragraph", text: "The trophy was last weekend. **The links are what keeps working for you next year.**" },
        { type: "link-card", title: "Hackathon Submission Playbook", description: "Where the README and Devpost skills live, with the demo recording stack winning teams use.", href: "/playbook/submission", tag: "Full Playbook" },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "The 7-phase system that produces the projects worth promoting, from team formation to follow-up.", href: "/blog/how-to-win-hackathons", tag: "Related Guide" },
      ],
    },
  ],
};

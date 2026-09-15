import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "what-to-do-after-a-hackathon",
  title: "What to Do After a Hackathon: Ship 5 Assets That Get You Hired",
  description:
    "My first internship came from one LinkedIn post about a hackathon we didn't win. What to do after a hackathon: five linked assets, four written by AI skills.",
  date: "2026-06-24",
  updatedDate: "2026-09-14",
  readingTime: "4 min read",
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
      heading: "Ship Five Linked Assets, Win or Lose",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "After judging, make the project easy to find." },
        { type: "paragraph", text: "That means five public assets: a GitHub README, a Devpost, a YouTube demo, a portfolio page, and a LinkedIn post, linked so that whichever one someone finds leads to the rest. A private repo nobody links to can't help you, whether you won or not." },
        // [CONFIRM: "I would never have gotten that internship otherwise" is a counterfactual. Keep it as written?]
        { type: "callout", variant: "success", title: "How I Got My First Internship", text: "I started doing hackathons to land an internship. At LA Hacks 2023 I spent the hackathon learning vector databases for a RAG-style chat app, and we didn't even win. I posted about it on LinkedIn anyway, and the post caught the eye of an interviewer who was building the exact same thing. The interview turned into two people geeking out over one problem, and a week later I had my first internship offer. That was within my first four hackathons. I would never have gotten that internship otherwise." },
      ],
    },
    {
      heading: "No Asset Should Be a Dead End",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "You don't control where someone enters. A recruiter might land on your YouTube, a developer on your GitHub, a founder on your Devpost. A repo with no links out, or a LinkedIn post with no demo, is where they stop. So Devpost, GitHub, and YouTube link to each other and to your live site, and the portfolio and LinkedIn post point into all three:" },
        { type: "code-snippet", language: "text", filename: "cross-links.txt", code: `Devpost    ──►  GitHub · YouTube · Live site
GitHub     ──►  Devpost · Live site · YouTube · Press
YouTube    ──►  Devpost · GitHub · Live site
Portfolio  ──►  GitHub · Devpost · YouTube
LinkedIn   ──►  Devpost · GitHub · YouTube` },
      ],
    },
    {
      heading: "A Real Example: Dispatch AI",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Our Dispatch AI project won the Grand Prize at the UC Berkeley AI Hackathon 2024. These are its four links:" },
        { type: "code-snippet", language: "text", filename: "dispatch-ai.txt", code: `Devpost    devpost.com/software/dispatch-ai
Live site  dispatchai.art3m1s.me
GitHub     github.com/IdkwhatImD0ing/DispatchAI
YouTube    youtu.be/hdpdgxrilQM

   every page above links to the other three` },
        { type: "cta-button",
          tag: "Live example",
          title: "See the cross-links on the Dispatch AI Devpost",
          description: "The demo video is embedded at the top, the live site and GitHub are one click away, and the README links back here.",
          label: "Open the Devpost",
          href: "https://devpost.com/software/dispatch-ai",
        },
      ],
    },
    {
      heading: "Recruiters Usually Won't Read Your Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The recruiter who screens your resume and the person who DMs you on LinkedIn usually aren't going to read your source code. They'll watch a 90-second demo, skim a Devpost, or click a live site. If you and another candidate look the same on paper, that demo can break the tie." },
        { type: "quote", text: "It's not enough to be good. In order to be found, you have to be findable.", attribution: "Austin Kleon, author of Show Your Work!, 2014" },
        // [CONFIRM: source for recruiters and applicant systems using AI to screen candidates, or cut this callout]
        { type: "callout", variant: "info", title: "Some of Your Readers Are AI Tools", text: "More recruiters and applicant systems use AI to screen candidates. A written README, Devpost, and portfolio page, plus a captioned video, give it plenty to go on." },
      ],
    },
    {
      heading: "Let AI Write the Four Mechanical Ones",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Four of the five assets are mechanical, and AI writes them faster and more consistently than you will at 4am after your demo. So I built skills that do it." },
        { type: "paragraph", text: "The **ship-it skill** interviews you once, then generates the portfolio site, README, Devpost, and YouTube description in order, so all four tell the same story with the same numbers. Run it from your coding agent:" },
        { type: "code-snippet", language: "bash", filename: "ship-it", code: `# Install the skill
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ship-it

# Then tell your agent:
# "Use the ship-it skill to create all four of my
#  post-hackathon deliverables from this repo."` },
        { type: "paragraph", text: "If you only need one of them, each asset has its own skill:" },
        { type: "code-snippet", language: "bash", filename: "one-at-a-time", code: `npx skills add IdkwhatImD0ing/hackathonstarterkit --skill portfolio-builder
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill readme-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill devpost-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill youtube-writer` },
        { type: "callout", variant: "info", title: "One-Time Setup for the Portfolio", text: "The portfolio builder uses Anthropic's frontend-design plugin for a custom look, which takes one extra install. The post-hackathon playbook has that, plus the exact prompt for every skill." },
        { type: "link-card", title: "The Post-Hackathon Playbook and Ship-It Toolkit", description: "The follow-up timeline and the copy-paste prompts for every skill above.", href: "/playbook/post-hackathon", tag: "Full Playbook" },
      ],
    },
    {
      heading: "What You Still Do Yourself",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "**Record a clean demo** when the pressure is off, and get the product on screen in the first 30 seconds. If your event lets you add the video after the deadline, record it after you submit. Some events want the link at submission, so check the rules. Then youtube-writer handles the title, description, timestamps, and links." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the screen recorder I use for demo videos",
          description: "Auto-zoom, cursor smoothing, and a webcam overlay built in, so a 60-second demo needs almost no editing. Worth a look if you're on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "paragraph", text: "**Write the LinkedIn post yourself,** within 48 hours. It's the asset that puts the other four in front of people, and it reads best in your own voice. Say what you built and what you learned, tag your team and the organizers, link the Devpost, GitHub, and demo, and end with one line on what you're looking for." },
        { type: "link-card", title: "Hackathon Submission Playbook", description: "Where the README and Devpost skills live, plus the demo recording setup.", href: "/playbook/submission", tag: "Full Playbook" },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "The seven phases, from team formation to follow-up.", href: "/blog/how-to-win-hackathons", tag: "Related Guide" },
      ],
    },
  ],
};

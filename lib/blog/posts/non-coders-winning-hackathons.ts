import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "non-coders-winning-hackathons",
  // [CONFIRM: the title ("How Experts Beat Developers") now overclaims relative to the body, which says three winners don't show that non-coders usually beat developers. The description was rewritten to match the body; the title wasn't touched. Soften it?]
  title:
    "Non-Coders Winning Hackathons: How Experts Beat Developers",
  description:
    "A personal injury lawyer took 1st at Anthropic's hackathon without writing code. What that says about non-coders winning hackathons, and where coding helps.",
  date: "2026-04-12",
  updatedDate: "2026-09-14",
  readingTime: "3 min read",
  keywords: [
    "non-coders winning hackathons",
    "vibe coding hackathon",
    "AI hackathon non-coder",
    "hackathon without coding experience",
    "domain experts hackathon",
    "Cursor AI hackathon",
  ],
  content: [
    {
      heading: "A Lawyer Won Anthropic's Hackathon Without Writing Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Mike Brown, a personal injury lawyer, took 1st place at **Anthropic's Built with Opus 4.6 hackathon**, a global virtual event held February 10 to 16, 2026. Co-host Cerebral Valley puts the applicant count at 13,000. According to Anthropic's winners post, 500 were selected and only 1 of the 5 winners was a professional developer. In the same post, **Brown says he didn't write a single line of code, or even read one.**" },
        { type: "paragraph", text: "His project, **CrossBeam**, reads California ADU building-permit plan sets and correction letters, cross-references city and state code, and returns an action plan in about 20 minutes instead of weeks. He built it with Claude Code, drawing on years of legal experience." },
      ],
    },
    {
      heading: "Two More Non-Coders Who Won",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Nina Kolari, a non-technical entrepreneur who learned iOS development with AI tools, built **Aphasio**, an iPhone communication app for people with aphasia, in **3 hours** and beat 27 other teams at the Cursor hackathon in Chiang Mai (her write-up on ninakolari.com, December 2025)." },
        { type: "paragraph", text: "Rene Turcios, a self-described 'vibe coder' who doesn't know how to code, has competed in **200+ hackathons** since 2023 and keeps winning prizes (The San Francisco Standard, July 2025)." },
        // [NEEDS SPECIFIC: have you seen a non-coder win, or judged one at LA Hacks 2026? One line from your own hackathons would ground this post.]
        { type: "paragraph", text: "These three show that AI coding tools like Cursor, Claude Code, and ChatGPT can get someone who knows a problem well to a working prototype. They aren't enough to say non-coders usually beat developers." },
      ],
    },
    {
      heading: "What Domain Experts Bring",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Judges reward projects that solve a real problem, and a lawyer or a doctor starts out knowing which problems in their field are real. Kolari's write-up says much the same about her win: she built something simple that solved a specific, painful problem, and the judges responded to clarity." },
        // [CONFIRM: this post used to present Nedoszytko as a non-coder. The "20 years building healthcare software" detail comes from app/non-coders/page.tsx, which credits Anthropic's winners write-up. Keep?]
        { type: "paragraph", text: "Dr. Michal Nedoszytko, who placed 3rd at the Anthropic event, is a different case. Anthropic describes him as a cardiologist who had spent 20 years building healthcare software alongside his practice, and he built PostVisit.ai in 7 days. He scopes his own claim:" },
        { type: "quote", text: "Currently, you don't have to know programming to create solutions, or at least prototypes of solutions, for something that you can use personally.", attribution: "Dr. Michal Nedoszytko, interventional cardiologist and creator of PostVisit.ai, 3rd place at Anthropic's Built with Opus 4.6 hackathon (ReachMD, The Convergence, 2026)" },
        { type: "paragraph", text: "So coding skill still helps. If you don't have it, compete on what you know." },
        { type: "pro-con", pros: [
          "Win on the problem and the user experience",
          "Pick one specific problem and keep the build simple",
        ], cons: [
          "Competing on technical complexity",
          "Copying what developer teams build",
          "Padding it with extra features",
        ]},
      ],
    },
    {
      heading: "The Tools: Cursor and Claude Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "**Cursor** is an AI code editor, and **Claude Code**, which Brown used, is Anthropic's AI coding assistant. In both, you describe what you want in plain English and the AI writes the code. People call this **vibe coding**." },
        { type: "step-list", steps: [
          { title: "Describe it", description: "Say what to build. Be specific about the problem and what the user sees." },
          { title: "Try it", description: "Use what it made. You don't have to read the code to check that it works." },
          { title: "Say what to change", description: "'Make the button bigger,' 'add a loading state,' 'fix the mobile layout.'" },
          { title: "Deploy", description: "Ship it with one command when it's ready." },
        ]},
        { type: "callout", variant: "warning", title: "Two Things to Do Yourself", text: "Keep API keys (the passwords your app uses to reach services like OpenAI) out of your code and off GitHub: put them in a .env.local file yourself, not in the chat. And before you share the link, open the live site and try it the way a judge would." },
      ],
    },
    {
      heading: "Your First Hackathon, Step by Step",
      paragraphs: [],
      blocks: [
        { type: "checklist", title: "Run this before your first event", items: [
          "Install Cursor and build one tiny app by describing it in plain English",
          "Pick a problem from your own field that software could fix",
          "Find a hackathon with a beginner track and mentors",
          "Lead your pitch with the problem and your expertise, not the tech",
        ]},
        { type: "link-card", title: "Non-Coder Hackathon Section", description: "Installable AI skills, setup guides, and strategies for professionals who don't code.", href: "/non-coders", tag: "Get Started" },
        { type: "link-card", title: "Hackathon Tips for Beginners", description: "Everything you need for your first hackathon, from prep to pitch.", href: "/blog/hackathon-tips-for-beginners", tag: "Beginner Guide" },
      ],
    },
  ],
};

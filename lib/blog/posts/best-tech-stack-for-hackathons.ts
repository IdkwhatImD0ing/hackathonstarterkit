import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "best-tech-stack-for-hackathons",
  title:
    "Best Tech Stack for Hackathons in 2026: Tools That Win Prizes",
  description:
    "The best tech stack for hackathons is the one your team already knows. If you don't have one yet, this is the Next.js, FastAPI, and Supabase default I use.",
  date: "2026-04-05",
  updatedDate: "2026-09-14",
  readingTime: "4 min read",
  keywords: [
    "best tech stack for hackathons",
    "best technology for hackathons",
    "hackathon tools",
    "hackathon tech stack 2026",
    "what to use at a hackathon",
  ],
  content: [
    {
      heading: "The Default Stack, In One Glance",
      paragraphs: [],
      blocks: [
        // [NEEDS SPECIFIC: which hackathon made this your default?]
        { type: "paragraph", text: "After 50+ hackathons, this is the default stack I reach for and recommend to teams I mentor." },
        { type: "step-list", steps: [
          { title: "Frontend", description: "Next.js 16 + Tailwind CSS + shadcn/ui" },
          { title: "Backend", description: "Python FastAPI, or Next.js API routes if you want one language" },
          { title: "Database & Auth", description: "Supabase or Firebase (both set up in under 10 minutes)" },
          { title: "Deployment", description: "Vercel for the frontend, Railway for the backend" },
          { title: "AI", description: "OpenAI or Claude API, plus whatever the sponsor wants" },
        ]},
        { type: "callout", variant: "success", title: "Use what your team knows", text: "If you're going for the win and your team is faster in something else, use that instead. The goal is a polished, deployed demo in 24-48 hours, and a team that writes Vue shouldn't spend those hours learning React." },
      ],
    },
    {
      heading: "Frontend: Next.js",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "I default to **Next.js with React**. Each page is just a file, and server rendering is built in. For UI, shadcn/ui copies ready-made components into your project as code you can edit." },
        { type: "code-snippet", language: "bash", filename: "terminal", code: "npx create-next-app@latest my-hackathon-app\ncd my-hackathon-app\nnpx shadcn@latest init\nnpm run dev" },
        { type: "pro-con", pros: [
          "Next.js + Tailwind CSS + shadcn/ui (my default)",
          "Vite + React for a pure single-page app",
          "Svelte or SvelteKit if your team already knows it",
        ], cons: [
          "Angular: too much boilerplate for 24 hours",
          "Complex monorepo setups",
          "Learning a brand-new framework mid-event",
        ]},
      ],
    },
    {
      heading: "Backend: Python or Node, Nothing Exotic",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Pick **Python (FastAPI or Flask)** or **Node.js (Express)**. Python fits AI and ML work better because of its libraries. Node makes sense when your frontend is already JavaScript and you want one language." },
        { type: "code-snippet", language: "python", filename: "main.py", code: "from fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\n\napp = FastAPI()\napp.add_middleware(CORSMiddleware, allow_origins=[\"*\"])\n\n@app.get(\"/api/health\")\ndef health():\n    return {\"status\": \"ready to hack\"}" },
        { type: "callout", variant: "tip", text: "If your backend is a few simple endpoints, serverless functions on Vercel or AWS Lambda mean no server to manage. For anything heavier, run FastAPI on Railway or Render, which both do one-click deploys." },
      ],
    },
    {
      heading: "Database and Auth: Firebase or Supabase",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Both come with sign-up and login built in. Pick between them by how you want to store data." },
        { type: "pro-con", pros: [
          "Firebase for NoSQL and real-time features",
          "Supabase for PostgreSQL and SQL",
          "Free tiers that cover a typical hackathon",
        ], cons: [
          "Self-hosted databases (too much setup time)",
          "Complex ORM configurations",
          "Rolling your own auth from scratch",
          "A database without built-in auth, if your app needs logins",
        ]},
        { type: "paragraph", text: "All of this assumes you're there to win. If you're there to learn, a new tool can be worth the whole weekend. At LA Hacks 2023 I spent the hackathon learning vector databases for a RAG-style chat app, and we didn't win. I posted about it on LinkedIn anyway, and that post led to my first internship. The vector database knowledge also landed me a full-time job." },
      ],
    },
    {
      heading: "AI APIs: Read the Docs Before You Arrive",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Pick one model provider and make a test call to its API before you arrive. Keys and rate limits are easier to sort out at home." },
        // [CONFIRM: update model names. "GPT-4o" and "Claude 4" look stale for a post billed as 2026.]
        { type: "stat-row", stats: [
          { value: "GPT-4o", label: "OpenAI" },
          { value: "Claude 4", label: "Anthropic" },
          { value: "Gemini", label: "Google" },
          { value: "Groq", label: "Fast Inference" },
        ]},
        { type: "callout", variant: "tip", title: "Read sponsor docs early", text: "If you're going for sponsor prizes, check the sponsor list and read their API docs before the event starts too." },
      ],
    },
    {
      heading: "Deployment: Ship a Live URL",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Deploy so judges can open a real URL instead of watching localhost on your laptop. It's one command." },
        { type: "code-snippet", language: "bash", filename: "terminal", code: "# Frontend to Vercel\nnpx vercel deploy\n\n# Full-stack to Railway\nrailway up" },
        { type: "callout", variant: "warning", text: "For mobile, use Expo for React Native and test on your phone with a QR code. For hardware, record a working video demo as a backup in case the live hardware fails." },
      ],
    },
    {
      heading: "Record the Demo Video",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The demo video keeps working after you leave the table: judges revisit submissions during deliberation, and recruiters can find it on YouTube. Lock the tools fast so the weekend goes to building, then put your last hours into the video." },
        { type: "pro-con", pros: [
          "Screen Studio (Mac): what I use, with auto-zoom and cursor smoothing built in",
          "CanVid (Windows): the closest equivalent",
          "60-90 seconds, one take is fine",
          "Voiceover: problem first, then product",
        ], cons: [
          "QuickTime and built-in recorders (no zoom, no polish)",
          // [CONFIRM: restored from the original "(judges scrub, not watch)". Nothing on the site sources it. Keep it only if it matches what you've seen as a judge.]
          "5-minute recordings (judges skip through them)",
          "Slide-only videos that never show the product",
          "No voiceover or captions",
        ]},
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the screen recorder I use for hackathon demos",
          description: "The webcam overlay and export presets just work, so you barely edit. Worth a look if you're on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "link-card", title: "Hackathon Submission Playbook", description: "Demo video examples and the recording setup I use.", href: "/playbook/submission", tag: "See Examples" },
      ],
    },
  ],
};

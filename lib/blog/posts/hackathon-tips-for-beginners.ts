import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-tips-for-beginners",
  title: "Hackathon Tips for Beginners: Your First Hackathon Survival Guide",
  description:
    "First hackathon? This beginner's guide covers everything you need to know: what to bring, how to find a team, what to build, common mistakes, and how to make the most of your first hackathon experience.",
  date: "2026-04-08",
  updatedDate: "2026-05-08",
  readingTime: "9 min read",
  keywords: [
    "hackathon tips for beginners",
    "first hackathon guide",
    "hackathon beginner advice",
    "how to prepare for a hackathon",
    "hackathon survival guide",
  ],
  content: [
    {
      heading: "Your First Hackathon: What to Expect",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Hackathons are intense, collaborative events where teams build a project from scratch in 24-48 hours. They're part coding marathon, part startup pitch competition, and part networking event. The atmosphere is exciting, sometimes chaotic, and always educational." },
        { type: "callout", variant: "info", title: "You Belong Here", text: "Don't worry about being a beginner. Every hackathon veteran was once a first-timer. Many hackathons like HackMIT, HackUTD, and CalHacks specifically welcome beginners and offer mentoring, workshops, and beginner-friendly tracks." },
      ],
    },
    {
      heading: "Before the Hackathon: Preparation Checklist",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Set up your development environment before the event. Research the hackathon's sponsors, prizes, and challenges. Most hackathons publish this information 1-2 weeks before the event." },
        { type: "checklist", title: "Pre-Hackathon Setup", items: [
          "Install your IDE (VS Code or Cursor)",
          "Install Git, Node.js, and Python",
          "Create accounts on GitHub and Vercel",
          "Sign up on the hackathon platform (usually Devpost)",
          "Test deploying a basic \"Hello World\" project",
          "Research sponsors, prizes, and challenges",
          "Read the judging criteria carefully",
          "Join the hackathon Discord or Slack",
        ]},
        { type: "callout", variant: "success", text: "Understanding what judges are looking for gives you a massive advantage over teams that show up unprepared. This alone can be the difference between a fun weekend and a winning weekend." },
      ],
    },
    {
      heading: "Finding and Joining a Team",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "If you don't have a team, join the hackathon's Discord server or Slack channel. Most hackathons have a #team-formation channel. Introduce yourself, mention your skills (even if basic), and your interests. Don't be shy about reaching out." },
        { type: "pro-con", pros: [
          "Teams with diverse skills (frontend, backend, design, pitch)",
          "2-4 members total",
          "At least one person comfortable presenting",
          "People you communicate well with",
        ], cons: [
          "Teams of 4 frontend developers",
          "More than 4 people (coordination overhead)",
          "Teams where nobody wants to present",
          "Only picking friends over skill diversity",
        ]},
        { type: "callout", variant: "tip", text: "If you're non-technical, emphasize your domain expertise and willingness to handle the pitch. Non-coders who can present well are incredibly valuable to hackathon teams." },
      ],
    },
    {
      heading: "What to Build: Picking Your First Project",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "For your first hackathon, aim for something achievable but impressive. A common framework is: take an existing concept and add a unique twist using one of the sponsor's APIs." },
        { type: "quote", text: "A polished app with 2 working features always beats a broken app with 10 half-built features.", attribution: "The beginner's golden rule" },
        { type: "paragraph", text: "Focus on making your demo smooth and your pitch compelling. Judges value execution and presentation over raw feature count." },
      ],
    },
    {
      heading: "During the Hackathon: Time Management",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The biggest beginner mistake is spending too long on setup and not enough on the actual product. Aim to have your basic project running within the first 2-3 hours. Use templates and boilerplates to skip repetitive setup." },
        { type: "step-list", steps: [
          { title: "Hours 0-2: Setup & Planning", description: "Get your project scaffolded and basic routing working. Divide tasks among the team." },
          { title: "Hours 2-8: Core Feature Build", description: "Build the 2-3 features that will make your demo shine. Focus, don't get distracted." },
          { title: "Hours 8-12: Sleep & Polish", description: "Get some rest. Yes, really. Then polish the UI and fix rough edges." },
          { title: "Hours 12-20: Integration & Demo Prep", description: "Connect all the pieces, prepare your pitch, and record a backup demo video." },
          { title: "Hours 20-24: Submit & Practice", description: "Write your Devpost submission, practice the pitch, submit early." },
        ]},
        { type: "callout", variant: "warning", text: "Sleep at least a few hours. Studies show that sleep-deprived coding produces more bugs and worse decision-making. A fresh team that codes for 16 hours will outperform an exhausted team that grinds for 24 hours straight." },
      ],
    },
    {
      heading: "Common Beginner Mistakes to Avoid",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Here are the most common ways first-timers lose hackathons, all of them completely avoidable:" },
        { type: "checklist", title: "Mistakes to Watch For", items: [
          "Not reading the judging criteria before ideating",
          "Spending more than 30 minutes on a single bug",
          "Forgetting to ask mentors for help early",
          "Skipping the demo video backup",
          "Submitting late (usually means disqualification)",
          "Trying to build too many features",
        ]},
        { type: "callout", variant: "tip", text: "If something isn't working after 30 minutes, find a workaround or cut the feature. Ask mentors for help early and often. They're there specifically to help you." },
        { type: "paragraph", text: "Skipping the demo video backup is the most preventable mistake on this list. A 60-90 second screen recording with voiceover gives judges a way to understand your project even if your live demo dies on stage, and it keeps living after the hackathon ends. The example below is SoundSearch, a solo first-place accessibility tool from the AIATL hackathon that guides users through complex websites with real-time voice over a phone call. The recording reached a recruiter after the event and turned into an internship offer. The embed skips the problem framing intro so the product is on screen right away." },
        { type: "callout", variant: "tip", text: "First-timer relief: this does not have to come out of your coding budget. Most hackathons only freeze the code at submission, while the Devpost listing (including the demo video link) stays editable for an hour or two after. The submission playbook has the full timing trick." },
        { type: "video", src: "https://www.youtube.com/embed/RgH-i9SYj-o?start=22", title: "SoundSearch demo video, solo 1st place at AIATL, that led to an internship offer", caption: "A demo video does not need a team. A solo submission with a clear recording can outlive the hackathon and reach recruiters on its own.", credit: "Demo video by Bill Zhang." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is what I use to record hackathon demos",
          description: "Auto-zoom, cursor smoothing, and webcam overlay baked in. As a beginner you will spend almost no time editing, which matters a lot at hour 22. Worth a look if you are on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "link-card", title: "Hackathon Submission Playbook", description: "Demo video examples, README templates, and the recording stack used by 36+ winning teams.", href: "/playbook/submission", tag: "Playbook" },
      ],
    },
    {
      heading: "Making the Most of Your First Hackathon",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Win or lose, hackathons are incredible learning experiences. Network with other participants, attend sponsor workshops, and talk to mentors. Many hackathon friendships turn into future team-ups, job referrals, or even startup co-founders." },
        { type: "step-list", steps: [
          { title: "During the Event", description: "Network with other teams, attend workshops, and talk to every mentor you can." },
          { title: "After the Event", description: "Add your project to GitHub and your portfolio, even if it's incomplete." },
          { title: "Share Your Story", description: "Write about your experience on LinkedIn or Twitter. Even a simple post can open doors." },
        ]},
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "Ready to go from beginner to winner? Read the full 7-phase winning system.", href: "/blog/how-to-win-hackathons", tag: "Next Read" },
      ],
    },
  ],
};

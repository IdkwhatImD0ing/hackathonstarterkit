import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-tips-for-beginners",
  title: "Hackathon Tips for Beginners: Your First Hackathon Survival Guide",
  description:
    "First hackathon? This beginner's guide covers what to bring, how to find a team, what to build, the mistakes to avoid, and how to win as a first-timer.",
  date: "2026-04-08",
  updatedDate: "2026-06-24",
  readingTime: "4 min read",
  keywords: [
    "hackathon tips for beginners",
    "first hackathon guide",
    "hackathon beginner advice",
    "how to prepare for a hackathon",
    "hackathon survival guide",
  ],
  content: [
    {
      heading: "The one thing that wins first hackathons",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Read the judging criteria before you write a line of code." },
        { type: "paragraph", text: "That single habit separates first-timers who place from first-timers who burn out. Judges score on a published rubric. Most teams never read it, build whatever sounds cool, and lose to a simpler project that hit every box. **You can be the simpler project.**" },
        { type: "callout", variant: "info", title: "You belong here", text: "Every veteran was a first-timer once. Events like HackMIT, HackUTD, and CalHacks run beginner tracks, mentoring, and workshops specifically for you." },
        { type: "paragraph", text: "Here is the counterintuitive part most beginners miss, and I will get to exactly why it works below: **the team that sleeps usually beats the team that grinds all night.**" },
      ],
    },
    {
      heading: "Set up before you arrive",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Do your setup at home. Walking in with a working environment buys you hours when they matter most. Sponsors and challenges usually drop 1-2 weeks early, so research them too." },
        { type: "checklist", title: "Pre-hackathon checklist", items: [
          "Install your IDE (VS Code or Cursor)",
          "Install Git, Node.js, and Python",
          "Create GitHub and Vercel accounts",
          "Sign up on the hackathon platform (usually Devpost)",
          "Deploy a basic \"Hello World\" to test the pipeline",
          "Research sponsors, prizes, and challenges",
          "Read the judging criteria",
          "Join the hackathon Discord or Slack",
        ]},
        { type: "callout", variant: "success", text: "Knowing what judges reward is a massive edge over teams that show up cold. It is the difference between a fun weekend and a winning one." },
      ],
    },
    {
      heading: "Find a team that covers the gaps",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "No team yet? Join the Discord or Slack and find the **#team-formation** channel. Introduce yourself, name your skills (basic is fine), and reach out first." },
        { type: "paragraph", text: "Aim for coverage, not comfort. The best teams have different strengths, not four people who do the same thing." },
        { type: "pro-con", pros: [
          "Diverse skills: frontend, backend, design, pitch",
          "2-4 members total",
          "At least one confident presenter",
          "People you communicate well with",
        ], cons: [
          "Four frontend developers",
          "More than 4 people (coordination drag)",
          "Nobody willing to present",
          "Friends picked over skill diversity",
        ]},
        { type: "callout", variant: "tip", text: "Non-technical? Lead with your domain expertise and own the pitch. A non-coder who presents well is one of the most valuable people on a team." },
        { type: "link-card", title: "Can non-coders actually win hackathons?", description: "How to be the most valuable person on the team without writing code.", href: "/blog/non-coders-winning-hackathons", tag: "Related" },
      ],
    },
    {
      heading: "Build small, demo well",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Aim for achievable but impressive. Take a familiar concept, add one sharp twist, and wire in a sponsor's API." },
        { type: "paragraph", text: "**A polished app with 2 working features beats a broken app with 10 half-built ones.** Judges reward execution and presentation, not feature count. Make the demo smooth and the pitch tight." },
      ],
    },
    {
      heading: "A 24-hour clock that works",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The biggest beginner trap is burning hours on setup. Get something running in the first 2-3 hours, then protect your build time." },
        { type: "step-list", steps: [
          { title: "Hours 0-2: Setup and plan", description: "Scaffold the project, get basic routing live, split tasks." },
          { title: "Hours 2-8: Core build", description: "Build the 2-3 features your demo depends on. No detours." },
          { title: "Hours 8-12: Sleep and polish", description: "Rest. Then clean the UI and fix rough edges." },
          { title: "Hours 12-20: Integrate and prep", description: "Connect the pieces, write the pitch, record a backup demo." },
          { title: "Hours 20-24: Submit and rehearse", description: "Finish the Devpost writeup, practice the pitch, submit early." },
        ]},
        { type: "callout", variant: "warning", title: "The sleep edge", text: "Here is the payoff to that earlier claim: sleep-deprived coding produces more bugs and worse decisions. A fresh team that codes 16 hours beats an exhausted team that grinds 24 straight. Resting is a competitive move, not a luxury." },
      ],
    },
    {
      heading: "Mistakes that cost first-timers the win",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Every mistake below is common, and every one is avoidable." },
        { type: "checklist", title: "Watch for these", items: [
          "Ideating before reading the judging criteria",
          "Spending more than 30 minutes on one bug",
          "Not asking mentors for help early",
          "Skipping the backup demo video",
          "Submitting late (often a disqualification)",
          "Trying to build too many features",
        ]},
        { type: "callout", variant: "tip", text: "Stuck for 30 minutes? Find a workaround or cut the feature. Ask mentors early and often. They are there for exactly this." },
        { type: "paragraph", text: "The most preventable miss on that list is **the backup demo video.** A 60-90 second screen recording with voiceover lets judges understand your project even if the live demo dies on stage. The clip below is SoundSearch, a solo first-place accessibility tool from the AIATL hackathon that guides users through complex websites with real-time voice over a phone call. After the event, that recording reached a recruiter and turned into an internship offer. The embed skips the intro so the product is on screen right away." },
        { type: "callout", variant: "tip", text: "First-timer relief: the recording does not have to eat your coding budget. Most hackathons only freeze the code at submission, while the Devpost listing (demo video link included) stays editable for an hour or two after. The submission playbook has the full timing trick." },
        { type: "video", src: "https://www.youtube.com/embed/RgH-i9SYj-o?start=22", title: "SoundSearch demo video, solo 1st place at AIATL, that led to an internship offer", caption: "A demo video does not need a team. A solo submission with a clear recording can outlive the hackathon and reach recruiters on its own.", credit: "Demo video by Bill Zhang." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is what I use to record hackathon demos",
          description: "Auto-zoom, cursor smoothing, and webcam overlay are baked in, so you barely edit, which matters at hour 22. Worth a look if you are on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "link-card", title: "Hackathon Submission Playbook", description: "Demo video examples, README templates, and the recording stack used by 36+ winning teams.", href: "/playbook/submission", tag: "Playbook" },
      ],
    },
    {
      heading: "Win or lose, walk away with more",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The project is temporary. The network is not. Many hackathon connections become future teammates, job referrals, or co-founders." },
        { type: "step-list", steps: [
          { title: "During", description: "Meet other teams, hit the workshops, talk to every mentor you can." },
          { title: "After", description: "Push the project to GitHub and your portfolio, even unfinished." },
          { title: "Share it", description: "Post your story on LinkedIn or Twitter. One post can open a door." },
        ]},
        { type: "callout", variant: "success", text: "Your first hackathon is not about winning. It is about finishing one project and proving to yourself you can. The wins come after that." },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "Ready to go from beginner to winner? Read the full 7-phase winning system.", href: "/blog/how-to-win-hackathons", tag: "Next Read" },
      ],
    },
  ],
};

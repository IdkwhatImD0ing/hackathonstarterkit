import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-tips-for-beginners",
  title: "Hackathon Tips for Beginners: Your First Hackathon Survival Guide",
  description:
    "You don't need an idea or a team to go to your first hackathon. These hackathon tips for beginners cover what to set up at home and how to spend the 24 hours.",
  date: "2026-04-08",
  updatedDate: "2026-09-14",
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
      heading: "If you want to place, read the judging criteria first",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Judges score on a published rubric, so read it before you write a line of code. **A simple project that hits every item on it can beat a cooler one that doesn't.**" },
        { type: "paragraph", text: "You don't need an idea or a team just to show up and get something out of it, though. You can find both at the event." },
        // [CONFIRM: do HackMIT, HackUTD, and CalHacks all currently run beginner tracks, mentoring, and workshops?]
        { type: "callout", variant: "info", title: "You belong here", text: "Events like HackMIT, HackUTD, and CalHacks run beginner tracks, mentoring, and workshops for people at their first hackathon." },
      ],
    },
    {
      heading: "Set up before you arrive",
      paragraphs: [],
      blocks: [
        // [CONFIRM: restored from the original. Do sponsors and challenges usually drop 1-2 weeks early? Nothing on the site sources it.]
        { type: "paragraph", text: "Do your setup at home so the event hours go to building. Sponsors and challenges usually drop 1-2 weeks early, so you'll have time to research them too." },
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
      ],
    },
    {
      heading: "Find a team that covers the gaps",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "No team yet? Join the Discord or Slack and find the **#team-formation** channel. Post an intro with your skills (basic is fine), and message people instead of waiting to be found." },
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
        { type: "callout", variant: "tip", text: "If you don't code, lead with your domain expertise and own the pitch." },
        { type: "link-card", title: "Can non-coders actually win hackathons?", description: "How to be useful on a team without writing code.", href: "/blog/non-coders-winning-hackathons", tag: "Related" },
      ],
    },
    {
      heading: "Build small, and plan the clock",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Aim for achievable but impressive: something familiar with one twist. Our TalkTuahBank project at HackUTD 2024 was banking over a plain phone call, so it works for people with no internet or smartphone. If you want a sponsor's prize, use their API too." },
        { type: "step-list", steps: [
          { title: "Hours 0-2: Setup and plan", description: "Scaffold the project with basic routing, then split up the tasks." },
          { title: "Hours 2-8: Core build", description: "Build the 2-3 features your demo depends on, and nothing else yet." },
          { title: "Hours 8-12: Sleep and polish", description: "Rest. Then clean the UI and fix rough edges." },
          { title: "Hours 12-20: Integrate and prep", description: "Connect the pieces, write the pitch, record a backup demo." },
          { title: "Hours 20-24: Submit and rehearse", description: "Finish the Devpost writeup and submit early. Then practice the pitch." },
        ]},
        // [NEEDS SPECIFIC: a hackathon where sleeping, or skipping sleep, changed how your demo went.]
        { type: "callout", variant: "warning", title: "Take the sleep block", text: "Rest in hours 8-12 instead of pushing through. The last 12 hours go to integration and the pitch, and you'll want a clear head for both." },
      ],
    },
    {
      heading: "Mistakes that cost first-timers the win",
      paragraphs: [],
      blocks: [
        { type: "checklist", title: "Watch for these", items: [
          "Ideating before reading the judging criteria",
          "Spending more than 30 minutes on one bug",
          "Not asking mentors for help early",
          "Skipping the backup demo video",
          "Submitting late (often a disqualification)",
          "Trying to build too many features",
        ]},
        { type: "callout", variant: "tip", text: "At the 30-minute mark, ask a mentor. If there's no quick workaround, cut the feature." },
        // [CONFIRM: is SoundSearch yours? The video credit says "Demo video by Bill Zhang." If it is, tell this in first person ("my solo project", "I got an internship offer").]
        { type: "paragraph", text: "Record **the backup demo video**. A 60-90 second screen recording with voiceover lets judges understand your project even if the live demo dies on stage. The clip below is SoundSearch, a solo first-place accessibility tool from the AIATL hackathon that guides users through complex websites with real-time voice over a phone call. After the event, that recording reached a recruiter and turned into an internship offer." },
        { type: "video", src: "https://www.youtube.com/embed/RgH-i9SYj-o?start=22", title: "SoundSearch demo video, solo 1st place at AIATL, that led to an internship offer", credit: "Demo video by Bill Zhang." },
        { type: "callout", variant: "tip", text: "At some events the deadline freezes your code but not the Devpost entry, so you can record the video after you submit. Check the rules first: some events count any edit after the deadline as a violation, or need the video link to submit." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is what I use to record hackathon demos",
          description: "Auto-zoom, cursor smoothing, and webcam overlay are baked in, so you barely edit, which matters at hour 22. Worth a look if you're on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
        { type: "link-card", title: "Hackathon Submission Playbook", description: "Demo video examples, README templates, and the recording setup I use.", href: "/playbook/submission", tag: "Playbook" },
      ],
    },
    {
      heading: "Win or lose, walk away with more",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "I started doing hackathons to land an internship. My first internship came from LA Hacks 2023, where I spent the weekend learning vector databases for a RAG-style chat app and we didn't win. I posted about it on LinkedIn anyway, and an interviewer who was building the exact same thing saw it. A week later I had the offer." },
        { type: "step-list", steps: [
          { title: "During", description: "Go to the workshops, and talk to other teams and the mentors." },
          { title: "After", description: "Push the project to GitHub and your portfolio, even unfinished." },
          { title: "Share it", description: "Post your story on LinkedIn or Twitter." },
        ]},
        { type: "paragraph", text: "If you don't place, go to another one. The UC Berkeley AI Hackathon 2023 fell on my UCSC graduation day, and I went anyway. I drove about an hour to get there, left midway through for a ceremony that ran about four hours, and ended up driving roughly four hours that day. That's how dedicated I was to hackathons back then. I didn't win anything. A year later, we won the Grand Prize there with Dispatch AI." },
        { type: "callout", variant: "success", text: "Finishing one project is a fine goal for a first hackathon." },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "When you're ready to compete, the full 7-phase system.", href: "/blog/how-to-win-hackathons", tag: "Next Read" },
      ],
    },
  ],
};

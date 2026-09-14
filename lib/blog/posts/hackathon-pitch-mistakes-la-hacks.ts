import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-pitch-mistakes-la-hacks",
  title: "9 Hackathon Pitch Mistakes I Saw at LA Hacks",
  description:
    "Judging LA Hacks, I watched good projects lose points to hackathon pitch mistakes. The one almost every team made was leaving the judges no time for Q&A.",
  date: "2026-04-30",
  updatedDate: "2026-09-14",
  readingTime: "6 min read",
  keywords: [
    "hackathon pitch mistakes",
    "LA Hacks pitch tips",
    "hackathon presentation tips",
    "hackathon demo tips",
    "hackathon judging tips",
    "hackathon Q&A",
  ],
  content: [
    {
      heading: "What I Saw Judging LA Hacks",
      paragraphs: [],
      blocks: [
        // [CONFIRM: this was LA Hacks 2026? The post never states the year; I didn't add it.]
        { type: "paragraph", text: "I judged at LA Hacks, and the teams that scored low rarely had weak projects. Their pitches made me work too hard to understand and score what they built." },
        { type: "paragraph", text: "In a few minutes, a judge needs to see the problem you solved, why your build is impressive, and the details their rubric rewards. The mistake almost every team made was timing: they didn't leave enough time for questions (mistake 9)." },
        { type: "stat-row", stats: [
          { value: "5 min", label: "Judging Slot" },
          { value: "1.5 min", label: "Pitch + Demo" },
          { value: "3.5 min", label: "Q&A Time" },
          { value: "9", label: "Avoidable Mistakes" },
        ]},
        { type: "image", src: "/blog/la-hacks-judging-floor.png", alt: "Wide view of the LA Hacks judging floor inside Pauley Pavilion, with teams gathered around tables for project judging.", caption: "The LA Hacks judging floor in Pauley Pavilion.", credit: "Photo courtesy of LA Hacks." },
      ],
    },
    {
      heading: "1. You Pitched Every Judge the Same Way",
      paragraphs: [],
      blocks: [
        // [NEEDS SPECIFIC: an LA Hacks team that gave the wrong judge the wrong angle?]
        { type: "paragraph", text: "Tailor the pitch like you tailor a resume. The project stays the same, but the angle shifts based on who's scoring it." },
        { type: "image", src: "/blog/la-hacks-team-demo.png", alt: "A LA Hacks team presenting a project at a judging table while a judge listens and asks questions.", caption: "Tailor the depth and angle to the judge in front of you.", credit: "Photo courtesy of LA Hacks." },
        { type: "pro-con", pros: [
          "Ask the judge's background before going deep",
          "Lead with the problem, workflow, and impact for non-technical judges",
          "Go deeper on architecture and tradeoffs for backend judges",
          "Show polish, interaction, and user flow for frontend judges",
        ], cons: [
          "Pitching backend internals to a frontend-focused judge",
          "Skipping impact because the judge looks technical",
          "Assuming the judge cares about the same details your team does",
        ]},
        { type: "image", src: "/blog/berkeley-ai-hackathon-appendix-architecture.png", alt: "Architecture slide showing a 911 call audio data pipeline, transcription, cleanup, transformation, fine-tuned model, frontend dashboard, backend server, Twilio, Retell, and Hume emotional analysis.", caption: "The architecture slide from our Dispatch AI pitch. A technical judge will want this. For a non-technical one, save it for follow-up.", credit: "Architecture slide courtesy of Bill Zhang." },
      ],
    },
    {
      heading: "2. You Let the Whole Team Pitch",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "At LA Hacks, I sat through pitches where I couldn't follow a teammate, so I burned Q&A time re-asking what they'd already covered." },
        { type: "paragraph", text: "Every four-person team has a strongest presenter and a weakest one, and the pitch is scored on clarity." },
        { type: "pro-con", pros: [
          "Let the strongest communicator lead",
          "Have one teammate drive the demo if it smooths the flow",
          "Bring specialists into Q&A for deeper questions",
        ], cons: [
          "Giving every teammate equal speaking time by default",
          "Switching speakers every 20 seconds",
          "Letting the least confident speaker explain the core value",
        ]},
      ],
    },
    {
      heading: "3. You Pitched With No Energy",
      paragraphs: [],
      blocks: [
        // [NEEDS SPECIFIC: a flat pitch you judged at LA Hacks, and what it cost the team?]
        { type: "paragraph", text: "Smile. It's obvious, but teams forget it the second judging starts. A flat, monotone delivery leaves the judge to figure out what's exciting on their own." },
        { type: "paragraph", text: "Sound proud of what you built. It shows you care, and it makes the moments that matter easy to notice." },
      ],
    },
    {
      heading: "4. You Used Slides as a Script",
      paragraphs: [],
      blocks: [
        // [NEEDS SPECIFIC: a wordy slide deck you saw at LA Hacks?]
        { type: "paragraph", text: "**Never put more than 10 to 15 words on a pitch slide.** If the judge is reading, they aren't listening. Slides frame the problem, show one statistic, or hold a single idea, and then you move into the solution. In most pitches, slides should take 30 seconds max." },
        { type: "image", src: "/blog/berkeley-ai-hackathon-problem-slide.png", alt: "A dark pitch slide showing the problem: 82 percent of 911 call centers are understaffed, surrounded by emergency dispatch product visuals.", caption: "Our Dispatch AI problem slide: one statistic and enough visual context to feel the pain point. The 82 percent figure comes from The Pulse of 9-1-1, the 2023 NENA and Carbyne State of the Industry Survey.", credit: "Slide courtesy of Bill Zhang." },
        { type: "image", src: "/blog/berkeley-ai-hackathon-solution-slide.png", alt: "A dark pitch slide showing the solution: personalized support through an empathetic AI speaker, immediate emergency response, and human-in-the-loop moderation.", caption: "The solution slide summarizes the workflow, then hands off to the live demo.", credit: "Slide courtesy of Bill Zhang." },
        { type: "paragraph", text: "Product screenshots can frame the story, but they can't replace the demo. If a screen proves the solution works, show that flow live in the product." },
      ],
    },
    {
      heading: "5. You Explained Things the Judge Already Knew",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "A couple of teams spent around 30 seconds explaining what OpenAI Agents or ElevenLabs Agents are. If the judge has used them, that time is gone." },
        { type: "paragraph", text: "The fix is one question: \"Are you familiar with ElevenLabs Agents?\" If yes, skip the definition and go straight to how you used it. If no, give the one-sentence version and move on." },
      ],
    },
    {
      heading: "6. You Pitched Features Instead of the Main Flow",
      paragraphs: [],
      blocks: [
        // [NEEDS SPECIFIC: a team at LA Hacks that toured its features instead of the main flow?]
        { type: "paragraph", text: "The judge doesn't need your landing page, auth screen, settings panel, or database schema unless one of them is central to the problem. Show the problem and the user flow that proves you solved it. Everything else goes to Q&A, Devpost, or the appendix." },
        { type: "step-list", steps: [
          { title: "Problem", description: "State the pain point in one clear sentence." },
          { title: "Main User", description: "Show who feels the problem and what they need." },
          { title: "Core Flow", description: "Demo the shortest path from problem to solved outcome." },
          { title: "Impact", description: "Explain why that outcome matters." },
        ]},
        { type: "link-card", title: "Hackathon Pitch Guide: How to Present Your Project", description: "A deeper guide on pitch structure, demo flow, and judge Q&A prep.", href: "/blog/hackathon-pitch-guide", tag: "Related Guide" },
      ],
    },
    {
      heading: "7. You Skipped the Backup Demo Video",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Always record a demo video. The LA Hacks Wi-Fi was spotty, and some teams couldn't run their demo because the app or the network died. Without a backup video, I had no clear way to see what the project actually did." },
        { type: "image", src: "/blog/la-hacks-pauley-atmosphere.png", alt: "Teams at LA Hacks set up with laptops on judging tables inside Pauley Pavilion.", caption: "A backup video still works when the venue Wi-Fi doesn't.", credit: "Photo courtesy of LA Hacks." },
        { type: "paragraph", text: "A video also covers broken APIs, browser issues, and a dying laptop. Judges revisit submissions during deliberation, too, and a clear video on your Devpost keeps the project memorable." },
        { type: "paragraph", text: "Recording doesn't have to eat your build hours. Code locks at submission, but the Devpost (including the YouTube link) usually stays editable after. Check your event's rules first, because some treat edits after the deadline as a violation. The submission playbook covers the timing." },
        { type: "paragraph", text: "Here's the demo video from our Dispatch AI project, which won the Grand Prize at the UC Berkeley AI Hackathon 2024:" },
        { type: "video", src: "https://www.youtube.com/embed/hdpdgxrilQM", title: "Winning Berkeley AI Hackathon demo video example", caption: "A backup video should make the project understandable even if the live demo fails.", credit: "Demo video courtesy of Bill Zhang." },
        { type: "paragraph", text: "And our TalkTuahBank demo from HackUTD 2024, where the project won 1st Overall:" },
        { type: "video", src: "https://www.youtube.com/embed/YsH_z1azXSA", title: "TalkTuahBank demo video, 1st Overall at HackUTD 2024", caption: "The product is on screen within 30 seconds, and a real money transfer happens on camera.", credit: "Demo video by the TalkTuahBank team." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the screen recorder I use for demo videos",
          description: "Auto-zoom, cursor smoothing, and a webcam overlay built in, so a 60-second hackathon demo needs almost no editing. Worth a look if you're on Mac.",
          label: "Check it out",
          href: "https://screenstudio.lemonsqueezy.com?aff=LpD9R",
          sponsored: true,
        },
      ],
    },
    {
      heading: "8. You Had No Appendix",
      paragraphs: [],
      blocks: [
        // [NEEDS SPECIFIC: a follow-up question at LA Hacks that a team answered well, or badly, without an appendix slide?]
        { type: "paragraph", text: "Keep the main pitch simple and the backup material deep. When a judge asks a follow-up, pulling up a ready slide looks a lot better than improvising. That's what the appendix is for, and it stays out of the main pitch." },
        { type: "checklist", title: "Good Appendix Slides", items: [
          "Architecture diagram for technical judges",
          "Prompt examples for AI projects",
          "Research data or user evidence",
          "Future mockups for product direction",
          "Technical tradeoffs and constraints",
          "Extra metrics that would slow the main story",
        ]},
      ],
    },
    {
      heading: "9. You Left No Time for Q&A",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "I had five minutes per team: about 1.5 minutes for pitch and demo, then 3.5 for questions. Teams rarely hit it. Some spent the entire five minutes pitching." },
        // [CONFIRM: this pull-quote quotes you (Bill Zhang). Keep it?]
        { type: "quote", text: "When judges cannot ask questions, they cannot score what they never got to understand.", attribution: "Bill Zhang, LA Hacks judge and author of The Hackathon Playbook" },
        { type: "paragraph", text: "**Q&A is where the judge fills in missing rubric information.** If a rubric category never gets answered, the judge may have to give it a low score, or a zero. Leave room for questions, even if it means cutting the demo short." },
      ],
    },
    {
      heading: "A Checklist for Your Next Pitch",
      paragraphs: [],
      blocks: [
        { type: "checklist", title: "Before You Walk Up to the Judge", items: [
          "Know the judge's role, or ask for their background",
          "Pick one lead speaker",
          "Practice the pitch with a timer",
          "Keep slides short and visual",
          "Record a backup demo video",
          "Prepare appendix slides for likely questions",
          "Plan where you'll stop so Q&A has time",
        ]},
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "The full system for team formation, ideation, execution, pitching, submission, and follow-up.", href: "/blog/how-to-win-hackathons", tag: "Full Guide" },
      ],
    },
  ],
};

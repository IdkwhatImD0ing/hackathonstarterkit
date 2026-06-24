import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-pitch-mistakes-la-hacks",
  title: "9 Hackathon Pitch Mistakes I Saw at LA Hacks",
  description:
    "Hackathon pitch mistakes from the LA Hacks judging floor: tailor the pitch, cut your slides, demo the main flow, and protect Q&A time for higher scores.",
  date: "2026-04-30",
  updatedDate: "2026-06-24",
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
      heading: "Most Teams Lose Points Before the Demo Even Starts",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Good projects lose to bad pitches. I judged at LA Hacks, and the teams that scored low rarely had weak projects. They had pitches that made me work too hard to understand, remember, and score what they built." },
        { type: "paragraph", text: "**Your pitch is not a product tour. It is a scoring conversation.** In a few minutes, the judge needs to see the problem you solved, why your build is impressive, and the details their rubric rewards. Here are the 9 mistakes that cost teams points, and the one timing rule almost everyone broke." },
        { type: "stat-row", stats: [
          { value: "5 min", label: "Judging Slot" },
          { value: "1.5 min", label: "Pitch + Demo" },
          { value: "3.5 min", label: "Q&A Time" },
          { value: "9", label: "Avoidable Mistakes" },
        ]},
        { type: "image", src: "/blog/la-hacks-judging-floor.png", alt: "Wide view of the LA Hacks judging floor inside Pauley Pavilion, with teams gathered around tables for project judging.", caption: "LA Hacks judging moves fast. Make your project easy to understand, remember, and score.", credit: "Photo courtesy of LA Hacks." },
      ],
    },
    {
      heading: "1. You Pitched Every Judge the Same Way",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Tailor the pitch like you tailor a resume. The project stays the same, but the angle shifts based on who is scoring it. **Most teams give every judge the identical script**, and it lands wrong half the time." },
        { type: "image", src: "/blog/la-hacks-team-demo.png", alt: "A LA Hacks team presenting a project at a judging table while a judge listens and asks questions.", caption: "Judging is a conversation. Tailor the depth and angle to the person standing in front of you.", credit: "Photo courtesy of LA Hacks." },
        { type: "pro-con", pros: [
          "Ask the judge's background before going deep",
          "Lead with problem, workflow, and impact for non-technical judges",
          "Go deeper on architecture and tradeoffs for backend judges",
          "Show polish, interaction, and user flow for frontend judges",
        ], cons: [
          "Pitching backend internals to a frontend-focused judge",
          "Skipping impact because the judge looks technical",
          "Assuming the judge cares about the same details your team does",
        ]},
        { type: "image", src: "/blog/berkeley-ai-hackathon-appendix-architecture.png", alt: "Architecture slide showing a 911 call audio data pipeline, transcription, cleanup, transformation, fine-tuned model, frontend dashboard, backend server, Twilio, Retell, and Hume emotional analysis.", caption: "Architecture depth impresses a technical judge. For a non-technical one, save it for follow-up.", credit: "Architecture slide courtesy of Bill Zhang." },
        { type: "callout", variant: "tip", title: "Read the Judge First", text: "You are not faking expertise. You are making the strongest parts of your project obvious to the person scoring it." },
      ],
    },
    {
      heading: "2. You Let the Whole Team Pitch",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Every four-person team has a strongest presenter and a weakest one. The mistake is splitting speaking time evenly because everyone contributed. **Your pitch is judged on clarity, not fairness.**" },
        { type: "paragraph", text: "At LA Hacks, I sat through pitches where I could not follow a teammate, so I burned Q&A time re-asking what they had already covered." },
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
        { type: "paragraph", text: "Smile. Obvious, but teams forget it the second judging starts. A flat, monotone delivery forces the judge to figure out what is exciting on their own." },
        { type: "paragraph", text: "**Judges feed off your energy.** Sound proud of what you built and the project feels alive. This is not fake hype. It is showing that you care, and it makes the moments that matter easy to notice." },
      ],
    },
    {
      heading: "4. You Used Slides as a Script",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "**Never put more than 10 to 15 words on a pitch slide.** If the judge is reading, they are not listening. Slides frame the problem, show one statistic, or hold a single idea. Then you move into the solution. In most pitches, slides should take 30 seconds max." },
        { type: "image", src: "/blog/berkeley-ai-hackathon-problem-slide.png", alt: "A dark pitch slide showing the problem: 82 percent of 911 call centers are understaffed, surrounded by emergency dispatch product visuals.", caption: "One memorable statistic, enough visual context to feel the pain point.", credit: "Slide courtesy of Bill Zhang." },
        { type: "image", src: "/blog/berkeley-ai-hackathon-solution-slide.png", alt: "A dark pitch slide showing the solution: personalized support through an empathetic AI speaker, immediate emergency response, and human-in-the-loop moderation.", caption: "The solution slide summarizes the workflow, then hands off to the live demo.", credit: "Slide courtesy of Bill Zhang." },
        { type: "callout", variant: "warning", title: "Demo, Do Not Screenshot", text: "Product screenshots can frame the story, but they cannot replace the demo. If a screen proves the solution works, show that flow live in the product." },
      ],
    },
    {
      heading: "5. You Explained Things the Judge Already Knew",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "A couple of teams spent around 30 seconds explaining what OpenAI Agents or ElevenLabs Agents are. If the judge has used them, that just burns time." },
        { type: "paragraph", text: "The fix is one question: \"Are you familiar with ElevenLabs Agents?\" If yes, skip the definition and go straight to how you used it. If no, give the one-sentence version and move on. **Every second on something the judge already knows is a second not spent on what makes you impressive.**" },
      ],
    },
    {
      heading: "6. You Pitched Features Instead of the Main Flow",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "A pitch is not a feature inventory. The judge does not need your landing page, auth screen, settings panel, or database schema unless one of them is central to the problem." },
        { type: "paragraph", text: "Keep it simple: **here is the problem, and here is the user flow that proves we solved it.** Everything else goes to Q&A, Devpost, or the appendix." },
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
        { type: "paragraph", text: "Always record a demo video. Not if you have time. Always." },
        { type: "paragraph", text: "The LA Hacks Wi-Fi was spotty. Some teams could not run their demo because the app or network died, and without a backup video I had no clear way to see what the project actually did." },
        { type: "image", src: "/blog/la-hacks-pauley-atmosphere.png", alt: "Teams at LA Hacks set up with laptops on judging tables inside Pauley Pavilion.", caption: "In a crowded judging floor, a clear backup video can be the difference between being remembered and being lost in the noise.", credit: "Photo courtesy of LA Hacks." },
        { type: "callout", variant: "warning", title: "Your Live Demo Can Fail", text: "A backup video survives bad Wi-Fi, broken APIs, browser issues, and laptop chaos. The judge sees the product even when the environment does not cooperate." },
        { type: "paragraph", text: "It also strengthens your Devpost. During deliberation, judges revisit submissions. A clear video keeps your project memorable. A thin Devpost makes it easy to forget." },
        { type: "callout", variant: "tip", text: "And recording does not have to eat your build hours. Hackathons lock the code at submission, but the Devpost (including the YouTube link) usually stays editable after. The submission playbook has the full timing trick." },
        { type: "video", src: "https://www.youtube.com/embed/hdpdgxrilQM", title: "Winning Berkeley AI Hackathon demo video example", caption: "A backup video should make the project understandable even when the live demo fails.", credit: "Demo video courtesy of Bill Zhang." },
        { type: "paragraph", text: "Here is another video that carried its team. TalkTuahBank won 1st Overall at HackUTD 2024, the largest 24-hour hackathon in the US. Notice the product on screen within 30 seconds and a real money transfer executed on camera." },
        { type: "video", src: "https://www.youtube.com/embed/YsH_z1azXSA", title: "TalkTuahBank demo video, 1st Overall at HackUTD 2024", caption: "Product on screen in 30 seconds, a live transaction on camera. That is what a backup video should do.", credit: "Demo video by the TalkTuahBank team." },
        { type: "cta-button",
          tag: "My pick",
          title: "Screen Studio is the screen recorder I use for demo videos",
          description: "Auto-zoom, cursor smoothing, and webcam overlay baked in. A 60-second hackathon demo looks like a polished product launch with almost no editing. Worth a look if you are on Mac.",
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
        { type: "paragraph", text: "Keep the main pitch simple, but make your backup material deep. **When a judge asks a follow-up, improvising looks worse than pulling up a ready slide.** That is what the appendix is for." },
        { type: "checklist", title: "Good Appendix Slides", items: [
          "Architecture diagram for technical judges",
          "Prompt examples for AI projects",
          "Research data or user evidence",
          "Future mockups for product direction",
          "Technical tradeoffs and constraints",
          "Extra metrics that would slow the main story",
        ]},
        { type: "paragraph", text: "It never clutters the main pitch. It just makes you look prepared the moment a judge digs in." },
      ],
    },
    {
      heading: "9. You Left No Time for Q&A",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Here is the one almost everyone broke. I had five minutes per team: about 1.5 minutes for pitch and demo, then 3.5 for questions. Teams rarely hit it. Some spent the entire five minutes pitching." },
        { type: "quote", text: "When judges cannot ask questions, they cannot score what they never got to understand.", attribution: "Bill Zhang, LA Hacks judge and Hackathon Playbook author" },
        { type: "paragraph", text: "That is the dangerous part. **Q&A is where the judge fills in missing rubric information.** If a rubric category never gets answered, the judge may have to give it a low score, or a zero." },
        { type: "callout", variant: "warning", title: "Protect Question Time", text: "Always leave room for questions, even if it means cutting the demo short. Q&A is not an interruption. It is part of the scoring process." },
      ],
    },
    {
      heading: "Your Better LA Hacks Pitch Flow",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Run this next time: read the judge, pick the clearest speaker, bring energy, use slides only to frame the problem, skip what the judge already knows, demo the main flow, keep a video backup, prep appendix slides, and protect Q&A." },
        { type: "image", src: "/blog/la-hacks-pitch-flow.svg", alt: "A visual flow for a stronger LA Hacks pitch: read the judge, lead clearly, frame the problem, demo the main flow, and protect Q&A time.", caption: "A simple flow keeps the judge focused on the scoreable parts of your project.", credit: "Original illustration by Hackathon Playbook." },
        { type: "checklist", title: "Before You Walk Up to the Judge", items: [
          "Know the judge's role, or ask for their background",
          "Pick one lead speaker",
          "Practice the pitch with a timer",
          "Keep slides short and visual",
          "Record a backup demo video",
          "Prepare appendix slides for likely questions",
          "Plan where you will stop so Q&A has time",
        ]},
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "The full system for team formation, ideation, execution, pitching, submission, and follow-up.", href: "/blog/how-to-win-hackathons", tag: "Full Guide" },
      ],
    },
  ],
};

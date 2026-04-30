import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-pitch-mistakes-la-hacks",
  title: "9 Hackathon Pitch Mistakes I Saw at LA Hacks",
  description:
    "Avoid these hackathon pitch mistakes from LA Hacks judging: tailor your pitch, simplify slides, demo the main flow, and leave Q&A time for better scores.",
  date: "2026-04-30",
  readingTime: "8 min read",
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
      heading: "Most Hackathon Pitches Make the Judge Work Too Hard",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "After judging at LA Hacks, the pattern was obvious: most teams did not lose points because their projects were bad. They lost points because the pitch made it harder than necessary to understand, remember, and score the project." },
        { type: "stat-row", stats: [
          { value: "5 min", label: "Judging Slot" },
          { value: "1.5 min", label: "Pitch + Demo" },
          { value: "3.5 min", label: "Q&A Time" },
          { value: "9", label: "Avoidable Mistakes" },
        ]},
        { type: "image", src: "/blog/la-hacks-judging-floor.png", alt: "Wide view of the LA Hacks judging floor inside Pauley Pavilion, with teams gathered around tables for project judging.", caption: "LA Hacks judging moves fast. Teams need to make their project easy to understand, remember, and score.", credit: "Photo courtesy of LA Hacks." },
        { type: "quote", text: "Your pitch is not a product tour. It is a scoring conversation.", attribution: "Bill Zhang, LA Hacks judge and Hackathon Playbook author" },
        { type: "paragraph", text: "A good hackathon pitch is not a full product tour. It is a fast scoring conversation. You need to show the judge what problem you solved, why your solution is impressive, and what details matter for their rubric before time runs out." },
      ],
    },
    {
      heading: "1. You Did Not Understand the Judge's Role",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The first mistake happens before the pitch really starts: teams treat every judge like the same audience. Your pitch should be tailored the same way you tailor a resume to a job. The project is the same, but the angle changes based on who is evaluating it." },
        { type: "pro-con", pros: [
          "Ask what the judge's background is before going deep",
          "Emphasize problem, workflow, and impact for non-technical judges",
          "Go deeper on architecture and tradeoffs for backend judges",
          "Show polish, interaction, and user flow for frontend judges",
        ], cons: [
          "Giving every judge the exact same pitch",
          "Pitching backend internals to a frontend-focused judge",
          "Skipping impact because the judge looks technical",
          "Assuming the judge cares about the same details your team cares about",
        ]},
        { type: "image", src: "/blog/la-hacks-team-demo.png", alt: "A LA Hacks team presenting a project at a judging table while a judge listens and asks questions.", caption: "Judging is a conversation. Tailor the depth and angle to the person standing in front of you.", credit: "Photo courtesy of LA Hacks." },
        { type: "image", src: "/blog/berkeley-ai-hackathon-appendix-architecture.png", alt: "Architecture slide showing a 911 call audio data pipeline, transcription, cleanup, transformation, fine-tuned model, frontend dashboard, backend server, Twilio, Retell, and Hume emotional analysis.", caption: "Architecture details can impress a technical judge, but only if that judge wants the depth. For non-technical judges, save this for follow-up.", credit: "Architecture slide courtesy of Bill Zhang." },
        { type: "callout", variant: "tip", title: "Read the Judge First", text: "The goal is not to fake expertise. The goal is to make the strongest parts of your project obvious to the person scoring it." },
      ],
    },
    {
      heading: "2. You Had Everyone on the Team Pitch",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "In a four-person team, there is almost always one strongest presenter and one weakest presenter. That is normal. The mistake is deciding that everyone should speak just because everyone contributed." },
        { type: "paragraph", text: "Your pitch is judged on clarity, not fairness. At LA Hacks, there were pitches where I could not understand parts of what a teammate said, which meant I had to spend valuable Q&A time asking about things the team had technically already explained." },
        { type: "pro-con", pros: [
          "Let the strongest communicator lead the main pitch",
          "Have one teammate drive the demo if that makes the flow smoother",
          "Bring specialists into Q&A when the judge asks deeper questions",
          "Practice handoffs only if multiple speakers are truly needed",
        ], cons: [
          "Giving every teammate equal speaking time by default",
          "Switching speakers every 20 seconds",
          "Letting the least confident speaker explain the core value",
          "Turning one pitch into four disconnected mini pitches",
        ]},
      ],
    },
    {
      heading: "3. You Delivered the Pitch With No Energy",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Smile. It sounds obvious, but many teams forget it as soon as judging starts. If you explain your project in a flat, monotone voice, the judge has to work harder to figure out what is exciting." },
        { type: "paragraph", text: "Judges feed off your energy. When you sound enthusiastic, confident, and genuinely proud of what you built, the project feels more alive. That does not mean fake hype. It means showing that you care." },
        { type: "callout", variant: "success", title: "Energy Is Part of Clarity", text: "A judge should not have to guess which part of the demo matters. Your tone, pace, and facial expression should make the important moments easy to notice." },
      ],
    },
    {
      heading: "4. You Used Slides Like a Script",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "A good rule of thumb: do not put more than 10 to 15 words on a pitch slide. Never put paragraphs of text on a hackathon pitch slide. If the judge is reading, they are not listening. If they are listening, they are not reading." },
        { type: "paragraph", text: "Slides should frame the problem, show a statistic, include a photo, or give the judge one simple idea to hold onto. Then get into the solution. In most hackathon pitches, slides should take 30 seconds max." },
        { type: "image", src: "/blog/berkeley-ai-hackathon-problem-slide.png", alt: "A dark pitch slide showing the problem: 82 percent of 911 call centers are understaffed, surrounded by emergency dispatch product visuals.", caption: "A strong problem slide gives the judge one memorable statistic and enough visual context to feel the pain point.", credit: "Slide courtesy of Bill Zhang." },
        { type: "image", src: "/blog/berkeley-ai-hackathon-solution-slide.png", alt: "A dark pitch slide showing the solution: personalized support through an empathetic AI speaker, immediate emergency response, and human-in-the-loop moderation.", caption: "A strong solution slide summarizes the workflow at a glance, then lets the speaker move into the product demo.", credit: "Slide courtesy of Bill Zhang." },
        { type: "pro-con", pros: [
          "Use one problem statement per slide",
          "Use one strong statistic or image",
          "Use tiny bullets only when they make the story clearer",
          "Use product visuals only when they clarify the problem or solution",
          "Move quickly from problem framing to product demo",
        ], cons: [
          "Reading paragraphs from the deck",
          "Using slides as speaker notes",
          "Using product screenshots as a substitute for the demo",
          "Spending most of the pitch in presentation mode",
        ]},
        { type: "callout", variant: "warning", title: "Demo Important Screens", text: "Product screenshots can frame the story, but they should not replace the demo. If a screen proves the solution works, show that flow in the product." },
      ],
    },
    {
      heading: "5. You Explained Concepts the Judge Already Knew",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "A couple teams at LA Hacks spent around 30 seconds explaining what OpenAI Agents or ElevenLabs Agents were. If the judge has used those tools before, that explanation does not help. It just burns time." },
        { type: "paragraph", text: "This is easy to solve. Ask: \"Are you familiar with ElevenLabs Agents?\" or \"Have you used the OpenAI Agents SDK before?\" If they say yes, skip the definition and go straight into how your team used it. If they say no, give the one-sentence version and move on." },
        { type: "callout", variant: "info", title: "The Pitch Is Not a Tutorial", text: "Every second spent explaining something the judge already knows is a second you cannot spend explaining what makes your project impressive." },
      ],
    },
    {
      heading: "6. You Pitched Every Feature Instead of the Main Flow",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "A pitch is not a feature inventory. I do not need to know that you implemented a landing page, an auth page, a settings screen, or a database schema unless one of those things is central to the problem." },
        { type: "paragraph", text: "The pitch should be simple: here is the problem, and here is the user flow that proves our solution solves it. Everything else can go into Q&A, Devpost, or the appendix." },
        { type: "step-list", steps: [
          { title: "Problem", description: "State the pain point in one clear sentence." },
          { title: "Main User", description: "Show who experiences the problem and what they need." },
          { title: "Core Flow", description: "Demo the shortest path from problem to solved outcome." },
          { title: "Impact", description: "Explain why that solved outcome matters." },
        ]},
        { type: "link-card", title: "Hackathon Pitch Guide: How to Present Your Project", description: "Use this deeper guide for pitch structure, demo flow, and judge Q&A preparation.", href: "/blog/hackathon-pitch-guide", tag: "Related Guide" },
      ],
    },
    {
      heading: "7. You Did Not Have a Backup Demo Video",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Always record a demo video. Not if you have time. Always." },
        { type: "paragraph", text: "At LA Hacks, the judging Wi-Fi was spotty. Some teams could not do their demo because the app or network did not cooperate. When that happened without a backup video, I had no clear way to understand what the project actually did." },
        { type: "image", src: "/blog/la-hacks-pauley-atmosphere.png", alt: "Teams at LA Hacks set up with laptops on judging tables inside Pauley Pavilion.", caption: "In a crowded judging floor, a clear backup video can be the difference between being remembered and being lost in the noise.", credit: "Photo courtesy of LA Hacks." },
        { type: "callout", variant: "warning", title: "Your Live Demo Can Fail", text: "A backup video protects you from bad Wi-Fi, broken APIs, browser issues, and laptop chaos. It lets the judge see the product even when the environment fails." },
        { type: "paragraph", text: "The side benefit is that the video also improves your Devpost. During deliberation, judges may revisit submissions. If your video is clear, they can remember the project. If your Devpost is thin, your project becomes much easier to forget." },
        { type: "video", src: "https://www.youtube.com/embed/hdpdgxrilQM", title: "Winning Berkeley AI Hackathon demo video example", caption: "A backup demo video should make the project understandable even when the live environment fails or judges revisit the submission later.", credit: "Demo video courtesy of Bill Zhang." },
      ],
    },
    {
      heading: "8. You Did Not Have an Appendix",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Your main pitch should be simple, but your backup material should be deep. That is what the appendix is for." },
        { type: "paragraph", text: "If a judge has time, they will usually ask follow-up questions. Instead of improvising every answer, keep appendix slides ready for architecture, prompt examples, future mockups, research data, user flows, and technical tradeoffs." },
        { type: "checklist", title: "Good Appendix Slides", items: [
          "Architecture diagram for technical judges",
          "Prompt examples for AI projects",
          "Research data or user evidence",
          "Future mockups for product direction",
          "Technical tradeoffs and constraints",
          "Extra metrics that would slow down the main story",
        ]},
        { type: "paragraph", text: "The appendix should not clutter the main pitch. It should make you look prepared when the judge asks a deeper question." },
      ],
    },
    {
      heading: "9. You Did Not Leave Enough Time for Q&A",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "At LA Hacks, I had five minutes to judge each team. The intended split was about 1.5 minutes for pitch and demo, then about 3.5 minutes for questions. Very rarely did teams hit that deadline. Some teams spent almost the whole five minutes pitching." },
        { type: "quote", text: "When judges cannot ask questions, they cannot score what they never got to understand.", attribution: "Bill Zhang, LA Hacks judge and Hackathon Playbook author" },
        { type: "paragraph", text: "That is dangerous. If the judge cannot ask questions, they may not have the information needed to score you properly. If a rubric category never gets answered, the judge may have to give a low score or even a zero for that category." },
        { type: "callout", variant: "warning", title: "Protect Question Time", text: "Q&A is not leftover time. It is where the judge fills in missing rubric information and often decides how high your project should rank." },
        { type: "paragraph", text: "Always leave time for judge questions, even if it means cutting the demo shorter. The questions are not an interruption. They are part of the scoring process." },
      ],
    },
    {
      heading: "A Better LA Hacks Pitch Flow",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The better flow is not complicated. Read the judge, choose the clearest speaker, bring energy, use slides only to frame the problem, skip explanations the judge does not need, demo the main flow, keep a video backup, prepare appendix slides, and leave time for Q&A." },
        { type: "image", src: "/blog/la-hacks-pitch-flow.svg", alt: "A visual flow for a stronger LA Hacks pitch: read the judge, lead clearly, frame the problem, demo the main flow, and protect Q&A time.", caption: "A simple pitch flow keeps the judge focused on the scoreable parts of your project.", credit: "Original illustration by Hackathon Playbook." },
        { type: "checklist", title: "Before You Walk Up to the Judge", items: [
          "Know the judge's role or ask for their background",
          "Pick one lead speaker",
          "Practice the pitch with a timer",
          "Keep slides short and visual",
          "Record a backup demo video",
          "Prepare appendix slides for likely questions",
          "Plan where you will stop so Q&A has time",
        ]},
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "Read the full system for team formation, ideation, execution, pitching, submission, and follow-up.", href: "/blog/how-to-win-hackathons", tag: "Full Guide" },
      ],
    },
  ],
};

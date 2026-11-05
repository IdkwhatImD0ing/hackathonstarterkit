import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "hackathon-judging-feedback-la-hacks-ai",
  title: "Hackathon Judging Feedback: 5 Teams I Judged at LA Hacks AI",
  description:
    "My hackathon judging feedback from Round 1 of the LA Hacks AI Hackathon 2026: five teams, four with no slides, and what each one should have done instead.",
  date: "2026-11-05",
  readingTime: "5 min read",
  keywords: [
    "hackathon judging feedback",
    "hackathon table judging",
    "LA Hacks AI Hackathon",
    "what hackathon judges look for",
    "hackathon pitch tips",
    "hackathon science fair judging",
  ],
  content: [
    {
      heading: "Most of These Teams Lost Me on Communication, Not Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Code wasn't the problem for any of these teams." },
        { type: "paragraph", text: "I judged Round 1 at the first LA Hacks AI Hackathon, at UCLA's James West Alumni Center on October 18, 2026. Of the first five teams I took notes on, **four had no slides or visuals of any kind**. Two left me unsure what the project even did. And one team with a very good product and demo still had a problem, which I'll get to." },
        { type: "paragraph", text: "Most of it is easy to fix: describe your product in **1 or 2 sentences**, put **a slide** up, and be ready before the judge walks up." },
        { type: "stat-row", stats: [
          { value: "~500", label: "Hackers" },
          { value: "~110", label: "Judges" },
          { value: "5-7 min", label: "Per Table" },
          { value: "4 of 5", label: "Had No Slides" },
        ]},
        { type: "callout", variant: "info", title: "How Round 1 Worked", text: "Round 1 was science-fair judging. Each judge visited about 15 tables for 5 to 7 minutes each, then ranked every project they saw. The top 5 went on to Round 2: a 3-minute pitch, 4 minutes of Q&A, and a ranked-choice vote by all the judges. The rubric scored Technical Depth, Product Thinking & Impact, Originality & Insight, and Execution & Polish." },
        { type: "paragraph", text: "Here are the five teams, in the order I judged them. No names, just what happened and what I'd tell them." },
      ],
    },
    {
      heading: "Team 1: I Gave It a 0",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "I walked up to the table, and the hacker asked me to wait until they finished eating." },
        { type: "paragraph", text: "When they did start, there was no page, no slide, nothing to set up the project. They went straight into the demo, then showed me a video after it. I was so lost. I didn't know what the project was doing or what problem it was tackling. I gave it a 0." },
        { type: "callout", variant: "warning", title: "The Rubric Doesn't Go to 0", text: "The lowest score on the LA Hacks AI Hackathon 2026 judging rubric is a 1. For Product Thinking & Impact, a 1 means \"Unclear: vague problem. Weak user definition.\" If I walk away not knowing what your project does, that's where you end up." },
        { type: "paragraph", text: "**Be ready when the judge walks up.** Have the laptop open, the demo loaded, and a slide up that says what the project is." },
      ],
    },
    {
      heading: "Team 2: I Missed Half the Pitch",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Overall, this one was pretty good, but there were a couple of issues." },
        { type: "paragraph", text: "First, the pitch was spoken only. The demo room was very loud, and I couldn't follow about half of it. A slide deck I could follow along with while they talked would have made it **100 to 200% better**." },
        { type: "paragraph", text: "The demo was OK. Then I asked about the project's future, and they said it was \"out of scope.\" They deflected." },
        { type: "quote", text: "Never say out of scope. Never say we'd never consider. That's just a very bad look. It shows you don't have future views on your project.", attribution: "Bill Zhang, Round 1 judge at the LA Hacks AI Hackathon 2026, from my judging notes" },
        { type: "paragraph", text: "You should definitely have some considerations for that. Even if you haven't built it, have an answer for what you'd do next." },
      ],
    },
    {
      heading: "Team 3: Great Engineering, No Answers Ready",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Technically, this one was really interesting, and a solid project." },
        { type: "paragraph", text: "Then I asked follow-up questions, and they had a hard time answering. No visuals, no appendix slides. They answered everything off the cuff and looked things up by hand while I waited." },
        { type: "paragraph", text: "They also weren't thinking long-term. I asked how they'd take it to production, and they said it was \"just a proof of concept.\" Same thing as Team 2. **One good slide on how they'd productionize it would have helped a lot.**" },
        { type: "checklist", title: "Appendix Slides Worth Having for Table Judging", items: [
          "How you'd take it to production",
          "What comes next, and who would use it",
          "An architecture diagram for technical judges",
          "Answers to the questions you know are coming",
        ]},
        { type: "image", src: "/blog/berkeley-ai-hackathon-appendix-architecture.png", alt: "Architecture slide showing a 911 call audio data pipeline, transcription, cleanup, transformation, fine-tuned model, frontend dashboard, backend server, Twilio, Retell, and Hume emotional analysis.", caption: "An appendix slide from our Dispatch AI pitch at the UC Berkeley AI Hackathon 2024. When a judge asks how it works, you pull this up instead of searching for the answer.", credit: "Architecture slide courtesy of Bill Zhang." },
        { type: "paragraph", text: "So, solid project. It just wasn't polished enough, and they couldn't answer my follow-up questions in a coherent and organized way. Appendix slides would've helped a lot." },
      ],
    },
    {
      heading: "Team 4: A Very Good Product With a Delivery Problem",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "This is the team I mentioned up top. The pitch was very nice. The product was very good, and so was the demo." },
        { type: "paragraph", text: "The problem was soft skills. The presenter wasn't really looking me in the eye, and kept rambling for a long time. I got kind of confused, and I couldn't really ask my questions." },
        { type: "paragraph", text: "That's about it. The product and the demo were very good. It's just how they pitched that was the issue." },
        { type: "callout", variant: "tip", title: "Leave Room for the Judge's Questions", text: "If I can't ask my questions, I can't figure out what I missed. Look at the judge, keep your answers short, and leave room for questions." },
      ],
    },
    {
      heading: "Team 5: He Talked So Much I Got Lost",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "This guy talked so much. There were no slides or visuals of any kind, and I was getting so lost. I couldn't tell what the project was supposed to do." },
        { type: "paragraph", text: "Your pitch should be **3 to 4 sentences**. You should be able to describe your product in **1 or 2 sentences, max**. If you can't describe your project in 1 or 2 sentences and make it obvious what it does, you need to find a way to do that ASAP. Or at least use some sort of pitch deck." },
        { type: "link-card", title: "Pitch Script and Judge Q&A Prompts", description: "Paste-ready prompts that help you write the two-sentence version of your project and rehearse the follow-up questions judges ask.", href: "/cheat-sheet#pitch", tag: "Cheat Sheet" },
      ],
    },
    {
      heading: "What I'd Tell Every Team Before Round 1",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Most of what I saw came down to how teams explained their project. Here's what I'd tell every team:" },
        { type: "pro-con", pros: [
          "Be ready before the judge walks up",
          "Describe the product in 1 or 2 sentences",
          "Keep the pitch to 3 or 4 sentences",
          "Put a slide up, especially in a loud room",
          "Have appendix slides for follow-up questions",
          "Make eye contact and leave room for questions",
        ], cons: [
          "Asking the judge to wait while you finish eating",
          "Jumping straight into the demo with no setup",
          "\"It's out of scope\"",
          "\"We'd never consider that\"",
          "\"It's just a proof of concept\"",
          "Talking until the judge is lost",
        ]},
        { type: "paragraph", text: "Before judging starts, figure out how to describe your project in 1 or 2 sentences, and put up a slide that says what it is. Have a slide ready for what's next, too." },
        { type: "link-card", title: "The Pitching Playbook: Table Judging", description: "The full pitching phase, including the table-judging section built from this round: being ready, the two-sentence description, the one slide to bring, appendix answers, and what to say instead of \"out of scope.\"", href: "/playbook/pitching", tag: "Playbook" },
        { type: "link-card", title: "9 Hackathon Pitch Mistakes I Saw at LA Hacks", description: "From judging the main LA Hacks event in Pauley Pavilion: pitching every judge the same way, skipping the backup video, and leaving no time for Q&A.", href: "/blog/hackathon-pitch-mistakes-la-hacks", tag: "Related Post" },
      ],
    },
  ],
};

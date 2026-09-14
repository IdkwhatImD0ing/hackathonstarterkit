# 9 Hackathon Pitch Mistakes I Saw at LA Hacks

> Judging LA Hacks, I watched good projects lose points to hackathon pitch mistakes. The one almost every team made was leaving the judges no time for Q&A.

Canonical: https://thehackathonplaybook.dev/blog/hackathon-pitch-mistakes-la-hacks
Last updated: 2026-09-14

---

## What I Saw Judging LA Hacks

I judged at LA Hacks, and the teams that scored low rarely had weak projects. Their pitches made me work too hard to understand and score what they built.

In a few minutes, a judge needs to see the problem you solved, why your build is impressive, and the details their rubric rewards. The mistake almost every team made was timing: they didn't leave enough time for questions (mistake 9).

| Judging Slot | Pitch + Demo | Q&A Time | Avoidable Mistakes |
| --- | --- | --- | --- |
| 5 min | 1.5 min | 3.5 min | 9 |

![Wide view of the LA Hacks judging floor inside Pauley Pavilion, with teams gathered around tables for project judging.](https://thehackathonplaybook.dev/blog/la-hacks-judging-floor.png)

*The LA Hacks judging floor in Pauley Pavilion.*

## 1. You Pitched Every Judge the Same Way

Tailor the pitch like you tailor a resume. The project stays the same, but the angle shifts based on who's scoring it.

![A LA Hacks team presenting a project at a judging table while a judge listens and asks questions.](https://thehackathonplaybook.dev/blog/la-hacks-team-demo.png)

*Tailor the depth and angle to the judge in front of you.*

**Do:**

- Ask the judge's background before going deep
- Lead with the problem, workflow, and impact for non-technical judges
- Go deeper on architecture and tradeoffs for backend judges
- Show polish, interaction, and user flow for frontend judges

**Don't:**

- Pitching backend internals to a frontend-focused judge
- Skipping impact because the judge looks technical
- Assuming the judge cares about the same details your team does

![Architecture slide showing a 911 call audio data pipeline, transcription, cleanup, transformation, fine-tuned model, frontend dashboard, backend server, Twilio, Retell, and Hume emotional analysis.](https://thehackathonplaybook.dev/blog/berkeley-ai-hackathon-appendix-architecture.png)

*The architecture slide from our Dispatch AI pitch. A technical judge will want this. For a non-technical one, save it for follow-up.*

## 2. You Let the Whole Team Pitch

At LA Hacks, I sat through pitches where I couldn't follow a teammate, so I burned Q&A time re-asking what they'd already covered.

Every four-person team has a strongest presenter and a weakest one, and the pitch is scored on clarity.

**Do:**

- Let the strongest communicator lead
- Have one teammate drive the demo if it smooths the flow
- Bring specialists into Q&A for deeper questions

**Don't:**

- Giving every teammate equal speaking time by default
- Switching speakers every 20 seconds
- Letting the least confident speaker explain the core value

## 3. You Pitched With No Energy

Smile. It's obvious, but teams forget it the second judging starts. A flat, monotone delivery leaves the judge to figure out what's exciting on their own.

Sound proud of what you built. It shows you care, and it makes the moments that matter easy to notice.

## 4. You Used Slides as a Script

**Never put more than 10 to 15 words on a pitch slide.** If the judge is reading, they aren't listening. Slides frame the problem, show one statistic, or hold a single idea, and then you move into the solution. In most pitches, slides should take 30 seconds max.

![A dark pitch slide showing the problem: 82 percent of 911 call centers are understaffed, surrounded by emergency dispatch product visuals.](https://thehackathonplaybook.dev/blog/berkeley-ai-hackathon-problem-slide.png)

*Our Dispatch AI problem slide: one statistic and enough visual context to feel the pain point. The 82 percent figure comes from The Pulse of 9-1-1, the 2023 NENA and Carbyne State of the Industry Survey.*

![A dark pitch slide showing the solution: personalized support through an empathetic AI speaker, immediate emergency response, and human-in-the-loop moderation.](https://thehackathonplaybook.dev/blog/berkeley-ai-hackathon-solution-slide.png)

*The solution slide summarizes the workflow, then hands off to the live demo.*

Product screenshots can frame the story, but they can't replace the demo. If a screen proves the solution works, show that flow live in the product.

## 5. You Explained Things the Judge Already Knew

A couple of teams spent around 30 seconds explaining what OpenAI Agents or ElevenLabs Agents are. If the judge has used them, that time is gone.

The fix is one question: "Are you familiar with ElevenLabs Agents?" If yes, skip the definition and go straight to how you used it. If no, give the one-sentence version and move on.

## 6. You Pitched Features Instead of the Main Flow

The judge doesn't need your landing page, auth screen, settings panel, or database schema unless one of them is central to the problem. Show the problem and the user flow that proves you solved it. Everything else goes to Q&A, Devpost, or the appendix.

1. **Problem** State the pain point in one clear sentence.
2. **Main User** Show who feels the problem and what they need.
3. **Core Flow** Demo the shortest path from problem to solved outcome.
4. **Impact** Explain why that outcome matters.

[Hackathon Pitch Guide: How to Present Your Project](https://thehackathonplaybook.dev/blog/hackathon-pitch-guide): A deeper guide on pitch structure, demo flow, and judge Q&A prep.

## 7. You Skipped the Backup Demo Video

Always record a demo video. The LA Hacks Wi-Fi was spotty, and some teams couldn't run their demo because the app or the network died. Without a backup video, I had no clear way to see what the project actually did.

![Teams at LA Hacks set up with laptops on judging tables inside Pauley Pavilion.](https://thehackathonplaybook.dev/blog/la-hacks-pauley-atmosphere.png)

*A backup video still works when the venue Wi-Fi doesn't.*

A video also covers broken APIs, browser issues, and a dying laptop. Judges revisit submissions during deliberation, too, and a clear video on your Devpost keeps the project memorable.

Recording doesn't have to eat your build hours. Code locks at submission, but the Devpost (including the YouTube link) usually stays editable after. Check your event's rules first, because some treat edits after the deadline as a violation. The submission playbook covers the timing.

Here's the demo video from our Dispatch AI project, which won the Grand Prize at the UC Berkeley AI Hackathon 2024:

Video: [Winning Berkeley AI Hackathon demo video example](https://www.youtube.com/embed/hdpdgxrilQM)

*A backup video should make the project understandable even if the live demo fails.*

And our TalkTuahBank demo from HackUTD 2024, where the project won 1st Overall:

Video: [TalkTuahBank demo video, 1st Overall at HackUTD 2024](https://www.youtube.com/embed/YsH_z1azXSA)

*The product is on screen within 30 seconds, and a real money transfer happens on camera.*

## 8. You Had No Appendix

Keep the main pitch simple and the backup material deep. When a judge asks a follow-up, pulling up a ready slide looks a lot better than improvising. That's what the appendix is for, and it stays out of the main pitch.

**Good Appendix Slides**

- [ ] Architecture diagram for technical judges
- [ ] Prompt examples for AI projects
- [ ] Research data or user evidence
- [ ] Future mockups for product direction
- [ ] Technical tradeoffs and constraints
- [ ] Extra metrics that would slow the main story

## 9. You Left No Time for Q&A

I had five minutes per team: about 1.5 minutes for pitch and demo, then 3.5 for questions. Teams rarely hit it. Some spent the entire five minutes pitching.

> When judges cannot ask questions, they cannot score what they never got to understand.
>
> Bill Zhang, LA Hacks judge and author of The Hackathon Playbook

**Q&A is where the judge fills in missing rubric information.** If a rubric category never gets answered, the judge may have to give it a low score, or a zero. Leave room for questions, even if it means cutting the demo short.

## A Checklist for Your Next Pitch

**Before You Walk Up to the Judge**

- [ ] Know the judge's role, or ask for their background
- [ ] Pick one lead speaker
- [ ] Practice the pitch with a timer
- [ ] Keep slides short and visual
- [ ] Record a backup demo video
- [ ] Prepare appendix slides for likely questions
- [ ] Plan where you'll stop so Q&A has time

[How to Win Hackathons: The Complete Guide](https://thehackathonplaybook.dev/blog/how-to-win-hackathons): The full system for team formation, ideation, execution, pitching, submission, and follow-up.

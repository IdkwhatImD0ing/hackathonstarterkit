# Demo Prep

> A timed demo script from problem to result, with a backup plan if the app breaks and the questions judges will likely ask.

Canonical: https://thehackathonplaybook.dev/non-coders/skills/demo-prep

---

A timed demo script from problem to result, with a backup plan if the app breaks and the questions judges will likely ask.

Category: Shipping

Usage: `/demo-prep [app name or description]` (A timed demo script with a backup plan)

Help the user turn a project into a polished demo story. Prioritize clarity, timing, and resilience over clever wording.

## Gather The Demo Facts

Ask only for what is missing:

- App name and one-sentence description
- Target user and the pain point
- The single most impressive feature or "wow moment"
- Presentation length, defaulting to three minutes
- Format: stage pitch, table (science-fair) judging where judges walk up to you, recorded video, or hybrid
- Any judging criteria, sponsor prize, or required technology
- Current demo URL or local run instructions if available

If the app is not finished, help choose the most reliable working path rather than the most ambitious one.

## Shape The Story

Use a three-act structure scaled to the time limit:

1. **Problem**: make the pain concrete with a believable scenario, not a vague market claim.
2. **Solution**: walk through one crisp user flow with the wow moment near the middle.
3. **Impact**: explain what changes because the product exists and close with a memorable line.

For a three-minute slot, aim for:

- 0:00-0:30 problem
- 0:30-2:15 demo walkthrough
- 2:15-2:45 impact
- 2:45-3:00 closing and transition to questions

Adjust the allocation for shorter or longer slots.

Before the timed script, write two things the user can say from memory:

- **One-liner**: what the product is and who it's for, in one or two sentences. If the user can't say it that briefly yet, fix this first; everything else depends on it.
- **Short pitch**: three or four sentences that set up the demo. This is the whole spoken pitch for a table round.

## Table Judging

When judges walk from table to table (science-fair or expo judging), the user gets a few minutes and no stage. Adapt the plan:

- **Be ready first.** Laptop open, demo loaded, slide up, and the team at the table before judging starts. The time begins when the judge arrives.
- **Lead with the one-liner and the short pitch**, then go to the demo. Never start the demo before the judge knows what the product does.
- **Bring at least one slide**, even for a spoken pitch. Rooms get loud, and a judge can read what they can't hear. The slide says what it is and who it's for.
- **Talk less, leave room for questions.** Short answers, eye contact with the judge, then stop.

## Slides

Even when the demo is the main event, prepare:

1. **One framing slide**: the one-liner and the target user.
2. **Appendix slides** for likely follow-ups, such as architecture, tradeoffs, what is real versus mocked, and cost. A follow-up should get an organized answer, not a search through the codebase while the judge waits.
3. **A "what's next" slide**: how the project would get to production and who would use it. Never let the user answer a future question with "out of scope", "we'd never consider that", or "it's just a proof of concept"; those tell a judge the team has no view of where the project goes next.

## Write The Demo

Produce presenter-ready language, not an outline. The script should sound spoken, concise, and confident.

Include:

- Timestamped narration
- Exact click path or slide path
- What should be visible on screen at each moment
- Where to pause for the judge to notice the wow moment
- One fallback line for any slow load, flaky API, or missing data

Keep clicks minimal. A demo is not a product tour; it is proof that the core value works.

## Backup Plan

Prepare fallbacks in priority order:

1. Recorded screen capture of the full flow
2. Two to four screenshots of key states
3. Seeded local data or demo account
4. Live URL as a backup to localhost, or localhost as a backup to live URL
5. One sentence to say if the app fails on stage without sounding defensive

## Rehearsal Checklist

Give the user a practical checklist:

- Time the full script out loud.
- Practice at least three times.
- Test on the actual presentation machine and network if possible.
- Open every tab before presenting.
- Close distracting apps and notifications.
- Memorize the opening and closing lines.
- Practice short answers to judge questions, then stop so the judge can ask the next one.

## Final Output

Return:

1. **One-Liner and Short Pitch**: the product in one or two sentences, and the three-to-four sentence pitch
2. **Timed Script**: spoken narration with timestamps
3. **Click Path**: exact actions to perform
4. **Slide Plan**: the framing slide, the appendix slides, and the "what's next" slide
5. **Backup Plan**: what to do if the live demo fails
6. **Q&A Prep**: three to five likely judge questions with strong answers, always including "what's next?" or "how would you take this to production?" with a concrete, forward-looking answer
7. **Rehearsal Checklist**: final prep items

If the user asked for slides instead of a live demo, adapt the click path into a slide-by-slide plan.

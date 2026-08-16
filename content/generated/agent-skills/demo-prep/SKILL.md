---
name: demo-prep
description: "Create a timed hackathon or demo-day presentation script, click path, backup plan, rehearsal checklist, and judge Q&A. Use this skill whenever the user is preparing to present, pitch, record a demo video, make slides, rehearse, or turn a working app into a clear story for judges."
---

# Demo Prep

Help the user turn a project into a polished demo story. Prioritize clarity, timing, and resilience over clever wording.

## Gather The Demo Facts

Ask only for what is missing:

- App name and one-sentence description
- Target user and the pain point
- The single most impressive feature or "wow moment"
- Presentation length, defaulting to three minutes
- Format: live demo, recorded video, slides, or hybrid
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

## Final Output

Return:

1. **Timed Script**: spoken narration with timestamps
2. **Click Path**: exact actions to perform
3. **Backup Plan**: what to do if the live demo fails
4. **Q&A Prep**: three to five likely judge questions with strong answers
5. **Rehearsal Checklist**: final prep items

If the user asked for slides instead of a live demo, adapt the click path into a slide-by-slide plan.

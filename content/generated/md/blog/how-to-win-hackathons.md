# How to Win Hackathons: A Complete Guide from 36+ Victories

> How to win hackathons, in the seven phases I learned across 50+ events and 36+ wins: from picking your team to following up with people after judging ends.

Canonical: https://thehackathonplaybook.dev/blog/how-to-win-hackathons
Last updated: 2026-09-14

---

## What Losing Teams Get Wrong

Winning a hackathon is a learnable skill. After 50+ hackathons and 36+ wins, the teams I've seen lose usually made one of four mistakes: an idea too big for the clock, no validation, features that never show up in the demo, or a weak pitch.

| Hackathons | Wins | In Prizes | Phase System |
| --- | --- | --- | --- |
| 50+ | 36+ | $100K+ | 7 |

## Phase 1: Build a Team With Complementary Skills

Aim for **3-4 people** who between them cover these four roles.

**Ideal Team Composition**

- [ ] Frontend developer who builds polished UIs fast
- [ ] Backend or full-stack developer for APIs and data
- [ ] Designer or UX-focused member
- [ ] Someone who's good at pitching and storytelling

> **Tip:** Solo? Arrive early for team formation. Introduce yourself by what you're good at, not your major or job title.

## Phase 2: Ideate Around the Judging Criteria

Read the judging criteria and sponsor challenges before you brainstorm, and pick a real problem you can show working in a demo. If you're going for the win, pick it before the event starts so the first hours go to validation.

Try **constraint-based ideation**: list the APIs, sponsor tools, and time you have, then brainstorm ideas that use at least 2-3 of them. Dispatch AI came from two combinations in a row. An LLM plus the Twilio API gave us an AI that answers phone calls, and pointing that at public safety made it an AI 911 dispatcher.

## Phase 3: Validate Before You Build

Before anyone writes feature code, spend **1-2 hours** on these four checks.

1. **Test Your APIs** Call every external service you plan to use. Check rate limits, auth, and data format.
2. **Scope the MVP** List the minimum features the demo needs. Cut the rest.
3. **Check for Prior Art** Search Devpost for this hackathon's past winners, and skip ideas that already won.
4. **Draw the Architecture** Sketch how the pieces connect, then split the tasks.

## Phase 4: Execute With an MVP Mindset

Build the minimum viable **demo** first: the 2-3 features you'll show judges in the pitch. My default stack for that is **Next.js, Python with FastAPI, and Supabase or Firebase**.

> **Warning:** If you're going for the win, use a stack your team already knows, and save new frameworks for a hackathon where learning is the goal.

[Best Tech Stack for Hackathons in 2026](https://thehackathonplaybook.dev/blog/best-tech-stack-for-hackathons): My default stack, and when to swap parts of it.

## Phase 5: Pitch Short and Leave Time for Questions

When I judged at LA Hacks, each team got five minutes, about 1.5 to pitch and 3.5 for questions, and some teams pitched for all five. Questions are where a judge fills in the rubric categories your pitch missed. Slot lengths vary, so ask about yours.

Open with the problem, then show **the product live** instead of on slides. Before you walk up, time at least one full run out loud and mark where you'll stop to leave room for questions.

[Hackathon Pitch Guide: Full Deep Dive](https://thehackathonplaybook.dev/blog/hackathon-pitch-guide): Pitch structure, the live demo, and judge Q&A.

## Phase 6: Polish the Devpost and Demo Video

Judges revisit submissions during deliberation, after you've left the table, so the Devpost has to explain the project without you.

**Submission Checklist**

- [ ] A project description that starts with the problem
- [ ] 60-90 second demo video with screen recording and voiceover
- [ ] Screenshots showing key features
- [ ] Architecture diagram in README
- [ ] List of technologies and APIs used
- [ ] Team member roles and contributions

Here's our TalkTuahBank demo from **HackUTD 2024, where we took 1st Overall**. It runs about two minutes, a bit over that target. Watch how early the product shows up and the $200 transfer that happens live on camera.

Video: [TalkTuahBank demo video, 1st Overall at HackUTD 2024](https://www.youtube.com/embed/YsH_z1azXSA)

[Hackathon Submission Playbook](https://thehackathonplaybook.dev/playbook/submission): Demo video examples, README templates, and the recording setup I use.

## Phase 7: Follow Up Within 48 Hours

Email the sponsors and mentors you met within 48 hours, while they still remember you. Push the code to GitHub with a real README, and post about what you built. That post is how I got my first internship: a LinkedIn post about our LA Hacks 2023 project, which didn't win.

Some projects keep going after the weekend. We won the **Grand Prize at the UC Berkeley AI Hackathon 2024** with Dispatch AI, worth about $64K across prizes: a $25K Berkeley SkyDeck Fund investment with a Golden Ticket to SkyDeck Pad-13, $25K for AI For Good, and roughly $14K of hardware for first place in Best Use of Intel AI (devpost.com/software/dispatch-ai). We kept building it, and it's now a company I co-founded.

[The Post-Hackathon Playbook](https://thehackathonplaybook.dev/playbook/post-hackathon): What to post, who to message, and when.

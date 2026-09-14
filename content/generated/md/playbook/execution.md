# Execution

> How to spend your hours so you finish with a working demo.

Canonical: https://thehackathonplaybook.dev/playbook/execution
Last updated: 2026-09-14

---

### Plan Your 24 Hours

Split 24 hours across the six phases, then check your plan. The feedback assumes you're competing to win.

TL;DR To compete for the win, pick your idea before the event and, if the rules allow, prep the demo after submitting.

Time Allocator

Distribute 24 hours across phases

24-Hour Timeline

0h / 24h

0h4h8h12h16h20h24h

Ideation & ArchitectureIdeation

0h

Finalize idea, assign roles, sketch architecture, deploy boilerplate.

Core PipelineCore

0h

Get the flow working end to end, however ugly.

Build SprintBuild

0h

Heads-down feature work in timeboxed blocks. Cut what takes too long.

Integration & PolishPolish

0h

Connect pieces, fix critical bugs, polish the happy path UI.

Demo PrepDemo

0h

Record demo video, build pitch deck, prep Q&A slides.

Rehearse & SubmitSubmit

0h

Practice pitch 3+ times, submit all deliverables early.

24h unallocated

0/24h

## The Hackathon Timeline

A 24-hour plan for when everything happens at the event. For 36 or 48 hours, scale the hours and keep the order.

TL;DR Have the core flow working by hour 4 and add no new features after hour 16.

The simulator above assumes you picked the idea before the event and will record the demo and rehearse between submission and judging. If both are true, most of steps 1, 5, and 6 move outside the 24 hours.

Ideation and Architecture

Finalize the idea, assign roles, and sketch the architecture. Set up the repo from a boilerplate and deploy it so 'hello world' is live in the first hour. If you're competing to win, pick the idea before the event; if you're there to learn and meet people, picking it here is fine.

Core Pipeline

Get the flow working end to end, however ugly. Hardcode values and skip error handling; nothing else starts until this works.

Build Sprint

Feature work in timeboxed 2-3 hour blocks, with a 'Can we demo right now?' check after each one. Cut any feature that runs long, and sleep in shifts.

Integration and Polish

Connect the pieces and fix only the bugs that would break the demo. Polish the screens judges will see. No new features: if something isn't working by hour 16, cut it.

Demo Prep

Record the demo video, build the deck, and prep Q&A appendix slides. If your event has a gap between submission and judging, do this step in the gap instead and spend hours 20-22 polishing what already works. Check the rules first: many events need the video link at submission.

Rehearse and Submit

Practice the pitch at least 3 times and time it. Submit everything early (Devpost, video, repo), then leave the code alone and rest before judging.

## The Speed Mindset

How long to spend on a feature, and how to tell if it belongs at all.

TL;DR Give every feature a time limit, and skip anything that doesn't make the demo better.

#### Timebox Every Feature

Once the core flow works, add features one at a time, each with a time limit you set before you start it.

If a feature takes more than 2 hours, question whether it belongs in the demo at all.

#### Build for the Demo

Build a proof of concept. Before you add anything, ask:

“Does this make the demo better?” If not, skip it, including edge cases that won't come up in the demo.

## Scope Hammering

The deadline is fixed, so cut features until what's left fits.

TL;DR Build one core flow and one demo moment; hardcode a user and skip signup, admin panels, and edge-case handling.

[Ryan Singer's Shape Up methodology](https://basecamp.com/shapeup) (Basecamp, 2019) defines scope hammering as “forcefully questioning a design, implementation, or use case to cut scope and finish inside the fixed time box.” At a hackathon, that means sorting every feature into one of two piles.

#### The Vital 20%

The part of the project the demo depends on.

-   One core flow that works end to end
-   One demo moment that shows the idea
-   Polished UI on the screens you'll demo

cut here

cut here

#### The Comfortable 80%

Features that feel important, but the demo doesn't need them.

-   Auth and login: hardcode a user, skip signup
-   Admin panels, settings, profiles
-   Edge cases, error handling, validation
-   Migrations, multiple user types, permissions

## The AI-Powered Workflow

What each tool below is good for during the build.

TL;DR Let AI write the boilerplate and standard UI, then spend your own hours editing it and building the core logic.

#### Cursor

A VS Code fork that indexes your whole codebase, so its suggestions fit your project.

-   Inline edits with Cmd+K (Ctrl+K on Windows) to refine code in place
-   Multi-line predictions as you type

#### Vercel v0

Turns a text prompt into React components built on shadcn/ui and Tailwind CSS.

-   npm-installable output that drops straight into a Next.js project

#### Claude Artifacts

Chat-based code generation with a live preview in the same tab.

-   Debugging a teammate's code mid-hackathon
-   Full history so you can retrace your steps

## The Leverage Toolkit

Six habits that save setup and coordination time.

TL;DR Keep main working and deployed from hour one, so you always have a live version to demo.

Boilerplate Repos

Pre-built starters (Next.js, Flask, Express) save you the setup. If you're competing to win, bring a stack you already know. If you're there to learn, new tech is fair game.

Component Libraries

Use shadcn/ui, Radix, or Material UI instead of building your own buttons and dialogs.

Deployment Pipeline

One-click deploy on Vercel or Netlify. Set it up in hour one so you can always demo from a live URL instead of localhost.

API-First Approach

Use managed services (Supabase, Firebase, Auth0) for the database and storage, and for auth if the demo needs it at all.

Version Control Discipline

Commit often and branch per feature. Keep main working so there's always something to demo.

Communication Shortcuts

A shared Figma, one Slack or Discord channel, and a standup every 2-3 hours.

### 

TL;DR Work stretches to fill the time you give it, and a few features carry most of a demo.

#### Timeboxing

> “Work expands so as to fill the time available for its completion.”

The fix is timeboxing. Marc Zao-Sanders lays it out in a 2018 [Harvard Business Review](https://hbr.org/2018/12/how-timeboxing-works-and-why-it-will-make-you-more-productive) piece: give each task a fixed block and stop when time is up, done or not.

— [Cyril Northcote Parkinson, 1955](https://en.wikipedia.org/wiki/Parkinson%27s_law)

#### The 80/20 Rule

> Roughly 80% of consequences come from 20% of causes.

Applied to a demo: a few features carry most of the impact. That's where the Vital 20% and Comfortable 80% in Scope Hammering get their names, though the real split won't be exact.

— [The Pareto principle: observed by economist Vilfredo Pareto (1906), named and popularized by quality-management pioneer Joseph Juran](https://en.wikipedia.org/wiki/Pareto_principle)

> “Make it work.  
> Make it right.  
> Make it fast.”

— [Software proverb popularized by Kent Beck, creator of Extreme Programming; in print since Johnson and Kernighan, Byte, August 1983](https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast)

At a hackathon, “make it work” is the Core Pipeline step on the timeline. After that, clean up only the code the demo touches, and speed something up only if it's slow in the demo.

## Execution Checklist

This page in seven lines, to keep open during the event.

TL;DR Deploy in hour one, and every 2-3 hours check that you could demo right now.

Set up the repo and boilerplate and deploy in hour one

Get the flow working end to end before adding features

Timebox every task. Past 2 hours, cut scope or switch approach

Let AI write the boilerplate; spend your own time on the core logic

Checkpoint every 2-3 hours: "Can we demo right now?" If not, fix that first

No new features after hour 16. Save hours 20-24 for the demo and rehearsal, unless you can do those after submitting

Submit everything early, then leave the code alone

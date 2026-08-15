# Execution

> Time management, tech stack selection, MVP strategy, and team coordination.

Canonical: https://thehackathonplaybook.dev/playbook/execution
Last updated: 2026-06-24

---

### Plan Your 24 Hours

Allocate hours across each phase and get real-time feedback. Feel the tradeoffs of a fixed time budget.

TL;DR Drag hours between phases to see why every minute added to one phase steals from another.

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

End-to-end flow working. Ugly is fine. Prove the concept.

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

## The Speed Mindset

Hackathons are time-limited. Anything that can be sped up, should be. The edge comes from eliminating what slows you down, not from working harder.

TL;DR Win by subtracting: cut everything that doesn't make the demo better.

The big shift: engineers are moving from code creation to code curation. You guide AI tools instead of writing everything yourself. At most hackathons, AI generates the boilerplate; you modify and optimize it to fit your project.

#### Do Less, Do It Faster

Cut, skip, ship the core flow first. Every minute that doesn't improve the demo is wasted. Speed comes from subtraction.

If a feature takes more than 2 hours, question whether it belongs in the demo at all.

#### Let Tools Do the Work

Tools are force multipliers. AI editors, generative UI, managed services, and templates generate boilerplate. Save human effort for vision, design, and core logic.

The fastest-shipping engineer isn't the fastest typist, but the best curator of tools.

#### Build for the Demo

Build a proof of concept, not a product. It tells a story in 3 minutes. Every decision passes one test: “Does this make the demo better?”

Polish the happy path. Ignore the edge cases. Judges will never see them.

Parkinson's Law

> “Work expands so as to fill the time available for its completion.”

— [Cyril Northcote Parkinson, 1955](https://en.wikipedia.org/wiki/Parkinson%27s_law). Tighter deadlines sharpen output. Timebox to create urgency inside the hackathon.

## The AI-Powered Workflow

AI generates the boilerplate; you modify and optimize it to fit the project. Three tools do the heavy lifting.

TL;DR Let AI write the first draft, then curate it: Cursor, v0, and Claude Artifacts save tens of hours per event.

#### Cursor

A VS Code fork that uses your whole codebase as a knowledge base.

-   Context-aware generation that beats Copilot by indexing the whole project
-   Inline edits with Command+K to refine, not regenerate
-   Multi-line predictions that read your intent

Edit, don't create

from code creation to code curation

#### Vercel v0

Generative UI that outputs React powered by shadcn/ui and Tailwind CSS.

-   Full React components from a natural-language prompt
-   npm-installable output you drop straight into your project
-   Next.js, shadcn, Tailwind already, so zero translation

Instant UI

describe it, install it, ship it

#### Claude Artifacts

Chat-based code generation with live previews and interaction history.

-   Live previews in one tab that show results instantly
-   Fast debugging of teammates' code mid-hackathon
-   Full history so you can retrace your steps

Tens of hours

saved at each hackathon

Andrej Karpathy

“The hottest new programming language is English.”

[Former Tesla AI lead, OpenAI founding member](https://twitter.com/karpathy/status/1617979122625712128)

Thomas Dohmke

“AI coding is here to stay. It's a new way for developers to express their creativity.”

[CEO of GitHub](https://github.blog/news-insights/product-news/github-copilot-x-the-ai-powered-developer-experience/)

### 

TL;DR Ship a working flow first, cut the 80% that won't sway judges, and polish only what they'll see.

#### Make It Work, Make It Right, Make It Fast

> “Make it work, make it right, make it fast.”

Order matters. Get the flow working end-to-end, however ugly. Refactor only what the demo needs. Most teams never pass step one in 24 hours, and that's fine.

— [Kent Beck, creator of XP and TDD](https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast)

#### Ship Embarrassingly Early

> “If you aren't embarrassed by the first version of your product, you shipped too late.”

Ship to learn, not to cut corners. Move fast, test assumptions. A too-polished demo usually means too long building and too little refining the story.

— [Reid Hoffman, co-founder of LinkedIn](https://www.linkedin.com/pulse/arent-embarrassed-first-version-your-product-you-reid-hoffman/)

#### The 80/20 Rule

> “80% of consequences come from 20% of causes.”

80% of demo impact comes from 20% of features. One sharp “pointy feature” that solves one problem well beats a broad platform with ten half-built ones.

— [Vilfredo Pareto, 1906 / Joseph Juran](https://en.wikipedia.org/wiki/Pareto_principle)

#### The 5-Step Process

Adapted from SpaceX engineering. Apply in order:

1.  Make requirements less dumb: Question everything, especially from 'smart' people

2.  Delete the part or process: If you're not adding things back, you're not cutting enough

3.  Simplify or optimize: Only after deleting, since you shouldn't optimize what shouldn't exist

4.  Accelerate cycle time: Speed up only after simplification

5.  Automate: Automate last, and never automate a broken process


— [Elon Musk, SpaceX Starbase](https://www.youtube.com/watch?v=t705r8ICkRw)

## Scope Hammering

Fixed time, variable scope. You cut features until what's left fits. This discipline separates shipping teams from unfinished messes.

TL;DR Time is non-negotiable, so scope is what you cut: build the vital 20%, kill the comfortable 80%.

[Ryan Singer's Shape Up methodology](https://basecamp.com/shapeup) from Basecamp defines scope hammering as “forcefully questioning a design, implementation, or use case to cut scope and finish inside the fixed time box.” Time is the one thing you can't negotiate. Scope is what you cut.

#### The Vital 20%

The features that make judges say “wow.” Everything else is noise.

-   One core flow that works end to end
-   One killer demo moment that shows the vision
-   Polished happy-path UI, because first impressions matter
-   The 20% that carries 80% of the impact

Ship this

the core that tells the story

cut here

cut here

#### The Comfortable 80%

Features that feel important but won't change the judge's decision. Kill them.

-   Auth and login: hardcode a user, skip signup
-   Admin panels, settings, profiles
-   Edge cases, error handling, validation
-   Migrations, multiple user types, permissions

Kill this

it won't change the outcome

[Sheryl Sandberg](https://en.wikipedia.org/wiki/Sheryl_Sandberg) / Facebook

“Done is better than perfect.”

Jason Fried / [Getting Real](https://basecamp.com/gettingreal)

“Build less. Underdo your competition. Fewer features, fewer options, fewer meetings, fewer promises.”

## The Hackathon Timeline

A battle-tested breakdown of how to allocate 24 hours. Adapt the ratios for 36- or 48-hour events, but keep the structure.

TL;DR Get a working flow by hour 4, stop building by hour 16, and spend the last 4 hours on demo and pitch.

Ideation and Architecture

Finalize the idea, assign roles, and sketch the architecture. Set up the repo with a boilerplate and deploy to staging so you can demo 'hello world' within the first hour.

Core Pipeline

Get the end-to-end flow working. Ugly is fine: hardcode values, skip error handling, duct-tape it together. Prove the concept before investing more time.

Build Sprint

Heads-down feature work in timeboxed 2-3 hour blocks. After each block, ask 'Can we demo right now?' Cut any feature that runs long. Sleep in shifts; exhaustion kills productivity faster than lost hours.

Integration and Polish

Connect the pieces. Fix critical bugs only and polish the happy-path UI judges will see. No new features. If it's not working by hour 16, it won't.

Demo Prep

Record the demo video, build the deck, and prep Q&A appendix slides. This is the highest-ROI activity of the hackathon: a polished pitch with a working demo beats a perfect codebase with a bad presentation. Tight on build hours? The demo video can usually slide into the post-submission buffer before judging; see the submission playbook for the timing trick.

Rehearse and Submit

Practice the pitch 3+ times and time it. Submit every deliverable early (Devpost, video, repo) and make no changes after. Use the rest to rest and prep mentally for judging.

Timeboxing ranks among the most effective productivity techniques, per [Harvard Business Review](https://hbr.org/2018/12/how-timeboxing-works-and-why-it-will-make-you-more-productive). Assign fixed blocks and stop when time is up, done or not.

[Brooks's Law](https://en.wikipedia.org/wiki/Brooks%27s_law) says “adding manpower to a late software project makes it later.” When you're behind, cut features instead of adding scope or people.

## The Leverage Toolkit

Tools and techniques that multiply output without multiplying hours. Save human effort for what only humans can do.

TL;DR The fastest code is code you didn't write: lean on starters, libraries, managed services, and one-click deploys.

Boilerplate Repos

Pre-built starters (Next.js, Flask, Express) skip the first 2 hours of setup. Have your go-to stack ready before the event.

Component Libraries

Use shadcn/ui, Radix, or Material UI instead of building primitives. Import, customize, ship. The fastest code is code you didn't write.

Deployment Pipeline

One-click deploy on Vercel or Netlify. Set up CI in hour one so you can always demo a live URL. Never demo from localhost.

API-First Approach

Use managed services (Supabase, Firebase, Auth0) instead of building infrastructure. Let them handle auth, storage, and databases.

Version Control Discipline

Commit often, branch per feature, never break main. A broken main at hour 20 is hackathon-ending.

Communication Shortcuts

Shared Figma, standups every 2-3 hours, one Slack/Discord channel. Over-communication beats under-communication at 3AM.

[Naval Ravikant](https://www.navalmanack.com/) — AngelList Co-founder

> “Code and media are permissionless leverage. They're the leverage behind the newly rich. You can create software and media that works for you while you sleep.”

Use leverage (templates, AI, APIs, no-code) and reserve human effort for vision, design, and high-impact decisions.

> “Make it work.  
> Make it right.  
> Make it fast.”

— [Kent Beck, creator of Extreme Programming](https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast)

In a 24-48 hour sprint, most teams never get past “make it work.” That's fine. A working demo with a clear story beats a half-finished masterpiece. Winners don't have the cleanest code; they shipped something that works and told a compelling story.

The engineer's role is shifting. You're measured by the experience you deliver, not lines of code. Use every tool, template, and AI assistant. Curate, don't create from scratch. Ship, then polish.

The fastest path to first place is the shortest path to a working demo.

## Execution Checklist

A step-by-step summary for shipping under extreme time pressure. Follow this and you'll never be the team scrambling at the last minute.

TL;DR Deploy early, ship a working flow first, timebox everything, and stop building 4 hours before submission.

Set up repo, boilerplate, and deploy pipeline in hour one. Never demo from localhost

Get the end-to-end flow working before adding features. Ugly is fine; broken is not

Timebox every task. Past 2 hours, cut scope or switch approach

Use AI for boilerplate. Save human effort for core logic, design, and integration

Checkpoint every 2-3 hours: "Can we demo right now?" If not, fix that first

Stop building 4 hours out. Polish UI, record the demo video, and rehearse the pitch

"Done is better than perfect." Ship what works, cut what doesn't, sell the vision

Remember: The goal isn't the best software, it's the best demo. Build less, leverage more, and always be ready to show what you've got.

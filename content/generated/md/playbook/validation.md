# Validation

> Validate your idea quickly against real constraints and judging criteria.

Canonical: https://thehackathonplaybook.dev/playbook/validation
Last updated: 2026-06-24

---

## The Lego Method

Don't try to validate the whole idea at once. Build small, tested building blocks, just like Legos, and snap them together into a winning project.

TL;DR Validate one piece at a time in isolation. Solid blocks snap together into a winning project.

The biggest mistake teams make: building the entire project in one shot, then discovering at hour 18 that a critical API doesn't work as assumed. The fix: validate one piece at a time, in isolation. Make each block solid, and the project assembles itself.

#### Test One Thing

One integration, one API, one flow at a time. Can you stream a response from OpenAI? Trigger a Twilio call from Python? Output text-to-speech audio in a browser?

Each question gets its own isolated experiment. No dependencies, no distractions.

#### Make It Bulletproof

Once a block works, make it reliable. Handle the failure modes. Know the rate limits and latency. A block battle-tested in a side project is one you can trust at 3AM.

A solid block never breaks during the demo. That's the whole point.

#### Snap Together

Proven blocks combine fast. OpenAI streaming + Twilio voice + a React frontend = a voice AI agent. The architecture emerges from blocks you already trust.

Composition is fast when every piece already works. The project assembles itself.

Think of it like actual Legos: you don't mold custom plastic at build time. You snap pre-made blocks together. The more blocks you test beforehand, the faster you build at the event.

## Pre-Hackathon Validation

Critical: validation happens BEFORE the hackathon, not during it. Your side projects are your lab. Use them to build a library of proven blocks.

TL;DR Validate tools weeks ahead in side projects. The event is for combining, not discovering broken APIs.

The hackathon is for combining and creating, not discovering that an API doesn't work. Every hour debugging a basic integration is an hour stolen from building the thing that wins.

#### Build Your Lego Library

Side projects and experiments are your testing ground.

-   OpenAI streaming: latency, token limits, error handling
-   Twilio voice: triggering, receiving, processing audio
-   Supabase: real-time subscriptions and auth flows
-   Infra: file uploads, WebSockets, deployment pipelines

Weeks before

validate tools during side projects

then combine

then combine

#### Combine and Create

Snap pre-validated blocks together. Only validate what's genuinely new and risky.

-   Combine proven blocks and focus on the novel integration
-   Spike only the one NEW risky piece, never tested before
-   Skip re-validating proven tools; trust your library
-   Spend saved hours on polish, pitch, and demo prep

Day of

validate only the new and risky

Pro tip: Research sponsor APIs before the event and build small experiments with their tools. By kickoff, you already know what works, what breaks, and where the free credits run out.

## Sponsor Recon

Before the hackathon, research every sponsor. Visit their docs, sign up for their APIs, and run a quick validation. The teams that win sponsor prizes are the ones who showed up already knowing the tech.

TL;DR Sponsor lists drop weeks early. Read the docs and validate each API before kickoff, not at 2AM.

Sponsor lists publish weeks before the event. That's your window. Every sponsor is a prize category, free credits, and tech you might build on. Teams that walk in cold, reading docs for the first time, are already behind.

#### Read the Docs

Sign up and run the quickstart. Can you get a “hello world” running in 30 minutes? If not, that's a red flag to learn before the event, not during it.

If the docs are bad or the API requires manual approval, plan around it.

#### Check for Gotchas

Hunt the project-killers: rate limits, approval waits, missing SDKs, deprecated endpoints, pricing tiers that cap out mid-demo. Find them in advance.

Run the API end-to-end in a throwaway project. Trust working code, not marketing pages.

#### Validate the Integration

Build a tiny proof-of-concept. If it works, you have a validated Lego block for hackathon day. If it fails, you dodged building on a broken foundation.

A 30-minute test now saves 3 hours of debugging at the event.

Bonus: Some judges are sponsor employees scoring how deeply you used their platform. Showing up already fluent in their API signals you're serious.

## Pick Your Stack

Lock in your tech stack before the hackathon. Your default should be tools you've used before. Only swap components when a sponsor makes it worth it.

TL;DR Default to the stack you build fastest with. Only swap a component when a sponsor prize justifies it.

The best stack isn't the most cutting-edge. It's the one you build fastest with. Keep a battle-tested default and deviate only for a strategic reason (like a sponsor prize).

#### Next.js

App Router, React 19, TypeScript. Server components for speed, client for interactivity. Pair with shadcn/ui and Tailwind for a polished UI in minutes.

Swap when: The hackathon requires a specific framework, or you're building a mobile app (use React Native or Flutter).

#### FastAPI

Async Python, auto OpenAPI docs, first-class with every AI/ML library. Most AI sponsor SDKs ship Python-first, so your backend should too.

Swap when: You need real-time WebSockets at scale (use Node), or the project is frontend-only (use Next.js API routes).

#### Supabase

Postgres, auth, storage, real-time in one service. The free tier covers any hackathon. Set up auth in 10 minutes instead of building it from scratch.

Swap when: MongoDB is a sponsor (use MongoDB Atlas), or you need a vector DB for RAG (add Pinecone or pgvector).

The swap rule: Replace a default component only if (1) you're targeting a sponsor prize for that tech, or (2) the project genuinely requires it. Never swap for trendiness. The hackathon is not the time to learn a new database.

## Target Your Prize

Before the hackathon starts, study the prize categories and pick 1-2 to aim for. This decision shapes your idea, your tech stack, and your pitch.

TL;DR Pick your target prize first, then reverse-engineer the project from its description. Read it like a rubric.

Most teams build something cool, then pick a prize at the end. That's backwards. Winning teams pick the target prize first and reverse-engineer from there. The prize description tells you exactly what judges want. Read it like a rubric.

#### Less Competition, More Focused

Fewer teams submit because sponsor prizes require specific-API research and integration. If you've already validated the tech (see Sponsor Recon), you have a real edge.

-   Read the prize like a scoring rubric
-   Make the tech central to your demo, not a side feature
-   Name the sponsor in your pitch

#### Highest Stakes, Widest Pool

The hardest prize to win: every team competes for it. To win, be impressive across the board: technical depth, polished UI, strong pitch, compelling problem.

-   Optimize for wow factor in the demo
-   Airtight pitch: every judge sees it
-   Polish matters more than in sponsor categories

Pro strategy: Make one sponsor prize your primary and “Best Overall” your stretch. Build for the sponsor category, then polish enough to compete overall. Doubles your chances without splitting effort.

## The Go Bag

A curated set of pre-built, pre-validated components you bring to every hackathon. These are the Lego blocks you've already tested, ready to snap in on day one.

TL;DR Bring a go bag of battle-tested scaffolds and configs so you start day one on the common infrastructure.

Experienced teams don't start from scratch. They bring a go bag of reusable scaffolds, configs, and components already battle-tested in side projects. It's not pre-built features; it's the infrastructure every project needs, already solved.

#### Authentication

-   Supabase Auth with Google/GitHub OAuth pre-configured
-   Protected-route middleware to drop into any Next.js app
-   Polished login/signup pages

Auth is the #1 time sink at hackathons. Never build it from scratch.

#### Interface Components

-   shadcn/ui layout: navbar, sidebar, dashboard ready to go
-   Dark mode, responsive breakpoints, consistent palette
-   Loading states, error boundaries, toasts

A polished UI in the first hour makes the whole project feel real.

#### Agent Scaffolds

-   OpenAI Agents SDK scaffold with tool-calling and streaming wired up
-   Prompt templates: summarization, extraction, classification
-   RAG pipeline: chunking, embeddings, vector search

Most hackathon projects now involve AI. Have the plumbing ready.

#### Deployment & Config

-   Vercel config with environment variables templated
-   Docker Compose for local dev with hot reload
-   .env.example with every API key slot you use

Deploy in the first hour. A live URL makes everything feel real to judges.

Build your go bag during side projects, not the night before. Every component should be something you've used in a real project. Untested means it's not a Lego block, it's an unknown. Keep it in a private repo and update it after every hackathon.

### Assemble Your Go Bag

Pick one tool per category to build your personal hackathon loadout. Click a tool, then click its slot. Or drag and drop.

Auth

Click a tool below to equip

UI Framework

Click a tool below to equip

Deployment

Click a tool below to equip

LOADOUT

0 / 6 equipped

0%

AI / ML

Click a tool below to equip

Database

Click a tool below to equip

Realtime / Comms

Click a tool below to equip

Inventory — click to equip, or drag onto a slot

Auth

Supabase Auth

Clerk

NextAuth.js

Firebase Auth

Auth0

UI Framework

shadcn/ui

Chakra UI

Material UI

Ant Design

Mantine

AI / ML

OpenAI SDK

Anthropic SDK

LangChain

Hugging Face

Vercel AI SDK

Database

Supabase

Firebase

MongoDB Atlas

PlanetScale

Neon

Deployment

Vercel

Railway

Fly.io

Render

Netlify

Realtime / Comms

Twilio

WebSockets

Pusher

Ably

Stream

## Spike Solutions — Test the Riskiest Piece First

From Kent Beck's Extreme Programming: a small, throwaway experiment to test a risky technical assumption before committing to a full implementation.

TL;DR Spike the one assumption that could kill your idea before writing real code. 30-60 minutes de-risks the project.

#### 30-60 Minutes That Save Your Hackathon

Identify the riskiest technical assumption and spike it before writing a single line of real code.

> “A spike solution is a very simple program to explore potential solutions. It focuses only on the problem under examination while ignoring all other concerns. Most spikes are not good enough to keep, so expect to throw away the code.”

— [Kent Beck, Extreme Programming](https://en.wikipedia.org/wiki/Extreme_programming)

The Rule

Every idea has one piece that could kill it. Find it and test it first. If the spike fails, pivot before investing more time. If it works, the whole project is de-risked.

Example Spikes

Can GPT-4 actually triage 911 calls accurately?

~ 45 min spike

Can Twilio handle real-time audio streaming to an LLM?

~ 30 min spike

Can we run inference fast enough for a live demo?

~ 60 min spike

[Richard Feynman](https://en.wikiquote.org/wiki/Richard_Feynman) — Nobel Laureate in Physics

> “What I cannot create, I do not understand.”

Can't build the smallest version of the riskiest piece? You don't fully understand the problem yet. The spike earns that understanding fast.

### 

TL;DR Decades of engineering research back the Lego method: build small, test end-to-end, and learn before you commit.

#### Build-Measure-Learn

> “The goal of the MVP is to begin the process of learning, not end it.”

Each Lego block is a mini MVP cycle: build the smallest testable version, measure, learn, repeat. By the time you combine them, you've learned what matters.

— [The Lean Startup, 2011](http://theleanstartup.com/)

#### Prototype Over Meetings

> “If a picture is worth a thousand words, a prototype is worth a thousand meetings.”

IDEO's philosophy: stop debating whether something works and build it. A 30-minute prototype answers more than a 2-hour whiteboard session.

— [David Kelley, IDEO founder](https://www.ideo.com/)

#### Walking Skeleton

> “A tiny implementation that performs a small end-to-end function, linking together the main architectural components.”

Before adding features, get one path working from UI to logic to data. The skeleton proves your architecture. Once it walks, flesh it out. Never start with the flesh.

— [Alistair Cockburn, Agile Manifesto co-author](https://wiki.c2.com/?WalkingSkeleton)

#### Tracer Bullet Development

> “Tracer bullets show what you're hitting. This may not always be the target. You then adjust your aim until they're on target. That's the point.”

Like tracer rounds showing where shots land, tracer code runs one narrow path through all layers. Real feedback on your architecture before you commit to building everything.

— [The Pragmatic Programmer, 1999](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/)

## The Validation Ladder

A four-step progression from 'can we technically do it?' to 'can a judge use it and understand it?' Each step builds on the last.

TL;DR Climb four rungs: proof of concept, walking skeleton, prototype, demo-ready MVP. A strong Lego library lets you start higher.

Proof of Concept

Can we technically do it?

One person, 1-2 hours. Test the hardest integration, the piece most likely to kill the idea. Throwaway code is fine. You're testing feasibility, not building product.

Walking Skeleton

Can we connect all the pieces?

The tiniest end-to-end path through UI, logic, and data. Click a button, backend processes, result shows on screen. Not pretty, but connected.

Prototype

Does the flow feel right?

Clickable and interactive, showing the user journey. Test it with a teammate: can they use it without explanation? If they're confused, fix the flow before adding features.

Demo-Ready MVP

Can a judge use it and understand it?

A polished happy path. The core flow is smooth, the main screens are clean, and the demo tells a story. Edge cases don't matter. The golden path does.

You don't have to climb every rung at the hackathon. A strong Lego library lets you start at step 2 or 3 on day one. Pre-validation compresses the ladder, and that's the whole advantage.

## Two-Way Door Decisions

Most hackathon decisions are reversible. Make them fast. Save your deliberation for the few choices you can't undo.

TL;DR Decide reversible (two-way door) choices in under 5 minutes. Spend your deliberation on the few you can't undo.

> “Most decisions are two-way doors. If you make the wrong decision, you come back in and pick another door. But some decisions are one-way doors — you go in that door, you're not coming back.”

— [Jeff Bezos, founder of Amazon](https://en.wikipedia.org/wiki/Jeff_Bezos)

#### Decide Fast, Swap Later

-   Tech stack: swap a library anytime
-   Feature scope: add or cut as you go
-   UI layout: iterate quickly
-   API choice: test one, swap if it fails

< 5 min

decide and move on

#### Deliberate Carefully

-   Core idea: pivoting mid-event costs hours
-   Team composition: roles set the trajectory
-   The problem you solve: it shapes everything
-   Prize track: it determines your constraints

Take your time

these decisions are hard to undo

#### 80/20 Decision Time

Spend 80% of your decision energy on one-way doors. Make two-way doors in under 5 minutes. Losing teams don't pick the wrong framework; they spend 2 hours debating which one to use.

Reid Hoffman: “If you aren't embarrassed by the first version of your product, you shipped too late.” Perfect decisions aren't the goal. Fast, reversible decisions are.

> “What I cannot create,  
> I do not understand.”

— [Richard Feynman, Nobel Laureate in Physics](https://en.wikiquote.org/wiki/Richard_Feynman)

In hackathons, validation IS creation. Build the smallest version of each piece. If it won't work in isolation, it won't work in the full project. Don't assume. Prove it with code.

Your Lego library is your competitive advantage. Every pre-tested block is hours saved. While other teams debug their first API call at hour 4, you're composing proven blocks into something that already works.

The team with the most pre-validated blocks wins because they spend the hackathon creating, not discovering.

## Validation Checklist

A step-by-step summary for de-risking your hackathon project. Follow this before and during every event.

TL;DR Run this list before and during every event: test early, test in isolation, and trust only proven blocks.

Build a "Lego library" of tested blocks during side projects

Research every sponsor's API and docs, and run one validation test per sponsor

Lock in a default stack (Next.js + FastAPI + Supabase); swap only for a sponsor prize

Pick your target prize and reverse-engineer the judging criteria from its description

Pack your go bag: pre-validated auth, UI, agent scaffolds, and deployment configs

Spike the riskiest technical assumption first, in 30-60 minutes

Get a walking skeleton working in the first 2 hours, one path from UI to data

Validate each block in isolation before combining; never test two unknowns at once

Make two-way door decisions in under 5 minutes; save deliberation for one-way doors

If the spike fails, pivot immediately instead of sinking time into a broken assumption

"What I cannot create, I do not understand." Can't build the smallest version? Rethink the approach

Remember: Validation isn't about proving your idea is perfect. It finds what's broken before you're 18 hours deep with no backup plan. Test early, test in isolation, trust only proven blocks.

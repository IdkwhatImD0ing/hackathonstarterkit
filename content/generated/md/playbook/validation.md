# Validation

> Test the riskiest part of your idea early, and prep your stack if you're competing to win.

Canonical: https://thehackathonplaybook.dev/playbook/validation
Last updated: 2026-09-14

---

## The Lego Method

Build the project out of small blocks you've each tested, the way you'd build with Legos.

TL;DR Test one integration at a time, on its own, before you connect anything.

Wire untested pieces together and, when something breaks, you can't tell which piece it was. Every block you test also goes into your Lego library, so at the next hackathon it's already working.

#### Test One Thing

Give each integration its own small test. Stream a response from OpenAI. Trigger a Twilio call from Python. Play text-to-speech audio in a browser.

#### Make It Bulletproof

Once a block works, find out how it fails. Learn its rate limits and latency, and handle the errors it throws. Then it's less likely to break during the demo.

#### Snap Together

OpenAI streaming + Twilio voice + a React frontend = a voice AI agent. When each piece already works, connecting them is the fast part.

## Pre-Hackathon Validation

What to test in side projects before a hackathon, and what's left for the weekend itself.

TL;DR If you're going for a prize, test your tools in side projects in the weeks before the event.

At the event you want to spend your hours combining pieces you've already tested. If you're going to learn or have fun, you can skip the prep and still get a lot out of the weekend: brainstorm with people you meet, build something on the spot, and find teammates there.

#### Build Your Lego Library

Blocks worth testing in side projects:

-   OpenAI streaming: latency, token limits, error handling
-   Twilio voice: triggering, receiving, processing audio
-   Supabase: real-time subscriptions and auth flows
-   Infra: file uploads, WebSockets, deployment pipelines

then combine

then combine

#### Combine and Create

Your time goes to the part that's new.

-   Combine blocks you've tested, and spike only the piece you haven't (see Spike Solutions below)
-   Spend the saved hours on the demo and the pitch

## Sponsor Recon

Sponsor lists usually go up before the event. Use that window.

TL;DR If you want a sponsor prize, get that sponsor's API working before kickoff.

Each sponsor can mean a prize category and free credits. Some judges are sponsor employees scoring how deeply you used their platform, and they can tell when you already know it well.

#### Read the Docs

Sign up and run the quickstart. You should have a “hello world” running within 30 minutes.

If it takes longer, or the API requires manual approval, plan around it.

#### Check for Gotchas

Look for what could stop you: rate limits, missing SDKs, deprecated endpoints, and free tiers or credits that run out mid-demo. The marketing page won't list them, so you find them by calling the API.

#### Validate the Integration

Build a tiny proof of concept that calls the API end to end. If it works, it goes in your library for hackathon day. If it fails, you know before the event starts.

## Pick Your Stack

Lock in your stack before the hackathon, using tools you've already built with.

TL;DR Default to the stack you build fastest with. Swap a piece only for a sponsor prize or a real project need.

My default is Next.js, FastAPI, and Supabase. If your team is faster in something else, use that instead. Just don't swap in a tool because it's new and trendy.

#### Next.js

App Router, React 19, TypeScript. Server components for speed, client components for interactivity. Add shadcn/ui and Tailwind and the UI looks finished in minutes.

Swap when: the hackathon requires a specific framework, or you're building a mobile app (use React Native or Flutter).

#### FastAPI

Async Python, auto OpenAPI docs, and direct access to Python's AI and ML libraries.

Swap when: the project is frontend-only (use Next.js API routes), or you want one language across the stack (use Node). FastAPI supports WebSockets, so real-time alone isn't a reason to switch.

#### Supabase

Postgres, auth, storage, real-time in one service. The free tier is usually enough for a weekend, and auth takes about 10 minutes to set up.

Swap when: MongoDB is a sponsor (use MongoDB Atlas), or you need a vector DB for RAG (add Pinecone or pgvector).

Learning a new tool at the event: If you're trying to win, a hackathon is a bad place to learn a new database. If you're there to learn, it can pay off in other ways.

## Target Your Prize

If you're competing, pick 1-2 prizes before the event. That choice shapes what you build and how you pitch it.

TL;DR Pick your target prize before your idea, then work backward from its description.

If you build something cool and look for a prize at the end, you're fitting the project to a category it wasn't built for. The prize description is the closest thing you'll get to the judges' rubric, so read it like one.

#### Less Competition, More Focused

Fewer teams go for them, because they need a specific sponsor's API. If you've already got that API working (see Sponsor Recon), you start ahead.

-   Make the sponsor's tech central to your demo
-   Name the sponsor in your pitch

#### Highest Stakes, Widest Pool

The hardest prize to win, because every team is in the running. You need technical depth, a polished UI, a strong pitch, and a compelling problem.

-   Optimize for wow factor in the demo
-   Airtight pitch: every judge sees it

One project can take both kinds of prize. Dispatch AI won the Grand Prize at the UC Berkeley AI Hackathon 2024 and Best Use of Intel AI.

Pro strategy: Make one sponsor prize your primary and “Best Overall” your stretch. Build for the sponsor category, then polish enough to compete overall.

## The Go Bag

The scaffolds and configs you've already tested, kept in one place and brought to every hackathon.

TL;DR Keep auth, UI, AI scaffolds, and deploy config in a private repo so you don't rebuild them at the event.

Fill it from your side projects, and only with things you've used in a real project. Add to it after each hackathon. It only covers setup; you still build the features at the event.

#### Authentication

-   Supabase Auth with Google/GitHub OAuth pre-configured
-   Protected-route middleware to drop into any Next.js app
-   Polished login/signup pages

Don't build auth from scratch at a hackathon. It takes hours, and Supabase Auth takes about 10 minutes.

#### Interface Components

-   shadcn/ui layout: navbar, sidebar, dashboard ready to go
-   Dark mode, responsive breakpoints, consistent palette
-   Loading states, error boundaries, toasts

#### Agent Scaffolds

-   OpenAI Agents SDK scaffold with tool-calling and streaming wired up
-   Prompt templates: summarization, extraction, classification
-   RAG pipeline: chunking, embeddings, vector search

#### Deployment & Config

-   Vercel config with environment variables templated
-   Docker Compose for local dev with hot reload
-   .env.example with every API key slot you use

Deploy in the first hour. A live URL makes the project feel real to judges.

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

From Kent Beck's Extreme Programming Explained (1999): a small, throwaway experiment to test a risky technical assumption before committing to a full implementation.

TL;DR Before writing real code, spend 30-60 minutes testing the one assumption most likely to kill the idea.

#### What a Spike Looks Like

> “A spike solution is a very simple program to explore potential solutions. … Most spikes are not good enough to keep, so expect to throw it away.”

— [Don Wells, Extreme Programming: A Gentle Introduction, extremeprogramming.org](http://www.extremeprogramming.org/rules/spike.html)

The Rule

If the spike fails, change the plan before you sink more time into it. If it works, the biggest risk is gone.

Example Spikes

Can GPT-4 actually triage 911 calls accurately?

~ 45 min spike

Can Twilio handle real-time audio streaming to an LLM?

~ 30 min spike

Can we run inference fast enough for a live demo?

~ 60 min spike

### 

TL;DR IDEO in design and Alistair Cockburn in software both find out whether something works by building a tiny version of it early.

#### Prototype Over Meetings

> “If a picture is worth a thousand words, a prototype is worth a thousand meetings.”

My rule of thumb: a 30-minute prototype answers more than a 2-hour whiteboard session.

— [A saying at IDEO, quoted by the Interaction Design Foundation, Design Thinking: Get Started with Prototyping](https://ixdf.org/literature/article/design-thinking-get-started-with-prototyping)

#### Walking Skeleton

> “A Walking Skeleton is a tiny implementation of the system that performs a small end-to-end function. It need not use the final architecture, but it should link together the main architectural components.”

— [Alistair Cockburn, Agile Manifesto co-author, Crystal Clear, 2004](https://wiki.c2.com/?WalkingSkeleton)

Step 2 of the Validation Ladder below is built on this.

## The Validation Ladder

Four stages, from 'can we technically do it?' to 'can a judge use it and understand it?'

TL;DR With tested blocks from side projects, you can start day one at step 2 or 3.

Proof of Concept

Can we technically do it?

One person runs the spikes from Spike Solutions above. Throwaway code is fine.

Walking Skeleton

Can we connect all the pieces?

The smallest end-to-end path: click a button, the backend processes it, the result shows on screen. It doesn't have to look good.

Prototype

Does the flow feel right?

Clickable, with the whole user journey. Hand it to a teammate without explaining anything. If they get confused, fix the flow before adding features.

Demo-Ready MVP

Can a judge use it and understand it?

Polish only the path you'll demo, until the core flow runs smoothly and the main screens look clean. Edge cases can wait.

## Two-Way Door Decisions

Sort each decision by whether you can undo it. Most of what you decide at a hackathon, you can.

TL;DR Decide reversible (two-way door) choices in under 5 minutes. Spend your deliberation on the few you can't undo.

> “Some decisions are consequential and irreversible or nearly irreversible – one-way doors – and these decisions must be made methodically, carefully, slowly, with great deliberation and consultation. … But most decisions aren't like that – they are changeable, reversible – they're two-way doors.”

— [Jeff Bezos, founder of Amazon, 2015 Letter to Shareholders](https://www.aboutamazon.com/about-us/shareholder-letters)

#### Decide Fast, Swap Later

-   Tech stack: swap a library anytime
-   Feature scope: add or cut as you go
-   UI layout: iterate quickly
-   API choice: test one, swap if it fails

#### Deliberate Carefully

-   Core idea: pivoting mid-event costs hours
-   Team composition: roles are hard to change once you start
-   The problem you solve: everything else depends on it
-   Prize track: it sets your constraints

#### 80/20 Decision Time

Spend 80% of your decision energy on one-way doors. A slightly wrong framework costs you less than 2 hours spent debating which one to use.

## Validation Checklist

The whole page, as one list.

TL;DR If you're competing, do the first five in the weeks before the event and the rest once it starts.

Build a library of tested blocks during side projects

Read each sponsor's docs and run one test per sponsor API

Lock in a default stack (Next.js + FastAPI + Supabase); swap only for a sponsor prize or a real need

Pick your target prize and read its description like a rubric

Pack your go bag: the auth, UI, agent scaffolds, and deploy config you've already tested

Spike the riskiest technical assumption first, in 30-60 minutes. If it fails, change the plan

Get a walking skeleton working in the first 2-4 hours, one path from UI to data

Test each new block by itself before you connect it to another

Make two-way door decisions in under 5 minutes; save deliberation for one-way doors

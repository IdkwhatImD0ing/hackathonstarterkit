---
name: hackathon-stack-selection
description: "Choose a hackathon tech stack optimized for shipping in 24-48 hours. Use when picking frameworks, hosting, and AI tooling at the start of a hackathon."
---

## The Stack That Wins, In One Glance

Skip the research. After 50+ hackathons, here's the default stack I reach for and recommend to every team I mentor.

1. **Frontend** Next.js 16 + Tailwind CSS + shadcn/ui
2. **Backend** Python FastAPI, or Next.js API routes if you want one language
3. **Database & Auth** Supabase or Firebase (both set up in under 10 minutes)
4. **Deployment** Vercel for the frontend, Railway for the backend
5. **AI** OpenAI or Claude API, plus whatever the sponsor wants

> **The short version:** The best hackathon stack isn't the most impressive one. It's the one that gets a polished, deployed demo done in 24-48 hours. There's one rule at the end of this post that beats every tool choice above, and most teams ignore it.

## Frontend: Next.js, Every Time

**Next.js with React is the most popular frontend at hackathons**, and it earns the spot. Server-side rendering for fast demos, file-based routing for new pages in seconds, and a massive component ecosystem you can paste from.

`terminal`:

```bash
npx create-next-app@latest my-hackathon-app
cd my-hackathon-app
npx shadcn@latest init
npm run dev
```

**Do:**

- Next.js + Tailwind CSS + shadcn/ui (my default)
- Vite + React for a pure single-page app
- Svelte or SvelteKit if your team already knows it

**Don't:**

- Angular: too much boilerplate for 24 hours
- Complex monorepo setups
- Learning a brand-new framework mid-event

## Backend: Python or Node, Nothing Exotic

**Python (FastAPI or Flask) and Node.js (Express) cover almost every hackathon backend.** Python wins for AI and ML work thanks to its libraries. Node wins when your frontend is already JavaScript and you want one language across the stack.

`main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

@app.get("/api/health")
def health():
    return {"status": "ready to hack"}
```

> **Tip:** Better still, skip the server. Serverless functions on Vercel or AWS Lambda remove server management entirely, and Railway and Render do one-click deploys that save you hours.

## Database and Auth: Firebase or Supabase

**Firebase and Supabase are the go-to picks**, and the reason is speed: instant setup, real-time data, auth out of the box, and free tiers that easily cover a weekend.

**Do:**

- Firebase for NoSQL and real-time features
- Supabase for PostgreSQL and SQL
- Both configured in under 10 minutes
- Free tiers that cover a hackathon with room to spare

**Don't:**

- Self-hosted databases (too much setup time)
- Complex ORM configurations
- Rolling your own auth from scratch
- Any database without built-in auth

## AI APIs: Read the Docs Before You Arrive

AI APIs are now table stakes. **Most sponsor challenges involve AI in some way**, so pick a model and learn its docs cold.

| OpenAI | Anthropic | Google | Fast Inference |
| --- | --- | --- | --- |
| GPT-4o | Claude 4 | Gemini | Groq |

> **The #1 time-saver:** Check the sponsor list and pre-read their API docs before the event starts. Winning projects often integrate 2-3 sponsor APIs, and walking in already knowing them is the single biggest hour-saver of the weekend.

## Deployment: A Live URL Beats Localhost

Judges want to see a real URL, not your laptop. **A deployed project beats a localhost-only demo every time**, and it costs one command.

`terminal`:

```bash
# Frontend to Vercel
npx vercel deploy

# Full-stack to Railway
railway up
```

> **Warning:** Building mobile? Use Expo for React Native and test instantly with a QR code. Building hardware? Record a working video demo as backup, because live hardware fails at the worst moment.

## The Demo Video Outlives Your Whole Team

Here's the part most teams skip. **The demo video is the only piece of your submission that keeps working after you leave the room.** Judges rewatch it during deliberation, recruiters find it on YouTube, and sponsors clip it for their own posts. Skipping it is the highest-cost mistake you can make.

**Do:**

- Screen Studio (Mac): what I use, with auto-zoom and cursor smoothing built in
- CanVid (Windows): the closest equivalent
- 60-90 seconds, one take is fine
- Voiceover: problem first, then product

**Don't:**

- QuickTime and built-in recorders (no zoom, no polish)
- 5-minute recordings (judges scrub, not watch)
- Slide-only videos that never show the product
- No voiceover or captions

## The One Rule That Beats Every Tool

> **The golden rule:** The best stack is the one your team already knows. Don't learn React if your team writes Vue. Don't pick Rust if your team writes Python. Speed of execution beats technical novelty, always.

That's the rule I promised up top. The stack in this post is a strong default, but if your team is faster in something else, **use that instead and ship more in less time.** Lock the tools fast so you can spend the weekend building, then put your last hours into the demo video.

[Hackathon Submission Playbook](https://thehackathonplaybook.dev/playbook/submission): Demo video examples that won the largest 24-hour hackathon in the US and landed an internship offer.

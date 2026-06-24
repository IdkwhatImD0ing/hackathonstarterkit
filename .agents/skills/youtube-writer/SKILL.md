---
name: youtube-writer
description: "Write the YouTube title and description for a hackathon project's demo video, tuned for recruiters and search. Use this whenever the user is uploading or has uploaded a demo video and needs the video title or description copy."
---

# YouTube Writer

The demo video is the highest-signal thing you can share, and it keeps working long after the hackathon: recruiters find these videos on YouTube months later. This writes the title and description so the video is findable and the description does the selling while you are not in the room.

## Gather the facts

Detect first, ask second. Read the repo and any existing README or Devpost copy, then ask for what is missing:

- Project name and a one-line description of what it does.
- The core features (three to five), in plain user-side language.
- The stack and any notable integrations.
- Hackathon name and any awards (real ones only).
- Links: Devpost, GitHub, live URL.
- The user's socials (LinkedIn, GitHub) for the follow line.

Never invent an award or statistic.

## Write the title

Format: `<Project> Product Demo | <what it does>`. For example:

```
DispatchAI Product Demo | AI-powered 911 Response System
```

- Front-load the project name; keep the name and core value inside the first 50 characters (that is what shows in search).
- Stay under the 100-character hard cap, and aim for about 70 or fewer.
- No clickbait. Offer two or three options.

## Write the description

Follow this structure exactly. This is the template, with a real example below it:

1. **Award line** (only if real): `Winner @ <Event> - <Award 1>, <Award 2>, and <Award 3>!`
2. **The hook**: one paragraph opening with "In this video, we're diving into `<Project>`, ..." that says what it is and why it matters.
3. **What it does**: one paragraph in plain, user-side language describing the experience and the problem it solves.
4. **Core Features:** a short bullet list (three to five lines).
5. **Links**: the Devpost and the source code, written casually ("Check out the Devpost here!", "And the source code here!").
6. A divider line.
7. **Follow line**: the user's LinkedIn and GitHub.

Example output:

```
Winner @ UC Berkeley AI Hackathon 2024 - Grand Prize, AI for Good, and Best Use of Intel AI!

In this video, we're diving into DispatchAI, a groundbreaking AI-powered system designed to revolutionize emergency response. When seconds count, DispatchAI supports 911 call centers with intelligent, empathetic call management to help save lives.

DispatchAI streamlines emergency response with an AI that prioritizes critical calls, detects caller emotions, and suggests actions like ambulance dispatch, all under human oversight. It aims to reduce wait times in understaffed call centers, addressing a crucial need in emergency services.

Core Features:
Intelligent call prioritization based on severity and emotion detection
Real-time call summaries and action recommendations
Interactive operator dashboard with map visualization
Seamless integration with Twilio, Hume, Retell, and OpenAI
Optimized on Intel Dev Cloud for fast, reliable performance

Check out the Devpost here! https://devpost.com/software/dispatch-ai
And the source code here! https://github.com/DispatcherAI/DispatcherAI

-------------

Follow me on LinkedIn for more hackathon and startup content. https://linkedin.com/in/bill-zhang1
Check out my Github for more cool projects! https://github.com/IdkwhatImD0ing
```

If there is no award, drop line 1 and open with the hook.

## Verify

- The title front-loads the project name inside the first 50 characters and claims no award that was not actually won.
- The hook works on its own in the first line.
- Every link resolves, and every award or stat is real.
- No em dashes in the body copy (use commas, parens, or split sentences).

## Final output

Return:

1. **Title options**: two or three.
2. **Description**: the full copy-paste block.

## Boundaries

- Never invent awards or statistics.
- Keep the copy honest and specific.

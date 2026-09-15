# Skills & Commands

> Slash commands for each stage of a hackathon build, from planning your app to writing its README.

Canonical: https://thehackathonplaybook.dev/non-coders/skills

---

## How to Install

Paste this prompt into Cursor's agent chat (Ctrl+I, or Cmd+I on a Mac) or into Claude Code. The AI runs the install command in the terminal, then lists the skills it added.

paste this into your AI chat

```
Install the non-coder skills from this GitHub repo: https://github.com/IdkwhatImD0ing/hackathonstarterkit

Run this command in the terminal:
npx skills add IdkwhatImD0ing/hackathonstarterkit

Then confirm the installation when prompted. After it finishes, tell me which skills were installed.
```

Installing one skill: open its page from the list below. Each page has a command that installs just that skill.

## Recommended Run Order

For a new project, run them in this order. /non-coder-mode goes first so the AI talks to you in plain English from the start. Steps 3 and 4 won't run without the two files /domain-to-spec writes.

1.  Before you write any code

    [`/non-coder-mode`

    The AI works in small steps and explains each in plain English. It asks before anything risky, like deleting files, and stays on for the rest of the session.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/non-coder-mode)
2.  [`/domain-to-spec [your profession] [what you want to build]`

    Interviews you about your field and your idea, then writes AGENTS.md (rules for the AI) and PRD.md (the plan for your app).

    Open →](https://thehackathonplaybook.dev/non-coders/skills/domain-to-spec)
3.  While you build

    [`/scaffold-frontend`

    Turns PRD.md into the first version of your app's frontend in a client/ folder: Next.js pages, navigation, types, and an optional client for your backend.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/scaffold-frontend)
4.  [`/scaffold-backend`

    Builds a FastAPI backend in a server/ folder, with sample data for each route PRD.md lists and optional Supabase. Skips itself if PRD.md says no backend.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/scaffold-backend)
5.  [`/feature-builder [describe the feature you want]`

    Run it once for each feature. It shows you the plan first: the files and commands it will use, how to test the result, and how to undo it.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/feature-builder)
6.  When you hit an error

    [`/bugfix-doctor [paste the error or describe the symptom]`

    Translates the error into plain English, then finds what caused it. It makes the smallest fix it can and checks that the fix worked.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/bugfix-doctor)
7.  Before judging

    [`/demo-prep [app name or description]`

    A timed demo script from problem to result, with a backup plan if the app breaks and the questions judges will likely ask.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/demo-prep)
8.  [`/readme-writer [your project name or repo]`

    Writes your README (your repo's front page) with badges, a demo video, a how-it-works diagram, and team cards. It also fills in the repo's description, website, and topics so judges and recruiters can find it.

    Open →](https://thehackathonplaybook.dev/non-coders/skills/readme-writer)

## Other Commands

[`/quickstart`

Runs /domain-to-spec, /scaffold-frontend, and /scaffold-backend (if needed) in one go, pausing once so you can approve the plan.

Open →](https://thehackathonplaybook.dev/non-coders/skills/quickstart)[`/v0-prompt-crafter [paste your PRD or one-line product description]`

An alternative to /scaffold-frontend. It turns PRD.md or a one-line idea into a paste-ready Vercel v0 prompt, with a visual style researched for your industry.

Open →](https://thehackathonplaybook.dev/non-coders/skills/v0-prompt-crafter)

`/explain [paste code, an error, or describe what you want to understand]`

Use it whenever something on screen doesn't make sense. The AI explains it in plain English and defines every technical term it uses.

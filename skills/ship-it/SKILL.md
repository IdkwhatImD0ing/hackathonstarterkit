---
name: ship-it
description: "Produce all four post-hackathon deliverables in one pass: the recruiter-facing portfolio site, the GitHub README, the Devpost submission, and the YouTube demo description. Gathers the shared facts once, then runs portfolio-builder, readme-writer, devpost-writer, and youtube-writer in order so the four read as one consistent story. Use this whenever the user wants to ship everything after a hackathon, package a finished project for recruiters, or run the full post-hackathon toolkit at once instead of one skill at a time."
---

# Ship It

After the hackathon, a finished project needs four things to become findable: a portfolio site, a GitHub README, a Devpost submission, and a YouTube description for the demo. Running them one at a time means re-answering the same questions four times. This skill interviews once, then drives all four sub-skills in order so the deliverables stay consistent: the same tagline, the same stats, the same awards, the same demo, told four ways for four audiences.

This skill coordinates other skills. It does not replace them or skip their safety checks; it feeds them a shared fact sheet so they stop asking the user to repeat themselves.

## Pipeline

```text
portfolio-builder -> readme-writer -> devpost-writer -> youtube-writer
```

Portfolio first because it forces the sharpest version of the story (hero, problem, results), and the README, Devpost, and YouTube copy all reuse that framing.

## Step 0: Make the sub-skills available

This skill needs four others. Check which already appear in your available skills, and install only the missing ones from the terminal:

```bash
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill portfolio-builder
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill readme-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill devpost-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill youtube-writer
```

One prerequisite the agent cannot install for itself: `portfolio-builder` uses Anthropic's `frontend-design` skill for a non-templated design. If it is not already in your available skills, ask the user to run these two slash commands in Claude Code before Step 3, because the agent cannot run slash commands:

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install frontend-design@claude-plugins-official
```

Do not block the interview on this. Gather facts first, and only pause for the plugin when the portfolio step is about to run.

## Step 1: Gather the shared facts once

Detect first, ask second. Read what the repo already tells you before interviewing: `AGENTS.md`, `PRD.md`, the existing `README`, `package.json`, and any logos, screenshots, diagrams, or headshots in `.github/assets/`, `public/`, or `assets/`. The git remote gives you `owner/repo`.

Then ask, in one pass, only for what the repo cannot reveal. This is the union of what all four sub-skills need, so collecting it now means none of them have to interview again:

- **Project name** and a one-line **tagline** that names the stakes, not the tech.
- **Project type**: web app, hardware or IoT, ML model, CLI or dev tool, mobile, or research. This decides how `portfolio-builder` shows a non-web project.
- **The problem**, with one real statistic and its source. No invented numbers.
- **Core features**: three to five, in plain user-side language.
- **Stack and architecture**: the real layers and the notable technical decisions.
- **Demo video**: the YouTube URL or ID, the length, and its beats or timestamps (so the YouTube chapters and the clickable poster are real).
- **Links**: live deployment URL, Devpost URL, GitHub repo, and any open-source artifacts (model, dataset, design doc, Figma).
- **Awards and placement**, with exact sponsor track names. Real ones only.
- **Event facts**: name, dates, venue, hacker or team count, prize pool.
- **Team**: names, roles, GitHub handles, LinkedIn URLs, headshot paths.
- **The story beats** Devpost needs: the challenges you actually ran into, the accomplishments you are proud of, what you learned, and what is next.
- **The user's socials** (LinkedIn, GitHub) for the YouTube follow line.

Write the answers to a short working fact sheet you keep in context for the whole run. Anything still unknown after asking stays a clearly marked TODO; never guess to fill a field.

Confirm the fact sheet with the user before generating anything. One round of corrections here saves four rounds later.

## Step 2 through 5: Run the sub-skills in order

Run each sub-skill's full workflow, honoring all of its own rules, but seed each one with the shared fact sheet so it skips its own interview and only asks about genuine gaps. Stay consistent across all four: one tagline, one set of stats, one list of awards.

1. **`portfolio-builder`** — the recruiter-facing case-study site. Confirm `frontend-design` is available first (Step 0). Produces the sharpest version of the hero, problem, architecture, demo, results, team, and honest limits.
2. **`readme-writer`** — the GitHub README, reusing the portfolio's hero framing: centered hero, badges, clickable demo poster, architecture diagram, team cards, honest build-context note. It also sets the repo's About metadata (description, website, topics) to match.
3. **`devpost-writer`** — the Devpost story (inspiration, what it does, how we built it, challenges, accomplishments, what we learned, what's next), Built With tags, and Try it out links. It must not contradict the README.
4. **`youtube-writer`** — the demo video's title and description, with real chapter timestamps from the beats captured in Step 1 and a hook in the first two lines.

After each step, show the result and pause briefly so the user can redirect before the next one runs. If a step fails or the user wants to stop, do not cascade into the next.

## Final output

Return a single summary:

1. **Deliverables**: status for the portfolio site, README, Devpost, and YouTube copy, with where each was written or pasted.
2. **Consistency check**: confirm the tagline, headline stats, and award list are identical across all four.
3. **Still TODO**: any facts that stayed unknown and the blocks left as placeholders.
4. **Next steps**: post the LinkedIn update, pin the repo, submit the Devpost, upload the video. Point back to the post-hackathon checklist.

## Boundaries

- Never invent awards, statistics, prize amounts, ranks, timestamps, challenges, or team details. Omit over guess, in every deliverable.
- Interview once. The whole point is to not make the user repeat facts four times; do not let a sub-skill re-ask what Step 1 already captured.
- Keep the four consistent. If a fact changes mid-run, update the fact sheet and reflect it everywhere.
- Do not skip a sub-skill's safety checks (the `frontend-design` prerequisite, the "show a diff before overwriting an existing README" rule).
- Do not cascade after a failed or declined step.
- No em dashes in body copy; honor the same writing rules each sub-skill follows.

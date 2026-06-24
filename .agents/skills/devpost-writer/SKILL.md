---
name: devpost-writer
description: "Write a compelling Devpost project submission for a hackathon: the tagline, the standard story sections (Inspiration, What it does, How we built it, Challenges, Accomplishments, What we learned, What's next), the Built With tags, and the Try it out links. Use this whenever the user is submitting to Devpost, or needs to write or polish a Devpost project story, writeup, or submission."
---

# Devpost Writer

Devpost is where judges and recruiters read the story of what you built. Write a submission that is honest, concrete, and skimmable, structured around Devpost's own fields. The story field supports Markdown, so use light formatting to keep it scannable. Stay consistent with the GitHub README and the demo video; the three should tell one story.

## Gather the facts

Detect first, ask second. Read `AGENTS.md`, `PRD.md`, the `README`, and `package.json`, then ask for what is missing:

- Project name and a one-line tagline (Devpost's elevator pitch is a hard 200-character field with a live counter, so write well under it).
- The problem, with one real statistic and its source.
- What it does: the core capabilities and the main user flow.
- How you built it: stack, architecture, and the notable technical decisions.
- Challenges you actually ran into.
- Accomplishments you are proud of.
- What you learned.
- What is next for the project.
- Built With: every real technology used.
- Try it out links: live URL, GitHub, demo video, and any open-source artifacts.
- Hackathon name and any awards (real ones only).
- Media: screenshots, an architecture diagram, a team photo, and the demo video.

Check the specific hackathon's submission form before writing. Organizers often add required custom fields (which sponsor tools you used, eligibility, whether a demo video is required) on top of the standard story, so confirm what is mandatory.

Never invent an award, statistic, challenge, or quote. If a fact is unknown after asking, leave it out.

## Write the story

Use Devpost's standard section headings so the submission maps to what judges expect:

- **Tagline**: one sentence that names the stakes, not the tech, under the character cap.
- **Inspiration**: the real reason you built this. Lead with the problem and a sourced stat or a concrete moment.
- **What it does**: plain, user-side language. Walk the core flow.
- **How we built it**: the stack and architecture, calling out the interesting decisions.
- **Challenges we ran into**: specific and honest, not "time management." Name what broke and how you got past it.
- **Accomplishments that we're proud of**: concrete wins, such as a hard integration, a latency number, or shipping a full flow under the clock.
- **What we learned**: genuine takeaways.
- **What's next for [project]**: a credible roadmap, not hype.

Keep it skimmable: short paragraphs, the occasional bullet list, and one bolded key phrase per section. Specific always beats clever. Solo entrants can use the singular default prompts ("What I learned," "Accomplishments that I'm proud of") to match their voice. The story field supports Markdown and LaTeX, so light formatting is plenty.

## Built With and Try it out

- **Built With**: a free-text tag field with autocomplete. Type each real technology and pick the suggested existing tag when one appears, so your project is grouped under that tech's tag page rather than a near-duplicate. Use the common short names (`next.js`, `fastapi`, `python`). Unknown technologies still work; they just create a new tag.
- **Try it out**: the live deployment, the GitHub repo, the demo video, and any model, dataset, or design artifacts.

## Media

Two separate things on Devpost, not one:

- **Video demo**: a dedicated field that takes a YouTube or Vimeo URL only and auto-embeds at the top of the page. This is the highest-signal asset, so always provide it.
- **Gallery**: needs at least one image, and the first image is the project thumbnail shown in listings. Plan a hero image or screenshot first, then an architecture diagram and a team photo.

## Verify

- Every section is grounded in real facts, with no invented awards, stats, or challenges.
- The tagline is within the character cap, every link resolves, and the Built With tags are real.
- The story is skimmable, uses user-side language, and the demo video is attached.
- It does not contradict the GitHub README.

## Final output

Return:

1. **The Devpost story**: every section, in Markdown, ready to paste.
2. **Tagline**: the elevator pitch.
3. **Built With**: the tag list.
4. **Try it out**: the links.
5. **Media checklist**: what to upload to the gallery.
6. **Next step**: for example, run `youtube-writer` for the demo video copy, or `readme-writer` for the GitHub README.

## Boundaries

- Never invent awards, statistics, challenges, or quotes. Omit over guess.
- Match the real project and stay consistent with the README and the demo.
- Keep it a story for judges and recruiters, not exhaustive documentation.

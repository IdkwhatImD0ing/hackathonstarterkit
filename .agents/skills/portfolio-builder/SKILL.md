---
name: portfolio-builder
description: "Generate a distinctive, recruiter-facing portfolio website that showcases a hackathon project, even when the project is not a web app (hardware, an ML model, a CLI, or research). Installs and uses Anthropic's frontend-design skill so each project gets a unique, non-templated design, then builds a one-page case study with a hero, problem, architecture, demo, results, team, and honest limits. Use this whenever the user wants a project showcase site, case-study page, portfolio site, or recruiter-facing landing page for what they built."
---

# Portfolio Builder

Build a one-page, recruiter-facing showcase site for a hackathon project. The site is the deliverable even when the project itself is not a web app: a hardware build, an ML model, a CLI, or a research project all get a site that shows the work through video, diagrams, photos, and interactive replicas. Aim for the bar set by these case-study sites: dispatchai.art3m1s.me, talktuah.art3m1s.me, slugloop.com, and adapted.art3m1s.me. Each one looks nothing like the others, because each design is pulled from the project's own world. That uniqueness is the whole point, and it is why this skill leans on the frontend-design skill rather than a fixed template.

## Step 1: Make the design engine available

The design comes from Anthropic's `frontend-design` skill, and it is what keeps the result from reading as a generic AI page. It must be available before you design anything.

This is a user prerequisite, not something the agent can do for itself, because the agent cannot run slash commands. If `frontend-design` already appears in your available skills, you are set. If it does not, ask the user to install the plugin in Claude Code by running these two commands:

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install frontend-design@claude-plugins-official
```

The first line is only needed if that marketplace is not already added. Claude also applies `frontend-design` automatically for frontend work, so its principles may already be in play, but ask the user to confirm rather than assuming the plugin is present. Every design decision in Step 3 runs through it.

## Step 2: Gather the facts

Detect first, ask second. Read `AGENTS.md`, `PRD.md`, the `README`, `package.json`, and any photos, screenshots, or diagrams already in the repo. Then ask only for what is missing:

- Project name and a tagline that names the stakes, not the tech.
- **Project type**: web app, hardware or IoT, ML model, CLI or dev tool, mobile app, or research and data. This decides how you show it in Step 4.
- The problem, with one real statistic and its source.
- What it does: three to five core capabilities.
- How it works: enough of the system to draw an architecture diagram.
- Proof: demo video (YouTube), live URL, Devpost, GitHub, press coverage, and any open-source artifacts (model, dataset, Figma).
- **Event media**: the candid photos and clips from the hackathon itself, which the repo almost never contains. Ask explicitly for team and build-in-progress shots, demo-day or stage and award photos, whiteboard or napkin sketches, and the venue, plus where they live (a phone, a shared drive, the Devpost gallery). These are what make the site feel real, so request them rather than assuming the repo has them. If none exist, fall back to screenshots, diagrams, and the demo video.
- Results: awards and placement, event name and dates and scale and rank, build time, team size, and any metrics (commits, latency, users).
- Team: names, roles, GitHub handles, LinkedIn URLs, and headshots.

Never invent an award, statistic, prize, rank, or quote. If a fact is unknown after asking, omit that section rather than guessing.

## Step 3: Design it through frontend-design

Hand `frontend-design` a brief built from Step 2 and run its full loop: brainstorm, explore, plan, critique, build, and critique again. Its core rule applies here: derive the look from the subject, not from a default. Produce a compact token system specific to this project:

- **Palette**: four to six named hex values drawn from the project's world. A 911 dispatcher reads as severity reds and ambers on near-black; a voice bank reads as trust blues; a UCSC bike-mesh build reads as a worn "field log" archival palette.
- **Type**: a characterful display face used with restraint, a complementary body face, and a utility or mono face for data, paired deliberately rather than the same families every project gets.
- **Layout**: a scrollytelling one-pager following the skeleton in Step 5.
- **Motion**: one orchestrated motion moment that serves the subject, such as a scroll-triggered architecture reveal or a telemetry replay. Scattered effects read as AI-generated, so spend motion in one place. This is separate from the reduced-motion accessibility floor in Step 6.
- **Signature**: the single element this site is remembered by, embodying this project. Dispatch has an embedded, interactive operator console running on seeded data; Slugloop has its "the receivers don't ping anymore" archival framing; AdaptEd has its numbered learning loops.

Two guards carried over from frontend-design:

- **Avoid the default AI looks** unless the project's world genuinely calls for one: (1) a cream background with a high-contrast serif and a terracotta accent, (2) near-black with a single acid-green or vermilion accent, (3) broadsheet hairline rules with zero border-radius and dense columns. If your palette and type plan lands on one of these by reflex, revise it and say why.
- **Structure is information.** Use numbered markers, eyebrows, and dividers only when they encode something true, like a real sequence (AdaptEd's loops), never as decoration. The Step 5 skeleton numbers are an authoring checklist, not a required visual treatment.

Section labels are design surface too. The skeleton is the underlying structure; rename its headings into the project's voice ("Field log" instead of "Showcase," an in-world line instead of "Honest limits," numbered 01 to 0N where it fits the subject). Run the plan-then-critique gate before building: if any choice reads like the page you would produce for any similar project, revise it. Build only once the plan is genuinely specific to this brief.

## Step 4: Choose how to show the work

The site showcases the project regardless of what kind of thing it is. The universal floor is the demo video plus the project's primary artifact, whatever that is: footage, photos, a telemetry replay, an eval figure, or a terminal replay. Then pick the main showcase device by project type:

- **Web app**: an embedded, interactive widget or console running on seeded data (Dispatch's operator console), with a read-only view as the fallback only when interactivity is not feasible.
- **Hardware or IoT**: build photos, a wiring or system diagram, field footage, and a map or telemetry replay (Slugloop).
- **ML model**: an interactive inference widget or a before-and-after, plus the eval numbers and a Hugging Face link.
- **CLI or dev tool**: a terminal replay (asciinema-style) or an animated command sequence.
- **Mobile**: a device-framed video or a clickable screen flow.
- **Research or data**: the key figure, charts, and the methodology diagram.

Demos can be plural. Offer two demo modes where it helps (a passive walkthrough plus an interactive mode, like TalkTuah), or pair an early-prototype clip with a final-field clip to show iteration (Slugloop). Only mock a replica when a real backend cannot run on a static site; when you do, seed it with realistic data and label it clearly as a replica. A hardware site built on real field footage needs no mock and no such label.

If the project got real press coverage, treat it as a credibility device: render the clippings as cards or outlet logos with a quote and source (Slugloop), not as bare links.

## Step 5: The case-study skeleton

A single-page scroll, recruiter-first. Treat it as a menu: include a section only when the facts exist, and rename its heading into the project's voice (see Step 3). The numbering here is an authoring checklist, not a mandated visual style.

1. **Hero (thesis)**: open with the most characteristic thing about the project, plus the tagline and primary CTAs (demo, Devpost, GitHub). Keep the top award or credential visible.
2. **Credibility strip**: placement, prize, rank, field size.
3. **Problem**: the stakes and one sourced statistic.
4. **What it does**: the core capabilities. Capability cards can deep-link or scroll-anchor into the matching part of the architecture section, tying the what to the how (TalkTuah).
5. **How it works**: the architecture or system diagram, where the engineering depth shows.
6. **Showcase**: the device chosen in Step 4 (interactive widget, video or videos, photos, telemetry replay). Allow a dual or iteration video block where it applies.
7. **By the numbers**: a bold stat grid of large figures with short labels. It can fuse team size, build time, commits, and rank into one signature block (Slugloop: 4 students, 36 hours, 500+ commits, Top 10). Rank may also appear in the credibility strip.
8. **Press** (optional): real coverage as clipping cards or outlet logos with a quote and source.
9. **Team or crew**: bios with roles, GitHub, and LinkedIn.
10. **Honest limits**: what a weekend build is and is not. Naming the tradeoffs reads as maturity, not weakness.
11. **Links and sources**: GitHub, Devpost, YouTube, model or dataset, press.
12. **Footer**: built in N hours at the event, with repo and live links.

## Step 6: Build it

- Build a standalone single-page site that is statically exportable and Vercel-ready, defaulting to Next.js (App Router). Match the project's existing stack if it has one. Put it in its own folder (`site/` or `portfolio/`) or a separate repo so it does not tangle with the product code.
- Use real content throughout; no lorem. Follow frontend-design's writing guidance: plain, specific, written from the reader's side of the screen.
- Hold a quality floor without announcing it: responsive down to mobile, visible keyboard focus, and reduced motion respected.
- Cover SEO basics: a keyword-aware title and description, a canonical URL, an Open Graph image, exactly one `h1`, and semantic sections.
- Use real screenshots, photos, and diagrams, including the event media gathered in Step 2 placed in the showcase, team, and by-the-numbers sections; if you ship a mocked replica, label it; use the YouTube poster for the demo.
- Critique again after it renders, as frontend-design directs: screenshot the page, re-ask "would I have produced this same look for an unrelated project?", and remove one accessory by cutting a decoration that does not serve the brief.

## Verify

- `frontend-design` was actually used, and the result does not read as a generic AI default or land on one of the three default looks. Apply its self-critique after the build: would you have produced this same look for an unrelated project?
- One `h1`, semantic headings, mobile responsive, visible focus states, reduced motion honored.
- Every award and statistic is real, any mocked replica is labeled, every link resolves, and the demo video or videos embed.
- Build and preview locally; check Core Web Vitals or a Lighthouse pass if practical.

## Final output

1. **The site**: path or route, and how to run it.
2. **Design system**: the palette, type pairing, motion moment, and signature element, with one line on why each fits this project.
3. **Showcase device**: which one you used and why it suits the project type.
4. **Facts used vs. omitted**: what made it in and which sections were skipped for lack of real facts.
5. **Deploy**: the steps to ship it on Vercel.
6. **Next steps**: for example, a custom domain, and linking the site from the README and a LinkedIn post.

## Boundaries

- Make `frontend-design` available first, and never ship a templated default. The design must be specific to this project.
- Never invent awards, statistics, or press, and always label mocked replicas.
- Keep it one focused page. Do not rebuild the whole product.
- Describe what actually exists. The site reflects the real project, not an aspirational version.

# What to Do After a Hackathon: Ship 5 Assets That Get You Hired

> What to do after a hackathon, win or lose: the 5 linked assets that get you hired, and the AI skills that build your README, Devpost, portfolio, and demo copy.

Canonical: https://thehackathonplaybook.dev/blog/what-to-do-after-a-hackathon
Last updated: 2026-06-24

---

## You Shipped the Project. Now Ship the Proof.

The hackathon is over. The most important work is not.

Win or lose, your project only changes your career if people can **find it**. That means five public assets, each one linking to the other four. Most teams ship one (a private GitHub repo nobody links to) and wonder why nothing happened. The trophy fades in a week. A project anyone can click through works for you for years.

| Assets to ship | Click to the rest | Best time to post | Lines of code recruiters read |
| --- | --- | --- | --- |
| 5 | 1 | 48 hrs | 0 |

> **Win or Lose, This Is the Same:** You don't do hackathons to win. You do them to get seen. **It only takes one person** clicking through: one recruiter, one founder, one future teammate.

## Every Asset Links to Every Other One

Here is the rule that matters more than any single asset: **each one links to all the others.** A recruiter who lands on any of them can reach the rest in one click. There are no dead ends. Map it out and it looks like this:

`cross-links.txt`:

```text
Devpost    ──►  GitHub · YouTube · Live site
GitHub     ──►  Devpost · Live site · YouTube · Press
YouTube    ──►  Devpost · GitHub · Live site
Portfolio  ──►  GitHub · Devpost · YouTube
LinkedIn   ──►  Devpost · GitHub · YouTube
```

Here is the mistake almost everyone makes: they post a GitHub link with no outbound links, or a LinkedIn post with no demo. Each asset becomes a dead end. **A reader who can't get to the next thing leaves.**

> **Every Asset Is a Front Door:** You don't control where someone enters. A recruiter might land on your YouTube, a dev on your GitHub, a founder on your Devpost. Wherever they start, the links should pull them through the whole story.

## A Real Example: Dispatch AI

Dispatch AI won the UC Berkeley AI Hackathon Grand Prize. Open any one of its links and you can reach the other three without searching.

`dispatch-ai.txt`:

```text
Devpost    devpost.com/software/dispatch-ai
Live site  dispatchai.art3m1s.me
GitHub     github.com/IdkwhatImD0ing/DispatchAI
YouTube    youtu.be/hdpdgxrilQM

   every page above links to the other three
```

## Why Recruiters Never Read Your Code

Why bother with all this? Because of who is actually looking. The recruiter who screens your resume and the person who DMs you on LinkedIn are usually **not going to read your source code.** But they will watch a 90-second demo. They will skim a Devpost. They will click a live site.

That is the edge. On a resume screen where you and another candidate look identical, **a demo they can watch breaks the tie.** A project they can experience beats a project they have to imagine.

> **And the New Reader Is an LLM:** Recruiters and applicant systems run on AI now. A text-rich GitHub README, a written Devpost, a captioned video, and a portfolio page are exactly what a model scrapes and summarizes. **Five linked, text-heavy sources make you the candidate the AI can actually describe.**

> It's not enough to be good. In order to be found, you have to be findable.
>
> Austin Kleon, author of Show Your Work!, 2014

> **How I Got My First Internship:** This one is personal. I started doing hackathons to land an internship, and within my first four, **one LinkedIn post about a project got me the interview that became my first offer.** We didn't even win that hackathon. I would never have gotten that internship otherwise. Not from winning. From being findable.

## Stop Writing These by Hand

Now the part most guides get wrong: they hand you five templates and wish you luck. **It is 2026. You should not be hand-writing a README or a Devpost at 4am after your demo.** Four of these five assets are mechanical, and AI generates them faster and more consistently than you will on no sleep.

So I built skills that do it. The **ship-it skill** interviews you once, then generates the portfolio site, README, Devpost, and YouTube description in order, so all four share one tagline, one set of stats, and one story. Run it from your coding agent:

`ship-it`:

```bash
# Install the skill
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ship-it

# Then tell your agent:
# "Use the ship-it skill to create all four of my
#  post-hackathon deliverables from this repo."
```

Only need one of them? Each asset has its own skill. Install whichever you want and point your agent at it:

`one-at-a-time`:

```bash
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill portfolio-builder
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill readme-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill devpost-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill youtube-writer
```

> **One-Time Setup for the Portfolio:** The portfolio builder uses Anthropic's frontend-design plugin so your site gets a custom look, not a template. The post-hackathon playbook has the exact prompts for every skill, plus the one extra plugin install the portfolio step needs.

[The Post-Hackathon Playbook and Ship-It Toolkit](https://thehackathonplaybook.dev/playbook/post-hackathon): The follow-up timeline, the networking science, and the copy-paste prompts that run every skill above.

## What You Still Do Yourself

Two things stay human. AI cannot record your demo, and it should not write your LinkedIn post for you.

**Record a clean demo after you submit,** when the pressure is off, and get the product on screen in the first 30 seconds. Then youtube-writer handles the title, description, timestamps, and the links back to everything else.

The **LinkedIn post is the amplifier,** the one asset that pushes the other four in front of people, and it lands best in your own voice. Tell the story (what you built, what you learned, what is next), tag your team and the organizers, and carry the three links out: Devpost, GitHub, and the demo. End with one clear line on what you are looking for.

## Whichever Way, the Rule Is the Same

However you generate them, one rule holds: **every asset links to every other.** Run ship-it, record the demo, post on LinkedIn, and you go from a finished repo to a project recruiters can actually find, all in an afternoon.

The trophy was last weekend. **The links are what keeps working for you next year.**

[Hackathon Submission Playbook](https://thehackathonplaybook.dev/playbook/submission): Where the README and Devpost skills live, with the demo recording stack winning teams use.

[How to Win Hackathons: The Complete Guide](https://thehackathonplaybook.dev/blog/how-to-win-hackathons): The 7-phase system that produces the projects worth promoting, from team formation to follow-up.

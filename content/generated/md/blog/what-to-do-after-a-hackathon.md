# What to Do After a Hackathon: Ship 5 Assets That Get You Hired

> My first internship came from one LinkedIn post about a hackathon we didn't win. What to do after a hackathon: five linked assets, four written by AI skills.

Canonical: https://thehackathonplaybook.dev/blog/what-to-do-after-a-hackathon
Last updated: 2026-09-14

---

## Ship Five Linked Assets, Win or Lose

After judging, make the project easy to find.

That means five public assets: a GitHub README, a Devpost, a YouTube demo, a portfolio page, and a LinkedIn post, linked so that whichever one someone finds leads to the rest. A private repo nobody links to can't help you, whether you won or not.

> **How I Got My First Internship:** I started doing hackathons to land an internship. At LA Hacks 2023 I spent the hackathon learning vector databases for a RAG-style chat app, and we didn't even win. I posted about it on LinkedIn anyway, and the post caught the eye of an interviewer who was building the exact same thing. The interview turned into two people geeking out over one problem, and a week later I had my first internship offer. That was within my first four hackathons. I would never have gotten that internship otherwise.

## No Asset Should Be a Dead End

You don't control where someone enters. A recruiter might land on your YouTube, a developer on your GitHub, a founder on your Devpost. A repo with no links out, or a LinkedIn post with no demo, is where they stop. So Devpost, GitHub, and YouTube link to each other and to your live site, and the portfolio and LinkedIn post point into all three:

`cross-links.txt`:

```text
Devpost    ──►  GitHub · YouTube · Live site
GitHub     ──►  Devpost · Live site · YouTube · Press
YouTube    ──►  Devpost · GitHub · Live site
Portfolio  ──►  GitHub · Devpost · YouTube
LinkedIn   ──►  Devpost · GitHub · YouTube
```

## A Real Example: Dispatch AI

Our Dispatch AI project won the Grand Prize at the UC Berkeley AI Hackathon 2024. These are its four links:

`dispatch-ai.txt`:

```text
Devpost    devpost.com/software/dispatch-ai
Live site  dispatchai.art3m1s.me
GitHub     github.com/IdkwhatImD0ing/DispatchAI
YouTube    youtu.be/hdpdgxrilQM

   every page above links to the other three
```

## Recruiters Usually Won't Read Your Code

The recruiter who screens your resume and the person who DMs you on LinkedIn usually aren't going to read your source code. They'll watch a 90-second demo, skim a Devpost, or click a live site. If you and another candidate look the same on paper, that demo can break the tie.

> It's not enough to be good. In order to be found, you have to be findable.
>
> Austin Kleon, author of Show Your Work!, 2014

> **Some of Your Readers Are AI Tools:** More recruiters and applicant systems use AI to screen candidates. A written README, Devpost, and portfolio page, plus a captioned video, give it plenty to go on.

## Let AI Write the Four Mechanical Ones

Four of the five assets are mechanical, and AI writes them faster and more consistently than you will at 4am after your demo. So I built skills that do it.

The **ship-it skill** interviews you once, then generates the portfolio site, README, Devpost, and YouTube description in order, so all four tell the same story with the same numbers. Run it from your coding agent:

`ship-it`:

```bash
# Install the skill
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ship-it

# Then tell your agent:
# "Use the ship-it skill to create all four of my
#  post-hackathon deliverables from this repo."
```

If you only need one of them, each asset has its own skill:

`one-at-a-time`:

```bash
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill portfolio-builder
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill readme-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill devpost-writer
npx skills add IdkwhatImD0ing/hackathonstarterkit --skill youtube-writer
```

> **One-Time Setup for the Portfolio:** The portfolio builder uses Anthropic's frontend-design plugin for a custom look, which takes one extra install. The post-hackathon playbook has that, plus the exact prompt for every skill.

[The Post-Hackathon Playbook and Ship-It Toolkit](https://thehackathonplaybook.dev/playbook/post-hackathon): The follow-up timeline and the copy-paste prompts for every skill above.

## What You Still Do Yourself

**Record a clean demo** when the pressure is off, and get the product on screen in the first 30 seconds. If your event lets you add the video after the deadline, record it after you submit. Some events want the link at submission, so check the rules. Then youtube-writer handles the title, description, timestamps, and links.

**Write the LinkedIn post yourself,** within 48 hours. It's the asset that puts the other four in front of people, and it reads best in your own voice. Say what you built and what you learned, tag your team and the organizers, link the Devpost, GitHub, and demo, and end with one line on what you're looking for.

[Hackathon Submission Playbook](https://thehackathonplaybook.dev/playbook/submission): Where the README and Devpost skills live, plus the demo recording setup.

[How to Win Hackathons: The Complete Guide](https://thehackathonplaybook.dev/blog/how-to-win-hackathons): The seven phases, from team formation to follow-up.

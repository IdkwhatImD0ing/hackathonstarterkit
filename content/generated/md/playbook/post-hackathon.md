# Post-Hackathon

> Post your project and follow up with people you met, so it keeps helping you after judging.

Canonical: https://thehackathonplaybook.dev/playbook/post-hackathon
Last updated: 2026-09-14

---

## Make It Public

Most teams close their laptops after judging and never open the project again. Nobody can hire you off a project they never saw.

TL;DR Post your demo and message the people you met within 48 hours.

You don't need followers for this. My first internship came from one LinkedIn post that one interviewer happened to read.

The First Internship Story

I started doing hackathons to land an internship. At LA Hacks 2023 I spent the hackathon learning vector databases for a RAG-style chat app, and we didn't win. I posted about it on LinkedIn anyway, and the post caught an interviewer's eye. They were building the exact same thing, so the interview turned into two people geeking out over one problem. A week later I had my first internship offer. That vector database knowledge also landed me a full-time job.

That was within my first four hackathons. After that I got two expedited interviews, one direct offer, and hundreds of recruiting DMs, because companies had already seen what I built.

## Luck Surface Area — Share Your Work

You can't control your luck, but you can give it more chances. Build things, then make sure people know about them.

TL;DR Post every project somewhere people in your field will actually see it.

#### Jason Roberts' Luck Surface Area

> “The amount of serendipity that will occur in your life, your Luck Surface Area, is directly proportional to the degree to which you do something you're passionate about combined with the total number of people to whom this is effectively communicated.”

— Jason Roberts, serial entrepreneur and TechZing podcast co-host, “How to Increase Your Luck Surface Area”, Codus Operandi, 2010 (L = D x T)

Where to Share

LinkedIn post

Twitter/X thread

Blog post

Devpost portfolio

GitHub pin

Portfolio site

## The 48-Hour Follow-Up

Judges and sponsors meet a lot of teams in one weekend. Message them while they can still picture your demo.

TL;DR Message everyone you had a real conversation with within 48 hours.

#### Who to Follow Up With

Anyone you had a real conversation with, not just winners or VIPs.

-   Judges who asked good questions
-   Sponsor reps who liked your tech
-   Teammates you'd hack with again
-   Participants you bonded with over shared struggles

send now

send now

#### How to Follow Up

Short and specific. Skip the generic “let's stay in touch.”

-   Personalize: reference the exact conversation you had
-   Add value: send the project link, demo, or a useful resource
-   One clear ask: coffee chat, feedback, or collaboration
-   Keep it short: 3-5 sentences max

Mark Granovetter, Sociologist — Strength of Weak Ties

Granovetter found that casual contacts, people you don't see every day, beat close friends for finding jobs, because they connect you to circles outside your own. Judges, sponsors, and the team at the next table are casual contacts.

— Mark Granovetter, “The Strength of Weak Ties”, American Journal of Sociology 78(6), 1973; built on his Harvard doctoral research and published while he was at Johns Hopkins

## Turn It Into a Long-Term Project

You leave every hackathon with a working prototype. Keep building on it instead of starting your next side project from nothing.

TL;DR Win or lose, if the project has legs, keep building it instead of starting over.

#### You Have a Proven Project

A win means judges already believed in it. You also have a working prototype. Spend the next 6 months making it good, then put it at the top of your resume.

Dispatch AI started as our UC Berkeley AI Hackathon 2024 project and won the Grand Prize. We kept building it, and it's now a company I co-founded.

#### You Still Have a Prototype

Losing doesn't make it a bad project. At CruzHacks 2023 I built SlugLoop, a real-time tracking app for the buses at Santa Cruz, and lost to a calculator app. Very annoying, but I didn't let that discourage me. SlugLoop went on to place Top 10 Global in Google's Developer Student Challenge, the only US team in three years.

LA Hacks 2023 was a loss too, and it's the hackathon that got me my first internship.

## The Post-Hackathon Playbook

Do the first three steps for every project. Do the fourth only for the ones with legs.

TL;DR Follow up on day 1, post by day 3, clean up and open-source in week 1, and keep building only if the project has legs.

Day 1 — Within 24 Hours

Message the judges, sponsors, and people you talked to. Pin the GitHub repo. If you placed, update your LinkedIn headline.

Day 2-3 — Share Publicly

Post on LinkedIn with the demo video and tag your teammates, the sponsors, and the organizers. Write about what you built and learned, and what you'd do next.

Week 1 — Clean and Open-Source

Polish the README with badges, screenshots, and install steps, then add the project to your portfolio. Before you make the repo public, delete API keys and .env files from it. If a key was ever committed, rotate it, because it's still in the git history.

Month 1-6 — Keep Building

If the project has legs, set a monthly milestone and treat it like a real product: add features and find real users.

## The Ship-It Toolkit

Run all four deliverables with one prompt, or grab a single skill. The portfolio site and YouTube description live here; the GitHub README and Devpost skills moved to the submission page.

TL;DR One prompt writes all four deliverables with the same story in each: the portfolio site, README, Devpost, and YouTube description.

#### Do All Four at Once

One skill that runs the other four. It interviews you once, then generates the portfolio site, README, Devpost, and YouTube description in order, so they share one tagline and one set of stats. Best if you want everything done in one sitting.

```
Install the Ship It skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ship-it

Use the ship-it skill to create all four of my post-hackathon deliverables in one pass: the portfolio site, the GitHub README, the Devpost submission, and the YouTube demo description. It should install the four sub-skills it needs (portfolio-builder, readme-writer, devpost-writer, youtube-writer), read the repo first, then interview me ONCE for everything all four need (the demo video and its beats, the live URL and Devpost, any awards, the event details, the team, and the challenges and what's next). Then generate the four so they tell one consistent story, pausing after each so I can redirect. Do not invent awards, stats, timestamps, or challenges. Note: the portfolio step uses Anthropic's frontend-design plugin, so if it's not already installed, tell me to run "/plugin marketplace add anthropics/claude-plugins-official" and "/plugin install frontend-design@claude-plugins-official" before that step.
```

Or run them one at a time

#### 1\. Build Your Portfolio Site

Installs Anthropic's frontend-design skill so the site doesn't look like a template, then builds a one-page case study: hero, problem, architecture, demo, results, team, and honest limits. It works for non-web projects too, and it won't invent awards or stats.

```
First install Anthropic's frontend-design plugin in Claude Code so the site gets a unique design, not a template:

/plugin marketplace add anthropics/claude-plugins-official
/plugin install frontend-design@claude-plugins-official

Then install the Portfolio Builder skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill portfolio-builder

Use the portfolio-builder skill to build a recruiter-facing portfolio website for this project. Read the repo first, then ask me for the demo video, the live URL and Devpost, any awards, the event details, and the team info. If the project is not a web app (hardware, an ML model, a CLI), showcase it with photos, diagrams, and the demo video. Do not invent awards, stats, or prizes.
```

#### 2\. Write Your YouTube Description

Writes the demo video's title, description, tags, and chapter timestamps so recruiters can find it. It reads your repo, asks for the video's beats, and never fakes a timestamp or award.

```
Install the YouTube Writer skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill youtube-writer

Use the youtube-writer skill to write the title, description, tags, and chapter timestamps for our demo video. Read the repo first, then ask me for the video length and its beats (so the chapters are real), plus the Devpost and GitHub links and any awards. Front-load the hook in the first two lines of the description. Do not invent awards or timestamps.
```

[Need your GitHub README or Devpost?

Those two skills moved to the submission playbook page, next to the README and Devpost how-tos.](https://thehackathonplaybook.dev/playbook/submission#generate-it-with-a-skill)

> “It's not enough to be good.  
> In order to be found, you have to be findable.”

— Austin Kleon, author of Show Your Work! (2014)

You can't tell ahead of time which post or follow-up will matter, so do all of them.

## Post-Hackathon Checklist

The same steps as the timeline, as a list to check off.

TL;DR Everything but the last item fits in the week after the event.

Follow up: personal messages to judges, sponsors, and contacts within 48 hours

Post on LinkedIn with the demo video, and tag your teammates, the sponsors, and the organizers

Pin the GitHub repo to your profile and clean up the README

Delete API keys and .env files from the repo, rotate any key that was ever committed, then open-source it

If it has legs, set a monthly milestone and keep building

### 

TL;DR Optional. The steps above work without reading any of this.

#### Show Your Work

> “It sounds a little extreme, but in this day and age, if your work isn't online, it doesn't exist.”

Kleon builds on a line from Clay Shirky, who teaches at NYU: “The real gap is between doing nothing and doing something.” You don't need a finished masterpiece to post. Share what you made and what you learned.

— Austin Kleon, author, Show Your Work!, 2014; Shirky line from Cognitive Surplus, 2010

#### Real Artists Ship

> “Real artists ship.”

— Steve Jobs, Apple co-founder, Macintosh team retreat, January 1983, as recounted by Andy Hertzfeld on folklore.org; later popularized by Seth Godin

#### Bingo Card Creator

McKenzie built Bingo Card Creator on nights and weekends and ran it alongside a day job until he went full-time on his software business in 2010. A hackathon project can be that kind of side project.

— Patrick McKenzie (patio11), software entrepreneur and writer; story documented on kalzumeus.com

#### Regret Minimization

> “I knew that if I failed I wouldn't regret that, but I knew the one thing I might regret is not ever having tried.”

— Jeff Bezos, founder of Amazon, Academy of Achievement interview, 2001

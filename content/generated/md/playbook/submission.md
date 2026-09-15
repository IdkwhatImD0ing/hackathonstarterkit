# Submission

> What to put in your Devpost, README, and demo video, and when to submit.

Canonical: https://thehackathonplaybook.dev/playbook/submission
Last updated: 2026-09-14

---

## The Submission Advantage

Judges pick winners after you've left the room. When they can't remember a project, the Devpost, repo, and demo video are the tiebreaker.

TL;DR Set aside 1-2 hours before the deadline for the Devpost, the README, and the demo video.

#### Devpost README

For judges who missed your live demo, this is the project. Tell the whole story: problem, solution, tech, and what's next.

#### GitHub README

Technical judges click through to your repo to see how it works.

The Devpost is for every judge and the README is for the developers, so you need both.

#### Demo Video

The only part of your demo that's still there at deliberation. If a judge has forgotten your project, the video is how they see it working again.

Devpost calls the demo video [one of the most important elements](https://help.devpost.com/article/84-video-making-best-practices) of your submission.

## The Devpost README — Section by Section

Devpost gives every project the same seven sections, in this order.

TL;DR Open every section with its most concrete line, like a number or a named sponsor API.

Inspiration

Start with a number that makes the judge feel the problem. Our Dispatch AI opener (UC Berkeley AI Hackathon 2024) was "82% of emergency call centers are understaffed," from the 2023 NENA and Carbyne survey.

Skip "We wanted to help people." If you don't have a number you can source, open with a concrete scenario instead.

What It Does

Two or three sentences, then bullet the features. "Users check balances, transfer funds, and pay bills using voice commands" says something. "An AI-powered banking solution" doesn't.

The test: could a judge explain your project to another judge from this section alone?

How We Built It

Diagram first, then every API, framework, and service, grouped by frontend, backend, AI/ML, and infrastructure.

Sponsor judges want to see how you used their tech, so name it (Intel Dev Cloud, Hume, Retell) where they can't miss it.

Challenges We Ran Into

Name the ones that actually slowed you down. "Integrating multiple real-time APIs with different auth patterns" tells a judge what was hard. "We didn't have any challenges" reads like you didn't push.

Accomplishments

Tie them back to the problem you opened with. On Dispatch AI, "fine-tuned Mistral for emergency response" answered the understaffing stat.

If you measured something, put the number in, like "80% decrease in processing time" or "support for 6 languages."

What We Learned

Name the specific thing you learned, like "how to design multi-agent systems" or "the importance of multi-layered security."

This one matters more on educational and "best beginner" tracks.

What's Next

Two to four concrete steps, like "expand training data" or "partner with local emergency services for testing." Leave out the pie-in-the-sky stuff.

## The GitHub README — Structure for Credibility

Technical judges open this one. Write it for someone who wants to know how it works and how to run it.

TL;DR Get the seven essentials into your repo README before you touch any of the extras.

#### Essential Elements

Do these first.

-   Project title + one-line description
-   Prize/award badge at the top (shields.io)
-   Demo video or hero screenshot
-   Tech stack badges (React, TypeScript, Tailwind, etc.)
-   Architecture diagram
-   Getting started / installation steps
-   Key features list

bonus points

bonus points

#### Bonus Elements

Worth adding if you have time, or if the project will keep going after the hackathon.

-   Contributing guide
-   Detailed API documentation
-   Environment variable reference
-   Deployment instructions
-   License file

### 

TL;DR Put the point in the first line and move the detail further down.

#### The Inverted Pyramid

Put the most important information first. Judges skim, so your first line decides whether they keep reading.

Opening with “We're a team of four students who…” spends that line on you instead of the problem.

— [Inverted pyramid, in widespread newspaper use since the early 1900s](https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism))

#### The 6-Page Memo

> “The reason writing a good 4 page memo is harder than ‘writing’ a 20 page powerpoint is because the narrative structure of a good memo forces better thought and better understanding of what's more important than what, and how things are related.”

Bezos banned PowerPoint at Amazon in 2004 in favor of narrative memos. On a Devpost, “how things are related” is step 5: tying what you built back to the problem you opened with.

— [Jeff Bezos, Amazon founder and CEO, email to Amazon's S-Team, June 9, 2004](https://slab.com/blog/jeff-bezos-writing-management-strategy/)

#### 6 Rules for Clear Writing

> “If it is possible to cut a word out, always cut it out.”

The same essay says to use the short word over the long one and the active voice over the passive.

— [George Orwell, English novelist and essayist, “Politics and the English Language,” 1946](https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/)

#### Progressive Disclosure

Show essentials first, let readers drill deeper. Stripe's docs put the quickstart at the top and the architecture further down.

In your README: hero screenshot and one-liner first, architecture and install steps after.

> “In descriptions of Nature one must seize on small details, grouping them so that when the reader closes his eyes he gets a picture. For instance, you'll have a moonlit night if you write that on the mill dam a piece of glass from a broken bottle glittered like a bright little star…”

— [Anton Chekhov, Russian playwright and short-story writer, letter to his brother Alexander, May 1886 (trans. Avrahm Yarmolinsky, The Unknown Chekhov, 1954)](https://en.wikipedia.org/wiki/Show,_don%27t_tell)

In a Devpost, the small detail is a screenshot or a clip of the app working.

## Show, Don't Tell

What to put in the Devpost besides text, and how much of each.

TL;DR Add an architecture diagram, 4-6 annotated screenshots, and a 60-90 second demo video.

#### Architecture Diagrams

Draw the flow: user action → frontend → API → AI model → response. Put it at the top of “How We Built It.” The [architecture slide from our Dispatch AI pitch](https://thehackathonplaybook.dev/blog/hackathon-pitch-mistakes-la-hacks) showed the 911 call audio pipeline, the fine-tuned model, the dashboard, and where Twilio, Retell, and Hume fit in.

A diagram in Excalidraw takes about 15 minutes. Figma or a whiteboard photo works too.

#### Annotated Screenshots

Label the key flows with callouts and arrows. Then add a design-process image, the way DoggoAI's submission did: user personas, wireframes, and high-fidelity mockups next to the final product.

Recording Tools

[Screen Studio](https://screenstudio.lemonsqueezy.com?aff=LpD9R) (affiliate link) (Mac, my pick) or CanVid (Windows). Auto-zoom and webcam overlay mean editing takes minutes.

Video Length

60-90 seconds: the main flow, once. One take is fine.

Screenshot Count

4-6 images: hero shot, architecture diagram, 2-3 key flows, one design-process image.

## The Demo Video

The video goes on the Devpost with everything else. The question is when you record it.

TL;DR If your event lets you edit the Devpost after the deadline, record the video in the gap before judging.

### The demo video doesn't have to come out of your coding hours

At a lot of events the deadline freezes your code but not the Devpost entry, and judging often starts 1 to 2 hours later. If so, lock the repo, submit, then record the video and paste the YouTube link in that gap, so it doesn't eat 2 hours of feature work.

Check your event's rules first. Some count any edit after the deadline as a violation, or require the video link to submit. In that case, record before the deadline.

[See two winning demo videos broken down, plus the recorder I use

On the pitching page: the TalkTuahBank and SoundSearch demos, and why they work.](https://thehackathonplaybook.dev/playbook/pitching#the-demo-video)

## Common Mistakes

A README nobody can skim, and a submission that lands a minute late.

TL;DR Submit 30 minutes before the deadline, with a README a judge can skim.

Wall of Text

A 2,000-word README with no images is hard to skim. Add headers, and put each screenshot beside the paragraph it illustrates.

Late Submission

Devpost deadlines are hard cutoffs. If you hit "submit" at 11:59 and Devpost lags, you're out.

## Submission Checklist

The whole page as a list, in the order you'd do it.

TL;DR Work this list top to bottom in the 1-2 hours you blocked off before the deadline.

Write the Devpost README before the hackathon ends

Open Inspiration with a sourced number or a concrete scenario

Include an architecture diagram and 4-6 annotated screenshots in the submission

Record a 60-90 second demo video with a webcam overlay (Screen Studio or CanVid)

Write a separate GitHub README with tech badges, install instructions, and the architecture diagram

Name every sponsor technology in "How We Built It"

Submit to Devpost 30 minutes before the deadline

Proofread once and cut every word you don't need

## AI Prompt Templates

Paste one into Claude, ChatGPT, or any AI tool, then fill in your project details at the bottom.

TL;DR Paste messy, detailed notes into the project section, then check every number in the output against them.

#### Devpost README Generator

Writes all seven Devpost sections using the rules on this page, and only uses numbers you give it.

What to Paste Along With the Prompt

```
You are a hackathon submission expert. Generate a Devpost README for my hackathon project using the information I provide below.

Follow these rules strictly:

INSPIRATION SECTION:
- Open with a striking statistic, vivid scenario, or concrete number that makes the reader feel the problem BEFORE describing any solution. Only use numbers that appear in my project information; if there are none, open with a scenario
- Use bold markdown for key stats
- Do NOT start with "We wanted to..." or "Our team decided to...". Lead with the problem, not yourself
- 2-3 short paragraphs maximum. Make every sentence earn its place.

WHAT IT DOES SECTION:
- Start with 2-3 sentences summarizing the product from the user's perspective
- Then list 3-5 key features as bullet points with bold titles
- Be concrete and specific: "Users check balances, transfer funds, and pay bills using voice commands" NOT "An AI-powered solution"
- If relevant, mention the core user flow

HOW WE BUILT IT SECTION:
- Group technologies by category: Frontend, Backend, AI/ML, Infrastructure, APIs
- Name EVERY API, framework, library, and service used, especially sponsor technologies
- Describe the architecture briefly (e.g., "User speaks → Twilio captures audio → GPT-4 processes → response streamed back")
- If there's a system design or architecture image, reference it with ![Architecture](URL)
- Mention any custom datasets, fine-tuned models, or novel technical approaches

CHALLENGES WE RAN INTO SECTION:
- List 3-5 real, specific challenges, NOT generic ones
- Be honest. "Integrating multiple real-time APIs with different auth patterns" is good. "Time management" is lazy.
- Briefly mention how you overcame each challenge or what you learned from it

ACCOMPLISHMENTS THAT WE'RE PROUD OF SECTION:
- Tie accomplishments back to the original problem statement
- Include quantitative results only if I gave them to you (e.g., "80% reduction in inference time", "supports 6 languages")
- Mention any technical firsts or novel approaches

WHAT WE LEARNED SECTION:
- Focus on genuine technical and personal growth
- Be specific: "How to orchestrate multi-agent LLM systems" NOT "We learned a lot about AI"
- 3-5 bullet points

WHAT'S NEXT SECTION:
- 3-5 concrete, realistic next steps
- Mix short-term (next month) and medium-term (next year) goals
- Show the idea has legs beyond the hackathon without being delusional

GENERAL RULES:
- Use markdown formatting: bold for emphasis, bullet points for lists, headers for sections
- Follow the inverted pyramid: most important information first in every section
- Apply Orwell's rule: if a word can be cut without losing meaning, cut it
- Write in first person plural ("we") with energy and confidence
- Never invent statistics, metrics, awards, or quotes. Every number must come from my project information below.
- Total length: 800-1500 words. Comprehensive but not bloated.

---

HERE IS MY PROJECT INFORMATION (replace this section with your actual details):

Project Name: [YOUR PROJECT NAME]
Hackathon: [HACKATHON NAME]
Problem/Inspiration: [Describe the problem you're solving and why it matters]
What it does: [Describe what your project does from the user's perspective]
Tech stack: [List all technologies, APIs, frameworks, and services used]
Sponsor technologies: [List any sponsor APIs or tools you used; these are critical]
Challenges: [List the main challenges you faced]
Accomplishments: [What went well? Any metrics or quantitative results?]
What you learned: [Genuine learnings, technical and personal]
What's next: [Future plans for the project]
Additional context: [Any other details: team background, special features, design process, etc.]
```

#### GitHub README Generator

Writes a GitHub README with badges, architecture placeholders, and install instructions.

What to Paste Along With the Prompt

```
You are a developer documentation expert. Generate a polished GitHub README.md for my hackathon project using the information I provide below.

Follow these rules strictly:

STRUCTURE (in this exact order):

1. PROJECT TITLE AND BADGES
- Start with: # ProjectName
- If a prize was won, add a line like: ### 🏅 [Hackathon Name] - [Prize Won]
- Add a centered block of shields.io tech stack badges using this format:
  <img src="https://img.shields.io/badge/[TECH]-[COLOR]?style=for-the-badge&logo=[LOGO]&logoColor=white" alt="[TECH]">
- Group badges by "Frontend built with:" and "Backend built with:" with <br> tags
- Use the for-the-badge style for all badges

2. HERO SECTION
- Add a centered screenshot or demo video placeholder:
  <p align="center"><img width="1728" alt="Screenshot" src="YOUR_SCREENSHOT_URL"></p>
- Below it, write 2-3 sentences describing the project's purpose and impact
- Include a key statistic or problem statement in bold

3. WHAT IT DOES
- 2-3 sentence overview
- Bullet list of key features with bold titles

4. ARCHITECTURE / HOW WE BUILT IT
- Reference an architecture diagram: ![Architecture](URL)
- List the tech stack organized by category (Frontend, Backend, AI/ML, Infrastructure)
- For each technology, briefly explain WHY it was chosen and what role it plays
- Name every API and service

5. GETTING STARTED
- Prerequisites section with required tools/versions
- Step-by-step installation:
  ```bash
  git clone https://github.com/username/repo.git
  cd repo
  npm install  # or pip install -r requirements.txt
  ```
- Environment variables section:
  ```bash
  cp .env.example .env
  # Fill in your API keys
  ```
- How to run:
  ```bash
  npm run dev
  ```

6. KEY FEATURES (if not covered above)
- Detailed feature descriptions with sub-bullets if needed

7. CHALLENGES AND LEARNINGS
- Brief section on technical challenges overcome
- Key learnings from the project

8. WHAT'S NEXT
- 3-5 concrete future plans

9. TEAM / CONTRIBUTORS
- List team members with their roles and GitHub links
- Format: **Name** - Role - [@github](https://github.com/username)

10. LICENSE
- MIT License (or as specified)

GENERAL RULES:
- Use clean, consistent markdown formatting
- Code blocks should specify the language (bash, typescript, python, etc.)
- Keep descriptions concise — this README is for developers and technical judges
- Use shields.io badges for ALL technologies in the tech stack
- Include placeholder comments like <!-- Add screenshot here --> where images should go
- Write in a professional but energetic tone
- The README should make someone want to clone the repo and try it

---

HERE IS MY PROJECT INFORMATION (replace this section with your actual details):

Project Name: [YOUR PROJECT NAME]
One-line Description: [One sentence describing what it does]
Hackathon: [HACKATHON NAME]
Prize Won: [Prize name, or "N/A"]
Tech Stack - Frontend: [e.g., Next.js, React, TypeScript, Tailwind CSS, shadcn/ui]
Tech Stack - Backend: [e.g., Python, FastAPI, Node.js]
Tech Stack - AI/ML: [e.g., GPT-4, Whisper, custom fine-tuned model]
Tech Stack - Infrastructure: [e.g., Vercel, Supabase, Firebase, AWS]
APIs Used: [e.g., Twilio, Hume, Retell, Google Maps]
Key Features: [List 3-5 main features]
Install Steps: [How to set up and run the project locally]
Environment Variables Needed: [List required env vars like OPENAI_API_KEY, etc.]
Team Members: [Names, roles, and GitHub usernames]
License: [MIT / Apache 2.0 / etc.]
Additional Context: [Architecture details, special setup, hardware requirements, etc.]
```

## Generate It With a Skill

If you'd rather have an agent read your repo and draft both, install these two skills from the Ship-It Toolkit.

TL;DR Install the readme-writer and devpost-writer skills to draft the GitHub README and the Devpost from your repo.

#### 1\. Write Your GitHub README

Reads your repo, asks for what it can't find, and writes the README (hero, badges, demo video, architecture diagram, team cards) plus the repo's About section. It won't invent awards or stats.

```
Install the GitHub Writer skill from https://github.com/IdkwhatImD0ing/hackathonstarterkit by running this in your terminal:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill readme-writer

Then use the readme-writer skill to write a winner-grade README for this hackathon project. Read the repo first to detect the stack and structure, then ask me for anything you can't find: the demo video link, the live URL and Devpost, any awards, the event details, and the team members with their GitHub and LinkedIn. Also set the repo's About metadata to match: the description, the website, and the topics/tags, using the gh CLI if it's available. Do not invent awards, stats, or prizes.
```

[See the full GitHub Writer skill](https://thehackathonplaybook.dev/non-coders/skills/readme-writer)

#### 2\. Write Your Devpost

Reads your repo and writes the Devpost section by section, plus the Built With tags and Try it out links. It won't invent awards, stats, or challenges.

```
Install the Devpost Writer skill and run it:

npx skills add IdkwhatImD0ing/hackathonstarterkit --skill devpost-writer

Use the devpost-writer skill to write our Devpost submission for this project. Read the repo first, then ask me for the demo video, the live URL, the hackathon and any awards, and the challenges we hit and what's next. Write the standard Devpost sections (inspiration, what it does, how we built it, challenges, accomplishments, what we learned, what's next), the Built With tags, and the Try it out links. Do not invent awards, stats, or challenges.
```

[Building your portfolio site or YouTube description too?

The full Ship-It Toolkit, plus a single prompt that generates all four deliverables, is on the post-hackathon page.](https://thehackathonplaybook.dev/playbook/post-hackathon#the-ship-it-toolkit)

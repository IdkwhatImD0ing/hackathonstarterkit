# Pitching

> Build your pitch around the demo, and get ready for judge questions.

Canonical: https://thehackathonplaybook.dev/playbook/pitching
Last updated: 2026-09-14

---

## Pitch What It Could Become

My 36+ wins and $100K+ in prizes look like a lot of code. What usually set those projects apart was the story.

TL;DR Spend your pitch on the problem and what the project could become, not on the feature list.

#### Sell the Vision

Pitch the potential. The backend can be duct tape and hope. If the story of what it could do is convincing, and you sound like you care about it, judges lean in.

#### It Carries Over

The story can matter more than the result. At LA Hacks 2023 we didn't win, but I posted about the project on LinkedIn and it caught an interviewer who was building the exact same thing. A week later I had [my first internship offer](https://thehackathonplaybook.dev/playbook/post-hackathon). Telling a project's story well also carries over to startup pitches, product work, and technical interviews.

## Anatomy of a Winning Pitch

Five parts, adapted for hackathons from Andy Raskin's strategic narrative framework in 'The Greatest Sales Deck I've Ever Seen' (Medium, 2016). The sample lines use a 911-dispatch idea.

TL;DR Open with a change in the world, show what's at stake, then show the product working live.

Name the Big Shift

Skip the product and team intro. Name a change in the world that raises the stakes. People argue with a problem you assert, but they're open to a shift that's already happening.

"Every year, 240 million 911 calls are placed in the US, yet dispatcher shortages mean some go unanswered." (240 million is the National Emergency Number Association's estimate.)

Show the Stakes

Paint two futures: what's lost if nothing changes, and what becomes possible.

"Lives are lost to hold music. But what if every call was answered instantly, by an AI that never sleeps?"

Live Demo

Show the main flow working, live. The labeled demo took 28% of our Dispatch AI pitch and 42% of TalkTuahBank's, and TalkTuahBank kept the product working on screen after that too.

Call the Twilio number live. Let judges hear the AI dispatcher triage a simulated emergency in real time.

The Magic — How It Works

Keep it short. Show what the tech does for the user, and save the architecture for Q&A.

"Under the hood: GPT-4 for triage, Twilio for telephony, and a custom priority queue that routes by severity."

Vision and Close

End with where this could go. Skip the feature roadmap.

"Imagine a world where no 911 call goes unanswered. We built the first step."

[Andy Raskin](https://medium.com/the-mission/the-greatest-sales-deck-ive-ever-seen-4f4ef3391ba0) — Strategic Narrative Expert, “The Greatest Sales Deck I've Ever Seen,” Medium, 2016

> “Your prospect is Luke, and you're Obi Wan, furnishing a lightsaber to help him defeat the Empire.”

His fourth element introduces features as magic gifts that get the hero past obstacles. In a hackathon pitch, the judges are Luke and your project is the lightsaber.

## Three of Our Winning Pitches, Dissected

Dispatch AI and TalkTuahBank are transcribed from the pitch videos, and AdaptEd is rebuilt from its Devpost writeup. The phase labels and technique notes come from a GPT-5 analysis run in March 2026.

TL;DR All three put a number on the problem early and tied the project to a sponsor's challenge.

#### Dispatch AI — UC Berkeley AI Hackathon 2024

Grand Prize ($25K SkyDeck investment) + AI For Good ($25K) + Best Use of Intel AI (1st, roughly $14K in hardware).

Pitch Structure Breakdown (4 min 34 sec)

Transcribed from our pitch video, recorded June 2024. My teammate Spike O'Carroll delivered the whole pitch. Repeated words are cleaned up.

0:00 – 0:3914% of pitch

> “In the United States, over 80% of 911 call centers are critically understaffed.”

Technique: Statistic-led opener + local example (Oakland)

0:39 – 1:039% of pitch

> “This could be literally the difference between life and death.”

Technique: Loss aversion, moral clarity

1:03 – 2:5541% of pitch

> “The voice AI will step into calls when all human agents are busy.”

Technique: Walks through how it works, with humans kept in the loop

2:55 – 3:178% of pitch

> “Our mission is to make requesting emergency services more effective and efficient.”

Technique: Mission statement tying product to social impact

3:17 – 4:3428% of pitch

> “I have my phone here with me, and I will call our agents.”

Technique: Live phone call to AI dispatcher with real-time UI

Strongest Moment

Spike O'Carroll, Dispatch AI pitch video, UC Berkeley AI Hackathon 2024 @ 3:43 – 3:50

> “See, you can see that our call updates in real time on the dashboard, and our transcription is on the right.”

The call lands on the dashboard while the transcript fills in, so the claim happens in front of the judges. A small glitch and a quick recovery made it more believable.

Why it won: A sourced number (the understaffing figure comes from the 2023 NENA and Carbyne survey), a working build (voice AI, a live triage dashboard, a model fine-tuned on real 911 data), and a human kept in the loop for safety. It fit AI For Good, Best Use of Intel AI, and investment readiness at once.

[View on Devpost](https://devpost.com/software/dispatch-ai)[Watch pitch](https://www.youtube.com/watch?v=hdpdgxrilQM)

#### TalkTuahBank — HackUTD 2024

1st Overall + Goldman Sachs Challenge Winner.

Pitch Structure Breakdown (2 min 11 sec)

Transcribed from our demo video, November 2024. The first two lines are our narrator; the rest are the product's AI agent during the recorded call. Repeated words are cleaned up.

0:00 – 0:054% of pitch

> “Did you know that over 1.7 billion adults worldwide don't have access to traditional banking services?”

Technique: A statistic that shows the scale

0:05 – 0:147% of pitch

> “It's an AI-powered telephonic banking service that brings financial management to anyone with a phone, no internet, or smartphone needed.”

Technique: Stresses how little you need to use it

0:14 – 1:1042% of pitch

> “Hey, I can help with things like checking your account balance, transferring funds, and even getting you started on a loan application.”

Technique: Role-play demo with concrete details

1:10 – 1:4930% of pitch

> “Awesome, you've successfully transferred $200 to account ACC 456.”

Technique: A completed transfer as proof

1:49 – 2:1117% of pitch

> “If there's anything else you need, feel free to let me know.”

Technique: Banking by phone, available any time

Strongest Moment

TalkTuahBank AI agent, demo video, HackUTD 2024 @ 1:20

> “Awesome, you've successfully transferred $200 to account ACC 456.”

Money moves on camera. That one line turns “voice banking” from a claim into something judges watched happen.

Why it won: It works over a plain phone call, so it reaches people with no internet or smartphone. Specific details (account IDs, dollar amounts, a “loan for college” story) made the demo believable and matched Goldman Sachs' financial inclusion brief.

[View on Devpost](https://devpost.com/software/talktuahbank)[Watch pitch](https://www.youtube.com/watch?v=YsH_z1azXSA)

#### AdaptEd — LA Hacks 2024

Google Company Challenge Winner. First place among 142 projects.

Pitch Structure (Reconstructed from Devpost)

From our Devpost writeup, not a recorded pitch. Lines in quotation marks are verbatim; the rest are condensed. The statistics are our own claims and have no citation on Devpost.

> “Instead of students adapting to the system, our AI lecturer adapts to students.”

Technique: A one-line reframe

> 50% of 16M US university students are falling behind. Less than 3% have access to quality tutoring.

Technique: Two numbers: how many fall behind, and how few get tutoring

> Responsive AI conversation, dynamic slide and whiteboard content, emotion detection.

Technique: Features described by what the student gets

> Gemini 1.5 Pro for multi-source aggregation, Fetch.ai agents, Intel Developer Cloud for fine-tuning, Hume for emotion detection.

Technique: Each tool gets one clear job

> “AdaptEd: interactive and personalized lectures through conversational voice AI.”

Technique: A one-line product vision

Strongest Moment

AdaptEd team, Devpost writeup, LA Hacks 2024 (reconstructed, not a recorded pitch line)

> “Instead of students adapting to the system, our AI lecturer adapts to students.”

One sentence that flips the usual setup and gives judges a single picture to remember.

Why it won: Heavy use of Gemini for the Google challenge, a believable workflow, and a list of exact integrations that showed it was really built.

[View on Devpost](https://devpost.com/software/teachme-3p7bw1)

Patterns Across Winners

Three pitches is a small sample, so treat these as a starting point.

Lead With a Number

All three put a number on the problem early: "80% understaffed," "1.7 billion unbanked," "50% falling behind." Then they said what it costs people, like "the difference between life and death."

Show It Working

Dispatch AI made a live phone call to its AI agent. TalkTuahBank moved $200 on camera.

Align With Sponsors

Each one used a sponsor's tech or brief and said so: Intel Dev Cloud, Goldman Sachs' financial inclusion challenge, Google Gemini.

One-Line Reframe

Each had one sentence that held the whole idea: "world's first AI 911 operator," "talk to your own personalized bank," "AI lecturer adapts to students."

## Know Your Judges

Track prizes and sponsor prizes are judged by different people, and they want different things.

TL;DR For a track prize, lead with who it helps. For a sponsor prize, put their tech at the center of the demo.

The same pitch can win one prize and miss another. Find out who's judging each prize you're going for, and adjust.

#### Lead With Who It Helps

Track prizes (“Best AI for Good,” “Best Sustainability Hack”) are judged on impact, vision, and societal benefit. The judges are often academics, nonprofit leaders, or organizers who care more about why than how. Make them care before you explain how it works.

What Track Judges Want to Hear

-   Bigger picture: who this benefits (society, underserved communities, children, the environment)
-   Human stories that make judges feel the problem
-   Scale: what changes if your project reaches millions of people
-   Equity by design: accessibility and sustainability built in from the start

#### Think Like Their Stockholder

Sponsor prizes are judged by company employees thinking about their product. They want a creative, deep use of their platform they can point to internally. The question in their head is “does this project show our software can do something valuable?”

What Sponsor Judges Want to See

-   Unexpected usage: their tech used in a way they hadn't considered, well past a “hello world” integration
-   New market: a use case that could make them money
-   Center stage: their platform at the center of your demo
-   Real depth: proof you read the docs and went past the quickstart

#### Read the Room

Adjust the pitch to whoever's sitting in front of you, while you're giving it.

One project was pitched three ways to three judges: tech for the engineer, market for the VC, UX for the designer. It took first place.

If the format allows, ask one question up front: “Are you all in the engineering field?” Their answer tells you how to weight your pitch. When I [judged LA Hacks](https://thehackathonplaybook.dev/blog/hackathon-pitch-mistakes-la-hacks), a couple of teams spent around 30 seconds explaining what OpenAI Agents or ElevenLabs Agents are. The same kind of question fixes that: “Are you familiar with ElevenLabs Agents?” If they are, skip the definition.

Engineers

-   Lead with architecture and system design
-   Point out clever algorithms or tradeoffs
-   Talk scalability, latency, and edge cases
-   Show the code if they want to see it

Non-Technical

-   Lead with the human problem and who it helps
-   Emphasize UX, market opportunity, and user stories
-   Give them an analogy they can repeat to the other judges
-   Show what it does and skip how it works

Unknown / Mixed

-   Lead with impact and vision
-   Let the demo do the explaining
-   Go technical only if their questions do

Rehearse both versions before judging, one that leads with technical depth and one that leads with impact, so you can switch mid-pitch.

## The Appendix Strategy

Leave things out of the main pitch on purpose, and have a slide ready for each one a judge might ask about.

TL;DR Keep the main pitch short and build a backup slide for each question you expect in Q&A.

Pitches are short and judges are tired. At LA Hacks I had five minutes per team: about 1.5 for the pitch and demo, then 3.5 for questions. Some teams spent all five pitching. Check how your event splits the time and plan where you'll stop.

#### The Essentials

What every judge sees.

-   Problem: why this matters
-   Solution: what you built
-   Live demo: the main flow, working
-   Impact: what could be

Q&A triggers

Q&A triggers

#### The Backup Slides

Opened only when a judge asks.

-   Architecture: how it actually works
-   Tradeoffs: what you chose and why
-   Edge cases: what breaks at scale
-   Cost: what it takes to run at scale
-   What's next: roadmap beyond the hackathon

Why It Helps

Keeps the Pitch Short

Everything you move to the appendix frees time for the demo and for questions.

Wins the Q&A

Q&A is where judges fill in the rubric categories your pitch skipped and find out whether you understand what you built. A category that never comes up may get a low score, or a zero.

Looks Like Confidence

Pulling up a slide for a follow-up shows you thought past the pitch. It's really just preparation, done while sleep-deprived.

## The Demo Video

Live demos fail, and judges forget projects more than you'd expect.

TL;DR Record a demo video. It's your backup when the live demo dies, and judges can rewatch it in deliberation.

#### When the Demo Dies

The Wi-Fi at LA Hacks was spotty, and some teams couldn't run their demo at all. Without a backup video, I had no clear way to see what those projects did.

#### Follows the Judges

Judges revisit submissions during deliberation. A live pitch gets rushed and forgotten, and code sitting in a repo rarely stands out. The video is still there.

### A demo video worth copying

The product is on screen right away, and the narration tells you what you're looking at.

#### SoundSearch — AIATL Hackathon

A solo first-place accessibility tool that guides users through complex websites with real-time voice over a phone call. Built with NLX.ai and AWS, demoed on Google Flights. The recording reached a recruiter and turned into an internship offer.

Why it works: The embed starts at 0:22, after the problem intro, so the voice assistant is already walking through Google Flights in the first beat.

[Watch on YouTube](https://youtu.be/RgH-i9SYj-o?t=22)[View on Devpost](https://devpost.com/software/maybe-zc19va)

### Screen Studio

The screen recorder I use for every hackathon demo. Auto-zoom and cursor smoothing make a 60-second demo look polished, with basically no editing time. Worth a look if you're on Mac. On Windows, CanVid covers the same ground.

Affiliate link: I may earn a commission.

Automatic cursor zoomSmooth cursor glideWebcam overlay1-click export presets

[Check it out](https://screenstudio.lemonsqueezy.com?aff=LpD9R)

### 

TL;DR Start with why the problem matters to you, then keep switching between how things are and how they could be.

#### Start With Why

> “People don't buy what you do, they buy why you do it.”

Pitching outside-in sounds like “We built an app that…” Sinek's Golden Circle runs the other way: start with why you care, then how, then what.

— Simon Sinek, author and TEDx speaker, [Start With Why, 2009](https://simonsinek.com/books/start-with-why/)

#### What Is vs. What Could Be

> “You are not the hero who will save the audience; the audience is your hero.”

Her Sparkline swings between what is and what could be, then resolves the tension with your solution.

— Nancy Duarte, CEO of Duarte, Inc., [Resonate, 2010](https://www.duarte.com/resonate/)

#### Ethos, Pathos, Logos

Three appeals, about 2,400 years old:

Ethos: Credibility

Your domain experience, and why your team is the right one to solve this.

Pathos: Emotion

A real user who suffers. “Imagine a world where…”

Logos: Logic

Architecture, metrics, validation, and tech decisions that prove it can work.

— [Rhetoric, 4th century BCE](https://en.wikipedia.org/wiki/Rhetoric_(Aristotle))

#### Made to Stick — SUCCESs

Chip and Dan Heath's six principles for ideas judges still remember hours later in deliberation:

Simple: One core message, one sentence

Unexpected: Surprise them by violating expectations

Concrete: Specific, sensory language

Credible: Proof through demos, not claims

Emotional: Appeal to identity and values

Stories: Show how change happens

— [Made to Stick, 2007](https://heathbrothers.com/made-to-stick/)

### 

TL;DR Rehearse until the pitch is muscle memory, and be upfront about what's still rough.

#### The Power of Vulnerability

> “In order for connection to happen, we have to allow ourselves to be seen, really seen.”

Later in the talk, Brown says the people she calls wholehearted had “the courage to be imperfect.” No sleep strips the polish anyway, so explain what you built honestly, flaws included, and aim to be understood instead of impressive. Share a real setback: “We thought X, then talked to users and learned Y.”

— Brené Brown, research professor, University of Houston Graduate College of Social Work, [The Power of Vulnerability, TEDxHouston 2010](https://www.ted.com/talks/brene_brown_the_power_of_vulnerability)

#### Talk With, Not At

> “Speakers who talk about what life has taught them never fail to keep the attention of their listeners.”

Speak with judges, not at them. A real moment from your weekend holds attention better than a feature list.

The Carnegie Structure

1.  Tell them what you're going to say
2.  Say it
3.  Tell them what you said

In a 1.5-minute slot, keep the first and last steps to one sentence each.

— Dale Carnegie, American writer and lecturer, [The Quick and Easy Way to Effective Speaking, 1962](https://www.simonandschuster.com/books/The-Quick-and-Easy-Way-to-Effective-Speaking/Dorothy-Carnegie/Dale-Carnegie-Books/9780671724009)

Practice = Code

Rehearse your pitch as much as you code, until it's muscle memory.

Record Yourself

Record a practice run and watch it. You'll catch filler words, pacing, and missed beats you won't notice live.

> “Your purpose is to make your audience see what you saw, hear what you heard, feel what you felt.”

— Dale Carnegie, American writer and lecturer, [The Quick and Easy Way to Effective Speaking, 1962](https://www.simonandschuster.com/books/The-Quick-and-Easy-Way-to-Effective-Speaking/Dorothy-Carnegie/Dale-Carnegie-Books/9780671724009)

## Pitching Checklist

Run through this before judging starts.

TL;DR Find out how your slot splits between pitch and Q&A, and rehearse a pitch that stops in time for questions.

Open with the problem and why it matters to you

Main pitch: problem, what you built, a live demo of the main flow, where it could go

Match the prize: impact for a track prize, their tech at the center for a sponsor prize

Rehearse a technical and an impact version, then ask judges their background

Build appendix slides for likely questions (architecture, tradeoffs, edge cases, roadmap, cost) and know where each one is

Check how the slot splits between pitch and Q&A, and plan where you'll stop

Record a backup demo video

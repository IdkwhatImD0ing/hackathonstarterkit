# De-slop report

**Run:** first full run, 2026-09-14. **Scope:** all 28 reader-facing pages. **Status:** rewritten, verified, merged with main, and opened as a pull request.

Future runs of the skill should read `.deslop/voice-profile.md` first and audit only the files changed since this report.

## Summary

- **Every page improved.** The median page went from 30 to 44 out of 60, and the average went from 31.7 to 43.6.
- **13 of 28 pages now pass the skill's 45-point bar.** Before the rewrite, two pages passed: the AI access page (50) and the home page (45).
- **The other 15 are still under 45.** Reviewers in both rounds pointed to Authenticity and Specificity: those lessons have no hackathon story from you behind them. The rewrite didn't invent stories, so those pages are waiting on the 41 NEEDS SPECIFIC flags below.
- **The pages are shorter.** Readers now see 19% fewer words: 34,007 before, 27,419 after, counted after merging main. The rewrite commit itself removed 2,235 source lines net, with 2,826 added and 5,061 removed across 34 files.
- **Nothing is broken.** The build passes, and so do the unit tests, the markdown, llms.txt and skills freshness checks, JSON-LD validation, and the client bundle secret check. Lint warnings are unchanged at 15 before and 15 after. No flag text reaches any rendered page.
- **One thing is left:** the search index. It's stale because the text changed, and rebuilding it needs your OpenAI key. Do it once, after you've answered the flags.

## How the scores were produced

1. **Before scores.** The Phase 1 audit used five reviewers working from one shared brief, calibrated on one anchor page (the old how-to-win post, scored 28).
2. **After scores.** Fresh reviewers who didn't do the rewrite scored every page on the same rubric and the same anchor.
3. **Second pass.** Seventeen pages scored under 45 in that first rescore. Each got a second revision and then a final independent score.
4. **Small fixes after scoring.** I fixed the regressions the final reviewers listed after they scored, so those pages may sit a point or two higher than shown.

Treat any single score as plus or minus 3. The same page drew scores up to 3 points apart from different reviewers.

## Before this ships

1. **Work through the flags.** They're listed at the end of this report, grouped by file. They're code comments, so the site is safe to ship with them in place. Each one marks a spot where only you know the answer.
2. **Regenerate the derived files.** Run these after any edit to a page:

   ```bash
   pnpm build && pnpm gen:md && pnpm gen:llms && pnpm gen:skills
   ```

3. **Rebuild the search index.** This step needs `OPENAI_API_KEY`, and CI fails until it's done.

   ```bash
   pnpm gen:index
   ```

4. **Keep `.deslop/` in the repo.** It holds the voice profile the next run reads. The repo is public, so the profile's short quotes from your fiction and its note on luck are public with it.

## Scores

| Page | Before | After | What still holds it back |
|---|---|---|---|
| Post-hackathon | 25 | 45 | Research cards in the optional section |
| Non-coders: skills | 25 | 44 | No story of you using these skills at a hackathon |
| Pitching | 26 | 45 | The research dropdowns; "One project, pitched three ways" names no event |
| Execution | 27 | 39 | No owner story anywhere on the page |
| Playbook hub | 27 | 46 | The "7-phase system" badge still sells a system |
| Validation | 28 | 38 | Only one owner story; the go bag and spike examples have none |
| Pitch guide | 28 | 44 | "I've watched weaker projects win" with no event named |
| How to win | 28 | 45 | Phases 1 and 3 have no story |
| Non-coders: setup | 28 | 42 | No owner line; the steps all have the same shape |
| Submission | 29 | 41 | Nothing backs the claim that judges break ties using the submission |
| Tips for beginners | 29 | 41 | The judging-criteria advice appears three times; six callouts |
| What to do after | 29 | 45 | Some unsourced lines about recruiters |
| Blog index | 29 | 42 | The card summaries share a shape. They were rewritten after the final score. |
| Team formation | 30 | 41 | No team story; the JV/varsity numbers have nothing behind them |
| Tech stack | 30 | 39 | No story explaining why this became your default stack; model names out of date |
| Non-coders winning | 30 | 41 | You don't appear on the page; the title overclaims |
| Non-coders: concepts | 30 | 44 | No owner line |
| Non-coders: APIs | 31 | 45 | No owner line |
| Ideation | 32 | 42 | Only the Dispatch AI combination is shown |
| ElevenLabs + Cursor | 33 | 43 | No hackathon where you used this workflow; unsourced stats row |
| Media kit | 33 | 47 | Unconfirmed credentials ($1M valuation, 1,000+ person events) |
| Non-coders: system prompt | 34 | 45 | No hackathon context |
| Non-coders hub | 35 | 42 | No owner line |
| Non-coders: proof | 35 | 45 | All of the proof is other people's |
| LA Hacks pitch mistakes | 39 | 45 | Five of the nine mistakes have no LA Hacks example |
| Cheat sheet | 43 | 47 | Generic sponsor-prize note |
| Home | 45 | 46 | Unconfirmed credentials |
| AI access page | 50 | 51 | The chat's "answers only from this site" claim |

Word counts per page are in the table below. The biggest cuts were on the non-coder skills page (36%), execution (34%), ideation (33%) and validation (27%). A few pages grew slightly, because safety notes, sources, or your stories added words.

| Page | Words before | Words after |
|---|---|---|
| Pitching | 4,065 | 3,179 |
| Submission | 3,623 | 2,987 |
| Validation | 2,864 | 2,080 |
| Post-hackathon | 2,421 | 1,781 |
| Ideation | 2,068 | 1,392 |
| Execution | 2,059 | 1,363 |
| Team formation | 1,646 | 1,261 |
| All 25 generated pages | 34,007 | 27,419 |

## Corrections made

These are fixes to facts and safety, separate from the writing.

- **API keys:** the APIs page no longer tells readers to paste a live key into the AI chat. Keys go in `.env.local`. The Supabase example turns on Row Level Security, and readers are told to install only official MCP servers.
- **Open-sourcing:** post-hackathon now says to delete API keys and `.env` files before making a repo public, and to rotate any key that was ever committed.
- **Vercel:** the concepts page said Vercel publishes on save. It deploys when you push to GitHub. The page also now separates committing from saving, and local git from GitHub.
- **Devpost deadlines:** every tip that relies on editing Devpost after the deadline, or recording the demo after submitting, now says to check the event's rules.
- **Pitching numbers:** the page told readers to spend 60-70% of a pitch on the demo, while its own breakdowns showed 28% and 42%. It now uses its own numbers. The "90% / 20% slides" labels, which added up to 110%, are gone.
- **WebSockets:** validation no longer says you need Node for WebSockets. FastAPI supports them.
- **Skills names:** the frontend folder is `client/`, not `clients/`. "GitHub Writer" is now "README Writer". The run order no longer tells readers to run /domain-to-spec first.
- **Non-coder claims:** "beat thousands of developers" is now the 500 people the event accepted. The skills count is 10, not 6. The cardiologist is no longer called a non-coder, since the hub says he spent 20 years building healthcare software.
- **Your stances:**
  - "All from visibility, not LeetCode" is gone.
  - "You don't do hackathons to win" is gone from two pages.
  - "That's not bad luck. It's a failure to read the room" is gone.
  - Advice about picking an idea or prepping ahead now says it's for when you're competing to win.
- **Invented-stat risk:** the Devpost prompt now tells the AI to use only numbers you give it.

## Research quotes removed

These sources are gone from the pages, because each repeated a point another source on the same page already made, or supported nothing. CLAUDE.md asks for named research on these pages, so restore any you want back. The old text is in git history.

- **Post-hackathon:**
  - The tree-in-a-forest thought experiment (The Chautauquan, 1883)
  - Porter Gale (Your Network Is Your Net Worth, 2013). The line attached to her name read as an AI flourish.
  - Duplicate Jason Roberts and Granovetter cards (each is kept once)
- **Execution:**
  - Andrej Karpathy
  - Thomas Dohmke
  - Naval Ravikant
  - Fred Brooks
  - "Done is better than perfect" (the Facebook motto)
  - Jason Fried
  - Reid Hoffman
  - Elon Musk's five-step process
  - A duplicate Kent Beck card (Beck is kept once)
- **Validation:**
  - Richard Feynman (it had no source work or year)
  - Reid Hoffman
  - Eric Ries
  - Thomas and Hunt
- **Ideation:**
  - Arthur Koestler
  - James Webb Young
  - A duplicate Steve Jobs card (Jobs is kept once)
- **Team formation:**
  - Amy Edmondson
  - Anders Ericsson
- **Submission:**
  - Tom Preston-Werner. His quote argued for the opposite of the page's advice.
  - A duplicate Jeff Bezos quote (Bezos is kept once)

## Outside this pass: flagged, not changed

- **CLAUDE.md** puts the frontend in `clients/`, but the skills use `client/`. Main has since corrected its hackathon count to 50+.
- **AGENTS.md:** the setup page gives a full AGENTS.md template, the system-prompt page makes AGENTS.md a one-line pointer to CLAUDE.md, and /domain-to-spec writes its own. Readers who follow all three end up with a mixed file. Your call on which is right.
- **Metadata and JSON-LD** were off-limits in this pass. They still say "battle-tested", "ultimate playbook", "career-changing" and "hooks judges in 30 seconds". So does the HowTo description in `lib/structured-data.ts`.
- **Blog titles** were off-limits too. "How Experts Beat Developers" now contradicts its own post.
- **The TalkTuahBank video** is embedded on four pages. CLAUDE.md says to embed media on one page and link to it from the others.
- **`lib/persona-quiz-data.ts`** repeats unsourced lines that were cut from the team-formation page.
- **`lib/prompts/readme-agent.ts`** still says "GitHub Writer", has an em dash, and has no rule against inventing stats.
- **`docs/blog-engagement-checklist.md`** asks for "bucket brigades" like "Here's the problem:". The de-slop skill bans those.
- **Vibe Coding Lite**, from the old non-coder sources list, isn't linked anywhere now. Its page returned HTTP 403, so nobody could check what it supports.
- **Unused imports** that were already there before this pass were left alone.

## The pre-commit guard

It's installed at `.git/hooks/pre-commit`, which the main checkout and every worktree share. A copy is versioned at `.deslop/pre-commit.sh`. To install it on another clone, copy it to `.git/hooks/pre-commit` and make it executable.

**What it does:**
- It checks staged site copy: the page sources (`.ts` and `.tsx`) and the generated markdown.
- It blocks a commit when a file has more than 2 lines with banned phrases, or more than 5 em dashes used mid-sentence.
- Banned phrases are the skill's list plus the words in your voice profile.
- Em dashes in titles and in "— Author, Work, Year" attributions don't count, since CLAUDE.md allows those.
- To override it, commit with `--no-verify`.

**What it doesn't do:** it's a word tripwire, not the rubric.
- It can't see generic advice, hollow paragraphs, repeated points, or third-person owner stories.
- Those were most of this site's problems. On the old pages, it would have blocked only one of 25 pages (execution, for "leverage").
- Run the full skill for the real pass.

## Flag checklist

Every flag is a code comment that doesn't render on the site. Merging main resolved two of the original 111: the execution timeline question and the proof page's metadata note.
- **CONFIRM:** a claim that needs your yes.
- **NEEDS SPECIFIC:** a spot that needs a story or detail only you have.
- **NEEDS SOURCE:** a quote or number that needs a citation.

Line numbers are approximate. Search the file for the flag text.

Total: 109 flags.

### app/playbook/execution/page.tsx (5)

- L121: [NEEDS SPECIFIC: how did the 24 hours actually go at one of your wins (Dispatch AI, TalkTuahBank, AdaptED)? One real schedule would ground this timeline.]
- L243: [NEEDS SPECIFIC: where does the 2-hour rule come from? A hackathon where a feature ran long, and whether you cut it.]
- L326: [NEEDS SPECIFIC: what did you actually cut, and at which hackathon?]
- L429: [NEEDS SPECIFIC: which of these tools did you actually use, and on which win?]
- L735: [NEEDS SPECIFIC: "Winners don't have the cleanest code" was cut as unsourced. If you've seen this judging LA Hacks 2026 or on your own wins, tell that story here.]

### app/playbook/ideation/page.tsx (6)

- L183: [CONFIRM: the old subtitle called this "the ideation methodology behind $100K+ in hackathon prizes," which credits every prize to one method. Scoped down for now. Put it back only if every win came from it.]
- L209: [CONFIRM: model names on this page (OpenAI 4o, GPT-4o, GPT-4V) may be dated. Update them or keep?]
- L307: [NEEDS SPECIFIC: a pairing from one of your hackathons that flopped, so "most pairings flop" has a story behind it.]
- L446: [CONFIRM: TalkTuahBank is labeled "1st Overall + Goldman Sachs" here, but the home page says "1st Place Grand Prize" at HackUTD 2024. Which wording do you want?]
- L523: [NEEDS SPECIFIC: the AdaptED and TalkTuahBank combinations. Only DispatchAI's is shown, so "all three" rests on your word for now.]
- L800: [CONFIRM: TFT as your ideation habit, and the Valorant/League comparison. It reads like you, so it stays as written. Keep?]

### app/playbook/page.tsx (1)

- L5: [CONFIRM: the SEO title "7-Phase System to Win Any Hackathon" overclaims, since no system wins any hackathon, and the descriptions below still say "battle-tested" and "distilled". Left as is because it's metadata; soften if you want.]

### app/playbook/pitching/page.tsx (9)

- L147: [CONFIRM: this card used to say "One job came from telling the story of a project that won nothing." I've told it as the LA Hacks 2023 internship. Same story?]
- L559: [CONFIRM: three phase labels don't fit their quotes. "Stakes" (0:05-0:14) is the product description, and "How It Works" (1:10-1:49) and "Vision" (1:49-2:11) are the AI agent mid-call. Rewatch and relabel. If 1:10-2:11 is all demo, the 42% demo share used elsewhere on this page goes up too.]
- L819: [CONFIRM: the old "Why it won" said AdaptEd "opened with a human story for empathy," but the breakdown above opens with the reframe line. Which is right? I dropped the human-story line until you say.]
- L942: [NEEDS SPECIFIC: which hackathon taught you to pitch track and sponsor prizes differently? Dispatch AI won AI For Good and Best Use of Intel AI at Berkeley. If you pitched those judges differently, that's the story.]
- L1076: [CONFIRM: whose project was pitched three ways to three judges, and at which hackathon? If it was yours, tell it in first person and name the event.]
- L1201: [CONFIRM: which year you judged LA Hacks. The home page lists LA Hacks 2026; add the year here if that's the one.]
- L1449: [CONFIRM: is SoundSearch yours (solo 1st at AIATL)? If so, tell it in first person. Also confirm the recording reached a recruiter and led to an internship offer.]
- L1803: [NEEDS SPECIFIC: a pitch where you admitted a flaw or setback on stage, or told a real story from the weekend, and how the judges took it. The two cards below have only generic examples.]
- L1865: [CONFIRM: the "tell them what you're going to say" structure is credited to Carnegie's 1962 book, but that's unverified and the saying has several attributions. Find the page, or drop the Carnegie credit.]

### app/playbook/post-hackathon/page.tsx (1)

- L150: [CONFIRM: The old "proof" box also said this came "without job searching after that." Add it back only if it's true.]

### app/playbook/submission/page.tsx (7)

- L283: [NEEDS SPECIFIC: what judges actually looked at while deliberating, e.g. something you saw judging LA Hacks 2026. This page's main claim has no story behind it.]
- L365: [CONFIRM: 82% is now cited with the source the pitching page uses ("the 2023 NENA and Carbyne survey"). lib/blog/posts/hackathon-pitch-mistakes-la-hacks.ts names it in full and also says 82%; the spoken pitch rounded to "over 80%". Check the quoted wording matches your slide.]
- L366: [NEEDS SOURCE: TalkTuahBank's "1.7 billion adults without access to a bank" opener was cut from this step because nothing on the site sources it. Add it back with a citation if you have one.]
- L796: [NEEDS SPECIFIC: the old line said every winning Devpost "in the examples above" had a diagram, but the page shows none. Which of your winning Devposts had one? Second pass: the card now points to the Dispatch AI pitch's architecture slide (lib/blog/posts/hackathon-pitch-mistakes-la-hacks.ts). Did the same diagram go on the Devpost?]
- L831: [CONFIRM: is DoggoAI yours? PLAN.md lists it among your notable projects, but the page never introduces it. If it is, tell it in first person and name the hackathon. Second pass cut the verdict "its submission was much stronger for it" because nothing backs it; put it back with what actually changed if you know.]
- L946: [NEEDS SPECIFIC: which hackathon did you first record the video in this gap?]
- L997: [NEEDS SPECIFIC: have you seen a team miss the deadline because Devpost lagged? The old line said it happens "every hackathon," which I cut.]

### app/playbook/team-formation/page.tsx (5)

- L114: [NEEDS SPECIFIC: a team of yours that was missing one of these roles, and what it cost you. Which hackathon?]
- L437: [NEEDS SPECIFIC: where did you find your own teammates, and which of these channels actually worked for you?]
- L546: [NEEDS SPECIFIC: a hackathon where a teammate's attitude, good or bad, decided how the weekend went.]
- L647: [CONFIRM: this subtitle used to say "The method behind $100K+ in prizes." Did you use the JV/varsity system for those wins? If so, say it here in first person.]
- L659: [NEEDS SPECIFIC: someone on your own squad who went from JV to varsity, and roughly how many hackathons it took. No names needed.]

### app/playbook/validation/page.tsx (6)

- L104: [NEEDS SPECIFIC: a time an untested API broke late in one of your hackathons (the first draft said "hour 18"). Did this happen to you or a team you saw? Which hackathon?]
- L611: [CONFIRM: "fewer teams submit" to sponsor prizes is unsourced. Is that what you've seen? If so, a sponsor win of yours (e.g. AdaptED, 1st Place Google at LA Hacks 2024) could show it.]
- L686: [NEEDS SPECIFIC: did you target the Intel prize on purpose at Berkeley? If so, say so in a sentence. If not, this example only shows that both can be won.]
- L721: [NEEDS SPECIFIC: what's actually in your own go bag, and which hackathon made you start one?]
- L997: [NEEDS SPECIFIC: were the first two spikes (GPT-4 triaging 911 calls, Twilio audio to an LLM) from Dispatch AI? If so, tell it in first person with the hackathon.]
- L1412: [NEEDS SPECIFIC: the 2-hour framework debate. Have you watched a team do this? Which hackathon?]

### lib/blog/posts/best-tech-stack-for-hackathons.ts (3)

- L24: [NEEDS SPECIFIC: which hackathon made this your default?]
- L85: [CONFIRM: update model names. "GPT-4o" and "Claude 4" look stale for a post billed as 2026.]
- L116: [CONFIRM: restored from the original "(judges scrub, not watch)". Nothing on the site sources it. Keep it only if it matches what you've seen as a judge.]

### lib/blog/posts/build-with-elevenlabs-and-cursor.ts (6)

- L6: [CONFIRM: this used to end "to ship and win." No ElevenLabs win is named anywhere on the site (Dispatch AI used Retell and Hume). If one of your wins used ElevenLabs, name it and "win" can come back.]
- L25: [NEEDS SPECIFIC: the opener used to say a voice demo is what gets judges to stop on an expo floor. Nothing on the site backs that, so it's cut. A hackathon where a voice demo got judges to stop (yours, or one you judged at LA Hacks 2026) would bring it back.]
- L27: [CONFIRM: source and current values for these four numbers (Flash latency, language count, free characters per month, the MLH offer). "Free for MLH" doesn't say what's free or who qualifies. Spell it out, or cut that stat.]
- L64: [CONFIRM: this prompt says Next.js 15, but the stack post (best-tech-stack-for-hackathons) says Next.js 16. Which should it be?]
- L72: [CONFIRM: the post used to say the MCP server also reads .env.local. The mcp.json above passes the key in its own env block, so the text now says that. Correct?]
- L97: [CONFIRM: check this wording against the book. The preface's rule may read "Write new code only if an automated test has failed."]

### lib/blog/posts/hackathon-pitch-guide.ts (3)

- L24: [CONFIRM: did your 36+ winning pitches use this problem, demo, how, impact structure? "It's been tested across 36+ winning pitches" was softened to "the structure I use."]
- L25: [NEEDS SPECIFIC: which hackathon, and what did the winning pitch do that the stronger project's didn't?]
- L47: [CONFIRM: whose pitch was this? The Dispatch AI transcript on app/playbook/pitching/page.tsx opens with "over 80% of 911 call centers are critically understaffed," not 240 million calls. If it was yours, say "our".]

### lib/blog/posts/hackathon-pitch-mistakes-la-hacks.ts (7)

- L24: [CONFIRM: this was LA Hacks 2026? The post never states the year; I didn't add it.]
- L40: [NEEDS SPECIFIC: an LA Hacks team that gave the wrong judge the wrong angle?]
- L77: [NEEDS SPECIFIC: a flat pitch you judged at LA Hacks, and what it cost the team?]
- L86: [NEEDS SPECIFIC: a wordy slide deck you saw at LA Hacks?]
- L105: [NEEDS SPECIFIC: a team at LA Hacks that toured its features instead of the main flow?]
- L142: [NEEDS SPECIFIC: a follow-up question at LA Hacks that a team answered well, or badly, without an appendix slide?]
- L159: [CONFIRM: this pull-quote quotes you (Bill Zhang). Keep it?]

### lib/blog/posts/hackathon-tips-for-beginners.ts (4)

- L25: [CONFIRM: do HackMIT, HackUTD, and CalHacks all currently run beginner tracks, mentoring, and workshops?]
- L33: [CONFIRM: restored from the original. Do sponsors and challenges usually drop 1-2 weeks early? Nothing on the site sources it.]
- L79: [NEEDS SPECIFIC: a hackathon where sleeping, or skipping sleep, changed how your demo went.]
- L96: [CONFIRM: is SoundSearch yours? The video credit says "Demo video by Bill Zhang." If it is, tell this in first person ("my solo project", "I got an internship offer").]

### lib/blog/posts/how-to-win-hackathons.ts (2)

- L36: [NEEDS SPECIFIC: how the TalkTuahBank or Dispatch AI team split the work. It would replace the cut claim about "the strongest teams at HackUTD, LA Hacks, and TreeHacks."]
- L59: [NEEDS SPECIFIC: a hackathon where testing an API in the first hours saved you, or where skipping it cost you.]

### lib/blog/posts/non-coders-winning-hackathons.ts (3)

- L5: [CONFIRM: the title ("How Experts Beat Developers") now overclaims relative to the body, which says three winners don't show that non-coders usually beat developers. The description was rewritten to match the body; the title wasn't touched. Soften it?]
- L36: [NEEDS SPECIFIC: have you seen a non-coder win, or judged one at LA Hacks 2026? One line from your own hackathons would ground this post.]
- L45: [CONFIRM: this post used to present Nedoszytko as a non-coder. The "20 years building healthcare software" detail comes from app/non-coders/page.tsx, which credits Anthropic's winners write-up. Keep?]

### lib/blog/posts/what-to-do-after-a-hackathon.ts (2)

- L26: [CONFIRM: "I would never have gotten that internship otherwise" is a counterfactual. Keep it as written?]
- L68: [CONFIRM: source for recruiters and applicant systems using AI to screen candidates, or cut this callout]

### app/non-coders/apis/page.tsx (3)

- L251: [NEEDS SPECIFIC: a hackathon where you, or a non-coder you worked with or judged, wired in a service this way. One line would ground this page.]
- L373: [CONFIRM: is this dashboard path still current? Newer Supabase projects may label the anon key as the "publishable" key.]
- L423: [CONFIRM: the ElevenLabs repo URL below comes from lib/blog/posts/build-with-elevenlabs-and-cursor.ts. OK to use it here? No official Supabase MCP link exists on this site, so that prompt points the AI to Supabase's docs instead. Link the official servers if you want.]

### app/non-coders/concepts/page.tsx (2)

- L85: [NEEDS SPECIFIC: have you seen a team leak a key, or had one break a demo, at a hackathon? One line would ground this card.]
- L205: [CONFIRM: /explain comes from .agents/commands/explain.md, not skills/. It's unverified that the skills install prompt installs it.]

### app/non-coders/page.tsx (3)

- L72: [CONFIRM: softened from "Zero programming experience required." One featured winner, Nedoszytko, had spent 20 years building healthcare software. The openGraph description in metadata (off-limits here) still says "No coding experience required."]
- L212: [CONFIRM: the old Sources list titled the SF Standard piece "200+ Hackathon Wins"; the proof page says "200+ Hackathons". Which is right? This page no longer states either number.]
- L213: [NEEDS SPECIFIC: this page has no line from you. Why you built the non-coder guide, or a non-coder you've seen win or judged at LA Hacks 2026, would fit here.]

### app/non-coders/proof/page.tsx (6)

- L96: [CONFIRM: "1st Place" at the Cursor hackathon. Nothing on this page sources the placement. lib/blog/posts/non-coders-winning-hackathons.ts says she "won against 27 other teams", citing her write-up.]
- L112: [CONFIRM: "200+ Hackathons". The hub's old Sources list titled the same SF Standard piece "200+ Hackathon Wins". Which is right?]
- L115: [CONFIRM: this line comes from lib/blog/posts/non-coders-winning-hackathons.ts, which cites the SF Standard piece. It replaced "Zero lines of code written, ever", an absolute. Does the piece support either?]
- L232: [NEEDS SOURCE: the 13,000 applicant count is credited to Cerebral Valley, but no Cerebral Valley link exists anywhere on the site. Add the URL or cut the number.]
- L275: [CONFIRM: "the lawyer for a friend's business." None of the quotes or sources on this page say this.]
- L276: [NEEDS SPECIFIC: every story here is third-party. Have you seen a non-coder win, or judged one at LA Hacks 2026? One line from you would fit after this paragraph.]

### app/non-coders/setup/page.tsx (6)

- L41: [CONFIRM: the audit flags .cursorrules as Cursor's legacy rules format (this repo itself uses .cursor/rules/). Cursor's own post (cursor.com/blog/agent-best-practices, Jan 2026) puts rules in .cursor/rules/, and Awesome Cursor Rules (github.com/PatrickJS/awesome-cursorrules, from the old hub's Sources list) now uses .mdc files there. Keep recommending .cursorrules?]
- L42: [CONFIRM: the AGENTS.md template below pins "Next.js 15". Still the version you want readers to use?]
- L130: [CONFIRM: Ctrl+L for chat and Ctrl+I for agent mode may be out of date. Check them against the current Cursor version.]
- L194: [CONFIRM: this page's setup (.cursorrules + a full AGENTS.md + PRD.md) conflicts with /non-coders/system-prompt, which puts the rules in CLAUDE.md and makes AGENTS.md a one-line pointer. /domain-to-spec also writes its own AGENTS.md. Which setup should non-coders follow? Advice left unchanged until you decide.]
- L317: [NEEDS SPECIFIC: step 3 asks non-coders to review code they may not be able to read. What can a non-coder actually check in a diff? The owner should say; no method has been added.]
- L394: [NEEDS SPECIFIC: where does "at least a week" come from? A hackathon where you or a teammate had to learn the tool during the event would carry this.]

### app/non-coders/skills/page.tsx (2)

- L115: [CONFIRM: Ctrl+I / Cmd+I still opens Cursor's agent chat in the current Cursor version.]
- L228: [CONFIRM: skills/ also has devpost-writer, portfolio-builder, ship-it, and youtube-writer, which the install prompt pulls in but this page doesn't list. List them here, or leave them off on purpose?]

### app/non-coders/system-prompt/page.tsx (2)

- L88: [CONFIRM: "See @CLAUDE.md" is Claude Code's import syntax. It's unverified whether Cursor and Codex follow it and load CLAUDE.md. The downloaded file (public/system-prompt/non-coder-agents.txt) promises they "load the exact same rules"; that text is agent-facing and wasn't changed.]
- L161: [CONFIRM: this page conflicts with /non-coders/setup, which says your setup is .cursorrules + a full AGENTS.md + PRD.md. /domain-to-spec also writes its own AGENTS.md. Which setup should non-coders follow? Advice left unchanged until you decide.]

### lib/non-coder-skills.ts (1)

- L210: [CONFIRM: /explain lives in .agents/commands/explain.md, not skills/. Does the install prompt (npx skills add) actually install it? If not, readers who follow this page won't have it.]

### app/ai/page.tsx (1)

- L40: [CONFIRM: "answers only from this site's content" rests on the system prompt (lib/chat/prompt.ts: "Answer ONLY from the reference sections"), which a model can still stray from. The citation chips come straight from retrieval results, but inline links in the answer are model-written. Keep "answers only" and "can't cite", or soften to "is told to answer only"?]

### app/media-kit/page.tsx (5)

- L40: [CONFIRM: the JSON-LD description below still calls you "one of the most decorated hackathon competitors in the US college scene". It's unsourced and was cut from the visible bio, but JSON-LD is off-limits in this pass. Cut it here too?]
- L110: [CONFIRM: "1,000+ person events" for HackUTD 2024, UC Berkeley AI Hackathon 2024, and LA Hacks 2024]
- L121: [CONFIRM: "returning for the LA Hacks AI Hackathon"]
- L132: [CONFIRM: "(Enterprise & Post-Training Research)" as your Scale AI team. Moved here from the bio paragraph.]
- L138: [CONFIRM: "$1M valuation, Berkeley SkyDeck funded" for Dispatch AI]

### app/page.tsx (4)

- L69: [CONFIRM: "1,000+ person events" for HackUTD 2024, UC Berkeley AI Hackathon 2024, and LA Hacks 2024]
- L80: [CONFIRM: "returning for the LA Hacks AI Hackathon"]
- L96: [CONFIRM: "$1M valuation, Berkeley SkyDeck funded" for Dispatch AI]
- L198: [CONFIRM: metadata and the FAQ/HowTo JSON-LD below still say "ultimate playbook", "battle-tested", "ideas that judges love", "career-changing", and "hooks judges in 30 seconds". Left as is because they're off-limits in this pass. Soften them if you want them to match the rewritten pages.]

### lib/cheat-sheet.ts (4)

- L148: [NEEDS SPECIFIC: a sponsor prize you went after because fewer teams were competing for it, and at which hackathon?]
- L295: [CONFIRM: this note points CLAUDE.md at AGENTS.md, but the "Set up a docs folder" prompt and /non-coders/system-prompt point AGENTS.md at CLAUDE.md. Which direction do you want?]
- L503: [CONFIRM: the prompt says "Nobody is reading our source code", but the README card assumes judges open the repo. Keep that line, or soften it?]
- L733: [CONFIRM: the prompt hides the hardcoded steps from the audience, and this note only discloses them if a judge asks. Intended, or should presenters say up front what's hardcoded?]

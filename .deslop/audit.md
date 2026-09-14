# De-slop audit, first run

**Date:** 2026-09-14. **Scope:** every reader-facing page (28 files). **Rubric:** the skill's six dimensions, 10 points each, 60 total.

Not scored: the ten skill detail pages under `/non-coders/skills/<slug>` (their body is agent instructions, not reader prose) and `app/terms` (legal).

The scores come from one full calibration read plus five parallel reviewers working from a shared brief with an anchor score. Treat any single score as plus or minus 3. The ranking is more reliable than the exact number.

## Scores, worst first

| File | Score /60 | Worst dimension | Dominant slop pattern | Verdict |
|---|---|---|---|---|
| app/playbook/post-hackathon/page.tsx | 25 | Authenticity, Density | Motivational slogans around a career story told three different ways | REWRITE |
| app/non-coders/skills/page.tsx + lib/non-coder-skills.ts | 25 | Rhythm, Authenticity, Density | The same skill descriptions listed two or three times, in developer jargon | REWRITE |
| app/playbook/pitching/page.tsx | 26 | Density, Authenticity | Your own winning pitches written up as third-person case studies under framework explainers | REWRITE |
| app/playbook/execution/page.tsx (+ timeline-simulator.tsx) | 27 | Authenticity | Slogan triplets and borrowed quotes, no story of yours | REWRITE |
| app/playbook/page.tsx + lib/playbook.ts | 27 | Rhythm, Authenticity, Specificity | Taglines that each list three verbs, brochure adjectives | REWRITE |
| app/playbook/validation/page.tsx | 28 | Authenticity, Rhythm | The Lego-block metaphor restated in every section | REWRITE |
| lib/blog/posts/hackathon-pitch-guide.ts | 28 | Authenticity, Density | Generic presentation advice; Do/Don't lists restate the paragraphs | REWRITE |
| lib/blog/posts/how-to-win-hackathons.ts | 28 | Authenticity | The same heading, paragraph, list, callout template seven times | REWRITE |
| app/non-coders/setup/page.tsx | 28 | Authenticity, Rhythm, Density | Uniform short lists restating one workflow three times | REWRITE |
| app/playbook/submission/page.tsx | 29 | Authenticity, Density | A useful Devpost checklist wrapped in famous quotes and unsourced absolutes | REWRITE |
| lib/blog/posts/hackathon-tips-for-beginners.ts | 29 | Authenticity | A teaser with an unsourced payoff, generic checklists, aphorism closers | REWRITE |
| lib/blog/posts/what-to-do-after-a-hackathon.ts | 29 | Density, Authenticity | One rule restated four or more times, punchy closers | REWRITE |
| app/blog/page.tsx (+ post descriptions) | 29 | Authenticity, Rhythm | SEO blurbs, every card built in the same keyword-first shape | REWRITE |
| app/playbook/team-formation/page.tsx | 30 | Authenticity | Your squad system squeezed into a persona-card template | REWRITE |
| lib/blog/posts/best-tech-stack-for-hackathons.ts | 30 | Authenticity | A "one rule" teaser and unsourced superlatives around a sound default stack | REWRITE |
| lib/blog/posts/non-coders-winning-hackathons.ts | 30 | Authenticity | Outside research in place of any story of yours | REWRITE |
| app/non-coders/concepts/page.tsx | 30 | Authenticity, Rhythm, Specificity | One everyday analogy per term, same card twelve times | REWRITE |
| app/non-coders/apis/page.tsx | 31 | Authenticity, Density | A three-step pattern restated three times, stacked analogies | REWRITE |
| app/playbook/ideation/page.tsx | 32 | Density | Your real method buried under research quote cards | REWRITE |
| lib/blog/posts/build-with-elevenlabs-and-cursor.ts | 33 | Authenticity | Hype framing and unsourced time numbers around a usable workflow | REWRITE |
| app/media-kit/page.tsx | 33 | Authenticity, Density, Rhythm | Press-release superlatives; the same stats repeated in five places | REWRITE |
| app/non-coders/system-prompt/page.tsx | 34 | Authenticity | A clear rationale padded with repeated "it gets better" boilerplate | REWRITE |
| app/non-coders/page.tsx + lib/non-coder-sections.ts | 35 | Authenticity, Specificity | Well-sourced third-party proof, no voice of yours, a detached sources list | REWRITE |
| app/non-coders/proof/page.tsx | 35 | Authenticity, Rhythm | Quote cards capped by an inflated "the pattern is clear" callout | REWRITE |
| lib/blog/posts/hackathon-pitch-mistakes-la-hacks.ts | 39 | Authenticity | "It's not X, it's Y" lines over real judging observations | REWRITE |
| lib/cheat-sheet.ts + app/cheat-sheet/page.tsx | 43 | Authenticity, Rhythm | Concrete cards, each capped with a slogan note ("X beats Y" six times) | REWRITE |
| app/page.tsx | 45 | Authenticity | A wall of credentials with one unsourced superlative | PATCH |
| app/ai/page.tsx | 50 | Authenticity, Rhythm | A clean technical reference with one grand line | PATCH |

## Report

Of 28 files, 26 need a rewrite, 2 need a patch, and none can be left alone. The median score is 30 out of 60, well under the 45 needed to ship.

**The three patterns that recur most:**
1. **Your wins told as someone else's.** Dispatch AI, TalkTuahBank and SoundSearch show up as third-person case studies. Almost no page says "I" about a hackathon. Authenticity was among the worst dimensions on 27 of 28 pages.
2. **Slogan closers and "not X, it's Y" lines.** Examples: "The project is temporary. The network is not." "A loss is rocket fuel." "Your pitch is not a product tour. It is a scoring conversation."
3. **Unsourced numbers and absolutes.** Examples: "Judges see 50+ demos in a day," "about 30 seconds before they tune out," "the #1 killer of hackathon projects," "ahead of 80% of teams." You can now answer several of these from judging LA Hacks.

**Cut substantially:** pitching (about half), post-hackathon and execution (about 45%). Submission, validation, ideation, the skills index, the playbook hub, and the how-to-win and pitch-guide posts should each lose about 40%.

**Advice problems separate from the writing:** see the appendix. The most urgent ones are security. The APIs page has readers paste a live API key into an AI chat. The post-hackathon page says "open-source it" with no warning to scrub keys first.

**Best page to learn from:** the LA Hacks pitch-mistakes post (39). It has real judging observations and mostly needs the machine layer peeled off.

## Appendix A: advice that looks wrong or risky

- **Security, APIs page:** it tells readers to paste a real API key into the AI chat ("Replace the fake API key with your real one"), which leaves the key in chat history. Its Supabase example builds a public form on the anon key and never mentions Row Level Security.
- **Security, post-hackathon:** "Open-source it" and "The downside of sharing is zero" come with no warning to scrub API keys and `.env` files from a repo built in 24 hours.
- **Wrong, concepts page:** it says Vercel "automatically publishes every time you save." Vercel deploys on a push to GitHub. It also says environment variables mean "nobody looking at your code can see it," which isn't true for keys used in browser code.
- **Rule-dependent tricks:** submission, execution, the LA Hacks post, and the beginners post all lean on Devpost staying editable after the deadline, or on recording the demo after submitting. Some events treat edits after the deadline as a violation. Tell readers to check the rules.
- **The site contradicts itself:**
  - The setup page says your whole configuration is three files, including a full AGENTS.md. The system-prompt page makes AGENTS.md a one-line pointer to CLAUDE.md.
  - Pitching says to spend 60-70% of pitch time on the demo. Its own winning examples spent 28% (Dispatch AI) and 42% (TalkTuahBank).
  - The pitch guide prescribes a 3-minute talk. The LA Hacks post says about 1.5 minutes of pitch and 3.5 of Q&A, and calls eating the Q&A time the most common mistake.
  - The execution simulator gives demo prep 0 hours. The written timeline on the same page says to spend the last 4 hours on demo and pitch.
- **Conflicts with your stances:**
  - "All from visibility, not LeetCode." (post-hackathon) goes against "never give up on algorithms."
  - "You don't do hackathons to win. You do them to network." (post-hackathon; also "to get seen" in the what-to-do-after post) rules out winning, when your stance is to say which goal a piece of advice serves.
  - "That's not bad luck. It's a failure to read the room." (pitching) blames the reader for what your stance treats as luck.
  - Validation says "Critical: validation happens BEFORE the hackathon, not during it" and never says this is for competing to win.
- **Accuracy on non-coder pages:** "zero coding backgrounds" is used for a winner the hub page says spent 20 years building healthcare software. "Beat thousands of developers" is used for an event that accepted 500 people. "200+ Hackathon Wins" and "200+ Hackathons" both appear for the same person.

## Appendix B: claims about you that aren't in the voice profile

These may all be true. Each came out of the AI expansion, so confirm it or cut it before a rewrite repeats it.

- **Post-hackathon:** "hundreds of recruiting DMs"; "without job searching after that"; the LA Hacks RAG-app LinkedIn post that led to an offer a week later (which year?); "one hackathon spent learning vector databases" that led to an internship and a full-time job; the quote "that weekend quietly rerouted my trajectory."
- **What-to-do-after post:** "one LinkedIn post about a project got me the interview that became my first offer" and "We didn't even win that hackathon." These match the LA Hacks story, but the details differ.
- **Pitching:** "One project, pitched three ways to three judges... First place."; "One job came from telling the story of a project that won nothing."; SoundSearch at AIATL leading to an internship offer (also in the beginners post).
- **Pitch guide:** "tested across 36+ winning pitches"; "One winning opener I watched" (whose pitch?).
- **ElevenLabs post:** "the workflow Bill uses to ship and win" names no ElevenLabs win.
- **Ideation:** "TFT Helps Me Win Hackathons" (reads like you, so probably keep it); TalkTuahBank listed as "1st Overall + Goldman Sachs" while the home page says "1st Place Grand Prize."
- **Home and media kit:** "one of the most decorated hackathon competitors in the US college scene"; "$1M valuation"; "1,000+ person events"; "returning for the LA Hacks AI Hackathon."
- **LA Hacks post:** which year you judged; whether you want the pull-quote attributed to yourself.
- **Team formation:** it recommends WeCracked without saying you co-founded it.

## Appendix C: project docs that pull against the skill

- `docs/blog-engagement-checklist.md` asks for "bucket brigades" like "Here's the problem:" and "Still not convinced?" The de-slop skill bans exactly these as rhetorical setups. Rewrites follow the skill. The checklist should drop that line.
- CLAUDE.md rule 5 requires one `<KeyTakeaway>` per section. The skill warns against every section having the same shape. Rewrites keep the KeyTakeaways, but each one states a specific action or fact instead of a slogan.
- CLAUDE.md still says "60+ hackathons." The correct number is 50+.

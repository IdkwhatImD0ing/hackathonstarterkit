import {
  AlarmClock,
  Bug,
  Hammer,
  Mic,
  Rocket,
  Siren,
  Target,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The during-the-hackathon cheat sheet: paste-ready prompts, grouped by the
 * moment in the event when you need them.
 *
 * This is the operational twin of the playbook. The playbook teaches; this
 * file assumes you already know and just need the words to hand your agent.
 * Prompt text is deliberately verbose and constraint-heavy: an agent with no
 * context produces generic work, so every prompt carries its own context,
 * its own guardrails, and a required output shape.
 *
 * Placeholders use [SCREAMING BRACKETS] so the page can highlight them and
 * a reader can see at a glance what they have to fill in.
 */

export type CheatAccent = "volt" | "spark" | "primary" | "success";

export interface CheatPrompt {
  /** Anchor-safe id, unique across the whole page. */
  id: string;
  title: string;
  /** The trigger: the situation that should make you reach for this prompt. */
  when: string;
  /** The paste-ready prompt. */
  prompt: string;
  /** Optional one-line field note shown under the prompt. */
  note?: string;
}

export interface CheatSection {
  /** Anchor id, also the jump-nav target. */
  slug: string;
  /** Short label for the jump nav. */
  label: string;
  title: string;
  /** Where you are in the event when this section applies. */
  timing: string;
  subtitle: string;
  icon: LucideIcon;
  accent: CheatAccent;
  prompts: CheatPrompt[];
}

export const CHEAT_SHEET_UPDATED = "2026-08-16";

export const CHEAT_SECTIONS: CheatSection[] = [
  {
    slug: "war-room",
    label: "Set Up",
    title: "Set Up the War Room",
    timing: "First 30 minutes",
    subtitle:
      "Give your agent the context every later prompt assumes, read the rules before anyone codes, and get an empty app deployed.",
    icon: Terminal,
    accent: "volt",
    prompts: [
      {
        id: "pin-context",
        title: "Pin the hackathon context",
        when: "Paste this first, once per chat session. Every other prompt on this page assumes it.",
        prompt: `You are my build partner for a hackathon. Save this context and apply it to every answer from now on.

EVENT: [HACKATHON NAME]
TIME LEFT: [HOURS] hours, submission closes [TIME AND TIMEZONE]
TEAM: [N] people, skills: [WHO CAN DO WHAT]
PRIZES WE ARE TARGETING: [TRACK OR SPONSOR PRIZE]
JUDGING CRITERIA: [PASTE THE CRITERIA]
STACK WE ALREADY KNOW: [STACK]
DEMO FORMAT: [LIVE DEMO / RECORDED VIDEO / BOOTH]

Rules for the rest of this hackathon:
1. Optimize for a working demo at the deadline, not for clean code.
2. Never add a library, language, or service outside our stack unless I ask.
3. When I report a bug, ask for the exact error text before guessing.
4. Keep answers under 200 words unless I ask for code.
5. If something will take longer than the time we have left, say so and offer the smaller version instead.

Reply with a one-paragraph summary of our situation and the single biggest risk you see.`,
        note: "Re-paste it after any context reset. An agent that forgets your deadline will happily suggest a two-day refactor.",
      },
      {
        id: "rules-brief",
        title: "Turn the rules into a one-page brief",
        when: "Before you pick an idea. Do this while everyone is still doing icebreakers.",
        prompt: `Here are the official rules, judging criteria, and sponsor prizes for [HACKATHON NAME]:

[PASTE THE RULES PAGE, THE DEVPOST DESCRIPTION, AND THE PRIZE LIST]

Extract, in this order:
1. Hard requirements that disqualify us if we miss them (deadlines, public repo, video length, team size, "must start from scratch" rules).
2. Every prize with its criteria, ranked by how winnable it looks for [N] people in [HOURS] hours, with one line on why.
3. What each judging criterion actually rewards, and what a demo that scores well on it looks like.
4. Anything ambiguous I should ask an organizer about today.

Short bullets. No preamble.`,
        note: "Sponsor prizes are the least contested money in the room. Most teams never read past the grand prize.",
      },
      {
        id: "deploy-skeleton",
        title: "Deploy an empty app before you build anything",
        when: "Right after the team agrees on a stack, before the first feature exists.",
        prompt: `Before we build features, get an empty app deployed and live.

STACK: [STACK]
REPO: [GITHUB URL, OR "create a new one"]
PROJECT NAME: [NAME]

Do this now:
1. Scaffold the smallest app that renders one page reading "[PROJECT NAME] is live".
2. Initialize git, commit, and push.
3. Deploy it and give me the public URL.
4. Put the deploy command in the README so any teammate can ship.
5. List the environment variables we will need later and where each one goes.

Stop once the URL is live and report it. Do not add features.`,
        note: "A broken deploy costs 20 minutes at hour 2 and costs you the win at hour 23.",
      },
    ],
  },
  {
    slug: "lock-the-idea",
    label: "Lock Idea",
    title: "Lock the Idea",
    timing: "Hour 1 to hour 3",
    subtitle:
      "Generate against the prize list, try to kill your favorite, then cut the survivor down to the exact demo you will perform.",
    icon: Target,
    accent: "spark",
    prompts: [
      {
        id: "ideas-against-prizes",
        title: "Generate ideas aimed at actual prizes",
        when: "Your team is throwing out ideas with no filter and going in circles.",
        prompt: `Give me 10 project ideas for [HACKATHON NAME] that [N] people can demo in [HOURS] hours.

Constraints:
- Each idea maps to at least one of these prizes or tracks: [PASTE PRIZES].
- Each is demoable live in 3 minutes.
- Uses only what we already know: [STACK AND APIS].
- Nothing that needs real users, a trained model, or data we do not have.

For each idea: the one-line pitch, the one demo moment judges will remember, the riskiest technical part, and which prize it targets.

Then rank all 10 and tell me which one you would build and why.`,
      },
      {
        id: "kill-the-idea",
        title: "Try to kill the idea",
        when: "Everyone loves an idea and nobody has said the scary part out loud yet.",
        prompt: `Play skeptical judge and senior engineer. Try to kill this idea.

IDEA: [ONE PARAGRAPH]
TIME LEFT: [HOURS] hours. TEAM: [N] people, [SKILLS].
JUDGING CRITERIA: [PASTE].

Answer bluntly:
1. What is the hardest technical piece, and what does the demo look like if it does not work?
2. What has to be true for this to be finished on time, and which of those is unlikely?
3. Which judging criterion does this score worst on?
4. Has this been built at 50 other hackathons? If yes, what one change would make ours different?
5. Verdict: build it, shrink it, or drop it. If shrink it, give me the smaller version.`,
        note: "An idea that survives this at hour 2 is one you are not abandoning at hour 18.",
      },
      {
        id: "demo-path",
        title: "Cut the idea down to the demo path",
        when: "The idea is locked and someone is about to start building the wrong thing.",
        prompt: `Turn this idea into the exact demo we will perform for judges, then cut everything else.

IDEA: [IDEA]
DEMO LENGTH: [3] minutes

1. Write the demo as a numbered, click-by-click script: what I show, in order, and what happens on screen at each step.
2. List only the features required for those clicks to work. That list is our entire scope.
3. List everything else we could have built under a heading "NOT BUILDING".
4. Estimate build time per in-scope feature for someone working with an AI agent, and flag anything over 2 hours.

Be ruthless. If the script cannot be built in [HOURS] hours, cut steps until it can.`,
        note: "Scope is not what you plan to build. It is the shortest path through the demo, and nothing else.",
      },
    ],
  },
  {
    slug: "plan-the-build",
    label: "Plan",
    title: "Plan the Build",
    timing: "Before the first feature",
    subtitle:
      "Write the spec your agent will actually follow, put the schedule on a clock, and split files so nobody overwrites anybody.",
    icon: Rocket,
    accent: "primary",
    prompts: [
      {
        id: "write-the-spec",
        title: "Write the spec your agent follows",
        when: "Before any feature code. Ten minutes here prevents an agent from inventing its own architecture at hour 12.",
        prompt: `Write two files and put them in the repo root.

PROJECT: [NAME]
IDEA: [ONE PARAGRAPH]
DEMO SCRIPT: [PASTE THE CLICK-BY-CLICK SCRIPT]
STACK: [STACK]

1. PRD.md: the problem, the demo path, the in-scope feature list, the data models, external APIs and env vars, and an explicit "out of scope" section.
2. AGENTS.md: how you work in this repo. Include the run and build commands, the folder layout, code style, "never install a dependency without asking", "never refactor working code", and "always leave the app in a state that runs".

Keep both under a page. Show me the files and wait for my approval before writing any feature code.`,
        note: "Point CLAUDE.md at AGENTS.md so every tool on the team loads the same rules.",
      },
      {
        id: "hour-by-hour",
        title: "Put the build on a clock",
        when: "The plan exists in everyone's head and nowhere else.",
        prompt: `Build an hour-by-hour plan for the rest of this hackathon.

RIGHT NOW: [CURRENT TIME]. SUBMISSION DEADLINE: [TIME].
TEAM: [NAMES AND SKILLS].
SCOPE: [PASTE THE IN-SCOPE FEATURE LIST].

Rules for the plan:
- A deployed, working app at every checkpoint. No big-bang integration at the end.
- Reserve the last [3] hours for the demo video, README, and submission. Nothing new gets built in that window.
- Include a feature freeze time, and a cut-scope decision point at the halfway mark.
- Every block has one owner and a definition of done.
- Include sleep and food: [SLEEP PLAN].

Output a table: time block, owner, task, done means.`,
      },
      {
        id: "split-the-work",
        title: "Split the work so nobody collides",
        when: "Two or more people are about to open the same files.",
        prompt: `Split this scope across [N] people so we never edit the same file at the same time.

SCOPE: [FEATURE LIST]
PEOPLE AND SKILLS: [LIST]

Give me:
1. A file and folder ownership map, one owner per area.
2. The interfaces between areas (API routes, shared types, component props), written out now so both sides can build before either exists.
3. A branch and merge rule simple enough to follow at 4am.
4. The three most likely merge conflicts and how we avoid them.

Then write the shared types file first so everyone can start.`,
      },
    ],
  },
  {
    slug: "build",
    label: "Build",
    title: "Build at Speed",
    timing: "The long middle",
    subtitle:
      "Scaffold the whole demo path first, then fill it in one feature at a time, with real API responses and honest seed data.",
    icon: Hammer,
    accent: "volt",
    prompts: [
      {
        id: "scaffold",
        title: "Scaffold the whole demo path",
        when: "Spec approved, deploy pipeline live, nothing built yet.",
        prompt: `Scaffold the app now, following PRD.md and AGENTS.md exactly.

Work in this order and stop at each checkpoint for my OK:
1. Every route and page on the demo path, with placeholder content and real navigation between them.
2. The shared layout, nav, and visual theme: [THEME, OR "dark, high contrast, one accent color"].
3. Types and API contracts from the PRD, returning mocked data.
4. Deploy and give me the live URL.

Every step ends with the app running and deployed. No half-finished screens.`,
        note: "Clickable placeholders mean you always have something to show, even if the last feature never lands.",
      },
      {
        id: "one-feature",
        title: "Build one feature end to end",
        when: "The workhorse prompt. Use it once per feature, all day.",
        prompt: `Build this one feature end to end. Do not touch anything else.

FEATURE: [WHAT IT DOES, FROM THE USER'S POINT OF VIEW]
DONE WHEN: [THE EXACT BEHAVIOR I CAN CLICK THROUGH]

Steps:
1. Give me your plan in 5 bullets and the files you will touch. Wait for my OK.
2. Implement it, including the loading state, the empty state, and the error state.
3. Run it and show me the click path that proves it works.
4. Commit with a clear message and deploy.

If you hit a decision I have not made, stop and ask instead of guessing.`,
      },
      {
        id: "new-api",
        title: "Wire an API you have never used",
        when: "Adding a sponsor API or any service the agent might hallucinate parameters for.",
        prompt: `Add [API OR SERVICE] to the project.

DOCS: [PASTE THE DOCS URL OR THE QUICKSTART SNIPPET]
WHAT WE NEED FROM IT: [ONE SENTENCE]
MY KEY: in [.env.local] as [VARIABLE_NAME]

1. Use only endpoints and parameters that appear in the docs I gave you. Do not invent any.
2. Write the smallest possible call as a standalone script first, run it, and show me the real response.
3. Only once that response is real, wire it into the app behind [ROUTE OR FUNCTION].
4. Handle failure with a visible message. A failed call must never crash the demo.`,
        note: "Sponsor booths hand out raised rate limits and free credits to anyone who walks over and asks.",
      },
      {
        id: "seed-demo-data",
        title: "Seed data that makes the demo sing",
        when: "Your app works but demos on an empty database or a 40-second cold call.",
        prompt: `Our demo needs data that looks real and loads instantly.

APP: [WHAT IT DOES]
DEMO SCRIPT: [THE STEPS JUDGES WILL SEE]

1. Create a seed file with [N] realistic records covering exactly the cases in the demo script, including one edge case that shows off [FEATURE].
2. Add a one-command reset that restores this exact state so I can run the demo twice in a row.
3. Keep the real code path intact: seeded data goes through the same functions as live data. No demo-only branches that hide broken logic.
4. Tell me in one line each which parts of the demo are real and which are seeded.`,
        note: "Seed the data, never fake the feature. Judges ask, and the room can tell when the answer is rehearsed.",
      },
    ],
  },
  {
    slug: "unstick",
    label: "Unstick",
    title: "When It Breaks",
    timing: "Hour 6, hour 14, hour 20",
    subtitle:
      "Force a real debugging loop instead of guess-and-patch, and get back to a working state without losing the day.",
    icon: Bug,
    accent: "primary",
    prompts: [
      {
        id: "debug-loop",
        title: "The debug loop",
        when: "Anything is broken and the agent's first three fixes did not work.",
        prompt: `Debug this with me. Follow the loop and do not skip steps.

WHAT I DID: [EXACT STEPS]
WHAT I EXPECTED: [X]
WHAT HAPPENED: [Y]
ERROR, VERBATIM: [PASTE THE FULL ERROR AND STACK TRACE]

Loop:
1. Restate the failure in one sentence.
2. Give me your top 3 hypotheses, ranked, each with the one-line check that proves or kills it.
3. Run the cheapest check first, or tell me to run it.
4. Fix only the confirmed cause, with the smallest possible change.
5. Show me how to verify the fix, then commit.

No refactors. No "while we are here" changes.`,
        note: "Paste the whole stack trace. Summarizing the error is how people spend an hour on a typo.",
      },
      {
        id: "works-locally",
        title: "Works locally, breaks in production",
        when: "The deployed URL behaves differently from your machine.",
        prompt: `It works on my machine and fails when deployed.

LOCAL: works.
DEPLOYED AT [URL]: [WHAT HAPPENS]
BUILD OR RUNTIME LOG: [PASTE]

Check these in order and report what you find at each: environment variables missing on the host, build-time versus run-time code, case-sensitive file paths, node version, packages missing from the lockfile, API keys restricted to localhost, CORS, and anything writing to the local filesystem.

Then fix the confirmed cause, redeploy, and give me the working URL.`,
      },
      {
        id: "back-to-working",
        title: "Get back to the last working state",
        when: "Something that worked an hour ago is broken and nobody knows what changed.",
        prompt: `We broke something that used to work and I do not know what.

LAST KNOWN GOOD: [WHEN, OR THE COMMIT]
BROKEN NOW: [BEHAVIOR]

1. Show me the commits since then, one line each.
2. Tell me which are most likely responsible and why.
3. Give me the exact commands to get back to the last working state on a new branch, without losing today's work.
4. Once we are working again, reapply the changes one at a time and test after each.

Do not force push. Do not delete branches.`,
        note: "Commit every 30 minutes. This prompt is only as good as your last commit.",
      },
      {
        id: "stuck-30",
        title: "Stuck for 30 minutes",
        when: "You have burned half an hour on one problem and the clock is still running.",
        prompt: `I have been stuck on [PROBLEM] for 30 minutes and we have [HOURS] hours left.

1. Give me the fastest workaround that keeps the demo intact, even if it is ugly.
2. Tell me in one line what we lose by taking it.
3. Tell me what the demo looks like if we cut this feature entirely.
4. Recommend one of the three, in two sentences.

Nobody is reading our source code. Optimize for what judges will see.`,
      },
    ],
  },
  {
    slug: "ship",
    label: "Ship",
    title: "Ship It",
    timing: "Last 3 hours",
    subtitle:
      "Feature freeze, harden the exact demo path, then write the README and submission before you are allowed to touch code again.",
    icon: AlarmClock,
    accent: "success",
    prompts: [
      {
        id: "harden",
        title: "Pre-demo hardening pass",
        when: "Feature freeze. Nothing new gets built after this prompt.",
        prompt: `Features are frozen. Run a hardening pass on the deployed app.

DEMO SCRIPT: [PASTE THE CLICK-BY-CLICK SCRIPT]
PRESENTING ON: [PROJECTOR / LAPTOP / PHONE]

Walk the exact demo path and fix only what breaks it:
1. Every click works on the deployed URL in a fresh browser with no cache and no login.
2. A loading state anywhere something takes over 300ms, so it never looks frozen.
3. No console errors, no placeholder text, no debug output on screen.
4. It looks right at the resolution we present on.
5. It survives a bad network: [WHAT SHOULD HAPPEN WHEN AN API CALL FAILS].

List what you fixed, and anything still broken that I need to route around live.`,
      },
      {
        id: "readme",
        title: "README a judge will actually skim",
        when: "Once the app is frozen and deployed.",
        prompt: `Write the README for [PROJECT NAME], for a judge who will spend 40 seconds on it.

WHAT IT DOES: [ONE PARAGRAPH]. WHO IT IS FOR: [USER]. THE PROBLEM: [PROBLEM].
STACK: [STACK]. LIVE URL: [URL]. DEMO VIDEO: [URL].
SPONSOR TECH USED: [LIST], and how each is actually used.

Structure:
- One-line description, then the live link and video link at the very top.
- A screenshot placeholder right after, with the filename to drop in.
- "What it does" in 3 bullets for a non-technical reader.
- "How it works": short architecture description plus the one interesting technical decision.
- "Run it locally": exact commands and required env vars.
- "What is next" in 3 bullets.

No badge walls, no emoji spam, no filler.`,
      },
      {
        id: "submission-audit",
        title: "Audit the submission before the deadline",
        when: "Two hours out. Run it even if you think you are done.",
        prompt: `We submit to [PLATFORM] in [HOURS] hours. Audit us against the rules.

RULES AND REQUIRED FIELDS: [PASTE]
WHAT WE HAVE: repo [URL], live app [URL], video [URL OR "not recorded"], README [DONE OR NOT].

1. List every required field and artifact, marked done, missing, or at risk.
2. Flag anything that disqualifies us: private repo, video too long, wrong track, missing team member, late submission.
3. Give me the order to finish the missing pieces in, given the time left.
4. Draft the submission copy: tagline, elevator pitch, what it does, how we built it, challenges, what we learned, what is next. Use: [PROJECT DETAILS].

Submission-blocking items first.`,
        note: "Submit a rough draft early. You can edit until the deadline and you cannot submit after it.",
      },
    ],
  },
  {
    slug: "pitch",
    label: "Pitch",
    title: "Pitch and Demo",
    timing: "Last 2 hours",
    subtitle:
      "Write the script, record the video in one take, and drill the questions judges are going to ask you anyway.",
    icon: Mic,
    accent: "spark",
    prompts: [
      {
        id: "pitch-script",
        title: "The pitch script",
        when: "You know what you built and have not decided what to say about it.",
        prompt: `Write our pitch script for [LENGTH] minutes, judged on [PASTE JUDGING CRITERIA].

PROJECT: [NAME]
PROBLEM: [WHO HURTS, AND HOW]
WHAT WE BUILT: [ONE PARAGRAPH]
THE HARD PART: [THE TECHNICAL THING WE ARE PROUD OF]
DEMO SCRIPT: [PASTE THE CLICK-BY-CLICK SCRIPT]

Structure:
- First 15 seconds: the hook. A concrete moment or a real number, never "in today's world".
- 20 seconds: the problem, told through one person's version of it.
- 60 seconds: demo narration tied to the click script.
- 15 seconds: how it works, naming [SPONSOR TECH] where we genuinely used it.
- 10 seconds: what is next, then the ask.

Spoken language, short sentences, no jargon. Mark the pauses. Give me the word count and how long it takes to read at a calm pace.`,
        note: "Read it out loud once. Any sentence you stumble on is written wrong, not read wrong.",
      },
      {
        id: "video-shot-list",
        title: "Demo video shot list",
        when: "You have to record and the deadline is close.",
        prompt: `Turn our demo into a [LENGTH] video I can record in one take.

APP: [URL]
DEMO SCRIPT: [PASTE]
TOOLS: [SCREEN RECORDER, MIC]

Give me:
1. A shot list as a table: timestamp, what is on screen, what I say.
2. The exact setup before recording: tabs, window size, zoom level, seeded data, notifications off.
3. The opening sentence, written to be said in under 5 seconds.
4. Three things that ruin hackathon demo videos, and what to do instead.

Assume no editing beyond trimming the ends.`,
      },
      {
        id: "judge-qa",
        title: "Judge Q&A drill",
        when: "Twenty minutes before you present, with the team in the room.",
        prompt: `You are a hackathon judge. Our project: [ONE PARAGRAPH], built in [HOURS] hours on [STACK].

1. Ask the 8 questions you would actually ask, hardest first, including the uncomfortable ones: what is real versus mocked, why this is not just a wrapper, what breaks at scale.
2. For each, give me a two-sentence answer I can say out loud, honest about what [HOURS] hours buys.
3. Tell me the one question that exposes our weakest point, and how to answer it without lying or getting defensive.

Then quiz me one question at a time and score my answers.`,
        note: "The honest answer to \"what is mocked?\" wins more rooms than the impressive one.",
      },
    ],
  },
  {
    slug: "panic",
    label: "Panic",
    title: "Panic Buttons",
    timing: "When it is going wrong",
    subtitle:
      "Prompts for the last few hours, when the right move is triage, not engineering.",
    icon: Siren,
    accent: "primary",
    prompts: [
      {
        id: "triage",
        title: "Three hours left and it does not work",
        when: "The build is behind and someone needs to make a call.",
        prompt: `Triage. [HOURS] hours left, submission at [TIME].

WORKS: [WHAT WORKS]
BROKEN: [WHAT DOES NOT]
NOT STARTED: [WHAT IS MISSING]
DEMO SCRIPT: [PASTE]

1. Tell me the smallest demo we can still deliver using what already works.
2. List what to cut, in order, and what to say about it if judges ask.
3. Give me the one thing to fix first, chosen by demo impact per minute of work.
4. Reserve the last [45] minutes for video and submission, and tell me the hard stop time for coding.

One plan. No options. I will follow it.`,
        note: "A small demo that works beats an ambitious one that does not. Every judge has seen the second kind.",
      },
      {
        id: "api-died",
        title: "The API we depend on just died",
        when: "Rate limited, out of credits, or the service is down and your demo needs it.",
        prompt: `[SERVICE] is down, rate-limited, or out of credits, and our demo depends on it.

WHAT IT DOES FOR US: [ONE SENTENCE]
TIME LEFT: [HOURS]

1. Give me a drop-in replacement we can wire in under 30 minutes, with the code.
2. If there is none, add a cached-response fallback: record one real successful response now, serve it when the live call fails, and show a visible "cached response" label so we are not claiming something false.
3. Make the failure path invisible to the audience and obvious to us.

Implement option 1 if it exists, otherwise option 2.`,
      },
      {
        id: "git-mess",
        title: "The repo is a mess and we are out of time",
        when: "Branches diverged, a merge went wrong, or someone force pushed.",
        prompt: `Our branches have diverged and we are out of time.

WHAT I RAN: [COMMANDS]
WHAT GIT SAYS: [PASTE THE FULL OUTPUT]
BRANCHES: [LIST]
THE VERSION THAT DEMOS CORRECTLY IS: [BRANCH OR COMMIT]

1. Tell me in plain English what state the repo is in.
2. Give me a safe path to one branch containing the demo-critical work, step by step, with exact commands.
3. Back everything up first: create a backup branch before any destructive command and tell me its name.
4. If any work has to be dropped, tell me exactly what and ask me before doing it.

Never force push to [MAIN BRANCH].`,
      },
      {
        id: "minutes-out",
        title: "Twenty minutes to demo, something broke",
        when: "You are in line to present.",
        prompt: `[MINUTES] minutes until we present and [WHAT BROKE] just broke.

1. Do not refactor. Give me the ugliest fix that makes the demo path work right now.
2. If it cannot be fixed in [MINUTES] minutes, give me the exact words to route around it live: what I click instead, and what I say.
3. Give me the fallback order: live app, then local, then the recorded video, then screenshots.

Under 100 words.`,
        note: "Have the video downloaded on your laptop before you present. Venue wifi fails at every hackathon.",
      },
    ],
  },
];

export const CHEAT_PROMPT_COUNT = CHEAT_SECTIONS.reduce(
  (total, section) => total + section.prompts.length,
  0,
);

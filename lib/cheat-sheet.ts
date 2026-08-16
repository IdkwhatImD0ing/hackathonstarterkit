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
import {
  DEVPOST_AGENT_PROMPT,
  README_AGENT_PROMPT,
  SKILLS_INSTALL_PROMPT,
  SYSTEM_PROMPT_SETUP_COMMAND,
  YOUTUBE_AGENT_PROMPT,
  skillInstallCommand,
} from "./prompts";

/**
 * The during-the-hackathon cheat sheet: paste-ready prompts, grouped by the
 * moment in the event when you need them.
 *
 * This is the operational twin of the playbook. The playbook teaches; this
 * file assumes you already know and just need the words to hand your agent.
 * Three rules hold for every prompt here:
 *
 * 1. Self-collecting. No fill-in-the-blank placeholders. Each prompt opens by
 *    interviewing the reader for what it needs, and tells the agent to skip
 *    anything it already knows from earlier in the chat.
 * 2. Prerequisite-aware. A prompt that assumes an artifact (PRD.md, a demo
 *    script, a deployed URL) tells the agent to check for it and send the
 *    reader back to the prompt that produces it. Model that in `needs` too,
 *    so the card can link there.
 * 3. Skill-first. Where a skill in `skills/` already does the job, the prompt
 *    installs and runs it rather than reinventing the instructions. Prompts
 *    shared with a knowledge page are imported from `lib/prompts/`.
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
  /** Ids of prompts that produce what this one assumes already exists. */
  needs?: string[];
  /** The page on this site that explains the thinking behind it. */
  source?: { label: string; href: string };
}

export interface CheatSection {
  /** Anchor id, also the tab target. */
  slug: string;
  /** Short label for the tab bar. */
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
      "Give your agent the context, the skills, and the docs every later prompt leans on, read the rules before anyone codes, and get an empty app deployed.",
    icon: Terminal,
    accent: "volt",
    prompts: [
      {
        id: "pin-context",
        title: "Pin the hackathon context",
        when: "Paste this first, once per chat session. It interviews you, and every prompt after it reuses the answers.",
        prompt: `You are my build partner for this hackathon. Before we start, interview me.

Ask me these in one message, numbered, then wait for my answers:
1. Which hackathon is this, and exactly when does submission close?
2. How many people are on the team, and what can each of them do?
3. Which prizes or tracks are we going after, and what are the judging criteria? Tell me I can paste them raw.
4. What stack do we already know well?
5. Is the demo live, a recorded video, or a booth?

Once I answer, remember all of it and apply it to every reply for the rest of this hackathon, under these rules:
1. Optimize for a working demo at the deadline, not for clean code.
2. Never add a library, language, or service outside our stack unless I ask.
3. When I report a bug, ask for the exact error text before guessing.
4. Keep answers under 200 words unless I ask for code.
5. If something will take longer than the time we have left, say so and offer the smaller version instead.

Then reply with a one-paragraph summary of our situation and the single biggest risk you see.`,
        note: "Re-paste it after any context reset. An agent that forgets your deadline will happily suggest a two-day refactor.",
      },
      {
        id: "install-skills",
        title: "Install the hackathon skills",
        when: "Once per machine. Several prompts here run a skill, and this is what puts them on your laptop.",
        prompt: SKILLS_INSTALL_PROMPT,
        note: "Installs every skill in one go: scaffolding, feature building, bug fixing, demo prep, README and Devpost writing.",
        source: { label: "Skills & Commands", href: "/non-coders/skills" },
      },
      {
        id: "system-prompt",
        title: "Set the rules your agent follows all weekend",
        when: "Right after the repo exists, before the first feature.",
        prompt: SYSTEM_PROMPT_SETUP_COMMAND,
        note: "CLAUDE.md is read by Claude Code, AGENTS.md by Cursor and Codex. Setting both means one set of rules for the whole team.",
        source: { label: "The System Prompt", href: "/non-coders/system-prompt" },
      },
      {
        id: "rules-brief",
        title: "Turn the rules into a one-page brief",
        when: "Before you pick an idea. Do this while everyone is still doing icebreakers.",
        prompt: `Turn this hackathon's rules into a one-page brief I can act on.

First, ask me for the official rules, the judging criteria, and the full prize list. Tell me I can paste the rules page, the Devpost description, and the prize table raw, and that you will read them. Wait until you have all three. If you do not already know our team size and how many hours are left, ask for those too.

Then extract, in this order:
1. Hard requirements that disqualify us if we miss them (deadlines, public repo, video length, team size, "must start from scratch" rules).
2. Every prize with its criteria, ranked by how winnable it looks for our team in the time we have, with one line on why.
3. What each judging criterion actually rewards, and what a demo that scores well on it looks like.
4. Anything ambiguous I should ask an organizer about today.

Short bullets. No preamble.`,
        note: "Sponsor prizes are the least contested money in the room. Most teams never read past the grand prize.",
        source: { label: "Validation", href: "/playbook/validation" },
      },
      {
        id: "docs-folder",
        title: "Set up a docs folder your agent actually reads",
        when: "Right after the rules file exists, and before anyone writes code against an API.",
        needs: ["system-prompt"],
        prompt: `Set up a docs folder for this project and wire it into our rules file, so you read real documentation instead of guessing at it.

Ask me first, in one message:
1. Which APIs, SDKs, or sponsor tools are we using, and what are their docs URLs?
2. Do we have the hackathon rules and judging criteria somewhere I can paste?
3. Is there already a CLAUDE.md or AGENTS.md in the repo root? If there is no rules file at all, tell me to run the "Set the rules your agent follows" prompt first.

Then:
1. Create a docs/ folder in the repo root.
2. For each API or tool I named, fetch its quickstart and API reference and save a trimmed copy as docs/<tool>.md. Keep the endpoints, parameters, auth, and code samples; drop the marketing. Put the source URL and the date you fetched it at the top of each file.
3. Save the hackathon rules, judging criteria, and prize list as docs/hackathon.md.
4. Add a "Docs" section at the TOP of CLAUDE.md listing every file in docs/ with a one-line note on when to read it, plus this rule, in these words: "Read the matching file in docs/ before writing code against that API. Never use an endpoint, parameter, or model name that does not appear in these files."
5. Make sure AGENTS.md points at CLAUDE.md, so every tool on the team loads the same rules.

Show me the docs/ file list and the new CLAUDE.md section when you are done.`,
        note: "This is the cheapest fix for hallucinated API calls: local docs the agent must read beat a docs link it might skim.",
        source: { label: "Using APIs", href: "/non-coders/apis" },
      },
      {
        id: "deploy-skeleton",
        title: "Deploy an empty app before you build anything",
        when: "Right after the team agrees on a stack, before the first feature exists.",
        prompt: `Before we build any features, get an empty app deployed and live.

Ask me first, in one message:
1. What is the project called?
2. What stack are we using?
3. Do we have a repo already, or should you create one?
4. Where are we deploying, and am I logged into that CLI yet?

Then:
1. Scaffold the smallest app that renders one page reading "<project name> is live".
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
        prompt: `Give me project ideas aimed at prizes we can actually win.

First ask me, in one numbered list, whatever you do not already know from this chat:
1. Which prizes and tracks are on the table? I can paste the list.
2. How many hours until submission, and how many people are building?
3. What stack and APIs do we already know?
4. Anything we have already ruled out?

Then give me 10 ideas. For each: the one-line pitch, the one demo moment judges will remember, the riskiest technical part, and which prize it targets.

Hard constraints: demoable live in 3 minutes, buildable in the time we have, nothing that needs real users, a trained model, or data we do not have.

Then rank all 10 and tell me which one you would build and why.`,
        source: { label: "Ideation", href: "/playbook/ideation" },
      },
      {
        id: "kill-the-idea",
        title: "Try to kill the idea",
        when: "Everyone loves an idea and nobody has said the scary part out loud yet.",
        prompt: `Play skeptical judge and senior engineer, and try to kill our idea.

Ask me for the idea in a paragraph, plus anything you still do not know: hours left, team size and skills, and the judging criteria. Wait for my answers.

Then answer bluntly:
1. What is the hardest technical piece, and what does the demo look like if it does not work?
2. What has to be true for this to be finished on time, and which of those is unlikely?
3. Which judging criterion does this score worst on?
4. Has this been built at 50 other hackathons? If yes, what one change would make ours different?
5. Verdict: build it, shrink it, or drop it. If shrink it, give me the smaller version.

Do not soften any of it. I would rather hear this now than from a judge.`,
        note: "An idea that survives this at hour 2 is one you are not abandoning at hour 18.",
        source: { label: "Validation", href: "/playbook/validation" },
      },
      {
        id: "demo-path",
        title: "Cut the idea down to the demo path",
        when: "The idea is locked and someone is about to start building the wrong thing.",
        prompt: `Turn our idea into the exact demo we will perform for judges, then cut everything else.

Ask me first: the idea, how long our demo slot is, and how many hours we have left to build.

Then:
1. Write the demo as a numbered, click-by-click script: what I show, in order, and what happens on screen at each step.
2. List only the features required for those clicks to work. That list is our entire scope.
3. List everything else we could have built under a heading "NOT BUILDING".
4. Estimate build time per in-scope feature for someone working with an AI agent, and flag anything over 2 hours.

If the script cannot be built in the time we have, cut steps until it can and tell me exactly what you cut.

Keep this script in the conversation. Later prompts will ask you for it.`,
        note: "Scope is not what you plan to build. It is the shortest path through the demo, and nothing else.",
        source: { label: "Execution", href: "/playbook/execution" },
      },
    ],
  },
  {
    slug: "plan-the-build",
    label: "Plan",
    title: "Plan the Build",
    timing: "Before the first feature",
    subtitle:
      "Write the spec every scaffold prompt reads, put the schedule on a clock, and split files so nobody overwrites anybody.",
    icon: Rocket,
    accent: "primary",
    prompts: [
      {
        id: "write-the-spec",
        title: "Write the spec (AGENTS.md and PRD.md)",
        when: "Before any feature code. The scaffold prompts refuse to run without these two files.",
        needs: ["demo-path"],
        prompt: `Install the Domain to Spec skill and run it:

${skillInstallCommand("domain-to-spec")}

Use the domain-to-spec skill to write AGENTS.md and PRD.md to the repo root for this project.

Interview me first, all questions in one message rather than one at a time, because we are on the clock: what we are building, who it is for, the demo we are going to perform, our stack, and how many hours are left. If we have not agreed on a click-by-click demo script yet, say so and tell me to run the "Cut the idea down to the demo path" prompt before this one.

Keep the PRD to one page: the problem, the demo path, the in-scope feature list, the data models, external APIs and env vars, and an explicit "out of scope" section. Do not skip the out-of-scope section, it is the part that stops us building the wrong thing at hour 14.

Show me both files and wait for my approval before writing any feature code.`,
        note: "Point CLAUDE.md at AGENTS.md so every tool on the team loads the same rules.",
        source: { label: "Domain to Spec skill", href: "/non-coders/skills/domain-to-spec" },
      },
      {
        id: "hour-by-hour",
        title: "Put the build on a clock",
        when: "The plan exists in everyone's head and nowhere else.",
        needs: ["demo-path"],
        prompt: `Put the rest of this hackathon on a clock.

Ask me for whatever you do not already know: the current time, the submission deadline, who is on the team and what each person can do, our in-scope feature list, and whether anyone plans to sleep. If we have not cut the scope to a demo path yet, tell me to do that first, because a schedule over an uncut scope is fiction.

Then give me an hour-by-hour plan as a table: time block, owner, task, what done means.

Rules for the plan:
- A deployed, working app at every checkpoint. No big-bang integration at the end.
- Reserve the last 3 hours for the demo video, README, and submission. Nothing new gets built in that window.
- Include a feature freeze time, and a cut-scope decision point at the halfway mark.
- Every block has exactly one owner.
- Include food and sleep.`,
        source: { label: "Execution", href: "/playbook/execution" },
      },
      {
        id: "split-the-work",
        title: "Split the work so nobody collides",
        when: "Two or more people are about to open the same files.",
        needs: ["write-the-spec"],
        prompt: `Split our scope so nobody overwrites anybody.

Read PRD.md in the repo root first. If it is not there, stop and tell me to run the "Write the spec" prompt before this one, then wait. Ask me who is on the team and what each person can do if you do not already know.

Then give me:
1. A file and folder ownership map, one owner per area.
2. The interfaces between areas (API routes, shared types, component props), written out now so both sides can build before either exists.
3. A branch and merge rule simple enough to follow at 4am.
4. The three most likely merge conflicts and how we avoid them.

Then write the shared types file first so everyone can start.`,
        source: { label: "Team Formation", href: "/playbook/team-formation" },
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
        title: "Scaffold the project from the spec",
        when: "Spec approved, deploy pipeline live, nothing built yet.",
        needs: ["write-the-spec"],
        prompt: `Install the Quickstart skill and run it:

${skillInstallCommand("quickstart")}

Use the quickstart skill to scaffold this project.

Before anything else, check that AGENTS.md and PRD.md exist in the repo root. If either is missing, stop and tell me to run the "Write the spec" prompt from the cheat sheet first: the scaffold skills refuse to run without them, and I would rather fix that now than half way through.

Then chain the steps, pausing for my confirmation between each: domain-to-spec (skip it if the two files are already good), scaffold-frontend, and scaffold-backend. Skip the backend entirely if PRD.md says we do not need one.

When it finishes, deploy and give me the live URL. Placeholder screens that navigate correctly are fine. Half-finished screens are not.`,
        note: "Clickable placeholders mean you always have something to show, even if the last feature never lands.",
        source: { label: "Quickstart skill", href: "/non-coders/skills/quickstart" },
      },
      {
        id: "v0-prompt",
        title: "Get a frontend that does not look like a template",
        when: "The judges will see this on a projector and your UI is the generic AI default.",
        needs: ["write-the-spec"],
        prompt: `Install the v0 Prompt Crafter skill and run it:

${skillInstallCommand("v0-prompt-crafter")}

Use the v0-prompt-crafter skill to turn our spec into a Vercel v0 prompt for the frontend.

Read PRD.md in the repo root first. If it is not there, ask me for a one-paragraph description of the product and who it is for, or tell me to run the "Write the spec" prompt if I would rather do this properly.

Commit to one bold aesthetic instead of a safe default, and tell me in one line what look you picked and why it fits this hackathon's judges. Output the final prompt as a single copyable block.`,
        source: { label: "v0 Prompt Crafter skill", href: "/non-coders/skills/v0-prompt-crafter" },
      },
      {
        id: "one-feature",
        title: "Build one feature end to end",
        when: "The workhorse prompt. Use it once per feature, all day.",
        needs: ["scaffold"],
        prompt: `Install the Feature Builder skill and run it:

${skillInstallCommand("feature-builder")}

Use the feature-builder skill to build one feature end to end, and touch nothing else.

Ask me which feature, and what has to be true for it to count as done: the exact behavior I should be able to click through. If my answer is vague, push back until it is specific and observable.

Then give me your plan and the files you will touch, and wait for my OK before writing code. Implement the loading state, the empty state, and the error state, not just the happy path. When it works, show me the click path that proves it, commit with a clear message, and deploy.

If you hit a decision I have not made, stop and ask instead of guessing.`,
        source: { label: "Feature Builder skill", href: "/non-coders/skills/feature-builder" },
      },
      {
        id: "new-api",
        title: "Wire an API you have never used",
        when: "Adding a sponsor API, or anything the agent might invent parameters for.",
        prompt: `Add a new service to the project without hallucinating any of it.

Ask me first: which service, what I need it to do in one sentence, where the docs are (I can paste a URL or the quickstart snippet), and where my API key lives.

Then:
1. Read the docs I give you. Use only endpoints and parameters that appear there. If something I asked for is not in the docs, tell me instead of inventing it.
2. Write the smallest possible call as a standalone script, run it, and show me the real response.
3. Only once that response is real, wire it into the app.
4. Store the key in an environment variable, never in the code.
5. Handle failure with a visible message. A failed call must never crash the demo.`,
        note: "Sponsor booths hand out raised rate limits and free credits to anyone who walks over and asks.",
        source: { label: "Using APIs", href: "/non-coders/apis" },
      },
      {
        id: "seed-demo-data",
        title: "Seed data that makes the demo sing",
        when: "Your app works but demos on an empty database or a 40-second cold call.",
        needs: ["demo-path"],
        prompt: `Give our demo data that looks real and loads instantly.

Ask me: what the app does, the steps judges will actually see, and which feature we most want to show off. If we have not written the click-by-click demo script, ask me to walk you through it now and write it down as you go.

Then:
1. Create a seed file with realistic records covering exactly those steps, including one edge case that shows off the feature I named.
2. Add a one-command reset that restores this exact state, so I can run the demo twice in a row.
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
        prompt: `Install the Bugfix Doctor skill and run it:

${skillInstallCommand("bugfix-doctor")}

Use the bugfix-doctor skill on this bug.

Ask me first for exactly what I did, what I expected, what happened, and the full error text with the stack trace. Do not start guessing before you have the verbatim error. If I paraphrase it, ask again for the real thing.

Then work the loop and do not skip steps:
1. Restate the failure in one sentence.
2. Give me your top 3 hypotheses, ranked, each with the one-line check that proves or kills it.
3. Run the cheapest check first, or tell me to run it.
4. Fix only the confirmed cause, with the smallest possible change.
5. Show me how to verify the fix, then commit.

No refactors. No "while we are here" changes.`,
        note: "Paste the whole stack trace. Summarizing the error is how people spend an hour on a typo.",
        source: { label: "Bugfix Doctor skill", href: "/non-coders/skills/bugfix-doctor" },
      },
      {
        id: "works-locally",
        title: "Works locally, breaks in production",
        when: "The deployed URL behaves differently from your machine.",
        needs: ["deploy-skeleton"],
        prompt: `It works on my machine and fails when deployed. Find out why.

Ask me for the deployed URL, what happens there versus locally, and the build or runtime log from the host. Wait for the log before theorizing. If we have never deployed successfully, say so and tell me to run the "Deploy an empty app" prompt first, because we are debugging two problems at once otherwise.

Then check these in order and report what you find at each: environment variables missing on the host, build-time versus run-time code, case-sensitive file paths, node version, packages missing from the lockfile, API keys restricted to localhost, CORS, and anything writing to the local filesystem.

Then fix the confirmed cause, redeploy, and give me the working URL.`,
      },
      {
        id: "back-to-working",
        title: "Get back to the last working state",
        when: "Something that worked an hour ago is broken and nobody knows what changed.",
        prompt: `Something that used to work is broken and I do not know what changed.

Ask me roughly when it last worked and what the broken behavior is now. Then inspect the repo yourself instead of asking me to describe the commits.

Then:
1. Show me the commits since then, one line each.
2. Tell me which are most likely responsible and why.
3. Give me the exact commands to get back to the last working state on a new branch, without losing today's work.
4. Once we are working again, reapply the changes one at a time and test after each.

Do not force push. Do not delete branches. Ask before anything destructive.`,
        note: "Commit every 30 minutes. This prompt is only as good as your last commit.",
      },
      {
        id: "stuck-30",
        title: "Stuck for 30 minutes",
        when: "You have burned half an hour on one problem and the clock is still running.",
        prompt: `I am stuck and the clock is running.

Ask me what I am stuck on and how many hours we have left. Then give me exactly three things:
1. The fastest workaround that keeps the demo intact, even if it is ugly.
2. What we lose by taking it, in one line.
3. What the demo looks like if we cut this feature entirely.

Then recommend one of the three in two sentences. Nobody is reading our source code, so optimize for what judges will see.`,
      },
    ],
  },
  {
    slug: "ship",
    label: "Ship",
    title: "Ship It",
    timing: "Last 3 hours",
    subtitle:
      "Feature freeze, harden the exact demo path, then produce the README, the Devpost, and the YouTube copy before anyone is allowed to touch code again.",
    icon: AlarmClock,
    accent: "success",
    prompts: [
      {
        id: "harden",
        title: "Pre-demo hardening pass",
        when: "Feature freeze. Nothing new gets built after this prompt.",
        needs: ["demo-path", "deploy-skeleton"],
        prompt: `Features are frozen. Harden the demo path.

Ask me for the click-by-click demo script and what we are presenting on: projector, laptop, or phone. If we never wrote a script, ask me to walk you through the demo in order and write it down as you go. If the app is not deployed yet, deploy it first and tell me the URL, because we are not demoing from localhost.

Then walk that exact path on the deployed app, and fix only what breaks it:
1. Every click works on the deployed URL in a fresh browser with no cache and no login.
2. A loading state anywhere something takes over 300ms, so it never looks frozen.
3. No console errors, no placeholder text, no debug output on screen.
4. It looks right at the resolution we present on.
5. It survives a failed API call without crashing.

List what you fixed, and anything still broken that I need to route around live.`,
      },
      {
        id: "ship-everything",
        title: "Produce the README, Devpost, and YouTube copy in one pass",
        when: "You have all three to write and under two hours. Start here instead of running the next three prompts separately.",
        needs: ["harden"],
        prompt: `Install the Ship It skill and run it:

${skillInstallCommand("ship-it")}

Use the ship-it skill to produce our submission deliverables, but only three of the four: the GitHub README, the Devpost submission, and the YouTube title, description, and chapters. Skip the portfolio site, we are still at the hackathon and it is not due today.

Interview me ONCE for everything all three need: the demo video and its beats, the live URL and Devpost link, the hackathon and any awards, the event details, the team with their GitHub and LinkedIn, and the challenges we hit and what is next. Read the repo first so you only ask for what you cannot find there.

Then generate the three so they tell one consistent story: the same tagline, the same stats, the same award list. Pause after each so I can redirect.

If we have not recorded the demo video yet, say so and write the README and Devpost first, then come back for the YouTube copy once I give you the video.

Do not invent awards, stats, timestamps, or challenges.`,
        note: "Running the three separately means answering the same questions three times, and the answers drift.",
        source: { label: "Post-Hackathon", href: "/playbook/post-hackathon" },
      },
      {
        id: "readme",
        title: "README a judge will actually skim",
        when: "Once the app is frozen and deployed, if you would rather run one deliverable at a time.",
        prompt: README_AGENT_PROMPT,
        note: "It reads the repo first and only asks for what it cannot find, so answer the questions and let it write.",
        source: { label: "Submission", href: "/playbook/submission" },
      },
      {
        id: "devpost",
        title: "Write the Devpost submission",
        when: "After the README, while someone else records the video.",
        prompt: DEVPOST_AGENT_PROMPT,
        source: { label: "Submission", href: "/playbook/submission" },
      },
      {
        id: "youtube",
        title: "Write the YouTube title, description, and chapters",
        when: "The demo video is recorded and about to be uploaded.",
        needs: ["video-shot-list"],
        prompt: YOUTUBE_AGENT_PROMPT,
        note: "Judges and recruiters find the video through search long after the event. The first two lines of the description do that work.",
        source: { label: "Post-Hackathon", href: "/playbook/post-hackathon" },
      },
      {
        id: "submission-audit",
        title: "Audit the submission before the deadline",
        when: "Two hours out. Run it even if you think you are done.",
        prompt: `Audit our submission before the deadline.

Ask me: which platform we submit on, how long we have left, and what we have so far (repo, live app, video, README). Ask me to paste the required fields and rules if you do not already have them from earlier in this chat.

Then:
1. List every required field and artifact, marked done, missing, or at risk.
2. Flag anything that disqualifies us: private repo, video too long, wrong track, missing team member, late submission.
3. Give me the order to finish the missing pieces in, given the time left.
4. Draft the submission copy: tagline, elevator pitch, what it does, how we built it, challenges, what we learned, what is next. Ask me for anything you need to write that honestly.

Submission-blocking items first.`,
        note: "Submit a rough draft early. You can edit until the deadline and you cannot submit after it.",
        source: { label: "Submission", href: "/playbook/submission" },
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
        id: "demo-script",
        title: "The timed demo script and backup plan",
        when: "You know what you built and have not decided how to show it.",
        needs: ["demo-path"],
        prompt: `Install the Demo Prep skill and run it:

${skillInstallCommand("demo-prep")}

Use the demo-prep skill to write our demo script.

Ask me for the app and what it does, how long our slot is, what is deployed versus mocked, and the order of clicks I plan to show. Read the repo to fill in anything you can find yourself. If we never agreed on a click path, build one with me now rather than assuming.

Give me the timed script, the exact click path, the backup plan for when the live app fails, and a rehearsal checklist. Mark the one moment judges should be impressed by, so I know what not to rush past.`,
        source: { label: "Demo Prep skill", href: "/non-coders/skills/demo-prep" },
      },
      {
        id: "pitch-script",
        title: "The pitch script",
        when: "You have the demo and need the words around it.",
        needs: ["demo-path"],
        prompt: `Write our pitch script.

Ask me for whatever you do not already know: how long the pitch is, the judging criteria, what we built, who the problem hurts and how, the technical part we are proud of, and the demo click order.

Then write it in this shape:
- First 15 seconds: the hook. A concrete moment or a real number, never "in today's world".
- 20 seconds: the problem, told through one person's version of it.
- 60 seconds: demo narration tied to the click order I gave you.
- 15 seconds: how it works, naming sponsor tech only where we genuinely used it.
- 10 seconds: what is next, then the ask.

Spoken language, short sentences, no jargon. Mark the pauses. Give me the word count and how long it takes to read at a calm pace, and rescale the sections if it does not fit our slot.`,
        note: "Read it out loud once. Any sentence you stumble on is written wrong, not read wrong.",
        source: { label: "Pitching", href: "/playbook/pitching" },
      },
      {
        id: "video-shot-list",
        title: "Demo video shot list",
        when: "You have to record and the deadline is close.",
        needs: ["demo-path"],
        prompt: `Turn our demo into a video I can record in one take.

Ask me: how long the video is allowed to be, the app URL, the demo steps in order, and what I am recording with.

Then give me:
1. A shot list as a table: timestamp, what is on screen, what I say.
2. The exact setup before recording: tabs, window size, zoom level, seeded data, notifications off.
3. The opening sentence, written to be said in under 5 seconds.
4. Three things that ruin hackathon demo videos, and what to do instead.

Assume no editing beyond trimming the ends.`,
        source: { label: "Submission", href: "/playbook/submission" },
      },
      {
        id: "judge-qa",
        title: "Judge Q&A drill",
        when: "Twenty minutes before you present, with the team in the room.",
        prompt: `You are a hackathon judge. Drill me.

Ask me first: what we built, how long we had, our stack, and which parts are real versus mocked. Push me for an honest answer on that last one.

Then:
1. Ask the 8 questions you would actually ask, hardest first, including the uncomfortable ones: what is mocked, why this is not just a wrapper, what breaks at scale.
2. For each, give me a two-sentence answer I can say out loud, honest about what our hours bought.
3. Tell me the one question that exposes our weakest point, and how to answer it without lying or getting defensive.

Then quiz me one question at a time and score my answers.`,
        note: "The honest answer to \"what is mocked?\" wins more rooms than the impressive one.",
        source: { label: "Pitching", href: "/playbook/pitching" },
      },
    ],
  },
  {
    slug: "panic",
    label: "Panic",
    title: "Panic Buttons",
    timing: "When it is going wrong",
    subtitle:
      "Prompts for the last few hours, when the right move is triage rather than engineering. They all converge on one rule: you walk into judging with something on screen, even if every pixel of it is hardcoded.",
    icon: Siren,
    accent: "primary",
    prompts: [
      {
        id: "triage",
        title: "Three hours left and it does not work",
        when: "The build is behind and someone needs to make a call.",
        prompt: `Triage what is left. I need a decision, not options.

Ask me in one message: how long until submission, what currently works, what is broken, what has not been started, and what the demo is supposed to show.

Then:
1. Tell me the smallest demo we can still deliver using what already works.
2. List what to cut, in order, and what to say about it if judges ask.
3. Give me the one thing to fix first, chosen by demo impact per minute of work. For anything broken that cannot be fixed in the time we have, say "hardcode it" instead: a demo step that shows canned output beats a demo step that does not exist.
4. Reserve the last 45 minutes for the video and submission, and tell me the hard stop time for coding.

One plan. No alternatives. I will follow it.`,
        note: "A small demo that works beats an ambitious one that does not. Every judge has seen the second kind.",
      },
      {
        id: "hardcode-the-demo",
        title: "Hardcode whatever it takes to have a demo",
        when: "The real thing will not be ready and the pitch slot is not moving. The nuclear option, and it beats having nothing.",
        prompt: `We are out of time and the real thing will not work. Hardcode whatever it takes so the demo still happens.

Ask me first: the click-by-click demo script, what already works for real, what is broken or missing, and how many minutes we have. If we never wrote a demo script, have me walk you through the clicks right now and write it down as you go.

Then work backward from the demo script and nothing else:
1. Every step that works for real stays real. Real beats fake wherever real exists.
2. Every step that does not work gets hardcoded: canned API responses, precomputed results, fixed state transitions, a scripted happy path. It has to look real on screen for the exact inputs in the script, and it must never crash.
3. Make the seams invisible to the audience: realistic data, realistic timing, no placeholder text, no debug output.
4. When you are done, give me a two-column list, REAL versus HARDCODED, step by step, so the presenter knows exactly what they can click live and where they must not deviate from the script.
5. Walk the full script with me once and confirm every step renders.

The worst outcome tonight is standing in front of judges with nothing on screen. A hardcoded demo we can show beats a real one we cannot.`,
        note: "Know your seams and stick to the script. If a judge asks what is real, answer honestly; a hardcoded demo you own up to is a prototype.",
      },
      {
        id: "api-died",
        title: "The API we depend on just died",
        when: "Rate limited, out of credits, or the service is down and your demo needs it.",
        prompt: `A service our demo depends on is down, rate-limited, or out of credits.

Ask me which service it is, what it does for us in one sentence, and how long we have left.

Then:
1. Give me a drop-in replacement we can wire in under 30 minutes, with the code.
2. If there is none, hardcode it: record one real successful response now if the service still answers at all, otherwise write the response by hand, and serve that when the live call fails. The demo must flow either way.
3. Make the failure path invisible to the audience and obvious to us, and tell me exactly which steps of the demo are now canned so the presenter knows.

Do option 1 if it exists, otherwise option 2. Do not make me choose, just tell me which you did.`,
      },
      {
        id: "git-mess",
        title: "The repo is a mess and we are out of time",
        when: "Branches diverged, a merge went wrong, or someone force pushed.",
        prompt: `Our repo is a mess and we are out of time.

Ask me what I ran, the full output git gave me, which branches exist, and which version demos correctly. Then inspect the repo yourself.

Then:
1. Tell me in plain English what state the repo is in.
2. Give me a safe path to one branch containing the demo-critical work, step by step, with the exact commands.
3. Back everything up first: create a backup branch before any destructive command and tell me its name.
4. If any work has to be dropped, tell me exactly what and ask me before doing it.

Never force push to our main branch.`,
      },
      {
        id: "minutes-out",
        title: "Twenty minutes to demo, something broke",
        when: "You are in line to present.",
        prompt: `We present in minutes and something just broke.

Ask me only two things: how many minutes I have, and what broke. Then answer in under 100 words.

1. Do not refactor. Give me the ugliest fix that makes the demo path work right now, hardcoding the broken step's output if that is fastest.
2. If even that will not land in time, give me the exact words to route around it live: what I click instead, and what I say.
3. Give me the fallback order: live app, then local, then the recorded video, then screenshots. We show one of these no matter what.`,
        note: "Have the video downloaded on your laptop before you present. Venue wifi fails at every hackathon.",
      },
    ],
  },
];

export const CHEAT_PROMPT_COUNT = CHEAT_SECTIONS.reduce(
  (total, section) => total + section.prompts.length,
  0,
);

/** Where a prompt id sits, for rendering "run this first" links. */
export function findPrompt(id: string):
  | { section: CheatSection; sectionIndex: number; prompt: CheatPrompt; promptIndex: number }
  | undefined {
  for (const [sectionIndex, section] of CHEAT_SECTIONS.entries()) {
    const promptIndex = section.prompts.findIndex((p) => p.id === id);
    if (promptIndex !== -1) {
      return {
        section,
        sectionIndex,
        prompt: section.prompts[promptIndex],
        promptIndex,
      };
    }
  }
  return undefined;
}

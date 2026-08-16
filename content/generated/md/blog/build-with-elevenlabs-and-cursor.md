# How to Build with ElevenLabs and Cursor at a Hackathon

> Build a voice AI hackathon project with ElevenLabs and Cursor in an afternoon. The exact PRD-first, MCP-driven, test-driven workflow Bill uses to ship and win.

Canonical: https://thehackathonplaybook.dev/blog/build-with-elevenlabs-and-cursor
Last updated: 2026-06-24

---

## Make Your Demo Talk Back

Judges remember the project that talks. Walk an expo floor and you pass two hundred dashboards and chatbots. The one that answers out loud in a real human voice makes judges stop and lean in. That is the whole trick, and **ElevenLabs plus Cursor gets you there in an afternoon**.

Below is the exact loop I run: write a spec, wire the agent to a live tool, then let it build and test itself while I babysit the spend. The counterintuitive part comes in the middle, where I make the agent write the test **before** the feature.

| Flash Latency | Languages | Free Chars/mo | Free for MLH |
| --- | --- | --- | --- |
| ~75ms | 70+ | 10K | 3 mo |

> **What Judges Remember:** A demo sticks when it responds in real time, uses more than one modality, and sounds like a person. ElevenLabs is the shortest path to all three, whatever your stack.

## Step 0: Write the PRD Before Cursor Opens a File

AI agents write the code. They do not guess what you want. Before Cursor touches a file, write what you are building, who it is for, and what done looks like. Save it as **PRD.md** and **AGENTS.md** at the repo root so every prompt reads the same source of truth.

1. **Run the domain-to-spec skill** It interviews you about your profession and goal, then writes AGENTS.md and PRD.md to the repo root.
2. **List routes and components** Under PRD.md > Frontend Pages and Backend Routes, name every screen and endpoint the agent should scaffold.
3. **Define done** Add an Acceptance Criteria section listing the exact behaviors a working demo must have. This becomes your test plan below.

> **Do Not Skip This:** Skip the PRD and the agent reinvents your data model every other prompt, hallucinates features you never asked for, and burns your API credits chasing its own tail. Twenty minutes on PRD.md saves four hours of debugging.

## Let the Agent Type the Code

Nobody on a winning 2026 team types CRUD endpoints by hand. Cursor types them. Your job is the part the agent cannot do: pick the problem, define the interface, decide if the output is good, and pitch it on stage.

Time is the one thing you do not have at a hackathon. **A team that hands implementation to an agent and spends the saved hours on UX, polish, and the pitch beats a team typing every line by hand.** Every time.

## Step 1: Check for an MCP First

An **MCP (Model Context Protocol) server** hands your agent a menu of typed, callable tools for a service. Instead of pasting docs and hoping, the agent sees real actions like 'generate speech' or 'clone a voice' and gets back structured data it can reason about.

ElevenLabs ships an official one at github.com/elevenlabs/elevenlabs-mcp. Drop this config into Cursor and your agent gets direct text-to-speech, voice cloning, sound effects, transcription, and the ElevenAgents platform.

`~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ElevenLabs": {
      "command": "uvx",
      "args": ["elevenlabs-mcp"],
      "env": {
        "ELEVENLABS_API_KEY": "<your-api-key-here>"
      }
    }
  }
}
```

## Step 2: No MCP? Paste the Docs URL

Some tools have no MCP server yet. The fallback: give Cursor a direct link to the official docs in the prompt. It fetches the page and uses the live API surface instead of the stale version the model remembers from training.

Here is the shape of a prompt I use to build a streaming text-to-speech endpoint with no MCP. Note the **file anchor, behavior spec, constraints, and a 'Done when' section**, so Cursor stops when the conditions are met instead of wandering off.

`cursor-prompt.md`:

```markdown
Read https://elevenlabs.io/docs/overview/intro and PRD.md > Backend Routes.

Create app/api/speak/route.ts in Next.js 15 (App Router, TypeScript).

Behavior:
- POST handler, accepts { text: string } JSON body
- Calls ElevenLabs text-to-speech with model_id "eleven_flash_v2_5"
- Voice ID and API key come from process.env (already in .env.local)
- Returns audio as a streaming audio/mpeg response

Constraints:
- Use the official @elevenlabs/elevenlabs-js SDK (install if needed)
- No retries, no caching, no logging
- Do not touch any other route or component

Done when:
- curl -X POST localhost:3000/api/speak -d '{"text":"hello"}' returns audio bytes
- The response Content-Type is audio/mpeg
- npm run build passes with no new TS errors
```

> **Tip:** Always paste the docs URL inside the prompt. Cursor reads the linked page in real time, far more accurate than asking the model to recall an API from memory.

## Step 3: Key In, Then Build and Test

Drop your API key into **.env.local** at the project root. The MCP server and your app code both read this file, so you never think about it again.

`.env.local`:

```bash
ELEVENLABS_API_KEY=sk_your_key_here
ELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb
ELEVENLABS_MODEL_ID=eleven_flash_v2_5
```

Now hand the agent a clean task: read the PRD, build the next unfinished feature, run the test, stop only when it passes. A good agent reads the docs, scaffolds the files, installs dependencies, hits the live API, and verifies the response. You watch the loop and step in when it goes sideways.

**Do:**

- Reference PRD.md and AGENTS.md in every prompt
- Tell the agent which test must pass to finish
- Specify the model (eleven_flash_v2_5 for real-time)
- Ask for one feature per prompt

**Don't:**

- 'Just build the voice feature' (too vague)
- Letting the agent pick the model on its own
- Multiple unrelated features in one prompt
- Skipping the test step to save time

## The Trick: Make the Agent Test First

Here is the highest-leverage move I have found: **flip the order**. Make the agent write the test first, then build the feature that satisfies it. Classic test-driven development (en.wikipedia.org/wiki/Test-driven_development) pointed at a coding partner that happens to be an LLM.

1. **Red** Have the agent read PRD.md > Acceptance Criteria and generate a failing test for the next feature. Run it. Confirm it fails for the right reason.
2. **Green** Have the agent write the minimum code that makes the test pass. Run it. Iterate until green.
3. **Refactor** Have the agent clean up that code without breaking the test. Run it once more to be sure.

> Write new code only if you first have a failing automated test.
>
> Kent Beck, creator of Extreme Programming, Test-Driven Development: By Example (Addison-Wesley, 2002)

> **Why It Wins:** Tests turn 'looks fine' into 'provably works.' Given a hard pass/fail signal, the agent stops hallucinating and starts converging. You also get a free regression suite, priceless when you swap voices or models five minutes before demo.

## Babysit the Spend, Then Ship

An agent in a tight loop racks up real money fast. Your Cursor subscription and your ElevenLabs credits are both on the line if you walk away from a misbehaving agent at hour 18. So do not walk away.

> **Watch the Loop:** Keep the agent chat visible. Watch for runaway retries, infinite tool calls, and the agent re-generating the same audio twenty times. One bad prompt can burn a week of free tier in twenty minutes.

**Pre-Flight Before the Agent Loop**

- [ ] PRD.md and AGENTS.md saved at the repo root
- [ ] ElevenLabs MCP installed (or docs URL ready to paste)
- [ ] API key in .env.local, not committed to git
- [ ] Acceptance criteria written for the next feature
- [ ] ElevenLabs usage dashboard open in a tab
- [ ] Cursor agent chat visible at all times

Get this loop running once and the voice feature stops being the scary part of your build. It becomes the thirty seconds on stage that judges actually remember.

[Non-Coders Winning Hackathons](https://thehackathonplaybook.dev/blog/non-coders-winning-hackathons): How professionals with zero coding experience are beating dev teams using AI agents like Cursor.

[Best Tech Stack for Hackathons in 2026](https://thehackathonplaybook.dev/blog/best-tech-stack-for-hackathons): The full stack winning teams use, from frontend to deployment to AI APIs.

# How to Build with ElevenLabs and Cursor at a Hackathon

> My loop for a voice AI hackathon project: write the PRD first, connect ElevenLabs to Cursor through MCP, then have the agent write each test before the feature.

Canonical: https://thehackathonplaybook.dev/blog/build-with-elevenlabs-and-cursor
Last updated: 2026-09-14

---

## Make Your Demo Talk Back

This is the loop I run to add a voice to a hackathon project. ElevenLabs generates the speech, and Cursor's agent writes the code around it. I write a spec, connect the agent to ElevenLabs, then let it build and test one feature at a time while I babysit the spend.

| Flash Latency | Languages | Free Chars/mo | Free for MLH |
| --- | --- | --- | --- |
| ~75ms | 70+ | 10K | 3 mo |

## Step 0: Write the PRD Before Cursor Opens a File

The agent writes the code, but it can't guess what you want. Before Cursor touches a file, write down what you're building, who it's for, and what done looks like. Save it as **PRD.md** and **AGENTS.md** at the repo root so every prompt reads from the same source.

1. **Run the domain-to-spec skill** It interviews you about your profession and goal, then writes AGENTS.md and PRD.md to the repo root.
2. **List routes and components** Under PRD.md > Frontend Pages and Backend Routes, name every screen and endpoint the agent should scaffold.
3. **Define done** Add an Acceptance Criteria section listing the exact behaviors a working demo must have. It becomes your test plan.

Skip the PRD and the agent keeps reinventing your data model and adding features you never asked for, burning API credits on every wrong guess. With it, the agent can type the CRUD endpoints while you decide what the interface looks like and whether the output is any good. Spend the hours you save on UX polish and the pitch.

## Step 1: Check for an MCP First

An **MCP (Model Context Protocol) server** gives your agent a menu of typed tools for a service. Instead of reading pasted docs, the agent sees real actions like 'generate speech' or 'clone a voice' and gets structured data back.

ElevenLabs ships an official one at github.com/elevenlabs/elevenlabs-mcp. Add this to Cursor's MCP config and the agent can call text-to-speech, voice cloning, sound effects, transcription, and the ElevenAgents platform directly.

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

Some tools don't have an MCP server yet. For those, put a link to the official docs inside the prompt. Cursor fetches the page and works from the live API instead of the stale version the model remembers from training.

Here's the shape of a prompt I use to build a streaming text-to-speech endpoint without the MCP. The **'Done when' section** tells Cursor when to stop, so it doesn't wander off.

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

## Step 3: Key In, Then Build and Test

Put your API key in **.env.local** at the project root, and keep that file out of git. Your app code reads the key from there. The MCP server gets its copy from the env block in mcp.json above.

`.env.local`:

```bash
ELEVENLABS_API_KEY=sk_your_key_here
ELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb
ELEVENLABS_MODEL_ID=eleven_flash_v2_5
```

Now hand the agent one clean task: read the PRD, build the next unfinished feature, run the test, and stop only when it passes. You watch the loop and step in when it goes sideways.

**Do:**

- Reference PRD.md and AGENTS.md
- Ask for one feature per prompt
- Name the model (eleven_flash_v2_5 for real-time)
- Say which test has to pass

**Don't:**

- 'Just build the voice feature' (no model, no test)
- Skipping the test to save time

## Make the Agent Write the Test First

The most useful habit I've found: the agent writes the **test first**, then builds the feature that makes it pass. That's test-driven development (en.wikipedia.org/wiki/Test-driven_development) with an LLM writing the code.

1. **Red** Have the agent read PRD.md > Acceptance Criteria and generate a failing test for the next feature. Run it. Confirm it fails for the right reason.
2. **Green** Have the agent write the minimum code that makes the test pass. Run it. Iterate until green.
3. **Refactor** Have the agent clean up that code without breaking the test. Run it once more to be sure.

> Write new code only if you first have a failing automated test.
>
> Kent Beck, creator of Extreme Programming, Test-Driven Development: By Example (Addison-Wesley, 2002)

A test gives the agent a hard pass/fail signal, so it converges instead of guessing. You also end up with a regression suite, which matters when you swap voices or models five minutes before the demo.

## Babysit the Spend, Then Ship

An agent in a tight loop spends real money on your Cursor subscription and your ElevenLabs credits. Runaway retries, endless tool calls, or the same audio regenerated over and over can burn through a free tier, so don't walk away from it at hour 18.

**Pre-Flight Before the Agent Loop**

- [ ] PRD.md and AGENTS.md saved at the repo root
- [ ] ElevenLabs MCP installed (or docs URL ready to paste)
- [ ] API key in .env.local, not committed to git
- [ ] Acceptance criteria written for the next feature
- [ ] ElevenLabs usage dashboard open in a tab
- [ ] Cursor agent chat visible at all times

When you pitch it, don't spend your slot explaining the tools. When I judged LA Hacks, a couple of teams spent around 30 seconds explaining what OpenAI Agents or ElevenLabs Agents are. If the judge has used them, that time is gone, so ask whether they're familiar with ElevenLabs before you explain it.

[Non-Coders Winning Hackathons](https://thehackathonplaybook.dev/blog/non-coders-winning-hackathons): How a lawyer won Anthropic's hackathon without writing code, and what domain experts bring.

[Best Tech Stack for Hackathons in 2026](https://thehackathonplaybook.dev/blog/best-tech-stack-for-hackathons): The default stack I reach for, from frontend to deployment to AI APIs.

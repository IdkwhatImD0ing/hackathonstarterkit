import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "build-with-elevenlabs-and-cursor",
  title: "How to Build with ElevenLabs and Cursor at a Hackathon",
  description:
    "Build a voice AI hackathon project with ElevenLabs and Cursor in an afternoon. The exact PRD-first, MCP-driven, test-driven workflow Bill uses to ship and win.",
  date: "2026-04-21",
  updatedDate: "2026-06-24",
  readingTime: "5 min read",
  keywords: [
    "build with elevenlabs cursor",
    "elevenlabs hackathon",
    "elevenlabs mcp",
    "cursor ai workflow",
    "voice ai hackathon",
    "test driven development ai",
  ],
  content: [
    {
      heading: "Make Your Demo Talk Back",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Judges remember the project that talks. Walk an expo floor and you pass two hundred dashboards and chatbots. The one that answers out loud in a real human voice makes judges stop and lean in. That is the whole trick, and **ElevenLabs plus Cursor gets you there in an afternoon**." },
        { type: "paragraph", text: "Below is the exact loop I run: write a spec, wire the agent to a live tool, then let it build and test itself while I babysit the spend. The counterintuitive part comes in the middle, where I make the agent write the test **before** the feature." },
        { type: "stat-row", stats: [
          { value: "~75ms", label: "Flash Latency" },
          { value: "70+", label: "Languages" },
          { value: "10K", label: "Free Chars/mo" },
          { value: "3 mo", label: "Free for MLH" },
        ]},
        { type: "callout", variant: "info", title: "What Judges Remember", text: "A demo sticks when it responds in real time, uses more than one modality, and sounds like a person. ElevenLabs is the shortest path to all three, whatever your stack." },
      ],
    },
    {
      heading: "Step 0: Write the PRD Before Cursor Opens a File",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "AI agents write the code. They do not guess what you want. Before Cursor touches a file, write what you are building, who it is for, and what done looks like. Save it as **PRD.md** and **AGENTS.md** at the repo root so every prompt reads the same source of truth." },
        { type: "step-list", steps: [
          { title: "Run the domain-to-spec skill", description: "It interviews you about your profession and goal, then writes AGENTS.md and PRD.md to the repo root." },
          { title: "List routes and components", description: "Under PRD.md > Frontend Pages and Backend Routes, name every screen and endpoint the agent should scaffold." },
          { title: "Define done", description: "Add an Acceptance Criteria section listing the exact behaviors a working demo must have. This becomes your test plan below." },
        ]},
        { type: "callout", variant: "warning", title: "Do Not Skip This", text: "Skip the PRD and the agent reinvents your data model every other prompt, hallucinates features you never asked for, and burns your API credits chasing its own tail. Twenty minutes on PRD.md saves four hours of debugging." },
      ],
    },
    {
      heading: "Let the Agent Type the Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Nobody on a winning 2026 team types CRUD endpoints by hand. Cursor types them. Your job is the part the agent cannot do: pick the problem, define the interface, decide if the output is good, and pitch it on stage." },
        { type: "paragraph", text: "Time is the one thing you do not have at a hackathon. **A team that hands implementation to an agent and spends the saved hours on UX, polish, and the pitch beats a team typing every line by hand.** Every time." },
      ],
    },
    {
      heading: "Step 1: Check for an MCP First",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "An **MCP (Model Context Protocol) server** hands your agent a menu of typed, callable tools for a service. Instead of pasting docs and hoping, the agent sees real actions like 'generate speech' or 'clone a voice' and gets back structured data it can reason about." },
        { type: "paragraph", text: "ElevenLabs ships an official one at github.com/elevenlabs/elevenlabs-mcp. Drop this config into Cursor and your agent gets direct text-to-speech, voice cloning, sound effects, transcription, and the ElevenAgents platform." },
        { type: "code-snippet", language: "json", filename: "~/.cursor/mcp.json", code: "{\n  \"mcpServers\": {\n    \"ElevenLabs\": {\n      \"command\": \"uvx\",\n      \"args\": [\"elevenlabs-mcp\"],\n      \"env\": {\n        \"ELEVENLABS_API_KEY\": \"<your-api-key-here>\"\n      }\n    }\n  }\n}" },
      ],
    },
    {
      heading: "Step 2: No MCP? Paste the Docs URL",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Some tools have no MCP server yet. The fallback: give Cursor a direct link to the official docs in the prompt. It fetches the page and uses the live API surface instead of the stale version the model remembers from training." },
        { type: "paragraph", text: "Here is the shape of a prompt I use to build a streaming text-to-speech endpoint with no MCP. Note the **file anchor, behavior spec, constraints, and a 'Done when' section**, so Cursor stops when the conditions are met instead of wandering off." },
        { type: "code-snippet", language: "markdown", filename: "cursor-prompt.md", code: "Read https://elevenlabs.io/docs/overview/intro and PRD.md > Backend Routes.\n\nCreate app/api/speak/route.ts in Next.js 15 (App Router, TypeScript).\n\nBehavior:\n- POST handler, accepts { text: string } JSON body\n- Calls ElevenLabs text-to-speech with model_id \"eleven_flash_v2_5\"\n- Voice ID and API key come from process.env (already in .env.local)\n- Returns audio as a streaming audio/mpeg response\n\nConstraints:\n- Use the official @elevenlabs/elevenlabs-js SDK (install if needed)\n- No retries, no caching, no logging\n- Do not touch any other route or component\n\nDone when:\n- curl -X POST localhost:3000/api/speak -d '{\"text\":\"hello\"}' returns audio bytes\n- The response Content-Type is audio/mpeg\n- npm run build passes with no new TS errors" },
        { type: "callout", variant: "tip", text: "Always paste the docs URL inside the prompt. Cursor reads the linked page in real time, far more accurate than asking the model to recall an API from memory." },
      ],
    },
    {
      heading: "Step 3: Key In, Then Build and Test",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Drop your API key into **.env.local** at the project root. The MCP server and your app code both read this file, so you never think about it again." },
        { type: "code-snippet", language: "bash", filename: ".env.local", code: "ELEVENLABS_API_KEY=sk_your_key_here\nELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb\nELEVENLABS_MODEL_ID=eleven_flash_v2_5" },
        { type: "paragraph", text: "Now hand the agent a clean task: read the PRD, build the next unfinished feature, run the test, stop only when it passes. A good agent reads the docs, scaffolds the files, installs dependencies, hits the live API, and verifies the response. You watch the loop and step in when it goes sideways." },
        { type: "pro-con", pros: [
          "Reference PRD.md and AGENTS.md in every prompt",
          "Tell the agent which test must pass to finish",
          "Specify the model (eleven_flash_v2_5 for real-time)",
          "Ask for one feature per prompt",
        ], cons: [
          "'Just build the voice feature' (too vague)",
          "Letting the agent pick the model on its own",
          "Multiple unrelated features in one prompt",
          "Skipping the test step to save time",
        ]},
      ],
    },
    {
      heading: "The Trick: Make the Agent Test First",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Here is the highest-leverage move I have found: **flip the order**. Make the agent write the test first, then build the feature that satisfies it. Classic test-driven development (en.wikipedia.org/wiki/Test-driven_development) pointed at a coding partner that happens to be an LLM." },
        { type: "step-list", steps: [
          { title: "Red", description: "Have the agent read PRD.md > Acceptance Criteria and generate a failing test for the next feature. Run it. Confirm it fails for the right reason." },
          { title: "Green", description: "Have the agent write the minimum code that makes the test pass. Run it. Iterate until green." },
          { title: "Refactor", description: "Have the agent clean up that code without breaking the test. Run it once more to be sure." },
        ]},
        { type: "quote", text: "Never write a new piece of functionality without a failing test.", attribution: "Kent Beck, Test-Driven Development: By Example, 2002" },
        { type: "callout", variant: "success", title: "Why It Wins", text: "Tests turn 'looks fine' into 'provably works.' Given a hard pass/fail signal, the agent stops hallucinating and starts converging. You also get a free regression suite, priceless when you swap voices or models five minutes before demo." },
      ],
    },
    {
      heading: "Babysit the Spend, Then Ship",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "An agent in a tight loop racks up real money fast. Your Cursor subscription and your ElevenLabs credits are both on the line if you walk away from a misbehaving agent at hour 18. So do not walk away." },
        { type: "callout", variant: "warning", title: "Watch the Loop", text: "Keep the agent chat visible. Watch for runaway retries, infinite tool calls, and the agent re-generating the same audio twenty times. One bad prompt can burn a week of free tier in twenty minutes." },
        { type: "checklist", title: "Pre-Flight Before the Agent Loop", items: [
          "PRD.md and AGENTS.md saved at the repo root",
          "ElevenLabs MCP installed (or docs URL ready to paste)",
          "API key in .env.local, not committed to git",
          "Acceptance criteria written for the next feature",
          "ElevenLabs usage dashboard open in a tab",
          "Cursor agent chat visible at all times",
        ]},
        { type: "paragraph", text: "Get this loop running once and the voice feature stops being the scary part of your build. It becomes the thirty seconds on stage that judges actually remember." },
        { type: "cta-button",
          tag: "ElevenLabs",
          title: "Get the Voice AI Stack the Pros Use",
          description: "Free tier covers a hackathon. Paid plans unlock voice cloning, agents, and longer audio.",
          label: "Try ElevenLabs Free",
          href: "https://try.elevenlabs.io/thehackathonplaybook",
          sponsored: true,
        },
        { type: "link-card", title: "Non-Coders Winning Hackathons", description: "How professionals with zero coding experience are beating dev teams using AI agents like Cursor.", href: "/blog/non-coders-winning-hackathons", tag: "Related Read" },
        { type: "link-card", title: "Best Tech Stack for Hackathons in 2026", description: "The full stack winning teams use, from frontend to deployment to AI APIs.", href: "/blog/best-tech-stack-for-hackathons", tag: "Stack Guide" },
      ],
    },
  ],
};

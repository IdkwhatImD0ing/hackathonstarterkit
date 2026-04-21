import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "build-with-elevenlabs-and-cursor",
  title: "How to Build with ElevenLabs and Cursor at a Hackathon",
  description:
    "Build voice AI hackathon projects with ElevenLabs and Cursor. The exact PRD-first, MCP-driven, test-driven workflow Bill uses to ship in hours.",
  date: "2026-04-21",
  readingTime: "9 min read",
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
      heading: "Why Voice AI Wins Hackathon Demos",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Walk into any hackathon expo and you will see two hundred dashboards and chatbots. The one project that makes judges actually stop and lean in is the one that talks back. Voice is the demo element nobody else thought to add, and the moment your app answers out loud in a real human voice, you stop being another browser tab in the lineup." },
        { type: "callout", variant: "info", title: "What Judges Actually Remember", text: "Three things make a hackathon demo stick: it responds in real time, it does more than one modality, and it sounds like a person. ElevenLabs is the shortest path to all three, no matter what your stack looks like." },
        { type: "stat-row", stats: [
          { value: "~75ms", label: "Flash Latency" },
          { value: "70+", label: "Languages" },
          { value: "10K", label: "Free Chars/mo" },
          { value: "3 mo", label: "Free for MLH" },
        ]},
      ],
    },
    {
      heading: "Step 0: Write the PRD First",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "AI agents will happily write all the code you need. They will not guess what you actually want. Before Cursor opens a single file, write down what you are building, who it is for, and what success looks like. Save it as PRD.md and AGENTS.md at the repo root, so every future prompt has the same source of truth to read." },
        { type: "step-list", steps: [
          { title: "Run the domain-to-spec skill", description: "It interviews you about your profession and goal, then writes AGENTS.md and PRD.md to the repo root." },
          { title: "List the routes and components", description: "Under PRD.md > Frontend Pages and Backend Routes, name every screen and endpoint the agent should scaffold." },
          { title: "Define done", description: "Add an Acceptance Criteria section. List the exact behaviors a working demo must have. This becomes your test plan in the TDD section below." },
        ]},
        { type: "callout", variant: "warning", title: "Do Not Skip This", text: "Skip the PRD and the agent will reinvent your data model on every other prompt, hallucinate features you never asked for, and burn through your API credits chasing its own tail. Twenty minutes writing PRD.md saves four hours of debugging." },
      ],
    },
    {
      heading: "The Modern Hackathon Workflow: Agents Write the Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "In 2026, nobody on a winning hackathon team is typing out CRUD endpoints by hand. Cursor types them. Claude Code types them. The human job is the part the agent cannot do for you: pick the problem, define the interface, decide if the output is good, and pitch the result on stage." },
        { type: "paragraph", text: "This matters most at hackathons because time is the only thing you do not have. A team that hands implementation to an agent and spends those saved hours on UX, demo polish, and the pitch will beat a team that types every line by hand. Every single time." },
      ],
    },
    {
      heading: "Step 1: Check if the Tool Has an MCP",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "An MCP (Model Context Protocol) server is a small program that hands your AI agent a real menu of typed, callable tools for a specific service. Instead of pasting docs and hoping, the agent sees actual actions like 'generate speech', 'clone a voice', or 'transcribe this file', and gets back structured data it can reason about." },
        { type: "paragraph", text: "ElevenLabs ships an official one at github.com/elevenlabs/elevenlabs-mcp. Drop the config below into Cursor and your agent gets direct access to text-to-speech, voice cloning, sound effects, transcription, and the ElevenAgents platform. No copy-pasting docs into prompts required." },
        { type: "code-snippet", language: "json", filename: "~/.cursor/mcp.json", code: "{\n  \"mcpServers\": {\n    \"ElevenLabs\": {\n      \"command\": \"uvx\",\n      \"args\": [\"elevenlabs-mcp\"],\n      \"env\": {\n        \"ELEVENLABS_API_KEY\": \"<your-api-key-here>\"\n      }\n    }\n  }\n}" },
      ],
    },
    {
      heading: "Step 2: No MCP? Paste the Docs",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Some tools do not have an MCP server yet. The fallback is to give Cursor a direct link to the official docs in the prompt itself. Cursor fetches the page, reads it, and uses the live API surface instead of whatever stale version the model remembers from training." },
        { type: "paragraph", text: "Here is the exact shape of a Cursor prompt I would use to build a streaming text-to-speech endpoint when no MCP is available. Notice it has a file anchor, a behavior spec, a constraint list, and a 'Done when' section. Cursor stops when the conditions are met instead of wandering off." },
        { type: "code-snippet", language: "markdown", filename: "cursor-prompt.md", code: "Read https://elevenlabs.io/docs/overview/intro and PRD.md > Backend Routes.\n\nCreate app/api/speak/route.ts in Next.js 15 (App Router, TypeScript).\n\nBehavior:\n- POST handler, accepts { text: string } JSON body\n- Calls ElevenLabs text-to-speech with model_id \"eleven_flash_v2_5\"\n- Voice ID and API key come from process.env (already in .env.local)\n- Returns audio as a streaming audio/mpeg response\n\nConstraints:\n- Use the official @elevenlabs/elevenlabs-js SDK (install if needed)\n- No retries, no caching, no logging\n- Do not touch any other route or component\n\nDone when:\n- curl -X POST localhost:3000/api/speak -d '{\"text\":\"hello\"}' returns audio bytes\n- The response Content-Type is audio/mpeg\n- npm run build passes with no new TS errors" },
        { type: "callout", variant: "tip", text: "Always paste the docs URL inside the prompt. Cursor reads the linked page in real time, which is way more accurate than asking the model to recall an API from memory." },
      ],
    },
    {
      heading: "Step 3: Paste the API Key, Then Let the Agent Build and Test",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Drop your API key into .env.local at the project root. Both the MCP server and your application code read from this same file, so you never have to think about it again." },
        { type: "code-snippet", language: "bash", filename: ".env.local", code: "ELEVENLABS_API_KEY=sk_your_key_here\nELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb\nELEVENLABS_MODEL_ID=eleven_flash_v2_5" },
        { type: "paragraph", text: "Now hand the agent a clean task: read the PRD, build the next unfinished feature, run the test, stop only when the test passes. A good agent will read the docs on its own, scaffold the files, install the dependencies, hit the live API, and verify the response. Your job is to watch the loop and step in when it goes sideways." },
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
      heading: "Test-Driven Development with AI Agents",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The single highest-leverage trick I have found when building with an agent is to flip the order. Make the agent write the test first, then make it build the feature that satisfies the test. It is classic test-driven development (en.wikipedia.org/wiki/Test-driven_development) applied to a coding partner that happens to be an LLM." },
        { type: "step-list", steps: [
          { title: "Red", description: "Ask the agent to read PRD.md > Acceptance Criteria and generate a failing test for the next feature. Run it. Confirm it fails for the right reason." },
          { title: "Green", description: "Ask the agent to write the minimum code that makes that test pass. Run the test. Iterate until it passes." },
          { title: "Refactor", description: "Ask the agent to clean up the code it just wrote without breaking the test. Run the test one more time to be sure." },
        ]},
        { type: "quote", text: "Never write a new piece of functionality without a failing test.", attribution: "Kent Beck, Test-Driven Development: By Example, 2002" },
        { type: "callout", variant: "success", title: "Why This Wins", text: "Tests turn 'looks fine' into 'provably works.' Once the agent has a hard pass/fail signal, it stops hallucinating and starts converging. You also get a regression suite for free, which is priceless when you swap voices or models five minutes before demo." },
      ],
    },
    {
      heading: "Watch Your Spend and Ship It",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "AI agents in a tight loop can rack up real money fast. Both your Cursor subscription and your ElevenLabs credits are on the line if you walk away from a misbehaving agent at hour 18 of a hackathon. Do not." },
        { type: "callout", variant: "warning", title: "Babysit the Loop", text: "Keep the agent chat visible at all times. Watch for runaway retries, infinite tool calls, and the agent re-generating the same audio file twenty times in a row. One bad prompt can burn a week's worth of free tier in twenty minutes." },
        { type: "checklist", title: "Pre-Flight Before You Start the Agent Loop", items: [
          "PRD.md and AGENTS.md saved at the repo root",
          "ElevenLabs MCP installed (or docs URL ready to paste)",
          "API key in .env.local, not committed to git",
          "Acceptance criteria written for the next feature",
          "ElevenLabs usage dashboard open in a tab",
          "Cursor agent chat visible at all times",
        ]},
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

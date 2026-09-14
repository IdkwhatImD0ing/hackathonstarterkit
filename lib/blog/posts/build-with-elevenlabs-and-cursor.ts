import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "build-with-elevenlabs-and-cursor",
  title: "How to Build with ElevenLabs and Cursor at a Hackathon",
  // [CONFIRM: this used to end "to ship and win." No ElevenLabs win is named anywhere on the site (Dispatch AI used Retell and Hume). If one of your wins used ElevenLabs, name it and "win" can come back.]
  description:
    "My loop for a voice AI hackathon project: write the PRD first, connect ElevenLabs to Cursor through MCP, then have the agent write each test before the feature.",
  date: "2026-04-21",
  updatedDate: "2026-09-14",
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
        // [NEEDS SPECIFIC: the opener used to say a voice demo is what gets judges to stop on an expo floor. Nothing on the site backs that, so it's cut. A hackathon where a voice demo got judges to stop (yours, or one you judged at LA Hacks 2026) would bring it back.]
        { type: "paragraph", text: "This is the loop I run to add a voice to a hackathon project. ElevenLabs generates the speech, and Cursor's agent writes the code around it. I write a spec, connect the agent to ElevenLabs, then let it build and test one feature at a time while I babysit the spend." },
        // [CONFIRM: source and current values for these four numbers (Flash latency, language count, free characters per month, the MLH offer). "Free for MLH" doesn't say what's free or who qualifies. Spell it out, or cut that stat.]
        { type: "stat-row", stats: [
          { value: "~75ms", label: "Flash Latency" },
          { value: "70+", label: "Languages" },
          { value: "10K", label: "Free Chars/mo" },
          { value: "3 mo", label: "Free for MLH" },
        ]},
      ],
    },
    {
      heading: "Step 0: Write the PRD Before Cursor Opens a File",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The agent writes the code, but it can't guess what you want. Before Cursor touches a file, write down what you're building, who it's for, and what done looks like. Save it as **PRD.md** and **AGENTS.md** at the repo root so every prompt reads from the same source." },
        { type: "step-list", steps: [
          { title: "Run the domain-to-spec skill", description: "It interviews you about your profession and goal, then writes AGENTS.md and PRD.md to the repo root." },
          { title: "List routes and components", description: "Under PRD.md > Frontend Pages and Backend Routes, name every screen and endpoint the agent should scaffold." },
          { title: "Define done", description: "Add an Acceptance Criteria section listing the exact behaviors a working demo must have. It becomes your test plan." },
        ]},
        { type: "paragraph", text: "Skip the PRD and the agent keeps reinventing your data model and adding features you never asked for, burning API credits on every wrong guess. With it, the agent can type the CRUD endpoints while you decide what the interface looks like and whether the output is any good. Spend the hours you save on UX polish and the pitch." },
      ],
    },
    {
      heading: "Step 1: Check for an MCP First",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "An **MCP (Model Context Protocol) server** gives your agent a menu of typed tools for a service. Instead of reading pasted docs, the agent sees real actions like 'generate speech' or 'clone a voice' and gets structured data back." },
        { type: "paragraph", text: "ElevenLabs ships an official one at github.com/elevenlabs/elevenlabs-mcp. Add this to Cursor's MCP config and the agent can call text-to-speech, voice cloning, sound effects, transcription, and the ElevenAgents platform directly." },
        { type: "code-snippet", language: "json", filename: "~/.cursor/mcp.json", code: "{\n  \"mcpServers\": {\n    \"ElevenLabs\": {\n      \"command\": \"uvx\",\n      \"args\": [\"elevenlabs-mcp\"],\n      \"env\": {\n        \"ELEVENLABS_API_KEY\": \"<your-api-key-here>\"\n      }\n    }\n  }\n}" },
      ],
    },
    {
      heading: "Step 2: No MCP? Paste the Docs URL",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Some tools don't have an MCP server yet. For those, put a link to the official docs inside the prompt. Cursor fetches the page and works from the live API instead of the stale version the model remembers from training." },
        { type: "paragraph", text: "Here's the shape of a prompt I use to build a streaming text-to-speech endpoint without the MCP. The **'Done when' section** tells Cursor when to stop, so it doesn't wander off." },
        // [CONFIRM: this prompt says Next.js 15, but the stack post (best-tech-stack-for-hackathons) says Next.js 16. Which should it be?]
        { type: "code-snippet", language: "markdown", filename: "cursor-prompt.md", code: "Read https://elevenlabs.io/docs/overview/intro and PRD.md > Backend Routes.\n\nCreate app/api/speak/route.ts in Next.js 15 (App Router, TypeScript).\n\nBehavior:\n- POST handler, accepts { text: string } JSON body\n- Calls ElevenLabs text-to-speech with model_id \"eleven_flash_v2_5\"\n- Voice ID and API key come from process.env (already in .env.local)\n- Returns audio as a streaming audio/mpeg response\n\nConstraints:\n- Use the official @elevenlabs/elevenlabs-js SDK (install if needed)\n- No retries, no caching, no logging\n- Do not touch any other route or component\n\nDone when:\n- curl -X POST localhost:3000/api/speak -d '{\"text\":\"hello\"}' returns audio bytes\n- The response Content-Type is audio/mpeg\n- npm run build passes with no new TS errors" },
      ],
    },
    {
      heading: "Step 3: Key In, Then Build and Test",
      paragraphs: [],
      blocks: [
        // [CONFIRM: the post used to say the MCP server also reads .env.local. The mcp.json above passes the key in its own env block, so the text now says that. Correct?]
        { type: "paragraph", text: "Put your API key in **.env.local** at the project root, and keep that file out of git. Your app code reads the key from there. The MCP server gets its copy from the env block in mcp.json above." },
        { type: "code-snippet", language: "bash", filename: ".env.local", code: "ELEVENLABS_API_KEY=sk_your_key_here\nELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb\nELEVENLABS_MODEL_ID=eleven_flash_v2_5" },
        { type: "paragraph", text: "Now hand the agent one clean task: read the PRD, build the next unfinished feature, run the test, and stop only when it passes. You watch the loop and step in when it goes sideways." },
        { type: "pro-con", pros: [
          "Reference PRD.md and AGENTS.md",
          "Ask for one feature per prompt",
          "Name the model (eleven_flash_v2_5 for real-time)",
          "Say which test has to pass",
        ], cons: [
          "'Just build the voice feature' (no model, no test)",
          "Skipping the test to save time",
        ]},
      ],
    },
    {
      heading: "Make the Agent Write the Test First",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The most useful habit I've found: the agent writes the **test first**, then builds the feature that makes it pass. That's test-driven development (en.wikipedia.org/wiki/Test-driven_development) with an LLM writing the code." },
        { type: "step-list", steps: [
          { title: "Red", description: "Have the agent read PRD.md > Acceptance Criteria and generate a failing test for the next feature. Run it. Confirm it fails for the right reason." },
          { title: "Green", description: "Have the agent write the minimum code that makes the test pass. Run it. Iterate until green." },
          { title: "Refactor", description: "Have the agent clean up that code without breaking the test. Run it once more to be sure." },
        ]},
        // [CONFIRM: check this wording against the book. The preface's rule may read "Write new code only if an automated test has failed."]
        { type: "quote", text: "Write new code only if you first have a failing automated test.", attribution: "Kent Beck, creator of Extreme Programming, Test-Driven Development: By Example (Addison-Wesley, 2002)" },
        { type: "paragraph", text: "A test gives the agent a hard pass/fail signal, so it converges instead of guessing. You also end up with a regression suite, which matters when you swap voices or models five minutes before the demo." },
      ],
    },
    {
      heading: "Babysit the Spend, Then Ship",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "An agent in a tight loop spends real money on your Cursor subscription and your ElevenLabs credits. Runaway retries, endless tool calls, or the same audio regenerated over and over can burn through a free tier, so don't walk away from it at hour 18." },
        { type: "checklist", title: "Pre-Flight Before the Agent Loop", items: [
          "PRD.md and AGENTS.md saved at the repo root",
          "ElevenLabs MCP installed (or docs URL ready to paste)",
          "API key in .env.local, not committed to git",
          "Acceptance criteria written for the next feature",
          "ElevenLabs usage dashboard open in a tab",
          "Cursor agent chat visible at all times",
        ]},
        { type: "paragraph", text: "When you pitch it, don't spend your slot explaining the tools. When I judged LA Hacks, a couple of teams spent around 30 seconds explaining what OpenAI Agents or ElevenLabs Agents are. If the judge has used them, that time is gone, so ask whether they're familiar with ElevenLabs before you explain it." },
        { type: "cta-button",
          tag: "ElevenLabs",
          title: "Try ElevenLabs for your voice feature",
          description: "It's what this whole loop runs on. There's a free tier to start, and paid plans unlock voice cloning, agents, and longer audio.",
          label: "Try ElevenLabs Free",
          href: "https://try.elevenlabs.io/thehackathonplaybook",
          sponsored: true,
        },
        { type: "link-card", title: "Non-Coders Winning Hackathons", description: "How a lawyer won Anthropic's hackathon without writing code, and what domain experts bring.", href: "/blog/non-coders-winning-hackathons", tag: "Related Read" },
        { type: "link-card", title: "Best Tech Stack for Hackathons in 2026", description: "The default stack I reach for, from frontend to deployment to AI APIs.", href: "/blog/best-tech-stack-for-hackathons", tag: "Stack Guide" },
      ],
    },
  ],
};

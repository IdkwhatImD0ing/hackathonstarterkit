import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "fine-tune-llms-at-hackathons-cloud-gpu",
  title: "How I Fine-Tune LLMs at Hackathons on Rented Cloud GPUs",
  description:
    "How I fine-tune LLMs at hackathons: rent an A100 or H100 on Vast.ai by the hour, then let an AI agent set up, watch, and debug the machine while you build.",
  date: "2026-10-02",
  updatedDate: "2026-10-02",
  readingTime: "5 min read",
  keywords: [
    "fine-tune llm at a hackathon",
    "cloud gpu for hackathons",
    "rent h100 gpu",
    "vast.ai",
    "ai agent gpu setup",
  ],
  content: [
    {
      heading: "My Laptop Doesn't Train the Model. A Rented H100 Does.",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "I rent the GPU." },
        // [NEEDS SPECIFIC: name a hackathon where you fine-tuned on a rented GPU, and what you trained. Dispatch AI's architecture slide shows a fine-tuned model; if that ran on Vast, say so here.]
        { type: "paragraph", text: "People ask me how I fine-tune LLMs and other big models during a hackathon when their own laptops take all weekend. I don't train on my laptop. I rent an **A100 or H100 by the hour** on Vast.ai, train there, copy the weights back, and shut the machine down." },
        { type: "paragraph", text: "That part isn't new. What changed is who runs the machine. These days an AI agent rents it, sets it up, watches it, and fixes it when it breaks. The best proof I have isn't even a training run. It's a 4K music video an agent rendered on 11 rented GPUs, driven from one terminal on the same PC I game on." },
        { type: "video", src: "https://www.youtube.com/embed/Hu3Gupp-wKc", title: "P(doom) · Tabletop, a Blender music video rendered on rented Vast.ai GPUs", caption: "The finished video. Every scene is a Python script, rendered at 4K 60 fps on rented RTX 5090s. The song, \"I'm Upping My P(doom)\", isn't mine; full credits are in the repo linked below.", credit: "Video by Bill Zhang, built and rendered by Claude." },
        { type: "stat-row", stats: [
          { value: "11", label: "Rented RTX 5090s" },
          { value: "9,400", label: "4K Frames" },
          { value: "~$18", label: "Three Render Runs" },
          { value: "0", label: "Remote Desktops Opened" },
        ]},
        { type: "image", src: "/blog/vast-ai-music-video-frames.jpg", alt: "A grid of nine frames from a stop-motion-style Blender music video: an orange robot, a P(doom) title, a black hole over a toy train, a snow globe, a rocket to the moon, and a city of paperclips.", caption: "Nine of the video's 18 scenes, straight off the rented GPUs at 4K.", credit: "Frames from P(doom) · Tabletop, rendered by Claude on Vast.ai" },
      ],
    },
    {
      heading: "Why a Rented GPU Beats the Other Options",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "I considered my options. **Your laptop** is out: a fine-tune that needs hours on an H100 won't finish on a laptop before judging, and the laptop is busy training instead of running your demo. **Free notebooks** are fine for small experiments, but you don't control which GPU you get or how long the session lasts. **The big clouds** often want a GPU quota increase first, and that approval can take longer than the hackathon." },
        { type: "paragraph", text: "What's left is a marketplace where you rent someone else's idle GPU by the hour. That's Vast.ai. Billing is per second, so a two-hour run costs two hours." },
        // [CONFIRM: prices from vast.ai/pricing/gpu/H100-SXM ($1.33/hr) and vast.ai/pricing/gpu/H100-PCIE ($1.87/hr), 30-day medians, checked 2026-10-02. They move; refresh before promoting the post.]
        { type: "paragraph", text: "When I wrote this, Vast's own pricing pages listed H100s at a **30-day median of about $1.33 to $1.87 an hour**. For comparison, the agent's RTX 5090s ran about $0.55 to $0.75 an hour each." },
        { type: "pro-con", pros: [
          "Pick the exact GPU, region, and disk size",
          "Per-second billing, no long-term commitment",
          "A machine is ready in minutes, no quota request",
          "Everything is scriptable through a REST API",
        ], cons: [
          "Hosts vary: some have broken drivers or slow uploads",
          "It's someone else's machine, so keep sensitive data off it",
          "A forgotten machine keeps billing",
        ]},
        { type: "cta-button",
          tag: "Vast.ai",
          title: "Where I rent my GPUs",
          description: "Vast.ai is my preferred spot for A100s and H100s at hackathons. Load a little credit and check it out.",
          label: "Check it out",
          href: "https://cloud.vast.ai/?ref_id=542913",
          sponsored: true,
        },
      ],
    },
    {
      heading: "The Agent Does the Babysitting Now",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Before agents, renting a GPU meant I babysat it. SSH in, install drivers, start training, then keep checking back to see if it crashed. Now I hand an agent an API key, a budget, and a goal, and go build the frontend." },
        { type: "paragraph", text: "Here's what that looked like on the music video. Claude, running in a terminal on my PC, did every step through Vast's API with plain **curl** and **ssh**, no web console:" },
        { type: "step-list", steps: [
          { title: "Check credit, then rent", description: "It checked the balance before every rental (the rule: spend existing credit only, never top up), then filtered offers to verified RTX 5090s with 0.98+ reliability and a fast upload link." },
          { title: "Turn a bare VM into a work box", description: "One idempotent setup.sh installed libraries, Blender, and the project in about two minutes per machine." },
          { title: "Run jobs detached", description: "Every long job started with setsid nohup, so it survived the SSH session dropping." },
          { title: "Poll the numbers", description: "A status script looped over the machines and printed progress and GPU load for each one." },
          { title: "Collect, verify, destroy", description: "Each machine was destroyed the moment its output was copied off and checked, so idle boxes didn't keep billing." },
        ]},
        { type: "paragraph", text: "The rent call itself is short:" },
        { type: "code-snippet", language: "json", filename: "PUT /asks/<offer id>/", code: "{\"client_id\": \"me\", \"image\": \"vastai/base-image:@vastai-automatic-tag\", \"disk\": 80,\n \"runtype\": \"ssh_direct\", \"env\": \"-e NVIDIA_DRIVER_CAPABILITIES=all\"}" },
        { type: "callout", variant: "info", title: "Rendering needs one extra flag", text: "That **NVIDIA_DRIVER_CAPABILITIES=all** line matters for anything that uses graphics libraries, like Blender. Without it the container never got NVIDIA's EGL and Vulkan libraries, and Blender quietly rendered on the CPU, about 20 times slower." },
        { type: "cta-button",
          tag: "GitHub",
          title: "The full pipeline is open source",
          description: "Every scene script, the puppet rigs, and the tools/cloud scripts the agent used on Vast.ai (setup, parallel builds, collector, remote check renders) are in the repo.",
          label: "See the code",
          href: "https://github.com/IdkwhatImD0ing/pdoom-tabletop",
        },
      ],
    },
    {
      heading: "Every Failure Was a Number That Stopped Moving",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "With no screen to look at, every problem first showed up as a number that didn't move: a GPU at 0%, a frame count stuck, a file growing too slowly. The agent polled those numbers on every machine and caught each problem within minutes." },
        { type: "paragraph", text: "**GPU at 0% with the job running.** That host's driver never gave Blender a GPU context. The agent destroyed it, rented a replacement, and now checks every GPU is busy a minute after starting." },
        { type: "paragraph", text: "**A build that \"succeeded\" with no output.** Blender exits 0 even when its Python script throws. The fix was to grep every log for a traceback and retry." },
        { type: "paragraph", text: "**A file arriving at 0.2 MB/s.** That host's upload link was just slow. Re-rendering its scene on a fast machine took 25 minutes, instead of waiting hours." },
        { type: "paragraph", text: "Here's the surprise. Two render workers per GPU left the GPU half idle, because each 1080p frame needed about 3 seconds of single-threaded CPU work before 1.2 seconds on the GPU. **Running five workers per GPU made the render about three times faster.** Training has the same trap: a GPU stuck well under 100% usually means the CPU side, like data loading, can't keep up." },
        { type: "image", src: "/blog/vast-ai-check-render-strip.jpg", alt: "A strip of 24 consecutive small frames showing a crown dropping onto an orange robot's head, rendered as a quick check.", caption: "A quick check render: consecutive 60 fps frames at reduced size, rendered on a rented review machine and pulled back to the PC.", credit: "Frames from P(doom) · Tabletop, rendered by Claude on Vast.ai" },
        { type: "paragraph", text: "The agent also checked its own work. A QA pass inspected every scene of the first 4K file, then one fix agent per scene repaired its findings, testing each fix with renders on the rented machines instead of my PC." },
        { type: "image", src: "/blog/vast-ai-60fps-stutter-fix.webp", alt: "Side-by-side animation at half speed: on the left the orange robot freezes then jumps between poses, on the right it moves smoothly every frame.", caption: "The first 4K 60 fps render stuttered because the puppets were posed for 24 fps. Left: before. Right: after rebaking the poses for 60 fps.", credit: "Frames from P(doom) · Tabletop, rendered by Claude on Vast.ai" },
        { type: "image", src: "/blog/vast-ai-black-hole-lens-fix.jpg", alt: "Before and after frames of a glowing black hole over a toy train: before, a pale panel shows through the lens; after, the laptop screen behind it stays dark.", caption: "A bug I reported: the black hole's lens showed the laptop's fill light as a pale panel. The fixed render keeps the screen dark behind it.", credit: "Frames from P(doom) · Tabletop, rendered by Claude on Vast.ai" },
      ],
    },
    {
      heading: "Paste This Prompt Into Your Agent",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "For a fine-tune, the job is simpler than a 9,400-frame render: one machine, one training run. Put your Vast API key in an environment variable, add a little credit, and give your agent something like this:" },
        { type: "code-snippet", language: "markdown", filename: "agent-prompt.md", code: "My Vast.ai API key is in VAST_API_KEY. Spend only the credit already on the\naccount. Never add funds.\n\nBefore you start, ask me: which base model to fine-tune, where the dataset\nlives, and what \"done\" looks like (epochs, eval metric, output format).\n\nThen:\n- Check my credit through the Vast REST API.\n- Rent one verified, on-demand H100 (or A100 80GB) with reliability 0.98+.\n- Attach my SSH key to the instance and confirm you can log in.\n- Install what training needs, copy the dataset over, and start training\n  with setsid nohup so it survives a dropped connection.\n- Every few minutes, check GPU utilization, the loss, and the log. If the\n  GPU sits at 0% for a minute, read the log and fix it or replace the box.\n- When training finishes, copy the weights back, verify the files, then\n  DESTROY the instance and tell me the total cost." },
        { type: "checklist", title: "Before You Rent", items: [
          "Credit loaded, and a hard rule in the prompt about not adding more",
          "Your SSH public key added to the Vast account",
          "Dataset uploaded somewhere the machine can download it",
          "A tiny test run first, so a bad config fails in one minute, not one hour",
          "A check that the GPU is actually busy right after training starts",
          "A plan for where the weights go when it's done",
        ]},
        { type: "callout", variant: "warning", title: "Destroy it when you're done", text: "A forgotten machine keeps billing. Make destroying the instance the **last step of the prompt**, and check the Vast console yourself before you go to sleep." },
      ],
    },
    {
      heading: "Spend the Saved Hours on the Demo",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The real win isn't the cheaper GPU. It's that training runs in the background while you build the frontend and practice the pitch, and nobody on the team spends hour 20 watching a loss curve. All three render runs for the music video cost about $18 together. A fine-tune on one H100 for a few hours costs less than that." },
        { type: "link-card", title: "Best Tech Stack for Hackathons in 2026", description: "The default stack I reach for, from frontend to deployment to AI APIs.", href: "/blog/best-tech-stack-for-hackathons", tag: "Stack Guide" },
        { type: "link-card", title: "How to Build with ElevenLabs and Cursor", description: "My agent loop for a voice AI project: PRD first, MCP second, tests before features.", href: "/blog/build-with-elevenlabs-and-cursor", tag: "Related Read" },
      ],
    },
  ],
};

# How I Fine-Tune LLMs at Hackathons on Rented Cloud GPUs

> How I fine-tune LLMs at hackathons: rent an A100 or H100 on Vast.ai by the hour, then let an AI agent set up, watch, and debug the machine while you build.

Canonical: https://thehackathonplaybook.dev/blog/fine-tune-llms-at-hackathons-cloud-gpu
Last updated: 2026-10-02

---

## My Laptop Doesn't Train the Model. A Rented H100 Does.

I rent the GPU.

People ask me how I fine-tune LLMs and other big models during a hackathon when their own laptops take all weekend. I don't train on my laptop. I rent an **A100 or H100 by the hour** on Vast.ai, train there, copy the weights back, and shut the machine down.

That part isn't new. What changed is who runs the machine. These days an AI agent rents it, sets it up, watches it, and fixes it when it breaks. The best proof I have isn't even a training run. It's a 4K music video an agent rendered on 11 rented GPUs, driven from one terminal on the same PC I game on.

| Rented RTX 5090s | 4K Frames | Three Render Runs | Remote Desktops Opened |
| --- | --- | --- | --- |
| 11 | 9,400 | ~$18 | 0 |

![A grid of nine frames from a stop-motion-style Blender music video: an orange robot, a P(doom) title, a black hole over a toy train, a snow globe, a rocket to the moon, and a city of paperclips.](https://thehackathonplaybook.dev/blog/vast-ai-music-video-frames.jpg)

*Nine of the video's 18 scenes, straight off the rented GPUs at 4K.*

## Why a Rented GPU Beats the Other Options

I considered my options. **Your laptop** is out: a fine-tune that needs hours on an H100 won't finish on a laptop before judging, and the laptop is busy training instead of running your demo. **Free notebooks** are fine for small experiments, but you don't control which GPU you get or how long the session lasts. **The big clouds** often want a GPU quota increase first, and that approval can take longer than the hackathon.

What's left is a marketplace where you rent someone else's idle GPU by the hour. That's Vast.ai. Billing is per second, so a two-hour run costs two hours.

When I wrote this, Vast's own pricing pages listed H100s at a **30-day median of about $1.33 to $1.87 an hour**. For comparison, the agent's RTX 5090s ran about $0.55 to $0.75 an hour each.

**Do:**

- Pick the exact GPU, region, and disk size
- Per-second billing, no long-term commitment
- A machine is ready in minutes, no quota request
- Everything is scriptable through a REST API

**Don't:**

- Hosts vary: some have broken drivers or slow uploads
- It's someone else's machine, so keep sensitive data off it
- A forgotten machine keeps billing

## The Agent Does the Babysitting Now

Before agents, renting a GPU meant I babysat it. SSH in, install drivers, start training, then keep checking back to see if it crashed. Now I hand an agent an API key, a budget, and a goal, and go build the frontend.

Here's what that looked like on the music video. Claude, running in a terminal on my PC, did every step through Vast's API with plain **curl** and **ssh**, no web console:

1. **Check credit, then rent** It checked the balance before every rental (the rule: spend existing credit only, never top up), then filtered offers to verified RTX 5090s with 0.98+ reliability and a fast upload link.
2. **Turn a bare VM into a work box** One idempotent setup.sh installed libraries, Blender, and the project in about two minutes per machine.
3. **Run jobs detached** Every long job started with setsid nohup, so it survived the SSH session dropping.
4. **Poll the numbers** A status script looped over the machines and printed progress and GPU load for each one.
5. **Collect, verify, destroy** Each machine was destroyed the moment its output was copied off and checked, so idle boxes didn't keep billing.

The rent call itself is short:

`PUT /asks/<offer id>/`:

```json
{"client_id": "me", "image": "vastai/base-image:@vastai-automatic-tag", "disk": 80,
 "runtype": "ssh_direct", "env": "-e NVIDIA_DRIVER_CAPABILITIES=all"}
```

> **Rendering needs one extra flag:** That **NVIDIA_DRIVER_CAPABILITIES=all** line matters for anything that uses graphics libraries, like Blender. Without it the container never got NVIDIA's EGL and Vulkan libraries, and Blender quietly rendered on the CPU, about 20 times slower.

## Every Failure Was a Number That Stopped Moving

With no screen to look at, every problem first showed up as a number that didn't move: a GPU at 0%, a frame count stuck, a file growing too slowly. The agent polled those numbers on every machine and caught each problem within minutes.

**GPU at 0% with the job running.** That host's driver never gave Blender a GPU context. The agent destroyed it, rented a replacement, and now checks every GPU is busy a minute after starting.

**A build that "succeeded" with no output.** Blender exits 0 even when its Python script throws. The fix was to grep every log for a traceback and retry.

**A file arriving at 0.2 MB/s.** That host's upload link was just slow. Re-rendering its scene on a fast machine took 25 minutes, instead of waiting hours.

Here's the surprise. Two render workers per GPU left the GPU half idle, because each 1080p frame needed about 3 seconds of single-threaded CPU work before 1.2 seconds on the GPU. **Running five workers per GPU made the render about three times faster.** Training has the same trap: a GPU stuck well under 100% usually means the CPU side, like data loading, can't keep up.

![A strip of 24 consecutive small frames showing a crown dropping onto an orange robot's head, rendered as a quick check.](https://thehackathonplaybook.dev/blog/vast-ai-check-render-strip.jpg)

*A quick check render: consecutive 60 fps frames at reduced size, rendered on a rented review machine and pulled back to the PC.*

The agent also checked its own work. A QA pass inspected every scene of the first 4K file, then one fix agent per scene repaired its findings, testing each fix with renders on the rented machines instead of my PC.

![Side-by-side animation at half speed: on the left the orange robot freezes then jumps between poses, on the right it moves smoothly every frame.](https://thehackathonplaybook.dev/blog/vast-ai-60fps-stutter-fix.webp)

*The first 4K 60 fps render stuttered because the puppets were posed for 24 fps. Left: before. Right: after rebaking the poses for 60 fps.*

![Before and after frames of a glowing black hole over a toy train: before, a pale panel shows through the lens; after, the laptop screen behind it stays dark.](https://thehackathonplaybook.dev/blog/vast-ai-black-hole-lens-fix.jpg)

*A bug I reported: the black hole's lens showed the laptop's fill light as a pale panel. The fixed render keeps the screen dark behind it.*

## Paste This Prompt Into Your Agent

For a fine-tune, the job is simpler than a 9,400-frame render: one machine, one training run. Put your Vast API key in an environment variable, add a little credit, and give your agent something like this:

`agent-prompt.md`:

```markdown
My Vast.ai API key is in VAST_API_KEY. Spend only the credit already on the
account. Never add funds.

Before you start, ask me: which base model to fine-tune, where the dataset
lives, and what "done" looks like (epochs, eval metric, output format).

Then:
- Check my credit through the Vast REST API.
- Rent one verified, on-demand H100 (or A100 80GB) with reliability 0.98+.
- Attach my SSH key to the instance and confirm you can log in.
- Install what training needs, copy the dataset over, and start training
  with setsid nohup so it survives a dropped connection.
- Every few minutes, check GPU utilization, the loss, and the log. If the
  GPU sits at 0% for a minute, read the log and fix it or replace the box.
- When training finishes, copy the weights back, verify the files, then
  DESTROY the instance and tell me the total cost.
```

**Before You Rent**

- [ ] Credit loaded, and a hard rule in the prompt about not adding more
- [ ] Your SSH public key added to the Vast account
- [ ] Dataset uploaded somewhere the machine can download it
- [ ] A tiny test run first, so a bad config fails in one minute, not one hour
- [ ] A check that the GPU is actually busy right after training starts
- [ ] A plan for where the weights go when it's done

> **Destroy it when you're done:** A forgotten machine keeps billing. Make destroying the instance the **last step of the prompt**, and check the Vast console yourself before you go to sleep.

## Spend the Saved Hours on the Demo

The real win isn't the cheaper GPU. It's that training runs in the background while you build the frontend and practice the pitch, and nobody on the team spends hour 20 watching a loss curve. All three render runs for the music video cost about $18 together. A fine-tune on one H100 for a few hours costs less than that.

[Best Tech Stack for Hackathons in 2026](https://thehackathonplaybook.dev/blog/best-tech-stack-for-hackathons): The default stack I reach for, from frontend to deployment to AI APIs.

[How to Build with ElevenLabs and Cursor](https://thehackathonplaybook.dev/blog/build-with-elevenlabs-and-cursor): My agent loop for a voice AI project: PRD first, MCP second, tests before features.

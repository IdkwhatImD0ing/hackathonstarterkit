import { SITE_URL } from "./site";

/**
 * Agent prompts that appear on more than one page.
 *
 * The knowledge pages (non-coders, playbook) teach the prompt in context; the
 * cheat sheet hands you the same text mid-hackathon. Both import from here so
 * a fix to a prompt lands everywhere it is offered, rather than drifting into
 * two slightly different versions of the same instruction.
 *
 * Prompts that exist on exactly one page stay in that page file. Move one here
 * only when a second page needs the identical text.
 */

export const SKILLS_REPO = "https://github.com/IdkwhatImD0ing/hackathonstarterkit";

/** The install command for a single skill, e.g. "readme-writer". */
export function skillInstallCommand(slug: string): string {
  return `npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ${slug}`;
}

export const CLAUDE_MD_URL = `${SITE_URL}/system-prompt/non-coder-claude.txt`;
export const AGENTS_MD_URL = `${SITE_URL}/system-prompt/non-coder-agents.txt`;

/** Installs every skill in the repo. Shown on /non-coders/skills. */
export const SKILLS_INSTALL_PROMPT = `Install the non-coder skills from this GitHub repo: ${SKILLS_REPO}

Run this command in the terminal:
npx skills add IdkwhatImD0ing/hackathonstarterkit

Then confirm the installation when prompted. After it finishes, tell me which skills were installed.`;

/** Sets up CLAUDE.md and AGENTS.md. Shown on /non-coders/system-prompt. */
export const SYSTEM_PROMPT_SETUP_COMMAND = `Set up my project's system prompt. I am a non-coder, so handle the whole thing for me.

1. Fetch the rules from these two files (for example: curl ${CLAUDE_MD_URL}):
   - ${CLAUDE_MD_URL}  -> goes in CLAUDE.md
   - ${AGENTS_MD_URL}  -> goes in AGENTS.md

2. Add them to the root of my project WITHOUT throwing away anything I already have:
   - If the file does not exist yet, create it from the fetched text.
   - If the file already exists, do NOT overwrite it. Weave the rules in: merge matching sections, keep everything project-specific I already wrote, and drop only exact duplicates. Show me a clear before/after of what changed.

3. Fill in the "About this project" section of CLAUDE.md yourself. Do a deep dive of my project first: read the README, the main folders, the package/config files, and the key source files. From that, write a short, accurate description of what this project is, who it is for, and the tech it uses. Do not ask me to fill in the blanks, draft it from what you actually find.

4. Show me the finished CLAUDE.md and AGENTS.md right here in the chat, and walk me through the "About this project" section line by line so I can confirm or correct it before we move on.

From now on, follow CLAUDE.md in every chat.`;

/** Installs and runs readme-writer. Shown on /playbook/submission. */
export const README_AGENT_PROMPT = `Install the GitHub Writer skill from ${SKILLS_REPO} by running this in your terminal:

${skillInstallCommand("readme-writer")}

Then use the readme-writer skill to write a winner-grade README for this hackathon project. Read the repo first to detect the stack and structure, then ask me for anything you can't find: the demo video link, the live URL and Devpost, any awards, the event details, and the team members with their GitHub and LinkedIn. Also set the repo's About metadata to match: the description, the website, and the topics/tags, using the gh CLI if it's available. Do not invent awards, stats, or prizes.`;

/** Installs and runs devpost-writer. Shown on /playbook/submission. */
export const DEVPOST_AGENT_PROMPT = `Install the Devpost Writer skill and run it:

${skillInstallCommand("devpost-writer")}

Use the devpost-writer skill to write our Devpost submission for this project. Read the repo first, then ask me for the demo video, the live URL, the hackathon and any awards, and the challenges we hit and what's next. Write the standard Devpost sections (inspiration, what it does, how we built it, challenges, accomplishments, what we learned, what's next), the Built With tags, and the Try it out links. Do not invent awards, stats, or challenges.`;

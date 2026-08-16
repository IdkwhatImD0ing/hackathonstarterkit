import { SKILLS_REPO, skillInstallCommand } from "./skills";

/**
 * Installs and runs readme-writer for the GitHub README.
 *
 * Used on: /playbook/submission, /cheat-sheet (Ship It).
 */
export const README_AGENT_PROMPT = `Install the GitHub Writer skill from ${SKILLS_REPO} by running this in your terminal:

${skillInstallCommand("readme-writer")}

Then use the readme-writer skill to write a winner-grade README for this hackathon project. Read the repo first to detect the stack and structure, then ask me for anything you can't find: the demo video link, the live URL and Devpost, any awards, the event details, and the team members with their GitHub and LinkedIn. Also set the repo's About metadata to match: the description, the website, and the topics/tags, using the gh CLI if it's available. Do not invent awards, stats, or prizes.`;

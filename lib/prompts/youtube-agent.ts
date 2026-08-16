import { skillInstallCommand } from "./skills";

/**
 * Installs and runs youtube-writer for the demo video's listing copy.
 *
 * Used on: /playbook/post-hackathon, /cheat-sheet (Ship It).
 */
export const YOUTUBE_AGENT_PROMPT = `Install the YouTube Writer skill and run it:

${skillInstallCommand("youtube-writer")}

Use the youtube-writer skill to write the title, description, tags, and chapter timestamps for our demo video. Read the repo first, then ask me for the video length and its beats (so the chapters are real), plus the Devpost and GitHub links and any awards. Front-load the hook in the first two lines of the description. Do not invent awards or timestamps.`;

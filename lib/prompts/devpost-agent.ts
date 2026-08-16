import { skillInstallCommand } from "./skills";

/**
 * Installs and runs devpost-writer for the Devpost submission.
 *
 * Used on: /playbook/submission, /cheat-sheet (Ship It).
 */
export const DEVPOST_AGENT_PROMPT = `Install the Devpost Writer skill and run it:

${skillInstallCommand("devpost-writer")}

Use the devpost-writer skill to write our Devpost submission for this project. Read the repo first, then ask me for the demo video, the live URL, the hackathon and any awards, and the challenges we hit and what's next. Write the standard Devpost sections (inspiration, what it does, how we built it, challenges, accomplishments, what we learned, what's next), the Built With tags, and the Try it out links. Do not invent awards, stats, or challenges.`;

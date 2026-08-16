import { SKILLS_REPO } from "./skills";

/**
 * Installs every skill in the repo in one command.
 *
 * Used on: /non-coders/skills, /cheat-sheet (Set Up).
 */
export const SKILLS_INSTALL_PROMPT = `Install the non-coder skills from this GitHub repo: ${SKILLS_REPO}

Run this command in the terminal:
npx skills add IdkwhatImD0ing/hackathonstarterkit

Then confirm the installation when prompted. After it finishes, tell me which skills were installed.`;

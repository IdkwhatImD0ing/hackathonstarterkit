import { SITE_URL } from "../site";

/**
 * Shared building blocks for the prompt files in this folder.
 *
 * Lives beside them rather than in index.ts so a prompt file can import a
 * helper without importing the barrel that re-exports it.
 */

export const SKILLS_REPO = "https://github.com/IdkwhatImD0ing/hackathonstarterkit";

/** The terminal command that installs one skill, e.g. "readme-writer". */
export function skillInstallCommand(slug: string): string {
  return `npx skills add IdkwhatImD0ing/hackathonstarterkit --skill ${slug}`;
}

export const CLAUDE_MD_URL = `${SITE_URL}/system-prompt/non-coder-claude.txt`;
export const AGENTS_MD_URL = `${SITE_URL}/system-prompt/non-coder-agents.txt`;

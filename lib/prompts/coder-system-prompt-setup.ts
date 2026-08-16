import { CODER_AGENTS_MD_URL, CODER_CLAUDE_MD_URL } from "./skills";

/**
 * Fetches the coder CLAUDE.md and AGENTS.md templates (the Karpathy-derived
 * working principles plus this site's honesty rules) and merges them into the
 * user's repo without clobbering what is already there.
 *
 * Used on: /cheat-sheet (Set Up).
 */
export const CODER_SYSTEM_PROMPT_SETUP_COMMAND = `Set up my project's system prompt.

1. Fetch the rules from these two files (for example: curl ${CODER_CLAUDE_MD_URL}):
   - ${CODER_CLAUDE_MD_URL}  -> goes in CLAUDE.md
   - ${CODER_AGENTS_MD_URL}  -> goes in AGENTS.md

2. Add them to the root of my project WITHOUT throwing away anything I already have:
   - If the file does not exist yet, create it from the fetched text.
   - If the file already exists, do NOT overwrite it. Weave the rules in: merge matching sections, keep everything project-specific I already wrote, and drop only exact duplicates. Show me a clear before/after of what changed.

3. Fill in the "About this project" section of CLAUDE.md yourself. Read the README, the main folders, the package/config files, and the key source files first, then write it from what you actually find: what this is, the stack, the run/build/test commands, and any non-obvious conventions. Do not ask me to fill in the blanks.

4. Show me the finished CLAUDE.md and AGENTS.md here in the chat so I can confirm or correct them before we move on.

From now on, follow CLAUDE.md in every chat.`;

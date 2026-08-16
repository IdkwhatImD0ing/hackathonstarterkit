import { AGENTS_MD_URL, CLAUDE_MD_URL } from "./skills";

/**
 * Fetches the CLAUDE.md and AGENTS.md templates and merges them into the
 * user's repo without clobbering what is already there.
 *
 * Used on: /non-coders/system-prompt, /cheat-sheet (Set Up).
 */
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

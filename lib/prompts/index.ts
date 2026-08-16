/**
 * Every agent prompt offered in more than one place on the site, one file per
 * prompt, mirroring how `lib/blog/posts/` holds one file per post.
 *
 * The knowledge pages teach a prompt in context and the cheat sheet hands you
 * the same text mid-hackathon, so a prompt with two homes has none: fix it
 * here and every page that offers it changes together. Each file's doc comment
 * records where it is used; update that line when you add a consumer.
 *
 * A prompt used on exactly one page stays in that page file. Move it here the
 * moment a second page needs the identical text, and import from "@/lib/prompts"
 * rather than reaching into an individual file.
 */

export {
  SKILLS_REPO,
  skillInstallCommand,
  CLAUDE_MD_URL,
  AGENTS_MD_URL,
} from "./skills";

export { SKILLS_INSTALL_PROMPT } from "./skills-install";
export { SYSTEM_PROMPT_SETUP_COMMAND } from "./system-prompt-setup";
export { README_AGENT_PROMPT } from "./readme-agent";
export { DEVPOST_AGENT_PROMPT } from "./devpost-agent";
export { YOUTUBE_AGENT_PROMPT } from "./youtube-agent";

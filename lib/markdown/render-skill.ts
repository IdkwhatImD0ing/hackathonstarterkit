import type { NonCoderSkill } from "../non-coder-skills";

/**
 * Render a non-coder skill page to Markdown. The skill content is already
 * Markdown (the SKILL.md source in .agents/skills); this strips its
 * frontmatter, drops the duplicate H1 (the document header adds the title),
 * and prepends the install command shown on the page.
 */
export function renderSkillMarkdown(skill: NonCoderSkill): string {
  let body = skill.content.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
  body = body.replace(/^# .+\n/, "").trim();

  const intro = [
    `${skill.description}`,
    "",
    `Category: ${skill.categoryLabel}`,
    "",
    `Usage: \`${skill.command.usage}\` (${skill.command.hint})`,
  ].join("\n");

  return `${intro}\n\n${body}`;
}

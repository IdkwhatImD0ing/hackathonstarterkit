---
name: kit-maintainer
description: "Fold new feedback into The Hackathon Playbook and its skills without duplicating what is already there. Use this skill when the owner brings judging notes, lessons from a hackathon, user or reader feedback, or a skill that misbehaved, and wants the kit updated and shipped as a pull request."
metadata:
  internal: true
---

# Kit Maintainer

Keep the kit current. New feedback should land in the one place a reader or an agent already looks for that topic, strengthen what is there, and ship as one reviewable pull request.

This skill is for the owner and agents working on this repo. It is marked `metadata.internal: true`, so `npx skills add IdkwhatImD0ing/hackathonstarterkit` skips it unless `INSTALL_INTERNAL_SKILLS=1` is set.

## 1. Read Before Writing

Read `CLAUDE.md` first: its always-on rules (no em dashes in body text, full quote attribution, SEO checklist, page conventions) apply to every change here. Then read the source material the owner gave you in full.

Sort every item in the source into one of three buckets, and keep them apart:

- **Observed**: what the owner saw or heard. Usable as first-person experience.
- **Advised**: what the owner said teams should do. Usable as advice.
- **Inferred**: anyone else's reading of it, including scores or rankings an assistant suggested. Do not publish these as the owner's view.

Never invent a number, a quote, or an outcome the source doesn't contain. If something important is missing, ask, or leave a `{/* [CONFIRM: ...] */}` comment in the page for the owner, which is the repo's convention for open questions.

## 2. Keep People Unidentifiable

Feedback about other people's projects (judging notes, mentoring notes) is published without names, team names, table numbers, tracks, or details that would let someone work out which team it was. Write "one team" or "a technically interesting project", not a description of the product.

## 3. Find the Existing Home

Before adding anything, search for the idea:

```bash
rg -i "<two or three keywords from the lesson>" app lib skills docs
```

If the idea already exists, strengthen it in place: add the new evidence, example, or sharper wording to the existing section. Only add a new section when the lesson covers ground no section owns. One topic gets one canonical home; other places link to it rather than repeat it.

Where each kind of content lives:

| Feedback is about | Primary home | Usually also update |
| :-- | :-- | :-- |
| A playbook phase (team, idea, validation, execution, pitching, submission, after) | `app/playbook/<slug>/page.tsx` | That phase's checklist section, `updated` in `lib/playbook.ts` |
| Pitching, demos, judging | `app/playbook/pitching/page.tsx` | `skills/demo-prep/SKILL.md` and its evals, the `pitch` prompts in `lib/cheat-sheet.ts` |
| A prompt people paste during the event | `lib/cheat-sheet.ts` | `CHEAT_SHEET_UPDATED`; `lib/prompts/` if two pages share the prompt |
| A skill that gave a bad or incomplete result | `skills/<slug>/SKILL.md` | A new case in `skills/<slug>/evals/evals.json` that would have caught it |
| Non-coders | `lib/non-coder-sections.ts`, `app/non-coders/` | `lib/non-coder-skills.ts` if a skill's card changes |
| A story worth a full write-up | A blog post in `lib/blog/posts/`, via `skills/blog-writer/SKILL.md` | Supporting sources in `docs/research/<topic>/` |
| Site bugs or UX | The component or route itself | Nothing else; this skill is for content |

A lesson usually belongs in more than one row: the page teaches it, the skill makes an agent do it, and the cheat-sheet prompt reminds people mid-event. Update each, in that row's own format, and keep the wording consistent.

## 4. Write in the Kit's Voice

- First person from the owner where it's their experience ("I judged..."), plain and practical.
- Front-load each card and bullet, bold-lead fragments, one `<KeyTakeaway>` per section, and secondary theory behind `<Disclosure>` (see `docs/page-content-conventions.md`).
- New pages and routes follow `docs/seo-implementation.md`; standalone routes go into `app/sitemap.ts` by hand.
- Blog edits set `updatedDate` and follow `docs/blog-engagement-checklist.md`.
- Skills stay self-contained: a user who installed only that skill must be able to follow it.

## 5. Regenerate and Verify

The site publishes Markdown, `llms-full.txt`, agent-skill artifacts, and an embedding index built from the content. CI fails if any are stale, so after editing:

```bash
pnpm build
pnpm gen:md && pnpm gen:llms && pnpm gen:skills
pnpm gen:index        # needs OPENAI_API_KEY; without it, run --dry-run and say so in the PR
pnpm test
pnpm exec eslint <changed files>
```

Then run `pnpm gen:md -- --check`, `pnpm gen:llms -- --check`, and `pnpm gen:skills -- --check`. Read the generated Markdown for each page you changed (`content/generated/md/...`) to confirm the new copy rendered. Check every added line for em dashes.

Before committing, check each published sentence against the source: observed, advised, or clearly framed as your reasoning. Cut anything that is none of those.

## 6. Ship as a Pull Request

- Work on a new branch; never push to `main`.
- Commit source edits and regenerated files together, with a message that names the source of the feedback.
- Open a pull request with a "Before:" and an "After:" paragraph, then a short "How". Say what came from the source, what you left out and why, and anything the owner still has to do (for example, rebuilding the embedding index).
- The owner merges. Don't merge it yourself.

## Final Output

Report back with:

1. **What changed**: each file and the lesson it now carries
2. **Left out**: items from the source you didn't use, and why
3. **Open questions**: anything marked `[CONFIRM: ...]`
4. **Pull request**: the link, and any check that still needs the owner

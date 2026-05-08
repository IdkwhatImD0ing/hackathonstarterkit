# AGENTS.md

## Learned User Preferences

- Cite every external source used in playbook content; ground claims with named experts, papers, books, or concrete URLs rather than generic advice.
- Weave research and quotes through the narrative (mirroring the team-formation and ideation pages), never collect them in a discrete "research" block.
- Keep new playbook pages visually consistent with the existing pages; team-formation and ideation are the canonical design references for hero, headings, cards, and accent colors.
- Affiliate or "preferred tool" mentions must read soft and casual ("check it out", "my preferred"), never salesy or feature-listy.
- Embed rich media (demo videos, recordings) on one canonical page only; cross-link from sibling pages instead of duplicating the embed.
- When modifying a blog post, set the `updatedDate` field so the change is reflected on the post.
- When implementing from a plan in `~/.cursor/plans/<name>.plan.md`, mark plan to-dos `in_progress` one at a time and never edit the plan file itself.
- When the user pastes raw LinkedIn-style copy (bold unicode, emoji bullets), normalize the formatting and integrate it into the site's components rather than pasting verbatim.
- Personal proof to surface: started hackathons looking for an internship, got an interview within the first 4 hackathons, then 2 expedited interviews and 1 direct offer; 60+ hackathons and over $100K in winnings. Frame to fit the page context.
- Verify substantive page changes with `pnpm run build` before committing.

## Learned Workspace Facts

- Next.js App Router site (TypeScript) deployed at `thehackathonplaybook.dev`; canonical URLs are built from `NEXT_PUBLIC_BASE_URL`.
- Package manager is `pnpm`; both `package-lock.json` and `pnpm-lock.yaml` are present, but pnpm is canonical.
- UI stack: shadcn/ui (radix-ui primitives), Tailwind CSS, lucide-react icons. Analytics via PostHog and Vercel Analytics.
- Playbook phase order is fixed in `lib/playbook.ts` (`PLAYBOOK_SECTIONS`): team-formation, ideation, validation, execution, pitching, submission, post-hackathon. Pages live at `app/playbook/<slug>/page.tsx`.
- Playbook page conventions: `SectionTemplate` wrapper, local `SectionHeading` component, accent colors `volt`/`spark`/`primary`/`success`, glass panels for quotes, `stagger-children` and `glow-hover` animation classes.
- Blog posts are one file per post in `lib/blog/posts/<slug>.ts`, registered in `lib/blog.ts`. Shared types (including the `BlogPost` and `ContentBlock` union) live in `lib/blog/types.ts`.
- `BlogPost` supports `updatedDate?: string` and a rich `ContentBlock` union (paragraph, callout, stat-row, image, video, step-list, quote, pro-con, code-snippet, checklist, link-card, cta-button).
- Sitemap at `app/sitemap.ts` auto-pulls from `lib/playbook.ts`, `lib/non-coder-sections.ts`, `lib/non-coder-skills.ts`, and `lib/blog.ts`; standalone routes must be added manually.
- Plan-driven workflow: most multi-step tasks are scoped through plan files in `~/.cursor/plans/<name>.plan.md`. Implementations follow the plan and its to-dos without rewriting it.
- Owner's GitHub handle is `@IdkwhatImD0ing`; the trophy-case (portfolio) directory is the source of project entries shown on the home page.
- Demo-video showcase links to the user's hackathon win and solo first-place internship-offer videos; Screen Studio is the preferred screen recorder (affiliate link present in the codebase).
- The user's working rule of thumb when correcting an agent is "remember the two rules + research" (the two rules being the always-on `.cursor/rules` plus the citation/research expectation).

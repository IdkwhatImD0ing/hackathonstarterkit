---
name: blog-writer
description: "Write or expand Hackathon Playbook blog posts in `lib/blog.ts` using the site's rich content block system and SEO rules. Use this skill whenever the user asks for a new article, blog idea, SEO post, content update, or anything that should become a `/blog/[slug]` entry, even if they only describe the topic casually."
metadata:
  internal: true
---

# Blog Writer

Create blog posts for the Hackathon Playbook site. Posts are structured data in `lib/blog.ts`; rendering, metadata, JSON-LD, and sitemap entries are handled by the blog templates.

## Start With Context

Read `lib/blog.ts` and, if needed, `app/blog/[slug]/page.tsx` before writing. Identify existing post slugs, reusable internal links, the exact `BlogPost` and `ContentBlock` shapes, and any renderer constraints.

If the user did not provide enough direction, ask for the missing essentials:

- Topic or working title
- Target reader
- Primary search keyword
- Desired angle, such as beginner guide, tactical checklist, teardown, or opinionated recommendation

If the user is unsure, suggest three ideas that fill gaps in current coverage.

## Plan Before Editing

Share a short outline and wait for approval unless the user explicitly asked you to proceed without review. Include:

1. Slug matched to the target query
2. Title under 70 characters when practical
3. Description of 150-160 characters with the primary keyword early
4. Four to six keywords
5. Five to eight sections with planned block types
6. Internal links to related playbook, non-coder, or blog pages
7. Estimated reading time

## Content Rules

Prefer the `blocks` array over legacy `paragraphs`. Each section should normally start with a `paragraph` block, then use visual blocks to make the article scannable.

Use these block types from `lib/blog.ts`:

- `paragraph`: context, transitions, and narrative explanations
- `callout`: one important warning, tip, background note, or takeaway
- `stat-row`: two to four metrics that support the argument
- `step-list`: three to six sequential steps
- `quote`: social proof or expert framing
- `pro-con`: decisions, tradeoffs, or do/don't guidance
- `code-snippet`: commands, config, or code examples
- `checklist`: preparation or launch checklists with four to eight items
- `link-card`: internal links, especially in the final section

Composition guidance:

- Use three to five different block types per article.
- Avoid back-to-back visual blocks without a `paragraph` transition when the reader needs context.
- Use callouts sparingly. If everything is highlighted, nothing feels important.
- Put terminal commands in `code-snippet` blocks.
- Emphasize key phrases by wrapping them in `**double asterisks**` inside `paragraph` or `callout` text; the renderer converts them to bold. Use sparingly. This is the only inline markdown the renderer supports (no italics, links, or `*single*` asterisks in body text).
- Include at least one `link-card` to existing site content.
- Every quote must include a real attribution with the person's full name and credential, title, or source.

## Write To Be Finished

Most readers never reach the end. Optimize for completion, grounded in `docs/blog-engagement-research.md` (read it for the evidence and sources). The highest-leverage moves:

- **Front-load the payoff.** Put the core answer in the first sentence and above the fold (inverted pyramid). Readers absorb only about 20 to 28% of a page's words ([NN/g, 2008](https://www.nngroup.com/articles/how-little-do-users-read/)).
- **Short first sentence.** Start momentum at near-zero effort; the headline's job is just to earn sentence one ([Joseph Sugarman, 1998](https://thisiscopy.com/joseph-sugarmans-copywriting-approach/)).
- **One concrete curiosity gap** in the intro, paid off later.
- **Cut verbosity.** Word count is not a ranking factor; edit until no word can be removed. Cover the intent, then stop.
- **A surprise in the middle and a forward-looking payoff at the end**, not a recap.

Before finishing, run the post through `docs/blog-engagement-checklist.md`.

## Add The Post

Append the post object to `BLOG_POSTS` in `lib/blog.ts`. Preserve local formatting and do not rewrite unrelated posts. Use today's date unless the user specifies a publication date.

Minimum post shape:

```typescript
{
  slug: "target-keyword-slug",
  title: "Keyword-Rich Title",
  description: "150-160 character SEO description with the primary keyword early.",
  date: "YYYY-MM-DD",
  readingTime: "X min read",
  keywords: ["primary keyword", "secondary keyword"],
  content: [
    {
      heading: "Section Heading",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Section introduction." },
        { type: "callout", variant: "tip", text: "Important guidance." },
      ],
    },
  ],
}
```

## Verify

Check the post against the SEO plan:

- Slug targets the search query
- Title contains the primary keyword naturally
- Description is 150-160 characters
- Keywords list has four to six entries
- Internal link-card is present
- Quote attributions are complete
- Metadata, JSON-LD, and sitemap are covered by the existing blog templates
- The post passes `docs/blog-engagement-checklist.md` (short first sentence, front-loaded payoff, scannable structure, no padding)

Run the project validation that matches the repo. Prefer the existing build command if package scripts reveal one; otherwise use `npx next build`.

## Final Response

Return:

1. **Post Summary**: title, slug, keyword, section count, and block types used
2. **SEO Status**: checklist results and any tradeoffs
3. **Verification**: command run and outcome, or why it was skipped
4. **Next Step**: one useful content improvement or promotion idea

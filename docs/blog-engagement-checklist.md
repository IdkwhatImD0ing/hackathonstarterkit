# Blog Pre-Publish Engagement Checklist

Run every new or rewritten blog post through this before publishing. It is the practical distillation of `docs/blog-engagement-research.md` (the evidence and sources live there). The goal is one thing: more readers finishing the post.

Follow the site's standing rules while you do it: no em dashes in body text, and full attribution (name, credential, source, year) on every quote or statistic.

## Opening (highest leverage)

- [ ] The **first sentence is short** and easy (readable in about a second). No long, qualifier-laden windup.
- [ ] The **core answer or payoff is above the fold**, not saved for the end (inverted pyramid).
- [ ] The intro opens **one small, concrete curiosity gap** the post later pays off.
- [ ] The title earns the first sentence; it does not try to summarize the whole article.

## Structure for scanners

- [ ] A **descriptive subhead every 2 to 3 paragraphs**, each front-loaded with its point (not "In order to" or "There are several").
- [ ] **One idea per paragraph**; long paragraphs broken up.
- [ ] **Key phrases bolded** and dense prose converted to lists where it helps.
- [ ] A **bucket brigade** ("Here's the problem:", "Still not convinced?") at each spot where momentum sags.
- [ ] Uses **3 to 5 different block types** (`stat-row`, `checklist`, `step-list`, `pro-con`, `callout`, `quote`, `link-card`). Model: `lib/blog/posts/how-to-win-hackathons.ts`.

## Brevity

- [ ] Ran a **dedicated brevity pass**: every sentence survives the "what is its purpose?" test.
- [ ] Culled filler and qualifiers: "very", "really", "just", "that", "in order to", "there is/are", "the fact that".
- [ ] Swapped wordy phrases ("in order to" to "to", "the reason is that" to "because") and preferred **active voice**.
- [ ] **Not padded to hit a word count.** Length matches the intent; word count is not an SEO lever.

## Middle and end

- [ ] The middle has **at least one genuine surprise or insight**, not just restated setup.
- [ ] Evidence types **rotate** (story, data, expert quote, fresh metaphor) instead of stacking the same kind.
- [ ] The ending is a **forward payoff** (a next step, a reframed image, or a held-back bonus), not "In conclusion, we covered."
- [ ] At least one `link-card` to related site content.

## Interactivity (apply surgically)

- [ ] Any quiz, calculator, or CTA is placed **high**, not buried at the bottom.
- [ ] **No core argument hidden inside a collapsed accordion** (FAQs and optional deep dives only).
- [ ] Heavy embeds (video, etc.) use lazy loading and live on one canonical page; siblings cross-link rather than re-embed.

## Performance and measurement

- [ ] Above-the-fold renders fast (target under 3 seconds on mobile).
- [ ] After publishing or rewriting, check the **per-section drop-off funnel** in PostHog (`blog_section_viewed` by `section_index` for this slug) to find the cliff, and compare the **true completion rate** (`blog_reading_completed`) against the pre-edit baseline. See `docs/blog-engagement-research.md` for how to build these.

## Existing-post rewrite reminder

- [ ] Set the post's `updatedDate` field.
- [ ] Preserve unrelated posts and local formatting; change only what the rewrite requires.

---
name: blog-writer
description: "Write new blog posts using the rich content block system. Handles topic ideation, SEO metadata, content structuring with visual components (callouts, stats, step lists, checklists, code snippets, quotes, pro/con tables, link cards), and integration into the blog data file. Use when adding a new blog post to the site."
---

# Blog Writer

Write a new blog post for the Hackathon Starter Kit site using the rich content block system. Every post is defined as structured data in `lib/blog.ts` and rendered automatically by `app/blog/[slug]/page.tsx`.

## Step 1: Define the Topic

Ask the user (or determine from context):
- What is the blog post about?
- Who is the target reader?
- What primary search keyword should this rank for?

If the user is unsure, suggest 3 topic ideas based on gaps in the existing blog coverage. Check `lib/blog.ts` for the `BLOG_POSTS` array to see what already exists.

## Step 2: Plan the Post Structure

Before writing any content, create an outline:

1. **Slug**: URL-friendly, matches the target keyword (e.g., `how-to-find-hackathon-teams`)
2. **Title**: Keyword-rich, compelling, under 70 characters if possible
3. **Description**: 150-160 characters with the primary keyword in the first sentence
4. **Keywords**: 4-6 search terms this post targets
5. **Sections**: 5-8 sections, each with a heading and a mix of content block types
6. **Reading Time**: Estimate based on content length (e.g., "8 min read")

Present the outline to the user for approval before writing the full content.

## Step 3: Write Using Content Blocks

Each section in `BlogSection` has a `heading` (string), `paragraphs` (string[], can be empty), and an optional `blocks` (ContentBlock[]) array. When `blocks` is present, the renderer uses it instead of `paragraphs`.

### Available Block Types

Use the `ContentBlock` union type defined in `lib/blog.ts`. Here is every type with its fields and when to use it:

#### `paragraph`
Standard body text. Use for introductory context and transitions between visual blocks.
```typescript
{ type: "paragraph", text: "Your paragraph text here." }
```

#### `callout`
Highlighted box with an icon. Four variants available.
```typescript
{
  type: "callout",
  variant: "tip" | "warning" | "info" | "success",
  title: "Optional custom title",   // defaults to variant label if omitted
  text: "The callout body text."
}
```
- **tip** (yellow, lightbulb icon): Actionable advice, shortcuts, pro tips
- **warning** (red, alert icon): Common mistakes, things to avoid
- **info** (purple, info icon): Background context, definitions, notes
- **success** (green, checkmark icon): Key takeaways, proven results

#### `stat-row`
Grid of 2-4 key metrics. Use to highlight impressive numbers.
```typescript
{
  type: "stat-row",
  stats: [
    { value: "36+", label: "Wins" },
    { value: "$100K+", label: "In Prizes" }
  ]
}
```

#### `step-list`
Numbered vertical timeline with connecting lines. Use for sequential processes.
```typescript
{
  type: "step-list",
  steps: [
    { title: "Step Title", description: "What to do in this step." },
    { title: "Next Step", description: "Details here." }
  ]
}
```

#### `quote`
Styled blockquote. Use for testimonials, memorable statements, or expert opinions.
```typescript
{
  type: "quote",
  text: "The quoted text without quotation marks.",
  attribution: "Speaker Name or Source"   // optional
}
```

#### `pro-con`
Two-column comparison (green "Do This" / red "Avoid This"). Use for best practices.
```typescript
{
  type: "pro-con",
  pros: ["Good practice 1", "Good practice 2"],
  cons: ["Bad practice 1", "Bad practice 2"]
}
```

#### `code-snippet`
Code block with language label, optional filename, and copy button.
```typescript
{
  type: "code-snippet",
  language: "bash",
  filename: "terminal",          // optional
  code: "npm install\nnpm run dev"
}
```

#### `checklist`
Interactive checkboxes with a progress bar. Use for preparation lists or requirements.
```typescript
{
  type: "checklist",
  title: "Optional Checklist Title",   // optional
  items: ["Item 1", "Item 2", "Item 3"]
}
```

#### `link-card`
Internal navigation card. Use to link to related blog posts or site pages.
```typescript
{
  type: "link-card",
  title: "Related Article Title",
  description: "Brief description of what the reader will find.",
  href: "/blog/some-slug",
  tag: "Related Guide"           // optional
}
```

### Composition Rules

Follow these rules when composing blocks within a section:

1. **Start with a paragraph**: Every section should begin with a `paragraph` block to provide context before visual components.
2. **Mix 2-4 block types per section**: Avoid using the same block type back-to-back (except paragraphs). Variety keeps readers engaged.
3. **Use callouts sparingly**: Maximum 1-2 per section. If everything is highlighted, nothing stands out.
4. **End articles with link-cards**: The final section should include 1-2 `link-card` blocks pointing to related content on the site.
5. **Keep stat-rows to 2-4 items**: More than 4 stats in a row reduces impact.
6. **Keep step-lists to 3-6 steps**: Longer processes should be split across sections.
7. **Keep checklists to 4-8 items**: Longer lists lose focus.
8. **Use pro-con for decisions**: Whenever the post compares approaches, use pro-con instead of listing items in paragraphs.
9. **Use code-snippets for commands**: Any terminal command or code example should use a code-snippet block, not inline text.
10. **Use quotes for social proof**: Testimonials, expert opinions, and memorable one-liners.

## Step 4: Add the Post to `lib/blog.ts`

Append the new post object to the `BLOG_POSTS` array in `lib/blog.ts`. The object must match the `BlogPost` interface:

```typescript
{
  slug: "your-keyword-slug",
  title: "Your Keyword-Rich Title Here",
  description: "150-char description with primary keyword early.",
  date: "YYYY-MM-DD",           // today's date
  readingTime: "X min read",
  keywords: ["primary keyword", "secondary keyword", ...],
  content: [
    {
      heading: "Section Heading",
      paragraphs: [],            // keep empty when using blocks
      blocks: [
        { type: "paragraph", text: "..." },
        { type: "callout", variant: "tip", text: "..." },
        // ... more blocks
      ],
    },
    // ... more sections
  ],
}
```

## Step 5: Verify SEO Compliance

Before finishing, confirm these requirements from the site's SEO plan:

- [ ] Slug matches the target search keyword
- [ ] Title contains the primary keyword
- [ ] Description is 150-160 characters with the keyword in the first sentence
- [ ] 4-6 keywords are listed
- [ ] Metadata is auto-generated (handled by `app/blog/[slug]/page.tsx`)
- [ ] JSON-LD Article schema is auto-generated (handled by the page)
- [ ] Sitemap picks up the new post automatically (handled by `app/sitemap.ts`)
- [ ] At least one `link-card` block links to another page on the site
- [ ] A single `<h1>` is used (handled by the page template; section headings are `<h2>`)

## Step 6: Build and Verify

Run these commands to confirm the post works:

```bash
npx next build
```

Check:
- The new slug appears in the build output under `/blog/[slug]`
- No TypeScript errors
- No build warnings related to the new content

## Output

Return:
1. **Post Summary**: Title, slug, keyword target, section count, block types used
2. **SEO Checklist**: Confirmation that all SEO requirements are met
3. **Block Inventory**: Count of each block type used (e.g., "3 paragraphs, 2 callouts, 1 stat-row, 1 step-list, 1 link-card")
4. **Build Status**: Confirmation the project builds successfully

## Example: Minimal Blog Post

Here is a minimal but complete example showing the correct structure:

```typescript
{
  slug: "hackathon-project-ideas-2026",
  title: "Hackathon Project Ideas for 2026: 15 Ideas That Win Prizes",
  description:
    "Discover 15 hackathon project ideas for 2026 that align with sponsor challenges and impress judges. Includes AI, sustainability, and social impact categories.",
  date: "2026-04-20",
  readingTime: "7 min read",
  keywords: [
    "hackathon project ideas",
    "hackathon ideas 2026",
    "what to build at a hackathon",
    "hackathon project suggestions",
  ],
  content: [
    {
      heading: "Why Your Project Idea Matters More Than Your Code",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "The idea you choose at a hackathon determines 80% of your outcome. Judges have seen thousands of to-do apps and weather dashboards. What makes a project memorable is how well it solves a real problem that the judges care about." },
        { type: "callout", variant: "info", text: "The best hackathon ideas sit at the intersection of a real problem, the sponsor's tools, and something you can demo in under 3 minutes." },
      ],
    },
    {
      heading: "AI-Powered Ideas",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "AI projects dominate hackathon winners in 2026. Here are five ideas that leverage AI APIs effectively." },
        { type: "step-list", steps: [
          { title: "AI Study Buddy", description: "Upload lecture notes, get AI-generated quizzes and flashcards. Uses Claude or GPT-4o for content generation." },
          { title: "Accessible Web Reader", description: "Paste any URL, get a simplified plain-English summary for users with cognitive disabilities." },
          { title: "Code Review Mentor", description: "Submit code and get feedback styled as a patient, encouraging mentor rather than a critical linter." },
        ]},
        { type: "callout", variant: "tip", text: "Always integrate at least one sponsor API. Check the hackathon's challenge list before committing to an idea." },
      ],
    },
    {
      heading: "Getting Started",
      paragraphs: [],
      blocks: [
        { type: "paragraph", text: "Pick one idea, scope it to 2-3 core features, and start building." },
        { type: "link-card", title: "How to Win Hackathons: The Complete Guide", description: "The full 7-phase system for hackathon success.", href: "/blog/how-to-win-hackathons", tag: "Full Guide" },
        { type: "link-card", title: "Best Tech Stack for Hackathons in 2026", description: "The tools and frameworks winning teams actually use.", href: "/blog/best-tech-stack-for-hackathons", tag: "Tech Stack" },
      ],
    },
  ],
}
```

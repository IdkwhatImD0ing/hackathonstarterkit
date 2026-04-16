# SEO Implementation Guide

This document describes the SEO strategy and technical implementation for the Hackathon Starter Kit website.

## Goal

Maximize organic search visibility for hackathon-related queries, particularly:

- "how to win hackathons"
- "best tech stack for hackathons" / "best technology to use at hackathons"
- "hackathon tips for beginners"
- "hackathon pitch guide"
- "non-coders winning hackathons"
- "hackathon playbook"

## Technical Implementation

### 1. Dynamic Sitemap (`app/sitemap.ts`)

Generates `/sitemap.xml` automatically with all routes. The sitemap **imports directly** from the data source files so new entries are picked up automatically:

- `lib/playbook.ts` (`PLAYBOOK_SECTIONS`) for playbook phases
- `lib/non-coder-sections.ts` (`NON_CODER_SECTIONS`) for non-coder sub-pages
- `lib/non-coder-skills.ts` (`NON_CODER_SKILLS`) for skill detail pages
- `lib/blog.ts` (`BLOG_POSTS`) for blog posts

**Adding a new entry to any of these data files automatically includes it in the sitemap.** No manual sitemap edits are needed for data-driven routes. For standalone routes (e.g., a new `app/about/page.tsx`), add the URL to `app/sitemap.ts` manually.

Each entry includes `lastModified`, `changeFrequency`, and `priority` signals.

### 2. Robots Configuration (`app/robots.ts`)

Generates `/robots.txt` that:
- Allows all crawlers full access
- Points crawlers to the sitemap URL

### 3. JSON-LD Structured Data (`components/json-ld.tsx`)

Implemented across the site using a reusable `<JsonLd>` component:

| Schema Type | Location | Purpose |
|---|---|---|
| WebSite | Root layout | Identifies the site to Google, enables sitelinks search box |
| Organization | Root layout | Brand recognition in search results |
| FAQPage | Home page | Targets Google Featured Snippets for common hackathon questions |
| HowTo | Home page | "How to win a hackathon" in 7 steps with links to each phase |
| Article | Blog posts | Rich article results with author, date, publisher |
| BreadcrumbList | Blog posts | Navigation breadcrumbs in search results |
| CollectionPage + ItemList | Blog index | Blog listing structure |

### 4. Metadata Optimization

Every page has:
- Keyword-rich `title` targeting specific search queries
- Descriptive `description` (150-160 chars) with primary keywords
- `canonical` URL to prevent duplicate content
- Open Graph metadata for social sharing (Facebook, LinkedIn)
- Twitter Card metadata for Twitter/X sharing
- `robots` directives allowing full indexing

### 5. Blog Section (`app/blog/`, `lib/blog.ts`)

Five keyword-targeted articles designed to capture organic search traffic:

| Article | Primary Keyword Target |
|---|---|
| How to Win Hackathons | "how to win hackathons" |
| Best Tech Stack for Hackathons | "best tech stack for hackathons" |
| Hackathon Tips for Beginners | "hackathon tips for beginners" |
| Hackathon Pitch Guide | "how to pitch at a hackathon" |
| Non-Coders Winning Hackathons | "non-coders winning hackathons" |

Each article includes:
- Article JSON-LD schema with author attribution
- Breadcrumb navigation schema
- Internal links to the playbook and related articles
- Keyword tags visible on the page
- Previous/next navigation between articles
- Rich content blocks for visual variety and engagement (see below)

### 5a. Blog Content Blocks (`components/blog-blocks.tsx`)

Blog sections can use a `blocks` array (in addition to or instead of plain `paragraphs`) to render rich, visually distinct content types:

| Block Type | Purpose |
|---|---|
| `paragraph` | Standard paragraph text |
| `callout` | Highlighted tip, warning, info, or success box with icon |
| `stat-row` | Grid of key metrics/numbers |
| `step-list` | Numbered vertical timeline of steps |
| `quote` | Styled blockquote with optional attribution |
| `pro-con` | Two-column do/don't comparison table |
| `code-snippet` | Syntax-highlighted code block with copy button |
| `checklist` | Interactive checklist with progress bar |
| `link-card` | Internal link card with description and tag |

These blocks are defined in `lib/blog.ts` via the `ContentBlock` union type and rendered by the `BlogBlock` component. When a section has a `blocks` array, those are rendered instead of the plain `paragraphs` array, maintaining backward compatibility.

### 6. Security Headers (`next.config.ts`)

Added headers that improve trust signals:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Content Strategy for Ongoing SEO

To continue improving search rankings:

1. **Add more blog posts** targeting long-tail keywords (e.g., "hackathon project ideas 2026," "how to find a hackathon team")
2. **Build backlinks** by sharing articles on social media, Reddit (r/hackathons, r/cscareerquestions), and Hacker News
3. **Submit the sitemap** to Google Search Console at https://search.google.com/search-console
4. **Monitor rankings** using Google Search Console to see which queries drive traffic
5. **Update content regularly** as search engines favor fresh content

## Cursor Rule for New Pages

A Cursor rule at `.cursor/rules/seo-new-pages.mdc` (always applied) enforces that any AI agent creating new pages follows this SEO plan. It covers required metadata fields, sitemap registration, JSON-LD schemas, semantic HTML, and internal linking. See that file for the full checklist.

## Analytics

The site uses **Vercel Analytics** for Web Vitals and **PostHog** for behavioral analytics (custom events, blog engagement tracking, funnels). See [`docs/analytics-setup.md`](./analytics-setup.md) for full setup instructions and tracked events.

## Google Search Console Setup

After deploying, verify the domain in Google Search Console:

1. Go to https://search.google.com/search-console
2. Add property for `thehackathonplaybook.dev`
3. Verify ownership (DNS TXT record or HTML file)
4. Submit the sitemap URL: `https://thehackathonplaybook.dev/sitemap.xml`
5. Use the URL Inspection tool to request indexing of key pages

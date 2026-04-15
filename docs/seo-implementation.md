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

Generates `/sitemap.xml` automatically with all routes, including:
- Home, playbook index, all 7 playbook phases
- Non-coders index, all sub-pages, all skill pages
- Blog index and all blog posts

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
- Internal links to the playbook
- Keyword tags visible on the page
- Previous/next navigation between articles

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

## Google Search Console Setup

After deploying, verify the domain in Google Search Console:

1. Go to https://search.google.com/search-console
2. Add property for `hackathonstarterkit.com`
3. Verify ownership (DNS TXT record or HTML file)
4. Submit the sitemap URL: `https://hackathonstarterkit.com/sitemap.xml`
5. Use the URL Inspection tool to request indexing of key pages

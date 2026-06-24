# Analytics Setup Guide

This document describes the analytics stack for the Hackathon Playbook website.

## Analytics Stack Overview

The site uses two complementary analytics tools:

| Tool | Purpose | Free Tier |
|---|---|---|
| **Vercel Analytics** | Core Web Vitals (LCP, CLS, FID), basic page views | 100K events/month |
| **PostHog** | Product analytics, custom events, session recordings, funnels | 1M events/month |

Vercel Analytics provides performance monitoring (Web Vitals per route). PostHog provides behavioral analytics (what users do on the site, how far they read blog posts, which CTAs they click).

## PostHog Integration

### Architecture

The integration uses three components:

1. **`instrumentation-client.ts`** (root): Initializes PostHog on the client side using the Next.js 15.3+ instrumentation API. This runs once when the page loads and enables autocapture.

2. **`components/posthog-provider.tsx`**: A client component that tracks SPA-style page view events on client-side navigations (when the URL changes without a full page load).

3. **`components/blog-analytics.tsx`**: A client component embedded in blog post pages that tracks blog-specific engagement metrics.

### Setup

1. Create a free PostHog account at [posthog.com](https://posthog.com)
2. Get your project API key from **Settings > Project > Variables**
3. Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

4. Add the same variables to your hosting provider (Vercel > Settings > Environment Variables)
5. Deploy; PostHog will begin capturing events immediately

### Graceful Degradation

If `NEXT_PUBLIC_POSTHOG_KEY` is not set, PostHog does not initialize and no tracking occurs. The site functions normally without it. Vercel Analytics continues to work independently.

### Events Tracked

#### Automatic (via PostHog autocapture)

- Page views (`$pageview`)
- Page leaves (`$pageleave`)
- Clicks on links and buttons
- Form submissions

#### Custom Blog Events

These events are fired by the `BlogAnalytics` component on every blog post page. All include `blog_slug` and `blog_title`.

| Event | When | Additional properties |
|---|---|---|
| `blog_post_viewed` | On page load | `blog_reading_time` |
| `blog_scroll_milestone` | At 25%, 50%, 75%, 100% page scroll | `scroll_percent`, `time_on_page_seconds`, `engaged_seconds` |
| `blog_section_viewed` | When each article section scrolls into view | `section_index`, `section_heading`, `engaged_seconds` |
| `blog_reading_completed` | Reached the end-of-article marker AND engaged 30+ seconds | `engaged_seconds`, `time_on_page_seconds` |
| `blog_post_engagement` | On page leave (pagehide / SPA unmount, after 2+ seconds) | `time_spent_seconds`, `engaged_seconds`, `max_scroll_percent`, `reading_completed` |

**Engaged time vs time-on-page.** `time_spent_seconds` / `time_on_page_seconds` are wall-clock. `engaged_seconds` counts only seconds where the tab was visible and the reader was active within the last 5 seconds (Chartbeat-style), so it separates real readers from fast scanners. `section_index` is driven by `data-blog-section` on each `<section>`; `blog_reading_completed` fires off the `<div data-blog-end>` marker in `app/blog/[slug]/page.tsx`. See `docs/blog-engagement-research.md` for the methodology and benchmarks.

### PostHog Dashboard Recommendations

Once data starts flowing, create these insights in PostHog:

1. **Blog Performance**: Bar chart of `blog_post_viewed` broken down by `blog_slug`
2. **Per-section drop-off (the cliff)**: Funnel of `blog_section_viewed` filtered to one `blog_slug`, ordered by `section_index` (0, 1, 2, ...). The step with the biggest drop names the section readers quit at. This is the highest-value insight for deciding what to rewrite.
3. **True Reading Completion Rate**: Funnel from `blog_post_viewed` to `blog_reading_completed`, per slug. This filters out fast scrollers that a raw 100% scroll would count.
4. **Scanners vs readers**: Table of `blog_post_engagement` by `blog_slug` comparing average `engaged_seconds` against `time_spent_seconds` and `max_scroll_percent`. High scroll with low engaged time means scanning.
5. **Visual diagnosis**: Use the PostHog toolbar scrollmap on a live blog URL, then watch session replays of sessions that bailed at the cliff section.
6. **Top Referrers**: Bar chart of `$pageview` broken down by `$referrer` for `/blog/*` pages
7. **CTA Conversion**: Funnel from `blog_post_viewed` to click on "Open the Playbook" button

### Reverse Proxy (Optional)

To prevent ad blockers from blocking PostHog requests, set up a reverse proxy. Add this to `next.config.ts`:

```ts
async rewrites() {
  return [
    {
      source: "/ingest/static/:path*",
      destination: "https://us-assets.i.posthog.com/static/:path*",
    },
    {
      source: "/ingest/:path*",
      destination: "https://us.i.posthog.com/:path*",
    },
    {
      source: "/ingest/decide",
      destination: "https://us.i.posthog.com/decide",
    },
  ];
},
```

Then update `NEXT_PUBLIC_POSTHOG_HOST` to `/ingest` in your `.env.local`.

## File Reference

| File | Role |
|---|---|
| `instrumentation-client.ts` | PostHog client-side initialization |
| `components/posthog-provider.tsx` | SPA page view tracker |
| `components/blog-analytics.tsx` | Blog engagement tracking |
| `.env.example` | Template for required environment variables |
| `app/layout.tsx` | Mounts `PostHogPageViewTracker` and Vercel `Analytics` |
| `app/blog/[slug]/page.tsx` | Mounts `BlogAnalytics` per post |

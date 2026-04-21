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

These events are fired by the `BlogAnalytics` component on every blog post page:

| Event | When | Properties |
|---|---|---|
| `blog_post_viewed` | On page load | `blog_slug`, `blog_title`, `blog_reading_time` |
| `blog_scroll_milestone` | At 25%, 50%, 75%, 100% scroll | `blog_slug`, `blog_title`, `scroll_percent`, `time_on_page_seconds` |
| `blog_post_engagement` | On page leave (after 2+ seconds) | `blog_slug`, `blog_title`, `time_spent_seconds`, `max_scroll_percent`, `reading_completed` |

### PostHog Dashboard Recommendations

Once data starts flowing, create these insights in PostHog:

1. **Blog Performance**: Bar chart of `blog_post_viewed` broken down by `blog_slug`
2. **Reading Completion Rate**: Funnel from `blog_post_viewed` to `blog_scroll_milestone` where `scroll_percent = 100`
3. **Engagement by Post**: Table of `blog_post_engagement` showing average `time_spent_seconds` and `max_scroll_percent` by `blog_slug`
4. **Top Referrers**: Bar chart of `$pageview` broken down by `$referrer` for `/blog/*` pages
5. **CTA Conversion**: Funnel from `blog_post_viewed` to click on "Open the Playbook" button

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

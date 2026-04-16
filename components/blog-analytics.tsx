"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

interface BlogAnalyticsProps {
  slug: string;
  title: string;
  readingTime: string;
}

export function BlogAnalytics({ slug, title, readingTime }: BlogAnalyticsProps) {
  const startTime = useRef(0);
  const maxScroll = useRef(0);
  const milestonesFired = useRef(new Set<number>());

  useEffect(() => {
    if (!posthog.__loaded) return;

    startTime.current = Date.now();

    posthog.capture("blog_post_viewed", {
      blog_slug: slug,
      blog_title: title,
      blog_reading_time: readingTime,
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);
      maxScroll.current = Math.max(maxScroll.current, percent);

      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (percent >= milestone && !milestonesFired.current.has(milestone)) {
          milestonesFired.current.add(milestone);
          posthog.capture("blog_scroll_milestone", {
            blog_slug: slug,
            blog_title: title,
            scroll_percent: milestone,
            time_on_page_seconds: Math.round(
              (Date.now() - startTime.current) / 1000
            ),
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const entryTime = startTime.current;

    return () => {
      window.removeEventListener("scroll", handleScroll);

      const timeSpentSeconds = Math.round(
        (Date.now() - entryTime) / 1000
      );

      if (posthog.__loaded && timeSpentSeconds > 2) {
        posthog.capture("blog_post_engagement", {
          blog_slug: slug,
          blog_title: title,
          time_spent_seconds: timeSpentSeconds,
          max_scroll_percent: maxScroll.current,
          reading_completed: maxScroll.current >= 90,
        });
      }
    };
  }, [slug, title, readingTime]);

  return null;
}

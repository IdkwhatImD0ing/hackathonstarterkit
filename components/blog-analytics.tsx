"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface BlogAnalyticsProps {
  slug: string;
  title: string;
  readingTime: string;
}

// Engaged time counts only seconds where the reader is active and the tab is
// visible, mirroring Chartbeat's rolling-window methodology (active attention,
// not wall-clock time-on-page). A scanner who hits the bottom in 20s and a
// reader who gets there in 4 minutes look identical on scroll depth alone, so
// engaged time is what separates them.
const ACTIVE_WINDOW_MS = 5000;
// A "completion" only counts if the reader reached the end marker AND was
// actually engaged past this threshold, filtering out fast scrollers.
const COMPLETION_MIN_ENGAGED_SECONDS = 30;

export function BlogAnalytics({ slug, title, readingTime }: BlogAnalyticsProps) {
  useEffect(() => {
    if (!posthog.__loaded) return;

    const startTime = Date.now();
    let lastActiveAt = Date.now();
    let engagedSeconds = 0;
    let maxScroll = 0;
    let completed = false;
    let summarySent = false;
    const firedMilestones = new Set<number>();
    const firedSections = new Set<string>();

    posthog.capture("blog_post_viewed", {
      blog_slug: slug,
      blog_title: title,
      blog_reading_time: readingTime,
    });

    const markActive = () => {
      lastActiveAt = Date.now();
    };

    // Tick once per second; credit a second only when visible and recently active.
    const engagedTimer = window.setInterval(() => {
      if (
        document.visibilityState === "visible" &&
        Date.now() - lastActiveAt < ACTIVE_WINDOW_MS
      ) {
        engagedSeconds += 1;
      }
    }, 1000);

    const activityEvents = [
      "scroll",
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
    ];
    activityEvents.forEach((evt) =>
      window.addEventListener(evt, markActive, { passive: true }),
    );

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);
      maxScroll = Math.max(maxScroll, percent);

      for (const milestone of [25, 50, 75, 100]) {
        if (percent >= milestone && !firedMilestones.has(milestone)) {
          firedMilestones.add(milestone);
          posthog.capture("blog_scroll_milestone", {
            blog_slug: slug,
            blog_title: title,
            scroll_percent: milestone,
            time_on_page_seconds: Math.round((Date.now() - startTime) / 1000),
            engaged_seconds: engagedSeconds,
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Per-section drop-off: fire when each article section enters the viewport.
    // This tells us WHICH section is the cliff, not just the page percentage.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const index = el.dataset.blogSection ?? "";
          if (firedSections.has(index)) continue;
          firedSections.add(index);
          posthog.capture("blog_section_viewed", {
            blog_slug: slug,
            blog_title: title,
            section_index: Number(index),
            section_heading: el.dataset.sectionHeading ?? "",
            engaged_seconds: engagedSeconds,
          });
        }
      },
      { threshold: 0 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-blog-section]")
      .forEach((el) => sectionObserver.observe(el));

    // True completion: reached the end-of-article marker while actually reading.
    const endObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            !completed &&
            engagedSeconds >= COMPLETION_MIN_ENGAGED_SECONDS
          ) {
            completed = true;
            posthog.capture("blog_reading_completed", {
              blog_slug: slug,
              blog_title: title,
              engaged_seconds: engagedSeconds,
              time_on_page_seconds: Math.round((Date.now() - startTime) / 1000),
            });
          }
        }
      },
      { threshold: 0 },
    );
    const endMarker = document.querySelector("[data-blog-end]");
    if (endMarker) endObserver.observe(endMarker);

    // Flush a summary on exit. Sent on pagehide (tab close / navigation away)
    // and on unmount (SPA route change); the guard prevents a double send.
    const sendSummary = () => {
      if (summarySent) return;
      const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
      if (timeSpentSeconds <= 2) return;
      summarySent = true;
      posthog.capture("blog_post_engagement", {
        blog_slug: slug,
        blog_title: title,
        time_spent_seconds: timeSpentSeconds,
        engaged_seconds: engagedSeconds,
        max_scroll_percent: maxScroll,
        reading_completed: completed || maxScroll >= 90,
      });
    };
    window.addEventListener("pagehide", sendSummary);

    return () => {
      window.clearInterval(engagedTimer);
      activityEvents.forEach((evt) =>
        window.removeEventListener(evt, markActive),
      );
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", sendSummary);
      sectionObserver.disconnect();
      endObserver.disconnect();
      sendSummary();
    };
  }, [slug, title, readingTime]);

  return null;
}

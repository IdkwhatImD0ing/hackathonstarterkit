export type { BlogPost, BlogSection, ContentBlock } from "./blog/types";
import type { BlogPost } from "./blog/types";

import { post as howToWinHackathons } from "./blog/posts/how-to-win-hackathons";
import { post as bestTechStackForHackathons } from "./blog/posts/best-tech-stack-for-hackathons";
import { post as hackathonTipsForBeginners } from "./blog/posts/hackathon-tips-for-beginners";
import { post as hackathonPitchGuide } from "./blog/posts/hackathon-pitch-guide";
import { post as nonCodersWinningHackathons } from "./blog/posts/non-coders-winning-hackathons";
import { post as buildWithElevenlabsAndCursor } from "./blog/posts/build-with-elevenlabs-and-cursor";

export const BLOG_POSTS: BlogPost[] = [
  howToWinHackathons,
  bestTechStackForHackathons,
  hackathonTipsForBeginners,
  hackathonPitchGuide,
  nonCodersWinningHackathons,
  buildWithElevenlabsAndCursor,
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

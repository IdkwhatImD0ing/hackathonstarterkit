export type { BlogPost, BlogSection, ContentBlock } from "./blog/types";
import type { BlogPost } from "./blog/types";

import { post as howToWinHackathons } from "./blog/posts/how-to-win-hackathons";
import { post as bestTechStackForHackathons } from "./blog/posts/best-tech-stack-for-hackathons";
import { post as hackathonTipsForBeginners } from "./blog/posts/hackathon-tips-for-beginners";
import { post as hackathonPitchGuide } from "./blog/posts/hackathon-pitch-guide";
import { post as nonCodersWinningHackathons } from "./blog/posts/non-coders-winning-hackathons";
import { post as buildWithElevenlabsAndCursor } from "./blog/posts/build-with-elevenlabs-and-cursor";
import { post as hackathonPitchMistakesLaHacks } from "./blog/posts/hackathon-pitch-mistakes-la-hacks";

export const BLOG_POSTS: BlogPost[] = [
  hackathonPitchMistakesLaHacks,
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

const STOP_WORDS = new Set([
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "in",
  "is",
  "of",
  "on",
  "or",
  "the",
  "this",
  "to",
  "with",
  "you",
  "your",
]);

function normalizeTerm(word: string): string {
  return word.length > 4 && word.endsWith("s") ? word.slice(0, -1) : word;
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
    .map(normalizeTerm);
}

function getPostTerms(post: BlogPost): Set<string> {
  return new Set([
    ...post.keywords.flatMap(tokenize),
    ...tokenize(post.title),
    ...tokenize(post.description),
    ...post.content.flatMap((section) => tokenize(section.heading)),
  ]);
}

function countSharedTerms(a: Set<string>, b: Set<string>): number {
  let shared = 0;

  a.forEach((term) => {
    if (b.has(term)) shared += 1;
  });

  return shared;
}

function scoreRecommendation(currentPost: BlogPost, candidatePost: BlogPost) {
  const currentKeywords = new Set(currentPost.keywords.flatMap(tokenize));
  const candidateKeywords = new Set(candidatePost.keywords.flatMap(tokenize));
  const currentTerms = getPostTerms(currentPost);
  const candidateTerms = getPostTerms(candidatePost);

  const keywordScore =
    countSharedTerms(currentKeywords, candidateKeywords) * 5;
  const topicScore = countSharedTerms(currentTerms, candidateTerms);

  return keywordScore + topicScore;
}

export function getRecommendedBlogPosts(
  currentSlug: string,
  limit = 3,
): BlogPost[] {
  const currentPost = getBlogBySlug(currentSlug);
  if (!currentPost) return [];

  return BLOG_POSTS.filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: scoreRecommendation(currentPost, post),
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map(({ post }) => post);
}

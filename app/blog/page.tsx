import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BLOG_POSTS } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://thehackathonplaybook.dev";

const POSTS_BY_DATE_DESC = [...BLOG_POSTS].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const metadata: Metadata = {
  title: "Hackathon Blog — Tips, Strategies & Guides to Win Hackathons",
  description:
    "Expert hackathon guides covering how to win hackathons, the best tech stack, tips for beginners, pitching strategies, and how non-coders are winning with AI tools. From 36+ hackathon victories.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Hackathon Blog — Tips, Strategies & Guides",
    description:
      "Expert guides on winning hackathons, the best tech stack, pitching, and more from 36+ victories.",
    url: `${BASE_URL}/blog`,
  },
  twitter: {
    title: "Hackathon Blog — Tips, Strategies & Guides",
    description:
      "Expert guides on winning hackathons from 36+ victories and $100K+ in prizes.",
  },
};

const blogListJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hackathon Blog",
  description:
    "Expert hackathon guides and strategies from 36+ victories.",
  url: `${BASE_URL}/blog`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: POSTS_BY_DATE_DESC.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-16">
      <JsonLd data={blogListJsonLd} />

      <nav className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
        >
          <Home className="size-3" />
          Home
        </Link>
        <span className="text-muted-foreground/40 font-code text-xs">/</span>
        <span className="font-code text-xs text-foreground">Blog</span>
      </nav>

      <header className="stagger-children space-y-6">
        <Badge className="border-volt/30 bg-volt/10 text-volt font-code text-xs">
          BLOG
        </Badge>
        <h1 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight md:text-7xl">
          Hackathon
          <br />
          <span className="text-primary">Guides & Tips</span>
        </h1>
        <p className="max-w-2xl font-body text-lg text-muted-foreground">
          Expert strategies and in-depth guides from 36+ hackathon wins and
          $100K+ in prizes. Whether you&apos;re a beginner or veteran, find
          actionable advice to win your next hackathon.
        </p>
        <Separator className="bg-primary/20" />
      </header>

      <div className="stagger-children grid grid-cols-1 gap-6">
        {POSTS_BY_DATE_DESC.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="glow-hover group cursor-pointer transition-all hover:border-volt/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Badge>
                  <span className="flex items-center gap-1 font-code text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {post.readingTime}
                  </span>
                </div>
                <CardTitle className="font-display text-xl transition-colors group-hover:text-volt md:text-2xl">
                  {post.title}
                </CardTitle>
                <CardDescription className="font-body text-sm">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.slice(0, 3).map((kw) => (
                    <Badge
                      key={kw}
                      variant="outline"
                      className="border-border font-code text-[10px] text-muted-foreground"
                    >
                      {kw}
                    </Badge>
                  ))}
                  <span className="ml-auto flex items-center gap-1 font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                    Read article <ArrowRight className="size-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

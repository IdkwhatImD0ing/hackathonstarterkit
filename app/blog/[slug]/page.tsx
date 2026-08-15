import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight, Home, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BLOG_POSTS,
  getBlogBySlug,
  getRecommendedBlogPosts,
} from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { BlogBlock } from "@/components/blog-blocks";
import { BlogAnalytics } from "@/components/blog-analytics";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      authors: ["Bill Zhang"],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const nextPost = BLOG_POSTS[currentIndex + 1];
  const prevPost = BLOG_POSTS[currentIndex - 1];
  const recommendedPosts = getRecommendedBlogPosts(slug, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Bill Zhang",
      url: "https://v2.art3m1s.me/",
      sameAs: [
        "https://github.com/IdkwhatImD0ing",
        "https://www.linkedin.com/in/bill-zhang1/",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Hackathon Playbook",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 space-y-12">
      <BlogAnalytics
        slug={post.slug}
        title={post.title}
        readingTime={post.readingTime}
      />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="space-y-6">
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
          >
            <Home className="size-3" />
            Home
          </Link>
          <span className="text-muted-foreground/40 font-code text-xs">/</span>
          <Link
            href="/blog"
            className="font-code text-xs text-muted-foreground transition-colors hover:text-volt"
          >
            Blog
          </Link>
          <span className="text-muted-foreground/40 font-code text-xs">/</span>
          <span className="font-code text-xs text-foreground line-clamp-1 max-w-[200px]">
            {post.title.split(":")[0]}
          </span>
        </nav>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Badge>
            <span className="flex items-center gap-1 font-code text-xs text-muted-foreground">
              <Clock className="size-3" />
              {post.readingTime}
            </span>
            {post.updatedDate ? (
              <span className="flex items-center gap-1 font-code text-xs text-volt">
                <RefreshCw className="size-3" />
                Updated{" "}
                {new Date(post.updatedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            ) : null}
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>

          <p className="font-body text-lg text-muted-foreground">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.keywords.map((kw) => (
              <Badge
                key={kw}
                variant="outline"
                className="border-border font-code text-[10px] text-muted-foreground"
              >
                {kw}
              </Badge>
            ))}
          </div>

          <Separator className="bg-primary/20" />
        </header>
      </div>

      <div className="space-y-10">
        {post.content.map((section, index) => (
          <section
            key={section.heading}
            data-blog-section={index}
            data-section-heading={section.heading}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {section.heading}
            </h2>
            {section.blocks
              ? section.blocks.map((block, i) => (
                  <BlogBlock key={i} block={block} />
                ))
              : section.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-body text-foreground/85 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
          </section>
        ))}
      </div>

      {/* End-of-article marker: the completion tracker observes this to
          distinguish readers who reached the end from those who bounced. */}
      <div data-blog-end aria-hidden="true" />

      <NewsletterSignup
        eyebrow="Get the next guide"
        title="Want more hackathon breakdowns like this?"
        description="Join the newsletter for practical build, pitch, and judging strategy from 36+ hackathon wins."
      />

      <Separator className="bg-primary/20" />

      <div className="space-y-6">
        <div className="glass rounded-xl border border-volt/20 bg-volt/5 p-6 text-center space-y-3">
          <p className="font-display text-lg font-bold">
            Ready to put these strategies into action?
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Explore the full 7-phase hackathon playbook with interactive tools
            and templates.
          </p>
          <Link
            href="/playbook"
            className="inline-block rounded-lg bg-volt px-6 py-3 font-display text-sm font-semibold text-volt-foreground transition-all hover:bg-volt/90"
          >
            Open the Playbook →
          </Link>
        </div>

        {recommendedPosts.length > 0 ? (
          <section className="space-y-4">
            <div className="space-y-1">
              <p className="font-code text-xs uppercase tracking-[0.2em] text-volt">
                Recommended next
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                More guides for where you are now
              </h2>
            </div>

            <div className="grid gap-4">
              {recommendedPosts.map((recommendedPost) => (
                <Link
                  key={recommendedPost.slug}
                  href={`/blog/${recommendedPost.slug}`}
                >
                  <Card className="glow-hover group transition-all hover:border-volt/30">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                          {new Date(recommendedPost.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </Badge>
                        <span className="flex items-center gap-1 font-code text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {recommendedPost.readingTime}
                        </span>
                        {recommendedPost.updatedDate ? (
                          <span className="flex items-center gap-1 font-code text-xs text-volt">
                            <RefreshCw className="size-3" />
                            Updated{" "}
                            {new Date(
                              recommendedPost.updatedDate,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        ) : null}
                      </div>
                      <CardTitle className="font-display text-lg transition-colors group-hover:text-volt">
                        {recommendedPost.title}
                      </CardTitle>
                      <CardDescription className="font-body text-sm">
                        {recommendedPost.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {recommendedPost.keywords.slice(0, 3).map((kw) => (
                          <Badge
                            key={kw}
                            variant="outline"
                            className="border-border font-code text-[10px] text-muted-foreground"
                          >
                            {kw}
                          </Badge>
                        ))}
                        <span className="ml-auto flex items-center gap-1 font-code text-xs text-volt opacity-0 transition-opacity group-hover:opacity-100">
                          Read next <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <nav className="flex items-center justify-between gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex items-center gap-2 font-code text-xs text-muted-foreground transition-colors hover:text-volt"
            >
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
              <span className="line-clamp-1">{prevPost.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex items-center gap-2 font-code text-xs text-muted-foreground transition-colors hover:text-volt text-right"
            >
              <span className="line-clamp-1">{nextPost.title}</span>
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}

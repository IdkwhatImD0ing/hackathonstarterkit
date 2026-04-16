import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BLOG_POSTS, getBlogBySlug } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { BlogBlock } from "@/components/blog-blocks";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://thehackathonplaybook.dev";

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
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
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
      name: "Hackathon Starter Kit",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
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
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 space-y-12">
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
          <div className="flex items-center gap-3">
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
        {post.content.map((section) => (
          <section key={section.heading} className="space-y-4">
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

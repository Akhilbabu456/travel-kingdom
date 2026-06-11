"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { blogPosts, type BlogPost } from "@/lib/blog-data";
import { Calendar, Clock, ArrowLeft, Heart, Send } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      // Find up to 3 related posts (excluding the current one)
      const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
      setRelated(relatedPosts);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <PageShell>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </PageShell>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <PageShell>
      {/* Blog Detail Article Section */}
      <article className="mx-auto max-w-4xl px-5 pt-28 pb-20 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
        </Link>

        {/* Header Block */}
        <header className="space-y-4 mb-8">
          <div className="inline-flex rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
            {post.category}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground border-t border-border pt-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readTime}
            </span>
            <span className="text-muted-foreground/30">|</span>
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-6 w-6 rounded-full object-cover border border-border"
              />
              <span className="font-semibold text-foreground">{post.author.name}</span>
              <span>({post.author.role})</span>
            </div>
          </div>
        </header>

        {/* Feature Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] border border-border shadow-luxe mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="space-y-8 text-foreground/90 text-base leading-relaxed sm:text-lg max-w-3xl mx-auto">
          {post.content.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              {section.sectionTitle && (
                <h2 className="font-display text-2xl sm:text-3xl text-foreground pt-4">
                  {section.sectionTitle}
                </h2>
              )}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
              {section.listItems && (
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                  {section.listItems.map((item, lIdx) => {
                    const parts = item.split(":");
                    if (parts.length > 1) {
                      return (
                        <li key={lIdx}>
                          <strong className="text-foreground">{parts[0]}:</strong>
                          {parts.slice(1).join(":")}
                        </li>
                      );
                    }
                    return <li key={lIdx}>{item}</li>;
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8 max-w-3xl mx-auto mt-16 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-16 w-16 rounded-full object-cover border-2 border-primary"
          />
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-display text-lg text-foreground">{post.author.name}</h4>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              {post.author.role}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alka and our holiday designers have over a decade of destination expertise. We assist
              travelers in Pune in selecting premium resorts, designing bespoke day plans, and
              configuring visa checklists.
            </p>
          </div>
        </div>

        {/* Inquiry CTA Banner */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-foreground/90 p-8 sm:p-12 text-white text-center shadow-luxe max-w-3xl mx-auto mt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <Heart className="h-8 w-8 text-primary-foreground mx-auto fill-current" />
            <h3 className="font-display text-2xl sm:text-3xl text-white">Inspired to travel?</h3>
            <p className="text-sm text-white/80 max-w-md mx-auto">
              Our travel specialists will map out a custom, stress-free itinerary based on this
              article. Get a quotation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-semibold text-primary hover:bg-muted transition"
            >
              Get Custom Quotation <Send className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>

      {/* Suggested / Related Articles */}
      {related.length > 0 && (
        <section className="bg-muted/40 py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h3 className="font-display text-2xl text-foreground text-center mb-12">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rPost) => (
                <div
                  key={rPost.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="relative aspect-[16/10] overflow-hidden block"
                  >
                    <img
                      src={rPost.image}
                      alt={rPost.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[9px] font-semibold text-white uppercase tracking-wider">
                      {rPost.category}
                    </div>
                  </Link>
                  <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                    <h4 className="font-display text-lg text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {rPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-border pt-4 mt-2 text-[10px] text-muted-foreground">
                      <span>{rPost.date}</span>
                      <Link
                        href={`/blog/${rPost.slug}`}
                        className="text-primary font-semibold hover:underline"
                      >
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

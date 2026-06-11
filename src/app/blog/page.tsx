"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { blogPosts, type BlogPost } from "@/lib/blog-data";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import heroImg from "@/assets/hero-kerala.jpg";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Luxury Travel", "Hidden Gems", "Travel Tips", "Wellness Escapes"];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <PageShell>
      <PageHero
        eyebrow="Kingdom Diaries"
        title="Travel Stories & Guides"
        sub="Inspiration, destination guides and expert travel checklists hand-crafted by our holiday designers."
        image={heroImg.src ?? heroImg}
      />

      {/* Category Filter Menu */}
      <section className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No articles found in this category. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-[16/10] overflow-hidden block"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-white uppercase tracking-wider">
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-8 w-8 rounded-full object-cover border border-border"
                      />
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          {post.author.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{post.author.role}</div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Guide CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-secondary p-8 sm:p-12 text-secondary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <BookOpen className="h-10 w-10 text-primary mx-auto" />
            <h2 className="font-display text-3xl text-white">Need a detailed destination guide?</h2>
            <p className="text-sm text-white/70 max-w-md mx-auto">
              Our travel specialists have maps, checklist documents, and offline guides for over 50+
              countries. Get in touch to schedule a boutique call.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
            >
              Plan with a Designer
            </Link>
          </div>
        </div>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

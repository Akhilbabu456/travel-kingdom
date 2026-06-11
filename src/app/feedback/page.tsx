"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { Star, Send, ShieldCheck, Heart, MessageSquare, Edit3, Quote, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-kerala.jpg";
import { testimonials } from "@/lib/testimonials-data";

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<"reviews" | "submit">("reviews");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", bookingRef: "", comments: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", bookingRef: "", comments: "" });
      setRating(5);
    }, 1500);
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Reviews & Feedback"
        title="Stories from the Road"
        sub="Read real, verified reviews from families, honeymooners, and groups who have traveled with us, or share your own holiday feedback."
        image={heroImg.src ?? heroImg}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {/* Premium Sliding Tabs Selector */}
        <div className="flex justify-center mb-12">
          <div className="relative flex rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setActiveTab("reviews")}
              className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === "reviews" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Traveler Reviews ({testimonials.length})
            </button>
            <button
              onClick={() => setActiveTab("submit")}
              className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === "submit" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit3 className="h-4 w-4" />
              Submit Your Feedback
            </button>
            {/* Sliding Highlight Background */}
            <motion.div
              layoutId="tab-highlight"
              className="absolute inset-y-1 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              style={{
                left: activeTab === "reviews" ? 4 : "auto",
                right: activeTab === "submit" ? 4 : "auto",
                width: activeTab === "reviews" ? "195px" : "190px",
              }}
            />
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "reviews" ? (
            <motion.div
              key="reviews-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Masonry Grid */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full">
                {testimonials.map((t) => {
                  const cleanedName = t.name.replace(" (Duplicate)", "");
                  return (
                    <div
                      key={t.id}
                      className="mb-6 break-inside-avoid rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group"
                    >
                      <Quote className="absolute right-4 top-4 h-12 w-12 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none" />
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm uppercase">
                          {cleanedName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-semibold text-foreground capitalize">
                            {cleanedName}
                          </h4>
                          {t.title && (
                            <span className="text-[10px] uppercase font-semibold text-primary tracking-wider">
                              {t.title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                        "{t.testimonial}"
                      </p>

                      {t.source_url && (
                        <div className="mt-4 border-t border-border/50 pt-3 flex justify-between items-center text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            Verified Review <Heart className="h-3 w-3 text-primary fill-primary" />
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="submit-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="rounded-[2.5rem] border border-border bg-card p-6 sm:p-10 shadow-luxe">
                <h2 className="font-display text-2xl text-foreground text-center mb-2">
                  Rate Your Journey
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm mx-auto">
                  From planning calls in Pune to local support on tour, we value your feedback.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <ShieldCheck className="h-10 w-10" />
                    </div>
                    <h3 className="font-display text-2xl text-foreground">
                      Thank You for Your Feedback!
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Your review has been successfully logged. We appreciate you taking the time to share your travel story.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
                    >
                      Submit another review
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    {/* Star Rating selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase text-center block">
                        Overall Rating
                      </label>
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((starVal) => {
                          const isFilled =
                            hoverRating !== null ? starVal <= hoverRating : starVal <= rating;
                          return (
                            <button
                              key={starVal}
                              type="button"
                              onClick={() => setRating(starVal)}
                              onMouseEnter={() => setHoverRating(starVal)}
                              onMouseLeave={() => setHoverRating(null)}
                              className="text-3xl sm:text-4xl transition-transform active:scale-95 focus:outline-none cursor-pointer"
                            >
                              <Star
                                className={`h-8 w-8 transition-colors ${
                                  isFilled ? "fill-primary text-primary" : "text-muted-foreground/30"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        Booking Reference / Trip (Optional)
                      </label>
                      <input
                        type="text"
                        value={form.bookingRef}
                        onChange={(e) => setForm({ ...form, bookingRef: e.target.value })}
                        placeholder="e.g. TK-8942 / Bali Honeymoon"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        Your Review & Comments
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={form.comments}
                        onChange={(e) => setForm({ ...form, comments: e.target.value })}
                        placeholder="What did you love? How can we make your next trip even more flawless?"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-full shadow-glow hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send Feedback
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Trust Badge Section */}
      <section className="bg-muted/40 py-16 text-center border-t border-border">
        <div className="mx-auto max-w-xl px-5 space-y-4">
          <Heart className="h-10 w-10 text-primary mx-auto" />
          <h3 className="font-display text-xl text-foreground">Our Customer Commitment</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every review is read directly by our Director, Rohit Kumar Gupta, and our Pune operations
            team. We use your insights to optimize our flight desks and partner hotel standards.
          </p>
        </div>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { Star, Send, ShieldCheck, Heart } from "lucide-react";
import heroImg from "@/assets/hero-kerala.jpg";

export default function FeedbackPage() {
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
        eyebrow="Share Your Experience"
        title="We value your feedback."
        sub="Your insights help us refine our custom itineraries and premium concierge assistance."
        image={heroImg.src ?? heroImg}
      />

      <section className="mx-auto max-w-2xl px-5 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-10 shadow-luxe">
          <h2 className="font-display text-2xl text-foreground text-center mb-2">Rate Your Journey</h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm mx-auto">
            From the initial planning calls in Pune to touchdown support abroad, tell us how we did.
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
              <h3 className="font-display text-2xl text-foreground">Thank You for Your Feedback!</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your review has been successfully logged. We appreciate you taking the time to share your holiday story.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
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
                    const isFilled = hoverRating !== null ? starVal <= hoverRating : starVal <= rating;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="text-3xl sm:text-4xl transition-transform active:scale-95 focus:outline-none"
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
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Your Name</label>
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
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
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
                <label className="text-xs font-semibold text-muted-foreground uppercase">Booking Reference / Trip (Optional)</label>
                <input
                  type="text"
                  value={form.bookingRef}
                  onChange={(e) => setForm({ ...form, bookingRef: e.target.value })}
                  placeholder="e.g. TK-8942 / Bali Honeymoon"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Your Review & Comments</label>
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
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
      </section>

      {/* Trust Badge Section */}
      <section className="bg-muted/40 py-16 text-center">
        <div className="mx-auto max-w-xl px-5 space-y-4">
          <Heart className="h-10 w-10 text-primary mx-auto" />
          <h3 className="font-display text-xl text-foreground">Our Customer Commitment</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every review is read directly by our Director, Rohit Kumar Gupta, and our concierge team. We use your insights to optimize our supplier standards and flight desks.
          </p>
        </div>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

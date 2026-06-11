"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { Briefcase, Send, ShieldCheck, MapPin, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/hero-kerala.jpg";

export default function CareersPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Travel Designer",
    cover: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openPositions = [
    {
      title: "Travel Consultant & Designer",
      type: "Full-Time",
      location: "Aundh, Pune (On-Site)",
      desc: "Design custom luxury itineraries for international destinations (Maldives, Europe, Dubai). Coordinate flights, accommodations, and local logistics with global partner desks.",
      requirements:
        "2-4 years experience in travel sales or itinerary mapping. Excellent communication and destination knowledge.",
    },
    {
      title: "Visa Operations Specialist",
      type: "Full-Time",
      location: "Aundh, Pune (On-Site)",
      desc: "Manage document verification, portal uploads, cover letter drafts, and appointment slot bookings for Schengen, US, UK, and major international visas.",
      requirements:
        "Deep understanding of document audits, financial checklist rules, and embassy portal configurations.",
    },
    {
      title: "Client Relationship Manager",
      type: "Full-Time",
      location: "Aundh, Pune (On-Site)",
      desc: "Lead customer support and coordinate 24/7 concierge assistance during ongoing holiday tours. Manage feedback loops and foster repeat corporate clients.",
      requirements:
        "Strong empathy, problem-solving, and coordination skills. Travel industry experience is a major plus.",
    },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", role: "Travel Designer", cover: "" });
    }, 1500);
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Join the Kingdom"
        title="Careers at Travel Kingdom"
        sub="We believe in creating holidays that feel like cinema. Join our team of travel designers in Pune."
        image={heroImg.src ?? heroImg}
      />

      {/* Culture Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our Culture
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              We Craft Freedom, Not Just Ticketing.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At Travel Kingdom, we are not automated ticket bookers. We are advisors, writers, and
              designers. We believe in replacing travel anxiety with absolute, pure joy. Our team
              culture is centered on continuous learning, destination scouting, customer obsession,
              and mutual growth.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-foreground">Scouting Trips</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Star className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-foreground">Premium Incentives</div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-luxe space-y-6">
            <h3 className="font-display text-2xl text-foreground">Apply Online</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h4 className="font-display text-xl text-foreground">Application Submitted</h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Thank you for applying! Our HR team will review your qualifications and reach out
                  if there is a match.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Apply for another role
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 99999 99999"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Role of Interest
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary appearance-none"
                  >
                    <option>Travel Designer</option>
                    <option>Visa Operations Specialist</option>
                    <option>Client Relationship Manager</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Cover Note / Experience
                  </label>
                  <textarea
                    rows={3}
                    value={form.cover}
                    onChange={(e) => setForm({ ...form, cover: e.target.value })}
                    placeholder="Briefly tell us about your experience in booking flights, managing visas, or customizing tours..."
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-glow hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
                      <Send className="h-4 w-4" /> Send Application
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Open Positions list */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Openings
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              Current Open Positions
            </h2>
            <p className="text-muted-foreground">
              We are hiring across multiple disciplines in our Pune office.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((pos) => (
              <div
                key={pos.title}
                className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4 mb-4">
                  <div>
                    <h3 className="font-display text-xl text-foreground">{pos.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="font-semibold text-primary">{pos.type}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {pos.location}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setForm((f) => ({
                        ...f,
                        role: pos.title.includes("Visa")
                          ? "Visa Operations Specialist"
                          : pos.title.includes("Relationship")
                            ? "Client Relationship Manager"
                            : "Travel Designer",
                      }));
                      window.scrollTo({ top: 500, behavior: "smooth" });
                    }}
                    className="self-start sm:self-center px-4 py-2 rounded-full border border-primary text-primary text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition"
                  >
                    Apply Now
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                      Job Description
                    </h4>
                    <p className="text-sm text-foreground/85 mt-1 leading-relaxed">{pos.desc}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                      Requirements
                    </h4>
                    <p className="text-sm text-foreground/85 mt-1 leading-relaxed">
                      {pos.requirements}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

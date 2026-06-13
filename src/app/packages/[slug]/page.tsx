"use client";

import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
  User,
  Send,
  CheckCircle2,
} from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { inr } from "@/lib/data";
import { fetchPackageBySlug, submitInquiry, type ApiPackage } from "@/lib/api";
import { Reveal } from "@/components/site/reveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const router = useRouter();

  const [pkg, setPkg] = useState<ApiPackage | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [inquirySent, setInquirySent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPackageBySlug(slug).then((res) => {
      setPkg(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <PageShell>
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </PageShell>
    );
  }

  if (!pkg) {
    notFound();
  }

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const success = await submitInquiry({
      full_name: name,
      email: email,
      phone: phone,
      inquiry_type: "package",
      message: `Inquiry for package: ${pkg.title} (${pkg.duration} Nights). Travelers: ${travelers}`,
      package: {
        package_id: String(pkg.id),
        travelers: parseInt(travelers) || 2,
        travel_date: travelDate,
        duration: pkg.duration,
      },
    });

    setSubmitting(false);
    if (success) {
      setInquirySent(true);
      setTimeout(() => {
        setInquirySent(false);
        setName("");
        setEmail("");
        setPhone("");
        setTravelDate("");
      }, 5000);
    } else {
      alert("Something went wrong. Please try again or call us.");
    }
  };

  const costValue = pkg.cost?.cost;
  const mainImage =
    pkg.images && pkg.images.length > 0
      ? pkg.images[0]
      : "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80";

  return (
    <PageShell>
      {/* Banner / Hero Section */}
      <section className="relative isolate flex min-h-[75vh] items-end overflow-hidden pt-20">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={mainImage}
          alt={pkg.title}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-background" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              <Clock className="h-3.5 w-3.5 text-primary" /> {pkg.duration} Nights /{" "}
              {pkg.duration + 1} Days
            </div>
            <h1 className="font-display text-4xl text-white text-balance sm:text-6xl max-w-4xl capitalize">
              {pkg.title.toLowerCase()}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/90">
              {pkg.overview || `Experience the ultimate escape to ${pkg.destinations.join(", ")}.`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        {/* Left Column: Itinerary Details */}
        <div>
          <Reveal>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">Tour Itinerary</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every day is customizable to match your timing, transfers, and preferences.
            </p>
          </Reveal>

          {/* Day by Day List */}
          <div className="mt-10 space-y-8">
            {pkg.itineraries.map((day, idx) => {
              const dayTitle = day.title || `Day ${day.day_number}: Sightseeing & Leisure`;
              return (
                <Reveal
                  key={day.id}
                  delay={idx * 0.05}
                  className="relative pl-8 border-l border-border/80 pb-2"
                >
                  <div className="absolute -left-[9px] top-1.5 h-4.5 w-4.5 rounded-full border-2 border-primary bg-background" />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Day {day.day_number}
                    </span>
                    {day.meal && day.meal.length > 0 && (
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase">
                        Meals: {day.meal.join(", ")}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-2xl text-foreground">{dayTitle}</h3>
                  {day.description && (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {day.description}
                    </p>
                  )}

                  {/* Sightseeing Items with Thumbnails */}
                  {day.sightseeings && day.sightseeings.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {day.sightseeings.map((s, sIdx) => {
                        const ssThumbnail =
                          s.images ||
                          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&h=200&q=80";
                        return (
                          <div
                            key={sIdx}
                            className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-xs"
                          >
                            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                              <img
                                src={ssThumbnail}
                                alt={s.title}
                                className="absolute inset-0 h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&h=200&q=80";
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm text-foreground truncate">
                                {s.title}
                              </h4>
                              <p className="text-[11px] text-muted-foreground/80 truncate mb-1">
                                {s.city}
                              </p>
                              {s.description && (
                                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                  {s.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          {/* Inclusions and Exclusions tabs */}
          {(pkg.inclusions || pkg.exclusions) && (
            <Reveal className="mt-16 border-t border-border pt-12">
              <h3 className="font-display text-2xl text-foreground">Inclusions & Exclusions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                {pkg.inclusions && (
                  <div className="rounded-3xl border border-border bg-card p-6">
                    <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3 text-primary">
                      Inclusions
                    </h4>
                    <div
                      className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: pkg.inclusions }}
                    />
                  </div>
                )}
                {pkg.exclusions && (
                  <div className="rounded-3xl border border-border bg-card p-6">
                    <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3 text-destructive">
                      Exclusions
                    </h4>
                    <div
                      className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: pkg.exclusions }}
                    />
                  </div>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {/* Right Column: Pricing & Inquiry Form */}
        <aside>
          <div className="sticky top-28 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-luxe">
              <div className="py-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Exclusive Offer
                </div>
                <div className="font-display text-2xl leading-snug text-foreground">
                  Inquire Now to Unlock the Best Deals
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Contact us for private rates and offline resort tariffs.
                </p>
              </div>

              {/* Inquiry Form */}
              <div className="mt-6 border-t border-border pt-6">
                <h4 className="font-display text-lg text-foreground mb-4">Request Callback</h4>

                {inquirySent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 p-4"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                    <h5 className="font-semibold text-emerald-950 text-sm">Inquiry Submitted!</h5>
                    <p className="text-xs text-emerald-800">
                      Our travel specialist is checking package schedules and will WhatsApp you
                      within 15 minutes.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-xs outline-none focus:border-primary text-foreground"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-xs outline-none focus:border-primary text-foreground"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-xs outline-none focus:border-primary text-foreground"
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-xs outline-none focus:border-primary text-foreground"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                        Number of Travellers
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full rounded-2xl border border-border bg-background py-3 px-4 text-xs outline-none focus:border-primary text-foreground"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4+ Adults</option>
                        <option value="family">Family (Kids incl.)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition"
                    >
                      {submitting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" /> Request Quotation
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-muted/30 p-5 text-xs text-muted-foreground space-y-3.5">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" /> Verified Package Guarantee
              </div>
              <p>
                We work directly with certified operators, local resort owners, and verified flight
                desks to assure comfort and FEMA compliance.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

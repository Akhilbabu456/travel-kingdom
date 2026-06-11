"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Sun, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PackageCard } from "@/components/site/package-card";
import { Reveal, Stagger, staggerItem } from "@/components/site/reveal";
import { Newsletter } from "@/components/site/newsletter";
import { inr } from "@/lib/data";
import { fetchLocations, fetchPackages, type Destination, type Package } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  const [destination, setDestination] = useState<Destination | null>(null);
  const [relatedPackages, setRelatedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchLocations(), fetchPackages()]).then(([locs, pkgs]) => {
      const d = locs.find((x) => x.slug === slug);
      if (d) {
        setDestination(d);
        // Find packages that contain this destination name
        const related = pkgs.filter(
          (p) =>
            p.destination.toLowerCase().includes(d.name.toLowerCase()) ||
            d.name.toLowerCase().includes(p.destination.toLowerCase()),
        );
        setRelatedPackages(related.slice(0, 3));
      }
      setLoading(false);
    });
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

  if (!destination) {
    notFound();
  }

  const d = destination;

  return (
    <PageShell>
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden pt-20">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={d.image}
          alt={d.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/85" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              <MapPin className="h-3 w-3" /> {d.country} · {d.region}
            </div>
            <h1 className="font-display text-5xl text-white text-balance sm:text-7xl">{d.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">{d.tagline}</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">Overview</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {d.name} is one of {d.region}'s most cinematic escapes — a place that rewards the
              unhurried traveller. From private guides to quiet-season hotels, we shape every detail
              around your pace. Enjoy custom sightseeing, premium lodging, and local culinary
              trails.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-10 font-display text-2xl text-foreground">Top Attractions</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Iconic landmarks",
                "Local cuisine trail",
                "Sunset viewpoint",
                "Cultural experience",
                "Hidden gem walk",
                "Photography spots",
              ].map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm"
                >
                  <Sparkles className="h-4 w-4 text-primary" /> {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <h3 className="mt-10 font-display text-2xl text-foreground">Best Time to Visit</h3>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
              <Sun className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground/80">
                October – March offers the most pleasant weather and the quietest hotels.
              </span>
            </div>
          </Reveal>
        </div>
        <aside>
          <div className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-luxe">
            {d.fromPrice ? (
              <>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  starting from
                </div>
                <div className="mt-1 font-display text-4xl text-foreground">
                  ₹{inr(d.fromPrice)}
                </div>
                <div className="text-xs text-muted-foreground">per person · {d.nights} nights</div>
              </>
            ) : (
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
            )}
            <Link
              href={`/contact?dest=${d.name}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              Inquire Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary"
            >
              Customise This Trip
            </Link>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" /> Free cancellation up to 30 days
            </div>
          </div>
        </aside>
      </section>

      {relatedPackages.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Packages in {d.name}
          </h2>
          <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPackages.map((p) => (
              <motion.div key={p.slug} variants={staggerItem}>
                <PackageCard p={p} />
              </motion.div>
            ))}
          </Stagger>
        </section>
      )}
      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

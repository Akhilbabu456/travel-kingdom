"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { DestinationCard } from "@/components/site/destination-card";
import { Stagger, staggerItem } from "@/components/site/reveal";
import { Newsletter } from "@/components/site/newsletter";
import { fetchLocations, type Destination } from "@/lib/api";

const cats = ["All", "Beach", "Mountain", "City", "Heritage", "Honeymoon", "Hidden Gems"] as const;

export default function Page() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchLocations().then((res) => {
      setDestinations(res);
      setLoading(false);
    });
  }, []);

  const list = useMemo(() => {
    return destinations.filter(
      (d) =>
        (cat === "All" || d.category === cat) &&
        (q === "" ||
          d.name.toLowerCase().includes(q.toLowerCase()) ||
          d.country.toLowerCase().includes(q.toLowerCase())),
    );
  }, [destinations, cat, q]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Destinations"
        title="An Atlas of Escapes"
        sub="Hand-picked places we'd happily revisit — sorted by mood, not marketing."
        image="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1920&q=80"
      >
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl p-5 sm:p-6 shadow-2xl transition-all duration-300 bg-black/75 sm:glass-dark border border-white/20">
          <div className="flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 bg-white/15 text-white border border-white/10 focus-within:bg-white/25 focus-within:border-white/30">
            <Search className="h-5 w-5 shrink-0 text-[#e07a1b] sm:text-white" />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.12em] font-bold pb-0.5 text-white/80">
                Search Destinations
              </div>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold outline-none focus:ring-0 placeholder:text-white/60 text-white [color-scheme:dark]"
                placeholder="Where to? (e.g., Maldives, Bali)"
              />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  cat === c
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "border border-border bg-card text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-3xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <Stagger
              key={`${cat}-${q}`}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {list.map((d) => (
                <motion.div key={d.slug} variants={staggerItem}>
                  <DestinationCard d={d} />
                </motion.div>
              ))}
            </Stagger>
            {list.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">
                No destinations match your search.
              </p>
            )}
          </>
        )}
      </section>
      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

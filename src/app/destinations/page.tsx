"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { DestinationCard } from "@/components/site/destination-card";
import { Stagger, staggerItem } from "@/components/site/reveal";
import { Newsletter } from "@/components/site/newsletter";
import { destinations } from "@/lib/data";
import heroImg from "@/assets/hero-switzerland.jpg";

const cats = ["All", "Beach", "Mountain", "City", "Heritage", "Honeymoon"] as const;

export default function Page() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => destinations.filter((d) =>
    (cat === "All" || d.category === cat) &&
    (q === "" || d.name.toLowerCase().includes(q.toLowerCase()) || d.country.toLowerCase().includes(q.toLowerCase()))
  ), [cat, q]);

  return (
    <PageShell>
      <PageHero eyebrow="Destinations" title="An atlas of escapes." sub="Hand-picked places we'd happily revisit — sorted by mood, not marketing." image={heroImg.src ?? heroImg} />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground shadow-glow" : "border border-border bg-card text-foreground/80 hover:border-primary hover:text-primary"}`}>{c}</button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations" className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-primary" />
          </div>
        </div>
        <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <motion.div key={d.slug} variants={staggerItem}><DestinationCard d={d} /></motion.div>
          ))}
        </Stagger>
        {list.length === 0 && <p className="mt-12 text-center text-muted-foreground">No destinations match your search.</p>}
      </section>
      <div className="pb-24"><Newsletter /></div>
    </PageShell>
  );
}

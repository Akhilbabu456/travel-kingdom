"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { PackageCard } from "@/components/site/package-card";
import { Stagger, staggerItem } from "@/components/site/reveal";
import { Newsletter } from "@/components/site/newsletter";
import { ServicesNav } from "@/components/site/services-nav";
import { packages } from "@/lib/data";
import heroImg from "@/assets/hero-maldives.jpg";

const cats = ["All", "Honeymoon", "Family", "Luxury", "Adventure", "Group"] as const;
const sorts = [
  { k: "popular", label: "Most popular" },
  { k: "low", label: "Price · low to high" },
  { k: "high", label: "Price · high to low" },
  { k: "short", label: "Shortest first" },
] as const;

export default function Page() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]["k"]>("popular");

  const list = useMemo(() => {
    let l = packages.filter((p) => cat === "All" || p.category === cat);
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "short") l = [...l].sort((a, b) => a.nights - b.nights);
    if (sort === "popular") l = [...l].sort((a, b) => b.reviews - a.reviews);
    return l;
  }, [cat, sort]);

  return (
    <PageShell>
      <PageHero eyebrow="Tour packages" title="Holidays you can step straight into." sub="Every package is a starting point — tweak any night, any hotel, any flight. We make it fit you." image={heroImg.src ?? heroImg} />
      
      <ServicesNav />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground shadow-glow" : "border border-border bg-card text-foreground/80 hover:border-primary hover:text-primary"}`}>{c}</button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as (typeof sorts)[number]["k"])} className="rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-primary">
            {sorts.map((s) => <option key={s.k} value={s.k}>{s.label}</option>)}
          </select>
        </div>
        <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <motion.div key={p.slug} variants={staggerItem}><PackageCard p={p} /></motion.div>)}
        </Stagger>
      </section>
      <div className="pb-24"><Newsletter /></div>
    </PageShell>
  );
}

"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { PackageCard } from "@/components/site/package-card";
import { Stagger, staggerItem } from "@/components/site/reveal";
import { Newsletter } from "@/components/site/newsletter";
import { ServicesNav } from "@/components/site/services-nav";
import { fetchPackages, type Package } from "@/lib/api";

const cats = ["All", "Honeymoon", "Family", "Luxury", "Adventure", "Group", "Hidden Gems"] as const;
const sorts = [
  { k: "popular", label: "Most Popular" },
  { k: "low", label: "Price · Low to High" },
  { k: "high", label: "Price · High to Low" },
  { k: "short", label: "Shortest First" },
] as const;

function PackagesContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const searchCat = searchParams.get("category") || "All";

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]["k"]>("popular");

  // Sync category filter from query params
  useEffect(() => {
    if (searchCat && cats.includes(searchCat as any)) {
      setCat(searchCat as any);
    }
  }, [searchCat]);

  useEffect(() => {
    fetchPackages().then((res) => {
      setPackages(res);
      setLoading(false);
    });
  }, []);

  const list = useMemo(() => {
    let l = packages.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sort === "low") l = [...l].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "high") l = [...l].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    if (sort === "short") l = [...l].sort((a, b) => a.nights - b.nights);
    if (sort === "popular") l = [...l].sort((a, b) => b.reviews - a.reviews);

    return l;
  }, [packages, cat, sort, searchQuery]);

  return (
    <>
      <PageHero
        eyebrow="Tour Packages"
        title="Holidays You Can Step Straight Into"
        sub={
          searchQuery
            ? `Search results for "${searchQuery}"`
            : "Every package is a starting point — tweak any night, any hotel, any flight. We make it fit you."
        }
        image="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80"
      />

      <ServicesNav />

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
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof sorts)[number]["k"])}
            className="rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-primary text-foreground"
          >
            {sorts.map((s) => (
              <option key={s.k} value={s.k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 rounded-3xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <Stagger key={`${cat}-${sort}-${searchQuery}`} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <motion.div key={p.slug} variants={staggerItem}>
                  <PackageCard p={p} />
                </motion.div>
              ))}
            </Stagger>
            {list.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">
                No tour packages match your search filter.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default function Page() {
  return (
    <PageShell>
      <Suspense
        fallback={
          <div className="flex min-h-[80vh] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        }
      >
        <PackagesContent />
      </Suspense>
      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

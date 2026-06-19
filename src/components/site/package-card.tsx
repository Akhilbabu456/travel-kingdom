import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, MapPin } from "lucide-react";
import { inr, type Package } from "@/lib/data";

export function PackageCard({ p }: { p: Package }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group flex flex-col h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-luxe"
    >
      <Link href={`/packages/${p.slug}`} className="flex flex-col flex-1">
        <div className="relative aspect-[5/4] overflow-hidden shrink-0">
          <img
            src={(p.image as any)?.src ?? p.image}
            alt={p.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-foreground">
            <Star className="h-3 w-3 fill-primary text-primary" /> {p.rating} · {p.reviews}
          </div>
          <div className="absolute right-4 top-4 inline-flex rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
            {p.category}
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {p.destination}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {p.nights}N / {p.days}D
            </span>
          </div>
          <h3 className="mt-2 font-display text-xl text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {p.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5 flex-1 content-start">
            {p.highlights.slice(0, 3).map((h, idx) => (
              <span
                key={`${h}-${idx}`}
                className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 shrink-0">
            <div>
              <span className="font-display text-xs text-primary font-semibold">
                Available on Request
              </span>
            </div>
            <span className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

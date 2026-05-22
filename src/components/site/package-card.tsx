import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, MapPin } from "lucide-react";
import { inr, type Package } from "@/lib/data";

export function PackageCard({ p }: { p: Package }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-luxe">
      <Link href={`/packages/${p.slug}`} className="block">
        <div className="relative aspect-[5/4] overflow-hidden">
          <img src={p.image?.src ?? p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-foreground">
            <Star className="h-3 w-3 fill-primary text-primary" /> {p.rating} · {p.reviews}
          </div>
          <div className="absolute right-4 top-4 inline-flex rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
            {p.category}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.destination}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.nights}N / {p.days}D</span>
          </div>
          <h3 className="mt-2 font-display text-xl text-foreground transition-colors group-hover:text-primary">{p.title}</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.highlights.slice(0, 3).map((h) => (
              <span key={h} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{h}</span>
            ))}
          </div>
          <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">starting from</div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl text-foreground">₹{inr(p.price)}</span>
                {p.oldPrice && <span className="text-sm text-muted-foreground line-through">₹{inr(p.oldPrice)}</span>}
              </div>
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
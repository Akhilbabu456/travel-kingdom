import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { inr, type Destination } from "@/lib/data";

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group"
    >
      <Link
        href={`/destinations/${d.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe"
      >
        <img
          src={(d.image as any)?.src ?? d.image}
          alt={d.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
          {d.category}
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div className="text-white">
            <div className="flex items-center gap-1 text-[12px] text-white/75">
              <MapPin className="h-3 w-3" /> {d.country}
            </div>
            <div className="font-display text-2xl">{d.name}</div>
            <div className="mt-1 max-w-[18ch] text-sm text-white/80">{d.tagline}</div>
          </div>
        </div>
        <div className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-all duration-500 group-hover:rotate-45">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </Link>
    </motion.div>
  );
}

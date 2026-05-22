import { motion } from "framer-motion";

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-secondary px-8 py-16 text-secondary-foreground sm:px-14 lg:px-20"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-[oklch(0.78_0.11_80/0.25)] blur-[140px]" />
        <div className="relative grid items-end gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80">Newsletter</div>
            <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">Wanderlust, every Friday.</h2>
            <p className="mt-3 max-w-md text-white/70">Hand-picked itineraries, secret openings and quiet seasonal deals. Zero spam — pinky promise.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@email.com" className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/45 outline-none focus:border-primary" />
            <button className="rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5">Subscribe</button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
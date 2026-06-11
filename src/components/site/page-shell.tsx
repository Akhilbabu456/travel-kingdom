import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { WhatsAppFab } from "./whatsapp-fab";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  sub,
  image,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  image: any;
}) {
  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden pt-20">
      <img
        src={image?.src ?? image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-background" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 lg:px-8">
        {eyebrow && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
            {eyebrow}
          </div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl leading-[1.02] text-white text-balance sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}

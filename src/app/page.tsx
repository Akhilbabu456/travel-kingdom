"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, ShieldCheck, Sparkles, Compass, Heart, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { SearchWidget } from "@/components/site/search-widget";
import { DestinationCard } from "@/components/site/destination-card";
import { PackageCard } from "@/components/site/package-card";
import { Reveal, Stagger, staggerItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Counter } from "@/components/site/counter";
import { Newsletter } from "@/components/site/newsletter";
import { heroSlides, destinations, packages, testimonials, stats, galleryImages } from "@/lib/data";
import { ServicesNav } from "@/components/site/services-nav";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <TopBar />
      <ServicesNav />
      <FeaturedDestinations />
      <TrendingPackages />
      <WhyUs />
      <Stats />
      <Testimonials />
      <Storytelling />
      <GalleryPreview />
      <CtaBand />
      <div className="pb-24"><Newsletter /></div>
    </PageShell>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % heroSlides.length), 6500);
    return () => clearInterval(t);
  }, []);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 160]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.12]);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }}>
          <motion.img style={{ y, scale }} src={heroSlides[i].image.src ?? heroSlides[i].image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-40 lg:px-8 lg:pb-20">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.8 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              <Sparkles className="h-3 w-3 text-primary" /> {heroSlides[i].eyebrow}
            </div>
            <h1 className="max-w-4xl whitespace-pre-line font-display text-[2.75rem] leading-[1.02] text-white text-balance sm:text-6xl lg:text-[5.5rem]">
              {heroSlides[i].title}
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">{heroSlides[i].subtitle}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/packages" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5">
            Explore packages
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/custom-tour" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10">
            Plan a custom trip
          </Link>
          <div className="ml-2 flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-3 bg-white/40"}`} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SearchWidget floating />
        </div>
      </div>
    </section>
  );
}

function TopBar() {
  const bars = [
    { k: "12K+", v: "Happy travellers" },
    { k: "4.8★", v: "Google rating" },
    { k: "24/7", v: "Concierge" },
    { k: "2011", v: "Crafting since" },
  ];
  return (
    <section className="border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-6 text-center text-sm sm:grid-cols-4 lg:px-8">
        {bars.map((b) => (
          <div key={b.v} className="flex items-center justify-center gap-3">
            <span className="font-display text-2xl text-primary">{b.k}</span>
            <span className="text-white/70">{b.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedDestinations() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Featured destinations" title="Places we'd return to in a heartbeat" sub="A curated atlas of escapes — hand-tested by our team, scored on quiet, beauty and value." />
        <Link href="/destinations" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.slice(0, 6).map((d) => (
          <motion.div key={d.slug} variants={staggerItem}>
            <DestinationCard d={d} />
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}

function TrendingPackages() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 lg:px-8">
      <SectionHeading eyebrow="Trending now" title="Holidays our travellers are loving" />
      <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {packages.slice(0, 4).map((p) => (
          <motion.div key={p.slug} variants={staggerItem}>
            <PackageCard p={p} />
          </motion.div>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center">
        <Link href="/packages" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary">
          See all packages <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Award, t: "Award-winning concierge", d: "Hand-picked stays, private guides and quiet-season slots most agencies can't unlock." },
    { icon: ShieldCheck, t: "Zero-surprise pricing", d: "Every rupee accounted for upfront — taxes, transfers, tips, the lot." },
    { icon: Compass, t: "Designed, not packaged", d: "Itineraries written by humans who've actually walked the streets you'll walk." },
    { icon: Heart, t: "Stay-anywhere 24/7", d: "A real human in your time-zone, every hour of the trip. No bots, no queues." },
  ];
  return (
    <section className="relative mt-28 overflow-hidden bg-grain py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Why Travel Kingdom" title="The quiet difference of a properly designed trip." />
        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }) => (
            <motion.div key={t} variants={staggerItem} className="rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-warm text-white shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-foreground">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-border bg-card p-8 shadow-luxe sm:grid-cols-4 sm:p-12">
        {stats.map((s) => (
          <Reveal key={s.label} className="text-center">
            <div className="font-display text-4xl text-foreground sm:text-5xl">
              <Counter value={s.value} decimals={(s as { decimals?: number }).decimals ?? 0} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (n: number) => setI((x) => (x + n + testimonials.length) % testimonials.length);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % testimonials.length), 7500);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="mx-auto mt-28 max-w-7xl px-5 lg:px-8">
      <SectionHeading eyebrow="Travellers say" title="Trips that became stories." />
      <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-secondary p-10 text-secondary-foreground sm:p-16">
        <Quote className="absolute right-10 top-10 h-24 w-24 text-primary/15" />
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55 }}>
            <div className="flex gap-1">{Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-primary text-primary" />)}</div>
            <p className="mt-6 max-w-3xl font-display text-2xl leading-[1.35] text-white sm:text-3xl">"{t.quote}"</p>
            <div className="mt-6 text-sm text-white/70"><span className="font-medium text-white">{t.name}</span> · {t.trip}</div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex items-center gap-2">
          <button onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10"><ChevronRight className="h-5 w-5" /></button>
          <div className="ml-4 flex gap-1.5">
            {testimonials.map((_, k) => <button key={k} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-3 bg-white/30"}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Storytelling() {
  return (
    <section className="mx-auto mt-28 grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
      <Reveal>
        <div className="relative">
          <img src={heroSlides[1].image.src ?? heroSlides[1].image} alt="Kerala backwaters at sunrise" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-luxe" loading="lazy" />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 -top-6 hidden rounded-2xl glass p-4 shadow-luxe sm:block">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Trip designer</div>
            <div className="mt-1 font-display text-lg">Priya M.</div>
            <div className="text-xs text-muted-foreground">Specialist · India & Maldives</div>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 -left-6 rounded-2xl bg-primary p-4 text-primary-foreground shadow-glow">
            <div className="text-[10px] uppercase tracking-wider opacity-80">Concierge response</div>
            <div className="mt-1 font-display text-2xl">{"<"}11 min</div>
          </motion.div>
        </div>
      </Reveal>
      <div>
        <SectionHeading eyebrow="Our craft" title="A travel atelier, not a booking engine." sub="We've been quietly designing trips since 2011 — one family, one couple, one honeymoon at a time. No call centres, no copy-paste itineraries, no surprises." />
        <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
          <Link href="/about" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground">Our story <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/testimonials" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary">Read reviews</Link>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryPreview() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-5 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Gallery" title="Postcards from the road." />
        <Link href="/gallery" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex">Open gallery <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {galleryImages.slice(0, 8).map((img, idx) => (
          <Reveal key={idx} delay={idx * 0.04}>
            <div className={`relative overflow-hidden rounded-2xl ${idx % 5 === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
              <img src={img.src ?? img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="mx-auto mt-28 mb-10 max-w-7xl px-5 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary px-8 py-20 text-center sm:px-16">
        <img src={heroSlides[0].image.src ?? heroSlides[0].image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/85 via-secondary/70 to-secondary/95" />
        <div className="relative mx-auto max-w-2xl text-white">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">Your next chapter starts<br />with a single call.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-white/80">Tell us where your mind drifts on a Tuesday afternoon. We'll design the rest.</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/custom-tour" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow">Plan my trip <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10">Talk to a specialist</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

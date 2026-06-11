"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Sparkles,
  Compass,
  Heart,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  MapPin,
} from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { SearchWidget } from "@/components/site/search-widget";
import { DestinationCard } from "@/components/site/destination-card";
import { PackageCard } from "@/components/site/package-card";
import { Reveal, Stagger, staggerItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Counter } from "@/components/site/counter";
import { Newsletter } from "@/components/site/newsletter";
import { heroSlides, testimonials, stats, inr } from "@/lib/data";
import { ServicesNav } from "@/components/site/services-nav";
import {
  fetchLocations,
  fetchPackages,
  fetchThemes,
  type Destination,
  type Package,
  type ApiTheme,
} from "@/lib/api";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <TopBar />
      <ServicesNav />
      <FeaturedDestinations />
      <TrendingPackages />
      <VisaFreeDestinations />
      <FindYourPerfectTrip />
      <WhyUs />
      <StatsSection />
      <Testimonials />
      <Storytelling />
      <GalleryPreview />
      <CtaBand />
      <div className="pb-24">
        <Newsletter />
      </div>
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
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        >
          <motion.img
            style={{ y, scale }}
            src={heroSlides[i].image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-40 lg:px-8 lg:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              <Sparkles className="h-3 w-3 text-primary" /> {heroSlides[i].eyebrow}
            </div>
            <h1 className="max-w-4xl whitespace-pre-line font-display text-[2.75rem] leading-[1.02] text-white text-balance sm:text-6xl lg:text-[5.5rem]">
              {heroSlides[i].title}
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              {heroSlides[i].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/packages"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
          >
            Explore Packages
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
          >
            Plan a Custom Trip
          </Link>
          <div className="ml-2 flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-3 bg-white/40"}`}
              />
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
    { k: "12K+", v: "Happy Travellers" },
    { k: "4.8★", v: "Google Rating" },
    { k: "24/7", v: "Personal Assistance" },
    { k: "2011", v: "Curating Holidays Since" },
  ];
  return (
    <section className="border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid grid-cols-2 gap-4 px-5 py-6 text-center text-sm sm:grid-cols-4 lg:px-8">
        {bars.map((b) => (
          <div key={b.v} className="flex items-center justify-center gap-3">
            <span className="font-display text-2xl text-primary">{b.k}</span>
            <span className="text-white/70 text-xs sm:text-sm">{b.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedDestinations() {
  const [list, setList] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations().then((res) => {
      setList(res.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Featured Destinations"
          title="Places We Love & Recommend"
          sub="A curated atlas of escapes — hand-tested by our team, scored on beauty, safety, and comfort."
        />
        <Link
          href="/destinations"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-3xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <motion.div key={d.slug} variants={staggerItem}>
              <DestinationCard d={d} />
            </motion.div>
          ))}
        </Stagger>
      )}
    </section>
  );
}

function TrendingPackages() {
  const [list, setList] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages({ limit: 4 }).then((res) => {
      setList(res.slice(0, 4));
      setLoading(false);
    });
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 lg:px-8">
      <SectionHeading
        eyebrow="Trending Now"
        title="Holidays Our Travellers Are Loving"
        sub="Trending curated tour packages combining seamless flights, verified hotels, and local sightseeing."
      />

      {loading ? (
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 rounded-3xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <motion.div key={p.slug} variants={staggerItem}>
              <PackageCard p={p} />
            </motion.div>
          ))}
        </Stagger>
      )}
      <Reveal className="mt-10 text-center">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
        >
          See All Packages <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

function VisaFreeDestinations() {
  const [list, setList] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations().then((res) => {
      // Maldives, Bhutan, Bali, Thailand, etc. are visa-free / visa-on-arrival
      const visaFreeKeywords = [
        "maldives",
        "bhutan",
        "bali",
        "thailand",
        "indonesia",
        "nepal",
        "sri lanka",
      ];
      const filtered = res.filter((d) =>
        visaFreeKeywords.some(
          (kw) => d.name.toLowerCase().includes(kw) || d.country.toLowerCase().includes(kw),
        ),
      );
      setList(filtered.slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Explore Visa-Free Destinations"
          title="International Trips Made Easy"
          sub="Skip the consulate queues and secure slots. Travel hassle-free to breathtaking global locales."
        />
        <Link
          href="/destinations?category=Beach"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex"
        >
          Explore More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-3xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d) => (
              <motion.div key={d.slug} variants={staggerItem}>
                <DestinationCard d={d} />
              </motion.div>
            ))}
          </Stagger>
          <p className="mt-6 text-xs text-muted-foreground italic">
            * Note: For Indian passport holders, Singapore is not a visa-free country. E-visa
            applications are required prior to departure. We provide full visa processing support.
          </p>
        </>
      )}
    </section>
  );
}

function FindYourPerfectTrip() {
  const [themes, setThemes] = useState<ApiTheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThemes().then((res) => {
      setThemes(res.slice(0, 4));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-5 pt-28 lg:px-8">
        <SectionHeading
          eyebrow="Find Your Perfect Trip"
          title="Exclusive Journeys Curated for You"
          sub="Select a travel theme and discover packages optimized for your ideal vacation style."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-72 rounded-[2rem] bg-muted animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 lg:px-8">
      <SectionHeading
        eyebrow="Find Your Perfect Trip"
        title="Exclusive Journeys Curated for You"
        sub="Select a travel theme and discover packages optimized for your ideal vacation style."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((t, idx) => {
          const image =
            t.images ||
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80";
          const link = `/packages?q=${encodeURIComponent(t.name)}`;
          return (
            <Reveal
              key={t.id}
              delay={idx * 0.05}
              className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="relative h-40 overflow-hidden rounded-2xl mb-4">
                <img
                  src={image}
                  alt={t.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                {t.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {t.description || "Curated experiences and packages designed for this theme."}
              </p>
              <Link
                href={link}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Explore packages →
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    {
      icon: Award,
      t: "Award-winning Concierge",
      d: "Hand-picked stays, private guides, and exclusive off-peak slots most automated booking portals cannot unlock.",
    },
    {
      icon: ShieldCheck,
      t: "Zero-surprise Pricing",
      d: "Every single charge accounted for upfront — taxes, transfer fees, custom guides, and meals included.",
    },
    {
      icon: Compass,
      t: "Designed by Specialists",
      d: "Personalized itineraries written by seasoned travel designers who have actually visited the locations.",
    },
    {
      icon: Heart,
      t: "24/7 WhatsApp Concierge",
      d: "A dedicated human specialist in your timezone, ready to coordinate check-ins, delays, or emergencies on the fly.",
    },
  ];
  return (
    <section className="relative mt-28 overflow-hidden bg-grain py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why Travel Kingdom"
          title="The Quiet Luxury of a Handcrafted Journey"
        />
        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }) => (
            <motion.div
              key={t}
              variants={staggerItem}
              className="rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe"
            >
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

function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-border bg-card p-8 shadow-luxe sm:grid-cols-4 sm:p-12">
        {stats.map((s) => (
          <Reveal key={s.label} className="text-center">
            <div className="font-display text-4xl text-foreground sm:text-5xl">
              <Counter
                value={s.value}
                decimals={(s as { decimals?: number }).decimals ?? 0}
                suffix={s.suffix}
              />
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </div>
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
      <SectionHeading eyebrow="Travellers say" title="Journeys that became lifelong stories." />
      <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-secondary p-10 text-secondary-foreground sm:p-16">
        <Quote className="absolute right-10 top-10 h-24 w-24 text-primary/15" />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="mt-6 max-w-3xl font-display text-2xl leading-[1.35] text-white sm:text-3xl">
              "{t.quote}"
            </p>
            <div className="mt-6 text-sm text-white/70">
              <span className="font-medium text-white">{t.name}</span> · {t.trip}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-4 flex gap-1.5">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-3 bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Storytelling() {
  return (
    <section className="mx-auto mt-28 grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
      {/* Enlarge Image Container by making it take up 7 columns out of 12 */}
      <Reveal className="lg:col-span-7">
        <div className="relative">
          <img
            src={heroSlides[1].image}
            alt="Kerala backwaters at sunrise"
            className="aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-luxe"
            loading="lazy"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 -top-4 hidden rounded-2xl glass p-4 shadow-luxe sm:block"
          >
            <div className="mt-1 font-display text-lg">Priya M.</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 rounded-2xl bg-primary p-4 text-primary-foreground shadow-glow"
          >
            <div className="mt-1 font-display text-2xl">{"<"}11 min</div>
          </motion.div>
        </div>
      </Reveal>
      {/* Text takes up 5 columns */}
      <div className="lg:col-span-5 space-y-6">
        <SectionHeading
          eyebrow="Our Craft"
          title="A Travel Atelier, Not a Booking Engine"
          sub="We have been quietly designing and curating bespoke holiday packages from Pune since 2011. No automated bots, no call centres, and no copy paste templates. Just purely customized itineraries built around your pace, taste, and style."
        />
        <Reveal delay={0.2} className="flex flex-wrap gap-3">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            Our Story <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/past-tours"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary"
          >
            Read Reviews
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryPreview() {
  // Let's use nice Unsplash links for gallery preview
  const gallery = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=500&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&h=500&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1599661046289-e318878567c4?auto=format&fit=crop&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&h=500&q=80",
  ];

  return (
    <section className="mx-auto mt-28 max-w-7xl px-5 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Gallery" title="Postcards from the Road" />
        <Link
          href="/past-tours"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex"
        >
          Open Gallery <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {gallery.map((img, idx) => (
          <Reveal key={idx} delay={idx * 0.04}>
            <div
              className={`relative overflow-hidden rounded-2xl ${idx % 5 === 0 ? "aspect-[4/5]" : "aspect-square"}`}
            >
              <img
                src={img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
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
        <img
          src={heroSlides[0].image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/85 via-secondary/70 to-secondary/95" />
        <div className="relative mx-auto max-w-2xl text-white">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">
              Your next chapter starts with a single call.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-white/80">
              Tell us where your mind drifts on a Tuesday afternoon. We'll design the rest.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Plan My Trip <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+919860874848"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10"
              >
                Talk to a Specialist
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

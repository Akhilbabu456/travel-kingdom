"use client";

import { motion } from "framer-motion";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { Star, Award, MapPin, Users, Heart, Camera, ExternalLink } from "lucide-react";
import heroImg from "@/assets/hero-switzerland.jpg";

export default function PastToursPage() {
  const stats = [
    { value: "12,000+", label: "Happy Travellers" },
    { value: "15+", label: "Years of Experience" },
    { value: "4.8 ★", label: "Google Rating (1,200+ Reviews)" },
    { value: "20+", label: "Prestigious Awards" },
  ];

  const awards = [
    {
      title: "Best Luxury Travel Designer 2024",
      issuer: "National Travel Excellence Awards",
      year: "2024",
      desc: "Awarded for designing bespoke, high-end international packages with concierge integration.",
    },
    {
      title: "Most Trusted Tour Operator in Western India",
      issuer: "India Travel Awards",
      year: "2023",
      desc: "Recognized for service quality, customer retention, and direct local desk support.",
    },
    {
      title: "Excellence in Visa Facilitation",
      issuer: "Consular Services Forum",
      year: "2022",
      desc: "Acknowledged for exceptional document audit checks and higher visa approval rates.",
    },
  ];

  const stories = [
    {
      title: "Cinematic Honeymoon in the Maldives",
      client: "Pooja & Sameer Mehta",
      location: "Maldives (Centara Grand Resort)",
      image:
        "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=800&q=80",
      quote:
        "From the sunset villa upgrade to private beach dinners, Travel Kingdom managed everything. Our concierge desk answered us instantly on WhatsApp throughout the trip.",
      rating: 5,
    },
    {
      title: "Alpine Adventure through Switzerland",
      client: "Deshpande Family (4 Adults)",
      location: "Switzerland (Zurich, Zermatt, Interlaken)",
      image:
        "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
      quote:
        "Travelling with senior citizens is always stressful, but Rohit's team made it easy. Wheelchair support, direct transfers, and stays right next to train stations were perfect.",
      rating: 5,
    },
    {
      title: "Hidden Gems & Cultural Escape",
      client: "Meera & Rahul Sen",
      location: "Bhutan (Thimphu, Paro Valley)",
      image:
        "https://images.unsplash.com/photo-1548263599-9fb1557d99cd?auto=format&fit=crop&w=800&q=80",
      quote:
        "Tiger's Nest was a dream come true. The guide provided by Travel Kingdom was knowledgeable, and our premium hotel bookings in Paro exceeded all expectations.",
      rating: 5,
    },
    {
      title: "Corporate Retreat in Dubai",
      client: "Vertex Solutions (30 Pax)",
      location: "Dubai (Atlantis The Palm)",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      quote:
        " Flawless corporate offsite coordination. Flights, conference bookings, yacht dinners, and desert safaris were managed punctually. Exceptional professionalism.",
      rating: 5,
    },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Trust & Credibility"
        title="Our Past Tours & Stories"
        sub="Discover how we turn complex travel logs into custom, stress-free journeys for thousands of clients."
        image={heroImg.src ?? heroImg}
      />

      {/* Stats Summary Panel */}
      <section className="mx-auto max-w-7xl px-5 -mt-10 relative z-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-[2rem] border border-border bg-card/90 shadow-luxe backdrop-blur-xl p-6 sm:p-8">
          {stats.map((st) => (
            <div key={st.label} className="text-center p-2">
              <div className="font-display text-3xl sm:text-4xl text-primary font-semibold">
                {st.value}
              </div>
              <div className="text-[11px] font-semibold text-muted-foreground uppercase mt-2 tracking-wider">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photographic Stories Grid */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Camera className="h-4 w-4" /> Traveller Galleries
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground">
            Stories From the Field
          </h2>
          <p className="text-muted-foreground">
            A small glimpse into real travel logs, custom highlights, and reviews shared by our
            happy clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={story.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-sm hover:shadow-luxe transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <div className="flex items-center gap-1 text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                    <MapPin className="h-3.5 w-3.5" /> {story.location}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-white">{story.title}</h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: story.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                  "{story.quote}"
                </blockquote>
                <div className="flex items-center justify-between border-t border-border pt-4 text-xs font-semibold">
                  <span className="text-foreground">{story.client}</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    Verified Stay <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-muted/40 py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Award className="h-4 w-4" /> Recognitions
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground">
                20+ Prestigious Awards & Accolades
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Since our inception in 2011, Travel Kingdom has been consistently recognized by
                travel forums and consular services for operational excellence, high visa safety,
                and client retention.
              </p>
              <div className="inline-flex gap-4 items-center p-4 rounded-2xl bg-card border border-border">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    12,000+ Journeys Curated
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Trusted by families, honeymooners and groups
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {awards.map((aw, idx) => (
                <motion.div
                  key={aw.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg text-foreground leading-tight">
                        {aw.title}
                      </h3>
                      <span className="text-xs font-bold text-primary shrink-0">{aw.year}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">{aw.issuer}</div>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed mt-2">
                      {aw.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review CTA Section */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 text-center space-y-6">
        <h2 className="font-display text-3xl text-foreground">Travelled with us recently?</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Share your holiday review and photos to help other Pune families plan their stress-free
          dream escapes.
        </p>
        <a
          href="/feedback"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition cursor-pointer"
        >
          Submit Holiday Review <ExternalLink className="h-4 w-4" />
        </a>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

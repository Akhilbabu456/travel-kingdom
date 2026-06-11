"use client";

import { motion } from "framer-motion";
import { Compass, ShieldCheck, Award, HeartHandshake, MapPin, Users, Star } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Stagger, staggerItem } from "@/components/site/reveal";
import { Newsletter } from "@/components/site/newsletter";
import heroImg from "@/assets/hero-kerala.jpg";

export default function AboutPage() {
  const stats = [
    { value: "12,000+", label: "Happy Customers" },
    { value: "2011", label: "Year Established" },
    { value: "4.8 ★", label: "Google Rating" },
    { value: "24/7", label: "Personal Support" },
  ];

  const coreValues = [
    {
      icon: Compass,
      title: "Hand-Crafted Itineraries",
      desc: "Every holiday is customized from scratch to align with your taste, pace, and dream travel style.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted & Certified",
      desc: "Providing secure flight bookings, reliable visa assistance, and official forex exchange services.",
    },
    {
      icon: Award,
      title: "15 Years of Premium Travel",
      desc: "Our experience since 2011 guarantees deep destination expertise and a premium network of hotels.",
    },
    {
      icon: HeartHandshake,
      title: "Concierge-Led Support",
      desc: "From takeoff to touchdown, our dedicated concierge team is just a single WhatsApp message away.",
    },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Story"
        title="From Concern to Freedom"
        sub="Designing bespoke domestic and international journeys from Pune since 2011."
        image={heroImg.src ?? heroImg}
      />

      {/* History & Identity Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Who We Are
            </div>
            <h2 className="font-display text-4xl text-foreground sm:text-5xl">
              Crafting Premium Holidays That Linger in Memory
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              At **Travel Kingdom**, we believe that travel is not just about visiting new
              coordinates; it is about absolute freedom. Established in 2011 in Pune by Rohit Kumar
              Gupta, we have spent over a decade shifting the travel booking experience from an
              automated chore to a cinematic, tailored art.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Whether you are planning a romantic overwater villa stay in the Maldives, an Ayurvedic
              retreat in Kerala, an Alpine train journey through Switzerland, or a dynamic desert
              getaway in Dubai, our seasoned travel designers handle every single detail—flights,
              premium lodging, transfers, and activities—with uncompromising care.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row pt-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-semibold">
                    Headquartered in
                  </div>
                  <div className="text-sm font-semibold text-foreground">Pune, Maharashtra</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-semibold">
                    Founder & Director
                  </div>
                  <div className="text-sm font-semibold text-foreground">Rohit Kumar Gupta</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Display Grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col justify-center rounded-3xl border border-border bg-card/60 p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="font-display text-4xl text-primary sm:text-5xl">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why Travel Kingdom
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              What Sets Our Experiences Apart
            </h2>
            <p className="text-muted-foreground">
              We design itineraries centered on comfort, personalized details, and zero worries.
            </p>
          </div>

          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  variants={staggerItem}
                  className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-luxe"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg text-foreground">{val.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-foreground/90 p-8 sm:p-16 text-white text-center shadow-luxe max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="flex justify-center gap-1 text-primary-foreground/80">
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
            </div>
            <blockquote className="font-display text-2xl sm:text-3xl leading-relaxed italic">
              "We take the burden of complex logistics off your shoulders, replacing it with the
              simple, pure joy of exploration. Our promise is 'From Concern to Freedom'."
            </blockquote>
            <cite className="block text-sm uppercase tracking-wider text-white/80 font-semibold not-italic">
              — Rohit Kumar Gupta, Founder
            </cite>
          </motion.div>
        </div>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

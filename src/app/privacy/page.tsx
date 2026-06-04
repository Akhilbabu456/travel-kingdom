"use client";

import { motion } from "framer-motion";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { ShieldCheck, Eye, Database, Share2, Lock } from "lucide-react";
import heroImg from "@/assets/hero-kerala.jpg";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content:
        "We collect personal details necessary to plan and finalize your travel arrangements. This includes your name, email, phone number, physical address, passport details (for international travel), dates of birth, and financial billing credentials.",
    },
    {
      icon: Database,
      title: "2. How We Use Your Data",
      content:
        "Your data is used strictly to process flight tickets, secure hotel stays, compile visa checklists, and coordinate foreign exchange notes. We also use your contact details to provide flight status notifications and 24/7 concierge assistance.",
    },
    {
      icon: Share2,
      title: "3. Information Sharing",
      content:
        "We share passenger details only with airlines, lodging partners, destination managers, visa hubs, and forex partners directly involved in fulfilling your bookings. We do not sell or trade your personal information to third-party marketing companies.",
    },
    {
      icon: Lock,
      title: "4. Data Security & Storage",
      content:
        "Travel Kingdom implements robust security measures including digital encryption, access logs, and secure local databases to protect passport copies and financial information. Data is stored strictly in compliance with applicable Indian safety laws.",
    },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal Policies"
        title="Privacy Policy"
        sub="Learn how we protect, store, and process your travel documents and personal information."
        image={heroImg.src ?? heroImg}
      />

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <div className="space-y-12">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base text-muted-foreground leading-relaxed">
              At Travel Kingdom, protecting your personal data is a foundational value. This policy governs how we collect, handle, and secure information provided by you on our site or directly to our consultants at our Pune office.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <motion.div
                  key={sec.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-xl text-foreground">{sec.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{sec.content}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="rounded-3xl bg-muted/50 p-6 text-center border border-border">
            <h4 className="font-display text-lg text-foreground mb-2">Your Privacy Questions Answered</h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mb-4">
              If you have any questions about how your passport copies are handled or would like to request data deletion, contact our privacy desk.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Privacy Support
            </a>
          </div>
        </div>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

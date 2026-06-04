"use client";

import { motion } from "framer-motion";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { Scale, FileText, ShieldAlert, Coins, HelpCircle } from "lucide-react";
import heroImg from "@/assets/hero-kerala.jpg";

export default function TermsPage() {
  const sections = [
    {
      icon: Scale,
      title: "1. Agreement to Terms",
      content:
        "By accessing our website or booking travel services through Travel Kingdom, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, you must not use our services.",
    },
    {
      icon: FileText,
      title: "2. Booking & Confirmation Policies",
      content:
        "All bookings, including flight tickets, hotel reservations, visa processing, and customized holiday packages, are subject to availability at the time of reservation. A booking is only confirmed once we receive the required deposit and issue a written confirmation voucher.",
    },
    {
      icon: Coins,
      title: "3. Payments, Changes & Cancellation Fees",
      content:
        "Payment schedules and deposit requirements vary by tour and will be communicated at the time of booking. Cancellation charges depend directly on airline, hotel, and supplier policies. Any cancellation requests must be submitted in writing. Travel Kingdom reserves the right to charge reasonable administrative service fees for modifications.",
    },
    {
      icon: ShieldAlert,
      title: "4. Passports, Visas & Consular Approvals",
      content:
        "Travelers are solely responsible for possessing passports valid for at least six (6) months beyond their return date, along with all necessary visas, health certificates, and permits. Travel Kingdom acts strictly as an assistance provider for visas and is not liable for embassy delays, rejections, or consular decisions.",
    },
    {
      icon: HelpCircle,
      title: "5. Limitations of Liability & Disclaimers",
      content:
        "Travel Kingdom acts as an agent for airlines, hotels, transport operators, and local activity suppliers. We are not liable for injury, loss, damage, delay, or expense resulting from circumstances beyond our control (force majeure), including weather disruptions, strikes, political unrest, or supplier insolvencies.",
    },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal Policies"
        title="Terms & Conditions"
        sub="Please review the rules, policies, and guidelines that govern our travel booking services."
        image={heroImg.src ?? heroImg}
      />

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <div className="space-y-12">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base text-muted-foreground leading-relaxed">
              Welcome to Travel Kingdom. These Terms and Conditions outline the rules and regulations for the use of our services, both online and at our travel boutique in Pune. By using our website and services, we assume you accept these terms in full.
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
            <h4 className="font-display text-lg text-foreground mb-2">Have questions about our terms?</h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mb-4">
              Get in touch with our operations team in Pune to clarify any questions regarding booking policies, deposits, or insurance.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Contact Desk
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

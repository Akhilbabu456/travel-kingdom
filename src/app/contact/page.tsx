"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/page-shell";
import { Newsletter } from "@/components/site/newsletter";
import { submitInquiry } from "@/lib/api";
import heroImg from "@/assets/hero-switzerland.jpg";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", dest: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await submitInquiry({
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      inquiry_type: "contact",
      message: `Contact Enquiry / Custom Tour for ${form.dest}. Message: ${form.msg}`,
      contact: {
        subject: `Custom Tour Planning to ${form.dest}`,
        service_type: "custom_tour",
        number_of_people: 1,
        preferred_date: null
      }
    });
    setSubmitting(false);
    if (success) {
      setSent(true);
      setForm({ name: "", email: "", phone: "", dest: "", msg: "" });
    } else {
      alert("Failed to submit enquiry. Please check your details and try again.");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call or WhatsApp",
      details: ["+91 98608 74848", "020-2588 4848"],
      link: "tel:+919860874848",
    },
    {
      icon: Mail,
      title: "Email Assistance",
      details: ["travelkingdomindia@gmail.com"],
      link: "mailto:travelkingdomindia@gmail.com",
    },
    {
      icon: MapPin,
      title: "Our Travel Boutique",
      details: [
        "Office No. 3, Surmani Society, 1st Floor, Above IndusInd Bank,",
        "Ambedkar Chowk, Opp. DAV School, Aundh, Pune - 411007",
      ],
      link: "https://maps.google.com/?q=Travel+Kingdom+Aundh+Pune",
    },
    {
      icon: Clock,
      title: "Consultation Hours",
      details: ["Monday - Saturday: 10:00 AM - 7:30 PM", "Sunday: Closed (On-Trip Support Active)"],
    },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Get in Touch"
        title="We are listening."
        sub="Let our concierge designers map out your upcoming escape. Drop in or call us."
        image={heroImg.src ?? heroImg}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column: Info Cards */}
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Contact Details
              </span>
              <h2 className="font-display text-3xl text-foreground">
                Visit Our Pune Boutique or Reach Out Anytime
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you need advice on complex visas, corporate retreats, custom honeymoon arrangements, or instant forex, our specialists are ready to guide you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="flex gap-4 rounded-2xl border border-border bg-card/50 p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{info.title}</h3>
                      <div className="mt-1 space-y-0.5 text-xs text-muted-foreground leading-relaxed">
                        {info.details.map((d, idx) => (
                          <div key={idx}>{d}</div>
                        ))}
                      </div>
                      {info.link && (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
                        >
                          Get Directions / Call →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-10 shadow-luxe">
              <h3 className="font-display text-2xl text-foreground mb-6">Plan Your Custom Journey</h3>
              
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-display text-xl text-foreground">Inquiry Sent Successfully!</h4>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    Thank you for reaching out. A Travel Kingdom holiday designer will contact you within the next 2 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 99999 99999"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="dest" className="text-xs font-semibold text-muted-foreground uppercase">Dream Destination</label>
                      <input
                        id="dest"
                        type="text"
                        required
                        value={form.dest}
                        onChange={(e) => setForm({ ...form, dest: e.target.value })}
                        placeholder="Maldives, Switzerland, Bali..."
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="msg" className="text-xs font-semibold text-muted-foreground uppercase">Tell us about your trip plans</label>
                    <textarea
                      id="msg"
                      rows={4}
                      value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      placeholder="Share dates, travelers, special occasions (e.g. Honeymoon) or any customization requests..."
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Map Embed Section */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem] border border-border shadow-luxe h-[450px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.261226767568!2d73.8058284759616!3d18.562234067905146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf3650cfd9c3%3A0xe21fcfb29759ad26!2sIndusInd%20Bank!5e0!3m2!1sen!2sin!4v1716382103494!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Travel Kingdom Pune Office Location Map"
            />
          </div>
        </div>
      </section>

      <div className="pb-24"><Newsletter /></div>
    </PageShell>
  );
}

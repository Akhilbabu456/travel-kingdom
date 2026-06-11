"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/site/page-shell";
import { ServicesNav } from "@/components/site/services-nav";
import { Newsletter } from "@/components/site/newsletter";
import { submitInquiry } from "@/lib/api";
import {
  Globe,
  FileText,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Award,
  Heart,
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass,
} from "lucide-react";

// Visa Page Hero Slides matching the live website
const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Fast & Reliable",
    title: "Fast & Reliable\nVisa Services",
    subtitle:
      "Simplify your travel plans with our expert visa consultants. From documentation to approval, we ensure a smooth and stress-free process.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Passport Assistance",
    title: "Passport Assistance\nMade Easy",
    subtitle:
      "From fresh applications to hassle-free renewals, our dedicated team takes care of every detail for your passport needs.",
  },
];

const faqs = [
  {
    q: "What countries can I apply for visas through Travel Kingdom?",
    a: "We assist with visa applications for over 50+ countries. This includes Schengen states (Europe), USA, UK, Canada, UAE (Dubai), Singapore, Malaysia, Thailand, and Australia. We manage both sticker visas and electronic e-visas.",
  },
  {
    q: "What documents are generally required for a tourist visa?",
    a: "Standard requirements include a passport with 6 months validity, passport-size color photographs, confirmed roundtrip flights, hotel vouchers, international travel insurance, bank statements, and income tax returns (ITR).",
  },
  {
    q: "How early should I apply for my travel visa?",
    a: "We highly recommend starting the visa process at least 4 to 6 weeks before your intended travel date. This allows ample time for secure visa slot booking, document reviews, embassy processing, and handling delays.",
  },
  {
    q: "What is included in your passport assistance package?",
    a: "Our assistance covers new passport applications, renewals, and name change replacements. We manage the online document uploads, government fee payments, appointment scheduling, and prep guidelines for your Passport Seva Kendra visit.",
  },
];

const testimonials = [
  {
    name: "Shweta Rane",
    rating: 5,
    trip: "Schengen Visa Approval",
    quote:
      "Applied for my Schengen visa through Travel Kingdom. They guided me thoroughly on the complicated financial documentation, arranged early biometrics appointments, and I got the visa within a week without any hassle. Exceptional guidance!",
  },
  {
    name: "Ramesh Choudhary",
    rating: 5,
    trip: "Urgent Passport Renewal",
    quote:
      "I had to renew my passport urgently for an unexpected business trip. Travel Kingdom helped me with the complete paperwork, Tatkaal application, and immediate appointment booking. Received my passport at home in record time.",
  },
  {
    name: "Aditya Roy",
    rating: 5,
    trip: "UK Visa Support",
    quote:
      "Highly professional UK visa assistance. The team gave crystal-clear instructions, cross-checked all our bank logs and employment letters, and kept us constantly updated. Really reassuring service throughout.",
  },
];

export default function VisaPage() {
  const [slideIdx, setSlideIdx] = useState(0);

  // Hero slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Form States
  const [nationality, setNationality] = useState("Indian");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [visaType, setVisaType] = useState("Tourist Visa");
  const [passportStatus, setPassportStatus] = useState("Valid");

  // Lead inquiry modal/state
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquirerName, setInquirerName] = useState("");
  const [inquirerPhone, setInquirerPhone] = useState("");
  const [inquirerEmail, setInquirerEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Testimonial State
  const [testIdx, setTestIdx] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInquiry(true);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const success = await submitInquiry({
      full_name: inquirerName,
      email: inquirerEmail,
      phone: inquirerPhone,
      inquiry_type: "visa",
      message: `Visa Enquiry for ${destination} from nationality ${nationality}. Passport status: ${passportStatus}. Travel Date: ${travelDate}. Category: ${visaType}.`,
      visa: {
        nationality: nationality,
        destination_country: destination,
        visa_type: visaType.toLowerCase().replace(" ", "") as any,
        passport_status: passportStatus.toLowerCase().includes("valid")
          ? "valid"
          : passportStatus.toLowerCase().includes("expired")
            ? "expired"
            : ("not_issued" as any),
        travel_date: travelDate,
      },
    });

    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowInquiry(false);
        setDestination("");
        setTravelDate("");
        setInquirerName("");
        setInquirerPhone("");
        setInquirerEmail("");
      }, 4000);
    } else {
      alert("Failed to submit enquiry. Please double check your details and try again.");
    }
  };

  return (
    <PageShell>
      {/* Services Sub-Navigation tabs */}
      <ServicesNav />

      {/* Dynamic Hero Slider */}
      <section className="relative min-h-[70vh] w-full overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIdx}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <img
              src={heroSlides[slideIdx].image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8 text-white w-full">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              <Sparkles className="h-3 w-3 text-primary" /> {heroSlides[slideIdx].eyebrow}
            </div>
            <h1 className="font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl whitespace-pre-line">
              {heroSlides[slideIdx].title}
            </h1>
            <p className="mt-4 text-base text-white/85 sm:text-lg max-w-xl">
              {heroSlides[slideIdx].subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visa Booking Form Widget */}
      <section className="mx-auto max-w-5xl px-5 -mt-16 relative z-20">
        <div className="rounded-3xl border border-border bg-card/90 shadow-luxe backdrop-blur-xl p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground mb-6">Check Visa Requirements</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Nationality
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indian"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Destination Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Where do you need a visa for?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Dropdowns row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Visa Category
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    <option>Tourist Visa</option>
                    <option>Business Visa</option>
                    <option>Student Visa</option>
                    <option>Transit Visa</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Current Passport Status
                </label>
                <select
                  value={passportStatus}
                  onChange={(e) => setPassportStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                >
                  <option>Valid (More than 6 months)</option>
                  <option>Expiring Soon (Less than 6 months)</option>
                  <option>Expired (Needs Renewal)</option>
                  <option>Fresh (Never Issued)</option>
                </select>
              </div>
            </div>

            {/* Form Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 cursor-pointer"
              >
                Check Requirements
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Inquiry Modal Popup */}
      <AnimatePresence>
        {showInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl border border-border p-8 max-w-md w-full shadow-luxe relative"
            >
              <button
                onClick={() => setShowInquiry(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl"
              >
                &times;
              </button>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">Inquiry Logged</h3>
                  <p className="text-sm text-muted-foreground">
                    Our certified visa consultant is checking slot availability for{" "}
                    <span className="font-semibold">{destination}</span> visa submissions. We'll
                    contact you within a business hour.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-foreground">
                      Speak with a Visa Specialist
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Avoid expensive application rejections. We cross-verify checklists, pre-fill
                      embassy portals, and arrange biometrics slots securely.
                    </p>
                  </div>
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={inquirerName}
                        onChange={(e) => setInquirerName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        WhatsApp Mobile
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquirerPhone}
                        onChange={(e) => setInquirerPhone(e.target.value)}
                        placeholder="+91 99999 99999"
                        className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={inquirerEmail}
                        onChange={(e) => setInquirerEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-full shadow-glow hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Verify Document Checklist"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Why Choose Us Section */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Expert Consultants
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground">
            Why Choose Our Visa & Passport Services?
          </h2>
          <p className="text-muted-foreground">
            Key reasons why travelers choose us to secure their international entry permits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Expert Guidance</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our seasoned consultants specialize in embassy rules, financial checklists, and
              interview preparation to assure success.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Wide Coverage</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Visa processing across 50+ sovereign countries, Schengen sticker permits, and
              immediate digital e-visas.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Secure Handling</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              All passports, financial records, bank statements, and biometric logins are kept
              strictly confidential.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Fast Processing</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Direct and expedited booking profiles for emergency applications, family tours, and
              business biometrics.
            </p>
          </div>
        </div>
      </section>

      {/* Visa & Passport Services detail */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Full-Suite Support
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              Our Premium Visa & Passport Services
            </h2>
            <p className="text-muted-foreground">
              Explore how we secure your paperwork and guide you through consular appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Visa Application</h4>
              <p className="text-sm text-muted-foreground">
                We handle the complete online form filling, embassy slot bookings, fee transactions,
                and cover letter drafts.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Passport Concierge</h4>
              <p className="text-sm text-muted-foreground">
                Hassle-free filing for fresh passports, Tatkaal renewals, address updates, name
                corrections, and minor profiles.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Document Audit</h4>
              <p className="text-sm text-muted-foreground">
                Meticulous audit of financial credentials, flight/hotel bookings, bank drafts, and
                letters to assure zero faults.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Interview Prep</h4>
              <p className="text-sm text-muted-foreground">
                Mock question drills and structural guidelines for US, UK, and Schengen visa
                consular interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs & Testimonials Split */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* FAQs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="font-display text-3xl text-foreground">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 pt-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border-b border-border pb-4 transition-all">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-display text-lg text-foreground py-2 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="relative rounded-[2rem] bg-secondary p-8 sm:p-10 text-secondary-foreground shadow-luxe overflow-hidden">
            <Quote className="absolute right-6 top-6 h-20 w-20 text-primary/10" />

            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[testIdx].rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <p className="font-display text-lg sm:text-xl leading-relaxed italic text-white">
                  "{testimonials[testIdx].quote}"
                </p>
                <div className="text-sm text-white/70">
                  <span className="font-semibold text-white">{testimonials[testIdx].name}</span> ·{" "}
                  {testimonials[testIdx].trip}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-8">
              <button
                onClick={() =>
                  setTestIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTestIdx((prev) => (prev + 1) % testimonials.length)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-24">
        <Newsletter />
      </div>
    </PageShell>
  );
}

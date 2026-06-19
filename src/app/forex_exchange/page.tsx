"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/site/page-shell";
import { ServicesNav } from "@/components/site/services-nav";
import { Newsletter } from "@/components/site/newsletter";
import { submitInquiry } from "@/lib/api";
import {
  DollarSign,
  Briefcase,
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

// Forex Page Hero Slides matching the live website
const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Unbeatable Rates",
    title: "Unbeatable Forex\nRates Worldwide",
    subtitle:
      "Get the best exchange rates for 40+ global currencies with quick and transparent transactions.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Travel Confident",
    title: "Travel Confident\nwith Trusted Forex",
    subtitle:
      "Secure your money abroad with our safe, reliable, and hassle-free currency exchange service.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Multi-Currency Card",
    title: "Multi-Currency\nMade Simple",
    subtitle:
      "From USD and EUR to Yen and Dirham, we provide fast and competitive forex assistance tailored for travelers.",
  },
];

const faqs = [
  {
    q: "What currencies can I exchange through Travel Kingdom?",
    a: "We support over 40+ major global currencies, including US Dollar (USD), Euro (EUR), British Pound (GBP), UAE Dirham (AED), Singapore Dollar (SGD), Thai Baht (THB), Australian Dollar (AUD), and Japanese Yen (JPY).",
  },
  {
    q: "Do you charge extra service fees or commissions?",
    a: "No. We believe in absolute zero-surprise pricing. All our rates are completely transparent, with no hidden margins, commissions, or unexpected service charges.",
  },
  {
    q: "How does doorstep forex delivery work?",
    a: "Once your mandatory travel documents (passport and confirmed ticket copies) are verified, our secure courier agent delivers the physical foreign currency or loaded multi-currency travel card directly to your doorstep in Pune on the same day.",
  },
  {
    q: "What is a multi-currency prepaid travel card?",
    a: "It is a highly secure chip-and-PIN protected travel card that you can load with up to 16 currencies simultaneously. It offers competitive locked exchange rates, SMS alerts, and is accepted at millions of merchants and ATMs worldwide.",
  },
];

const testimonials = [
  {
    name: "Ketan Jadhav",
    rating: 5,
    trip: "Doorstep Currency Delivery",
    quote:
      "Very competitive exchange rates compared to the leading banks. Got my USD delivered directly to my home in Pune on the same day. The entire process was completely transparent, safe, and professional.",
  },
  {
    name: "Ritu Malhotra",
    rating: 5,
    trip: "Emergency Euro Exchange",
    quote:
      "Needed Euros urgently for my sudden Europe trip. Travel Kingdom arranged the cash within hours and delivered it right at my doorstep. Their team is highly professional, and their service is flawless.",
  },
  {
    name: "Aditya Verma",
    rating: 5,
    trip: "Prepaid Travel Card",
    quote:
      "I always get my travel forex through Travel Kingdom. They consistently offer the best conversion rates in town, and their multi-currency travel card is incredibly convenient to use for international swipe payments.",
  },
];

const currencyRates: Record<string, { name: string; buy: number; sell: number; symbol: string }> = {
  USD: { name: "US Dollar", buy: 84.5, sell: 85.5, symbol: "$" },
  EUR: { name: "Euro", buy: 92.1, sell: 93.3, symbol: "€" },
  GBP: { name: "British Pound", buy: 106.8, sell: 108.2, symbol: "£" },
  AED: { name: "UAE Dirham", buy: 23.0, sell: 23.6, symbol: "د.إ" },
  SGD: { name: "Singapore Dollar", buy: 62.5, sell: 63.5, symbol: "S$" },
  THB: { name: "Thai Baht", buy: 2.3, sell: 2.45, symbol: "฿" },
  AUD: { name: "Australian Dollar", buy: 56.1, sell: 57.2, symbol: "A$" },
};

export default function ForexPage() {
  const [slideIdx, setSlideIdx] = useState(0);

  // Hero slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Form States
  const [amount, setAmount] = useState("1000");
  const [currency, setCurrency] = useState("USD");
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const [deliveryPref, setDeliveryPref] = useState("Doorstep Delivery");
  const [travelDate, setTravelDate] = useState("");
  const [assistanceType, setAssistanceType] = useState("Both (Recommended Combo)");
  const [travelDestination, setTravelDestination] = useState("");

  // Live calculator calculation
  const [totalINR, setTotalINR] = useState(84500);

  useEffect(() => {
    const parsedAmount = parseFloat(amount) || 0;
    const rateDetails = currencyRates[currency];
    if (rateDetails) {
      const activeRate = transactionType === "buy" ? rateDetails.buy : rateDetails.sell;
      setTotalINR(Math.round(parsedAmount * activeRate));
    }
  }, [amount, currency, transactionType]);

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
      inquiry_type: "forex_exchange_assistance",
      message: `Forex Inquiry for ${amount} ${currency} (${transactionType === "buy" ? "Buying" : "Selling"}). Destination: ${travelDestination}. Delivery Preference: ${deliveryPref}. Assistance Type: ${assistanceType}. Travel Date: ${travelDate}. Approx Value in INR: ₹${totalINR}.`,
      forex: {
        currency: currency,
        amount: parseFloat(amount) || 0,
        delivery_preference: deliveryPref,
        assistance_type: assistanceType,
        travel_date: travelDate || null,
        travel_destination: travelDestination || null,
      },
    });

    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowInquiry(false);
        setAmount("1000");
        setTravelDate("");
        setTravelDestination("");
        setInquirerName("");
        setInquirerPhone("");
        setInquirerEmail("");
      }, 4000);
    } else {
      alert("Failed to submit inquiry. Please check your details and try again.");
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
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1920&q=80";
              }}
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

      {/* Forex Exchange Calculator Widget */}
      <section className="mx-auto max-w-5xl px-5 -mt-16 relative z-20">
        <div className="rounded-3xl border border-border bg-card/90 shadow-luxe backdrop-blur-xl p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground mb-6">Forex Calculator & Booking</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Toggle tabs for Buy / Sell */}
            <div className="flex gap-4 border-b border-border pb-4">
              <button
                type="button"
                onClick={() => setTransactionType("buy")}
                className={`text-sm font-semibold pb-2 transition-all relative ${
                  transactionType === "buy"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Buy Forex (Get Foreign Cash)
                {transactionType === "buy" && (
                  <motion.div
                    layoutId="forexTypeUnderline"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("sell")}
                className={`text-sm font-semibold pb-2 transition-all relative ${
                  transactionType === "sell"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sell Forex (Get INR Cash)
                {transactionType === "sell" && (
                  <motion.div
                    layoutId="forexTypeUnderline"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Currency
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    {Object.keys(currencyRates).map((cur) => (
                      <option key={cur} value={cur}>
                        {cur} - {currencyRates[cur].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Foreign Amount
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Approx. Value in INR
                </label>
                <div className="w-full px-4 py-3 rounded-2xl border border-border bg-muted/50 text-sm font-semibold text-foreground">
                  ₹ {totalINR.toLocaleString()} INR
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Delivery Preference
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={deliveryPref}
                    onChange={(e) => setDeliveryPref(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    <option>Doorstep Delivery (Pune Area)</option>
                    <option>Self Pickup (Office Branch)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Assistance Category
                </label>
                <select
                  value={assistanceType}
                  onChange={(e) => setAssistanceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                >
                  <option>Currency Cash Notes</option>
                  <option>Prepaid Multi-Currency Card</option>
                  <option>Both (Recommended Combo)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Travel Destination
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maldives, Europe"
                  value={travelDestination}
                  onChange={(e) => setTravelDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Form Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 cursor-pointer"
              >
                Book Forex
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
                  <h3 className="font-display text-2xl text-foreground">Forex Order Registered</h3>
                  <p className="text-sm text-muted-foreground">
                    Our verified courier manager is preparing the doorstep cash package of{" "}
                    <span className="font-semibold">
                      {currencyRates[currency].symbol}
                      {amount} {currency}
                    </span>
                    . We'll connect on WhatsApp.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-foreground">
                      Finalize Your Exchange
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      In compliance with FEMA regulations, foreign exchange requires a copy of your
                      passport, air ticket, and valid visa. We handle this securely.
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
                        WhatsApp / Contact
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
                        "Confirm Exchange Rates"
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
            Secure Transactions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground">
            Why Choose Our Forex & Travel Assistance?
          </h2>
          <p className="text-muted-foreground">
            Key reasons global travelers secure their currencies exclusively through Travel Kingdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Competitive Rates</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Some of the most competitive exchange rates in town, completely transparent with zero
              hidden fees.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Doorstep Delivery</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Highly secure doorstep currency delivery or loaded multi-currency card delivery
              directly to your home.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Strictly Secure</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              All transactions are strictly authorized under FEMA regulations, offering secure
              currency handling.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">24/7 Support</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Emergency assistance for card blocking, ATM withdrawals, and extra loads while you
              travel abroad.
            </p>
          </div>
        </div>
      </section>

      {/* Forex Detail Services Grid */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Premium Assistance
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              Our Premium Forex & Assistance Services
            </h2>
            <p className="text-muted-foreground">
              Sleek features structured to offer you stress-free spending across all continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Currency Notes</h4>
              <p className="text-sm text-muted-foreground">
                Exchange physical currency cash for 40+ countries. Clean, verified notes delivered
                immediately.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Multi-Currency Card</h4>
              <p className="text-sm text-muted-foreground">
                Load up to 16 global currencies on a single card. Zero swipe charges at merchant
                terminals worldwide.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Travel Insurance</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive overseas medical cover, baggage delay, and flight cancellation safety
                guarantees.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Emergency Loads</h4>
              <p className="text-sm text-muted-foreground">
                Run short of funds abroad? WhatsApp our desk, pay in INR locally, and we load your
                card within 30 minutes.
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

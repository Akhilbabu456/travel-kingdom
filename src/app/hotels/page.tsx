"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/site/page-shell";
import { ServicesNav } from "@/components/site/services-nav";
import { Newsletter } from "@/components/site/newsletter";
import { submitInquiry } from "@/lib/api";
import {
  MapPin,
  Calendar,
  Users,
  Building,
  ArrowRight,
  ShieldCheck,
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

// Hotel Page Hero Slides matching live website
const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Stay in Comfort",
    title: "Stay in Comfort,\nAnywhere You Go",
    subtitle:
      "From boutique stays to luxury resorts, discover hotels that fit your style and budget effortlessly.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Perfect Escape",
    title: "Find the Perfect Stay\nfor Every Trip",
    subtitle:
      "We handpick hotels with the best mix of comfort, location, and value – just for you.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Unwind in Style",
    title: "Unwind in Style\nAcross the Globe",
    subtitle:
      "Enjoy exclusive hotel deals and trusted accommodations in over 100+ destinations worldwide.",
  },
];

const faqs = [
  {
    q: "What kind of hotels can I book through Travel Kingdom?",
    a: "We partner with over 200,000 properties worldwide. This includes ultra-luxury 5-star resorts, private villas, boutique heritage properties, central business hotels, and budget-friendly serviced apartments.",
  },
  {
    q: "Are hotel bookings cheaper through your service?",
    a: "Yes. Thanks to our direct industry partnerships with global chains like Marriott, Taj, and Hilton, we secure offline negotiated tariffs and premium perks like complimentary breakfast, room upgrades, and late check-outs.",
  },
  {
    q: "Can I change or cancel my hotel reservation?",
    a: "Absolutely. We offer flexible cancellation policies on the majority of our curated properties. If your plans change, our concierge desk handles all adjustments directly with the property manager.",
  },
  {
    q: "Do you arrange early check-in or airport transfers?",
    a: "Yes. We coordinate early check-in and late check-out requests according to your flight timings. We can also pre-arrange private, air-conditioned terminal transfers and guided sightseeing tours.",
  },
];

const testimonials = [
  {
    name: "Vikas Patel",
    rating: 5,
    trip: "Resort Stay in Bali",
    quote:
      "Booked our Bali resort through Travel Kingdom. The property was exactly as promised, and the price was much better than any online portals. Had a completely comfortable and luxurious stay.",
  },
  {
    name: "Ayesha Khan",
    rating: 5,
    trip: "Singapore & Malaysia stays",
    quote:
      "We stayed in Singapore and Malaysia. The hotels selected were well-located near metro stations, which made commuting very convenient. The Travel Kingdom team managed all our breakfasts, room upgrades, and seamless transfers.",
  },
  {
    name: "Harshal Thombre",
    rating: 5,
    trip: "Boutique stays in Europe",
    quote:
      "Needed boutique, central hotels in Europe, and Travel Kingdom gave us perfect options – clean, safe, and centrally located. They even managed an early check-in for us after a exhausting long-haul flight.",
  },
];

const brands = [
  "Marriott",
  "Hilton",
  "Taj Hotels",
  "Hyatt",
  "Shangri-La",
  "InterContinental",
  "Oberoi",
  "Accor",
];

export default function HotelsPage() {
  const [slideIdx, setSlideIdx] = useState(0);

  // Hero slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Form States
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("Deluxe Room");
  const [guests, setGuests] = useState("2 Guests");
  const [budgetRange, setBudgetRange] = useState("Luxury");

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
      inquiry_type: "hotels",
      message: `Hotel Booking Enquiry in ${destination} from ${checkIn} to ${checkOut}. Room: ${roomType}. Guests: ${guests}. Budget: ${budgetRange}.`,
      hotels: {
        destination: destination,
        check_in_date: checkIn,
        check_out_date: checkOut,
        guests: parseInt(guests) || 2,
        budget_range: budgetRange.toLowerCase().includes("luxury")
          ? "high"
          : budgetRange.toLowerCase().includes("mid")
            ? "medium"
            : ("low" as any),
        room_type: roomType.toLowerCase().replace(" ", "") as any,
      },
    });

    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowInquiry(false);
        setDestination("");
        setCheckIn("");
        setCheckOut("");
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

      {/* Stay Booking Form Widget */}
      <section className="mx-auto max-w-5xl px-5 -mt-16 relative z-20">
        <div className="rounded-3xl border border-border bg-card/90 shadow-luxe backdrop-blur-xl p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground mb-6">Search Hotel Bookings</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2 lg:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Check-In
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Check-Out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Dropdowns row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Room Type
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    <option>Standard Room</option>
                    <option>Deluxe Room</option>
                    <option>Executive Suite</option>
                    <option>Presidential Suite</option>
                    <option>Overwater Villa</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Guests / Rooms
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    <option>1 Guest, 1 Room</option>
                    <option>2 Guests, 1 Room</option>
                    <option>3 Guests, 1 Room</option>
                    <option>4 Guests, 2 Rooms</option>
                    <option>Family Plan (Multiple)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Budget Range
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                >
                  <option>Economy (Clean & Safe)</option>
                  <option>Mid-Range (Highly Rated)</option>
                  <option>Boutique / Premium</option>
                  <option>Luxury Resorts</option>
                  <option>Ultra-Luxe / Atelier</option>
                </select>
              </div>
            </div>

            {/* Form Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 cursor-pointer"
              >
                Find Stays
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
                  <h3 className="font-display text-2xl text-foreground">Query Submitted</h3>
                  <p className="text-sm text-muted-foreground">
                    Our hotel concierge is contacting local properties in{" "}
                    <span className="font-semibold">{destination}</span> to arrange offline
                    negotiated room tariffs. We will contact you soon.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-foreground">
                      Request Offline Room Rates
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We secure private luxury inventory and inclusions (spa vouchers, champagne
                      check-in) not published on regular online sites.
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
                        WhatsApp Number
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
                      className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-full shadow-glow hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      ) : (
                        "Get Hotel Quotation"
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
            Curated Stays
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground">
            Why Choose Our Hotel Booking Service?
          </h2>
          <p className="text-muted-foreground">
            Key reasons why discerning travelers book their stays with Travel Kingdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Tailored Stays</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We align hotel rooms directly with your specific preferences, budgets, safety
              guidelines, and accessibility constraints.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Wide Selection</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A meticulously cataloged inventory of over 200,000+ top-tier resorts, central boutique
              spots, and suites globally.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Exclusive Deals</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Negotiated industry offline contracts that grant breakfast inclusions, complimentary
              spa, and early check-ins.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Global Reach</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Book with absolute security and confidence across more than 100+ countries, backed by
              24/7 on-trip assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Partnerships Grid */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Elite Network
            </span>
            <h2 className="font-display text-3xl text-foreground">Our Premium Hotel Services</h2>
            <p className="text-sm text-muted-foreground">
              We work in direct coordination with leading global hospitality chains to assure
              flawless comfort.
            </p>
          </div>

          {/* Brands list */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {brands.map((b) => (
              <div
                key={b}
                className="p-6 rounded-2xl border border-border bg-card font-display text-lg text-muted-foreground shadow-sm hover:text-primary transition-colors"
              >
                {b}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 bg-card border border-border rounded-3xl shadow-sm text-center">
              <h4 className="font-display text-base text-foreground mb-1">Room Upgrades</h4>
              <p className="text-xs text-muted-foreground">
                Enjoy complimentary spatial updates and personalized amenities at select properties.
              </p>
            </div>
            <div className="p-6 bg-card border border-border rounded-3xl shadow-sm text-center">
              <h4 className="font-display text-base text-foreground mb-1">Flexible Bookings</h4>
              <p className="text-xs text-muted-foreground">
                Alter or cancel stays with immediate response and minimal paperwork hurdles.
              </p>
            </div>
            <div className="p-6 bg-card border border-border rounded-3xl shadow-sm text-center">
              <h4 className="font-display text-base text-foreground mb-1">24/7 Assistance</h4>
              <p className="text-xs text-muted-foreground">
                No bots or automated ticketing. Text our concierge desk to coordinate early arrivals
                or transfers.
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

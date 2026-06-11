"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/site/page-shell";
import { ServicesNav } from "@/components/site/services-nav";
import { Newsletter } from "@/components/site/newsletter";
import { submitInquiry } from "@/lib/api";
import {
  Plane,
  Calendar,
  Users,
  Compass,
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
} from "lucide-react";

// Flight page Hero slides matching the live website themes
const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Smart Travel",
    title: "Fly Smart with\nAffordable Airfares",
    subtitle:
      "Discover unbeatable flight deals worldwide – from budget-friendly economy to premium luxury.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Personal Choice",
    title: "Your Journey,\nYour Choice",
    subtitle:
      "Choose from top global airlines with flexible options that suit your personal travel style.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Zero Stress",
    title: "Stress-Free\nFlight Booking",
    subtitle:
      "Enjoy seamless reservations, real-time airfare updates, and secure booking for domestic and international travel.",
  },
];

const faqs = [
  {
    q: "What types of flights can I book with your services?",
    a: "You can book all domestic and international flights, including one-way, round-trip, and complex multi-city itineraries across all major global airlines. We specialize in finding optimal connections and direct flights.",
  },
  {
    q: "How do you guarantee the best airfares?",
    a: "We compare rates across multiple booking engines, airline reservation channels, and wholesale networks. This allows us to offer you custom discounted deals, student specials, corporate rates, and exclusive off-peak discounts.",
  },
  {
    q: "Can I make modifications or cancel my flight booking?",
    a: "Yes, absolutely. Our dedicated concierge team handles seat selections, meal requests, dates changes, and cancellations directly with the airline, meaning you never have to wait on long hold lines.",
  },
  {
    q: "What support do you provide during delays or cancellations?",
    a: "We provide 24/7 real-time WhatsApp concierge support. In case of delays, gate changes, or cancellations, our team is instantly notified and works to rebook you or resolve baggage disputes on the fly.",
  },
];

const testimonials = [
  {
    name: "Rohan Deshmukh",
    rating: 5,
    trip: "Business Class to London",
    quote:
      "Booked our business class flights to Travel Kingdom. The booking process was seamless, and the pricing was notably better than any online portals. Truly professional and premium service!",
  },
  {
    name: "Ananya Sen",
    rating: 5,
    trip: "Family Trip to USA",
    quote:
      "Travel Kingdom managed our multi-city family trip to the USA. They coordinated all seat preferences, special meals, and kid-friendly connections. Their team made a complex schedule feel entirely effortless.",
  },
  {
    name: "Manish Shah",
    rating: 5,
    trip: "Domestic Leisure",
    quote:
      "We had our flight cancelled due to weather, and the Travel Kingdom team had us rebooked on the next available flight within 15 minutes before the airport counter could even process the line. Unbelievable support!",
  },
];

export default function FlightsPage() {
  const [slideIdx, setSlideIdx] = useState(0);

  // Hero slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Form States
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [classType, setClassType] = useState("Economy");
  const [passengers, setPassengers] = useState("1");
  const [specialFare, setSpecialFare] = useState("None");

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
      inquiry_type: "flight",
      message: `Flight Booking Enquiry from ${from} to ${to} on ${departDate}. Return: ${returnDate || "None"}. Class: ${classType}. Travelers: ${passengers}. Special Fare: ${specialFare}.`,
      flight: {
        origin: from,
        destination: to,
        departure_date: departDate,
        return_date: returnDate || null,
        travelers: parseInt(passengers) || 1,
        travel_class: classType.toLowerCase().replace(" ", "") as any,
        special_fare: specialFare.toLowerCase() as any,
        trip_type: tripType,
      },
    });

    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowInquiry(false);
        setFrom("");
        setTo("");
        setDepartDate("");
        setReturnDate("");
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

      {/* Booking Form Widget */}
      <section className="mx-auto max-w-5xl px-5 -mt-16 relative z-20">
        <div className="rounded-3xl border border-border bg-card/90 shadow-luxe backdrop-blur-xl p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground mb-6">Plan Your Flight</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Toggle tabs for Round Trip / One Way */}
            <div className="flex gap-4 border-b border-border pb-4">
              <button
                type="button"
                onClick={() => setTripType("roundtrip")}
                className={`text-sm font-semibold pb-2 transition-all relative ${
                  tripType === "roundtrip"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Round Trip
                {tripType === "roundtrip" && (
                  <motion.div
                    layoutId="tripTypeUnderline"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setTripType("oneway")}
                className={`text-sm font-semibold pb-2 transition-all relative ${
                  tripType === "oneway"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                One Way
                {tripType === "oneway" && (
                  <motion.div
                    layoutId="tripTypeUnderline"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  From
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Departure City or Airport"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">To</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 rotate-90 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Destination City or Airport"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Depart Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    required
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    required={tripType === "roundtrip"}
                    disabled={tripType === "oneway"}
                    value={tripType === "oneway" ? "" : returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary disabled:opacity-50 disabled:bg-muted"
                  />
                </div>
              </div>
            </div>

            {/* Dropdowns row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Travelers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4+ Adults</option>
                    <option>Family (Kids incl.)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Cabin Class
                </label>
                <select
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                >
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business Class</option>
                  <option>First Class</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Special Fare
                </label>
                <select
                  value={specialFare}
                  onChange={(e) => setSpecialFare(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                >
                  <option>None</option>
                  <option>Student Discount</option>
                  <option>Senior Citizen</option>
                  <option>Armed Forces</option>
                </select>
              </div>
            </div>

            {/* Form Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 cursor-pointer"
              >
                Search Flights
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
                  <h3 className="font-display text-2xl text-foreground">Inquiry Received</h3>
                  <p className="text-sm text-muted-foreground">
                    Our flight concierge is searching custom fares for{" "}
                    <span className="font-semibold">
                      {from} to {to}
                    </span>
                    . We'll WhatsApp or call you shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-foreground">Get Private Airfares</h3>
                    <p className="text-sm text-muted-foreground">
                      We have access to negotiated corporate rates not shown online. Leave your
                      details and get custom bookings.
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
                        Mobile / WhatsApp
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
                        "Request Quotation"
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
            Uncompromised Quality
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground">
            Why Choose Our Flight Booking Service?
          </h2>
          <p className="text-muted-foreground">
            Key reasons why global travelers book their flights exclusively through Travel Kingdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Personalized Service</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our travel specialists handcraft flights, connecting times, and airline classes
              tailored directly to your desires.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Wide Range of Options</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Direct and multi-city options spanning Economy, Premium Economy, Business, and
              luxurious First-Class flights.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Special Fares</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Access to exclusive, private airfares, student specials, senior discounts, and
              military concessions.
            </p>
          </div>

          <div className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl text-foreground">Global Reach</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Direct alignments and ticketing with top-tier airlines covering over 100+ destinations
              worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Airline Partners */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Global Standards
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              Our Premium Flight Services
            </h2>
            <p className="text-muted-foreground">
              Partnerships and amenities that promise you comfortable journeys around the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Trusted Partners</h4>
              <p className="text-sm text-muted-foreground">
                Ticketing directly with premium partners including Emirates, Qatar Airways,
                Singapore Airlines, and Air India.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">In-Flight Luxury</h4>
              <p className="text-sm text-muted-foreground">
                Pre-book extra legroom, hot gourmet meals, inflight Wi-Fi configurations, and
                premium lounges.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">Flexible Booking</h4>
              <p className="text-sm text-muted-foreground">
                Easy date changes, refund policies, and cancellations managed proactively by our
                office.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="font-display text-lg text-foreground mb-2">24/7 Concierge</h4>
              <p className="text-sm text-muted-foreground">
                Instant personal WhatsApp concierge to assist with check-in, delays, or boarding
                emergencies.
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

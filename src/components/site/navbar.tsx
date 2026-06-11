"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, Phone } from "lucide-react";
import { Logo } from "./logo";
import { fetchLocations, type Destination } from "@/lib/api";

const nav = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations", mega: true },
  { to: "/packages", label: "Packages" },
  { to: "/past-tours", label: "Past Tours" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menuDestinations, setMenuDestinations] = useState<Destination[]>([]);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
    setOpenMega(false);
  }, [pathname]);

  useEffect(() => {
    fetchLocations().then((res) => {
      setMenuDestinations(res.slice(0, 6));
    });
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        transparent ? "bg-transparent" : "glass shadow-[0_1px_0_0_oklch(0_0_0/0.04)]"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo light={transparent} />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <div
                key={item.to}
                onMouseEnter={() => item.mega && setOpenMega(true)}
                onMouseLeave={() => item.mega && setOpenMega(false)}
                className="relative"
              >
                <Link
                  href={item.to}
                  className={`group rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active
                      ? `font-semibold ${transparent ? "text-white" : "text-primary"}`
                      : `font-medium ${transparent ? "text-white/85 hover:text-white" : "text-foreground/75 hover:text-foreground"}`
                  }`}
                >
                  {item.label}
                </Link>
                <AnimatePresence>
                  {item.mega && openMega && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22 }}
                      className="absolute left-1/2 top-full z-50 mt-3 w-[640px] -translate-x-1/2 rounded-3xl border border-border bg-card p-6 shadow-luxe"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {menuDestinations.map((d) => (
                          <Link
                            key={d.slug}
                            href={`/destinations/${d.slug}`}
                            className="group block overflow-hidden rounded-2xl"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <img
                                src={d.image}
                                alt={d.name}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                              <div className="absolute bottom-2 left-3 text-white">
                                <div className="font-display text-base">{d.name}</div>
                                <div className="text-[11px] opacity-80">{d.country}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/destinations"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        View all destinations →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/packages"
            aria-label="Search"
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${transparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"}`}
          >
            <Search className="h-4 w-4" />
          </Link>
          <a
            href="tel:+919860874848"
            className={`hidden xl:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${transparent ? "text-white/90" : "text-foreground/80"}`}
          >
            <Phone className="h-4 w-4" /> +91 98608 74848
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Plan My Trip
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setMobile(true)}
          className={`lg:hidden grid h-10 w-10 place-items-center rounded-full ${transparent ? "text-white" : "text-foreground"}`}
        >
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-secondary/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-5">
              <Logo light />
              <button
                onClick={() => setMobile(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-white"
              >
                <X />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="px-6 pt-6"
            >
              {nav.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={item.to}
                    className="block border-b border-white/10 py-4 font-display text-2xl text-white"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground"
              >
                Plan My Trip
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  {
    href: "/",
    label: "Holiday Packages",
    icon: (
      <svg
        className="w-12 h-12 max-sm:w-9 max-sm:h-9"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="22" fill="#E0F2FE" />
        {/* Globe Grid lines */}
        <ellipse cx="32" cy="32" rx="14" ry="22" stroke="#38BDF8" strokeWidth="1.5" />
        <ellipse cx="32" cy="32" rx="6" ry="22" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="10" y1="32" x2="54" y2="32" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="16" y1="18" x2="48" y2="18" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="16" y1="46" x2="48" y2="46" stroke="#38BDF8" strokeWidth="1.5" />
        {/* Suitcase */}
        <rect x="18" y="34" width="16" height="14" rx="2" fill="#F97316" />
        <rect
          x="23"
          y="30"
          width="6"
          height="4"
          rx="1"
          stroke="#F97316"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="21" cy="48" r="1.5" fill="#4B5563" />
        <circle cx="31" cy="48" r="1.5" fill="#4B5563" />
        {/* Plane */}
        <path
          d="M42 22L46 16L48 17L46 22L50 25L52 24L53 26L49 28L47 32L45 32L46 28L42 26L38 27L38 25L42 22Z"
          fill="#3B82F6"
        />
        {/* Dotted path */}
        <path
          d="M30 40C38 40 46 36 46 28"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
        />
      </svg>
    ),
  },
  {
    href: "/flights",
    label: "Flights",
    icon: (
      <svg
        className="w-12 h-12 max-sm:w-9 max-sm:h-9"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky / Air trail */}
        <path
          d="M12 42C24 42 36 28 52 24"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        {/* Plane */}
        <g transform="translate(18, 14)">
          <path
            d="M32.8 15.6L16.2 26.8C15.2 27.5 13.8 27.5 12.8 26.8L3.2 20.2C2.1 19.4 2.3 17.7 3.6 17.2L8.2 15.6L13.8 4.2C14.3 3.1 15.6 2.5 16.8 2.9L19.2 3.7C20.3 4.1 20.7 5.4 20.2 6.5L16.8 13.2L28.2 9.8C29.6 9.4 31.0 10.2 31.4 11.6L33.6 13.8C34.0 14.8 33.6 15.1 32.8 15.6Z"
            fill="#3B82F6"
          />
          <path
            d="M12.8 26.8L16.2 26.8C17.2 26.8 18.2 26.2 18.6 25.2L28.2 9.8C27.2 9.2 26.2 9.2 25.2 9.8L12.8 26.8Z"
            fill="#1D4ED8"
          />
          <path
            d="M2.5 18.5L8.5 22.5L10.2 21.2L4.2 17.2C3.5 16.8 2.8 17.5 2.5 18.5Z"
            fill="#EF4444"
          />
        </g>
      </svg>
    ),
  },
  {
    href: "/hotels",
    label: "Hotels",
    icon: (
      <svg
        className="w-12 h-12 max-sm:w-9 max-sm:h-9"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hotel Building */}
        <rect x="18" y="22" width="28" height="32" rx="2" fill="#3B82F6" />
        <rect x="22" y="16" width="20" height="6" fill="#1D4ED8" />
        {/* Door */}
        <path d="M28 54V44H36V54H28Z" fill="#F3F4F6" />
        {/* Windows */}
        <rect x="22" y="26" width="6" height="6" rx="1" fill="#FEF08A" />
        <rect x="36" y="26" width="6" height="6" rx="1" fill="#FEF08A" />
        <rect x="22" y="36" width="6" height="6" rx="1" fill="#FEF08A" />
        <rect x="36" y="36" width="6" height="6" rx="1" fill="#FEF08A" />
        {/* Stars */}
        <polygon points="32,4 34,9 39,9 35,12 37,17 32,14 27,17 29,12 25,9 30,9" fill="#F59E0B" />
        <polygon
          points="21,9 22.5,12.5 26,12.5 23,14.5 24.5,18 21,16 17.5,18 19,14.5 16,12.5 19.5,12.5"
          fill="#F59E0B"
        />
        <polygon
          points="43,9 44.5,12.5 48,12.5 45,14.5 46.5,18 43,16 39.5,18 41,14.5 38,12.5 41.5,12.5"
          fill="#F59E0B"
        />
      </svg>
    ),
  },
  {
    href: "/visa_passports",
    label: "Visa & Passport",
    icon: (
      <svg
        className="w-12 h-12 max-sm:w-9 max-sm:h-9"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Passport Red Book */}
        <rect
          x="14"
          y="22"
          width="20"
          height="28"
          rx="2"
          fill="#B91C1C"
          transform="rotate(-5, 24, 36)"
        />
        <rect x="20" y="26" width="10" height="6" fill="#F59E0B" transform="rotate(-5, 24, 36)" />
        <circle
          cx="24"
          cy="38"
          r="4"
          stroke="#FEF08A"
          strokeWidth="1"
          fill="none"
          transform="rotate(-5, 24, 36)"
        />

        {/* Visa Document Blue */}
        <rect x="30" y="20" width="22" height="28" rx="2" fill="#1E3A8A" />
        <rect x="30" y="20" width="22" height="28" rx="2" fill="#3B82F6" opacity="0.9" />
        <rect x="34" y="24" width="14" height="3" rx="0.5" fill="#E5E7EB" />
        <rect x="34" y="30" width="10" height="2" rx="0.5" fill="#E5E7EB" />
        <rect x="34" y="34" width="14" height="2" rx="0.5" fill="#E5E7EB" />
        <rect x="34" y="38" width="12" height="2" rx="0.5" fill="#E5E7EB" />

        {/* Stamp */}
        <circle cx="44" cy="40" r="5" fill="#EF4444" opacity="0.8" />
        <path d="M42 40L46 40" stroke="#FFF" strokeWidth="1.5" />
        <path d="M44 38L44 42" stroke="#FFF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/forex_exchange",
    label: "Forex Assistance",
    icon: (
      <svg
        className="w-12 h-12 max-sm:w-9 max-sm:h-9"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Currency Coin 1 */}
        <circle cx="26" cy="32" r="12" fill="#F59E0B" />
        <circle cx="26" cy="32" r="10" stroke="#FEF08A" strokeWidth="1" fill="none" />
        <path
          d="M26 26V38M23 29H29M23 35H29"
          stroke="#FEF08A"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Currency Coin 2 */}
        <circle cx="38" cy="38" r="12" fill="#F59E0B" />
        <circle cx="38" cy="38" r="10" stroke="#FEF08A" strokeWidth="1" fill="none" />
        <path
          d="M35 34C35 34 38 32 40 34C42 36 38 38 41 40"
          stroke="#FEF08A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M38 32V42" stroke="#FEF08A" strokeWidth="1.5" />

        {/* Circular Arrows */}
        <path
          d="M22 20C28 14 38 15 44 21"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M44 21L39 21M44 21L44 16" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

        <path
          d="M42 44C36 50 26 49 20 43"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M20 43L25 43M20 43L20 48" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ServicesNav() {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-center items-center py-8 px-4 md:px-8 mt-12 sm:mt-16">
      <div className="w-full max-w-4xl rounded-[2.5rem] bg-white border border-[#EBE7DF]/40 p-2 sm:p-3 shadow-[0_20px_50px_rgba(139,125,103,0.08)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-1 sm:gap-4 overflow-x-auto no-scrollbar w-full px-2 sm:px-6">
          {tabs.map((tab) => {
            // Precise active logic: homepage or exactly matching route
            const active =
              tab.href === "/"
                ? pathname === "/" || pathname === "/packages"
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="group shrink-0 flex flex-col items-center py-2 px-1 sm:px-2 relative"
              >
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                    {tab.icon}
                  </div>
                  <span
                    className={`font-display text-xs font-bold tracking-wide sm:text-sm transition-colors duration-300 pb-2 ${
                      active ? "text-[#e07a1b]" : "text-[#48596e] group-hover:text-[#e07a1b]"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
                {active && (
                  <motion.div
                    layoutId="servicesNavUnderline"
                    className="absolute bottom-0 h-[3.5px] w-12 sm:w-14 rounded-full bg-[#e07a1b]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

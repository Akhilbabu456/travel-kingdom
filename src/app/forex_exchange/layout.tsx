import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forex Exchange Services | Currency Exchange | Travel Kingdom",
  description:
    "Get the best forex exchange rates and currency exchange services with Travel Kingdom. We offer competitive rates for all major currencies, forex cards, and travel money services in Pune, India.",
  keywords: [
    "forex exchange",
    "currency exchange",
    "forex services",
    "currency exchange pune",
    "forex rates",
    "travel money",
    "forex cards",
    "currency converter",
    "foreign exchange",
    "travel kingdom forex",
  ],
  openGraph: {
    title: "Forex Exchange Services | Travel Kingdom",
    description:
      "Get the best forex exchange rates and currency exchange services. Competitive rates for all major currencies with Travel Kingdom.",
    url: "https://www.travelkingdom.in/forex_exchange",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-forex.jpg",
        width: 1200,
        height: 630,
        alt: "Forex Exchange Services - Travel Kingdom",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex Exchange Services | Travel Kingdom",
    description: "Get the best forex exchange rates and currency exchange services.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/forex_exchange",
  },
};

export default function ForexExchangeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages | Customized Holiday Packages | Travel Kingdom",
  description:
    "Explore customized international and domestic tour packages with Travel Kingdom. Book cheap holiday packages, honeymoon tours, family vacations, and group departures with direct concierge support.",
  keywords: [
    "tour packages",
    "holiday packages",
    "travel packages",
    "customized tours",
    "honeymoon packages",
    "family vacations",
    "international tours",
    "domestic holidays",
    "travel kingdom packages",
  ],
  openGraph: {
    title: "Tour Packages | Travel Kingdom",
    description:
      "Explore customized international and domestic tour packages with competitive pricing and personalized itineraries.",
    url: "https://www.travelkingdom.in/packages",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-packages.jpg",
        width: 1200,
        height: 630,
        alt: "Tour Packages - Travel Kingdom",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages | Travel Kingdom",
    description: "Explore customized international and domestic tour packages.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/packages",
  },
};

export default function PackagesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

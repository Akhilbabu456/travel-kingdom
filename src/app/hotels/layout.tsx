import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Booking Services | Best Hotel Deals | Travel Kingdom",
  description:
    "Book hotels worldwide with Travel Kingdom. Get the best hotel deals, discounts, and packages for your vacation. We offer hotel bookings for international and domestic destinations with 24/7 support.",
  keywords: [
    "hotel booking",
    "hotel deals",
    "hotel packages",
    "book hotels online",
    "hotel booking services",
    "cheap hotel deals",
    "luxury hotels",
    "hotel discounts",
    "travel kingdom hotels",
  ],
  openGraph: {
    title: "Hotel Booking Services | Travel Kingdom",
    description:
      "Book hotels worldwide with Travel Kingdom. Get the best hotel deals and packages for your vacation.",
    url: "https://www.travelkingdom.in/hotels",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-hotels.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Booking Services - Travel Kingdom",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Booking Services | Travel Kingdom",
    description: "Book hotels worldwide with the best deals and packages.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/hotels",
  },
};

export default function HotelsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Travel Kingdom - Your Trusted Travel Partner Since 2011",
  description:
    "Travel Kingdom, established in 2011, is a trusted travel agency offering professional tour packages, currency exchange, and travel services. We specialize in international and domestic holidays, customized packages, and expert travel planning.",
  keywords: [
    "about travel kingdom",
    "travel agency pune",
    "about us travel kingdom",
    "tour operator india",
    "trusted travel agency",
    "travel agency since 2011",
    "professional travel services",
    "travel experts india",
  ],
  openGraph: {
    title: "About Us | Travel Kingdom - Your Trusted Travel Partner Since 2011",
    description:
      "Learn about Travel Kingdom - a trusted travel agency established in 2011, providing customized tour packages, expert guidance, and world-class travel experiences.",
    url: "https://www.travelkingdom.in/about",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Travel Kingdom - Trusted Travel Partner Since 2011",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Travel Kingdom",
    description:
      "Your trusted travel partner since 2011, providing world-class travel experiences.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/about",
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

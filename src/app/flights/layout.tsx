import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Booking Services | Cheap Flight Tickets | Travel Kingdom",
  description:
    "Book domestic and international flights with Travel Kingdom. Get the best flight deals, cheap air tickets, and exclusive discounts. Compare prices and book your flights with our expert assistance.",
  keywords: [
    "flight booking",
    "cheap flights",
    "flight tickets",
    "book flights online",
    "domestic flights",
    "international flights",
    "flight deals",
    "airline tickets",
    "flight booking services",
    "travel kingdom flights",
  ],
  openGraph: {
    title: "Flight Booking Services | Travel Kingdom",
    description:
      "Book domestic and international flights with the best deals and exclusive discounts. Get cheap flight tickets with Travel Kingdom.",
    url: "https://www.travelkingdom.in/flights",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-flights.jpg",
        width: 1200,
        height: 630,
        alt: "Flight Booking Services - Travel Kingdom",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flight Booking Services | Travel Kingdom",
    description: "Book flights with the best deals and exclusive discounts.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/flights",
  },
};

export default function FlightLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

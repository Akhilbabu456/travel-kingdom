import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Travel Kingdom - Get in Touch for Tour Packages & Travel Services",
  description:
    "Contact Travel Kingdom for customized tour planning, flight booking, forex services, and expert travel assistance. Reach out to our travel experts in Pune, India. We're here to help you plan your perfect vacation.",
  keywords: [
    "contact travel kingdom",
    "travel agency contact",
    "get in touch travel kingdom",
    "tour planner contact",
    "travel services customer support",
    "travel agency pune contact",
    "book tour packages",
    "travel consultation",
  ],
  openGraph: {
    title: "Contact Us | Travel Kingdom",
    description:
      "Get in touch with Travel Kingdom for expert holiday planning, booking assistance, and customized tour packages. Let us make your next trip amazing.",
    url: "https://www.travelkingdom.in/contact",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Travel Kingdom - Get in Touch for Travel Services",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Travel Kingdom",
    description:
      "Get in touch with our travel experts for customized tour packages and travel assistance.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/contact",
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

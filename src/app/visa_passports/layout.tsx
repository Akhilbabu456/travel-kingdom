import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa & Passport Services | Visa Application Assistance | Travel Kingdom",
  description:
    "Get expert visa and passport services with Travel Kingdom. We assist with visa applications, passport services, visa documentation, and travel visa processing for international destinations.",
  keywords: [
    "visa services",
    "passport services",
    "visa application",
    "visa assistance",
    "travel visa",
    "visa documentation",
    "passport renewal",
    "visa processing",
    "international visa",
    "travel kingdom visa",
  ],
  openGraph: {
    title: "Visa & Passport Services | Travel Kingdom",
    description:
      "Get expert visa and passport services. We assist with visa applications, documentation, and processing for international travel.",
    url: "https://www.travelkingdom.in/visa_passports",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-visa.jpg",
        width: 1200,
        height: 630,
        alt: "Visa & Passport Services - Travel Kingdom",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa & Passport Services | Travel Kingdom",
    description: "Expert visa and passport services for international travel.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/visa_passports",
  },
};

export default function VisaPassportLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

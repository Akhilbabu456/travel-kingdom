import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Travel Kingdom",
  description:
    "Read Travel Kingdom's terms and conditions for tour packages, bookings, cancellations, and travel services. Understand our policies before booking your vacation.",
  keywords: [
    "terms and conditions",
    "travel terms",
    "booking terms",
    "travel policy",
    "tour package terms",
    "cancellation policy",
  ],
  openGraph: {
    title: "Terms & Conditions | Travel Kingdom",
    description: "Read Travel Kingdom's terms and conditions for tour packages and travel services.",
    url: "https://www.travelkingdom.in/terms",
    siteName: "Travel Kingdom",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

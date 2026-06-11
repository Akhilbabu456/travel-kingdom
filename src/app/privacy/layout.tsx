import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Travel Kingdom",
  description:
    "Read Travel Kingdom's privacy policy to understand how we collect, use, and protect your personal information when you use our travel services and book tour packages.",
  keywords: [
    "privacy policy",
    "data protection",
    "privacy",
    "personal information",
    "data security",
    "travel privacy",
  ],
  openGraph: {
    title: "Privacy Policy | Travel Kingdom",
    description: "Read Travel Kingdom's privacy policy to understand how we protect your personal information.",
    url: "https://www.travelkingdom.in/privacy",
    siteName: "Travel Kingdom",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

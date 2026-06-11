import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Past Tours & Customer Stories | Travel Kingdom",
  description:
    "Discover reviews, feedback, and travel logs from our Pune clients who travelled with Travel Kingdom. Read verified reviews for Maldives, Switzerland, Bali, and Kerala tours.",
  keywords: [
    "travel reviews",
    "customer feedback",
    "past tours",
    "travel stories",
    "travel kingdom reviews",
    "tour operator feedback pune",
    "verified reviews",
  ],
  openGraph: {
    title: "Our Past Tours & Customer Stories | Travel Kingdom",
    description: "Read reviews, feedback, and travel logs from our Pune clients.",
    url: "https://www.travelkingdom.in/past-tours",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-past-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Customer Reviews and Past Tours - Travel Kingdom",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Past Tours & Customer Stories | Travel Kingdom",
    description: "Read reviews, feedback, and travel logs from our Pune clients.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/past-tours",
  },
};

export default function PastToursLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

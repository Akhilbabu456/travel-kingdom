import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traveler Reviews & Feedback | Travel Kingdom",
  description:
    "Read verified reviews and holiday stories from happy travelers, or submit your own feedback about your experience with Travel Kingdom.",
  keywords: [
    "travel kingdom reviews",
    "travel kingdom feedback",
    "customer reviews travel agency",
    "travel reviews pune",
    "verified holiday stories",
    "travel agent feedback pune",
    "pune travel agency reviews",
  ],
  openGraph: {
    title: "Traveler Reviews & Feedback | Travel Kingdom",
    description:
      "Read verified reviews and holiday stories from happy travelers, or submit your own feedback about your experience with Travel Kingdom.",
    url: "https://www.travelkingdom.in/feedback",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-feedback.jpg",
        width: 1200,
        height: 630,
        alt: "Traveler Reviews & Feedback - Travel Kingdom",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traveler Reviews & Feedback | Travel Kingdom",
    description: "Read verified traveler reviews or submit your own travel story.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/feedback",
  },
};

export default function FeedbackLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kingdom Diaries | Travel Blog & Stories | Travel Kingdom",
  description:
    "Read travel guides, vacation checklists, destination highlights, and expert holiday planning insights on the Travel Kingdom blog. Hand-crafted by our travel designers.",
  keywords: [
    "travel blog",
    "travel guide",
    "travel stories",
    "vacation checklist",
    "holiday inspiration",
    "travel tips",
    "destination guides",
    "travel kingdom blog",
  ],
  openGraph: {
    title: "Kingdom Diaries | Travel Blog & Stories | Travel Kingdom",
    description: "Read travel guides, checklists, and expert holiday insights on our travel blog.",
    url: "https://www.travelkingdom.in/blog",
    siteName: "Travel Kingdom",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Kingdom Diaries - Travel Kingdom Blog",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kingdom Diaries | Travel Kingdom Blog",
    description: "Read travel guides, checklists, and expert holiday insights.",
  },
  alternates: {
    canonical: "https://www.travelkingdom.in/blog",
  },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

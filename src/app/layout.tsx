import "../styles.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Premium holidays, hand-crafted since 2011 | Travel Kingdom",
  description:
    "Travel Kingdom designs cinematic, concierge-led holidays — Maldives, Kerala, Switzerland, Bali and beyond.",
  authors: [{ name: "Travel Kingdom" }],
  openGraph: {
    title: "Premium holidays, hand-crafted since 2011 | Travel Kingdom",
    description:
      "Travel Kingdom designs cinematic, concierge-led holidays — Maldives, Kerala, Switzerland, Bali and beyond.",
    type: "website",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d269a762-8a2e-4916-ae3c-283117e0d631/id-preview-e5173068--73defd52-c571-409e-bbcc-c1c8f9beb831.lovable.app-1779435383594.png",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@Lovable",
    title: "Premium holidays, hand-crafted since 2011 | Travel Kingdom",
    description:
      "Travel Kingdom designs cinematic, concierge-led holidays — Maldives, Kerala, Switzerland, Bali and beyond.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d269a762-8a2e-4916-ae3c-283117e0d631/id-preview-e5173068--73defd52-c571-409e-bbcc-c1c8f9beb831.lovable.app-1779435383594.png",
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

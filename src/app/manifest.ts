import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Travel Kingdom - Best Tour Packages & Travel Services",
    short_name: "Travel Kingdom",
    description:
      "Travel Kingdom offers the best international and domestic tour packages, customized holidays, flight bookings, and forex services.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#F38400",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    categories: [
      "travel",
      "tourism",
      "travel agency",
      "tour packages",
      "holiday packages",
      "flight booking",
      "hotel booking",
      "visa services",
      "forex services",
    ],
    lang: "en-IN",
    orientation: "portrait-primary",
    scope: "/",
  };
}

import { destinations as staticDestinations, packages as staticPackages, type Destination, type Package } from "./data";
export type { Destination, Package };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://engine.travelkingdom.in";

export interface ApiLocation {
  id: number;
  name: string;
  display_name: string;
  type: string;
  state: string | null;
  country: string | null;
  region: string | null;
  package_count: number;
  image: string | null;
}

export interface ApiItineraryDay {
  id: number;
  day_number: number;
  meal: string[] | null;
  sightseeings: {
    title: string;
    city: string;
    images?: string;
    description?: string | null;
  }[];
  title?: string;
  description?: string | null;
}

export interface ApiPackage {
  id: number;
  title: string;
  slug: string;
  overview?: string | null;
  destinations: string[];
  startcity?: string | null;
  duration: number;
  images: string[] | null;
  package_type?: "INTERNATIONAL" | "DOMESTIC";
  category?: "STANDARD" | "BUDGET" | "LUXURY" | "PREMIUM" | "DELUXE";
  cost?: {
    code?: string | null;
    cost?: number | null;
    basis?: string | null;
    symbol?: string | null;
  } | null;
  itineraries: ApiItineraryDay[];
  themes?: string[];
  inclusions?: string | null;
  exclusions?: string | null;
  booking_terms?: string | null;
  terms_and_conditions?: string | null;
  cancellation_policy?: string | null;
  travel_basics?: string | null;
}

export interface ApiTheme {
  id: number;
  name: string;
  description: string | null;
  images: string | null;
}

// Convert ApiLocation to Destination
export function mapLocationToDestination(loc: ApiLocation): Destination {
  return {
    slug: loc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name: loc.name.charAt(0).toUpperCase() + loc.name.slice(1).toLowerCase(),
    country: loc.country || "International",
    region: (loc.region as any) || "Asia",
    category: loc.package_count > 5 ? "Honeymoon" : "Beach",
    image: loc.image || "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=800&q=80",
    tagline: `Explore ${loc.package_count} curated tour packages`,
    fromPrice: 29000, // placeholder from price if API doesn't specify
    nights: 4
  };
}

// Convert ApiPackage to Package
export function mapApiPackageToPackage(pkg: ApiPackage): Package {
  const price = pkg.cost?.cost || 45000;
  return {
    slug: pkg.slug,
    title: pkg.title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '), // Capitalize words
    destination: pkg.destinations.join(", "),
    image: (pkg.images && pkg.images.length > 0) ? pkg.images[0] : "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
    nights: pkg.duration,
    days: pkg.duration + 1,
    price: price,
    oldPrice: price ? Math.round(price * 1.25) : undefined,
    rating: 4.8,
    reviews: 120 + (pkg.id % 200),
    category: (pkg.category as any) || "Luxury",
    highlights: pkg.itineraries.flatMap(it => it.sightseeings.map(s => s.title)).slice(0, 4)
  };
}

export async function fetchLocations(): Promise<Destination[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/packages/packageslocations`);
    if (!res.ok) throw new Error("API call failed");
    const data: ApiLocation[] = await res.json();
    // Filter out locations with 0 packages
    const activeLocs = data.filter(l => l.package_count > 0);
    if (activeLocs.length === 0) return staticDestinations;
    return activeLocs.map(mapLocationToDestination);
  } catch (error) {
    console.warn("fetchLocations failed, using static fallback:", error);
    return staticDestinations;
  }
}

export async function fetchPackages(filters?: {
  theme?: string;
  package_type?: string;
  category?: string;
  country?: string;
  limit?: number;
}): Promise<Package[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.theme) params.append("theme", filters.theme);
    if (filters?.package_type) params.append("package_type", filters.package_type);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.country) params.append("country", filters.country);
    if (filters?.limit) params.append("limit", String(filters.limit));
    else params.append("limit", "100");

    const res = await fetch(`${API_BASE_URL}/packages/?${params.toString()}`);
    if (!res.ok) throw new Error("API call failed");
    const data = await res.json();
    const pkgs: ApiPackage[] = data.packages || [];
    if (pkgs.length === 0) return staticPackages;
    return pkgs.map(mapApiPackageToPackage);
  } catch (error) {
    console.warn("fetchPackages failed, using static fallback:", error);
    return staticPackages;
  }
}

function getStaticPackageAsApiPackage(slug: string): ApiPackage | null {
  let staticPkg = staticPackages.find((p) => p.slug === slug);

  if (!staticPkg) {
    const s = slug.toLowerCase();
    if (s.includes("maldives")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("maldives"));
    } else if (s.includes("bhutan")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("bhutan"));
    } else if (s.includes("bali")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("bali"));
    } else if (s.includes("dubai")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("dubai"));
    } else if (s.includes("santorini") || s.includes("greece")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("santorini"));
    } else if (s.includes("paris") || s.includes("france")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("paris"));
    } else if (s.includes("swiss") || s.includes("switzerland")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("swiss"));
    } else if (s.includes("rajasthan")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("rajasthan"));
    } else if (s.includes("kerala") || s.includes("wayanad") || s.includes("munnar") || s.includes("backwaters")) {
      staticPkg = staticPackages.find((p) => p.slug.includes("kerala"));
    }
  }

  // Final fallback to first package if still no match
  if (!staticPkg) {
    staticPkg = staticPackages[0];
  }

  if (!staticPkg) return null;

  const itineraries: ApiItineraryDay[] = [];
  for (let i = 1; i <= staticPkg.days; i++) {
    itineraries.push({
      id: i,
      day_number: i,
      title: i === 1 ? "Arrival & Leisure" : i === staticPkg.days ? "Departure" : `Sightseeing Tour in ${staticPkg.destination}`,
      description: i === 1
        ? `Arrive in ${staticPkg.destination}. Meet our representative and transfer to your pre-booked premium stay. Rest of the day is at leisure.`
        : i === staticPkg.days
        ? `Breakfast at your hotel. Check out and transfer to the airport for your onward flight home with wonderful memories.`
        : `After breakfast, proceed for a guided sightseeing tour. Visit top local attractions, scenic photography viewpoints, and experience local culture.`,
      meal: ["Breakfast"],
      sightseeings: staticPkg.highlights.map((h) => ({ title: h, city: staticPkg.destination }))
    });
  }

  return {
    id: 9999 + staticPackages.indexOf(staticPkg),
    title: staticPkg.title,
    slug: staticPkg.slug,
    overview: `Experience a premium, hand-crafted tour of ${staticPkg.destination} featuring top highlights such as ${staticPkg.highlights.join(", ")}. Enjoy curated dining and high-end stays.`,
    destinations: [staticPkg.destination],
    duration: staticPkg.nights,
    images: [staticPkg.image],
    cost: {
      cost: staticPkg.price,
      symbol: "₹",
      basis: "per person"
    },
    itineraries: itineraries,
    inclusions: staticPkg.highlights.join("\n"),
    exclusions: "Any personal expenses, extra meals, and travel insurance."
  };
}

export async function fetchPackageBySlug(slug: string): Promise<ApiPackage | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/packages/${slug}`);
    if (!res.ok) throw new Error("API call failed");
    const data = await res.json();
    return data.package || getStaticPackageAsApiPackage(slug);
  } catch (error) {
    console.warn(`fetchPackageBySlug ${slug} failed, using static fallback:`, error);
    return getStaticPackageAsApiPackage(slug);
  }
}

export async function fetchThemes(): Promise<ApiTheme[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/themes/?limit=20`);
    if (!res.ok) throw new Error("API call failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("fetchThemes failed:", error);
    return [];
  }
}

export interface InquiryPayload {
  full_name: string;
  email: string;
  phone: string;
  message?: string;
  inquiry_type: "flight" | "contact" | "visa" | "forex_exchange_assistance" | "package" | "hotels";
  flight?: {
    origin: string;
    destination: string;
    departure_date: string;
    return_date?: string | null;
    travelers?: number;
    travel_class?: string;
    special_fare?: string;
    trip_type?: string;
  };
  contact?: {
    subject: string;
    service_type?: string | null;
    preferred_date?: string | null;
    number_of_people?: number;
  };
  visa?: {
    nationality: string;
    destination_country: string;
    visa_type?: string;
    passport_status?: string;
    travel_date: string;
  };
  forex?: {
    currency: string;
    amount: number;
    delivery_preference?: string;
    assistance_type?: string;
    travel_destination?: string | null;
    travel_date?: string | null;
  };
  package?: {
    package_id: string;
    travelers: number;
    travel_date: string;
    duration?: number | null;
  };
  hotels?: {
    destination: string;
    check_in_date: string;
    check_out_date: string;
    guests: number;
    budget_range?: string | null;
    room_type?: string;
  };
}

export async function submitInquiry(payload: InquiryPayload): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/inquiries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error("Inquiry submission failed with status", res.status, errData);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("submitInquiry error:", error);
    return false;
  }
}

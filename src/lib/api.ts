import { type Destination, type Package } from "./data";
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
  const nameLower = loc.name.toLowerCase();
  const countryLower = (loc.country || "").toLowerCase();
  const regionLower = (loc.region || "").toLowerCase();

  // Determine region dynamically
  let region: Destination["region"] = "Asia";
  if (countryLower === "india") {
    region = "India";
  } else if (
    regionLower.includes("europe") ||
    countryLower.includes("united kingdom") ||
    countryLower.includes("england") ||
    countryLower.includes("ireland") ||
    countryLower.includes("france") ||
    countryLower.includes("greece")
  ) {
    region = "Europe";
  } else if (
    regionLower.includes("middle east") ||
    countryLower.includes("uae") ||
    countryLower.includes("united arab emirates") ||
    countryLower.includes("dubai") ||
    countryLower.includes("egypt")
  ) {
    region = "Middle East";
  } else if (
    regionLower.includes("america") ||
    countryLower.includes("united states") ||
    countryLower.includes("usa") ||
    countryLower.includes("canada")
  ) {
    region = "The Americas";
  }

  // Determine category dynamically
  let category: Destination["category"] = "Beach";
  if (
    nameLower.includes("maldives") ||
    nameLower.includes("seychelles") ||
    nameLower.includes("bali") ||
    nameLower.includes("beach") ||
    nameLower.includes("goa") ||
    nameLower.includes("alleppey") ||
    nameLower.includes("alappuzha") ||
    nameLower.includes("port blair") ||
    nameLower.includes("andaman")
  ) {
    category = "Beach";
  } else if (
    nameLower.includes("bhutan") ||
    nameLower.includes("shimla") ||
    nameLower.includes("manali") ||
    nameLower.includes("leh") ||
    nameLower.includes("ladakh") ||
    nameLower.includes("srinagar") ||
    nameLower.includes("kashmir") ||
    nameLower.includes("pelling") ||
    nameLower.includes("dalhousie")
  ) {
    category = "Mountain";
  } else if (
    nameLower.includes("dubai") ||
    nameLower.includes("london") ||
    nameLower.includes("paris") ||
    nameLower.includes("singapore") ||
    nameLower.includes("new york") ||
    nameLower.includes("abu dhabi") ||
    nameLower.includes("edinburgh")
  ) {
    category = "City";
  } else if (
    nameLower.includes("delhi") ||
    nameLower.includes("agra") ||
    nameLower.includes("jaipur") ||
    nameLower.includes("rajasthan") ||
    nameLower.includes("gwalior") ||
    nameLower.includes("temple") ||
    nameLower.includes("puri") ||
    nameLower.includes("amritsar")
  ) {
    category = "Heritage";
  } else if (loc.package_count > 6) {
    category = "Honeymoon";
  } else {
    category = "Hidden Gems";
  }

  return {
    slug: loc.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    name: loc.name
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" "),
    country: loc.country || "International",
    region: region,
    category: category,
    image:
      loc.image ||
      "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=800&q=80",
    tagline: `Explore ${loc.package_count} curated tour packages in ${loc.name}`,
    fromPrice: undefined,
    nights: 4,
  };
}

// Convert ApiPackage to Package
const INTERNATIONAL_DESTS = new Set([
  "ananuri",
  "adelaide",
  "bangkok",
  "boston",
  "busan",
  "cappadocia",
  "chitwan",
  "dubai",
  "edinburgh",
  "gold coast",
  "ho chi minh city",
  "hoi an",
  "kathmandu",
  "krabi",
  "nusa penida",
  "paro",
  "pattaya",
  "phu quoc",
  "praslin",
  "singapore",
  "strokestown",
  "maldives",
  "seychelles",
  "thailand",
  "bali",
  "vietnam",
  "georgia",
  "australia",
  "turkey",
  "united kingdom",
  "ireland",
  "bhutan",
  "nepal",
  "dublin",
  "galway",
  "london",
  "sydney",
  "melbourne",
  "brisbane",
  "cairns",
  "antalya",
  "tbilisi",
  "batumi",
  "abu dhabi",
  "jeju",
  "seoul",
  "sri lanka",
  "srilanka",
  "malaysia",
  "kuala lumpur",
  "europe",
  "switzerland",
  "paris",
  "france",
  "italy",
  "rome",
  "america",
  "united states",
  "usa",
  "japan",
  "tokyo",
  "kyoto",
]);

export function mapApiPackageToPackage(pkg: ApiPackage): Package {
  const price = pkg.cost?.cost || undefined;
  const isInternational = pkg.destinations.some((d) =>
    INTERNATIONAL_DESTS.has(d.toLowerCase().trim()),
  );

  // Heuristic mapping for Package categories based on title/destination
  const t = pkg.title.toLowerCase();
  const d = pkg.destinations.join(", ").toLowerCase();

  let category: Package["category"] = "Luxury"; // default category

  if (
    t.includes("romantic") ||
    t.includes("honeymoon") ||
    d.includes("maldives") ||
    d.includes("seychelles") ||
    t.includes("couple")
  ) {
    category = "Honeymoon";
  } else if (
    t.includes("bhutan") ||
    t.includes("ladakh") ||
    t.includes("leh") ||
    t.includes("himalaya") ||
    t.includes("hike") ||
    t.includes("trek") ||
    t.includes("adventure") ||
    d.includes("paro") ||
    t.includes("nepal")
  ) {
    category = "Adventure";
  } else if (
    t.includes("thailand") ||
    t.includes("singapore") ||
    t.includes("dubai") ||
    t.includes("australia") ||
    t.includes("city") ||
    t.includes("wonders") ||
    t.includes("splendors") ||
    t.includes("family")
  ) {
    category = "Family";
  } else if (
    t.includes("wayanad") ||
    t.includes("meghalaya") ||
    t.includes("sikkim") ||
    t.includes("darjeeling") ||
    t.includes("karnataka") ||
    t.includes("coorg") ||
    t.includes("ooty") ||
    t.includes("kerala")
  ) {
    category = "Hidden Gems";
  } else if (
    t.includes("temple") ||
    t.includes("divine") ||
    t.includes("heritage") ||
    t.includes("gujarat") ||
    t.includes("madhya pradesh") ||
    t.includes("group") ||
    t.includes("delight")
  ) {
    category = "Group";
  }

  return {
    slug: pkg.slug,
    title: pkg.title
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" "), // Capitalize words
    destination: pkg.destinations.join(", "),
    image:
      pkg.images && pkg.images.length > 0
        ? pkg.images[0]
        : "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
    nights: pkg.duration,
    days: pkg.duration + 1,
    price: price,
    oldPrice: price ? Math.round(price * 1.25) : undefined,
    rating: 4.8,
    reviews: 120 + (pkg.id % 200),
    category: category,
    highlights: Array.from(
      new Set(pkg.itineraries.flatMap((it) => (it.sightseeings || []).map((s) => s.title))),
    ).slice(0, 4),
    packageType: pkg.package_type || (isInternational ? "INTERNATIONAL" : "DOMESTIC"),
  };
}

export async function fetchRawLocations(): Promise<ApiLocation[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/packages/packageslocations`);
    if (!res.ok) throw new Error("API call failed");
    const data: ApiLocation[] = await res.json();
    return data.filter((l) => l.package_count > 0);
  } catch (error) {
    console.error("fetchRawLocations failed:", error);
    return [];
  }
}

export async function fetchLocations(): Promise<Destination[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/packages/packageslocations`);
    if (!res.ok) throw new Error("API call failed");
    const data: ApiLocation[] = await res.json();
    // Filter out locations with 0 packages
    const activeLocs = data.filter((l) => l.package_count > 0);
    const mapped = activeLocs.map(mapLocationToDestination);

    // Deduplicate by slug
    const seen = new Set<string>();
    return mapped.filter((d) => {
      if (seen.has(d.slug)) return false;
      seen.add(d.slug);
      return true;
    });
  } catch (error) {
    console.error("fetchLocations failed:", error);
    return [];
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
    const mapped = pkgs.map(mapApiPackageToPackage);

    // Deduplicate by slug
    const seen = new Set<string>();
    return mapped.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
  } catch (error) {
    console.error("fetchPackages failed:", error);
    return [];
  }
}

export async function fetchPackageBySlug(slug: string): Promise<ApiPackage | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/packages/${slug}`);
    if (!res.ok) throw new Error("API call failed");
    const data = await res.json();
    return data.package || null;
  } catch (error) {
    console.error(`fetchPackageBySlug ${slug} failed:`, error);
    return null;
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

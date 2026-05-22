import heroMaldives from "@/assets/hero-maldives.jpg";
import heroKerala from "@/assets/hero-kerala.jpg";
import heroSwitzerland from "@/assets/hero-switzerland.jpg";
import destBali from "../assets/dest-bali.jpg";
import destDubai from "../assets/dest-dubai.jpg";
import destSantorini from "../assets/dest-santorini.jpg";
import destParis from "../assets/dest-paris.jpg";
import destRajasthan from "../assets/dest-rajasthan.jpg";
import destMunnar from "../assets/dest-munnar.jpg";

export const heroSlides = [
  {
    image: heroMaldives,
    eyebrow: "Maldives · Overwater",
    title: "Discover your\nnext great journey",
    subtitle:
      "Hand-crafted escapes to the world's most breathtaking places — since 2011.",
  },
  {
    image: heroKerala,
    eyebrow: "Kerala · Backwaters",
    title: "Where stillness\nbecomes a souvenir",
    subtitle:
      "Drift through palm-lined canals on a private houseboat at sunrise.",
  },
  {
    image: heroSwitzerland,
    eyebrow: "Switzerland · Alps",
    title: "Above the clouds,\nbelow the stars",
    subtitle:
      "Alpine villages, glacier express trains and quiet mountain mornings.",
  },
];

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: "Asia" | "Europe" | "Middle East" | "India";
  category: "Beach" | "Mountain" | "City" | "Heritage" | "Honeymoon";
  image: any;
  tagline: string;
  fromPrice: number;
  nights: number;
};

export const destinations: Destination[] = [
  { slug: "maldives", name: "Maldives", country: "Maldives", region: "Asia", category: "Honeymoon", image: heroMaldives, tagline: "Overwater villas & coral lagoons", fromPrice: 89000, nights: 5 },
  { slug: "bali", name: "Bali", country: "Indonesia", region: "Asia", category: "Beach", image: destBali, tagline: "Rice terraces, temples & surf", fromPrice: 54000, nights: 6 },
  { slug: "dubai", name: "Dubai", country: "UAE", region: "Middle East", category: "City", image: destDubai, tagline: "Skylines, desert & gold souks", fromPrice: 39000, nights: 4 },
  { slug: "santorini", name: "Santorini", country: "Greece", region: "Europe", category: "Honeymoon", image: destSantorini, tagline: "Blue domes above the Aegean", fromPrice: 119000, nights: 7 },
  { slug: "paris", name: "Paris", country: "France", region: "Europe", category: "City", image: destParis, tagline: "The city of light, properly seen", fromPrice: 129000, nights: 6 },
  { slug: "switzerland", name: "Switzerland", country: "Switzerland", region: "Europe", category: "Mountain", image: heroSwitzerland, tagline: "Glacier express & alpine villages", fromPrice: 159000, nights: 7 },
  { slug: "rajasthan", name: "Rajasthan", country: "India", region: "India", category: "Heritage", image: destRajasthan, tagline: "Palaces, deserts & royal kitchens", fromPrice: 42000, nights: 6 },
  { slug: "kerala", name: "Kerala", country: "India", region: "India", category: "Beach", image: heroKerala, tagline: "Backwaters, Ayurveda & spice trails", fromPrice: 32000, nights: 5 },
  { slug: "munnar", name: "Munnar", country: "India", region: "India", category: "Mountain", image: destMunnar, tagline: "Tea hills above the clouds", fromPrice: 24000, nights: 4 },
];

export type Package = {
  slug: string;
  title: string;
  destination: string;
  image: any;
  nights: number;
  days: number;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: "Honeymoon" | "Family" | "Adventure" | "Luxury" | "Group";
  highlights: string[];
};

export const packages: Package[] = [
  { slug: "maldives-overwater-escape", title: "Maldives Overwater Escape", destination: "Maldives", image: heroMaldives, nights: 5, days: 6, price: 89000, oldPrice: 109000, rating: 4.9, reviews: 248, category: "Honeymoon", highlights: ["Overwater villa", "Seaplane transfers", "Candlelit dinner", "Spa credit"] },
  { slug: "bali-island-rituals", title: "Bali Island Rituals", destination: "Bali", image: destBali, nights: 6, days: 7, price: 54000, oldPrice: 64000, rating: 4.8, reviews: 412, category: "Luxury", highlights: ["Ubud villa", "Private driver", "Rice terrace walk", "Temple sunrise"] },
  { slug: "dubai-city-of-gold", title: "Dubai · City of Gold", destination: "Dubai", image: destDubai, nights: 4, days: 5, price: 39000, rating: 4.7, reviews: 318, category: "Family", highlights: ["Burj Khalifa", "Desert safari", "Marina cruise", "Souk tour"] },
  { slug: "santorini-blue-hour", title: "Santorini · Blue Hour", destination: "Santorini", image: destSantorini, nights: 7, days: 8, price: 119000, rating: 5.0, reviews: 96, category: "Honeymoon", highlights: ["Caldera suite", "Private yacht", "Vineyard tasting", "Oia sunset"] },
  { slug: "paris-art-and-avenues", title: "Paris · Art & Avenues", destination: "Paris", image: destParis, nights: 6, days: 7, price: 129000, rating: 4.8, reviews: 152, category: "Luxury", highlights: ["Louvre fast-track", "Seine dinner", "Versailles day", "Patisserie tour"] },
  { slug: "swiss-alpine-grand", title: "Swiss Alpine Grand", destination: "Switzerland", image: heroSwitzerland, nights: 7, days: 8, price: 159000, rating: 4.9, reviews: 211, category: "Luxury", highlights: ["Glacier Express", "Jungfraujoch", "Lake Lucerne", "Chocolate atelier"] },
  { slug: "rajasthan-royal-trail", title: "Rajasthan · Royal Trail", destination: "Rajasthan", image: destRajasthan, nights: 6, days: 7, price: 42000, rating: 4.7, reviews: 287, category: "Family", highlights: ["Heritage haveli", "Amber Fort", "Camel sunset", "Royal dinner"] },
  { slug: "kerala-backwaters-bliss", title: "Kerala Backwaters Bliss", destination: "Kerala", image: heroKerala, nights: 5, days: 6, price: 32000, rating: 4.9, reviews: 521, category: "Family", highlights: ["Private houseboat", "Munnar tea", "Ayurveda spa", "Spice plantation"] },
];

export const testimonials = [
  { name: "Aarav & Priya Mehta", trip: "Maldives · Honeymoon", quote: "Travel Kingdom turned an idea into the most cinematic week of our lives. Every detail, even the welcome rose on the seaplane, was theirs.", rating: 5 },
  { name: "Rohan Iyer", trip: "Swiss Alpine Grand", quote: "First-class trains, hand-picked chalets and a 24/7 concierge that actually answered at 2am. Worth every rupee.", rating: 5 },
  { name: "The Kapoor Family", trip: "Dubai · 4 nights", quote: "Two kids, two grandparents, zero stress. They engineered the trip around us — not the other way around.", rating: 5 },
  { name: "Ananya Sharma", trip: "Santorini · Blue Hour", quote: "I've used four luxury agencies. Travel Kingdom is the only one I'll book again. Quiet, precise, taste-led.", rating: 5 },
];

export const stats = [
  { value: 12000, suffix: "+", label: "Happy travellers" },
  { value: 14, suffix: "yrs", label: "Crafting holidays" },
  { value: 60, suffix: "+", label: "Destinations" },
  { value: 4.8, suffix: "/5", label: "Google rating", decimals: 1 },
];

export const galleryImages = [
  heroMaldives, destBali, destSantorini, heroSwitzerland, destDubai, destParis, destRajasthan, heroKerala, destMunnar,
];

export const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
// High-resolution Unsplash travel photography
const imgMaldives = "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80";
const imgKerala = "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80";
const imgSwitzerland = "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1920&q=80";

const imgBali = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80";
const imgDubai = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80";
const imgSantorini = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80";
const imgParis = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80";
const imgRajasthan = "https://images.unsplash.com/photo-1599661046289-e318878567c4?auto=format&fit=crop&w=800&q=80";
const imgMunnar = "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=800&q=80";

// Genuine Bhutan Tiger's Nest image (correcting Japan Torii gate image mismatch)
const imgBhutan = "https://images.unsplash.com/photo-1548263599-9fb1557d99cd?auto=format&fit=crop&w=800&q=80";

// The Americas image
const imgNewYork = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80";

export const heroSlides = [
  {
    image: imgMaldives,
    eyebrow: "Maldives · Overwater",
    title: "Discover your next\ngreat journey",
    subtitle: "Hand-crafted escapes to the world's most breathtaking places — since 2011.",
  },
  {
    image: imgKerala,
    eyebrow: "Kerala · Backwaters",
    title: "Where stillness\nbecomes a souvenir",
    subtitle: "Drift through palm-lined canals on a private houseboat at sunrise.",
  },
  {
    image: imgSwitzerland,
    eyebrow: "Switzerland · Alps",
    title: "Above the clouds,\nbelow the stars",
    subtitle: "Alpine villages, glacier express trains and quiet mountain mornings.",
  },
];

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: "Asia" | "Europe" | "Middle East" | "India" | "The Americas";
  category: "Beach" | "Mountain" | "City" | "Heritage" | "Honeymoon" | "Hidden Gems";
  image: string;
  tagline: string;
  fromPrice: number;
  nights: number;
};

export const destinations: Destination[] = [
  { slug: "maldives", name: "Maldives", country: "Maldives", region: "Asia", category: "Honeymoon", image: imgMaldives, tagline: "Overwater villas & coral lagoons", fromPrice: 89000, nights: 5 },
  { slug: "bhutan", name: "Bhutan", country: "Bhutan", region: "Asia", category: "Mountain", image: imgBhutan, tagline: "Monasteries, valleys & high cliffs", fromPrice: 48000, nights: 5 },
  { slug: "bali", name: "Bali", country: "Indonesia", region: "Asia", category: "Beach", image: imgBali, tagline: "Rice terraces, temples & surf", fromPrice: 54000, nights: 6 },
  { slug: "dubai", name: "Dubai", country: "UAE", region: "Middle East", category: "City", image: imgDubai, tagline: "Skylines, desert & gold souks", fromPrice: 39000, nights: 4 },
  { slug: "santorini", name: "Santorini", country: "Greece", region: "Europe", category: "Honeymoon", image: imgSantorini, tagline: "Blue domes above the Aegean", fromPrice: 119000, nights: 7 },
  { slug: "paris", name: "Paris", country: "France", region: "Europe", category: "City", image: imgParis, tagline: "The city of light, properly seen", fromPrice: 129000, nights: 6 },
  { slug: "switzerland", name: "Switzerland", country: "Switzerland", region: "Europe", category: "Mountain", image: imgSwitzerland, tagline: "Glacier express & alpine villages", fromPrice: 159000, nights: 7 },
  { slug: "rajasthan", name: "Rajasthan", country: "India", region: "India", category: "Heritage", image: imgRajasthan, tagline: "Palaces, deserts & royal kitchens", fromPrice: 42000, nights: 6 },
  { slug: "kerala", name: "Kerala", country: "India", region: "India", category: "Beach", image: imgKerala, tagline: "Backwaters, Ayurveda & spice trails", fromPrice: 32000, nights: 5 },
  { slug: "munnar", name: "Munnar", country: "India", region: "India", category: "Mountain", image: imgMunnar, tagline: "Tea hills above the clouds", fromPrice: 24000, nights: 4 },
  { slug: "usa", name: "New York", country: "USA", region: "The Americas", category: "City", image: imgNewYork, tagline: "Skyscrapers, museums & Broadway", fromPrice: 169000, nights: 6 }
];

export type Package = {
  slug: string;
  title: string;
  destination: string;
  image: string;
  nights: number;
  days: number;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: "Honeymoon" | "Family" | "Adventure" | "Luxury" | "Group" | "Hidden Gems";
  highlights: string[];
};

export const packages: Package[] = [
  { slug: "maldives-overwater-escape", title: "Maldives Overwater Escape", destination: "Maldives", image: imgMaldives, nights: 5, days: 6, price: 89000, oldPrice: 109000, rating: 4.9, reviews: 248, category: "Honeymoon", highlights: ["Overwater villa", "Seaplane transfers", "Candlelit dinner", "Spa credit"] },
  { slug: "bhutan-himalayan-gateway", title: "Bhutan Himalayan Gateway", destination: "Bhutan", image: imgBhutan, nights: 5, days: 6, price: 48000, oldPrice: 58000, rating: 4.9, reviews: 112, category: "Adventure", highlights: ["Tiger's Nest hike", "Paro Valley", "Thimphu tour", "Private guide"] },
  { slug: "bali-island-rituals", title: "Bali Island Rituals", destination: "Bali", image: imgBali, nights: 6, days: 7, price: 54000, oldPrice: 64000, rating: 4.8, reviews: 412, category: "Luxury", highlights: ["Ubud villa", "Private driver", "Rice terrace walk", "Temple sunrise"] },
  { slug: "dubai-city-of-gold", title: "Dubai · City of Gold", destination: "Dubai", image: imgDubai, nights: 4, days: 5, price: 39000, rating: 4.7, reviews: 318, category: "Family", highlights: ["Burj Khalifa", "Desert safari", "Marina cruise", "Souk tour"] },
  { slug: "santorini-blue-hour", title: "Santorini · Blue Hour", destination: "Santorini", image: imgSantorini, nights: 7, days: 8, price: 119000, rating: 5.0, reviews: 96, category: "Honeymoon", highlights: ["Caldera suite", "Private yacht", "Vineyard tasting", "Oia sunset"] },
  { slug: "paris-art-and-avenues", title: "Paris · Art & Avenues", destination: "Paris", image: imgParis, nights: 6, days: 7, price: 129000, rating: 4.8, reviews: 152, category: "Luxury", highlights: ["Louvre fast-track", "Seine dinner", "Versailles day", "Patisserie tour"] },
  { slug: "swiss-alpine-grand", title: "Swiss Alpine Grand", destination: "Switzerland", image: imgSwitzerland, nights: 7, days: 8, price: 159000, rating: 4.9, reviews: 211, category: "Luxury", highlights: ["Glacier Express", "Jungfraujoch", "Lake Lucerne", "Chocolate atelier"] },
  { slug: "rajasthan-royal-trail", title: "Rajasthan · Royal Trail", destination: "Rajasthan", image: imgRajasthan, nights: 6, days: 7, price: 42000, rating: 4.7, reviews: 287, category: "Family", highlights: ["Heritage haveli", "Amber Fort", "Camel sunset", "Royal dinner"] },
  { slug: "kerala-backwaters-bliss", title: "Kerala Backwaters Bliss", destination: "Kerala", image: imgKerala, nights: 5, days: 6, price: 32000, rating: 4.9, reviews: 521, category: "Family", highlights: ["Private houseboat", "Munnar tea", "Ayurveda spa", "Spice plantation"] },
];

export const testimonials = [
  { name: "Indu Keoti", trip: "Himachal", quote: "We as a family had a 6-day long fun-filled, scenic and spiritual trip to Himachal, organised by Travel Kingdom. Our family of 5 on trip included my father-in-law who is 84 years old. Travel Kingdom arranged for travel and stay starting from Amritsar airport - Dharmasala- Dalhousie and back to Amritsar airport. Special thanks to Pooja and Abhishek.", rating: 5 },
  { name: "Chetana Patil", trip: "Dubai", quote: "We booked December 2024 trip to Dubai from Travel Kingdom. Everything was planned so perfectly, and they were always a message or call away. Loved how they even made separate documents for each of us. Highly recommend!", rating: 5 },
  { name: "Faustubh Deshpande", trip: "France And Italy", quote: "I recently booked a multi-day tour to France and Italy through Travel Kingdom, and I can confidently say it was an incredible experience! The team at Travel Kingdom was always ready with the daily itinerary and quick to address my queries.", rating: 5 },
  { name: "Neha Pedamkar", trip: "Greece And Turkey", quote: "Dear Alka & Team, Our trip to Greece and Turkey was a wonderful experience, and we’re grateful for Travel Kingdom’s role in making it happen. We would happily recommend your services to others.", rating: 5 },
  { name: "Shikha Kumari", trip: "Maldives", quote: "We recently booked our holiday to Maldives from Travel Kingdom, it was a wonderful experience. Transfers and hotel booking was to the point. Alka ma'am regularly checked on us if everything was ok, which made it so memorable.", rating: 5 }
];

export const stats = [
  { value: 12000, suffix: "+", label: "Happy Travellers" },
  { value: 20, suffix: "+", label: "prestigious awards" },
  { value: 100, suffix: "+", label: "Tour Destinations" },
  { value: 4.8, suffix: "/5", label: "Google rating", decimals: 1 },
];

export const galleryImages = [
  imgMaldives, imgBali, imgSantorini, imgSwitzerland, imgDubai, imgParis, imgRajasthan, imgKerala, imgMunnar, imgBhutan, imgNewYork
];

export const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
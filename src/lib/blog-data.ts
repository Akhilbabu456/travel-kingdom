export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: "Luxury Travel" | "Hidden Gems" | "Travel Tips" | "Wellness Escapes";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    sectionTitle?: string;
    paragraphs: string[];
    listItems?: string[];
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "maldives-ultimate-overwater-guide",
    title: "Maldives Ultimate Guide: How to Select the Perfect Overwater Villa",
    excerpt: "Planning a trip to the Maldives? Discover when to visit, what inclusions to verify, and how to pick the right coral lagoon resort for your dream holiday.",
    date: "June 02, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    category: "Luxury Travel",
    author: {
      name: "Alka Gupta",
      role: "Senior Holiday Designer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    content: [
      {
        sectionTitle: "Why the Maldives is More Than Just Sand and Water",
        paragraphs: [
          "The Maldives is the quintessential paradise, a constellation of low-lying coral islands scattered across the turquoise Indian Ocean. However, choosing the right resort and overwater villa can turn an average trip into an unforgettable, cinematic experience.",
          "With over 150 private island resorts, it is easy to get overwhelmed by choice. From private pools and slide access to direct marine life snorkeling from your deck, we break down what you need to look for before placing a deposit.",
        ],
      },
      {
        sectionTitle: "Factors to Keep in Mind When Choosing Your Resort",
        paragraphs: [
          "Not all overwater villas are created equal. When booking, consider the distance from Malé airport and the type of transfer required.",
        ],
        listItems: [
          "Speedboat Transfers: Recommended for resorts close to Malé, operating even in late-night hours.",
          "Seaplane Transfers: Offers iconic aerial views but only operates during daylight hours, which might require a night's stay in Malé if your international flight lands late.",
          "All-Inclusive vs. Half-Board: Maldives is remote, meaning meals at resorts can be expensive. We highly recommend booking comprehensive All-Inclusive packages.",
        ],
      },
      {
        sectionTitle: "When to Travel for the Best Weather and Deals",
        paragraphs: [
          "The best dry-weather months span from November to April, offering high visibility for scuba diving and snorkeling. However, if you are looking to secure luxury stays at lower rates, look at shoulder-season months like May or September, when luxury villas become up to 40% cheaper.",
        ],
      },
    ],
  },
  {
    slug: "bali-hidden-gems-revealed",
    title: "Bali's 7 Hidden Gems You Must Visit in 2026",
    excerpt: "Ditch the crowded beaches of Kuta. Explore pristine waterfalls, cliffside shrines, and quiet villages in the cultural heartlands of Bali.",
    date: "May 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    category: "Hidden Gems",
    author: {
      name: "Abhishek Gupta",
      role: "Operations Manager",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    },
    content: [
      {
        sectionTitle: "Beyond the Tourist Hotspots",
        paragraphs: [
          "Bali remains one of the world's most desired holiday destinations, but its rapid popularity has crowded popular spots like Kuta, Seminyak, and central Ubud. To experience the authentic charm of the Island of Gods, you must head off the beaten path.",
          "Our travel concierge team has mapped out these 7 hidden spots that offer dramatic landscapes, cultural preservation, and peaceful escapes.",
        ],
      },
      {
        sectionTitle: "The Top 3 Unspoiled Spots to Explore",
        paragraphs: [
          "Add these stunning locations to your next custom itinerary:",
        ],
        listItems: [
          "Munduk Village: High in the northern hills, filled with clove plantations, wild cacao, and cooler mountain weather.",
          "Nusa Penida's East Coast: While Kelingking beach is famous, the east coast offers quiet spots like Diamond Beach and Atuh Cliff.",
          "Sidemen Valley: Offering pristine rice terraces that evoke the Bali of 30 years ago, completely untouched by mass commercialism.",
        ],
      },
      {
        sectionTitle: "How to Travel Sustainably and Safely",
        paragraphs: [
          "When visiting village shrines and temples, always wear a sarong and show respect to local religious protocols. Hiring a private local driver, which we include in all our Bali packages, ensures you safely navigate steep mountain roads without hassle.",
        ],
      },
    ],
  },
  {
    slug: "switzerland-scenic-train-guide",
    title: "Switzerland Alpine Trains: The Ultimate Scenic Journey Guide",
    excerpt: "A complete guide to navigating the Glacier Express, Bernina Express, and panoramic Alpine routes for a stress-free Swiss holiday.",
    date: "May 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    category: "Travel Tips",
    author: {
      name: "Pooja Gupta",
      role: "Senior Holiday Designer",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    content: [
      {
        sectionTitle: "Why Trains are the Soul of Swiss Travel",
        paragraphs: [
          "Switzerland features one of the most efficient, clean, and breathtaking train networks on earth. Driving is beautiful, but traveling by rail lets you gaze at 4,000-meter peaks, cascading waterfalls, and glacial lakes without keeping your eyes glued to the road.",
          "From the slow-moving Glacier Express to the dramatic loops of the Bernina Express, our guide ensures you get the best seating, passes, and transfer connections.",
        ],
      },
      {
        sectionTitle: "Selecting the Right Rail Passes",
        paragraphs: [
          "One of the biggest mistakes travelers make is buying individual point-to-point tickets. Here is what we recommend:",
        ],
        listItems: [
          "Swiss Travel Pass: Grants unlimited travel across trains, buses, and boats throughout Switzerland, plus free entry to over 500 museums.",
          "Glacier Express Booking: Note that seat reservations are mandatory months in advance, even if you hold a Swiss Travel Pass.",
          "Jungfraujoch Excursion: The train to the 'Top of Europe' requires a separate discounted ticket, which we pre-book for you to avoid sold-out slots.",
        ],
      },
    ],
  },
  {
    slug: "kerala-ayurveda-backwaters-escape",
    title: "Kerala Backwaters & Ayurveda: The Perfect Mindful Healing Escape",
    excerpt: "Unwind along quiet palm-fringed canals on a private houseboat and restore your body with authentic Ayurvedic therapies.",
    date: "May 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    category: "Wellness Escapes",
    author: {
      name: "Rohit Kumar Gupta",
      role: "Founder & Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    content: [
      {
        sectionTitle: "God's Own Country",
        paragraphs: [
          "For those seeking to escape the hectic pace of city life, Kerala offers a serene, natural sanctuary. The combination of slow-moving backwaters in Kumarakom and traditional Ayurvedic detox therapies in specialized resorts forms the ultimate healing holiday.",
          "At Travel Kingdom, we work directly with certified CGH Earth and heritage properties in Kerala to provide authentic, doctor-supervised wellness itineraries.",
        ],
      },
      {
        sectionTitle: "What to Expect in a Backwater Houseboat Cruise",
        paragraphs: [
          "A classic houseboat cruise (Kettuvallam) is a must. Here is what to verify:",
        ],
        listItems: [
          "Air Conditioning: Confirm whether your booking offers full-time A/C or only during night hours (we secure full-time A/C houseboats).",
          "Chef on Board: Traditional Kerala meals (Karimeen Pollichathu, local red rice) are prepared fresh on board by a dedicated chef.",
          "Kumarakom vs. Alleppey: Kumarakom offers wider, quieter lakes, whereas Alleppey is busier and great for canal exploring.",
        ],
      },
    ],
  },
];

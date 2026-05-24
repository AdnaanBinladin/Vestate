export interface Land {
  id: string
  title: string
  location: string
  region: string
  price: number
  currency: string
  size: number
  sizeUnit: string
  pricePerUnit: number
  description: string
  shortDescription: string
  images: string[]
  features: string[]
  investmentTags: string[]
  highlights: string[]
  specifications: {
    zoning: string
    terrain: string
    utilities: string[]
    access: string
    views: string
  }
  isFeatured: boolean
  isNew: boolean
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  readTime: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  image: string
  rating: number
}

export const lands: Land[] = [
  {
    id: "1",
    title: "Oceanfront Prime Land",
    location: "Grand Baie",
    region: "North",
    price: 45000000,
    currency: "MUR",
    size: 2500,
    sizeUnit: "m²",
    pricePerUnit: 18000,
    description: "An exceptional oceanfront plot offering breathtaking panoramic views of the Indian Ocean. This prime piece of land is perfectly positioned in the prestigious Grand Baie area, known for its luxury lifestyle and proximity to high-end amenities. The gentle slope provides optimal positioning for a dream residence with unobstructed sea views from every angle.",
    shortDescription: "Exceptional oceanfront plot with panoramic Indian Ocean views in prestigious Grand Baie.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    ],
    features: ["Oceanfront", "Panoramic Views", "Gated Community", "Private Beach Access"],
    investmentTags: ["High ROI", "Premium Location", "Luxury Segment"],
    highlights: [
      "Direct ocean frontage with private beach access",
      "Part of exclusive gated development",
      "All utilities connected",
      "Building permits approved"
    ],
    specifications: {
      zoning: "Residential",
      terrain: "Gentle Slope",
      utilities: ["Water", "Electricity", "Fiber Optic", "Sewage"],
      access: "Private Road",
      views: "Ocean & Mountain"
    },
    isFeatured: true,
    isNew: true,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Mountain View Estate Plot",
    location: "Tamarin",
    region: "West",
    price: 32000000,
    currency: "MUR",
    size: 3200,
    sizeUnit: "m²",
    pricePerUnit: 10000,
    description: "A magnificent estate plot nestled in the foothills of Tamarin Mountain, offering spectacular views of both the mountains and the western coastline. This rare opportunity provides the perfect canvas for creating an exclusive mountain retreat while remaining close to Tamarin's renowned beaches and surf spots.",
    shortDescription: "Magnificent estate plot with mountain and coastline views near Tamarin beaches.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    ],
    features: ["Mountain Views", "Large Plot", "Natural Setting", "Privacy"],
    investmentTags: ["Capital Growth", "Lifestyle Investment"],
    highlights: [
      "Unobstructed mountain views",
      "Large plot ideal for estate development",
      "Natural vegetation and mature trees",
      "Minutes from Tamarin beach"
    ],
    specifications: {
      zoning: "Residential",
      terrain: "Hillside",
      utilities: ["Water", "Electricity"],
      access: "Tarred Road",
      views: "Mountain & Sea"
    },
    isFeatured: true,
    isNew: false,
    createdAt: "2024-01-10"
  },
  {
    id: "3",
    title: "Exclusive Beachfront Parcel",
    location: "Belle Mare",
    region: "East",
    price: 58000000,
    currency: "MUR",
    size: 1800,
    sizeUnit: "m²",
    pricePerUnit: 32222,
    description: "An ultra-rare beachfront parcel on the pristine shores of Belle Mare, one of Mauritius's most coveted coastal locations. This exceptional plot offers direct access to powdery white sand beaches and crystal-clear turquoise waters. Perfect for developing a luxury beachfront villa or boutique resort.",
    shortDescription: "Ultra-rare beachfront parcel on Belle Mare's pristine shores.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&q=80",
    ],
    features: ["Beachfront", "White Sand", "Turquoise Waters", "Exclusive"],
    investmentTags: ["Ultra Premium", "Rare Opportunity", "Trophy Asset"],
    highlights: [
      "Direct beachfront access",
      "Protected lagoon for swimming",
      "Close to 5-star resorts",
      "Ideal for luxury villa development"
    ],
    specifications: {
      zoning: "Residential/Tourism",
      terrain: "Flat",
      utilities: ["Water", "Electricity", "Fiber Optic", "Sewage"],
      access: "Private Road",
      views: "Ocean"
    },
    isFeatured: true,
    isNew: true,
    createdAt: "2024-01-20"
  },
  {
    id: "4",
    title: "Golf Course Frontage",
    location: "Bel Ombre",
    region: "South",
    price: 28000000,
    currency: "MUR",
    size: 2800,
    sizeUnit: "m²",
    pricePerUnit: 10000,
    description: "Premium plot overlooking the championship golf course at Heritage Resort. This exclusive parcel offers the perfect combination of luxury lifestyle and investment potential, situated within one of Mauritius's most prestigious integrated resort schemes.",
    shortDescription: "Premium plot overlooking championship golf course at Heritage Resort.",
    images: [
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
      "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80",
    ],
    features: ["Golf Course Views", "IRS Scheme", "Resort Access", "Security"],
    investmentTags: ["IRS Eligible", "Residency Options", "Stable Investment"],
    highlights: [
      "Direct golf course frontage",
      "Access to resort amenities",
      "24/7 security",
      "Mauritius residency eligible"
    ],
    specifications: {
      zoning: "IRS Residential",
      terrain: "Flat",
      utilities: ["Water", "Electricity", "Fiber Optic", "Sewage", "Gas"],
      access: "Resort Road",
      views: "Golf Course & Mountains"
    },
    isFeatured: false,
    isNew: false,
    createdAt: "2024-01-05"
  },
  {
    id: "5",
    title: "Hillside Panorama Plot",
    location: "Rivière Noire",
    region: "West",
    price: 22000000,
    currency: "MUR",
    size: 4500,
    sizeUnit: "m²",
    pricePerUnit: 4889,
    description: "Expansive hillside plot offering 360-degree panoramic views of the Black River mountains and the western coast. This generous parcel provides exceptional value with its large size and stunning natural setting, perfect for a sprawling estate or eco-retreat.",
    shortDescription: "Expansive hillside plot with 360-degree mountain and coast views.",
    images: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    ],
    features: ["360° Views", "Large Acreage", "Natural Beauty", "Privacy"],
    investmentTags: ["Value Investment", "Development Potential"],
    highlights: [
      "Exceptional 360-degree views",
      "Large plot size",
      "Natural landscape",
      "Close to nature reserves"
    ],
    specifications: {
      zoning: "Residential",
      terrain: "Hillside",
      utilities: ["Water", "Electricity"],
      access: "Gravel Road",
      views: "Mountain, Sea & Valley"
    },
    isFeatured: false,
    isNew: false,
    createdAt: "2023-12-20"
  },
  {
    id: "6",
    title: "Lagoon View Prime Land",
    location: "Trou aux Biches",
    region: "North",
    price: 38000000,
    currency: "MUR",
    size: 2000,
    sizeUnit: "m²",
    pricePerUnit: 19000,
    description: "Stunning lagoon-view plot in the exclusive Trou aux Biches area. This premium parcel overlooks the famous turquoise lagoon and is walking distance to pristine beaches. Ideal for a luxury vacation home or rental investment property.",
    shortDescription: "Stunning lagoon-view plot walking distance to pristine beaches.",
    images: [
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
      "https://images.unsplash.com/photo-1505881402582-c5bc11054f91?w=1200&q=80",
    ],
    features: ["Lagoon Views", "Beach Proximity", "Premium Location", "Investment Ready"],
    investmentTags: ["Rental Potential", "Holiday Home", "Quick ROI"],
    highlights: [
      "Overlooking turquoise lagoon",
      "5-minute walk to beach",
      "Close to restaurants and shops",
      "High rental demand area"
    ],
    specifications: {
      zoning: "Residential",
      terrain: "Flat",
      utilities: ["Water", "Electricity", "Fiber Optic", "Sewage"],
      access: "Tarred Road",
      views: "Lagoon & Ocean"
    },
    isFeatured: true,
    isNew: false,
    createdAt: "2024-01-12"
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Mauritius is the Ultimate Destination for Land Investment",
    excerpt: "Discover the compelling reasons why savvy investors are turning to Mauritius for premium land opportunities.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    author: "Alexandre Dupont",
    date: "2024-01-18",
    category: "Investment",
    readTime: "5 min"
  },
  {
    id: "2",
    title: "Understanding IRS and PDS Schemes in Mauritius",
    excerpt: "A comprehensive guide to the residency programs available through property investment in Mauritius.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    author: "Marie Laurent",
    date: "2024-01-15",
    category: "Legal",
    readTime: "8 min"
  },
  {
    id: "3",
    title: "Top 5 Regions for Land Investment in 2024",
    excerpt: "Our experts analyze the most promising regions for land investment returns this year.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    author: "Jean-Pierre Martin",
    date: "2024-01-10",
    category: "Market Analysis",
    readTime: "6 min"
  }
]

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Richard Thompson",
    role: "Entrepreneur",
    company: "UK",
    content: "Versate made our dream of owning land in Mauritius a reality. Their expertise and attention to detail throughout the process was exceptional.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5
  },
  {
    id: "2",
    name: "Sophie Chen",
    role: "Investment Director",
    company: "Singapore",
    content: "The level of professionalism and market knowledge demonstrated by the Versate team is unmatched. Our portfolio has significantly benefited.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5
  },
  {
    id: "3",
    name: "François Leblanc",
    role: "Family Office Manager",
    company: "France",
    content: "Working with Versate was a seamless experience. They understood our requirements perfectly and delivered beyond expectations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5
  }
]

export const regions = ["All", "North", "South", "East", "West"]

export const stats = [
  { value: "500+", label: "Premium Plots" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "MUR 2B+", label: "In Transactions" },
]

export function formatPrice(price: number, currency: string = "MUR"): string {
  return new Intl.NumberFormat('en-MU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

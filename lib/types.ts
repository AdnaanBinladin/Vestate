// Land/Plot type for the website
export interface Land {
  id: string
  title: string
  slug: string
  location: string
  region: string
  price: number
  currency: string
  size: number
  sizeUnit: string
  pricePerUnit: number
  description: string
  shortDescription: string
  features: string[]
  amenities: string[]
  investmentHighlights: string[]
  images: string[]
  video?: string
  coordinates: {
    lat: number
    lng: number
  }
  status: 'available' | 'reserved' | 'sold'
  type: 'residential' | 'commercial' | 'mixed-use' | 'agricultural'
  isFeatured: boolean
  isNew: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
    role: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    email?: string
  }
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  landId?: string
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  createdAt: string
}

export interface SearchFilters {
  type?: string
  region?: string
  minPrice?: number
  maxPrice?: number
  minSize?: number
  maxSize?: number
  status?: string
}

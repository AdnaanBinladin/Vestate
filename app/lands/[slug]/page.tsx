'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LandCard } from '@/components/home/featured-lands'
import { useLanguage } from '@/components/language-provider'
import { lands } from '@/lib/data'
import {
  MapPin,
  Maximize,
  Heart,
  Share2,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Mail,
  ArrowLeft,
  X,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function LandDetailPage({ params }: PageProps) {
  const { language, t, tr, formatCurrency } = useLanguage()
  const copy = language === 'fr'
    ? {
        home: 'Accueil',
        portfolio: 'Portefeuille',
        back: 'Retour au portefeuille',
        gallery: 'Voir la galerie',
        price: 'Prix',
        landSize: 'Surface du terrain',
        pricePer: 'Prix par',
        type: 'Type',
        description: 'Description',
        features: 'Caracteristiques',
        amenities: 'Commodites',
        highlights: 'Points forts investissement',
        location: 'Emplacement',
        map: 'La carte interactive serait affichee ici',
        coordinates: 'Coordonnees',
        inquire: 'Demande d’information',
        name: 'Votre nom',
        email: 'Adresse email',
        phone: 'Telephone',
        message: 'Votre message',
        send: 'Envoyer la demande',
        visit: 'Planifier une visite',
        brochure: 'Telecharger la brochure',
        immediate: 'Besoin d’aide immediate ?',
        similarEyebrow: 'Vous aimerez aussi',
        similar: 'Proprietes similaires',
        alert: 'Merci pour votre demande. Nous vous contacterons bientot.',
      }
    : {
        home: 'Home',
        portfolio: 'Land Portfolio',
        back: 'Back to Portfolio',
        gallery: 'View Gallery',
        price: 'Price',
        landSize: 'Land Size',
        pricePer: 'Price per',
        type: 'Type',
        description: 'Description',
        features: 'Features',
        amenities: 'Amenities',
        highlights: 'Investment Highlights',
        location: 'Location',
        map: 'Interactive map would be displayed here',
        coordinates: 'Coordinates',
        inquire: 'Inquire About This Property',
        name: 'Your Name',
        email: 'Email Address',
        phone: 'Phone Number',
        message: 'Your Message',
        send: 'Send Inquiry',
        visit: 'Schedule Visit',
        brochure: 'Download Brochure',
        immediate: 'Need immediate assistance?',
        similarEyebrow: 'You May Also Like',
        similar: 'Similar Properties',
        alert: 'Thank you for your inquiry. We will contact you shortly.',
      }
  const { slug } = use(params)
  const land = lands.find((l) => l.slug === slug)
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  if (!land) {
    notFound()
  }

  const similarLands = lands
    .filter((l) => l.id !== land.id && l.region === land.region)
    .slice(0, 3)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % land.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + land.images.length) % land.images.length)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert(copy.alert)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const propertyTypesLabel = (type: string) => {
    const labels: Record<string, string> = {
      residential: 'Residential',
      commercial: 'Commercial',
      'mixed-use': 'Mixed-Use',
      agricultural: 'Agricultural',
    }
    return labels[type] || type
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-gold transition-colors">
              {copy.home}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/lands" className="text-muted-foreground hover:text-gold transition-colors">
              {copy.portfolio}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{tr(land.title)}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/lands"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{copy.back}</span>
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[4/3] cursor-pointer group"
              onClick={() => setIsGalleryOpen(true)}
            >
              <Image
                src={land.images[0]}
                alt={tr(land.title)}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-sm tracking-wider uppercase transition-opacity">
                  {copy.gallery}
                </span>
              </div>
              {/* Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                {land.isNew && (
                  <span className="px-3 py-1 bg-gold text-background text-xs tracking-wider uppercase">
                    {tr('New')}
                  </span>
                )}
                {land.status === 'reserved' && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs tracking-wider uppercase">
                    {t('portfolio.reserved')}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {land.images.slice(1, 5).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-[4/3] cursor-pointer group"
                  onClick={() => {
                    setCurrentImageIndex(index + 1)
                    setIsGalleryOpen(true)
                  }}
                >
                  <Image
                    src={image}
                    alt={`${tr(land.title)} - ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-gold text-sm tracking-wider uppercase mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{tr(land.location)}, {tr(land.region)}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif text-foreground">
                      {tr(land.title)}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-3 border border-border hover:border-gold hover:text-gold transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 border border-border hover:border-gold hover:text-gold transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-card border border-border mb-8">
                  <div>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase mb-1">
                      {copy.price}
                    </p>
                    <p className="text-2xl font-serif text-foreground">
                      {formatCurrency(land.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase mb-1">
                      {copy.landSize}
                    </p>
                    <p className="text-2xl font-serif text-foreground">
                      {land.size.toLocaleString()} {land.sizeUnit}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase mb-1">
                      {copy.pricePer} {land.sizeUnit}
                    </p>
                    <p className="text-2xl font-serif text-foreground">
                      {formatCurrency(land.pricePerUnit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase mb-1">
                      {copy.type}
                    </p>
                    <p className="text-2xl font-serif text-foreground capitalize">
                      {tr(propertyTypesLabel(land.type))}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-foreground mb-4">{copy.description}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {tr(land.description)}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-foreground mb-4">{copy.features}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {land.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-4 bg-card border border-border"
                      >
                        <Check className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-foreground">{tr(feature)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-foreground mb-4">{copy.amenities}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {land.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-4 bg-card border border-border"
                      >
                        <Check className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-foreground">{tr(amenity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investment Highlights */}
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-foreground mb-4">
                    {copy.highlights}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {land.investmentHighlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-3 p-4 bg-gold/10 border border-gold/20"
                      >
                        <Check className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-foreground">{tr(highlight)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mb-12">
                  <h2 className="text-2xl font-serif text-foreground mb-4">{copy.location}</h2>
                  <div className="aspect-video bg-card border border-border flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {copy.map}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {copy.coordinates}: {land.coordinates.lat}, {land.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-28"
              >
                {/* Inquiry Form */}
                <div className="bg-card border border-border p-6 mb-6">
                  <h3 className="text-xl font-serif text-foreground mb-6">
                    {copy.inquire}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder={copy.name}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder={copy.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder={copy.phone}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder={copy.message}
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gold text-background py-4 font-medium tracking-wider uppercase hover:bg-gold-light transition-colors"
                    >
                      {copy.send}
                    </button>
                  </form>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 border border-border py-4 text-foreground hover:border-gold hover:text-gold transition-colors">
                    <Calendar className="w-5 h-5" />
                    <span className="tracking-wider uppercase text-sm">{copy.visit}</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-border py-4 text-foreground hover:border-gold hover:text-gold transition-colors">
                    <Download className="w-5 h-5" />
                    <span className="tracking-wider uppercase text-sm">{copy.brochure}</span>
                  </button>
                </div>

                {/* Contact */}
                <div className="mt-6 p-6 bg-card border border-border">
                  <p className="text-muted-foreground text-sm mb-4">
                    {copy.immediate}
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+2305555555"
                      className="flex items-center gap-3 text-foreground hover:text-gold transition-colors"
                    >
                      <Phone className="w-5 h-5 text-gold" />
                      <span>+230 555 5555</span>
                    </a>
                    <a
                      href="mailto:inquiry@vestate.mu"
                      className="flex items-center gap-3 text-foreground hover:text-gold transition-colors"
                    >
                      <Mail className="w-5 h-5 text-gold" />
                      <span>inquiry@vestate.mu</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similarLands.length > 0 && (
        <section className="py-24 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
                {copy.similarEyebrow}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
                {copy.similar}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarLands.map((land, index) => (
                <LandCard key={land.id} land={land} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen Gallery */}
      {isGalleryOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-gold transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-6 p-2 text-white hover:text-gold transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-6 p-2 text-white hover:text-gold transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-8">
            <Image
              src={land.images[currentImageIndex]}
              alt={`${tr(land.title)} - ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {land.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}

      <Footer />
    </main>
  )
}

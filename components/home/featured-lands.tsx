'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { MapPin, Maximize, Heart, ArrowRight } from 'lucide-react'
import { Land } from '@/lib/types'
import { cn } from '@/lib/utils'

interface LandCardProps {
  land: Land
  index?: number
}

export function LandCard({ land, index = 0 }: LandCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`
    }
    return `${(price / 1000).toFixed(0)}K`
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/lands/${land.slug}`} className="group block">
        <div className="relative overflow-hidden bg-card border border-border">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={land.images[0]}
              alt={land.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Tags */}
            <div className="absolute top-4 left-4 flex gap-2">
              {land.isNew && (
                <span className="px-3 py-1 bg-gold text-background text-xs tracking-wider uppercase">
                  New
                </span>
              )}
              {land.isFeatured && (
                <span className="px-3 py-1 bg-white text-background text-xs tracking-wider uppercase">
                  Featured
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                // Add to favorites logic
              }}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white hover:text-gold transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>

            {/* Quick Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-white text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{land.region}</span>
                </div>
                <div className="flex items-center gap-1 text-white text-sm">
                  <Maximize className="w-4 h-4" />
                  <span>{land.size.toLocaleString()} {land.sizeUnit}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gold" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-gold text-xs tracking-wider uppercase mb-3">
              <MapPin className="w-3 h-3" />
              <span>{land.location}</span>
            </div>
            <h3 className="text-lg font-serif text-foreground mb-3 line-clamp-2 group-hover:text-gold transition-colors duration-300">
              {land.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {land.shortDescription}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-2xl font-serif text-foreground">
                  {land.currency} {formatPrice(land.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {land.currency} {land.pricePerUnit.toLocaleString()}/{land.sizeUnit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface FeaturedLandsProps {
  lands: Land[]
}

export function FeaturedLands({ lands }: FeaturedLandsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const featuredLands = lands.filter((land) => land.isFeatured).slice(0, 3)

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Exclusive Selection
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif text-foreground mb-6">
            Featured Land Opportunities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium plots in Mauritius&apos; 
            most sought-after locations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLands.map((land, index) => (
            <LandCard key={land.id} land={land} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/lands"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase">View All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

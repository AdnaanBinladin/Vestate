"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, MapPin, Maximize2 } from "lucide-react"
import { Land, formatPrice } from "@/lib/data"
import { cn } from "@/lib/utils"

interface LandCardProps {
  land: Land
  index?: number
}

export function LandCard({ land, index = 0 }: LandCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-sm overflow-hidden"
    >
      <Link href={`/lands/${land.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={land.images[0]}
            alt={land.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {land.isNew && (
              <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium tracking-wide">
                NEW
              </span>
            )}
            {land.isFeatured && (
              <span className="px-3 py-1 bg-foreground text-background text-xs font-medium tracking-wide">
                FEATURED
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button 
            className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:text-accent transition-colors"
            onClick={(e) => {
              e.preventDefault()
              // Handle favorite
            }}
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5" />
          </button>

          {/* Size Badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-sm">
            <Maximize2 className="w-4 h-4" />
            <span>{land.size.toLocaleString()} {land.sizeUnit}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 lg:p-6">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-accent text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{land.location}, {land.region}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-1">
            {land.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
            {land.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-baseline justify-between pt-4 border-t border-border">
            <div>
              <span className="text-2xl font-light text-foreground">
                {formatPrice(land.price, land.currency)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatPrice(land.pricePerUnit, land.currency)}/{land.sizeUnit}
            </span>
          </div>

          {/* Investment Tags */}
          {land.investmentTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {land.investmentTags.slice(0, 2).map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

interface LandCardFeaturedProps {
  land: Land
  reversed?: boolean
}

export function LandCardFeatured({ land, reversed = false }: LandCardFeaturedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
        reversed && "lg:direction-rtl"
      )}
    >
      <Link 
        href={`/lands/${land.id}`}
        className={cn("relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden group", reversed && "lg:order-2")}
      >
        <Image
          src={land.images[0]}
          alt={land.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
      </Link>
      
      <div className={cn("lg:py-8", reversed && "lg:order-1 lg:text-right")}>
        <div className={cn("flex items-center gap-2 text-accent text-sm mb-3", reversed && "lg:justify-end")}>
          <MapPin className="w-4 h-4" />
          <span>{land.location}, {land.region}</span>
        </div>
        
        <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
          {land.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6">
          {land.description}
        </p>
        
        <div className={cn("flex flex-wrap gap-6 mb-6", reversed && "lg:justify-end")}>
          <div>
            <span className="block text-sm text-muted-foreground mb-1">Price</span>
            <span className="text-2xl font-light text-foreground">{formatPrice(land.price, land.currency)}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground mb-1">Size</span>
            <span className="text-2xl font-light text-foreground">{land.size.toLocaleString()} {land.sizeUnit}</span>
          </div>
        </div>
        
        <div className={cn("flex flex-wrap gap-2 mb-8", reversed && "lg:justify-end")}>
          {land.features.map((feature) => (
            <span 
              key={feature}
              className="px-3 py-1.5 border border-border text-sm text-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <Link
          href={`/lands/${land.id}`}
          className="inline-block px-8 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

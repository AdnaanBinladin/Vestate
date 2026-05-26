'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { MapPin, Maximize, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { agriculturalLandSales, hotelDevelopments, houseRentals } from '@/lib/data'
import { Land, Opportunity } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CardImageCarouselProps {
  images: string[]
  alt: string
  children?: ReactNode
}

function CardImageCarousel({ images, alt, children }: CardImageCarouselProps) {
  const { t } = useLanguage()
  const galleryImages =
    images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80']
  const hasMultipleImages = galleryImages.length > 1
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: hasMultipleImages,
  })

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    updateSelectedIndex()
    emblaApi.on('select', updateSelectedIndex)
    emblaApi.on('reInit', updateSelectedIndex)

    return () => {
      emblaApi.off('select', updateSelectedIndex)
      emblaApi.off('reInit', updateSelectedIndex)
    }
  }, [emblaApi, updateSelectedIndex])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index)
  }, [emblaApi])

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <div ref={emblaRef} className="h-full overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex h-full">
          {galleryImages.map((image, imageIndex) => (
            <div
              key={`${image}-${imageIndex}`}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={image}
                alt={imageIndex === 0 ? alt : `${alt} ${imageIndex + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                draggable={false}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {children}

      {hasMultipleImages && (
        <>
          <button
            type="button"
            aria-label={t('gallery.previous')}
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-black/50 p-2 text-white opacity-100 backdrop-blur-sm transition-colors hover:text-gold sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={t('gallery.next')}
            onClick={scrollNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-black/50 p-2 text-white opacity-100 backdrop-blur-sm transition-colors hover:text-gold sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {galleryImages.map((_, imageIndex) => (
              <button
                key={imageIndex}
                type="button"
                aria-label={`${t('gallery.showImage')} ${imageIndex + 1}`}
                onClick={() => scrollTo(imageIndex)}
                className={cn(
                  'h-1.5 w-5 bg-white/45 transition-colors hover:bg-white',
                  selectedIndex === imageIndex && 'bg-gold'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

interface LandCardProps {
  land: Land
  index?: number
}

export function LandCard({ land, index = 0 }: LandCardProps) {
  const { tr, formatCompactCurrency, formatCurrency } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="group relative overflow-hidden bg-card border border-border">
        <CardImageCarousel images={land.images} alt={tr(land.title)}>
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              {land.isNew && (
                <span className="px-3 py-1 bg-gold text-background text-xs tracking-wider uppercase">
                  {tr('New')}
                </span>
              )}
              {land.isFeatured && (
                <span className="px-3 py-1 bg-white text-background text-xs tracking-wider uppercase">
                  {tr('Featured')}
                </span>
              )}
            </div>

            <button
              type="button"
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm text-white hover:text-gold transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>

            <div className="absolute bottom-10 left-4 right-4 z-20 flex items-end justify-between gap-4 text-white">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-1 text-xs uppercase tracking-wider text-gold">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{tr(land.location)}, {tr(land.region)}</span>
                </div>
                <p className="mb-2 line-clamp-1 font-serif text-xl">
                  {tr(land.title)}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
                  <span>{formatCompactCurrency(land.price)}</span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    {land.size.toLocaleString()} {land.sizeUnit}
                  </span>
                </div>
              </div>
              <Link href={`/lands/${land.slug}`} aria-label={tr(land.title)}>
                <ArrowRight className="w-5 h-5 text-gold" />
              </Link>
            </div>
        </CardImageCarousel>

          <div className="p-6">
            <div className="flex items-center gap-2 text-gold text-xs tracking-wider uppercase mb-3">
              <MapPin className="w-3 h-3" />
              <span>{tr(land.location)}</span>
            </div>
            <Link href={`/lands/${land.slug}`}>
              <h3 className="text-lg font-serif text-foreground mb-3 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                {tr(land.title)}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {tr(land.shortDescription)}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-2xl font-serif text-foreground">
                  {formatCompactCurrency(land.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(land.pricePerUnit)}/{land.sizeUnit}
                </p>
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  )
}

interface OpportunityCardProps {
  opportunity: Opportunity
  index?: number
}

export function OpportunityCard({ opportunity, index = 0 }: OpportunityCardProps) {
  const { t, tr, formatCompactCurrency } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const images = opportunity.images || [opportunity.image]

  const formatOpportunityPrice = (price: string) => {
    const match = price.match(/^From MUR ([\d.]+)(M|K)(\/month)?$/)

    if (!match) {
      return tr(price)
    }

    const amount = Number(match[1]) * (match[2] === 'M' ? 1000000 : 1000)
    const suffix = match[3] ? t('price.monthSuffix') : ''

    return `${t('price.from')} ${formatCompactCurrency(amount)}${suffix}`
  }

  const displayPrice = formatOpportunityPrice(opportunity.price)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="group relative overflow-hidden bg-card border border-border">
        <CardImageCarousel images={images} alt={tr(opportunity.title)}>
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
              {opportunity.tags.map((tag, tagIndex) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-xs tracking-wider uppercase ${
                    tagIndex === 0 ? 'bg-gold text-background' : 'bg-white text-background'
                  }`}
                >
                  {tr(tag)}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm text-white hover:text-gold transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>

            <div className="absolute bottom-10 left-4 right-4 z-20 flex items-end justify-between gap-4 text-white">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-1 text-xs uppercase tracking-wider text-gold">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{tr(opportunity.location)}</span>
                </div>
                <p className="mb-2 line-clamp-1 font-serif text-xl">
                  {tr(opportunity.title)}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
                  <span>{displayPrice}</span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    {tr(opportunity.size)}
                  </span>
                </div>
              </div>
              <Link href="/contact" aria-label={tr(opportunity.title)}>
                <ArrowRight className="w-5 h-5 text-gold" />
              </Link>
            </div>
        </CardImageCarousel>

          <div className="p-6">
            <div className="flex items-center gap-2 text-gold text-xs tracking-wider uppercase mb-3">
              <MapPin className="w-3 h-3" />
              <span>{tr(opportunity.location)}</span>
            </div>
            <Link href="/contact">
              <h3 className="text-lg font-serif text-foreground mb-3 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                {tr(opportunity.title)}
              </h3>
            </Link>
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
              <p className="text-xl font-serif text-foreground">{displayPrice}</p>
              <p className="text-xs text-muted-foreground text-right">{tr(opportunity.size)}</p>
            </div>
          </div>
        </div>
    </motion.div>
  )
}

interface FeaturedLandsProps {
  lands: Land[]
}

export function FeaturedLands({ lands }: FeaturedLandsProps) {
  const { t } = useLanguage()
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
            {t('featured.eyebrow')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif text-foreground mb-6">
            {t('featured.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('featured.description')}
          </p>
        </motion.div>

        <div className="mb-8">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            {t('featured.landEyebrow')}
          </p>
          <h3 className="text-3xl sm:text-4xl font-serif text-foreground">
            {t('featured.landTitle')}
          </h3>
        </div>

        {/* Land Grid */}
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
            href="/lands?category=land-sales"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase">{t('featured.viewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="mt-24 mb-8">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            {t('featured.agriEyebrow')}
          </p>
          <h3 className="text-3xl sm:text-4xl font-serif text-foreground">
            {t('featured.agriTitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agriculturalLandSales.slice(0, 3).map((opportunity, index) => (
            <OpportunityCard key={opportunity.title} opportunity={opportunity} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/lands?category=agricultural-land-sales"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase">{t('featured.viewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="mt-24 mb-8">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            {t('featured.houseEyebrow')}
          </p>
          <h3 className="text-3xl sm:text-4xl font-serif text-foreground">
            {t('featured.houseTitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houseRentals.slice(0, 3).map((opportunity, index) => (
            <OpportunityCard key={opportunity.title} opportunity={opportunity} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/lands?category=house-rentals"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase">{t('featured.viewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="mt-24 mb-8">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            {t('featured.hotelEyebrow')}
          </p>
          <h3 className="text-3xl sm:text-4xl font-serif text-foreground">
            {t('featured.hotelTitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotelDevelopments.slice(0, 3).map((opportunity, index) => (
            <OpportunityCard key={opportunity.title} opportunity={opportunity} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/lands?category=hotel-development"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase">{t('featured.viewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

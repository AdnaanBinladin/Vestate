'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LandCard, OpportunityCard } from '@/components/home/featured-lands'
import { useLanguage } from '@/components/language-provider'
import {
  agriculturalLandSales,
  hotelDevelopments,
  houseRentals,
  lands,
  regions,
  propertyTypes,
} from '@/lib/data'
import { SlidersHorizontal, X, Grid, List } from 'lucide-react'
import { Land } from '@/lib/types'

const portfolioCategories = [
  {
    value: 'land-sales',
    labelKey: 'portfolio.land.label',
    eyebrowKey: 'portfolio.land.eyebrow',
    titleKey: 'portfolio.land.title',
    descriptionKey: 'portfolio.land.description',
  },
  {
    value: 'agricultural-land-sales',
    labelKey: 'portfolio.agri.label',
    eyebrowKey: 'portfolio.agri.eyebrow',
    titleKey: 'portfolio.agri.title',
    descriptionKey: 'portfolio.agri.description',
  },
  {
    value: 'house-rentals',
    labelKey: 'portfolio.house.label',
    eyebrowKey: 'portfolio.house.eyebrow',
    titleKey: 'portfolio.house.title',
    descriptionKey: 'portfolio.house.description',
  },
  {
    value: 'hotel-development',
    labelKey: 'portfolio.hotel.label',
    eyebrowKey: 'portfolio.hotel.eyebrow',
    titleKey: 'portfolio.hotel.title',
    descriptionKey: 'portfolio.hotel.description',
  },
] as const

function LandsContent() {
  const { t, tr } = useLanguage()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || 'land-sales'
  const activeCategory =
    portfolioCategories.find((category) => category.value === categoryParam) ||
    portfolioCategories[0]
  const isLandSales = activeCategory.value === 'land-sales'
  const selectedOpportunities =
    activeCategory.value === 'agricultural-land-sales'
      ? agriculturalLandSales
      : activeCategory.value === 'house-rentals'
        ? houseRentals
        : hotelDevelopments
  const [filteredLands, setFilteredLands] = useState<Land[]>(lands)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    region: searchParams.get('region') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    status: '',
    sortBy: 'newest',
  })

  useEffect(() => {
    let result = [...lands]

    if (filters.type) {
      result = result.filter((land) => land.type === filters.type)
    }
    if (filters.region) {
      result = result.filter((land) => land.region.toLowerCase() === filters.region.toLowerCase())
    }
    if (filters.minPrice) {
      result = result.filter((land) => land.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      result = result.filter((land) => land.price <= parseInt(filters.maxPrice))
    }
    if (filters.status) {
      result = result.filter((land) => land.status === filters.status)
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'size':
        result.sort((a, b) => b.size - a.size)
        break
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredLands(result)
  }, [filters])

  const clearFilters = () => {
    setFilters({
      type: '',
      region: '',
      minPrice: '',
      maxPrice: '',
      status: '',
      sortBy: 'newest',
    })
  }

  const activeFiltersCount = [
    filters.type,
    filters.region,
    filters.minPrice,
    filters.maxPrice,
    filters.status,
  ].filter(Boolean).length

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              {t(activeCategory.eyebrowKey)}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              {t(activeCategory.titleKey)}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t(activeCategory.descriptionKey)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {portfolioCategories.map((category) => (
              <Link
                key={category.value}
                href={`/lands?category=${category.value}`}
                className={`px-5 py-3 text-sm tracking-wider uppercase border transition-colors ${
                  activeCategory.value === category.value
                    ? 'bg-gold text-background border-gold'
                    : 'border-border text-foreground hover:border-gold hover:text-gold'
                }`}
              >
                {t(category.labelKey)}
              </Link>
            ))}
          </div>

          {/* Filter Bar */}
          {isLandSales && (
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border hover:border-gold transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{t('portfolio.filters')}</span>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 bg-gold text-background text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <X className="w-4 h-4" />
                  {t('portfolio.clearAll')}
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <p className="text-muted-foreground text-sm">
                {filteredLands.length} {t('portfolio.propertiesFound')}
              </p>
              
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="bg-input border border-border px-4 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
              >
                <option value="newest">{t('portfolio.sortNewest')}</option>
                <option value="price-low">{t('portfolio.sortPriceLow')}</option>
                <option value="price-high">{t('portfolio.sortPriceHigh')}</option>
                <option value="size">{t('portfolio.sortSize')}</option>
              </select>

              <div className="hidden sm:flex items-center border border-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gold text-background' : 'hover:text-gold'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gold text-background' : 'hover:text-gold'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
            </div>
          )}

          {/* Expandable Filters */}
          {isLandSales && isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 bg-card border border-border"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    {t('search.propertyType')}
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold"
                  >
                    <option value="">{t('search.allTypes')}</option>
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {tr(type.label)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    {t('search.region')}
                  </label>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold"
                  >
                    <option value="">{t('search.allRegions')}</option>
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {tr(region.label)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    {t('portfolio.minPrice')}
                  </label>
                  <input
                    type="number"
                    placeholder={t('search.any')}
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    {t('portfolio.maxPrice')}
                  </label>
                  <input
                    type="number"
                    placeholder={t('search.any')}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    {t('portfolio.status')}
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold"
                  >
                    <option value="">{t('portfolio.allStatus')}</option>
                    <option value="available">{t('portfolio.available')}</option>
                    <option value="reserved">{t('portfolio.reserved')}</option>
                    <option value="sold">{t('portfolio.sold')}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {!isLandSales && (
            <p className="text-muted-foreground text-sm mb-8">
              {selectedOpportunities.length} {t('portfolio.propertiesFound')}
            </p>
          )}

          {/* Results */}
          {isLandSales && filteredLands.length > 0 ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredLands.map((land, index) => (
                <LandCard key={land.id} land={land} index={index} />
              ))}
            </div>
          ) : !isLandSales ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {selectedOpportunities.map((opportunity, index) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg mb-4">
                {t('portfolio.noMatches')}
              </p>
              <button
                onClick={clearFilters}
                className="text-gold hover:text-gold-light transition-colors"
              >
                {t('portfolio.clearTry')}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function LandsPage() {
  return (
    <Suspense fallback={null}>
      <LandsContent />
    </Suspense>
  )
}

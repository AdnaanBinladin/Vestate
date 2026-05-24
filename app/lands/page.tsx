'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LandCard } from '@/components/home/featured-lands'
import { lands, regions, propertyTypes } from '@/lib/data'
import { Search, MapPin, Maximize, DollarSign, SlidersHorizontal, X, Grid, List } from 'lucide-react'
import { Land } from '@/lib/types'

export default function LandsPage() {
  const searchParams = useSearchParams()
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
              Land Portfolio
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              Discover Premium Lands
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our curated collection of exceptional land opportunities 
              across Mauritius&apos; most prestigious locations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border hover:border-gold transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
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
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <p className="text-muted-foreground text-sm">
                {filteredLands.length} properties found
              </p>
              
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="bg-input border border-border px-4 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="size">Largest First</option>
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

          {/* Expandable Filters */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 bg-card border border-border"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    Region
                  </label>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold"
                  >
                    <option value="">All Regions</option>
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    Min Price (MUR)
                  </label>
                  <input
                    type="number"
                    placeholder="Any"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    Max Price (MUR)
                  </label>
                  <input
                    type="number"
                    placeholder="Any"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold"
                  >
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {filteredLands.length > 0 ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredLands.map((land, index) => (
                <LandCard key={land.id} land={land} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg mb-4">
                No properties match your criteria
              </p>
              <button
                onClick={clearFilters}
                className="text-gold hover:text-gold-light transition-colors"
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { Search, MapPin, Maximize, DollarSign } from 'lucide-react'
import { regions, propertyTypes } from '@/lib/data'
import { useLanguage } from '@/components/language-provider'

export function SearchSection() {
  const { t, tr } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const router = useRouter()

  const [filters, setFilters] = useState({
    type: '',
    region: '',
    minPrice: '',
    maxPrice: '',
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (filters.type) params.set('type', filters.type)
    if (filters.region) params.set('region', filters.region)
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    router.push(`/lands?${params.toString()}`)
  }

  return (
    <section ref={ref} className="relative -mt-8 z-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="bg-card border border-border p-6 lg:p-8"
        >
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {/* Property Type */}
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  {t('search.propertyType')}
                </label>
                <div className="relative">
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground appearance-none focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">{t('search.allTypes')}</option>
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {tr(type.label)}
                      </option>
                    ))}
                  </select>
                  <Maximize className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  {t('search.region')}
                </label>
                <div className="relative">
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground appearance-none focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">{t('search.allRegions')}</option>
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {tr(region.label)}
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  {t('search.minBudget')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder={t('search.any')}
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                  <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                  {t('search.maxBudget')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder={t('search.any')}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                  <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold text-background px-6 py-3 font-medium tracking-wider uppercase hover:bg-gold-light transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('search.submit')}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

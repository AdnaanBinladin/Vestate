'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, Hotel, MapPin, Sprout } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const services = [
  {
    icon: Building2,
    titleKey: 'intro.landSales',
    descriptionKey: 'intro.landSalesDesc',
  },
  {
    icon: Sprout,
    titleKey: 'intro.agriSales',
    descriptionKey: 'intro.agriSalesDesc',
  },
  {
    icon: Hotel,
    titleKey: 'intro.hotelDevelopment',
    descriptionKey: 'intro.hotelDevelopmentDesc',
  },
] as const

export function IntroductionSection() {
  const { t, tr } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              {t('intro.eyebrow')}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
              {t('intro.title')}
            </h2>
            <div className="space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
              <p>
                {t('intro.body1')}
              </p>
              <p>
                {t('intro.body2')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
          >
            <div className="p-6 bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">
                    {t('intro.location')}
                  </p>
                  <h3 className="text-xl font-serif text-foreground">
                    {t('intro.place')}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{tr('Mauritius')}</p>
                </div>
              </div>
            </div>

            {services.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.25 + index * 0.08 }}
                className="p-6 bg-card border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-foreground mb-2">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(service.descriptionKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

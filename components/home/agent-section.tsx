'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Building2, Home, Hotel, Phone, Sprout } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const specialties = [
  {
    icon: Building2,
    labelKey: 'agent.specialtyLand',
  },
  {
    icon: Sprout,
    labelKey: 'agent.specialtyAgri',
  },
  {
    icon: Home,
    labelKey: 'agent.specialtyHouse',
  },
  {
    icon: Hotel,
    labelKey: 'agent.specialtyHotel',
  },
] as const

export function AgentSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-border">
              <Image
                src="/agents/jaunbocus-uways.png"
                alt="Jaunbocus Uways, Vestate agent"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-8 left-6 right-6 bg-background border border-border p-6">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
                {t('agent.cardEyebrow')}
              </p>
              <h3 className="text-2xl font-serif text-foreground">
                Jaunbocus Uways
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              {t('agent.eyebrow')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-serif text-foreground mb-6 leading-tight">
              {t('agent.title')}
            </h2>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed mb-10">
              <p>
                {t('agent.body1')}
              </p>
              <p>
                {t('agent.body2')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
              {specialties.map((specialty, index) => (
                <motion.div
                  key={specialty.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                  className="p-5 bg-background border border-border"
                >
                  <specialty.icon className="w-6 h-6 text-gold mb-4" />
                  <p className="text-foreground text-sm tracking-wider uppercase">
                    {t(specialty.labelKey)}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-colors"
              >
                {t('agent.contact')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+2305555555"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-medium tracking-wider uppercase hover:border-gold hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t('agent.call')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

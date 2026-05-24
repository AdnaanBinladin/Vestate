'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Shield, Globe, TrendingUp, Award } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Secure Investment',
    description: 'Full legal protection with transparent documentation and due diligence.',
  },
  {
    icon: Globe,
    title: 'Foreign Ownership',
    description: 'Eligible properties under IRS and PDS schemes for international investors.',
  },
  {
    icon: TrendingUp,
    title: 'High Returns',
    description: 'Consistent appreciation with average returns of 12-18% annually.',
  },
  {
    icon: Award,
    title: 'Premium Locations',
    description: 'Exclusive access to the most prestigious land parcels in Mauritius.',
  },
]

export function InvestmentSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Investment Opportunity
            </p>
            <h2 className="text-4xl sm:text-5xl font-serif text-foreground mb-6 leading-tight">
              Why Invest in <br />
              <span className="text-gold">Mauritius Land</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Mauritius offers a unique combination of political stability, 
              favorable tax environment, and exceptional natural beauty, making 
              it the premier destination for luxury land investment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/investment"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80"
                alt="Mauritius aerial view"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-card border border-border p-6 max-w-xs"
            >
              <p className="text-gold text-4xl font-serif mb-2">15%+</p>
              <p className="text-foreground font-medium mb-1">Average Annual Return</p>
              <p className="text-muted-foreground text-sm">
                on premium land investments over the past 5 years
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

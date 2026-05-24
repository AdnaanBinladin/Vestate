'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-card to-background" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Start Your Journey
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6 leading-tight">
            Ready to Invest in <br />
            <span className="text-gold">Your Future?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            Connect with our team of luxury land specialists and discover 
            the perfect investment opportunity tailored to your goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/lands"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
            >
              Browse Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium tracking-wider uppercase hover:border-gold hover:text-gold transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            Start Your Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Ready to Invest in Paradise?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Let our expert team guide you through the process of finding and 
            acquiring your perfect piece of Mauritius. Schedule a consultation today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-all duration-300 group"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/lands"
              className="w-full sm:w-auto px-10 py-4 border border-border text-foreground font-medium tracking-wide hover:border-accent hover:text-accent transition-all duration-300 text-center"
            >
              Browse Properties
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

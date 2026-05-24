"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { LandCard } from "@/components/land-card"
import { lands } from "@/lib/data"
import { ArrowRight } from "lucide-react"

export function FeaturedLands() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredLands = lands.filter(land => land.isFeatured)

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            Curated Selection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Handpicked premium land opportunities representing the finest 
            investment potential in Mauritius.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredLands.map((land, index) => (
            <LandCard key={land.id} land={land} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/lands"
            className="inline-flex items-center gap-3 px-8 py-4 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
          >
            <span className="font-medium tracking-wide">View All Properties</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

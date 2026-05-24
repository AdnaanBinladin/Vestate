"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Shield, TrendingUp, Globe, Award } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Secure Investment",
    description: "Protected ownership with full legal documentation and title deed security."
  },
  {
    icon: TrendingUp,
    title: "Capital Growth",
    description: "Mauritius land has shown consistent appreciation over the past decade."
  },
  {
    icon: Globe,
    title: "Residency Options",
    description: "Qualify for permanent residency through qualifying property investments."
  },
  {
    icon: Award,
    title: "Premium Locations",
    description: "Access to exclusive plots in the most sought-after regions of Mauritius."
  }
]

export function InvestmentSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              Why Invest
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              The Gateway to
              <br />
              <span className="text-accent">Paradise Investment</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Mauritius offers a unique combination of political stability, 
              favorable tax environment, and exceptional quality of life, 
              making it one of the world&apos;s premier destinations for 
              luxury land investment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/investment"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-colors"
            >
              Learn More About Investment
            </Link>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80"
                    alt="Mauritius coastline"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
                    alt="Luxury land"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
                    alt="Mountain views"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"
                    alt="Beach property"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-accent/30" />
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-accent/30" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

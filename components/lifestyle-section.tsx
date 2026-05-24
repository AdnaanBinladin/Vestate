"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

export function LifestyleSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
          alt="Mauritius lifestyle"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              The Mauritius Lifestyle
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Experience the Extraordinary
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              More than just an investment, owning land in Mauritius opens the door to 
              an exceptional lifestyle. Crystal-clear lagoons, world-class golf courses, 
              exquisite cuisine, and a warm, welcoming culture await.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { value: "330+", label: "Days of Sunshine" },
                { value: "#1", label: "Africa\'s Safest Country" },
                { value: "0%", label: "Capital Gains Tax" },
                { value: "15%", label: "Flat Income Tax" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="text-center"
                >
                  <span className="block text-2xl lg:text-3xl font-serif text-accent mb-1">
                    {stat.value}
                  </span>
                  <span className="text-white/60 text-xs lg:text-sm">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-block px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-colors"
            >
              Discover Mauritius
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

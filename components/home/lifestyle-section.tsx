'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const lifestyleImages = [
  {
    src: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800&q=80',
    alt: 'Mauritius beach',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=800&q=80',
    alt: 'Mauritius landscape',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    alt: 'Luxury living',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    alt: 'Water activities',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
    alt: 'Aerial view',
    span: 'col-span-1 row-span-1',
  },
]

export function LifestyleSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 grid-rows-3 gap-4 h-[600px]"
          >
            {lifestyleImages.map((image, index) => (
              <motion.div
                key={image.alt}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden ${image.span}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              The Mauritius Lifestyle
            </p>
            <h2 className="text-4xl sm:text-5xl font-serif text-foreground mb-6 leading-tight">
              Experience <br />
              <span className="text-gold">Paradise Living</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Mauritius is more than an investment destination — it&apos;s a gateway 
                to an extraordinary lifestyle. Crystal-clear lagoons, pristine beaches, 
                and lush tropical landscapes create the perfect backdrop for luxury living.
              </p>
              <p>
                From world-class golf courses and exclusive beach clubs to fine dining 
                and vibrant cultural experiences, Mauritius offers a unique blend of 
                relaxation and sophistication.
              </p>
              <p>
                Your land investment here isn&apos;t just about returns — it&apos;s about 
                securing your place in one of the world&apos;s most desirable destinations.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-8 pt-10 border-t border-border">
              <div>
                <p className="text-3xl font-serif text-gold mb-2">330</p>
                <p className="text-muted-foreground text-sm">Sunny Days Per Year</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-gold mb-2">120+</p>
                <p className="text-muted-foreground text-sm">Golf Courses</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-gold mb-2">Top 10</p>
                <p className="text-muted-foreground text-sm">Safest Countries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

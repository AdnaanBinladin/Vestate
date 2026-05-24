'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatItemProps {
  label: string
  value: string
  suffix: string
  delay?: number
}

function StatItem({ label, value, suffix, delay = 0 }: StatItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
      const duration = 2000
      const startTime = Date.now() + delay * 1000
      const endTime = startTime + duration

      const animate = () => {
        const now = Date.now()
        if (now < startTime) {
          requestAnimationFrame(animate)
          return
        }
        
        const progress = Math.min((now - startTime) / duration, 1)
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        const currentValue = numericValue * easeProgress

        if (value.includes('+')) {
          setDisplayValue(Math.floor(currentValue).toString())
        } else if (value.includes('.')) {
          setDisplayValue(currentValue.toFixed(1))
        } else {
          setDisplayValue(Math.floor(currentValue).toString())
        }

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setDisplayValue(value.replace('+', ''))
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-5xl sm:text-6xl lg:text-7xl font-serif text-gold mb-4">
        {displayValue}
        {value.includes('+') && <span>+</span>}
        {suffix && <span className="text-3xl ml-2">{suffix}</span>}
      </div>
      <p className="text-foreground/80 text-sm tracking-wider uppercase">
        {label}
      </p>
    </motion.div>
  )
}

interface StatsProps {
  stats: Array<{ label: string; value: string; suffix: string }>
}

export function StatsSection({ stats }: StatsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Our Track Record
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif text-foreground">
            Excellence in Numbers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

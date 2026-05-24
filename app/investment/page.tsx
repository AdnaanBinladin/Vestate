'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  Shield,
  TrendingUp,
  Globe,
  FileText,
  Building,
  CheckCircle,
  ArrowRight,
  Users,
  Briefcase,
} from 'lucide-react'

const investmentSchemes = [
  {
    title: 'IRS - Integrated Resort Scheme',
    description: 'Allows non-citizens to purchase residential property in approved IRS developments with a minimum investment threshold.',
    features: [
      'Permanent residence permit for investments over USD 375,000',
      'Access to world-class resort amenities',
      'Rental income potential',
      'Capital appreciation benefits',
    ],
    minInvestment: 'USD 375,000',
  },
  {
    title: 'PDS - Property Development Scheme',
    description: 'A flexible scheme allowing the development of high-end residential properties with minimum investment requirements.',
    features: [
      'Permanent residence for investments over USD 375,000',
      'Greater flexibility in property types',
      'Mixed-use development opportunities',
      'No restriction on number of units',
    ],
    minInvestment: 'USD 375,000',
  },
  {
    title: 'Smart City Scheme',
    description: 'Modern developments combining residential, commercial, and leisure facilities in integrated smart environments.',
    features: [
      'State-of-the-art infrastructure',
      'Sustainable living concepts',
      'Business and residential mix',
      'Government incentives',
    ],
    minInvestment: 'USD 375,000',
  },
]

const benefits = [
  {
    icon: Shield,
    title: 'Political Stability',
    description: 'Mauritius enjoys one of Africa\'s most stable democracies with a strong rule of law.',
  },
  {
    icon: TrendingUp,
    title: 'Growing Economy',
    description: 'Consistent GDP growth and a diversified economy spanning tourism, finance, and technology.',
  },
  {
    icon: Globe,
    title: 'Tax Advantages',
    description: 'No capital gains tax, attractive corporate tax rates, and numerous double taxation treaties.',
  },
  {
    icon: FileText,
    title: 'Legal Framework',
    description: 'Transparent property laws based on both French civil law and English common law traditions.',
  },
  {
    icon: Building,
    title: 'Infrastructure',
    description: 'Modern infrastructure with international connectivity and world-class amenities.',
  },
  {
    icon: Users,
    title: 'Quality of Life',
    description: 'Exceptional lifestyle with beautiful beaches, pleasant climate, and multilingual population.',
  },
]

const process = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'Meet with our investment advisors to discuss your goals, budget, and preferences.',
  },
  {
    step: '02',
    title: 'Property Selection',
    description: 'Browse our curated portfolio and visit properties that match your criteria.',
  },
  {
    step: '03',
    title: 'Due Diligence',
    description: 'Our legal team conducts thorough verification of all documentation and approvals.',
  },
  {
    step: '04',
    title: 'Purchase Agreement',
    description: 'Review and sign the purchase agreement with support from our legal advisors.',
  },
  {
    step: '05',
    title: 'Completion',
    description: 'Complete the transaction and receive your property deed and residence permit (if applicable).',
  },
]

export default function InvestmentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pb-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
            alt="Investment"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Investment Guide
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6">
              Invest in <span className="text-gold">Mauritius</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Discover why Mauritius is the premier destination for luxury land 
              investment. From favorable tax policies to stunning natural beauty, 
              explore the opportunities that await.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-all"
            >
              Speak with an Advisor
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Mauritius */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Why Mauritius
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              The Perfect Investment Destination
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mauritius combines political stability, favorable tax policies, and 
              exceptional quality of life to create the ideal environment for 
              international property investment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-card border border-border hover:border-gold/50 transition-colors"
              >
                <div className="w-14 h-14 bg-gold/10 flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Schemes */}
      <section className="py-24 lg:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Investment Schemes
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              Pathways to Ownership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The Mauritian government offers several schemes allowing foreign 
              nationals to acquire property and obtain residence permits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {investmentSchemes.map((scheme, index) => (
              <motion.div
                key={scheme.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-background border border-border"
              >
                <div className="flex items-center gap-2 text-gold text-sm tracking-wider uppercase mb-4">
                  <Briefcase className="w-4 h-4" />
                  <span>Min. {scheme.minInvestment}</span>
                </div>
                <h3 className="text-xl font-serif text-foreground mb-4">
                  {scheme.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {scheme.description}
                </p>
                <ul className="space-y-3">
                  {scheme.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Our Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              Your Journey to Ownership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We guide you through every step of the investment process, ensuring 
              a smooth and transparent experience from start to finish.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-gold text-background flex items-center justify-center text-xl font-serif">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-serif text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Ready to Invest?
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              Start Your Investment Journey Today
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Our team of investment specialists is ready to help you navigate 
              the Mauritius property market and find the perfect opportunity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/lands"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-all"
              >
                Browse Properties
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium tracking-wider uppercase hover:border-gold hover:text-gold transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

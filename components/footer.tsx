'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react'

const footerLinks = {
  explore: [
    { label: 'Land Portfolio', href: '/lands' },
    { label: 'Featured Properties', href: '/lands?featured=true' },
    { label: 'Investment Guide', href: '/investment' },
    { label: 'Market Insights', href: '/blog' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif tracking-wider text-foreground">
                VERSATE
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Your premier destination for luxury land investment in Mauritius. 
              Discover exceptional plots in the world&apos;s most prestigious locations.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+2305555555"
                className="flex items-center gap-3 text-foreground/80 hover:text-gold transition-colors"
              >
                <Phone className="w-5 h-5 text-gold" />
                <span>+230 555 5555</span>
              </a>
              <a
                href="mailto:contact@versate.mu"
                className="flex items-center gap-3 text-foreground/80 hover:text-gold transition-colors"
              >
                <Mail className="w-5 h-5 text-gold" />
                <span>contact@versate.mu</span>
              </a>
              <div className="flex items-start gap-3 text-foreground/80">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <span>Royal Road, Grand Baie<br />Mauritius</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-foreground mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-foreground mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-foreground mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Versate Properties. All rights reserved.
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

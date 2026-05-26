'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const footerLinks = {
  explore: [
    { labelKey: 'nav.portfolio', href: '/lands' },
    { labelKey: 'footer.featured', href: '/lands?featured=true' },
    { labelKey: 'footer.investmentGuide', href: '/investment' },
    { labelKey: 'footer.marketInsights', href: '/blog' },
  ],
  company: [
    { labelKey: 'footer.aboutUs', href: '/about' },
    { labelKey: 'footer.ourTeam', href: '/about#team' },
    { labelKey: 'footer.careers', href: '/careers' },
    { labelKey: 'footer.press', href: '/press' },
  ],
  support: [
    { labelKey: 'footer.contactUs', href: '/contact' },
    { labelKey: 'footer.faqs', href: '/faqs' },
    { labelKey: 'footer.privacy', href: '/privacy' },
    { labelKey: 'footer.terms', href: '/terms' },
  ],
} as const

export function Footer() {
  const { t, tr } = useLanguage()

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
              <Image
                src="/brand/vestate-properties-logo.png"
                alt="Vestate Properties"
                width={376}
                height={120}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              {t('footer.description')}
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
                href="mailto:contact@vestate.mu"
                className="flex items-center gap-3 text-foreground/80 hover:text-gold transition-colors"
              >
                <Mail className="w-5 h-5 text-gold" />
                <span>contact@vestate.mu</span>
              </a>
              <div className="flex items-start gap-3 text-foreground/80">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <span>Royal Road, Grand Baie<br />{tr('Mauritius')}</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-foreground mb-6">
              {t('footer.explore')}
            </h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors duration-300"
                  >
                  {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-foreground mb-6">
              {t('footer.company')}
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors duration-300"
                  >
                  {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-foreground mb-6">
              {t('footer.support')}
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors duration-300"
                  >
                  {t(link.labelKey)}
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
              &copy; {new Date().getFullYear()} Vestate Properties. {t('footer.rights')}
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              <span>{t('footer.backToTop')}</span>
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

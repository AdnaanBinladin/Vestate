'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Search } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/lands', labelKey: 'nav.portfolio' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/blog', labelKey: 'nav.insights' },
  { href: '/contact', labelKey: 'nav.contact' },
] as const

function FlagIcon({ language }: { language: 'en' | 'fr' }) {
  const flag =
    language === 'fr'
      ? { src: '/flags/france.png', alt: 'French flag' }
      : { src: '/flags/united-kingdom.png', alt: 'British flag' }

  return (
    <Image
      src={flag.src}
      alt={flag.alt}
      width={24}
      height={16}
      className="h-4 w-6 border border-white/20 object-cover shadow-sm"
    />
  )
}

function LanguageFlagToggle() {
  const { language, setLanguage, t } = useLanguage()
  const targetLanguage = language === 'en' ? 'fr' : 'en'

  return (
    <button
      type="button"
      aria-label={t('language.switch')}
      title={t('language.switch')}
      onClick={() => setLanguage(targetLanguage)}
      className="flex h-8 items-center justify-center border border-transparent px-1.5 transition-colors hover:border-gold/70 focus:border-gold focus:outline-none"
    >
      <FlagIcon language={targetLanguage} />
    </button>
  )
}

function CurrencySelect() {
  const { currency, currencyOptions, setCurrency, t } = useLanguage()

  return (
    <div className="relative">
      <select
        aria-label={t('currency.switch')}
        value={currency}
        onChange={(event) => setCurrency(event.target.value as typeof currency)}
        className="h-8 border border-transparent bg-transparent pl-0 pr-1 text-xs font-semibold uppercase tracking-wider text-foreground outline-none transition-colors hover:text-gold focus:border-gold"
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option} className="bg-background text-foreground">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function PreferenceControls() {
  return (
    <div className="flex h-8 items-center gap-1 border border-border bg-background/30 px-2">
      <CurrencySelect />
      <LanguageFlagToggle />
    </div>
  )
}

export function Navbar() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
            : 'bg-transparent'
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 pt-2 lg:h-28 lg:pt-3">
            {/* Logo */}
            <Link href="/" className="flex h-full items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center"
              >
                <Image
                  src="/brand/vestate-properties-logo.png"
                  alt="Vestate Properties"
                  width={376}
                  height={120}
                  priority
                  className="h-16 w-auto object-contain lg:h-20"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wider uppercase text-foreground/80 hover:text-gold transition-colors duration-300"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4 pr-3 sm:pr-5 lg:pr-8">
              <PreferenceControls />
              <Link
                href="/favorites"
                className="p-2 hover:text-gold transition-colors duration-300"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                href="/lands"
                className="p-2 hover:text-gold transition-colors duration-300 hidden sm:block"
              >
                <Search className="w-5 h-5" />
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:text-gold transition-colors duration-300"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="text-xl font-serif tracking-wider">{t('nav.menu')}</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:text-gold transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-6 flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg tracking-wider uppercase text-foreground/80 hover:text-gold transition-colors duration-300"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-2">
                  <PreferenceControls />
                </div>
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 text-center bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-colors duration-300"
                >
                  {t('nav.schedule')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

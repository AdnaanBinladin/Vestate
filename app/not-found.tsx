'use client'

import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/components/language-provider'

export default function NotFound() {
  const { language } = useLanguage()
  const copy =
    language === 'fr'
      ? {
          eyebrow: 'Page introuvable',
          title: 'Cette page est indisponible',
          description:
            "La page demandee n'existe pas ou a ete deplacee. Vous pouvez retourner a l'accueil ou consulter le portefeuille.",
          home: "Retour a l'accueil",
          portfolio: 'Voir le portefeuille',
        }
      : {
          eyebrow: 'Page not found',
          title: 'This page is unavailable',
          description:
            'The page you requested does not exist or has moved. You can return home or continue browsing the portfolio.',
          home: 'Back to home',
          portfolio: 'View portfolio',
        }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-36 pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            {copy.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            {copy.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            {copy.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {copy.home}
            </Link>
            <Link
              href="/lands"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-medium tracking-wider uppercase hover:border-gold hover:text-gold transition-colors"
            >
              <Search className="w-4 h-4" />
              {copy.portfolio}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

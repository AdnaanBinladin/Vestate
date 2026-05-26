'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/components/language-provider'
import { teamMembers, stats } from '@/lib/data'
import { Award, Globe, Users, TrendingUp, Mail, Linkedin } from 'lucide-react'

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we do, from property selection to client service.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Our international network connects you to exclusive opportunities and buyers worldwide.',
  },
  {
    icon: Users,
    title: 'Client Focus',
    description: 'Your success is our priority. We provide personalized service tailored to your unique needs.',
  },
  {
    icon: TrendingUp,
    title: 'Market Expertise',
    description: 'Deep local knowledge combined with global market insights for informed investment decisions.',
  },
]

export default function AboutPage() {
  const { language, tr } = useLanguage()
  const copy = language === 'fr'
    ? {
        eyebrow: 'A propos de Vestate',
        titleTop: 'Redefinir le luxe',
        titleAccent: 'dans l’investissement foncier',
        intro: 'Depuis plus de 15 ans, Vestate est un nom de confiance dans l’investissement foncier premium a Maurice. Nous combinons expertise locale et reseau international.',
        storyEyebrow: 'Notre histoire',
        storyTitle: 'Un heritage d’excellence',
        story: [
          'Fondee en 2009, Vestate est nee avec une vision simple: rendre l’investissement foncier de luxe a Maurice accessible aux investisseurs exigeants.',
          'Aujourd’hui, Vestate est une societe de confiance dans le foncier et l’immobilier a Maurice, avec des opportunites en vente de terrains, terrains agricoles, location de maisons et developpement hotelier.',
          'Notre difference repose sur un service personnalise et une connaissance approfondie du marche local comme des exigences internationales.',
        ],
        years: 'Annees d’excellence',
        valuesEyebrow: 'Nos valeurs',
        valuesTitle: 'Ce qui nous guide',
        teamEyebrow: 'Notre equipe',
        teamTitle: 'Rencontrez les experts',
        teamDesc: 'Notre equipe de professionnels experimentes vous aide a trouver l’opportunite d’investissement ideale.',
      }
    : {
        eyebrow: 'About Vestate',
        titleTop: 'Redefining Luxury',
        titleAccent: 'Land Investment',
        intro: 'For over 15 years, Vestate has been the trusted name in premium land investment in Mauritius. We combine deep local expertise with global connections to deliver exceptional opportunities.',
        storyEyebrow: 'Our Story',
        storyTitle: 'A Legacy of Excellence',
        story: [
          'Founded in 2009, Vestate began with a simple vision: to make luxury land investment in Mauritius accessible to discerning investors worldwide.',
          'Today, Vestate is a trusted land and property company in Mauritius, with opportunities across land sales, agricultural land sales, house rentals, and hospitality development.',
          'What sets us apart is our commitment to personalized service and our deep understanding of both the local market and international investment requirements.',
        ],
        years: 'Years of Excellence',
        valuesEyebrow: 'Our Values',
        valuesTitle: 'What Drives Us',
        teamEyebrow: 'Our Team',
        teamTitle: 'Meet the Experts',
        teamDesc: 'Our team of experienced professionals is dedicated to helping you find the perfect investment opportunity.',
      }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              {copy.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              {copy.titleTop} <br />
              <span className="text-gold">{copy.titleAccent}</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {copy.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
                {copy.storyEyebrow}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
                {copy.storyTitle}
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                {copy.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80"
                  alt={language === 'fr' ? 'Bureau Vestate' : 'Vestate office'}
                  fill
                  className="object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-8 -left-8 bg-gold p-8"
              >
                <p className="text-4xl font-serif text-background mb-2">15+</p>
                <p className="text-background/80 text-sm tracking-wider uppercase">
                  {copy.years}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              {copy.valuesEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
              {copy.valuesTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gold/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  {tr(value.title)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tr(value.description)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              {copy.teamEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              {copy.teamTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {copy.teamDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-gold hover:text-background transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-gold hover:text-background transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-serif text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-gold text-sm tracking-wider uppercase mb-3">
                  {tr(member.role)}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tr(member.bio)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 lg:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl sm:text-6xl font-serif text-gold mb-4">
                  {stat.value}
                  {stat.suffix && <span className="text-3xl ml-1">{stat.suffix}</span>}
                </div>
                <p className="text-foreground/80 text-sm tracking-wider uppercase">
                  {tr(stat.label)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/components/language-provider'
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
  const { language } = useLanguage()

  const copy =
    language === 'fr'
      ? {
          heroAlt: 'Investissement',
          heroEyebrow: "Guide d'investissement",
          heroTitleTop: 'Investir a',
          heroTitleAccent: 'Maurice',
          heroDescription:
            "Decouvrez pourquoi Maurice est une destination de choix pour l'investissement foncier de luxe. Fiscalite attractive, stabilite et beaute naturelle creent des opportunites solides.",
          heroCta: 'Parler a un conseiller',
          whyEyebrow: 'Pourquoi Maurice',
          whyTitle: "Une destination d'investissement ideale",
          whyDescription:
            "Maurice combine stabilite politique, fiscalite favorable et qualite de vie exceptionnelle pour offrir un environnement ideal aux investisseurs immobiliers internationaux.",
          schemesEyebrow: "Regimes d'investissement",
          schemesTitle: "Voies d'acces a la propriete",
          schemesDescription:
            "Le gouvernement mauricien propose plusieurs regimes permettant aux ressortissants etrangers d'acquerir des biens et d'obtenir un permis de residence.",
          minLabel: 'Min.',
          processEyebrow: 'Notre processus',
          processTitle: "Votre parcours vers la propriete",
          processDescription:
            "Nous vous accompagnons a chaque etape afin de rendre le processus d'investissement clair, fluide et transparent.",
          ctaEyebrow: 'Pret a investir ?',
          ctaTitle: "Commencez votre parcours d'investissement aujourd'hui",
          ctaDescription:
            "Notre equipe de specialistes est prete a vous aider a naviguer le marche immobilier mauricien et a trouver l'opportunite adaptee.",
          browse: 'Voir les proprietes',
          contact: 'Nous contacter',
        }
      : {
          heroAlt: 'Investment',
          heroEyebrow: 'Investment Guide',
          heroTitleTop: 'Invest in',
          heroTitleAccent: 'Mauritius',
          heroDescription:
            'Discover why Mauritius is the premier destination for luxury land investment. From favorable tax policies to stunning natural beauty, explore the opportunities that await.',
          heroCta: 'Speak with an Advisor',
          whyEyebrow: 'Why Mauritius',
          whyTitle: 'The Perfect Investment Destination',
          whyDescription:
            'Mauritius combines political stability, favorable tax policies, and exceptional quality of life to create the ideal environment for international property investment.',
          schemesEyebrow: 'Investment Schemes',
          schemesTitle: 'Pathways to Ownership',
          schemesDescription:
            'The Mauritian government offers several schemes allowing foreign nationals to acquire property and obtain residence permits.',
          minLabel: 'Min.',
          processEyebrow: 'Our Process',
          processTitle: 'Your Journey to Ownership',
          processDescription:
            'We guide you through every step of the investment process, ensuring a smooth and transparent experience from start to finish.',
          ctaEyebrow: 'Ready to Invest?',
          ctaTitle: 'Start Your Investment Journey Today',
          ctaDescription:
            'Our team of investment specialists is ready to help you navigate the Mauritius property market and find the perfect opportunity.',
          browse: 'Browse Properties',
          contact: 'Contact Us',
        }

  const localizedBenefits =
    language === 'fr'
      ? [
          {
            icon: Shield,
            title: 'Stabilite politique',
            description:
              "Maurice beneficie de l'une des democraties les plus stables d'Afrique, avec un cadre juridique solide.",
          },
          {
            icon: TrendingUp,
            title: 'Economie en croissance',
            description:
              'Une economie diversifiee avec des secteurs forts comme le tourisme, la finance et la technologie.',
          },
          {
            icon: Globe,
            title: 'Avantages fiscaux',
            description:
              'Absence de taxe sur les plus-values, fiscalite attractive et nombreux accords de non-double imposition.',
          },
          {
            icon: FileText,
            title: 'Cadre juridique',
            description:
              'Des lois immobilieres transparentes inspirees du droit civil francais et de la common law anglaise.',
          },
          {
            icon: Building,
            title: 'Infrastructure',
            description:
              'Infrastructures modernes, connectivite internationale et services haut de gamme.',
          },
          {
            icon: Users,
            title: 'Qualite de vie',
            description:
              'Un cadre de vie exceptionnel avec plages, climat agreable et population multilingue.',
          },
        ]
      : benefits

  const localizedInvestmentSchemes =
    language === 'fr'
      ? [
          {
            title: 'IRS - Integrated Resort Scheme',
            description:
              "Permet aux non-citoyens d'acheter une propriete residentielle dans des developpements IRS approuves avec un seuil minimal d'investissement.",
            features: [
              'Permis de residence permanente pour les investissements de plus de 375 000 USD',
              'Acces a des services de resort haut de gamme',
              'Potentiel de revenus locatifs',
              'Potentiel de valorisation du capital',
            ],
            minInvestment: 'USD 375,000',
          },
          {
            title: 'PDS - Property Development Scheme',
            description:
              'Un regime flexible pour developper ou acquerir des proprietes residentielles haut de gamme.',
            features: [
              'Residence permanente pour les investissements de plus de 375 000 USD',
              'Plus de flexibilite dans les types de biens',
              'Opportunites de developpement mixte',
              "Aucune restriction sur le nombre d'unites",
            ],
            minInvestment: 'USD 375,000',
          },
          {
            title: 'Smart City Scheme',
            description:
              'Des developpements modernes combinant residentiel, commerce et loisirs dans des environnements integres.',
            features: [
              'Infrastructure moderne',
              'Concepts de vie durable',
              'Mix residentiel et professionnel',
              'Incitations gouvernementales',
            ],
            minInvestment: 'USD 375,000',
          },
        ]
      : investmentSchemes

  const localizedProcess =
    language === 'fr'
      ? [
          {
            step: '01',
            title: 'Consultation initiale',
            description:
              'Rencontrez nos conseillers pour discuter de vos objectifs, de votre budget et de vos preferences.',
          },
          {
            step: '02',
            title: 'Selection du bien',
            description:
              'Parcourez notre portefeuille et visitez les biens correspondant a vos criteres.',
          },
          {
            step: '03',
            title: 'Verification',
            description:
              'Notre equipe juridique verifie soigneusement les documents, titres et autorisations.',
          },
          {
            step: '04',
            title: 'Accord de vente',
            description:
              "Examinez et signez l'accord de vente avec l'accompagnement de nos conseillers.",
          },
          {
            step: '05',
            title: 'Finalisation',
            description:
              'Finalisez la transaction et recevez votre acte de propriete ainsi que le permis applicable.',
          },
        ]
      : process

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pb-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
            alt={copy.heroAlt}
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
              {copy.heroEyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6">
              {copy.heroTitleTop}{' '}
              <span className="text-gold">{copy.heroTitleAccent}</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              {copy.heroDescription}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-all"
            >
              {copy.heroCta}
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
              {copy.whyEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              {copy.whyTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {copy.whyDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localizedBenefits.map((benefit, index) => (
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
              {copy.schemesEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              {copy.schemesTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {copy.schemesDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {localizedInvestmentSchemes.map((scheme, index) => (
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
                  <span>{copy.minLabel} {scheme.minInvestment}</span>
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
              {copy.processEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              {copy.processTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {copy.processDescription}
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {localizedProcess.map((step, index) => (
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
              {copy.ctaEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              {copy.ctaTitle}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {copy.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/lands"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-background font-medium tracking-wider uppercase hover:bg-gold-light transition-all"
              >
                {copy.browse}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium tracking-wider uppercase hover:border-gold hover:text-gold transition-all"
              >
                {copy.contact}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

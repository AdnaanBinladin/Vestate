'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, Award, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'

export function MeetAgentSection() {
  const whatsappNumber = '+23057851234' // Mauritian number format
  const whatsappMessage = encodeURIComponent('Hello! I am interested in learning more about your land properties in Mauritius.')

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Decorative Mauritius-inspired pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Your Trusted Partner
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Meet Our Agent
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with our dedicated local expert who understands the Mauritian land market 
            and can guide you to find your perfect plot in paradise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Agent Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-lg" />
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                alt="Priya Doobur - Land Investment Specialist"
                fill
                className="object-cover rounded-lg"
              />
              {/* Mauritius Flag Badge */}
              <div className="absolute -bottom-4 -right-4 bg-background border border-border p-4 rounded-lg shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <div className="w-12 h-2 bg-[#EA2839]" />
                    <div className="w-12 h-2 bg-[#1A206D]" />
                    <div className="w-12 h-2 bg-[#FFD500]" />
                    <div className="w-12 h-2 bg-[#00A551]" />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-foreground">Proudly</p>
                    <p className="text-gold">Mauritian</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Agent Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-foreground mb-2">
                Priya Doobur
              </h3>
              <p className="text-gold tracking-wider uppercase text-sm">
                Land Investment Specialist
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Born and raised in Mauritius, Priya brings over 12 years of expertise in the local 
              real estate market. Her deep knowledge of Mauritian land regulations, investment 
              schemes like IRS and PDS, and her network across the island makes her the perfect 
              guide for your land investment journey.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Award className="w-5 h-5 text-gold flex-shrink-0" />
                <span>12+ Years Experience</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Based in Grand Baie</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
                <span>200+ Deals Closed</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MessageCircle className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Fluent: English, French, Kreol</span>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white font-medium tracking-wider uppercase hover:bg-[#22c55e] transition-all duration-300"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 fill-current"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href="tel:+23057851234"
                className="flex items-center justify-center gap-3 px-6 py-4 border border-border text-foreground font-medium tracking-wider uppercase hover:bg-secondary transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                +230 5785 1234
              </a>
            </div>

            <a
              href="mailto:priya@versate.mu"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <Mail className="w-4 h-4" />
              priya@versate.mu
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

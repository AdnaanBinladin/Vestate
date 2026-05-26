'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/components/language-provider'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Royal Road, Grand Baie', 'Mauritius'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+230 555 5555', '+230 555 5556'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['contact@vestate.mu', 'sales@vestate.mu'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
  },
]

export default function ContactPage() {
  const { language, tr } = useLanguage()
  const copy = language === 'fr'
    ? {
        heroEyebrow: 'Contactez-nous',
        heroTitle: 'Entrer en contact',
        heroDesc: 'Pret a commencer votre parcours d’investissement ? Notre equipe est la pour vous accompagner.',
        formTitle: 'Envoyez-nous un message',
        formDesc: 'Remplissez le formulaire ci-dessous et nous vous repondrons sous 24 heures.',
        firstName: 'Prenom *',
        lastName: 'Nom *',
        email: 'Adresse email *',
        phone: 'Telephone',
        subject: 'Sujet *',
        selectSubject: 'Selectionner un sujet',
        general: 'Demande generale',
        property: 'Demande sur une propriete',
        investment: 'Consultation investissement',
        partnership: 'Partenariat',
        other: 'Autre',
        budget: 'Budget d’investissement',
        selectBudget: 'Selectionner une fourchette',
        budgetUnder: 'Moins de MUR 20M',
        budgetOver: 'Plus de MUR 100M',
        message: 'Message *',
        messagePlaceholder: 'Parlez-nous de vos objectifs...',
        preferred: 'Methode de contact preferee',
        emailContact: 'Email',
        phoneContact: 'Telephone',
        send: 'Envoyer le message',
        mapPlace: 'Grand Baie, Maurice',
        mapNote: 'La carte interactive serait affichee ici',
        talkTitle: 'Vous preferez parler ?',
        talkDesc: 'Planifiez un appel avec l’un de nos specialistes pour une consultation personnalisee.',
        alert: 'Merci pour votre message. Nous vous repondrons bientot.',
      }
    : {
        heroEyebrow: 'Contact Us',
        heroTitle: 'Get in Touch',
        heroDesc: 'Ready to start your investment journey? Our team of experts is here to guide you every step of the way.',
        formTitle: 'Send Us a Message',
        formDesc: "Fill out the form below and we'll get back to you within 24 hours.",
        firstName: 'First Name *',
        lastName: 'Last Name *',
        email: 'Email Address *',
        phone: 'Phone Number',
        subject: 'Subject *',
        selectSubject: 'Select a subject',
        general: 'General Inquiry',
        property: 'Property Inquiry',
        investment: 'Investment Consultation',
        partnership: 'Partnership Opportunity',
        other: 'Other',
        budget: 'Investment Budget Range',
        selectBudget: 'Select budget range',
        budgetUnder: 'Under MUR 20M',
        budgetOver: 'Over MUR 100M',
        message: 'Message *',
        messagePlaceholder: 'Tell us about your investment goals...',
        preferred: 'Preferred Contact Method',
        emailContact: 'Email',
        phoneContact: 'Phone',
        send: 'Send Message',
        mapPlace: 'Grand Baie, Mauritius',
        mapNote: 'Interactive map would be displayed here',
        talkTitle: 'Prefer to Talk?',
        talkDesc: 'Schedule a call with one of our investment specialists for a personalized consultation.',
        alert: 'Thank you for your message. We will get back to you shortly.',
      }
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    investmentBudget: '',
    preferredContact: 'email',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert(copy.alert)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      investmentBudget: '',
      preferredContact: 'email',
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              {copy.heroEyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              {copy.heroTitle}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {copy.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-card border border-border text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gold/10 flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-serif text-foreground mb-3">
                  {tr(info.title)}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {tr(detail)}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-serif text-foreground mb-4">
                  {copy.formTitle}
                </h2>
                <p className="text-muted-foreground">
                  {copy.formDesc}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                      {copy.firstName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                      {copy.lastName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                      {copy.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                      {copy.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    {copy.subject}
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">{copy.selectSubject}</option>
                    <option value="general">{copy.general}</option>
                    <option value="property">{copy.property}</option>
                    <option value="investment">{copy.investment}</option>
                    <option value="partnership">{copy.partnership}</option>
                    <option value="other">{copy.other}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    {copy.budget}
                  </label>
                  <select
                    value={formData.investmentBudget}
                    onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">{copy.selectBudget}</option>
                    <option value="under-20m">{copy.budgetUnder}</option>
                    <option value="20m-50m">MUR 20M - 50M</option>
                    <option value="50m-100m">MUR 50M - 100M</option>
                    <option value="over-100m">{copy.budgetOver}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2">
                    {copy.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={copy.messagePlaceholder}
                    className="w-full bg-input border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-3">
                    {copy.preferred}
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                        className="w-4 h-4 text-gold"
                      />
                      <span className="text-foreground">{copy.emailContact}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                        className="w-4 h-4 text-gold"
                      />
                      <span className="text-foreground">{copy.phoneContact}</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold text-background py-4 font-medium tracking-wider uppercase hover:bg-gold-light transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {copy.send}
                </button>
              </form>
            </motion.div>

            {/* Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Map Placeholder */}
              <div className="aspect-square bg-card border border-border flex items-center justify-center mb-8">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gold mx-auto mb-4" />
                  <p className="text-foreground font-serif text-lg mb-2">
                    {copy.mapPlace}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {copy.mapNote}
                  </p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="p-8 bg-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-gold" />
                  <h3 className="text-xl font-serif text-foreground">
                    {copy.talkTitle}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {copy.talkDesc}
                </p>
                <a
                  href="tel:+2305555555"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-lg">+230 555 5555</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

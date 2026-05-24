import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { SearchSection } from '@/components/home/search-section'
import { FeaturedLands } from '@/components/home/featured-lands'
import { StatsSection } from '@/components/home/stats-section'
import { InvestmentSection } from '@/components/home/investment-section'
import { LifestyleSection } from '@/components/home/lifestyle-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { CTASection } from '@/components/home/cta-section'
import { lands, stats, testimonials } from '@/lib/data'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SearchSection />
      <FeaturedLands lands={lands} />
      <StatsSection stats={stats} />
      <InvestmentSection />
      <LifestyleSection />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
      <Footer />
    </main>
  )
}

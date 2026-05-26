import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { SearchSection } from '@/components/home/search-section'
import { IntroductionSection } from '@/components/home/introduction-section'
import { FeaturedLands } from '@/components/home/featured-lands'
import { StatsSection } from '@/components/home/stats-section'
import { InvestmentSection } from '@/components/home/investment-section'
import { LifestyleSection } from '@/components/home/lifestyle-section'
import { AgentSection } from '@/components/home/agent-section'
import { CTASection } from '@/components/home/cta-section'
import { lands, stats } from '@/lib/data'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SearchSection />
      <IntroductionSection />
      <FeaturedLands lands={lands} />
      <StatsSection stats={stats} />
      <InvestmentSection />
      <LifestyleSection />
      <AgentSection />
      <CTASection />
      <Footer />
    </main>
  )
}

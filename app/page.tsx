import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturedLands } from "@/components/featured-lands"
import { StatsSection } from "@/components/stats-section"
import { InvestmentSection } from "@/components/investment-section"
import { LifestyleSection } from "@/components/lifestyle-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar variant="transparent" />
      <HeroSection />
      <FeaturedLands />
      <StatsSection />
      <InvestmentSection />
      <LifestyleSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

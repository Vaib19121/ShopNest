import { HeroSection } from '../components/HeroSection'
import { CategoriesSection } from '../components/CategoriesSection'
import { FeaturedProducts } from '../components/FeaturedProducts'
import { Testimonials } from '../components/Testimonials'
import { NewsletterSection } from '../components/NewsletterSection'
import { Footer } from '../components/Footer'



export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}

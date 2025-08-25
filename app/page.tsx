import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import About from '@/components/About'
import UltraSpeaking from '@/components/UltraSpeaking'
import Offers from '@/components/Offers'
import Newsletter from '@/components/Newsletter'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <SocialProof />
      <About />
      <UltraSpeaking />
      <Offers />
      <Newsletter />
      <FAQ />
      <Footer />
    </main>
  )
} 
import { useEffect } from 'react'
import Navbar       from './components/landing/Navbar'
import Hero         from './components/landing/Hero'
import SocialProof  from './components/landing/SocialProof'
import HowItWorks   from './components/landing/HowItWorks'
import ForPlayers   from './components/landing/ForPlayers'
import ForOwners    from './components/landing/ForOwners'
import AppPreview   from './components/landing/AppPreview'
import WhyGird      from './components/landing/WhyGird'
import FAQ          from './components/landing/FAQ'
import Footer       from './components/landing/Footer'
import { initIntercom } from './lib/intercom'

export default function App() {
  useEffect(() => {
    initIntercom()
  }, [])

  return (
    <div dir="rtl" className="min-h-screen"
         style={{ background: '#191919', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <ForPlayers />
        <ForOwners />
        <AppPreview />
        <WhyGird />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

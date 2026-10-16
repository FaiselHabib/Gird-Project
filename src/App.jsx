import { useEffect } from 'react'
import Navbar       from './components/landing/Navbar'
import Hero         from './components/landing/Hero'
import SocialProof  from './components/landing/SocialProof'
import HowItWorks   from './components/landing/HowItWorks'
import ForPlayers   from './components/landing/ForPlayers'
import Communities  from './components/landing/Communities'
import ForOwners    from './components/landing/ForOwners'
import AppPreview   from './components/landing/AppPreview'
import WhyGird      from './components/landing/WhyGird'
import FAQ          from './components/landing/FAQ'
import Footer       from './components/landing/Footer'
import IntercomLauncher from './components/IntercomLauncher'
import { initIntercom } from './lib/intercom'
import Legal from './pages/Legal'

export default function App() {
  useEffect(() => {
    initIntercom()
  }, [])

  if (window.location.pathname.replace(/\/+$/, '') === '/privacy-terms') {
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <Legal />
        <IntercomLauncher />
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen"
         style={{ background: '#191919', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <ForPlayers />
        <Communities />
        <ForOwners />
        <AppPreview />
        <WhyGird />
        <FAQ />
      </main>
      <Footer />
      <IntercomLauncher />
    </div>
  )
}

import Navbar       from './components/landing/Navbar'
import Hero         from './components/landing/Hero'
import SocialProof  from './components/landing/SocialProof'
import HowItWorks   from './components/landing/HowItWorks'
import ForPlayers   from './components/landing/ForPlayers'
import MidCTA       from './components/landing/MidCTA'
import ForOwners    from './components/landing/ForOwners'
import AppPreview   from './components/landing/AppPreview'
import EarlyAccess  from './components/landing/EarlyAccess'
import FAQ          from './components/landing/FAQ'
import WaitlistForm from './components/landing/WaitlistForm'
import Footer       from './components/landing/Footer'

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen"
         style={{ background: '#191919', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <ForPlayers />
      <MidCTA />
      <ForOwners />
      <AppPreview />
      <EarlyAccess />
      <FAQ />
      <WaitlistForm />
      <Footer />
    </div>
  )
}

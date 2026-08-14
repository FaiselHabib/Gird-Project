import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { YELLOW } from '../../lib/constants'

const NAV = [
  { label: 'كيف يعمل',    href: '#how-it-works' },
  { label: 'للاعبين',     href: '#players' },
  { label: 'للملاعب',      href: '#owners' },
  { label: 'التطبيق',      href: '#app' },
  { label: 'أسئلة شائعة',  href: '#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  // Lightweight sticky-state toggle (single passive listener, sets a boolean).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver — no scroll math on the main thread.
  useEffect(() => {
    const sections = NAV
      .map(n => document.getElementById(n.href.slice(1)))
      .filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTop = e => {
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    setOpen(false)
    setActive('')
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
         style={{
           background: scrolled ? 'rgba(25,25,25,0.85)' : 'rgba(25,25,25,0.45)',
           backdropFilter: 'blur(12px)',
           WebkitBackdropFilter: 'blur(12px)',
           borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
         }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo → back to top */}
        <a href="#" onClick={scrollTop} aria-label="قرد — الصفحة الرئيسية"
           className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
          <img src="/logo.svg" alt="قرد" width={44} height={44} className="select-none" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map(l => {
            const isActive = active === l.href.slice(1)
            return (
              <a key={l.href} href={l.href}
                 aria-current={isActive ? 'true' : undefined}
                 className={`relative text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {l.label}
                <span className="absolute -bottom-1.5 right-0 left-0 mx-auto h-0.5 rounded-full transition-all duration-300"
                      style={{ width: isActive ? '70%' : 0, opacity: isActive ? 1 : 0, background: YELLOW }} />
              </a>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)}
                className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
                aria-expanded={open}
                aria-controls="mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu (compact dropdown) */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t px-4 py-2"
             style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(25,25,25,0.97)' }}>
          {NAV.map(l => {
            const isActive = active === l.href.slice(1)
            return (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 aria-current={isActive ? 'true' : undefined}
                 className={`block text-sm transition-colors py-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                <span className="inline-flex items-center gap-2">
                  {isActive && <span className="w-1.5 h-1.5 rounded-full" style={{ background: YELLOW }} />}
                  {l.label}
                </span>
              </a>
            )
          })}
        </div>
      )}
    </nav>
  )
}

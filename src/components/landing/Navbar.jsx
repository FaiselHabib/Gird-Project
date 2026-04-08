import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { ORANGE } from '../../lib/constants'

const NAV = [
  { label: 'كيف يعمل',    href: '#how-it-works' },
  { label: 'للاعبين',     href: '#players' },
  { label: 'للمالكين',     href: '#owners' },
  { label: 'أسئلة شائعة',  href: '#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
         style={{
           background: scrolled ? 'rgba(25,25,25,0.92)' : 'rgba(25,25,25,0.6)',
           backdropFilter: 'blur(16px)',
           WebkitBackdropFilter: 'blur(16px)',
           borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
         }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <img src="/logo.svg" alt="قرد" width={44} height={44} className="select-none" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map(l => (
            <a key={l.href} href={l.href}
               className="text-sm text-gray-400 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#waitlist"
           className="hidden md:inline-flex items-center gap-2 rounded-full text-sm font-semibold px-5 py-2.5 transition"
           style={{ background: ORANGE, color: '#fff' }}>
          انضم للقائمة
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)}
                className="md:hidden p-2 text-gray-400 hover:text-white"
                aria-label={open ? 'إغلاق' : 'القائمة'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-3"
             style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#191919' }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="block text-sm text-gray-400 hover:text-white transition-colors py-1.5">
              {l.label}
            </a>
          ))}
          <a href="#waitlist" onClick={() => setOpen(false)}
             className="block text-center rounded-full text-sm font-semibold px-5 py-3 mt-2"
             style={{ background: ORANGE, color: '#fff' }}>
            انضم للقائمة
          </a>
        </div>
      )}
    </nav>
  )
}

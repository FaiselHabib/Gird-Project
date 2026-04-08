import { ORANGE } from '../../lib/constants'

const LINKS = [
  { label: 'الملاعب',     href: '#players' },
  { label: 'للمالكين',     href: '#owners' },
  { label: 'كيف يعمل',    href: '#how-it-works' },
  { label: 'أسئلة شائعة',  href: '#faq' },
]

export default function Footer() {
  return (
    <footer id="contact" className="pt-14 pb-8"
            style={{ background: '#0e0e0e', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10"
             style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <img src="/logo.svg" alt="قرد" width={52} height={52} className="select-none" />
            <p className="text-xs text-gray-500">منصة البادل الأولى في السعودية</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {LINKS.map(l => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {['X', 'IG', 'LI'].map(s => (
              <a key={s} href="#" aria-label={s}
                 className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-colors"
                 style={{ background: 'rgba(255,255,255,0.06)' }}>
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <p className="text-xs text-gray-600">
            © 2026 قرد لتقنية الرياضة. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-gray-600">
            صُنع في السعودية 🇸🇦
          </p>
        </div>
      </div>
    </footer>
  )
}

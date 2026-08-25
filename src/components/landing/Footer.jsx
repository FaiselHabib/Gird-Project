import { openIntercom } from '../../lib/intercom'

const LINKS = [
  { label: 'كيف يعمل',    href: '#how-it-works' },
  { label: 'للاعبين',     href: '#players' },
  { label: 'للملاعب',      href: '#owners' },
  { label: 'التطبيق',      href: '#app' },
  { label: 'أسئلة شائعة',  href: '#faq' },
]

const XIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor"
       strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
    <path d="M12.53 1.5c1.02-.02 2.03-.01 3.04-.02.06 1.19.49 2.4 1.36 3.24.87.87 2.1 1.27 3.3 1.4v3.14c-1.12-.04-2.25-.27-3.27-.76-.44-.2-.85-.46-1.26-.72-.01 2.28.01 4.56-.02 6.83-.06 1.09-.42 2.18-1.05 3.08-1.02 1.5-2.8 2.48-4.62 2.51-1.12.06-2.24-.24-3.19-.8-1.58-.93-2.69-2.64-2.85-4.47-.02-.39-.03-.78-.01-1.16.14-1.48.87-2.9 2.01-3.86 1.29-1.12 3.1-1.66 4.79-1.34.02 1.15-.03 2.3-.03 3.45-.77-.25-1.67-.18-2.35.29-.49.32-.86.81-1.06 1.36-.16.39-.11.82-.1 1.23.18 1.24 1.37 2.28 2.64 2.17.85-.01 1.66-.5 2.1-1.22.14-.25.3-.51.31-.81.08-1.38.05-2.75.06-4.13.01-3.1-.01-6.19.02-9.28Z"/>
  </svg>
)

const SOCIALS = [
  { label: 'إنستقرام',  href: 'https://www.instagram.com/girdappksa', Icon: InstagramIcon },
  { label: 'تيك توك',   href: 'https://www.tiktok.com/@girdappksa', Icon: TikTokIcon },
  { label: 'X (تويتر)', href: 'https://x.com/girdappksa', Icon: XIcon },
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
            <p className="text-xs text-gray-500">كل لعبك في مكان واحد.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {LINKS.map(l => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
            <button
              type="button"
              onClick={() => openIntercom()}
              className="hover:text-white transition-colors cursor-pointer"
            >
              تواصل معنا
            </button>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                 target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                 style={{ background: 'rgba(255,255,255,0.06)' }}>
                <s.Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <p className="text-xs text-gray-600">
            © 2026 قرد. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-gray-600">
            تم تطوير قرد بواسطة Smartech Group
          </p>
        </div>
      </div>
    </footer>
  )
}

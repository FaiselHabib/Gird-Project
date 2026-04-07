import { useState } from 'react'
import { Menu, X, Check, ChevronRight, MapPin, Search } from 'lucide-react'

/* ─── Brand token shortcuts ─── */
const BLUE   = '#2B2AA1'
const ORANGE = '#FE5D02'
const GREEN  = '#04D07E'
const YELLOW = '#E1F096'
const CARD   = '#1e1e1e'
const CARD2  = '#262626'

/* ─── Gird SVG Logo ─── */
function GirdLogo({ size = 56 }) {
  return (
    <img
      src="/logo.svg"
      alt="قرد"
      width={size}
      height={size}
      className="select-none"
    />
  )
}

/* ─── Nav links ─── */
const NAV = [
  { label: 'الملاعب',     href: '#courts'   },
  { label: 'المباريات',   href: '#matches'  },
  { label: 'للمالكين',    href: '#owners'   },
  { label: 'تواصل معنا',  href: '#contact'  },
]

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 backdrop-blur-xl"
         style={{ background: 'rgba(25,25,25,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo – right in RTL */}
        <GirdLogo size={48} />

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
           className="hidden md:inline-flex items-center gap-2 rounded-full text-sm font-semibold px-5 py-2 transition animate-pulse-orange"
           style={{ background: ORANGE, color: '#fff' }}>
          انضم للقائمة
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-400 hover:text-white"
                aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-3"
             style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#191919' }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="block text-sm text-gray-400 hover:text-white transition-colors py-1">
              {l.label}
            </a>
          ))}
          <a href="#waitlist" onClick={() => setOpen(false)}
             className="block text-center rounded-full text-sm font-semibold px-5 py-2.5"
             style={{ background: ORANGE, color: '#fff' }}>
            انضم للقائمة
          </a>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img src="/photos/6.png" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(25,25,25,0.7) 0%, rgba(25,25,25,0.55) 40%, rgba(25,25,25,0.92) 100%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
             style={{ background: 'rgba(43,42,161,0.25)', border: '1px solid rgba(43,42,161,0.6)', color: '#A3C6E6' }}>
          🎾 منصة البادل الأولى في السعودية
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up-d1 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ letterSpacing: '-0.01em' }}>
          وين ودّك{' '}
          <span style={{ color: YELLOW }}>تلعب</span>
          {' '}اليوم؟
        </h1>

        <p className="animate-fade-up-d2 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          احجز ملعبك، كفّل العدد، وطوّر لعبتك —<br className="hidden sm:block" /> كل شي في مكان واحد.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-d3 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#waitlist"
             className="inline-flex items-center justify-center gap-2 rounded-full text-base font-bold px-8 py-4 transition animate-pulse-orange"
             style={{ background: ORANGE, color: '#fff' }}>
            احجز ملعبك
            <ChevronRight size={18} className="rotate-180" />
          </a>
          <a href="#courts"
             className="inline-flex items-center justify-center gap-2 rounded-full text-base font-semibold px-8 py-4 transition"
             style={{ border: '2px solid rgba(255,255,255,0.2)', color: '#fff', background: 'rgba(255,255,255,0.05)' }}>
            اكتشف الملاعب
          </a>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-up-d3 mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { n: '+500', l: 'ملعب مسجّل' },
            { n: '+2000', l: 'لاعب نشط' },
            { n: '3×', l: 'أسرع في الحجز' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: YELLOW }}>{s.n}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Action Cards (mirrors the app's 3 main sections) ─── */
function ActionCards() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-5">

          {/* Card 1 — Book a court (Blue) */}
          <div className="relative rounded-3xl overflow-hidden md:col-span-1"
               style={{ background: BLUE, minHeight: 260 }}>
            <img src="/photos/1.png" alt=""
                 className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="relative p-7 flex flex-col justify-between h-full" style={{ minHeight: 260 }}>
              <div>
                <span className="inline-block rounded-full text-xs font-bold px-3 py-1 mb-4"
                      style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  🎾 حجز ملعب
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  وين ودك تلعب اليوم؟
                </h3>
                <p className="mt-2 text-sm text-blue-200">
                  ابحث عن ملعب قريب منك واحجز في ثوانٍ.
                </p>
              </div>
              <a href="#waitlist"
                 className="mt-6 self-start inline-flex items-center gap-1 rounded-full text-sm font-bold px-5 py-2.5 transition"
                 style={{ background: '#fff', color: BLUE }}>
                احجز ملعبك
                <ChevronRight size={16} className="rotate-180" />
              </a>
            </div>
          </div>

          {/* Card 2 — Complete squad (Orange) */}
          <div className="relative rounded-3xl overflow-hidden"
               style={{ background: ORANGE, minHeight: 260 }}>
            <img src="/photos/8.png" alt=""
                 className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="relative p-7 flex flex-col justify-between h-full" style={{ minHeight: 260 }}>
              <div>
                <span className="inline-block rounded-full text-xs font-bold px-3 py-1 mb-4"
                      style={{ background: 'rgba(0,0,0,0.2)', color: '#fff' }}>
                  🏆 كفّل العدد
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  العب وتعرّف على منافسين جدد!
                </h3>
                <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  انضم لمباريات مفتوحة أو أنشئ مبارياتك الخاصة.
                </p>
              </div>
              <a href="#waitlist"
                 className="mt-6 self-start inline-flex items-center gap-1 rounded-full text-sm font-bold px-5 py-2.5 transition"
                 style={{ background: '#fff', color: ORANGE }}>
                كفّل الفريق
                <ChevronRight size={16} className="rotate-180" />
              </a>
            </div>
          </div>

          {/* Card 3 — Level up (Dark + Yellow) */}
          <div className="relative rounded-3xl overflow-hidden"
               style={{ background: '#111', minHeight: 260, border: '1px solid rgba(255,255,255,0.07)' }}>
            <img src="/photos/3.png" alt=""
                 className="absolute inset-0 w-full h-full object-cover object-top opacity-30" />
            <div className="relative p-7 flex flex-col justify-between h-full" style={{ minHeight: 260 }}>
              <div>
                <span className="inline-block rounded-full text-xs font-bold px-3 py-1 mb-4"
                      style={{ background: 'rgba(225,240,150,0.15)', color: YELLOW }}>
                  🚀 تطور مستواك
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  تدرّب باحترافية مع نخبة المدربين.
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  برامج تدريبية مخصصة لمستواك ورياضتك.
                </p>
              </div>
              <a href="#waitlist"
                 className="mt-6 self-start inline-flex items-center gap-1 rounded-full text-sm font-bold px-5 py-2.5 transition"
                 style={{ background: YELLOW, color: '#111' }}>
                ابدأ التدريب
                <ChevronRight size={16} className="rotate-180" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─── Nearby Courts ─── */
const COURTS = [
  { name: 'نادي الرياض للبادل',     city: 'الرياض',  status: 'مفتوح',   img: '/photos/1.png' },
  { name: 'مركز جدة الرياضي',       city: 'جدة',     status: '3 ملاعب', img: '/photos/7.png' },
  { name: 'نادي الأحساء للبادل',    city: 'الأحساء', status: 'مفتوح',   img: '/photos/5.png' },
]

function NearbyCourts() {
  return (
    <section id="courts" className="py-16 sm:py-20" style={{ background: '#141414' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            📍 ملاعب قريبة منك
          </h2>
          <a href="#waitlist"
             className="text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
             style={{ color: ORANGE }}>
            عرض الكل
            <ChevronRight size={16} className="rotate-180" />
          </a>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="ابحث عن ملعب، بطولة، أو لاعب..."
            readOnly
            className="w-full rounded-2xl py-3.5 pr-12 pl-4 text-sm text-gray-400 placeholder:text-gray-500 focus:outline-none cursor-default"
            style={{ background: CARD2, border: '1px solid rgba(255,255,255,0.07)' }}
          />
        </div>

        {/* Court cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURTS.map(c => (
            <div key={c.name}
                 className="relative rounded-3xl overflow-hidden group cursor-pointer"
                 style={{ minHeight: 220 }}>
              <img src={c.img} alt={c.name}
                   className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              {/* Gradient overlay */}
              <div className="absolute inset-0"
                   style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)' }} />
              {/* Status badge */}
              <div className="absolute top-4 left-4">
                <span className="rounded-full text-xs font-bold px-3 py-1"
                      style={{ background: 'rgba(4,208,126,0.2)', color: GREEN, border: '1px solid rgba(4,208,126,0.4)' }}>
                  {c.status}
                </span>
              </div>
              {/* Info at bottom */}
              <div className="absolute bottom-0 right-0 left-0 p-5">
                <p className="font-bold text-white text-base">{c.name}</p>
                <p className="flex items-center gap-1.5 text-xs text-gray-300 mt-1">
                  <MapPin size={12} />
                  {c.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Matches Section ─── */
const MATCHES = [
  { label: 'مباراة مفتوحة',   players: '3/4',  time: 'اليوم، 8 مساءً',   color: ORANGE,      icon: '🔥' },
  { label: 'دوري الشركات',    players: '8/8',  time: 'الجمعة، 5 مساءً',  color: BLUE,        icon: '🏆' },
  { label: 'تدريب مجموعة',    players: '5/6',  time: 'السبت، 10 صباحاً', color: '#1e1e1e',   icon: '🚀' },
]

function MatchesSection() {
  return (
    <section id="matches" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            🔥 مباريات تنتظرك
          </h2>
          <a href="#waitlist"
             className="text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
             style={{ color: ORANGE }}>
            عرض الكل
            <ChevronRight size={16} className="rotate-180" />
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {MATCHES.map(m => (
            <div key={m.label}
                 className="rounded-3xl p-6 flex flex-col gap-4"
                 style={{ background: m.color === '#1e1e1e' ? CARD : m.color,
                          border: m.color === '#1e1e1e' ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{m.icon}</span>
                <span className="rounded-full text-xs font-bold px-3 py-1"
                      style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  {m.players} لاعب
                </span>
              </div>
              <div>
                <p className="font-bold text-white text-lg">{m.label}</p>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{m.time}</p>
              </div>
              <a href="#waitlist"
                 className="self-start inline-flex items-center gap-1 rounded-full text-xs font-bold px-4 py-2 transition"
                 style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                انضم الآن
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Players vs Owners ─── */
const PLAYER_BENEFITS = [
  'احجز ملاعب 24/7 بدون اتصالات',
  'كفّل عدد مع لاعبين بمستواك',
  'ادفع وقسّم الحساب داخل التطبيق',
  'تابع سجل مبارياتك وتطورك',
  'توصيات مخصصة لمستواك',
]
const OWNER_BENEFITS = [
  'امتلئ ملاعبك تلقائياً بدون جهد',
  'استقبل مدفوعات رقمية فورية',
  'لوحة إدارة الحجوزات بالوقت الحقيقي',
  'تحليلات اللاعبين والإيرادات',
  'صفر عمولة للملاك المبكرين 🎉',
]

function PlayersOwners() {
  return (
    <section id="owners" className="py-16 sm:py-20" style={{ background: '#141414' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">مصمّم لكل واحد فيكم</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            سواء كنت لاعباً تبحث عن ملعب أو مالك ملعب يريد تعبئة حجوزاته —
            <br className="hidden sm:block" /> قرد عندك الحل.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Players */}
          <div className="rounded-3xl p-8 relative overflow-hidden"
               style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
                 style={{ background: BLUE }} />
            <img src="/photos/4.png" alt="لاعب بادل"
                 className="w-full rounded-2xl mb-6 object-cover" style={{ height: 200, objectPosition: 'center 20%' }} />
            <span className="inline-block rounded-full text-xs font-bold px-4 py-1.5 mb-4"
                  style={{ background: `${BLUE}22`, color: '#A3C6E6', border: `1px solid ${BLUE}66` }}>
              🎾 للاعبين
            </span>
            <h3 className="text-xl font-bold mb-5">لعبتك، بأسلوبك.</h3>
            <ul className="space-y-3">
              {PLAYER_BENEFITS.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: `${BLUE}33` }}>
                    <Check size={11} style={{ color: '#A3C6E6' }} />
                  </span>
                  <span className="text-sm text-gray-300">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Owners */}
          <div className="rounded-3xl p-8 relative overflow-hidden"
               style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
                 style={{ background: ORANGE }} />
            <img src="/photos/2.png" alt="مالك ملعب"
                 className="w-full rounded-2xl mb-6 object-cover" style={{ height: 200, objectPosition: 'center 30%' }} />
            <span className="inline-block rounded-full text-xs font-bold px-4 py-1.5 mb-4"
                  style={{ background: `${ORANGE}22`, color: ORANGE, border: `1px solid ${ORANGE}66` }}>
              🏟️ لمالكي الملاعب
            </span>
            <h3 className="text-xl font-bold mb-5">امتلئ ملاعبك، لا جداول بعد اليوم.</h3>
            <ul className="space-y-3">
              {OWNER_BENEFITS.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: `${ORANGE}22` }}>
                    <Check size={11} style={{ color: ORANGE }} />
                  </span>
                  <span className="text-sm text-gray-300">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── App Download / Brand strip ─── */
function BrandStrip() {
  return (
    <section className="py-12 overflow-hidden" style={{ background: '#0e0e0e', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex animate-scroll-logos w-max items-center gap-10">
        {[...Array(2)].map((_, di) =>
          ['🎾 بادل', '📍 جدة', '🏆 رياض', '🚀 قرد', '🎾 ملاعب', '🔥 مباريات', '📍 السعودية', '🏅 تطور'].map((t, i) => (
            <span key={`${di}-${i}`}
                  className="text-sm font-bold whitespace-nowrap px-6 py-2 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}>
              {t}
            </span>
          ))
        )}
      </div>
    </section>
  )
}

/* ─── Waitlist CTA ─── */
function WaitlistCTA() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) { setSubmitted(true); setEmail('') }
  }

  return (
    <section id="waitlist" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
             style={{ background: BLUE }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Photo collage */}
        <div className="flex justify-center gap-3 mb-10">
          {['/photos/2.png', '/photos/7.png', '/photos/4.png'].map((p, i) => (
            <div key={i}
                 className="w-14 h-14 rounded-full overflow-hidden border-2"
                 style={{ borderColor: '#2B2AA1', marginTop: i === 1 ? 0 : 8 }}>
              <img src={p} alt="" className="w-full h-full object-cover object-top" />
            </div>
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          كن أول من <span style={{ color: YELLOW }}>يلعب.</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-10">
          انضم لقائمة الانتظار واحصل على وصول مبكر عند الإطلاق.
        </p>

        {submitted ? (
          <div className="rounded-3xl p-8 text-center"
               style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}40` }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                 style={{ background: `${GREEN}20` }}>
              <Check size={26} style={{ color: GREEN }} />
            </div>
            <p className="text-lg font-bold mb-1">أنت في القائمة! 🎉</p>
            <p className="text-sm text-gray-400">سنُعلمك بمجرد إطلاق قرد.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              aria-label="البريد الإلكتروني"
              className="flex-1 rounded-full py-3.5 px-6 text-sm text-white placeholder:text-gray-500 focus:outline-none transition"
              style={{ background: CARD2, border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <button
              type="submit"
              className="rounded-full text-sm font-bold px-7 py-3.5 whitespace-nowrap transition animate-pulse-orange"
              style={{ background: ORANGE, color: '#fff' }}>
              انضم الآن
            </button>
          </form>
        )}

        <p className="mt-6 text-xs text-gray-500">
          انضم إلى أكثر من <span className="text-white font-semibold">2,000</span> لاعع سجّلوا مسبقاً.
        </p>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer id="contact" className="pt-12 pb-8"
            style={{ background: '#0e0e0e', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8"
             style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <GirdLogo size={52} />
            <p className="text-xs text-gray-500">منصة البادل الأولى في السعودية</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {['الملاعب', 'المباريات', 'للمالكين', 'تواصل معنا', 'سياسة الخصوصية'].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>

          {/* Social placeholders */}
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

        <p className="text-center text-xs text-gray-600 mt-6">
          © 2026 قرد لتقنية الرياضة. جميع الحقوق محفوظة. صُنع في السعودية 🇸🇦
        </p>
      </div>
    </footer>
  )
}

/* ─── Main App ─── */
export default function App() {
  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#191919', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Navbar />
      <Hero />
      <ActionCards />
      <NearbyCourts />
      <MatchesSection />
      <PlayersOwners />
      <BrandStrip />
      <WaitlistCTA />
      <Footer />
    </div>
  )
}

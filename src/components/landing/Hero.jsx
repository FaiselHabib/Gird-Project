import { ChevronRight } from 'lucide-react'
import { ORANGE, YELLOW } from '../../lib/constants'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/photos/6.png" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(25,25,25,0.75) 0%, rgba(25,25,25,0.5) 40%, rgba(25,25,25,0.95) 100%)'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold mb-8"
             style={{ background: 'rgba(43,42,161,0.2)', border: '1px solid rgba(43,42,161,0.5)', color: '#A3C6E6' }}>
          منصة البادل الأولى في السعودية
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up-d1 text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.15] mb-6">
          وين ودّك{' '}
          <span style={{ color: YELLOW }}>تلعب</span>
          {' '}اليوم؟
        </h1>

        <p className="animate-fade-up-d2 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          احجز ملعبك، كفّل العدد، وطوّر لعبتك —
          <br className="hidden sm:block" />
          كل شي في مكان واحد.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-d3 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#waitlist"
             className="inline-flex items-center justify-center gap-2 rounded-full text-base font-bold px-8 py-4 transition animate-pulse-orange"
             style={{ background: ORANGE, color: '#fff' }}>
            انضم لقائمة الانتظار
            <ChevronRight size={18} className="rotate-180" />
          </a>
          <a href="#how-it-works"
             className="inline-flex items-center justify-center gap-2 rounded-full text-base font-semibold px-8 py-4 transition hover:bg-white/10"
             style={{ border: '2px solid rgba(255,255,255,0.15)', color: '#fff' }}>
            كيف يعمل قرد؟
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-d3 mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { n: '+500', l: 'ملعب مسجّل' },
            { n: '+2,000', l: 'لاعب بالانتظار' },
            { n: '3×', l: 'أسرع في الحجز' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: YELLOW }}>{s.n}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#191919] to-transparent" />
    </section>
  )
}

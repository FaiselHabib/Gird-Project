import { ORANGE, YELLOW } from '../../lib/constants'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/photos/6.jpg" alt="" fetchPriority="high" decoding="async"
             className="w-full h-full object-cover object-center" />
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
          كل{' '}
          <span style={{ color: YELLOW }}>لعبك</span>
          {' '}في مكان واحد.
        </h1>

        <p className="animate-fade-up-d2 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          احجز ملاعب، كوّن مباريات، شارك في بطولات،
          <br className="hidden sm:block" />
          وتابع كل شيء من قرد.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-d3 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#how-it-works"
             className="inline-flex items-center justify-center gap-2 rounded-full text-base font-bold px-8 py-4 transition hover:opacity-90"
             style={{ background: ORANGE, color: '#fff' }}>
            شاهد كيف يعمل
          </a>
          <a href="#app"
             className="inline-flex items-center justify-center gap-2 rounded-full text-base font-semibold px-8 py-4 transition hover:bg-white/10"
             style={{ border: '2px solid rgba(255,255,255,0.15)', color: '#fff' }}>
            استكشف التطبيق
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-d3 mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: YELLOW }}>⚡</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">احجز ملعبك بسهولة</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: YELLOW }}>🎯</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">كوّن فريقك وانضم للمباريات</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: YELLOW }}>🔥</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">العب أكثر، بدون تعقيد</p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#191919] to-transparent" />
    </section>
  )
}

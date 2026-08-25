import { BLUE, YELLOW } from '../../lib/constants'

const SCREENS = [
  {
    img: '/app/app-clubs-v2.png',
    title: 'اكتشف الملاعب',
    desc: 'ابحث عن الملاعب القريبة، قارن الخيارات، واختر المكان المناسب لك.',
    color: BLUE,
    scale: false,
  },
  {
    img: '/app/app-home-v2.png',
    title: 'كل لعبك أمامك',
    desc: 'ملاعب، مباريات، حجوزات واقتراحات — كل شيء يبدأ من الرئيسية.',
    color: YELLOW,
    scale: true,   // center hero — rendered larger
  },
  {
    img: '/app/app-matches-v2.png',
    title: 'العب بدون ما تبحث عن فريق',
    desc: 'أنشئ مباراة أو انضم لمباراة موجودة وكمل العدد بسهولة.',
    color: BLUE,
    scale: false,
  },
  {
    img: '/app/app-tournaments-v2.png',
    title: 'نافس وتابع تقدمك',
    desc: 'انضم للبطولات، تابع الجدول والنتائج، واعرف خطوتك الجاية.',
    color: BLUE,
    scale: false,
  },
]

export default function AppPreview() {
  return (
    <section id="app" className="py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-4"
                style={{ background: `${BLUE}15`, color: '#A3C6E6', border: `1px solid ${BLUE}30` }}>
            نظرة على التطبيق
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            كل شيء تحتاجه في <span style={{ color: YELLOW }}>تطبيق واحد</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            من اكتشاف الملاعب والحجز إلى المباريات والبطولات — تجربة واحدة مصممة للعب.
          </p>
        </div>

        {/* Phone mockups — 4 cols on md+, 2 cols on sm, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-8 md:gap-4 items-end justify-items-center">
          {SCREENS.map((s, i) => {
            const phoneW = s.scale ? 220 : 190
            const phoneH = s.scale ? 440 : 380

            return (
              <div key={i}
                   className="flex flex-col items-center group">
                {/* Phone frame */}
                <div
                  className="relative rounded-[2.2rem] overflow-hidden transition-transform duration-300 group-hover:-translate-y-2"
                  style={{
                    width: phoneW,
                    height: phoneH,
                    background: '#0a0a0a',
                    border: s.scale
                      ? `6px solid ${YELLOW}55`
                      : '6px solid #2a2a2a',
                    boxShadow: s.scale
                      ? `0 0 40px ${YELLOW}20, 0 20px 60px rgba(0,0,0,0.7)`
                      : '0 20px 60px rgba(0,0,0,0.5)',
                  }}>
                  {/* Hover accent glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ boxShadow: `0 0 0 1px ${s.color}66, 0 0 24px ${s.color}33` }} />

                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-5 rounded-b-xl"
                       style={{ background: '#0a0a0a' }} />

                  {/* Screen content */}
                  <div className="w-full h-full relative">
                    <img
                      src={s.img}
                      alt={s.title}
                      width={phoneW}
                      height={phoneH}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Bottom gradient + label */}
                    <div className="absolute inset-0"
                         style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)' }} />
                    <div className="absolute bottom-5 right-3 left-3 text-center">
                      <p className="text-xs font-bold text-white leading-snug">{s.title}</p>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20" />
                </div>

                {/* Label below phone */}
                <div className="mt-5 text-center px-2 max-w-[220px]">
                  <p className="text-sm font-bold text-white leading-snug">{s.title}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

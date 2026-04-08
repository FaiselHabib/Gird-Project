import { BLUE, ORANGE, YELLOW, CARD } from '../../lib/constants'

const SCREENS = [
  { img: '/photos/1.png', label: 'احجز ملعبك', desc: 'تصفّح واحجز في ثوانٍ' },
  { img: '/photos/8.png', label: 'كفّل العدد', desc: 'أكمل فريقك بسهولة' },
  { img: '/photos/5.png', label: 'تابع مبارياتك', desc: 'إحصائيات وتصنيفات' },
]

export default function AppPreview() {
  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-4"
                style={{ background: `${BLUE}15`, color: '#A3C6E6', border: `1px solid ${BLUE}30` }}>
            نظرة على التطبيق
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            كل شي تحتاجه في <span style={{ color: YELLOW }}>تطبيق واحد</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            تجربة سلسة من الحجز إلى اللعب — مصمّمة للاعب السعودي.
          </p>
        </div>

        {/* Phone mockups */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {SCREENS.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Phone frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
                   style={{
                     width: 240,
                     height: 480,
                     background: '#000',
                     border: '6px solid #2a2a2a',
                   }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-28 h-6 rounded-b-2xl"
                     style={{ background: '#000' }} />
                {/* Screen content */}
                <div className="w-full h-full relative">
                  <img src={s.img} alt={s.label}
                       className="w-full h-full object-cover" />
                  <div className="absolute inset-0"
                       style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)' }} />
                  {/* Label overlay */}
                  <div className="absolute bottom-6 right-4 left-4 text-center">
                    <p className="text-sm font-bold text-white mb-1">{s.label}</p>
                    <p className="text-xs text-gray-300">{s.desc}</p>
                  </div>
                </div>
                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/30" />
              </div>

              {/* Label below phone */}
              <div className="mt-6 text-center">
                <p className="text-base font-bold text-white">{s.label}</p>
                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { CalendarCheck, Users, Trophy, Dumbbell } from 'lucide-react'
import { ORANGE, BLUE, GREEN, YELLOW, CARD } from '../../lib/constants'

const FEATURES = [
  {
    icon: CalendarCheck,
    color: BLUE,
    title: 'احجز ملعبك بسهولة',
    desc: 'تصفح الملاعب المتاحة، اختر الوقت المناسب، واحجز بدون مكالمات أو تنسيق يدوي.',
    num: '01',
  },
  {
    icon: Users,
    color: ORANGE,
    title: 'أنشئ أو انضم لمباراة',
    desc: 'كوّن مباراتك أو انضم للاعبين قريبين منك، وكمل العدد بسهولة.',
    num: '02',
  },
  {
    icon: Trophy,
    color: GREEN,
    title: 'شارك في بطولات منظمة',
    desc: 'انضم للبطولات، تابع تقدمك، وشاهد النتائج من مكان واحد.',
    num: '03',
  },
  {
    icon: Dumbbell,
    color: YELLOW,
    title: 'تدرّب مع محترفين',
    desc: 'احجز جلسات تدريب مع مدربين محترفين وطوّر مستواك باستمرار.',
    num: '04',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-4"
                style={{ background: `${YELLOW}15`, color: YELLOW, border: `1px solid ${YELLOW}30` }}>
            كيف يعمل قرد؟
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            كل شيء تحتاجه للعب… في مكان واحد
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            قرد يجمع لك تجربة اللعب كاملة — من الحجز للمباريات والبطولات، بدون تعقيد.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map((s, i) => (
            <div key={i}
                 className="relative rounded-3xl p-8 group transition-transform duration-200 hover:-translate-y-1"
                 style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Hover accent border */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                   style={{ border: `1px solid ${s.color}55` }} />

              {/* Step number */}
              <span className="absolute top-5 left-6 text-5xl font-black leading-none opacity-[0.14] select-none transition-opacity duration-200 group-hover:opacity-[0.22]"
                    style={{ color: s.color }}>
                {s.num}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                   style={{ background: `${s.color}15` }}>
                <s.icon size={24} style={{ color: s.color }} />
              </div>

              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { CalendarCheck, Users, Trophy, Dumbbell } from 'lucide-react'
import { ORANGE, BLUE, GREEN, YELLOW, CARD } from '../../lib/constants'

const FEATURES = [
  {
    icon: CalendarCheck,
    color: BLUE,
    title: 'احجز ملعبك بسهولة',
    desc: 'تصفح الملاعب المتاحة في جدة واحجز في ثواني بدون مكالمات أو تنسيق يدوي.',
    num: '01',
  },
  {
    icon: Users,
    color: ORANGE,
    title: 'أنشئ أو انضم لمباراة',
    desc: 'ابحث عن لاعبين بنفس مستواك أو أنشئ لعبتك الخاصة وكمل العدد بسهولة.',
    num: '02',
  },
  {
    icon: Trophy,
    color: GREEN,
    title: 'شارك في بطولات منظمة',
    desc: 'انضم لبطولات جاهزة وتابع تقدمك عبر نظام الشجرة لمعرفة النتائج لحظة بلحظة.',
    num: '03',
  },
  {
    icon: Dumbbell,
    color: YELLOW,
    title: 'تدرّب مع محترفين',
    desc: 'احجز جلسات تدريب مع مدربين معتمدين وطور مستواك بشكل أسرع.',
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
            قرد يجمع لك تجربة اللعب كاملة — من الحجز إلى البطولات، بدون تعقيد.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map((s, i) => (
            <div key={i}
                 className="relative rounded-3xl p-8 group transition-transform hover:-translate-y-1"
                 style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Step number */}
              <span className="absolute top-6 left-6 text-5xl font-black opacity-[0.06] select-none"
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

import { Search, Users, Trophy } from 'lucide-react'
import { ORANGE, BLUE, GREEN, YELLOW, CARD } from '../../lib/constants'

const STEPS = [
  {
    icon: Search,
    color: BLUE,
    title: 'ابحث عن ملعب أو مباراة',
    desc: 'تصفّح الملاعب القريبة منك أو انضم لمباريات مفتوحة حسب موقعك ورياضتك المفضلة.',
    num: '01',
  },
  {
    icon: Users,
    color: ORANGE,
    title: 'انضم أو أنشئ لعبة',
    desc: 'كفّل العدد مع لاعبين بمستواك، أو أنشئ مباراتك الخاصة وادعُ أصدقائك.',
    num: '02',
  },
  {
    icon: Trophy,
    color: GREEN,
    title: 'العب وطوّر مستواك',
    desc: 'تابع إحصائياتك، شارك في البطولات، وارتقِ في التصنيف بين أفضل اللاعبين.',
    num: '03',
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
            ثلاث خطوات فقط
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            من البحث للعب في دقائق — بدون اتصالات أو تنسيق معقد.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
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

              {/* Connector line (not on last) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-px"
                     style={{ background: 'rgba(255,255,255,0.1)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

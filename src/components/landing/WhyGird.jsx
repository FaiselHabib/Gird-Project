import { LayoutGrid, MapPin, Users, Zap } from 'lucide-react'
import { ORANGE, BLUE, GREEN, YELLOW, CARD } from '../../lib/constants'

const PILLARS = [
  {
    icon: LayoutGrid,
    color: BLUE,
    title: 'كل شيء في مكان واحد',
    desc: 'ملاعب، مباريات، بطولات وتدريب — تجربة متكاملة بدون تشتيت.',
  },
  {
    icon: MapPin,
    color: GREEN,
    title: 'مصمم للاعب السعودي',
    desc: 'تجربة عربية واضحة ومبنية حول طريقة لعبنا واحتياجاتنا.',
  },
  {
    icon: Users,
    color: ORANGE,
    title: 'للاعبين وملّاك الملاعب',
    desc: 'يخدم اللاعب بتجربة أسهل، ويساعد مالك الملعب بإدارة أوضح.',
  },
  {
    icon: Zap,
    color: YELLOW,
    title: 'أقل تعقيد، تجربة أسرع',
    desc: 'واجهة بسيطة تركّز على اللعب بدل التنسيق والمكالمات والخطوات الطويلة.',
  },
]

export default function WhyGird() {
  return (
    <section className="py-20 sm:py-28" style={{ background: '#141414' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-4"
                style={{ background: `${YELLOW}15`, color: YELLOW, border: `1px solid ${YELLOW}30` }}>
            ليش قرد؟
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            تجربة رياضية واحدة… متكاملة
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto text-balance">
            قرد يجمع كل ما تحتاجه للعب في منصة واحدة — بسيطة، واضحة، ومصمّمة لك.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <div key={i}
                 className="rounded-3xl p-7 text-center transition-transform hover:-translate-y-1"
                 style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                   style={{ background: `${p.color}15` }}>
                <p.icon size={24} style={{ color: p.color }} />
              </div>
              <h3 className="text-base font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

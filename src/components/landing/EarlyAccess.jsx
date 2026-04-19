import { Zap, Star, Shield, Gift } from 'lucide-react'
import { ORANGE, BLUE, GREEN, YELLOW, CARD } from '../../lib/constants'

const PERKS = [
  {
    icon: Zap,
    color: ORANGE,
    title: 'أولوية الوصول',
    desc: 'كن من أوائل المستخدمين اللي يجربون قرد عند الإطلاق.',
  },
  {
    icon: Star,
    color: YELLOW,
    title: 'متابعة مباشرة للإطلاق',
    desc: 'يوصلك كل جديد عن الإطلاق والتحديثات المهمة أول بأول.',
  },
  {
    icon: Shield,
    color: BLUE,
    title: 'فرصة أعلى للدخول المبكر',
    desc: 'التسجيل المبكر يعطيك فرصة أعلى للدخول في أول دفعات الإطلاق.',
  },
  {
    icon: Gift,
    color: GREEN,
    title: 'ابدأ قبل الزحمة',
    desc: 'ادخل بدري وكن من أول الناس اللي يجربون قرد عند الإطلاق.',
  },
]

export default function EarlyAccess() {
  return (
    <section className="py-20 sm:py-28" style={{ background: '#141414' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-4"
                style={{ background: `${GREEN}15`, color: GREEN, border: `1px solid ${GREEN}30` }}>
            مزايا الانضمام المبكر
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            ليش تسجل من الآن؟
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            انضم مبكرًا وخلّك من أوائل الناس اللي يوصلهم الإطلاق الرسمي.
          </p>
        </div>

        {/* Perks grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map((p, i) => (
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

        {/* Inline CTA */}
        <div className="text-center mt-12">
          <a href="#waitlist"
             className="inline-flex items-center gap-2 rounded-full text-base font-bold px-8 py-4 transition animate-pulse-orange"
             style={{ background: ORANGE, color: '#fff' }}>
            انضم لقائمة الانتظار
          </a>
        </div>
      </div>
    </section>
  )
}

import { Check } from 'lucide-react'
import { ORANGE, CARD } from '../../lib/constants'

const BENEFITS = [
  { title: 'إدارة حجوزاتك في مكان واحد', desc: 'تابع الحجوزات والمواعيد بشكل واضح ومنظم بدون مكالمات أو جداول مشتتة.' },
  { title: 'قلّل الإلغاء والفوضى', desc: 'نظام أوضح للحجوزات يساعدك على تنظيم الأوقات وتقليل الأخطاء.' },
  { title: 'ارفع استخدام ملاعبك', desc: 'خل اللاعبين يكتشفون أوقاتك المتاحة ويحجزون بسهولة.' },
  { title: 'قدّم تجربة أفضل للاعبين', desc: 'تجربة حجز واضحة وسريعة تعكس مستوى منشأتك.' },
  { title: 'أدر نمو ملعبك بسهولة', desc: 'نظّم التشغيل اليومي وخلك جاهز تتوسع بدون تعقيد إضافي.' },
]

export default function ForOwners() {
  return (
    <section id="owners" className="py-20 sm:py-28" style={{ background: '#141414' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-y-8">
          {/* Intro: badge + heading + copy */}
          <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-end">
            <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-6"
                  style={{ background: `${ORANGE}15`, color: ORANGE, border: `1px solid ${ORANGE}40` }}>
              قرد لملّاك الملاعب
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              خل إدارة ملعبك أسهل.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              نظّم حجوزاتك، قلّل التنسيق اليدوي، وخل تجربة عملائك أسهل — من مكان واحد.
            </p>
          </div>

          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center" style={{ minHeight: 400 }}>
            <img src="/photos/2.jpg" alt="مالك ملعب بادل" loading="lazy" decoding="async"
                 className="w-full h-full object-cover" style={{ minHeight: 400 }} />
            <div className="absolute inset-0"
                 style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
            {/* Floating value card */}
            <div className="absolute bottom-6 right-6 left-6 rounded-2xl p-4 backdrop-blur-lg"
                 style={{ background: 'rgba(30,30,30,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="grid grid-cols-3 gap-4 text-center">
                {['إدارة أسهل', 'فوضى أقل', 'استخدام أعلى'].map(l => (
                  <p key={l} className="text-xs sm:text-sm font-bold" style={{ color: ORANGE }}>{l}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start">
            <ul className="space-y-5">
              {BENEFITS.map(b => (
                <li key={b.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: `${ORANGE}20` }}>
                    <Check size={12} style={{ color: ORANGE }} />
                  </span>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-white leading-snug">{b.title}</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

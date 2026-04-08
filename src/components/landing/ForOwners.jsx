import { Check } from 'lucide-react'
import { ORANGE, CARD } from '../../lib/constants'

const BENEFITS = [
  { title: 'امتلئ ملاعبك تلقائياً', desc: 'وصول لآلاف اللاعبين الباحثين عن ملاعب قريبة.' },
  { title: 'مدفوعات رقمية فورية', desc: 'استقبل الدفعات أونلاين — لا نقد، لا متابعة.' },
  { title: 'لوحة إدارة بالوقت الحقيقي', desc: 'تابع الحجوزات والإيرادات من مكان واحد.' },
  { title: 'تحليلات ذكية', desc: 'اعرف أوقات الذروة، أنماط اللاعبين، ومعدلات الإشغال.' },
  { title: 'صفر عمولة للملاك المبكرين', desc: 'انضم الآن واستفد من فترة الإطلاق بدون رسوم.' },
]

export default function ForOwners() {
  return (
    <section id="owners" className="py-20 sm:py-28" style={{ background: '#141414' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-6"
                  style={{ background: `${ORANGE}15`, color: ORANGE, border: `1px solid ${ORANGE}40` }}>
              لمالكي الملاعب
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              امتلئ ملاعبك، لا جداول بعد اليوم.
            </h2>
            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              بدّل الجداول الورقية والاتصالات بنظام رقمي متكامل يزيد حجوزاتك ويبسّط إدارتك.
            </p>

            <ul className="space-y-4">
              {BENEFITS.map(b => (
                <li key={b.title} className="flex items-start gap-3 rounded-2xl p-4 transition hover:bg-white/[0.02]">
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: `${ORANGE}20` }}>
                    <Check size={12} style={{ color: ORANGE }} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{b.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: 400 }}>
            <img src="/photos/2.png" alt="مالك ملعب بادل"
                 className="w-full h-full object-cover" style={{ minHeight: 400 }} />
            <div className="absolute inset-0"
                 style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
            {/* Floating stats card */}
            <div className="absolute bottom-6 right-6 left-6 rounded-2xl p-4 backdrop-blur-lg"
                 style={{ background: 'rgba(30,30,30,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold" style={{ color: ORANGE }}>94%</p>
                  <p className="text-[10px] text-gray-400">معدل الإشغال</p>
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: ORANGE }}>+120</p>
                  <p className="text-[10px] text-gray-400">حجز/شهر</p>
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: ORANGE }}>0%</p>
                  <p className="text-[10px] text-gray-400">عمولة حالياً</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

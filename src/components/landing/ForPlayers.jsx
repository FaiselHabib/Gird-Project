import { Check, ChevronRight } from 'lucide-react'
import { BLUE, CARD } from '../../lib/constants'

const BENEFITS = [
  { title: 'احجز ملعبك بسهولة', desc: 'بدون مكالمات أو تنسيق — احجز مباشرة من التطبيق في ثواني.' },
  { title: 'كوّن فريقك بسرعة', desc: 'أنشئ لعبتك أو انضم لمباراة جاهزة وكمل العدد بدون تعب.' },
  { title: 'انضم لبطولات حقيقية', desc: 'تابع نتائجك وتقدمك من خلال نظام البطولة (الشجرة) بشكل واضح.' },
  { title: 'كل شيء في مكان واحد', desc: 'ملاعب، مباريات، بطولات، ومدربين — تجربة متكاملة بدون تشتت.' },
  { title: 'تجربة أسرع وأبسط', desc: 'واجهة واضحة تخليك تركز على اللعب بدل التعقيد.' },
]

export default function ForPlayers() {
  return (
    <section id="players" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden order-2 lg:order-1" style={{ minHeight: 400 }}>
            <img src="/photos/4.png" alt="لاعب بادل"
                 className="w-full h-full object-cover" style={{ minHeight: 400 }} />
            <div className="absolute inset-0"
                 style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
            {/* Floating card */}
            <div className="absolute bottom-6 right-6 left-6 rounded-2xl p-4 backdrop-blur-lg"
                 style={{ background: 'rgba(30,30,30,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{ background: `${BLUE}20` }}>
                  <span className="text-lg">🎾</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">مباراة مفتوحة — جدة</p>
                  <p className="text-xs text-gray-400">3/4 لاعبين · اليوم 8 مساءً</p>
                </div>
                <a href="#waitlist"
                   className="mr-auto rounded-full text-xs font-bold px-4 py-2"
                   style={{ background: BLUE, color: '#fff' }}>
                  انضم
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-6"
                  style={{ background: `${BLUE}15`, color: '#A3C6E6', border: `1px solid ${BLUE}40` }}>
              للاعبين
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              العب بطريقتك… بدون تعقيد.
            </h2>
            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              قرد يجمع لك كل شيء تحتاجه للعب — من حجز الملاعب إلى تكوين فريقك، في تجربة سريعة وواضحة.
            </p>

            <ul className="space-y-4">
              {BENEFITS.map(b => (
                <li key={b.title} className="flex items-start gap-3 rounded-2xl p-4 transition hover:bg-white/[0.02]"
                    style={{ border: '1px solid transparent' }}>
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: `${BLUE}20` }}>
                    <Check size={12} style={{ color: '#A3C6E6' }} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{b.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
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

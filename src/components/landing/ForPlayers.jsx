import { Check } from 'lucide-react'
import { BLUE } from '../../lib/constants'

const BENEFITS = [
  { title: 'احجز ملعبك بسهولة', desc: 'اختر الملعب والوقت المناسب واحجز مباشرة من التطبيق.' },
  { title: 'كوّن فريقك بسرعة', desc: 'أنشئ مباراتك أو انضم للاعبين قريبين منك وكمل العدد بسهولة.' },
  { title: 'شارك في بطولات حقيقية', desc: 'انضم للبطولات، تابع تقدمك، وشاهد النتائج من مكان واحد.' },
  { title: 'كل لعبك في مكان واحد', desc: 'ملاعب، مباريات، بطولات وتدريب — بدون تشتيت بين أكثر من خدمة.' },
  { title: 'طوّر مستواك', desc: 'احجز جلسات تدريب مع مدربين محترفين وتابع تطورك.' },
]

export default function ForPlayers() {
  return (
    <section id="players" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-y-8">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center" style={{ minHeight: 400 }}>
            <img src="/photos/4.jpg" alt="لاعب بادل" loading="lazy" decoding="async"
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
                <span className="mr-auto rounded-full text-xs font-bold px-4 py-2"
                      style={{ background: BLUE, color: '#fff' }}>
                  انضم
                </span>
              </div>
            </div>
          </div>

          {/* Intro: badge + heading + copy */}
          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 lg:self-end">
            <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-6"
                  style={{ background: `${BLUE}15`, color: '#A3C6E6', border: `1px solid ${BLUE}40` }}>
              قرد للاعب
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              العب بطريقتك… بدون تعقيد.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              من حجز الملعب إلى تكوين فريقك والانضمام للمباريات — قرد يجمع لك تجربة اللعب في مكان واحد.
            </p>
          </div>

          {/* Benefits */}
          <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 lg:self-start">
            <ul className="space-y-5">
              {BENEFITS.map(b => (
                <li key={b.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: `${BLUE}20` }}>
                    <Check size={12} style={{ color: '#A3C6E6' }} />
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

import { Building2, CalendarDays, CreditCard, Settings2, UsersRound } from 'lucide-react'
import { BLUE, GREEN, ORANGE, YELLOW } from '../../lib/constants'
import { INTERCOM_LAUNCHER_CLASS, openIntercom } from '../../lib/intercom'

const FEATURES = [
  {
    icon: CalendarDays,
    color: YELLOW,
    title: 'أنشئ فعاليتك بدقة',
    desc: 'اختر الملعب، اليوم، الوقت، المدة، عدد المقاعد وسعر المشاركة.',
  },
  {
    icon: CreditCard,
    color: GREEN,
    title: 'التسجيل والدفع من التطبيق',
    desc: 'اللاعب يحجز مقعده ويدفع مباشرة بدون تحويلات ومتابعة يدوية.',
  },
  {
    icon: Settings2,
    color: ORANGE,
    title: 'تحكم كامل للمنظّم',
    desc: 'أدر الأعضاء والفعاليات والتفاصيل والشروط من مكان واحد.',
  },
  {
    icon: UsersRound,
    color: '#A3C6E6',
    title: 'مرونة بين الملاعب',
    desc: 'نظّم كل فعالية في الملعب والموعد الأنسب لمجتمعك.',
  },
]

const OUTCOMES = [
  { icon: UsersRound, label: 'للمنظّم', value: 'تشغيل ودخل أكثر تنظيمًا' },
  { icon: CreditCard, label: 'للاعب', value: 'انضمام ودفع أسهل' },
  { icon: Building2, label: 'للملعب', value: 'حجوزات أوضح واستفادة أفضل' },
]

function Phone({ src, alt, className, featured = false }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] ${className}`}
      style={{
        background: '#090909',
        border: featured ? `5px solid ${BLUE}` : '5px solid #292929',
        boxShadow: featured
          ? `0 0 42px ${BLUE}35, 0 24px 70px rgba(0,0,0,0.65)`
          : '0 20px 55px rgba(0,0,0,0.55)',
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-14 sm:w-20 h-3.5 sm:h-5 rounded-b-xl bg-black" />
      <img
        src={src}
        alt={alt}
        width={720}
        height={1561}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto"
      />
    </div>
  )
}

export default function Communities() {
  return (
    <section
      id="communities"
      className="py-20 sm:py-28 overflow-hidden"
      style={{ background: '#101010', borderBlock: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span
            className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-5"
            style={{ background: `${BLUE}22`, color: '#A3C6E6', border: `1px solid ${BLUE}55` }}
          >
            ميزة جديدة · قرد للمجتمعات
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            مجتمعك الرياضي… <span style={{ color: YELLOW }}>بإدارة كاملة</span> من قرد.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mt-5 max-w-2xl mx-auto">
            بدل القروبات والتحويلات اليدوية، قرد يجمع إنشاء الفعاليات، حجز الملاعب، تسجيل اللاعبين والدفع في نظام واحد.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-bold mb-6" style={{ color: '#A3C6E6' }}>
              كل ما يحتاجه مدير المجتمع لتشغيل فعالياته
            </p>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {FEATURES.map(feature => (
                <article
                  key={feature.title}
                  className="rounded-2xl p-5 transition-colors duration-300 hover:bg-white/[0.045]"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${feature.color}18`, color: feature.color }}
                  >
                    <feature.icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">{feature.desc}</p>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openIntercom('مرحبًا، أرغب في إنشاء وإدارة مجتمع رياضي على قرد.')}
              className={`${INTERCOM_LAUNCHER_CLASS} mt-7 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30`}
              style={{ background: BLUE }}
            >
              أدر مجتمعك مع قرد
            </button>
          </div>

          <div className="relative min-h-[390px] sm:min-h-[540px] lg:min-h-[570px]" aria-label="شاشات ميزة المجتمعات في تطبيق قرد">
            <div
              className="absolute inset-x-[10%] top-[12%] bottom-[8%] rounded-full pointer-events-none"
              style={{ background: `${BLUE}20`, filter: 'blur(65px)' }}
            />
            <Phone
              src="/app/community-discover.png"
              alt="استكشاف المجتمعات والانضمام إليها في قرد"
              className="w-[35%] left-0 top-[22%] rotate-[2deg] z-10"
            />
            <Phone
              src="/app/community-dashboard.png"
              alt="لوحة إدارة المجتمع والفعاليات في قرد"
              className="w-[44%] left-1/2 -translate-x-1/2 top-0 z-30"
              featured
            />
            <Phone
              src="/app/community-create-event.png"
              alt="إنشاء فعالية وتحديد الملعب والموعد والسعر في قرد"
              className="w-[35%] right-0 top-[22%] -rotate-[2deg] z-20"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-12 sm:mt-16">
          {OUTCOMES.map(outcome => (
            <div
              key={outcome.label}
              className="rounded-2xl px-5 py-5 flex items-center gap-4"
              style={{ background: '#181818', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${BLUE}20`, color: '#A3C6E6' }}>
                <outcome.icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs text-gray-500">{outcome.label}</p>
                <p className="text-sm font-bold text-white mt-0.5">{outcome.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

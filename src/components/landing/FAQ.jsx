import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { YELLOW, CARD } from '../../lib/constants'
import { INTERCOM_LAUNCHER_CLASS, openIntercom } from '../../lib/intercom'

const FAQS = [
  {
    q: 'ما هو قرد؟',
    a: 'قرد منصة رياضية تجمع حجز الملاعب، المباريات، البطولات والتدريب في تجربة واحدة للاعبين وملاك الملاعب.',
  },
  {
    q: 'كيف أحجز ملعب؟',
    a: 'عند إطلاق التطبيق، اختر الملعب وحدّد الوقت المناسب، ثم أكمل الحجز مباشرة من قرد.',
  },
  {
    q: 'هل قرد للاعبين فقط؟',
    a: 'لا. قرد يخدم اللاعبين وملاك الملاعب، ويوفر لكل طرف تجربة وأدوات تناسب احتياجه.',
  },
  {
    q: 'كيف يسجل مالك الملعب؟',
    a: 'يمكن لمالك الملعب التواصل مع فريق قرد لإضافة منشأته وبدء إعداد الملاعب والحجوزات على المنصة.',
  },
  {
    q: 'هل يدعم قرد المباريات والبطولات؟',
    a: 'نعم. يمكنك إنشاء أو الانضمام إلى المباريات، والمشاركة في البطولات ومتابعة تقدمك ونتائجك.',
  },
  {
    q: 'هل استخدام قرد مجاني؟',
    a: 'يمكن تصفح واستخدام الخدمات الأساسية في قرد، وقد تختلف الرسوم حسب الحجز أو الخدمة المقدمة.',
  },
  {
    q: 'كيف أتواصل مع الدعم؟',
    a: 'يمكنك التواصل مع فريق قرد من خلال المحادثة المباشرة في الموقع أو من داخل التطبيق.',
    support: true,
  },
]

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl overflow-hidden transition-colors"
         style={{
           background: isOpen ? CARD : 'transparent',
           border: `1px solid ${isOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
         }}>
      <button onClick={onToggle} aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-5 text-right cursor-pointer">
        <span className="text-sm sm:text-base font-semibold text-white">{faq.q}</span>
        <ChevronDown size={18} aria-hidden="true"
                     className="shrink-0 text-gray-500 transition-transform duration-200"
                     style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>
      <div className="overflow-hidden transition-all duration-200"
           style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}>
        <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
          <p>{faq.a}</p>
          {faq.support && (
            <button
              type="button"
              onClick={() => openIntercom()}
              className={`${INTERCOM_LAUNCHER_CLASS} mt-3 font-bold hover:text-white transition-colors cursor-pointer`}
              style={{ color: YELLOW }}
            >
              افتح المحادثة الآن
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-4"
                style={{ background: `${YELLOW}15`, color: YELLOW, border: `1px solid ${YELLOW}30` }}>
            أسئلة شائعة
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">عندك سؤال؟</h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={i}
                     faq={faq}
                     isOpen={openIdx === i}
                     onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

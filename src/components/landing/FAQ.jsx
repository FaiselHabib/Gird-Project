import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ORANGE, YELLOW, CARD } from '../../lib/constants'

const FAQS = [
  {
    q: 'متى يُطلق التطبيق؟',
    a: 'نعمل حالياً على الإصدار الأول ونتوقع إطلاقه قريباً. انضم لقائمة الانتظار لتكون أول من يعرف.',
  },
  {
    q: 'أي رياضات مدعومة؟',
    a: 'نبدأ بالبادل كرياضة أساسية، مع خطط لإضافة التنس وكرة القدم وغيرها في المراحل القادمة.',
  },
  {
    q: 'أي مدن يغطّيها قرد؟',
    a: 'الإطلاق الأول يشمل الرياض وجدة والدمام. نتوسع لبقية مدن المملكة تباعاً بعد الإطلاق.',
  },
  {
    q: 'هل التسجيل مجاني؟',
    a: 'نعم، الانضمام لقائمة الانتظار واستخدام التطبيق كلاعب مجاني تماماً.',
  },
  {
    q: 'كيف أسجّل ملعبي كمالك؟',
    a: 'سجّل في قائمة الانتظار كمالك ملعب وسيتواصل معك فريقنا لإعداد حسابك وإضافة ملاعبك.',
  },
  {
    q: 'هل يوجد عمولة على المالكين؟',
    a: 'خلال فترة الإطلاق المبكر — لا توجد أي عمولة. المالكين المبكرين يستفيدون من فترة مجانية كاملة.',
  },
]

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl overflow-hidden transition-colors"
         style={{
           background: isOpen ? CARD : 'transparent',
           border: `1px solid ${isOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
         }}>
      <button onClick={onToggle}
              className="w-full flex items-center justify-between gap-4 p-5 text-right cursor-pointer">
        <span className="text-sm sm:text-base font-semibold text-white">{faq.q}</span>
        <ChevronDown size={18}
                     className="shrink-0 text-gray-500 transition-transform duration-200"
                     style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>
      <div className="overflow-hidden transition-all duration-200"
           style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}>
        <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
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

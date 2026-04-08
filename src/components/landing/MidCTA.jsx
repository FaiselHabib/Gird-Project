import { ChevronRight } from 'lucide-react'
import { ORANGE, BLUE } from '../../lib/constants'

export default function MidCTA() {
  return (
    <section className="py-14 overflow-hidden"
             style={{ background: '#0e0e0e', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl p-8 sm:p-10"
             style={{ background: BLUE }}>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">جاهز تبدأ تلعب؟</h3>
            <p className="text-sm text-blue-200">انضم لآلاف اللاعبين في قائمة الانتظار.</p>
          </div>
          <a href="#waitlist"
             className="shrink-0 inline-flex items-center gap-2 rounded-full text-sm font-bold px-7 py-3.5 transition hover:opacity-90"
             style={{ background: ORANGE, color: '#fff' }}>
            سجّل الآن
            <ChevronRight size={16} className="rotate-180" />
          </a>
        </div>
      </div>
    </section>
  )
}

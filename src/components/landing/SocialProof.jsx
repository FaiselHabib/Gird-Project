import { ORANGE, BLUE, GREEN } from '../../lib/constants'

export default function SocialProof() {
  return (
    <section className="py-14 sm:py-16" style={{ background: '#141414' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl p-8 sm:p-10"
             style={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Text */}
          <div className="text-center md:text-right flex-1">
            <p className="text-lg sm:text-xl font-bold mb-2">
              انضم للاعبين بدأوا التسجيل في جدة 🎾
            </p>
            <p className="text-sm text-gray-400">
              الإطلاق يبدأ من جدة — ونتوسع قريبًا
            </p>
          </div>

          {/* Avatars + cities */}
          <div className="flex items-center gap-6">
            {/* Stacked avatars */}
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {['/photos/2.png', '/photos/7.png', '/photos/4.png', '/photos/3.png'].map((p, i) => (
                <div key={i}
                     className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#1e1e1e]">
                  <img src={p} alt="" className="w-full h-full object-cover object-top" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 border-[#1e1e1e]"
                   style={{ background: BLUE, color: '#fff' }}>
                +
              </div>
            </div>

            {/* City badges */}
            <div className="hidden sm:flex flex-wrap gap-2">
              <span className="text-xs font-medium rounded-full px-3 py-1"
                    style={{ background: `${GREEN}15`, color: GREEN, border: `1px solid ${GREEN}30` }}>
                جدة
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

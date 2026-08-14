import { GREEN } from '../../lib/constants'

export default function SocialProof() {
  return (
    <section className="py-12 sm:py-14" style={{ background: '#141414' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 rounded-3xl px-8 sm:px-10 md:px-12 py-7 sm:py-8 md:py-9"
             style={{
               background: '#1e1e1e',
               border: `1px solid ${GREEN}20`,
               boxShadow: `0 0 60px -30px ${GREEN}30`,
             }}>

          {/* Copy */}
          <div className="text-center md:text-right flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-3">
              مصمم لتجربة الرياضة في السعودية 🎾
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md mx-auto md:mx-0">
              قرد يجمع اللاعبين، الملاعب، المباريات والبطولات في تجربة واحدة.
            </p>
          </div>

          {/* Category tags */}
          <div className="grid grid-cols-2 gap-3 justify-items-center md:justify-items-end">
            {['ملاعب', 'مباريات', 'بطولات', 'تدريب'].map((tag, i) => (
              <span key={i}
                    className="text-xs sm:text-sm font-medium rounded-full px-4 py-1.5 text-center"
                    style={{ background: `${GREEN}12`, color: GREEN, border: `1px solid ${GREEN}30` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

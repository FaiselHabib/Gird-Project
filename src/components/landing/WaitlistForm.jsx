import { useState, useEffect } from 'react'
import { Check, Loader2, Copy, Share2, CheckCircle2 } from 'lucide-react'
import { supabase, supabaseReady } from '../../lib/supabase'
import { ORANGE, BLUE, GREEN, YELLOW, CARD, CARD2, CITIES, SPORTS, generateReferralCode } from '../../lib/constants'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function WaitlistForm() {
  const [email, setEmail]             = useState('')
  const [city, setCity]               = useState('')
  const [userType, setUserType]       = useState('player')
  const [sport, setSport]             = useState('padel')
  const [status, setStatus]           = useState('idle')
  const [validationErr, setValidationErr] = useState('')
  const [position, setPosition]       = useState(null)
  const [referralCode, setReferralCode] = useState('')
  const [copied, setCopied]           = useState(false)

  // Launch progress config (read from app_config)
  const LAUNCH_DEFAULT = { visible: true, title: '🚀 قرد قادم قريبًا', subtitle: 'نقترب من الإطلاق الرسمي', percentage: 60 }
  const [launchConfig, setLaunchConfig] = useState(LAUNCH_DEFAULT)

  useEffect(() => {
    if (!supabaseReady) return
    supabase
      .from('app_config')
      .select('is_visible, title, subtitle, progress')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setLaunchConfig({
          visible:    data.is_visible  ?? LAUNCH_DEFAULT.visible,
          title:      data.title       ?? LAUNCH_DEFAULT.title,
          subtitle:   data.subtitle    ?? LAUNCH_DEFAULT.subtitle,
          percentage: data.progress    ?? LAUNCH_DEFAULT.percentage,
        })
      })
  }, [])

  // Read referral from URL
  const [referredBy, setReferredBy] = useState('')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) setReferredBy(ref)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()

    if (!EMAIL_RE.test(trimmed)) {
      setValidationErr('الرجاء إدخال بريد إلكتروني صحيح.')
      return
    }
    setValidationErr('')

    if (!supabaseReady) {
      setStatus('error')
      setValidationErr('Supabase غير مُعدّ بعد.')
      return
    }
    setStatus('loading')

    const code = generateReferralCode()

    // Step 1: plain insert — no .select() to avoid Prefer: return=representation
    // which requires a SELECT policy. referral_code is used from the local variable.
    const { error } = await supabase
      .from('waitlist')
      .insert([{
        email: trimmed,
        city: city || null,
        user_type: userType,
        preferred_sport: sport,
        referral_code: code,
        referred_by: referredBy || null,
      }])

    if (!error) {
      // Step 2: try to fetch position with a separate query (works if SELECT policy is active)
      let pos = null
      try {
        const { data: row } = await supabase
          .from('waitlist')
          .select('position')
          .eq('referral_code', code)
          .maybeSingle()
        pos = row?.position ?? null
      } catch (_) { /* position is optional — don't block success */ }

      setStatus('success')
      setPosition(pos)
      setReferralCode(code)   // use the locally-generated code, not a DB read-back
      setEmail('')
      return
    }

    if (error?.code === '23505') {
      setStatus('duplicate')
    } else {
      console.error('Supabase insert error:', error?.code, error?.message)
      setStatus('error')
    }
  }

  const copyLink = () => {
    const link = `${window.location.origin}/?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLink = () => {
    const link = `${window.location.origin}/?ref=${referralCode}`
    if (navigator.share) {
      navigator.share({ title: 'انضم لقرد', text: `جرب تطبيق قرد معي 🎾 سجل من هنا: ${link}`, url: link })
    } else {
      copyLink()
    }
  }

  const shareWhatsApp = () => {
    const link = `${window.location.origin}/?ref=${referralCode}`
    const text = encodeURIComponent(`جرب تطبيق قرد معي 🎾 سجل من هنا: ${link}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const selectBase = {
    background: CARD2,
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '12px 16px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
  }

  return (
    <section id="waitlist" className="py-20 sm:py-28 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.07] blur-3xl"
             style={{ background: BLUE }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center gap-3 mb-8">
            {['/photos/2.png', '/photos/7.png', '/photos/4.png'].map((p, i) => (
              <div key={i}
                   className="w-12 h-12 rounded-full overflow-hidden border-2"
                   style={{ borderColor: BLUE, marginTop: i === 1 ? 0 : 6 }}>
                <img src={p} alt="" className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            كن أول من <span style={{ color: YELLOW }}>يلعب.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            انضم لقائمة الانتظار واحصل على وصول مبكر حصري.
          </p>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div className="rounded-3xl p-8 sm:p-10 text-center animate-fade-up"
               style={{ background: CARD, border: '1px solid rgba(255,255,255,0.1)' }}>

            {/* Header */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                 style={{ background: `${GREEN}20` }}>
              <CheckCircle2 size={32} style={{ color: GREEN }} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">تم تسجيلك بنجاح 🔥</h3>
            <p className="text-gray-400 text-sm mb-8">أنت الآن ضمن قائمة الانتظار</p>

            {/* Position */}
            {position && (
              <div className="rounded-2xl py-4 px-6 mb-8 inline-flex items-center gap-3"
                   style={{ background: `${ORANGE}12`, border: `1px solid ${ORANGE}35` }}>
                <span className="text-sm text-gray-400">رقمك في القائمة:</span>
                <span className="text-2xl font-black" style={{ color: ORANGE }}>#{position}</span>
              </div>
            )}

            {/* Launch progress — controlled from admin dashboard */}
            {launchConfig.visible && (
            <div className="rounded-2xl p-5 mb-8 text-right"
                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-sm font-bold mb-3">{launchConfig.title}</p>
              <div className="relative h-2.5 rounded-full overflow-hidden mb-2"
                   style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full transition-all duration-1000"
                     style={{ width: `${launchConfig.percentage}%`, background: `linear-gradient(to left, ${ORANGE}, ${YELLOW})` }} />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{launchConfig.subtitle}</p>
                <p className="text-xs font-bold" style={{ color: YELLOW }}>{launchConfig.percentage}%</p>
              </div>
            </div>
            )}

            {/* Referral / share */}
            {referralCode && (
              <div>
                <p className="text-sm font-semibold text-white mb-1">شارك مع أصدقائك 🎾</p>
                <p className="text-xs text-gray-500 mb-4">ساعد قرد ينمو وكن جزء من المجتمع الأول</p>

                {/* Link box */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 rounded-xl py-3 px-4 text-xs text-gray-300 truncate text-left"
                       style={{ background: CARD2, border: '1px solid rgba(255,255,255,0.1)' }}
                       dir="ltr">
                    {window.location.origin}/?ref={referralCode}
                  </div>
                  <button onClick={copyLink}
                          className="shrink-0 rounded-xl p-3 transition hover:opacity-80"
                          title="نسخ الرابط"
                          style={{ background: BLUE, color: '#fff' }}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Share buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* WhatsApp */}
                  <button onClick={shareWhatsApp}
                          className="flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold transition hover:opacity-90"
                          style={{ background: '#25D366', color: '#fff' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    واتساب
                  </button>

                  {/* Native share / fallback copy */}
                  <button onClick={shareLink}
                          className="flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold transition hover:opacity-90"
                          style={{ background: ORANGE, color: '#fff' }}>
                    <Share2 size={16} />
                    مشاركة
                  </button>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-600 mt-7">بنبلغك على بريدك فور إطلاق قرد.</p>
          </div>
        ) : (
          /* Form */
          <div className="rounded-3xl p-6 sm:p-8"
               style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">البريد الإلكتروني *</label>
                <input type="email" required
                       value={email}
                       onChange={e => { setEmail(e.target.value); setValidationErr(''); setStatus('idle') }}
                       placeholder="you@email.com"
                       disabled={status === 'loading'}
                       className="w-full rounded-xl py-3 px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none transition disabled:opacity-60"
                       style={{ background: CARD2, border: `1px solid ${validationErr ? '#DC3545' : 'rgba(255,255,255,0.1)'}` }}
                       dir="ltr" />
              </div>

              {/* City + Sport row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">المدينة</label>
                  <select value={city} onChange={e => setCity(e.target.value)} style={selectBase}>
                    <option value="">اختر مدينتك</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">الرياضة المفضلة</label>
                  <select value={sport} onChange={e => setSport(e.target.value)} style={selectBase}>
                    {SPORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              {/* User type */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-3">أنت...</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'player', label: 'لاعب', icon: '🎾' },
                    { value: 'court_owner', label: 'مالك ملعب', icon: '🏟️' },
                  ].map(t => (
                    <button key={t.value} type="button"
                            onClick={() => setUserType(t.value)}
                            className="rounded-xl p-4 text-center transition-all cursor-pointer"
                            style={{
                              background: userType === t.value ? `${BLUE}15` : CARD2,
                              border: `2px solid ${userType === t.value ? BLUE : 'rgba(255,255,255,0.08)'}`,
                            }}>
                      <span className="text-2xl block mb-1">{t.icon}</span>
                      <span className="text-sm font-semibold text-white">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Referred by badge */}
              {referredBy && (
                <div className="rounded-xl py-2 px-4 text-xs text-center"
                     style={{ background: `${GREEN}10`, color: GREEN, border: `1px solid ${GREEN}30` }}>
                  تم دعوتك عبر رابط إحالة
                </div>
              )}

              {/* Submit */}
              <button type="submit"
                      disabled={status === 'loading'}
                      className="w-full rounded-xl text-base font-bold py-4 transition animate-pulse-orange flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ background: ORANGE, color: '#fff' }}>
                {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
                انضم لقائمة الانتظار
              </button>

              {/* Feedback */}
              {validationErr && (
                <p className="text-sm text-center" style={{ color: '#DC3545' }}>{validationErr}</p>
              )}
              {status === 'duplicate' && (
                <p className="text-sm text-center" style={{ color: YELLOW }}>
                  هذا البريد مسجّل مسبقاً — سنتواصل معك عند الإطلاق!
                </p>
              )}
              {status === 'error' && !validationErr && (
                <p className="text-sm text-center" style={{ color: '#DC3545' }}>
                  لم يتم التسجيل — حاول مرة ثانية أو تواصل معنا.
                </p>
              )}
            </form>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-gray-500">
          بياناتك محمية ولن نشاركها مع أي طرف ثالث.
        </p>
      </div>
    </section>
  )
}

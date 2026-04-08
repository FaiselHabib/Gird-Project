import { useState, useEffect } from 'react'
import { Check, Loader2, Copy, Share2 } from 'lucide-react'
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

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email: trimmed,
        city: city || null,
        user_type: userType,
        preferred_sport: sport,
        referral_code: code,
        referred_by: referredBy || null,
      }])
      .select('position, referral_code')
      .single()

    if (!error && data) {
      setStatus('success')
      setPosition(data.position)
      setReferralCode(data.referral_code)
      setEmail('')
      return
    }

    if (error?.code === '23505') {
      setStatus('duplicate')
    } else {
      console.error('Supabase error:', error)
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
      navigator.share({ title: 'انضم لقرد', text: 'سجّل في قرد واحصل على وصول مبكر!', url: link })
    } else {
      copyLink()
    }
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

        {/* Success state with position + referral */}
        {status === 'success' ? (
          <div className="rounded-3xl p-8 sm:p-10 text-center"
               style={{ background: CARD, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                 style={{ background: `${GREEN}20` }}>
              <Check size={30} style={{ color: GREEN }} />
            </div>
            <p className="text-xl font-bold mb-2">أنت في القائمة!</p>

            {position && (
              <div className="rounded-2xl p-5 my-6 inline-block"
                   style={{ background: `${ORANGE}10`, border: `1px solid ${ORANGE}30` }}>
                <p className="text-sm text-gray-400 mb-1">ترتيبك في قائمة الانتظار</p>
                <p className="text-4xl font-black" style={{ color: ORANGE }}>#{position}</p>
              </div>
            )}

            {referralCode && (
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-3">شارك رابطك وتقدّم في القائمة</p>
                <div className="flex items-center gap-2 max-w-sm mx-auto">
                  <div className="flex-1 rounded-xl py-3 px-4 text-xs text-gray-300 truncate"
                       style={{ background: CARD2, border: '1px solid rgba(255,255,255,0.1)' }}>
                    {window.location.origin}/?ref={referralCode}
                  </div>
                  <button onClick={copyLink}
                          className="shrink-0 rounded-xl p-3 transition hover:opacity-80"
                          style={{ background: BLUE, color: '#fff' }}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button onClick={shareLink}
                          className="shrink-0 rounded-xl p-3 transition hover:opacity-80"
                          style={{ background: ORANGE, color: '#fff' }}>
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-6">سنُعلمك بمجرد إطلاق قرد.</p>
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
                  حدث خطأ. حاول مجدداً أو تواصل معنا.
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

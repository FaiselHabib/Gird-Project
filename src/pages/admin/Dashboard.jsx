import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { BLUE, ORANGE, GREEN, YELLOW, CARD, CARD2, FONT, CITIES } from '../../lib/constants'
import {
  LogOut, Search, Users, Send, Clock,
  ChevronDown, ChevronUp, Download, RefreshCw,
  Check, AlertCircle, Loader2, Mail, Filter, MapPin, User, X,
  Trash2, BarChart2, Eye, EyeOff,
} from 'lucide-react'

/* ─── Helpers ─── */
function timeAgo(dateStr) {
  if (!dateStr) return '—'
  const diff  = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  <  1)  return 'الآن'
  if (mins  < 60)  return `منذ ${mins} د`
  if (hours < 24)  return `منذ ${hours} س`
  if (days  <  30) return `منذ ${days} يوم`
  return new Date(dateStr).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })
}

function fmtDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('ar-SA', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/* ─── Reusable styles ─── */
const cardStyle = {
  background: CARD,
  borderRadius: 20,
  border: '1px solid rgba(255,255,255,0.07)',
  padding: 24,
}

const inputBase = {
  background: CARD2,
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10,
  padding: '10px 14px',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  fontFamily: FONT,
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}

const ghostBtn = {
  background: CARD2,
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 8,
  padding: '8px 14px',
  color: '#94A3B8',
  cursor: 'pointer',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontFamily: FONT,
}

const selectStyle = {
  ...inputBase,
  appearance: 'none',
  WebkitAppearance: 'none',
  cursor: 'pointer',
  paddingLeft: 32,
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left 12px center',
}

/* ─── Stat Card ─── */
function StatCard({ label, value, sub, icon: Icon, iconColor, iconBg }) {
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: '#94A3B8' }}>{label}</span>
        <div style={{ background: iconBg, borderRadius: 10, padding: 9 }}>
          <Icon size={18} style={{ color: iconColor }} />
        </div>
      </div>
      <p style={{ fontSize: 34, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: '#555', margin: '6px 0 0 0' }}>{sub}</p>}
    </div>
  )
}

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const map = {
    sent:    { bg: `${GREEN}20`, color: GREEN,     label: 'أُرسل'  },
    partial: { bg: `${YELLOW}15`, color: YELLOW,   label: 'جزئي'  },
    failed:  { bg: 'rgba(220,53,69,0.15)', color: '#DC3545', label: 'فشل' },
  }
  const s = map[status] ?? map.sent
  return (
    <span style={{ fontSize: 11, fontWeight: 700, background: s.bg, color: s.color, borderRadius: 6, padding: '3px 8px' }}>
      {s.label}
    </span>
  )
}

/* ─── Type Badge ─── */
function TypeBadge({ type }) {
  if (type === 'court_owner') return (
    <span style={{ fontSize: 11, fontWeight: 600, background: `${ORANGE}18`, color: ORANGE, borderRadius: 6, padding: '2px 7px' }}>
      مالك ملعب
    </span>
  )
  return (
    <span style={{ fontSize: 11, fontWeight: 600, background: `${BLUE}18`, color: '#A3C6E6', borderRadius: 6, padding: '2px 7px' }}>
      لاعب
    </span>
  )
}

/* ─── Filter Pill ─── */
function FilterPill({ label, onClear }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: `${BLUE}20`, color: '#A3C6E6', borderRadius: 6,
      padding: '3px 8px', fontSize: 12, fontWeight: 600,
    }}>
      {label}
      <button onClick={onClear} style={{ background: 'none', border: 'none', color: '#A3C6E6', cursor: 'pointer', padding: 0 }}>
        <X size={12} />
      </button>
    </span>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  /* Waitlist */
  const [subscribers, setSubscribers] = useState([])
  const [totalCount, setTotalCount]   = useState(0)
  const [search, setSearch]           = useState('')
  const [sort, setSort]               = useState('newest')
  const [cityFilter, setCityFilter]   = useState('')
  const [typeFilter, setTypeFilter]   = useState('')
  const [loadingSubs, setLoadingSubs] = useState(true)

  /* Announcements */
  const [announcements, setAnnouncements] = useState([])
  const [loadingAnno, setLoadingAnno]     = useState(true)

  /* Compose form */
  const [subject, setSubject]         = useState('')
  const [body, setBody]               = useState('')
  const [sendTarget, setSendTarget]   = useState('all') // all | player | court_owner
  const [sendCity, setSendCity]       = useState('')
  const [sendStatus, setSendStatus]   = useState('idle')
  const [sendError, setSendError]     = useState('')
  const [sendResult, setSendResult]   = useState(null)

  /* Launch progress config */
  const LAUNCH_DEFAULT = { visible: true, title: '🚀 قرد قادم قريبًا', subtitle: 'نقترب من الإطلاق الرسمي', percentage: 60 }
  const [launchConfig, setLaunchConfig]       = useState(LAUNCH_DEFAULT)
  const [launchSaving, setLaunchSaving]       = useState(false)
  const [launchSaveStatus, setLaunchSaveStatus] = useState('idle') // idle | saved | error
  const [launchSaveError, setLaunchSaveError]  = useState('')

  /* Reset pre-launch data */
  const [resetPhase, setResetPhase]   = useState('idle')   // idle | confirming | resetting | done | error
  const [resetConfirm, setResetConfirm] = useState('')
  const [resetError, setResetError]   = useState('')

  const searchTimer = useRef(null)

  /* ── Get current user ── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  /* ── Fetch subscribers with filters ── */
  const fetchSubs = useCallback(async (searchVal, sortVal, cityVal, typeVal) => {
    setLoadingSubs(true)
    let q = supabase
      .from('waitlist')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: sortVal === 'oldest' })

    if (searchVal?.trim()) q = q.ilike('email', `%${searchVal.trim()}%`)
    if (cityVal) q = q.eq('city', cityVal)
    if (typeVal) q = q.eq('user_type', typeVal)

    const { data, count, error } = await q
    if (!error) {
      setSubscribers(data ?? [])
      setTotalCount(count ?? 0)
    }
    setLoadingSubs(false)
  }, [])

  /* ── Fetch announcements ── */
  const fetchAnnouncements = useCallback(async () => {
    setLoadingAnno(true)
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(30)
    if (!error) setAnnouncements(data ?? [])
    setLoadingAnno(false)
  }, [])

  /* ── Fetch + save launch config ── */
  const fetchLaunchConfig = useCallback(async () => {
    const { data } = await supabase
      .from('app_config')
      .select('is_visible, title, subtitle, progress')
      .eq('id', 1)
      .maybeSingle()
    if (data) setLaunchConfig(prev => ({
      ...prev,
      visible:    data.is_visible  ?? prev.visible,
      title:      data.title       ?? prev.title,
      subtitle:   data.subtitle    ?? prev.subtitle,
      percentage: data.progress    ?? prev.percentage,
    }))
  }, [])

  const handleSaveLaunchConfig = async () => {
    setLaunchSaving(true)
    setLaunchSaveError('')
    const { error } = await supabase.from('app_config')
      .upsert(
        {
          id:         1,
          is_visible: launchConfig.visible,
          title:      launchConfig.title,
          subtitle:   launchConfig.subtitle,
          progress:   launchConfig.percentage,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
    setLaunchSaving(false)
    if (error) {
      const msg = `[${error.code}] ${error.message}`
      console.error('app_config upsert failed:', msg)
      setLaunchSaveError(msg)
      setLaunchSaveStatus('error')
    } else {
      setLaunchSaveStatus('saved')
    }
    setTimeout(() => setLaunchSaveStatus('idle'), 3000)
  }

  /* ── Reset pre-launch data ── */
  const handleReset = async () => {
    if (resetConfirm.trim() !== 'حذف') return
    setResetPhase('resetting')
    const { error } = await supabase.rpc('reset_prelaunch_data')
    if (error) {
      console.error('reset_prelaunch_data RPC failed:', error.code, error.message)
      setResetPhase('error')
      setResetError(error.message)
    } else {
      setResetPhase('done')
      setResetConfirm('')
      setSearch('')
      setCityFilter('')
      setTypeFilter('')
      fetchSubs('', sort, '', '')
      fetchAnnouncements()
      setTimeout(() => setResetPhase('idle'), 4000)
    }
  }

  useEffect(() => { fetchSubs(search, sort, cityFilter, typeFilter) }, [sort, cityFilter, typeFilter])
  useEffect(() => { fetchAnnouncements() }, [fetchAnnouncements])
  useEffect(() => { fetchLaunchConfig() }, [fetchLaunchConfig])

  /* ── Debounced search ── */
  const handleSearchChange = (val) => {
    setSearch(val)
    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => fetchSubs(val, sort, cityFilter, typeFilter), 350)
  }

  /* ── Send announcement (with targeting) ── */
  const handleSend = async (e) => {
    e.preventDefault()
    if (!subject.trim() || !body.trim()) return
    setSendStatus('sending')
    setSendError('')
    setSendResult(null)

    try {
      let { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        const { data } = await supabase.auth.refreshSession()
        session = data?.session
      }

      console.log('TOKEN:', session?.access_token)

      if (!session?.access_token) {
        setSendStatus('error')
        setSendError('انتهت الجلسة، سجل الدخول مرة أخرى')
        setTimeout(() => navigate('/admin/login'), 1500)
        return
      }

      const target = {}
      if (sendTarget !== 'all') target.type = sendTarget
      if (sendCity) target.city = sendCity

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-announcement`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session.access_token}`,
            'x-admin-token': session.access_token,
          },
          body: JSON.stringify({
            subject: subject.trim(),
            body: body.trim(),
            target,
          }),
        }
      )

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || `HTTP ${res.status}`)

      setSendStatus('success')
      setSendResult(result)
      setSubject('')
      setBody('')
      fetchAnnouncements()
    } catch (err) {
      setSendStatus('error')
      setSendError(err.message || 'حدث خطأ أثناء الإرسال.')
    }
  }

  /* ── Export CSV (with all fields) ── */
  const handleExport = () => {
    const header = 'id,email,city,user_type,preferred_sport,referral_code,referred_by,position,created_at\n'
    const rows = subscribers.map(s =>
      `${s.id},"${s.email}","${s.city ?? ''}","${s.user_type ?? ''}","${s.preferred_sport ?? ''}","${s.referral_code ?? ''}","${s.referred_by ?? ''}","${s.position ?? ''}","${s.created_at}"`
    ).join('\n')
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `gird-waitlist-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  /* ── Sign out ── */
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  const newestSub = subscribers[0]
  const playerCount = subscribers.filter(s => s.user_type !== 'court_owner').length
  const ownerCount  = subscribers.filter(s => s.user_type === 'court_owner').length
  const hasFilters  = cityFilter || typeFilter

  /* ── Target label for send button ── */
  const getTargetLabel = () => {
    const parts = []
    if (sendTarget === 'player') parts.push('اللاعبين')
    else if (sendTarget === 'court_owner') parts.push('مالكي الملاعب')
    else parts.push('الجميع')
    if (sendCity) parts.push(`في ${sendCity}`)
    return parts.join(' ')
  }

  return (
    <div dir="rtl" style={{ background: '#191919', minHeight: '100vh', fontFamily: FONT, color: '#fff', paddingBottom: 60 }}>

      {/* ── Header ── */}
      <header style={{
        background: '#141414',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.svg" alt="قرد" style={{ width: 38, height: 38 }} />
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>لوحة التحكم</p>
              <p style={{ fontSize: 11, color: '#555', margin: 0 }}>Admin Dashboard</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {user && (
              <span style={{ fontSize: 13, color: '#555', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.email}
              </span>
            )}
            <a href="/" target="_blank" rel="noreferrer" style={{ ...ghostBtn, textDecoration: 'none', color: '#94A3B8' }}>
              الموقع ↗
            </a>
            <button onClick={handleSignOut} style={ghostBtn}>
              <LogOut size={14} />
              خروج
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

        {/* ── Stats Row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          <StatCard
            label="إجمالي المشتركين"
            value={totalCount.toLocaleString('ar-SA')}
            sub="في قائمة الانتظار"
            icon={Users} iconColor="#A3C6E6" iconBg={`${BLUE}25`}
          />
          <StatCard
            label="لاعبين"
            value={playerCount.toLocaleString('ar-SA')}
            sub={`${Math.round((playerCount / (totalCount || 1)) * 100)}% من الإجمالي`}
            icon={User} iconColor={GREEN} iconBg={`${GREEN}18`}
          />
          <StatCard
            label="مالكي ملاعب"
            value={ownerCount.toLocaleString('ar-SA')}
            sub={`${Math.round((ownerCount / (totalCount || 1)) * 100)}% من الإجمالي`}
            icon={MapPin} iconColor={ORANGE} iconBg={`${ORANGE}18`}
          />
          <StatCard
            label="إعلانات أُرسلت"
            value={announcements.length}
            sub={announcements[0] ? `آخرها: ${timeAgo(announcements[0]?.sent_at)}` : 'لم يُرسل بعد'}
            icon={Send} iconColor={ORANGE} iconBg={`${ORANGE}20`}
          />
        </div>

        {/* ── Launch Progress Control ── */}
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BarChart2 size={18} style={{ color: YELLOW }} />
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>شريط تقدم الإطلاق</h2>
                <p style={{ fontSize: 12, color: '#555', margin: '2px 0 0 0' }}>يظهر في صفحة التسجيل بعد إتمام الاشتراك</p>
              </div>
            </div>
            {/* Visibility toggle */}
            <button
              onClick={() => setLaunchConfig(c => ({ ...c, visible: !c.visible }))}
              style={{
                ...ghostBtn,
                color: launchConfig.visible ? GREEN : '#555',
                borderColor: launchConfig.visible ? `${GREEN}40` : 'rgba(255,255,255,0.08)',
              }}>
              {launchConfig.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              {launchConfig.visible ? 'ظاهر' : 'مخفي'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>العنوان</label>
              <input
                type="text"
                value={launchConfig.title}
                onChange={e => setLaunchConfig(c => ({ ...c, title: e.target.value }))}
                style={inputBase}
                maxLength={80}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>النص المساند</label>
              <input
                type="text"
                value={launchConfig.subtitle}
                onChange={e => setLaunchConfig(c => ({ ...c, subtitle: e.target.value }))}
                style={inputBase}
                maxLength={100}
              />
            </div>
          </div>

          {/* Percentage slider */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 8 }}>
              نسبة التقدم:
              <span style={{ color: YELLOW, fontWeight: 700, marginRight: 6 }}>{launchConfig.percentage}%</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <input
                type="range" min={0} max={100} step={1}
                value={launchConfig.percentage}
                onChange={e => setLaunchConfig(c => ({ ...c, percentage: Number(e.target.value) }))}
                style={{ flex: 1, accentColor: ORANGE }}
              />
              <input
                type="number" min={0} max={100}
                value={launchConfig.percentage}
                onChange={e => setLaunchConfig(c => ({ ...c, percentage: Math.min(100, Math.max(0, Number(e.target.value))) }))}
                style={{ ...inputBase, width: 68, textAlign: 'center' }}
              />
            </div>
            {/* Live preview bar */}
            <div style={{ marginTop: 10, height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99, transition: 'width 0.3s ease',
                width: `${launchConfig.percentage}%`,
                background: `linear-gradient(to left, ${ORANGE}, ${YELLOW})`,
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleSaveLaunchConfig}
              disabled={launchSaving}
              style={{
                background: BLUE, color: '#fff', border: 'none',
                borderRadius: 50, padding: '10px 24px', fontSize: 14, fontWeight: 700,
                cursor: launchSaving ? 'not-allowed' : 'pointer', opacity: launchSaving ? 0.7 : 1,
                display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT,
                transition: 'opacity 0.15s',
              }}>
              {launchSaving
                ? <><Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} />جاري الحفظ...</>
                : 'حفظ الإعدادات'}
            </button>
            {launchSaveStatus === 'saved' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: GREEN }}>
                <Check size={14} /> تم الحفظ
              </span>
            )}
            {launchSaveStatus === 'error' && (
              <span style={{ fontSize: 12, color: '#DC3545', maxWidth: 360, lineHeight: 1.4 }}>
                فشل الحفظ: {launchSaveError || 'خطأ غير معروف'}
              </span>
            )}
          </div>
        </div>

        {/* ── Waitlist Table ── */}
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>قائمة المشتركين</h2>
              <p style={{ fontSize: 13, color: '#555', margin: '4px 0 0 0' }}>
                {loadingSubs ? 'جاري التحميل...' : `${subscribers.length.toLocaleString('ar-SA')} من ${totalCount.toLocaleString('ar-SA')} مشترك${search || hasFilters ? ' — نتائج مفلترة' : ''}`}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => setSort(s => s === 'newest' ? 'oldest' : 'newest')} style={ghostBtn}>
                {sort === 'newest' ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                {sort === 'newest' ? 'الأحدث' : 'الأقدم'}
              </button>
              <button onClick={handleExport} style={ghostBtn}>
                <Download size={14} /> تصدير CSV
              </button>
              <button onClick={() => fetchSubs(search, sort, cityFilter, typeFilter)} style={{ ...ghostBtn, padding: '8px 10px' }} title="تحديث">
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <Search size={15} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#555', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="ابحث بالبريد الإلكتروني..."
                value={search}
                onChange={e => handleSearchChange(e.target.value)}
                style={{ ...inputBase, paddingRight: 40 }}
              />
            </div>
            <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} style={{ ...selectStyle, width: 160 }}>
              <option value="">كل المدن</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ ...selectStyle, width: 140 }}>
              <option value="">كل الأنواع</option>
              <option value="player">لاعب</option>
              <option value="court_owner">مالك ملعب</option>
            </select>
            {hasFilters && (
              <button onClick={() => { setCityFilter(''); setTypeFilter('') }} style={{ ...ghostBtn, color: '#DC3545', borderColor: 'rgba(220,53,69,0.3)' }}>
                <X size={14} /> مسح
              </button>
            )}
          </div>

          {/* Active filter pills */}
          {hasFilters && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              {cityFilter && <FilterPill label={`المدينة: ${cityFilter}`} onClear={() => setCityFilter('')} />}
              {typeFilter && <FilterPill label={`النوع: ${typeFilter === 'player' ? 'لاعب' : 'مالك ملعب'}`} onClear={() => setTypeFilter('')} />}
            </div>
          )}

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['#', 'البريد', 'النوع', 'المدينة', 'الرياضة', 'التسجيل'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'right', fontSize: 12, color: '#555', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loadingSubs ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 48, textAlign: 'center', color: '#555' }}>
                      <Loader2 size={22} style={{ animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                    </td>
                  </tr>
                ) : subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 48, textAlign: 'center', color: '#555' }}>
                      {search || hasFilters ? 'لا توجد نتائج مطابقة' : 'لا يوجد مشتركون بعد'}
                    </td>
                  </tr>
                ) : (
                  subscribers.map((s, i) => (
                    <tr key={s.id}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'default' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#262626')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '13px 12px', color: '#444', fontSize: 12 }}>{s.position ?? i + 1}</td>
                      <td style={{ padding: '13px 12px', color: '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: `${BLUE}30`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, fontWeight: 700, color: '#A3C6E6', flexShrink: 0,
                          }}>
                            {s.email[0].toUpperCase()}
                          </div>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>{s.email}</span>
                        </div>
                      </td>
                      <td style={{ padding: '13px 12px' }}><TypeBadge type={s.user_type} /></td>
                      <td style={{ padding: '13px 12px', color: '#94A3B8', fontSize: 13 }}>{s.city || '—'}</td>
                      <td style={{ padding: '13px 12px', color: '#94A3B8', fontSize: 13 }}>{s.preferred_sport || '—'}</td>
                      <td style={{ padding: '13px 12px', color: '#94A3B8', fontSize: 13 }}>
                        <span title={fmtDate(s.created_at)}>{timeAgo(s.created_at)}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Bottom Row: Compose + History ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* ── Announcement Composer ── */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px 0' }}>إرسال إعلان</h2>
            <p style={{ fontSize: 13, color: '#555', margin: '0 0 20px 0' }}>
              سيُرسل إلى{' '}
              <span style={{ color: ORANGE, fontWeight: 700 }}>{getTargetLabel()}</span>
            </p>

            {sendStatus === 'success' ? (
              <div style={{
                background: `${GREEN}12`, border: `1px solid ${GREEN}35`,
                borderRadius: 14, padding: 24, textAlign: 'center',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `${GREEN}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px auto',
                }}>
                  <Check size={24} style={{ color: GREEN }} />
                </div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 6px 0' }}>تم الإرسال بنجاح!</p>
                <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 12px 0' }}>
                  أُرسل إلى {(sendResult?.sent ?? 0).toLocaleString('ar-SA')} مشترك
                  {sendResult?.failed > 0 && (
                    <span style={{ color: '#DC3545' }}> — فشل {sendResult.failed}</span>
                  )}
                </p>

                {/* Per-email failure detail */}
                {sendResult?.failures?.length > 0 && (
                  <div style={{
                    background: 'rgba(220,53,69,0.07)',
                    border: '1px solid rgba(220,53,69,0.2)',
                    borderRadius: 10, padding: '12px 14px',
                    marginBottom: 16, textAlign: 'right',
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#DC3545', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                      تفاصيل الإرسال الفاشل
                    </p>
                    {sendResult.failures.map((f, i) => (
                      <div key={i} style={{
                        display: 'flex', flexDirection: 'column', gap: 2,
                        padding: '6px 0',
                        borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}>
                        <span style={{ fontSize: 12, color: '#fff', fontFamily: 'monospace', wordBreak: 'break-all' }} dir="ltr">
                          {f.email}
                        </span>
                        <span style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.4 }}>{f.reason}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={() => setSendStatus('idle')} style={{ ...ghostBtn, margin: '0 auto', justifyContent: 'center' }}>
                  إرسال إعلان آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} noValidate>
                {/* Target selectors */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>إرسال إلى</label>
                    <select value={sendTarget} onChange={e => setSendTarget(e.target.value)} style={selectStyle}>
                      <option value="all">الجميع</option>
                      <option value="player">اللاعبين فقط</option>
                      <option value="court_owner">مالكي الملاعب فقط</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>المدينة (اختياري)</label>
                    <select value={sendCity} onChange={e => setSendCity(e.target.value)} style={selectStyle}>
                      <option value="">كل المدن</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>الموضوع</label>
                  <input
                    type="text" required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="مثال: التطبيق متاح الآن!"
                    style={inputBase}
                    maxLength={150}
                  />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>
                    نص الرسالة
                    <span style={{ color: '#444', marginRight: 8, fontWeight: 400 }}>({body.length} حرف)</span>
                  </label>
                  <textarea
                    required
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    style={{ ...inputBase, resize: 'vertical', lineHeight: 1.7 }}
                  />
                </div>

                {sendStatus === 'error' && (
                  <div style={{
                    background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.3)',
                    borderRadius: 8, padding: '10px 14px', marginBottom: 14,
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                  }}>
                    <AlertCircle size={14} style={{ color: '#DC3545', flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 13, color: '#DC3545', lineHeight: 1.5 }}>{sendError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sendStatus === 'sending' || !subject.trim() || !body.trim()}
                  style={{
                    background: ORANGE, color: '#fff', border: 'none',
                    borderRadius: 50, padding: '13px 24px', fontSize: 14, fontWeight: 700,
                    cursor: (sendStatus === 'sending' || !subject.trim() || !body.trim()) ? 'not-allowed' : 'pointer',
                    opacity: (sendStatus === 'sending' || !subject.trim() || !body.trim()) ? 0.6 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontFamily: FONT, width: '100%', transition: 'opacity 0.15s',
                  }}>
                  {sendStatus === 'sending'
                    ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} />جاري الإرسال...</>
                    : <><Mail size={15} />إرسال إلى {getTargetLabel()}</>}
                </button>
              </form>
            )}
          </div>

          {/* ── Sending History ── */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>سجل الإرسال</h2>
                <p style={{ fontSize: 13, color: '#555', margin: '4px 0 0 0' }}>{announcements.length} إعلان</p>
              </div>
              <button onClick={fetchAnnouncements} style={{ ...ghostBtn, padding: '8px 10px' }} title="تحديث">
                <RefreshCw size={14} />
              </button>
            </div>

            {loadingAnno ? (
              <div style={{ textAlign: 'center', padding: 48, color: '#555' }}>
                <Loader2 size={22} style={{ animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
              </div>
            ) : announcements.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 48, color: '#555', fontSize: 14 }}>
                <Send size={28} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.3 }} />
                لم يتم إرسال أي إعلانات بعد
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 480, overflowY: 'auto', paddingLeft: 2 }}>
                {announcements.map(a => (
                  <div key={a.id} style={{ background: CARD2, borderRadius: 12, padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {a.subject}
                        </p>
                        <p style={{ fontSize: 12, color: '#555', margin: '5px 0 0 0' }}>
                          {fmtDate(a.sent_at)}
                        </p>
                        {a.body && (
                          <p style={{
                            fontSize: 12, color: '#444', margin: '6px 0 0 0',
                            overflow: 'hidden', display: '-webkit-box',
                            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                            lineHeight: 1.5,
                          }}>
                            {a.body}
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                        <StatusBadge status={a.status} />
                        <span style={{ fontSize: 12, color: '#94A3B8' }}>
                          {(a.sent_count ?? a.recipient_count).toLocaleString('ar-SA')} متلقٍّ
                        </span>
                        {a.failed_count > 0 && (
                          <span style={{ fontSize: 11, color: '#DC3545' }}>{a.failed_count} فشل</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* ── Danger Zone ── */}
        <div style={{ ...cardStyle, marginTop: 32, border: '1px solid rgba(220,53,69,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Trash2 size={16} style={{ color: '#DC3545' }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#DC3545' }}>منطقة الخطر</h2>
          </div>
          <p style={{ fontSize: 13, color: '#555', margin: '0 0 20px 0' }}>
            إعادة تعيين بيانات ما قبل الإطلاق — لا يمكن التراجع عن هذه العملية.
          </p>

          {resetPhase === 'done' ? (
            <div style={{
              background: `${GREEN}12`, border: `1px solid ${GREEN}35`,
              borderRadius: 12, padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Check size={18} style={{ color: GREEN }} />
              <span style={{ fontSize: 14, color: GREEN, fontWeight: 600 }}>
                تمت إعادة التعيين بنجاح — قائمة الانتظار فارغة الآن
              </span>
            </div>
          ) : resetPhase === 'error' ? (
            <div style={{
              background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.3)',
              borderRadius: 12, padding: '16px 20px',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <AlertCircle size={18} style={{ color: '#DC3545', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 14, color: '#DC3545', fontWeight: 700, margin: '0 0 4px 0' }}>فشل إعادة التعيين</p>
                <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 12px 0', lineHeight: 1.5, wordBreak: 'break-all' }}>{resetError}</p>
                <button onClick={() => { setResetPhase('confirming'); setResetError('') }} style={ghostBtn}>
                  حاول مجدداً
                </button>
              </div>
            </div>
          ) : (resetPhase === 'confirming' || resetPhase === 'resetting') ? (
            <div style={{ background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 14, padding: '20px' }}>
              <p style={{ fontSize: 14, color: '#fff', fontWeight: 600, margin: '0 0 6px 0' }}>
                تأكيد إعادة التعيين
              </p>
              <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 16px 0', lineHeight: 1.6 }}>
                سيتم حذف <strong style={{ color: '#fff' }}>جميع مشتركي قائمة الانتظار</strong> وسجل الإعلانات وإعادة تعيين الأرقام التسلسلية.
                اكتب <strong style={{ color: '#DC3545' }}>حذف</strong> للتأكيد:
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  type="text"
                  value={resetConfirm}
                  onChange={e => setResetConfirm(e.target.value)}
                  placeholder="اكتب: حذف"
                  style={{ ...inputBase, width: 180, borderColor: resetConfirm === 'حذف' ? '#DC3545' : 'rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
                <button
                  onClick={handleReset}
                  disabled={resetConfirm.trim() !== 'حذف' || resetPhase === 'resetting'}
                  style={{
                    background: resetConfirm.trim() === 'حذف' ? '#DC3545' : 'rgba(220,53,69,0.2)',
                    color: '#fff', border: 'none', borderRadius: 50,
                    padding: '10px 20px', fontSize: 14, fontWeight: 700,
                    cursor: resetConfirm.trim() !== 'حذف' ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT,
                    transition: 'background 0.2s',
                  }}>
                  {resetPhase === 'resetting'
                    ? <><Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} />جاري المسح...</>
                    : <><Trash2 size={14} />تأكيد المسح</>}
                </button>
                <button
                  onClick={() => { setResetPhase('idle'); setResetConfirm(''); setResetError('') }}
                  style={{ ...ghostBtn }}>
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setResetPhase('confirming')}
              style={{
                ...ghostBtn,
                color: '#DC3545',
                borderColor: 'rgba(220,53,69,0.3)',
                padding: '10px 20px',
              }}>
              <Trash2 size={14} />
              مسح بيانات ما قبل الإطلاق
            </button>
          )}

          {/* What gets reset vs preserved */}
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'rgba(220,53,69,0.05)', borderRadius: 10, padding: '12px 14px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#DC3545', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: 1 }}>سيتم مسحه</p>
              {['جميع مشتركي قائمة الانتظار', 'سجل الإعلانات المرسلة', 'رموز الإحالة والبيانات المرتبطة', 'الأرقام التسلسلية (تُعاد من 1)'].map(item => (
                <p key={item} style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#DC3545', fontWeight: 700 }}>×</span> {item}
                </p>
              ))}
            </div>
            <div style={{ background: `${GREEN}08`, borderRadius: 10, padding: '12px 14px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: GREEN, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: 1 }}>يبقى سليماً</p>
              {['حساب المدير وبيانات الدخول', 'إعدادات التطبيق (app_config)', 'كود الموقع والتصميم', 'إعدادات Edge Functions'].map(item => (
                <p key={item} style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: GREEN, fontWeight: 700 }}>✓</span> {item}
                </p>
              ))}
            </div>
          </div>
        </div>

      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

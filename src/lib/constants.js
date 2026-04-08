/* ─── Gird Brand System ─── */
export const BLUE   = '#2B2AA1'
export const ORANGE = '#FE5D02'
export const GREEN  = '#04D07E'
export const YELLOW = '#E1F096'
export const BG     = '#191919'
export const CARD   = '#1e1e1e'
export const CARD2  = '#262626'
export const FONT   = "'IBM Plex Sans Arabic', system-ui, sans-serif"

/* ─── Saudi cities ─── */
export const CITIES = [
  'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة',
  'الدمام', 'الخبر', 'الظهران', 'الأحساء', 'الطائف',
  'تبوك', 'بريدة', 'أبها', 'خميس مشيط', 'حائل', 'نجران',
]

/* ─── Sports ─── */
export const SPORTS = [
  { value: 'padel',    label: 'بادل' },
  { value: 'tennis',   label: 'تنس' },
  { value: 'football', label: 'كرة قدم' },
  { value: 'other',    label: 'أخرى' },
]

/* ─── Referral code generator ─── */
export function generateReferralCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Loader2 } from 'lucide-react'

const ORANGE = '#FE5D02'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const navigate = useNavigate()

  // If already logged in, redirect immediately
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin', { replace: true })
    })
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError('بيانات الدخول غير صحيحة. تحقق من البريد وكلمة المرور.')
      setLoading(false)
    } else {
      navigate('/admin', { replace: true })
    }
  }

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    background: '#262626',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 10,
    padding: '12px 14px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
    transition: 'border-color 0.15s',
  }

  return (
    <div
      dir="rtl"
      style={{
        background: '#191919',
        minHeight: '100vh',
        fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logo.svg" alt="قرد" style={{ width: 64, height: 64 }} />
          <p style={{ color: '#555', fontSize: 13, marginTop: 8, margin: '8px 0 0 0' }}>
            لوحة تحكم الإدارة
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#1e1e1e',
          borderRadius: 20,
          padding: '32px 28px',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 24, textAlign: 'center', margin: '0 0 28px 0' }}>
            تسجيل الدخول
          </h1>

          <form onSubmit={handleLogin} noValidate>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@gird.sa"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>
                كلمة المرور
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(220,53,69,0.1)',
                border: '1px solid rgba(220,53,69,0.3)',
                borderRadius: 8,
                padding: '10px 14px',
                marginBottom: 16,
                fontSize: 13,
                color: '#DC3545',
                textAlign: 'center',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: ORANGE,
                color: '#fff',
                border: 'none',
                borderRadius: 50,
                padding: '13px 0',
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'opacity 0.15s',
              }}
            >
              {loading && <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} />}
              {loading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Spinner() {
  return (
    <div style={{ background: '#191919', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 36, height: 36,
        border: '3px solid #262626',
        borderTopColor: '#FE5D02',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function ProtectedRoute({ children }) {
  // undefined = still checking, null = no session, object = has session
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return <Spinner />
  if (!session) return <Navigate to="/admin/login" replace />
  return children
}

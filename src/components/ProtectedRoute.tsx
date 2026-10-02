import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Navigate, Outlet } from 'react-router'
import { supabase } from '@/lib/supabase'

// undefined = still resolving the stored session, null = signed out
export default function ProtectedRoute() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    // Emits the stored session immediately, then every sign-in, sign-out and token refresh
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  if (session === undefined) return null
  if (session === null) return <Navigate to="/signin" replace />
  return <Outlet />
}

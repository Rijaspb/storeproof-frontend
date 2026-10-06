import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { supabase } from '@/lib/supabase'

// undefined = still resolving the stored session, null = signed out
export default function ProtectedRoute() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const location = useLocation()

  useEffect(() => {
    // Emits the stored session immediately, then every sign-in, sign-out and token refresh
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  if (session === undefined)
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" aria-label="Loading" />
      </div>
    )
  if (session === null) return <Navigate to="/signin" replace state={{ from: location }} />
  return <Outlet />
}

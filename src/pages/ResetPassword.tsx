import { useEffect, useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Loader2 } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

const inputClass =
  'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

const MIN_PASSWORD = 8

// The recovery link signs the user in via the URL; supabase-js picks that session up on load
export default function ResetPassword() {
  const navigate = useNavigate()
  const [ready, setReady] = useState<boolean | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // No session means the link was missing, expired or already used
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1))
    if (params.get('error')) {
      setReady(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session))
  }, [])

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = String(form.get('password'))
    setError('')
    if (password !== String(form.get('confirm'))) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-14 sm:pt-16">
        <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-tight">Choose a new password</h1>

          {ready === null && (
            <Loader2 className="mt-8 size-5 animate-spin text-muted-foreground" />
          )}

          {ready === false && (
            <div className="mt-8 space-y-4">
              <p className="text-sm text-muted-foreground">
                This reset link is invalid or has expired.
              </p>
              <Link to="/forgot-password" className="text-sm underline">
                Request a new link
              </Link>
            </div>
          )}

          {ready && (
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <label className="block text-sm font-medium">
                New password
                <input
                  name="password"
                  type="password"
                  required
                  minLength={MIN_PASSWORD}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </label>

              <label className="block text-sm font-medium">
                Confirm password
                <input
                  name="confirm"
                  type="password"
                  required
                  minLength={MIN_PASSWORD}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </label>

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Saving…' : 'Update password'}
              </Button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
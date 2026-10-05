import { useState, type SubmitEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

const inputClass =
  'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

export default function Signin() {
  const navigate = useNavigate()
  const from = useLocation().state?.from?.pathname ?? '/dashboard'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: String(form.get('email')).trim(),
        password: String(form.get('password')),
      })
      if (error) throw error
      navigate(from, { replace: true })
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
          <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-medium">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium">
              Password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </label>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            <Link to="/forgot-password" className="underline">
              Forgot password?
            </Link>
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            No account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

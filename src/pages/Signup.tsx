import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

const inputClass =
  'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

const MIN_PASSWORD = 8
const strengthLabels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']

function passwordStrength(pw: string) {
  if (pw.length < MIN_PASSWORD) return 0
  const checks = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/]
  const score = checks.filter((re) => re.test(pw)).length
  return pw.length >= 12 ? Math.min(score + 1, 4) : Math.min(score, 3)
}

export default function Signup() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)
  const strength = passwordStrength(password)

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setError('')
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: String(form.get('email')).trim(),
        password,
        options: {
          data: {
            full_name: String(form.get('fullName')).trim(),
            business_name: String(form.get('businessName')).trim() || undefined,
          },
        },
      })
      if (error) throw error
      if (data.session) navigate('/dashboard')
      else setNotice('Check your email to confirm your account, then sign in.')
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
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-medium">
              Full name
              <input name="fullName" required autoComplete="name" className={inputClass} />
            </label>

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

            <div>
              <label className="block text-sm font-medium">
                Password
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={MIN_PASSWORD}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-16`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-3 mt-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
              {password && (
                <p className="mt-1.5 text-xs text-muted-foreground" aria-live="polite">
                  Strength: {strengthLabels[strength]}
                </p>
              )}
            </div>

            <label className="block text-sm font-medium">
              Store or business name <span className="text-muted-foreground">(optional)</span>
              <input name="businessName" autoComplete="organization" className={inputClass} />
            </label>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              <span>
                I accept the <Link to="/terms" className="underline">Terms</Link> and{' '}
                <Link to="/privacy" className="underline">Privacy Policy</Link>
              </span>
            </label>

            {notice && (
              <p role="status" className="text-sm text-muted-foreground">
                {notice}
              </p>
            )}

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading || !!notice}>
              {loading ? 'Creating account…' : 'Sign up'}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { useState, type SubmitEvent } from 'react'
import { Link } from 'react-router'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

const inputClass =
  'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

export default function ForgotPassword() {
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        String(form.get('email')).trim(),
        { redirectTo: `${window.location.origin}/reset-password` },
      )
      if (error) throw error
      setNotice('If an account exists for that email, a reset link is on its way.')
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
          <h1 className="text-3xl font-semibold tracking-tight">Reset your password</h1>

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
              {loading ? 'Sending…' : 'Send reset link'}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            <Link to="/signin" className="underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

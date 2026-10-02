import { useState, type FormEvent } from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { post } from '@/lib/api'

const inputClass =
  'mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

const details = [
  { label: 'Email', value: 'rijaspb@gmail.com', href: 'mailto:rijaspb@gmail.com' },
  { label: 'Phone', value: '+44 7909 506687', href: 'tel:+447909506687' },
  { label: 'Location', value: 'Glasgow, Scotland' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setError('')
    setLoading(true)
    try {
      await post('/contact', {
        name: String(form.get('name')).trim(),
        email: String(form.get('email')).trim(),
        message: String(form.get('message')).trim(),
        website: String(form.get('website')),
      })
      setSent(true)
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
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Contact us
          </h1>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {details.map((d) => (
              <div key={d.label} className="rounded-lg border border-border p-4">
                <dt className="text-sm text-muted-foreground">{d.label}</dt>
                <dd className="mt-1 break-words font-medium">
                  {d.href ? (
                    <a href={d.href} className="hover:underline">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {sent ? (
            <p className="mt-10 rounded-lg border border-border p-4">
              Thanks, your message has been sent.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 space-y-5">
              <label className="block text-sm font-medium">
                Name
                <input name="name" required autoComplete="name" className={inputClass} />
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
              <label className="block text-sm font-medium">
                Message
                <textarea name="message" required rows={6} className={inputClass} />
              </label>
              {/* Honeypot: hidden from people, filled in by bots */}
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

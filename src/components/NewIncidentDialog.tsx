import { useState, type FormEvent } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { Button } from '@/components/ui/button'

export interface NewIncidentValues {
  /** Value from a datetime-local input, e.g. "2026-10-01T14:30" */
  incident_at: string
  person_details: string
  incident_details: string
  notes: string
}

interface NewIncidentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: NewIncidentValues) => Promise<void> | void
}

const inputClass =
  'mt-1.5 block w-full min-w-0 max-w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none sm:text-sm focus-visible:ring-2 focus-visible:ring-ring'

/** Current local time in datetime-local format, e.g. "2026-10-01T14:30" */
const nowLocal = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)

export default function NewIncidentDialog({
  open,
  onOpenChange,
  onSubmit,
}: NewIncidentDialogProps) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOpenChange = (next: boolean) => {
    if (loading) return
    if (!next) setError('')
    onOpenChange(next)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setError('')
    setLoading(true)
    try {
      await onSubmit({
        incident_at: new Date(String(form.get('incident_at'))).toISOString(),
        person_details: String(form.get('person_details')).trim(),
        incident_details: String(form.get('incident_details')).trim(),
        notes: String(form.get('notes')).trim(),
      })
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-background p-4 shadow-lg sm:p-6">
          <Dialog.Title className="text-lg font-semibold">
            New incident
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted-foreground">
            Record when it happened and add any notes.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <label className="block text-sm font-medium">
              Incident date/time
              <input
                name="incident_at"
                type="datetime-local"
                required
                max={nowLocal()}
                onChange={(e) => {
                  const now = nowLocal()
                  if (e.target.value > now) e.target.value = now
                }}
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium">
              Person details
              <textarea
                name="person_details"
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </label>

            <label className="block text-sm font-medium">
              Incident details
              <textarea
                name="incident_details"
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </label>

            <label className="block text-sm font-medium">
              Notes
              <textarea
                name="notes"
                rows={4}
                className={`${inputClass} resize-y`}
              />
            </label>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={loading}
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? 'Saving…' : 'Submit'}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

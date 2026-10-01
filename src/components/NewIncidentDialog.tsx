import { useState, type FormEvent } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { Button } from '@/components/ui/button'

export interface NewIncidentValues {
  /** Value from a datetime-local input, e.g. "2026-10-01T14:30" */
  incidentAt: string
  notes: string
}

interface NewIncidentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: NewIncidentValues) => Promise<void> | void
}

const inputClass =
  'mt-1.5 block w-full min-w-0 max-w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none sm:text-sm focus-visible:ring-2 focus-visible:ring-ring'

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
        incidentAt: String(form.get('incidentAt')),
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
                name="incidentAt"
                type="datetime-local"
                required
                className={inputClass}
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

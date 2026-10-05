import { useEffect, useState } from 'react'
import { ApiError, get, post } from '@/lib/api'
import type { Incident } from '@/types/incident'
import DashboardNavbar from '@/components/DashboardNavbar'
import ErrorMessage from '@/components/ErrorMessage'
import IncidentsTable from '@/components/IncidentsTable'
import NewIncidentDialog, {
  type NewIncidentValues,
} from '@/components/NewIncidentDialog'

function Dashboard() {
  const [formOpen, setFormOpen] = useState(false)

  const [incidents, setIncidents] = useState<Incident[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await get('/incidents')
        setIncidents(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(
          e instanceof ApiError ? e.message : 'Could not load incidents. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadIncidents()
  }, [])

  const createIncident = async (values: NewIncidentValues) => {
    const row = await post('/incidents', values)
    setIncidents((prev) => [row, ...prev])
  }

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <DashboardNavbar onNewForm={() => setFormOpen(true)} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-20 sm:px-6 sm:pt-24">
        <h1 className="mb-6 text-2xl font-semibold">Incidents</h1>
        {error && <ErrorMessage message={error} />}
        <IncidentsTable incidents={incidents} loading={loading} failed={!!error} />
      </main>
      <NewIncidentDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={createIncident}
      />
    </div>
  )
}

export default Dashboard

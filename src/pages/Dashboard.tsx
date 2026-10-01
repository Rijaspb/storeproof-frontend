import { useState } from 'react'
import DashboardNavbar from '@/components/DashboardNavbar'
import IncidentsTable from '@/components/IncidentsTable'
import NewIncidentDialog, {
  type NewIncidentValues,
} from '@/components/NewIncidentDialog'

function Dashboard() {
  const [formOpen, setFormOpen] = useState(false)

  // TODO: send to the backend once the destination is decided
  const createIncident = async (values: NewIncidentValues) => {
    console.log('New incident', values)
  }

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <DashboardNavbar onNewForm={() => setFormOpen(true)} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-20 sm:px-6 sm:pt-24">
        <h1 className="mb-6 text-2xl font-semibold">Incidents</h1>
        <IncidentsTable />
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

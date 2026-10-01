import type { ReactNode } from 'react'
import type { Incident } from '@/types/incident'

interface Column {
  key: string
  header: string
  render: (incident: Incident) => ReactNode
}

const formatDateTime = (iso: string) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString()
}

const columns: Column[] = [
  { key: 'id', header: 'Incident ID', render: (i) => i.id },
  {
    key: 'incidentAt',
    header: 'Incident date/time',
    render: (i) => formatDateTime(i.incidentAt),
  },
  {
    key: 'status',
    header: 'Status',
    render: (i) => <span className="capitalize">{i.status}</span>,
  },
  {
    key: 'createdAt',
    header: 'Created at',
    render: (i) => formatDateTime(i.createdAt),
  },
]

interface IncidentsTableProps {
  incidents?: Incident[]
}

export default function IncidentsTable({ incidents = [] }: IncidentsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="border-b border-border bg-muted/50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className="whitespace-nowrap px-3 py-3 font-medium text-muted-foreground sm:px-4"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incidents.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-muted-foreground"
              >
                No incidents yet.
              </td>
            </tr>
          ) : (
            incidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-b border-border last:border-0"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="whitespace-nowrap px-3 py-3 sm:px-4"
                  >
                    {c.render(incident)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

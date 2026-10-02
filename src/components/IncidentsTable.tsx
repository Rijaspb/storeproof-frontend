import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router'
import { formatDateTime, formatStatus } from '@/lib/format'
import type { Incident } from '@/types/incident'

interface Column {
  key: string
  header: string
  render: (incident: Incident) => ReactNode
}

const columns: Column[] = [
  {
    key: 'incident_number',
    header: 'Incident #',
    // Stretched link: the ::after overlay makes the whole row clickable
    render: (i) => (
      <Link
        to={`/dashboard/incidents/${encodeURIComponent(i.id)}`}
        className="font-medium after:absolute after:inset-0"
      >
        {i.incident_number}
      </Link>
    ),
  },
  {
    key: 'incident_at',
    header: 'Date/time',
    render: (i) => formatDateTime(i.incident_at),
  },
  {
    key: 'status',
    header: 'Status',
    render: (i) => <span className="capitalize">{formatStatus(i.status)}</span>,
  },
  {
    key: 'created_at',
    header: 'Created',
    render: (i) => formatDateTime(i.created_at),
  },
]

interface IncidentsTableProps {
  incidents?: Incident[]
  loading?: boolean
  /** Loading failed: the error is shown elsewhere, so skip the empty message */
  failed?: boolean
}

export default function IncidentsTable({
  incidents = [],
  loading = false,
  failed = false,
}: IncidentsTableProps) {
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
          {loading || incidents.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-muted-foreground"
              >
                {loading ? (
                  <span
                    role="status"
                    className="inline-flex items-center gap-2"
                  >
                    <Loader2 className="size-4 animate-spin" /> Loading incidents…
                  </span>
                ) : failed ? (
                  'Could not load incidents.'
                ) : (
                  'No incidents yet.'
                )}
              </td>
            </tr>
          ) : (
            incidents.map((incident) => (
              <tr
                key={incident.id}
                className="relative border-b border-border last:border-0 hover:bg-muted/50"
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

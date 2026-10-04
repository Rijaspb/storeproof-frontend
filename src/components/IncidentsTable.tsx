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
    <div className="overflow-x-auto sm:rounded-lg sm:border sm:border-border">
      <table className="block w-full text-left text-sm sm:table sm:min-w-140">
        {/* On mobile the heading row only shows when there are no cards */}
        <thead
          className={`border-b border-border bg-foreground text-background ${
            loading || incidents.length === 0
              ? 'block rounded-lg sm:table-header-group'
              : 'hidden sm:table-header-group'
          }`}
        >
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className="px-3 py-3 font-medium max-sm:inline-block sm:whitespace-nowrap sm:px-4"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block sm:table-row-group">
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
                className="relative mb-2 block rounded-lg border border-border p-1 hover:bg-muted/50 sm:mb-0 sm:table-row sm:rounded-none sm:border-0 sm:border-b sm:p-0 sm:last:border-0"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="flex gap-3 px-3 py-1.5 sm:table-cell sm:whitespace-nowrap sm:px-4 sm:py-3"
                  >
                    <span className="w-24 shrink-0 text-muted-foreground sm:hidden">
                      {c.header}
                    </span>
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

export type IncidentStatus = 'open' | 'investigating' | 'resolved'

export interface Incident {
  id: string
  /** ISO 8601 timestamp */
  incidentAt: string
  status: IncidentStatus
  /** ISO 8601 timestamp */
  createdAt: string
}

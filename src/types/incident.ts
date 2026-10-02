export const INCIDENT_STATUSES = [
  'pending',
  'processing',
  'ready_to_upload',
  'uploaded_to_police',
  'ongoing_investigation',
  'finished',
  'failed',
] as const

export type IncidentStatus = (typeof INCIDENT_STATUSES)[number]

export interface Incident {
  id: string
  incident_number: string
  /** ISO 8601 timestamp */
  incident_at: string
  status: IncidentStatus
  /** ISO 8601 timestamp */
  created_at: string
}

export interface IncidentVideo {
  id: string
  r2_key: string
  created_at: string
}

export interface IncidentDetails extends Incident {
  person_details: string | null
  incident_details: string | null
  police_link: string | null
  notes: string | null
  videos: IncidentVideo[]
}

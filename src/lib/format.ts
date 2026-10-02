export const formatDateTime = (iso: string) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString()
}

export const formatStatus = (status: string) => status.replace(/_/g, ' ')

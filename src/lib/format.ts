export const formatDateTime = (iso: string) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString('en-GB')
}

export const formatBytes = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(i && bytes < 10 ? 1 : 0)} ${units[i]}`
}

export const formatStatus = (status: string) => status.replace(/_/g, ' ')

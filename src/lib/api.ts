const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function post(path: string, body: unknown) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message ?? 'Something went wrong')
  return data
}

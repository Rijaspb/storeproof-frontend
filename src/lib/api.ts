import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request(method: string, path: string, body?: unknown) {
  const { data: { session } } = await supabase.auth.getSession()
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(session && { Authorization: `Bearer ${session.access_token}` }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  // Expired or revoked session: clear it locally; ProtectedRoute then redirects to /signin
  if (res.status === 401 && session) await supabase.auth.signOut({ scope: 'local' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data.error ?? 'Something went wrong', res.status)
  return data
}

export const get = (path: string) => request('GET', path)
export const patch = (path: string, body: unknown) => request('PATCH', path, body)
export const post =(path: string, body: unknown) => request('POST', path, body)

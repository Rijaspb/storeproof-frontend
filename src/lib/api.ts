import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

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
  if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
  return data
}

export const get = (path: string) => request('GET', path)
export const patch = (path: string, body: unknown) => request('PATCH', path, body)
export const post =(path: string, body: unknown) => request('POST', path, body)

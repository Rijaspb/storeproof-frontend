import { ApiError, get, post } from './api'
import type { IncidentVideo } from '@/types/incident'

export const MAX_UPLOAD_BYTES = 10 * 1024 ** 3 // keep in sync with the backend limit

// Must match the backend allow-list; the extension is only used when the browser gives no type
const TYPE_BY_EXT: Record<string, string> = {
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  mkv: 'video/x-matroska',
  webm: 'video/webm',
}
export const ACCEPT = '.mp4,.mov,.mkv,.webm,' + Object.values(TYPE_BY_EXT).join(',')

const PARTS_PER_BATCH = 4 // parts uploaded in parallel
const MAX_ATTEMPTS = 3

/** The content type to upload with, or null if the file is not an allowed video */
export function videoContentType(file: File) {
  const type = file.type || TYPE_BY_EXT[file.name.split('.').pop()?.toLowerCase() ?? '']
  return type && Object.values(TYPE_BY_EXT).includes(type) ? type : null
}

export const isAbort = (e: unknown) => e instanceof DOMException && e.name === 'AbortError'

// PUT with upload progress (fetch can't report it). Resolves with the ETag header, if exposed by CORS
function put(
  url: string,
  body: Blob,
  contentType: string | undefined,
  onProgress: (loaded: number) => void,
  signal: AbortSignal,
) {
  return new Promise<string | null>((resolve, reject) => {
    signal.throwIfAborted()
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url)
    if (contentType) xhr.setRequestHeader('Content-Type', contentType)
    xhr.upload.onprogress = (e) => onProgress(e.loaded)
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve(xhr.getResponseHeader('ETag'))
        : reject(new ApiError(`Upload failed (${xhr.status})`, xhr.status))
    xhr.onerror = () => reject(new Error('Network error during upload'))
    xhr.onabort = () => reject(new DOMException('Aborted', 'AbortError'))
    signal.addEventListener('abort', () => xhr.abort(), { once: true })
    xhr.send(body)
  })
}

// 4xx errors (expired URL, conflict) won't fix themselves, except rate limiting
const retryable = (e: unknown) => !(e instanceof ApiError && e.status < 500 && e.status !== 429)

async function withRetry<T>(fn: () => Promise<T>, signal: AbortSignal) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn()
    } catch (e) {
      if (signal.aborted || attempt >= MAX_ATTEMPTS || !retryable(e)) throw e
      await new Promise((r) => setTimeout(r, 1000 * 2 ** (attempt - 1)))
    }
  }
}

/** Uploads one video straight to R2 and returns the saved footage record. Throws AbortError if cancelled */
export async function uploadFootage(
  incidentId: string,
  file: File,
  onProgress: (fraction: number) => void,
  outer: AbortSignal,
): Promise<IncidentVideo> {
  const contentType = videoContentType(file)
  if (!contentType) throw new Error('Only MP4, MOV, MKV and WebM videos are allowed')
  if (file.size < 1 || file.size > MAX_UPLOAD_BYTES) throw new Error('Videos must be between 1 byte and 10 GB')

  // Aborting this stops every in-flight part when one of them fails for good
  const stop = new AbortController()
  outer.addEventListener('abort', () => stop.abort(), { once: true })
  const { signal } = stop
  const base = `/incidents/${encodeURIComponent(incidentId)}/footage`

  try {
    signal.throwIfAborted()
    const init = await post(`${base}/init`, { filename: file.name, contentType, sizeBytes: file.size })
    let completeBody: object = {}

    if (!init.multipart) {
      await withRetry(
        () => put(init.uploadUrl, file, contentType, (l) => onProgress(l / file.size), signal),
        signal,
      )
    } else {
      const { partSize, partCount } = init as { partSize: number; partCount: number }
      const loaded = new Array<number>(partCount).fill(0)
      const etags = new Array<string>(partCount)
      const report = () => onProgress(Math.min(loaded.reduce((a, b) => a + b, 0) / file.size, 1))

      for (let first = 1; first <= partCount; first += PARTS_PER_BATCH) {
        const partNumbers = Array.from(
          { length: Math.min(PARTS_PER_BATCH, partCount - first + 1) },
          (_, i) => first + i,
        )
        // URLs are requested per batch so they never expire while waiting in a long queue
        const { parts } = (await withRetry(
          () => post(`${base}/${init.footageId}/parts`, { partNumbers }),
          signal,
        )) as {
          parts: { partNumber: number; url: string }[]
        }
        await Promise.all(
          parts.map(({ partNumber, url }) =>
            withRetry(async () => {
              const blob = file.slice((partNumber - 1) * partSize, partNumber * partSize)
              loaded[partNumber - 1] = 0
              const etag = await put(
                url,
                blob,
                undefined,
                (l) => {
                  loaded[partNumber - 1] = l
                  report()
                },
                signal,
              )
              if (!etag) throw new Error('Upload could not be verified. Check the bucket CORS settings.')
              loaded[partNumber - 1] = blob.size
              report()
              etags[partNumber - 1] = etag
            }, signal),
          ),
        )
      }
      completeBody = { parts: etags.map((etag, i) => ({ partNumber: i + 1, etag })) }
    }

    return await withRetry(() => post(`${base}/${init.footageId}/complete`, completeBody), signal)
  } catch (e) {
    stop.abort()
    throw e
  }
}

/** Sends the browser to a short-lived download link; the server marks it as an attachment */
export async function downloadFootage(incidentId: string, footageId: string) {
  const { url } = await get(
    `/incidents/${encodeURIComponent(incidentId)}/footage/${encodeURIComponent(footageId)}/url`,
  )
  window.location.assign(url)
}

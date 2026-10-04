import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Upload, X } from "lucide-react";
import ErrorMessage from "@/components/ErrorMessage";
import { formatBytes, formatDateTime } from "@/lib/format";
import {
  ACCEPT,
  MAX_UPLOAD_BYTES,
  downloadFootage,
  isAbort,
  uploadFootage,
  videoContentType,
} from "@/lib/uploadFootage";
import type { IncidentVideo } from "@/types/incident";

interface QueueItem {
  key: string;
  name: string;
  size: number;
  progress: number;
  state: "queued" | "uploading" | "error";
  error?: string;
}

interface Props {
  incidentId: string;
  videos: IncidentVideo[];
  /** Uploading is only possible while the incident is pending */
  canUpload: boolean;
  onAdded: (video: IncidentVideo) => void;
}

function Footage({ incidentId, videos, canUpload, onAdded }: Props) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);

  const busy = queue.some((q) => q.state !== "error");

  useEffect(() => () => controller.current?.abort(), []);

  // Leaving the page mid-upload would lose it
  useEffect(() => {
    if (!busy) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [busy]);

  const update = (key: string, patch: Partial<QueueItem>) =>
    setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, ...patch } : q)));

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    const ctrl = new AbortController();
    controller.current = ctrl;
    setError("");
    const batch = files.map((file) => {
      const tooBig = file.size < 1 || file.size > MAX_UPLOAD_BYTES;
      const badType = !videoContentType(file);
      return {
        file,
        item: {
          key: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          progress: 0,
          state: tooBig || badType ? "error" : "queued",
          error: badType
            ? "Only MP4, MOV, MKV and WebM videos are allowed"
            : tooBig
              ? "Videos must be between 1 byte and 10 GB"
              : undefined,
        } as QueueItem,
      };
    });
    setQueue(batch.map((b) => b.item));

    // One file at a time keeps bandwidth for the file in progress
    for (const { file, item } of batch) {
      if (item.state === "error") continue;
      if (ctrl.signal.aborted) {
        update(item.key, { state: "error", error: "Cancelled" });
        continue;
      }
      update(item.key, { state: "uploading" });
      try {
        const video = await uploadFootage(
          incidentId,
          file,
          (progress) => update(item.key, { progress }),
          ctrl.signal,
        );
        onAdded(video);
        setQueue((prev) => prev.filter((q) => q.key !== item.key));
      } catch (err) {
        update(item.key, {
          state: "error",
          error: isAbort(err) ? "Cancelled" : (err as Error).message,
        });
      }
    }
  };

  const download = async (id: string) => {
    setDownloading(id);
    setError("");
    try {
      await downloadFootage(incidentId, id);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="space-y-3">
      {error && <ErrorMessage message={error} />}

      {canUpload ? (
        <div className="flex flex-wrap items-center gap-3">
          <label
            className={`inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background ${
              busy ? "pointer-events-none opacity-50" : "cursor-pointer"
            }`}
          >
            <Upload className="size-4" /> Upload videos
            <input
              type="file"
              multiple
              accept={ACCEPT}
              disabled={busy}
              onChange={onPick}
              className="sr-only"
            />
          </label>
          <span className="text-xs text-muted-foreground">MP4, MOV, MKV or WebM, up to 10 GB each</span>
          {busy && (
            <button
              type="button"
              onClick={() => controller.current?.abort()}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" /> Cancel
            </button>
          )}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Footage can only be added while the incident is pending.</p>
      )}

      {queue.length > 0 && (
        <ul className="space-y-2">
          {queue.map((q) => (
            <li key={q.key} className="rounded-lg border border-border p-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="min-w-0 break-all font-medium">{q.name}</span>
                <span className="shrink-0 text-muted-foreground">
                  {q.state === "uploading" ? `${Math.round(q.progress * 100)}%` : q.state === "queued" ? "Waiting" : ""}
                </span>
              </div>
              {q.state === "error" ? (
                <p role="alert" className="mt-1 text-destructive">
                  {q.error}
                </p>
              ) : (
                <progress value={q.progress} max={1} className="mt-1 h-1.5 w-full" />
              )}
            </li>
          ))}
        </ul>
      )}

      {videos.length ? (
        <ul className="divide-y divide-border">
          {videos.map((v, i) => (
            <li key={v.id} className="flex items-center justify-between gap-3 py-2 text-sm">
              <div className="min-w-0">
                <p className="break-all font-medium">{v.original_filename ?? `Video ${i + 1}`}</p>
                <p className="text-muted-foreground">
                  {v.size_bytes != null && `${formatBytes(v.size_bytes)} · `}
                  {formatDateTime(v.created_at)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => download(v.id)}
                disabled={downloading === v.id}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-medium disabled:opacity-50"
              >
                {downloading === v.id ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
                Download
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No videos yet</p>
      )}
    </div>
  );
}

export default Footage;

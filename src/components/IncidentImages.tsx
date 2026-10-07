import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import ErrorMessage from "@/components/ErrorMessage";
import { ApiError, get, post } from "@/lib/api";

const SLOTS = [1, 2] as const;
const MAX_BYTES = 20 * 1024 ** 2; // keep in sync with the backend limit
const TYPES = ["image/jpeg", "image/png", "image/webp"]; // must match the backend allow-list

interface Props {
  incidentId: string;
  /** Uploading is only possible while the incident is pending */
  canUpload: boolean;
}

function IncidentImages({ incidentId, canUpload }: Props) {
  const base = `/incidents/${encodeURIComponent(incidentId)}/images`;
  const [urls, setUrls] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState("");
  const refreshed = useRef(new Set<number>()); // slots whose link was renewed since the image last loaded

  const loadUrl = async (slot: number) => {
    const { url } = await get(`${base}/${slot}/url`);
    setUrls((prev) => ({ ...prev, [slot]: url }));
  };

  useEffect(() => {
    let cancelled = false;
    setUrls({});
    setError("");
    refreshed.current.clear();
    get(base)
      .then(({ items }: { items: { slot: number; status: string }[] }) =>
        Promise.all(
          items
            .filter((i) => i.status === "uploaded")
            .map((i) =>
              get(`${base}/${i.slot}/url`).then(({ url }) => !cancelled && setUrls((p) => ({ ...p, [i.slot]: url }))),
            ),
        ),
      )
      .catch(() => !cancelled && setError("Could not load images. Refresh the page to try again."));
    return () => {
      cancelled = true;
    };
  }, [base]);

  const onPick = async (slot: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    if (!TYPES.includes(file.type)) return setError("Only JPEG, PNG and WebP images are allowed");
    if (file.size < 1 || file.size > MAX_BYTES) return setError("Images must be 20 MB or smaller and not empty");

    setBusy(slot);
    try {
      const { uploadUrl } = await post(`${base}/${slot}/init`, {
        filename: file.name,
        contentType: file.type,
        sizeBytes: file.size,
      });
      const res = await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      await post(`${base}/${slot}/complete`, {});
      refreshed.current.delete(slot);
      await loadUrl(slot).catch(() =>
        setError("Image saved, but it couldn't be displayed. Refresh the page to see it."),
      );
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Image upload failed. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-3">
      {error && <ErrorMessage message={error} />}
      {SLOTS.map((slot) => (
        <div key={slot} className="space-y-2">
          {urls[slot] ? (
            <img
              src={urls[slot]}
              alt={`Incident image ${slot}`}
              onLoad={() => refreshed.current.delete(slot)}
              onError={() => {
                // Links expire; renew once per failure, so a genuinely missing image cannot loop
                if (refreshed.current.has(slot)) return;
                refreshed.current.add(slot);
                loadUrl(slot).catch(() => setError("Could not load an image. Refresh the page to try again."));
              }}
              className="max-h-80 w-full rounded-lg border border-border object-contain"
            />
          ) : (
            <p className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
              No image {slot}
            </p>
          )}
          {canUpload && (
            <label
              className={`inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium ${
                busy !== null ? "pointer-events-none opacity-50" : "cursor-pointer"
              }`}
            >
              {busy === slot ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
              {urls[slot] ? "Replace" : "Upload"} image {slot}
              <input
                type="file"
                accept={TYPES.join(",")}
                disabled={busy !== null}
                onChange={(e) => onPick(slot, e)}
                className="sr-only"
              />
            </label>
          )}
        </div>
      ))}
    </div>
  );
}

export default IncidentImages;

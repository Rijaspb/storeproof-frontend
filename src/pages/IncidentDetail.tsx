import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  Hash,
  Link2,
  Loader2,
  NotebookPen,
  Save,
  User,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Link, useParams } from "react-router";
import DashboardNavbar from "@/components/DashboardNavbar";
import ErrorMessage from "@/components/ErrorMessage";
import Footage from "@/components/Footage";
import { ApiError, get, patch } from "@/lib/api";
import { formatDateTime, formatStatus } from "@/lib/format";
import { INCIDENT_STATUSES, type IncidentDetails } from "@/types/incident";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <h2 className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Icon className="size-4" /> {title}
      </h2>
      {children}
    </section>
  );
}

const isSafeUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const Text = ({ value }: { value: string | null }) =>
  value ? (
    <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed">
      {value}
    </p>
  ) : (
    <p className="text-sm text-muted-foreground">Not provided</p>
  );

function IncidentDetail() {
  const { id } = useParams();
  const [incident, setIncident] = useState<IncidentDetails | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    get(`/incidents/${encodeURIComponent(id)}`)
      .then(setIncident)
      .catch((e) =>
        setError(
          e instanceof ApiError
            ? e.message
            : "Could not load this incident. Please try again.",
        ),
      );
  }, [id]);

  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(
    () => setLink(incident?.police_link ?? ""),
    [incident?.police_link],
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);

  const save = async (path: string, body: object) => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const updated = await patch(
        `/incidents/${encodeURIComponent(id!)}/${path}`,
        body,
      );
      setIncident((prev) => prev && { ...prev, ...updated });
      setSaved(true);
    } catch (e) {
      setError(
        e instanceof ApiError
          ? e.message
          : "Could not save your changes. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const meta: [LucideIcon, string, string][] = incident
    ? [
        [Calendar, "Incident date/time", formatDateTime(incident.incident_at)],
        [Clock, "Created", formatDateTime(incident.created_at)],
        [Hash, "Reference ID", incident.id],
      ]
    : [];

  return (
    <>
      <DashboardNavbar />
      <main className="mx-auto w-full max-w-5xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20">
        <Link
          to="/dashboard"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to incidents
        </Link>

        {error && <ErrorMessage message={error} />}
        {saved && (
          <p
            role="status"
            className="fixed bottom-4 right-4 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg"
          >
            Saved
          </p>
        )}
        {!incident && !error && (
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        )}

        {incident && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-border bg-card p-4 md:col-span-2">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Incident</p>
                  <h1 className="text-xl font-semibold tracking-tight">
                    {incident.incident_number}
                  </h1>
                </div>
                <select
                  value={incident.status}
                  disabled={saving}
                  onChange={(e) => save("status", { status: e.target.value })}
                  aria-label="Status"
                  className="rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium capitalize disabled:opacity-60"
                >
                  {INCIDENT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {formatStatus(s)}
                    </option>
                  ))}
                </select>
              </header>

              <dl className="grid gap-3 border-t border-border pt-4 sm:grid-cols-3">
                {meta.map(([Icon, label, value]) => (
                  <div key={label}>
                    <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Icon className="size-4" /> {label}
                    </dt>
                    <dd className="mt-1 break-all text-sm font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <Section icon={User} title="Person details">
              <Text value={incident.person_details} />
            </Section>
            <Section icon={FileText} title="Incident details">
              <Text value={incident.incident_details} />
            </Section>
            <Section icon={NotebookPen} title="Notes">
              <Text value={incident.notes} />
            </Section>

            <Section icon={Link2} title="Police link">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  save("police-link", { police_link: link.trim() });
                }}
                className="flex gap-2"
              >
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://…"
                  className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <button
                  disabled={
                    saving || link.trim() === (incident.police_link ?? "")
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background disabled:opacity-50"
                >
                  <Save className="size-4" /> Save
                </button>
              </form>
              {incident.police_link && isSafeUrl(incident.police_link) && (
                <a
                  href={incident.police_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="size-4" /> Open link
                </a>
              )}
            </Section>

            <div className="md:col-span-2">
              <Section
                icon={Video}
                title={`Videos (${incident.videos.length})`}
              >
                <Footage
                  incidentId={incident.id}
                  videos={incident.videos}
                  canUpload={incident.status === "pending"}
                  onAdded={(video) =>
                    setIncident(
                      (prev) =>
                        prev && { ...prev, videos: [...prev.videos, video] },
                    )
                  }
                />
              </Section>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default IncidentDetail;

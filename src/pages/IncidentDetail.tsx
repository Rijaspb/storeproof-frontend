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
  ShieldAlert,
  User,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Link, useParams } from "react-router";
import DashboardNavbar from "@/components/DashboardNavbar";
import ErrorMessage from "@/components/ErrorMessage";
import { get, patch } from "@/lib/api";
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
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Icon className="size-4" /> {title}
      </h2>
      {children}
    </section>
  );
}

const Text = ({ value }: { value: string | null }) =>
  value ? (
    <p className="whitespace-pre-wrap text-sm leading-relaxed">{value}</p>
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
      .catch((e: Error) => setError(e.message));
  }, [id]);

  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => setLink(incident?.police_link ?? ""), [incident?.police_link]);

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
      const updated = await patch(`/incidents/${id}/${path}`, body);
      setIncident((prev) => prev && { ...prev, ...updated });
      setSaved(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const meta:[LucideIcon, string, string][] = incident
    ? [
        [Calendar, "Incident date/time", formatDateTime(incident.incident_at)],
        [Clock, "Created", formatDateTime(incident.created_at)],
        [Hash, "Reference ID", incident.id],
      ]
    : [];

  return (
    <>
      <DashboardNavbar />
      <main className="mx-auto w-full max-w-3xl px-4 pb-10 pt-20 sm:px-6 sm:pt-24">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
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
          <div className="space-y-4">
            <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-muted">
                  <ShieldAlert className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">Incident</p>
                  <h1 className="text-xl font-semibold tracking-tight">
                    {incident.incident_number}
                  </h1>
                </div>
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

            <dl className="grid gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-2">
              {meta.map(([Icon, label, value], i) => (
                <div key={label} className={i === 2 ? "sm:col-span-2" : ""}>
                  <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Icon className="size-4" /> {label}
                  </dt>
                  <dd className="mt-1 break-all text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <Section icon={User} title="Person details">
              <Text value={incident.person_details} />
            </Section>
            <Section icon={FileText} title="Incident details">
              <Text value={incident.incident_details} />
            </Section>
            <Section icon={NotebookPen} title="Notes">
              <Text value={incident.notes} />
            </Section>

            <Section icon={Video} title={`Videos (${incident.videos.length})`}>
              {incident.videos.length ? (
                <ul className="divide-y divide-border">
                  {incident.videos.map((v, i) => (
                    <li
                      key={v.id}
                      className="flex items-center justify-between gap-3 py-2 text-sm"
                    >
                      <span className="font-medium">Video {i + 1}</span>
                      <span className="text-muted-foreground">
                        {formatDateTime(v.created_at)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No videos yet</p>
              )}
            </Section>

            <Section icon={Link2} title="Police link">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  save("police-link", { police_link: link });
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
                  disabled={saving || link.trim() === (incident.police_link ?? "")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background disabled:opacity-50"
                >
                  <Save className="size-4" /> Save
                </button>
              </form>
              {incident.police_link && (
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
          </div>
        )}
      </main>
    </>
  );
}

export default IncidentDetail;

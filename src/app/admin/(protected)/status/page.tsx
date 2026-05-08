"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  adminAddIncidentUpdate,
  adminCreateIncident,
  adminDeleteIncident,
  adminGetStatus,
  adminListIncidents,
  adminResolveIncident,
  adminUpdateGroupStatus,
  GROUP_STATUS_COLOR,
  type GroupStatus,
  type Incident,
  type IncidentSeverity,
  type IncidentStatus,
  type ServiceGroup,
  type StatusPayload,
} from "@/lib/status-api";
import { useLocale } from "@/components/locale-provider";

function tpl(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

const GROUP_STATUSES: GroupStatus[] = [
  "operational",
  "degraded",
  "partial_outage",
  "major_outage",
];

const INCIDENT_STATUSES: IncidentStatus[] = [
  "investigating",
  "identified",
  "monitoring",
  "resolved",
];

const SEVERITIES: IncidentSeverity[] = ["minor", "major", "critical"];

type StatusDict = ReturnType<typeof useLocale>["t"]["status"];

function formatDate(value: string | null | undefined, locale: "en" | "es") {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString(locale === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default function AdminStatusPage() {
  const { t: dictRoot, locale } = useLocale();
  const t = dictRoot.status;
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const [s, i] = await Promise.all([adminGetStatus(), adminListIncidents()]);
      setStatus(s);
      setIncidents(i);
    } catch {
      toast.error(t.admin.genericError);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    reload();
  }, [reload]);

  if (loading && !status) {
    return <p className="text-[#1a1a17]/60">{t.admin.loading}</p>;
  }

  if (!status) {
    return <p className="text-[#1a1a17]/60">{t.admin.noData}</p>;
  }

  return (
    <div className="max-w-5xl space-y-14">
      <header className="flex items-end justify-between mb-6 pb-6 border-b border-[#1a1a17]/15">
        <div>
          <h2 className="text-5xl font-light tracking-tight">
            {t.admin.title_a} <span className="italic text-[#5a6a3a]">{t.admin.title_b}</span>
          </h2>
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-[#1a1a17]/50 mt-4">
            {t.admin.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={reload}
          className="mono text-[11px] tracking-[0.3em] uppercase text-[#1a1a17]/60 hover:text-[#1a1a17]"
        >
          ↻ {t.admin.refresh}
        </button>
      </header>

      <GroupsSection groups={status.groups} onChanged={reload} t={t} />
      <CreateIncidentSection groups={status.groups} onCreated={reload} t={t} />
      <IncidentsSection incidents={incidents} onChanged={reload} t={t} locale={locale} />
    </div>
  );
}

function GroupsSection({
  groups,
  onChanged,
  t,
}: {
  groups: ServiceGroup[];
  onChanged: () => void;
  t: StatusDict;
}) {
  const [busy, setBusy] = useState<string | null>(null);

  async function update(groupId: string, newStatus: GroupStatus) {
    setBusy(groupId);
    try {
      await adminUpdateGroupStatus(groupId, newStatus);
      toast.success(tpl(t.admin.statusUpdatedToast, { label: t.groupStatus[newStatus] }));
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.admin.genericError);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section>
      <h3 className="mono text-[11px] uppercase tracking-[0.3em] text-[#1a1a17]/50 mb-4">
        {t.admin.groupsHeader}
      </h3>
      <div className="border border-[#1a1a17]/15 divide-y divide-[#1a1a17]/10">
        {groups.map((g) => (
          <div key={g.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: GROUP_STATUS_COLOR[g.status] }}
                />
                <span className="font-medium">{g.name}</span>
              </div>
              <p className="mono text-[10px] uppercase tracking-[0.18em] text-[#1a1a17]/40 mt-1">
                {(g.services ?? []).join(" · ")}
              </p>
            </div>
            <select
              disabled={busy === g.id}
              value={g.status}
              onChange={(e) => update(g.id, e.target.value as GroupStatus)}
              className="mono text-[11px] uppercase tracking-[0.2em] bg-transparent border border-[#1a1a17]/20 px-3 py-2"
            >
              {GROUP_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t.groupStatus[s]}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </section>
  );
}

function CreateIncidentSection({
  groups,
  onCreated,
  t,
}: {
  groups: ServiceGroup[];
  onCreated: () => void;
  t: StatusDict;
}) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<IncidentSeverity>("minor");
  const [statusVal, setStatusVal] = useState<IncidentStatus>("investigating");
  const [affected, setAffected] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function toggleGroup(id: string) {
    setAffected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || affected.length === 0 || !message) {
      toast.error(t.admin.validationError);
      return;
    }
    setBusy(true);
    try {
      await adminCreateIncident({
        title,
        affected_groups: affected,
        severity,
        status: statusVal,
        message,
      });
      toast.success(t.admin.createdToast);
      setTitle("");
      setMessage("");
      setAffected([]);
      setSeverity("minor");
      setStatusVal("investigating");
      onCreated();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.admin.genericError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <h3 className="mono text-[11px] uppercase tracking-[0.3em] text-[#1a1a17]/50 mb-4">
        {t.admin.createIncidentHeader}
      </h3>
      <form onSubmit={submit} className="border border-[#1a1a17]/15 p-6 space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.admin.formTitle}
          className="w-full bg-transparent border-b border-[#1a1a17]/20 py-2 outline-none focus:border-[#5a6a3a]"
        />
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a17]/50">
              {t.admin.formSeverity}
            </span>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}
              className="mt-1 w-full bg-transparent border border-[#1a1a17]/20 px-3 py-2"
            >
              {SEVERITIES.map((s) => (
                <option key={s} value={s}>
                  {t.severity[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a17]/50">
              {t.admin.formInitialStatus}
            </span>
            <select
              value={statusVal}
              onChange={(e) => setStatusVal(e.target.value as IncidentStatus)}
              className="mt-1 w-full bg-transparent border border-[#1a1a17]/20 px-3 py-2"
            >
              {INCIDENT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t.incidentStatus[s]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a17]/50">
            {t.admin.formAffected}
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {groups.map((g) => {
              const checked = affected.includes(g.id);
              return (
                <button
                  type="button"
                  key={g.id}
                  onClick={() => toggleGroup(g.id)}
                  className={`mono text-[11px] uppercase tracking-[0.2em] px-3 py-2 border ${
                    checked
                      ? "bg-[#1a1a17] text-[#faf8f3] border-[#1a1a17]"
                      : "border-[#1a1a17]/20 text-[#1a1a17]/70"
                  }`}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.admin.formMessage}
          rows={3}
          className="w-full bg-transparent border border-[#1a1a17]/20 p-3 outline-none focus:border-[#5a6a3a]"
        />
        <button
          type="submit"
          disabled={busy}
          className="mono text-[11px] uppercase tracking-[0.3em] bg-[#1a1a17] text-[#faf8f3] px-6 py-3 hover:bg-[#5a6a3a] disabled:opacity-50"
        >
          {busy ? t.admin.formSubmitting : t.admin.formSubmit}
        </button>
      </form>
    </section>
  );
}

function IncidentsSection({
  incidents,
  onChanged,
  t,
  locale,
}: {
  incidents: Incident[];
  onChanged: () => void;
  t: StatusDict;
  locale: "en" | "es";
}) {
  const active = useMemo(() => incidents.filter((i) => i.status !== "resolved"), [incidents]);
  const past = useMemo(() => incidents.filter((i) => i.status === "resolved"), [incidents]);

  return (
    <section className="space-y-10">
      <div>
        <h3 className="mono text-[11px] uppercase tracking-[0.3em] text-[#1a1a17]/50 mb-4">
          {tpl(t.admin.activeHeader, { n: active.length })}
        </h3>
        {active.length === 0 ? (
          <p className="text-sm text-[#1a1a17]/60">{t.admin.noActive}</p>
        ) : (
          active.map((i) => (
            <IncidentItem key={i.id} incident={i} onChanged={onChanged} t={t} locale={locale} />
          ))
        )}
      </div>
      <div>
        <h3 className="mono text-[11px] uppercase tracking-[0.3em] text-[#1a1a17]/50 mb-4">
          {tpl(t.admin.pastHeader, { n: past.length })}
        </h3>
        {past.length === 0 ? (
          <p className="text-sm text-[#1a1a17]/60">{t.admin.noPast}</p>
        ) : (
          past.map((i) => (
            <IncidentItem key={i.id} incident={i} onChanged={onChanged} t={t} locale={locale} />
          ))
        )}
      </div>
    </section>
  );
}

function IncidentItem({
  incident,
  onChanged,
  t,
  locale,
}: {
  incident: Incident;
  onChanged: () => void;
  t: StatusDict;
  locale: "en" | "es";
}) {
  const [updMsg, setUpdMsg] = useState("");
  const [updStatus, setUpdStatus] = useState<IncidentStatus>("monitoring");
  const [busy, setBusy] = useState(false);

  async function addUpdate() {
    if (!updMsg) {
      toast.error(t.admin.messageRequired);
      return;
    }
    setBusy(true);
    try {
      await adminAddIncidentUpdate(incident.id, { status: updStatus, message: updMsg });
      toast.success(t.admin.updateAddedToast);
      setUpdMsg("");
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.admin.genericError);
    } finally {
      setBusy(false);
    }
  }

  async function resolve() {
    setBusy(true);
    try {
      await adminResolveIncident(incident.id, t.admin.resolvedDefault);
      toast.success(t.admin.resolvedToast);
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.admin.genericError);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(tpl(t.admin.confirmDelete, { title: incident.title }))) return;
    setBusy(true);
    try {
      await adminDeleteIncident(incident.id);
      toast.success(t.admin.deletedToast);
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.admin.genericError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="border border-[#1a1a17]/15 p-5 mb-3">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-medium">{incident.title}</h4>
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a17]/50 mt-1">
            {t.severity[incident.severity]} · {t.incidentStatus[incident.status]} ·{" "}
            {formatDate(incident.created_at, locale)}
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-[#1a1a17]/40 mt-1">
            {t.admin.groupsLabel}: {(incident.affected_groups ?? []).join(", ")}
          </p>
        </div>
        <div className="flex gap-2">
          {incident.status !== "resolved" && (
            <button
              type="button"
              onClick={resolve}
              disabled={busy}
              className="mono text-[10px] uppercase tracking-[0.2em] border border-[#5a6a3a] text-[#5a6a3a] px-3 py-1 hover:bg-[#5a6a3a] hover:text-[#faf8f3]"
            >
              {t.admin.resolve}
            </button>
          )}
          <button
            type="button"
            onClick={remove}
            disabled={busy}
            className="mono text-[10px] uppercase tracking-[0.2em] border border-[#dc2626] text-[#dc2626] px-3 py-1 hover:bg-[#dc2626] hover:text-[#faf8f3]"
          >
            {t.admin.delete}
          </button>
        </div>
      </header>

      <ul className="mt-4 space-y-2">
        {(incident.updates ?? [])
          .slice()
          .reverse()
          .map((u) => (
            <li key={u.id} className="text-sm text-[#1a1a17]/80">
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[#1a1a17]/50 mr-2">
                {t.incidentStatus[u.status]} · {formatDate(u.created_at, locale)}
              </span>
              {u.message}
            </li>
          ))}
      </ul>

      {incident.status !== "resolved" && (
        <div className="mt-4 pt-4 border-t border-[#1a1a17]/10 flex gap-2">
          <select
            value={updStatus}
            onChange={(e) => setUpdStatus(e.target.value as IncidentStatus)}
            className="mono text-[11px] uppercase tracking-[0.2em] bg-transparent border border-[#1a1a17]/20 px-3 py-2"
          >
            {INCIDENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {t.incidentStatus[s]}
              </option>
            ))}
          </select>
          <input
            value={updMsg}
            onChange={(e) => setUpdMsg(e.target.value)}
            placeholder={t.admin.updatePlaceholder}
            className="flex-1 bg-transparent border border-[#1a1a17]/20 px-3 py-2 outline-none focus:border-[#5a6a3a]"
          />
          <button
            type="button"
            onClick={addUpdate}
            disabled={busy}
            className="mono text-[11px] uppercase tracking-[0.2em] bg-[#1a1a17] text-[#faf8f3] px-4 py-2 hover:bg-[#5a6a3a] disabled:opacity-50"
          >
            {t.admin.addUpdate}
          </button>
        </div>
      )}
    </article>
  );
}

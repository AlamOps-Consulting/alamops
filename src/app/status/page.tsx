import { cookies } from "next/headers";
import {
  fetchStatus,
  fetchIncidents,
  GROUP_STATUS_COLOR,
  type GroupStatus,
  type Incident,
  type IncidentStatus,
  type IncidentSeverity,
  type ServiceGroup,
  type UptimeDay,
} from "@/lib/status-api";
import { dict, type Dict, type Locale } from "@/lib/i18n";

type StatusDict = Dict["status"];

export const revalidate = 60;

function tpl(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

function formatDate(value: string | null | undefined, locale: Locale) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString(locale === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

function StatusDot({ status }: { status: GroupStatus }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{ backgroundColor: GROUP_STATUS_COLOR[status] }}
    />
  );
}

function dayColor(status: UptimeDay["status"]): string {
  if (status === "no_data") return "#d4d4d4";
  if (status === "operational") return "#7cb342";
  if (status === "degraded") return "#fbc02d";
  if (status === "partial_outage") return "#f57c00";
  return "#e53935";
}

function UptimeBars({ days }: { days: UptimeDay[] }) {
  const list = days && days.length > 0 ? days : [];
  return (
    <div className="flex items-end gap-[2px] h-9 w-full">
      {list.map((d) => (
        <div
          key={d.date}
          title={`${d.date} — ${d.status}`}
          className="flex-1 h-full"
          style={{ backgroundColor: dayColor(d.status), minWidth: 2 }}
        />
      ))}
    </div>
  );
}

function GroupCard({
  group,
  windowDays,
  t,
}: {
  group: ServiceGroup;
  windowDays: number;
  t: StatusDict;
}) {
  const days = group.uptime_days ?? [];
  const uptimePct = group.uptime_pct ?? 100;
  return (
    <article className="border border-[#1a1a17]/15 px-6 py-5 bg-white/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-medium text-[#1a1a17]">{group.name}</h3>
        </div>
        <span
          className="mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: GROUP_STATUS_COLOR[group.status] }}
        >
          {t.groupStatus[group.status]}
        </span>
      </div>

      <div className="mt-4">
        <UptimeBars days={days} />
        <div className="flex justify-between items-center mt-2 mono text-[10px] uppercase tracking-[0.18em] text-[#1a1a17]/45">
          <span>{tpl(t.daysAgo, { days: windowDays })}</span>
          <span>{tpl(t.uptimeLabel, { pct: uptimePct.toFixed(2) })}</span>
          <span>{t.today}</span>
        </div>
      </div>
    </article>
  );
}

function IncidentCard({
  incident,
  t,
  locale,
}: {
  incident: Incident;
  t: StatusDict;
  locale: Locale;
}) {
  return (
    <article className="border border-[#1a1a17]/15 p-6 mb-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-medium text-[#1a1a17]">{incident.title}</h4>
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a17]/50 mt-1">
            {t.severity[incident.severity as IncidentSeverity]} ·{" "}
            {t.incidentStatus[incident.status as IncidentStatus]}
          </p>
        </div>
        <p className="mono text-[10px] uppercase tracking-[0.18em] text-[#1a1a17]/40">
          {formatDate(incident.created_at, locale)}
        </p>
      </header>
      <ul className="mt-4 space-y-3">
        {(incident.updates ?? [])
          .slice()
          .reverse()
          .map((u) => (
            <li key={u.id} className="text-sm text-[#1a1a17]/80">
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[#1a1a17]/50 mr-2">
                {t.incidentStatus[u.status as IncidentStatus]} ·{" "}
                {formatDate(u.created_at, locale)}
              </span>
              {u.message}
            </li>
          ))}
      </ul>
    </article>
  );
}

export default async function StatusPage() {
  const jar = await cookies();
  const cookieLang = jar.get("lang")?.value;
  const locale: Locale = cookieLang === "es" ? "es" : "en";
  const t = dict[locale].status;

  const [status, history] = await Promise.all([
    fetchStatus({ revalidate: 60 }),
    fetchIncidents({ limit: 20, revalidate: 60 }),
  ]);

  if (!status) {
    return (
      <main className="min-h-screen bg-[#faf8f3] text-[#1a1a17] px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-light">{t.failedTitle}</h1>
          <p className="mt-6 text-[#1a1a17]/60">{t.failedBody}</p>
        </div>
      </main>
    );
  }

  const overall = (status.overall_status ?? "operational") as GroupStatus;
  const overallColor = GROUP_STATUS_COLOR[overall];
  const groupsList = status.groups ?? [];
  const activeIncidents = status.active_incidents ?? [];
  const past = (history ?? []).filter((i) => i.status === "resolved").slice(0, 10);
  const windowDays = status.uptime_window_days ?? 90;

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1a1a17]">
      {/* Hero */}
      <section
        className="px-6 py-20 border-b border-[#1a1a17]/10"
        style={{ background: `linear-gradient(180deg, ${overallColor}10 0%, transparent 100%)` }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="mono text-[11px] uppercase tracking-[0.3em] text-[#1a1a17]/50">
            {t.brand}
          </p>
          <h1 className="mt-6 text-5xl font-light tracking-tight flex items-center gap-4">
            <StatusDot status={overall} />
            {t.headline[overall]}
          </h1>
          <p className="mono text-[11px] uppercase tracking-[0.2em] text-[#1a1a17]/40 mt-4">
            {t.updated} {formatDate(status.generated_at, locale)}
          </p>
        </div>
      </section>

      {/* Active incidents */}
      {activeIncidents.length > 0 && (
        <section className="px-6 py-12 border-b border-[#1a1a17]/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-light tracking-tight mb-6">{t.activeIncidents}</h2>
            {activeIncidents.map((i) => (
              <IncidentCard key={i.id} incident={i} t={t} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* Service groups */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-light tracking-tight">{t.services}</h2>
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a17]/50">
              {tpl(t.uptimeWindow, { days: windowDays })}
            </p>
          </div>
          <div className="space-y-4">
            {groupsList.map((g) => (
              <GroupCard key={g.id} group={g} windowDays={windowDays} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Past incidents */}
      <section className="px-6 py-12 border-t border-[#1a1a17]/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light tracking-tight mb-6">{t.pastIncidents}</h2>
          {past.length === 0 ? (
            <p className="text-sm text-[#1a1a17]/60">{t.noPast}</p>
          ) : (
            past.map((i) => <IncidentCard key={i.id} incident={i} t={t} locale={locale} />)
          )}
        </div>
      </section>
    </main>
  );
}

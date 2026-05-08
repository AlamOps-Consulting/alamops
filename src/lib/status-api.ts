import { API_URL } from "@/lib/utils";

export type GroupStatus =
  | "operational"
  | "degraded"
  | "partial_outage"
  | "major_outage";

export type IncidentStatus =
  | "investigating"
  | "identified"
  | "monitoring"
  | "resolved";

export type IncidentSeverity = "minor" | "major" | "critical";

export interface UptimeDay {
  date: string;
  status: GroupStatus | "no_data";
}

export interface ServiceGroup {
  id: string;
  name: string;
  description: string;
  services: string[];
  status: GroupStatus;
  updated_at: string | null;
  uptime_pct?: number;
  uptime_days?: UptimeDay[];
}

export interface IncidentUpdate {
  id: string;
  status: IncidentStatus;
  message: string;
  created_at: string;
}

export interface Incident {
  id: string;
  title: string;
  affected_groups: string[];
  severity: IncidentSeverity;
  status: IncidentStatus;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  updates: IncidentUpdate[];
}

export interface StatusPayload {
  overall_status: GroupStatus;
  groups: ServiceGroup[];
  active_incidents: Incident[];
  uptime_window_days?: number;
  generated_at: string;
}

interface CmsResponse<T> {
  status?: string;
  message?: string;
  result?: T;
  code?: number;
}

function unwrap<T>(payload: unknown): T | null {
  if (!payload || typeof payload !== "object") return null;
  const obj = payload as Record<string, unknown>;
  if (obj.status && obj.status !== "success") return null;
  if ("result" in obj) return (obj.result as T) ?? null;
  return payload as T;
}

// ── Public (SSR-friendly) ───────────────────────────────────────────────

export async function fetchStatus(opts?: { revalidate?: number }): Promise<StatusPayload | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/status`, {
      next: { revalidate: opts?.revalidate ?? 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return unwrap<StatusPayload>(json);
  } catch {
    return null;
  }
}

export async function fetchIncidents(opts?: { onlyActive?: boolean; limit?: number; revalidate?: number }): Promise<Incident[]> {
  if (!API_URL) return [];
  const params = new URLSearchParams();
  if (opts?.onlyActive) params.set("only_active", "true");
  if (opts?.limit) params.set("limit", String(opts.limit));
  try {
    const res = await fetch(`${API_URL}/status/incidents?${params.toString()}`, {
      next: { revalidate: opts?.revalidate ?? 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return unwrap<Incident[]>(json) ?? [];
  } catch {
    return [];
  }
}

// ── Admin (client, uses admin_token cookie) ─────────────────────────────

function getAdminToken(): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : "";
}

async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || body.error || `Request failed: ${res.status}`);
  }
  const json = await res.json();
  const result = unwrap<T>(json);
  if (result === null) throw new Error("Empty response");
  return result;
}

export function adminUpdateGroupStatus(groupId: string, status: GroupStatus) {
  return adminFetch<ServiceGroup>(`/status/admin/groups/${groupId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function adminCreateIncident(payload: {
  title: string;
  affected_groups: string[];
  severity: IncidentSeverity;
  status?: IncidentStatus;
  message: string;
}) {
  return adminFetch<Incident>(`/status/admin/incidents`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function adminAddIncidentUpdate(incidentId: string, payload: { status: IncidentStatus; message: string }) {
  return adminFetch<Incident>(`/status/admin/incidents/${incidentId}/updates`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function adminResolveIncident(incidentId: string, message?: string) {
  return adminFetch<Incident>(`/status/admin/incidents/${incidentId}/resolve`, {
    method: "PATCH",
    body: JSON.stringify({ message: message || "Incidente resuelto" }),
  });
}

export function adminDeleteIncident(incidentId: string) {
  return adminFetch<{ id: string; deleted: boolean }>(`/status/admin/incidents/${incidentId}`, {
    method: "DELETE",
  });
}

export async function adminListIncidents(): Promise<Incident[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/status/incidents`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return unwrap<Incident[]>(json) ?? [];
  } catch {
    return [];
  }
}

export async function adminGetStatus(): Promise<StatusPayload | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/status`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return unwrap<StatusPayload>(json);
  } catch {
    return null;
  }
}

// ── UI helpers ──────────────────────────────────────────────────────────

export const GROUP_STATUS_LABEL: Record<GroupStatus, string> = {
  operational: "Operativo",
  degraded: "Rendimiento degradado",
  partial_outage: "Interrupción parcial",
  major_outage: "Interrupción mayor",
};

export const GROUP_STATUS_COLOR: Record<GroupStatus, string> = {
  operational: "#16a34a",
  degraded: "#eab308",
  partial_outage: "#f97316",
  major_outage: "#dc2626",
};

export const INCIDENT_STATUS_LABEL: Record<IncidentStatus, string> = {
  investigating: "Investigando",
  identified: "Identificado",
  monitoring: "Monitorizando",
  resolved: "Resuelto",
};

export const SEVERITY_LABEL: Record<IncidentSeverity, string> = {
  minor: "Menor",
  major: "Mayor",
  critical: "Crítica",
};

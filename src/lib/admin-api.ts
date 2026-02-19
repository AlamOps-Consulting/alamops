const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function getToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "";
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers: HeadersInit = {
    ...(options.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(`${API_URL}${path}`, { ...options, headers });
}

// ── Auth ────────────────────────────────────────────────────────────────────

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Login failed");
  }
  return res.json() as Promise<{ token: string; username: string }>;
}

// ── News ────────────────────────────────────────────────────────────────────

export async function listNews(page = 1, perPage = 20) {
  const res = await apiFetch(`/news?page=${page}&per_page=${perPage}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export async function getNewsById(id: string) {
  const res = await apiFetch(`/news/${id}`);
  if (!res.ok) throw new Error("News not found");
  return res.json();
}

export async function createNews(formData: FormData) {
  const token = getToken();
  const res = await fetch(`${API_URL}/news`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to create news");
  }
  return res.json();
}

export async function updateNews(id: string, formData: FormData) {
  const token = getToken();
  const res = await fetch(`${API_URL}/news/${id}`, {
    method: "PATCH",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to update news");
  }
  return res.json();
}

export async function deleteNews(id: string) {
  const res = await apiFetch(`/news/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete news");
  return res.json();
}

// ── Newsletter ───────────────────────────────────────────────────────────────

export async function listSubscribers(page = 1, perPage = 20, active?: boolean) {
  let url = `/newsletter/subscribers?page=${page}&per_page=${perPage}`;
  if (active !== undefined) url += `&active=${active}`;
  const res = await apiFetch(url);
  if (!res.ok) throw new Error("Failed to fetch subscribers");
  return res.json();
}

export async function addSubscriber(email: string) {
  const res = await apiFetch("/newsletter/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to add subscriber");
  }
  return res.json();
}

export async function unsubscribeSubscriber(email: string) {
  const res = await apiFetch("/newsletter/unsubscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to unsubscribe");
  }
  return res.json();
}

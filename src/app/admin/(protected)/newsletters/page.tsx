"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { listSubscribers, addSubscriber, unsubscribeSubscriber } from "@/lib/admin-api";

interface Subscriber {
  _id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
}

interface SubscribersResponse {
  items: Subscriber[];
  total: number;
  page: number;
  per_page: number;
}

type Filter = "all" | "active" | "inactive";

export default function AdminNewslettersPage() {
  const [data, setData] = useState<SubscribersResponse | null>(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [addEmail, setAddEmail] = useState("");
  const [addingEmail, setAddingEmail] = useState(false);
  const [unsubscribingId, setUnsubscribingId] = useState<string | null>(null);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const active = filter === "all" ? undefined : filter === "active";
      const res = await listSubscribers(page, 20, active);
      setData(res);
    } catch {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  function handleFilterChange(f: Filter) {
    setFilter(f);
    setPage(1);
  }

  async function handleAddEmail(e: React.FormEvent) {
    e.preventDefault();
    setAddingEmail(true);
    try {
      await addSubscriber(addEmail);
      toast.success("Subscriber added");
      setAddEmail("");
      fetchSubscribers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to add subscriber");
    } finally {
      setAddingEmail(false);
    }
  }

  async function handleUnsubscribe(sub: Subscriber) {
    setUnsubscribingId(sub._id);
    try {
      await unsubscribeSubscriber(sub.email);
      toast.success(`${sub.email} unsubscribed`);
      fetchSubscribers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to unsubscribe");
    } finally {
      setUnsubscribingId(null);
    }
  }

  const totalPages = data ? Math.ceil(data.total / data.per_page) : 1;

  const filterTabs: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-end justify-between mb-14 pb-6 border-b border-[#1a1a17]/15">
        <div>
          <h2 className="text-5xl font-light tracking-tight">
            Newsletter <span className="italic text-[#5a6a3a]">subscribers.</span>
          </h2>
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-[#1a1a17]/50 mt-4">
            {data ? `${data.total} records` : "—"}
          </p>
        </div>
      </div>

      {/* Add form */}
      <form onSubmit={handleAddEmail} className="mb-12">
        <div className="flex items-baseline justify-between mb-3">
          <label
            htmlFor="add-email"
            className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60"
          >
            Add subscriber
          </label>
          <span className="mono text-[10px] tracking-[0.25em] text-[#1a1a17]/30">
            +
          </span>
        </div>
        <div className="flex gap-6 items-end">
          <input
            id="add-email"
            type="email"
            placeholder="name@domain.com"
            value={addEmail}
            onChange={(e) => setAddEmail(e.target.value)}
            required
            className="flex-1 max-w-md bg-transparent border-0 border-b border-[#1a1a17]/30 pb-2 text-lg tracking-tight focus:outline-none focus:border-[#5a6a3a] transition-colors"
            style={{ fontFamily: "inherit" }}
          />
          <button
            type="submit"
            disabled={addingEmail}
            className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-3 hover:bg-[#5a6a3a] transition-colors disabled:opacity-60"
          >
            {addingEmail ? "Adding…" : "Add →"}
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="flex items-center gap-8 mb-8">
        <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/40">
          Filter
        </span>
        {filterTabs.map(({ label, value }) => {
          const active = filter === value;
          return (
            <button
              key={value}
              onClick={() => handleFilterChange(value)}
              className="group relative py-2"
            >
              <span
                className={`text-sm tracking-tight transition-colors ${
                  active
                    ? "text-[#5a6a3a] italic"
                    : "text-[#1a1a17]/70 group-hover:text-[#1a1a17]"
                }`}
              >
                {label}
              </span>
              <span
                className={`absolute left-0 -bottom-0 h-px transition-all ${
                  active ? "w-full bg-[#5a6a3a]" : "w-0 bg-[#1a1a17]/30"
                }`}
              />
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="mono text-[11px] tracking-[0.25em] uppercase text-[#1a1a17]/50">
          Loading…
        </p>
      ) : (
        <>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1a1a17]/15">
                <Th width="50%">Email</Th>
                <Th width="25%">Subscribed</Th>
                <Th width="15%">Status</Th>
                <Th width="10%" align="right">
                  &nbsp;
                </Th>
              </tr>
            </thead>
            <tbody>
              {(data?.items ?? []).map((sub, idx) => (
                <tr
                  key={sub._id}
                  className="border-b border-[#1a1a17]/10 hover:bg-[#1a1a17]/[0.03] transition-colors"
                >
                  <td className="py-5 pr-4">
                    <div className="flex items-baseline gap-4">
                      <span className="mono text-[10px] tracking-[0.2em] text-[#1a1a17]/30 w-8">
                        {String(idx + 1 + (page - 1) * 20).padStart(2, "0")}
                      </span>
                      <span className="mono text-sm tracking-tight text-[#1a1a17]">
                        {sub.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 pr-4">
                    <span className="mono text-[10px] tracking-[0.2em] text-[#1a1a17]/50">
                      {sub.subscribed_at
                        ? new Date(sub.subscribed_at)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            })
                            .toUpperCase()
                        : "—"}
                    </span>
                  </td>
                  <td className="py-5 pr-4">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          sub.active ? "bg-[#5a6a3a]" : "bg-[#1a1a17]/25"
                        }`}
                      />
                      <span
                        className={`mono text-[10px] tracking-[0.3em] uppercase ${
                          sub.active ? "text-[#5a6a3a]" : "text-[#1a1a17]/40"
                        }`}
                      >
                        {sub.active ? "active" : "inactive"}
                      </span>
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    {sub.active && (
                      <button
                        disabled={unsubscribingId === sub._id}
                        onClick={() => handleUnsubscribe(sub)}
                        className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/70 hover:text-[#a33] transition-colors disabled:opacity-40"
                      >
                        {unsubscribingId === sub._id ? "…" : "Unsubscribe"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {(data?.items ?? []).length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center mono text-[11px] tracking-[0.3em] uppercase text-[#1a1a17]/40"
                  >
                    ╱╱ no subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-6 mt-10">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/70 hover:text-[#5a6a3a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/50">
                {String(page).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/70 hover:text-[#5a6a3a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Th({
  children,
  width,
  align = "left",
}: {
  children: React.ReactNode;
  width?: string;
  align?: "left" | "right";
}) {
  return (
    <th
      style={{ width, textAlign: align }}
      className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/50 font-normal pb-4 pr-4"
    >
      {children}
    </th>
  );
}

"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import {
  listSubscribers,
  addSubscriber,
  unsubscribeSubscriber,
  bulkUnsubscribe,
  resubscribeSubscriber,
} from "@/lib/admin-api";

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
  const [resubscribingId, setResubscribingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkRunning, setBulkRunning] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggered = useRef(false);
  const LONG_PRESS_MS = 500;

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

  useEffect(() => {
    setSelectedIds(new Set());
    setSelectMode(false);
  }, [page, filter]);

  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    setSelectedIds(new Set());
  }, []);

  function startLongPress(sub: Subscriber) {
    if (!sub.active) return;
    longPressTriggered.current = false;
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      setSelectMode(true);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.add(sub._id);
        return next;
      });
    }, LONG_PRESS_MS);
  }

  function cancelLongPress() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

  function handleRowTap(sub: Subscriber) {
    if (longPressTriggered.current) {
      longPressTriggered.current = false;
      return;
    }
    if (!selectMode || !sub.active) return;
    toggleOne(sub._id);
  }

  const activeRowsOnPage = useMemo(
    () => (data?.items ?? []).filter((s) => s.active),
    [data]
  );

  const allActiveSelected =
    activeRowsOnPage.length > 0 &&
    activeRowsOnPage.every((s) => selectedIds.has(s._id));

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllActive() {
    setSelectedIds((prev) => {
      if (allActiveSelected) {
        const next = new Set(prev);
        activeRowsOnPage.forEach((s) => next.delete(s._id));
        return next;
      }
      const next = new Set(prev);
      activeRowsOnPage.forEach((s) => next.add(s._id));
      return next;
    });
  }

  function handleFilterChange(f: Filter) {
    setFilter(f);
    setPage(1);
  }

  async function handleBulkUnsubscribe() {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    setBulkRunning(true);
    try {
      const res = await bulkUnsubscribe(ids);
      toast.success(`${res.unsubscribed} unsubscribed`);
      setSelectedIds(new Set());
      fetchSubscribers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to bulk unsubscribe");
    } finally {
      setBulkRunning(false);
    }
  }

  async function handleResubscribe(sub: Subscriber) {
    setResubscribingId(sub._id);
    try {
      await resubscribeSubscriber(sub.email);
      toast.success(`${sub.email} resubscribed`);
      fetchSubscribers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to resubscribe");
    } finally {
      setResubscribingId(null);
    }
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

      {/* Select mode action bar */}
      {selectMode && (
        <div className="flex items-center justify-between mb-6 px-5 py-4 border border-[#5a6a3a]/40 bg-[#5a6a3a]/[0.06]">
          <div className="flex items-baseline gap-4">
            <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a]">
              ◉ select mode
            </span>
            <span className="mono text-[11px] tracking-[0.25em] uppercase text-[#1a1a17]/70">
              {selectedIds.size} selected
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleAllActive}
              className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/60 hover:text-[#1a1a17] transition-colors"
            >
              {allActiveSelected ? "Deselect page" : "Select page"}
            </button>
            <button
              onClick={exitSelectMode}
              className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/60 hover:text-[#1a1a17] transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={bulkRunning || selectedIds.size === 0}
              onClick={handleBulkUnsubscribe}
              className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-3 hover:bg-[#a33] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {bulkRunning ? "Unsubscribing…" : `Unsubscribe selected →`}
            </button>
          </div>
        </div>
      )}

      {!selectMode && (
        <p className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/35 mb-6">
          ╱ hold an email to enter select mode
        </p>
      )}

      {loading ? (
        <p className="mono text-[11px] tracking-[0.25em] uppercase text-[#1a1a17]/50">
          Loading…
        </p>
      ) : (
        <>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1a1a17]/15">
                {selectMode && (
                  <th className="w-10 pb-4 pr-2">
                    <input
                      type="checkbox"
                      aria-label="Select all active on page"
                      checked={allActiveSelected}
                      onChange={toggleAllActive}
                      disabled={activeRowsOnPage.length === 0}
                      className="accent-[#5a6a3a] cursor-pointer disabled:cursor-not-allowed"
                    />
                  </th>
                )}
                <Th width={selectMode ? "42%" : "50%"}>Email</Th>
                <Th width="22%">Subscribed</Th>
                <Th width="13%">Status</Th>
                <Th width={selectMode ? "18%" : "15%"} align="right">
                  &nbsp;
                </Th>
              </tr>
            </thead>
            <tbody>
              {(data?.items ?? []).map((sub, idx) => {
                const isSelected = selectedIds.has(sub._id);
                return (
                <tr
                  key={sub._id}
                  onPointerDown={() => startLongPress(sub)}
                  onPointerUp={cancelLongPress}
                  onPointerLeave={cancelLongPress}
                  onPointerCancel={cancelLongPress}
                  onContextMenu={(e) => {
                    if (selectMode || sub.active) e.preventDefault();
                  }}
                  onClick={() => handleRowTap(sub)}
                  className={`border-b border-[#1a1a17]/10 transition-colors ${
                    isSelected
                      ? "bg-[#5a6a3a]/[0.08]"
                      : "hover:bg-[#1a1a17]/[0.03]"
                  } ${selectMode && sub.active ? "cursor-pointer" : ""} select-none`}
                  style={{ touchAction: "manipulation" }}
                >
                  {selectMode && (
                    <td className="py-5 pr-2 align-middle">
                      <input
                        type="checkbox"
                        aria-label={`Select ${sub.email}`}
                        checked={isSelected}
                        onChange={() => toggleOne(sub._id)}
                        onClick={(e) => e.stopPropagation()}
                        disabled={!sub.active}
                        className="accent-[#5a6a3a] cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                      />
                    </td>
                  )}
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
                    {sub.active ? (
                      <button
                        disabled={unsubscribingId === sub._id || selectMode}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnsubscribe(sub);
                        }}
                        className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/70 hover:text-[#a33] transition-colors disabled:opacity-40"
                      >
                        {unsubscribingId === sub._id ? "…" : "Unsubscribe"}
                      </button>
                    ) : (
                      <button
                        disabled={resubscribingId === sub._id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResubscribe(sub);
                        }}
                        className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/70 hover:text-[#5a6a3a] transition-colors disabled:opacity-40"
                      >
                        {resubscribingId === sub._id ? "…" : "↺ Resubscribe"}
                      </button>
                    )}
                  </td>
                </tr>
                );
              })}
              {(data?.items ?? []).length === 0 && (
                <tr>
                  <td
                    colSpan={selectMode ? 5 : 4}
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

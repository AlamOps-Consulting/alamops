"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
      toast.success("Subscriber added successfully");
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

  const filterButtons: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
        <span className="text-sm text-muted-foreground">
          {data ? `${data.total} total` : ""}
        </span>
      </div>

      {/* Add email form */}
      <form onSubmit={handleAddEmail} className="flex gap-2">
        <Input
          type="email"
          placeholder="Add email to newsletter..."
          value={addEmail}
          onChange={(e) => setAddEmail(e.target.value)}
          required
          className="max-w-sm"
        />
        <Button type="submit" disabled={addingEmail}>
          {addingEmail ? "Adding…" : "Add"}
        </Button>
      </form>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filterButtons.map(({ label, value }) => (
          <Button
            key={value}
            size="sm"
            variant={filter === value ? "default" : "outline"}
            onClick={() => handleFilterChange(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : (
        <>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Subscribed At</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {(data?.items ?? []).map((sub) => (
                  <tr key={sub._id} className="border-t hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{sub.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sub.subscribed_at
                        ? new Date(sub.subscribed_at).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {sub.active ? (
                        <Badge>Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {sub.active && (
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={unsubscribingId === sub._id}
                          onClick={() => handleUnsubscribe(sub)}
                        >
                          {unsubscribingId === sub._id ? "…" : "Unsubscribe"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {(data?.items ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      No subscribers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 justify-end">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

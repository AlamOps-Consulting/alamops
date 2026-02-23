"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listNews, deleteNews } from "@/lib/admin-api";

interface NewsItem {
  _id: string;
  title: string;
  category: string;
  date: string;
  featured?: boolean;
  slug: string;
}

interface NewsListResponse {
  items: NewsItem[];
  total: number;
  page: number;
  per_page: number;
}

export default function AdminNewsPage() {
  const [data, setData] = useState<NewsListResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listNews(page, 20);
      setData(res);
    } catch {
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteNews(id);
      toast.success("Article deleted");
      fetchNews();
    } catch {
      toast.error("Failed to delete article");
    } finally {
      setDeleting(null);
    }
  }

  const totalPages = data ? Math.ceil(data.total / data.per_page) : 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">News Articles</h2>
        <Link href="/admin/news/new">
          <Button size="sm">+ New Article</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : (
        <>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Title</th>
                  <th className="text-left px-4 py-3 font-medium">Category</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Featured</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(data?.items ?? []).map((item) => (
                  <tr key={item._id} className="border-t hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 max-w-xs truncate font-medium">{item.title}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{item.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {item.date ? new Date(item.date).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {item.featured ? (
                        <Badge>Featured</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link href={`/admin/news/${item._id}/edit`}>
                        <Button size="sm" variant="outline">Edit</Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={deleting === item._id}
                        onClick={() => handleDelete(item._id, item.title)}
                      >
                        {deleting === item._id ? "Deleting…" : "Delete"}
                      </Button>
                    </td>
                  </tr>
                ))}
                {(data?.items ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No articles yet.
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

"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
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
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-end justify-between mb-14 pb-6 border-b border-[#1a1a17]/15">
        <div>
          <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-3">
            / 01 &nbsp; Catalogue
          </div>
          <h2 className="text-5xl font-light tracking-tight">
            News <span className="italic text-[#5a6a3a]">articles.</span>
          </h2>
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-[#1a1a17]/50 mt-4">
            {data ? `${data.total} records` : "—"}
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-4 hover:bg-[#5a6a3a] transition-colors"
        >
          + New article
        </Link>
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
                <Th width="50%">Title</Th>
                <Th width="15%">Category</Th>
                <Th width="15%">Date</Th>
                <Th width="10%">Featured</Th>
                <Th width="10%" align="right">
                  &nbsp;
                </Th>
              </tr>
            </thead>
            <tbody>
              {(data?.items ?? []).map((item, idx) => (
                <tr
                  key={item._id}
                  className="border-b border-[#1a1a17]/10 hover:bg-[#1a1a17]/[0.03] transition-colors group"
                >
                  <td className="py-5 pr-4">
                    <div className="flex items-baseline gap-4">
                      <span className="mono text-[10px] tracking-[0.2em] text-[#1a1a17]/30 w-8">
                        {String(idx + 1 + (page - 1) * 20).padStart(2, "0")}
                      </span>
                      <span className="text-lg tracking-tight truncate group-hover:text-[#5a6a3a] transition-colors">
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 pr-4">
                    <span className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/70">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-5 pr-4">
                    <span className="mono text-[10px] tracking-[0.2em] text-[#1a1a17]/50">
                      {item.date
                        ? new Date(item.date)
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
                    {item.featured ? (
                      <span className="mono text-[10px] tracking-[0.25em] uppercase text-[#5a6a3a]">
                        ★ featured
                      </span>
                    ) : (
                      <span className="text-[#1a1a17]/20">—</span>
                    )}
                  </td>
                  <td className="py-5 text-right">
                    <div className="inline-flex items-center gap-5">
                      <Link
                        href={`/admin/news/${item._id}/edit`}
                        className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/70 hover:text-[#5a6a3a] transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        disabled={deleting === item._id}
                        onClick={() => handleDelete(item._id, item.title)}
                        className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/70 hover:text-[#a33] transition-colors disabled:opacity-40"
                      >
                        {deleting === item._id ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(data?.items ?? []).length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-20 text-center mono text-[11px] tracking-[0.3em] uppercase text-[#1a1a17]/40"
                  >
                    ╱╱ no articles yet
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

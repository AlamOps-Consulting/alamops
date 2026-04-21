"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { getNewsById, updateNews } from "@/lib/admin-api";
import { API_URL } from "@/lib/utils";
import {
  ArticleForm,
  type ArticleInitial,
} from "@/components/admin/article-form";

interface NewsItem {
  _id: string;
  title: string;
  category: string;
  content: string;
  author?: string;
  readTime?: number;
  icon?: string;
  featured?: boolean;
  image?: string;
  image_url?: string;
}

function resolveImageUrl(a: NewsItem): string | undefined {
  const base = (API_URL ?? "").replace(/\/$/, "");
  const candidates = [a.image_url, a.image].filter(Boolean) as string[];
  for (const c of candidates) {
    if (/^https?:\/\//i.test(c)) return c;
    if (c.startsWith("/")) return base ? `${base}${c}` : c;
    return base ? `${base}/news/image/${c}` : `/news/image/${c}`;
  }
  return undefined;
}

export default function EditNewsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNewsById(id)
      .then(setArticle)
      .catch(() => toast.error("Failed to load article"))
      .finally(() => setFetching(false));
  }, [id]);

  async function handleSubmit(fd: FormData) {
    setLoading(true);
    try {
      await updateNews(id, fd);
      toast.success("Article updated");
      router.push("/admin/news");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update article"
      );
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <p className="mono text-[11px] tracking-[0.25em] uppercase text-[#1a1a17]/50">
        Loading article…
      </p>
    );
  }

  if (!article) {
    return (
      <p className="mono text-[11px] tracking-[0.25em] uppercase text-[#a33]">
        Article not found.
      </p>
    );
  }

  const initial: ArticleInitial = {
    title: article.title,
    category: article.category,
    content: article.content,
    author: article.author,
    readTime: article.readTime,
    icon: article.icon,
    featured: article.featured,
    imageUrl: resolveImageUrl(article),
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-14">
        <Link
          href="/admin/news"
          className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 hover:text-[#5a6a3a] transition-colors inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to catalogue
        </Link>

        <div className="flex items-end justify-between border-b border-[#1a1a17]/15 pb-8 gap-6">
          <div className="min-w-0">
            <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-3">
              / 01 &nbsp; Revision
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight truncate">
              Edit <span className="italic text-[#5a6a3a]">article.</span>
            </h1>
            <p className="mono text-[11px] tracking-[0.2em] uppercase text-[#1a1a17]/50 mt-4 truncate">
              {article.title}
            </p>
          </div>
        </div>
      </div>

      <ArticleForm
        mode="edit"
        initial={initial}
        loading={loading}
        submitLabel="Save changes"
        submittingLabel="Saving…"
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </div>
  );
}

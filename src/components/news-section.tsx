import { API_URL } from "@/lib/utils";
import type { NewsItem } from "@/types/news.type";
import { FALLBACK_RAW, normalizeArticles } from "./data/news-fallback";
import { NewsGrid } from "./news-grid";

export default async function NewsSection() {
  try {
    const res = await fetch(`${API_URL}/news?limit=6`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return <NewsGrid news={normalizeArticles(FALLBACK_RAW)} />;
    }
    const articles = await res.json();
    const items: unknown[] = Array.isArray(articles.items)
      ? articles.items
      : articles;
    return <NewsGrid news={normalizeArticles(items as any[])} />;
  } catch {
    return <NewsGrid news={normalizeArticles(FALLBACK_RAW)} />;
  }
}

export type { NewsItem };

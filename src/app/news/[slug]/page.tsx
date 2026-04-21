import { FALLBACK_RAW, normalizeArticles } from "@/components/data/news-fallback";
import IconRenderer from "@/lib/icon-render";
import { API_URL } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { NewsItem } from "@/types/news.type";

interface PageProps {
  params: { slug: string };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const slug = params.slug;
  const article = await loadArticle(slug);
  if (!article) return notFound();

  const formatted = new Date(article.date)
    .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return renderArticle(article, formatted);
}

async function loadArticle(slug: string): Promise<NewsItem | null> {
  const fallback = () => {
    const list = normalizeArticles(FALLBACK_RAW);
    return list.find((a) => a.slug === slug) ?? null;
  };

  if (!API_URL) return fallback();

  try {
    const res = await fetch(
      `${API_URL}/news/slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return fallback();
    const payload = await res.json();
    const raw = Array.isArray(payload?.items ?? payload)
      ? payload.items ?? payload
      : [payload];
    const normalized = normalizeArticles(raw);
    return normalized.find((a) => a.slug === slug) ?? fallback();
  } catch {
    return fallback();
  }
}

function renderArticle(article: NewsItem, formatted: string) {
  return (
    <div className="landing min-h-screen bg-[#faf8f3] text-[#1a1a17]">
      {/* Slim top bar */}
      <header className="sticky top-0 z-40 bg-[#faf8f3]/90 backdrop-blur-sm border-b border-[#1a1a17]/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link
            href="/#news"
            className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/70 hover:text-[#5a6a3a] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to news
          </Link>
          <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/50">
            Journal · {article.category}
          </div>
        </div>
      </header>

      <article className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Category kicker */}
        <div className="flex items-center gap-4 mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-8">
          <span className="flex items-center justify-center w-9 h-9 border border-[#5a6a3a]/30 bg-[#5a6a3a]/5 text-[#5a6a3a]">
            <IconRenderer icon={article.icon ?? ""} className="w-4 h-4" />
          </span>
          <span>{article.category}</span>
          <span className="text-[#1a1a17]/20">·</span>
          <span className="text-[#1a1a17]/55">{formatted}</span>
          {article.readTime ? (
            <>
              <span className="text-[#1a1a17]/20">·</span>
              <span className="text-[#1a1a17]/55">
                {article.readTime} min read
              </span>
            </>
          ) : null}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-light leading-[0.95] tracking-tight max-w-4xl">
          {article.title}
        </h1>

        {/* Byline */}
        {article.author ? (
          <div className="mt-8 flex items-center gap-4 border-t border-b border-[#1a1a17]/15 py-5">
            <div className="w-10 h-10 rounded-full bg-[#5a6a3a]/10 border border-[#5a6a3a]/30 flex items-center justify-center mono text-[11px] text-[#5a6a3a]">
              {article.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/55">
                Written by
              </span>
              <span className="text-base tracking-tight">{article.author}</span>
            </div>
          </div>
        ) : (
          <div className="mt-10 border-b border-[#1a1a17]/15" />
        )}

        {/* Featured image */}
        {article.image ? (
          <figure className="mt-12 border border-[#1a1a17]/15 bg-[#1a1a17]/[0.02] overflow-hidden group">
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/55 px-5 py-3 border-t border-[#1a1a17]/15 flex items-center justify-between gap-4">
              <span className="truncate">fig. 01 &mdash; {article.title}</span>
              <span className="shrink-0">{formatted}</span>
            </figcaption>
          </figure>
        ) : null}

        {/* Body */}
        <div
          className="news-prose mt-16 max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Footer CTA */}
        <div className="mt-24 border border-[#1a1a17]/15 p-10 md:p-12 text-center">
          <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-4">
            Liked this?
          </div>
          <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            Let&rsquo;s <span className="italic text-[#5a6a3a]">talk</span> about your cloud.
          </h3>
          <p className="text-base leading-relaxed text-[#1a1a17]/70 max-w-xl mx-auto mb-8">
            Our engineers can help you transform your multi-cloud infrastructure
            &mdash; strategy, security, automation and FinOps.
          </p>
          <Link
            href="/#contact"
            className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-4 hover:bg-[#5a6a3a] transition-colors inline-flex items-center gap-2"
          >
            Talk to an expert <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Prev / back nav */}
        <div className="mt-14 flex justify-between items-center mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/45">
          <Link
            href="/#news"
            className="hover:text-[#5a6a3a] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All news
          </Link>
          <Link href="/" className="hover:text-[#5a6a3a] transition-colors">
            Home →
          </Link>
        </div>
      </article>

      <style>{`
        .news-prose p { font-size: 1.125rem; line-height: 1.85; color: rgba(26,26,23,0.82); margin: 0 0 1.4rem 0; }
        .news-prose p:first-of-type { font-size: 1.35rem; font-style: italic; color: rgba(26,26,23,0.9); }
        .news-prose p:first-of-type::first-letter { font-size: 4rem; line-height: 1; float: left; padding: 0.25rem 0.75rem 0 0; color: #5a6a3a; font-weight: 400; }
        .news-prose h2 { font-size: 2rem; font-weight: 300; letter-spacing: -0.01em; margin: 3rem 0 1rem 0; color: #1a1a17; }
        .news-prose h3 { font-size: 1.5rem; font-weight: 300; letter-spacing: -0.01em; margin: 2.5rem 0 0.75rem 0; color: #1a1a17; }
        .news-prose a { color: #5a6a3a; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
        .news-prose a:hover { color: #1a1a17; }
        .news-prose ul, .news-prose ol { padding-left: 1.5rem; margin: 1rem 0 1.4rem 0; }
        .news-prose ul li, .news-prose ol li { margin-bottom: 0.5rem; line-height: 1.75; color: rgba(26,26,23,0.82); }
        .news-prose ul { list-style: none; padding-left: 0; }
        .news-prose ul li { position: relative; padding-left: 1.75rem; }
        .news-prose ul li::before { content: "—"; position: absolute; left: 0; top: 0; color: #5a6a3a; font-family: "JetBrains Mono", ui-monospace, monospace; }
        .news-prose blockquote { border-left: 2px solid #5a6a3a; padding: 0.25rem 0 0.25rem 1.5rem; margin: 2rem 0; font-style: italic; font-size: 1.35rem; line-height: 1.6; color: rgba(26,26,23,0.85); }
        .news-prose code { font-family: "JetBrains Mono", ui-monospace, monospace; background: rgba(26,26,23,0.06); padding: 0.1rem 0.4rem; font-size: 0.9em; border-radius: 2px; }
        .news-prose pre { background: #1a1a17; color: #faf8f3; padding: 1.25rem; overflow-x: auto; margin: 1.5rem 0; font-size: 0.9rem; line-height: 1.6; }
        .news-prose pre code { background: transparent; color: inherit; padding: 0; }
        .news-prose img { margin: 2rem 0; border: 1px solid rgba(26,26,23,0.15); width: 100%; height: auto; }
        .news-prose hr { border: 0; border-top: 1px solid rgba(26,26,23,0.15); margin: 3rem 0; }
        .news-prose strong { font-weight: 500; color: #1a1a17; }
      `}</style>
    </div>
  );
}

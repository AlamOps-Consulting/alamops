"use client";

import Link from "next/link";
import IconRenderer from "@/lib/icon-render";
import type { NewsItem } from "@/types/news.type";
import { useLocale } from "./locale-provider";

export function NewsGrid({ news }: { news: NewsItem[] }) {
  const { t, locale } = useLocale();

  return (
    <section
      id="news"
      className="landing bg-[#faf8f3] text-[#1a1a17] py-24 md:py-32 border-t border-[#1a1a17]/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-8">
            <h2
              id="news-title"
              className="text-4xl md:text-6xl font-light leading-[0.95] tracking-tight"
            >
              {t.news.title_a}{" "}
              <span className="italic text-[#5a6a3a]">{t.news.title_b}</span>{" "}
              {t.news.title_c}
            </h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-lg leading-relaxed text-[#1a1a17]/75">
              {t.news.description}
            </p>
          </div>
        </div>

        <div className="border-t border-[#1a1a17]/15">
          {news.slice(0, 6).map((article, i) => {
            const formatted = new Date(article.date)
              .toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })
              .toUpperCase();
            return (
              <Link
                key={i}
                href={`/news/${article.slug}`}
                className="group grid md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-10 items-center border-b border-[#1a1a17]/15 hover:bg-[#1a1a17]/[0.02] transition-colors px-2 md:px-4"
              >
                <div className="md:col-span-1 mono text-[11px] tracking-[0.25em] text-[#1a1a17]/40">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="md:col-span-2">
                  {article.image ? (
                    <div className="relative overflow-hidden border border-[#1a1a17]/15 aspect-[4/3] bg-[#1a1a17]/[0.04]">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center aspect-[4/3] border border-[#1a1a17]/10 bg-[#5a6a3a]/5 text-[#5a6a3a]">
                      <IconRenderer
                        icon={article.icon ?? ""}
                        className="w-6 h-6"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/55">
                  {formatted}
                  <br />
                  <span className="text-[#5a6a3a] mt-2 inline-block">
                    {article.category}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight group-hover:italic group-hover:text-[#5a6a3a] transition-all">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#1a1a17]/70 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
                <div className="md:col-span-1 mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/50">
                  {article.readTime} {t.news.minRead}
                </div>
                <div className="md:col-span-1 mono text-[11px] tracking-[0.3em] uppercase text-[#1a1a17]/40 md:text-right group-hover:text-[#5a6a3a] transition-colors">
                  →
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 flex justify-end">
          <Link
            href="/news"
            className="mono text-[11px] tracking-[0.3em] uppercase text-[#1a1a17]/70 hover:text-[#5a6a3a] transition-colors inline-flex items-center gap-2"
          >
            {t.news.viewAll} →
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Cloud, DollarSign, GitBranch, Shield } from "lucide-react";
import { useLocale } from "./locale-provider";

const icons = [Cloud, Shield, GitBranch, DollarSign];

export function ServicesSection() {
  const { t } = useLocale();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="landing bg-[#faf8f3] text-[#1a1a17] py-20 md:py-24 border-t border-[#1a1a17]/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-8 mb-14 items-end">
          <div className="md:col-span-7">
            <h2
              id="services-title"
              className="text-4xl md:text-5xl font-light leading-[1] tracking-tight"
            >
              {t.services.title_a}{" "}
              <span className="italic text-[#5a6a3a]">
                {t.services.title_b}
              </span>
            </h2>
            <p className="mt-3 text-base text-[#1a1a17]/60">
              {t.services.subtitle}
            </p>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed text-[#1a1a17]/75">
              {t.services.description}
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#1a1a17]/15 border-t border-b border-[#1a1a17]/15">
          {t.services.items.map((s, i) => {
            const Icon = icons[i] ?? Cloud;
            return (
              <article
                key={i}
                className="group grid md:grid-cols-12 gap-4 md:gap-10 py-6 md:py-7 items-center hover:bg-[#1a1a17]/[0.02] transition-colors px-2 md:px-4"
              >
                <div className="md:col-span-1 mono text-[10px] tracking-[0.25em] text-[#1a1a17]/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-4 flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#5a6a3a] shrink-0" />
                  <h3 className="text-xl md:text-2xl font-light tracking-tight group-hover:italic group-hover:text-[#5a6a3a] transition-all">
                    {s.title}
                  </h3>
                </div>
                <p className="md:col-span-6 text-sm leading-relaxed text-[#1a1a17]/70">
                  {s.description}
                </p>
                <div className="md:col-span-1 mono text-[10px] uppercase text-[#1a1a17]/40 md:text-right group-hover:text-[#5a6a3a] transition-colors">
                  →
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

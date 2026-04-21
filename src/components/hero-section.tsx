"use client";

import { useLocale } from "./locale-provider";

export function HeroSection() {
  const { t } = useLocale();

  const scroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { k: t.hero.stats.multiCloud, v: t.hero.stats.multiCloudValue },
    { k: t.hero.stats.deploys, v: t.hero.stats.deploysValue },
    { k: t.hero.stats.uptime, v: t.hero.stats.uptimeValue },
    { k: t.hero.stats.teams, v: t.hero.stats.teamsValue },
  ];

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="landing relative overflow-hidden bg-[#faf8f3] text-[#1a1a17] flex items-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #5a6a3a 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-60 md:pt-112 pb-20 md:pb-24">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <h1 className="md:col-span-8 text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[1.02] tracking-[-0.03em] font-light">
            {t.hero.headline_a}{" "}
            <span className="italic text-[#5a6a3a]">{t.hero.headline_b}</span>{" "}
            {t.hero.headline_c}{" "}
            <span className="italic font-normal">{t.hero.headline_d}</span>
          </h1>

          <div className="md:col-span-4">
            <p className="text-lg leading-relaxed text-[#1a1a17]/75 mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scroll("contact")}
                className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-4 hover:bg-[#5a6a3a] transition-colors text-left"
              >
                {t.hero.ctaExpert} →
              </button>
              <button
                onClick={() => scroll("services")}
                className="mono text-[11px] tracking-[0.3em] uppercase text-[#1a1a17]/70 hover:text-[#5a6a3a] transition-colors text-left py-2"
              >
                {t.hero.ctaServices} ↓
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-20 border-t border-[#1a1a17]/15 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/50">
                {s.k}
              </span>
              <span className="text-2xl md:text-3xl font-light tracking-tight text-[#1a1a17]">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

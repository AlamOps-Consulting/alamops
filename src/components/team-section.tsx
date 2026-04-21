"use client";

import Image from "next/image";
import { useLocale } from "./locale-provider";

interface TeamMember {
  name: string;
  role: { en: string; es: string };
  quote: { en: string; es: string };
  photo?: string;
  initials: string;
}

const team: TeamMember[] = [
  {
    name: "Replace with name",
    role: { en: "CEO & Founder", es: "CEO y Fundador" },
    quote: {
      en: "We started this because cloud shouldn't feel so lonely.",
      es: "Comenzamos esto porque la nube no debería sentirse tan solitaria.",
    },
    initials: "—",
  },
  {
    name: "Replace with name",
    role: { en: "CTO", es: "CTO" },
    quote: {
      en: "Good infra is boring infra — and that's the point.",
      es: "La buena infraestructura es aburrida — y ese es el punto.",
    },
    initials: "—",
  },
  {
    name: "Replace with name",
    role: {
      en: "Lead Cloud Engineer",
      es: "Ingeniera Cloud Principal",
    },
    quote: {
      en: "I love watching a pipeline go green on the first try.",
      es: "Me encanta ver un pipeline ponerse verde al primer intento.",
    },
    initials: "—",
  },
  {
    name: "Replace with name",
    role: {
      en: "Head of Customer Success",
      es: "Responsable de Éxito del Cliente",
    },
    quote: {
      en: "Every ticket is a chance to make someone's Monday better.",
      es: "Cada ticket es una oportunidad para mejorarle el lunes a alguien.",
    },
    initials: "—",
  },
];

export function TeamSection() {
  const { t, locale } = useLocale();

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="landing bg-[#1a1a17] text-[#faf8f3] py-24 md:py-32 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #faf8f3 1px, transparent 1px), linear-gradient(to bottom, #faf8f3 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-8">
            <h2
              id="team-title"
              className="text-5xl md:text-7xl font-light leading-[0.95] tracking-tight"
            >
              {t.team.title_a}
              <br />
              {t.team.title_b}{" "}
              <span className="italic text-[#a8b872]">{t.team.title_c}</span>
            </h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-lg leading-relaxed text-[#faf8f3]/75">
              {t.team.description}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#faf8f3]/15">
          {team.map((m, i) => (
            <article
              key={i}
              className="group border-r border-b border-[#faf8f3]/15 p-6 hover:bg-[#faf8f3]/[0.04] transition-colors"
            >
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#faf8f3]/5 border border-[#faf8f3]/10">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role[locale]} at AlamOps`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      className="text-[6rem] font-light leading-none text-[#a8b872]/30 italic"
                      aria-hidden
                    >
                      {m.initials}
                    </div>
                    <div className="mono text-[9px] tracking-[0.3em] uppercase text-[#faf8f3]/35 mt-4 px-6 text-center">
                      {t.team.photoSlot}
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3 mono text-[9px] tracking-[0.3em] uppercase text-[#faf8f3]/50">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#a8b872] mb-2">
                {m.role[locale]}
              </div>
              <h3 className="text-xl font-light tracking-tight mb-3">
                {m.name}
              </h3>
              <p className="text-sm leading-relaxed text-[#faf8f3]/65 italic">
                &ldquo;{m.quote[locale]}&rdquo;
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-[#faf8f3]/15 pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#a8b872] mb-3">
              {t.team.hiringKicker}
            </div>
            <p className="text-2xl md:text-3xl font-light tracking-tight max-w-2xl">
              {t.team.hiringText_a}{" "}
              <span className="italic text-[#a8b872]">
                {t.team.hiringText_b}
              </span>
            </p>
          </div>
          <a
            href="mailto:support@alamops.com?subject=I%20want%20to%20join%20AlamOps"
            className="mono text-[11px] tracking-[0.3em] uppercase bg-[#faf8f3] text-[#1a1a17] px-6 py-4 hover:bg-[#a8b872] transition-colors inline-flex items-center gap-2 w-max"
          >
            {t.team.apply} →
          </a>
        </div>
      </div>
    </section>
  );
}

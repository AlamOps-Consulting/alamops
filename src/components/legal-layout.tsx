import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface LegalPageProps {
  kicker: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle: string;
  updated: string;
  intro: string;
  sections: { id: string; num: string; title: string }[];
  children: React.ReactNode;
}

export function LegalPage({
  kicker,
  icon,
  title,
  subtitle,
  updated,
  intro,
  sections,
  children,
}: LegalPageProps) {
  return (
    <div className="landing min-h-screen bg-[#faf8f3] text-[#1a1a17]">
      {/* Slim top bar */}
      <header className="sticky top-0 z-40 bg-[#faf8f3]/90 backdrop-blur-sm border-b border-[#1a1a17]/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/70 hover:text-[#5a6a3a] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back home
          </Link>
          <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/50">
            {kicker}
          </div>
        </div>
      </header>

      {/* Article */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Masthead */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end border-b border-[#1a1a17]/15 pb-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-6">
              <span className="flex items-center justify-center w-9 h-9 border border-[#5a6a3a]/30 bg-[#5a6a3a]/5">
                {icon}
              </span>
              {kicker}
            </div>
            <h1 className="text-5xl md:text-7xl font-light leading-[0.95] tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-base text-[#1a1a17]/60">{subtitle}</p>
          </div>
          <div className="md:col-span-4 md:pb-3">
            <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/55">
              Last updated
            </div>
            <div className="mt-2 text-lg tracking-tight">{updated}</div>
          </div>
        </div>

        <p className="text-lg md:text-xl leading-relaxed text-[#1a1a17]/80 max-w-3xl mb-16 italic">
          {intro}
        </p>

        {/* Content grid: sticky TOC + body */}
        <div className="grid md:grid-cols-12 gap-10">
          {/* TOC */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/55 mb-5 border-b border-[#1a1a17]/15 pb-3">
                Contents
              </div>
              <ul className="space-y-3">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="group flex items-baseline gap-3"
                    >
                      <span className="mono text-[10px] tracking-[0.2em] text-[#1a1a17]/35 group-hover:text-[#5a6a3a] transition-colors w-6">
                        {s.num}
                      </span>
                      <span className="text-sm tracking-tight text-[#1a1a17]/75 group-hover:text-[#5a6a3a] group-hover:italic transition-all">
                        {s.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <article className="md:col-span-9 legal-prose">
            {children}
          </article>
        </div>
      </div>

      <style>{`
        .legal-prose p { font-size: 1.05rem; line-height: 1.75; color: rgba(26,26,23,0.82); margin: 0 0 1rem 0; }
        .legal-prose ul { list-style: none; padding: 0; margin: 0.75rem 0 1rem 0; }
        .legal-prose ul li { position: relative; padding-left: 1.75rem; margin-bottom: 0.6rem; font-size: 1rem; line-height: 1.7; color: rgba(26,26,23,0.8); }
        .legal-prose ul li::before { content: "—"; position: absolute; left: 0; top: 0; color: #5a6a3a; font-family: "JetBrains Mono", ui-monospace, monospace; }
      `}</style>
    </div>
  );
}

export function LegalSection({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10 border-b border-[#1a1a17]/10 first:pt-0">
      <header className="flex items-baseline gap-6 mb-6">
        <span className="mono text-[11px] tracking-[0.25em] text-[#5a6a3a] pt-1">
          {num}
        </span>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight">
          {title}
        </h2>
      </header>
      <div className="md:pl-16">{children}</div>
    </section>
  );
}

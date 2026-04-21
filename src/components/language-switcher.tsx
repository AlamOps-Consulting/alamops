"use client";

import { useLocale } from "./locale-provider";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const options: Locale[] = ["en", "es"];

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center border border-[#1a1a17]/20 overflow-hidden"
    >
      {options.map((l, i) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`mono text-[10px] tracking-[0.3em] uppercase px-2.5 py-2.5 transition-colors ${
              active
                ? "bg-[#1a1a17] text-[#faf8f3]"
                : "text-[#1a1a17]/60 hover:text-[#1a1a17]"
            } ${i > 0 ? "border-l border-[#1a1a17]/20" : ""}`}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

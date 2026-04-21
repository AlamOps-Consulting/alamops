"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "./locale-provider";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, id: "hero" },
    { label: t.nav.services, id: "services" },
    { label: t.nav.product, id: "product" },
    { label: t.nav.news, id: "news" },
    { label: t.nav.contact, id: "contact" },
  ];

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled
          ? "bg-[#faf8f3]/95 backdrop-blur-sm border-b border-[#1a1a17]/10"
          : "bg-transparent"
      }`}
      aria-label="Primary"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="AlamOps home">
          <div className="relative w-8 h-8">
            <Image
              src="/alamops-logo.svg"
              alt="AlamOps logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-light tracking-tight text-[#1a1a17]">
            Alam<span className="italic font-normal text-[#5a6a3a]">Ops.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm tracking-tight text-[#1a1a17]/80 hover:text-[#5a6a3a] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="https://iac.alamops.com/"
            className="mono text-[10px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-4 py-3 hover:bg-[#5a6a3a] transition-colors"
          >
            {t.nav.launch} →
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher />
          <button
            className="text-[#1a1a17]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#faf8f3] border-t border-[#1a1a17]/10">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full flex items-baseline justify-between py-3 border-b border-[#1a1a17]/10"
              >
                <span className="text-lg tracking-tight text-[#1a1a17]">
                  {item.label}
                </span>
                <span className="mono text-[10px] tracking-[0.25em] text-[#1a1a17]/40">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "./locale-provider";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="landing bg-[#1a1a17] text-[#faf8f3] pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 border-b border-[#faf8f3]/15 pb-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="AlamOps home"
            >
              <div className="relative w-10 h-10 bg-[#faf8f3] p-1.5">
                <Image
                  src="/alamops-logo.svg"
                  alt="AlamOps logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="text-4xl font-light tracking-tight leading-none">
                Alam<span className="italic text-[#a8b872]">Ops.</span>
              </span>
            </Link>
            <p className="mt-6 text-base leading-relaxed text-[#faf8f3]/65 max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="https://www.linkedin.com/company/105381523/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#faf8f3]/60 hover:text-[#a8b872] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/alamopsconsulting/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#faf8f3]/60 hover:text-[#a8b872] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61583101425689"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#faf8f3]/60 hover:text-[#a8b872] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <FooterCol
            title={t.footer.cols.services}
            links={[
              { label: t.footer.links.multiCloud, href: "#services" },
              { label: t.footer.links.security, href: "#services" },
              { label: t.footer.links.devops, href: "#services" },
              { label: t.footer.links.finops, href: "#services" },
            ]}
          />
          <FooterCol
            title={t.footer.cols.company}
            links={[
              { label: t.footer.links.about, href: "#hero" },
              { label: t.footer.links.news, href: "#news" },
            ]}
          />
          <FooterCol
            title={t.footer.cols.legal}
            links={[
              { label: t.footer.links.privacy, href: "/privacy" },
              { label: t.footer.links.terms, href: "/terms" },
              {
                label: t.footer.links.contact,
                href: "https://calendly.com/ceo-alamops",
              },
            ]}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 mono text-[10px] tracking-[0.3em] uppercase text-[#faf8f3]/45">
          <span>
            © {new Date().getFullYear()} AlamOps. {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="md:col-span-2">
      <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#a8b872] mb-5">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-base tracking-tight text-[#faf8f3]/70 hover:text-[#faf8f3] hover:italic transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

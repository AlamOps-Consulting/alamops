"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/utils";
import { useLocale } from "./locale-provider";

function deriveNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const cleaned = local.replace(/[._\-+]+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function NewsletterSection() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const name = deriveNameFromEmail(email);
      const response = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (response.status === 201) {
        toast.success(t.newsletter.toast.success, {
          description: t.newsletter.toast.successDesc,
        });
        setEmail("");
      } else if (response.status === 409) {
        toast.info(t.newsletter.toast.already);
      } else if (response.status === 400) {
        toast.error(t.newsletter.toast.invalid);
      } else {
        toast.error(t.newsletter.toast.fail);
      }
    } catch {
      toast.error(t.newsletter.toast.offline);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      aria-labelledby="newsletter-title"
      className="landing bg-[#faf8f3] text-[#1a1a17] py-20 md:py-28 border-t border-[#1a1a17]/10"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 border border-[#5a6a3a]/30 bg-[#5a6a3a]/5 mb-8">
          <Mail className="w-5 h-5 text-[#5a6a3a]" />
        </div>

        <h2
          id="newsletter-title"
          className="text-4xl md:text-5xl font-light leading-[1] tracking-tight mb-4"
        >
          {t.newsletter.title_a}{" "}
          <span className="italic text-[#5a6a3a]">
            {t.newsletter.title_b}
          </span>
        </h2>
        <p className="text-base leading-relaxed text-[#1a1a17]/70 max-w-lg mx-auto mb-10">
          {t.newsletter.description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder={t.newsletter.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={sending}
            aria-label="Email address"
            className="flex-1 bg-transparent border border-[#1a1a17]/25 px-4 py-3 text-base tracking-tight focus:outline-none focus:border-[#5a6a3a] transition-colors"
            style={{ fontFamily: "inherit" }}
          />
          <button
            type="submit"
            disabled={sending}
            className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-3 hover:bg-[#5a6a3a] transition-colors disabled:opacity-60"
          >
            {sending ? t.newsletter.subscribing : t.newsletter.subscribe}
          </button>
        </form>
        <p className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/45 mt-4">
          {t.newsletter.footnote}
        </p>
      </div>
    </section>
  );
}

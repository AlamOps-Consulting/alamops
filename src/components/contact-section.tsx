"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "./locale-provider";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

export function ContactSection() {
  const { t } = useLocale();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const SERVICE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_c0gabxh";
  const TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_xebilip";
  const USER_ID =
    process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "iEVrBKwqOvCLICTdh";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_name: "AlamOps",
          from_name: form.name,
          from_email: form.email,
          company: form.company,
          phone: form.phone,
          message: form.message,
        },
        USER_ID
      );
      toast.success(t.contact.toast.success, {
        description: t.contact.toast.successDesc,
      });
      setForm({ name: "", email: "", company: "", phone: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error(t.contact.toast.fail);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="landing bg-[#faf8f3] text-[#1a1a17] py-20 md:py-28 border-t border-[#1a1a17]/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2
            id="contact-title"
            className="text-4xl md:text-5xl font-light leading-[1] tracking-tight mb-4"
          >
            {t.contact.title_a}
            <span className="italic text-[#5a6a3a]">{t.contact.title_b}</span>
          </h2>
          <p className="text-base leading-relaxed text-[#1a1a17]/75">
            {t.contact.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="border border-[#1a1a17]/15 bg-white/50 p-6 md:p-8"
          >
            <h3 className="text-2xl font-light tracking-tight mb-2">
              {t.contact.formTitle}
            </h3>
            <p className="text-sm text-[#1a1a17]/65 mb-6">
              {t.contact.formSubtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <LabeledInput
                id="name"
                name="name"
                label={t.contact.fields.name}
                placeholder={t.contact.fields.namePh}
                value={form.name}
                onChange={handleChange}
                required
              />
              <LabeledInput
                id="email"
                name="email"
                type="email"
                label={t.contact.fields.email}
                placeholder={t.contact.fields.emailPh}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <LabeledInput
                id="company"
                name="company"
                label={t.contact.fields.company}
                placeholder={t.contact.fields.companyPh}
                value={form.company}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <LabeledInput
                id="phone"
                name="phone"
                label={t.contact.fields.phone}
                placeholder={t.contact.fields.phonePh}
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="mono block text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 mb-2"
              >
                {t.contact.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                placeholder={t.contact.fields.messagePh}
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full bg-transparent border border-[#1a1a17]/25 px-4 py-3 text-base focus:outline-none focus:border-[#5a6a3a] transition-colors resize-none"
                style={{ fontFamily: "inherit" }}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] py-4 hover:bg-[#5a6a3a] transition-colors disabled:opacity-60"
            >
              {sending ? t.contact.sending : t.contact.send}
            </button>
          </form>

          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-light tracking-tight">
              {t.contact.info}
            </h3>

            <InfoRow
              icon={<Mail className="w-4 h-4" />}
              label={t.contact.labels.email}
              value={t.contact.values.email}
            />
            <InfoRow
              icon={<Phone className="w-4 h-4" />}
              label={t.contact.labels.phone}
              value={t.contact.values.phone}
            />
            <InfoRow
              icon={<MapPin className="w-4 h-4" />}
              label={t.contact.labels.office}
              value={t.contact.values.office}
            />

            <div className="border border-[#5a6a3a]/30 bg-[#5a6a3a]/5 p-6 mt-4">
              <h4 className="text-lg font-light tracking-tight mb-2">
                {t.contact.urgentTitle}
              </h4>
              <p className="text-sm leading-relaxed text-[#1a1a17]/70 mb-4">
                {t.contact.urgentText}
              </p>
              <a
                href="https://calendly.com/ceo-alamops"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-[10px] tracking-[0.3em] uppercase border border-[#1a1a17]/30 px-4 py-2 hover:border-[#5a6a3a] hover:text-[#5a6a3a] transition-colors inline-block"
              >
                {t.contact.urgentCta} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabeledInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mono block text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border border-[#1a1a17]/25 px-4 py-3 text-base focus:outline-none focus:border-[#5a6a3a] transition-colors"
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 border border-[#5a6a3a]/30 bg-[#5a6a3a]/5 text-[#5a6a3a] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/55 mb-1">
          {label}
        </div>
        <div className="text-base tracking-tight">{value}</div>
      </div>
    </div>
  );
}

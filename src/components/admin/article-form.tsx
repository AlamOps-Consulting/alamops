"use client";

import { useState } from "react";

export const CATEGORIES = [
  "All",
  "Certifications",
  "Products",
  "Expansion",
  "Security",
  "Team",
  "Innovation",
  "Business",
  "Partnerships",
];

export interface ArticleInitial {
  title?: string;
  category?: string;
  content?: string;
  author?: string;
  readTime?: number;
  icon?: string;
  featured?: boolean;
  imageUrl?: string;
}

interface Props {
  mode: "create" | "edit";
  initial?: ArticleInitial;
  submitLabel: string;
  submittingLabel: string;
  loading: boolean;
  onSubmit: (fd: FormData) => void | Promise<void>;
  onCancel: () => void;
}

export function ArticleForm({
  initial,
  submitLabel,
  submittingLabel,
  loading,
  onSubmit,
  onCancel,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const imageFile = fd.get("image") as File | null;
    if (!imageFile || imageFile.size === 0) fd.delete("image");
    await onSubmit(fd);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-4xl">
      {/* Primary block — Title & excerpt of metadata */}
      <section className="space-y-10">
        <Field
          id="title"
          name="title"
          label="Title"
          index="01"
          required
          defaultValue={initial?.title ?? ""}
          placeholder="Make it honest and specific"
          size="xl"
        />

        <div className="grid md:grid-cols-2 gap-10">
          <SelectField
            id="category"
            name="category"
            label="Category"
            index="02"
            required
            defaultValue={initial?.category ?? ""}
          />
          <Field
            id="author"
            name="author"
            label="Author"
            index="03"
            defaultValue={initial?.author ?? ""}
            placeholder="AlamOps Team"
          />
        </div>
      </section>

      {/* Content block */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <label
            htmlFor="content"
            className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60"
          >
            Body <span className="text-[#1a1a17]/30">— HTML allowed</span>
          </label>
          <span className="mono text-[10px] tracking-[0.25em] text-[#1a1a17]/30">
            04
          </span>
        </div>
        <textarea
          id="content"
          name="content"
          required
          rows={14}
          defaultValue={initial?.content ?? ""}
          placeholder="<p>Write the article here&hellip;</p>"
          className="w-full bg-transparent border border-[#1a1a17]/15 px-5 py-4 text-base leading-relaxed text-[#1a1a17] placeholder:text-[#1a1a17]/25 focus:outline-none focus:border-[#5a6a3a] transition-colors resize-y"
          style={{ fontFamily: "inherit" }}
        />
      </section>

      {/* Meta block */}
      <section className="grid md:grid-cols-3 gap-10">
        <Field
          id="readTime"
          name="readTime"
          label="Read time"
          suffix="min"
          index="05"
          type="number"
          min={1}
          defaultValue={
            initial?.readTime !== undefined ? String(initial.readTime) : ""
          }
          placeholder="5"
        />
        <Field
          id="icon"
          name="icon"
          label="Icon"
          hint="emoji"
          index="06"
          maxLength={8}
          defaultValue={initial?.icon ?? ""}
          placeholder="☁️"
        />
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60">
              Featured
            </span>
            <span className="mono text-[10px] tracking-[0.25em] text-[#1a1a17]/30">
              07
            </span>
          </div>
          <label className="group flex items-center gap-3 cursor-pointer pt-2">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              value="true"
              defaultChecked={!!initial?.featured}
              className="peer sr-only"
            />
            <span className="relative inline-flex w-10 h-5 border border-[#1a1a17]/30 bg-transparent peer-checked:bg-[#5a6a3a] peer-checked:border-[#5a6a3a] transition-colors">
              <span className="absolute top-[2px] left-[2px] w-[14px] h-[14px] bg-[#1a1a17]/60 peer-checked:[.peer:checked+span&]:bg-[#faf8f3] transition-all peer-checked:translate-x-[20px]" />
            </span>
            <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 group-hover:text-[#1a1a17]">
              Mark on homepage
            </span>
          </label>
        </div>
      </section>

      {/* Cover image */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60">
            Cover image
          </span>
          <span className="mono text-[10px] tracking-[0.25em] text-[#1a1a17]/30">
            08
          </span>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-6 items-start">
          <div className="relative aspect-[4/3] border border-[#1a1a17]/15 bg-[#1a1a17]/[0.03] overflow-hidden">
            {preview || initial?.imageUrl ? (
              <img
                src={preview ?? initial?.imageUrl}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="text-[3rem] leading-none text-[#5a6a3a]/30 italic font-light">
                  —
                </div>
                <div className="mono text-[9px] tracking-[0.3em] uppercase text-[#1a1a17]/40">
                  no cover
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="image"
              className="group cursor-pointer inline-flex items-center justify-between border border-dashed border-[#1a1a17]/30 px-5 py-4 hover:border-[#5a6a3a] transition-colors"
            >
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/70 group-hover:text-[#5a6a3a]">
                {preview ? "Replace file…" : "Choose file…"}
              </span>
              <span className="mono text-[10px] tracking-[0.25em] text-[#1a1a17]/30">
                png · jpg · webp
              </span>
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
            <p className="mono text-[9px] tracking-[0.25em] uppercase text-[#1a1a17]/40">
              {initial?.imageUrl
                ? "Leave empty to keep current image."
                : "Recommended 1600×900 or larger."}
            </p>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="flex items-center gap-6 pt-10 border-t border-[#1a1a17]/15">
        <button
          type="submit"
          disabled={loading}
          className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-8 py-4 hover:bg-[#5a6a3a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {loading ? submittingLabel : submitLabel}
          <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 hover:text-[#1a1a17] transition-colors disabled:opacity-40"
        >
          Cancel
        </button>
      </section>
    </form>
  );
}

/* ── Field primitives ─────────────────────────────────────────── */

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  index: string;
  hint?: string;
  suffix?: string;
  size?: "md" | "xl";
}

function Field({
  label,
  index,
  hint,
  suffix,
  size = "md",
  className,
  ...rest
}: FieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label
          htmlFor={rest.id}
          className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60"
        >
          {label}
          {hint ? (
            <span className="text-[#1a1a17]/30"> — {hint}</span>
          ) : null}
          {suffix ? (
            <span className="text-[#1a1a17]/30"> ({suffix})</span>
          ) : null}
        </label>
        <span className="mono text-[10px] tracking-[0.25em] text-[#1a1a17]/30">
          {index}
        </span>
      </div>
      <input
        {...rest}
        className={[
          "w-full bg-transparent border-0 border-b border-[#1a1a17]/30 pb-2 text-[#1a1a17] placeholder:text-[#1a1a17]/25 focus:outline-none focus:border-[#5a6a3a] transition-colors",
          size === "xl"
            ? "text-3xl md:text-4xl tracking-tight font-light"
            : "text-lg tracking-tight",
          className ?? "",
        ].join(" ")}
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  index: string;
}

function SelectField({ label, index, ...rest }: SelectFieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label
          htmlFor={rest.id}
          className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60"
        >
          {label}
        </label>
        <span className="mono text-[10px] tracking-[0.25em] text-[#1a1a17]/30">
          {index}
        </span>
      </div>
      <div className="relative">
        <select
          {...rest}
          className="w-full bg-transparent border-0 border-b border-[#1a1a17]/30 pb-2 text-lg tracking-tight text-[#1a1a17] appearance-none focus:outline-none focus:border-[#5a6a3a] transition-colors pr-8"
          style={{ fontFamily: "inherit" }}
        >
          <option value="">Select…</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-1 bottom-2 mono text-[10px] tracking-[0.25em] text-[#1a1a17]/40"
        >
          ▾
        </span>
      </div>
    </div>
  );
}

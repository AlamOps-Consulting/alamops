"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { createNews } from "@/lib/admin-api";
import { ArticleForm } from "@/components/admin/article-form";

export default function NewNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(fd: FormData) {
    setLoading(true);
    try {
      await createNews(fd);
      toast.success("Article created");
      router.push("/admin/news");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create article"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-14">
        <Link
          href="/admin/news"
          className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 hover:text-[#5a6a3a] transition-colors inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to catalogue
        </Link>

        <div className="flex items-end justify-between border-b border-[#1a1a17]/15 pb-8">
          <div>
            <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-3">
              / 01 &nbsp; Draft
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              New <span className="italic text-[#5a6a3a]">article.</span>
            </h1>
            <p className="mono text-[11px] tracking-[0.2em] uppercase text-[#1a1a17]/50 mt-4">
              Write it like you mean it.
            </p>
          </div>
        </div>
      </div>

      <ArticleForm
        mode="create"
        loading={loading}
        submitLabel="Publish article"
        submittingLabel="Publishing…"
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </div>
  );
}

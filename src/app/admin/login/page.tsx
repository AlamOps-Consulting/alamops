"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const username = fd.get("username") as string;
    const password = fd.get("password") as string;

    try {
      const { token } = await login(username, password);
      const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toUTCString();
      document.cookie = `admin_token=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Strict`;
      router.push("/admin/news");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=JetBrains+Mono:wght@400&display=swap");
        .login-root { font-family: "Fraunces", "Times New Roman", serif; }
        .login-root .mono { font-family: "JetBrains Mono", ui-monospace, monospace; }
      `}</style>

      <div className="login-root min-h-screen w-full bg-[#faf8f3] text-[#1a1a17] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-5xl font-light tracking-tight mb-2">
            Sign <span className="italic text-[#5a6a3a]">in.</span>
          </h1>
          <p className="mono text-[11px] tracking-[0.25em] uppercase text-[#1a1a17]/50 mb-12">
            AlamOps / CMS
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Field
              id="username"
              name="username"
              type="text"
              label="Operator"
              autoComplete="username"
            />
            <Field
              id="password"
              name="password"
              type="password"
              label="Secret"
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a17] text-[#faf8f3] py-4 mono text-[11px] tracking-[0.3em] uppercase hover:bg-[#5a6a3a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying…" : "Enter →"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

interface FieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  autoComplete?: string;
}

function Field({ id, name, type, label, autoComplete }: FieldProps) {
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
        required
        autoComplete={autoComplete}
        className="w-full bg-transparent border-0 border-b border-[#1a1a17]/30 pb-2 text-lg tracking-tight text-[#1a1a17] focus:outline-none focus:border-[#5a6a3a] transition-colors"
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
}

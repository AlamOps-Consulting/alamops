"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "News", href: "/admin/news", index: "01" },
  { label: "Newsletters", href: "/admin/newsletters", index: "02" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  }

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=JetBrains+Mono:wght@400;500&display=swap");
        .admin-shell { font-family: "Fraunces", "Times New Roman", serif; }
        .admin-shell .mono { font-family: "JetBrains Mono", ui-monospace, monospace; }
        .admin-shell {
          --ink: #1a1a17;
          --cream: #faf8f3;
          --olive: #5a6a3a;
          --hairline: rgba(26, 26, 23, 0.15);
          --muted: rgba(26, 26, 23, 0.55);
          --faint: rgba(26, 26, 23, 0.06);
        }
      `}</style>

      <div className="admin-shell min-h-screen flex bg-[#faf8f3] text-[#1a1a17]">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 flex flex-col border-r border-[#1a1a17]/15 px-8 py-10">
          <div className="mb-14">
            <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/50 mb-2">
              /// CMS
            </div>
            <h1 className="text-3xl font-light leading-none tracking-tight">
              Alam<span className="italic font-normal text-[#5a6a3a]">Ops.</span>
            </h1>
          </div>

          <nav className="flex-1 space-y-1">
            <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/40 mb-4">
              Sections
            </div>
            {navItems.map(({ label, href, index }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link key={href} href={href} className="group block py-3">
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-lg tracking-tight transition-colors ${
                        active
                          ? "text-[#5a6a3a] italic"
                          : "text-[#1a1a17]/80 group-hover:text-[#1a1a17]"
                      }`}
                    >
                      {label}
                    </span>
                    <span
                      className={`mono text-[10px] tracking-[0.25em] transition-colors ${
                        active ? "text-[#5a6a3a]" : "text-[#1a1a17]/30"
                      }`}
                    >
                      {index}
                    </span>
                  </div>
                  <div
                    className={`mt-2 h-px transition-all ${
                      active ? "bg-[#5a6a3a]" : "bg-[#1a1a17]/10 group-hover:bg-[#1a1a17]/30"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/50 hover:text-[#1a1a17] transition-colors text-left pt-6 border-t border-[#1a1a17]/10"
          >
            ← Sign out
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto px-12 py-14">{children}</main>
      </div>
    </>
  );
}

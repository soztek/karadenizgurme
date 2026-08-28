import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Yönetim Girişi",
  robots: { index: false, follow: false },
};

// Giriş sayfası statik önizlenmemeli (useSearchParams + runtime env kontrolü)
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand px-4 pattern-topo">
      <div className="w-full max-w-sm rounded-[var(--radius-card)] bg-ivory p-8 shadow-xl">
        <div className="text-center">
          <span className="font-display text-2xl font-semibold text-brand">
            Karadeniz Gurme
          </span>
          <p className="mt-1 text-sm text-charcoal/60">Yönetim Paneli</p>
        </div>

        {isSupabaseConfigured ? (
          <Suspense fallback={<div className="mt-6 h-40" />}>
            <LoginForm />
          </Suspense>
        ) : (
          <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
            Supabase yapılandırması bulunamadı. Yönetim paneline giriş için{" "}
            <code>.env.local</code> dosyasındaki Supabase anahtarlarını
            tanımlayın. (README&apos;deki kurulum adımlarına bakın.)
          </div>
        )}
      </div>
    </main>
  );
}

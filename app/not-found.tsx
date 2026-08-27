import Link from "next/link";
import { Home, UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
      <span className="font-display text-6xl font-semibold text-brand">404</span>
      <h1 className="mt-4 text-2xl font-semibold text-brand">
        Sayfa Bulunamadı
      </h1>
      <p className="mt-2 max-w-md text-charcoal/65">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Sizi menümüze veya
        ana sayfaya götürelim.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-600"
        >
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Link>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-cream"
        >
          <UtensilsCrossed className="h-4 w-4" />
          Menü
        </Link>
      </div>
    </main>
  );
}

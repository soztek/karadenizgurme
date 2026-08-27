import Link from "next/link";
import { Navigation, PlugZap, Utensils, Fuel, LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { SiteSettings } from "@/lib/types";

export function QuickAccess({ settings }: { settings: SiteSettings }) {
  const directionsHref = settings.google_maps_url || "/yol-tarifi";
  const directionsExternal = Boolean(settings.google_maps_url);

  const links: {
    label: string;
    href: string;
    icon: typeof Navigation;
    external?: boolean;
    primary?: boolean;
  }[] = [
    {
      label: "Hemen Yol Tarifi Al",
      href: directionsHref,
      icon: Navigation,
      external: directionsExternal,
      primary: true,
    },
    { label: "Şarj İstasyonu", href: "/tesis#ev_sarj", icon: PlugZap },
    { label: "Açık Restoranlar", href: "/tesis#restoran", icon: Utensils },
    { label: "Akaryakıt", href: "/tesis#akaryakit", icon: Fuel },
    { label: "Tüm Olanaklar", href: "/tesis", icon: LayoutGrid },
  ];

  return (
    <section className="border-b border-brand/10 bg-white/80 backdrop-blur">
      <Container className="py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:justify-center">
          {links.map((l) => {
            const Icon = l.icon;
            const cls = l.primary
              ? "shrink-0 inline-flex items-center gap-2 rounded-full bg-red px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-colors hover:bg-red-600"
              : "shrink-0 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:border-mustard hover:text-mustard-700";
            const inner = (
              <>
                <Icon className="h-4 w-4" />
                {l.label}
              </>
            );
            return l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <Link key={l.label} href={l.href} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

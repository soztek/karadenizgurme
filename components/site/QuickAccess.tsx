import Link from "next/link";
import { Navigation, PlugZap, Utensils, Fuel, LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DirectionsButton } from "@/components/site/DirectionsButton";
import { directionsTargets } from "@/lib/directions";
import type { SiteSettings } from "@/lib/types";

export function QuickAccess({ settings }: { settings: SiteSettings }) {
  const targets = directionsTargets(settings);

  const links = [
    { label: "Şarj İstasyonu", href: "/tesis#ev_sarj", icon: PlugZap },
    { label: "Açık Restoranlar", href: "/tesis#restoran", icon: Utensils },
    { label: "Akaryakıt", href: "/tesis#akaryakit", icon: Fuel },
    { label: "Tüm Olanaklar", href: "/tesis", icon: LayoutGrid },
  ];

  const secondaryCls =
    "shrink-0 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:border-mustard hover:text-mustard-700";

  return (
    <section className="border-b border-brand/10 bg-white/80 backdrop-blur">
      <Container className="py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:justify-center">
          <DirectionsButton
            targets={targets}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-red px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-colors hover:bg-red-600"
          >
            <Navigation className="h-4 w-4" />
            Hemen Yol Tarifi Al
          </DirectionsButton>
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.label} href={l.href} className={secondaryCls}>
                <Icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

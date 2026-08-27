import Link from "next/link";
import { UtensilsCrossed, Navigation, Phone, MessageCircle } from "lucide-react";
import { telLink, whatsappLink } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export function MobileQuickBar({ settings }: { settings: SiteSettings }) {
  const items = [
    {
      key: "menu",
      label: "Menü",
      href: "/menu",
      icon: UtensilsCrossed,
      external: false,
      enabled: true,
    },
    {
      key: "yol",
      label: "Yol Tarifi",
      href: settings.google_maps_url || "/yol-tarifi",
      icon: Navigation,
      external: Boolean(settings.google_maps_url),
      enabled: true,
    },
    {
      key: "tel",
      label: "Telefon",
      href: settings.phone ? telLink(settings.phone) : "/iletisim",
      icon: Phone,
      external: false,
      enabled: true,
    },
    {
      key: "wa",
      label: "WhatsApp",
      href: settings.whatsapp ? whatsappLink(settings.whatsapp) : "/iletisim",
      icon: MessageCircle,
      external: Boolean(settings.whatsapp),
      enabled: true,
    },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand/10 bg-ivory/95 backdrop-blur lg:hidden"
      aria-label="Hızlı işlemler"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {items.map((it) => {
          const Icon = it.icon;
          const isDirections = it.key === "yol";
          const content = (
            <span
              className={
                isDirections
                  ? "flex flex-col items-center gap-1 bg-red py-2.5 text-[11px] font-semibold text-white"
                  : "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-brand"
              }
            >
              <Icon
                className={isDirections ? "h-5 w-5 text-white" : "h-5 w-5 text-mustard"}
              />
              {it.label}
            </span>
          );
          return (
            <li key={it.key} className="text-center">
              {it.external ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block active:opacity-90"
                >
                  {content}
                </a>
              ) : (
                <Link href={it.href} className="block active:opacity-90">
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

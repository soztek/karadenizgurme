import Link from "next/link";
import { UtensilsCrossed, Navigation, Phone, MessageCircle } from "lucide-react";
import { DirectionsButton } from "@/components/site/DirectionsButton";
import { directionsTargets } from "@/lib/directions";
import { telLink, whatsappLink } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export function MobileQuickBar({ settings }: { settings: SiteSettings }) {
  const targets = directionsTargets(settings);
  const items = [
    {
      key: "menu",
      label: "Menü",
      href: "/menu",
      icon: UtensilsCrossed,
      external: false,
    },
    {
      key: "tel",
      label: "Telefon",
      href: settings.phone ? telLink(settings.phone) : "/iletisim",
      icon: Phone,
      external: false,
    },
    {
      key: "wa",
      label: "WhatsApp",
      href: settings.whatsapp ? whatsappLink(settings.whatsapp) : "/iletisim",
      icon: MessageCircle,
      external: Boolean(settings.whatsapp),
    },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand/10 bg-ivory/95 backdrop-blur lg:hidden"
      aria-label="Hızlı işlemler"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {(() => {
          const menuItem = items[0];
          const MenuIcon = menuItem.icon;
          return (
            <li key={menuItem.key} className="text-center">
              <Link href={menuItem.href} className="block active:opacity-90">
                <span className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-brand">
                  <MenuIcon className="h-5 w-5 text-mustard" />
                  {menuItem.label}
                </span>
              </Link>
            </li>
          );
        })()}

        <li className="text-center">
          <DirectionsButton
            targets={targets}
            className="block w-full active:opacity-90"
          >
            <span className="flex flex-col items-center gap-1 bg-red py-2.5 text-[11px] font-semibold text-white">
              <Navigation className="h-5 w-5 text-white" />
              Yol Tarifi
            </span>
          </DirectionsButton>
        </li>

        {items.slice(1).map((it) => {
          const Icon = it.icon;
          const content = (
            <span className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-brand">
              <Icon className="h-5 w-5 text-mustard" />
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

import Link from "next/link";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/constants";
import { DEFAULT_FOOTER } from "@/lib/defaults";
import { telLink, whatsappLink } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 bg-charcoal text-cream">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-xl font-semibold">
              Karadeniz Gurme
            </span>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-mustard-400">
              Oksijen 266
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/75">
              {DEFAULT_FOOTER.about}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/60">
              Sayfalar
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream/80 transition-colors hover:text-mustard-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/yol-tarifi"
                  className="text-cream/80 transition-colors hover:text-mustard-400"
                >
                  Yol Tarifi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/60">
              İletişim
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              {settings.address ? (
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mustard-400" />
                  <span>{settings.address}</span>
                </li>
              ) : null}
              {settings.phone ? (
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mustard-400" />
                  <a href={telLink(settings.phone)} className="hover:text-mustard-400">
                    {settings.phone}
                  </a>
                </li>
              ) : null}
              {settings.whatsapp ? (
                <li className="flex gap-2.5">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-mustard-400" />
                  <a
                    href={whatsappLink(settings.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-mustard-400"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
              {settings.working_hours ? (
                <li className="flex gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-mustard-400" />
                  <span>{settings.working_hours}</span>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/60">
              Takip Edin
            </h3>
            {settings.instagram_url ? (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-cream/20"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
            ) : null}
            <div className="mt-6 space-y-1.5 text-xs text-cream/60">
              <Link href="/kvkk" className="block hover:text-mustard-400">
                KVKK Aydınlatma Metni
              </Link>
              <Link href="/gizlilik" className="block hover:text-mustard-400">
                Gizlilik ve Çerez Politikası
              </Link>
              <Link href="/admin" className="block hover:text-mustard-400">
                Yönetim Paneli
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6 text-center text-xs text-cream/55">
          © {year} {DEFAULT_FOOTER.copyright}. Tüm hakları saklıdır.
          <span className="mx-1.5">·</span>
          Oksijen 266 dinlenme tesisi içinde hizmet vermektedir.
        </div>
      </Container>
    </footer>
  );
}

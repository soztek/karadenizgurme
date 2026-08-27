import { MapPin, Phone, Clock, Navigation, ArrowRightFromLine } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { telLink } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

function MapEmbed({ settings }: { settings: SiteSettings }) {
  const hasCoords = settings.map_lat != null && settings.map_lng != null;
  if (hasCoords) {
    const src = `https://www.google.com/maps?q=${settings.map_lat},${settings.map_lng}&hl=tr&z=15&output=embed`;
    return (
      <iframe
        title="Karadeniz Gurme konum haritası"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[320px] w-full rounded-[var(--radius-card)] border-0"
      />
    );
  }
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-[var(--radius-card)] bg-cream pattern-topo p-8 text-center">
      <MapPin className="h-10 w-10 text-brand/40" />
      <p className="mt-3 max-w-xs text-sm text-charcoal/60">
        Harita konumu, koordinatlar yönetim panelinden girildiğinde burada
        görüntülenecektir.
      </p>
    </div>
  );
}

export function DirectionsSection({
  settings,
  showDirections = false,
  withHeading = true,
}: {
  settings: SiteSettings;
  showDirections?: boolean;
  withHeading?: boolean;
}) {
  const mapButtons = [
    { label: "Google Maps", url: settings.google_maps_url },
    { label: "Yandex Navigasyon", url: settings.yandex_maps_url },
    { label: "Apple Maps", url: settings.apple_maps_url },
  ].filter((b) => b.url);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        {withHeading ? (
          <SectionHeading
            eyebrow="Bize Ulaşın"
            title="Yol Tarifi & Konum"
            subtitle="İstanbul–İzmir Otoyolu üzerinde, Oksijen 266 dinlenme tesisi içinde hizmetinizdeyiz."
          />
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <MapEmbed settings={settings} />

          <div className="flex flex-col justify-center">
            <ul className="space-y-4">
              {settings.address ? (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mustard" />
                  <div>
                    <p className="text-sm font-semibold text-brand">Adres</p>
                    <p className="text-sm text-charcoal/70">{settings.address}</p>
                  </div>
                </li>
              ) : null}
              {settings.phone ? (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-mustard" />
                  <div>
                    <p className="text-sm font-semibold text-brand">Telefon</p>
                    <a
                      href={telLink(settings.phone)}
                      className="text-sm text-charcoal/70 hover:text-mustard"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </li>
              ) : null}
              {settings.working_hours ? (
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-mustard" />
                  <div>
                    <p className="text-sm font-semibold text-brand">
                      Çalışma Saatleri
                    </p>
                    <p className="text-sm text-charcoal/70">
                      {settings.working_hours}
                    </p>
                  </div>
                </li>
              ) : null}
            </ul>

            {mapButtons.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {mapButtons.map((b, i) => (
                  <a
                    key={b.label}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      i === 0
                        ? "inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-colors hover:bg-red-600"
                        : "inline-flex items-center gap-2 rounded-full border border-brand/20 px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-cream"
                    }
                  >
                    <Navigation className="h-4 w-4" />
                    {b.label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-lg bg-cream-200/70 px-4 py-3 text-sm text-charcoal/60">
                Harita bağlantıları (Google, Yandex, Apple) yönetim panelinden
                eklendiğinde burada gösterilecektir.
              </p>
            )}
          </div>
        </div>

        {showDirections ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-6">
              <div className="flex items-center gap-2 text-brand">
                <ArrowRightFromLine className="h-5 w-5 text-mustard" />
                <h3 className="text-lg font-semibold">
                  İstanbul Yönünden Gelenler
                </h3>
              </div>
              {settings.km_istanbul ? (
                <p className="mt-2 inline-flex rounded-full bg-mustard/15 px-3 py-1 text-sm font-semibold text-mustard-700">
                  {settings.km_istanbul}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                {settings.direction_istanbul}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-6">
              <div className="flex items-center gap-2 text-brand">
                <ArrowRightFromLine className="h-5 w-5 rotate-180 text-mustard" />
                <h3 className="text-lg font-semibold">
                  İzmir Yönünden Gelenler
                </h3>
              </div>
              {settings.km_izmir ? (
                <p className="mt-2 inline-flex rounded-full bg-mustard/15 px-3 py-1 text-sm font-semibold text-mustard-700">
                  {settings.km_izmir}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                {settings.direction_izmir}
              </p>
            </div>
            {settings.entry_info ? (
              <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-6 sm:col-span-2">
                <div className="flex items-center gap-2 text-brand">
                  <Navigation className="h-5 w-5 text-mustard" />
                  <h3 className="text-lg font-semibold">Giriş Bilgisi</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  {settings.entry_info}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

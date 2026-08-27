import type { Metadata } from "next";
import { Navigation, MapPin, Milestone, LogIn, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { Amenities } from "@/components/site/Amenities";
import { FacilityCatalog } from "@/components/site/FacilityCatalog";
import { WeatherWidget } from "@/components/site/WeatherWidget";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";
import { getSettings, getFacilityItems, getAmenities } from "@/lib/data";
import { telLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tesis Rehberi",
  description:
    "Oksijen 266 dinlenme tesisi rehberi: restoranlar, akaryakıt ve elektrikli araç şarj istasyonu, mağazalar, ATM ve tesis olanakları. Yol tarifi ve güzergah bilgileri.",
  alternates: { canonical: "/tesis" },
};

export default async function TesisPage() {
  const [settings, facility, amenities] = await Promise.all([
    getSettings(),
    getFacilityItems(),
    getAmenities(),
  ]);

  const directionsHref = settings.google_maps_url || "/yol-tarifi";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Tesis Rehberi", url: "/tesis" },
        ]}
      />
      <PageHero
        title="Tesis Rehberi"
        subtitle="Oksijen 266 dinlenme tesisinde yolcuların ihtiyaç duyduğu tüm hizmetler tek sayfada."
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Tesis Rehberi", href: "/tesis" },
        ]}
      />

      <Container className="py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Konum & güzergah */}
          <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-5 lg:col-span-2">
            <h2 className="font-display text-lg font-semibold text-brand">
              Konum & Güzergah
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {settings.address ? (
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mustard" />
                  <span className="text-charcoal/75">{settings.address}</span>
                </li>
              ) : null}
              <li className="flex gap-2.5">
                <Milestone className="mt-0.5 h-4 w-4 shrink-0 text-mustard" />
                <span className="text-charcoal/75">
                  <strong className="text-brand">İstanbul yönünden:</strong>{" "}
                  {settings.km_istanbul || "km bilgisi panelden girilecek"}
                  <span className="mx-2 text-charcoal/30">·</span>
                  <strong className="text-brand">İzmir yönünden:</strong>{" "}
                  {settings.km_izmir || "km bilgisi panelden girilecek"}
                </span>
              </li>
              <li className="flex gap-2.5">
                <LogIn className="mt-0.5 h-4 w-4 shrink-0 text-mustard" />
                <span className="text-charcoal/75">
                  {settings.entry_info ||
                    "Hangi yönden doğrudan giriş yapılabildiği bilgisi panelden girilecek."}
                </span>
              </li>
              {settings.lost_found_phone ? (
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mustard" />
                  <span className="text-charcoal/75">
                    <strong className="text-brand">Kayıp eşya / destek:</strong>{" "}
                    <a
                      href={telLink(settings.lost_found_phone)}
                      className="hover:text-mustard-700"
                    >
                      {settings.lost_found_phone}
                    </a>
                  </span>
                </li>
              ) : null}
            </ul>
            <a
              href={directionsHref}
              target={settings.google_maps_url ? "_blank" : undefined}
              rel={settings.google_maps_url ? "noopener noreferrer" : undefined}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-colors hover:bg-red-600"
            >
              <Navigation className="h-4 w-4" />
              Hemen Yol Tarifi Al
            </a>
          </div>

          {/* Hava durumu */}
          <WeatherWidget
            lat={settings.map_lat}
            lng={settings.map_lng}
            label="Savaştepe / Balıkesir"
          />
        </div>
      </Container>

      <Amenities {...amenities} />

      <FacilityCatalog items={facility} />

      <Container className="pb-14">
        <p className="rounded-[var(--radius-card)] bg-cream-200/60 p-4 text-center text-xs text-charcoal/55">
          Karadeniz Gurme, Oksijen 266 dinlenme tesisi içinde hizmet
          vermektedir. Yukarıdaki tesis hizmetleri yolcuları bilgilendirmek
          amacıyla listelenmiştir; marka, saat ve teknik detaylar işletmeler
          tarafından güncellenebilir.
        </p>
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { DirectionsSection } from "@/components/site/DirectionsSection";
import { WeatherWidget } from "@/components/site/WeatherWidget";
import { Container } from "@/components/ui/Container";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Yol Tarifi",
  description:
    "İstanbul–İzmir Otoyolu Oksijen 266'da yer alan Karadeniz Gurme'ye yol tarifi, konum, adres ve ulaşım bilgileri.",
  alternates: { canonical: "/yol-tarifi" },
};

export default async function YolTarifiPage() {
  const settings = await getSettings();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Yol Tarifi", url: "/yol-tarifi" },
        ]}
      />
      <PageHero
        title="Yol Tarifi & Konum"
        subtitle="İstanbul–İzmir Otoyolu üzerinde, Oksijen 266 dinlenme tesisi içindeyiz."
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Yol Tarifi", href: "/yol-tarifi" },
        ]}
      />
      <DirectionsSection settings={settings} showDirections withHeading={false} />
      <Container className="pb-16">
        <div className="max-w-md">
          <WeatherWidget
            lat={settings.map_lat}
            lng={settings.map_lng}
            label="Savaştepe / Balıkesir"
          />
        </div>
      </Container>
    </>
  );
}

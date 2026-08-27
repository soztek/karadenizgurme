import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { MenuBrowser } from "@/components/site/MenuBrowser";
import { MenuJsonLd, BreadcrumbJsonLd } from "@/components/site/JsonLd";
import { getMenuGrouped, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Menü",
  description:
    "Karadeniz Gurme dijital menüsü: kahvaltı, çorba, ana yemekler, pide, ızgara, deniz ürünleri, tatlılar ve içecekler. Güncel fiyatlarıyla.",
  alternates: { canonical: "/menu" },
};

export default async function MenuPage() {
  const [groups, settings] = await Promise.all([
    getMenuGrouped(),
    getSettings(),
  ]);

  return (
    <>
      <MenuJsonLd
        groups={groups}
        businessName={settings.business_name}
        showPrices={settings.show_prices}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Menü", url: "/menu" },
        ]}
      />
      <PageHero
        title="Menümüz"
        subtitle="Karadeniz mutfağından günlük hazırlanan lezzetler. Aşağıdan arayabilir veya kategorilere göz atabilirsiniz."
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Menü", href: "/menu" },
        ]}
      />
      <Container className="py-10">
        {groups.length ? (
          <MenuBrowser groups={groups} showPrices={settings.show_prices} />
        ) : (
          <p className="py-20 text-center text-charcoal/60">
            Menü içeriği yakında eklenecek.
          </p>
        )}
      </Container>
    </>
  );
}

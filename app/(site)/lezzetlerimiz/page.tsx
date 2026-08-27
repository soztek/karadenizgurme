import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { ButtonLink } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";
import { ArrowRight } from "lucide-react";
import { getMenuItems, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lezzetlerimiz",
  description:
    "Karadeniz Gurme'nin öne çıkan lezzetleri: kuymak, Akçaabat köfte, Hamsiköy sütlacı, taze pideler ve daha fazlası.",
  alternates: { canonical: "/lezzetlerimiz" },
};

export default async function LezzetlerimizPage() {
  const [featured, withPhotos, settings] = await Promise.all([
    getMenuItems({ featured: true }),
    getMenuItems(),
    getSettings(),
  ]);
  const gallery = withPhotos.filter((i) => i.image_url).slice(0, 12);
  const showPrices = settings.show_prices;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Lezzetlerimiz", url: "/lezzetlerimiz" },
        ]}
      />
      <PageHero
        title="Lezzetlerimiz"
        subtitle="Karadeniz'in tarifleriyle hazırladığımız, en çok sevilen tabaklarımız."
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Lezzetlerimiz", href: "/lezzetlerimiz" },
        ]}
      />

      <Container className="py-14">
        {featured.length ? (
          <>
            <h2 className="font-display text-2xl font-semibold text-brand">
              Öne Çıkan Lezzetler
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((item) => (
                <MenuItemCard key={item.id} item={item} showPrices={showPrices} />
              ))}
            </div>
          </>
        ) : null}

        {gallery.length ? (
          <>
            <h2 className="mt-16 font-display text-2xl font-semibold text-brand">
              Sofradan Kareler
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item) => (
                <MenuItemCard key={item.id} item={item} showPrices={showPrices} />
              ))}
            </div>
          </>
        ) : null}

        <div className="mt-14 rounded-[var(--radius-card)] bg-brand p-8 text-center text-cream sm:p-12">
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">
            Tüm menümüzü keşfedin
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-cream/80">
            Kahvaltıdan tatlıya, ızgaradan içeceğe kadar tüm lezzetlerimiz ve
            güncel fiyatları için menümüze göz atın.
          </p>
          <div className="mt-6">
            <ButtonLink href="/menu" variant="mustard" size="lg">
              Menüyü İncele
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}

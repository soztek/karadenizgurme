import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Karadeniz Gurme'den kareler: yemeklerimiz, mutfağımız ve atmosferimiz.",
  alternates: { canonical: "/galeri" },
};

export default async function GaleriPage() {
  const items = await getGallery();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Galeri", url: "/galeri" },
        ]}
      />
      <PageHero
        title="Galeri"
        subtitle="Yemeklerimizden ve atmosferimizden kareler."
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Galeri", href: "/galeri" },
        ]}
      />
      <Container className="py-14">
        <GalleryGrid items={items} />
      </Container>
    </>
  );
}

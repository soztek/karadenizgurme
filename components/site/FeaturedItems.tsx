import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { ButtonLink } from "@/components/ui/Button";
import type { MenuItemWithCategory } from "@/lib/types";

export function FeaturedItems({ items }: { items: MenuItemWithCategory[] }) {
  if (!items.length) return null;
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Öne Çıkanlar"
          title="Sofranın Yıldızları"
          subtitle="Karadeniz Gurme'de en çok tercih edilen, günlük hazırlanan lezzetlerimizden bir seçki."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 8).map((item) => (
            <div key={item.id} className="relative">
              <MenuItemCard item={item} />
              <Link
                href={`/menu#kat-${item.category?.slug ?? ""}`}
                className="absolute inset-0"
                aria-label={`${item.title} — Menüde Gör`}
              />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/menu" variant="outline" size="lg">
            Tüm Menüyü Gör
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

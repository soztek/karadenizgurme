import Image from "next/image";
import {
  Utensils,
  Coffee,
  Fuel,
  PlugZap,
  ShoppingBag,
  Landmark,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FacilityItem, FacilityKind } from "@/lib/types";

const KIND_CONFIG: Record<
  FacilityKind,
  { label: string; icon: LucideIcon; order: number }
> = {
  restoran: { label: "Restoran", icon: Utensils, order: 1 },
  kafe: { label: "Kafe & Pastane", icon: Coffee, order: 2 },
  akaryakit: { label: "Akaryakıt", icon: Fuel, order: 3 },
  ev_sarj: { label: "EV Şarj", icon: PlugZap, order: 4 },
  magaza: { label: "Alışveriş", icon: ShoppingBag, order: 5 },
  atm: { label: "ATM & Banka", icon: Landmark, order: 6 },
  hizmet: { label: "Hizmet", icon: Wrench, order: 7 },
};

export function FacilityCatalog({ items }: { items: FacilityItem[] }) {
  if (!items.length) {
    return (
      <Container className="py-16">
        <p className="text-center text-charcoal/60">
          Tesis hizmetleri yakında eklenecek.
        </p>
      </Container>
    );
  }

  // Türe göre sırala, aynı türleri yan yana getir
  const sorted = [...items].sort((a, b) => {
    const oa = KIND_CONFIG[a.kind]?.order ?? 99;
    const ob = KIND_CONFIG[b.kind]?.order ?? 99;
    if (oa !== ob) return oa - ob;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });

  const seen = new Set<string>();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Tesiste"
          title="Tesis Hizmetleri"
          subtitle="Oksijen 266 dinlenme tesisinde bulabileceğiniz restoran, akaryakıt, şarj, alışveriş ve daha fazlası."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((r) => {
            const cfg = KIND_CONFIG[r.kind] ?? KIND_CONFIG.hizmet;
            const Icon = cfg.icon;
            const firstOfKind = !seen.has(r.kind);
            seen.add(r.kind);
            return (
              <div
                key={r.id}
                id={firstOfKind ? r.kind : undefined}
                className="flex scroll-mt-28 flex-col overflow-hidden rounded-[var(--radius-card)] border border-brand/10 bg-white shadow-sm transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                {r.image_url ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={r.image_url}
                      alt={r.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] w-full items-center justify-center bg-cream pattern-topo text-brand/25">
                    <Icon className="h-9 w-9" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-mustard/15 px-2.5 py-1 text-[11px] font-semibold text-mustard-700">
                    <Icon className="h-3.5 w-3.5" />
                    {cfg.label}
                  </span>
                  <h3 className="font-semibold text-brand">{r.name}</h3>
                  {r.description ? (
                    <p className="mt-1 text-sm leading-relaxed text-charcoal/65">
                      {r.description}
                    </p>
                  ) : null}
                  {r.detail ? (
                    <span className="mt-auto pt-3">
                      <span className="inline-flex w-fit rounded-full bg-brand/8 px-2.5 py-1 text-xs font-medium text-brand">
                        {r.detail}
                      </span>
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

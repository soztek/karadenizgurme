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
import type { FacilityItem, FacilityKind } from "@/lib/types";

const KINDS: {
  kind: FacilityKind;
  label: string;
  icon: LucideIcon;
}[] = [
  { kind: "restoran", label: "Restoranlar", icon: Utensils },
  { kind: "kafe", label: "Kafeler & Pastaneler", icon: Coffee },
  { kind: "akaryakit", label: "Akaryakıt İstasyonları", icon: Fuel },
  { kind: "ev_sarj", label: "Elektrikli Araç Şarj", icon: PlugZap },
  { kind: "magaza", label: "Alışveriş & Mağazalar", icon: ShoppingBag },
  { kind: "atm", label: "ATM & Bankacılık", icon: Landmark },
  { kind: "hizmet", label: "Diğer Hizmetler", icon: Wrench },
];

export function FacilityCatalog({ items }: { items: FacilityItem[] }) {
  const groups = KINDS.map((k) => ({
    ...k,
    rows: items.filter((i) => i.kind === k.kind),
  })).filter((g) => g.rows.length > 0);

  if (!groups.length) {
    return (
      <Container className="py-16">
        <p className="text-center text-charcoal/60">
          Tesis hizmetleri yakında eklenecek.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-14">
      <div className="space-y-14">
        {groups.map((g) => {
          const Icon = g.icon;
          return (
            <section key={g.kind} id={g.kind} className="scroll-mt-28">
              <div className="mb-5 flex items-center gap-3 border-b border-brand/10 pb-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mustard/15 text-mustard-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="font-display text-2xl font-semibold text-brand">
                  {g.label}
                </h2>
                <span className="ml-auto text-sm text-charcoal/45">
                  {g.rows.length}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-brand/10 bg-white shadow-sm"
                  >
                    {r.image_url ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={r.image_url}
                          alt={r.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-semibold text-brand">{r.name}</h3>
                      {r.description ? (
                        <p className="mt-1 text-sm leading-relaxed text-charcoal/65">
                          {r.description}
                        </p>
                      ) : null}
                      {r.detail ? (
                        <span className="mt-3 inline-flex w-fit rounded-full bg-brand/8 px-2.5 py-1 text-xs font-medium text-brand">
                          {r.detail}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}

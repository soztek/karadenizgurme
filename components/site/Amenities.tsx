import {
  SquareParking,
  Baby,
  ShoppingBag,
  Scissors,
  Toilet,
  Wifi,
  Fuel,
  Accessibility,
  Coffee,
  PlugZap,
  ShowerHead,
  PawPrint,
  Landmark,
  ToyBrick,
  Utensils,
  Store,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type Amenity = { icon: string; label: string };

function MosqueIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2c1.8 1.6 3 3 3 4.8C15 8.6 13.7 10 12 10s-3-1.4-3-3.2C9 5 10.2 3.6 12 2Z" />
      <path d="M4 21v-6a8 8 0 0 1 16 0v6" />
      <path d="M2 21h20" />
      <path d="M4 15h16" />
      <path d="M9 21v-3a3 3 0 0 1 6 0v3" />
      <path d="M6.5 2.5v1.5M17.5 2.5v1.5" />
    </svg>
  );
}

const lucideMap: Record<string, LucideIcon> = {
  parking: SquareParking,
  baby: Baby,
  shopping: ShoppingBag,
  tailor: Scissors,
  toilet: Toilet,
  wifi: Wifi,
  fuel: Fuel,
  accessibility: Accessibility,
  coffee: Coffee,
  ev: PlugZap,
  shower: ShowerHead,
  pet: PawPrint,
  atm: Landmark,
  playground: ToyBrick,
  restaurant: Utensils,
  store: Store,
};

function AmenityIcon({ name, className }: { name: string; className?: string }) {
  if (name === "mosque") return <MosqueIcon className={className} />;
  const Icon = lucideMap[name] ?? SquareParking;
  return <Icon className={className} aria-hidden />;
}

export function Amenities({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Amenity[];
}) {
  if (!items.length) return null;
  return (
    <section className="bg-cream-200/60 py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Tesiste" title={title} subtitle={subtitle} />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {items.map((a) => (
            <div
              key={a.label}
              className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-brand/10 bg-white p-5 text-center transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/8 text-brand">
                <AmenityIcon name={a.icon} className="h-7 w-7" />
              </span>
              <span className="text-sm font-medium text-brand">{a.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

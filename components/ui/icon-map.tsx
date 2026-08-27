import {
  ChefHat,
  Sprout,
  Timer,
  Users,
  MapPin,
  Coffee,
  UtensilsCrossed,
  Leaf,
  Flame,
  Heart,
  Star,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  ChefHat,
  Sprout,
  Timer,
  Users,
  MapPin,
  Coffee,
  UtensilsCrossed,
  Leaf,
  Flame,
  Heart,
  Star,
};

export function FeatureIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? UtensilsCrossed;
  return <Icon className={className} aria-hidden />;
}

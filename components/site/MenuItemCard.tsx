import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import type { MenuItemWithCategory } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  Acı: "bg-red-100 text-red-700",
  Vejetaryen: "bg-emerald-100 text-emerald-700",
  Vegan: "bg-emerald-100 text-emerald-700",
  Yöresel: "bg-mustard/15 text-mustard-600",
};

export function ItemImage({
  src,
  alt,
  className,
  sizes,
}: {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-cream pattern-topo text-brand/30",
          className,
        )}
        aria-hidden
      >
        <UtensilsCrossed className="h-8 w-8" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes || "(max-width: 768px) 100vw, 400px"}
      className={cn("object-cover", className)}
    />
  );
}

export function MenuItemCard({
  item,
  showPrices = true,
}: {
  item: MenuItemWithCategory;
  showPrices?: boolean;
}) {
  const hasDiscount =
    item.discount_price != null &&
    item.price != null &&
    item.discount_price < item.price;
  const soldOut = !item.is_available;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-brand/10 bg-white shadow-sm transition-shadow hover:shadow-[var(--shadow-soft)]",
        soldOut && "opacity-75",
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ItemImage
          src={item.image_url}
          alt={item.title}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {item.is_featured && !soldOut ? (
          <span className="absolute left-3 top-3 rounded-full bg-mustard px-2.5 py-1 text-xs font-semibold text-charcoal shadow">
            Öne Çıkan
          </span>
        ) : null}
        {soldOut ? (
          <span className="absolute inset-0 flex items-center justify-center bg-charcoal/45 text-sm font-semibold uppercase tracking-wide text-white">
            Tükendi
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight text-brand">
            {item.title}
          </h3>
          {showPrices ? (
            <div className="shrink-0 text-right">
              {hasDiscount ? (
                <>
                  <span className="block text-xs text-charcoal/40 line-through">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-base font-bold text-mustard-600">
                    {formatPrice(item.discount_price)}
                  </span>
                </>
              ) : item.price != null ? (
                <span className="text-base font-bold text-mustard-600">
                  {formatPrice(item.price)}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {item.description ? (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-charcoal/65">
            {item.description}
          </p>
        ) : null}

        {showPrices && item.price == null ? (
          <p className="mt-1.5 text-xs italic text-charcoal/50">
            Güncel fiyat için lütfen sorunuz.
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {item.tags?.map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium",
                tagStyles[t] ?? "bg-brand/8 text-brand",
              )}
            >
              {t}
            </span>
          ))}
          {item.allergens?.length ? (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
              Alerjen: {item.allergens.join(", ")}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

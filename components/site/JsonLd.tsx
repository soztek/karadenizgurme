import { SITE_URL } from "@/lib/constants";
import type { MenuGroup } from "@/lib/data";
import type { SiteSettings } from "@/lib/types";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd({ settings }: { settings: SiteSettings }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings.business_name,
    servesCuisine: ["Karadeniz Mutfağı", "Türk Mutfağı"],
    priceRange: "₺₺",
    url: SITE_URL,
    image: settings.og_image_url
      ? `${SITE_URL}${settings.og_image_url}`
      : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressRegion: "Balıkesir",
      addressCountry: "TR",
    },
    sameAs: settings.instagram_url ? [settings.instagram_url] : undefined,
  };
  if (settings.phone) data.telephone = settings.phone;
  if (settings.map_lat != null && settings.map_lng != null) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: settings.map_lat,
      longitude: settings.map_lng,
    };
  }
  if (settings.google_maps_url) data.hasMap = settings.google_maps_url;
  return <JsonLd data={data} />;
}

export function MenuJsonLd({
  groups,
  businessName,
  showPrices = true,
}: {
  groups: MenuGroup[];
  businessName: string;
  showPrices?: boolean;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${businessName} Menüsü`,
    hasMenuSection: groups.map((g) => ({
      "@type": "MenuSection",
      name: g.category.title,
      hasMenuItem: g.items.map((i) => ({
        "@type": "MenuItem",
        name: i.title,
        description: i.description || undefined,
        offers:
          showPrices && i.price != null
            ? {
                "@type": "Offer",
                price: i.discount_price ?? i.price,
                priceCurrency: "TRY",
              }
            : undefined,
      })),
    })),
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

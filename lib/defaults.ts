import seed from "@/supabase/seed-data.json";
import type {
  Category,
  Feature,
  GalleryItem,
  MenuItemWithCategory,
  SiteSettings,
  SocialPost,
  Testimonial,
  Campaign,
  FacilityItem,
  AmenityItem,
} from "./types";
import { slugify } from "./utils";

/**
 * seed-data.json tek doğruluk kaynağıdır. Supabase yapılandırılmamışsa
 * veya boşsa site bu demo/fallback verisiyle sorunsuz çalışır.
 */

export const DEFAULT_SETTINGS: SiteSettings = {
  id: "default",
  favicon_url: null,
  hero_video_url: null,
  ...seed.settings,
} as SiteSettings;

export const DEFAULT_CATEGORIES: Category[] = seed.categories.map((c, i) => ({
  id: c.slug,
  slug: c.slug,
  title: c.title,
  description: c.description ?? null,
  image_url: c.image_url || null,
  sort_order: c.sort_order ?? i + 1,
  is_active: true,
}));

const categoryTitleBySlug = new Map(
  DEFAULT_CATEGORIES.map((c) => [c.slug, c.title]),
);

export const DEFAULT_MENU_ITEMS: MenuItemWithCategory[] = seed.items.map(
  (it, i) => {
    const anyIt = it as Record<string, unknown>;
    return {
      id: `${it.category}-${slugify(it.title)}`,
      category_id: it.category,
      title: it.title,
      slug: slugify(it.title),
      description: (anyIt.description as string) || null,
      price: (it.price as number | null) ?? null,
      discount_price: (anyIt.discount_price as number | null) ?? null,
      image_url: (anyIt.image_url as string) || null,
      is_available: (anyIt.is_available as boolean) ?? true,
      is_featured: (anyIt.is_featured as boolean) ?? false,
      allergens: (anyIt.allergens as string[]) || [],
      tags: (anyIt.tags as string[]) || [],
      sort_order: i + 1,
      is_active: true,
      category: {
        slug: it.category,
        title: categoryTitleBySlug.get(it.category) || it.category,
      },
    };
  },
);

export const DEFAULT_GALLERY: GalleryItem[] = seed.gallery.map((g, i) => ({
  id: `gallery-${i + 1}`,
  title: g.title ?? null,
  description: null,
  image_url: g.image_url,
  category: null,
  sort_order: g.sort_order ?? i + 1,
  is_active: true,
}));

export const DEFAULT_SOCIAL: SocialPost[] = seed.social_posts.map((s, i) => ({
  id: `social-${i + 1}`,
  title: s.title ?? null,
  image_url: s.image_url,
  link_url: s.link_url ?? null,
  sort_order: s.sort_order ?? i + 1,
  is_active: true,
}));

export const DEFAULT_TESTIMONIALS: Testimonial[] = (
  seed.testimonials as Testimonial[]
).map((t, i) => ({
  id: `testimonial-${i + 1}`,
  name: t.name,
  comment: t.comment,
  rating: t.rating,
  source: t.source ?? null,
  sort_order: i + 1,
  is_active: true,
}));

export const DEFAULT_CAMPAIGNS: Campaign[] = (
  seed.campaigns as unknown[]
).map((c, i) => {
  const cc = c as Record<string, unknown>;
  return {
    id: `campaign-${i + 1}`,
    title: cc.title as string,
    description: (cc.description as string) ?? null,
    image_url: (cc.image_url as string) ?? null,
    starts_at: (cc.starts_at as string) ?? null,
    ends_at: (cc.ends_at as string) ?? null,
    show_on_home: (cc.show_on_home as boolean) ?? true,
    sort_order: i + 1,
    is_active: true,
  };
});

export const DEFAULT_STORY = seed.content.story;
export const DEFAULT_WHY_US = {
  ...seed.content.why_us,
  features: seed.content.why_us.features as Feature[],
};
export const DEFAULT_INSTAGRAM = seed.content.instagram;
export const DEFAULT_FOOTER = seed.content.footer;
export const DEFAULT_AMENITIES = seed.content.amenities as {
  title: string;
  subtitle: string;
  items: { icon: string; label: string }[];
};

export const DEFAULT_AMENITY_ITEMS: AmenityItem[] = (
  seed.content.amenities.items as { icon: string; label: string }[]
).map((a, i) => ({
  id: `amenity-${i + 1}`,
  icon: a.icon,
  label: a.label,
  image_url: null,
  sort_order: i + 1,
  is_active: true,
}));

export const DEFAULT_FACILITY: FacilityItem[] = (
  seed.facility_items as unknown[]
).map((f, i) => {
  const ff = f as Record<string, unknown>;
  return {
    id: `facility-${i + 1}`,
    kind: ff.kind as FacilityItem["kind"],
    name: ff.name as string,
    description: (ff.description as string) || null,
    detail: (ff.detail as string) || null,
    image_url: (ff.image_url as string) || null,
    sort_order: (ff.sort_order as number) ?? i + 1,
    is_active: true,
  };
});

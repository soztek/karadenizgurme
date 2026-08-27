import "server-only";
import { cache } from "react";
import { createClient } from "./supabase/server";
import {
  DEFAULT_CAMPAIGNS,
  DEFAULT_CATEGORIES,
  DEFAULT_GALLERY,
  DEFAULT_MENU_ITEMS,
  DEFAULT_SETTINGS,
  DEFAULT_SOCIAL,
  DEFAULT_AMENITIES,
  DEFAULT_FACILITY,
  DEFAULT_STORY,
  DEFAULT_TESTIMONIALS,
  DEFAULT_WHY_US,
} from "./defaults";
import type { Amenity } from "@/components/site/Amenities";
import type {
  Campaign,
  Category,
  ContentSection,
  Feature,
  GalleryItem,
  MenuItemWithCategory,
  SiteSettings,
  SocialPost,
  Testimonial,
  FacilityItem,
} from "./types";

const MENU_SELECT =
  "*, category:categories(slug,title)";

export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const sb = await createClient();
    if (!sb) return DEFAULT_SETTINGS;
    const { data } = await sb.from("site_settings").select("*").limit(1).single();
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...data } as SiteSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
});

export const getCategories = cache(
  async (activeOnly = true): Promise<Category[]> => {
    try {
      const sb = await createClient();
      if (!sb) return filterActive(DEFAULT_CATEGORIES, activeOnly);
      let q = sb.from("categories").select("*").order("sort_order", {
        ascending: true,
      });
      if (activeOnly) q = q.eq("is_active", true);
      const { data } = await q;
      if (!data || data.length === 0)
        return filterActive(DEFAULT_CATEGORIES, activeOnly);
      return data as Category[];
    } catch {
      return filterActive(DEFAULT_CATEGORIES, activeOnly);
    }
  },
);

export const getMenuItems = cache(
  async (opts?: {
    categorySlug?: string;
    featured?: boolean;
    activeOnly?: boolean;
  }): Promise<MenuItemWithCategory[]> => {
    const activeOnly = opts?.activeOnly ?? true;
    try {
      const sb = await createClient();
      if (!sb) return fallbackItems(opts, activeOnly);
      let q = sb
        .from("menu_items")
        .select(MENU_SELECT)
        .order("sort_order", { ascending: true });
      if (activeOnly) q = q.eq("is_active", true);
      if (opts?.featured) q = q.eq("is_featured", true);
      const { data } = await q;
      if (!data) return fallbackItems(opts, activeOnly);
      let rows = data as unknown as MenuItemWithCategory[];
      if (opts?.categorySlug)
        rows = rows.filter((r) => r.category?.slug === opts.categorySlug);
      return rows;
    } catch {
      return fallbackItems(opts, activeOnly);
    }
  },
);

export type MenuGroup = { category: Category; items: MenuItemWithCategory[] };

export const getMenuGrouped = cache(async (): Promise<MenuGroup[]> => {
  const [categories, items] = await Promise.all([
    getCategories(true),
    getMenuItems({ activeOnly: true }),
  ]);
  return categories
    .map((category) => ({
      category,
      items: items.filter((i) => i.category?.slug === category.slug),
    }))
    .filter((g) => g.items.length > 0);
});

export const getGallery = cache(async (): Promise<GalleryItem[]> => {
  try {
    const sb = await createClient();
    if (!sb) return DEFAULT_GALLERY;
    const { data } = await sb
      .from("gallery_items")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (!data || data.length === 0) return DEFAULT_GALLERY;
    return data as GalleryItem[];
  } catch {
    return DEFAULT_GALLERY;
  }
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  try {
    const sb = await createClient();
    if (!sb) return DEFAULT_TESTIMONIALS;
    const { data } = await sb
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    return (data as Testimonial[]) ?? DEFAULT_TESTIMONIALS;
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
});

export const getSocialPosts = cache(async (): Promise<SocialPost[]> => {
  try {
    const sb = await createClient();
    if (!sb) return DEFAULT_SOCIAL;
    const { data } = await sb
      .from("social_posts")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (!data || data.length === 0) return DEFAULT_SOCIAL;
    return data as SocialPost[];
  } catch {
    return DEFAULT_SOCIAL;
  }
});

export const getCampaigns = cache(
  async (homeOnly = false): Promise<Campaign[]> => {
    try {
      const sb = await createClient();
      if (!sb) return campaignFallback(homeOnly);
      let q = sb
        .from("campaigns")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (homeOnly) q = q.eq("show_on_home", true);
      const { data } = await q;
      if (!data) return campaignFallback(homeOnly);
      return data as Campaign[];
    } catch {
      return campaignFallback(homeOnly);
    }
  },
);

export const getContent = cache(
  async (key: string): Promise<ContentSection | null> => {
    try {
      const sb = await createClient();
      if (!sb) return null;
      const { data } = await sb
        .from("content_sections")
        .select("*")
        .eq("key", key)
        .maybeSingle();
      return (data as ContentSection) ?? null;
    } catch {
      return null;
    }
  },
);

export async function getStory() {
  const c = await getContent("story");
  return {
    title: c?.title || DEFAULT_STORY.title,
    subtitle: c?.subtitle || DEFAULT_STORY.subtitle,
    body: c?.body || DEFAULT_STORY.body,
    image_url: c?.image_url || DEFAULT_STORY.image_url,
  };
}

export async function getWhyUs(): Promise<{
  title: string;
  subtitle: string;
  features: Feature[];
}> {
  const c = await getContent("why_us");
  const features =
    (c?.data?.features as Feature[] | undefined) &&
    (c!.data!.features as Feature[]).length > 0
      ? (c!.data!.features as Feature[])
      : DEFAULT_WHY_US.features;
  return {
    title: c?.title || DEFAULT_WHY_US.title,
    subtitle: c?.subtitle || DEFAULT_WHY_US.subtitle,
    features,
  };
}

export const getFacilityItems = cache(async (): Promise<FacilityItem[]> => {
  try {
    const sb = await createClient();
    if (!sb) return DEFAULT_FACILITY;
    const { data } = await sb
      .from("facility_items")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (!data || data.length === 0) return DEFAULT_FACILITY;
    return data as FacilityItem[];
  } catch {
    return DEFAULT_FACILITY;
  }
});

export async function getAmenities(): Promise<{
  title: string;
  subtitle: string;
  items: Amenity[];
}> {
  const c = await getContent("amenities");
  const items =
    (c?.data?.items as Amenity[] | undefined) &&
    (c!.data!.items as Amenity[]).length > 0
      ? (c!.data!.items as Amenity[])
      : DEFAULT_AMENITIES.items;
  return {
    title: c?.title || DEFAULT_AMENITIES.title,
    subtitle: c?.subtitle || DEFAULT_AMENITIES.subtitle,
    items,
  };
}

/* ---------- yardımcılar ---------- */

function filterActive<T extends { is_active: boolean }>(
  rows: T[],
  activeOnly: boolean,
): T[] {
  return activeOnly ? rows.filter((r) => r.is_active) : rows;
}

function fallbackItems(
  opts:
    | { categorySlug?: string; featured?: boolean; activeOnly?: boolean }
    | undefined,
  activeOnly: boolean,
): MenuItemWithCategory[] {
  let rows = filterActive(DEFAULT_MENU_ITEMS, activeOnly);
  if (opts?.featured) rows = rows.filter((r) => r.is_featured);
  if (opts?.categorySlug)
    rows = rows.filter((r) => r.category?.slug === opts.categorySlug);
  return rows;
}

function campaignFallback(homeOnly: boolean): Campaign[] {
  return homeOnly
    ? DEFAULT_CAMPAIGNS.filter((c) => c.show_on_home)
    : DEFAULT_CAMPAIGNS;
}

import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  Campaign,
  Category,
  ContentSection,
  AmenityItem,
  FacilityItem,
  GalleryItem,
  MenuItemWithCategory,
  SiteSettings,
  SocialPost,
  Testimonial,
} from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/defaults";

/**
 * Yönetim paneli için TÜM kayıtları (aktif/pasif) getirir.
 * Supabase yoksa boş liste döner (demo modunda panel salt bilgilendirir).
 */

async function all<T>(table: string, order = "sort_order"): Promise<T[]> {
  const sb = createAdminClient();
  if (!sb) return [];
  const { data } = await sb
    .from(table)
    .select("*")
    .order(order, { ascending: true });
  return (data as T[]) ?? [];
}

export const getAdminCategories = () => all<Category>("categories");

export async function getAdminMenuItems(): Promise<MenuItemWithCategory[]> {
  const sb = createAdminClient();
  if (!sb) return [];
  const { data } = await sb
    .from("menu_items")
    .select("*, category:categories(slug,title)")
    .order("sort_order", { ascending: true });
  return (data as unknown as MenuItemWithCategory[]) ?? [];
}

export const getAdminGallery = () => all<GalleryItem>("gallery_items");
export const getAdminFacility = () => all<FacilityItem>("facility_items");
export const getAdminAmenities = () => all<AmenityItem>("amenities");
export const getAdminCampaigns = () => all<Campaign>("campaigns");
export const getAdminTestimonials = () => all<Testimonial>("testimonials");
export const getAdminSocial = () => all<SocialPost>("social_posts");

export async function getAdminSettings(): Promise<SiteSettings> {
  const sb = createAdminClient();
  if (!sb) return DEFAULT_SETTINGS;
  const { data } = await sb.from("site_settings").select("*").limit(1).single();
  return { ...DEFAULT_SETTINGS, ...(data ?? {}) } as SiteSettings;
}

export async function getAdminContent(): Promise<ContentSection[]> {
  const sb = createAdminClient();
  if (!sb) return [];
  const { data } = await sb.from("content_sections").select("*").order("key");
  return (data as ContentSection[]) ?? [];
}

export async function getDashboardStats() {
  const sb = createAdminClient();
  if (!sb) {
    return {
      configured: false,
      totalItems: 0,
      totalCategories: 0,
      activeItems: 0,
      soldOutItems: 0,
      galleryCount: 0,
      recent: [] as { title: string; updated_at: string }[],
    };
  }
  const [items, cats, gallery] = await Promise.all([
    sb.from("menu_items").select("id, title, is_active, is_available, updated_at"),
    sb.from("categories").select("id"),
    sb.from("gallery_items").select("id"),
  ]);
  const rows = items.data ?? [];
  const recent = [...rows]
    .sort(
      (a, b) =>
        new Date(b.updated_at ?? 0).getTime() -
        new Date(a.updated_at ?? 0).getTime(),
    )
    .slice(0, 6)
    .map((r) => ({ title: r.title as string, updated_at: r.updated_at as string }));
  return {
    configured: true,
    totalItems: rows.length,
    totalCategories: (cats.data ?? []).length,
    activeItems: rows.filter((r) => r.is_active).length,
    soldOutItems: rows.filter((r) => !r.is_available).length,
    galleryCount: (gallery.data ?? []).length,
    recent,
  };
}

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { withAdmin, type ActionResult } from "./helpers";
import {
  amenitySchema,
  campaignSchema,
  categorySchema,
  contentSchema,
  facilitySchema,
  gallerySchema,
  menuItemSchema,
  settingsSchema,
  socialSchema,
  testimonialSchema,
} from "@/lib/validations";
import { slugify } from "@/lib/utils";
import type { SupabaseClient } from "@supabase/supabase-js";

function revalidateSite() {
  for (const p of [
    "/",
    "/menu",
    "/lezzetlerimiz",
    "/galeri",
    "/hikayemiz",
    "/yol-tarifi",
    "/iletisim",
  ]) {
    revalidatePath(p);
  }
}

async function persist(
  sb: SupabaseClient,
  table: string,
  id: string | null,
  values: Record<string, unknown>,
): Promise<ActionResult> {
  if (id) {
    const { error } = await sb
      .from(table)
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    return { ok: true, id };
  }
  const { data, error } = await sb.from(table).insert(values).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id as string };
}

function parse<T>(
  schema: z.ZodType<T>,
  formData: FormData,
): { ok: true; data: T } | { ok: false; error: string } {
  const raw = Object.fromEntries(formData.entries());
  const result = schema.safeParse(raw);
  if (!result.success) {
    return { ok: false, error: result.error.issues[0]?.message || "Form geçersiz." };
  }
  return { ok: true, data: result.data };
}

function getId(formData: FormData): string | null {
  const id = formData.get("id");
  return id && typeof id === "string" && id.length > 0 ? id : null;
}

/* ---------------- Kategoriler ---------------- */

export async function saveCategory(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(categorySchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const values = {
    title: d.title,
    slug: d.slug ? slugify(d.slug) : slugify(d.title),
    description: d.description || null,
    image_url: d.image_url || null,
    sort_order: d.sort_order,
    is_active: d.is_active,
  };
  const res = await persist(guard.sb, "categories", getId(formData), values);
  revalidateSite();
  revalidatePath("/admin/menu");
  return res;
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb.from("categories").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/menu");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/* ---------------- Menü Ürünleri ---------------- */

export async function saveMenuItem(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(menuItemSchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const values = {
    category_id: d.category_id,
    title: d.title,
    slug: d.slug ? slugify(d.slug) : slugify(d.title),
    description: d.description || null,
    price: d.price,
    discount_price: d.discount_price,
    image_url: d.image_url || null,
    is_available: d.is_available,
    is_featured: d.is_featured,
    is_active: d.is_active,
    allergens: d.allergens,
    tags: d.tags,
    sort_order: d.sort_order,
  };
  const res = await persist(guard.sb, "menu_items", getId(formData), values);
  revalidateSite();
  revalidatePath("/admin/menu");
  return res;
}

export async function deleteMenuItem(id: string): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb.from("menu_items").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/menu");
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function toggleItemField(
  id: string,
  field: "is_active" | "is_available" | "is_featured",
  value: boolean,
): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb
    .from("menu_items")
    .update({ [field]: value, updated_at: new Date().toISOString() })
    .eq("id", id);
  revalidateSite();
  revalidatePath("/admin/menu");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Sürükle-bırak sıralaması için toplu güncelleme */
export async function reorder(
  table:
    | "categories"
    | "menu_items"
    | "gallery_items"
    | "social_posts"
    | "facility_items"
    | "amenities",
  orderedIds: string[],
): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  await Promise.all(
    orderedIds.map((id, i) =>
      guard.sb.from(table).update({ sort_order: i + 1 }).eq("id", id),
    ),
  );
  revalidateSite();
  revalidatePath("/admin/menu");
  revalidatePath("/admin/galeri");
  revalidatePath("/admin/sosyal");
  revalidatePath("/admin/tesis");
  return { ok: true };
}

/* ---------------- Tesis Olanakları ---------------- */

export async function saveAmenity(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(amenitySchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const res = await persist(guard.sb, "amenities", getId(formData), {
    icon: d.icon,
    label: d.label,
    image_url: d.image_url || null,
    sort_order: d.sort_order,
    is_active: d.is_active,
  });
  revalidateSite();
  revalidatePath("/tesis");
  revalidatePath("/admin/tesis");
  return res;
}

export async function deleteAmenity(id: string): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb.from("amenities").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/tesis");
  revalidatePath("/admin/tesis");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/* ---------------- Tesis Rehberi ---------------- */

export async function saveFacilityItem(
  formData: FormData,
): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(facilitySchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const res = await persist(guard.sb, "facility_items", getId(formData), {
    kind: d.kind,
    name: d.name,
    description: d.description || null,
    detail: d.detail || null,
    image_url: d.image_url || null,
    sort_order: d.sort_order,
    is_active: d.is_active,
  });
  revalidateSite();
  revalidatePath("/tesis");
  revalidatePath("/admin/tesis");
  return res;
}

export async function deleteFacilityItem(id: string): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb.from("facility_items").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/tesis");
  revalidatePath("/admin/tesis");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/* ---------------- Galeri ---------------- */

export async function saveGallery(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(gallerySchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const res = await persist(guard.sb, "gallery_items", getId(formData), {
    title: d.title || null,
    description: d.description || null,
    image_url: d.image_url,
    category: d.category || null,
    sort_order: d.sort_order,
    is_active: d.is_active,
  });
  revalidateSite();
  revalidatePath("/admin/galeri");
  return res;
}

export async function deleteGallery(id: string): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb.from("gallery_items").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/galeri");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/* ---------------- Kampanyalar ---------------- */

export async function saveCampaign(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(campaignSchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const res = await persist(guard.sb, "campaigns", getId(formData), {
    title: d.title,
    description: d.description || null,
    image_url: d.image_url || null,
    starts_at: d.starts_at || null,
    ends_at: d.ends_at || null,
    show_on_home: d.show_on_home,
    sort_order: d.sort_order,
    is_active: d.is_active,
  });
  revalidateSite();
  revalidatePath("/admin/kampanyalar");
  return res;
}

export async function deleteCampaign(id: string): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb.from("campaigns").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/kampanyalar");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/* ---------------- Yorumlar ---------------- */

export async function saveTestimonial(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(testimonialSchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const res = await persist(guard.sb, "testimonials", getId(formData), {
    name: d.name,
    comment: d.comment,
    rating: d.rating,
    source: d.source || null,
    sort_order: d.sort_order,
    is_active: d.is_active,
  });
  revalidateSite();
  revalidatePath("/admin/yorumlar");
  return res;
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb.from("testimonials").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/yorumlar");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/* ---------------- Sosyal Medya ---------------- */

export async function saveSocial(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(socialSchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const res = await persist(guard.sb, "social_posts", getId(formData), {
    title: d.title || null,
    image_url: d.image_url,
    link_url: d.link_url || null,
    sort_order: d.sort_order,
    is_active: d.is_active,
  });
  revalidateSite();
  revalidatePath("/admin/sosyal");
  return res;
}

export async function deleteSocial(id: string): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const { error } = await guard.sb.from("social_posts").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/sosyal");
  return error ? { ok: false, error: error.message } : { ok: true };
}

/* ---------------- Site Ayarları ---------------- */

export async function saveSettings(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(settingsSchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  const id = getId(formData);
  const values = {
    ...d,
    logo_url: d.logo_url || null,
    favicon_url: d.favicon_url || null,
    og_image_url: d.og_image_url || null,
    hero_video_url: d.hero_video_url || null,
  };
  let res: ActionResult;
  if (id && id !== "default") {
    res = await persist(guard.sb, "site_settings", id, values);
  } else {
    // Tek satırlık ayar kaydı: varsa güncelle, yoksa ekle
    const { data: existing } = await guard.sb
      .from("site_settings")
      .select("id")
      .limit(1)
      .maybeSingle();
    res = await persist(
      guard.sb,
      "site_settings",
      (existing?.id as string) || null,
      values,
    );
  }
  revalidateSite();
  revalidatePath("/admin/ayarlar");
  return res;
}

/* ---------------- İçerik Bölümleri ---------------- */

export async function saveContent(formData: FormData): Promise<ActionResult> {
  const guard = await withAdmin();
  if (!guard.ok) return guard;
  const p = parse(contentSchema, formData);
  if (!p.ok) return p;
  const d = p.data;
  let dataJson: unknown = null;
  if (d.data && d.data.trim()) {
    try {
      dataJson = JSON.parse(d.data);
    } catch {
      return { ok: false, error: "Veri (JSON) alanı geçerli bir JSON değil." };
    }
  }
  const { error } = await guard.sb.from("content_sections").upsert(
    {
      key: d.key,
      title: d.title || null,
      subtitle: d.subtitle || null,
      body: d.body || null,
      image_url: d.image_url || null,
      data: dataJson,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );
  revalidateSite();
  revalidatePath("/admin/icerik");
  return error ? { ok: false, error: error.message } : { ok: true };
}

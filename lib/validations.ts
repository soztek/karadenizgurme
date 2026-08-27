import { z } from "zod";

/** FormData/JSON'dan gelen boolean değerleri güvenli çözer ("false" -> false). */
const zBool = (def = false) =>
  z.preprocess(
    (v) => v === true || v === "true" || v === "on" || v === "1",
    z.boolean(),
  ).default(def);

/** Virgülle ayrılmış metin veya JSON dizi -> string[] */
const zStringArray = z.preprocess((v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return [];
    if (s.startsWith("[")) {
      try {
        return JSON.parse(s);
      } catch {
        return [];
      }
    }
    return s.split(",").map((x) => x.trim()).filter(Boolean);
  }
  return [];
}, z.array(z.string()));

const optionalNumber = z
  .union([z.string(), z.number()])
  .transform((v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = typeof v === "number" ? v : parseFloat(v.replace(",", "."));
    return Number.isFinite(n) ? n : null;
  })
  .nullable();

export const categorySchema = z.object({
  title: z.string().trim().min(2, "Kategori adı en az 2 karakter olmalı."),
  slug: z.string().trim().optional().default(""),
  description: z.string().trim().max(300).optional().default(""),
  image_url: z.string().trim().optional().default(""),
  sort_order: z.coerce.number().int().default(0),
  is_active: zBool(true),
});

export const menuItemSchema = z.object({
  category_id: z.string().min(1, "Kategori seçiniz."),
  title: z.string().trim().min(2, "Ürün adı en az 2 karakter olmalı."),
  slug: z.string().trim().optional().default(""),
  description: z.string().trim().max(600).optional().default(""),
  price: optionalNumber,
  discount_price: optionalNumber,
  image_url: z.string().trim().optional().default(""),
  is_available: zBool(true),
  is_featured: zBool(false),
  is_active: zBool(true),
  allergens: zStringArray.optional().default([]),
  tags: zStringArray.optional().default([]),
  sort_order: z.coerce.number().int().default(0),
});

export const gallerySchema = z.object({
  title: z.string().trim().max(160).optional().default(""),
  description: z.string().trim().max(300).optional().default(""),
  image_url: z.string().trim().min(1, "Görsel gerekli."),
  category: z.string().trim().optional().default(""),
  sort_order: z.coerce.number().int().default(0),
  is_active: zBool(true),
});

export const campaignSchema = z.object({
  title: z.string().trim().min(2, "Başlık gerekli."),
  description: z.string().trim().max(600).optional().default(""),
  image_url: z.string().trim().optional().default(""),
  starts_at: z.string().trim().optional().default(""),
  ends_at: z.string().trim().optional().default(""),
  show_on_home: zBool(true),
  sort_order: z.coerce.number().int().default(0),
  is_active: zBool(true),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(2, "İsim gerekli."),
  comment: z.string().trim().min(4, "Yorum gerekli.").max(600),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  source: z.string().trim().max(80).optional().default(""),
  sort_order: z.coerce.number().int().default(0),
  is_active: zBool(false),
});

export const socialSchema = z.object({
  title: z.string().trim().max(160).optional().default(""),
  image_url: z.string().trim().min(1, "Görsel gerekli."),
  link_url: z.string().trim().optional().default(""),
  sort_order: z.coerce.number().int().default(0),
  is_active: zBool(true),
});

export const settingsSchema = z.object({
  business_name: z.string().trim().min(2),
  short_name: z.string().trim().min(2),
  slogan: z.string().trim().default(""),
  hero_title: z.string().trim().default(""),
  hero_subtitle: z.string().trim().default(""),
  logo_url: z.string().trim().default(""),
  favicon_url: z.string().trim().default(""),
  phone: z.string().trim().default(""),
  whatsapp: z.string().trim().default(""),
  address: z.string().trim().default(""),
  working_hours: z.string().trim().default(""),
  map_lat: optionalNumber,
  map_lng: optionalNumber,
  google_maps_url: z.string().trim().default(""),
  yandex_maps_url: z.string().trim().default(""),
  apple_maps_url: z.string().trim().default(""),
  instagram_url: z.string().trim().default(""),
  instagram_handle: z.string().trim().default(""),
  direction_istanbul: z.string().trim().default(""),
  direction_izmir: z.string().trim().default(""),
  km_istanbul: z.string().trim().default(""),
  km_izmir: z.string().trim().default(""),
  entry_info: z.string().trim().default(""),
  lost_found_phone: z.string().trim().default(""),
  seo_title: z.string().trim().default(""),
  seo_description: z.string().trim().default(""),
  og_image_url: z.string().trim().default(""),
  hero_video_url: z.string().trim().default(""),
});

export const facilitySchema = z.object({
  kind: z.enum([
    "restoran",
    "kafe",
    "akaryakit",
    "ev_sarj",
    "magaza",
    "atm",
    "hizmet",
  ]),
  name: z.string().trim().min(2, "Ad gerekli."),
  description: z.string().trim().max(400).optional().default(""),
  detail: z.string().trim().max(300).optional().default(""),
  image_url: z.string().trim().optional().default(""),
  sort_order: z.coerce.number().int().default(0),
  is_active: zBool(true),
});

export const contentSchema = z.object({
  key: z.string().trim().min(1),
  title: z.string().trim().optional().default(""),
  subtitle: z.string().trim().optional().default(""),
  body: z.string().trim().optional().default(""),
  image_url: z.string().trim().optional().default(""),
  data: z.string().optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Lütfen adınızı girin.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Geçerli bir telefon girin.")
    .max(30)
    .optional()
    .or(z.literal("")),
  email: z.string().trim().email("Geçerli bir e-posta girin.").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, "Lütfen mesajınızı yazın.")
    .max(1500, "Mesaj çok uzun."),
  // Bot tuzağı (honeypot) — doldurulmuş olmamalı
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

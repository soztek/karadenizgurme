/**
 * seed-data.json -> supabase/seed.sql üretir.
 * Çalıştır: node scripts/gen-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const seed = JSON.parse(
  fs.readFileSync(path.join(root, "supabase", "seed-data.json"), "utf8"),
);

const q = (v) =>
  v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`;
const num = (v) => (v === null || v === undefined || v === "" ? "NULL" : v);
const arr = (a) =>
  !a || a.length === 0
    ? "'{}'"
    : `ARRAY[${a.map((x) => q(x)).join(",")}]::text[]`;
const bool = (v) => (v ? "true" : "false");

let out = `-- Karadeniz Gurme — örnek veri (seed)
-- 0001_init.sql çalıştırıldıktan SONRA çalıştırın.
-- Not: Bu betik tekrar çalıştırılabilir olması için önce mevcut kayıtları temizler.

begin;

truncate table public.menu_items, public.categories, public.gallery_items,
  public.social_posts, public.testimonials, public.campaigns,
  public.content_sections, public.facility_items restart identity cascade;

`;

// Site ayarları (tek satır — upsert)
const s = seed.settings;
out += `-- Site ayarları
insert into public.site_settings (
  business_name, short_name, slogan, hero_title, hero_subtitle, logo_url,
  phone, whatsapp, address, working_hours, map_lat, map_lng,
  google_maps_url, yandex_maps_url, apple_maps_url, instagram_url, instagram_handle,
  direction_istanbul, direction_izmir, km_istanbul, km_izmir, entry_info, lost_found_phone,
  seo_title, seo_description, og_image_url
)
select ${q(s.business_name)}, ${q(s.short_name)}, ${q(s.slogan)}, ${q(s.hero_title)}, ${q(s.hero_subtitle)}, ${q(s.logo_url)},
  ${q(s.phone)}, ${q(s.whatsapp)}, ${q(s.address)}, ${q(s.working_hours)}, ${num(s.map_lat)}, ${num(s.map_lng)},
  ${q(s.google_maps_url)}, ${q(s.yandex_maps_url)}, ${q(s.apple_maps_url)}, ${q(s.instagram_url)}, ${q(s.instagram_handle)},
  ${q(s.direction_istanbul)}, ${q(s.direction_izmir)}, ${q(s.km_istanbul)}, ${q(s.km_izmir)}, ${q(s.entry_info)}, ${q(s.lost_found_phone)},
  ${q(s.seo_title)}, ${q(s.seo_description)}, ${q(s.og_image_url)}
where not exists (select 1 from public.site_settings);

`;

// Kategoriler
out += `-- Kategoriler\n`;
for (const c of seed.categories) {
  out += `insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values (${q(c.slug)}, ${q(c.title)}, ${q(c.description)}, ${q(c.image_url || null)}, ${c.sort_order}, true);\n`;
}
out += "\n";

// Ürünler
out += `-- Menü ürünleri\n`;
let order = 0;
for (const it of seed.items) {
  order += 1;
  out += `insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug=${q(it.category)}),
  ${q(it.title)}, ${q(slugify(it.title))}, ${q(it.description || null)},
  ${num(it.price)}, ${num(it.discount_price)}, ${q(it.image_url || null)},
  ${bool(it.is_available !== false)}, ${bool(it.is_featured === true)},
  ${arr(it.allergens)}, ${arr(it.tags)}, ${order}, true
);\n`;
}
out += "\n";

// Galeri
out += `-- Galeri\n`;
for (const g of seed.gallery) {
  out += `insert into public.gallery_items (title, image_url, sort_order, is_active)
values (${q(g.title || null)}, ${q(g.image_url)}, ${g.sort_order}, true);\n`;
}
out += "\n";

// Sosyal
out += `-- Sosyal medya gönderileri\n`;
for (const p of seed.social_posts) {
  out += `insert into public.social_posts (title, image_url, link_url, sort_order, is_active)
values (${q(p.title || null)}, ${q(p.image_url)}, ${q(p.link_url || null)}, ${p.sort_order}, true);\n`;
}
out += "\n";

// Tesis Rehberi
out += `-- Tesis Rehberi öğeleri\n`;
for (const f of seed.facility_items || []) {
  out += `insert into public.facility_items (kind, name, description, detail, image_url, sort_order, is_active)
values (${q(f.kind)}, ${q(f.name)}, ${q(f.description || null)}, ${q(f.detail || null)}, ${q(f.image_url || null)}, ${f.sort_order || 0}, true);\n`;
}
out += "\n";

// Yorumlar
out += `-- Müşteri yorumları\n`;
for (const t of seed.testimonials || []) {
  out += `insert into public.testimonials (name, comment, rating, source, sort_order, is_active)
values (${q(t.name)}, ${q(t.comment)}, ${t.rating || 5}, ${q(t.source || null)}, ${t.sort_order || 0}, ${bool(t.is_active === true)});\n`;
}
out += "\n";

// İçerik bölümleri
out += `-- İçerik bölümleri (hikâye, özellik kartları)\n`;
const story = seed.content.story;
out += `insert into public.content_sections (key, title, subtitle, body, image_url)
values ('story', ${q(story.title)}, ${q(story.subtitle)}, ${q(story.body)}, ${q(story.image_url)});\n`;
const why = seed.content.why_us;
out += `insert into public.content_sections (key, title, subtitle, data)
values ('why_us', ${q(why.title)}, ${q(why.subtitle)}, ${q(JSON.stringify({ features: why.features }))}::jsonb);\n`;
const am = seed.content.amenities;
if (am) {
  out += `insert into public.content_sections (key, title, subtitle, data)
values ('amenities', ${q(am.title)}, ${q(am.subtitle)}, ${q(JSON.stringify({ items: am.items }))}::jsonb);\n`;
}

out += `
commit;

-- YÖNETİCİ EKLE: Supabase Authentication > Users bölümünden bir kullanıcı
-- oluşturduktan sonra aynı e-posta ile aşağıdaki satırı çalıştırın:
-- insert into public.admins (email, name) values ('eposta@ornek.com', 'Yönetici');
`;

fs.writeFileSync(path.join(root, "supabase", "seed.sql"), out, "utf8");
console.log("supabase/seed.sql oluşturuldu.");

function slugify(input) {
  const map = { ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u" };
  return String(input)
    .trim()
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (m) => map[m] || m)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

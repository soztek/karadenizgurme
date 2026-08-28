-- Karadeniz Gurme — örnek veri (seed)
-- 0001_init.sql çalıştırıldıktan SONRA çalıştırın.
-- Not: Bu betik tekrar çalıştırılabilir olması için önce mevcut kayıtları temizler.

begin;

truncate table public.menu_items, public.categories, public.gallery_items,
  public.social_posts, public.testimonials, public.campaigns,
  public.content_sections, public.facility_items, public.amenities restart identity cascade;

-- Site ayarları
insert into public.site_settings (
  business_name, short_name, slogan, hero_title, hero_subtitle, logo_url,
  phone, whatsapp, address, working_hours, map_lat, map_lng,
  google_maps_url, yandex_maps_url, apple_maps_url, instagram_url, instagram_handle,
  direction_istanbul, direction_izmir, km_istanbul, km_izmir, entry_info, lost_found_phone,
  seo_title, seo_description, og_image_url, show_prices
)
select 'İsmet Akbulut Karadeniz Gurme', 'Karadeniz Gurme', 'Karadeniz''in Lezzeti, Yolculuğun En Güzel Molası', 'Karadeniz''in Gerçek Lezzetleri Oksijen 266''da', 'İstanbul–İzmir Otoyolu üzerindeki Karadeniz Gurme''de yöresel yemekler, sıcacık bir sofra ve keyifli bir mola sizi bekliyor.', '/images/brand/logo.png',
  '0532 248 30 19', '0532 248 30 19', 'Oksijen 266, 12. Sokak No:191/A, Savaştepe / Balıkesir (İstanbul–İzmir Otoyolu)', 'Her gün 24 saat açık (7/24)', NULL, NULL,
  'https://www.google.com/maps/search/?api=1&query=Karadeniz+Gurme+Oksijen+266+Sava%C5%9Ftepe', '', '', 'https://www.instagram.com/karadenizgurmeoksijen266/', 'karadenizgurmeoksijen266',
  'İstanbul yönünden gelenler için ulaşım açıklaması yönetim panelinden girilecektir.', 'İzmir yönünden gelenler için ulaşım açıklaması yönetim panelinden girilecektir.', '', '', '', '',
  'Karadeniz Gurme | Oksijen 266 – İstanbul İzmir Otoyolu Karadeniz Mutfağı', 'İstanbul–İzmir Otoyolu Oksijen 266''da Karadeniz Gurme; kuymak, pide, ızgara ve yöresel lezzetlerle yolculuğunuzun en güzel molası. Menü, yol tarifi ve iletişim.', '/images/hero/hero-1.png', false
where not exists (select 1 from public.site_settings);

-- Kategoriler
insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values ('yemek-cesitleri', 'Yemek Çeşitleri', 'Karadeniz mutfağından günlük hazırlanan doyurucu ana yemekler ve çorbalar.', '/images/hero/yemekler.png', 1, true);
insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values ('pide-cesitleri', 'Pide Çeşitleri', 'Taş fırından çıkan Karadeniz pideleri.', '/images/hero/pide.png', 2, true);
insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values ('salatalar-mezeler', 'Salatalar & Mezeler', 'Sofranıza eşlik eden meze, yoğurt ve yan lezzetler.', '/images/categories/salata.png', 3, true);
insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values ('izgara-cesitleri', 'Izgara Çeşitleri', 'Mangalın üzerinde, ustaca pişen etler.', '/images/categories/izgaralaaarrr.jpg', 4, true);
insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values ('soguk-icecekler', 'Soğuk İçecekler', 'Ayran, limonata, soda ve soğuk içecekler.', '/images/categories/soguk-iceceklerrr.jpg', 5, true);
insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values ('tatlilar', 'Tatlılar', 'Baklavadan Hamsiköy sütlacına yöresel tatlılar.', '/images/categories/tatliiiilar.webp', 6, true);
insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values ('fast-food-cesitleri', 'Fast Food Çeşitleri', 'Burger, tost, gözleme, börek ve sıcak içecekler.', '/images/categories/fast-food.png', 7, true);
insert into public.categories (slug, title, description, image_url, sort_order, is_active)
values ('kahvalti-cesitleri', 'Kahvaltı Çeşitleri', 'Güne yöresel bir kahvaltıyla başlayın.', '/images/categories/kahvaltilik.jpg', 8, true);

-- Menü ürünleri
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Patates Püre', 'patates-pure', NULL,
  150, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 1, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Bulgur Pilavı', 'bulgur-pilavi', NULL,
  200, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 2, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Çorbalar', 'corbalar', 'Günün taze çorbaları.',
  200, NULL, NULL,
  true, false,
  '{}', '{}', 3, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Makarna', 'makarna', NULL,
  200, NULL, NULL,
  true, false,
  '{}', '{}', 4, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Pirinç Pilavı', 'pirinc-pilavi', NULL,
  220, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 5, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Tavuk Suyu', 'tavuk-suyu', NULL,
  220, NULL, NULL,
  true, false,
  '{}', '{}', 6, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Düğün Çorbası', 'dugun-corbasi', 'Terbiyeli geleneksel düğün çorbası.',
  260, NULL, NULL,
  true, false,
  '{}', '{}', 7, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'İç Pilav', 'ic-pilav', NULL,
  270, NULL, NULL,
  true, false,
  '{}', '{}', 8, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Tavuklu Pilav', 'tavuklu-pilav', NULL,
  290, NULL, NULL,
  true, false,
  '{}', '{}', 9, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Nohut', 'nohut', NULL,
  320, NULL, NULL,
  true, false,
  '{}', '{}', 10, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Fırın Makarna', 'firin-makarna', NULL,
  370, NULL, NULL,
  true, false,
  '{}', '{}', 11, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Biber Dolması', 'biber-dolmasi', NULL,
  390, NULL, NULL,
  true, false,
  '{}', '{}', 12, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Çayeli Kuru Fasulye', 'cayeli-kuru-fasulye', 'Karadeniz usulü kuru fasulye.',
  400, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 13, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Musakka', 'musakka', NULL,
  440, NULL, NULL,
  true, false,
  '{}', '{}', 14, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Köfte Çeşitleri', 'kofte-cesitleri', NULL,
  470, NULL, NULL,
  true, false,
  '{}', '{}', 15, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Karalahana Sarma', 'karalahana-sarma', 'Karadeniz''in vazgeçilmezi karalahana sarma.',
  480, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 16, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Tavuk Yemekleri', 'tavuk-yemekleri', NULL,
  480, NULL, NULL,
  true, false,
  '{}', '{}', 17, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Kadın Budu Köfte', 'kadin-budu-kofte', NULL,
  490, NULL, NULL,
  true, false,
  '{}', '{}', 18, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Tavuklu Ankara Tava', 'tavuklu-ankara-tava', NULL,
  520, NULL, NULL,
  true, false,
  '{}', '{}', 19, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Kaşarlı Köfte Çeşitleri', 'kasarli-kofte-cesitleri', NULL,
  550, NULL, NULL,
  true, false,
  '{}', '{}', 20, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Et Yemekleri', 'et-yemekleri', NULL,
  570, NULL, NULL,
  true, false,
  '{}', '{}', 21, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Patlıcan Kebap', 'patlican-kebap', NULL,
  590, NULL, NULL,
  true, false,
  '{}', '{}', 22, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Arnavut Ciğeri', 'arnavut-cigeri', NULL,
  600, NULL, NULL,
  true, false,
  '{}', '{}', 23, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Etli Güveç', 'etli-guvec', NULL,
  670, NULL, NULL,
  true, false,
  '{}', '{}', 24, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Dana Etli Elbasan Tava', 'dana-etli-elbasan-tava', NULL,
  670, NULL, NULL,
  true, false,
  '{}', '{}', 25, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Karadeniz Kavurma', 'karadeniz-kavurma', 'Bol tereyağıyla kavrulan Karadeniz usulü et kavurma.',
  690, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 26, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Kuzu Tandır', 'kuzu-tandir', NULL,
  830, NULL, NULL,
  true, false,
  '{}', '{}', 27, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Ankara Tava', 'ankara-tava', NULL,
  850, NULL, NULL,
  true, false,
  '{}', '{}', 28, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Kuzu İncik Haşlama', 'kuzu-incik-haslama', NULL,
  850, NULL, NULL,
  true, false,
  '{}', '{}', 29, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Trabzon 4''lü', 'trabzon-4-lu', 'Trabzon usulü dört çeşit bir arada.',
  880, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 30, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='yemek-cesitleri'),
  'Aşçı Tabağı', 'asci-tabagi', 'Şefin özel karışık tabağı.',
  890, NULL, NULL,
  true, false,
  '{}', '{}', 31, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Açık Kaşarlı Pide', 'acik-kasarli-pide', NULL,
  550, NULL, NULL,
  true, false,
  '{}', '{}', 32, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Trabzon Peynirli Pide Klasik', 'trabzon-peynirli-pide-klasik', 'Trabzon peyniriyle klasik pide.',
  550, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 33, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Bafra Kapalı Kıymalı Pide', 'bafra-kapali-kiymali-pide', NULL,
  510, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 34, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Trabzon Kıymalı Pide', 'trabzon-kiymali-pide', NULL,
  530, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 35, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Açık Kıymalı Pide', 'acik-kiymali-pide', NULL,
  530, NULL, NULL,
  true, false,
  '{}', '{}', 36, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Açık Kuşbaşılı Pide', 'acik-kusbasili-pide', NULL,
  570, NULL, NULL,
  true, false,
  '{}', '{}', 37, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Kıymalı Kaşarlı Pide', 'kiymali-kasarli-pide', NULL,
  570, NULL, NULL,
  true, false,
  '{}', '{}', 38, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Sucuklu Kaşarlı Pide', 'sucuklu-kasarli-pide', NULL,
  560, NULL, NULL,
  true, false,
  '{}', '{}', 39, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Trabzon Kavurmalı', 'trabzon-kavurmali', NULL,
  650, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 40, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Kuşbaşılı Kaşarlı Pide', 'kusbasili-kasarli-pide', NULL,
  580, NULL, NULL,
  true, false,
  '{}', '{}', 41, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Kavurmalı Kaşarlı Pide', 'kavurmali-kasarli-pide', NULL,
  650, NULL, NULL,
  true, false,
  '{}', '{}', 42, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Açık Karışık Pide', 'acik-karisik-pide', NULL,
  610, NULL, NULL,
  true, false,
  '{}', '{}', 43, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='pide-cesitleri'),
  'Pastırmalı Pide', 'pastirmali-pide', NULL,
  650, NULL, NULL,
  true, false,
  '{}', '{}', 44, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='salatalar-mezeler'),
  'Açık Yoğurt', 'acik-yogurt', NULL,
  80, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 45, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='salatalar-mezeler'),
  'Güveç Yoğurt', 'guvec-yogurt', NULL,
  120, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 46, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='salatalar-mezeler'),
  'Cacık', 'cacik', NULL,
  90, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 47, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='salatalar-mezeler'),
  'Kutu Ayran', 'kutu-ayran', NULL,
  90, NULL, NULL,
  true, false,
  '{}', '{}', 48, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='salatalar-mezeler'),
  'Kutu İçecekler', 'kutu-icecekler', NULL,
  110, NULL, NULL,
  true, false,
  '{}', '{}', 49, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='salatalar-mezeler'),
  'Şişe Ayran', 'sise-ayran', NULL,
  100, NULL, NULL,
  true, false,
  '{}', '{}', 50, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='salatalar-mezeler'),
  'Meze Çeşitleri (Tabak)', 'meze-cesitleri-tabak', 'Çeşitli mezelerden oluşan tabak.',
  270, NULL, NULL,
  true, false,
  '{}', '{}', 51, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='izgara-cesitleri'),
  'Dana Bonfile', 'dana-bonfile', 'Yumuşacık dana bonfile, ızgarada.',
  900, NULL, '/images/menu/dana-bonfi-le.webp',
  true, true,
  '{}', '{}', 52, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='izgara-cesitleri'),
  'Karışık Izgara', 'karisik-izgara', 'Farklı et çeşitleriyle zengin ızgara tabağı.',
  1400, NULL, NULL,
  true, false,
  '{}', '{}', 53, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='izgara-cesitleri'),
  'Adana - Urfa Kebap', 'adana-urfa-kebap', 'Odun ateşinde acılı veya acısız kebap.',
  750, NULL, NULL,
  true, false,
  '{}', ARRAY['Acı']::text[], 54, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='izgara-cesitleri'),
  'Tavuk Kanat', 'tavuk-kanat', NULL,
  600, NULL, NULL,
  true, false,
  '{}', '{}', 55, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='izgara-cesitleri'),
  'Tavuk Pirzola', 'tavuk-pirzola', NULL,
  600, NULL, NULL,
  true, false,
  '{}', '{}', 56, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='izgara-cesitleri'),
  'Akçaabat Köfte', 'akcaabat-kofte', 'Karadeniz''in meşhur Akçaabat köftesi.',
  650, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 57, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Pet Su Çeşitleri', 'pet-su-cesitleri', NULL,
  30, NULL, NULL,
  true, false,
  '{}', '{}', 58, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Cam Su Çeşitleri', 'cam-su-cesitleri', NULL,
  50, NULL, NULL,
  true, false,
  '{}', '{}', 59, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Kutu Kola - Fanta - Meyve Suyu', 'kutu-kola-fanta-meyve-suyu', NULL,
  110, NULL, NULL,
  true, false,
  '{}', '{}', 60, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Şişe Kola - Fanta - Gazoz', 'sise-kola-fanta-gazoz', NULL,
  110, NULL, NULL,
  true, false,
  '{}', '{}', 61, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Cam Şişe Meyve Suları', 'cam-sise-meyve-sulari', NULL,
  80, NULL, NULL,
  true, false,
  '{}', '{}', 62, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Sade Sodalar', 'sade-sodalar', NULL,
  40, NULL, NULL,
  true, false,
  '{}', '{}', 63, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Meyveli Sodalar', 'meyveli-sodalar', NULL,
  60, NULL, NULL,
  true, false,
  '{}', '{}', 64, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Enerji İçecekleri', 'enerji-icecekleri', NULL,
  110, NULL, NULL,
  true, false,
  '{}', '{}', 65, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Şalgam Çeşitleri', 'salgam-cesitleri', NULL,
  70, NULL, NULL,
  true, false,
  '{}', '{}', 66, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Komposto Çeşitleri', 'komposto-cesitleri', NULL,
  140, NULL, NULL,
  true, false,
  '{}', '{}', 67, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Mineralli Su', 'mineralli-su', NULL,
  50, NULL, NULL,
  true, false,
  '{}', '{}', 68, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Susurluk Ayranı', 'susurluk-ayrani', 'Köpüklü Susurluk ayranı.',
  120, NULL, NULL,
  true, false,
  '{}', '{}', 69, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Cam Şişe Ayran', 'cam-sise-ayran', NULL,
  100, NULL, NULL,
  true, false,
  '{}', '{}', 70, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Ayran Pet', 'ayran-pet', NULL,
  90, NULL, NULL,
  true, false,
  '{}', '{}', 71, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Taze Sıkma Portakal Suları', 'taze-sikma-portakal-sulari', 'Günlük sıkılan taze portakal suyu.',
  140, NULL, '/images/menu/portakal-suyu.webp',
  true, true,
  '{}', '{}', 72, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='soguk-icecekler'),
  'Açık Limonata Çeşitleri', 'acik-limonata-cesitleri', NULL,
  140, NULL, NULL,
  true, false,
  '{}', '{}', 73, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='tatlilar'),
  'Baklava Çeşitleri', 'baklava-cesitleri', 'Kat kat, cevizli ve fıstıklı baklava çeşitleri.',
  260, NULL, '/images/menu/baklava.webp',
  true, true,
  ARRAY['Gluten','Sert kabuklu yemiş']::text[], '{}', 74, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='tatlilar'),
  'Hamsiköy Sütlaç', 'hamsikoy-sutlac', 'Karadeniz''in meşhur Hamsiköy sütlacı.',
  260, NULL, '/images/menu/sutlac.webp',
  true, true,
  ARRAY['Süt']::text[], ARRAY['Yöresel']::text[], 75, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='tatlilar'),
  'Laz Böreği Tatlısı', 'laz-boregi-tatlisi', 'Muhallebili geleneksel Laz böreği.',
  270, NULL, NULL,
  true, false,
  ARRAY['Gluten','Süt']::text[], ARRAY['Yöresel']::text[], 76, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='tatlilar'),
  'Diğer Tatlı Çeşitleri', 'diger-tatli-cesitleri', 'Günlük hazırlanan tatlı çeşitleri.',
  230, NULL, '/images/menu/profi-terol.webp',
  true, true,
  '{}', '{}', 77, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Üzümlü Çörek', 'uzumlu-corek', NULL,
  130, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 78, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Rulo Börek', 'rulo-borek', NULL,
  90, NULL, NULL,
  true, false,
  '{}', '{}', 79, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Balkan Çöreği', 'balkan-coregi', NULL,
  130, NULL, NULL,
  true, false,
  '{}', '{}', 80, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Kıymalı Rulo Börek', 'kiymali-rulo-borek', NULL,
  120, NULL, NULL,
  true, false,
  '{}', '{}', 81, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Kruvasan', 'kruvasan', NULL,
  130, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 82, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Hamburger', 'hamburger', NULL,
  340, NULL, NULL,
  true, false,
  '{}', '{}', 83, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Tavuk Burger', 'tavuk-burger', NULL,
  340, NULL, NULL,
  true, false,
  '{}', '{}', 84, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Gurme Burger', 'gurme-burger', 'Özel soslu gurme burger.',
  360, NULL, NULL,
  true, false,
  '{}', '{}', 85, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Cheese Burger', 'cheese-burger', NULL,
  350, NULL, NULL,
  true, false,
  '{}', '{}', 86, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Çay', 'cay', NULL,
  40, NULL, NULL,
  true, false,
  '{}', '{}', 87, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Türk Kahvesi', 'turk-kahvesi', 'Közde pişmiş Türk kahvesi.',
  120, NULL, '/images/menu/turk-kahvesi.webp',
  true, true,
  '{}', '{}', 88, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Makine Kahveleri', 'makine-kahveleri', 'Espresso, latte, cappuccino ve filtre kahve.',
  170, NULL, '/images/menu/fi-ltre-kahve.webp',
  true, true,
  '{}', '{}', 89, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Ispanaklı Gözleme', 'ispanakli-gozleme', NULL,
  250, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 90, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Peynirli Gözleme', 'peynirli-gozleme', NULL,
  280, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 91, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Kıymalı Gözleme', 'kiymali-gozleme', NULL,
  290, NULL, NULL,
  true, false,
  '{}', '{}', 92, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Beyaz Peynirli Sandviç', 'beyaz-peynirli-sandvic', NULL,
  190, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 93, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Kaşar Peynirli Sandviç', 'kasar-peynirli-sandvic', NULL,
  200, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 94, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Salamlı Kaşarlı Sandviç', 'salamli-kasarli-sandvic', NULL,
  290, NULL, NULL,
  true, false,
  '{}', '{}', 95, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Tek Kaşarlı Tost', 'tek-kasarli-tost', NULL,
  230, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 96, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Sucuklu Tost', 'sucuklu-tost', NULL,
  250, NULL, NULL,
  true, false,
  '{}', '{}', 97, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Çift Kaşarlı Karışık Tost', 'cift-kasarli-karisik-tost', NULL,
  280, NULL, NULL,
  true, false,
  '{}', '{}', 98, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Çift Kaşarlı Tost', 'cift-kasarli-tost', NULL,
  250, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 99, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Karışık Tost', 'karisik-tost', NULL,
  270, NULL, NULL,
  true, false,
  '{}', '{}', 100, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='fast-food-cesitleri'),
  'Susurluk Tost', 'susurluk-tost', 'Susurluk usulü tost.',
  240, NULL, NULL,
  true, false,
  '{}', '{}', 101, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Patates Kızartması', 'patates-kizartmasi', NULL,
  170, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 102, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Söğüş Tabağı', 'sogus-tabagi', NULL,
  170, NULL, NULL,
  true, false,
  '{}', ARRAY['Vejetaryen']::text[], 103, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Tereyağlı Yumurta', 'tereyagli-yumurta', NULL,
  200, NULL, NULL,
  true, false,
  '{}', '{}', 104, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Omlet Çeşitleri', 'omlet-cesitleri', NULL,
  230, NULL, NULL,
  true, false,
  '{}', '{}', 105, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Kaşarlı Omlet Çeşitleri', 'kasarli-omlet-cesitleri', NULL,
  280, NULL, NULL,
  true, false,
  '{}', '{}', 106, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Kaygana', 'kaygana', 'Karadeniz''e özgü otlu kaygana.',
  220, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 107, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Minzili Yumurta', 'minzili-yumurta', NULL,
  220, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 108, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Tavada Sucuk', 'tavada-sucuk', NULL,
  270, NULL, NULL,
  true, false,
  '{}', '{}', 109, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Peynir Tabağı', 'peynir-tabagi', 'Yöresel peynir çeşitleri.',
  270, NULL, '/images/menu/karisik-peyni-r-tabagi.webp',
  true, true,
  '{}', ARRAY['Vejetaryen']::text[], 110, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Çakallı Menemeni', 'cakalli-menemeni', NULL,
  300, NULL, NULL,
  true, false,
  '{}', '{}', 111, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Kuymak', 'kuymak', 'Tereyağı, mısır unu ve bol kaşar peyniriyle geleneksel Karadeniz kuymağı.',
  370, NULL, NULL,
  true, false,
  '{}', ARRAY['Yöresel']::text[], 112, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Sucuklu Yumurta', 'sucuklu-yumurta', NULL,
  350, NULL, NULL,
  true, false,
  '{}', '{}', 113, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Kahvaltı Tabağı', 'kahvalti-tabagi', 'Zengin içerikli tek kişilik kahvaltı tabağı.',
  550, NULL, NULL,
  true, false,
  '{}', '{}', 114, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Kavurmalı Yumurta', 'kavurmali-yumurta', NULL,
  500, NULL, NULL,
  true, false,
  '{}', '{}', 115, true
);
insert into public.menu_items
  (category_id, title, slug, description, price, discount_price, image_url, is_available, is_featured, allergens, tags, sort_order, is_active)
values (
  (select id from public.categories where slug='kahvalti-cesitleri'),
  'Serpme Kahvaltı 2 Kişilik', 'serpme-kahvalti-2-kisilik', 'İki kişilik zengin serpme kahvaltı.',
  1250, NULL, NULL,
  true, false,
  '{}', ARRAY['2 Kişilik']::text[], 116, true
);

-- Galeri
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Karadeniz sofrası', '/images/hero/yemekler.png', 1, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Kahvaltı çeşitleri', '/images/hero/kahvalti.png', 2, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Izgara çeşitleri', '/images/hero/izgara.png', 3, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Pide çeşitleri', '/images/hero/pide.png', 4, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Tatlı çeşitleri', '/images/hero/tatli.png', 5, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Dana bonfile', '/images/menu/dana-bonfi-le.webp', 6, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Kuzu kaburga', '/images/menu/kuzu-kaburga.webp', 7, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Baklava', '/images/menu/baklava.webp', 8, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Hamsiköy sütlacı', '/images/menu/sutlac.webp', 9, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Meyveli waffle', '/images/menu/meyveli-waffle.webp', 10, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Türk kahvesi', '/images/menu/turk-kahvesi.webp', 11, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Taze portakal suyu', '/images/menu/portakal-suyu.webp', 12, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Peynir tabağı', '/images/menu/karisik-peyni-r-tabagi.webp', 13, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Izgara çipura', '/images/menu/izgara-ci-pura.webp', 14, true);
insert into public.gallery_items (title, image_url, sort_order, is_active)
values ('Hamsi tava', '/images/menu/hamsi-tava.webp', 15, true);

-- Sosyal medya gönderileri
insert into public.social_posts (title, image_url, link_url, sort_order, is_active)
values ('Instagram', '/images/hero/kahvalti.png', 'https://www.instagram.com/karadenizgurmeoksijen266/', 1, true);
insert into public.social_posts (title, image_url, link_url, sort_order, is_active)
values ('Instagram', '/images/hero/izgara.png', 'https://www.instagram.com/karadenizgurmeoksijen266/', 2, true);
insert into public.social_posts (title, image_url, link_url, sort_order, is_active)
values ('Instagram', '/images/hero/tatli.png', 'https://www.instagram.com/karadenizgurmeoksijen266/', 3, true);
insert into public.social_posts (title, image_url, link_url, sort_order, is_active)
values ('Instagram', '/images/hero/pide.png', 'https://www.instagram.com/karadenizgurmeoksijen266/', 4, true);

-- Tesis Olanakları (ikon şeridi)
insert into public.amenities (icon, label, sort_order, is_active)
values ('parking', 'Otopark', 1, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('fuel', 'Akaryakıt', 2, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('ev', 'EV Şarj', 3, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('mosque', 'Mescid', 4, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('baby', 'Emzirme Odası', 5, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('playground', 'Çocuk Oyun Alanı', 6, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('accessibility', 'Engelli Erişimi', 7, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('toilet', 'Tuvaletler', 8, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('shower', 'Duş', 9, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('pet', 'Evcil Hayvan Alanı', 10, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('atm', 'ATM', 11, true);
insert into public.amenities (icon, label, sort_order, is_active)
values ('wifi', 'Ücretsiz Wi-Fi', 12, true);

-- Tesis Rehberi öğeleri
insert into public.facility_items (kind, name, description, detail, image_url, sort_order, is_active)
values ('restoran', 'İsmet Akbulut Karadeniz Gurme', 'Karadeniz mutfağı, kahvaltı, ızgara, pide ve yöresel lezzetler.', '7/24 açık', NULL, 1, true);
insert into public.facility_items (kind, name, description, detail, image_url, sort_order, is_active)
values ('kafe', 'Kafe & Pastane', 'Sıcak-soğuk içecekler, tatlı ve atıştırmalıklar.', 'Çalışma saati bilgisi güncellenecek', NULL, 2, true);
insert into public.facility_items (kind, name, description, detail, image_url, sort_order, is_active)
values ('akaryakit', 'Akaryakıt İstasyonu', 'Benzin, motorin ve LPG.', 'Marka ve çalışma saati bilgisi panelden girilecek', NULL, 3, true);
insert into public.facility_items (kind, name, description, detail, image_url, sort_order, is_active)
values ('ev_sarj', 'Elektrikli Araç (EV) Şarj İstasyonu', 'Elektrikli araçlar için hızlı şarj.', 'Soket tipi (CCS/Type 2), güç (kW) ve şarj ağı bilgisi panelden girilecek', NULL, 4, true);
insert into public.facility_items (kind, name, description, detail, image_url, sort_order, is_active)
values ('magaza', 'Market / Süpermarket', 'Yolculuk ihtiyaçları ve temel gıda.', 'Çalışma saati bilgisi güncellenecek', NULL, 5, true);
insert into public.facility_items (kind, name, description, detail, image_url, sort_order, is_active)
values ('magaza', 'Yöresel Ürün Reyonu', 'Bölgeye özgü yöresel ürünler ve hediyelikler.', NULL, NULL, 6, true);
insert into public.facility_items (kind, name, description, detail, image_url, sort_order, is_active)
values ('atm', 'ATM', 'Nakit çekim ve bankacılık işlemleri.', 'Banka bilgisi panelden girilecek', NULL, 7, true);

-- Müşteri yorumları
insert into public.testimonials (name, comment, rating, source, sort_order, is_active)
values ('Mehmet Ali Yandan', 'Yemekler çok lezzetli, Şenol Bey''e ilgisinden dolayı çok teşekkür ederiz.', 5, 'Google', 0, true);
insert into public.testimonials (name, comment, rating, source, sort_order, is_active)
values ('Ayşe', 'Lezzetli yemekler ve güzel ilginiz için teşekkürler.', 5, 'Google', 0, true);
insert into public.testimonials (name, comment, rating, source, sort_order, is_active)
values ('Olgun Ersin Kılıç', 'Mükemmel yemekler, harika hizmet, teşekkürler.', 5, 'Google', 0, true);

-- İçerik bölümleri (hikâye, özellik kartları)
insert into public.content_sections (key, title, subtitle, body, image_url)
values ('story', 'Hikâyemiz', 'Karadeniz''den otoyola uzanan bir sofra', 'Karadeniz''den gelen tarifleri yılların mutfak tecrübesiyle İstanbul–İzmir Otoyolu''na taşıyoruz. Amacımız yolculuğunuza yalnızca kısa bir mola değil, hatırlanacak bir sofra eklemek. Günlük hazırladığımız yemeklerimiz, sıcak servisimiz ve samimi ortamımızla her durağı bir buluşmaya dönüştürüyoruz.', '/images/hero/yemekler.png');
insert into public.content_sections (key, title, subtitle, data)
values ('why_us', 'Neden Karadeniz Gurme?', 'Otoyol üzerinde güvenle mola vereceğiniz bir lezzet durağı', '{"features":[{"icon":"ChefHat","title":"Gerçek Karadeniz Mutfağı","description":"Yöreye özgü tarifler, karalahana, kuymak ve daha fazlası."},{"icon":"Sprout","title":"Günlük ve Taze Lezzetler","description":"Yemeklerimiz her gün taze malzemelerle hazırlanır."},{"icon":"Timer","title":"Hızlı Servis","description":"Yolculuğunuzu aksatmadan sıcak servis."},{"icon":"Users","title":"Ailelere Uygun Ortam","description":"Ferah, güvenli ve çocuk dostu bir mola noktası."},{"icon":"MapPin","title":"Otoyol Üzerinde Kolay Ulaşım","description":"Oksijen 266 içerisinde, kolay giriş ve çıkış."},{"icon":"Coffee","title":"7/24 Açık Mola Noktası","description":"Gece gündüz sıcak bir çay ve güzel bir sofra."}]}'::jsonb);
insert into public.content_sections (key, title, subtitle, data)
values ('amenities', 'Tesis Olanakları', 'Oksijen 266 dinlenme tesisinde yolculuğunuzu kolaylaştıran hizmetler.', '{"items":[{"icon":"parking","label":"Otopark"},{"icon":"fuel","label":"Akaryakıt"},{"icon":"ev","label":"EV Şarj"},{"icon":"mosque","label":"Mescid"},{"icon":"baby","label":"Emzirme Odası"},{"icon":"playground","label":"Çocuk Oyun Alanı"},{"icon":"accessibility","label":"Engelli Erişimi"},{"icon":"toilet","label":"Tuvaletler"},{"icon":"shower","label":"Duş"},{"icon":"pet","label":"Evcil Hayvan Alanı"},{"icon":"atm","label":"ATM"},{"icon":"wifi","label":"Ücretsiz Wi-Fi"}]}'::jsonb);

commit;

-- YÖNETİCİ EKLE: Supabase Authentication > Users bölümünden bir kullanıcı
-- oluşturduktan sonra aynı e-posta ile aşağıdaki satırı çalıştırın:
-- insert into public.admins (email, name) values ('eposta@ornek.com', 'Yönetici');

# İsmet Akbulut Karadeniz Gurme — Web Sitesi & Dijital Menü

İstanbul–İzmir Otoyolu **Oksijen 266** dinlenme tesisinde hizmet veren Karadeniz
Gurme için modern, hızlı, mobil öncelikli tanıtım sitesi, QR dijital menü ve
yönetim paneli.

## Teknolojiler

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + `next/font` (Fraunces başlık, Inter gövde)
- **Supabase**: PostgreSQL (veri), Auth (yönetici girişi), Storage (görseller)
- **Zod** (form/veri doğrulama), **lucide-react** (ikonlar), **dnd-kit** (sürükle-bırak sıralama)

> **Demo modu:** Supabase yapılandırılmadan da site çalışır. Bu durumda
> `supabase/seed-data.json` içindeki örnek veriyle (gerçek menü + görseller)
> render edilir; yönetim paneli salt bilgilendirir.

## Sayfalar

Ana Sayfa · Menü (`/menu`, QR için hızlı) · Lezzetlerimiz · Hikâyemiz · Galeri ·
Yol Tarifi · İletişim · KVKK · Gizlilik/Çerez · Yönetim Paneli (`/admin`).

## Kurulum (yerel)

```bash
npm install
cp .env.example .env.local   # ve değerleri doldurun
npm run dev
```

`http://localhost:3000` adresini açın. Supabase değerleri boşsa site demo
verisiyle çalışır.

### Ortam Değişkenleri (`.env.local`)

| Değişken | Açıklama |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yayın adresi (canonical/sitemap/OG). |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL'i. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) anahtarı. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Gizli.** Sunucu tarafı yazma + görsel yükleme. Asla istemciye vermeyin. |

## Veritabanı Kurulumu (Supabase)

1. [supabase.com](https://supabase.com) üzerinde yeni bir proje oluşturun.
2. **Project Settings → API** bölümünden `URL`, `anon` ve `service_role`
   anahtarlarını `.env.local` dosyasına yazın.
3. **SQL Editor**'de sırasıyla çalıştırın:
   - `supabase/migrations/0001_init.sql` — tablolar, RLS, `media` storage bucket, tetikleyiciler.
   - `supabase/seed.sql` — örnek kategoriler, ~130 gerçek menü ürünü, ayarlar, galeri, içerik.
4. **Yönetici oluşturun:**
   - **Authentication → Users → Add user** ile e-posta + şifre belirleyin
     (e-posta onayını kapatın veya kullanıcıyı onaylayın).
   - SQL Editor'de aynı e-postayı yetkilendirin:
     ```sql
     insert into public.admins (email, name) values ('eposta@ornek.com', 'Yönetici');
     ```
5. Artık `/admin/login` üzerinden giriş yapabilirsiniz.

### Görseller

- Gerçek menü fotoğrafları ve marka görselleri `public/images/` altında hazırdır
  (kod içinde `seed-data.json` ile eşlenir).
- Yeni yüklemeler yönetim panelinden **`media`** storage bucket'ına gider ve
  otomatik olarak siteye yansır.

### Seed verisini güncelleme

Menü/ayar örneğini `supabase/seed-data.json` üzerinde düzenleyip SQL'i yeniden
üretebilirsiniz:

```bash
npm run seed:gen   # supabase/seed.sql dosyasını yeniden oluşturur
```

## Yönetim Paneli

`/admin` → giriş sonrası:

- **Gösterge Paneli** — ürün/kategori/galeri istatistikleri, son değişiklikler.
- **Menü** — kategori & ürün CRUD, fiyat, indirim, tükendi/öne çıkan/yayın
  durumları, görsel yükleme, sürükle-bırak sıralama.
- **Galeri / Kampanyalar / Yorumlar / Sosyal Medya / İçerik / Site Ayarları**.

Yetkilendirme sunucu tarafında (`proxy.ts` + admin layout + server action'lar)
doğrulanır; yalnızca `admins` tablosundaki e-postalar erişebilir.

## Komutlar

```bash
npm run dev        # geliştirme
npm run build      # üretim derlemesi
npm run start      # üretim sunucusu
npm run lint       # ESLint
npm run seed:gen   # seed.sql üret
```

## Vercel'e Yayınlama

Alan adı: **www.karadenizgurme.com.tr**

1. Projeyi bir Git deposuna gönderin ve Vercel'de **Import** edin.
   (Kök dizin `site/` ise Vercel'de "Root Directory" olarak `site` seçin.)
2. **Environment Variables** bölümüne şu değişkenleri ekleyin:
   - `NEXT_PUBLIC_SITE_URL = https://www.karadenizgurme.com.tr`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy edin. Framework otomatik **Next.js** algılanır.
4. **Settings → Domains** bölümüne `www.karadenizgurme.com.tr` ve
   `karadenizgurme.com.tr` alan adlarını ekleyin (biri diğerine yönlensin).
5. Alan adı sağlayıcınızın (nic.tr / registrar) DNS panelinde Vercel'in verdiği
   kayıtları girin:
   - `www` için **CNAME → cname.vercel-dns.com**
   - kök alan (`@`) için **A → 76.76.21.21** (veya Vercel'in gösterdiği güncel IP)
6. Supabase → **Authentication → URL Configuration** kısmına
   `https://www.karadenizgurme.com.tr` adresini ekleyin.

## Yayına Geçmeden Önce Sağlamanız Gerekenler

Aşağıdaki bilgiler **yönetim panelinden** girilir; kod içinde uydurulmamıştır:

- **Telefon** ve **WhatsApp** numarası
- **Açık adres** ve **çalışma saatleri**
- **Harita koordinatları** (enlem/boylam) ve **Google / Yandex / Apple Maps** bağlantıları
- **İstanbul** ve **İzmir** yönünden ulaşım açıklamaları
- Gerçek **logo** ve **favicon** (şu an `public/images/brand/` içindeki görsel kullanılıyor)
- Varsa güncel **menü fiyatları** ve fotoğrafsız ürünler için görseller
- Yayınlanacak **gerçek müşteri yorumları**
- İşletmeye ait resmi **ticari unvan** (KVKK/gizlilik metinleri için)

## Proje Yapısı

```
app/
  (site)/         # herkese açık sayfalar + ortak layout
  admin/          # login + (panel) korumalı yönetim
  api/contact/    # iletişim formu (rate limit + honeypot)
  sitemap.ts, robots.ts
components/site/   # site bileşenleri
components/admin/  # yönetim bileşenleri
components/ui/     # ortak arayüz parçaları
lib/              # veri katmanı, Supabase istemcileri, doğrulama, actions
supabase/         # migration + seed + seed-data.json
public/images/    # gerçek görseller (menü, kategori, marka, hero)
```

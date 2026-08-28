export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.karadenizgurme.com.tr";

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/tesis", label: "Tesis Rehberi" },
  { href: "/lezzetlerimiz", label: "Lezzetlerimiz" },
  { href: "/hikayemiz", label: "Hikâyemiz" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const ADMIN_NAV = [
  { href: "/admin", label: "Gösterge Paneli", icon: "LayoutDashboard" },
  { href: "/admin/menu", label: "Menü Yönetimi", icon: "UtensilsCrossed" },
  { href: "/admin/tesis", label: "Tesis Rehberi", icon: "Building2" },
  { href: "/admin/galeri", label: "Galeri", icon: "Images" },
  { href: "/admin/kampanyalar", label: "Kampanyalar", icon: "Megaphone" },
  { href: "/admin/yorumlar", label: "Yorumlar", icon: "Star" },
  { href: "/admin/sosyal", label: "Sosyal Medya", icon: "Instagram" },
  { href: "/admin/icerik", label: "İçerik", icon: "FileText" },
  { href: "/admin/ayarlar", label: "Site Ayarları", icon: "Settings" },
] as const;

/** Ürün etiketleri ve alerjenler için öneri listeleri (admin formlarında) */
export const TAG_OPTIONS = [
  "Yöresel",
  "Acı",
  "Vejetaryen",
  "Vegan",
  "2 Kişilik",
  "Şefin Önerisi",
];

export const ALLERGEN_OPTIONS = [
  "Gluten",
  "Süt",
  "Yumurta",
  "Sert kabuklu yemiş",
  "Yer fıstığı",
  "Balık",
  "Kabuklu deniz ürünü",
  "Susam",
  "Soya",
];

/** Tesis olanakları için kullanılabilir ikon anahtarları (admin seçimi) */
export const AMENITY_ICON_OPTIONS = [
  "parking",
  "fuel",
  "ev",
  "mosque",
  "baby",
  "playground",
  "accessibility",
  "toilet",
  "shower",
  "pet",
  "atm",
  "wifi",
  "coffee",
  "restaurant",
  "store",
  "tailor",
];

/** Supabase Storage bucket adı (görsel yüklemeleri) */
export const STORAGE_BUCKET = "media";

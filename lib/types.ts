export type Category = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type MenuItem = {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  discount_price: number | null;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  allergens: string[];
  tags: string[];
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type MenuItemWithCategory = MenuItem & {
  category?: Pick<Category, "slug" | "title"> | null;
};

export type GalleryItem = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type Campaign = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  starts_at: string | null;
  ends_at: string | null;
  show_on_home: boolean;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  comment: string;
  rating: number;
  source: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type SocialPost = {
  id: string;
  title: string | null;
  image_url: string;
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type SiteSettings = {
  id: string;
  business_name: string;
  short_name: string;
  slogan: string;
  hero_title: string;
  hero_subtitle: string;
  logo_url: string | null;
  favicon_url: string | null;
  phone: string;
  whatsapp: string;
  address: string;
  working_hours: string;
  map_lat: number | null;
  map_lng: number | null;
  google_maps_url: string;
  yandex_maps_url: string;
  apple_maps_url: string;
  instagram_url: string;
  instagram_handle: string;
  direction_istanbul: string;
  direction_izmir: string;
  km_istanbul: string;
  km_izmir: string;
  entry_info: string;
  lost_found_phone: string;
  seo_title: string;
  seo_description: string;
  og_image_url: string | null;
  hero_video_url?: string | null;
  show_prices: boolean;
};

export type ContentSection = {
  id?: string;
  key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  data: Record<string, unknown> | null;
  updated_at?: string;
};

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type FacilityKind =
  | "restoran"
  | "kafe"
  | "akaryakit"
  | "ev_sarj"
  | "magaza"
  | "atm"
  | "hizmet";

export type AmenityItem = {
  id: string;
  icon: string;
  label: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type FacilityItem = {
  id: string;
  kind: FacilityKind;
  name: string;
  description: string | null;
  detail: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

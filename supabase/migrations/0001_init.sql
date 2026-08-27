-- Karadeniz Gurme — veritabanı şeması
-- Supabase (PostgreSQL) için. SQL Editor'de çalıştırın.

create extension if not exists pgcrypto;

-- updated_at otomatik güncelleme
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============ Tablolar ============

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text,
  description text,
  price numeric(10,2),
  discount_price numeric(10,2),
  image_url text,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  allergens text[] not null default '{}',
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists menu_items_category_idx on public.menu_items(category_id);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image_url text not null,
  category text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  starts_at date,
  ends_at date,
  show_on_home boolean not null default true,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  comment text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  source text,
  sort_order integer not null default 0,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  link_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'İsmet Akbulut Karadeniz Gurme',
  short_name text not null default 'Karadeniz Gurme',
  slogan text default '',
  hero_title text default '',
  hero_subtitle text default '',
  logo_url text,
  favicon_url text,
  phone text default '',
  whatsapp text default '',
  address text default '',
  working_hours text default '',
  map_lat numeric,
  map_lng numeric,
  google_maps_url text default '',
  yandex_maps_url text default '',
  apple_maps_url text default '',
  instagram_url text default '',
  instagram_handle text default '',
  direction_istanbul text default '',
  direction_izmir text default '',
  seo_title text default '',
  seo_description text default '',
  og_image_url text,
  hero_video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text,
  subtitle text,
  body text,
  image_url text,
  data jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  ip text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============ updated_at tetikleyicileri ============
do $$
declare t text;
begin
  foreach t in array array[
    'categories','menu_items','gallery_items','campaigns',
    'testimonials','social_posts','site_settings'
  ]
  loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format('create trigger set_updated_at before update on public.%I
      for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- ============ RLS ============
alter table public.admins            enable row level security;
alter table public.categories        enable row level security;
alter table public.menu_items        enable row level security;
alter table public.gallery_items     enable row level security;
alter table public.campaigns         enable row level security;
alter table public.testimonials      enable row level security;
alter table public.social_posts      enable row level security;
alter table public.site_settings     enable row level security;
alter table public.content_sections  enable row level security;
alter table public.contact_messages  enable row level security;

-- Herkese açık okuma (yönetim işlemleri service-role ile RLS'yi atlar)
create policy "public read categories"        on public.categories       for select using (true);
create policy "public read menu_items"         on public.menu_items       for select using (true);
create policy "public read gallery"            on public.gallery_items    for select using (true);
create policy "public read campaigns"          on public.campaigns        for select using (true);
create policy "public read testimonials"       on public.testimonials     for select using (true);
create policy "public read social"             on public.social_posts     for select using (true);
create policy "public read settings"           on public.site_settings    for select using (true);
create policy "public read content"            on public.content_sections for select using (true);

-- admins ve contact_messages: anon erişimi yok (yalnızca service-role).

-- ============ Storage bucket ============
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media"
  on storage.objects for select
  using (bucket_id = 'media');

-- ============ Tesis Rehberi (dinlenme tesisi hizmet kataloğu) ============
create table if not exists public.facility_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'hizmet',
  name text not null,
  description text,
  detail text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.facility_items enable row level security;
create policy "public read facility" on public.facility_items for select using (true);

drop trigger if exists set_updated_at on public.facility_items;
create trigger set_updated_at before update on public.facility_items
  for each row execute function public.set_updated_at();

-- Ayarlara km / yön / kayıp eşya alanları
alter table public.site_settings add column if not exists km_istanbul text default '';
alter table public.site_settings add column if not exists km_izmir text default '';
alter table public.site_settings add column if not exists entry_info text default '';
alter table public.site_settings add column if not exists lost_found_phone text default '';

"use client";

import { useRouter } from "next/navigation";
import { Field, Toggle, fieldInput } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/EntityForm";
import { ImageField } from "@/components/admin/ImageField";
import { saveSettings } from "@/lib/actions/mutations";
import type { SiteSettings } from "@/lib/types";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-5">
      <h2 className="mb-4 font-display text-lg font-semibold text-brand">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const s = settings;

  return (
    <EntityForm action={saveSettings} onDone={() => router.refresh()} submitLabel="Ayarları Kaydet">
      <input type="hidden" name="id" value={s.id} />

      <Section title="Genel">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="İşletme Adı" required>
            <input name="business_name" defaultValue={s.business_name} required className={fieldInput} />
          </Field>
          <Field label="Kısa Ad" required>
            <input name="short_name" defaultValue={s.short_name} required className={fieldInput} />
          </Field>
        </div>
        <Field label="Slogan">
          <input name="slogan" defaultValue={s.slogan} className={fieldInput} />
        </Field>
        <Field label="Ana Başlık (Hero)">
          <input name="hero_title" defaultValue={s.hero_title} className={fieldInput} />
        </Field>
        <Field label="Alt Açıklama (Hero)">
          <textarea name="hero_subtitle" defaultValue={s.hero_subtitle} rows={2} className={fieldInput} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <ImageField name="logo_url" label="Logo" folder="marka" defaultValue={s.logo_url ?? ""} />
          <ImageField name="favicon_url" label="Favicon" folder="marka" defaultValue={s.favicon_url ?? ""} />
          <ImageField name="og_image_url" label="Paylaşım Görseli (OG)" folder="marka" defaultValue={s.og_image_url ?? ""} />
        </div>
        <Field label="Hero Video URL (opsiyonel .mp4)" hint="Boş bırakılırsa kapak görseli gösterilir.">
          <input name="hero_video_url" type="url" defaultValue={s.hero_video_url ?? ""} className={fieldInput} />
        </Field>
        <div className="rounded-lg bg-cream-200/50 p-3">
          <Toggle
            name="show_prices"
            label="Menüde fiyatları göster"
            defaultChecked={s.show_prices}
          />
          <p className="mt-1 pl-7 text-xs text-charcoal/50">
            Kapalıyken menü ve öne çıkan ürünlerde fiyatlar gösterilmez.
          </p>
        </div>
      </Section>

      <Section title="İletişim">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefon">
            <input name="phone" defaultValue={s.phone} placeholder="0 5xx xxx xx xx" className={fieldInput} />
          </Field>
          <Field label="WhatsApp">
            <input name="whatsapp" defaultValue={s.whatsapp} placeholder="0 5xx xxx xx xx" className={fieldInput} />
          </Field>
        </div>
        <Field label="Adres">
          <textarea name="address" defaultValue={s.address} rows={2} className={fieldInput} />
        </Field>
        <Field label="Çalışma Saatleri">
          <input name="working_hours" defaultValue={s.working_hours} placeholder="Her gün 07:00 - 24:00" className={fieldInput} />
        </Field>
        <Field label="Kayıp Eşya / Destek Telefonu">
          <input name="lost_found_phone" defaultValue={s.lost_found_phone} className={fieldInput} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Instagram URL">
            <input name="instagram_url" type="url" defaultValue={s.instagram_url} className={fieldInput} />
          </Field>
          <Field label="Instagram Kullanıcı Adı">
            <input name="instagram_handle" defaultValue={s.instagram_handle} className={fieldInput} />
          </Field>
        </div>
      </Section>

      <Section title="Konum & Yol Tarifi">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Enlem (Latitude)" hint="Örn. 39.3200">
            <input name="map_lat" defaultValue={s.map_lat ?? ""} className={fieldInput} />
          </Field>
          <Field label="Boylam (Longitude)" hint="Örn. 27.6500">
            <input name="map_lng" defaultValue={s.map_lng ?? ""} className={fieldInput} />
          </Field>
        </div>
        <Field label="Google Maps Bağlantısı">
          <input name="google_maps_url" type="url" defaultValue={s.google_maps_url} className={fieldInput} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Yandex Navigasyon Bağlantısı">
            <input name="yandex_maps_url" type="url" defaultValue={s.yandex_maps_url} className={fieldInput} />
          </Field>
          <Field label="Apple Maps Bağlantısı">
            <input name="apple_maps_url" type="url" defaultValue={s.apple_maps_url} className={fieldInput} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="İstanbul Yönünden Km" hint="Örn. İstanbul yönünden 266. km">
            <input name="km_istanbul" defaultValue={s.km_istanbul} className={fieldInput} />
          </Field>
          <Field label="İzmir Yönünden Km" hint="Örn. İzmir yönünden X. km">
            <input name="km_izmir" defaultValue={s.km_izmir} className={fieldInput} />
          </Field>
        </div>
        <Field label="Giriş Bilgisi" hint="Hangi yönden doğrudan giriş yapılabildiği">
          <textarea name="entry_info" defaultValue={s.entry_info} rows={2} className={fieldInput} />
        </Field>
        <Field label="İstanbul Yönünden Gelenler">
          <textarea name="direction_istanbul" defaultValue={s.direction_istanbul} rows={2} className={fieldInput} />
        </Field>
        <Field label="İzmir Yönünden Gelenler">
          <textarea name="direction_izmir" defaultValue={s.direction_izmir} rows={2} className={fieldInput} />
        </Field>
      </Section>

      <Section title="SEO">
        <Field label="SEO Başlığı">
          <input name="seo_title" defaultValue={s.seo_title} className={fieldInput} />
        </Field>
        <Field label="SEO Açıklaması">
          <textarea name="seo_description" defaultValue={s.seo_description} rows={2} className={fieldInput} />
        </Field>
      </Section>
    </EntityForm>
  );
}

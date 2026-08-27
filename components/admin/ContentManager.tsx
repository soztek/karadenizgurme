"use client";

import { useRouter } from "next/navigation";
import { Field, fieldInput } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/EntityForm";
import { ImageField } from "@/components/admin/ImageField";
import { saveContent } from "@/lib/actions/mutations";
import {
  DEFAULT_STORY,
  DEFAULT_WHY_US,
  DEFAULT_AMENITIES,
} from "@/lib/defaults";
import type { ContentSection } from "@/lib/types";

export function ContentManager({ sections }: { sections: ContentSection[] }) {
  const router = useRouter();
  const byKey = new Map(sections.map((s) => [s.key, s]));
  const refresh = () => router.refresh();

  const story = byKey.get("story");
  const whyUs = byKey.get("why_us");
  const amenities = byKey.get("amenities");

  const whyUsData = JSON.stringify(
    (whyUs?.data as object) ?? { features: DEFAULT_WHY_US.features },
    null,
    2,
  );
  const amenitiesData = JSON.stringify(
    (amenities?.data as object) ?? { items: DEFAULT_AMENITIES.items },
    null,
    2,
  );

  const box =
    "rounded-[var(--radius-card)] border border-brand/10 bg-white p-5";

  return (
    <div className="space-y-8">
      {/* Hikâyemiz */}
      <div className={box}>
        <h2 className="mb-4 font-display text-lg font-semibold text-brand">
          Hikâyemiz
        </h2>
        <EntityForm action={saveContent} onDone={refresh} submitLabel="Kaydet">
          <input type="hidden" name="key" value="story" />
          <Field label="Başlık">
            <input name="title" defaultValue={story?.title ?? DEFAULT_STORY.title} className={fieldInput} />
          </Field>
          <Field label="Üst Başlık">
            <input name="subtitle" defaultValue={story?.subtitle ?? DEFAULT_STORY.subtitle} className={fieldInput} />
          </Field>
          <Field label="Metin">
            <textarea name="body" defaultValue={story?.body ?? DEFAULT_STORY.body} rows={5} className={fieldInput} />
          </Field>
          <ImageField name="image_url" folder="icerik" defaultValue={story?.image_url ?? DEFAULT_STORY.image_url} />
        </EntityForm>
      </div>

      {/* Neden Biz — özellik kartları */}
      <div className={box}>
        <h2 className="mb-4 font-display text-lg font-semibold text-brand">
          Özellik Kartları (Neden Karadeniz Gurme?)
        </h2>
        <EntityForm action={saveContent} onDone={refresh} submitLabel="Kaydet">
          <input type="hidden" name="key" value="why_us" />
          <Field label="Başlık">
            <input name="title" defaultValue={whyUs?.title ?? DEFAULT_WHY_US.title} className={fieldInput} />
          </Field>
          <Field label="Alt Başlık">
            <input name="subtitle" defaultValue={whyUs?.subtitle ?? DEFAULT_WHY_US.subtitle} className={fieldInput} />
          </Field>
          <Field
            label="Kartlar (JSON)"
            hint='Biçim: {"features":[{"icon":"ChefHat","title":"...","description":"..."}]} — icon değerleri: ChefHat, Sprout, Timer, Users, MapPin, Coffee, Leaf, Flame, Heart, Star'
          >
            <textarea name="data" defaultValue={whyUsData} rows={10} className={`${fieldInput} font-mono text-xs`} />
          </Field>
        </EntityForm>
      </div>

      {/* Tesis Olanakları */}
      <div className={box}>
        <h2 className="mb-4 font-display text-lg font-semibold text-brand">
          Tesis Olanakları (Ana Sayfa)
        </h2>
        <EntityForm action={saveContent} onDone={refresh} submitLabel="Kaydet">
          <input type="hidden" name="key" value="amenities" />
          <Field label="Başlık">
            <input name="title" defaultValue={amenities?.title ?? DEFAULT_AMENITIES.title} className={fieldInput} />
          </Field>
          <Field label="Alt Başlık">
            <input name="subtitle" defaultValue={amenities?.subtitle ?? DEFAULT_AMENITIES.subtitle} className={fieldInput} />
          </Field>
          <Field
            label="Olanaklar (JSON)"
            hint='Biçim: {"items":[{"icon":"parking","label":"Otopark"}]} — icon: parking, mosque, baby, shopping, tailor, toilet, wifi, fuel, accessibility, coffee'
          >
            <textarea name="data" defaultValue={amenitiesData} rows={10} className={`${fieldInput} font-mono text-xs`} />
          </Field>
        </EntityForm>
      </div>

      <div className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
        <strong className="text-brand">İlgili diğer içerikler:</strong> Instagram
        bağlantısı ve iletişim/footer bilgileri <em>Site Ayarları</em>{" "}
        sayfasından; Instagram gönderi kartları <em>Sosyal Medya</em>{" "}
        sayfasından; müşteri yorumları <em>Yorumlar</em> sayfasından yönetilir.
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Modal, Field, Toggle, fieldInput, PrimaryButton } from "@/components/admin/ui";
import { EntityForm, DeleteButton } from "@/components/admin/EntityForm";
import { ImageField } from "@/components/admin/ImageField";
import { SortableList } from "@/components/admin/SortableList";
import { AmenityIcon } from "@/components/site/Amenities";
import { saveAmenity, deleteAmenity, reorder } from "@/lib/actions/mutations";
import { AMENITY_ICON_OPTIONS } from "@/lib/constants";
import type { AmenityItem } from "@/lib/types";

const ICON_LABELS: Record<string, string> = {
  parking: "Otopark",
  fuel: "Akaryakıt",
  ev: "EV Şarj",
  mosque: "Mescid",
  baby: "Emzirme / Bebek",
  playground: "Çocuk Oyun Alanı",
  accessibility: "Engelli Erişimi",
  toilet: "Tuvalet",
  shower: "Duş",
  pet: "Evcil Hayvan",
  atm: "ATM",
  wifi: "Wi-Fi",
  coffee: "Kafe",
  restaurant: "Restoran",
  store: "Mağaza",
  tailor: "Terzi",
};

export function AmenityManager({ items }: { items: AmenityItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<AmenityItem | null>(null);
  const [icon, setIcon] = useState("parking");
  const refresh = () => router.refresh();

  function openNew() {
    setEdit(null);
    setIcon("parking");
    setOpen(true);
  }
  function openEdit(a: AmenityItem) {
    setEdit(a);
    setIcon(a.icon);
    setOpen(true);
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <PrimaryButton onClick={openNew}>
          <Plus className="h-4 w-4" />
          Yeni Olanak
        </PrimaryButton>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
          Henüz olanak eklenmemiş.
        </p>
      ) : (
        <SortableList
          items={items}
          onReorder={(ids) => reorder("amenities", ids)}
          render={(a) => (
            <div className="flex items-center gap-3 rounded-lg border border-brand/10 bg-white p-3">
              {a.image_url ? (
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image src={a.image_url} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/8 text-brand">
                  <AmenityIcon name={a.icon} className="h-5 w-5" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-brand">{a.label}</p>
                <p className="truncate text-xs text-charcoal/50">
                  {ICON_LABELS[a.icon] ?? a.icon}
                  {!a.is_active ? " · Pasif" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openEdit(a)}
                className="rounded-lg p-2 text-charcoal/60 hover:bg-brand/5"
                title="Düzenle"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <DeleteButton
                onDelete={async () => {
                  const r = await deleteAmenity(a.id);
                  refresh();
                  return r;
                }}
              >
                <Trash2 className="h-4 w-4" />
              </DeleteButton>
            </div>
          )}
        />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Olanağı Düzenle" : "Yeni Olanak"}>
        <EntityForm
          action={saveAmenity}
          onDone={() => {
            setOpen(false);
            refresh();
          }}
        >
          {edit ? <input type="hidden" name="id" value={edit.id} /> : null}
          <Field label="İkon" hint="Görsel eklemezseniz bu ikon gösterilir.">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/8 text-brand">
                <AmenityIcon name={icon} className="h-6 w-6" />
              </span>
              <select
                name="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className={fieldInput}
              >
                {AMENITY_ICON_OPTIONS.map((k) => (
                  <option key={k} value={k}>
                    {ICON_LABELS[k] ?? k}
                  </option>
                ))}
              </select>
            </div>
          </Field>
          <Field label="Ad" required>
            <input name="label" defaultValue={edit?.label ?? ""} required className={fieldInput} />
          </Field>
          <ImageField
            name="image_url"
            label="Görsel (opsiyonel — ikon yerine kullanılır)"
            folder="olanak"
            defaultValue={edit?.image_url ?? ""}
          />
          <Field label="Sıra">
            <input name="sort_order" type="number" defaultValue={edit?.sort_order ?? 0} className={fieldInput} />
          </Field>
          <Toggle name="is_active" label="Yayında" defaultChecked={edit?.is_active ?? true} />
        </EntityForm>
      </Modal>
    </div>
  );
}

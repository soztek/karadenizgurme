"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Modal, Field, Toggle, fieldInput, PrimaryButton } from "@/components/admin/ui";
import { EntityForm, DeleteButton } from "@/components/admin/EntityForm";
import { ImageField } from "@/components/admin/ImageField";
import { SortableList } from "@/components/admin/SortableList";
import { saveFacilityItem, deleteFacilityItem, reorder } from "@/lib/actions/mutations";
import type { FacilityItem } from "@/lib/types";

const KIND_LABELS: Record<string, string> = {
  restoran: "Restoran",
  kafe: "Kafe / Pastane",
  akaryakit: "Akaryakıt",
  ev_sarj: "EV Şarj",
  magaza: "Mağaza / Market",
  atm: "ATM / Banka",
  hizmet: "Diğer Hizmet",
};

export function FacilityManager({ items }: { items: FacilityItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<FacilityItem | null>(null);
  const refresh = () => router.refresh();

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <PrimaryButton
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Yeni Hizmet
        </PrimaryButton>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
          Henüz tesis hizmeti eklenmemiş.
        </p>
      ) : (
        <SortableList
          items={items}
          onReorder={(ids) => reorder("facility_items", ids)}
          render={(f) => (
            <div className="flex items-center gap-3 rounded-lg border border-brand/10 bg-white p-3">
              {f.image_url ? (
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-cream">
                  <Image src={f.image_url} alt="" fill sizes="44px" className="object-cover" />
                </div>
              ) : null}
              <span className="shrink-0 rounded-full bg-brand/8 px-2.5 py-1 text-[11px] font-medium text-brand">
                {KIND_LABELS[f.kind] ?? f.kind}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-brand">{f.name}</p>
                <p className="truncate text-xs text-charcoal/50">
                  {f.detail || f.description || ""}
                  {!f.is_active ? " · Pasif" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEdit(f);
                  setOpen(true);
                }}
                className="rounded-lg p-2 text-charcoal/60 hover:bg-brand/5"
                title="Düzenle"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <DeleteButton
                onDelete={async () => {
                  const r = await deleteFacilityItem(f.id);
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

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Hizmeti Düzenle" : "Yeni Hizmet"}>
        <EntityForm
          action={saveFacilityItem}
          onDone={() => {
            setOpen(false);
            refresh();
          }}
        >
          {edit ? <input type="hidden" name="id" value={edit.id} /> : null}
          <Field label="Tür" required>
            <select name="kind" defaultValue={edit?.kind ?? "restoran"} className={fieldInput}>
              {Object.entries(KIND_LABELS).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ad" required>
            <input name="name" defaultValue={edit?.name ?? ""} required className={fieldInput} />
          </Field>
          <Field label="Açıklama">
            <textarea name="description" defaultValue={edit?.description ?? ""} rows={2} className={fieldInput} />
          </Field>
          <Field
            label="Detay / Rozet"
            hint="Örn. '7/24 açık', 'CCS · 180 kW · Trugo', 'Ziraat Bankası ATM'"
          >
            <input name="detail" defaultValue={edit?.detail ?? ""} className={fieldInput} />
          </Field>
          <ImageField
            name="image_url"
            label="Görsel (opsiyonel)"
            folder="tesis"
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

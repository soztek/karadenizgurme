"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2, Megaphone } from "lucide-react";
import { Modal, Field, Toggle, fieldInput, PrimaryButton } from "@/components/admin/ui";
import { EntityForm, DeleteButton } from "@/components/admin/EntityForm";
import { ImageField } from "@/components/admin/ImageField";
import { saveCampaign, deleteCampaign } from "@/lib/actions/mutations";
import type { Campaign } from "@/lib/types";

export function CampaignManager({ items }: { items: Campaign[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Campaign | null>(null);
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
          Yeni Kampanya
        </PrimaryButton>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
          Henüz kampanya yok.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-lg border border-brand/10 bg-white p-3">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cream text-mustard">
                {c.image_url ? (
                  <Image src={c.image_url} alt="" fill sizes="56px" className="object-cover" />
                ) : (
                  <Megaphone className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-brand">{c.title}</p>
                <p className="text-xs text-charcoal/50">
                  {c.show_on_home ? "Ana sayfada" : "Gizli"}
                  {!c.is_active ? " · Pasif" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEdit(c);
                  setOpen(true);
                }}
                className="rounded-lg p-2 text-charcoal/60 hover:bg-brand/5"
                title="Düzenle"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <DeleteButton
                onDelete={async () => {
                  const r = await deleteCampaign(c.id);
                  refresh();
                  return r;
                }}
              >
                <Trash2 className="h-4 w-4" />
              </DeleteButton>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Kampanyayı Düzenle" : "Yeni Kampanya"}>
        <EntityForm
          action={saveCampaign}
          onDone={() => {
            setOpen(false);
            refresh();
          }}
        >
          {edit ? <input type="hidden" name="id" value={edit.id} /> : null}
          <Field label="Başlık" required>
            <input name="title" defaultValue={edit?.title ?? ""} required className={fieldInput} />
          </Field>
          <Field label="Açıklama">
            <textarea name="description" defaultValue={edit?.description ?? ""} rows={2} className={fieldInput} />
          </Field>
          <ImageField name="image_url" folder="kampanya" defaultValue={edit?.image_url ?? ""} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Başlangıç">
              <input name="starts_at" type="date" defaultValue={edit?.starts_at?.slice(0, 10) ?? ""} className={fieldInput} />
            </Field>
            <Field label="Bitiş">
              <input name="ends_at" type="date" defaultValue={edit?.ends_at?.slice(0, 10) ?? ""} className={fieldInput} />
            </Field>
          </div>
          <Field label="Sıra">
            <input name="sort_order" type="number" defaultValue={edit?.sort_order ?? 0} className={fieldInput} />
          </Field>
          <div className="flex flex-wrap gap-5">
            <Toggle name="show_on_home" label="Ana sayfada göster" defaultChecked={edit?.show_on_home ?? true} />
            <Toggle name="is_active" label="Yayında" defaultChecked={edit?.is_active ?? true} />
          </div>
        </EntityForm>
      </Modal>
    </div>
  );
}

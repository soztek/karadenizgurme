"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Modal, Field, Toggle, fieldInput, PrimaryButton } from "@/components/admin/ui";
import { EntityForm, DeleteButton } from "@/components/admin/EntityForm";
import { ImageField } from "@/components/admin/ImageField";
import { SortableList } from "@/components/admin/SortableList";
import { saveSocial, deleteSocial, reorder } from "@/lib/actions/mutations";
import type { SocialPost } from "@/lib/types";

export function SocialManager({ items }: { items: SocialPost[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<SocialPost | null>(null);
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
          Gönderi Ekle
        </PrimaryButton>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
          Henüz sosyal medya gönderisi eklenmemiş.
        </p>
      ) : (
        <SortableList
          items={items}
          onReorder={(ids) => reorder("social_posts", ids)}
          render={(s) => (
            <div className="flex items-center gap-3 rounded-lg border border-brand/10 bg-white p-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                <Image src={s.image_url} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-brand">{s.title || "Gönderi"}</p>
                <p className="truncate text-xs text-charcoal/50">
                  {s.link_url || "Bağlantı yok"}
                  {!s.is_active ? " · Pasif" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEdit(s);
                  setOpen(true);
                }}
                className="rounded-lg p-2 text-charcoal/60 hover:bg-brand/5"
                title="Düzenle"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <DeleteButton
                onDelete={async () => {
                  const r = await deleteSocial(s.id);
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

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Gönderiyi Düzenle" : "Gönderi Ekle"}>
        <EntityForm
          action={saveSocial}
          onDone={() => {
            setOpen(false);
            refresh();
          }}
        >
          {edit ? <input type="hidden" name="id" value={edit.id} /> : null}
          <ImageField name="image_url" folder="sosyal" defaultValue={edit?.image_url ?? ""} required />
          <Field label="Başlık">
            <input name="title" defaultValue={edit?.title ?? ""} className={fieldInput} />
          </Field>
          <Field label="Bağlantı (Instagram gönderi linki)">
            <input name="link_url" type="url" defaultValue={edit?.link_url ?? ""} className={fieldInput} />
          </Field>
          <Field label="Sıra">
            <input name="sort_order" type="number" defaultValue={edit?.sort_order ?? 0} className={fieldInput} />
          </Field>
          <Toggle name="is_active" label="Yayında" defaultChecked={edit?.is_active ?? true} />
        </EntityForm>
      </Modal>
    </div>
  );
}

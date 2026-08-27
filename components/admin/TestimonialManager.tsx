"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Modal, Field, Toggle, fieldInput, PrimaryButton } from "@/components/admin/ui";
import { EntityForm, DeleteButton } from "@/components/admin/EntityForm";
import { saveTestimonial, deleteTestimonial } from "@/lib/actions/mutations";
import type { Testimonial } from "@/lib/types";

export function TestimonialManager({ items }: { items: Testimonial[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Testimonial | null>(null);
  const refresh = () => router.refresh();

  return (
    <div>
      <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        Lütfen yalnızca gerçek müşteri yorumlarını yayınlayın. Doğrulanmamış veya
        uydurma yorumları &quot;Yayında&quot; işaretlemeyin.
      </div>
      <div className="mb-4 flex justify-end">
        <PrimaryButton
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Yeni Yorum
        </PrimaryButton>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
          Henüz yorum eklenmemiş.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((t) => (
            <div key={t.id} className="rounded-lg border border-brand/10 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-brand">{t.name}</p>
                    <span className="flex text-mustard">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </span>
                    {!t.is_active ? (
                      <span className="rounded bg-charcoal/10 px-1.5 py-0.5 text-[10px] text-charcoal/60">
                        Yayında değil
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-charcoal/70">{t.comment}</p>
                  {t.source ? (
                    <p className="mt-1 text-xs text-charcoal/45">Kaynak: {t.source}</p>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEdit(t);
                      setOpen(true);
                    }}
                    className="rounded-lg p-2 text-charcoal/60 hover:bg-brand/5"
                    title="Düzenle"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <DeleteButton
                    onDelete={async () => {
                      const r = await deleteTestimonial(t.id);
                      refresh();
                      return r;
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </DeleteButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Yorumu Düzenle" : "Yeni Yorum"}>
        <EntityForm
          action={saveTestimonial}
          onDone={() => {
            setOpen(false);
            refresh();
          }}
        >
          {edit ? <input type="hidden" name="id" value={edit.id} /> : null}
          <Field label="Müşteri Adı" required>
            <input name="name" defaultValue={edit?.name ?? ""} required className={fieldInput} />
          </Field>
          <Field label="Yorum" required>
            <textarea name="comment" defaultValue={edit?.comment ?? ""} rows={3} required className={fieldInput} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Puan (1-5)">
              <select name="rating" defaultValue={edit?.rating ?? 5} className={fieldInput}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} yıldız
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Kaynak" hint="Örn. Google, Instagram">
              <input name="source" defaultValue={edit?.source ?? ""} className={fieldInput} />
            </Field>
          </div>
          <Field label="Sıra">
            <input name="sort_order" type="number" defaultValue={edit?.sort_order ?? 0} className={fieldInput} />
          </Field>
          <Toggle name="is_active" label="Yayında (yalnızca gerçek yorumlar)" defaultChecked={edit?.is_active ?? false} />
        </EntityForm>
      </Modal>
    </div>
  );
}

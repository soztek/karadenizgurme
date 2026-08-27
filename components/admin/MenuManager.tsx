"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  UtensilsCrossed,
} from "lucide-react";
import {
  Modal,
  Field,
  Toggle,
  fieldInput,
  PrimaryButton,
} from "@/components/admin/ui";
import { EntityForm, DeleteButton } from "@/components/admin/EntityForm";
import { ImageField } from "@/components/admin/ImageField";
import { TagPicker } from "@/components/admin/TagPicker";
import { SortableList } from "@/components/admin/SortableList";
import {
  saveCategory,
  deleteCategory,
  saveMenuItem,
  deleteMenuItem,
  toggleItemField,
  reorder,
} from "@/lib/actions/mutations";
import { TAG_OPTIONS, ALLERGEN_OPTIONS } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";
import type { Category, MenuItemWithCategory } from "@/lib/types";

export function MenuManager({
  categories,
  items,
}: {
  categories: Category[];
  items: MenuItemWithCategory[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"items" | "categories">("items");
  const [filter, setFilter] = useState<string>("all");

  const [itemModal, setItemModal] = useState(false);
  const [editItem, setEditItem] = useState<MenuItemWithCategory | null>(null);
  const [catModal, setCatModal] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);

  const refresh = () => router.refresh();
  const done = (close: () => void) => {
    close();
    refresh();
  };

  const filtered =
    filter === "all"
      ? items
      : items.filter((i) => i.category_id === filter);

  return (
    <div>
      <div className="mb-6 flex gap-2 border-b border-brand/10">
        {(["items", "categories"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-medium",
              tab === t
                ? "border-mustard text-mustard"
                : "border-transparent text-charcoal/55 hover:text-brand",
            )}
          >
            {t === "items" ? `Ürünler (${items.length})` : `Kategoriler (${categories.length})`}
          </button>
        ))}
      </div>

      {tab === "items" ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`${fieldInput} max-w-xs`}
            >
              <option value="all">Tüm kategoriler</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <PrimaryButton
              onClick={() => {
                setEditItem(null);
                setItemModal(true);
              }}
              disabled={categories.length === 0}
            >
              <Plus className="h-4 w-4" />
              Yeni Ürün
            </PrimaryButton>
          </div>

          {categories.length === 0 ? (
            <p className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
              Önce en az bir kategori ekleyin.
            </p>
          ) : filtered.length === 0 ? (
            <p className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
              Bu kategoride ürün yok.
            </p>
          ) : (
            <div className="space-y-2">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-brand/10 bg-white p-3"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                    {item.image_url ? (
                      <Image src={item.image_url} alt="" fill sizes="56px" className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-brand/25">
                        <UtensilsCrossed className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-brand">{item.title}</p>
                      {item.is_featured ? (
                        <Star className="h-3.5 w-3.5 shrink-0 fill-mustard text-mustard" />
                      ) : null}
                    </div>
                    <p className="text-xs text-charcoal/50">
                      {item.category?.title} ·{" "}
                      {item.price != null ? formatPrice(item.price) : "Fiyat yok"}
                      {!item.is_active ? " · Pasif" : ""}
                      {!item.is_available ? " · Tükendi" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title={item.is_available ? "Tükendi işaretle" : "Mevcut işaretle"}
                      onClick={async () => {
                        await toggleItemField(item.id, "is_available", !item.is_available);
                        refresh();
                      }}
                      className="rounded-lg p-2 text-charcoal/50 hover:bg-brand/5"
                    >
                      {item.is_available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      title="Öne çıkar"
                      onClick={async () => {
                        await toggleItemField(item.id, "is_featured", !item.is_featured);
                        refresh();
                      }}
                      className={cn(
                        "rounded-lg p-2 hover:bg-brand/5",
                        item.is_featured ? "text-mustard" : "text-charcoal/40",
                      )}
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="Düzenle"
                      onClick={() => {
                        setEditItem(item);
                        setItemModal(true);
                      }}
                      className="rounded-lg p-2 text-charcoal/60 hover:bg-brand/5"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <DeleteButton
                      onDelete={async () => {
                        const r = await deleteMenuItem(item.id);
                        refresh();
                        return r;
                      }}
                      confirmText={`"${item.title}" ürününü silmek istediğinize emin misiniz?`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </DeleteButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <PrimaryButton
              onClick={() => {
                setEditCat(null);
                setCatModal(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Yeni Kategori
            </PrimaryButton>
          </div>
          {categories.length === 0 ? (
            <p className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
              Henüz kategori yok.
            </p>
          ) : (
            <SortableList
              items={categories}
              onReorder={(ids) => reorder("categories", ids)}
              render={(c) => (
                <div className="flex items-center gap-3 rounded-lg border border-brand/10 bg-white p-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream">
                    {c.image_url ? (
                      <Image src={c.image_url} alt="" fill sizes="48px" className="object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-brand">{c.title}</p>
                    <p className="text-xs text-charcoal/50">
                      /{c.slug}
                      {!c.is_active ? " · Pasif" : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditCat(c);
                      setCatModal(true);
                    }}
                    className="rounded-lg p-2 text-charcoal/60 hover:bg-brand/5"
                    title="Düzenle"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <DeleteButton
                    onDelete={async () => {
                      const r = await deleteCategory(c.id);
                      refresh();
                      return r;
                    }}
                    confirmText={`"${c.title}" kategorisini silmek istediğinize emin misiniz? Bağlı ürünler etkilenebilir.`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </DeleteButton>
                </div>
              )}
            />
          )}
        </>
      )}

      {/* Ürün modalı */}
      <Modal
        open={itemModal}
        onClose={() => setItemModal(false)}
        title={editItem ? "Ürünü Düzenle" : "Yeni Ürün"}
      >
        <EntityForm action={saveMenuItem} onDone={() => done(() => setItemModal(false))}>
          {editItem ? <input type="hidden" name="id" value={editItem.id} /> : null}
          <Field label="Kategori" required>
            <select name="category_id" defaultValue={editItem?.category_id ?? ""} required className={fieldInput}>
              <option value="" disabled>
                Kategori seçin
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ürün Adı" required>
            <input name="title" defaultValue={editItem?.title ?? ""} required className={fieldInput} />
          </Field>
          <Field label="Açıklama">
            <textarea name="description" defaultValue={editItem?.description ?? ""} rows={2} className={fieldInput} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Fiyat (₺)" hint="Boş bırakılırsa fiyat gösterilmez.">
              <input name="price" type="number" step="0.01" defaultValue={editItem?.price ?? ""} className={fieldInput} />
            </Field>
            <Field label="İndirimli Fiyat (₺)">
              <input name="discount_price" type="number" step="0.01" defaultValue={editItem?.discount_price ?? ""} className={fieldInput} />
            </Field>
          </div>
          <ImageField name="image_url" folder="menu" defaultValue={editItem?.image_url ?? ""} />
          <TagPicker name="tags" label="Etiketler" options={TAG_OPTIONS} defaultValue={editItem?.tags ?? []} />
          <TagPicker name="allergens" label="Alerjenler" options={ALLERGEN_OPTIONS} defaultValue={editItem?.allergens ?? []} />
          <Field label="Sıra">
            <input name="sort_order" type="number" defaultValue={editItem?.sort_order ?? 0} className={fieldInput} />
          </Field>
          <div className="flex flex-wrap gap-5">
            <Toggle name="is_available" label="Mevcut (tükenmedi)" defaultChecked={editItem?.is_available ?? true} />
            <Toggle name="is_featured" label="Öne çıkan" defaultChecked={editItem?.is_featured ?? false} />
            <Toggle name="is_active" label="Yayında" defaultChecked={editItem?.is_active ?? true} />
          </div>
        </EntityForm>
      </Modal>

      {/* Kategori modalı */}
      <Modal
        open={catModal}
        onClose={() => setCatModal(false)}
        title={editCat ? "Kategoriyi Düzenle" : "Yeni Kategori"}
      >
        <EntityForm action={saveCategory} onDone={() => done(() => setCatModal(false))}>
          {editCat ? <input type="hidden" name="id" value={editCat.id} /> : null}
          <Field label="Kategori Adı" required>
            <input name="title" defaultValue={editCat?.title ?? ""} required className={fieldInput} />
          </Field>
          <Field label="Açıklama">
            <textarea name="description" defaultValue={editCat?.description ?? ""} rows={2} className={fieldInput} />
          </Field>
          <Field label="Slug" hint="Boş bırakılırsa addan otomatik oluşturulur.">
            <input name="slug" defaultValue={editCat?.slug ?? ""} className={fieldInput} />
          </Field>
          <ImageField name="image_url" folder="kategori" defaultValue={editCat?.image_url ?? ""} />
          <Field label="Sıra">
            <input name="sort_order" type="number" defaultValue={editCat?.sort_order ?? 0} className={fieldInput} />
          </Field>
          <Toggle name="is_active" label="Yayında" defaultChecked={editCat?.is_active ?? true} />
        </EntityForm>
      </Modal>
    </div>
  );
}

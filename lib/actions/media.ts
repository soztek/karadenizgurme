"use server";

import { withAdmin } from "./helpers";
import { STORAGE_BUCKET } from "@/lib/constants";
import { slugify } from "@/lib/utils";

const MAX_BYTES = 6 * 1024 * 1024; // 6MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export async function uploadMedia(
  formData: FormData,
): Promise<{ ok: boolean; url?: string; error?: string }> {
  const guard = await withAdmin();
  if (!guard.ok) return { ok: false, error: guard.error };

  const file = formData.get("file");
  const folder = (formData.get("folder") as string) || "genel";

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Dosya seçilmedi." };
  }
  if (!ALLOWED.includes(file.type)) {
    return {
      ok: false,
      error: "Yalnızca JPG, PNG, WEBP, AVIF veya GIF yükleyebilirsiniz.",
    };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Dosya boyutu 6MB'ı aşamaz." };
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "gorsel";
  const path = `${slugify(folder)}/${Date.now()}-${base}.${ext}`;

  const { error } = await guard.sb.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    return { ok: false, error: `Yükleme başarısız: ${error.message}` };
  }

  const { data } = guard.sb.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}

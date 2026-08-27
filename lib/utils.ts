import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Türkçe karakter destekli slug üretimi */
export function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return input
    .trim()
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (m) => map[m] || m)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Fiyatı Türk Lirası olarak biçimlendirir. null ise boş döner. */
export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/** WhatsApp linki üretir (05xx veya +90 formatlarını temizler) */
export function whatsappLink(raw: string, text?: string): string {
  const digits = (raw || "").replace(/\D/g, "");
  if (!digits) return "";
  let intl = digits;
  if (digits.startsWith("0")) intl = "9" + digits; // 0 5xx -> 90 5xx
  else if (!digits.startsWith("90")) intl = "90" + digits;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${intl}${q}`;
}

export function telLink(raw: string): string {
  const digits = (raw || "").replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

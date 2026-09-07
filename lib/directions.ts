import type { SiteSettings } from "./types";

export type DirTarget = {
  key: "d1" | "d2";
  label: string;
  google: string;
  yandex: string;
  apple: string;
};

/**
 * Otoyolda karşılıklı iki tesis için yol tarifi hedeflerini üretir.
 * Yalnızca en az bir haritası olan hedefler döner.
 */
export function directionsTargets(s: SiteSettings): DirTarget[] {
  const d1: DirTarget = {
    key: "d1",
    label: s.direction_label_1 || "İstanbul yönünden gelenler",
    google: s.google_maps_url || "",
    yandex: s.yandex_maps_url || "",
    apple: s.apple_maps_url || "",
  };
  const d2: DirTarget = {
    key: "d2",
    label: s.direction_label_2 || "İzmir yönünden gelenler",
    google: s.google_maps_url_2 || "",
    yandex: s.yandex_maps_url_2 || "",
    apple: s.apple_maps_url_2 || "",
  };
  return [d1, d2].filter((t) => t.google || t.yandex || t.apple);
}

/** Yol tarifi kurulmamışsa yönlendirilecek sayfa. */
export const DIRECTIONS_FALLBACK = "/yol-tarifi";

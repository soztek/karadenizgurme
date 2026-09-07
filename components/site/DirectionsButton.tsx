"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navigation, X, MapPin, Loader2, Check } from "lucide-react";
import type { DirTarget } from "@/lib/directions";
import { DIRECTIONS_FALLBACK } from "@/lib/directions";
import { cn } from "@/lib/utils";

/** Gidiş yönünden (pusula) hangi tesisin önerileceği.
 *  Otoyol Savaştepe civarında KD-GB uzanır: İstanbul ~KD, İzmir ~GB. */
function headingToKey(h: number | null): "d1" | "d2" | null {
  if (h == null || Number.isNaN(h)) return null;
  const nh = ((h % 360) + 360) % 360;
  // Kuzeydoğu yarısı (İstanbul'a doğru) -> d2 (İzmir yönünden gelenler)
  const towardIstanbul = nh >= 315 || nh < 135;
  return towardIstanbul ? "d2" : "d1";
}

function primaryUrl(t: DirTarget) {
  return t.google || t.yandex || t.apple || DIRECTIONS_FALLBACK;
}

export function DirectionsButton({
  targets,
  className,
  children,
}: {
  targets: DirTarget[];
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [rec, setRec] = useState<"d1" | "d2" | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [geoMsg, setGeoMsg] = useState("");
  const watchId = useRef<number | null>(null);

  const stopWatch = useCallback(() => {
    if (watchId.current != null && "geolocation" in navigator) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const detect = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setGeoMsg("Cihazınız konum desteklemiyor. Lütfen yönünüzü seçin.");
      return;
    }
    setDetecting(true);
    setGeoMsg("");
    let done = false;
    const finish = (msg = "") => {
      if (done) return;
      done = true;
      stopWatch();
      setDetecting(false);
      if (msg) setGeoMsg(msg);
    };
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const key = headingToKey(pos.coords.heading);
        if (key) {
          setRec(key);
          finish();
        }
      },
      () => finish("Konum alınamadı. Lütfen yönünüzü seçin."),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
    );
    // 10 sn içinde yön (heading) gelmezse dur
    window.setTimeout(
      () => finish(done ? "" : "Yön algılanamadı (durağan olabilirsiniz). Lütfen seçin."),
      10000,
    );
  }, [stopWatch]);

  useEffect(() => {
    if (open && targets.length > 1) detect();
    return () => stopWatch();
  }, [open, targets.length, detect, stopWatch]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Tek hedef ya da hiç: doğrudan bağlantı
  if (targets.length <= 1) {
    const t = targets[0];
    const href = t ? primaryUrl(t) : DIRECTIONS_FALLBACK;
    const external = Boolean(t && (t.google || t.yandex || t.apple));
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    ) : (
      <Link href={DIRECTIONS_FALLBACK} className={className}>
        {children}
      </Link>
    );
  }

  const ordered = rec
    ? [...targets].sort((a, b) => (a.key === rec ? -1 : b.key === rec ? 1 : 0))
    : targets;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/60 p-0 sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-t-2xl bg-ivory p-5 shadow-xl sm:rounded-[var(--radius-card)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold text-brand">
                  Hangi yöne gidiyorsunuz?
                </h2>
                <p className="mt-1 text-sm text-charcoal/60">
                  Otoyolda karşılıklı 2 tesisimiz var — bulunduğunuz kulvardaki
                  tesise yönlendirelim.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-charcoal/50 hover:bg-brand/5"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="mt-2 flex items-center gap-2 text-xs text-charcoal/55"
              aria-live="polite"
            >
              {detecting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-mustard" />
                  Konumunuzdan yön algılanıyor…
                </>
              ) : rec ? (
                <>
                  <MapPin className="h-3.5 w-3.5 text-red" />
                  Yönünüze göre öneri hazırlandı.
                </>
              ) : geoMsg ? (
                <span>{geoMsg}</span>
              ) : null}
            </div>

            <div className="mt-4 space-y-3">
              {ordered.map((t) => {
                const isRec = rec === t.key;
                return (
                  <div
                    key={t.key}
                    className={cn(
                      "rounded-[var(--radius-card)] border p-4",
                      isRec
                        ? "border-red bg-red/5 ring-2 ring-red/30"
                        : "border-brand/12 bg-white",
                    )}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      {isRec ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red px-2 py-0.5 text-[11px] font-semibold text-white">
                          <Check className="h-3 w-3" />
                          Önerilen
                        </span>
                      ) : null}
                      <p className="text-sm font-semibold text-brand">{t.label}</p>
                    </div>
                    <a
                      href={primaryUrl(t)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
                        isRec
                          ? "bg-red text-white shadow-[var(--shadow-red)] hover:bg-red-600"
                          : "bg-brand text-cream hover:bg-brand-600",
                      )}
                    >
                      <Navigation className="h-4 w-4" />
                      Yol Tarifi Al
                    </a>
                    {(t.yandex || t.apple) && (t.google ? true : false) ? (
                      <div className="mt-2 flex justify-center gap-3 text-xs">
                        {t.yandex ? (
                          <a
                            href={t.yandex}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-charcoal/55 underline hover:text-mustard-700"
                          >
                            Yandex
                          </a>
                        ) : null}
                        {t.apple ? (
                          <a
                            href={t.apple}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-charcoal/55 underline hover:text-mustard-700"
                          >
                            Apple Maps
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {!detecting && !rec ? (
              <button
                type="button"
                onClick={detect}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand/20 px-4 py-2.5 text-sm font-medium text-brand hover:bg-brand/5"
              >
                <MapPin className="h-4 w-4" />
                Konumuma göre öner
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, prev, next]);

  if (!items.length) {
    return (
      <p className="py-16 text-center text-charcoal/60">
        Galeri görselleri yakında eklenecek.
      </p>
    );
  }

  const current = index === null ? null : items[index];

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative block w-full overflow-hidden rounded-xl focus-visible:outline-none"
            aria-label={item.title || "Galeri görseli"}
          >
            <Image
              src={item.image_url}
              alt={item.title || "Karadeniz Gurme galeri"}
              width={500}
              height={500}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-charcoal/0 transition-colors group-hover:bg-charcoal/10" />
          </button>
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Kapat"
          >
            <X className="h-6 w-6" />
          </button>
          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
                aria-label="Önceki"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
                aria-label="Sonraki"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          ) : null}
          <figure
            className={cn("max-h-[85vh] max-w-4xl")}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.image_url}
              alt={current.title || "Karadeniz Gurme"}
              width={1200}
              height={900}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            {current.title ? (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {current.title}
              </figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </>
  );
}

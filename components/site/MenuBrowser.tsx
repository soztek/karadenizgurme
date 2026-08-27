"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, X, UtensilsCrossed } from "lucide-react";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { cn, slugify } from "@/lib/utils";
import type { Category, MenuItemWithCategory } from "@/lib/types";

type Group = { category: Category; items: MenuItemWithCategory[] };

function normalize(s: string) {
  return slugify(s).replace(/-/g, " ");
}

export function MenuBrowser({
  groups,
  showPrices = true,
}: {
  groups: Group[];
  showPrices?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");

  const searching = query.trim().length > 0;
  const nq = normalize(query);

  const searchResults = useMemo(() => {
    if (!searching) return [];
    return groups
      .flatMap((g) => g.items)
      .filter((it) => {
        const hay = normalize(
          `${it.title} ${it.description ?? ""} ${(it.tags ?? []).join(" ")}`,
        );
        return hay.includes(nq);
      });
  }, [groups, nq, searching]);

  // Kaydırıldıkça aktif kategori sekmesini güncelle
  useEffect(() => {
    if (searching) return;
    const sections = groups
      .map((g) => document.getElementById(`kat-${g.category.slug}`))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id.replace("kat-", ""));
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [groups, searching]);

  // Sayfa #kat-<slug> ile açıldıysa ilgili kategoriye kaydır
  useEffect(() => {
    const hash = window.location.hash.replace("#kat-", "");
    if (!hash) return;
    const id = setTimeout(() => scrollToCategory(hash), 200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToCategory(slug: string) {
    setActive(slug);
    const el = document.getElementById(`kat-${slug}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <div>
      {/* Arama + kategori çubuğu (yapışkan) */}
      <div className="sticky top-16 z-30 -mx-4 mb-8 border-b border-brand/10 bg-ivory/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-xl sm:px-4">
        <div className="relative mx-auto max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Menüde ara... (ör. pide, kuymak, çay)"
            className="w-full rounded-full border border-brand/15 bg-white py-2.5 pl-10 pr-10 text-sm outline-none focus:border-mustard"
            aria-label="Menüde ara"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        {!searching ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {groups.map((g) => (
              <button
                key={g.category.slug}
                type="button"
                onClick={() => scrollToCategory(g.category.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active === g.category.slug
                    ? "border-brand bg-brand text-cream"
                    : "border-brand/20 bg-white text-brand hover:border-brand/40",
                )}
              >
                {g.category.title}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Arama sonuçları */}
      {searching ? (
        searchResults.length ? (
          <div>
            <p className="mb-4 text-sm text-charcoal/60">
              “{query}” için {searchResults.length} sonuç
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((item) => (
                <MenuItemCard key={item.id} item={item} showPrices={showPrices} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <UtensilsCrossed className="h-10 w-10 text-brand/30" />
            <p className="mt-3 text-charcoal/60">
              “{query}” için sonuç bulunamadı.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-sm font-medium text-mustard underline"
            >
              Aramayı temizle
            </button>
          </div>
        )
      ) : (
        <div className="space-y-14">
          {groups.map((g) => (
            <section
              key={g.category.slug}
              id={`kat-${g.category.slug}`}
              className="scroll-mt-32"
            >
              <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-brand/10 pb-2">
                <h2 className="font-display text-2xl font-semibold text-brand">
                  {g.category.title}
                </h2>
                <span className="text-sm text-charcoal/45">
                  {g.items.length} ürün
                </span>
              </div>
              {g.category.description ? (
                <p className="mb-5 -mt-3 text-sm text-charcoal/60">
                  {g.category.description}
                </p>
              ) : null}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} showPrices={showPrices} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

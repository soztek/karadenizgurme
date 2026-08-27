"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { cn } from "@/lib/utils";
import type { Category, MenuItemWithCategory } from "@/lib/types";

export function MenuPreview({
  groups,
}: {
  groups: { category: Category; items: MenuItemWithCategory[] }[];
}) {
  const [active, setActive] = useState(groups[0]?.category.slug ?? "");
  if (!groups.length) return null;

  const current =
    groups.find((g) => g.category.slug === active) ?? groups[0];

  return (
    <section className="bg-cream-200/60 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Menümüz"
          title="Kategorilere Göz Atın"
          subtitle="Kahvaltıdan ızgaraya, pideden tatlıya kadar geniş menümüzden bir seçki."
        />

        <div className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {groups.map((g) => (
            <button
              key={g.category.slug}
              type="button"
              onClick={() => setActive(g.category.slug)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active === g.category.slug
                  ? "border-brand bg-brand text-cream"
                  : "border-brand/20 bg-white text-brand hover:border-brand/40",
              )}
            >
              {g.category.title}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {current.items.slice(0, 4).map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/menu#kat-${current.category.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-600"
          >
            {current.category.title} — Tümünü Gör
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Navigation } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const directionHref = settings.google_maps_url || "/yol-tarifi";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all",
        scrolled
          ? "bg-ivory/95 shadow-sm backdrop-blur"
          : "bg-ivory/80 backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={settings.business_name}>
          {settings.logo_url ? (
            <Image
              src={settings.logo_url}
              alt={settings.business_name}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-contain"
              priority
            />
          ) : null}
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold text-brand">
              Karadeniz Gurme
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-mustard-700">
              Oksijen 266
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand/8 text-brand"
                    : "text-charcoal/70 hover:text-brand",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={directionHref}
            target={settings.google_maps_url ? "_blank" : undefined}
            rel={settings.google_maps_url ? "noopener noreferrer" : undefined}
            className="hidden items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-colors hover:bg-red-600 sm:inline-flex"
          >
            <Navigation className="h-4 w-4" />
            Yol Tarifi Al
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand hover:bg-brand/5 lg:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-brand/10 bg-ivory lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-charcoal/80 hover:bg-brand/5 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={directionHref}
              target={settings.google_maps_url ? "_blank" : undefined}
              rel={settings.google_maps_url ? "noopener noreferrer" : undefined}
              className="mt-2 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-red px-4 py-3 text-base font-semibold text-white shadow-[var(--shadow-red)]"
            >
              <Navigation className="h-4 w-4" />
              Yol Tarifi Al
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

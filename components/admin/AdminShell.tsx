"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Building2,
  Images,
  Megaphone,
  Star,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ADMIN_NAV } from "@/lib/constants";
import { signOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  LayoutDashboard,
  UtensilsCrossed,
  Building2,
  Images,
  Megaphone,
  Star,
  FileText,
  Settings,
};

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {ADMIN_NAV.map((item) => {
        const Icon =
          item.icon === "Instagram" ? null : icons[item.icon] ?? LayoutDashboard;
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-mustard text-white"
                : "text-cream/80 hover:bg-cream/10 hover:text-cream",
            )}
          >
            {Icon ? (
              <Icon className="h-5 w-5" />
            ) : (
              <InstagramIcon className="h-4 w-4" />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-cream-200/40">
      {/* Masaüstü kenar çubuğu */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-brand p-4 lg:flex">
        <div className="px-2 py-3">
          <span className="font-display text-lg font-semibold text-cream">
            Karadeniz Gurme
          </span>
          <p className="text-xs text-cream/50">Yönetim Paneli</p>
        </div>
        <div className="mt-4 flex-1">{nav}</div>
        <div className="border-t border-cream/15 pt-3">
          <Link
            href="/"
            target="_blank"
            className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-cream/70 hover:text-cream"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Siteyi Görüntüle
          </Link>
          <p className="truncate px-3 text-xs text-cream/50">{email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream/80 hover:bg-cream/10"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      {/* Mobil üst çubuk */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-brand/10 bg-brand px-4 py-3 lg:hidden">
        <span className="font-display font-semibold text-cream">
          Karadeniz Gurme
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-cream"
          aria-label="Menü"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-b border-brand/10 bg-brand p-4 lg:hidden">
          {nav}
          <form action={signOut} className="mt-3 border-t border-cream/15 pt-3">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream/80 hover:bg-cream/10"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </form>
        </div>
      ) : null}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

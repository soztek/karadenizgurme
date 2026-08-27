import Link from "next/link";
import {
  UtensilsCrossed,
  FolderTree,
  CheckCircle2,
  XCircle,
  Images,
  ArrowRight,
} from "lucide-react";
import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { getDashboardStats } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Toplam Ürün", value: stats.totalItems, icon: UtensilsCrossed, href: "/admin/menu" },
    { label: "Kategori", value: stats.totalCategories, icon: FolderTree, href: "/admin/menu" },
    { label: "Yayında", value: stats.activeItems, icon: CheckCircle2, href: "/admin/menu" },
    { label: "Tükenen", value: stats.soldOutItems, icon: XCircle, href: "/admin/menu" },
    { label: "Galeri Görseli", value: stats.galleryCount, icon: Images, href: "/admin/galeri" },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Gösterge Paneli"
        description="Karadeniz Gurme yönetim özeti"
      />

      {!stats.configured ? <ConfigWarning /> : null}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-5 transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <Icon className="h-6 w-6 text-mustard" />
              <p className="mt-3 text-2xl font-bold text-brand">{c.value}</p>
              <p className="text-xs text-charcoal/55">{c.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-brand">
            Son Değişiklikler
          </h2>
          {stats.recent.length ? (
            <ul className="mt-4 divide-y divide-brand/5">
              {stats.recent.map((r, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <span className="text-charcoal/80">{r.title}</span>
                  <span className="text-xs text-charcoal/45">
                    {r.updated_at
                      ? new Date(r.updated_at).toLocaleDateString("tr-TR")
                      : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-charcoal/55">
              Henüz değişiklik kaydı yok.
            </p>
          )}
        </div>

        <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-brand">
            Hızlı İşlemler
          </h2>
          <div className="mt-4 space-y-2">
            {[
              { href: "/admin/menu", label: "Menü ve ürünleri yönet" },
              { href: "/admin/galeri", label: "Galeri görsellerini düzenle" },
              { href: "/admin/kampanyalar", label: "Kampanya oluştur" },
              { href: "/admin/ayarlar", label: "Site ayarları ve iletişim bilgileri" },
            ].map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="flex items-center justify-between rounded-lg border border-brand/10 px-4 py-3 text-sm text-brand transition-colors hover:bg-cream-200/60"
              >
                {q.label}
                <ArrowRight className="h-4 w-4 text-mustard" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

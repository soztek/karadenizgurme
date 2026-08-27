import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { MenuManager } from "@/components/admin/MenuManager";
import { getAdminCategories, getAdminMenuItems } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const [categories, items] = await Promise.all([
    getAdminCategories(),
    getAdminMenuItems(),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Menü Yönetimi"
        description="Kategori ve ürünleri ekleyin, düzenleyin, sıralayın."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}
      <MenuManager categories={categories} items={items} />
    </div>
  );
}

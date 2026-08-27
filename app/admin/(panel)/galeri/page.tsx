import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { getAdminGallery } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await getAdminGallery();
  return (
    <div>
      <AdminPageHeader
        title="Galeri Yönetimi"
        description="Görselleri yükleyin, sıralayın ve yayın durumunu ayarlayın."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}
      <GalleryManager items={items} />
    </div>
  );
}

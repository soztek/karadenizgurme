import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { ContentManager } from "@/components/admin/ContentManager";
import { getAdminContent } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const sections = await getAdminContent();
  return (
    <div>
      <AdminPageHeader
        title="İçerik Yönetimi"
        description="Ana sayfa metinleri, hikâye ve özellik kartlarını düzenleyin."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}
      <ContentManager sections={sections} />
    </div>
  );
}

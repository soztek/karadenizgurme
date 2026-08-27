import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getAdminSettings } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();
  return (
    <div>
      <AdminPageHeader
        title="Site Ayarları"
        description="İşletme bilgileri, iletişim, konum ve SEO ayarları."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}
      <SettingsForm settings={settings} />
    </div>
  );
}

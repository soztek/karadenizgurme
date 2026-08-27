import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { CampaignManager } from "@/components/admin/CampaignManager";
import { getAdminCampaigns } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminCampaignsPage() {
  const items = await getAdminCampaigns();
  return (
    <div>
      <AdminPageHeader
        title="Kampanya Yönetimi"
        description="Kampanyaları oluşturun ve ana sayfada gösterin."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}
      <CampaignManager items={items} />
    </div>
  );
}

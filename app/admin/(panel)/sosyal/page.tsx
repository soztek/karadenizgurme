import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { SocialManager } from "@/components/admin/SocialManager";
import { getAdminSocial } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  const items = await getAdminSocial();
  return (
    <div>
      <AdminPageHeader
        title="Sosyal Medya"
        description="Instagram gönderi kartlarını yönetin (manuel görsel + bağlantı)."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}
      <SocialManager items={items} />
    </div>
  );
}

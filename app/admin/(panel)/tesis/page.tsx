import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { FacilityManager } from "@/components/admin/FacilityManager";
import { getAdminFacility } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminFacilityPage() {
  const items = await getAdminFacility();
  return (
    <div>
      <AdminPageHeader
        title="Tesis Rehberi"
        description="Restoran, akaryakıt, EV şarj, mağaza ve ATM gibi tesis hizmetlerini yönetin."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}
      <FacilityManager items={items} />
    </div>
  );
}

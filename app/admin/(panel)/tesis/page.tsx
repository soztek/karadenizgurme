import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { FacilityManager } from "@/components/admin/FacilityManager";
import { AmenityManager } from "@/components/admin/AmenityManager";
import { getAdminFacility, getAdminAmenities } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminFacilityPage() {
  const [facility, amenities] = await Promise.all([
    getAdminFacility(),
    getAdminAmenities(),
  ]);
  return (
    <div>
      <AdminPageHeader
        title="Tesis Rehberi"
        description="Tesis olanaklarını (ikon şeridi) ve hizmet kataloğunu yönetin."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}

      <section className="mb-10">
        <h2 className="mb-1 font-display text-lg font-semibold text-brand">
          Tesis Olanakları
        </h2>
        <p className="mb-4 text-sm text-charcoal/55">
          Ana sayfa ve Tesis Rehberi&apos;ndeki ikon şeridi. Olmayanları silin,
          isterseniz ikon yerine görsel ekleyin.
        </p>
        <AmenityManager items={amenities} />
      </section>

      <section>
        <h2 className="mb-1 font-display text-lg font-semibold text-brand">
          Tesis Hizmetleri
        </h2>
        <p className="mb-4 text-sm text-charcoal/55">
          Restoran, akaryakıt, EV şarj, mağaza ve ATM kartları.
        </p>
        <FacilityManager items={facility} />
      </section>
    </div>
  );
}

import { AdminPageHeader, ConfigWarning } from "@/components/admin/ui";
import { TestimonialManager } from "@/components/admin/TestimonialManager";
import { getAdminTestimonials } from "@/lib/admin-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const items = await getAdminTestimonials();
  return (
    <div>
      <AdminPageHeader
        title="Müşteri Yorumları"
        description="Gerçek müşteri yorumlarını ekleyin ve yönetin."
      />
      {!isSupabaseConfigured ? <ConfigWarning /> : null}
      <TestimonialManager items={items} />
    </div>
  );
}

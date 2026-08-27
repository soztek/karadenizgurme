import "server-only";
import { getAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SupabaseClient } from "@supabase/supabase-js";

export type ActionResult = { ok: boolean; error?: string; id?: string };

/**
 * Admin yetkisini doğrular ve service-role istemcisini döndürür.
 * Yetki yoksa ya da yapılandırma eksikse hata mesajı döner.
 */
export async function withAdmin(): Promise<
  | { ok: true; sb: SupabaseClient }
  | { ok: false; error: string }
> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Yetkisiz işlem." };
  const sb = createAdminClient();
  if (!sb)
    return {
      ok: false,
      error: "Sunucu yapılandırması eksik (SERVICE_ROLE anahtarı).",
    };
  return { ok: true, sb };
}

export function fail(error: string): ActionResult {
  return { ok: false, error };
}

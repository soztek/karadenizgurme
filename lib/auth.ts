import "server-only";
import type { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { createAdminClient } from "./supabase/admin";

/** Oturumdaki kullanıcıyı döndürür (yoksa null). */
export async function getSessionUser(): Promise<User | null> {
  const sb = await createClient();
  if (!sb) return null;
  const {
    data: { user },
  } = await sb.auth.getUser();
  return user ?? null;
}

/** Kullanıcının admins tablosunda kayıtlı (ve aktif) olup olmadığını doğrular. */
export async function isAdmin(user: User | null): Promise<boolean> {
  if (!user?.email) return false;
  const admin = createAdminClient();
  if (!admin) return false;
  const { data } = await admin
    .from("admins")
    .select("id, is_active")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();
  return Boolean(data && data.is_active !== false);
}

/** Hem oturum hem admin yetkisini kontrol eder. */
export async function getAdminUser(): Promise<User | null> {
  const user = await getSessionUser();
  if (!user) return null;
  return (await isAdmin(user)) ? user : null;
}

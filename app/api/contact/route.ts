import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";

/** Basit bellek içi rate limit (IP başına). Sunucu yeniden başlayınca sıfırlanır. */
const WINDOW_MS = 10 * 60 * 1000; // 10 dakika
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Çok fazla deneme. Lütfen birkaç dakika sonra tekrar deneyin." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message || "Form geçersiz.";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  const { website, name, phone, email, message } = parsed.data;

  // Honeypot doldurulduysa botu sessizce başarılı gibi geçir (veri kaydetme).
  if (website) {
    return NextResponse.json({ ok: true, message: "Mesajınız alındı." });
  }

  // Supabase yapılandırıldıysa mesajı kaydet.
  const admin = createAdminClient();
  if (admin) {
    try {
      await admin.from("contact_messages").insert({
        name,
        phone: phone || null,
        email: email || null,
        message,
        ip,
      });
    } catch {
      // Kayıt başarısız olsa da kullanıcıya hata döndürmüyoruz.
    }
  }

  return NextResponse.json({
    ok: true,
    message: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
  });
}

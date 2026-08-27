import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gizlilik ve Çerez Politikası",
  description:
    "İsmet Akbulut Karadeniz Gurme gizlilik ve çerez politikası.",
  alternates: { canonical: "/gizlilik" },
  robots: { index: true, follow: false },
};

export default async function GizlilikPage() {
  const s = await getSettings();
  return (
    <>
      <PageHero
        title="Gizlilik ve Çerez Politikası"
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Gizlilik ve Çerez Politikası", href: "/gizlilik" },
        ]}
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-charcoal/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brand [&_p]:mt-2">
          <p>
            {s.business_name} olarak gizliliğinize önem veriyoruz. Bu politika,
            web sitemizi kullanırken verilerinizin nasıl işlendiğini ve çerez
            kullanımını açıklar.
          </p>

          <h2>Topladığımız Bilgiler</h2>
          <p>
            İletişim formu üzerinden ilettiğiniz bilgiler (ad, telefon, e-posta,
            mesaj) yalnızca talebinizi yanıtlamak için kullanılır. Bunun dışında
            kişisel veri toplanmaz.
          </p>

          <h2>Çerezler</h2>
          <p>
            Web sitemiz, temel işlevlerin çalışması için gerekli olan çerezleri
            kullanabilir. Sitenin performansını ölçmek amacıyla anonim analitik
            çerezler kullanılması durumunda, tarayıcı ayarlarınızdan çerezleri
            reddedebilir veya silebilirsiniz.
          </p>

          <h2>Üçüncü Taraf Hizmetleri</h2>
          <p>
            Harita görüntüleme (Google Maps) ve sosyal medya bağlantıları gibi
            üçüncü taraf hizmetleri, kendi gizlilik politikalarına tabidir.
          </p>

          <h2>Veri Güvenliği</h2>
          <p>
            Verilerinizin güvenliği için makul teknik ve idari tedbirler alınır.
          </p>

          <h2>İletişim</h2>
          <p>
            Gizlilik uygulamalarımızla ilgili sorularınız için{" "}
            {s.phone ? `${s.phone} numaralı telefondan ` : ""}
            {s.instagram_url ? "veya sosyal medya hesaplarımızdan " : ""}
            bize ulaşabilirsiniz.
          </p>

          <p className="mt-8 rounded-lg bg-cream-200/60 p-4 text-xs text-charcoal/60">
            Not: Bu metin genel bilgilendirme amaçlıdır ve işletmenin resmi
            bilgileri netleştiğinde güncellenmelidir.
          </p>
        </div>
      </Container>
    </>
  );
}

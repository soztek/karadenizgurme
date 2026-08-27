import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "İsmet Akbulut Karadeniz Gurme kişisel verilerin korunması (KVKK) aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
  robots: { index: true, follow: false },
};

export default async function KvkkPage() {
  const s = await getSettings();
  return (
    <>
      <PageHero
        title="KVKK Aydınlatma Metni"
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "KVKK Aydınlatma Metni", href: "/kvkk" },
        ]}
      />
      <Container className="py-14">
        <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-charcoal/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brand [&_p]:mt-2">
          <p>
            İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması
            Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla{" "}
            {s.business_name} tarafından hazırlanmıştır.
          </p>

          <h2>1. Veri Sorumlusu</h2>
          <p>
            Kişisel verileriniz, veri sorumlusu olarak {s.business_name}{" "}
            tarafından aşağıda açıklanan kapsamda işlenmektedir.
            {s.address ? ` Adres: ${s.address}.` : ""}
          </p>

          <h2>2. İşlenen Kişisel Veriler</h2>
          <p>
            İletişim formu aracılığıyla ilettiğiniz ad-soyad, telefon, e-posta
            ve mesaj içeriği; rezervasyon ve talepleriniz kapsamında paylaştığınız
            iletişim bilgileri işlenebilmektedir.
          </p>

          <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
          <p>
            Verileriniz; taleplerinizin ve sorularınızın yanıtlanması, rezervasyon
            süreçlerinin yürütülmesi, hizmet kalitesinin artırılması ve yasal
            yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.
          </p>

          <h2>4. Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, yalnızca yukarıdaki amaçların gerçekleştirilmesi
            için ve yasal yükümlülükler çerçevesinde yetkili kişi, kurum ve
            kuruluşlarla paylaşılabilir.
          </p>

          <h2>5. Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
          <p>
            Verileriniz; web sitemizdeki iletişim formu ve elektronik iletişim
            kanalları aracılığıyla, KVKK m.5 kapsamındaki hukuki sebeplere
            dayanılarak toplanmaktadır.
          </p>

          <h2>6. KVKK Kapsamındaki Haklarınız</h2>
          <p>
            KVKK m.11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme,
            işlenmişse buna ilişkin bilgi talep etme, düzeltilmesini veya
            silinmesini isteme ve kanunda sayılan diğer haklarınızı
            kullanabilirsiniz. Taleplerinizi{" "}
            {s.phone ? `${s.phone} numaralı telefondan ` : ""}
            {s.instagram_url ? "veya sosyal medya hesaplarımızdan " : ""}
            bize iletebilirsiniz.
          </p>

          <p className="mt-8 rounded-lg bg-cream-200/60 p-4 text-xs text-charcoal/60">
            Not: Bu metin genel bilgilendirme amaçlıdır. İşletmeye ait resmi
            ticari unvan, açık adres ve başvuru kanalları netleştiğinde yönetim
            panelindeki içerik alanından güncellenmelidir.
          </p>
        </div>
      </Container>
    </>
  );
}

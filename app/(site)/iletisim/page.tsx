import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Clock, Navigation } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";
import { getSettings } from "@/lib/data";
import { telLink, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Karadeniz Gurme ile iletişime geçin: telefon, WhatsApp, adres, çalışma saatleri ve iletişim formu.",
  alternates: { canonical: "/iletisim" },
};

export default async function IletisimPage() {
  const s = await getSettings();

  const rows = [
    s.phone && {
      icon: Phone,
      label: "Telefon",
      value: s.phone,
      href: telLink(s.phone),
      external: false,
    },
    s.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: s.whatsapp,
      href: whatsappLink(s.whatsapp),
      external: true,
    },
    s.address && {
      icon: MapPin,
      label: "Adres",
      value: s.address,
      href: s.google_maps_url || "/yol-tarifi",
      external: Boolean(s.google_maps_url),
    },
    s.working_hours && {
      icon: Clock,
      label: "Çalışma Saatleri",
      value: s.working_hours,
      href: null,
      external: false,
    },
    s.instagram_url && {
      icon: InstagramIcon,
      label: "Instagram",
      value: `@${s.instagram_handle}`,
      href: s.instagram_url,
      external: true,
    },
  ].filter(Boolean) as {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    href: string | null;
    external: boolean;
  }[];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "İletişim", url: "/iletisim" },
        ]}
      />
      <PageHero
        title="İletişim"
        subtitle="Sorularınız, rezervasyon ve önerileriniz için bize ulaşın."
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "İletişim", href: "/iletisim" },
        ]}
      />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand">
              Bize Ulaşın
            </h2>
            <ul className="mt-6 space-y-4">
              {rows.length ? (
                rows.map((r) => {
                  const Icon = r.icon;
                  const content = (
                    <div className="flex gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-mustard" />
                      <div>
                        <p className="text-sm font-semibold text-brand">
                          {r.label}
                        </p>
                        <p className="text-sm text-charcoal/70">{r.value}</p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={r.label}>
                      {r.href ? (
                        <a
                          href={r.href}
                          target={r.external ? "_blank" : undefined}
                          rel={r.external ? "noopener noreferrer" : undefined}
                          className="block rounded-lg p-2 transition-colors hover:bg-cream-200/60"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="p-2">{content}</div>
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="rounded-lg bg-cream-200/60 p-4 text-sm text-charcoal/60">
                  İletişim bilgileri yönetim panelinden girildiğinde burada
                  görüntülenecektir.
                </li>
              )}
            </ul>

            <a
              href={s.google_maps_url || "/yol-tarifi"}
              target={s.google_maps_url ? "_blank" : undefined}
              rel={s.google_maps_url ? "noopener noreferrer" : undefined}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-600"
            >
              <Navigation className="h-4 w-4" />
              Yol Tarifi Al
            </a>
          </div>

          <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-brand">
              İletişim Formu
            </h2>
            <p className="mt-1 mb-6 text-sm text-charcoal/60">
              Formu doldurun, en kısa sürede size dönüş yapalım.
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}

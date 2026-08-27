import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { WhyUs } from "@/components/site/WhyUs";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";
import { getStory, getWhyUs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hikâyemiz",
  description:
    "Karadeniz'den İstanbul–İzmir Otoyolu'na uzanan Karadeniz Gurme'nin hikâyesi; yılların mutfak tecrübesi ve yöresel tarifler.",
  alternates: { canonical: "/hikayemiz" },
};

export default async function HikayemizPage() {
  const [story, whyUs] = await Promise.all([getStory(), getWhyUs()]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Hikâyemiz", url: "/hikayemiz" },
        ]}
      />
      <PageHero
        title="Hikâyemiz"
        subtitle={story.subtitle}
        breadcrumb={[
          { name: "Ana Sayfa", href: "/" },
          { name: "Hikâyemiz", href: "/hikayemiz" },
        ]}
      />

      <Container className="py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]">
            {story.image_url ? (
              <Image
                src={story.image_url}
                alt={story.title}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-cream pattern-topo" />
            )}
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold text-brand">
              {story.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal/75">
              {story.body.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <WhyUs {...whyUs} />
    </>
  );
}

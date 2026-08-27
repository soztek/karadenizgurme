import Image from "next/image";
import { UtensilsCrossed, Navigation, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { telLink } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export function Hero({ settings }: { settings: SiteSettings }) {
  const poster = settings.og_image_url || "/images/hero/hero-1.png";
  const hasVideo = Boolean(settings.hero_video_url);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {hasVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
          >
            <source src={settings.hero_video_url!} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-brand/85" />
      </div>

      <div className="mx-auto flex min-h-[86vh] w-full max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <div className="max-w-2xl animate-fade-up">
          {settings.slogan ? (
            <span className="mb-5 inline-block rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-cream backdrop-blur">
              {settings.slogan}
            </span>
          ) : null}
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] text-cream sm:text-5xl md:text-6xl">
            {settings.hero_title}
          </h1>
          <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-cream/85">
            {settings.hero_subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink
              href={settings.google_maps_url || "/yol-tarifi"}
              external={Boolean(settings.google_maps_url)}
              size="xl"
              variant="red"
              className="pulse-red"
            >
              <Navigation className="h-6 w-6" />
              Yol Tarifi Al
            </ButtonLink>
            <ButtonLink href="/menu" variant="mustard" size="lg">
              <UtensilsCrossed className="h-5 w-5" />
              Menüyü İncele
            </ButtonLink>
            {settings.phone ? (
              <ButtonLink
                href={telLink(settings.phone)}
                external
                size="lg"
                variant="outline"
                className="border-cream/40 text-cream hover:bg-cream hover:text-brand"
              >
                <Phone className="h-5 w-5" />
                Hemen Ara
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

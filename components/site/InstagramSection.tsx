import Image from "next/image";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { DEFAULT_INSTAGRAM } from "@/lib/defaults";
import type { SocialPost } from "@/lib/types";

export function InstagramSection({
  posts,
  handle,
  url,
}: {
  posts: SocialPost[];
  handle?: string;
  url?: string;
}) {
  const igHandle = handle || DEFAULT_INSTAGRAM.handle;
  const igUrl = url || DEFAULT_INSTAGRAM.url;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Sosyal Medya"
          title={DEFAULT_INSTAGRAM.title}
          subtitle={DEFAULT_INSTAGRAM.subtitle}
        />
        <p className="mt-2 text-center text-sm font-semibold text-mustard-700">
          @{igHandle}
        </p>

        {posts.length ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {posts.slice(0, 4).map((p) => (
              <a
                key={p.id}
                href={p.link_url || igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={p.image_url}
                  alt={p.title || "Instagram gönderisi"}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 text-white opacity-0 transition-all group-hover:bg-charcoal/35 group-hover:opacity-100">
                  <InstagramIcon className="h-7 w-7" />
                </span>
              </a>
            ))}
          </div>
        ) : null}

        <div className="mt-9 text-center">
          <ButtonLink href={igUrl} external variant="mustard" size="lg">
            <InstagramIcon className="h-5 w-5" />
            Instagram&apos;da Takip Et
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

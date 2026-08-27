import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function StoryPreview({
  title,
  subtitle,
  body,
  image_url,
}: {
  title: string;
  subtitle: string;
  body: string;
  image_url: string | null;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]">
            {image_url ? (
              <Image
                src={image_url}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-cream pattern-topo" />
            )}
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mustard-700">
              {subtitle}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold text-brand sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal/75">
              {body}
            </p>
            <div className="mt-7">
              <ButtonLink href="/hikayemiz" variant="outline">
                Hikâyemizi Keşfedin
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

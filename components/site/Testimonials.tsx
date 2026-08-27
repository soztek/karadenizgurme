import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <section className="bg-cream-200/60 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Misafirlerimiz"
          title="Yorumlar"
          subtitle="Yolculuğuna Karadeniz Gurme molası ekleyenlerin görüşleri."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-[var(--radius-card)] border border-brand/10 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5 text-mustard">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    fill={i < t.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/75">
                “{t.comment}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brand">
                {t.name}
                {t.source ? (
                  <span className="ml-1 font-normal text-charcoal/50">
                    · {t.source}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

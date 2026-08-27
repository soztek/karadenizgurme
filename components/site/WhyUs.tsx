import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureIcon } from "@/components/ui/icon-map";
import type { Feature } from "@/lib/types";

export function WhyUs({
  title,
  subtitle,
  features,
}: {
  title: string;
  subtitle: string;
  features: Feature[];
}) {
  return (
    <section className="bg-brand py-16 text-cream sm:py-20">
      <Container>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          className="[&_h2]:text-cream [&_p]:text-cream/75"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-[var(--radius-card)] border border-cream/12 bg-cream/[0.06] p-6 transition-colors hover:bg-cream/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mustard/20 text-mustard-400">
                <FeatureIcon name={f.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-cream">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/70">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: { name: string; href: string }[];
}) {
  return (
    <section className="border-b border-brand/10 bg-brand text-cream">
      <Container className="py-12 sm:py-16">
        {breadcrumb ? (
          <nav aria-label="Sayfa yolu" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-cream/60">
              {breadcrumb.map((b, i) => (
                <li key={b.href} className="flex items-center gap-1">
                  {i > 0 ? <ChevronRight className="h-3 w-3" /> : null}
                  {i < breadcrumb.length - 1 ? (
                    <Link href={b.href} className="hover:text-mustard-400">
                      {b.name}
                    </Link>
                  ) : (
                    <span className="text-cream/90">{b.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <h1 className="font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-cream/80">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

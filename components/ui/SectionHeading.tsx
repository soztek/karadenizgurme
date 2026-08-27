import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-mustard-700">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold text-brand sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-balance text-base leading-relaxed text-charcoal/70">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

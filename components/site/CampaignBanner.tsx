import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Megaphone } from "lucide-react";
import type { Campaign } from "@/lib/types";

export function CampaignBanner({ campaign }: { campaign: Campaign }) {
  return (
    <div className="bg-mustard/10">
      <Container className="py-4">
        <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-mustard/25 bg-white p-4 sm:flex-row sm:p-5">
          {campaign.image_url ? (
            <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-28">
              <Image
                src={campaign.image_url}
                alt={campaign.title}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mustard/15 text-mustard">
              <Megaphone className="h-6 w-6" />
            </div>
          )}
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold text-brand">
              {campaign.title}
            </p>
            {campaign.description ? (
              <p className="mt-0.5 text-sm text-charcoal/70">
                {campaign.description}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}

import { Hero } from "@/components/site/Hero";
import { QuickAccess } from "@/components/site/QuickAccess";
import { FeaturedItems } from "@/components/site/FeaturedItems";
import { WhyUs } from "@/components/site/WhyUs";
import { StoryPreview } from "@/components/site/StoryPreview";
import { Amenities } from "@/components/site/Amenities";
import { InstagramSection } from "@/components/site/InstagramSection";
import { Testimonials } from "@/components/site/Testimonials";
import { DirectionsSection } from "@/components/site/DirectionsSection";
import { CampaignBanner } from "@/components/site/CampaignBanner";
import {
  getSettings,
  getMenuItems,
  getSocialPosts,
  getTestimonials,
  getCampaigns,
  getStory,
  getWhyUs,
  getAmenities,
} from "@/lib/data";

export default async function HomePage() {
  const [
    settings,
    featured,
    social,
    testimonials,
    campaigns,
    story,
    whyUs,
    amenities,
  ] = await Promise.all([
    getSettings(),
    getMenuItems({ featured: true }),
    getSocialPosts(),
    getTestimonials(),
    getCampaigns(true),
    getStory(),
    getWhyUs(),
    getAmenities(),
  ]);

  return (
    <>
      <Hero settings={settings} />
      <QuickAccess settings={settings} />
      {campaigns.length ? <CampaignBanner campaign={campaigns[0]} /> : null}
      <FeaturedItems items={featured} showPrices={settings.show_prices} />
      <WhyUs {...whyUs} />
      <StoryPreview {...story} />
      <Amenities {...amenities} />
      <Testimonials items={testimonials} />
      <InstagramSection
        posts={social}
        handle={settings.instagram_handle}
        url={settings.instagram_url}
      />
      <DirectionsSection settings={settings} />
    </>
  );
}

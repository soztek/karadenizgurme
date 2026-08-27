import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileQuickBar } from "@/components/site/MobileQuickBar";
import { LocalBusinessJsonLd } from "@/components/site/JsonLd";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <>
      <LocalBusinessJsonLd settings={settings} />
      <Header settings={settings} />
      <main className="min-h-[60vh] pb-20 lg:pb-0">{children}</main>
      <Footer settings={settings} />
      <MobileQuickBar settings={settings} />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: s.seo_title || `${s.business_name}`,
      template: `%s | ${s.short_name}`,
    },
    description: s.seo_description,
    applicationName: s.business_name,
    keywords: [
      "İstanbul İzmir otoyolu yemek yerleri",
      "Oksijen 266 restoran",
      "Savaştepe Karadeniz yemekleri",
      "İstanbul İzmir otobanı dinlenme tesisi",
      "Karadeniz Gurme",
      "Balıkesir Karadeniz mutfağı",
      "otoyolda yöresel yemek",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: s.business_name,
      title: s.seo_title,
      description: s.seo_description,
      images: s.og_image_url ? [{ url: s.og_image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: s.seo_title,
      description: s.seo_description,
      images: s.og_image_url ? [s.og_image_url] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#123b2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

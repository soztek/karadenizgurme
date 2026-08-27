import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/menu",
    "/tesis",
    "/lezzetlerimiz",
    "/hikayemiz",
    "/galeri",
    "/yol-tarifi",
    "/iletisim",
    "/kvkk",
    "/gizlilik",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/menu" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/menu" ? 0.9 : 0.6,
  }));
}

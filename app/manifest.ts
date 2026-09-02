import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "İsmet Akbulut Karadeniz Gurme",
    short_name: "Karadeniz Gurme",
    description:
      "İstanbul–İzmir Otoyolu Oksijen 266'da Karadeniz mutfağı, yöresel lezzetler, dijital menü ve tesis rehberi.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcf8ee",
    theme_color: "#123b2a",
    lang: "tr",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}

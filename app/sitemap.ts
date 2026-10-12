import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ycnlabs.com";
  const routes = [
    "",
    "/what-we-solve",
    "/work",
    "/how-we-work",
    "/engineering",
    "/about",
    "/contact",
    "/credits",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/contact" ? 0.9 : 0.8,
  }));
}

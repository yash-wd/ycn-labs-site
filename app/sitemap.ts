import { MetadataRoute } from "next";
import { isStaging } from "@/lib/env/staging";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isStaging()) {
    return [];
  }

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
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/contact" ? 0.9 : 0.8,
  }));
}

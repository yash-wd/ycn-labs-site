import { MetadataRoute } from "next";
import { isStaging } from "@/lib/env/staging";

export default function robots(): MetadataRoute.Robots {
  if (isStaging()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://ycnlabs.com/sitemap.xml",
  };
}

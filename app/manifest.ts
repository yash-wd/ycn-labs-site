import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YCN Labs",
    short_name: "YCN Labs",
    description: "Websites and software. Built around your business.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D111A",
    theme_color: "#0470B4",
    icons: [
      {
        src: "/brand/ycn-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/ycn-icon-512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}

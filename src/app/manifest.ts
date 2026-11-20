import type { MetadataRoute } from "next";

// Web App Manifest: makes EYENEC installable to the home screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EYENEC – every vote, every voice",
    short_name: "EYENEC",
    description:
      "Report that you voted, share what you see at your polling unit, and follow verified election updates across Nigeria.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#064D31",
    theme_color: "#064D31",
    lang: "en",
    categories: ["news", "social", "utilities"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

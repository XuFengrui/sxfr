import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "情绪充电屋",
    short_name: "情绪充电屋",
    description: "为你准备的专属情绪充电屋",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fef7f8",
    theme_color: "#fef7f8",
    icons: [
      { src: "/logo.jpg", sizes: "512x512", type: "image/jpeg", purpose: "any" },
      { src: "/logo.jpg", sizes: "192x192", type: "image/jpeg", purpose: "any maskable" }
    ]
  }
}

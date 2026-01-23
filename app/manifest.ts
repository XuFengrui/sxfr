import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "心愿盲盒",
    short_name: "心愿盲盒",
    description: "为你准备的专属心愿盲盒",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fef7f8",
    theme_color: "#fef7f8",
    icons: [
      // iOS 主屏主要用 apple-touch-icon（见 metadata.icons.apple）
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  }
}

import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { PwaRegister } from "@/components/pwa-register"

export const metadata: Metadata = {
  title: "情绪充电屋",
  description: "为你准备的专属情绪充电屋",
  generator: "v0.app",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "情绪充电屋",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/logo.jpg",
        type: "image/jpeg",
      },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo.jpg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fef7f8",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased overflow-x-hidden">
        {children}
        <PwaRegister />
      </body>
    </html>
  )
}

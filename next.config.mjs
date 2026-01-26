/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出，适合 Cloudflare Pages

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },

  // 确保 trailingSlash 配置正确
  trailingSlash: false,
}

export default nextConfig
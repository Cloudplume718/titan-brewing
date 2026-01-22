/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 🟢 localPatterns 白名单配置
    localPatterns: [
      // 1. 允许 /api/image 路径（不限制 search 参数，这样 ?token= 什么都行）
      {
        pathname: '/api/image',
      },
      // 2. 允许 /images/ 下的所有静态图片
      {
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 允许 Unsplash
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // 如果暂时还用 Sanity，加上这个
      },
      // 未来如果你用了阿里云 OSS，记得把你的 OSS 域名加在这里
      // {
      //   protocol: 'https',
      //   hostname: 'your-bucket.oss-cn-hongkong.aliyuncs.com',
      // },
    ],
  },
};

export default nextConfig;
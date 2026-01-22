import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/context/WishlistContext"; // 🟢 1. 引入

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Titan Brewing | 欧瑞堡精酿设备",
  description: "专业二手精酿啤酒设备交易平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased`}>
        {/* 🟢 2. 用 Provider 包裹整个应用 */}
        <WishlistProvider>
          <Navbar />
          {children}
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
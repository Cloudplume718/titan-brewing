import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/context/WishlistContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  // 🟢 修改点：网站标题和描述
  title: "山之欧瑞堡 | 专业二手精酿设备供应链",
  description: "25年资深酿酒师大山严选。主营100升-10吨二手啤酒设备，拥有1000平仓储中心，提供原料供应与技术扶持。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${oswald.variable} bg-background text-foreground antialiased`}>
        <WishlistProvider>
          <Navbar />
          {children}
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
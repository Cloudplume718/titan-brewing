"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Heart, Menu, X, Phone } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter(); // 🟢 用于搜索跳转
  const { items } = useWishlist(); // 🟢 获取收藏数量
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // 后台页面不显示导航
  if (pathname && pathname.startsWith('/keystatic')) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // 🟢 跳转到商店页面并带上查询参数
      router.push(`/shop?search=${encodeURIComponent(searchValue)}`);
      setIsMenuOpen(false); // 手机端搜索后关闭菜单
    }
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-heading font-bold text-xl rounded-sm">
              O
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none text-black">OURUIBAO</span>
              <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Titan Brewing</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">首页</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">设备库存</Link>
            <Link href="/about" className="hover:text-primary transition-colors">关于大山</Link>
            {/* 🟢 修改联系大山跳转 */}
            <Link href="/about#contact" className="hover:text-primary transition-colors">联系我们</Link>
          </div>

          {/* Icons Area */}
          <div className="hidden md:flex items-center gap-6">
            {/* 🟢 搜索框 */}
            <form onSubmit={handleSearch} className="relative group">
              <input 
                type="text" 
                placeholder="搜索设备..." 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-3 pr-8 py-1 border-b border-gray-300 focus:border-primary outline-none text-sm w-32 focus:w-48 transition-all bg-transparent"
              />
              <button type="submit" className="absolute right-0 top-1 text-gray-400 hover:text-primary">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* 🟢 收藏夹图标 */}
            <div className="relative group">
                <Heart className="w-6 h-6 text-gray-800 group-hover:text-primary cursor-pointer transition-colors" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {items.length}
                  </span>
                )}
                {/* 简单的悬浮提示，也可以点击跳转到专门的收藏页 */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-xl border border-gray-100 p-4 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <p className="text-sm font-bold mb-2">已收藏 {items.length} 件设备</p>
                    {items.length === 0 ? (
                        <p className="text-xs text-gray-400">暂无收藏</p>
                    ) : (
                        <div className="max-h-48 overflow-y-auto">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-2 mb-2 text-xs border-b border-gray-50 pb-2">
                                    <div className="w-8 h-8 bg-gray-100 relative shrink-0"><img src={item.image} className="w-full h-full object-cover"/></div>
                                    <div className="overflow-hidden">
                                        <p className="truncate font-bold">{item.name}</p>
                                        <p className="text-primary">¥{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Link href="/about#contact" className="bg-primary hover:bg-red-700 text-white px-5 py-2 rounded-sm font-bold text-sm uppercase transition-colors shadow-lg shadow-red-500/30">
              联系大山
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 h-screen animate-in slide-in-from-top-5">
          <div className="p-4 space-y-4">
             {/* 🟢 手机端搜索 */}
             <form onSubmit={handleSearch} className="relative mb-6">
                <input 
                    type="text" 
                    placeholder="搜索设备..." 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full bg-gray-50 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-primary"
                />
                <button type="submit" className="absolute right-4 top-3 text-gray-400"><Search className="w-5 h-5" /></button>
             </form>

            <Link href="/" className="block py-2 text-lg font-bold border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>首页</Link>
            <Link href="/shop" className="block py-2 text-lg font-bold border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>设备库存</Link>
            <Link href="/about" className="block py-2 text-lg font-bold border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>关于大山</Link>
            
            <div className="pt-4 flex items-center justify-between">
                <span className="font-bold">我的收藏 ({items.length})</span>
                <Heart className="w-6 h-6 text-primary" />
            </div>

            <Link href="/about#contact" onClick={() => setIsMenuOpen(false)} className="mt-8 block w-full bg-primary text-white text-center py-4 rounded-sm font-bold uppercase">
              联系大山
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
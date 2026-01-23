"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Heart, Menu, X, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
// 🟢 引入 NavSearch
import NavSearch from "@/components/NavSearch";

export default function Navbar() {
  const pathname = usePathname();
  const { items, removeFromWishlist } = useWishlist();
  
  // 状态管理
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // 鼠标悬停状态

  // Keystatic 后台不显示
  if (pathname && pathname.startsWith('/keystatic')) return null;

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 手机端简单的搜索处理
  const [mobileSearch, setMobileSearch] = useState("");
  const handleMobileSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if(mobileSearch.trim()){
          window.location.href = `/shop?q=${mobileSearch}`;
      }
  }

  // 判断是否是首页
  const isHomePage = pathname === "/";

  // 核心逻辑：判断导航栏是否应该是实心（白色背景）
  const isSolid = !isHomePage || isScrolled || isHovered || isMenuOpen;
  
  // 🟢 计算“透明模式”：只有在首页、且没滚动、没悬停、没开菜单时，才是透明的
  // 只有这种情况下，搜索框和图标才应该是纯白色
  const isTransparent = isHomePage && !isScrolled && !isHovered && !isMenuOpen;

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        isSolid
          ? "bg-white/95 backdrop-blur-md border-gray-100 shadow-sm py-0" 
          : "bg-transparent border-transparent py-4" 
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo 区域 */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative">
               <Image 
                 src="/icon.svg" 
                 alt="欧瑞堡 Logo" 
                 fill 
                 className="object-contain" 
               />
            </div>
            <div className="flex flex-col">
              <span 
                className={`font-heading font-bold text-xl leading-none transition-colors ${
                  isSolid ? "text-black" : "text-white"
                }`}
              >
                OURUIBAO
              </span>
              <span 
                className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  isSolid ? "text-gray-500" : "text-gray-300"
                }`}
              >
                欧瑞堡精酿
              </span>
            </div>
          </Link>

          {/* 电脑端菜单 */}
          <div 
            className={`hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider transition-colors ${
              isSolid ? "text-gray-600" : "text-white/90"
            }`}
          >
            <Link href="/" className="hover:text-primary transition-colors">首页</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">设备库存</Link>
            <Link href="/learn" className="hover:text-primary transition-colors">酿造学院</Link> 
            <Link href="/about" className="hover:text-primary transition-colors">关于大山</Link>
          </div>

          {/* 右侧图标区域 */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* 🟢 替换原来的 form 为 NavSearch，并传入 isTransparent */}
            <NavSearch isTransparent={isTransparent} />

            {/* 收藏夹图标 */}
            <div className="relative group">
                <div className="relative cursor-pointer py-2">
                    <Heart 
                      // 🟢 加粗线条，跟搜索图标匹配
                      strokeWidth={2.5}
                      className={`w-6 h-6 transition-colors ${
                        items.length > 0 
                            ? "text-primary fill-current" 
                            : (isSolid ? "text-gray-800 hover:text-primary" : "text-white hover:text-primary")
                      }`} 
                    />
                    {items.length > 0 && (
                      <span className="absolute top-0 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                          {items.length}
                      </span>
                    )}
                </div>
                
                {/* 收藏夹下拉菜单 */}
                <div className="absolute right-0 top-full mt-0 w-72 bg-white shadow-xl border border-gray-100 p-4 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="flex justify-between items-center mb-3 border-b border-gray-50 pb-2">
                        <p className="text-sm font-bold text-gray-900">我的收藏 ({items.length})</p>
                    </div>
                    
                    {items.length === 0 ? (
                        <p className="text-xs text-gray-400 py-4 text-center">暂无收藏设备</p>
                    ) : (
                        <div className="max-h-64 overflow-y-auto space-y-3">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-3 items-start group/item">
                                    <div className="w-12 h-12 bg-gray-50 relative shrink-0 rounded-sm overflow-hidden border border-gray-100">
                                        <img src={item.image} className="w-full h-full object-contain mix-blend-multiply"/>
                                    </div>
                                    <div className="overflow-hidden flex-1">
                                        <Link href={`/shop/${item.id}`} className="truncate font-bold text-xs text-gray-900 hover:text-primary block mb-1">
                                            {item.name}
                                        </Link>
                                        <p className="text-primary text-xs font-bold">
                                            {item.price > 0 ? `¥${item.price.toLocaleString()}` : "面议"}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromWishlist(item.id);
                                        }}
                                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
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

          {/* 手机端菜单按钮 */}
          <button 
            className={`md:hidden ${isSolid ? "text-gray-900" : "text-white"}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 手机端下拉菜单内容 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 h-screen animate-in slide-in-from-top-5">
          <div className="p-4 space-y-4">
             <form onSubmit={handleMobileSearch} className="relative mb-6">
                <input 
                    type="text" 
                    placeholder="搜索设备..." 
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    className="w-full bg-gray-50 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-primary text-black"
                />
             </form>

            <Link href="/" className="block py-2 text-lg font-bold border-b border-gray-50 text-black" onClick={() => setIsMenuOpen(false)}>首页</Link>
            <Link href="/shop" className="block py-2 text-lg font-bold border-b border-gray-50 text-black" onClick={() => setIsMenuOpen(false)}>设备库存</Link>
            <Link href="/learn" className="block py-2 text-lg font-bold border-b border-gray-50 text-black" onClick={() => setIsMenuOpen(false)}>酿造学院</Link>
            <Link href="/about" className="block py-2 text-lg font-bold border-b border-gray-50 text-black" onClick={() => setIsMenuOpen(false)}>关于大山</Link>
            
            <Link href="/about#contact" onClick={() => setIsMenuOpen(false)} className="mt-8 block w-full bg-primary text-white text-center py-4 rounded-sm font-bold uppercase">
              联系大山
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
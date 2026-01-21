"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, X, Phone, Menu } from "lucide-react"; // 🟢 引入 Menu
import { useRouter, usePathname } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
// 注意：如果你还没完全移除 Sanity，下面的 client 引用先保留，等接了 Keystatic 再删
import { client } from "@/lib/sanity"; 

export default function Navbar() {
  const { items } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 🟢 手机菜单开关
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  
  const router = useRouter();
  const pathname = usePathname();
  // 🟢 新增：如果是后台管理页面，直接不渲染导航栏
  if (pathname && pathname.startsWith('/keystatic')) {
    return null;
  }
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim().length > 0) {
      // 暂时保留 Sanity 查询，后续换成 Fuse.js
      const query = `*[_type == "product" && name match $term + "*"]{_id, name, price, image, category}`;
      const data = await client.fetch(query, { term });
      setResults(data);
    } else {
      setResults([]);
    }
  };

  // 🟢 逻辑更新：手机菜单打开时，背景也必须变白，否则字看不清
  const isWhiteState = !isHomePage || isScrolled || isHovered || isSearchOpen || isMobileMenuOpen;
  const textColorClass = isWhiteState ? "text-gray-900" : "text-white";

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isWhiteState 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 顶栏 (仅在白底或手机菜单打开时显示浅灰背景) */}
      <div className={`hidden md:block transition-colors duration-500 border-b ${
          isWhiteState ? "bg-gray-50 border-gray-100 text-gray-500" : "bg-transparent border-white/10 text-white/80"
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[11px] py-1.5 font-medium tracking-wide">
          <p>真诚做人，踏实做事 —— 选择大山靠谱！</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors">
              <Phone className="w-3 h-3" /> 134-7570-8779 (大山)
            </span>
            <Link href="/about" className="hover:text-primary transition-colors">联系我们</Link>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 w-48 z-50"> {/* z-50 保证 Logo 在菜单之上 */}
            <Link href="/" className="group flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/icon.svg" alt="山之欧瑞堡 Logo" className="w-12 h-12 object-contain -mt-1" />
              <div>
                  <h1 className={`font-heading text-xl md:text-2xl font-bold tracking-tighter uppercase transition-colors duration-300 ${textColorClass}`}>
                    山之欧瑞堡
                  </h1>
                  <p className={`text-[9px] tracking-widest uppercase hidden md:block ${isWhiteState ? "text-gray-500" : "text-gray-400"}`}>Ouruibao Machinery</p>
              </div>
            </Link>
          </div>

          {/* 🟢 桌面端导航 (手机隐藏) */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-16">
            {[
              { name: "首页", href: "/" },
              { name: "设备展厅", href: "/shop" },
              { name: "大山学院", href: "/learn" },
              { name: "关于大山", href: "/about" },
            ].map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-[15px] font-bold transition-all duration-300 relative group ${textColorClass}`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0`} />
              </Link>
            ))}
          </nav>

          {/* 右侧图标区 */}
          <div className={`flex items-center justify-end gap-5 md:gap-6 w-auto md:w-48 ${textColorClass}`}>
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Link href="/wishlist" className="relative hover:text-primary transition-colors">
              <Heart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {items.length}
                </span>
              )}
            </Link>

            {/* 桌面端大按钮 */}
            <Link href="/about" className="hidden lg:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-sm hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                <Phone className="w-4 h-4" />
                <span className="text-xs font-bold">联系大山</span>
            </Link>

            {/* 🟢 手机端汉堡菜单按钮 (仅手机显示) */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1 focus:outline-none z-50"
            >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 手机端全屏菜单 (动画滑出) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-24 px-6 animate-in slide-in-from-top-10 fade-in duration-200">
            <nav className="flex flex-col gap-6 text-xl font-heading font-bold text-gray-900 border-t border-gray-100 pt-8">
                {[
                  { name: "首页 Home", href: "/" },
                  { name: "设备展厅 Shop", href: "/shop" },
                  { name: "大山学院 Learn", href: "/learn" },
                  { name: "关于大山 About", href: "/about" },
                ].map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-between items-center border-b border-gray-100 pb-4 active:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Link 
                    href="/about" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-4 bg-primary text-white text-center py-4 rounded-sm shadow-lg active:scale-95 transition-transform"
                >
                    <Phone className="w-5 h-5 inline-block mr-2" />
                    拨打大山电话 (134...)
                </Link>
            </nav>
        </div>
      )}

      {/* 搜索下拉 (保持不变) */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-primary shadow-2xl p-6 animate-in slide-in-from-top-2 z-40">
            <div className="max-w-3xl mx-auto relative">
                <input 
                    type="text" 
                    autoFocus
                    placeholder="请输入设备名称..." 
                    className="w-full border-b-2 border-gray-200 focus:border-primary bg-transparent pl-2 pr-12 py-3 outline-none text-gray-900 text-xl font-heading"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                    <X className="w-6 h-6" />
                </button>
                {/* 搜索结果显示区域 (保持之前的逻辑) */}
            </div>
        </div>
      )}
    </header>
  );
}
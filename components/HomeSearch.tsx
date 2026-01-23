'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number | string;
  category: string;
  imageUrl: string;
}

export default function HomeSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 过滤逻辑
  const filtered = products.filter(p => 
    (p.name || '').toLowerCase().includes(query.toLowerCase()) ||
    (p.category || '').includes(query)
  ).slice(0, 5); // 只显示前5个，避免列表太长

  // 点击外部关闭下拉框
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if(query.trim()) {
        router.push(`/shop?q=${query}`); // 如果按回车，还是去商城页搜索
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto z-50">
      {/* 搜索框主体 */}
      <div className="relative group">
        <input
          type="text"
          placeholder="搜索设备名称、型号..."
          className="w-full h-14 pl-14 pr-4 rounded-full border-2 border-white/20 bg-white/95 backdrop-blur-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-xl"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
        
        {/* 清空按钮 */}
        {query && (
            <button 
                onClick={() => {setQuery(''); setIsOpen(false);}}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full text-gray-400"
            >
                <X className="w-4 h-4" />
            </button>
        )}
      </div>

      {/* 下拉结果列表 */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {filtered.length > 0 ? (
            <ul>
              {/* 标题栏 */}
              <li className="bg-gray-50 px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                匹配的设备
              </li>
              
              {/* 商品列表 */}
              {filtered.map((product) => (
                <li key={product.id} className="border-b border-gray-50 last:border-0">
                  <Link 
                    href={`/shop/${product.id}`} // 直接跳转详情页
                    className="flex items-center gap-4 px-5 py-4 hover:bg-blue-50 transition-colors group"
                  >
                    {/* 小图 */}
                    <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">暂无</div>
                      )}
                    </div>
                    
                    {/* 信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                         <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{product.category}</span>
                         {isNaN(Number(product.price)) || Number(product.price) === 0 
                            ? <span className="text-red-500 font-medium">面议</span> 
                            : <span className="text-red-600 font-bold">¥{product.price}</span>
                         }
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
              
              {/* 底部查看更多 */}
              <li className="p-3 bg-gray-50 text-center">
                 <Link href={`/shop?q=${query}`} className="text-sm text-primary font-bold hover:underline">
                    查看所有匹配结果 &rarr;
                 </Link>
              </li>
            </ul>
          ) : (
            // 无结果状态
            <div className="p-8 text-center text-gray-500">
              <p>未找到包含 "{query}" 的设备</p>
              <Link href="/shop" className="text-sm text-primary mt-2 inline-block hover:underline">
                去商城浏览全部库存
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
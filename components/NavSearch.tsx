'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

// 🟢 接收 isTransparent 参数，控制颜色
export default function NavSearch({ isTransparent }: { isTransparent: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 样式定义 (完全复刻您原来的样式逻辑)
  const textColor = isTransparent 
    ? "text-white placeholder:text-white/70" 
    : "text-gray-900 placeholder:text-gray-400";
    
  const borderColor = isTransparent 
    ? "border-white/50 focus:border-white" 
    : "border-gray-300 focus:border-primary";

  const iconColor = isTransparent 
    ? "text-white" 
    : "text-gray-400 hover:text-primary";

  // 加载数据
  const loadData = () => {
    if (products.length === 0) {
      setIsLoading(true);
      fetch('/api/search')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  };

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
        router.push(`/shop?q=${query}`);
        setIsOpen(false);
    }
  };

  // 过滤逻辑
  const filtered = products.filter(p => 
    (p.name || '').toLowerCase().includes(query.toLowerCase()) ||
    (p.category || '').includes(query)
  ).slice(0, 5);

  return (
    <div ref={wrapperRef} className="relative group">
      {/* 🟢 输入框区域 (复刻原有结构) */}
      <div className="relative">
        <input
          type="text"
          placeholder="搜索设备..."
          className={`pl-3 pr-8 py-1 border-b outline-none text-sm w-32 focus:w-48 transition-all bg-transparent ${textColor} ${borderColor}`}
          value={query}
          onFocus={() => {
            setIsOpen(true);
            loadData();
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        
        {/* 右侧图标 */}
        <button 
          onClick={handleSearch}
          className={`absolute right-0 top-1 transition-colors ${iconColor}`}
        >
           {isLoading ? (
             <Loader2 className="w-4 h-4 animate-spin" />
           ) : (
             // 🟢 加粗线条 strokeWidth={2.5}
             <Search className="w-4 h-4" strokeWidth={2.5} />
           )}
        </button>
      </div>

      {/* 🟢 下拉结果 (保持不变) */}
      {isOpen && query && (
        <div className="absolute right-0 top-full mt-2 w-[350px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1">
          <ul className="max-h-[60vh] overflow-y-auto">
              {filtered.length > 0 ? (
                <>
                  <li className="text-[10px] font-bold text-gray-400 px-4 py-2 uppercase tracking-wider">快速匹配</li>
                  {filtered.map(product => (
                    <li key={product.id}>
                      <Link 
                        href={`/shop/${product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group transition-colors border-b border-gray-50 last:border-0"
                      >
                         <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                            {product.imageUrl && <img src={product.imageUrl} className="w-full h-full object-cover" />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate group-hover:text-primary transition-colors">{product.name}</p>
                            <p className="text-xs text-red-600 font-bold mt-0.5">
                                {product.price === 0 ? '面议' : `¥${product.price.toLocaleString()}`}
                            </p>
                         </div>
                         <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                      </Link>
                    </li>
                  ))}
                   <li className="p-2 text-center bg-gray-50">
                    <Link href={`/shop?q=${query}`} onClick={() => setIsOpen(false)} className="text-xs text-primary font-bold hover:underline block">
                        查看全部结果 ({filtered.length}+)
                    </Link>
                  </li>
                </>
              ) : (
                !isLoading && (
                    <div className="py-6 text-center text-gray-400 text-sm">
                        <p>未找到 "{query}"</p>
                    </div>
                )
              )}
          </ul>
        </div>
      )}
    </div>
  );
}
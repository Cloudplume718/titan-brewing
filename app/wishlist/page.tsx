"use client";

import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { Trash2, ShoppingCart, ArrowRight, HeartOff } from "lucide-react";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end gap-4 border-b border-gray-200 pb-6 mb-8">
            <h1 className="font-heading text-4xl text-black font-bold uppercase">
            我的收藏
            </h1>
            <span className="text-gray-500 text-lg mb-1">({items.length} 件商品)</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 border border-dashed border-gray-300 rounded-sm">
            <HeartOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-6">您的收藏夹是空的。</p>
            <Link href="/shop" className="bg-primary text-white font-bold py-3 px-8 uppercase tracking-widest inline-flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 rounded-sm">
              去逛逛 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 flex flex-col md:flex-row items-center gap-6 border border-gray-200 hover:border-primary transition-colors group shadow-sm hover:shadow-md rounded-sm">
                
                {/* 图片 (浅灰底) */}
                <div className="w-32 h-32 bg-gray-100 flex-shrink-0 flex items-center justify-center p-2 rounded-sm border border-gray-100">
                    {item.image && <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />}
                </div>

                {/* 信息 */}
                <div className="flex-1 text-center md:text-left">
                    <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2 bg-red-50 inline-block px-2 py-1 rounded-sm">{item.category}</p>
                    <Link href={`/shop/${item.id}`} className="block text-black font-heading text-2xl uppercase hover:text-primary transition-colors mb-2 font-bold">
                        {item.name}
                    </Link>
                    <p className="text-red-600 font-bold text-xl">¥ {item.price}</p>
                </div>

                {/* 按钮组 */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex-1 md:flex-none border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-500 p-3 transition-colors rounded-sm"
                        title="移除"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    
                    <Link href={`/shop/${item.id}`} className="flex-1 md:flex-none bg-black hover:bg-primary text-white px-8 py-3 font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 rounded-sm">
                        <ShoppingCart className="w-4 h-4" /> 立即购买
                    </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}